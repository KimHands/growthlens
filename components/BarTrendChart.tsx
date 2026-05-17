"use client";

import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyRecord } from "@/lib/api";

type Props = {
  data: DailyRecord[];
};

export default function BarTrendChart({ data }: Props) {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
        >
          <XAxis dataKey="day" hide />
          <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
          <Bar
            dataKey="observed"
            fill="#E5E7DA"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="trend"
            stroke="#2B9348"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
