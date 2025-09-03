from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings and configuration."""
    
    # API Configuration
    api_title: str = "Quiz Recommendation API"
    api_description: str = "API to recommend easy and hard questions per topic based on mastery and progress"
    api_version: str = "1.0.0"
    
    # Server Configuration
    host: str = "localhost"
    port: int = 8000
    debug: bool = True
    
    # Recommendation Algorithm Configuration
    high_mastery_threshold: float = 0.7
    medium_mastery_threshold: float = 0.4
    excellent_performance_threshold: float = 0.8
    poor_performance_threshold: float = 0.3
    
    # Preference calculation factors
    high_mastery_base_preference: float = 0.3
    high_mastery_difficulty_weight: float = 0.7
    medium_mastery_base_preference: float = 0.4
    medium_mastery_difficulty_weight: float = 0.4
    low_mastery_base_preference: float = 0.8
    low_mastery_difficulty_weight: float = 0.6
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Global settings instance
settings = Settings()
