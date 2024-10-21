"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClockIcon, UserIcon, LinkIcon } from "lucide-react";
import {
  InterviewInterface,
  InterviewListData,
  InterviewStatsProp,
  PendingInterviewInterface,
} from "@/types/interviewTypes";
import { useEffect, useState } from "react";

interface PendingInterview {
  id: string;
  expiryTime: string;
  link: string;
  interviewer: string;
}

const pendingInterviews: PendingInterview[] = [
  {
    id: "INT-001",
    expiryTime: "2023-06-15T14:00:00Z",
    link: "https://meet.althire.ai/int-001",
    interviewer: "Alice Johnson",
  },
  {
    id: "INT-002",
    expiryTime: "2023-06-16T10:30:00Z",
    link: "https://meet.althire.ai/int-002",
    interviewer: "Bob Smith",
  },
  {
    id: "INT-003",
    expiryTime: "2023-06-17T16:45:00Z",
    link: "https://meet.althire.ai/int-003",
    interviewer: "Carol Davis",
  },
];

export const PendingInterviews: React.FC<InterviewStatsProp> = ({
  interviewList,
}) => {
  const [pendingInterviews, setPendingInterviews] = useState<
    PendingInterviewInterface[]
  >([]);

  function convertEpochTime(epochTime: number) {
    const date = new Date(epochTime * 1000);

    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }

  async function getPendingInterviews(interviewList: InterviewListData) {
    const pending = interviewList.interviews_list
      .filter((interview: InterviewInterface) => interview.status === "pending")
      .map((interview: InterviewInterface) => ({
        interviewId: interview.id,
        interviewerName: interview.interviewer_name,
        time: convertEpochTime(interview.interview_created_at),
      }));

    return pending;
  }

  useEffect(() => {
    if (interviewList) {
      const fetchData = async () => {
        const data = await getPendingInterviews(interviewList);
        setPendingInterviews(data);
      };
      fetchData();
    }
  }, [interviewList]);

  return (
    <Card className="w-full max-w-md bg-gray-900 border-gray-700 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-white">
          Pending Interviews
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {pendingInterviews.map((interview: PendingInterviewInterface) => (
            <div
              key={interview.interviewId}
              className="bg-gray-800 rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">
                  ID: {interview.interviewId}
                </span>
                <span className="text-sm font-medium text-yellow-400 flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {interview.time}
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <UserIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">{interview.interviewerName}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary border-primary hover:bg-primary hover:text-white"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Join Interview
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  Reschedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
