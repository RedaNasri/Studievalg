'use client'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [valg, setValg] = useState<'start' | 'vgs' | 'bachelor'>('start')

  if (valg === 'vgs') return <VGSSide tilbake={() => setValg('start')} />
  if (valg === 'bachelor') return <BachelorSide tilbake={() => setValg('start')} />

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full mx-auto py-16 text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-3">StudieMatch</h1>
        <p className="text-xl text-gray-500 mb-12">Finn ut hvilke studier du kan være kvalifisert for – på sekunder</p>
        <p className="text-gray-600 font-semibold mb-6 text-lg">Hva passer deg best?</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
          <button onClick={() => setValg('vgs')} className="bg-white border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg transition text-left group">
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Jeg går på VGS</h2>
            <p className="text-gray-500 text-sm">Se hvilke bachelorstudier du kan komme inn på med snittet ditt</p>
            <div className="mt-4 text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">Kom i gang →</div>
          </button>
          <button onClick={() => setValg('bachelor')} className="bg-white border-2 border-indigo-200 rounded-2xl p-8 hover:border-indigo-500 hover:shadow-lg transition text-left group">
            <div className="text-4xl mb-3">🎓</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Jeg har en bachelor</h2>
            <p className="text-gray-500 text-sm">Se hvilke masterprogram bacheloren din kan kvalifisere deg til</p>
            <div className="mt-4 text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">Kom i gang →</div>
          </button>
        </div>
        <p className="text-gray-400 text-xs max-w-md mx-auto">
          Resultatene er veiledende og basert på tidligere poenggrenser og tilgjengelige opptakskrav. Sjekk alltid lærestedets egne sider før du søker.
        </p>
      </div>
    </main>
  )
}

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

const masterFagomraader = [
  'Økonomi', 'Jus', 'Psykologi', 'Informatikk', 'Ingeniør',
  'Samfunnsfag', 'Helse', 'Pedagogikk', 'Media', 'Realfag', 'Idrett', 'Kunst', 'Språk'
]

const masterByer = ['Oslo', 'Bergen', 'Trondheim', 'Tromsø', 'Stavanger', 'Kristiansand']

function Label({ text, hint }: { text: string, hint: string }) {
  return (
    <div className="mb-3">
      <p className="text-gray-800 font-semibold text-sm">{text}</p>
      <p className="text-gray-600 text-sm mt-1">{hint}</p>
    </div>
  )
}

function Dropdown({ label, options, valgte, toggle, nullstill, color = 'blue' }: {
  label: string
  options: string[]
  valgte: string[]
  toggle: (v: string) => void
  nullstill: () => void
  color?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const activeClass = color === 'indigo' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-blue-500 bg-blue-50 text-blue-700'
  const badgeClass = color === 'indigo' ? 'bg-indigo-600' : 'bg-blue-600'
  const hoverClass = color === 'indigo' ? 'hover:border-indigo-300' : 'hover:border-blue-300'
  const itemActiveClass = color === 'indigo' ? 'bg-indigo-50 text-indigo-700' : 'bg-blue-50 text-blue-700'
  const checkClass = color === 'indigo' ? 'bg-indigo-600 border-indigo-600' : 'bg-blue-600 border-blue-600'

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition ${valgte.length > 0 ? activeClass : `border-gray-200 bg-white text-gray-600 ${hoverClass}`}`}>
        {label} {valgte.length > 0 && <span className={`${badgeClass} text-white text-xs rounded-full px-2 py-0.5`}>{valgte.length}</span>}
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 w-64 max-h-72 overflow-y-auto">
          {valgte.length > 0 && <button onClick={nullstill} className="text-xs text-red-400 hover:text-red-600 mb-2 block">Nullstill</button>}
          {options.map(opt => (
            <button key={opt} onClick={() => toggle(opt)} className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition ${valgte.includes(opt) ? itemActiveClass + ' font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${valgte.includes(opt) ? checkClass + ' text-white' : 'border-gray-300'}`}>{valgte.includes(opt) ? '✓' : ''}</span>
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
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  function toggleFag(fag: string) {
    setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag])
  }

  function toggleBy(by: string) {
    setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by])
  }

  async function finnStudier() {
    if (!snitt) return
    setLaster(true)
    setSokt(true)
    setVisAntall(BATCH)
    let query = supabase.from('studier').select('*').order('cutoff_score', { ascending: false })
    if (valgteFag.length > 0) query = query.in('fagomraade', valgteFag)
    if (valgteByer.length > 0) query = query.in('location', valgteByer)
    const { data } = await query
    const snitttall = parseFloat(snitt)
    const mapped = (data || [])
      .map((s: any) => ({ ...s, status: getStatus(snitttall, s.cutoff_score), margin: snitttall - s.cutoff_score }))
      .sort((a: any, b: any) => a.status.order - b.status.order)
    setResultater(mapped)
    setLaster(false)
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={tilbake} className="text-blue-600 text-sm mb-6 hover:underline">← Tilbake</button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">StudieMatch</h1>
          <p className="text-gray-500">Finn bachelorstudier basert på karaktersnittet ditt</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-8 items-start">
            <div>
              <Label text="Karaktersnitt" hint="Skriv inn karaktergjennomsnittet ditt" />
              <div className="flex gap-3">
                <input type="number" placeholder="F.eks. 52.4" value={snitt} onChange={e => setSnitt(e.target.value)} onKeyDown={e => e.key === 'Enter' && finnStudier()} className="border border-gray-200 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-44" />
                <button onClick={finnStudier} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition text-sm">Søk</button>
              </div>
            </div>
            <div>
              <Label text="By" hint="Hvilken by ønsker du å studere i?" />
              <Dropdown label="Velg by" options={byer} valgte={valgteByer} toggle={toggleBy} nullstill={() => setValgteByer([])} color="blue" />
            </div>
            <div>
              <Label text="Fagområde" hint="Hvilke fagområder er du interessert i?" />
              <Dropdown label="Velg fagområde" options={fagomraader} valgte={valgteFag} toggle={toggleFag} nullstill={() => setValgteFag([])} color="blue" />
            </div>
          </div>
        </div>

        {laster && <div className="text-center text-gray-400 py-8">Laster...</div>}

        {sokt && !laster && (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-3">
              <p className="text-blue-800 font-bold text-lg">Basert på snittet ditt ({snitttall}), har du gode muligheter på {godSjanseAntall} studier</p>
              {snittMarginTall !== null && <p className="text-blue-600 text-sm mt-1">{marginTekst(snittMarginTall)}</p>}
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4 text-yellow-800 text-sm">
              Dette er basert på tidligere poenggrenser. Poenggrenser varierer fra år til år og er ikke en garanti.
            </div>
            <div className="flex flex-wrap gap-3 mb-5 items-center">
              <button onClick={() => setKunGodSjanse(!kunGodSjanse)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${kunGodSjanse ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}>Vis kun god sjanse</button>
              <button onClick={() => setSortering(sortering === 'standard' ? 'beste' : 'standard')} className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${sortering === 'beste' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}>{sortering === 'beste' ? 'Sortert: beste match' : 'Sorter etter beste match'}</button>
              <p className="text-gray-400 text-sm ml-auto">{viste.length} av {sorterteAlle.length} studier vises</p>
            </div>
            <p className="text-gray-600 font-semibold mb-3">Disse studiene passer deg best basert på snittet ditt</p>
          </div>
        )}

        <div className="space-y-4">
          {viste.map((s, i) => (
            <div key={s.id} className={`bg-white rounded-xl border p-5 hover:shadow-md transition ${i === 0 ? 'shadow-md border-blue-200 ring-1 ring-blue-100' : 'shadow-sm border-gray-100'}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="font-semibold text-lg text-gray-800">{s.study_name}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.status.color}`}>{s.status.label}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{s.university} – {s.location}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
                    <span className="text-gray-500">Poenggrense: <strong className="text-gray-700">{s.cutoff_score}</strong></span>
                    <span className="text-gray-500">Dine poeng: <strong className="text-gray-700">{snitttall}</strong></span>
                    <span className={s.margin >= 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>{s.margin >= 0 ? '+' : ''}{s.margin.toFixed(1)} poeng</span>
                  </div>
                  <span className="inline-block mt-2 bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">{s.fagomraade}</span>
                </div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap">Gå til studie</a>
              </div>
            </div>
          ))}
        </div>

        {sokt && !laster && visAntall < sorterteAlle.length && (
          <div className="text-center mt-6">
            <button onClick={() => setVisAntall(v => v + BATCH)} className="bg-white border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-medium hover:border-blue-400 hover:text-blue-600 transition">Vis flere studier</button>
          </div>
        )}
      </div>
    </main>
  )
}

const bachelorStudier = [
  'Bachelor i økonomi og administrasjon', 'Bachelor i regnskap og revisjon',
  'Bachelor i markedsføring og ledelse', 'Bachelor i internasjonal business',
  'Bachelor i finans', 'Bachelor i rettsvitenskap / jus', 'Bachelor i psykologi',
  'Bachelor i sosiologi', 'Bachelor i statsvitenskap', 'Bachelor i samfunnsøkonomi',
  'Bachelor i filosofi', 'Bachelor i pedagogikk', 'Bachelor i informatikk',
  'Bachelor i datateknologi', 'Bachelor i kunstig intelligens', 'Bachelor i cybersikkerhet',
  'Bachelor i ingeniør – data', 'Bachelor i ingeniør – maskin', 'Bachelor i ingeniør – bygg',
  'Bachelor i ingeniør – elektronikk', 'Bachelor i ingeniør – energi', 'Bachelor i matematikk',
  'Bachelor i fysikk', 'Bachelor i kjemi', 'Bachelor i biologi', 'Bachelor i bioteknologi',
  'Bachelor i sykepleie', 'Bachelor i ergoterapi', 'Bachelor i fysioterapi',
  'Bachelor i bioingeniør', 'Bachelor i radiografi', 'Bachelor i paramedisin',
  'Bachelor i farmasi', 'Bachelor i tannpleie', 'Bachelor i folkehelse',
  'Bachelor i barnevern', 'Bachelor i sosialt arbeid', 'Bachelor i vernepleie',
  'Bachelor i journalistikk', 'Bachelor i medievitenskap', 'Bachelor i kommunikasjon',
  'Bachelor i film og TV-produksjon', 'Bachelor i kunst og design', 'Bachelor i arkitektur',
  'Bachelor i musikkvitenskap', 'Bachelor i idrettsvitenskap', 'Bachelor i friluftsliv',
  'Bachelor i lærerutdanning 1–7', 'Bachelor i lærerutdanning 5–10', 'Bachelor i historie',
  'Bachelor i geografi', 'Bachelor i nordisk språk og litteratur', 'Bachelor i engelsk',
  'Bachelor i fransk', 'Bachelor i tysk', 'Bachelor i spansk', 'Bachelor i arabisk',
  'Bachelor i kinesisk', 'Bachelor i russisk', 'Bachelor i landbruk', 'Bachelor i havbruk',
  'Bachelor i veterinærmedisin', 'Bachelor i miljøvitenskap', 'Bachelor i geologi',
  'Bachelor i nanoteknologi',
]

const bachelorTilKategori: any = {
  'Bachelor i økonomi og administrasjon': 'Økonomi',
  'Bachelor i regnskap og revisjon': 'Økonomi',
  'Bachelor i markedsføring og ledelse': 'Økonomi',
  'Bachelor i internasjonal business': 'Økonomi',
  'Bachelor i finans': 'Økonomi',
  'Bachelor i rettsvitenskap / jus': 'Jus',
  'Bachelor i psykologi': 'Psykologi',
  'Bachelor i sosiologi': 'Samfunnsfag',
  'Bachelor i statsvitenskap': 'Samfunnsfag',
  'Bachelor i samfunnsøkonomi': 'Økonomi',
  'Bachelor i filosofi': 'Samfunnsfag',
  'Bachelor i pedagogikk': 'Pedagogikk',
  'Bachelor i informatikk': 'Informatikk',
  'Bachelor i datateknologi': 'Informatikk',
  'Bachelor i kunstig intelligens': 'Informatikk',
  'Bachelor i cybersikkerhet': 'Informatikk',
  'Bachelor i ingeniør – data': 'Ingeniør',
  'Bachelor i ingeniør – maskin': 'Ingeniør',
  'Bachelor i ingeniør – bygg': 'Ingeniør',
  'Bachelor i ingeniør – elektronikk': 'Ingeniør',
  'Bachelor i ingeniør – energi': 'Ingeniør',
  'Bachelor i matematikk': 'Realfag',
  'Bachelor i fysikk': 'Realfag',
  'Bachelor i kjemi': 'Realfag',
  'Bachelor i biologi': 'Realfag',
  'Bachelor i bioteknologi': 'Realfag',
  'Bachelor i sykepleie': 'Helse',
  'Bachelor i ergoterapi': 'Helse',
  'Bachelor i fysioterapi': 'Helse',
  'Bachelor i bioingeniør': 'Helse',
  'Bachelor i radiografi': 'Helse',
  'Bachelor i paramedisin': 'Helse',
  'Bachelor i farmasi': 'Helse',
  'Bachelor i tannpleie': 'Helse',
  'Bachelor i folkehelse': 'Helse',
  'Bachelor i barnevern': 'Helse',
  'Bachelor i sosialt arbeid': 'Helse',
  'Bachelor i vernepleie': 'Helse',
  'Bachelor i journalistikk': 'Media',
  'Bachelor i medievitenskap': 'Media',
  'Bachelor i kommunikasjon': 'Media',
  'Bachelor i film og TV-produksjon': 'Media',
  'Bachelor i kunst og design': 'Kunst',
  'Bachelor i arkitektur': 'Kunst',
  'Bachelor i musikkvitenskap': 'Kunst',
  'Bachelor i idrettsvitenskap': 'Idrett',
  'Bachelor i friluftsliv': 'Idrett',
  'Bachelor i lærerutdanning 1–7': 'Pedagogikk',
  'Bachelor i lærerutdanning 5–10': 'Pedagogikk',
  'Bachelor i historie': 'Samfunnsfag',
  'Bachelor i geografi': 'Samfunnsfag',
  'Bachelor i nordisk språk og litteratur': 'Språk',
  'Bachelor i engelsk': 'Språk',
  'Bachelor i fransk': 'Språk',
  'Bachelor i tysk': 'Språk',
  'Bachelor i spansk': 'Språk',
  'Bachelor i arabisk': 'Språk',
  'Bachelor i kinesisk': 'Språk',
  'Bachelor i russisk': 'Språk',
  'Bachelor i landbruk': 'Realfag',
  'Bachelor i havbruk': 'Realfag',
  'Bachelor i veterinærmedisin': 'Helse',
  'Bachelor i miljøvitenskap': 'Realfag',
  'Bachelor i geologi': 'Realfag',
  'Bachelor i nanoteknologi': 'Realfag',
}

const alleMastere = [
  { name: 'Master i økonomi og administrasjon', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/master-okonomi', fagomraade: 'Økonomi', requires: { kategorier: ['Økonomi'], min_grade: 'C' } },
  { name: 'Master i finansiell økonomi', school: 'NHH', location: 'Bergen', url: 'https://www.nhh.no/studier/master', fagomraade: 'Økonomi', requires: { kategorier: ['Økonomi'], min_grade: 'B' } },
  { name: 'Master i regnskap og revisjon', school: 'NHH', location: 'Bergen', url: 'https://www.nhh.no/studier/master/regnskap', fagomraade: 'Økonomi', requires: { kategorier: ['Økonomi'], min_grade: 'C' } },
  { name: 'Master i psykologi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/psykologi-master', fagomraade: 'Psykologi', requires: { kategorier: ['Psykologi'], min_grade: 'B' } },
  { name: 'Master i klinisk psykologi', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/mpsyk', fagomraade: 'Psykologi', requires: { kategorier: ['Psykologi'], min_grade: 'A' } },
  { name: 'Master i informatikk', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/informatikk-master', fagomraade: 'Informatikk', requires: { kategorier: ['Informatikk', 'Ingeniør', 'Realfag'], min_grade: 'C' } },
  { name: 'Master i kunstig intelligens', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/msit', fagomraade: 'Informatikk', requires: { kategorier: ['Informatikk', 'Realfag'], min_grade: 'B' } },
  { name: 'Master i cybersikkerhet', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/msc-cybersecurity', fagomraade: 'Informatikk', requires: { kategorier: ['Informatikk', 'Ingeniør'], min_grade: 'C' } },
  { name: 'Master i rettsvitenskap', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/rettsvitenskap', fagomraade: 'Jus', requires: { kategorier: ['Jus'], min_grade: 'C' } },
  { name: 'Master i samfunnsøkonomi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/samfunnsokonomi-master', fagomraade: 'Økonomi', requires: { kategorier: ['Økonomi', 'Samfunnsfag', 'Realfag'], min_grade: 'C' } },
  { name: 'Master i sosiologi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/sosiologi-master', fagomraade: 'Samfunnsfag', requires: { kategorier: ['Samfunnsfag'], min_grade: 'C' } },
  { name: 'Master i statsvitenskap', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/statsvitenskap-master', fagomraade: 'Samfunnsfag', requires: { kategorier: ['Samfunnsfag'], min_grade: 'C' } },
  { name: 'Master i sykepleievitenskap', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/sykepleievitenskap-master', fagomraade: 'Helse', requires: { kategorier: ['Helse'], min_grade: 'C' } },
  { name: 'Master i folkehelsevitenskap', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/mfolkehelse', fagomraade: 'Helse', requires: { kategorier: ['Helse', 'Idrett', 'Samfunnsfag'], min_grade: 'C' } },
  { name: 'Master i idrettsvitenskap', school: 'NIH', location: 'Oslo', url: 'https://www.nih.no/studier/master', fagomraade: 'Idrett', requires: { kategorier: ['Idrett', 'Helse'], min_grade: 'C' } },
  { name: 'Master i business', school: 'BI', location: 'Oslo', url: 'https://www.bi.no/studier/master', fagomraade: 'Økonomi', requires: { kategorier: ['Økonomi', 'Samfunnsfag'], min_grade: 'C' } },
  { name: 'Master i ledelse', school: 'BI', location: 'Oslo', url: 'https://www.bi.no/studier/master/ledelse', fagomraade: 'Økonomi', requires: { kategorier: ['Økonomi', 'Samfunnsfag', 'Psykologi', 'Idrett'], min_grade: 'C' } },
  { name: 'Master i ingeniørvitenskap', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/master-ingeniør', fagomraade: 'Ingeniør', requires: { kategorier: ['Ingeniør', 'Realfag'], min_grade: 'C' } },
  { name: 'Master i pedagogikk', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/pedagogikk-master', fagomraade: 'Pedagogikk', requires: { kategorier: ['Pedagogikk', 'Samfunnsfag'], min_grade: 'C' } },
  { name: 'Master i journalistikk', school: 'OsloMet', location: 'Oslo', url: 'https://www.oslomet.no/studier/master/journalistikk', fagomraade: 'Media', requires: { kategorier: ['Media', 'Samfunnsfag'], min_grade: 'C' } },
  { name: 'Master i medievitenskap', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/medievitenskap-master', fagomraade: 'Media', requires: { kategorier: ['Media', 'Samfunnsfag'], min_grade: 'C' } },
  { name: 'Master i arkitektur', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/march', fagomraade: 'Kunst', requires: { kategorier: ['Kunst', 'Ingeniør'], min_grade: 'B' } },
  { name: 'Master i biologi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/biologi-master', fagomraade: 'Realfag', requires: { kategorier: ['Realfag'], min_grade: 'C' } },
  { name: 'Master i kjemi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/kjemi-master', fagomraade: 'Realfag', requires: { kategorier: ['Realfag'], min_grade: 'C' } },
  { name: 'Master i matematikk', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/matematikk-master', fagomraade: 'Realfag', requires: { kategorier: ['Realfag'], min_grade: 'C' } },
  { name: 'Master i spesialpedagogikk', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/spesialpedagogikk-master', fagomraade: 'Pedagogikk', requires: { kategorier: ['Pedagogikk', 'Helse'], min_grade: 'C' } },
  { name: 'Master i språkvitenskap', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/spraakvitenskap-master', fagomraade: 'Språk', requires: { kategorier: ['Språk'], min_grade: 'C' } },
  { name: 'Master i historie', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/historie-master', fagomraade: 'Samfunnsfag', requires: { kategorier: ['Samfunnsfag', 'Språk'], min_grade: 'C' } },
]

function BachelorSide({ tilbake }: { tilbake: () => void }) {
  const [bachelor, setBachelor] = useState('')
  const [karakter, setKarakter] = useState('')
  const [sokt, setSokt] = useState(false)
  const [valgteFag, setValgteFag] = useState<string[]>([])
  const [valgteByer, setValgteByer] = useState<string[]>([])

  const gradeOrder: any = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 }

  function toggleFag(fag: string) {
    setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag])
  }

  function toggleBy(by: string) {
    setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by])
  }

  function getStatus(m: any) {
    const kategori = bachelorTilKategori[bachelor]
    const bachelorMatch = kategori && m.requires.kategorier.includes(kategori)
    const gradeMatch = gradeOrder[karakter] >= gradeOrder[m.requires.min_grade]
    if (bachelorMatch && gradeMatch) return { label: '✔ Oppfyller krav', color: 'bg-green-100 text-green-700', order: 0 }
    if (bachelorMatch && !gradeMatch) return { label: '⚠ Kanskje – sjekk krav', color: 'bg-yellow-100 text-yellow-700', order: 1 }
    return { label: '❌ Oppfyller ikke krav', color: 'bg-red-100 text-red-600', order: 2 }
  }

  const resultater = sokt ? alleMastere
    .filter(m => {
      if (valgteFag.length > 0 && !valgteFag.includes(m.fagomraade)) return false
      if (valgteByer.length > 0 && !valgteByer.includes(m.location)) return false
      return true
    })
    .map(m => ({ ...m, status: getStatus(m) }))
    .sort((a, b) => a.status.order - b.status.order) : []

  const kvalifisert = resultater.filter(m => m.status.order === 0).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={tilbake} className="text-indigo-600 text-sm mb-6 hover:underline">← Tilbake</button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">StudieMatch</h1>
          <p className="text-gray-500">Finn masterstudier basert på bacheloren og karakterene dine</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-8 items-start mb-6">
            <div>
              <Label text="Hva har du studert?" hint="Velg bachelorutdanningen din fra listen" />
              <select value={bachelor} onChange={e => setBachelor(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-72">
                <option value="">Velg bachelorutdanning</option>
                {bachelorStudier.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <Label text="Karakternivå" hint="Hva er karakternivået ditt?" />
              <select value={karakter} onChange={e => setKarakter(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">Velg karakter</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
            <div className="flex items-end pb-0.5">
              <button onClick={() => { if (bachelor && karakter) setSokt(true) }} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm">Finn mastere</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 items-start">
            <div>
              <Label text="By" hint="Hvilken by ønsker du å studere i?" />
              <Dropdown label="Velg by" options={masterByer} valgte={valgteByer} toggle={toggleBy} nullstill={() => setValgteByer([])} color="indigo" />
            </div>
            <div>
              <Label text="Fagområde" hint="Hvilke fagområder er du interessert i?" />
              <Dropdown label="Velg fagområde" options={masterFagomraader} valgte={valgteFag} toggle={toggleFag} nullstill={() => setValgteFag([])} color="indigo" />
            </div>
          </div>
        </div>

        {sokt && (
          <div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mb-3">
              <p className="text-indigo-800 font-bold">Basert på bacheloren din og karakterene dine, har du disse mulighetene:</p>
              <p className="text-indigo-600 text-sm mt-1">Du kvalifiserer til {kvalifisert} av {resultater.length} masterprogrammer</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4 text-yellow-800 text-sm">
              Krav varierer mellom studier og år. Dette er en forenklet oversikt.
            </div>
          </div>
        )}

        <div className="space-y-3">
          {resultater.map((m, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="font-semibold text-lg text-gray-800">{m.name}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status.color}`}>{m.status.label}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{m.school} – {m.location}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-1 rounded-full">{m.fagomraade}</span>
                    <span className="text-gray-400 text-xs">Krav: min. karakter <strong>{m.requires.min_grade}</strong></span>
                  </div>
                </div>
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition whitespace-nowrap">Gå til studie</a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-xs text-center mt-8 max-w-md mx-auto">
          Resultatene er veiledende og basert på tidligere poenggrenser og tilgjengelige opptakskrav. Sjekk alltid lærestedets egne sider før du søker.
        </p>
      </div>
    </main>
  )
}
