#!/usr/bin/env python3
"""Roadmap fold 21: align § Carriers, § Phases and units, § Tenets, and § Decisions with the landed units and the campaign's decisions (the X-RETENTION carry check of 2026-09-23)."""
import re
p='/home/user/veneer/ROADMAP.md'; s=open(p).read()
def cell(key, new, index=2):
    global s
    lines=s.split('\n'); hits=[i for i,l in enumerate(lines) if l.startswith('| '+key)]
    assert len(hits)==1, (key, len(hits))
    parts=lines[hits[0]].split('|'); parts[index]=' '+new+' '; lines[hits[0]]='|'.join(parts); s='\n'.join(lines)
s=s.replace('Use Grok 4.6 to absorb','Use Grok 4.7 to absorb')
cell('F9 VENEER-REPIN', 'landed: `builder` on Sonnet; the Orchestrator ran `npm ci`; `verifier` on Sonnet (`a162c91`)')
cell('F7b CAPTION-SPECIMEN', '`builder` on Sonnet after the B-FORMS landings')
# B-FORMS row: append the FLOOR and ASSETS units
lines=s.split('\n'); i=[k for k,l in enumerate(lines) if l.startswith('| B-FORMS ')][0]; parts=lines[i].split('|'); parts[2]=parts[2].rstrip()+'; B-FORMS-FLOOR (`builder` on Sonnet, D32) lands with FLOATING; B-FORMS-ASSETS (`builder` on Sonnet, D26) follows SELECT '; lines[i]='|'.join(parts); s='\n'.join(lines)
cell('Outline ghost; dark primary contrast', "E-ELEMENTS assembles the readings and the user's APPEARANCE-RULING is its input; E-IDENTITY's landing of each ruling is the row `U7c paint calibration readings` carries")
cell('Build dropping vendor prefixes', 'closed: the F5 ACCOUNTING units landed (F5a `984d062` through F5e `67d12d7`, § Phases and units)')
cell('Two deferral grammars', 'closed: the F5 ACCOUNTING units landed (F5a `984d062` through F5e `67d12d7`, § Phases and units)')
cell('Container and navigation combinators while navigation stays deferred', 'the Navbar unit of B-COLLAPSE … B-SCROLLSPY closes their behaviour; F5 classified them (landed)')
cell('Registry later majors of `@vitest/browser-playwright`', 'X-EXIT records the exclusion (D8)')
cell('Forced-colours axis', 'closed: T2 landed (`73e4069`) and F9 VENEER-REPIN landed (`a162c91`) with the Compatibility section\'s forced-colours reading')
cell('Chrome receipt', 'E-RECEIPTS records the promised hosts (F4 HOST-OBSERVATIONS pinned them, `af673cb`); the install is the user\'s')
cell('U1-del legacy tree in the working tree', 'X-RETENTION carries the working-tree deletion (recorded drop: `fc36cec`)')
cell('Cross-cutting reconciliation', 'closed: the F5 ACCOUNTING units landed before the families opened (F5a `984d062` through F5e `67d12d7`)')
cell('U7c paint calibration readings', 'E-ELEMENTS takes the readings; E-IDENTITY lands the ruling (its own later row)')
cell('Caption opt-out', 'F7b CAPTION-SPECIMEN supplies the specimen (F6 FOUNDATION landed the opt-out, `04114c5`)')
cell('The `.btn-close` departure rows filed under `btn`', 'closed at B-PASSIVE-A\'s landing (`62ff1a6`): the rows sit under `#### \\`btn-close\\`` (D22)')
cell('A later unit that ships a shared class name whose Veneer declarations are all normal', 'carrier not yet known: re-checked at every forms and utilities dispatch; the F8c consumer proof reddens when such a name ships, which is the trigger')
cell('`emitEvent`, `bindEventMap`, and `Delegate` are Button-shaped', 'B-COLLAPSE moves all three (F6 FOUNDATION recorded the shape, `04114c5`)')
cell('Audit claim 4: delegated release on host removal', 'B-COLLAPSE rules release-on-removal (F4 HOST-OBSERVATIONS recorded the present semantics, `af673cb`)')
cell('Audit claim 11: the guide\'s link rows', 'E-IDENTITY rules the stripe value (the F5 and F6 parts landed)')
cell('Audit claim 13: unrecorded structural changes', 'E-IDENTITY rules which departures stay (the F5 part landed)')
cell('F5d reviewer F-F: a brief listing `ROADMAP.md`', 'the next dispatch\'s brief check lists `ROADMAP.md` once, as report-only; X-EXIT verifies it over the retained briefs (the 2026-09-23 conventions audit found the fix briefs still listing it twice)')
# rows whose remainder was F9
for key in ['Audit claim 17','Audit claim 25']:
    lines=s.split('\n'); hits=[k for k,l in enumerate(lines) if l.startswith('| '+key)]
    for k in hits:
        parts=lines[k].split('|'); parts[2]=' closed: T1 landed (`73e4069`) and F9 VENEER-REPIN (`a162c91`) deleted the local copies '; lines[k]='|'.join(parts)
    s='\n'.join(lines)
# new carrier rows before the § Decisions heading: append after the last table row of § Carriers
anchor='\n## Decisions'
new_rows=(
"| D14's law that `guides/` holds guides alone (the package guide, the map, the catalog mirrors) | P1 SCAFFOLD-PROPAGATE lands the sentence in `.claude/rules/documentation.md` |\n"
"| D18's law that an unread `@use` is a dead load | P1 SCAFFOLD-PROPAGATE lands the sentence in `.claude/rules/styles.md` |\n"
"| The ledger readers' repeated default guide path and the working-directory `VENEER_GUIDE_PATH` read in `tests/setupStyles.test.ts` (F8c-B round 2, claim 10) | B-PASSIVE-CLOSE routes the defaults through `VENEER_GUIDE_PATH` and the style proofs through `readVeneerGuide` |\n")
i=s.index(anchor); j=s.rfind('\n|', 0, i); s=s[:j+1]+s[j+1:i].rstrip('\n')+'\n'+new_rows.rstrip('\n')+s[i:]
old_dec=s[s.index('No decision is open.'):s.index("carries the user's words.")+len("carries the user's words.")]
s=s.replace(old_dec, "D2 to D12 were ruled by the user on 2026-09-22 and § Rulings carries each ruling; D13 to D36 are the\nOrchestrator's rulings, recorded in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`\nand promoted into the landing commit message of the unit that carries each one and into the guide\nwhere a ruling states product truth. No decision waits on the user.")
open(p,'w').write(s); print('fold 21 applied')
