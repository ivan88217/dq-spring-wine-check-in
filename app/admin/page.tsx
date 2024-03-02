"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCookie } from "@/lib/cookie-parser";
import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");

  const redirectAsAdmin = () => {
    setCookie("admin", true, 60 * 60 * 1);
    window.location.href = "/";
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login();
    }
  }

  const login = () => {
    if (password !== "dq2024") {
      alert("密碼錯誤");
      return;
    }

    redirectAsAdmin();
  };

  return (
    <div className="flex flex-col items-center justify-between lg:p-10 md:p-6 sm:p-1">
      <div className="m-5 flex flex-col w-4/5 text-center justify-between p-1">
        <Label htmlFor="code">管理員密碼: </Label>
        <Input
          className="mb-3"
          placeholder="請輸入密碼"
          type="password"
          onInput={handlePasswordInput}
          onKeyDown={handleEnter}
        ></Input>
        <Button onClick={login} variant={"secondary"} accessKey="enter">
          登入
        </Button>
      </div>
    </div>
  );
}
