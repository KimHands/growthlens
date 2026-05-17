"use client";

import { useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyRecord } from "@/lib/api";

type Layer = "observed" | "trend" | "residual";

type Props = {
  data: DailyRecord[];
};

const layerConfig: Record<Layer, { label: string }> = {
  observed: { label: "실제 기록" },
  trend: { label: "흐름선" },
  residual: { label: "변동" },
};

export default function TrendChart({ data }: Props) {
  const [active, setActive] = useState<Record<Layer, boolean>>({
    observed: true,
    trend: true,
    residual: false,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Layer Toggle Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {(Object.keys(layerConfig) as Layer[]).map((key) => {
          const on = active[key];
          return (
            <button
              key={key}
              onClick={() =>
                setActive((prev) => ({ ...prev, [key]: !prev[key] }))
              }
              className={
                "px-4 py-2 rounded-full font-label-lg text-label-lg whitespace-nowrap transition-transform active:scale-95 " +
                (on
                  ? "bg-on-surface text-on-primary"
                  : "bg-surface-container-lowest text-outline border border-outline-variant")
              }
            >
              {layerConfig[key].label}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 12, right: 12, bottom: 12, left: 0 }}
          >
            <CartesianGrid stroke="#E5E7DA" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "#6e7a73", fontSize: 11 }}
              axisLine={{ stroke: "#E5E7DA" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6e7a73", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #E5E7DA",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value: number, name) => {
                const labelMap: Record<string, string> = {
                  observed: "실제",
                  trend: "흐름",
                  residual: "변동",
                };
                return [`${value}분`, labelMap[name as string] ?? name];
              }}
            />
            {active.trend && (
              <Area
                type="monotone"
                dataKey="trend"
                stroke="none"
                fill="#ECFCCB"
                fillOpacity={0.5}
                isAnimationActive={false}
              />
            )}
            {active.trend && (
              <Line
                type="monotone"
                dataKey="trend"
                stroke="#2B9348"
                strokeWidth={3}
                dot={false}
                isAnimationActive={false}
              />
            )}
            {active.observed && (
              <Scatter
                dataKey="observed"
                fill="#3e4944"
                shape="circle"
                isAnimationActive={false}
              />
            )}
            {active.residual && (
              <Line
                type="monotone"
                dataKey="residual"
                stroke="#ba1a1a"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={{ r: 2, fill: "#ba1a1a" }}
                isAnimationActive={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
