import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const findMemberController = new Elysia().get(
  "/find-member",
  async ({ query }) => {
    const name = query.name;
    if (!name) {
      return [];
    }

    // 以名稱搜尋員工(模糊搜尋)
    const members = await prisma.member.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      select: {
        id: true,
        code: true,
        name: true,
        departmentName: true,
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
        departmentName: t.Nullable(t.String()),
      })
    ),
    error({ error }) {
      return error.message;
    },
  }
);
