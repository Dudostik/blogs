// index.jsx
import * as React from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import "./styles.css";
import { PropsWithChildren } from "react";

export const Popover = ({
  children,
  content,
}: PropsWithChildren<{
  content: string;
}>) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger className="PopoverTrigger">{children}</RadixPopover.Trigger>
    <RadixPopover.Portal>
      <RadixPopover.Content className="PopoverContent">
        {content}
        <RadixPopover.Arrow className="PopoverArrow" />
      </RadixPopover.Content>
    </RadixPopover.Portal>
  </RadixPopover.Root>
);

