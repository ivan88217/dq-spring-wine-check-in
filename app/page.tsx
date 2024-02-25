"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MouseEventHandler, FormEventHandler } from "react";
import { useEffect, useState } from "react";
import { AlertError } from "@/components/alert-error";
import { getCookies, setCookie } from "@/lib/cookie-parser";
import { api } from "@/lib/api";

export default function Home() {
  const [code, setCode] = useState("");
  const [checkInDisabled, setCheckInDisabled] = useState(true);
  const [btnText, setBtnText] = useState("簽到");
  const [error, setError] = useState<{
    title: string;
    text?: string;
  }>({
    title: "Error",
    text: "description",
  });
  const [errorShown, setErrorShown] = useState(false);
  const [currentTimeoutHandler, setCurrentTimeoutHandler] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    api.api.test
      .get({
        $query: {
          x: "1",
        },
      })
      .then(console.log);
    const cookies = getCookies();
    if (!cookies.isChecked) {
      setCheckInDisabled(false);
      return;
    }
    setCode(cookies.isChecked);
  });

  useEffect(() => {
    const text = checkInDisabled ? `${code} 簽到成功` : "簽到";

    setBtnText(text);
  }, [checkInDisabled, code]);

  const errorShow = (title: string, text?: string) => {
    setError({
      title,
      text,
    });
    setErrorShown(true);
    if (currentTimeoutHandler) clearTimeout(currentTimeoutHandler);
    const timeout = setTimeout(() => setErrorShown(false), 5000);
    setCurrentTimeoutHandler(timeout);
    return;
  };

  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    setCode(e.currentTarget.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!code) {
      errorShow("員工編號錯誤", "請輸入員工編號");
      return;
    }
    setCookie("isChecked", code, 60 * 60);
    setCheckInDisabled(true);
    alert(`${code} 簽到成功`);
  };

  return (
    <div className="flex flex-col items-center justify-between p-10">
      <Image
        src="/icon.jpg"
        alt="敦謙2024年春酒-自助簽到系統"
        className="rounded-md object-cover"
        width={150}
        height={150}
      />
      <h1 className="text-2xl font-bold text-white mt-2">敦謙2024年春酒</h1>
      <h1 className="text-3md font-bold text-white mt-2">自助簽到系統</h1>
      <div className="m-5 flex flex-col w-4/5 text-center justify-between p-1">
        <div>
          <AlertError
            className="p-2 mb-3"
            title={error.title}
            text={error.text}
            hidden={!errorShown}
          />
        </div>
        <Label htmlFor="code">員工編號</Label>
        <Input
          id="code"
          className="m-1 text-center border-green-800 bg-gray-900"
          placeholder="請輸入員工編號"
          onInput={handleInput}
        />
        <Button
          className="m-1 w-[100%]"
          variant="secondary"
          onClick={handleSubmit}
          disabled={checkInDisabled}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
