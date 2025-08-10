from fastapi import APIRouter
from models.schemas import UserData, RecommendationResponse
from services.recommendation_service import RecommendationEngine

router = APIRouter(prefix="/api", tags=["recommendations"])

# Initialize the recommendation engine
recommendation_engine = RecommendationEngine()


@router.post(
    "/data",
    response_model=RecommendationResponse,
    summary="Recommend questions",
    description="Distributes total questions across topics and recommends questions by level based on mastery and progress"
)
async def recommend_questions(data: UserData) -> RecommendationResponse:
    """
    Generate question recommendations based on user data.
    
    This endpoint analyzes user progress and mastery levels to recommend
    an optimal distribution of questions across topics and difficulty levels.
    
    The recommendation algorithm:
    1. Calculates mastery for each topic based on weighted performance
    2. Distributes questions inversely to mastery (more questions for weaker topics)
    3. Within each topic, distributes questions based on level preference
    4. Adjusts recommendations based on specific level performance
    
    Args:
        data: User data including topics, progress, and total questions needed
        
    Returns:
        Structured recommendations with topic and level breakdowns
    """
    return recommendation_engine.generate_recommendations(data)
