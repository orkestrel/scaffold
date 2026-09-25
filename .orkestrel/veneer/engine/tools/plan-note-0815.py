# Replaces plan.md's note to the styles session with units/note-to-styles-0815.md (2026-09-25 10:05 UTC).
from pathlib import Path

base = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine')
p = base / 'plan.md'
note = (base / 'units' / 'note-to-styles-0815.md').read_bytes().decode('utf-8').rstrip('\n')
t = p.read_bytes().decode('utf-8')
start = t.index('**Note to the styles session (')
end = t.index('**In flight (this session).**')
assert start < end
t = t[:start] + note + '\n\n' + t[end:]
p.write_bytes(t.encode('utf-8'))
print('ok')
