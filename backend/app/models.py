from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import date


class CheckIn(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    habit_id: int = Field(foreign_key="habit.id")
    date: date
    note: Optional[str] = None

    # Define relationship back to Habit
    habit: Optional["Habit"] = Relationship(back_populates="check_ins")


class Habit(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    frequency: str   # daily | weekly
    category: Optional[str] = None
    start_date: date

    # One-to-many relationship
    check_ins: List[CheckIn] = Relationship(back_populates="habit")
