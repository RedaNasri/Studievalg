'use client'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [valg, setValg] = useState<'start' | 'vgs' | 'bachelor'>('start')

  if (valg === 'vgs') return <VGSSide tilbake={() => setValg('start')} />
  if (valg === 'bachelor') return <BachelorSide tilbake={() => setValg('start')} />

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4" style={{background: '#F6F9FC'}}>
      <div className="max-w-2xl w-full mx-auto py-12 text-center">
        <img src="/logo.png" alt="StudieMatch" className="mx-auto mt-4 mb-8" style={{width: '180px', height: 'auto', display: 'block'}} />
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{color: '#1E3A8A'}}>Finn studier på 10 sekunder</p>
        <p className="text-lg mb-4 max-w-xl mx-auto leading-relaxed" style={{color: '#475467'}}>
          Skriv inn snittet ditt eller bacheloren din – og se hvilke studier du kan være kvalifisert for
        </p>
        <p className="text-sm mb-8 max-w-xl mx-auto" style={{color: '#98A2B3'}}>
          Basert på tidligere poenggrenser og tilgjengelige opptakskrav.
        </p>
        <p className="font-semibold mb-4 text-lg" style={{color: '#0D1B2A'}}>Hva passer deg best?</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          <button onClick={() => setValg('vgs')} className="bg-white rounded-2xl p-6 hover:-translate-y-0.5 transition text-left" style={{border: '1px solid #E4E9F2'}}>
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-xl font-bold mb-2" style={{color: '#0D1B2A'}}>Jeg går på VGS</h2>
            <p className="text-sm leading-relaxed" style={{color: '#475467'}}>Se hvilke bachelorstudier du kan være kvalifisert for basert på snittet ditt</p>
            <div className="mt-4 text-sm font-semibold" style={{color: '#1E3A8A'}}>Finn bachelorstudier →</div>
          </button>
          <button onClick={() => setValg('bachelor')} className="bg-white rounded-2xl p-6 hover:-translate-y-0.5 transition text-left" style={{border: '1px solid #E4E9F2'}}>
            <div className="text-4xl mb-3">🎓</div>
            <h2 className="text-xl font-bold mb-2" style={{color: '#0D1B2A'}}>Jeg har en bachelor</h2>
            <p className="text-sm leading-relaxed" style={{color: '#475467'}}>Se hvilke masterprogram bacheloren din kan kvalifisere deg til</p>
            <div className="mt-4 text-sm font-semibold" style={{color: '#1E3A8A'}}>Finn masterprogram →</div>
          </button>
        </div>
        <p className="text-xs mb-4" style={{color: '#98A2B3'}}>Tar under 10 sekunder • Ingen innlogging nødvendig</p>
        <p className="text-xs max-w-md mx-auto leading-relaxed" style={{color: '#98A2B3'}}>
          Resultatene er veiledende og basert på tidligere poenggrenser og tilgjengelige opptakskrav. Sjekk alltid lærestedets egne sider før du søker.
        </p>
      </div>
    </main>
  )
}

function FeedbackBoks({ snitt, kvote }: { snitt: string, kvote: string }) {
  const [valgt, setValgt] = useState<'up' | 'down' | null>(null)

  function sendFeedback(type: 'up' | 'down') {
    if (valgt) return
    setValgt(type)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', type === 'up' ? 'feedback_positive' : 'feedback_negative', {
        event_category: 'feedback',
        event_label: `snitt:${snitt}_kvote:${kvote}`,
      })
    }
  }

  return (
    <div className="rounded-xl px-5 py-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" style={{background: 'white', border: '1px solid #E4E9F2'}}>
      <p className="text-sm font-medium" style={{color: '#0D1B2A'}}>
        {valgt ? (valgt === 'up' ? '🎉 Takk for tilbakemeldingen!' : '😔 Takk! Vi jobber med å bli bedre.') : 'Var resultatet nyttig?'}
      </p>
      {!valgt && (
        <div className="flex gap-2">
          <button onClick={() => sendFeedback('up')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition hover:scale-105" style={{border: '1px solid #E4E9F2', background: '#F6F9FC', color: '#0D1B2A'}}>
            👍 Ja
          </button>
          <button onClick={() => sendFeedback('down')} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition hover:scale-105" style={{border: '1px solid #E4E9F2', background: '#F6F9FC', color: '#0D1B2A'}}>
            👎 Nei
          </button>
        </div>
      )}
    </div>
  )
}

const fagomraader = ['Annen helse','Bioingeniør','Cybersikkerhet','Data og IT','Farmasi','Film og media','Fysioterapi','Idrett','Ingeniør','Journalistikk','Jus','Kunst og design','Kunstig intelligens','Lærer','Markedsføring','Matematikk','Medisin','Musikk','Psykologi','Realfag','Regnskap','Samfunnsfag','Sosiologi','Språk','Statsvitenskap','Sykepleie','Tannhelse','Økonomi','Annet']
const byer = ['Oslo','Bergen','Trondheim','Tromsø','Stavanger','Kristiansand','Ålesund','Bodø','Gjøvik','Lillehammer','Drammen','Sogndal','Levanger','Haugesund','Molde','Narvik','Alta','Åmot','Ås','Bærum','Elverum','Fredrikstad','Gol','Grimstad','Hamar','Harstad','Horten','Indre Østfold','Kongsvinger','Larvik','Lillestrøm','Mo i Rana','Namsos','Notodden','Orkland','Porsgrunn','Ringerike','Sør-Varanger','Stord','Sunnfjord','Volda']
const masterFagomraader = ['Helse','Idrett','Informatikk','Ingeniør','Jus','Kunst','Media','Pedagogikk','Psykologi','Realfag','Samfunnsfag','Språk','Økonomi']
const masterByer = ['Oslo','Bergen','Trondheim','Tromsø','Stavanger','Kristiansand','Gjøvik']

function Label({ text, hint }: { text: string, hint: string }) {
  return (
    <div className="mb-2">
      <p className="font-semibold text-sm" style={{color: '#0D1B2A'}}>{text}</p>
      <p className="text-sm mt-0.5" style={{color: '#475467'}}>{hint}</p>
    </div>
  )
}

// DEL 7: Mobilvennlig Dropdown med overlay/bottom-sheet på mobil
function Dropdown({ label, options, valgte, toggle, nullstill }: { label: string, options: string[], valgte: string[], toggle: (v: string) => void, nullstill: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Hindre scroll på body når overlay er åpen på mobil
  useEffect(() => {
    if (open && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="relative w-full" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition w-full"
        style={{
          border: valgte.length > 0 ? '1px solid #1E3A8A' : '1px solid #E4E9F2',
          color: valgte.length > 0 ? '#1E3A8A' : '#475467',
          background: valgte.length > 0 ? 'rgba(30,58,138,0.08)' : 'white',
          minHeight: '48px',
        }}
      >
        <span className="flex-1 text-left">{label}</span>
        {valgte.length > 0 && (
          <span className="text-white text-xs rounded-full px-2 py-0.5" style={{background: '#1E3A8A'}}>{valgte.length}</span>
        )}
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {/* Desktop dropdown */}
      {open && (
        <>
          {/* Mobil: mørk overlay + bottom sheet */}
          <div
            className="fixed inset-0 z-40 sm:hidden"
            style={{background: 'rgba(13,27,42,0.5)'}}
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 z-50 sm:hidden rounded-t-2xl overflow-hidden"
            style={{background: '#0D1B2A', maxHeight: '75vh', display: 'flex', flexDirection: 'column'}}
          >
            <div className="flex items-center justify-between px-5 py-4" style={{borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
              <p className="font-semibold text-white text-base">{label}</p>
              <button onClick={() => setOpen(false)} style={{color: '#98A2B3', fontSize: '20px', lineHeight: 1}}>✕</button>
            </div>
            {valgte.length > 0 && (
              <div className="px-5 pt-3">
                <button
                  onClick={() => { nullstill(); setOpen(false) }}
                  className="text-sm font-medium px-3 py-1.5 rounded-lg"
                  style={{background: 'rgba(225,29,72,0.15)', color: '#f87171'}}
                >
                  Nullstill valg
                </button>
              </div>
            )}
            <div className="overflow-y-auto flex-1 px-4 py-3">
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  className="flex items-center gap-3 w-full text-left px-3 py-3.5 rounded-xl text-sm transition mb-1"
                  style={{
                    background: valgte.includes(opt) ? 'rgba(30,58,138,0.4)' : 'rgba(255,255,255,0.05)',
                    color: valgte.includes(opt) ? '#93c5fd' : '#e2e8f0',
                    fontWeight: valgte.includes(opt) ? '600' : 'normal',
                  }}
                >
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center text-xs flex-shrink-0"
                    style={{
                      background: valgte.includes(opt) ? '#1E3A8A' : 'transparent',
                      border: valgte.includes(opt) ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                    }}
                  >
                    {valgte.includes(opt) ? '✓' : ''}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
            <div className="px-5 py-4" style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
              <button
                onClick={() => setOpen(false)}
                className="w-full py-3.5 rounded-xl font-semibold text-sm"
                style={{background: '#1E3A8A', color: 'white'}}
              >
                Bekreft valg {valgte.length > 0 ? `(${valgte.length} valgt)` : ''}
              </button>
            </div>
          </div>

          {/* Desktop: vanlig dropdown */}
          <div
            className="absolute top-12 left-0 z-50 bg-white rounded-2xl shadow-xl p-3 w-64 max-h-72 overflow-y-auto hidden sm:block"
            style={{border: '1px solid #E4E9F2'}}
          >
            {valgte.length > 0 && (
              <button onClick={nullstill} className="text-xs text-red-500 hover:text-red-600 mb-2 block font-medium">Nullstill</button>
            )}
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition"
                style={{
                  background: valgte.includes(opt) ? 'rgba(30,58,138,0.08)' : 'white',
                  color: valgte.includes(opt) ? '#1E3A8A' : '#475467',
                  fontWeight: valgte.includes(opt) ? '500' : 'normal',
                }}
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center text-xs flex-shrink-0"
                  style={{
                    background: valgte.includes(opt) ? '#1E3A8A' : 'white',
                    border: valgte.includes(opt) ? '1px solid #1E3A8A' : '1px solid #E4E9F2',
                    color: 'white',
                  }}
                >
                  {valgte.includes(opt) ? '✓' : ''}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// DEL 1 & 3: Hjelpefunksjon for å sjekke om en poenggrense er gyldig (ikke 0, null, undefined, NaN, tom)
function erGyldigGrense(verdi: any): boolean {
  if (verdi == null) return false
  if (verdi === '') return false
  if (verdi === '-') return false
  const tall = parseFloat(verdi)
  if (isNaN(tall)) return false
  if (tall <= 0) return false
  return true
}

// DEL 3: Kvotelogikk – ingen fallback til 0 hvis data mangler
function getRelevantCutoff(s: any, kvote: string): { cutoff: number | null, mangler: boolean } {
  if (kvote === 'forstegangsvitnemal') {
    if (erGyldigGrense(s.first_time_cutoff)) return { cutoff: s.first_time_cutoff, mangler: false }
    // Ikke fallback til ordinary_cutoff – vis heller "mangler"
    return { cutoff: null, mangler: true }
  }
  if (kvote === 'ordinaer') {
    const ord = s.ordinary_cutoff ?? s.cutoff_score
    if (erGyldigGrense(ord)) return { cutoff: ord, mangler: false }
    return { cutoff: null, mangler: true }
  }
  // Usikker: vis forsiktig, bruk begge hvis mulig
  const ft = erGyldigGrense(s.first_time_cutoff) ? s.first_time_cutoff : null
  const ord = erGyldigGrense(s.ordinary_cutoff ?? s.cutoff_score) ? (s.ordinary_cutoff ?? s.cutoff_score) : null
  if (ft != null && ord != null) return { cutoff: Math.max(ft, ord), mangler: false }
  if (ft != null) return { cutoff: ft, mangler: false }
  if (ord != null) return { cutoff: ord, mangler: false }
  return { cutoff: null, mangler: true }
}

// DEL 1: Status – aldri "God sjanse" eller "Beste match" for studier med manglende data
function getVGSStatus(snitt: number, grense: number | null, mangler: boolean) {
  if (mangler || grense === null) {
    return { label: 'Data mangler', color: 'bg-gray-50 text-gray-500 border border-gray-200', order: 3 }
  }
  const margin = snitt - grense
  if (margin >= 3) return { label: 'God sjanse', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100', order: 0 }
  if (margin >= 0) return { label: 'Mulig', color: 'bg-amber-50 text-amber-700 border border-amber-100', order: 1 }
  return { label: 'Under grensen', color: 'bg-rose-50 text-rose-700 border border-rose-100', order: 2 }
}

const BATCH = 30

function VGSSide({ tilbake }: { tilbake: () => void }) {
  const [snitt, setSnitt] = useState('')
  const [kvote, setKvote] = useState('usikker')
  const [valgteFag, setValgteFag] = useState<string[]>([])
  const [valgteByer, setValgteByer] = useState<string[]>([])
  const [resultater, setResultater] = useState<any[]>([])
  const [manglendeListe, setManglendeListe] = useState<any[]>([])
  const [alternativer, setAlternativer] = useState<any[]>([])
  const [laster, setLaster] = useState(false)
  const [sokt, setSokt] = useState(false)
  const [kunGodSjanse, setKunGodSjanse] = useState(false)
  const [sortering, setSortering] = useState<'standard' | 'beste'>('standard')
  const [visAntall, setVisAntall] = useState(BATCH)
  const [delt, setDelt] = useState(false)
  const [visManglende, setVisManglende] = useState(false)

  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  function toggleFag(fag: string) { setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]) }
  function toggleBy(by: string) { setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by]) }

  async function finnStudier() {
    if (!snitt) return
    setLaster(true); setSokt(true); setVisAntall(BATCH); setAlternativer([]); setVisManglende(false)
    setTimeout(() => {
      document.getElementById('resultater')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
    const snitttall = parseFloat(snitt)

    let query = supabase.from('studier').select('*').order('cutoff_score', { ascending: false })
    if (valgteFag.length > 0) query = query.in('fagomraade', valgteFag)
    if (valgteByer.length > 0) query = query.in('location', valgteByer)
    const { data } = await query

    // DEL 1 & 3: Skill ut studier med manglende poenggrense fra vanlige resultater
    const medData: any[] = []
    const utenData: any[] = []

    ;(data || []).forEach((s: any) => {
      const { cutoff, mangler } = getRelevantCutoff(s, kvote)
      if (mangler || cutoff === null) {
        utenData.push({ ...s, relevantCutoff: null, manglerKvotedata: true, status: getVGSStatus(snitttall, null, true), margin: null })
      } else {
        const margin = snitttall - cutoff
        medData.push({ ...s, relevantCutoff: cutoff, manglerKvotedata: false, status: getVGSStatus(snitttall, cutoff, false), margin })
      }
    })

    const sorted = medData.sort((a: any, b: any) => a.status.order - b.status.order)
    setResultater(sorted)
    setManglendeListe(utenData)

    // Alternativer ved null treff (bare blant studier med gyldige data)
    const harTreff = sorted.filter((s: any) => s.margin >= 0).length > 0
    if (!harTreff && (valgteByer.length > 0 || valgteFag.length > 0)) {
      let altQuery = supabase.from('studier').select('*').order('cutoff_score', { ascending: false })
      if (valgteFag.length > 0) altQuery = altQuery.in('fagomraade', valgteFag)
      const { data: altData } = await altQuery
      const altMapped = (altData || [])
        .map((s: any) => {
          const { cutoff, mangler } = getRelevantCutoff(s, kvote)
          if (mangler || cutoff === null) return null
          const margin = snitttall - cutoff
          return { ...s, relevantCutoff: cutoff, manglerKvotedata: false, status: getVGSStatus(snitttall, cutoff, false), margin }
        })
        .filter((s: any) => s !== null && s.margin >= -5)
        .sort((a: any, b: any) => b.margin - a.margin)
        .slice(0, 10)
      setAlternativer(altMapped)
    }

    setLaster(false)
  }

  function delResultat() {
    // DEL 2: Forsiktig formulering i del-tekst
    const tekst = `Basert på snittet mitt (${snitt}) fant StudieMatch ${godSjanseAntall} mulige studier med tilgjengelig poenggrense! Sjekk StudieMatch: ${window.location.href}`
    if (navigator.share) {
      navigator.share({ title: 'StudieMatch', text: tekst, url: window.location.href })
    } else {
      navigator.clipboard.writeText(tekst)
      setDelt(true)
      setTimeout(() => setDelt(false), 2000)
    }
  }

  const snitttall = parseFloat(snitt)
  // DEL 1: Aldri inkluder "Data mangler"-studier i "God sjanse"-filter eller sortering
  const filtrerte = kunGodSjanse ? resultater.filter(s => s.status.label === 'God sjanse') : resultater
  const sorterteAlle = sortering === 'beste'
    ? [...filtrerte].sort((a, b) => b.margin - a.margin)
    : filtrerte
  const viste = sorterteAlle.slice(0, visAntall)
  // DEL 1: godSjanseAntall teller aldri studier med manglende data
  const godSjanseAntall = resultater.filter(s => s.status.label === 'God sjanse').length
  const harNullTreff = sokt && !laster && resultater.filter(s => s.margin >= 0).length === 0
  const kvotetekst = kvote === 'forstegangsvitnemal' ? 'Førstegangsvitnemål' : kvote === 'ordinaer' ? 'Ordinær kvote' : ''

  return (
    <main className="min-h-screen" style={{background: '#F6F9FC'}}>
      <div className="max-w-4xl mx-auto px-4 py-8 overflow-x-hidden">
        <button onClick={tilbake} className="text-sm mb-6 font-medium hover:underline" style={{color: '#1E3A8A'}}>← Tilbake</button>
        <div className="text-center mb-6">
          <img src="/logo.png" alt="StudieMatch" className="mx-auto mb-4" style={{width: '160px', height: 'auto'}} />
          <p style={{color: '#475467'}}>Se hvilke bachelorstudier du kan være kvalifisert for</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6" style={{border: '1px solid #E4E9F2', boxShadow: '0 1px 2px rgba(13,27,42,0.04), 0 4px 12px rgba(13,27,42,0.04)'}}>
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start mb-5">
            <div className="w-full sm:flex-1 sm:min-w-48">
              <Label text="Karaktersnitt" hint="Skriv inn karaktergjennomsnittet ditt" />
              <input
                type="number"
                placeholder="F.eks. 52.4"
                value={snitt}
                onChange={e => setSnitt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && finnStudier()}
                className="rounded-xl px-4 py-3 text-sm w-full bg-white focus:outline-none"
                style={{border: '1px solid #E4E9F2', color: '#0D1B2A', minHeight: '48px'}}
              />
            </div>
            {/* DEL 7: Native select for mobil – fungerer bra på iPhone */}
            <div className="w-full sm:w-auto">
              <Label text="Kvote" hint="Hvilken kvote gjelder for deg?" />
              <select
                value={kvote}
                onChange={e => setKvote(e.target.value)}
                className="rounded-xl px-4 py-3 text-sm bg-white focus:outline-none w-full"
                style={{border: '1px solid #E4E9F2', color: '#0D1B2A', minHeight: '48px'}}
              >
                <option value="forstegangsvitnemal">Førstegangsvitnemål</option>
                <option value="ordinaer">Ordinær kvote</option>
                <option value="usikker">Usikker</option>
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <Label text="By" hint="Hvilken by ønsker du å studere i?" />
              <Dropdown label="Velg by" options={byer} valgte={valgteByer} toggle={toggleBy} nullstill={() => setValgteByer([])} />
            </div>
            <div className="w-full sm:w-auto">
              <Label text="Fagområde" hint="Hvilke fagområder er du interessert i?" />
              <Dropdown label="Velg fagområde" options={fagomraader} valgte={valgteFag} toggle={toggleFag} nullstill={() => setValgteFag([])} />
            </div>
          </div>

          {kvote === 'forstegangsvitnemal' && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)', color: '#1E3A8A'}}>
              Resultatene viser poenggrenser for førstegangsvitnemålskvoten fra Samordna opptak 2025. Poenggrenser varierer fra år til år – sjekk alltid <a href="https://www.samordnaopptak.no" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>Samordna opptak</a> før du søker.
            </div>
          )}
          {kvote === 'usikker' && (
            <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)', color: '#1E3A8A'}}>
              <p className="font-semibold mb-1">Hvilken kvote gjelder for deg?</p>
              <p className="mb-2">Hvis du går ut av videregående for første gang i år, tilhører du sannsynligvis <strong>førstegangsvitnemålskvoten</strong> – som ofte har lavere poenggrense. Har du gått ut tidligere, eller forbedret karakterer, tilhører du <strong>ordinær kvote</strong>.</p>
              <p>Vi viser nå ordinære poenggrenser. Sjekk <a href="https://www.samordnaopptak.no" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>Samordna opptak</a> for å bekrefte hvilken kvote som gjelder for deg.</p>
            </div>
          )}

          <button onClick={finnStudier} className="w-full text-white py-4 rounded-xl font-semibold text-base transition" style={{background: '#0D1B2A'}}>Finn studier</button>
        </div>

        <div id="resultater">
          {laster && <div className="text-center py-8" style={{color: '#98A2B3'}}>Laster...</div>}

          {sokt && !laster && <FeedbackBoks snitt={snitt} kvote={kvote} />}

          {sokt && !laster && !harNullTreff && resultater.filter(s => s.margin >= 0).length > 0 && (
            <div>
              {/* DEL 2: Forsiktig oppsummeringstekst */}
              <div className="rounded-xl px-5 py-4 mb-3" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)'}}>
                <p className="font-bold text-lg" style={{color: '#0D1B2A'}}>
                  Basert på snittet ditt ({snitttall}) fant vi {godSjanseAntall} studier med tilgjengelig poenggrense
                </p>
                <p className="text-sm mt-1" style={{color: '#1E3A8A'}}>
                  Dette er en veiledende vurdering basert på tidligere poenggrenser. Kvoter kan påvirke resultatet.
                  {manglendeListe.length > 0 && ` ${manglendeListe.length} studier hadde ikke tilgjengelig poenggrense og vises ikke i disse resultatene.`}
                </p>
              </div>
              <div className="rounded-xl px-4 py-3 mb-4 text-sm" style={{background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e'}}>
                Resultatene er veiledende og basert på tidligere poenggrenser. Poenggrenser varierer fra år til år, og kvoter kan påvirke vurderingen. Sjekk alltid lærestedets og <a href="https://www.samordnaopptak.no" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>Samordna opptaks</a> egne sider før du søker.
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center mb-5">
                <button onClick={() => setKunGodSjanse(!kunGodSjanse)} className="px-4 py-2 rounded-xl text-sm font-medium transition" style={{background: kunGodSjanse ? '#059669' : 'white', color: kunGodSjanse ? 'white' : '#475467', border: kunGodSjanse ? '1px solid #059669' : '1px solid #E4E9F2'}}>Vis kun god sjanse</button>
                <button onClick={() => setSortering(sortering === 'standard' ? 'beste' : 'standard')} className="px-4 py-2 rounded-xl text-sm font-medium transition" style={{background: sortering === 'beste' ? '#1E3A8A' : 'white', color: sortering === 'beste' ? 'white' : '#475467', border: sortering === 'beste' ? '1px solid #1E3A8A' : '1px solid #E4E9F2'}}>{sortering === 'beste' ? 'Sortert: beste match' : 'Sorter etter beste match'}</button>
                <p className="text-sm sm:ml-auto" style={{color: '#98A2B3'}}>{viste.length} av {sorterteAlle.length} studier vises</p>
              </div>
              <p className="font-semibold mb-3" style={{color: '#0D1B2A'}}>Mulige studier basert på tidligere poenggrenser</p>
            </div>
          )}

          {harNullTreff && (
            <div>
              <div className="rounded-xl px-5 py-4 mb-4" style={{background: '#fffbeb', border: '1px solid #fde68a'}}>
                <p className="font-bold" style={{color: '#92400e'}}>Vi fant ingen studier som matcher alle valgene dine</p>
                <p className="text-sm mt-1" style={{color: '#92400e'}}>Her er relevante alternativer basert på fagområde og nærliggende steder.</p>
              </div>
              {alternativer.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold mb-1" style={{color: '#0D1B2A'}}>Alternative muligheter</p>
                  <p className="text-sm mb-4" style={{color: '#475467'}}>Disse studiene matcher ikke alle valgene dine, men kan være relevante basert på fagområde eller sted.</p>
                  <div className="space-y-3">
                    {alternativer.map((s, i) => (
                      <div key={i} className="rounded-xl p-4" style={{border: '1px solid #E4E9F2', background: 'white'}}>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start gap-2 flex-wrap">
                            <h2 className="font-semibold text-base" style={{color: '#0D1B2A'}}>{s.study_name}</h2>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.status.color}`}>{s.status.label}</span>
                          </div>
                          <p className="text-sm" style={{color: '#475467'}}>{s.university} – {s.location}</p>
                          <div className="flex items-center gap-3 text-sm flex-wrap">
                            <span style={{color: '#475467'}}>Tidligere poenggrense: <strong style={{color: '#0D1B2A'}}>{s.relevantCutoff}</strong></span>
                            <span style={{color: s.margin >= 0 ? '#059669' : '#e11d48', fontWeight: '500'}}>{s.margin >= 0 ? '+' : ''}{s.margin.toFixed(1)} poeng</span>
                          </div>
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition text-center" style={{background: '#0D1B2A'}}>Gå til skolens nettside</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-4 mt-4">
            {viste.map((s, i) => {
              // DEL 1: Aldri "Beste match" eller "God sjanse"-badge for studier med manglende data
              const erBeste = i < 3 && s.status.label === 'God sjanse' && !s.manglerKvotedata
              return (
                <div key={s.id} className="rounded-xl transition" style={{padding: erBeste ? '20px' : '16px', border: erBeste ? '1.5px solid #1E3A8A' : '1px solid #E4E9F2', boxShadow: erBeste ? '0 8px 24px rgba(30,58,138,0.12)' : '0 1px 2px rgba(13,27,42,0.04)', background: erBeste ? 'rgba(30,58,138,0.025)' : 'white'}}>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h2 className="font-semibold text-base" style={{color: '#0D1B2A'}}>{s.study_name}</h2>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.status.color}`}>{s.status.label}</span>
                      {erBeste && <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background: '#1E3A8A', color: 'white'}}>⭐ Beste match</span>}
                    </div>
                    <p className="text-sm" style={{color: '#475467'}}>{s.university} – {s.location}</p>

                    {/* DEL 1: Vis "Poenggrense mangler" i stedet for feil data */}
                    {s.manglerKvotedata ? (
                      <div className="rounded-lg px-3 py-2 text-sm" style={{background: '#F6F9FC', border: '1px solid #E4E9F2'}}>
                        <p className="font-medium" style={{color: '#475467'}}>Poenggrense mangler for valgt kvote</p>
                        <p className="text-xs mt-0.5" style={{color: '#98A2B3'}}>Sjekk Samordna opptak eller lærestedets side.</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm flex-wrap">
                        {kvotetekst && <span style={{color: '#475467'}}>Kvote: <strong style={{color: '#0D1B2A'}}>{kvotetekst}</strong></span>}
                        <span style={{color: '#475467'}}>Poenggrense: <strong style={{color: '#0D1B2A'}}>{s.relevantCutoff}</strong></span>
                        <span style={{color: '#475467'}}>Snitt: <strong style={{color: '#0D1B2A'}}>{snitttall}</strong></span>
                        <span style={{color: s.margin >= 0 ? '#059669' : '#e11d48', fontWeight: '500'}}>{s.margin >= 0 ? '+' : ''}{s.margin.toFixed(1)} poeng</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span className="inline-block text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(30,58,138,0.08)', color: '#1E3A8A'}}>{s.fagomraade}</span>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition text-center flex-shrink-0" style={{background: '#0D1B2A'}}>Gå til skolens nettside</a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* DEL 1: Studier med manglende poenggrense vises nederst i egen seksjon */}
          {sokt && !laster && manglendeListe.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setVisManglende(!visManglende)}
                className="text-sm font-medium px-5 py-2 rounded-xl transition w-full sm:w-auto"
                style={{border: '1px solid #E4E9F2', color: '#98A2B3', background: 'white'}}
              >
                {visManglende ? 'Skjul' : `Vis ${manglendeListe.length} studier med manglende poenggrense`}
              </button>
              {visManglende && (
                <div className="mt-3 space-y-3">
                  <p className="text-xs" style={{color: '#98A2B3'}}>Disse studiene har ikke tilgjengelig poenggrense for valgt kvote. Sjekk Samordna opptak direkte.</p>
                  {manglendeListe.map((s, i) => (
                    <div key={i} className="rounded-xl p-4" style={{border: '1px solid #E4E9F2', background: '#F6F9FC'}}>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 flex-wrap">
                          <h2 className="font-semibold text-sm" style={{color: '#475467'}}>{s.study_name}</h2>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200">Data mangler</span>
                        </div>
                        <p className="text-xs" style={{color: '#98A2B3'}}>{s.university} – {s.location}</p>
                        <p className="text-xs" style={{color: '#98A2B3'}}>Poenggrense for valgt kvote mangler – sjekk Samordna opptak.</p>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline" style={{color: '#1E3A8A'}}>Gå til skolens nettside →</a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {sokt && !laster && visAntall < sorterteAlle.length && (
            <div className="text-center mt-6">
              <button onClick={() => setVisAntall(v => v + BATCH)} className="bg-white px-8 py-3 rounded-xl font-medium transition" style={{border: '1px solid #E4E9F2', color: '#475467'}}>Vis flere studier</button>
            </div>
          )}

          {sokt && !laster && viste.length > 0 && (
            <div className="text-center mt-6">
              <button onClick={delResultat} className="text-sm font-medium px-6 py-2 rounded-xl transition" style={{border: '1px solid #E4E9F2', color: '#475467', background: 'white'}}>
                {delt ? '✓ Kopiert!' : '🔗 Del resultatet mitt'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

const bachelorStudier = ['Bachelor i økonomi og administrasjon','Bachelor i regnskap og revisjon','Bachelor i markedsføring og ledelse','Bachelor i internasjonal business','Bachelor i finans','Bachelor i rettsvitenskap / jus','Bachelor i psykologi','Bachelor i sosiologi','Bachelor i statsvitenskap','Bachelor i samfunnsøkonomi','Bachelor i filosofi','Bachelor i pedagogikk','Bachelor i informatikk','Bachelor i datateknologi','Bachelor i kunstig intelligens','Bachelor i cybersikkerhet','Bachelor i ingeniør – data','Bachelor i ingeniør – maskin','Bachelor i ingeniør – bygg','Bachelor i ingeniør – elektronikk','Bachelor i ingeniør – energi','Bachelor i matematikk','Bachelor i fysikk','Bachelor i kjemi','Bachelor i biologi','Bachelor i bioteknologi','Bachelor i sykepleie','Bachelor i ergoterapi','Bachelor i fysioterapi','Bachelor i bioingeniør','Bachelor i radiografi','Bachelor i paramedisin','Bachelor i farmasi','Bachelor i tannpleie','Bachelor i folkehelse','Bachelor i barnevern','Bachelor i sosialt arbeid','Bachelor i vernepleie','Bachelor i journalistikk','Bachelor i medievitenskap','Bachelor i kommunikasjon','Bachelor i film og TV-produksjon','Bachelor i kunst og design','Bachelor i arkitektur','Bachelor i musikkvitenskap','Bachelor i idrettsvitenskap','Bachelor i friluftsliv','Bachelor i lærerutdanning 1–7','Bachelor i lærerutdanning 5–10','Bachelor i historie','Bachelor i geografi','Bachelor i nordisk språk og litteratur','Bachelor i engelsk','Bachelor i fransk','Bachelor i tysk','Bachelor i spansk','Bachelor i arabisk','Bachelor i kinesisk','Bachelor i russisk','Bachelor i landbruk','Bachelor i havbruk','Bachelor i veterinærmedisin','Bachelor i miljøvitenskap','Bachelor i geologi','Bachelor i nanoteknologi']

const bachelorTilKategori: any = {'Bachelor i økonomi og administrasjon':'Økonomi','Bachelor i regnskap og revisjon':'Økonomi','Bachelor i markedsføring og ledelse':'Økonomi','Bachelor i internasjonal business':'Økonomi','Bachelor i finans':'Økonomi','Bachelor i rettsvitenskap / jus':'Lov og orden','Bachelor i psykologi':'Helse','Bachelor i sosiologi':'Samfunn','Bachelor i statsvitenskap':'Samfunn','Bachelor i samfunnsøkonomi':'Økonomi','Bachelor i filosofi':'Samfunn','Bachelor i pedagogikk':'Pedagogikk','Bachelor i informatikk':'IT og data','Bachelor i datateknologi':'IT og data','Bachelor i kunstig intelligens':'IT og data','Bachelor i cybersikkerhet':'IT og data','Bachelor i ingeniør – data':'Teknologi','Bachelor i ingeniør – maskin':'Teknologi','Bachelor i ingeniør – bygg':'Bygg og anlegg','Bachelor i ingeniør – elektronikk':'Elektronikk','Bachelor i ingeniør – energi':'Olje, gass og energi','Bachelor i matematikk':'Realfag','Bachelor i fysikk':'Realfag','Bachelor i kjemi':'Realfag','Bachelor i biologi':'Natur','Bachelor i bioteknologi':'Realfag','Bachelor i sykepleie':'Helse','Bachelor i ergoterapi':'Helse','Bachelor i fysioterapi':'Helse','Bachelor i bioingeniør':'Helse','Bachelor i radiografi':'Helse','Bachelor i paramedisin':'Helse','Bachelor i farmasi':'Helse','Bachelor i tannpleie':'Helse','Bachelor i folkehelse':'Helse','Bachelor i barnevern':'Barn','Bachelor i sosialt arbeid':'Mennesker','Bachelor i vernepleie':'Helse','Bachelor i journalistikk':'Media og kommunikasjon','Bachelor i medievitenskap':'Media og kommunikasjon','Bachelor i kommunikasjon':'Media og kommunikasjon','Bachelor i film og TV-produksjon':'Media og kommunikasjon','Bachelor i kunst og design':'Design','Bachelor i arkitektur':'Bygg og anlegg','Bachelor i musikkvitenskap':'Kunst og kultur','Bachelor i idrettsvitenskap':'Idrett','Bachelor i friluftsliv':'Idrett','Bachelor i lærerutdanning 1–7':'Pedagogikk','Bachelor i lærerutdanning 5–10':'Pedagogikk','Bachelor i historie':'Historie','Bachelor i geografi':'Natur','Bachelor i nordisk språk og litteratur':'Språk','Bachelor i engelsk':'Språk','Bachelor i fransk':'Språk','Bachelor i tysk':'Språk','Bachelor i spansk':'Språk','Bachelor i arabisk':'Språk','Bachelor i kinesisk':'Språk','Bachelor i russisk':'Språk','Bachelor i landbruk':'Landbruk','Bachelor i havbruk':'Fiskeri og havbruk','Bachelor i veterinærmedisin':'Dyr','Bachelor i miljøvitenskap':'Klima og miljø','Bachelor i geologi':'Realfag','Bachelor i nanoteknologi':'Teknologi'}

// DEL 4: Utvidet mapping – psykologi gir treff i flere fagkategorier
const bachelorTilRelaterteFag: any = {
  'Bachelor i psykologi': ['Helse', 'Samfunn', 'Pedagogikk', 'Mennesker', 'Barn'],
  'Bachelor i sosiologi': ['Samfunn', 'Mennesker', 'Pedagogikk', 'Barn'],
  'Bachelor i statsvitenskap': ['Samfunn', 'Lov og orden', 'Økonomi'],
  'Bachelor i filosofi': ['Samfunn', 'Pedagogikk'],
  'Bachelor i pedagogikk': ['Pedagogikk', 'Barn', 'Helse', 'Mennesker'],
  'Bachelor i sosialt arbeid': ['Mennesker', 'Barn', 'Helse', 'Samfunn'],
  'Bachelor i barnevern': ['Barn', 'Helse', 'Mennesker', 'Samfunn'],
  'Bachelor i folkehelse': ['Helse', 'Samfunn', 'Idrett'],
  'Bachelor i sykepleie': ['Helse', 'Pedagogikk'],
  'Bachelor i idrettsvitenskap': ['Idrett', 'Helse', 'Pedagogikk'],
  'Bachelor i journalistikk': ['Media og kommunikasjon', 'Samfunn'],
  'Bachelor i kommunikasjon': ['Media og kommunikasjon', 'Økonomi', 'Samfunn'],
  'Bachelor i økonomi og administrasjon': ['Økonomi', 'Teknologi', 'Samfunn'],
}

// DEL 4: masterFagomraadeTilKategorier – kobler masterens fagområde (fra Supabase) til bachelor-kategorier
const masterFagTilBachelorKategorier: any = {
  'Psykologi': ['Helse', 'Samfunn', 'Pedagogikk', 'Mennesker', 'Barn'],
  'Helse': ['Helse', 'Idrett', 'Natur', 'Pedagogikk'],
  'Samfunnsfag': ['Samfunn', 'Lov og orden', 'Økonomi', 'Pedagogikk', 'Mennesker'],
  'Pedagogikk': ['Pedagogikk', 'Barn', 'Helse', 'Samfunn', 'Mennesker'],
  'Økonomi': ['Økonomi', 'IT og data', 'Teknologi'],
  'Informatikk': ['IT og data', 'Teknologi', 'Realfag'],
  'Ingeniør': ['Teknologi', 'Realfag', 'IT og data', 'Bygg og anlegg', 'Elektronikk'],
  'Realfag': ['Realfag', 'Natur', 'Teknologi'],
  'Jus': ['Lov og orden', 'Samfunn', 'Økonomi'],
  'Idrett': ['Idrett', 'Helse', 'Pedagogikk'],
  'Media': ['Media og kommunikasjon', 'Samfunn', 'Design'],
  'Kunst': ['Design', 'Kunst og kultur', 'Media og kommunikasjon'],
  'Språk': ['Språk', 'Pedagogikk', 'Samfunn'],
}

function BachelorSide({ tilbake }: { tilbake: () => void }) {
  const [bachelor, setBachelor] = useState('')
  const [karakter, setKarakter] = useState('')
  const [sokt, setSokt] = useState(false)
  const [valgteFag, setValgteFag] = useState<string[]>([])
  const [valgteByer, setValgteByer] = useState<string[]>([])
  const [delt, setDelt] = useState(false)
  const [visAlle, setVisAlle] = useState(false)
  const [alleMastere, setAlleMastere] = useState<any[]>([])
  const [laster, setLaster] = useState(false)

  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  useEffect(() => {
    async function hentMastere() {
      setLaster(true)
      const { data } = await supabase.from('mastere_v2').select('*')
      setAlleMastere(data || [])
      setLaster(false)
    }
    hentMastere()
  }, [])

  const gradeOrder: any = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 }

  function toggleFag(fag: string) { setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]) }
  function toggleBy(by: string) { setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by]) }

  // DEL 4 & 5: Smartere matchlogikk – bachelorbakgrunn vektes tyngst, fagområde er preferanse ikke blokkering
  function getMasterStatus(m: any) {
    const kategori = bachelorTilKategori[bachelor]
    const relaterteKategorier = bachelorTilRelaterteFag[bachelor] || []
    const alleKategorier = kategori ? [kategori, ...relaterteKategorier] : relaterteKategorier

    // Sjekk om masterens requires_kategorier overlapper med bachelor-kategorier
    const direkteMatch = kategori && m.requires_kategorier?.includes(kategori)
    const relatertMatch = m.requires_kategorier?.some((k: string) => relaterteKategorier.includes(k))

    // Sjekk om masterens fagområde er relatert til bachelor via masterFagTilBachelorKategorier
    const masterFagKategorier = masterFagTilBachelorKategorier[m.fagomraade] || []
    const fagomraadeMatch = alleKategorier.some(k => masterFagKategorier.includes(k))

    const bachelorMatch = direkteMatch || relatertMatch || fagomraadeMatch
    const gradeMatch = karakter && m.requires_min_grade ? gradeOrder[karakter] >= gradeOrder[m.requires_min_grade] : false

    // DEL 5: Forsiktigere statustekst
    if (bachelorMatch && gradeMatch) return { label: 'Mulig match', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100', order: 0 }
    if (bachelorMatch && !gradeMatch) return { label: 'Sjekk krav', color: 'bg-amber-50 text-amber-700 border border-amber-100', order: 1 }
    return { label: 'Trolig ikke aktuell', color: 'bg-rose-50 text-rose-700 border border-rose-100', order: 2 }
  }

  // DEL 4: Filtreringslogikk – fagområde er preferanse, ikke hard blokkering
  const alleResultaterUfiltrert = sokt ? alleMastere.map(m => ({ ...m, status: getMasterStatus(m) })) : []

  const alleResultater = sokt ? alleResultaterUfiltrert.filter(m => {
    if (valgteByer.length > 0 && !valgteByer.includes(m.location)) return false
    // Fagområde brukes som preferanse – ikke fjern alle relevante treff
    if (valgteFag.length > 0) {
      const fagMatch = valgteFag.includes(m.fagomraade)
      // Behold uansett hvis det er sterk bachelormatch (order 0 eller 1), selv uten fagområdematch
      if (!fagMatch && m.status.order === 2) return false
    }
    return true
  }).sort((a, b) => a.status.order - b.status.order) : []

  // DEL 4: Vis relevante alternativer ved null treff
  const harTreffMedFilter = alleResultater.filter(m => m.status.order < 2).length > 0
  const alternativerVedNullTreff = !harTreffMedFilter && sokt
    ? alleResultaterUfiltrert.filter(m => m.status.order < 2).slice(0, 10)
    : []

  const resultater = visAlle ? alleResultater : alleResultater.filter(m => m.status.order < 2)
  const kvalifisert = alleResultater.filter(m => m.status.order === 0).length

  function delResultat() {
    const tekst = `Basert på bacheloren min fant StudieMatch ${kvalifisert} mulige masterprogram! Sjekk StudieMatch: ${window.location.href}`
    if (navigator.share) {
      navigator.share({ title: 'StudieMatch', text: tekst, url: window.location.href })
    } else {
      navigator.clipboard.writeText(tekst)
      setDelt(true)
      setTimeout(() => setDelt(false), 2000)
    }
  }

  return (
    <main className="min-h-screen" style={{background: '#F6F9FC'}}>
      <div className="max-w-4xl mx-auto px-4 py-8 overflow-x-hidden">
        <button onClick={tilbake} className="text-sm mb-6 font-medium hover:underline" style={{color: '#1E3A8A'}}>← Tilbake</button>
        <div className="text-center mb-6">
          <img src="/logo.png" alt="StudieMatch" className="mx-auto mb-4" style={{width: '160px', height: 'auto'}} />
          <p style={{color: '#475467'}}>Se hvilke masterprogram du kan være kvalifisert for</p>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6" style={{border: '1px solid #E4E9F2', boxShadow: '0 1px 2px rgba(13,27,42,0.04), 0 4px 12px rgba(13,27,42,0.04)'}}>
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start mb-5">
            <div className="w-full sm:flex-1 sm:min-w-64">
              <Label text="Hva har du studert?" hint="Velg bachelorutdanningen din fra listen" />
              {/* DEL 7: Native select – fungerer optimalt på iPhone */}
              <select
                value={bachelor}
                onChange={e => setBachelor(e.target.value)}
                className="rounded-xl px-4 py-3 text-sm w-full bg-white focus:outline-none"
                style={{border: '1px solid #E4E9F2', color: bachelor ? '#0D1B2A' : '#98A2B3', minHeight: '48px'}}
              >
                <option value="">Velg bachelorutdanning</option>
                {bachelorStudier.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <Label text="Karakternivå" hint="Hva er karakternivået ditt?" />
              <select
                value={karakter}
                onChange={e => setKarakter(e.target.value)}
                className="rounded-xl px-4 py-3 text-sm bg-white focus:outline-none w-full"
                style={{border: '1px solid #E4E9F2', color: karakter ? '#0D1B2A' : '#98A2B3', minHeight: '48px'}}
              >
                <option value="">Velg karakter</option>
                <option value="A">A – Fremragende</option>
                <option value="B">B – Meget god</option>
                <option value="C">C – God</option>
                <option value="D">D – Nokså god</option>
                <option value="E">E – Tilstrekkelig</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start mb-5">
            <div className="w-full sm:w-auto">
              <Label text="By" hint="Hvilken by ønsker du å studere i?" />
              <Dropdown label="Velg by" options={masterByer} valgte={valgteByer} toggle={toggleBy} nullstill={() => setValgteByer([])} />
            </div>
            <div className="w-full sm:w-auto">
              <Label text="Fagområde" hint="Filtrer på fagområde (valgfritt)" />
              <Dropdown label="Velg fagområde" options={masterFagomraader} valgte={valgteFag} toggle={toggleFag} nullstill={() => setValgteFag([])} />
            </div>
          </div>

          {/* DEL 5: Tydelig forbehold om mastertekst */}
          <div className="mb-4 rounded-xl px-4 py-3 text-sm" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)', color: '#1E3A8A'}}>
            Dette er en forenklet vurdering basert på tilgjengelige opptakskrav. Masterkrav kan variere med fagkombinasjon, studiepoeng og lærestedets vurdering. Sjekk alltid den offisielle programsiden.
          </div>

          <button
            onClick={() => {
              if (bachelor && karakter) {
                setSokt(true); setVisAlle(false)
                setTimeout(() => { document.getElementById('resultater-master')?.scrollIntoView({ behavior: 'smooth' }) }, 300)
              }
            }}
            className="w-full text-white py-4 rounded-xl font-semibold text-base transition"
            style={{background: '#0D1B2A'}}
          >
            {laster ? 'Laster...' : 'Finn masterprogram'}
          </button>
        </div>

        {sokt && <FeedbackBoks snitt={bachelor} kvote={karakter} />}

        {sokt && alleResultater.length > 0 && (
          <div>
            {/* DEL 2 & 5: Forsiktig oppsummeringstekst */}
            <div className="rounded-xl px-5 py-4 mb-3" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)'}}>
              <p className="font-bold" style={{color: '#0D1B2A'}}>
                Vi fant {kvalifisert} mulige masterprogram basert på bacheloren din
              </p>
              <p className="text-sm mt-1" style={{color: '#1E3A8A'}}>
                Dette er en forenklet vurdering. Resultater merket "Mulig match" kan oppfylle kravene – sjekk alltid den offisielle siden.
              </p>
            </div>
            <div className="rounded-xl px-4 py-3 mb-4 text-sm" style={{background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e'}}>
              Resultatene er veiledende og basert på tilgjengelige opptakskrav. Masterkrav varierer mellom læresteder, og du må alltid sjekke den offisielle programsiden før du søker.
            </div>
          </div>
        )}

        {/* DEL 4: Vis alternativer hvis fagområdefilter gir null treff */}
        {sokt && !harTreffMedFilter && alternativerVedNullTreff.length > 0 && (
          <div className="mb-6">
            <div className="rounded-xl px-5 py-4 mb-4" style={{background: '#fffbeb', border: '1px solid #fde68a'}}>
              <p className="font-bold" style={{color: '#92400e'}}>Vi fant ingen masterprogram som matcher alle valgene dine</p>
              <p className="text-sm mt-1" style={{color: '#92400e'}}>Her er relevante alternativer basert på bacheloren din, uten fagområdefilter.</p>
            </div>
            <p className="font-semibold mb-3" style={{color: '#0D1B2A'}}>Relevante alternativer basert på bacheloren din</p>
            <div className="space-y-3">
              {alternativerVedNullTreff.map((m, i) => (
                <div key={i} className="rounded-xl p-4" style={{border: '1px solid #E4E9F2', background: 'white'}}>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h2 className="font-semibold text-base" style={{color: '#0D1B2A'}}>{m.name}</h2>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status.color}`}>{m.status.label}</span>
                    </div>
                    <p className="text-sm" style={{color: '#475467'}}>{m.school} – {m.location}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(30,58,138,0.08)', color: '#1E3A8A'}}>{m.fagomraade}</span>
                      <span className="text-xs" style={{color: '#98A2B3'}}>Krav: min. karakter <strong style={{color: '#475467'}}>{m.requires_min_grade}</strong></span>
                    </div>
                    <a href={m.study_url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition text-center" style={{background: '#0D1B2A'}}>Gå til skolens nettside</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div id="resultater-master" className="space-y-3 mt-6">
          {resultater.map((m, i) => {
            // DEL 5: "Beste match" kun for "Mulig match", ikke for "Sjekk krav"
            const erBeste = i < 3 && m.status.order === 0
            return (
              <div key={i} className="rounded-xl transition" style={{padding: erBeste ? '20px' : '16px', border: erBeste ? '1.5px solid #1E3A8A' : '1px solid #E4E9F2', boxShadow: erBeste ? '0 8px 24px rgba(30,58,138,0.12)' : '0 1px 2px rgba(13,27,42,0.04)', background: erBeste ? 'rgba(30,58,138,0.025)' : 'white'}}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h2 className="font-semibold text-base" style={{color: '#0D1B2A'}}>{m.name}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status.color}`}>{m.status.label}</span>
                    {erBeste && <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background: '#1E3A8A', color: 'white'}}>⭐ Beste match</span>}
                  </div>
                  <p className="text-sm" style={{color: '#475467'}}>{m.school} – {m.location}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(30,58,138,0.08)', color: '#1E3A8A'}}>{m.fagomraade}</span>
                    <span className="text-xs" style={{color: '#98A2B3'}}>Krav: min. karakter <strong style={{color: '#475467'}}>{m.requires_min_grade}</strong></span>
                  </div>
                  {/* DEL 5: Forsiktig hjelpetekst per kort */}
                  {m.status.order === 0 && (
                    <p className="text-xs" style={{color: '#98A2B3'}}>Kan oppfylle krav – sjekk den offisielle programsiden for detaljer.</p>
                  )}
                  {m.status.order === 1 && (
                    <p className="text-xs" style={{color: '#98A2B3'}}>Bacheloren din kan være relevant – men karakterkravet er høyere. Sjekk om fagkombinasjon gir dispensasjon.</p>
                  )}
                  <a href={m.study_url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition text-center" style={{background: '#0D1B2A'}}>Gå til skolens nettside</a>
                </div>
              </div>
            )
          })}
        </div>

        {sokt && alleResultater.filter(m => m.status.order === 2).length > 0 && (
          <div className="text-center mt-4">
            <button onClick={() => setVisAlle(!visAlle)} className="text-sm font-medium px-6 py-2 rounded-xl transition" style={{border: '1px solid #E4E9F2', color: '#475467', background: 'white'}}>
              {visAlle ? 'Skjul programmer som trolig ikke er aktuelle' : `Vis også ${alleResultater.filter(m => m.status.order === 2).length} programmer som trolig ikke er aktuelle`}
            </button>
          </div>
        )}

        {sokt && resultater.length > 0 && (
          <div className="text-center mt-4">
            <button onClick={delResultat} className="text-sm font-medium px-6 py-2 rounded-xl transition" style={{border: '1px solid #E4E9F2', color: '#475467', background: 'white'}}>
              {delt ? '✓ Kopiert!' : '🔗 Del resultatet mitt'}
            </button>
          </div>
        )}

        <p className="text-xs text-center mt-6 max-w-md mx-auto leading-relaxed" style={{color: '#98A2B3'}}>
          Dette er en forenklet vurdering basert på tilgjengelige opptakskrav. Masterkrav kan variere med fagkombinasjon, studiepoeng og lærestedets vurdering. Sjekk alltid den offisielle programsiden før du søker.
        </p>
      </div>
    </main>
  )
}
