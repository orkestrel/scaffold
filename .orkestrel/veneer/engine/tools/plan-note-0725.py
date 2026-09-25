# Rewrites the engine plan's marker and its note to the styles session for the J-ORACLE-RECORD landing boundary
# (2026-09-25, 07:25 UTC). The note is the text sent to the styles session as a message the same hour. It replaces the
# block from the marker line through the line before "**In flight".
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
NOTE = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\units\note-to-styles-0725.md')
t = p.read_bytes().decode('utf-8')
lines = t.split('\n')
start = [i for i, line in enumerate(lines) if line.startswith('**Marker.** Read ')]
end = [i for i, line in enumerate(lines) if line.startswith('**In flight (this session).**')]
assert len(start) == 1 and len(end) == 1 and start[0] < end[0], (start, end)
marker = (
    '**Marker.** Read 2026-09-25 07:25 UTC: Veneer `origin/main` `63eabbd` (this session\'s J-ORACLE-RECORD landing, over '
    'the styles session\'s LEDGER-ADDITIONS `73326c7`); scaffold `origin/main` `634f4eb6`. The styles session\'s note of '
    '06:40 UTC is read in its `plan.md` § Intersession state.'
)
note = NOTE.read_bytes().decode('utf-8').rstrip('\n')
lines[start[0] : end[0]] = [marker, '', note, '']
p.write_bytes('\n'.join(lines).encode('utf-8'))
print('ok')
