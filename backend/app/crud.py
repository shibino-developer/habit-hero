from sqlmodel import select, Session
from .models import Habit, CheckIn
from .schemas import HabitCreate, CheckInCreate
from .database import engine
from datetime import date
from collections import Counter


def create_habit(habit_in: HabitCreate) -> Habit:
    with Session(engine) as session:
        habit = Habit.from_orm(habit_in)
        session.add(habit)
        session.commit()
        session.refresh(habit)
        return habit


def get_habits():
    with Session(engine) as session:
        return session.exec(select(Habit)).all()


def get_habit(habit_id: int):
    with Session(engine) as session:
        return session.get(Habit, habit_id)


def add_checkin(habit_id: int, checkin_in: CheckInCreate):
    with Session(engine) as session:
        checkin = CheckIn(habit_id=habit_id, date=checkin_in.date, note=checkin_in.note)
        session.add(checkin)
        session.commit()
        session.refresh(checkin)
        return checkin


def get_checkins_for_habit(habit_id: int):
    with Session(engine) as session:
        habit = session.get(Habit, habit_id)
        return habit.check_ins if habit else []


# Simple analytics helpers
def habit_stats(habit_id: int):
    with Session(engine) as session:
        habit = session.get(Habit, habit_id)
        if not habit:
            return None
        dates = sorted([c.date for c in habit.check_ins])
        total_days = (date.today() - habit.start_date).days + 1
        success_count = len(dates)
        success_rate = round(success_count / total_days * 100, 2) if total_days > 0 else 0

        # Streak calculation
        streak = 0
        best_streak = 0
        last = None
        for d in dates:
            if last is None:
                streak = 1
            else:
                if (d - last).days == 1:
                    streak += 1
                else:
                    streak = 1
            last = d
            best_streak = max(best_streak, streak)

        # Best day of the week
        dow = Counter([d.weekday() for d in dates])  # 0=Monday
        best_day = dow.most_common(1)[0][0] if dow else None

        return {
            "total_days": total_days,
            "success_count": success_count,
            "success_rate": success_rate,
            "best_streak": best_streak,
            "best_day": best_day
        }
