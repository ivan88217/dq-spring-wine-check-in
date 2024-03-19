import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";

export const getMembersController = new Elysia().get(
  "/get-members",
  async ({ query }) => {
    let where: any = {
      isBoss: false,
      isWelfareCommittee: true,
    };
    if (query.hasQualified) {
      where = {
        OR: [
          {
            isBoss: false,
            checkIn: {
              isNot: null,
            },
          },
        ],
      };

      if (query.includeStay) {
        where = {
          OR: [
            {
              isBoss: false,
              checkIn: {
                isNot: null,
              },
            },
            {
              isBoss: false,
              isStay: true,
            },
          ],
        };
      }
    }
    const members = await prisma.member.findMany({
      select: {
        code: true,
        name: true,
        departmentName: true,
        years: true,
      },
      where
    });

    return members;
  },
  {
    query: t.Object({
      hasQualified: t.Optional(t.BooleanString()),
      includeStay: t.Optional(t.BooleanString()),
    }),
    response: t.Array(
      t.Object({
        code: t.String(),
        name: t.String(),
        departmentName: t.Nullable(t.String()),
        years: t.Number(),
      })
    ),
    error({ error }) {
      return error.message;
    },
  }
);
