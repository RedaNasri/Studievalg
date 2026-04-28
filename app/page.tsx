'use client'
import { useState, useRef, useEffect } from 'react'
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

const byer = [
  'Oslo', 'Bergen', 'Trondheim', 'Tromsø', 'Stavanger',
  'Kristiansand', 'Ålesund', 'Bodø', 'Gjøvik', 'Lillehammer',
  'Drammen', 'Sogndal', 'Levanger', 'Haugesund', 'Molde',
  'Narvik', 'Alta', 'Åmot', 'Ås', 'Bærum', 'Elverum',
  'Fredrikstad', 'Gol', 'Grimstad', 'Hamar', 'Harstad',
  'Horten', 'Indre Østfold', 'Kongsvinger', 'Larvik', 'Lillestrøm',
  'Mo i Rana', 'Namsos', 'Notodden', 'Orkland', 'Porsgrunn',
  'Ringerike', 'Sør-Varanger', 'Stord', 'Sunnfjord', 'Volda'
]

function Dropdown({ label, options, valgte, toggle, nullstill }: {
  label: string
  options: string[]
  valgte: string[]
  toggle: (v: string) => void
  nullstill: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${
          valgte.length > 0
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300'
        }`}
      >
        {label} {valgte.length > 0 && <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">{valgte.length}</span>}
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 w-64 max-h-72 overflow-y-auto">
          {valgte.length > 0 && (
            <button onClick={nullstill} className="text-xs text-red-400 hover:text-red-600 mb-2 block">
              Nullstill
            </button>
          )}
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                valgte.includes(opt)
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                valgte.includes(opt) ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300'
              }`}>
                {valgte.includes(opt) ? '✓' : ''}
              </span>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function getStatus(snitt: number, grense: number) {
  const margin = snitt - grense
  if (margin >= 3) return { label: 'God sjanse', color: 'bg-green-100 text-green-700', order: 0 }
  if (margin >= 0) return { label: 'Mulig', color: 'bg-yellow-100 text-yellow-700', order: 1 }
  return { label: 'Under grensen', color: 'bg-red-100 text-red-600', order: 2 }
}

export default function Home() {
  const [snitt, setSnitt] = useState('')
  const [valgteFag, setValgteFag] = useState<string[]>([])
  const [valgteByer, setValgteByer] = useState<string[]>([])
  const [resultater, setResultater] = useState<any[]>([])
  const [laster, setLaster] = useState(false)
  const [sokt, setSokt] = useState(false)

  function toggleFag(fag: string) {
    setValgteFag(prev =>
      prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]
    )
  }

  function toggleBy(by: string) {
    setValgteByer(prev =>
      prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by]
    )
  }

  async function finnStudier() {
    if (!snitt) return
    setLaster(true)
    setSokt(true)
    let query = supabase
      .from('studier')
      .select('*')
      .order('cutoff_score', { ascending: false })
    if (valgteFag.length > 0) {
      query = query.in('fagomraade', valgteFag)
    }
    if (valgteByer.length > 0) {
      query = query.in('location', valgteByer)
    }
    const { data } = await query
    const snitttall = parseFloat(snitt)
    const sorted = (data || [])
      .map(s => ({ ...s, status: getStatus(snitttall, s.cutoff_score) }))
      .sort((a, b) => a.status.order - b.status.order)
    setResultater(sorted)
    setLaster(false)
  }

  const snitttall = parseFloat(snitt)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-700 mb-3">Studievalg</h1>
          <p className="text-xl text-gray-500">Finn studier basert på karaktersnittet ditt</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="number"
              placeholder="Karaktersnitt, f.eks. 52.4"
              value={snitt}
              onChange={e => setSnitt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && finnStudier()}
              className="border border-gray-200 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-56"
            />
            <Dropdown
              label="By"
              options={byer}
              valgte={valgteByer}
              toggle={toggleBy}
              nullstill={() => setValgteByer([])}
            />
            <Dropdown
              label="Fagområde"
              options={fagomraader}
              valgte={valgteFag}
              toggle={toggleFag}
              nullstill={() => setValgteFag([])}
            />
            <button
              onClick={finnStudier}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
            >
              Søk
            </button>
          </div>
        </div>

        {laster && <div className="text-center text-gray-400 py-8">Laster...</div>}

        {sokt && !laster && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4 text-yellow-800 text-sm">
              Dette er basert på tidligere poenggrenser. Poenggrenser varierer fra år til år og er ikke en garanti.
            </div>
            <p className="text-gray-500 mb-4 text-sm">{resultater.length} studier funnet</p>
          </>
        )}

        <div className="space-y-3">
          {resultater.map(s => {
            const margin = snitttall - s.cutoff_score
            return (
              <div key={s.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-semibold text-lg text-gray-800">{s.study_name}</h2>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.status.color}`}>
                        {s.status.label}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{s.university} – {s.location}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-500">Poenggrense: <strong className="text-gray-700">{s.cutoff_score}</strong></span>
                      <span className="text-gray-500">Dine poeng: <strong className="text-gray-700">{snitttall}</strong></span>
                      <span className={margin >= 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
                        {margin >= 0 ? '+' : ''}{margin.toFixed(1)} poeng
                      </span>
                    </div>
                    <span className="inline-block mt-2 bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">{s.fagomraade}</span>
                  </div>
                  
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap"
                  >
                    Les mer →
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
