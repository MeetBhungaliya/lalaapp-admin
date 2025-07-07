import { cn } from "@/lib/utils";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "../ui/chart";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#1E1614",
          color: "#fff",
          borderRadius: 20,
          padding: "8px 16px",
          fontWeight: 400,
          fontSize: 14,
          position: "relative",
          minWidth: 80,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: -8,
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "8px solid #1E1614",
          }}
        />
        {payload.map((entry, idx) => (
          <div key={idx}>{entry.value} Users</div>
        ))}
      </div>
    );
  }
  return null;
};

const TinyLineChart = ({ chartData, title, className = "" }) => {
  const chartConfig = useMemo(
    () => ({
      value: {
        label: title,
        color: "hsl(var(--chart-1))",
      },
    }),
    [title]
  );

  return (
    <div className={cn(" space-y-7", className)}>
      <div>
        <ChartContainer className="h-[476px] w-[100%]" config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: -30, bottom: 0 }}
          >
            <CartesianGrid stroke="#7E808C20" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#3D4152",
                fontSize: 16,
                fontWeight: 400,
                textAnchor: "middle",
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                value > 1000 ? `${(value / 1000).toFixed()}K` : value
              }
              tick={{
                fill: "#3D4152",
                fontSize: 16,
                fontWeight: 400,
              }}
            />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="premiumUsers"
              name="Premium Users"
              stroke="#2393FF"
              strokeWidth={6}
              activeDot={{ r: 10, stroke: "#2393FF", strokeWidth: 2 }}
              dot={{ r: 0, stroke: "#2393FF", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="freeUsers"
              name="Free Trial Users"
              stroke="#1E1614"
              strokeWidth={6}
              activeDot={{ r: 10, stroke: "#1E1614", strokeWidth: 2 }}
              dot={{ r: 0, stroke: "#1E1614", strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TinyLineChart;
