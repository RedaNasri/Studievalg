import pandas as pd

df = pd.read_excel('Poenggrenser.xlsx', header=1)
df = df.iloc[1:].reset_index(drop=True)
df.columns = ['study_code', 'study_name', 'university', 'location', 'category', 'first_time_cutoff', 'first_time_supplement_cutoff', 'ordinary_cutoff', 'ordinary_supplement_cutoff']
df['study_name'] = df['study_name'].astype(str).str.replace('*', '', regex=False).str.strip()
df['university'] = df['university'].astype(str).str.strip().str.upper()

# Manglende fra databasen
manglende = [
    ("Medisinsk teknologi (sivilingeniør)", "UIB"),
    ("Informasjonsteknologi, årsstudium", "OSLOMET"),
    ("Tverrfaglige kjønnsstudier, årsstudium", "UIO"),
    ("Økonomi og administrasjon, bachelor", "NTNU"),
    ("Toll, vareførsel og grensekontroll", "UIS"),
    ("Informatikk: digital økonomi og ledelse", "UIO"),
    ("Samfunnsøkonomisk analyse", "UIO"),
    ("Pedagogikk, årsstudium", "UIB"),
    ("Samfunnsøkonomi, årsstudium", "NTNU"),
    ("Helse ledelse og helseøkonomi", "UIO"),
    ("Industriell økonomi", "NMBU"),
    ("Samfunnsøkonomi, bachelor", "NTNU"),
    ("Matematikk: finans, forsikring og økonomi", "UIO"),
    ("Statsvitenskap, årsstudium", "UIO"),
    ("Ingeniørgeologi", "NTNU"),
    ("Ingeniør, maskin", "NTNU"),
    ("Sosiologi, årsstudium", "UIO"),
    ("Økonomi og ledelse, deltid, bachelor", "NTNU"),
    ("Fiskehelse- akvamedisin", "UIB"),
    ("Digital økonomi og ledelse", "HVL"),
]

sql_lines = []
for db_navn, uni in manglende:
    # Søk etter nærmeste match i Excel
    navn_clean = db_navn.lower().replace(' ', '').replace('-', '').replace(',', '').replace(':', '')
    treff = df[df['university'] == uni].copy()
    treff['match'] = treff['study_name'].str.lower().str.replace(' ', '').str.replace('-', '').str.replace(',', '').str.replace(':', '')
    match = treff[treff['match'] == navn_clean]
    
    if len(match) == 0:
        # Prøv delvis match
        match = treff[treff['match'].str.contains(navn_clean[:10])]
    
    if len(match) > 0:
        rad = match.iloc[0]
        ft = rad['first_time_cutoff']
        ord_c = rad['ordinary_cutoff']
        if pd.notna(ft) and pd.notna(ord_c):
            db_escaped = db_navn.replace("'", "''")
            ft_val = float(ft)
            ord_val = float(ord_c)
            special = 'TRUE' if ft_val > 80 else 'FALSE'
            sql_lines.append(f"UPDATE studier SET first_time_cutoff = {ft_val}, ordinary_cutoff = {ord_val}, special_admission = {special} WHERE LOWER(TRIM(study_name)) = LOWER(TRIM('{db_escaped}')) AND UPPER(TRIM(university)) = '{uni}';")
            print(f"✓ {db_navn} → FT: {ft_val}, ORD: {ord_val}")
        else:
            print(f"✗ Ingen data for: {db_navn} ({uni})")
    else:
        print(f"✗ Ingen match i Excel: {db_navn} ({uni})")

with open('fiks_manglende.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"\nGenererte {len(sql_lines)} SQL-linjer")