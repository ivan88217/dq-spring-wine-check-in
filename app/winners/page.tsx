import { DataTable } from "./data-table";
import { Winner, columns } from "./columns";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from 'next/cache';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "敦謙春酒得獎名單",
  description: "敦謙集團 2024年 春酒得獎名單",
};

async function getData(): Promise<Winner[]> {
  noStore();
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

  return winners.map((winner) => ({
    code: winner.member.code,
    name: winner.member.name.replace(/(?<=^.{1})./g, "*"),
    departmentName: winner.member.departmentName,
    prize: winner.prize.name,
  }));
}

export default async function Winners() {
  const data = await getData();

  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <div className="m-5 flex flex-col w-4/5 text-center justify-between p-1">
        <div className="text-2xl font-bold text-white mt-2">得獎名單</div>

        <div className="mt-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
