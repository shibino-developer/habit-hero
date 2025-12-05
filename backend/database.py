from sqlmodel import SQLModel, create_engine, Session

# SQLite database URL
DATABASE_URL = "sqlite:///./habit_hero.db"

# Create engine
engine = create_engine(DATABASE_URL, echo=True)

def init_db():
    """Creates the database tables if they do not already exist."""
    SQLModel.metadata.create_all(engine)

def get_session():
    """Database session dependency for FastAPI routes."""
    with Session(engine) as session:
        yield session
