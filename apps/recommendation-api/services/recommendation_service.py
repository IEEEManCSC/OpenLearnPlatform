from typing import List, Optional, Tuple
from models.schemas import (
    UserData, UserTopic, UserProgress, Available,
    RecommendationResponse, TopicRecommendation, LevelRecommendation, AdjustmentInfo
)
from services.mastery_calculator import MasteryCalculator
from services.preference_calculator import LevelPreferenceCalculator


class QuestionDistributor:
    """Handles question distribution logic across topics and levels."""
    
    def __init__(self):
        self.mastery_calculator = MasteryCalculator()
    
    def calculate_topic_weights(self, user_data: UserData) -> Tuple[List[float], List[float]]:
        """
        Calculate mastery levels and weights for all topics.
        
        Topics with lower mastery get higher weights (more questions).
        
        Args:
            user_data: Complete user data
            
        Returns:
            Tuple of (mastery_levels, weights)
        """
        mastery_levels = []
        for topic_info in user_data.userTopics:
            progress = self._find_progress_for_topic(user_data.userProgress, topic_info.topic)
            mastery = self.mastery_calculator.calculate_topic_mastery(progress, topic_info.available)
            mastery_levels.append(mastery)

        # Calculate weights (inverse of mastery - topics with lower mastery get more questions)
        weights = [1 - mastery for mastery in mastery_levels]
        return mastery_levels, weights
    
    def calculate_capacity_constraints(self, user_data: UserData) -> Tuple[int, int, bool]:
        """
        Calculate total available questions and apply capacity constraints.
        
        Args:
            user_data: Complete user data
            
        Returns:
            Tuple of (total_available, effective_total_questions, questions_reduced)
        """
        total_available = sum(
            sum(level.count for level in topic.available)
            for topic in user_data.userTopics
        )
        
        effective_total_questions = min(user_data.totalQuestions, total_available)
        questions_reduced = user_data.totalQuestions > total_available
        
        return total_available, effective_total_questions, questions_reduced
    
    @staticmethod
    def _find_progress_for_topic(progress_list: List[UserProgress], topic: str) -> Optional[UserProgress]:
        """Find progress data for a specific topic."""
        return next((p for p in progress_list if p.topic == topic), None)


class RecommendationEngine:
    """Main recommendation engine that orchestrates the recommendation process."""
    
    def __init__(self):
        self.distributor = QuestionDistributor()
        self.preference_calculator = LevelPreferenceCalculator()
    
    def generate_recommendations(self, user_data: UserData) -> RecommendationResponse:
        """
        Generate question recommendations based on user data.
        
        Process:
        1. Calculate capacity constraints
        2. Calculate topic mastery and weights
        3. Distribute questions across topics
        4. Distribute questions across levels within each topic
        5. Handle remaining questions
        
        Args:
            user_data: Complete user data
            
        Returns:
            Recommendation response with topic-level recommendations
        """
        # Step 1: Calculate capacity constraints
        total_available, effective_total_questions, questions_reduced = (
            self.distributor.calculate_capacity_constraints(user_data)
        )
        
        # Step 2: Calculate mastery and weights
        mastery_levels, weights = self.distributor.calculate_topic_weights(user_data)
        total_weight = sum(weights) if sum(weights) > 0 else len(weights)
        
        # Step 3: Generate topic recommendations
        topics_output = []
        for topic_info, weight, mastery in zip(user_data.userTopics, weights, mastery_levels):
            topic_recommendation = self._generate_topic_recommendation(
                topic_info, weight, mastery, effective_total_questions, total_weight, user_data
            )
            topics_output.append(topic_recommendation)
        
        # Step 4: Prepare response
        response = RecommendationResponse(topics=topics_output)
        
        # Always include adjustment information
        actual_questions = sum(
            sum(rec.count for rec in topic.recommendations) 
            for topic in topics_output
        )
        
        if questions_reduced:
            response.adjustment = AdjustmentInfo(
                requestedQuestions=user_data.totalQuestions,
                availableQuestions=total_available,
                actualQuestions=actual_questions,
                message=f"Requested {user_data.totalQuestions} questions but only {total_available} available. "
                       f"Recommendations based on {actual_questions} questions."
            )
        else:
            response.adjustment = AdjustmentInfo(
                requestedQuestions=user_data.totalQuestions,
                availableQuestions=total_available,
                actualQuestions=actual_questions,
                message="Successfully allocated all requested questions."
            )
        
        return response
    
    def _generate_topic_recommendation(self, topic_info: UserTopic, weight: float, mastery: float,
                                     effective_total_questions: int, total_weight: float,
                                     user_data: UserData) -> TopicRecommendation:
        """Generate recommendations for a single topic."""
        topic_total = round(effective_total_questions * (weight / total_weight))
        
        progress = self.distributor._find_progress_for_topic(user_data.userProgress, topic_info.topic)
        level_recommendations = self._distribute_questions_across_levels(
            topic_info, progress, mastery, topic_total
        )
        
        return TopicRecommendation(
            name=topic_info.topic,
            recommendations=level_recommendations
        )
    
    def _distribute_questions_across_levels(self, topic_info: UserTopic, progress: Optional[UserProgress],
                                          mastery: float, topic_total: int) -> List[LevelRecommendation]:
        """Distribute questions across difficulty levels for a topic."""
        level_recommendations = []
        sorted_available = sorted(topic_info.available, key=lambda x: x.level)
        remaining_questions = topic_total
        
        for available_level in sorted_available:
            if remaining_questions <= 0:
                break
                
            level_questions = self._calculate_level_questions(
                available_level, topic_info.available, progress, mastery, remaining_questions
            )
            
            if level_questions > 0:
                level_recommendations.append(
                    LevelRecommendation(level=available_level.level, count=level_questions)
                )
                remaining_questions -= level_questions
        
        # Distribute any remaining questions
        self._distribute_remaining_questions(level_recommendations, topic_info.available, remaining_questions)
        
        return level_recommendations
    
    def _calculate_level_questions(self, available_level: Available, all_levels: List[Available],
                                 progress: Optional[UserProgress], mastery: float,
                                 remaining_questions: int) -> int:
        """Calculate number of questions for a specific level."""
        level_difficulty = self.preference_calculator.calculate_level_difficulty(
            available_level.level, all_levels
        )
        
        base_preference = self.preference_calculator.calculate_base_preference(mastery, level_difficulty)
        
        level_progress = None
        if progress:
            level_progress = next(
                (p for p in progress.progressByLevel if p.level == available_level.level), None
            )
        
        final_preference = self.preference_calculator.adjust_for_level_performance(
            base_preference, level_progress, level_difficulty
        )
        
        level_questions = round(remaining_questions * final_preference)
        return min(level_questions, available_level.count, remaining_questions)
    
    @staticmethod
    def _distribute_remaining_questions(level_recommendations: List[LevelRecommendation],
                                      available_levels: List[Available], remaining_questions: int):
        """Distribute any remaining questions to available levels."""
        while remaining_questions > 0 and level_recommendations:
            for rec in level_recommendations:
                if remaining_questions <= 0:
                    break
                    
                available_level = next(l for l in available_levels if l.level == rec.level)
                if rec.count < available_level.count:
                    rec.count += 1
                    remaining_questions -= 1
