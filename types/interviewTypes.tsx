export interface InterviewStatsProp {
  interviewList: InterviewListData | null;
}

export interface DimensionalScore {
  dimension: string;
  score: number;
  explanation: string;
}

export interface Evaluation {
  dimensional_scores: DimensionalScore[];
  is_hire: boolean;
  score: number;
  summary: string;
}

export interface FinishedInterviewData {
  chat_text: string[];
  editor_content: string;
  evaluation: Evaluation;
  qn: number;
  question: string;
}

export interface InterviewInterface {
  hours_to_expire: number;
  id: string;
  interview_created_at: number;
  interview_start_at: number;
  interview_valid_till: number;
  status: string;
  finished_interview_data: FinishedInterviewData[];
  interviewer_company: string;
  interviewer_email: string;
  interviewer_name: string;
  invitation_sent: boolean;
  is_mock: boolean;
  mock_campaign_id: string;
  mock_interview_data: object;
  project_id: string;
  resume: string;
  room_id: string;
  student_email: string;
  student_name: string;
}

export interface InterviewListData {
  campaignId: string;
  interviews_list: InterviewInterface[];
}

export interface DimensionStat {
  count: number;
  total: number;
}

export interface DimensionScore {
  [key: string]: DimensionStat;
}

export interface PerformanceScoreInterface {
  [key: string]: number;
}

export interface ApiResponse {
  code: number;
  message: string;
  data: InterviewListData;
}

export interface StatsInterface {
  totalInterviews: number;
  processed: number;
  pending: number;
  avgScore: number;
}

export interface PendingInterviewInterface {
  interviewId: string;
  interviewerName: string;
  time: string;
}

export interface DimensionalScoreInterface {
  id: string;
  dimensions: {
    [key: string]: number;
  };
}

export interface TemporalPerformanceInterface {
  id: string;
  interview_start_at: number;
  dimensions: {
    [key: string]: number;
  };
}
