import { Elysia, t } from "elysia";
import prisma from "@/lib/prisma";

export const getMembersController = new Elysia().get(
  "/get-members",
  async ({ query }) => {
    const members = await prisma.member.findMany({
      select: {
        code: true,
        name: true,
        departmentName: true,
        years: true,
      },
      where: {
        isAttend: query.isAttend,
        isStay: query.isStay,
        isBoss: query.isBoss,
        isSubCompany: query.isSubCompany,
        checkIn: query.isCheckIn
          ? {
              isNot: null,
            }
          : {
              is: null,
            },
      },
    });

    return members;
  },
  {
    query: t.Object({
      isAttend: t.Optional(t.BooleanString()),
      isStay: t.Optional(t.BooleanString()),
      isBoss: t.Optional(t.BooleanString()),
      isSubCompany: t.Optional(t.BooleanString()),
      isCheckIn: t.Optional(t.BooleanString()),
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
