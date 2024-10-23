"use client";

import React, { useEffect, useState } from "react";
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
import {
  DimensionalScoreInterface,
  InterviewInterface,
  InterviewListData,
  InterviewStatsProp,
  TemporalPerformanceInterface,
} from "@/types/interviewTypes";

export const TemporalPerformanceChart: React.FC<InterviewStatsProp> = ({
  interviewList,
}) => {
  const [temporalData, setTemporalData] = useState<
    TemporalPerformanceInterface[]
  >([]);
  const [dynamicDimensions, setDynamicDimensions] = useState<string[]>([]);

  // Function to process interview data dynamically and extract unique dimensions
  function setTemporalPerformanceData(interviewList: InterviewListData) {
    const processedInterviews = interviewList.interviews_list
      .filter(
        (interview: InterviewInterface) => interview.status === "processed"
      )
      .map((interview: InterviewInterface) => {
        const dimensionalScores =
          interview.finished_interview_data[0].evaluation.dimensional_scores;

        const dimensions: { [key: string]: number } = {};

        dimensionalScores.forEach((ds) => {
          dimensions[ds.dimension] = ds.score || 0;
        });

        return {
          id: interview.id,
          interview_start_at: interview.interview_start_at,
          dimensions: dimensions,
        };
      });

    // Extract unique dimensions from the processed interviews
    const uniqueDimensions = Array.from(
      new Set(
        processedInterviews.flatMap((interview) =>
          Object.keys(interview.dimensions)
        )
      )
    );

    setTemporalData(processedInterviews);
    setDynamicDimensions(uniqueDimensions);
  }

  useEffect(() => {
    if (interviewList) {
      setTemporalPerformanceData(interviewList);
    }
  }, [interviewList]);

  function convertEpochTime(epochTime: number) {
    const date = new Date(epochTime * 1000);
    return date.toLocaleString("en-IN", { month: "short", day: "numeric" });
  }

  const sortedData = [...temporalData]
    .map((interview) => {
      const formattedInterview = { ...interview, ...interview.dimensions };
      return formattedInterview;
    })
    .sort(
      (a, b) =>
        new Date(convertEpochTime(a.interview_start_at)).getTime() -
        new Date(b.interview_start_at).getTime()
    );

  // Define colors dynamically for the chart, fallback to default if not enough colors
  const dimensionColors: { [key: string]: string } = {
    problemSolving: "hsl(var(--chart-1))",
    coding: "hsl(var(--chart-2))",
    verifying: "hsl(var(--chart-3))",
    communication: "hsl(var(--chart-4))",
    ...dynamicDimensions.reduce((acc, dimension, index) => {
      acc[dimension] = `hsl(var(--chart-${index + 1}))`;
      return acc;
    }, {} as { [key: string]: string }),
  };

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">
          Temporal Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={dynamicDimensions.reduce((acc, dimension) => {
            acc[dimension] = {
              label: dimension,
              color: dimensionColors[dimension] || "hsl(var(--chart-default))",
            };
            return acc;
          }, {} as { [key: string]: { label: string; color: string } })}
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
                tickFormatter={convertEpochTime}
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis domain={[0, 5]} stroke="rgba(255,255,255,0.5)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              {dynamicDimensions.map((dimension) => (
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
};
