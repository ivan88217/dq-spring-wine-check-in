import { DataTable } from "@/app/winners/data-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "敦謙春酒得獎名單",
  description: "敦謙集團 2024年 春酒得獎名單",
};

export default async function Winners() {
  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <div className="m-5 flex flex-col w-4/5 text-center justify-between p-1">
        <div className="text-2xl font-bold text-white mt-2">得獎名單</div>

        <div className="mt-10">
          <DataTable isAdmin />
        </div>
      </div>
    </div>
  );
}
