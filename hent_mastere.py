"""
Henter masterprogram fra utdanning.no API og skriver til en JSON-fil.
Kjør: python hent_mastere.py
"""

import requests
import json

BASE_URL = "https://utdanning.no/api/v1/data_norge--utdanningsbeskrivelse"

# Hent liste over alle utdanninger
print("Henter liste over alle utdanninger...")
response = requests.get(BASE_URL)
alle_urls = response.json()
print(f"Fant {len(alle_urls)} utdanninger totalt")

# Hent detaljer for hver utdanning
alle_data = []
for url in alle_urls:
    try:
        r = requests.get(url)
        data = r.json()
        alle_data.append(data)
        print(f"  ✓ {url.split('/')[-1]}")
    except Exception as e:
        print(f"  ✗ Feil: {url} – {e}")

# Lagre rådata til fil så vi kan inspisere
with open("utdanning_radata.json", "w", encoding="utf-8") as f:
    json.dump(alle_data, f, ensure_ascii=False, indent=2)

print(f"\nFerdig! Lagret {len(alle_data)} utdanninger til utdanning_radata.json")
print("\nFørste oppføring som eksempel:")
if alle_data:
    print(json.dumps(alle_data[0], ensure_ascii=False, indent=2))
