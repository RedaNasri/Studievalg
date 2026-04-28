import json
import requests
import os

SUPABASE_URL = "https://oveggyjrseepoburiqgx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZWdneWpyc2VlcG9idXJpcWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTUwNTksImV4cCI6MjA5Mjg3MTA1OX0.MO6Onp_ieUa2FauAFI_w8jZCdwpQ5D2uuHJz8fQFVfg"

def les_json(filnavn="poenggrenser_2025.json"):
    with open(filnavn, 'r', encoding='utf-8') as f:
        return json.load(f)

def oppdater_supabase(studier):
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json'
    }

    oppdatert = 0
    feilet = 0

    for s in studier:
        res = requests.patch(
            f"{SUPABASE_URL}/rest/v1/studier",
            json={'cutoff_score': s['cutoff_score']},
            headers=headers,
            params={
                'study_name': f"eq.{s['study_name']}",
                'university': f"eq.{s['university']}"
            }
        )
        if res.status_code in [200, 204]:
            oppdatert += 1
        else:
            feilet += 1
            print(f"Feil: {s['study_name']} - Status: {res.status_code} - {res.text}")

    print(f"Ferdig! {oppdatert} oppdatert, {feilet} feilet")

if __name__ == '__main__':
    studier = les_json()
    print(f"Leste {len(studier)} studier fra JSON")
    print("Første 3 studier:")
    for s in studier[:3]:
        print(f"  {s['study_name']} - {s['university']} - {s['cutoff_score']}")
    print("\nOppdaterer Supabase...")
    oppdater_supabase(studier)