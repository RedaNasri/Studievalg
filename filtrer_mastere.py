"""
Filtrerer ut masterprogram fra utdanning_radata.json
og skriver til mastere_utdanning.json
Kjør: python filtrer_mastere.py
"""

import json
import re

# Last inn rådata
with open("utdanning_radata.json", "r", encoding="utf-8") as f:
    alle = json.load(f)

print(f"Totalt {len(alle)} utdanninger lastet inn")

def er_master(utdanning):
    """Sjekk om utdanningen er på masternivå basert på NUS-koder"""
    for nus in utdanning.get("nus", []):
        kode = nus.get("nus_kode", "")
        tittel = nus.get("title", "").lower()
        # NUS-koder som starter med 7 = masternivå
        if kode.startswith("7"):
            return True
        if "master" in tittel:
            return True
    return False

def rens_html(tekst):
    """Fjern HTML-tags fra tekst"""
    if not tekst:
        return ""
    return re.sub(r'<[^>]+>', '', tekst).strip()

def hent_fagomraade(utdanning):
    """Hent første interessekategori som fagområde"""
    interesser = utdanning.get("interesse", [])
    if interesser:
        return interesser[0].get("title", "")
    return ""

# Filtrer og transformer
mastere = []
for u in alle:
    if not er_master(u):
        continue

    master = {
        "name": u.get("title", ""),
        "description": rens_html(u.get("body", {}).get("value", "")),
        "summary": rens_html(u.get("body", {}).get("summary", "")),
        "opptakskrav": rens_html(u.get("opptakskrav", "")),
        "varighet": rens_html(u.get("utdb_varighet", "")),
        "fagomraade": hent_fagomraade(u),
        "interesser": [i.get("title", "") for i in u.get("interesse", [])],
        "sammenligning_id": u.get("sammenligning_id", ""),
        "utdanning_url": f"https://utdanning.no/utdanning/{u.get('sammenligning_id', '')}",
    }
    mastere.append(master)

# Lagre
with open("mastere_utdanning.json", "w", encoding="utf-8") as f:
    json.dump(mastere, f, ensure_ascii=False, indent=2)

print(f"Fant {len(mastere)} masterprogram")
print("\nEksempler:")
for m in mastere[:5]:
    print(f"  - {m['name']} ({m['fagomraade']})")
    print(f"    Opptakskrav: {m['opptakskrav'][:80]}...")
    print()

print(f"\nLagret til mastere_utdanning.json")
