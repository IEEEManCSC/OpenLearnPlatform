# Quiz Recommendation API

A FastAPI-based microservice that provides intelligent question recommendations based on user mastery and progress across different topics and difficulty levels.

## 🏗️ Project Structure

```
recommendation-api/
├── config/                 # Configuration and settings
│   ├── __init__.py
│   └── settings.py        # Application settings and constants
├── models/                 # Data models and schemas
│   ├── __init__.py
│   └── schemas.py         # Pydantic models for API
├── routers/               # API route handlers
│   ├── __init__.py
│   └── recommendations.py # Recommendation endpoints
├── services/              # Business logic layer
│   ├── __init__.py
│   ├── mastery_calculator.py      # Mastery calculation logic
│   ├── preference_calculator.py   # Level preference logic
│   └── recommendation_service.py  # Main recommendation engine
├── .env                   # Environment configuration (not committed)
├── package.json           # Node.js metadata (for tooling compatibility)
├── recommender.py         # FastAPI application instance
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## 🚀 Features

- **Intelligent Question Distribution**: Distributes questions across topics based on user mastery levels
- **Adaptive Difficulty**: Recommends appropriate difficulty levels based on performance
- **Performance-Based Adjustments**: Fine-tunes recommendations based on specific level performance
- **Capacity Management**: Handles cases where requested questions exceed available capacity
- **Comprehensive API Documentation**: Auto-generated docs via FastAPI

## 📊 Algorithm Overview

### 1. Mastery Calculation

- Calculates weighted mastery scores where harder levels contribute more
- Uses solved/attempted ratios with difficulty-based weighting

### 2. Topic Distribution

- Assigns more questions to topics with lower mastery (inverse weighting)
- Ensures balanced learning across weak areas

### 3. Level Preference

- **High Mastery (≥70%)**: Prefers harder levels
- **Medium Mastery (40-70%)**: Balanced distribution with slight preference for medium-hard
- **Low Mastery (<40%)**: Strongly prefers easier levels

### 4. Performance Adjustments

- **Excellent Performance (>80%)**: Reduces preference for that level
- **Poor Performance (<30%)**: Increases preference, especially for easier levels

## 🔧 Configuration

The application uses `pydantic-settings` for configuration management. Configuration can be set via environment variables or a `.env` file.

## 📝 API Endpoints

### GET `/`

Root endpoint with API information and available endpoints.

**Response:**

```json
{
  "message": "Welcome to the Quiz Recommendation API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

### POST `/api/data`

Generate question recommendations based on user data.

**Request Body:**

```json
{
  "userId": 1,
  "totalQuestions": 10,
  "userTopics": [
    {
      "topic": "Math",
      "available": [
        {"level": 1, "count": 20},
        {"level": 3, "count": 10}
      ]
    }
  ],
  "userProgress": [
    {
      "topic": "Math",
      "progressByLevel": [
        {"level": 1, "solved": 8, "attempted": 10},
        {"level": 3, "solved": 3, "attempted": 5}
      ]
    }
  ]
}
```

**Response:**

```json
{
  "topics": [
    {
      "name": "Math",
      "recommendations": [
        {"level": 1, "count": 6},
        {"level": 3, "count": 4}
      ]
    }
  ],
  "adjustment": {
    "requestedQuestions": 10,
    "availableQuestions": 30,
    "actualQuestions": 10,
    "message": "Successfully allocated all requested questions."
  }
}
```

## 🛠️ Installation & Setup

1. **Create and activate a virtual environment (recommended):**

   ```bash
   python -m venv myenv
   # On Windows:
   myenv\Scripts\activate
   # On Linux/Mac:
   source myenv/bin/activate
   ```

2. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment (optional):**
   Create a `.env` file in the project root to override default settings.

4. **Run the Application:**

   ```bash
   # For development (with auto-reload) - RECOMMENDED
   python recommender.py
   ```

5. **Access Documentation:**
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

## 🧪 Development

### Project Architecture

- **`recommender.py`**: Main FastAPI application instance with route registration
- **`config/`**: Application settings and configuration management
- **`models/`**: Pydantic schemas for request/response validation
- **`routers/`**: API endpoint definitions and route handlers
- **`services/`**: Core business logic and recommendation algorithms

### Code Organization Principles

1. **Separation of Concerns**: Each module has a single responsibility
2. **Dependency Injection**: Services are injected rather than instantiated
3. **Type Safety**: Comprehensive type hints throughout
4. **Documentation**: Clear docstrings and comments
5. **Testability**: Easy to unit test individual components

### Adding New Features

1. **Models**: Add new schemas to `models/schemas.py`
2. **Business Logic**: Add services to `services/` directory
3. **API Routes**: Add endpoints to `routers/` directory
4. **Configuration**: Add settings to `config/settings.py`

## 🔍 Monitoring

The API includes built-in documentation and metrics for monitoring service status.

## 📈 Performance Considerations

- **Lightweight**: Minimal dependencies and optimized calculations
- **Scalable**: Stateless design suitable for horizontal scaling
- **Fast**: Efficient algorithms with O(n) complexity for most operations

## 🤝 Contributing

When contributing to this codebase:

1. Follow the established project structure
2. Add comprehensive docstrings to new functions
3. Include type hints for all parameters and return values
4. Write unit tests for new functionality
5. Update this README for significant changes
