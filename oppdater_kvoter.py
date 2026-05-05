import pandas as pd

df = pd.read_excel('Poenggrenser.xlsx', header=1)
df = df.iloc[1:].reset_index(drop=True)
df.columns = ['study_code', 'study_name', 'university', 'location', 'category', 'first_time_cutoff', 'first_time_supplement_cutoff', 'ordinary_cutoff', 'ordinary_supplement_cutoff']
df['study_name'] = df['study_name'].astype(str).str.replace('*', '', regex=False).str.strip()
df['university'] = df['university'].astype(str).str.strip().str.upper()

sql_lines = []
for _, rad in df.iterrows():
    navn = str(rad['study_name']).strip().replace("'", "''")
    uni = str(rad['university']).strip().upper()
    ft = rad['first_time_cutoff']
    ord_c = rad['ordinary_cutoff']
    if pd.isna(ft) and pd.isna(ord_c):
        continue
    ft_val = f"{float(ft)}" if pd.notna(ft) else 'NULL'
    ord_val = f"{float(ord_c)}" if pd.notna(ord_c) else 'NULL'
    special = 'TRUE' if pd.notna(ft) and float(ft) > 80 else 'FALSE'
    sql_lines.append(f"UPDATE studier SET first_time_cutoff = {ft_val}, ordinary_cutoff = {ord_val}, special_admission = {special} WHERE LOWER(TRIM(study_name)) = LOWER(TRIM('{navn}')) AND UPPER(TRIM(university)) = '{uni}';")

with open('oppdater_kvoter.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"Ferdig! Genererte {len(sql_lines)} SQL-linjer i oppdater_kvoter.sql")