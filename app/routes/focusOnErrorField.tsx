export const focusOnErrorField = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionData: any,
  titleRef: React.RefObject<HTMLInputElement>,
  bodyRef: React.RefObject<HTMLTextAreaElement>,
) => {
  if (actionData?.errors?.title) {
    titleRef.current?.focus();
  } else if (actionData?.errors?.body) {
    bodyRef.current?.focus();
  }
};
