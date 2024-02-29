import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";

export const checkInController = new Elysia().post(
  "/check-in",
  async ({ body }) => {
    const user = await prisma.member.findFirst({
      where: {
        code: body.code,
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

    if (isChecked) {
      throw new Error(`${user.code} 已經簽到過了`);
    }

    const checkIn = await prisma.checkIn.create({
      data: {
        member: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return true;
  },
  {
    body: t.Object({
      code: t.String(),
    }),
    response: t.Boolean(),
    error({ error }) {
      return error.message;
    },
  }
);
