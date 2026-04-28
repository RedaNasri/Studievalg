'use client'
import { useState } from 'react'

export default function Home() {
  const [valg, setValg] = useState<'start' | 'vgs' | 'bachelor'>('start')

  if (valg === 'vgs') return <VGSSide tilbake={() => setValg('start')} />
  if (valg === 'bachelor') return <BachelorSide tilbake={() => setValg('start')} />

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-3">StudieMatch</h1>
        <p className="text-xl text-gray-500 mb-12">Finn studier du kommer inn på – på sekunder</p>

        <p className="text-gray-600 font-semibold mb-6 text-lg">Hva passer deg best?</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => setValg('vgs')}
            className="bg-white border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg transition text-left group"
          >
            <div className="text-4xl mb-3">🎒</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Jeg går på VGS</h2>
            <p className="text-gray-500 text-sm">Finn bachelorstudier basert på karaktersnittet ditt</p>
            <div className="mt-4 text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">Kom i gang →</div>
          </button>

          <button
            onClick={() => setValg('bachelor')}
            className="bg-white border-2 border-indigo-200 rounded-2xl p-8 hover:border-indigo-500 hover:shadow-lg transition text-left group"
          >
            <div className="text-4xl mb-3">🎓</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Jeg har en bachelor</h2>
            <p className="text-gray-500 text-sm">Finn masterstudier basert på bacheloren og karakterene dine</p>
            <div className="mt-4 text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform">Kom i gang →</div>
          </button>
        </div>
      </div>
    </main>
  )
}

function VGSSide({ tilbake }: { tilbake: () => void }) {
  const [snitt, setSnitt] = useState('')
  const [resultater, setResultater] = useState<any[]>([])
  const [laster, setLaster] = useState(false)
  const [sokt, setSokt] = useState(false)
  const { createClient } = require('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  async function finnStudier() {
    if (!snitt) return
    setLaster(true)
    setSokt(true)
    const { data } = await supabase
      .from('studier')
      .select('*')
      .order('cutoff_score', { ascending: false })
    const snitttall = parseFloat(snitt)
    const mapped = (data || [])
      .map((s: any) => ({
        ...s,
        margin: snitttall - s.cutoff_score,
        status: snitttall - s.cutoff_score >= 3 ? 'God sjanse' : snitttall - s.cutoff_score >= 0 ? 'Mulig' : 'Under grensen',
        statusColor: snitttall - s.cutoff_score >= 3 ? 'bg-green-100 text-green-700' : snitttall - s.cutoff_score >= 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'
      }))
      .sort((a: any, b: any) => {
        const order: any = { 'God sjanse': 0, 'Mulig': 1, 'Under grensen': 2 }
        return order[a.status] - order[b.status]
      })
      .slice(0, 30)
    setResultater(mapped)
    setLaster(false)
  }

  const snitttall = parseFloat(snitt)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={tilbake} className="text-blue-600 text-sm mb-6 hover:underline">← Tilbake</button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">StudieMatch</h1>
          <p className="text-gray-500">Finn bachelorstudier basert på karaktersnittet ditt</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-3 items-center">
            <input
              type="number"
              placeholder="Karaktersnitt, f.eks. 52.4"
              value={snitt}
              onChange={e => setSnitt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && finnStudier()}
              className="border border-gray-200 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-56"
            />
            <button onClick={finnStudier} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition text-sm">Søk</button>
          </div>
        </div>

        {laster && <div className="text-center text-gray-400 py-8">Laster...</div>}

        {sokt && !laster && (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-4">
              <p className="text-blue-800 font-bold">Basert på snittet ditt ({snitttall}), har du gode muligheter på {resultater.filter(s => s.status === 'God sjanse').length} studier</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4 text-yellow-800 text-sm">
              Dette er basert på tidligere poenggrenser og er ikke en garanti.
            </div>
          </div>
        )}

        <div className="space-y-3">
          {resultater.map(s => (
            <div key={s.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="font-semibold text-lg text-gray-800">{s.study_name}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.statusColor}`}>{s.status}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{s.university} – {s.location}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-500">Poenggrense: <strong>{s.cutoff_score}</strong></span>
                    <span className={s.margin >= 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>{s.margin >= 0 ? '+' : ''}{s.margin.toFixed(1)} poeng</span>
                  </div>
                </div>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap">Gå til studie</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function BachelorSide({ tilbake }: { tilbake: () => void }) {
  const [bachelor, setBachelor] = useState('')
  const [karakter, setKarakter] = useState('')
  const [sokt, setSokt] = useState(false)

  const mastere = [
    { name: 'Master i økonomi og administrasjon', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/master-okonomi', requires: { bachelor: ['Økonomi', 'Finans', 'Regnskap'], min_grade: 'C' } },
    { name: 'Master i finansiell økonomi', school: 'NHH', location: 'Bergen', url: 'https://www.nhh.no/studier/master', requires: { bachelor: ['Økonomi', 'Finans'], min_grade: 'B' } },
    { name: 'Master i psykologi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/psykologi-master', requires: { bachelor: ['Psykologi'], min_grade: 'B' } },
    { name: 'Master i klinisk psykologi', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/mpsyk', requires: { bachelor: ['Psykologi'], min_grade: 'A' } },
    { name: 'Master i informatikk', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/informatikk-master', requires: { bachelor: ['Informatikk', 'Data og IT', 'Ingeniør'], min_grade: 'C' } },
    { name: 'Master i kunstig intelligens', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/msit', requires: { bachelor: ['Informatikk', 'Data og IT', 'Matematikk'], min_grade: 'B' } },
    { name: 'Master i rettsvitenskap', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/rettsvitenskap', requires: { bachelor: ['Jus', 'Rettsvitenskap'], min_grade: 'C' } },
    { name: 'Master i samfunnsøkonomi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/samfunnsokonomi-master', requires: { bachelor: ['Økonomi', 'Samfunnsfag', 'Matematikk'], min_grade: 'C' } },
    { name: 'Master i sosiologi', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/sosiologi-master', requires: { bachelor: ['Sosiologi', 'Samfunnsfag'], min_grade: 'C' } },
    { name: 'Master i statsvitenskap', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/statsvitenskap-master', requires: { bachelor: ['Statsvitenskap', 'Samfunnsfag'], min_grade: 'C' } },
    { name: 'Master i sykepleie', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/sykepleievitenskap-master', requires: { bachelor: ['Sykepleie', 'Helse'], min_grade: 'C' } },
    { name: 'Master i folkehelsevitenskap', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/mfolkehelse', requires: { bachelor: ['Helse', 'Sykepleie', 'Idrett', 'Samfunnsfag'], min_grade: 'C' } },
    { name: 'Master i idrettsvitenskap', school: 'NIH', location: 'Oslo', url: 'https://www.nih.no/studier/master', requires: { bachelor: ['Idrett', 'Helse'], min_grade: 'C' } },
    { name: 'Master i business', school: 'BI', location: 'Oslo', url: 'https://www.bi.no/studier/master', requires: { bachelor: ['Økonomi', 'Samfunnsfag', 'Markedsføring'], min_grade: 'C' } },
    { name: 'Master i ledelse', school: 'BI', location: 'Oslo', url: 'https://www.bi.no/studier/master/ledelse', requires: { bachelor: ['Økonomi', 'Samfunnsfag', 'Psykologi', 'Idrett'], min_grade: 'C' } },
    { name: 'Master i ingeniørvitenskap', school: 'NTNU', location: 'Trondheim', url: 'https://www.ntnu.no/studier/master-ingeniør', requires: { bachelor: ['Ingeniør', 'Matematikk', 'Fysikk'], min_grade: 'C' } },
    { name: 'Master i pedagogikk', school: 'UiO', location: 'Oslo', url: 'https://www.uio.no/studier/program/pedagogikk-master', requires: { bachelor: ['Pedagogikk', 'Lærer', 'Samfunnsfag'], min_grade: 'C' } },
    { name: 'Master i journalistikk', school: 'OsloMet', location: 'Oslo', url: 'https://www.oslomet.no/studier/master/journalistikk', requires: { bachelor: ['Journalistikk', 'Media', 'Samfunnsfag'], min_grade: 'C' } },
  ]

  const gradeOrder: any = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0 }

  function getStatus(m: any) {
    const bachelorMatch = m.requires.bachelor.includes(bachelor)
    const gradeMatch = gradeOrder[karakter] >= gradeOrder[m.requires.min_grade]
    if (bachelorMatch && gradeMatch) return { label: '✔ Oppfyller krav', color: 'bg-green-100 text-green-700', order: 0 }
    if (bachelorMatch && !gradeMatch) return { label: '⚠ Kanskje – sjekk krav', color: 'bg-yellow-100 text-yellow-700', order: 1 }
    return { label: '❌ Oppfyller ikke krav', color: 'bg-red-100 text-red-600', order: 2 }
  }

  const resultater = sokt ? mastere
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
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Hva har du studert?</label>
              <select value={bachelor} onChange={e => setBachelor(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-56">
                <option value="">Velg bachelor</option>
                <option value="Økonomi">Økonomi</option>
                <option value="Finans">Finans</option>
                <option value="Regnskap">Regnskap</option>
                <option value="Markedsføring">Markedsføring</option>
                <option value="Psykologi">Psykologi</option>
                <option value="Informatikk">Informatikk</option>
                <option value="Data og IT">Data og IT</option>
                <option value="Ingeniør">Ingeniør</option>
                <option value="Matematikk">Matematikk</option>
                <option value="Fysikk">Fysikk</option>
                <option value="Jus">Jus</option>
                <option value="Rettsvitenskap">Rettsvitenskap</option>
                <option value="Samfunnsfag">Samfunnsfag</option>
                <option value="Statsvitenskap">Statsvitenskap</option>
                <option value="Sosiologi">Sosiologi</option>
                <option value="Sykepleie">Sykepleie</option>
                <option value="Helse">Helse</option>
                <option value="Idrett">Idrett</option>
                <option value="Pedagogikk">Pedagogikk</option>
                <option value="Lærer">Lærer</option>
                <option value="Journalistikk">Journalistikk</option>
                <option value="Media">Media</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Hva er snittet ditt?</label>
              <select value={karakter} onChange={e => setKarakter(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">Velg karakter</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
              </select>
            </div>
            <button onClick={() => { if (bachelor && karakter) setSokt(true) }} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm">Finn mastere</button>
          </div>
        </div>

        {sokt && (
          <div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mb-3">
              <p className="text-indigo-800 font-bold">Basert på bacheloren din og karakterene dine, har du disse mulighetene:</p>
              <p className="text-indigo-600 text-sm mt-1">Du kvalifiserer til {kvalifisert} av {mastere.length} masterprogrammer</p>
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
                  <p className="text-gray-400 text-xs mt-1">Krever minimum karakter: <strong>{m.requires.min_grade}</strong></p>
                </div>
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition whitespace-nowrap">Gå til studie</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
