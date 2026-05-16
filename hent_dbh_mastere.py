"""
Henter alle masterprogram fra DBH (HK-dir) sitt API
og lagrer til dbh_mastere.json
Kjør: python hent_dbh_mastere.py
"""

import requests
import json

URL = "https://dbh-data.dataporten-api.no/Tabeller/hentJSONTabellData"

# Spørring: hent alle studieprogram på masternivå
# Nivåkode 5 = master (2-årig), 6 = master (5-årig/integrert)
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
                "values": ["5", "6", "7", "8"]
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

if response.status_code != 200:
    print(f"Feil: {response.status_code}")
    print(response.text[:500])
    exit()

data = response.json()
print(f"Hentet {len(data)} rader")

# Lagre rådata
with open("dbh_mastere_radata.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Vis første 5 rader
print("\nEksempler:")
for rad in data[:5]:
    print(json.dumps(rad, ensure_ascii=False, indent=2))
    print()

print(f"\nLagret til dbh_mastere_radata.json")
