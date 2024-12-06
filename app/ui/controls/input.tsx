import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  {
    label: string;
    defaultValue: string;
    name: string;
    invalid: boolean;
    errorMessage?: string;
  }
>(function Input(props, ref) {
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{props.label}:</span>
        <input
          ref={ref}
          defaultValue={props.defaultValue}
          name={props.name}
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
          aria-invalid={props.invalid === true ? true : undefined}
          aria-errormessage={props.errorMessage}
        />
      </label>
    </div>
  );
});
