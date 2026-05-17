"use client";

import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyRecord } from "@/lib/api";

type Props = {
  data: DailyRecord[];
};

export default function MiniTrendChart({ data }: Props) {
  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
        >
          <XAxis dataKey="day" hide />
          <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
          <Area
            type="monotone"
            dataKey="trend"
            stroke="none"
            fill="#ECFCCB"
            fillOpacity={0.6}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="trend"
            stroke="#2B9348"
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
          />
          <Scatter
            dataKey="observed"
            fill="#6e7a73"
            shape="circle"
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
