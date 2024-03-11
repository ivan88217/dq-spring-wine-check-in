import { VoteItem, VoteList } from "./vote-list";

const getData = async (): Promise<VoteItem[]> => {
  return [
    {
      id: 1,
      name: "test1",
      imageUrl: "https://i.imgur.com/jX20YUK_d.webp",
    },
    {
      id: 2,
      name: "test2",
      imageUrl: "https://i.imgur.com/sjUvrU5_d.webp",
    },
    {
      id: 3,
      name: "test3",
      imageUrl: "https://i.imgur.com/jX20YUK_d.webp",
    },
    {
      id: 4,
      name: "test4",
      imageUrl: "https://i.imgur.com/jX20YUK_d.webp",
    },
  ];
};

export default async function Votes() {
  const data = await getData();
  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl pt-3">
        今天我最型
      </h1>
      <p className="scroll-m-20 text-lg lg:text-xl">每人一票(點擊圖片可以放大)</p>
      <VoteList data={data} />
    </div>
  );
}
