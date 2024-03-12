import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const votesController = new Elysia()
  .post(
    "/votes",
    async ({ body }) => {
      const { teamId } = body;

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
