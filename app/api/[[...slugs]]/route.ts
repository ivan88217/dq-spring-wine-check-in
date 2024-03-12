import { Elysia, t } from "elysia";
import { isCheckedController } from "@/controllers/is-checked";
import { checkInController } from "@/controllers/check-in";
import { findMemberController } from "@/controllers/find-member";
import { getMembersController } from "@/controllers/get-members";
import { winPrizeController } from "@/controllers/win-prize";
import { getWinnersController } from "@/controllers/get-winners";
import { getMemberDetailController } from "@/controllers/get-member-detail";
import { getTeamsController } from "@/controllers/get-teams";
import { votesController } from "@/controllers/votes";

const app = new Elysia({ prefix: "/api" })
  .use(votesController)
  .use(getTeamsController)
  .use(getMemberDetailController)
  .use(winPrizeController)
  .use(isCheckedController)
  .use(checkInController)
  .use(getMembersController)
  .use(getWinnersController)
  .use(findMemberController);

export const GET = app.handle;
export const POST = app.handle;
export type API = typeof app;
