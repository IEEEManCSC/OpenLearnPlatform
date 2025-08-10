from typing import List, Optional
from models.schemas import Available, ProgressByLevel
from config.settings import settings


class LevelPreferenceCalculator:
    """Calculates preference scores for different difficulty levels based on mastery."""
    
    @staticmethod
    def calculate_level_difficulty(level: int, available_levels: List[Available]) -> float:
        """
        Calculate normalized difficulty for a level (0.0 to 1.0).
        
        Args:
            level: The difficulty level to calculate for
            available_levels: All available levels for the topic
            
        Returns:
            Normalized difficulty score (0.0 = easiest, 1.0 = hardest)
        """
        if not available_levels:
            return 0.5
            
        max_level = max(l.level for l in available_levels)
        min_level = min(l.level for l in available_levels)
        
        if max_level == min_level:
            return 0.5
            
        return (level - min_level) / (max_level - min_level)
    
    def calculate_base_preference(self, mastery: float, level_difficulty: float) -> float:
        """
        Calculate base preference based on overall mastery and level difficulty.
        
        Strategy:
        - High mastery users get harder questions
        - Low mastery users get easier questions
        - Medium mastery users get balanced distribution
        
        Args:
            mastery: Topic mastery score (0.0 to 1.0)
            level_difficulty: Normalized level difficulty (0.0 to 1.0)
            
        Returns:
            Base preference score
        """
        if mastery >= settings.high_mastery_threshold:
            # High mastery: strongly prefer harder levels
            return (settings.high_mastery_base_preference + 
                   (level_difficulty * settings.high_mastery_difficulty_weight))
        elif mastery >= settings.medium_mastery_threshold:
            # Medium mastery: slight preference for medium-hard levels
            return (settings.medium_mastery_base_preference + 
                   (level_difficulty * settings.medium_mastery_difficulty_weight))
        else:
            # Low mastery: strongly prefer easier levels
            return (settings.low_mastery_base_preference - 
                   (level_difficulty * settings.low_mastery_difficulty_weight))
    
    def adjust_for_level_performance(self, base_preference: float, 
                                   level_progress: Optional[ProgressByLevel], 
                                   level_difficulty: float) -> float:
        """
        Adjust preference based on performance at the specific level.
        
        Args:
            base_preference: Base preference calculated from overall mastery
            level_progress: Progress data for this specific level
            level_difficulty: Normalized difficulty of the level
            
        Returns:
            Adjusted preference score
        """
        if not level_progress or level_progress.attempted == 0:
            return base_preference
            
        level_mastery = level_progress.solved / level_progress.attempted
        
        if level_mastery > settings.excellent_performance_threshold:
            # Performing excellently: reduce preference but less so for higher levels
            reduction_factor = 0.8 - (level_difficulty * 0.2)
            return base_preference * reduction_factor
        elif level_mastery < settings.poor_performance_threshold:
            # Struggling: increase preference, more so for easier levels
            increase_factor = 1.2 + ((1 - level_difficulty) * 0.3)
            return base_preference * increase_factor
            
        return base_preference
