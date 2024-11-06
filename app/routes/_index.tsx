import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return user ? (
    <Link
      to="/posts"
      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
    >
      View Posts for {user.email}
    </Link>
  ) : (
    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
      <Link
        to="/join"
        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
      >
        Sign up
      </Link>
      <Link
        to="/login"
        className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
      >
        Log In
      </Link>
    </div>
  );
}
