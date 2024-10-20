"use client";
import { DimensionalScores } from "@/components/DimensionalScores";
import { InterviewStats } from "@/components/InterviewStats";
import { PendingInterviews } from "@/components/PendingInterviews";
import { PerformanceScore } from "@/components/PerformanceScore";
import { TemporalPerformanceChart } from "@/components/TemporalPerformanceChart";
import { ApiResponse, InterviewListData } from "@/types/interviewTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [interviewList, setInterviewList] = useState<InterviewListData | null>(
    null
  );
  const fetchInterviewData = async () => {
    try {
      let response = await fetch(
        "https://api.althire.ai/assignment/fullstack01"
      );
      if (!response.ok) {
        toast.error("Could not load Interview data");
      }
      const jsonData: ApiResponse = await response.json();
      return jsonData.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const interviewData = await fetchInterviewData();
      if (interviewData) {
        console.log("Setting data");
        setInterviewList(interviewData);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-6 text-white mx-20">
      {/* Dashboard Description */}
      <div className="my-8 text-center">
        <h2 className="text-xl font-bold mb-4">Welcome to the Dashboard</h2>
        <p className="text-gray-300">
          This dashboard provides an overview of your interview performance and
          upcoming interview schedules. You can track your progress over time,
          view dimensional breakdowns, and manage your interview appointments
          efficiently.
        </p>
      </div>
      {/* Grid Layout for Top Section */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 justify-between">
        {/* Interview Stats on Left */}
        <div className="flex flex-col w-full max-w-lg">
          <InterviewStats interviewList={interviewList} />
          <p className="mt-4 text-gray-300 w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet nulla et commodo faucibus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Score on Left */}
          <div>
            <PerformanceScore interviewList={interviewList} />
          </div>

          {/* Performance Score Description on Right */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Performance Score Breakdown
            </h3>
            <p className="text-gray-300">
              Your performance score represents an aggregate score across key
              interview dimensions such as problem-solving, coding, verifying,
              and communication. By improving in these areas, you can achieve
              higher interview outcomes.
            </p>
          </div>
        </div>

        {/* Pending Interviews on Right */}
      </div>

      {/* Grid Layout for Performance Score and Description */}
      <div className="flex justify-end">
        <PendingInterviews />
      </div>

      {/* Dimensional Scores and Temporal Performance Chart */}
      <div className="grid grid-cols-1 gap-8 my-20">
        {/* Dimensional Scores on Left */}
        <div className="grid grid-cols-1">
          {/* Dimensional Scores */}
          <div className="flex flex-col w-full max-w-full items-center">
            <DimensionalScores />
            <p className="mt-4 text-gray-300">
              The Dimensional Score Card shows your performance across specific
              dimensions for each interview. These include problem-solving,
              coding, verifying, and communication.
            </p>
          </div>
        </div>

        {/* Temporal Performance Chart on Right */}
        <div className="mt-20">
          {/* Dimensional Scores */}
          <div className="grid grid-cols-2 w-full max-w-full items-center">
            <p className="mt-4 text-gray-300">
              The Temporal Performance Analysis tracks your scores over time,
              helping you visualize improvements or areas that need more focus.
            </p>
            <TemporalPerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
}
