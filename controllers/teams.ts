import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";

export const teamsController = new Elysia()
  .get(
    "/teams",
    async () => {
      const teams = await prisma.team.findMany({
        select: {
          _count: {
            select: {
              votes: true,
            },
          },
          id: true,
          name: true,
          image: true,
        },
      });

      return teams.map((team) => ({
        id: team.id,
        name: team.name,
        imageUrl: team.image,
        votes: team._count.votes,
      }));
    },
    {
      response: t.Array(
        t.Object({
          id: t.Number(),
          name: t.String(),
          imageUrl: t.Nullable(t.String()),
          votes: t.Number(),
        })
      ),
      error({ error }) {
        return error.message;
      },
    }
  )
  .post(
    "/teams",
    async ({ body, set }) => {
      const { teamId, name, image } = body;

      if (teamId) {
        await prisma.team.update({
          where: { id: teamId },
          data: {
            name,
            image,
          },
        });
      } else {
        await prisma.team.create({
          data: {
            name,
            image,
          },
        });
      }

      set.status = 201;
    },
    {
      body: t.Object({
        teamId: t.Nullable(t.Number()),
        name: t.String(),
        image: t.String(),
      }),
      error({ error }) {
        return error.message;
      },
    }
  );
