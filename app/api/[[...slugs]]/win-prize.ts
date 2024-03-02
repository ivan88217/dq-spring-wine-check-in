import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";
import { Member, MemberPrize } from "@prisma/client";

export const winPrizeController = new Elysia().post(
  "/win-prize",
  async ({ body }) => {
    const { memberCodes, prizeName } = body;

    const members: Member[] = [];

    const existPrize = await prisma.prize.findFirst({
      where: {
        name: prizeName,
      },
    });
    const prize =
      existPrize || (await prisma.prize.create({ data: { name: prizeName } }));

    for (const code of memberCodes) {
      const member = await prisma.member.findFirst({
        where: {
          code,
        },
        include: {
          memberPrizes: true,
        },
      });

      if (!member) {
        throw new Error(`找不到員工 ${code}`);
      }

      if (
        member.memberPrizes.some(
          (memberPrize) => memberPrize.prizeId === prize.id
        )
      ) {
        continue;
      }

      members.push(member);
    }

    for (const member of members) {
      await prisma.member.update({
        where: {
          id: member.id,
        },
        data: {
          memberPrizes: {
            create: {
              prizeId: prize.id,
            },
          },
        },
      });
    }

    return "ok";
  },
  {
    body: t.Object({
      memberCodes: t.Array(t.String()),
      prizeName: t.String(),
    }),
    response: t.String(),
    error({ error }) {
      return error.message;
    },
  }
);
