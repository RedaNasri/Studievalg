import requests

SUPABASE_URL = "https://oveggyjrseepoburiqgx.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92ZWdneWpyc2VlcG9idXJpcWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTUwNTksImV4cCI6MjA5Mjg3MTA1OX0.MO6Onp_ieUa2FauAFI_w8jZCdwpQ5D2uuHJz8fQFVfg"

headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': f'Bearer {SUPABASE_KEY}',
    'Content-Type': 'application/json'
}

res = requests.get(f"{SUPABASE_URL}/rest/v1/studier?select=id,study_name,university&limit=1000", headers=headers)
studier = res.json()
print(f"Fant {len(studier)} studier")

def lag_url(study_name, university):
    navn = study_name.lower()
    navn = navn.split(',')[0].strip()
    navn = navn.replace(' ', '+')
    navn = navn.replace('/', '+')
    
    if university == "NTNU":
        return f"https://www.google.com/search?q={navn}+ntnu.no+studier"
    elif university == "UIO":
        return f"https://www.google.com/search?q={navn}+uio.no+studier"
    elif university == "UIB":
        return f"https://www.google.com/search?q={navn}+uib.no+studier"
    elif university == "OSLOMET":
        return f"https://www.google.com/search?q={navn}+oslomet.no+studier"
    elif university == "HVL":
        return f"https://www.google.com/search?q={navn}+hvl.no+studier"
    elif university == "UIA":
        return f"https://www.google.com/search?q={navn}+uia.no+studier"
    elif university == "INN":
        return f"https://www.google.com/search?q={navn}+inn.no+studier"
    elif university == "USN":
        return f"https://www.google.com/search?q={navn}+usn.no+studier"
    elif university == "UIS":
        return f"https://www.google.com/search?q={navn}+uis.no+studier"
    elif university == "UIT":
        return f"https://www.google.com/search?q={navn}+uit.no+studier"
    else:
        return f"https://www.google.com/search?q={navn}+{university}+studie+norge"

oppdatert = 0
feilet = 0

for s in studier:
    ny_url = lag_url(s['study_name'], s['university'])
    
    patch = requests.patch(
        f"{SUPABASE_URL}/rest/v1/studier?id=eq.{s['id']}",
        json={'url': ny_url},
        headers=headers
    )
    if patch.status_code in [200, 204]:
        oppdatert += 1
        print(f"✓ {s['study_name']} → {ny_url}")
    else:
        feilet += 1
        print(f"✗ {s['study_name']} → {patch.status_code}")

print(f"\nFerdig! {oppdatert} oppdatert, {feilet} feilet")