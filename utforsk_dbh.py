"""
Utforsker DBH API - henter alle studieprogram uten filter
for å se hvilke nivåkoder som faktisk finnes
Kjør: python utforsk_dbh.py
"""

import requests
import json

URL = "https://dbh-data.dataporten-api.no/Tabeller/hentJSONTabellData"

# Hent alt fra 2024 uten nivåfilter
payload = {
    "tabell_id": 347,
    "api_versjon": 1,
    "statuslinje": "J",
    "kodetekst": "J",
    "desimal_separator": ".",
    "variabler": ["Institusjonskode", "Nivåkode", "Studieprogramkode", "NUS-kode", "Studiepoeng"],
    "sortBy": ["Nivåkode"],
    "filter": [
        {
            "variabel": "Årstall",
            "selection": {
                "filter": "item",
                "values": ["2024"]
            }
        }
    ]
}

print("Henter alle studieprogram fra DBH 2024...")
response = requests.post(URL, json=payload)
print(f"Status: {response.status_code}")

if response.status_code == 200:
    data = response.json()
    print(f"Antall rader: {len(data)}")
    
    # Finn alle unike nivåkoder
    nivakoder = {}
    for rad in data:
        kode = rad.get("Nivåkode", "ukjent")
        tekst = rad.get("Nivåkode_tekst", "")
        if kode not in nivakoder:
            nivakoder[kode] = tekst
    
    print("\nAlle nivåkoder som finnes:")
    for kode, tekst in sorted(nivakoder.items()):
        antall = sum(1 for r in data if r.get("Nivåkode") == kode)
        print(f"  {kode}: {tekst} ({antall} program)")
    
    with open("dbh_alle.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"\nFørste rad:")
    print(json.dumps(data[0], ensure_ascii=False, indent=2))

elif response.status_code == 204:
    print("Ingen data – prøver uten årstallsfilter...")
    
    payload2 = {
        "tabell_id": 347,
        "api_versjon": 1,
        "statuslinje": "J",
        "kodetekst": "J",
        "desimal_separator": ".",
        "variabler": ["Institusjonskode", "Nivåkode", "Studieprogramkode", "NUS-kode"],
        "sortBy": ["Nivåkode"],
        "filter": []
    }
    
    r2 = requests.post(URL, json=payload2)
    print(f"Status uten filter: {r2.status_code}")
    if r2.status_code == 200:
        data2 = r2.json()
        print(f"Antall rader: {len(data2)}")
        print(json.dumps(data2[0], ensure_ascii=False, indent=2))
        with open("dbh_alle.json", "w", encoding="utf-8") as f:
            json.dump(data2, f, ensure_ascii=False, indent=2)
    else:
        print(r2.text[:300])
else:
    print(response.text[:300])
