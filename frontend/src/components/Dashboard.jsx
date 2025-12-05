import React from 'react'
import HabitDetails from './HabitDetails'

export default function Dashboard({ habits, refresh }) {
  return (
    <div>
      <h2>Your Habits</h2>
      <div className="grid">
        {habits.map(habit => (
          <div key={habit.id} className="card">
            <h3>{habit.name}</h3>
            <p>{habit.frequency} • {habit.category}</p>
            <HabitDetails habit={habit} refresh={refresh} />
          </div>
        ))}
      </div>
    </div>
  )
}
