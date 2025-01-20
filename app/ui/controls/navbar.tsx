import { Link } from "@remix-run/react";

import type { User } from "~/models/user.server";

interface NavBarProps {
  user: User | undefined;
}

export default function NavBar({ user }: NavBarProps) {
  if (!user) return null;

  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <nav className="flex items-center justify-between px-4 py-3">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/posts"
              className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Посты
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
            >
              Профиль
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
