import { Metadata } from "next";
import { Chart } from "./chart";
import Image from "next/image";

export const metadata: Metadata = {
  title: "今天我最型 投票結果 - 敦謙春酒",
  description: "今天我最型 投票結果 - 敦謙集團 2024年 春酒服裝投票",
};

const data = [
  {
    votes: 240,
    name: "第1組",
    imageUrl: "https://i.imgur.com/jX20YUK_d.webp",
  },
  {
    votes: 120,
    name: "第2組",
    imageUrl: "https://i.imgur.com/sjUvrU5_d.webp",
  },
  {
    votes: 654,
    name: "第3組",
    imageUrl: "https://i.imgur.com/9ct0hcC_d.webp",
  },
  {
    votes: 385,
    name: "第4組",
    imageUrl: "https://i.imgur.com/uqB61Ui_d.webp",
  },
  {
    votes: 12,
    name: "第5組",
    imageUrl: "https://i.imgur.com/BqOS4lm_d.webp",
  },
  {
    votes: 437,
    name: "第6組",
    imageUrl: "https://i.imgur.com/nXHdt9S_d.webp",
  },
  {
    votes: 287,
    name: "第7組",
    imageUrl: "https://i.imgur.com/5oxXzxL_d.webp",
  },
];

export default function Overview() {
  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <Image
        src={"/vote-qr.png"}
        width={150}
        height={150}
        alt="vote"
        className="fixed top-10 right-10 z-50"
      />
      <Chart data={data} />
    </div>
  );
}
