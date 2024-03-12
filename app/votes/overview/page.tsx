import { Metadata } from "next";
import { Chart } from "./chart";
import Image from "next/image";
import { edenApi } from "@/lib/api";
import { unstable_noStore as noStore } from "next/cache";

export const metadata: Metadata = {
  title: "今天我最型 投票結果 - 敦謙春酒",
  description: "今天我最型 投票結果 - 敦謙集團 2024年 春酒服裝投票",
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
}

export default async function Overview() {
  const data = await getData();
  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <Image
        src={"/vote-qr.png"}
        width={150}
        height={150}
        alt="vote"
        className="fixed top-10 right-10 z-50 md:scale-150"
      />
      <Chart data={data} />
    </div>
  );
}
