# Audit round 1 — verdict record

Brief: `tmp/units/audit-1-brief.md` plus the B5 supplement. Lanes: `checker` (mechanical),
Grok objective (bench, journal `tmp/cursor/audit-1.log`), `reviewer` subjective (pending at this
writing; appended below when returned). Blind reports immutable; reconciliation is the
Orchestrator's.

## Checker (mechanical)

`VERDICT: PASS` on the mechanically decidable slice: all ten CI workflows conform to the reference
byte-level; scope honesty holds across every repository; behavioral claims correctly returned
UNRESOLVED. One process finding (missing S3/P3/B4 retention rows) — closed the same day in
`ci-units-report.md`. One narrative misreading (called L1's guide edit absent; the diff shows it
present) — noted, no verdict impact.

## Grok objective

`VERDICT: FAIL — 4 broken, 0 unresolved, 0 not-evidenced, 3 findings outside the claims`

Broken claims, each reproduced by the Orchestrator before acting:

- **11 (S1).** `portability.md` frontmatter `paths` omit the populations its Scripts and Claims
  sections govern (`guides/**/*.md`, `package.json`). Reproduced against the file. → fix F1.
- **13 (serial patch).** The `architecture.md` sweep bullet omits the `EOL` import inspector the
  sweep carries. Reproduced against the applied edit. → fix F1.
- **14 (CI).** Scaffold's workflow runs `npm run test:integration`; `package.json` declares no
  such script (`grep` exit 1) — pre-existing (the step predates the campaign), kept by S3 and
  mis-verified by S3's own check and the checker's corroboration. → fix F2.
- **15f (B5).** `types.ts` destroy/close bullets and `guides/browser.md` teardown rows still state
  the POSIX-only model ("plus its POSIX process group", "POSIX group drain", "launched process
  tree"). Reproduced at `types.ts:208-218`. → fix F3.

Findings outside the claims, all accepted:

- `guides/browser.md:1168` `ensures` (writing ban) — → F3.
- `portability.md` "Fold a leading drive letter in a lookup key alone" contradicts P4's measured
  mechanism (whole-key fold under declared sensitivity; drive-only folding was refuted by P1) —
  → F1.
- `portability.md` "NTFS records the mode" contradicts TE2's measurement (bits are not stored;
  `chmod 0o500` reads back `0444`) — → F1.

All confirmed claims (1–10, 12, 15a–15e) carry evidence pointers in the journal.

## Reviewer subjective

`VERDICT: FAIL — claims 11, 13, and 15f broken; 15e unresolved for missing regression-proof
evidence; the remaining claims confirmed`, plus findings F1–F11 (see the lane's return in the
session transcript). Load-bearing beyond Grok's set: the unclaimed `#confirmTransportLoss`
behavior change in the B5 diff (F1); the `adopt` naming collision (F11); console guide
self-contradiction (F4); terminal's stale `CONTROL_NAMES` prose (F3); lsp half-declared fences
(F5); `Overlay` positional boolean vs the options idiom (F6); PR0's unadopted control naming
(F7); the fleet probe's single-inspector control coverage (F8); the unrecorded Windows Node-floor
limit (F9); claim 9's severity corrected (RuntimeStage misses surface as candidate-miss issues,
not silent wrong answers); B5's inline-parse scope note ruled correct as shipped (F10).

## Reconciliation

Lanes agreed independently on claims 11 and 13 (different, compatible evidence — both folded into
one repair) and on 15f. The checker's PASS covers the mechanical slice both other lanes leaned on.
Verdict conflicts: none that required averaging — each lane answered its own question. 15e is
settled by the writer's own returned counts, which retention had dropped; the retention file now
carries them, and no re-run was owed.

Carriers: FA (scaffold — frontmatter, two rule lines, architecture bullets rewrite, rule-map
retag, workflow step drop, regen), FB (browser — close/destroy prose, contracts 12/13, `ensures`,
naming rename, `#confirmTransportLoss` probe-first ruling, workflow comment), FT (terminal prose),
FC (console sentence), FL (lsp fences), FP (probe Overlay options), F9 (workflow comments in
sea/mcp/test/process). Orchestrator-owned: B5/PR0 retention corrections (done), fleet-probe
per-inspector controls after FA lands (F8), successor rows in the registry. Dropped on the record:
nothing — every finding has a carrier.
