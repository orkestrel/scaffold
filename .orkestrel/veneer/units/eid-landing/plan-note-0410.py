# Rewrites plan.md § Intersession state's marker, the CASCADE and asks bullets, and the In flight, Next, and Waiting
# paragraphs after the CASCADE and ENUM-TITLES landing. Usage: python3 plan-note-0410.py <main-sha> <time>, from the
# scaffold checkout.
import sys
main, time = sys.argv[1], sys.argv[2]
p = '.orkestrel/veneer/plan.md'
s = open(p).read()
a = s.index('**Marker.**')
b = s.index('**Note to the engine session')
s = s[:a] + ('**Marker.** Read 2026-09-25 ' + time + ' UTC: Veneer `origin/main` `' + main + '` (this session\'s CASCADE and\n'
 'ENUM-TITLES landing over your J-HOLDERS `0865c67`); scaffold `origin/main` `0e51f685` is your latest record\n'
 '(J-SAMEWAY-ENGINES-A round 2 and the J-SAMEWAY-ENGINES-B audit). Your `engine/plan.md` § Intersession state is read\n'
 'at that commit; its marker reads 01:10 UTC, so the asks in this note are not yet answered.\n\n') + s[b:]
old_start = s.index('- **E-ID-BUTTON-CASCADE lands next**')
old_end = s.index('- **Asked of you, from the motion ruling')
s = s[:old_start] + ('- **E-ID-BUTTON-CASCADE and ENUM-TITLES landed** in `' + main + '` (chain green, including `src:browser` against\n'
 '  the `0865c67` baseline with no red outside it). Every `button` element wears the calibrated surface whatever class it\n'
 '  carries; the classes the release builds on a button reset it with `:where()` in the `components` layer. It edits the\n'
 '  forced-colours key in `tests/conformance.test.ts` and one comment in `tests/app/browser/integration.test.ts`. If a\n'
 '  J-OVERLAYS or J-SAMEWAY-ENGINES proof reads a classed button\'s box, re-read it on this head.\n'
 '- **The ledger units share J-ORACLE\'s files (D49).** LEDGER-ADDITIONS and then LEDGER-RETUNE\n'
 '  (`ledger-values-design-verdict.md`) change `tests/setupServer.ts`, `tests/setupServer.test.ts`, and\n'
 '  `tests/conformance.test.ts`. Whichever of a ledger unit and your J-ORACLE landing lands second merges the other\'s\n'
 '  hunks by hunk, as D49 states. LEDGER-RETUNE adds a Chromium resolver to the conformance project.\n'
 '- **IMPORTANT-LAYER goes to the user** (`important-layer-design-verdict.md`). Both lanes recommend emitting every\n'
 '  `!important` declaration outside the cascade layers, as Bootstrap does. If the user rules that way,\n'
 '  `<div hidden class="d-flex">` displays as flex, and a later important background paints the inline offcanvas panel,\n'
 '  both as in Bootstrap. The planner found no `hidden` attribute on an element with a `d-*` class in `src/browser` or\n'
 '  `app`; say if an engine writes one.\n') + s[old_end:]
s = s.replace('so TOKEN-PROOFS will record the exact hunk here as a pending shared change\n  for your landing.',
 'so this session splits the retirement into TOKEN-RETIRE, which waits for your answer:\n  either you take the hunk that removes the four entries, or you agree that TOKEN-RETIRE edits those lines.')
a = s.index('**In flight (this session)')
b = s.index('## Landing procedure')
s = s[:a] + ('**In flight (this session), 2026-09-25 ' + time + ' UTC.** Implementation and its audit first, the user\'s instruction.\n'
 '- **Wave 1 from `' + main + '`,** each `opus` on Opus 5.5 in its own worktree: E-ID-BUTTON-CLASSES, E-ID-MOTION-FADE (its\n'
 '  easing only; the duration stays `150ms`, and no engine proof pins the easing), TOKEN-PROOFS (proofs and one guide\n'
 '  row), and LEDGER-ADDITIONS. STATES and TAILWIND-RECIPE follow as slots free.\n'
 '- **E-RECEIPTS:** ER-MECH is accepted after round 4 and is landing through the chain, which adds `test:service`,\n'
 '  `build`, and `test:distribution`.\n'
 '- **RELEASE-MODE:** RM-SCAFFOLD round 2 returned; its audit runs `analyst` on Astra and `reviewer` on Opus 5.5. Then\n'
 '  RM-VENEER, RM-RELEASE (the user\'s one-time code), and P1 follow.\n\n'
 '**Next here, in order:** the ER-MECH landing; the wave-1 audits and landings; E-ID-ANCHOR after E-ID-BUTTON-CLASSES;\n'
 'STATES and TAILWIND-RECIPE; LEDGER-RETUNE; the RM-SCAFFOLD audit and RM-VENEER; the motion units once you answer the\n'
 'motion ask; IMPORTANT-EMIT after the user rules; RM-RELEASE and P1 SCAFFOLD-PROPAGATE.\n\n'
 '**Waiting on the user:** the IMPORTANT-LAYER ruling, whether the engine session takes the Windows Chromium 153 and\n'
 'Edge receipts (ER-WIN), whether Chrome is installed and on which platform (ER-CHROME), and the one-time code for the\n'
 'scaffold release.\n\n') + s[b:]
open(p, 'w').write(s)
print('rewritten')
