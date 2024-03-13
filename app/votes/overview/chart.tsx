"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { edenApi } from "@/lib/api";
import { voteName } from "@/lib/constants";
import Image from "next/image";

interface RenderCustomAxisTickProps {
  x: number;
  y: number;
  index: number;
}

interface RenderCustomBarLabelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  name: string;
  index: number;
}

export interface ChartData {
  votes: number;
  name: string;
  imageUrl: string;
}

export interface ChartProps {
  data: ChartData[];
}

export function Chart({ data }: ChartProps) {
  const [chartData, setChartData] = useState(data);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout>();

  const fetchData = async () => {
    const { data, error } = await edenApi.api.teams.get();
    if (error) {
      throw new Error(error.message);
    }
    console.log("data", data);
    return data.map<ChartData>((team) => ({
      id: team.id,
      name: team.name,
      imageUrl: team.imageUrl || "/icon.png",
      votes: team.votes,
    }));
  };

  useEffect(() => {
    if (!currentInterval) {
      const interval = setInterval(async () => {
        const newData = await fetchData();
        setChartData(newData);
      }, 2 * 1000);
      setCurrentInterval(interval);
    }
  });

  const renderCustomAxisTick = ({ x, y, index }: RenderCustomAxisTickProps) => {
    const text = chartData[index].name;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          dx={0}
          textAnchor="middle"
          fill="#194d91"
          style={{
            textShadow: "0 0 5px #fff",
          }}
        >
          {text}
        </text>
      </g>
    );
  };

  const renderCustomBarLabel = ({
    x,
    y,
    width,
    height,
    value,
    name,
    index,
  }: RenderCustomBarLabelProps) => {
    const imageUrl = chartData[index].imageUrl; // 替換為你的圖片 URL
    const size = Math.max(Math.min(width, height) - 10, 0);
    const dy = y > 10 ? -10 : 0;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y}
          dy={dy}
          fill="#194d91"
          textAnchor="middle"
          style={{
            textShadow: "0 0 5px #fff",
          }}
        >
          {value}
        </text>
        {height > size - 10 ? (
          <svg x={x + width / 2 - size / 2} y={y} width={size} height={size}>
            <image href={imageUrl} width={size} height={size} />
          </svg>
        ) : null}
      </g>
    );
  };
  return (
    <div className="w-full">
      <Card className="h-full bg-gray-50 bg-opacity-0 border-blue-400 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle
            className="font-normal text-5xl"
            style={{
              textShadow: "0 0 5px #55F",
            }}
          >
            &nbsp;
          </CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div className="flex-[3.5] relative">
            <Image
              src={"/vote-qr.png"}
              width={220}
              height={220}
              alt="vote"
              className="fixed bottom-5 left-5"
            />
          </div>
          <div className="flex-[10] pt-[22vh]">
            <div className="mt-4 h-[63vh] pt-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    tick={renderCustomAxisTick}
                    type="category"
                  />
                  <YAxis
                    type="number"
                    domain={[0, "dataMax + 10"]}
                    tick={{
                      fill: "#194d91",
                      style: {
                        textShadow: "0 0 5px #fff",
                      },
                    }}
                    className="text-xl text-tanning"
                  />
                  <Bar
                    dataKey="votes"
                    fill="#194d91"
                    label={renderCustomBarLabel}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex-[0.5]"></div>
        </CardContent>
      </Card>
    </div>
  );
}
