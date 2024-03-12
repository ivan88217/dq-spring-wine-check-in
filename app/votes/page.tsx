import { Metadata } from "next";
import { VoteItem, VoteList } from "./vote-list";
import { edenApi } from "@/lib/api";
import { unstable_noStore as noStore } from "next/cache";
import { voteName } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${voteName} - 敦謙春酒服裝投票`,
  description: `${voteName} - 敦謙集團 2024年 春酒服裝投票`,
};

const getData = async (): Promise<VoteItem[]> => {
  noStore();
  const { data, error } = await edenApi.api["get-teams"].get();
  if (error) {
    throw new Error(error.message);
  }
  return data.map<VoteItem>((team) => ({
    id: team.id,
    name: team.name,
    imageUrl: team.imageUrl || "/icon.png",
  }));
};

export default async function Votes() {
  const data = await getData();
  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl pt-3">
        {voteName}
      </h1>
      <p className="scroll-m-20 text-lg lg:text-xl">
        每人一票(點擊圖片可以放大)
      </p>
      <VoteList data={data} />
    </div>
  );
}
