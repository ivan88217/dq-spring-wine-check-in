import { Elysia, t } from "elysia";

export const checkInController = new Elysia().post(
  "/check-in",
  async ({ body }) => {
    // Do something with the body
  },
  {
    body: t.Object({
      code: t.String(),
    }),
    response: t.Boolean(),
    error({ error }) {
      return error.message;
    },
  }
);
