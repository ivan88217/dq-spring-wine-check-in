import { Metadata } from "next";
import { Chart } from "./chart";
import Image from "next/image";
import { edenApi } from "@/lib/api";
import { unstable_noStore as noStore } from "next/cache";
import { voteName } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${voteName} 投票結果 - 敦謙春酒`,
  description: `${voteName} 投票結果 - 敦謙集團 2024年 春酒服裝投票`,
};

const getData = async () => {
  noStore();
  const { data, error } = await edenApi.api["get-teams"].get();
  if (error) {
    throw new Error(error.message);
  }
  return data.map((team) => ({
    id: team.id,
    name: team.name,
    imageUrl: team.imageUrl || "/icon.png",
    votes: team.votes,
  }));
};

export default async function Overview() {
  const data = await getData();
  return (
    <div className="h-[100vh] flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1 bg-vote-background bg-cover bg-no-repeat">
      <Chart data={data} />
    </div>
  );
}
