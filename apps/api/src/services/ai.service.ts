import axios from "axios";

export const fetchAiRecommendation = async (quizData: any) => {
  try {
    const aiApiUrl = process.env.AI_API_URL || "http://localhost:5000/api/data";
    const response = await axios.post(
      aiApiUrl,
      quizData
    );
    return response.data;
  } catch (err) {
    console.error("AI Recommendation error:", err);
    throw new Error("Failed to get AI recommendation");
  }
};
