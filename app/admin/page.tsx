"use client";

import { setCookie } from "@/lib/cookie-parser";
import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    setCookie("admin", true, 60 * 60 * 1);
    window.location.href = "/";
  }, []);
  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <h1>跳轉中...</h1>
    </div>
  );
}
