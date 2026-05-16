import json
import requests

SUPABASE_URL = "https://oveggyjrseepoburiqgx.supabase.co"
SUPABASE_KEY = input("Lim inn din Supabase service_role key: ").strip()

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

with open("mastere_klar.json", "r", encoding="utf-8") as f:
    mastere = json.load(f)

print(f"Laster inn {len(mastere)} masterprogram...")

r = requests.delete(f"{SUPABASE_URL}/rest/v1/mastere_v2?id=gte.0", headers=HEADERS)
print(f"Slett status: {r.status_code}")

suksess = 0
for i in range(0, len(mastere), 50):
    bolk = mastere[i:i+50]
    rader = [{"name": (m["name"] or "")[:200], "school": (m["school"] or "")[:200], "location": m["location"] or "", "level": m["level"] or "", "studiepoeng": float(m["studiepoeng"]) if m["studiepoeng"] else 120, "fagomraade": m["fagomraade"] or "", "description": (m["description"] or "")[:2000], "summary": (m["summary"] or "")[:500], "opptakskrav": (m["opptakskrav"] or "")[:1000], "requires_min_grade": m["requires_min_grade"] or "C", "requires_kategorier": m["requires_kategorier"] or [], "study_url": m["study_url"] or "", "studieprogramkode": m["studieprogramkode"] or "", "institusjonskode": m["institusjonskode"] or "", "nus_kode": m["nus_kode"] or ""} for m in bolk]
    r = requests.post(f"{SUPABASE_URL}/rest/v1/mastere_v2", headers=HEADERS, json=rader)
    if r.status_code in [200, 201]:
        suksess += len(bolk)
        print(f"  OK {suksess}/{len(mastere)}")
    else:
        print(f"  Feil {r.status_code}: {r.text[:200]}")

print(f"Ferdig! {suksess} importert")
