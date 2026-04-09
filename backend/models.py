from sqlalchemy import Column, Integer, String, Text
from database import Base

class Blog(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    slug = Column(String, unique=True)
    metaTitle = Column(String)
    metaDescription = Column(String)