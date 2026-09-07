# D5 scaffold-seed with D5-fix seed-rule — audit verdict

## Round 1 (2026-09-07)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet), `verifier` (Sonnet); Workflow `wf_e83c8713-ed1`, blind, clean contexts, one brief (`d5-audit-brief.md`, `d5-verify-brief.md`). Every lane ran and returned verdicts. Records: `d5-audit-subjective.md` (FAIL 11, 13), `d5-audit-objective.md` (FAIL 5, 10, 13), `d5-audit-checker.md` (FAIL 13), `d5-verify-report.md` (`GATES: RED npm run test:distribution`).

### Reconciled per claim

- 1, 2, 3, 4, 6, 7, 8, 9, 12 — PASS in every lane that could rule; the objective lane read the seed whole, the gate's allowlist and its red-first log, and the own-specifier emission against `srcToExports`; the checker confirmed the wiring, the rule bullet, the gate, and the status set.
- 5 — FAIL (objective): `writeSource` re-seeds its texts from the frozen inventory per row and flushes against it, so two index rows over one source file clobber each other's rewrites and the file is written twice. Carrier: D5-fix-2 L1.
- 10 — FAIL (objective): the `--to guide` case proves "every other byte" by sampling. Carrier: D5-fix-2 L2.
- 11 — FAIL (subjective): a count in the guide's exit-code sentence (`guides/scaffold.md:1033`). Carrier: D5-fix-2 L8.
- 13 — FAIL (subjective, objective, checker): counts of growable sets in both reports; D5's citations not re-based after D5-fix; the Orchestrator's integration note claimed `tests/setupServer.ts` is staged, which is false. The reports and the note are corrected in the retained records (this commit); `d5-fix-report.md` gained the renumbering table.

### The verifier's red, ruled by the deciding runs (M8)

`npm run test:distribution` under the shell's default npm 10.9.7 fails two cases. The first, `stages exactly the declared vendored host inventory` (`tests/distribution.test.ts:293`), is D5's: the file pins the vendored set by hand at `:250-285` and lacks `scripts/docs.ts`; D5's brief failed to scope that file as one the change makes false. Carrier: D5-fix-2 L12. The second, the packed-scaffold install (`:908`), reproduces with the registry scaffold, without the guide dependency, and on a bare `vitest ^4.1.11` install, and clears with peer resolution disabled: it is npm 10.9.7's `#loadPeerSet` crash on `vitest`'s peer set (`instruments/d5/install-npm10.err.txt`), not this tree's. Under npm 11.19.1 from `/opt/npm11/bin`, the way the last green run reached it, the install case is green and only `:293` is red (`instruments/d5/distribution-deciding-npm11.log.txt`, 75.16 s). The verify brief carries that standing condition again.

### Findings outside the claims, with carriers

- Objective: a no-op replacement counts as `written` (L3); a missing `guides/README.md` or an unindexed spec throws outside the documented exit codes (L4); `'scripts/docs.ts'` written twice in `src/core/compilers.ts` (L7, `DOCS_SEED_PATH`); the process-spawning cases sit in `src:core` at the default timeout (observation, the placement recorded by D5 and carried as a finding for the next change: a `scripts/`-axis project); no gate ran between the integration patches and the audit (closed: the verifier's round ran over the patched tree).
- Subjective: F1 `Outcome.left`/`formatLeft`/`reported:` are one quantity in three words (L5); F2 `buildSummaries` gathers, so `collectSummaries` (L6); F3 `DOCS_SEED_PATH` (L7); F4 the guide names which guide's tagline the pitch compares against and the silent skip (L8); F5 counts in the seed's own doc comment (L9); F6 `run npm run format` stutters, `next: npm run format` (L10); F7 the rule bullet repeats "for every workspace" (L11).
- Checker: the integration note's false sentence (corrected).
- Dropped on the record: none.

VERDICT: FAIL 5, 10, 11, 13 — D5-fix-2 briefed; the round re-runs its checker and verifier on the fix, and the objective lane on L1.

## Round 2 (2026-09-07, the closure of D5-fix-2)

Lanes: objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench) on `d5-fix-2-audit-brief.md`, `checker` (Sonnet) on `d5-fix-2-check-brief.md`, `verifier` (Sonnet) on `d5-verify-brief.md`; Workflow `wf_e175a635-d04`, blind. The subjective lane did not run this round: its round-1 findings were prose and naming items with fixed wording (F1 to F7), which the checker's claim 1 reads mechanically; the round's reason is recorded here rather than as a template sentence. Records: `d5-fix-2-audit-objective.md` (FAIL 8), `d5-fix-2-checker.md` (FAIL 4), `d5-verify-2-report.md` (`GATES: GREEN`, `test:distribution` under npm 11.19.1 at 73.80 s with every case green).

### Reconciled

- Objective 1 to 7 PASS; checker 1 to 3 PASS. Claim 1's falsification limb is a derivation from the round-1 verdict's quoted pre-fix source rather than an executed run; the executed red is the writer's own (`d5-fix-2-report.md` § Criteria 3, `wrote src/core/panels/panel.ts` twice), accepted as the unit's failing-first proof with that provenance recorded.
- Objective 8 and checker 4 FAIL on the report's citations (the span sites, the call sites, the constant's range, the Surface row, the next-step expectations) and on the `d5-fix-report.md` renumbering table missing the `guides/scaffold.md` shifts; corrected in the retained reports (this commit).
- Findings outside the claims, each carried by D5-fix-3: F1 the seed's local `collectSummaries` collides with the installed `collectSummaries` export of `@orkestrel/guide` and takes the name `collectCells`; F2 the no-op tally limb is reachable through two overlapping rows carrying one guide text, so a case pins `written` under it; F3 the nameless-manifest and unindexed-own-guide pitch limbs get executed assertions; F4 the write run's `written:` and `reported:` values are named in the guide's write-run paragraph. The report's exit-code-less criterion 1 is noted, not carried.
- Dropped on the record: none.

VERDICT: FAIL 8 (citations, corrected) — D5-fix-3 briefed as a `builder` round; acceptance follows its checker and the verifier.

## Round 3 (2026-09-07, the closure of D5-fix-3) — acceptance

Lanes: `checker` (Sonnet) on `d5-fix-3-check-brief.md`, `verifier` (Sonnet) on `d5-verify-brief.md`; Workflow `wf_65205b22-a11`. The Opus lanes did not run this round: D5-fix-3 was a fully specified `builder` unit whose four items the objective lane fixed in round 2 (F1 to F4), so the checker reads them mechanically; that is this round's own reason. Records: `d5-fix-3-checker.md` (FAIL 4, 6), `d5-verify-3-report.md` (`GATES: GREEN`; `test:distribution` under npm 11.19.1 at 77.36 s with every case green; `test:guides` red on exactly the two D4 cases).

- Checker 1, 2, 3, 5 PASS: `collectCells`, the duplicate-row case with the measured closing line, the two silent-pitch cases, and the scope.
- Checker 4 FAIL: the M4 sentence stated a count ("two further values"). Corrected by the Orchestrator in place (`d5-fix-3-integration.md`), the inventory regenerated, the policy sweep and the format check green after.
- Checker 6 FAIL: the builder's report cited pre-M3 line numbers for the M2 and M3 sites. Corrected in the retained report.
- Dropped on the record: none.

**VERDICT: PASS — D5 accepted with D5-fix, D5-fix-2, and D5-fix-3.** The seed, its wiring, the rule and its allowlist gate, the own-specifier entries, and the guides-gated selection stay uncommitted on this tree and land with D4 and D6 in one commit by path. Findings carried out of D5 to their carriers: F-a (the inventory omits `app/**`) to D7.n; the `scripts/` grouping to the next change to the group inference; the spawn proofs' home (`src:core`) to the next change to the Vitest projects; the registry-floor findings of the online configs audit to the next dependency visit.
