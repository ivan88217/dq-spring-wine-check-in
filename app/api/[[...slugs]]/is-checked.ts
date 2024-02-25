import { callScript } from "@/lib/app-script";
import { Elysia, t } from "elysia";

export const isCheckedController = new Elysia().get(
  "/is-checked",
  async ({ query }) => {
    const result = await callScript("checkExistInCheckInList", {
      code: query.code,
    });

    return result;
  },
  {
    query: t.Object({
      code: t.String(),
    }),
    response: t.Boolean(),
  }
);
