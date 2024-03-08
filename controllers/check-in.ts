import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

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

    if(user.birthday && format(user.birthday, "MMdd") !== body.birthday) {
      throw new Error("生日錯誤");
    }

    const isChecked = await prisma.checkIn.findFirst({
      where: {
        memberId: user.id,
      },
    });

    if (isChecked) {
      throw new Error(`${user.name}您好，您已經簽到過了，桌次是 ${user.seatNumber}桌`);
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
      birthday: t.String(),
    }),
    response: t.Boolean(),
    error({ error }) {
      return error.message;
    },
  }
);
