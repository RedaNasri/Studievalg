'use client'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [valg, setValg] = useState<'start' | 'vgs' | 'bachelor'>('start')

  if (valg === 'vgs') return <VGSSide tilbake={() => setValg('start')} />
  if (valg === 'bachelor') return <BachelorSide tilbake={() => setValg('start')} />

  return (
    <main className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full mx-auto py-16 text-center">
        <h1 className="text-5xl font-bold text-[var(--ink)] mb-4 tracking-tight">Studie<span className="text-[var(--accent)]">Match</span></h1>
        <p className="text-lg text-[var(--ink-2)] mb-12 max-w-xl mx-auto leading-relaxed">
          Skriv inn snittet ditt eller bacheloren din – og se hva du kan studere
        </p>
        <p className="text-[var(--ink)] font-semibold mb-6 text-lg">Hva passer deg best?</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
          <button onClick={() => setValg('vgs')} className="bg-white border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)] hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)] hover:-translate-y-0.5 transition text-left group">
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Jeg går på VGS</h2>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">Se hvilke bachelorstudier du kan komme inn på med snittet ditt</p>
            <div className="mt-4 text-[var(--accent)] text-sm font-semibold group-hover:translate-x-1 transition-transform">Kom i gang →</div>
          </button>
          <button onClick={() => setValg('bachelor')} className="bg-white border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)] hover:shadow-[0_8px_24px_rgba(13,27,42,0.08)] hover:-translate-y-0.5 transition text-left group">
            <div className="text-4xl mb-3">🎓</div>
            <h2 className="text-xl font-bold text-[var(--ink)] mb-2">Jeg har en bachelor</h2>
            <p className="text-[var(--ink-2)] text-sm leading-relaxed">Se hvilke masterprogram bacheloren din kan kvalifisere deg til</p>
            <div className="mt-4 text-[var(--accent)] text-sm font-semibold group-hover:translate-x-1 transition-transform">Kom i gang →</div>
          </button>
        </div>
        <p className="text-[var(--ink-3)] text-xs max-w-md mx-auto leading-relaxed">
          Resultatene er veiledende og basert på tidligere poenggrenser og tilgjengelige opptakskrav. Sjekk alltid lærestedets egne sider før du søker.
        </p>
      </div>
    </main>
  )
}

const fagomraader = ['Medisin','Psykologi','Sykepleie','Fysioterapi','Tannhelse','Farmasi','Bioingeniør','Annen helse','Data og IT','Kunstig intelligens','Cybersikkerhet','Ingeniør','Økonomi','Markedsføring','Regnskap','Jus','Lærer','Statsvitenskap','Sosiologi','Samfunnsfag','Kunst og design','Musikk','Film og media','Journalistikk','Språk','Realfag','Matematikk','Idrett','Annet']

const byer = ['Oslo','Bergen','Trondheim','Tromsø','Stavanger','Kristiansand','Ålesund','Bodø','Gjøvik','Lillehammer','Drammen','Sogndal','Levanger','Haugesund','Molde','Narvik','Alta','Åmot','Ås','Bærum','Elverum','Fredrikstad','Gol','Grimstad','Hamar','Harstad','Horten','Indre Østfold','Kongsvinger','Larvik','Lillestrøm','Mo i Rana','Namsos','Notodden','Orkland','Porsgrunn','Ringerike','Sør-Varanger','Stord','Sunnfjord','Volda']

const masterFagomraader = ['Økonomi','Jus','Psykologi','Informatikk','Ingeniør','Samfunnsfag','Helse','Pedagogikk','Media','Realfag','Idrett','Kunst','Språk']
const masterByer = ['Oslo','Bergen','Trondheim','Tromsø','Stavanger','Kristiansand']

function PageHeader({ tilbake, undertekst }: { tilbake: () => void, undertekst: string }) {
  return (
    <>
      <button onClick={tilbake} className="text-[var(--accent)] text-sm mb-6 hover:text-[var(--accent-hover)] hover:underline font-medium">← Tilbake</button>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--ink)] mb-2 tracking-tight">Studie<span className="text-[var(--accent)]">Match</span></h1>
        <p className="text-[var(--ink-2)]">{undertekst}</p>
      </div>
    </>
  )
}

function Label({ text, hint }: { text: string, hint: string }) {
  return (
    <div className="mb-3">
      <p className="text-[var(--ink)] font-semibold text-sm">{text}</p>
      <p className="text-[var(--ink-2)] text-sm mt-1">{hint}</p>
    </div>
  )
}

function Dropdown({ label, options, valgte, toggle, nullstill }: { label: string, options: string[], valgte: string[], toggle: (v: string) => void, nullstill: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClick(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${valgte.length > 0 ? 'border-[var(--accent)] bg-[rgba(30,58,138,0.08)] text-[var(--accent)]' : 'border-[var(--border)] bg-white text-[var(--ink-2)] hover:border-[var(--accent)]'}`}>
        {label} {valgte.length > 0 && <span className="bg-[var(--accent)] text-white text-xs rounded-full px-2 py-0.5">{valgte.length}</span>}
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 bg-white border border-[var(--border)] rounded-2xl shadow-xl p-3 w-64 max-h-72 overflow-y-auto">
          {valgte.length > 0 && <button onClick={nullstill} className="text-xs text-red-500 hover:text-red-600 mb-2 block font-medium">Nullstill</button>}
          {options.map(opt => (
            <button key={opt} onClick={() => toggle(opt)} className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition ${valgte.includes(opt) ? 'bg-[rgba(30,58,138,0.08)] text-[var(--accent)] font-medium' : 'text-[var(--ink-2)] hover:bg-[var(--bg)]'}`}>
              <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${valgte.includes(opt) ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'border-[var(--border)]'}`}>{valgte.includes(opt) ? '✓' : ''}</span>
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
  if (margin >= 3) return { label: 'God sjanse', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100', order: 0 }
  if (margin >= 0) return { label: 'Mulig', color: 'bg-amber-50 text-amber-700 border border-amber-100', order: 1 }
  return { label: 'Under grensen', color: 'bg-rose-50 text-rose-700 border border-rose-100', order: 2 }
}

const BATCH = 30

function VGSSide({ tilbake }: { tilbake: () => void }) {
  const [snitt, setSnitt] = useState('')
  const [valgteFag, setValgteFag] = useState<string[]>([])
  const [valgteByer, setValgteByer] = useState<string[]>([])
  const [resultater, setResultater] = useState<any[]>([])
  const [laster, setLaster] = useState(false)
  const [sokt, setSokt] = useState(false)
  const [kunGodSjanse, setKunGodSjanse] = useState(false)
  const [sortering, setSortering] = useState<'standard' | 'beste'>('standard')
  const [visAntall, setVisAntall] = useState(BATCH)

  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  function toggleFag(fag: string) { setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]) }
  function toggleBy(by: string) { setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by]) }

  async function finnStudier() {
    if (!snitt) return
    setLaster(true); setSokt(true); setVisAntall(BATCH)
    let query = supabase.from('studier').select('*').order('cutoff_score', { ascending: false })
    if (valgteFag.length > 0) query = query.in('fagomraade', valgteFag)
    if (valgteByer.length > 0) query = query.in('location', valgteByer)
    const { data } = await query
    const snitttall = parseFloat(snitt)
    const mapped = (data || []).map((s: any) => ({ ...s, status: getStatus(snitttall, s.cutoff_score), margin: snitttall - s.cutoff_score })).sort((a: any, b: any) => a.status.order - b.status.order)
    setResultater(mapped); setLaster(false)
  }

  const snitttall = parseFloat(snitt)
  const filtrerte = kunGodSjanse ? resultater.filter(s => s.status.label === 'God sjanse') : resultater
  const sorterteAlle = sortering === 'beste' ? [...filtrerte].sort((a, b) => b.margin - a.margin) : filtrerte
  const viste = sorterteAlle.slice(0, visAntall)
  const godSjanseAntall = resultater.filter(s => s.status.label === 'God sjanse').length
  const snittMarginTall = viste.length > 0 ? viste.reduce((sum, s) => sum + s.margin, 0) / viste.length : null

  function marginTekst(m: number) {
    if (m >= 3) return `Du ligger i snitt ${m.toFixed(1)} poeng over studiene som vises`
    if (m >= 0) return `Du ligger i snitt ${m.toFixed(1)} poeng over – det er tett!`
    return `Du ligger i snitt ${Math.abs(m).toFixed(1)} poeng under mange av disse studiene`
  }

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <PageHeader tilbake={tilbake} undertekst="Finn bachelorstudier basert på karaktersnittet ditt" />
        <div className="bg-white rounded-2xl shadow-[0_1px_2px_rgba(13,27,42,0.04),0_4px_12px_rgba(13,27,42,0.04)] border border-[var(--border)] p-6 mb-6">
          <div className="flex flex-wrap gap-8 items-start mb-6">
            <div className="flex-1 min-w-48">
              <Label text="Karaktersnitt" hint="Skriv inn karaktergjennomsnittet ditt" />
              <input type="number" placeholder="F.eks. 52.4" value={snitt} onChange={e => setSnitt(e.target.value)} onKeyDown={e => e.key === 'Enter' && finnStudier()} className="border border-[var(--border)] rounded-xl px-4 py-2 text-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] w-full" />
            </div>
            <div>
              <Label text="By" hint="Hvilken by ønsker du å studere i?" />
              <Dropdown label="Velg by" options={byer} valgte={valgteByer} toggle={toggleBy} nullstill={() => setValgteByer([])} />
            </div>
            <div>
              <Label text="Fagområde" hint="Hvilke fagområder er du interessert i?" />
              <Dropdown label="Velg fagområde" options={fagomraader} valgte={valgteFag} toggle={toggleFag} nullstill={() => setValgteFag([])} />
            </div>
          </div>
          <button onClick={finnStudier} className="w-full bg-[var(--ink)] text-white py-4 rounded-xl font-semibold text-base hover:bg-[var(--accent)] hover:shadow-[0_8px_20px_rgba(30,58,138,0.25)] hover:-translate-y-0.5 transition sticky bottom-4">Finn studier</button>
        </div>

        {laster && <div className="text-center text-[var(--ink-3)] py-8">Laster...</div>}

        {sokt && !laster && (
          <div>
            <div className="bg-[rgba(30,58,138,0.06)] border border-[rgba(30,58,138,0.18)] rounded-x
