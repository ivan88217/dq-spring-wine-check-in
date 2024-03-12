"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { edenApi } from "@/lib/api";

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

  const fakeData = (prev: ChartData[]) => {
    const newData = prev.map((item) => ({
      ...item,
      votes: item.votes + Math.floor(Math.random() * 10),
    }));
    return newData;
  };

  const fetchData = async () => {
    const { data, error } = await edenApi.api["get-teams"].get();
    if (error) {
      throw new Error(error.message);
    }
    return data.map((team) => ({
      id: team.id,
      name: team.name,
      imageUrl: team.imageUrl || "/icon.png",
      votes: team.votes,
    }));
  };

  useEffect(() => {
    if (!currentInterval) {
      const interval = setInterval(() => {
        setChartData(fakeData);
      }, 2 * 1000);
      setCurrentInterval(interval);
    }

    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  });

  const renderCustomAxisTick = ({ x, y, index }: RenderCustomAxisTickProps) => {
    const text = data[index].name;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} dx={0} textAnchor="middle" fill="#ccc">
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
    const imageUrl = data[index].imageUrl; // 替換為你的圖片 URL
    const size = Math.min(width, height) - 10;
    return (
      <g>
        <text x={x + width / 2} y={y - 10} fill="#FF9C00" textAnchor="middle">
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
      <Card className="h-4/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">投票</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-4 h-[80vh]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="name"
                  tick={renderCustomAxisTick}
                  type="category"
                />
                <YAxis type="number" domain={[0, "dataMax + 50"]} />
                <Bar
                  dataKey="votes"
                  fill="#FF9C00"
                  label={renderCustomBarLabel}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
