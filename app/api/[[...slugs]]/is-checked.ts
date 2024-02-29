import { callScript } from "@/lib/app-script";
import { Elysia, t } from "elysia";

export const isCheckedController = new Elysia().get(
  "/is-checked",
  async ({ query }) => {
    // Do something with the query
  },
  {
    query: t.Object({
      code: t.String(),
    }),
    response: t.Boolean(),
  }
);
