'use client'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [valg, setValg] = useState<'start' | 'vgs' | 'bachelor'>('start')

  if (valg === 'vgs') return <VGSSide tilbake={() => setValg('start')} />
  if (valg === 'bachelor') return <BachelorSide tilbake={() => setValg('start')} />

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12" style={{background: '#F6F9FC'}}>
      <div className="max-w-2xl w-full mx-auto py-12 text-center">
        {/* FIX 1: Logo uten hvit boks – bruk object-contain og ingen bg */}
        <img src="/logo.png" alt="StudieMatch" className="mx-auto mt-4 mb-8" style={{width: '180px', height: 'auto', display: 'block'}} />
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{color: '#1E3A8A'}}>Finn studier på 10 sekunder</p>
        <p className="text-lg mb-4 max-w-xl mx-auto leading-relaxed" style={{color: '#475467'}}>
          Skriv inn snittet ditt eller bacheloren din – og se hvilke studier du kan være kvalifisert for
        </p>
        <p className="text-sm mb-8 max-w-xl mx-auto" style={{color: '#98A2B3'}}>
          Basert på tidligere poenggrenser og tilgjengelige opptakskrav.
        </p>
        <p className="font-semibold mb-4 text-lg" style={{color: '#0D1B2A'}}>Hva passer deg best?</p>
        {/* FIX 2: grid-cols-1 på mobil alltid, sm:grid-cols-2 på større skjermer */}
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
          Resultatene er veiledende og basert på tidligere poenggrenser og tilgjengelige opptakskrav.  Sjekk alltid lærestedets egne siderfør du søker.
        </p>
        <section className="mt-12 max-w-2xl mx-auto text-left px-2">
          <h2 className="text-lg font-bold mb-2" style={{color: '#0D1B2A'}}>Hvilke studier kan jeg komme inn på?</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{color: '#475467'}}>
            Skriv inn karaktersnittet ditt og se hvilke bachelorstudier du kan være kvalifisert for – basert på poenggrenser fra Samordna opptak 2025. StudieMatch dekker hundrevis av studier ved norske læresteder som UiO, NTNU, UiB, UiT, OsloMet og BI.
          </p>
          <h2 className="text-lg font-bold mb-2" style={{color: '#0D1B2A'}}>Poenggrenser 2025</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{color: '#475467'}}>
            Poenggrensene varierer hvert år og mellom kvotene. På StudieMatch kan du velge mellom førstegangsvitnemålskvoten og ordinær kvote for å få mest mulig riktige tall. Resultatene er veiledende – sjekk alltid Samordna opptak før du søker.
          </p>
          <h2 className="text-lg font-bold mb-2" style={{color: '#0D1B2A'}}>Finn masterprogram basert på bacheloren din</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{color: '#475467'}}>
            Har du en bachelor og lurer på hvilke masterprogram du kan søke på? Velg bachelorutdanningen din og karakternivå, så matcher StudieMatch deg mot relevante masterprogram i Norge.
          </p>
          <h2 className="text-lg font-bold mb-2" style={{color: '#0D1B2A'}}>Karakterkrav til bachelor 2025</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{color: '#475467'}}>
            Karakterkravene til bachelorstudier oppgis i poeng fra Samordna opptak. Poengene regnes ut fra gjennomsnittet ditt pluss eventuelle tilleggspoeng for eksamen, folkehøyskole eller realfag. Mange populære studier som medisin, psykologi og jus har høye poenggrenser, mens andre studier har lavere krav.
          </p>
          <h2 className="text-lg font-bold mb-2" style={{color: '#0D1B2A'}}>Samordna opptak 2025 – hva du trenger å vite</h2>
          <p className="text-sm mb-6 leading-relaxed" style={{color: '#475467'}}>
            Samordna opptak koordinerer opptak til de fleste høyere utdanninger i Norge. Søknadsfristen er 15. april, og svar kommer i juli. StudieMatch bruker poenggrenser fra Samordna opptak 2024 som veiledning for hva du kan forvente i 2025.
          </p>
        </section>
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
const universitetNavn: any = {
  'AHO': 'Arkitektur- og designhøgskolen i Oslo',
  'AHS': 'Ansgar Høgskole',
  'HIM': 'Høgskolen i Molde',
  'HIØ': 'Høgskolen i Østfold',
  'HVL': 'Høgskulen på Vestlandet',
  'HVO': 'Høgskulen i Volda',
  'INN': 'Høgskolen i Innlandet',
  'LDH': 'Lovisenberg diakonale høgskole',
  'NHH': 'Norges Handelshøyskole',
  'NIH': 'Norges idrettshøgskole',
  'NLA': 'NLA Høgskolen',
  'NMBU': 'Norges miljø- og biovitenskapelige universitet',
  'NORD': 'Nord universitet',
  'NTNU': 'NTNU',
  'OSLOMET': 'OsloMet',
  'PHS': 'Politihøgskolen',
  'UIA': 'Universitetet i Agder',
  'UIB': 'Universitetet i Bergen',
  'UIO': 'Universitetet i Oslo',
  'UIS': 'Universitetet i Stavanger',
  'UIT': 'Universitetet i Tromsø',
  'USN': 'Universitetet i Sørøst-Norge',
  'VID': 'VID vitenskapelige høgskole'
}
const alleStatligeSkoler = Object.values(universitetNavn).sort() as string[]
const allePrivateSkoler = ['Handelshøyskolen BI', 'Høyskolen Kristiania', 'Oslo Nye Høyskole', 'Noroff Høyskole']
const alleSkoler = [...alleStatligeSkoler, ...allePrivateSkoler].sort() as string[]
const masterFagomraader = ['Dyr','Helse','Idrett','Ingeniør','Kunst','Landbruk','Lov og orden','Media','Mennesker','Økonomi','Pedagogikk','Realfag','Reiseliv','Samfunnsfag','Sikkerhet og beredskap','Sjøfart','Språk','Transport']
const masterByer = ['Oslo','Bergen','Trondheim','Tromsø','Stavanger','Kristiansand','Gjøvik']

function Label({ text, hint }: { text: string, hint: string }) {
  return (
    <div className="mb-2">
      <p className="font-semibold text-sm" style={{color: '#0D1B2A'}}>{text}</p>
      <p className="text-sm mt-0.5" style={{color: '#475467'}}>{hint}</p>
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
    <div className="relative w-full" ref={ref}>
      {/* FIX 3: Dropdown-knapp full bredde på mobil */}
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition w-full" style={{border: valgte.length > 0 ? '1px solid #1E3A8A' : '1px solid #E4E9F2', color: valgte.length > 0 ? '#1E3A8A' : '#475467', background: valgte.length > 0 ? 'rgba(30,58,138,0.08)' : 'white'}}>
        <span className="flex-1 text-left">{label}</span>
        {valgte.length > 0 && <span className="text-white text-xs rounded-full px-2 py-0.5" style={{background: '#1E3A8A'}}>{valgte.length}</span>}
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 bg-white rounded-2xl shadow-xl p-3 w-64 max-h-72 overflow-y-auto" style={{border: '1px solid #E4E9F2'}}>
          {valgte.length > 0 && <button onClick={nullstill} className="text-xs text-red-500 hover:text-red-600 mb-2 block font-medium">Nullstill</button>}
          {options.map(opt => (
            <button key={opt} onClick={() => toggle(opt)} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition" style={{background: valgte.includes(opt) ? 'rgba(30,58,138,0.08)' : 'white', color: valgte.includes(opt) ? '#1E3A8A' : '#475467', fontWeight: valgte.includes(opt) ? '500' : 'normal'}}>
              <span className="w-4 h-4 rounded flex items-center justify-center text-xs flex-shrink-0" style={{background: valgte.includes(opt) ? '#1E3A8A' : 'white', border: valgte.includes(opt) ? '1px solid #1E3A8A' : '1px solid #E4E9F2', color: 'white'}}>{valgte.includes(opt) ? '✓' : ''}</span>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function getRelevantCutoff(s: any, kvote: string): { cutoff: number, mangler: boolean } {
  if (kvote === 'forstegangsvitnemal') {
    if (s.first_time_cutoff != null) return { cutoff: s.first_time_cutoff, mangler: false }
    return { cutoff: s.ordinary_cutoff ?? s.cutoff_score, mangler: true }
  }
  if (kvote === 'ordinaer') {
    return { cutoff: s.ordinary_cutoff ?? s.cutoff_score, mangler: false }
  }
  const ft = s.first_time_cutoff
  const ord = s.ordinary_cutoff ?? s.cutoff_score
  if (ft != null) return { cutoff: Math.max(ft, ord), mangler: false }
  return { cutoff: ord, mangler: false }
}

function getVGSStatus(snitt: number, grense: number) {
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
  const [alternativer, setAlternativer] = useState<any[]>([])
  const [laster, setLaster] = useState(false)
  const [sokt, setSokt] = useState(false)
  const [kunGodSjanse, setKunGodSjanse] = useState(false)
  const [sortering, setSortering] = useState<'standard' | 'beste'>('standard')
  const [visAntall, setVisAntall] = useState(BATCH)
  const [delt, setDelt] = useState(false)
  const [valgteSkOler, setValgteSkOler] = useState<string[]>([])
  const [privateSkoler, setPrivateSkoler] = useState<any[]>([])
  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  function toggleFag(fag: string) { setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]) }
  function toggleBy(by: string) { setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by]) }

  async function finnStudier() {
    if (!snitt) return
    setLaster(true); setSokt(true); setVisAntall(BATCH); setAlternativer([])
    setTimeout(() => {
      document.getElementById('resultater')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
    const snitttall = parseFloat(snitt)

    let query = supabase.from('studier').select('*').order('cutoff_score', { ascending: false })
    if (valgteFag.length > 0) query = query.in('fagomraade', valgteFag)
    if (valgteByer.length > 0) query = query.in('location', valgteByer)
    const { data } = await query
    const mapped = (data || []).filter((s: any) => {
    if (valgteSkOler.length === 0) return true
    const fulltNavn = universitetNavn[s.university] || s.university
  return valgteSkOler.includes(fulltNavn)
}).map((s: any) => {
      const { cutoff, mangler } = getRelevantCutoff(s, kvote)
      const margin = snitttall - cutoff
      return { ...s, relevantCutoff: cutoff, manglerKvotedata: mangler, status: getVGSStatus(snitttall, cutoff), margin }
    }).sort((a: any, b: any) => a.status.order - b.status.order)

    setResultater(mapped)

    const harTreff = mapped.filter((s: any) => s.margin >= 0).length > 0
    if (!harTreff && (valgteByer.length > 0 || valgteFag.length > 0)) {
      let altQuery = supabase.from('studier').select('*').order('cutoff_score', { ascending: false })
      if (valgteFag.length > 0) altQuery = altQuery.in('fagomraade', valgteFag)
      const { data: altData } = await altQuery
      const altMapped = (altData || [])
        .map((s: any) => {
          const { cutoff, mangler } = getRelevantCutoff(s, kvote)
          const margin = snitttall - cutoff
          return { ...s, relevantCutoff: cutoff, manglerKvotedata: mangler, status: getVGSStatus(snitttall, cutoff), margin }
        })
        .filter((s: any) => s.margin >= -5)
        .sort((a: any, b: any) => b.margin - a.margin)
        .slice(0, 10)
      setAlternativer(altMapped)
    }
    let privateQuery = supabase.from('private_skoler').select('*')
if (valgteFag.length > 0) privateQuery = privateQuery.in('fagomraade', valgteFag)
if (valgteByer.length > 0) privateQuery = privateQuery.in('location', valgteByer)
const { data: privateData } = await privateQuery
const filtrertePrivate = (privateData || []).filter((s: any) => {
  if (valgteSkOler.length === 0) return true
  return valgteSkOler.includes(s.university)
})
setPrivateSkoler(filtrertePrivate)

setLaster(false)
  }

  function delResultat() {
    const tekst = `Jeg kan være kvalifisert for ${godSjanseAntall} studier med snitt ${snitt}! Sjekk StudieMatch: ${window.location.href}`
    if (navigator.share) {
      navigator.share({ title: 'StudieMatch', text: tekst, url: window.location.href })
    } else {
      navigator.clipboard.writeText(tekst)
      setDelt(true)
      setTimeout(() => setDelt(false), 2000)
    }
  }

  const snitttall = parseFloat(snitt)
  const filtrerte = kunGodSjanse ? resultater.filter(s => s.status.label === 'God sjanse') : resultater
  const sorterteAlle = sortering === 'beste' ? [...filtrerte].sort((a, b) => b.margin - a.margin) : filtrerte
  const viste = sorterteAlle.slice(0, visAntall)
  const godSjanseAntall = resultater.filter(s => s.status.label === 'God sjanse').length
  const harNullTreff = sokt && !laster && resultater.filter(s => s.margin >= 0).length === 0
  const kvotetekst = kvote === 'forstegangsvitnemal' ? 'Førstegangsvitnemål' : kvote === 'ordinaer' ? 'Ordinær kvote' : ''

  return (
    <main className="min-h-screen" style={{background: '#F6F9FC'}}>
      {/* FIX 4: overflow-x-hidden for å stoppe horisontal scroll */}
      <div className="max-w-4xl mx-auto px-4 py-8 overflow-x-hidden">
        <button onClick={tilbake} className="text-sm mb-6 font-medium hover:underline" style={{color: '#1E3A8A'}}>← Tilbake</button>
        <div className="text-center mb-6">
          <img src="/logo.png" alt="StudieMatch" className="mx-auto mb-4" style={{width: '160px', height: 'auto'}} />
          <p style={{color: '#475467'}}>Se hvilke bachelorstudier du kan være kvalifisert for</p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6" style={{border: '1px solid #E4E9F2', boxShadow: '0 1px 2px rgba(13,27,42,0.04), 0 4px 12px rgba(13,27,42,0.04)'}}>
          {/* FIX 5: Skjema – flex-col på mobil, flex-wrap på desktop */}
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start mb-5">
            <div className="w-full sm:flex-1 sm:min-w-48">
              <Label text="Karaktersnitt" hint="Skriv inn karaktergjennomsnittet ditt" />
              <input type="number" placeholder="F.eks. 52.4" value={snitt} onChange={e => setSnitt(e.target.value)} onKeyDown={e => e.key === 'Enter' && finnStudier()} className="rounded-xl px-4 py-3 text-sm w-full bg-white focus:outline-none" style={{border: '1px solid #E4E9F2', color: '#0D1B2A'}} />
            </div>
            <div className="w-full sm:w-auto">
              <Label text="Kvote" hint="Hvilken kvote gjelder for deg?" />
              <select value={kvote} onChange={e => setKvote(e.target.value)} className="rounded-xl px-4 py-3 text-sm bg-white focus:outline-none w-full" style={{border: '1px solid #E4E9F2', color: '#0D1B2A'}}>
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
            <div className="w-full sm:w-auto">
            <Label text="Skole" hint="Filtrer på en bestemt skole (valgfritt)" />
            <Dropdown label="Velg skole" options={alleSkoler} valgte={valgteSkOler} toggle={s => setValgteSkOler(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} nullstill={() => setValgteSkOler([])} />
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
              <div className="rounded-xl px-5 py-4 mb-3" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)'}}>
                <p className="font-bold text-lg" style={{color: '#0D1B2A'}}>Basert på snittet ditt ({snitttall}) kan du være kvalifisert for {godSjanseAntall} studier</p>
                <p className="text-sm mt-1" style={{color: '#1E3A8A'}}>Dette er en veiledende vurdering basert på tidligere poenggrenser. Kvoter kan påvirke resultatet.</p>
              </div>
              <div className="rounded-xl px-4 py-3 mb-4 text-sm" style={{background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e'}}>
                Resultatene er veiledende og basert på tidligere poenggrenser. Poenggrenser varierer fra år til år, og kvoter kan påvirke vurderingen. Sjekk alltid lærestedets og <a href="https://www.samordnaopptak.no" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>Samordna opptaks</a> egne sider før du søker.
              </div>
              {/* FIX 6: Filter-knapper stablet på mobil */}
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
                          {/* FIX 7: Knapp full bredde under innhold på mobil */}
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
              const erBeste = i < 3 && s.status.label === 'God sjanse'
              return (
                <div key={s.id} className="rounded-xl transition" style={{padding: erBeste ? '20px' : '16px', border: erBeste ? '1.5px solid #1E3A8A' : '1px solid #E4E9F2', boxShadow: erBeste ? '0 8px 24px rgba(30,58,138,0.12)' : '0 1px 2px rgba(13,27,42,0.04)', background: erBeste ? 'rgba(30,58,138,0.025)' : 'white'}}>
                  {/* FIX 7: Kortinnhold i kolonner, knapp under på mobil */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h2 className="font-semibold text-base" style={{color: '#0D1B2A'}}>{s.study_name}</h2>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.status.color}`}>{s.status.label}</span>
                      {erBeste && <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background: '#1E3A8A', color: 'white'}}>⭐ Beste match</span>}
                    </div>
                    <p className="text-sm" style={{color: '#475467'}}>{s.university} – {s.location}</p>
                    {s.krever_spesifikke_fag && <p className="text-xs" style={{color: '#92400e'}}>⚠️ Merk: dette studiet kan kreve spesifikke fag fra VGS</p>}
                    <div className="flex items-center gap-3 text-sm flex-wrap">
                      {kvotetekst && <span style={{color: '#475467'}}>Kvote: <strong style={{color: '#0D1B2A'}}>{kvotetekst}</strong></span>}
                      <span style={{color: '#475467'}}>Poenggrense: <strong style={{color: '#0D1B2A'}}>{s.relevantCutoff}</strong></span>
                      <span style={{color: '#475467'}}>Snitt: <strong style={{color: '#0D1B2A'}}>{snitttall}</strong></span>
                      <span style={{color: s.margin >= 0 ? '#059669' : '#e11d48', fontWeight: '500'}}>{s.margin >= 0 ? '+' : ''}{s.margin.toFixed(1)} poeng</span>
                    </div>
                    {s.manglerKvotedata && (
                      <p className="text-xs" style={{color: '#98A2B3'}}>Full kvotedata mangler – sjekk Samordna opptak for førstegangsvitnemålskvote.</p>
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
        {sokt && !laster && (
          <div className="mt-8">
            {privateSkoler.length > 0 && (
              <div>
                <div className="rounded-xl px-5 py-4 mb-3" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)'}}>
                  <p className="font-bold text-lg" style={{color: '#0D1B2A'}}>🏫 Private høyskoler</p>
                  <p className="text-sm mt-1" style={{color: '#1E3A8A'}}>Disse skolene har egne opptakskrav – ikke poengbasert opptak via Samordna opptak.</p>
                </div>
                <div className="space-y-3">
                  {privateSkoler.map((s: any, i: number) => (
                    <div key={i} className="rounded-xl p-4 bg-white" style={{border: '1px solid #E4E9F2'}}>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-base" style={{color: '#0D1B2A'}}>{s.study_name}</h2>
                        <p className="text-sm" style={{color: '#475467'}}>{s.university} – {s.location}</p>
                        <p className="text-sm" style={{color: '#475467'}}>{s.opptak_info}</p>
                        {s.pris_per_semester && <p className="text-xs" style={{color: '#98A2B3'}}>Pris: {s.pris_per_semester.toLocaleString('nb-NO')} kr per semester</p>}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(30,58,138,0.08)', color: '#1E3A8A'}}>{s.fagomraade}</span>
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold" style={{background: '#0D1B2A'}}>Gå til skolens nettside</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

const bachelorStudier = ['Bachelor i økonomi og administrasjon','Bachelor i regnskap og revisjon','Bachelor i markedsføring og ledelse','Bachelor i internasjonal business','Bachelor i finans','Bachelor i rettsvitenskap / jus','Bachelor i psykologi','Bachelor i sosiologi','Bachelor i statsvitenskap','Bachelor i samfunnsøkonomi','Bachelor i filosofi','Bachelor i pedagogikk','Bachelor i informatikk','Bachelor i datateknologi','Bachelor i kunstig intelligens','Bachelor i cybersikkerhet','Bachelor i ingeniør – data','Bachelor i ingeniør – maskin','Bachelor i ingeniør – bygg','Bachelor i ingeniør – elektronikk','Bachelor i ingeniør – energi','Bachelor i matematikk','Bachelor i fysikk','Bachelor i kjemi','Bachelor i biologi','Bachelor i bioteknologi','Bachelor i sykepleie','Bachelor i ergoterapi','Bachelor i fysioterapi','Bachelor i bioingeniør','Bachelor i radiografi','Bachelor i paramedisin','Bachelor i farmasi','Bachelor i tannpleie','Bachelor i folkehelse','Bachelor i barnevern','Bachelor i sosialt arbeid','Bachelor i vernepleie','Bachelor i journalistikk','Bachelor i medievitenskap','Bachelor i kommunikasjon','Bachelor i film og TV-produksjon','Bachelor i kunst og design','Bachelor i arkitektur','Bachelor i musikkvitenskap','Bachelor i idrettsvitenskap','Bachelor i friluftsliv','Bachelor i lærerutdanning 1–7','Bachelor i lærerutdanning 5–10','Bachelor i historie','Bachelor i geografi','Bachelor i nordisk språk og litteratur','Bachelor i engelsk','Bachelor i fransk','Bachelor i tysk','Bachelor i spansk','Bachelor i arabisk','Bachelor i kinesisk','Bachelor i russisk','Bachelor i landbruk','Bachelor i havbruk','Bachelor i veterinærmedisin','Bachelor i miljøvitenskap','Bachelor i geologi','Bachelor i nanoteknologi']

const bachelorTilKategori: any = {'Bachelor i økonomi og administrasjon':'Økonomi','Bachelor i regnskap og revisjon':'Økonomi','Bachelor i markedsføring og ledelse':'Økonomi','Bachelor i internasjonal business':'Økonomi','Bachelor i finans':'Økonomi','Bachelor i rettsvitenskap / jus':'Jus','Bachelor i psykologi':'Psykologi','Bachelor i sosiologi':'Samfunnsfag','Bachelor i statsvitenskap':'Samfunnsfag','Bachelor i samfunnsøkonomi':'Økonomi','Bachelor i filosofi':'Samfunnsfag','Bachelor i pedagogikk':'Pedagogikk','Bachelor i informatikk':'Informatikk','Bachelor i datateknologi':'Informatikk','Bachelor i kunstig intelligens':'Informatikk','Bachelor i cybersikkerhet':'Informatikk','Bachelor i ingeniør – data':'Ingeniør','Bachelor i ingeniør – maskin':'Ingeniør','Bachelor i ingeniør – bygg':'Ingeniør','Bachelor i ingeniør – elektronikk':'Ingeniør','Bachelor i ingeniør – energi':'Ingeniør','Bachelor i matematikk':'Realfag','Bachelor i fysikk':'Realfag','Bachelor i kjemi':'Realfag','Bachelor i biologi':'Realfag','Bachelor i bioteknologi':'Realfag','Bachelor i sykepleie':'Helse','Bachelor i ergoterapi':'Helse','Bachelor i fysioterapi':'Helse','Bachelor i bioingeniør':'Helse','Bachelor i radiografi':'Helse','Bachelor i paramedisin':'Helse','Bachelor i farmasi':'Helse','Bachelor i tannpleie':'Helse','Bachelor i folkehelse':'Helse','Bachelor i barnevern':'Helse','Bachelor i sosialt arbeid':'Helse','Bachelor i vernepleie':'Helse','Bachelor i journalistikk':'Media','Bachelor i medievitenskap':'Media','Bachelor i kommunikasjon':'Media','Bachelor i film og TV-produksjon':'Media','Bachelor i kunst og design':'Kunst','Bachelor i arkitektur':'Kunst','Bachelor i musikkvitenskap':'Kunst','Bachelor i idrettsvitenskap':'Idrett','Bachelor i friluftsliv':'Idrett','Bachelor i lærerutdanning 1–7':'Pedagogikk','Bachelor i lærerutdanning 5–10':'Pedagogikk','Bachelor i historie':'Samfunnsfag','Bachelor i geografi':'Samfunnsfag','Bachelor i nordisk språk og litteratur':'Språk','Bachelor i engelsk':'Språk','Bachelor i fransk':'Språk','Bachelor i tysk':'Språk','Bachelor i spansk':'Språk','Bachelor i arabisk':'Språk','Bachelor i kinesisk':'Språk','Bachelor i russisk':'Språk','Bachelor i landbruk':'Realfag','Bachelor i havbruk':'Realfag','Bachelor i veterinærmedisin':'Helse','Bachelor i miljøvitenskap':'Realfag','Bachelor i geologi':'Realfag','Bachelor i nanoteknologi':'Realfag'}

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
      const { data } = await supabase.from('mastere').select('*')
      setAlleMastere(data || [])
      setLaster(false)
    }
    hentMastere()
  }, [])

  const gradeOrder: any = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 }

  function toggleFag(fag: string) { setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]) }
  function toggleBy(by: string) { setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by]) }

  function getMasterStatus(m: any) {
    const kategori = bachelorTilKategori[bachelor]
    const bachelorMatch = kategori && m.requires_kategorier?.includes(kategori)
    const gradeMatch = gradeOrder[karakter] >= gradeOrder[m.requires_min_grade]
    if (bachelorMatch && gradeMatch) return { label: '✓ Oppfyller krav', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100', order: 0 }
    if (bachelorMatch && !gradeMatch) return { label: '⚠ Kanskje – sjekk krav', color: 'bg-amber-50 text-amber-700 border border-amber-100', order: 1 }
    return { label: '✗ Oppfyller ikke krav', color: 'bg-rose-50 text-rose-700 border border-rose-100', order: 2 }
  }

  const alleResultater = sokt ? alleMastere.filter(m => {
    if (valgteFag.length > 0 && !valgteFag.includes(m.fagomraade)) return false
    if (valgteByer.length > 0 && !valgteByer.includes(m.location)) return false
    return true
  }).map(m => ({ ...m, status: getMasterStatus(m) })).sort((a, b) => a.status.order - b.status.order) : []

  const resultater = visAlle ? alleResultater : alleResultater.filter(m => m.status.order < 2)
  const kvalifisert = alleResultater.filter(m => m.status.order === 0).length

  function delResultat() {
    const tekst = `Jeg kan være kvalifisert for ${kvalifisert} masterprogram! Sjekk StudieMatch: ${window.location.href}`
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
              <select value={bachelor} onChange={e => setBachelor(e.target.value)} className="rounded-xl px-4 py-3 text-sm w-full bg-white focus:outline-none" style={{border: '1px solid #E4E9F2', color: '#0D1B2A'}}>
                <option value="">Velg bachelorutdanning</option>
                {bachelorStudier.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <Label text="Karakternivå" hint="Hva er karakternivået ditt?" />
              <select value={karakter} onChange={e => setKarakter(e.target.value)} className="rounded-xl px-4 py-3 text-sm bg-white focus:outline-none w-full" style={{border: '1px solid #E4E9F2', color: '#0D1B2A'}}>
                <option value="">Velg karakter</option>
                <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start mb-5">
            <div className="w-full sm:w-auto">
              <Label text="By" hint="Hvilken by ønsker du å studere i?" />
              <Dropdown label="Velg by" options={masterByer} valgte={valgteByer} toggle={toggleBy} nullstill={() => setValgteByer([])} />
            </div>
            <div className="w-full sm:w-auto">
              <Label text="Fagområde" hint="Hvilke fagområder er du interessert i?" />
              <Dropdown label="Velg fagområde" options={masterFagomraader} valgte={valgteFag} toggle={toggleFag} nullstill={() => setValgteFag([])} />
            </div>
          </div>
          <button onClick={() => { if (bachelor && karakter) { setSokt(true); setVisAlle(false); setTimeout(() => { document.getElementById('resultater-master')?.scrollIntoView({ behavior: 'smooth' }) }, 300) } }} className="w-full text-white py-4 rounded-xl font-semibold text-base transition" style={{background: '#0D1B2A'}}>
            {laster ? 'Laster...' : 'Finn masterprogram'}
          </button>
        </div>

        {sokt && <FeedbackBoks snitt={bachelor} kvote={karakter} />}

        {sokt && (
          <div>
            <div className="rounded-xl px-5 py-4 mb-3" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)'}}>
              <p className="font-bold" style={{color: '#0D1B2A'}}>Basert på bacheloren din og karakterene dine kan du være kvalifisert for disse masterprogrammene:</p>
              <p className="text-sm mt-1" style={{color: '#1E3A8A'}}>Du oppfyller kravene til {kvalifisert} av {alleResultater.length} masterprogrammer</p>
            </div>
            <div className="rounded-xl px-4 py-3 mb-4 text-sm" style={{background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e'}}>
              Resultatene er veiledende og basert på tilgjengelige opptakskrav. Masterkrav varierer mellom læresteder, og du må alltid sjekke den offisielle programsiden før du søker.
            </div>
          </div>
        )}

        <div id="resultater-master" className="space-y-3 mt-6">
          {resultater.map((m, i) => {
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
                  <a href={m.study_url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition text-center" style={{background: '#0D1B2A'}}>Gå til skolens nettside</a>
                </div>
              </div>
            )
          })}
        </div>

        {sokt && alleResultater.filter(m => m.status.order === 2).length > 0 && (
          <div className="text-center mt-4">
            <button onClick={() => setVisAlle(!visAlle)} className="text-sm font-medium px-6 py-2 rounded-xl transition" style={{border: '1px solid #E4E9F2', color: '#475467', background: 'white'}}>
              {visAlle ? 'Skjul programmer du ikke kvalifiserer til' : `Vis også ${alleResultater.filter(m => m.status.order === 2).length} programmer du ikke kvalifiserer til`}
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

        <p className="text-xs text-center mt-6 max-w-md mx-auto leading-relaxed" style={{color: '#98A2B3'}}>Resultatene er veiledende og basert på tilgjengelige opptakskrav. Masterkrav varierer mellom læresteder, og du må alltid sjekke den offisielle programsiden før du søker.</p>
      </div>
    </main>
  )
}
