import axios from "axios";

export const fetchAiRecommendation = async (quizData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/data",
      quizData
    );
    return response.data;
  } catch (err) {
    console.error("AI Recommendation error:", err);
    throw new Error("Failed to get AI recommendation");
  }
};
