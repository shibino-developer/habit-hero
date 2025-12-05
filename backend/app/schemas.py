from pydantic import BaseModel
from typing import Optional, List
from datetime import date


class CheckInCreate(BaseModel):
    date: date
    note: Optional[str] = None


class CheckInRead(CheckInCreate):
    id: int


class HabitCreate(BaseModel):
    name: str
    frequency: str
    category: Optional[str] = None
    start_date: date


class HabitRead(HabitCreate):
    id: int
    check_ins: List[CheckInRead] = []
