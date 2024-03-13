import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Elysia, t } from "elysia";

export const votesController = new Elysia()
  .post(
    "/votes",
    async ({ body }) => {
      const { teamId, nameOrCode, birthday } = body;

      const member = await prisma.member.findFirst({
        where: {
          OR: [
            {
              name: nameOrCode,
            },
            {
              code: nameOrCode,
            },
          ],
        },
        select: {
          id: true,
          birthday: true,
          vote: true,
        },
      });

      if (!member) {
        throw new Error("輸入的員工編號或姓名不存在");
      }

      if (member.birthday && format(member.birthday, "MMdd") !== body.birthday) {
        throw new Error("生日不正確");
      }

      if (member.vote) {
        throw new Error("您已經投過票了");
      }

      await prisma.vote.create({
        data: {
          teamId,
          memberId: member.id,
        },
      });

      return "投票成功";
    },
    {
      body: t.Object({
        nameOrCode: t.String(),
        birthday: t.String(),
        teamId: t.Number(),
      }),
      response: t.String(),
      error({ error }) {
        return error.message;
      },
    }
  )
  .get(
    "/votes",
    async () => {
      const votes = await prisma.vote.groupBy({
        by: ["teamId"],
        _count: {
          teamId: true,
        },
      });

      return votes.map((vote) => ({
        teamId: vote.teamId,
        count: vote._count.teamId,
      }));
    },
    {
      response: t.Array(
        t.Object({
          teamId: t.Number(),
          count: t.Number(),
        })
      ),
      error({ error }) {
        return error.message;
      },
    }
  );