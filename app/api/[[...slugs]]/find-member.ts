import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const findMemberController = new Elysia().get(
  "/find-member",
  async ({ query }) => {
    // 以名稱搜尋員工(模糊搜尋)
    const members = await prisma.member.findMany({
      where: {
        name: {
          contains: query.name,
        },
      },
      select: {
        id: true,
        code: true,
        name: true,
        department_name: true,
      },
    });

    return members;
  },
  {
    query: t.Object({
      name: t.String(),
    }),
    response: t.Array(
      t.Object({
        id: t.Number(),
        code: t.String(),
        name: t.String(),
        department_name: t.Nullable(t.String()),
      })
    ),
    error({ error }) {
      return error.message;
    },
  }
);
