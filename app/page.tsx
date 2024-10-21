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
      <div className="grid grid-cols-3 gap-8 justify-between">
        {/* Interview Stats on Left */}
        <div className="flex flex-col w-full max-w-lg">
          <InterviewStats interviewList={interviewList} />
          <p className="mt-4 text-gray-300 w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet nulla et commodo faucibus.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <PerformanceScore interviewList={interviewList} />

          <h3 className="text-xl font-bold mb-4">
            Performance Score Breakdown
          </h3>
          <p className="text-gray-300">
            Your performance score represents an aggregate score across key
            interview dimensions such as problem-solving, coding, verifying, and
            communication. By improving in these areas, you can achieve higher
            interview outcomes.
          </p>
        </div>
        <div className="flex justify-end h-fit">
          <PendingInterviews interviewList={interviewList} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-20 mt-20 mb-16">
        <div className="grid grid-cols-3 gap-11">
          <div className="flex flex-col col-span-2 w-full max-w-full items-center">
            <DimensionalScores />
          </div>
          <div>
            <p className="mt-4 text-gray-300">
              The Dimensional Score Card shows your performance across specific
              dimensions for each interview. These include problem-solving,
              coding, verifying, and communication.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 ">
          <div>
            <p className="mt-4 text-gray-300">
              The Temporal Performance Analysis tracks your scores over time,
              helping you visualize improvements or areas that need more focus.
            </p>
          </div>
          <div className="flex flex-col col-span-2 w-full max-w-full items-center">
            <TemporalPerformanceChart />
          </div>
        </div>
      </div>
    </div>
  );
}
