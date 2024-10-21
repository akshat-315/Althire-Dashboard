"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for interviews with start dates and dimensional scores
const interviewData = [
  {
    id: 1,
    interview_start_at: "2023-01-15",
    problemSolving: 3,
    coding: 4,
    verifying: 3,
    communication: 4,
  },
  {
    id: 2,
    interview_start_at: "2023-02-01",
    problemSolving: 4,
    coding: 3,
    verifying: 4,
    communication: 3,
  },
  {
    id: 3,
    interview_start_at: "2023-02-15",
    problemSolving: 3,
    coding: 5,
    verifying: 4,
    communication: 4,
  },
  {
    id: 4,
    interview_start_at: "2023-03-01",
    problemSolving: 5,
    coding: 4,
    verifying: 3,
    communication: 5,
  },
  {
    id: 5,
    interview_start_at: "2023-03-15",
    problemSolving: 4,
    coding: 4,
    verifying: 5,
    communication: 4,
  },
  {
    id: 6,
    interview_start_at: "2023-04-01",
    problemSolving: 5,
    coding: 5,
    verifying: 4,
    communication: 5,
  },
];

const dimensions = ["problemSolving", "coding", "verifying", "communication"];
const dimensionColors = {
  problemSolving: "hsl(var(--chart-1))",
  coding: "hsl(var(--chart-2))",
  verifying: "hsl(var(--chart-3))",
  communication: "hsl(var(--chart-4))",
};

export function TemporalPerformanceChart() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const sortedData = [...interviewData].sort(
    (a, b) =>
      new Date(a.interview_start_at).getTime() -
      new Date(b.interview_start_at).getTime()
  );

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">
          Temporal Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            problemSolving: {
              label: "Problem Solving",
              color: dimensionColors.problemSolving,
            },
            coding: {
              label: "Coding",
              color: dimensionColors.coding,
            },
            verifying: {
              label: "Verifying",
              color: dimensionColors.verifying,
            },
            communication: {
              label: "Communication",
              color: dimensionColors.communication,
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sortedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="interview_start_at"
                tickFormatter={formatDate}
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis domain={[0, 5]} stroke="rgba(255,255,255,0.5)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {dimensions.map((dimension) => (
                <Line
                  key={dimension}
                  type="monotone"
                  dataKey={dimension}
                  stroke={
                    dimensionColors[dimension as keyof typeof dimensionColors]
                  }
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
