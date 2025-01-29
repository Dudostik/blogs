import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

import { getCommentsByPostId, createComment } from "~/models/comment.server";
import { deletePost, getPost, updatePost } from "~/models/post.server";
import { requireUserId } from "~/session.server";
import { Input } from "~/ui";
import { Button } from "~/ui/controls/button";

import { handleErrorResponse } from "./errorHandler";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.postId, "postId not found");

  const post = await getPost({ id: params.postId, userId });
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  const comments = (await getCommentsByPostId(params.postId)) ?? [];

  return { post, comments };
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  invariant(params.postId, "postId not found");

  const formData = await request.formData();

  if (formData.get("request-type") === "create-comment") {
    const content = formData.get("content")?.toString();
    formData.set("content", "");

    if (typeof content !== "string" || content.length === 0) {
      return handleErrorResponse(
        {
          content: "Content is required",
          title: null,
          description: null,
        },
        400,
      );
    }

    try {
      await createComment({
        postId: params.postId,
        userId,
        content,
      });

      return new Response(JSON.stringify({ ok: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
      return new Response(null, { status: 500 });
    }
  }

  if (formData.get("request-type") === "edit") {
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();

    if (typeof title !== "string" || title.length === 0) {
      return handleErrorResponse(
        { title: "Title is required", body: null },
        400,
      );
    }

    if (typeof description !== "string" || description.length === 0) {
      return handleErrorResponse(
        {
          description: "Description is required",
          title: null,
        },
        400,
      );
    }

    try {
      const post = await updatePost({
        id: params.postId,
        userId,
        title,
        description,
      });

      return new Response(JSON.stringify({ post }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(null, { status: 500 });
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
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    console.log(actionData);
    if (!actionData) {
      return;
    }

    if ("errors" in actionData) {
      if ("title" in actionData.errors) {
        titleRef.current?.focus();
      } else if ("description" in actionData.errors) {
        descriptionRef.current?.focus();
      } else {
        setEditMode(false);
      }
    }
  }, [actionData]);

  const getErrorMessage = (
    control: "title" | "description" | "content",
    message = "",
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

          <Input
            label="Title"
            ref={titleRef}
            defaultValue={data.post.title}
            name="title"
            invalid={!!getErrorMessage("title")}
            errorMessage={getErrorMessage("title", "title-error")}
          />

          <Input
            label="Description"
            ref={descriptionRef}
            defaultValue={data.post.description ?? ""}
            name="description"
            invalid={!!getErrorMessage("description")}
            errorMessage={getErrorMessage("description", "description-error")}
          />

          <Button label="Save" type="submit" />
        </Form>
      ) : (
        <div>
          <h3 className="text-2xl font-bold">{data.post.title}</h3>
          <p className="py-6">{data.post.description}</p>
          <div className="flex space-x-4">
            <Button
              label="Edit"
              type="button"
              onClick={() => setEditMode(true)}
            />
            <hr className="my-4" />
            <Form method="post">
              <input value="delete" name="request-type" readOnly hidden />
              <Button label="Delete" type="submit" />
            </Form>
          </div>
          <hr className="my-4" />
          <h4 className="text-xl font-bold">Comments</h4>
          <div className="space-y-4">
            {data.comments && data.comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              data.comments?.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.content}</p>
                  <span className="text-sm text-gray-500">
                    Posted on {comment.createdAt}
                  </span>
                </div>
              ))
            )}
          </div>

          <Form method="post">
            <input value="create-comment" name="request-type" readOnly hidden />
            <div>
              <label className="flex w-full flex-col gap-1">
                <span>Comment: </span>
                <textarea
                  ref={contentRef}
                  name="content"
                  rows={4}
                  className="w-full rounded-md border-2 border-blue-500 p-3"
                  aria-invalid={getErrorMessage("content") ? true : undefined}
                  aria-errormessage={getErrorMessage(
                    "content",
                    "content-error",
                  )}
                />
              </label>
            </div>
            <Button label="Add comment" type="submit" />
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
