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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FindMemberResponse {
  id: number;
  code: string;
  name: string;
  departmentName: string | null;
}

export default function Home() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [rows, setRaws] = useState<FindMemberResponse[]>([]);
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

  const handleCodeInput: FormEventHandler<HTMLInputElement> = (e) => {
    setCode(e.currentTarget.value);
  };

  const handleNameInput: FormEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value);
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

    if (isCheckedRes.error) {
      errorShow("錯誤", isCheckedRes.error.value);
      setOnChecking(false);
      return;
    }

    const checkInRes = await edenApi.api["check-in"].post({
      code,
    });

    if (checkInRes.error) {
      errorShow("錯誤", checkInRes.error.value);
      setOnChecking(false);
      return;
    }

    setCookie("isChecked", code, 60 * 60);
    setOnChecking(false);
    setAlreadyChecked(true);
    alert(`${code} 簽到成功`);
  };

  useEffect(() => {
    if (!name) setRaws([]);

    edenApi.api["find-member"]
      .get({
        $query: {
          name,
        },
      })
      .then(({ data }) => {
        if (data) {
          setRaws(data);
        }
      });
  }, [name]);

  const selectMember = (member: FindMemberResponse) => {
    setCode(member.code);
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
          className="m-1 text-center bg-gray-900"
          placeholder="請輸入員工編號"
          onInput={handleCodeInput}
          disabled={alreadyChecked || onChecking}
          value={code}
        />
        <Button
          className="m-1 w-[100%]"
          variant="secondary"
          onClick={handleSubmit}
          disabled={alreadyChecked || onChecking || !code}
        >
          {btnText}
        </Button>
        <br />
        <Label htmlFor="name">
          以名稱搜尋
          <br />
          (於結果中選擇自己可自動填上員編)
        </Label>
        <Input
          id="name"
          className="m-1 text-center border-green-800 bg-gray-900"
          placeholder="請輸入名稱"
          onInput={handleNameInput}
          disabled={alreadyChecked || onChecking}
        />
        <br />
        {rows.length > 0 ? (
          <Table className="w-[100%]">
            <TableCaption>
              <div>搜尋結果</div>
              <div>(直接於結果中選擇自己就可以自動填上)</div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">員工編號</TableHead>
                <TableHead className="text-center">部門</TableHead>
                <TableHead className="text-center">姓名</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} onClick={() => selectMember(row)}>
                  <TableCell className="font-medium">{row.code}</TableCell>
                  <TableCell>{row.departmentName || "無"}</TableCell>
                  <TableCell>{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null}
      </div>
    </div>
  );
}
