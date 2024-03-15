import { Elysia, t } from "elysia";
import { isCheckedController } from "@/controllers/is-checked";
import { checkInController } from "@/controllers/check-in";
import { findMemberController } from "@/controllers/find-member";
import { getMembersController } from "@/controllers/get-members";
import { winPrizeController } from "@/controllers/win-prize";
import { getWinnersController } from "@/controllers/get-winners";
import { getMemberDetailController } from "@/controllers/get-member-detail";
import { votesController } from "@/controllers/votes";
import { teamsController } from "@/controllers/teams";

const app = new Elysia({ prefix: "/api" })
  .use(votesController)
  .use(teamsController)
  .use(getMemberDetailController)
  .use(winPrizeController)
  .use(isCheckedController)
  .use(checkInController)
  .use(getMembersController)
  .use(getWinnersController)
  .use(findMemberController)
  .compile();

export const GET = app.handle;
export const POST = app.handle;
export const DELETE = app.handle;
export const PUT = app.handle;
export const PATCH = app.handle;

export type API = typeof app;
