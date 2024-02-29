import { Elysia, t } from "elysia";
import { isCheckedController } from "./is-checked";
import { checkInController } from "./check-in";
import { findMemberController } from "./find-member";

const app = new Elysia({ prefix: "/api" })
  .use(isCheckedController)
  .use(checkInController)
  .use(findMemberController);

export const GET = app.handle;
export const POST = app.handle;
export type API = typeof app;
