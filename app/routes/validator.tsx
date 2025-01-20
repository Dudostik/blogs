// zod https://zod.dev/
const validateForm = (title: string | null, body: string | null) => {
  const errors: { title?: string; body?: string } = {};

  if (typeof title !== "string" || title.length === 0) {
    errors.title = "Title is required";
  }

  if (typeof body !== "string" || body.length === 0) {
    errors.body = "Body is required";
  }

  return errors;
};
