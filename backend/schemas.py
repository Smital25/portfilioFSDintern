from pydantic import BaseModel

class BlogCreate(BaseModel):
    title: str
    content: str
    slug: str
    metaTitle: str
    metaDescription: str


class BlogResponse(BlogCreate):
    id: int

    class Config:
        orm_mode = True