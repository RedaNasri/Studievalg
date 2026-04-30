'use client'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [valg, setValg] = useState<'start' | 'vgs' | 'bachelor'>('start')

  if (valg === 'vgs') return <VGSSide tilbake={() => setValg('start')} />
  if (valg === 'bachelor') return <BachelorSide tilbake={() => setValg('start')} />

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{background: '#F6F9FC'}}>
      <div className="max-w-2xl w-full mx-auto py-16 text-center">
        <img src="/logo.png" alt="StudieMatch" className="mx-auto mt-4 mb-10 w-40 sm:w-52 md:w-64" />
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{color: '#1E3A8A'}}>Finn studier på 10 sekunder</p>
        <p className="text-lg mb-12 max-w-xl mx-auto leading-relaxed" style={{color: '#475467'}}>
          Skriv inn snittet ditt eller bacheloren din – og se hva du kan studere
        </p>
        <p className="font-semibold mb-6 text-lg" style={{color: '#0D1B2A'}}>Hva passer deg best?</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-12">
          <button onClick={() => setValg('vgs')} className="bg-white rounded-2xl p-8 hover:-translate-y-0.5 transition text-left group" style={{border: '1px solid #E4E9F2'}}>
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-xl font-bold mb-2" style={{color: '#0D1B2A'}}>Jeg går på VGS</h2>
            <p className="text-sm leading-relaxed" style={{color: '#475467'}}>Se hvilke bachelorstudier du kan komme inn på med snittet ditt</p>
            <div className="mt-4 text-sm font-semibold" style={{color: '#1E3A8A'}}>Kom i gang →</div>
          </button>
          <button onClick={() => setValg('bachelor')} className="bg-white rounded-2xl p-8 hover:-translate-y-0.5 transition text-left group" style={{border: '1px solid #E4E9F2'}}>
            <div className="text-4xl mb-3">🎓</div>
            <h2 className="text-xl font-bold mb-2" style={{color: '#0D1B2A'}}>Jeg har en bachelor</h2>
            <p className="text-sm leading-relaxed" style={{color: '#475467'}}>Se hvilke masterprogram bacheloren din kan kvalifisere deg til</p>
            <div className="mt-4 text-sm font-semibold" style={{color: '#1E3A8A'}}>Kom i gang →</div>
          </button>
        </div>
        <p className="text-xs max-w-md mx-auto leading-relaxed" style={{color: '#98A2B3'}}>
          Resultatene er veiledende og basert på tidligere poenggrenser og tilgjengelige opptakskrav. Sjekk alltid lærestedets egne sider før du søker.
        </p>
      </div>
    </main>
  )
}

const fagomraader = ['Annen helse','Bioingeniør','Cybersikkerhet','Data og IT','Farmasi','Film og media','Fysioterapi','Idrett','Ingeniør','Journalistikk','Jus','Kunst og design','Kunstig intelligens','Lærer','Markedsføring','Matematikk','Medisin','Musikk','Psykologi','Realfag','Regnskap','Samfunnsfag','Sosiologi','Språk','Statsvitenskap','Sykepleie','Tannhelse','Økonomi','Annet']
const byer = ['Oslo','Bergen','Trondheim','Tromsø','Stavanger','Kristiansand','Ålesund','Bodø','Gjøvik','Lillehammer','Drammen','Sogndal','Levanger','Haugesund','Molde','Narvik','Alta','Åmot','Ås','Bærum','Elverum','Fredrikstad','Gol','Grimstad','Hamar','Harstad','Horten','Indre Østfold','Kongsvinger','Larvik','Lillestrøm','Mo i Rana','Namsos','Notodden','Orkland','Porsgrunn','Ringerike','Sør-Varanger','Stord','Sunnfjord','Volda']
const masterFagomraader = ['Helse','Idrett','Informatikk','Ingeniør','Jus','Kunst','Media','Pedagogikk','Psykologi','Realfag','Samfunnsfag','Språk','Økonomi']
const masterByer = ['Oslo','Bergen','Trondheim','Tromsø','Stavanger','Kristiansand']

function Label({ text, hint }: { text: string, hint: string }) {
  return (
    <div className="mb-3">
      <p className="font-semibold text-sm" style={{color: '#0D1B2A'}}>{text}</p>
      <p className="text-sm mt-1" style={{color: '#475467'}}>{hint}</p>
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
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition" style={{border: valgte.length > 0 ? '1px solid #1E3A8A' : '1px solid #E4E9F2', color: valgte.length > 0 ? '#1E3A8A' : '#475467', background: valgte.length > 0 ? 'rgba(30,58,138,0.08)' : 'white'}}>
        {label} {valgte.length > 0 && <span className="text-white text-xs rounded-full px-2 py-0.5" style={{background: '#1E3A8A'}}>{valgte.length}</span>}
        <span className="text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="absolute top-12 left-0 z-50 bg-white rounded-2xl shadow-xl p-3 w-64 max-h-72 overflow-y-auto" style={{border: '1px solid #E4E9F2'}}>
          {valgte.length > 0 && <button onClick={nullstill} className="text-xs text-red-500 hover:text-red-600 mb-2 block font-medium">Nullstill</button>}
          {options.map(opt => (
            <button key={opt} onClick={() => toggle(opt)} className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition" style={{background: valgte.includes(opt) ? 'rgba(30,58,138,0.08)' : 'white', color: valgte.includes(opt) ? '#1E3A8A' : '#475467', fontWeight: valgte.includes(opt) ? '500' : 'normal'}}>
              <span className="w-4 h-4 rounded flex items-center justify-center text-xs" style={{background: valgte.includes(opt) ? '#1E3A8A' : 'white', border: valgte.includes(opt) ? '1px solid #1E3A8A' : '1px solid #E4E9F2', color: 'white'}}>{valgte.includes(opt) ? '✓' : ''}</span>
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
  const [delt, setDelt] = useState(false)

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

  function delResultat() {
    const tekst = `Jeg fant ${godSjanseAntall} studier jeg kan komme inn på med snitt ${snitt}! Sjekk StudieMatch: ${window.location.href}`
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
  const snittMarginTall = viste.length > 0 ? viste.reduce((sum, s) => sum + s.margin, 0) / viste.length : null

  function marginTekst(m: number) {
    if (m >= 3) return `Du ligger i snitt ${m.toFixed(1)} poeng over studiene som vises`
    if (m >= 0) return `Du ligger i snitt ${m.toFixed(1)} poeng over – det er tett!`
    return `Du ligger i snitt ${Math.abs(m).toFixed(1)} poeng under mange av disse studiene`
  }

  return (
    <main className="min-h-screen" style={{background: '#F6F9FC'}}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={tilbake} className="text-sm mb-6 font-medium hover:underline" style={{color: '#1E3A8A'}}>← Tilbake</button>
        <div className="text-center mb-8">
          <img src="/logo.png" alt="StudieMatch" className="mx-auto mb-6 w-40 sm:w-52 md:w-64" />
          <p style={{color: '#475467'}}>Finn bachelorstudier basert på karaktersnittet ditt</p>
        </div>
        <div className="bg-white rounded-2xl p-6 mb-6" style={{border: '1px solid #E4E9F2', boxShadow: '0 1px 2px rgba(13,27,42,0.04), 0 4px 12px rgba(13,27,42,0.04)'}}>
          <div className="flex flex-wrap gap-8 items-start mb-6">
            <div className="flex-1 min-w-48">
              <Label text="Karaktersnitt" hint="Skriv inn karaktergjennomsnittet ditt" />
              <input type="number" placeholder="F.eks. 52.4" value={snitt} onChange={e => setSnitt(e.target.value)} onKeyDown={e => e.key === 'Enter' && finnStudier()} className="rounded-xl px-4 py-2 text-sm w-full bg-white focus:outline-none" style={{border: '1px solid #E4E9F2', color: '#0D1B2A'}} />
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
          <button onClick={finnStudier} className="w-full text-white py-4 rounded-xl font-semibold text-base transition sticky bottom-4" style={{background: '#0D1B2A'}}>Finn studier</button>
        </div>

        {laster && <div className="text-center py-8" style={{color: '#98A2B3'}}>Laster...</div>}

        {sokt && !laster && (
          <div>
            <div className="rounded-xl px-5 py-4 mb-3" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)'}}>
              <p className="font-bold text-lg" style={{color: '#0D1B2A'}}>Basert på snittet ditt ({snitttall}), har du gode muligheter på {godSjanseAntall} studier</p>
              {snittMarginTall !== null && <p className="text-sm mt-1" style={{color: '#1E3A8A'}}>{marginTekst(snittMarginTall)}</p>}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4 text-amber-800 text-sm">Dette er basert på tidligere poenggrenser. Poenggrenser varierer fra år til år og er ikke en garanti.</div>
            <div className="flex flex-wrap gap-3 mb-5 items-center">
              <button onClick={() => setKunGodSjanse(!kunGodSjanse)} className="px-4 py-2 rounded-xl text-sm font-medium transition" style={{background: kunGodSjanse ? '#059669' : 'white', color: kunGodSjanse ? 'white' : '#475467', border: kunGodSjanse ? '1px solid #059669' : '1px solid #E4E9F2'}}>Vis kun god sjanse</button>
              <button onClick={() => setSortering(sortering === 'standard' ? 'beste' : 'standard')} className="px-4 py-2 rounded-xl text-sm font-medium transition" style={{background: sortering === 'beste' ? '#1E3A8A' : 'white', color: sortering === 'beste' ? 'white' : '#475467', border: sortering === 'beste' ? '1px solid #1E3A8A' : '1px solid #E4E9F2'}}>{sortering === 'beste' ? 'Sortert: beste match' : 'Sorter etter beste match'}</button>
              <p className="text-sm ml-auto" style={{color: '#98A2B3'}}>{viste.length} av {sorterteAlle.length} studier vises</p>
            </div>
            <p className="font-semibold mb-3" style={{color: '#0D1B2A'}}>Disse studiene passer deg best basert på snittet ditt</p>
          </div>
        )}

        <div className="space-y-4 mt-6">
          {viste.map((s, i) => {
            const erBeste = i < 3 && s.status.label === 'God sjanse'
            return (
              <div key={s.id} className="rounded-xl transition" style={{padding: erBeste ? '24px' : '20px', border: erBeste ? '1.5px solid #1E3A8A' : '1px solid #E4E9F2', boxShadow: erBeste ? '0 8px 24px rgba(30,58,138,0.12)' : '0 1px 2px rgba(13,27,42,0.04)', background: erBeste ? 'rgba(30,58,138,0.025)' : 'white'}}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-semibold text-lg" style={{color: '#0D1B2A'}}>{s.study_name}</h2>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.status.color}`}>{s.status.label}</span>
                      {erBeste && <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background: '#1E3A8A', color: 'white'}}>⭐ Beste match</span>}
                    </div>
                    <p className="text-sm" style={{color: '#475467'}}>{s.university} – {s.location}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
                      <span style={{color: '#475467'}}>Poenggrense: <strong style={{color: '#0D1B2A'}}>{s.cutoff_score}</strong></span>
                      <span style={{color: '#475467'}}>Dine poeng: <strong style={{color: '#0D1B2A'}}>{snitttall}</strong></span>
                      <span style={{color: s.margin >= 0 ? '#059669' : '#e11d48', fontWeight: '500'}}>{s.margin >= 0 ? '+' : ''}{s.margin.toFixed(1)} poeng</span>
                    </div>
                    <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(30,58,138,0.08)', color: '#1E3A8A'}}>{s.fagomraade}</span>
                  </div>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap" style={{background: '#0D1B2A'}}>Gå til studie</a>
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
    </main>
  )
}

const bachelorStudier = ['Bachelor i økonomi og administrasjon','Bachelor i regnskap og revisjon','Bachelor i markedsføring og ledelse','Bachelor i internasjonal business','Bachelor i finans','Bachelor i rettsvitenskap / jus','Bachelor i psykologi','Bachelor i sosiologi','Bachelor i statsvitenskap','Bachelor i samfunnsøkonomi','Bachelor i filosofi','Bachelor i pedagogikk','Bachelor i informatikk','Bachelor i datateknologi','Bachelor i kunstig intelligens','Bachelor i cybersikkerhet','Bachelor i ingeniør – data','Bachelor i ingeniør – maskin','Bachelor i ingeniør – bygg','Bachelor i ingeniør – elektronikk','Bachelor i ingeniør – energi','Bachelor i matematikk','Bachelor i fysikk','Bachelor i kjemi','Bachelor i biologi','Bachelor i bioteknologi','Bachelor i sykepleie','Bachelor i ergoterapi','Bachelor i fysioterapi','Bachelor i bioingeniør','Bachelor i radiografi','Bachelor i paramedisin','Bachelor i farmasi','Bachelor i tannpleie','Bachelor i folkehelse','Bachelor i barnevern','Bachelor i sosialt arbeid','Bachelor i vernepleie','Bachelor i journalistikk','Bachelor i medievitenskap','Bachelor i kommunikasjon','Bachelor i film og TV-produksjon','Bachelor i kunst og design','Bachelor i arkitektur','Bachelor i musikkvitenskap','Bachelor i idrettsvitenskap','Bachelor i friluftsliv','Bachelor i lærerutdanning 1–7','Bachelor i lærerutdanning 5–10','Bachelor i historie','Bachelor i geografi','Bachelor i nordisk språk og litteratur','Bachelor i engelsk','Bachelor i fransk','Bachelor i tysk','Bachelor i spansk','Bachelor i arabisk','Bachelor i kinesisk','Bachelor i russisk','Bachelor i landbruk','Bachelor i havbruk','Bachelor i veterinærmedisin','Bachelor i miljøvitenskap','Bachelor i geologi','Bachelor i nanoteknologi']

const bachelorTilKategori: any = {'Bachelor i økonomi og administrasjon':'Økonomi','Bachelor i regnskap og revisjon':'Økonomi','Bachelor i markedsføring og ledelse':'Økonomi','Bachelor i internasjonal business':'Økonomi','Bachelor i finans':'Økonomi','Bachelor i rettsvitenskap / jus':'Jus','Bachelor i psykologi':'Psykologi','Bachelor i sosiologi':'Samfunnsfag','Bachelor i statsvitenskap':'Samfunnsfag','Bachelor i samfunnsøkonomi':'Økonomi','Bachelor i filosofi':'Samfunnsfag','Bachelor i pedagogikk':'Pedagogikk','Bachelor i informatikk':'Informatikk','Bachelor i datateknologi':'Informatikk','Bachelor i kunstig intelligens':'Informatikk','Bachelor i cybersikkerhet':'Informatikk','Bachelor i ingeniør – data':'Ingeniør','Bachelor i ingeniør – maskin':'Ingeniør','Bachelor i ingeniør – bygg':'Ingeniør','Bachelor i ingeniør – elektronikk':'Ingeniør','Bachelor i ingeniør – energi':'Ingeniør','Bachelor i matematikk':'Realfag','Bachelor i fysikk':'Realfag','Bachelor i kjemi':'Realfag','Bachelor i biologi':'Realfag','Bachelor i bioteknologi':'Realfag','Bachelor i sykepleie':'Helse','Bachelor i ergoterapi':'Helse','Bachelor i fysioterapi':'Helse','Bachelor i bioingeniør':'Helse','Bachelor i radiografi':'Helse','Bachelor i paramedisin':'Helse','Bachelor i farmasi':'Helse','Bachelor i tannpleie':'Helse','Bachelor i folkehelse':'Helse','Bachelor i barnevern':'Helse','Bachelor i sosialt arbeid':'Helse','Bachelor i vernepleie':'Helse','Bachelor i journalistikk':'Media','Bachelor i medievitenskap':'Media','Bachelor i kommunikasjon':'Media','Bachelor i film og TV-produksjon':'Media','Bachelor i kunst og design':'Kunst','Bachelor i arkitektur':'Kunst','Bachelor i musikkvitenskap':'Kunst','Bachelor i idrettsvitenskap':'Idrett','Bachelor i friluftsliv':'Idrett','Bachelor i lærerutdanning 1–7':'Pedagogikk','Bachelor i lærerutdanning 5–10':'Pedagogikk','Bachelor i historie':'Samfunnsfag','Bachelor i geografi':'Samfunnsfag','Bachelor i nordisk språk og litteratur':'Språk','Bachelor i engelsk':'Språk','Bachelor i fransk':'Språk','Bachelor i tysk':'Språk','Bachelor i spansk':'Språk','Bachelor i arabisk':'Språk','Bachelor i kinesisk':'Språk','Bachelor i russisk':'Språk','Bachelor i landbruk':'Realfag','Bachelor i havbruk':'Realfag','Bachelor i veterinærmedisin':'Helse','Bachelor i miljøvitenskap':'Realfag','Bachelor i geologi':'Realfag','Bachelor i nanoteknologi':'Realfag'}

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
  const [delt, setDelt] = useState(false)

  const gradeOrder: any = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 }

  function toggleFag(fag: string) { setValgteFag(prev => prev.includes(fag) ? prev.filter(f => f !== fag) : [...prev, fag]) }
  function toggleBy(by: string) { setValgteByer(prev => prev.includes(by) ? prev.filter(b => b !== by) : [...prev, by]) }

  function getStatus(m: any) {
    const kategori = bachelorTilKategori[bachelor]
    const bachelorMatch = kategori && m.requires.kategorier.includes(kategori)
    const gradeMatch = gradeOrder[karakter] >= gradeOrder[m.requires.min_grade]
    if (bachelorMatch && gradeMatch) return { label: '✔ Oppfyller krav', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100', order: 0 }
    if (bachelorMatch && !gradeMatch) return { label: '⚠ Kanskje – sjekk krav', color: 'bg-amber-50 text-amber-700 border border-amber-100', order: 1 }
    return { label: '❌ Oppfyller ikke krav', color: 'bg-rose-50 text-rose-700 border border-rose-100', order: 2 }
  }

  const resultater = sokt ? alleMastere.filter(m => {
    if (valgteFag.length > 0 && !valgteFag.includes(m.fagomraade)) return false
    if (valgteByer.length > 0 && !valgteByer.includes(m.location)) return false
    return true
  }).map(m => ({ ...m, status: getStatus(m) })).sort((a, b) => a.status.order - b.status.order) : []

  const kvalifisert = resultater.filter(m => m.status.order === 0).length

  function delResultat() {
    const tekst = `Jeg kvalifiserer til ${kvalifisert} masterprogram! Sjekk StudieMatch: ${window.location.href}`
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
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={tilbake} className="text-sm mb-6 font-medium hover:underline" style={{color: '#1E3A8A'}}>← Tilbake</button>
        <div className="text-center mb-8">
          <img src="/logo.png" alt="StudieMatch" className="mx-auto mb-6 w-40 sm:w-52 md:w-64" />
          <p style={{color: '#475467'}}>Finn masterstudier basert på bacheloren og karakterene dine</p>
        </div>
        <div className="bg-white rounded-2xl p-6 mb-6" style={{border: '1px solid #E4E9F2', boxShadow: '0 1px 2px rgba(13,27,42,0.04), 0 4px 12px rgba(13,27,42,0.04)'}}>
          <div className="flex flex-wrap gap-8 items-start mb-6">
            <div className="flex-1 min-w-64">
              <Label text="Hva har du studert?" hint="Velg bachelorutdanningen din fra listen" />
              <select value={bachelor} onChange={e => setBachelor(e.target.value)} className="rounded-xl px-4 py-2 text-sm w-full bg-white focus:outline-none" style={{border: '1px solid #E4E9F2', color: '#0D1B2A'}}>
                <option value="">Velg bachelorutdanning</option>
                {bachelorStudier.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <Label text="Karakternivå" hint="Hva er karakternivået ditt?" />
              <select value={karakter} onChange={e => setKarakter(e.target.value)} className="rounded-xl px-4 py-2 text-sm bg-white focus:outline-none" style={{border: '1px solid #E4E9F2', color: '#0D1B2A'}}>
                <option value="">Velg karakter</option>
                <option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 items-start mb-6">
            <div>
              <Label text="By" hint="Hvilken by ønsker du å studere i?" />
              <Dropdown label="Velg by" options={masterByer} valgte={valgteByer} toggle={toggleBy} nullstill={() => setValgteByer([])} />
            </div>
            <div>
              <Label text="Fagområde" hint="Hvilke fagområder er du interessert i?" />
              <Dropdown label="Velg fagområde" options={masterFagomraader} valgte={valgteFag} toggle={toggleFag} nullstill={() => setValgteFag([])} />
            </div>
          </div>
          <button onClick={() => { if (bachelor && karakter) setSokt(true) }} className="w-full text-white py-4 rounded-xl font-semibold text-base transition sticky bottom-4" style={{background: '#0D1B2A'}}>Finn studier</button>
        </div>

        {sokt && (
          <div>
            <div className="rounded-xl px-5 py-4 mb-3" style={{background: 'rgba(30,58,138,0.06)', border: '1px solid rgba(30,58,138,0.18)'}}>
              <p className="font-bold" style={{color: '#0D1B2A'}}>Basert på bacheloren din og karakterene dine, har du disse mulighetene:</p>
              <p className="text-sm mt-1" style={{color: '#1E3A8A'}}>Du kvalifiserer til {kvalifisert} av {resultater.length} masterprogrammer</p>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4 text-amber-800 text-sm">Krav varierer mellom studier og år. Dette er en forenklet oversikt.</div>
          </div>
        )}

        <div className="space-y-3 mt-6">
          {resultater.map((m, i) => {
            const erBeste = i < 3 && m.status.order === 0
            return (
              <div key={i} className="rounded-xl transition" style={{padding: erBeste ? '24px' : '20px', border: erBeste ? '1.5px solid #1E3A8A' : '1px solid #E4E9F2', boxShadow: erBeste ? '0 8px 24px rgba(30,58,138,0.12)' : '0 1px 2px rgba(13,27,42,0.04)', background: erBeste ? 'rgba(30,58,138,0.025)' : 'white'}}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-semibold text-lg" style={{color: '#0D1B2A'}}>{m.name}</h2>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${m.status.color}`}>{m.status.label}</span>
                      {erBeste && <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{background: '#1E3A8A', color: 'white'}}>⭐ Beste match</span>}
                    </div>
                    <p className="text-sm" style={{color: '#475467'}}>{m.school} – {m.location}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(30,58,138,0.08)', color: '#1E3A8A'}}>{m.fagomraade}</span>
                      <span className="text-xs" style={{color: '#98A2B3'}}>Krav: min. karakter <strong style={{color: '#475467'}}>{m.requires.min_grade}</strong></span>
                    </div>
                  </div>
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-white px-4 py-2 rounded-xl text-sm font-semibold transition whitespace-nowrap" style={{background: '#0D1B2A'}}>Gå til studie</a>
                </div>
              </div>
            )
          })}
        </div>

        {sokt && resultater.length > 0 && (
          <div className="text-center mt-6">
            <button onClick={delResultat} className="text-sm font-medium px-6 py-2 rounded-xl transition" style={{border: '1px solid #E4E9F2', color: '#475467', background: 'white'}}>
              {delt ? '✓ Kopiert!' : '🔗 Del resultatet mitt'}
            </button>
          </div>
        )}

        <p className="text-xs text-center mt-6 max-w-md mx-auto leading-relaxed" style={{color: '#98A2B3'}}>Resultatene er veiledende og basert på tidligere poenggrenser og tilgjengelige opptakskrav. Sjekk alltid lærestedets egne sider før du søker.</p>
      </div>
    </main>
  )
}
