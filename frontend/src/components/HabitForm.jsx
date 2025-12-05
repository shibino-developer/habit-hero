import { useState } from "react";
import axios from "axios";

export default function HabitForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("health");
  const [frequency, setFrequency] = useState("daily");
  const [startDate, setStartDate] = useState("");

  async function submit(e) {
    e.preventDefault();
    await axios.post("http://localhost:8000/habits", {
      name, category, frequency, start_date: startDate
    });
    alert("Habit Created!");
  }

  return (
    <form onSubmit={submit}>
      <input placeholder="Habit name" value={name} onChange={e => setName(e.target.value)} required />
      <select value={frequency} onChange={e => setFrequency(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <input value={category} onChange={e => setCategory(e.target.value)} />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      <button type="submit">Add Habit</button>
    </form>
  );
}
