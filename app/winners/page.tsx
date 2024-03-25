import { DataTable } from "./data-table";
import { Winner, columns } from "./columns";
import prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from 'next/cache';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "敦謙春酒得獎名單",
  description: "敦謙集團 2024年 春酒得獎名單",
};

export default async function Winners() {
  return (
    <div className="m-5 flex flex-col w-4/5 text-center justify-between p-1">
      <div className="text-2xl font-bold text-white mt-2">得獎名單</div>

      <div className="mt-10">
        <DataTable />
      </div>
    </div>
  );
}
