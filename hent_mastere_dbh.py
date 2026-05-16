"""
Henter alle masterprogram fra DBH med korrekte nivåkoder
Kjør: python hent_mastere_dbh.py
"""

import requests
import json

URL = "https://dbh-data.dataporten-api.no/Tabeller/hentJSONTabellData"

payload = {
    "tabell_id": 347,
    "api_versjon": 1,
    "statuslinje": "J",
    "kodetekst": "J",
    "desimal_separator": ".",
    "variabler": ["*"],
    "sortBy": ["Institusjonskode", "Studieprogramkode"],
    "filter": [
        {
            "variabel": "Nivåkode",
            "selection": {
                "filter": "item",
                "values": ["M2", "M5", "ME", "MX"]
            }
        },
        {
            "variabel": "Årstall",
            "selection": {
                "filter": "item",
                "values": ["2024"]
            }
        }
    ]
}

print("Henter masterprogram fra DBH...")
response = requests.post(URL, json=payload)
print(f"Status: {response.status_code}")

data = response.json()

# Fjern statusrad
program = [r for r in data if "Institusjonskode" in r]
print(f"Antall masterprogram: {len(program)}")

# Vis hvilke felt som finnes
print("\nAlle felt i en rad:")
for key in program[0].keys():
    print(f"  {key}: {program[0][key]}")

# Lagre
with open("dbh_mastere.json", "w", encoding="utf-8") as f:
    json.dump(program, f, ensure_ascii=False, indent=2)

# Vis noen eksempler
print("\nEksempler på masterprogram:")
for p in program[:8]:
    navn = p.get("Studiumkode", p.get("Studieprogramkode", ""))
    inst = p.get("Institusjonskode_tekst", p.get("Institusjonskode", ""))
    niva = p.get("Nivåkode", "")
    nus = p.get("NUS-kode", "")
    print(f"  {navn} | {inst} | Nivå: {niva} | NUS: {nus}")

# Tell per institusjon
print("\nTopp institusjoner:")
inst_count = {}
for p in program:
    inst = p.get("Institusjonskode_tekst", p.get("Institusjonskode", "ukjent"))
    inst_count[inst] = inst_count.get(inst, 0) + 1

for inst, count in sorted(inst_count.items(), key=lambda x: -x[1])[:10]:
    print(f"  {inst}: {count} program")

print(f"\nLagret til dbh_mastere.json")
