import { Elysia, t } from "elysia";
import { isCheckedController } from "./is-checked";
import { checkInController } from "./check-in";

const app = new Elysia({ prefix: "/api" })
  .use(isCheckedController)
  .use(checkInController);

export const GET = app.handle;
export const POST = app.handle;
export type API = typeof app;
