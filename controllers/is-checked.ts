import prisma from "@/lib/prisma";
import { Elysia, t } from "elysia";
import { format } from "date-fns";

export const isCheckedController = new Elysia().get(
  "/is-checked",
  async ({ query }) => {
    const user = await prisma.member.findFirst({
      where: {
        code: query.code,
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
    }),
    response: t.Boolean(),
    error({ error }) {
      return error.message;
    },
  }
);
