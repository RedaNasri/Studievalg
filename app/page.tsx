'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [snitt, setSnitt] = useState('')
  const [resultater, setResultater] = useState([])
  const [laster, setLaster] = useState(false)

  async function finnStudier() {
    setLaster(true)
    const { data } = await supabase
      .from('studier')
      .select('*')
      .lte('cutoff_score', parseFloat(snitt))
      .order('cutoff_score', { ascending: false })
    setResultater(data || [])
    setLaster(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Finn studier du kommer inn på</h1>
      <p className="text-gray-500 mb-6">Skriv inn karaktersnittet ditt så finner vi matching studier</p>

      <div className="flex gap-3 mb-8">
        <input
          type="number"
          placeholder="F.eks. 52.4"
          value={snitt}
          onChange={e => setSnitt(e.target.value)}
          className="border rounded-lg px-4 py-2 w-48 text-lg"
        />
        <button
          onClick={finnStudier}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Søk
        </button>
      </div>

      {laster && <p className="text-gray-500">Laster...</p>}

      {resultater.map(s => (
        <div key={s.id} className="border rounded-lg p-4 mb-3 hover:shadow-md transition">
          <h2 className="font-semibold text-lg">{s.study_name}</h2>
          <p className="text-gray-500">{s.university} – {s.location}</p>
          <p className="text-blue-600 font-medium">Poenggrense: {s.cutoff_score}</p>
        </div>
      ))}
    </main>
  )
}