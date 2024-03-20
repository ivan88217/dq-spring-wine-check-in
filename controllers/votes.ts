import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Elysia, t } from "elysia";

export const votesController = new Elysia()
  .post(
    "/votes",
    async ({ body }) => {
      const { teamId } = body;

      const allowedVote = await prisma.serverOption.findFirst({
        where: {
          key: "vote",
        },
        select: {
          value: true,
        },
      });

      if (!allowedVote || !allowedVote.value) {
        throw new Error("目前不開放投票");
      }

      await prisma.vote.create({
        data: {
          teamId,
        },
      });

      return "投票成功";
    },
    {
      body: t.Object({
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
