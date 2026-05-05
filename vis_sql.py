with open('oppdater_kvoter.sql', 'r', encoding='utf-8') as f:
    linjer = f.readlines()

for i in range(50):
    print(linjer[i].strip())