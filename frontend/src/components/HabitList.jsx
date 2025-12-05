import axios from "axios";
import { useEffect, useState } from "react";

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  async function load() {
    const res = await axios.get("http://localhost:8000/habits");
    setHabits(res.data);
  }

  useEffect(() => { load(); }, []);

  return (
    <ul>
      {habits.map(h => (
        <li key={h.id}>{h.name} — {h.frequency}</li>
      ))}
    </ul>
  );
}
