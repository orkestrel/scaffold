#!/usr/bin/env python3
"""Fold 48: B-PASSIVE-ORDER landed for the barrel and the conformance case; the guide's sections and
tables follow in B-PASSIVE-ORDER-GUIDE on the landed guide."""
import subprocess, re, sys
sha = subprocess.check_output(['git', '-C', '/home/user/veneer', 'rev-parse', '--short', 'HEAD']).decode().strip()
p = '/home/user/veneer/ROADMAP.md'; s = open(p).read()
opening = "The barrel's passive block (pagination, button-group, progress, spinner, placeholder, card, list-group, breadcrumb, badge, close) loads in landing order"
m = re.search(r'^\| ' + re.escape(opening) + r'[^\n]*$', s, re.M)
if not m: sys.exit('fold 48 refused: row')
cells = m.group(0).split('|')
cells[2] = f" Closed for the barrel and the conformance case: B-PASSIVE-ORDER at `{sha}` loads the passive block and the helpers in the release order after the forms partials, pinned by the order case with the pre-reorder barrel as its negative control; the guide's sections and `#### <key>` tables follow in B-PASSIVE-ORDER-GUIDE, a `builder` unit on the landed guide "
s = s[:m.start()] + '|'.join(cells) + s[m.end():]
open(p, 'w').write(s); print('fold 48 applied with', sha)
