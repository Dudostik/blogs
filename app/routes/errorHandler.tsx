export const handleErrorResponse = (
  errors: Record<string | number | symbol, unknown>,
  status: number,
) => {
  return new Response(JSON.stringify({ errors }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};
