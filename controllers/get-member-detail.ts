import prisma from "@/lib/prisma";
import { format } from "date-fns";
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
        birthday: true,
        departmentName: true,
        seatNumber: true,
      },
    });

    if (!members) {
      throw new Error("找不到此員工編號");
    }

    return {
      id: members.id,
      code: members.code,
      name: members.name,
      birthday: format(members.birthday!, "MMdd"),
      departmentName: members.departmentName,
      seatNumber: members.seatNumber,
    };
  },
  {
    query: t.Object({
      code: t.String(),
    }),
    response: t.Object({
      id: t.Number(),
      code: t.String(),
      name: t.String(),
      birthday: t.String(),
      departmentName: t.Nullable(t.String()),
      seatNumber: t.Nullable(t.String()),
    }),
    error({ error }) {
      return error.message;
    },
  }
);
