import { InterviewStats } from "@/components/InterviewStats";
import { PendingInterviews } from "@/components/PendingInterviews";
import { PerformanceScore } from "@/components/PerformanceScore";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>Hello world</div>
      <div className="flex">
        <div>
          <PendingInterviews />
        </div>
        <div className="flex ml-20">
          <div>
            <InterviewStats />
          </div>
          <div className="ml-12">
            <PerformanceScore />
          </div>
        </div>
      </div>
    </>
  );
}
