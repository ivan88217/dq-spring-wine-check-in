"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MouseEventHandler, FormEventHandler } from "react";
import { useEffect, useState } from "react";
import { AlertError } from "@/components/alert-error";
import { getCookies, setCookie } from "@/lib/cookie-parser";
import { edenApi } from "@/lib/api";

export default function Home() {
  const [code, setCode] = useState("");
  const [alreadyChecked, setAlreadyChecked] = useState(false);
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

  const [onChecking, setOnChecking] = useState(false);

  useEffect(() => {
    const cookies = getCookies();
    if (!cookies.isChecked) {
      return;
    }
    setAlreadyChecked(true);
    setCode(cookies.isChecked);
  });

  const getCheckInBtnText = () => {
    if (alreadyChecked) return `簽到成功`;
    if (onChecking) return `正在簽到中`;
    return "簽到";
  };

  useEffect(() => {
    const text = getCheckInBtnText();

    if (text === btnText) return;

    setBtnText(text);
  }, [alreadyChecked, onChecking, code]);

  const errorShow = (title: string, text?: string) => {
    setError({
      title,
      text,
    });
    setErrorShown(true);
    if (currentTimeoutHandler) clearTimeout(currentTimeoutHandler);
    const timeout = setTimeout(() => setErrorShown(false), 7000);
    setCurrentTimeoutHandler(timeout);
    return;
  };

  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    setCode(e.currentTarget.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (!code) {
      errorShow("員工編號錯誤", "請輸入員工編號");
      return;
    }

    setOnChecking(true);

    const isCheckedRes = await edenApi.api["is-checked"].get({
      $query: {
        code,
      },
    });

    console.log(isCheckedRes);

    if (isCheckedRes.data) {
      errorShow("不可重複簽到", `${code}已經簽到過了`);
      setOnChecking(false);
      return;
    }

    const checkInRes = await edenApi.api["check-in"].post({
      code,
    });

    console.log(checkInRes);

    if (checkInRes.error) {
      errorShow("員工編號錯誤", checkInRes.error.value);
      setOnChecking(false);
      return;
    }

    setCookie("isChecked", code, 60 * 60);
    setOnChecking(false);
    setAlreadyChecked(true);
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
          disabled={alreadyChecked || onChecking}
          defaultValue={code}
        />
        <Button
          className="m-1 w-[100%]"
          variant="secondary"
          onClick={handleSubmit}
          disabled={alreadyChecked || onChecking}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
