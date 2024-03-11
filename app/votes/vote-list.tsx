"use client";

import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
  const onValueChange = (value: string) => {
    console.log("Selected value: ", value);
    setSelected(value);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <RadioGroup
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 pr-4 justify-items-center"
        onValueChange={onValueChange}
        value={selected}
      >
        {data.map((item) => (
          <div
            className="flex items-center space-x-2 border border-purple-300 rounded p-5 m-2 w-5/6"
            key={item.id}
          >
            <RadioGroupItem id={`${item.id}`} value={`${item.id}`} />
            <label
              htmlFor={`${item.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full"
            >
              <div className="flex flex-auto items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                />
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={200}
                  height={200}
                />
                <span className="ml-4 text-2xl">{item.name}</span>
              </div>
            </label>
          </div>
        ))}
      </RadioGroup>
      <Button
        className="m-4 w-3/4"
        variant={"secondary"}
        disabled={!selected}
        onClick={() => console.log("Selected: ", selected)}
      >
        投票
      </Button>
    </div>
  );
}
