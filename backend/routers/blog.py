from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas

router = APIRouter()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE BLOG
@router.post("/", response_model=schemas.BlogResponse)
def create_blog(blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    new_blog = models.Blog(**blog.dict())
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog


# GET ALL BLOGS
@router.get("/", response_model=list[schemas.BlogResponse])
def get_blogs(db: Session = Depends(get_db)):
    return db.query(models.Blog).all()


# GET BLOG BY SLUG
@router.get("/{slug}", response_model=schemas.BlogResponse)
def get_blog(slug: str, db: Session = Depends(get_db)):
    return db.query(models.Blog).filter(models.Blog.slug == slug).first()


# DELETE BLOG
@router.delete("/{id}")
def delete_blog(id: int, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    db.delete(blog)
    db.commit()
    return {"message": "Deleted"}

@router.put("/api/blogs/{id}")
def update_blog(id: int, blog: schemas.BlogCreate, db: Session = Depends(get_db)):
    db_blog = db.query(models.Blog).filter(models.Blog.id == id).first()

    if not db_blog:
        return {"error": "Blog not found"}

    db_blog.title = blog.title
    db_blog.content = blog.content
    db_blog.slug = blog.slug
    db_blog.metaTitle = blog.metaTitle
    db_blog.metaDescription = blog.metaDescription

    db.commit()
    db.refresh(db_blog)

    return db_blog