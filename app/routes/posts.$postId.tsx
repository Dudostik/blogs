import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

import { deletePost, getPost, updatePost } from "~/models/post.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.postId, "postId not found");

  const post = await getPost({ id: params.postId, userId });
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ post: post });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  invariant(params.postId, "postId not found");

  const formData = await request.formData();

  if (formData.get("request-type") === "edit") {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();

    if (typeof title !== "string" || title.length === 0) {
      return json(
        { errors: { description: null, title: "Title is required" } },
        { status: 400 },
      );
    }

    if (typeof description !== "string" || description.length === 0) {
      return json(
        { errors: { description: "Description is required", title: null } },
        { status: 400 },
      );
    }

    try {
      const post = await updatePost({
        id: params.postId,
        userId,
        title,
        description,
      });

      return json({ post }, { status: 200 });
    } catch (error) {
      return json(null, { status: 500 });
    }
  } else {
    await deletePost({ id: params.postId, userId });
    return redirect("/posts");
  }
};

export default function PostDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const [editMode, setEditMode] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (!actionData) {
      return;
    }

    if ("errors" in actionData && actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if ("errors" in actionData && actionData?.errors?.description) {
      descriptionRef.current?.focus();
    } else {
      setEditMode(false);
    }
  }, [actionData]);

  const getErrorMessage = (
    control: "title" | "description",
    message: string = "",
  ) => {
    if (actionData && "errors" in actionData && control in actionData) {
      return message;
    }
  };

  return (
    <div>
      {editMode ? (
        <Form method="post">
          <input value="edit" name="request-type" readOnly hidden />
          <div>
            <label className="flex w-full flex-col gap-1">
              <span>Title: </span>
              <input
                ref={titleRef}
                defaultValue={data.post.title}
                name="title"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                aria-invalid={getErrorMessage("title") ? true : undefined}
                aria-errormessage={getErrorMessage("title", "title-error")}
              />
            </label>
          </div>
          <div>
            <label className="flex w-full flex-col gap-1">
              <span>Description: </span>
              <input
                ref={descriptionRef}
                defaultValue={data.post.description ?? ""}
                name="description"
                className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                aria-invalid={getErrorMessage("description") ? true : undefined}
                aria-errormessage={getErrorMessage(
                  "description",
                  "description-error",
                )}
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </Form>
      ) : (
        <div>
          <h3 className="text-2xl font-bold">{data.post.title}</h3>
          <p className="py-6">{data.post.description}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <hr className="my-4" />
          <Form method="post">
            <input value="delete" name="request-type" readOnly hidden />
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Delete
            </button>
          </Form>
        </div>
      )}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Post not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
