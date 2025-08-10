from pydantic import BaseModel, Field
from typing import List, Optional


class Available(BaseModel):
    """Represents available questions at a specific difficulty level."""
    level: int = Field(..., example=1, description="Difficulty level")
    count: int = Field(..., example=20, description="Number of available questions")


class UserTopic(BaseModel):
    """Represents a topic with available questions at different levels."""
    topic: str = Field(..., example="Math", description="Topic name")
    available: List[Available] = Field(
        ..., 
        example=[
            {"level": 1, "count": 20},
            {"level": 3, "count": 10}
        ],
        description="Available questions by difficulty level"
    )


class ProgressByLevel(BaseModel):
    """Represents user progress at a specific difficulty level."""
    level: int = Field(..., example=1, description="Difficulty level")
    solved: int = Field(..., example=8, description="Number of questions solved")
    attempted: int = Field(..., example=10, description="Number of questions attempted")


class UserProgress(BaseModel):
    """Represents user progress across all levels for a specific topic."""
    topic: str = Field(..., example="Math", description="Topic name")
    progressByLevel: List[ProgressByLevel] = Field(
        ..., 
        example=[
            {"level": 1, "solved": 8, "attempted": 10},
            {"level": 3, "solved": 3, "attempted": 5}
        ],
        description="Progress data by difficulty level"
    )


class UserData(BaseModel):
    """Complete user data for generating recommendations."""
    userId: int = Field(..., example=1, description="Unique user identifier")
    totalQuestions: int = Field(..., example=10, description="Total questions to recommend")
    userTopics: List[UserTopic] = Field(..., description="Available topics and questions")
    userProgress: List[UserProgress] = Field(..., description="User progress data")


class LevelRecommendation(BaseModel):
    """Represents recommendation for a specific difficulty level."""
    level: int = Field(..., description="Difficulty level")
    count: int = Field(..., description="Number of questions recommended")


class TopicRecommendation(BaseModel):
    """Represents recommendations for a specific topic."""
    name: str = Field(..., description="Topic name")
    recommendations: List[LevelRecommendation] = Field(..., description="Level-based recommendations")


class AdjustmentInfo(BaseModel):
    """Information about capacity adjustments made to recommendations."""
    requestedQuestions: int = Field(..., description="Originally requested questions")
    availableQuestions: int = Field(..., description="Total available questions")
    actualQuestions: int = Field(..., description="Actual questions recommended")
    message: str = Field(..., description="Adjustment explanation")


class RecommendationResponse(BaseModel):
    """Complete recommendation response."""
    topics: List[TopicRecommendation] = Field(..., description="Topic-based recommendations")
    adjustment: Optional[AdjustmentInfo] = Field(None, description="Capacity adjustment info")
