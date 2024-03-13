import { TeamList } from "./list";
import { unstable_noStore as noStore } from "next/cache";
import { edenApi } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `參賽隊伍管理 - 敦謙春酒`,
  description: `參賽隊伍管理 - 敦謙集團 2024年 春酒服裝投票`,
};

const getData = async () => {
  noStore();
  const { data, error } = await edenApi.api.teams.get();
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

export default async function TeamsPage() {
  const data = await getData();
  return (
    <div className="h-[100vh] flex flex-col items-center lg:p-10 md:p-6 sm:p-1 gap-2">
      <h1>參賽隊伍管理</h1>
      <TeamList teams={data} />
    </div>
  );
}