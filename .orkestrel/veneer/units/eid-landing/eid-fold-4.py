# Folds the E-ID-BUTTON-CASCADE landing into Veneer's ROADMAP.md and re-baselines the rows the 2026-09-25 03:25 UTC
# reconciliation changed: the E-IDENTITY row names the CASCADE landing, E-ID-ANCHOR (D47), and E-ID-MOTION (D48) in place
# of "motion waits on the user's ruling"; the E-RECEIPTS row names its units and what waits on the user; the P1 row names
# the RELEASE-MODE units that precede it. Successor to eid-fold-3.py. Usage: python3 eid-fold-4.py <cascade-landing-sha>,
# from the Veneer checkout after the chain is green; oxfmt re-pads the table afterwards.
import sys
sha=sys.argv[1]
V='/home/user/scaffold/.orkestrel/veneer'
p='ROADMAP.md'
lines=open(p).read().split('\n')
def row(prefix):
    hits=[i for i,l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits)==1, (prefix, hits)
    return hits[0]
i=row('| E-IDENTITY ')
cells=lines[i].split('|')
assert 'motion waits on the user' in cells[2], cells[2]
cells[2]=(' `opus` on Opus 5.5 per `'+V+'/e-identity-design-verdict.md`; E-ID-RECORD landed as `6c26b14`, E-ID-LAYOUT as'
 ' `dd4300a`, E-ID-CODE as `4edb3c6`, E-ID-FLOW as `b4825e0`, E-ID-FLOW-2 as `873f715`, and E-ID-BUTTON-CASCADE as `'+sha+'`'
 ' (each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`); E-ID-BUTTON-CLASSES follows per `'+V+
 '/e-id-button-design-verdict.md`; E-ID-ANCHOR restates anchored visibility on the promoted overlays (D47); E-ID-MOTION'
 ' takes Elements\' motion for the collapse, modal, offcanvas, and carousel under the user\'s ruling the engine session'
 ' records as E26 (D48), from a terrain on Cursor Grok and a design round on `planner` and `analyst` ')
lines[i]='|'.join(cells)
i=row('| E-RECEIPTS ')
cells=lines[i].split('|')
assert cells[2].strip()=='`opus` on Opus 5.5', cells[2]
cells[2]=(' `opus` on Opus 5.5 per `'+V+'/e-receipts-design-verdict.md`: ER-MECH writes the `## Hosts` tables, their'
 ' readers, and their gates, then ER-LINUX records this host\'s receipt and ER-PROSE gates each sentence naming a browser'
 ' build; the release-mode binding waits on RELEASE-MODE; the Windows receipts (ER-WIN) and the Chrome channel (ER-CHROME)'
 ' wait on the user ')
lines[i]='|'.join(cells)
i=row('| P1 SCAFFOLD-PROPAGATE ')
cells=lines[i].split('|')
assert cells[2].strip().startswith('the Orchestrator runs the re-pin'), cells[2]
cells[2]=(' the Orchestrator runs the re-pin and `repair` in each target; `verifier` on Sonnet reads each target\'s gates;'
 ' RELEASE-MODE precedes it per `'+V+'/release-mode-design-verdict.md`: RM-SCAFFOLD (`opus` on Opus 5.5) forwards the'
 ' invocation mode through scaffold\'s project factories and pins it, RM-VENEER takes it into Veneer through a packed'
 ' scaffold and `repair`, and RM-RELEASE publishes scaffold with the user\'s one-time code ')
assert '`^0.0.77`' in cells[5], cells[5]
cells[5]=cells[5].replace('`@orkestrel/scaffold` at `^0.0.77`','`@orkestrel/scaffold` at the release RM-RELEASE publishes')
lines[i]='|'.join(cells)
open(p,'w').write('\n'.join(lines))
print('folded')
