import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const getTeamsController = new Elysia().get(
  "/get-teams",
  async () => {
    const teams = await prisma.team.findMany();

    return teams.map((team) => ({
      id: team.id,
      name: team.name,
      imageUrl: team.image,
    }));
  },
  {
    response: t.Array(
      t.Object({
        id: t.Number(),
        name: t.String(),
        imageUrl: t.Nullable(t.String()),
      })
    ),
    error({ error }) {
      return error.message;
    },
  }
);
