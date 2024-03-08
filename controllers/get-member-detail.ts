import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const getMemberDetailController = new Elysia().get(
  "/get-member-detail",
  async ({ query }) => {
    // 以名稱搜尋員工(模糊搜尋)
    const members = await prisma.member.findFirst({
      where: {
        code: query.code,
      },
      select: {
        id: true,
        code: true,
        name: true,
        departmentName: true,
        seatNumber: true,
      },
    });

    if (!members) {
      throw new Error("找不到此員工編號");
    }

    return members;
  },
  {
    query: t.Object({
      code: t.String(),
    }),
    response: t.Object({
      id: t.Number(),
      code: t.String(),
      name: t.String(),
      departmentName: t.Nullable(t.String()),
      seatNumber: t.Nullable(t.String()),
    }),
    error({ error }) {
      return error.message;
    },
  }
);
