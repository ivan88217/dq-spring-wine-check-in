import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Menu() {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center lg:p-10 md:p-6 sm:p-1 gap-2">
      <h1>目錄</h1>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Button variant={"secondary"} className="w-full">
          <Link href="/" className="w-full">
            簽到頁面
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full">
          <Link href="/votes" className="w-full">
            投票頁面
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full">
          <Link href="/teams" className="w-full">
            隊伍管理
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full">
          <Link href="/admin" className="w-full">
            簽到頁面-管理者模式
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full">
          <Link href="/votes/overview" className="w-full">
            投票結果頁面
          </Link>
        </Button>
        <Button variant={"secondary"} className="w-full">
          <Link href="/winners" className="w-full">
            抽籤結果頁面
          </Link>
        </Button>
      </div>
    </div>
  );
}
