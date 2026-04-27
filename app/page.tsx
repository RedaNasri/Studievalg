'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

const fagomraader = [
  'Medisin', 'Psykologi', 'Sykepleie', 'Fysioterapi', 'Tannhelse',
  'Farmasi', 'Bioingeniør', 'Annen helse', 'Data og IT',
  'Kunstig intelligens', 'Cybersikkerhet', 'Ingeniør', 'Økonomi',
  'Markedsføring', 'Regnskap', 'Jus', 'Lærer', 'Statsvitenskap',
  'Sosiologi', 'Samfunnsfag', 'Kunst og design', 'Musikk',
  'Film og media', 'Journalistikk', 'Språk', 'Realfag', 'Matematikk',
  'Idrett', 'Annet'
]

export default function Home() {
  const [snitt, setSnitt] = useState('')
  const [valgteFag, setValgteFag] = useState<string[]>([])
  const [resultater, setResultater] = useState<any[]>([])
  const [laster, setLaster] = useState(false)
  const [sokt, setSokt] = useState(false)

  function toggleFag(fag: string) {
    setValgteFag(prev =>
      prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]
    )
  }

  async function finnStudier() {
    if (!snitt) return
    setLaster(true)
    setSokt(true)
    let query = supabase
      .from('studier')
      .select('*')
      .lte('cutoff_score', parseFloat(snitt))
      .order('cutoff_score', { ascending: false })
    if (valgteFag.length > 0) {
      query = query.in('fagomraade', valgteFag)
    }
    const { data } = await query
    setResultater(data || [])
    setLaster(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-700 mb-3">Studievalg</h1>
          <p className="text-xl text-gray-500">Finn studier du kommer inn på</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Karaktersnitt</label>
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              placeholder="F.eks. 52.4"
              value={snitt}
              onChange={e => setSnitt(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 w-full text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={finnStudier}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition whitespace-nowrap"
            >
              Søk
            </button>
          </div>
          <label className="block text-gray-700 font-semibold mb-3">Fagområde</label>
          <div className="flex flex-wrap gap-2">
            {fagomraader.map(fag => (
              <button
                key={fag}
                onClick={() => toggleFag(fag)}
                className={valgteFag.includes(fag)
                  ? 'px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white'
                  : 'px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-blue-50'
                }
              >
                {fag}
              </button>
            ))}
          </div>
          {valgteFag.length > 0 && (
            <button
              onClick={() => setValgteFag([])}
              className="mt-3 text-sm text-gray-400 hover:text-red-400"
            >
              Nullstill filter
            </button>
          )}
        </div>
        {laster && <div className="text-center text-gray-400 py-8">Laster...</div>}
        {sokt && !laster && (
          <p className="text-gray-500 mb-4 text-sm">{resultater.length} studier funnet</p>
        )}
        <div className="space-y-3">
          {resultater.map(s => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">{s.study_name}</h2>
                  <p className="text-gray-400 text-sm mt-1">{s.university} – {s.location}</p>
                  <span className="inline-block mt-2 bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">
                    {s.fagomraade}
                  </span>
                </div>
                <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                  Poenggrense: {s.cutoff_score}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}