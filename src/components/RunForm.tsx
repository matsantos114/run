// components/RunForm.tsx
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function RunForm() {
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = (await supabase.auth.getUser()).data.user
    if (!user) return alert('Not signed in')

    const { error } = await supabase.from('runs').insert({
      user_id: user.id,
      date: new Date(),
      distance_km: parseFloat(distance),
      duration_minutes: parseFloat(duration),
      notes,
    })
    if (error) console.error(error)
    else alert('Run logged!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Distance (km)" value={distance} onChange={e => setDistance(e.target.value)} />
      <input placeholder="Duration (min)" value={duration} onChange={e => setDuration(e.target.value)} />
      <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <button type="submit">Save Run</button>
    </form>
  )
}