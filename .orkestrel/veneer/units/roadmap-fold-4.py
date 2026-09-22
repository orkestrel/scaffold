# Roadmap fold 4 (D11): run from /home/user/veneer after F5a lands, then `oxfmt --write ROADMAP.md`,
# `npm run format:check`, `npm run test:policy`. Successor of roadmap-fold-3.py; edits ROADMAP.md only.
import re, sys
p = 'ROADMAP.md'
s = open(p, encoding='utf-8').read()

# 1. § Rulings: D11 bullet after the D8/D9/D10 bullet.
anchor = "  Test release on the user's one-time code (D10).\n"
assert s.count(anchor) == 1, 'D10 bullet'
s = s.replace(anchor, anchor + "- Write Bootstrap's physical properties: every logical declaration reverts to the physical\n  property Bootstrap 5.3.8 writes for the same rule, the direction machinery that policed\n  logical-only declarations goes with the writing direction it served, and every proof reads the\n  physical property (D11).\n")

# 2. Unit table: F5d row after F5a; F5b depends on F5d.
rows = s.split('\n')
out = []
for line in rows:
    out.append(line)
    if line.startswith('| F5a ACCOUNTING-SPLIT '):
        out.append("| F5d PHYSICAL | `opus` on Opus 5 | Veneer | F5a | every logical declaration in `src/styles/**` reverted to the physical property Bootstrap writes; every proof reading the physical property; the direction tables and scanners and the physical-property case removed; the guide's direction sentences and the `img` row corrected (D11) |")
s = '\n'.join(out)
f5b = [l for l in s.split('\n') if l.startswith('| F5b ACCOUNTING-LEDGER ')]
assert len(f5b) == 1, 'F5b row'
cells = f5b[0].split('|')
assert cells[4].strip() == 'F5a', cells[4]
cells[4] = ' F5d '
s = s.replace(f5b[0], '|'.join(cells))

# 3. § Decisions: no row is open.
start = s.index('## Decisions\n')
end = s.index('\n## ', start + 1)
section = s[start:end]
assert '| D11 ' in section, 'D11 row'
s = s[:start] + ("## Decisions\n\nNo decision is open. D2 to D11 were ruled on 2026-09-22; § Rulings carries each ruling, and\n"
                 "`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` carries the user's words.\n"
                 "A decision that arises later takes a row here, with a recommendation and its waiting units,\n"
                 "and the dispatch carries the recommendation only after the user rules.\n") + s[end:]

# 4. § Carriers: the matchesLooseTagPair row is satisfied by F5a's planted control and its subject is deleted.
rows = s.split('\n')
for i, line in enumerate(rows):
    if line.startswith('| Audit claim 7: `matchesLooseTagPair` accepts `p:not(h1 + p)`'):
        cells = line.split('|')
        cells[2] = ' F5a ACCOUNTING-SPLIT landed the rendered proof; its planted control is `p:not(h1 + p)` and the grammar is deleted (closed) '
        rows[i] = '|'.join(cells)
s = '\n'.join(rows)
assert 'the grammar is deleted (closed)' in s, 'carrier row'
open(p, 'w', encoding='utf-8').write(s)
print('fold 4 applied')
