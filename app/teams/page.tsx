import { TeamList } from "./list";
import { unstable_noStore as noStore } from "next/cache";
import { edenApi } from "@/lib/api";

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
