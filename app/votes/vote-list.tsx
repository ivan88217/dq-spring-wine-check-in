"use client";

import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageCard } from "./image-card";
import { getCookie, setCookie } from "@/lib/cookie-parser";
import { edenApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface VoteItem {
  id: number;
  name: string;
  imageUrl: string;
}
export interface VoteListProps {
  data: VoteItem[];
}

export function VoteList({ data = [] }: VoteListProps) {
  const [nameOrCode, setNameOrCode] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selected, setSelected] = useState("");
  const [imageCardData, setImageCardData] = useState<VoteItem | null>(null);
  const [voted, setVoted] = useState<VoteItem | null>(null);

  useEffect(() => {
    const votedId = getCookie("voted");
    console.log("votedId", votedId);
    if (votedId) {
      setSelected(votedId);
      const voted = data.find((item) => item.id === Number(votedId));
      if (voted) {
        setVoted(voted);
      }
    }

    const isChecked: string = getCookie("isChecked");
    if (isChecked) {
      setNameOrCode(isChecked);
      edenApi.api["get-member-detail"]
        .get({
          $query: {
            code: isChecked,
          },
        })
        .then((res) => {
          if (res.error) {
            console.log(res.error);
            return;
          }
          setBirthday(res.data.birthday);
        });
    }
  }, []);

  const onValueChange = (value: string) => {
    console.log("Selected value: ", value);
    setSelected(value);
  };

  const onOutsideClick = () => {
    setImageCardData(null);
  };

  const handleVote = async () => {
    const voted = data.find((item) => item.id === Number(selected));
    if (!voted) {
      return;
    }
    const { data: response, error } = await edenApi.api.votes.post({
      teamId: voted.id,
      birthday,
      nameOrCode,
    });
    if (error) {
      console.log(error);
      return alert(error.value);
    }
    alert(`投票成功 ! 感謝您對 ${voted?.name} 的支持`);
    setVoted(voted);
    setCookie("voted", selected, 60 * 60);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <ImageCard
        imageUrl={imageCardData?.imageUrl || "/icon.jpg"}
        title={imageCardData?.name || ""}
        hidden={!imageCardData}
        onOutsideClick={onOutsideClick}
      />
      <RadioGroup
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 justify-items-center"
        onValueChange={onValueChange}
        value={selected}
        disabled={!!voted}
      >
        {data.map((item) => (
          <div
            className={cn(
              "flex items-center space-x-2 border border-purple-800 rounded p-3 m-2 w-5/6",
              item.id === parseInt(selected) && "border-2 border-purple-300"
            )}
            key={item.id}
          >
            <RadioGroupItem id={`${item.id}`} value={`${item.id}`} />
            <label
              htmlFor={`${item.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
            >
              <div className="flex items-center min-h-20 max-h-24">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  onClick={() => setImageCardData(item)}
                />
                <span
                  className={cn(
                    "ml-4 text-2xl text-center w-3/5",
                    item.id === parseInt(selected) && "text-purple-50",
                    !!voted &&
                      (item.id === parseInt(selected)
                        ? "text-gray-400"
                        : "text-gray-500")
                  )}
                >
                  {item.name}
                </span>
              </div>
            </label>
          </div>
        ))}
      </RadioGroup>
      <div className="mt-10 w-3/4 flex flex-col justify-center items-center gap-2">
        <Label>請輸入您的員工編號或姓名</Label>
        <Input
          placeholder="輸入您的員工編號或姓名"
          className="w-full"
          value={nameOrCode}
          onChange={(e) => setNameOrCode(e.target.value)}
        />
        <Label>請輸入您的生日 (月日 例. 0211)</Label>
        <Input
          placeholder="輸入您的生日 (MMDD 例. 0211)"
          className={cn(
            "w-full",
            birthday && birthday.length !== 4 && "border-red-500"
          )}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Button
          className="m-4 w-full"
          variant={"secondary"}
          disabled={
            !selected ||
            !!voted ||
            !nameOrCode ||
            !birthday ||
            birthday.length !== 4
          }
          onClick={handleVote}
        >
          {voted ? `您已經投給 ${voted.name} 了` : "投票"}
        </Button>
      </div>
    </div>
  );
}
