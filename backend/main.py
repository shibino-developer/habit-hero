from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import models, schemas, crud

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Habit Hero API")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/habits/", response_model=schemas.Habit)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    return crud.create_habit(db, habit)

@app.get("/habits/", response_model=list[schemas.Habit])
def read_habits(db: Session = Depends(get_db)):
    return crud.get_habits(db)

@app.post("/checkins/", response_model=schemas.Checkin)
def create_checkin(checkin: schemas.CheckinCreate, db: Session = Depends(get_db)):
    return crud.create_checkin(db, checkin)

@app.get("/checkins/{habit_id}", response_model=list[schemas.Checkin])
def read_checkins(habit_id: int, db: Session = Depends(get_db)):
    return crud.get_checkins(db, habit_id)
