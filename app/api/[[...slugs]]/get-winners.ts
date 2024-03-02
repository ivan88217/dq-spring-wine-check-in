import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";

export const getWinnersController = new Elysia().get(
  "/get-winners",
  async () => {
    const winners = await prisma.memberPrize.findMany({
      include: {
        member: {
          select: {
            code: true,
            name: true,
            departmentName: true,
          },
        },
        prize: {
          select: {
            name: true,
          },
        }
      },
      orderBy: {
        prize: {
          id: "desc",
        },
      },
    });

    // 名稱第二字需要隱藏，例如：王小明 -> 王*明
    return winners.map((winner) => ({
      code: winner.member.code,
      name: winner.member.name.replace(/(?<=^.{1})./g, "*"),
      departmentName: winner.member.departmentName,
      prize: winner.prize.name,
    }));
  },
  {
    response: t.Array(
      t.Object({
        code: t.String(),
        name: t.String(),
        departmentName: t.Nullable(t.String()),
        prize: t.String(),
      })
    ),
    error({ error }) {
      return error.message;
    },
  }
);
