const API_BASE = 'http://localhost:8000'

export async function fetchHabits() {
  const response = await fetch(`${API_BASE}/habits`)
  return response.json()
}

export async function createHabit(payload) {
  const response = await fetch(`${API_BASE}/habits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return response.json()
}

export async function addCheckin(habitId, payload) {
  const response = await fetch(`${API_BASE}/habits/${habitId}/checkins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  return response.json()
}

export async function fetchStats(habitId) {
  const response = await fetch(`${API_BASE}/habits/${habitId}/stats`)
  return response.json()
}
