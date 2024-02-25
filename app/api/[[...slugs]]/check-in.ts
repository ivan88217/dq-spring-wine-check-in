import { callScript } from "@/lib/app-script";
import { Elysia, t } from "elysia";

export const checkInController = new Elysia().post(
  "/check-in",
  async ({ body }) => {
    const result = await callScript("checkIn", {
      code: body.code,
    });

    return result;
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
