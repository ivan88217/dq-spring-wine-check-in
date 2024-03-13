import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "目錄 - 敦謙春酒",
  description: "敦謙集團 2024年 春酒系統",
};

export default function Menu() {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center lg:p-10 md:p-6 sm:p-1 gap-2">
      <h1>目錄</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Button variant={"secondary"} className="w-full p-0">
          <Link href="/" className="w-full h-full flex items-center justify-center">
            簽到頁面
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full p-0">
          <Link href="/votes" className="w-full h-full flex items-center justify-center">
            投票頁面
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full p-0">
          <Link href="/teams" className="w-full h-full flex items-center justify-center">
            隊伍管理
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full p-0">
          <Link href="/admin" className="w-full h-full flex items-center justify-center">
            簽到頁面-管理者模式
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full p-0">
          <Link href="/votes/overview" className="w-full h-full flex items-center justify-center">
            投票結果頁面
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full p-0">
          <Link href="/winners" className="w-full h-full flex items-center justify-center">
            抽籤結果頁面
          </Link>
        </Button>
        <Button className="w-full p-0 bg-gray-400">
          <Link href="http://127.0.0.1:5000" className="w-full h-full flex items-center justify-center pr-2 pl-2">
            抽獎程式(僅限現場主機可用)
          </Link>
        </Button>
      </div>
    </div>
  );
}
