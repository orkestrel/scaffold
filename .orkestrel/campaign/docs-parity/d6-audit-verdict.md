# D6 scaffold-converge with D6-fix-2 — audit verdict

## Round 1 (2026-09-07)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet), `verifier` (Sonnet); Workflow `wf_4c44afbc-f1f`, blind, clean contexts, one brief (`d6-audit-brief.md`, `d6-verify-brief.md`). Every lane ran and returned verdicts. Records: `d6-audit-subjective.md` (FAIL 12), `d6-audit-objective.md` (FAIL 1, 7, 9, 11, 12), `d6-audit-checker.md` (FAIL 9), `d6-verify-report.md` (`GATES: GREEN`: the whole suite at 1436 passed under npm 11 in about 66 s, `npm run docs` at exit 0, `test:guides` at 20 passed, and the distribution proof red on exactly the packed-install case the brief names).

### Reconciled per claim

- 2, 3, 4, 5, 6, 8 — PASS in both lanes: every converged sentence keeps the fuller side and is true of the code (spot-checked against declarations and bodies), the titled examples equal their fences and the untitled class blocks are held equal by hand, the pin and the readable worklist are as briefed, the tagline and the pitch are one noun phrase, the voice and the sweep hold.
- 1 — the tree passes; the claim's wording fails. `isRetainedPath`'s block was rewritten from a passive with a named actor to the active voice `.claude/rules/writing.md` requires, and the result converges with the cell's wording. Both lanes rule the edit correct and the direction's substance held. Ruling: the direction reads "a block is rewritten only to carry information the cell has, or to satisfy a rule the block's own sentence breaks"; no change to the tree.
- 7 — the tree passes; the claim's wording fails. The README's verb list links once from its introduction to the guide's Command line section rather than once per verb; the guide carries no per-verb heading, and Ruling 6 asks that the lists link to the guide. Ruling: the shared link stands, and this record carries the departure from the brief's wording the report left unrecorded (subjective finding B).
- 9 — the claim's wording fails (objective, checker): my claim said "comment text only" under `src/**` while D6-fix-2 removed the guides filter line in `blueprintToHostArtifacts`, and said `tests/setupServer.ts` moved by the filter while D6-fix-2 reverted it. The status set matches exactly. Ruling: D6's own `src/**` hunks are comment text; D6-fix-2 changed one selection line and reverted `tests/setupServer.ts` to its accepted state.
- 11 — the tree passes on every conjunct but one whose wording the re-baseline had overtaken: the distribution proof's confirming run is red on the packed-install case by dependency order (`plan.md` § Re-baseline after D6-fix-2 returned), which the verify brief reads as expected. Objective finding A restates that cause and asks for the guide release and the re-pin before the landing; ruling: the landing on the branch and `main` proceeds with the gate chain green, and scaffold's release waits on the guide's (Ruling 5, decision 9). The `@remarks` sentence "`npm run check` there still resolves the seed's import, because every workspace declares `@orkestrel/guide`" states the mechanism and holds once the declared range admits the release carrying the readers; it is true of no generated workspace until then, and the plan records that.
- 12 — FAIL (subjective, objective): counts of growable sets in both reports and one stale cite. Corrected in the retained reports (this commit); the D6 report's F1 citation of the guides filter describes the state D6 left and is annotated as superseded.
- The brief numbered no claim 10 (subjective finding D); recorded here.

### Findings outside the claims, with carriers

- Objective A and B (the head start and the registry copy carry one version and different exports; the proof must run against the registry copy before the release): D7.guide bumps the guide's version and publishes the readers first; scaffold re-pins `BASE_DEV_DEPENDENCIES` and re-runs the distribution proof before its own release. Carrier: the plan's phase B rows.
- Objective C (the reason clause at `guides/scaffold.md:1246-1247`): fixed by the Orchestrator (`d6-integration.md`).
- Objective D (the pin's failure names neither side) and subjective C (the guide does not state the example gate's reach): carried to D7.guide and D7.n — the readers' owner rules whether a class block enters the comparison, and the `tests/guides.test.ts` template carries the pin in a form whose failure names both sides.
- Objective E (the P7 instruments unretained): retained at `instruments/d6/p7/`.
- Subjective A (`isDeferredPath` and `isRetainedPath` carry near-identical summaries, a collision older than D6): carrier, the next documentation change in scaffold.
- Dropped on the record: none.

**VERDICT: PASS — D6 accepted with D6-fix-2.** D6b follows on this tree; the joint landing follows D6b.
