from sqlalchemy import Column, Integer, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database configuration
DATABASE_URL = "postgresql://isaac_arum:ElJnGAiPv3ptAJEjvZXbDnpWeOg4s7P0@dpg-ctt3gn8gph6c738fiobg-a.oregon-postgres.render.com/portfolio_database_lzl5"  
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


class Work(Base):
    __tablename__ = "recent"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image_path = Column(String, nullable=True)


class Research(Base):
    __tablename__ = "research"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)
    video = Column(String, nullable=True)
    image_path = Column(String, nullable=True)

class Tutorial(Base):
    __tablename__ = "tutorials"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)
    video = Column(String, nullable=False)


class PersonalWork(Base):
    __tablename__ = "personal_works"
    id = Column(Integer, primary_key=True, index=True)
    header = Column(String, nullable=False)
    project_type = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    tools_used = Column(String, nullable=True)
    video_content = Column(String, nullable=True)
    github_links = Column(Text, nullable=True)  # Changed ARRAY(String) to Text for compatibility


class AboutMe(Base):
    __tablename__ = "about_me"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text, nullable=True)


class Introduction(Base):
    __tablename__ = "introduction"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(Text, nullable=True)

# Create all tables in the database
Base.metadata.create_all(bind=engine)
