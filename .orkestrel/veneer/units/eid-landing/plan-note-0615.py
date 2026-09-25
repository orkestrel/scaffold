# Rewrites plan.md § Intersession state for the 06:15 UTC boundary: FADE and STATES landed on Veneer main b613ae4,
# LEDGER-ADDITIONS in its chain, the returned rounds and their audits, FACTOR dispatched.
p = '/home/user/scaffold/.orkestrel/veneer/plan.md'
t = open(p).read()
start = t.index('**Marker.**')
end = t.index('## Landing procedure')
new = '''**Marker.** Read 2026-09-25 06:15 UTC: Veneer `origin/main` `b613ae4` (this session's E-ID-MOTION-FADE and STATES
landing over your `3058570`); scaffold `origin/main` `ff87083a`. Your `engine/plan.md` § Intersession state is read at
`a2256ea9`; its marker reads 04:12 UTC.

**Note to the engine session (2026-09-25 06:15 UTC; read this first).** This session is the styles session; it never
touches `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, or the guide's `## Engine`
sections.

- **E-ID-MOTION-FADE and STATES are on `main`** (`1173e4a`, `fbc331c`, fold `b613ae4`). The `.fade` rule runs on
  `ease-out` at `150ms`. `tests/setupBrowser.ts` gains `sampleTransition` and `readCentre`; merge them by hunk beside
  your `readDuration`. The chain read every gate green, `src:browser` with no red outside the `0865c67` baseline and
  both journeys at 252 passed (`units/eid-landing/logs/eid-land-7-summary.log.txt`).
- **LEDGER-ADDITIONS is in its landing chain** (`f855924`, with the guide merge `2d3224b`). It changes
  `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/conformance.test.ts`: `Addition` gains a `value`
  member, the ledger gains `unattributed`, and `collectAttributionClasses` reads the classes inside `:is()` and
  `:where()` arguments. Your J-ORACLE landing merges these by hunk if it lands second (D49).
- **E-ID-BUTTON-CLASSES round 2 closes your third Chromium 153 row in its shape.** Every `.btn` form and every
  button-reboot class now compares the Veneer map of button-versus-anchor differences with the release's map, read in
  the same browser (`readFormDifferences` in `tests/setupBrowser.ts`). A plant that moves a default in both cascades
  keeps the proof green, and the same plant in the Veneer document alone fails every enabled form. Your landing
  verifier's Chromium 153 reading closes the row after this lands. Its audit runs.
- **E-ID-MOTION-FACTOR is writing** from `b613ae4`: the floating label, the progress bar, nav, pagination, the navbar
  toggler, and the accordion button's transitions scale by `--vn-factor-motion`. No engine proof reads these values
  (E32); the unit stops if its search finds one.
- **TOKEN-PROOFS changes § Customization's placement rule** (D51a). An override on the root element reaches every rule,
  tier, and alias that reads the token, except inside a `[data-bs-theme]` element below the root that declares it
  again; on such an element it reaches what its mode scope derives. No engine file changes. Its last text check runs.
- **RELEASE-MODE:** RM-SCAFFOLD landed (`aa1560ad`) and RM-VENEER is accepted. The scaffold release waits on the
  user's one-time code; your ER-WIN follows it (E31).
- **IMPORTANT-LAYER waits on the user** (`important-layer-design-verdict.md`). Both lanes recommend emitting every
  `!important` declaration outside the cascade layers, as Bootstrap does.
- **Standing answers.** Each E-ID-MOTION unit on a waiting engine (collapse, modal, offcanvas, carousel, tooltip,
  popover, toast) holds its landing until your J-MOTION-PROOFS unit for that component lands (E32). TOKEN-RETIRE records
  the `src/core/constants.ts` hunk here for your unit. This session runs the Chromium 141 readings J-PLACEMENT-141 asks
  for.

**In flight (this session), 2026-09-25 06:15 UTC.** Implementation and its audit first, the user's instruction.
- **Landing:** LEDGER-ADDITIONS (checker PASS, `lad-4-checker-verdict.md`).
- **Audits:** TOKEN-PROOFS round 6 (`analyst` on Astra checks the Orchestrator's text, `tkp-audit-5-claims.md`);
  E-ID-BUTTON-CLASSES round 2 (`analyst` on Astra and `reviewer` on Opus 5.5, `ebcl-audit-2-claims.md`);
  E-ID-MOTION-REDUCED round 2 (`checker`, `mred-2-checker-brief.md`).
- **Writing:** TAILWIND-RECIPE round 2 and E-ID-MOTION-FACTOR, each `opus` on Opus 5.5.

**Next here, in order:** land TOKEN-PROOFS, E-ID-MOTION-REDUCED, and E-ID-BUTTON-CLASSES as their reads pass;
TAILWIND-RECIPE's audit; E-ID-ANCHOR after E-ID-BUTTON-CLASSES lands; LEDGER-RETUNE after LEDGER-ADDITIONS lands;
RM-RELEASE with the user's one-time code, then P1 SCAFFOLD-PROPAGATE and the ER-LINUX receipt; the motion panel units as
your proofs land; IMPORTANT-EMIT after the user rules.

**Waiting on the user:** the IMPORTANT-LAYER ruling, whether Chrome is installed and on which platform (ER-CHROME), and
the one-time code for the scaffold release.

'''
t = t[:start] + new + t[end:]
open(p, 'w').write(t)
print('noted')
