from fastapi import FastAPI
from config.settings import settings
from routers import recommendations_router

app = FastAPI(
    title=settings.api_title,
    description=settings.api_description,
    version=settings.api_version,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Include routers
app.include_router(recommendations_router)


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Welcome to the Quiz Recommendation API",
        "version": settings.api_version,
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "recommender:app",  # Use import string for reload support
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
