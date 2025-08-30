import axios from "axios";
import { UserQuizData } from "../schemas/quizzes.js";

export const fetchAiRecommendation = async (quizData: UserQuizData) => {
  try {
    const aiApiUrl = process.env.AI_API_URL || "http://localhost:5000/api/data";
    const response = await axios.post(aiApiUrl, quizData);
    return response.data;
  } catch (error) {
    console.error("AI Recommendation error:", error);
    throw new Error("Failed to get AI recommendation");
  }
};
