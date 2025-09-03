
  // ================== Calendar ==================
  export interface QuizCalendarDay {
    day: number;
    hasSubmission: boolean;
    score: number | null;
  }
  
  export interface QuizCalendar {
    year: number;
    month: number;
    days: QuizCalendarDay[];
  }
  
  // ================== Daily Quiz ==================
  export interface QuizInfo {
    id: string;
    userId: string;
    date: string;
    totalQuestions: number;
    submittedAt: string | null;
    score: number | null;
  }
  
  export interface QuizQuestion {
    id: string;
    question: string;
    choices: string[];
    difficulty: string;
    topic: string;
  }
  
  export interface QuizRecommendationTopic {
    topic: string;
    difficulty: string;
    count: number;
  }
  
  export interface QuizAIRecommendation {
    recommendedTopics: QuizRecommendationTopic[];
    reasoning: string;
  }
  
  export interface DailyQuizResponse {
    quiz: QuizInfo;
    questions: QuizQuestion[];
    aiRecommendation: QuizAIRecommendation;
  }
  
  // ================== Submit ==================
  export interface QuizAnswerSubmission {
    questionId: string;
    choiceIndex: number;
  }
  
  export interface QuizSubmitRequest {
    answers: QuizAnswerSubmission[];
  }
  
  export interface QuizAnswerResult {
    questionId: string;
    choiceIndex: number;
    isCorrect: boolean;
    correctChoiceIndex: number;
    explanation: string;
  }
  
  export interface QuizSubmitResponse {
    score: number;
    correctCount: number;
    total: number;
    answers: QuizAnswerResult[];
  }