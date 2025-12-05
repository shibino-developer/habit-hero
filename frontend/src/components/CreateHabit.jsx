import React, { useState } from 'react'

export default function CreateHabit({ onCreate }) {
  const [name, setName] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [category, setCategory] = useState('health')
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10))

  function handleSubmit(e) {
    e.preventDefault()
    onCreate({ name, frequency, category, start_date: startDate })
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Habit name"
        required
      />
      <select value={frequency} onChange={e => setFrequency(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>health</option>
        <option>work</option>
        <option>learning</option>
      </select>
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  )
}
