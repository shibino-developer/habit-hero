import React, { useState } from 'react'
import dayjs from 'dayjs'
import { addCheckin, fetchStats } from '../api'

export default function HabitDetails({ habit, refresh }) {
  const [note, setNote] = useState('')
  const [stats, setStats] = useState(null)

  async function handleCheckin() {
    const payload = { date: dayjs().format('YYYY-MM-DD'), note }
    await addCheckin(habit.id, payload)
    setNote('')
    refresh()
  }

  async function loadStats() {
    const s = await fetchStats(habit.id)
    setStats(s)
  }

  return (
    <div>
      <input
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Note (optional)"
      />
      <button onClick={handleCheckin}>Check-in Today</button>
      <button onClick={loadStats}>Load Stats</button>

      {stats && (
        <div>
          <p>Success rate: {stats.success_rate}%</p>
          <p>Best streak: {stats.best_streak}</p>
          <p>Best day of week: {stats.best_day}</p>
        </div>
      )}
    </div>
  )
}
