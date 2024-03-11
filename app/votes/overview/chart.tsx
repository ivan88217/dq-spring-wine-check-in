"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export interface ChartProps {
  data: {
    votes: number;
    name: string;
    imageUrl: string;
  }[];
}

export function Chart({ data }: ChartProps) {
  const renderCustomAxisTick = ({ x, y, index }: RenderCustomAxisTickProps) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} dx={10} textAnchor="end" fill="#ccc">
          {data[index].name}
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
    console.log(name, height);
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
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  tick={renderCustomAxisTick}
                  type="category"
                />
                <YAxis type="number" domain={[0, "dataMax + 100"]} />
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
