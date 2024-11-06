import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Popover } from "~/ui/popover/popover";

import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <div>
      Test
    </div>
  );
}
