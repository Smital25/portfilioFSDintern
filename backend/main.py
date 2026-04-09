from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine
from routers import blog
import uvicorn




models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (VERY IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ROUTES
app.include_router(blog.router, prefix="/api/blogs", tags=["Blogs"])


@app.get("/")
def root():
    return {"message": "Backend Running 🚀"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)