from typing import List, Optional
from models.schemas import Available, UserProgress, ProgressByLevel
from config.settings import settings


class MasteryCalculator:
    """Handles mastery calculation logic for topics and levels."""
    
    @staticmethod
    def calculate_topic_mastery(progress_data: Optional[UserProgress], 
                               available_levels: List[Available]) -> float:
        """
        Calculate mastery level for a topic based on weighted performance.
        
        Higher difficulty levels contribute more to the overall mastery score.
        
        Args:
            progress_data: User progress data for the topic
            available_levels: Available difficulty levels for the topic
            
        Returns:
            Mastery score between 0.0 and 1.0
        """
        if not progress_data or not progress_data.progressByLevel:
            return 0.0

        if not available_levels:
            return 0.0

        max_level = max(level.level for level in available_levels)
        weighted_solved = 0
        weighted_attempted = 0

        for progress in progress_data.progressByLevel:
            # Weight based on difficulty level - harder levels contribute more to mastery
            difficulty_weight = progress.level / max_level
            weighted_solved += progress.solved * difficulty_weight
            weighted_attempted += progress.attempted * difficulty_weight

        if weighted_attempted == 0:
            return 0.0

        return weighted_solved / weighted_attempted
    
    @staticmethod
    def calculate_level_mastery(level_progress: Optional[ProgressByLevel]) -> float:
        """
        Calculate mastery for a specific difficulty level.
        
        Args:
            level_progress: Progress data for the specific level
            
        Returns:
            Mastery score between 0.0 and 1.0
        """
        if not level_progress or level_progress.attempted == 0:
            return 0.0
            
        return level_progress.solved / level_progress.attempted
