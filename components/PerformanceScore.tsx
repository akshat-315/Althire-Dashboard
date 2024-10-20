"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Interview {
  id: string;
  problemSolving: number;
  coding: number;
  verifying: number;
  communication: number;
}

const interviews: Interview[] = [
  {
    id: "INT-001",
    problemSolving: 8,
    coding: 7,
    verifying: 9,
    communication: 8,
  },
  {
    id: "INT-002",
    problemSolving: 9,
    coding: 8,
    verifying: 7,
    communication: 9,
  },
  {
    id: "INT-003",
    problemSolving: 7,
    coding: 9,
    verifying: 8,
    communication: 7,
  },
  {
    id: "INT-004",
    problemSolving: 8,
    coding: 8,
    verifying: 8,
    communication: 8,
  },
];

function calculateAverageScores(interviews: Interview[]) {
  const totalScores = interviews.reduce(
    (acc, interview) => {
      return {
        problemSolving: acc.problemSolving + interview.problemSolving,
        coding: acc.coding + interview.coding,
        verifying: acc.verifying + interview.verifying,
        communication: acc.communication + interview.communication,
      };
    },
    { problemSolving: 0, coding: 0, verifying: 0, communication: 0 }
  );

  const count = interviews.length;
  return {
    problemSolving: totalScores.problemSolving / count,
    coding: totalScores.coding / count,
    verifying: totalScores.verifying / count,
    communication: totalScores.communication / count,
  };
}

export function PerformanceScore() {
  const averageScores = calculateAverageScores(interviews);
  const overallScore =
    (averageScores.problemSolving +
      averageScores.coding +
      averageScores.verifying +
      averageScores.communication) /
    4;

  return (
    <Card className="w-full max-w-md bg-gray-900 border-gray-700 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-white">
          Performance Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <span className="text-5xl font-bold text-primary text-gray-700">
            {overallScore.toFixed(1)}
          </span>
          <span className="text-xl text-gray-400">/10</span>
        </div>
        <div className="space-y-4">
          <ScoreItem
            label="Problem Solving"
            score={averageScores.problemSolving}
          />
          <ScoreItem label="Coding" score={averageScores.coding} />
          <ScoreItem label="Verifying" score={averageScores.verifying} />
          <ScoreItem
            label="Communication"
            score={averageScores.communication}
          />
        </div>
      </CardContent>
    </Card>
  );
}

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
      <Progress value={score * 10} className="h-2 bg-gray-700" />
    </div>
  );
}
