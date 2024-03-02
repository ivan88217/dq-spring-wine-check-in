import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";
import { Member } from "@prisma/client";

export const winPrizeController = new Elysia().post(
  "/win-prize",
  async ({ body }) => {
    const { memberCodes, prizeName } = body;

    const existedPrize = await prisma.prize.findFirst({
      where: { name: prizeName },
    });

    const prize =
      existedPrize ||
      (await prisma.prize.create({ data: { name: prizeName } }));

    const members = await prisma.member.findMany({
      where: { code: { in: memberCodes } },
      include: { memberPrizes: true },
    });

    const foundMemberCodes = members.map((member) => member.code);

    const notFoundMemberCodes = memberCodes.filter(
      (memberCode) => !foundMemberCodes.includes(memberCode)
    );

    if (notFoundMemberCodes.length !== 0) {
      throw new Error(`找不到員工們：${notFoundMemberCodes}`);
    }

    const prizeNotObtainedMembers = members.filter(
      (member) =>
        !member.memberPrizes.some(
          (memberPrize) => memberPrize.prizeId === prize.id
        )
    );

    await prisma.memberPrize.createMany({
      data: prizeNotObtainedMembers.map((member) => ({
        prizeId: prize.id,
        memberId: member.id,
      })),
    });

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
