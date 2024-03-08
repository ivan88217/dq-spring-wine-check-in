import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";

export const isCheckedController = new Elysia().get(
  "/is-checked",
  async ({ query }) => {
    const user = await prisma.member.findFirst({
      where: {
        code: query.code,
        birthday: query.birthday,
      },
    });

    if (!user) {
      throw new Error("找不到此員工編號");
    }

    const isChecked = await prisma.checkIn.findFirst({
      where: {
        memberId: user.id,
      },
    });

    return !!isChecked;
  },
  {
    query: t.Object({
      code: t.String(),
      birthday: t.String(),
    }),
    response: t.Boolean(),
    error({ error }) {
      return error.message;
    },
  }
);
