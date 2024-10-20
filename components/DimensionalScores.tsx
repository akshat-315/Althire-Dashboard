"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sample data for multiple interviews (extended to 15)
const interviewData = [
  {
    id: 1,
    name: "Interview 1",
    problemSolving: 4,
    coding: 3,
    verifying: 5,
    communication: 4,
  },
  {
    id: 2,
    name: "Interview 2",
    problemSolving: 3,
    coding: 5,
    verifying: 4,
    communication: 3,
  },
  {
    id: 3,
    name: "Interview 3",
    problemSolving: 5,
    coding: 4,
    verifying: 3,
    communication: 5,
  },
  {
    id: 4,
    name: "Interview 4",
    problemSolving: 2,
    coding: 4,
    verifying: 5,
    communication: 3,
  },
  {
    id: 5,
    name: "Interview 5",
    problemSolving: 4,
    coding: 2,
    verifying: 3,
    communication: 5,
  },
  {
    id: 6,
    name: "Interview 6",
    problemSolving: 5,
    coding: 5,
    verifying: 4,
    communication: 4,
  },
  {
    id: 7,
    name: "Interview 7",
    problemSolving: 3,
    coding: 3,
    verifying: 3,
    communication: 3,
  },
  {
    id: 8,
    name: "Interview 8",
    problemSolving: 4,
    coding: 4,
    verifying: 4,
    communication: 4,
  },
  {
    id: 9,
    name: "Interview 9",
    problemSolving: 5,
    coding: 3,
    verifying: 5,
    communication: 2,
  },
  {
    id: 10,
    name: "Interview 10",
    problemSolving: 2,
    coding: 5,
    verifying: 2,
    communication: 5,
  },
  {
    id: 11,
    name: "Interview 11",
    problemSolving: 4,
    coding: 4,
    verifying: 4,
    communication: 4,
  },
  {
    id: 12,
    name: "Interview 12",
    problemSolving: 3,
    coding: 3,
    verifying: 5,
    communication: 3,
  },
  {
    id: 13,
    name: "Interview 13",
    problemSolving: 5,
    coding: 5,
    verifying: 3,
    communication: 5,
  },
  {
    id: 14,
    name: "Interview 14",
    problemSolving: 4,
    coding: 2,
    verifying: 4,
    communication: 4,
  },
  {
    id: 15,
    name: "Interview 15",
    problemSolving: 3,
    coding: 4,
    verifying: 3,
    communication: 5,
  },
];

const dimensions = ["Problem Solving", "Coding", "Verifying", "Communication"];

const colorScheme = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
];

export function DimensionalScores() {
  const [currentPage, setCurrentPage] = useState(0);
  const interviewsPerPage = 3;
  const totalPages = Math.ceil(interviewData.length / interviewsPerPage);

  const formatData = (interview: any) => {
    return [
      { dimension: "Problem Solving", score: interview.problemSolving },
      { dimension: "Coding", score: interview.coding },
      { dimension: "Verifying", score: interview.verifying },
      { dimension: "Communication", score: interview.communication },
    ];
  };

  const paginatedInterviews = interviewData.slice(
    currentPage * interviewsPerPage,
    (currentPage + 1) * interviewsPerPage
  );

  return (
    <Card className="w-full max-w-6xl mx-auto bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">
          Dimensional Score Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedInterviews.map((interview, index) => (
            <div key={interview.id} className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2">{interview.name}</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={formatData(interview)}>
                    <PolarGrid stroke="rgba(255,255,255,0.3)" />
                    <PolarAngleAxis
                      dataKey="dimension"
                      tick={{ fill: "white", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 5]}
                      tick={{ fill: "white", fontSize: 12 }}
                    />
                    <Radar
                      name={interview.name}
                      dataKey="score"
                      stroke={colorScheme[index % colorScheme.length]}
                      fill={colorScheme[index % colorScheme.length]}
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {dimensions.map((dimension, i) => (
                  <Badge
                    key={dimension}
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor: colorScheme[i],
                      color: colorScheme[i],
                    }}
                  >
                    {dimension}: {formatData(interview)[i].score}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8 space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}