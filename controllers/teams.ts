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
    async ({ body, set, params }) => {
      const { id, name, image } = body;
      let team = null;

      if (id) {
        team = await prisma.team.update({
          where: { id },
          data: {
            name,
            image,
          },
        });
      } else {
        team = await prisma.team.create({
          data: {
            name,
            image,
          },
        });
      }

      set.status = 201;

      return {
        id: team.id,
        name: team.name,
        imageUrl: team.image,
      };
    },
    {
      body: t.Object({
        id: t.Optional(t.Number()),
        name: t.String(),
        image: t.String(),
      }),
      response: t.Object({
        id: t.Number(),
        name: t.String(),
        imageUrl: t.Nullable(t.String()),
      }),
      error({ error }) {
        return error.message;
      },
    }
  )
  .delete(
    "/teams/:id",
    async ({ params }) => {
      const { id } = params;
      await prisma.team.delete({
        where: { id: parseInt(id) },
      });
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      error({ error }) {
        return error.message;
      },
    }
  );
