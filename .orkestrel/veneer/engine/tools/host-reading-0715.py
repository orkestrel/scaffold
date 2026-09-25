# Appends the fourth reading's close to units/host-chromium-153-reading.md (2026-09-25), once. Run it on the file as
# committed; it refuses a file that already holds the section.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\units\host-chromium-153-reading.md')
t = p.read_bytes().decode('utf-8')
heading = '## The fourth reading closes (2026-09-25, REBOOT-153)'
assert heading not in t
section = f"""
{heading}

The styles session's REBOOT-153 (`6586b11`) reads each outline and border width whose line style is `none` or `hidden` at `0px` in `readFormDifferences`. On this host:

- The J-CONCERNS-B landing merged `6586b11` and read every styles file green: 115 of 115 files, 1556 tests (`tools/w2-land-2d-concerns-b-merge.log.txt`).
- The five files the styles session named read green alone at Veneer `main` `a65d308`, which holds `6586b11`: the four button-reboot files and `button.test.ts`, 5 of 5 files, 160 tests (`units/main-reboot-153-reading.log.txt`, instrument `../tools/main-reboot-153-reading.sh`).

No standing row remains. E5 excludes nothing from a landing chain on this host.
"""
if not t.endswith('\n'):
    t += '\n'
p.write_bytes((t + section).encode('utf-8'))
print('ok')
