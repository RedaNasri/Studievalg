"""
Rydder opp DBH-masterdata og kobler med utdanning.no-beskrivelser
Lager en ren JSON klar for import til Supabase
Kjør: python klargjor_mastere.py
"""

import json
import re

# Last inn DBH-data
with open("dbh_mastere.json", "r", encoding="utf-8") as f:
    dbh = json.load(f)

# Last inn utdanning.no-beskrivelser
with open("mastere_utdanning.json", "r", encoding="utf-8") as f:
    utdanning = json.load(f)

# Bygg NUS-kode -> beskrivelse mapping fra utdanning.no
# NUS-koder i utdanning.no er 4 eller 6 siffer
# DBH bruker 6-sifrede NUS-koder
nus_til_beskrivelse = {}
for u in utdanning:
    # Hent alle NUS-koder fra utdanning.no rådata
    pass  # Vi bruker mastere_utdanning.json direkte

# Last rådata for NUS-mapping
with open("utdanning_radata.json", "r", encoding="utf-8") as f:
    radata = json.load(f)

# Bygg NUS-kode -> utdanning mapping
nus_map = {}
for u in radata:
    for nus in u.get("nus", []):
        kode = nus.get("nus_kode", "")
        if kode:
            nus_map[kode] = {
                "title": u.get("title", ""),
                "summary": re.sub(r'<[^>]+>', '', u.get("body", {}).get("summary", "")),
                "description": re.sub(r'<[^>]+>', '', u.get("body", {}).get("value", "")),
                "opptakskrav": re.sub(r'<[^>]+>', '', u.get("opptakskrav") or ""),
                "interesser": [i.get("title", "") for i in u.get("interesse", [])],
                "sammenligning_id": u.get("sammenligning_id", ""),
            }

print(f"NUS-koder fra utdanning.no: {len(nus_map)}")

# Byer basert på institusjonskode
bykart = {
    "Universitetet i Oslo": "Oslo",
    "Universitetet i Bergen": "Bergen",
    "NTNU": "Trondheim",
    "UiT Norges arktiske universitet": "Tromsø",
    "Universitetet i Stavanger": "Stavanger",
    "Universitetet i Agder": "Kristiansand",
    "Universitetet i Sørøst-Norge": "Drammen",
    "OsloMet": "Oslo",
    "BI Norwegian Business School": "Oslo",
    "Handelshøyskolen BI": "Oslo",
    "Norges Handelshøyskole": "Bergen",
    "NMBU": "Ås",
}

def finn_by(institusjonsnavn):
    for nøkkel, by in bykart.items():
        if nøkkel.lower() in institusjonsnavn.lower():
            return by
    return ""

def finn_fagomraade(interesser):
    fagkart = {
        "Språk": "Språk",
        "Helse": "Helse",
        "Teknologi": "Ingeniør",
        "Økonomi": "Økonomi",
        "Samfunn": "Samfunnsfag",
        "Pedagogikk": "Pedagogikk",
        "Kunst": "Kunst",
        "Idrett": "Idrett",
        "Jus": "Jus",
        "Psykologi": "Psykologi",
        "Informatikk": "Informatikk",
        "Realfag": "Realfag",
        "Media": "Media",
    }
    for interesse in interesser:
        for nøkkel, fag in fagkart.items():
            if nøkkel.lower() in interesse.lower():
                return fag
    return interesser[0] if interesser else ""

# Fjern duplikater (samme program tilbys hvert semester)
sett = set()
mastere = []

for p in dbh:
    # Unik nøkkel: institusjon + programkode
    nøkkel = f"{p['Institusjonskode']}_{p['Studieprogramkode']}"
    if nøkkel in sett:
        continue
    sett.add(nøkkel)

    # Hopp over utgåtte program
    tilbys_til = str(p.get("Tilbys til", "99999"))
    if tilbys_til != "99999" and tilbys_til < "20240":
        continue

    nus_kode = str(p.get("NUS-kode", ""))
    beskrivelse = nus_map.get(nus_kode, {})

    # Prøv 4-sifret NUS-kode hvis 6-sifret ikke finnes
    if not beskrivelse and len(nus_kode) == 6:
        beskrivelse = nus_map.get(nus_kode[:4], {})

    institusjonsnavn = p.get("Institusjonsnavn", "")
    by = finn_by(institusjonsnavn)
    interesser = beskrivelse.get("interesser", [])
    fagomraade = finn_fagomraade(interesser)

    master = {
        "name": p.get("Studieprogramnavn", ""),
        "school": institusjonsnavn,
        "location": by,
        "level": p.get("Nivånavn", ""),
        "studiepoeng": p.get("Studiepoeng", 120),
        "fagomraade": fagomraade,
        "nus_kode": nus_kode,
        "description": beskrivelse.get("description", ""),
        "summary": beskrivelse.get("summary", ""),
        "opptakskrav": beskrivelse.get("opptakskrav", ""),
        "requires_min_grade": "C",  # Standard – kan justeres manuelt
        "requires_kategorier": interesser,
        "study_url": f"https://utdanning.no/utdanning/{beskrivelse.get('sammenligning_id', '')}",
        "studieprogramkode": p.get("Studieprogramkode", ""),
        "institusjonskode": p.get("Institusjonskode", ""),
    }
    mastere.append(master)

print(f"Unike masterprogram: {len(mastere)}")

# Statistikk
med_by = sum(1 for m in mastere if m["location"])
med_beskrivelse = sum(1 for m in mastere if m["description"])
med_fagomraade = sum(1 for m in mastere if m["fagomraade"])

print(f"Med by: {med_by} ({med_by/len(mastere)*100:.0f}%)")
print(f"Med beskrivelse: {med_beskrivelse} ({med_beskrivelse/len(mastere)*100:.0f}%)")
print(f"Med fagområde: {med_fagomraade} ({med_fagomraade/len(mastere)*100:.0f}%)")

# Topp institusjoner
inst_count = {}
for m in mastere:
    inst = m["school"]
    inst_count[inst] = inst_count.get(inst, 0) + 1

print("\nTopp 15 institusjoner:")
for inst, count in sorted(inst_count.items(), key=lambda x: -x[1])[:15]:
    print(f"  {inst}: {count} program")

# Lagre
with open("mastere_klar.json", "w", encoding="utf-8") as f:
    json.dump(mastere, f, ensure_ascii=False, indent=2)

print(f"\nLagret {len(mastere)} masterprogram til mastere_klar.json")
print("\nEksempel:")
print(json.dumps(mastere[0], ensure_ascii=False, indent=2))
