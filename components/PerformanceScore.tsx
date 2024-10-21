"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DimensionalScore,
  DimensionScore,
  InterviewInterface,
  InterviewListData,
  InterviewStatsProp,
  PerformanceScoreInterface,
} from "@/types/interviewTypes";
import { useEffect, useState } from "react";

export const PerformanceScore: React.FC<InterviewStatsProp> = ({
  interviewList,
}) => {
  //variable declarations
  const [averageScores, setAverageScores] =
    useState<PerformanceScoreInterface | null>(null);

  //calculates the average of all the dimension
  async function calculateDimensionData(interviewList: InterviewListData) {
    const dimensionStats: DimensionScore = {};

    interviewList?.interviews_list.forEach((interview: InterviewInterface) => {
      if (
        interview.status === "processed" &&
        interview.finished_interview_data.length > 0
      ) {
        const dimensionalScores =
          interview.finished_interview_data[0].evaluation?.dimensional_scores ||
          [];

        dimensionalScores.forEach((scoreObj: DimensionalScore) => {
          const dimension = scoreObj.dimension;
          const score = scoreObj.score;

          if (!dimensionStats[dimension]) {
            dimensionStats[dimension] = { total: 0, count: 0 };
          }

          dimensionStats[dimension].total += score;
          dimensionStats[dimension].count += 1;
        });
      }
    });

    const dimensionAverages: { [key: string]: number } = {};
    Object.keys(dimensionStats).forEach((dimension) => {
      dimensionAverages[dimension] =
        dimensionStats[dimension].total / dimensionStats[dimension].count;
    });

    console.log("Dimension Averages: ", dimensionAverages);
    return dimensionAverages;
  }

  //hooks
  useEffect(() => {
    if (interviewList) {
      const fetchData = async () => {
        const data = await calculateDimensionData(interviewList);
        setAverageScores(data);
        console.log(data);
      };

      fetchData();
    }
  }, [interviewList]);

  return (
    <Card className="w-full max-w-md bg-gray-900 border-gray-700 shadow-lg h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-white">
          Performance Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {averageScores &&
            Object.keys(averageScores).map((averageScore) => {
              return (
                <ScoreItem
                  key={averageScore}
                  label={averageScore}
                  score={averageScores[averageScore]}
                />
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};

interface ScoreItemProps {
  label: string;
  score: number;
}

function ScoreItem({ label, score }: ScoreItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-medium text-primary">
          {score.toFixed(1)}/10
        </span>
      </div>
      <Progress value={score * 10} className="h-2 bg-gray-400" />
    </div>
  );
}
