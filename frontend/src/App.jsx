import React, { useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import CreateHabit from './components/CreateHabit'
import { fetchHabits, createHabit } from './api'

export default function App() {
  const [habits, setHabits] = useState([])

  useEffect(() => {
    loadHabits()
  }, [])

  async function loadHabits() {
    const data = await fetchHabits()
    setHabits(data)
  }

  async function handleCreate(habit) {
    await createHabit(habit)
    loadHabits()
  }

  return (
    <div className="app">
      <h1>Habit Hero</h1>
      <CreateHabit onCreate={handleCreate} />
      <Dashboard habits={habits} refresh={loadHabits} />
    </div>
  )
}
