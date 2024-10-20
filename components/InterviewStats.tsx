"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InterviewListData } from "@/types/interviewTypes";
import {
  BarChart2Icon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react";

interface InterviewStatsProp {
  interviewList: InterviewListData | null;
}

export const InterviewStats: React.FC<InterviewStatsProp> = ({
  interviewList,
}) => {
  const totalInterviews = 50;
  const completedInterviews = 35;
  const upcomingInterviews = 15;
  const averageScore = 8.7;
  const completionRate = (completedInterviews / totalInterviews) * 100;

  console.log("InterviewListData in InterviewStats: ", interviewList);

  return (
    <Card className="w-full h-fit max-w-md bg-gray-900 border-gray-700 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-white">
          Interview Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <StatItem
            label="Total Interviews"
            value={totalInterviews}
            icon={<BarChart2Icon className="w-5 h-5 text-blue-400" />}
          />
          <StatItem
            label="Completed"
            value={completedInterviews}
            icon={<CheckCircleIcon className="w-5 h-5 text-green-400" />}
          />
          <StatItem
            label="Upcoming"
            value={upcomingInterviews}
            icon={<ClockIcon className="w-5 h-5 text-yellow-400" />}
          />
          <StatItem
            label="Average Score"
            value={`${averageScore.toFixed(1)}/10`}
            icon={<TrendingUpIcon className="w-5 h-5 text-purple-400" />}
          />
        </div>
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">
              Completion Rate
            </span>
            <span className="text-sm font-bold text-primary">
              {completionRate.toFixed(0)}%
            </span>
          </div>
          <Progress value={completionRate} className="h-2 bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  );
};

interface StatItemProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

function StatItem({ label, value, icon }: StatItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gray-800 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-300">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
