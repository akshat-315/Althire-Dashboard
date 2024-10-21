"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  InterviewInterface,
  InterviewListData,
  InterviewStatsProp,
  StatsInterface,
} from "@/types/interviewTypes";
import {
  BarChart2Icon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

type CompletionRate = number;

export const InterviewStats: React.FC<InterviewStatsProp> = ({
  interviewList,
}) => {
  const [completionRate, setCompletionRate] = useState<CompletionRate | 0>(0);
  const [interviewStats, setInterviewStats] = useState<StatsInterface | null>(
    null
  );

  console.log("InterviewListData in InterviewStats: ", interviewList);

  async function calculateInterviewStats(interviewList: InterviewListData) {
    const stats: StatsInterface = {
      totalInterviews: 0,
      processed: 0,
      pending: 0,
      avgScore: 0,
    };
    stats.totalInterviews = interviewList.interviews_list.length;
    interviewList.interviews_list.forEach((interview: InterviewInterface) => {
      if (interview.finished_interview_data.length > 0) {
        stats.avgScore += interview.finished_interview_data[0].evaluation.score;
      }
      interview.status == "processed" ? stats.processed++ : stats.pending++;
    });
    return stats;
  }

  useEffect(() => {
    if (interviewList) {
      const fetchData = async () => {
        const data = await calculateInterviewStats(interviewList);
        setInterviewStats(data);
      };
      fetchData();
    }
  }, [interviewList]);

  useEffect(() => {
    console.log("InterviewStats: ", interviewStats);
    const totalInterviews = interviewStats?.totalInterviews ?? 0;
    const processedInterviews = interviewStats?.processed ?? 0;
    const rate: CompletionRate = (processedInterviews / totalInterviews) * 100;
    setCompletionRate(rate);
  }, [interviewStats]);

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
            value={interviewStats?.totalInterviews ?? 0}
            icon={<BarChart2Icon className="w-5 h-5 text-blue-400" />}
          />
          <StatItem
            label="Completed"
            value={interviewStats?.processed ?? 0}
            icon={<CheckCircleIcon className="w-5 h-5 text-green-400" />}
          />
          <StatItem
            label="Upcoming"
            value={interviewStats?.pending ?? 0}
            icon={<ClockIcon className="w-5 h-5 text-yellow-400" />}
          />
          <StatItem
            label="Average Score"
            value={interviewStats?.avgScore ?? 0}
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
