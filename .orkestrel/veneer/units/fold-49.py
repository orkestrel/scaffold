#!/usr/bin/env python3
"""Fold 49: record the Codex bench dark on quota (2026-09-23 13:34 UTC) and the lane substitution."""
import re, sys
p = '/home/user/veneer/ROADMAP.md'; s = open(p).read()
anchor = '\n## Exit criterion\n'
if s.count(anchor) != 1: sys.exit('fold 49 refused: anchor')
row = ("| The Codex bench reported its usage limit at 2026-09-23 13:34 UTC (`You've hit your usage limit … try again at Sep 26th, 2026 5:53 PM`) on the B-PASSIVE-PROSE audit lane (thread `01a0ce4f-7555-7033-83cc-7991995c4bba`). | Opus 5.5 runs every lane until the bench round-trips again (the substitution table in `.agents/orchestration.md` § Engine assignment): the objective lane as `reviewer` told it holds that lane, in a separate clean-context subagent, blind to the subjective lane; each verdict records the substitution. The user decides whether to add credits; no other login or credential is substituted. | the Orchestrator re-probes the bench at each dispatch and re-plans the lane |\n")
m = re.search(r'^## Standing conditions\n(.*?)(?=\n## )', s, re.S | re.M)
if not m: sys.exit('fold 49 refused: section')
section = m.group(0)
last_row_end = section.rstrip('\n')
s = s.replace(section, last_row_end + '\n' + row, 1)
open(p, 'w').write(s); print('fold 49 applied')
