import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const getTeamsController = new Elysia().get(
  "/get-teams",
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
);
