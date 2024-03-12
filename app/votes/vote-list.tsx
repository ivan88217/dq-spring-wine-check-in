"use client";

import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageCard } from "./image-card";
import { getCookie, setCookie } from "@/lib/cookie-parser";
import { edenApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface VoteItem {
  id: number;
  name: string;
  imageUrl: string;
}
export interface VoteListProps {
  data: VoteItem[];
}

export function VoteList({ data = [] }: VoteListProps) {
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
  });

  const onValueChange = (value: string) => {
    console.log("Selected value: ", value);
    setSelected(value);
  };

  const onOutsideClick = () => {
    setImageCardData(null);
  };

  const handleVote = () => {
    const voted = data.find((item) => item.id === Number(selected));
    if (!voted) {
      return;
    }
    edenApi.api.votes.post({ teamId: voted.id });
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
                    item.id === parseInt(selected) && "text-purple-50"
                  )}
                >
                  {item.name}
                </span>
              </div>
            </label>
          </div>
        ))}
      </RadioGroup>
      <Button
        className="m-4 w-3/4"
        variant={"secondary"}
        disabled={!selected || !!voted}
        onClick={handleVote}
      >
        {voted ? `您已經投給 ${voted.name} 了` : "投票"}
      </Button>
    </div>
  );
}
