# RM-SCAFFOLD audit — verdict (2026-09-25)

The Orchestrator's reconciliation of the RM-SCAFFOLD audit on `rm-audit-claims.md`. Three lanes ran blind to each
other: the objective lane, `analyst` on GPT-6 Astra (`rm-audit-objective-verdict.md`; journal
`tmp/codex/rm-audit-analyst.jsonl`, thread `01a0d6a5-3b55-7dd2-8e76-4e2fe9806370`); the subjective lane, `reviewer` on
Opus 5.5 (`rm-audit-subjective-verdict.md`); and `checker` on Sonnet on claims 7 and 8 (`rm-audit-checker-verdict.md`).
The unit was written by `opus` on Opus 5.5; the objective lane ran on another engine.

## Claims

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 The fix | CONFIRMED | CONFIRMED | — | CONFIRMED; the objective lane executed the extracted functions and cited the installed Vitest's root-mode hand-off and its selection of the returned project mode |
| 2 The vendored contract | BROKEN | BROKEN | — | Claims-file fault, dropped on the record: "imports only `node:` modules and `vitest`" restated the design verdict's paraphrase; the file imported `vite`, Oxlint, and local modules before the change, the change adds no import, and the law is `.claude/rules/workspace.md`'s vendored-file import law. The behavioural clauses hold on both lanes. |
| 3 The end-to-end pin | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Failing first | CONFIRMED | UNRESOLVED | — | UNRESOLVED on provenance: the red logs read byte-for-byte as the mutation logs, so they cannot show the red runs used the `392aa1e0` bytes; round 2 re-runs them with the base bytes in place and each site's digest in the log header |
| 5 Mutation | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 Host log | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 Prose | BROKEN | CONFIRMED | CONFIRMED | BROKEN: two owned comments still state the old model — `tests/src/core/templates.test.ts` (the comment near the factory-registration case, around line 1040, says registration makes Vitest read the command line's mode) and `tests/src/core/compilers.test.ts` (around line 1222, the invocation record described as refused); the subjective lane and the checker read the guide and the template comments, which hold |
| 8 Scope and law | CONFIRMED | BROKEN | CONFIRMED | BROKEN on the title clause: the vendored case `runs every project in the mode Vitest was invoked with` calls the factories through `Reflect.apply` with a synthetic record and never runs Vitest, so a Vitest change that ignores a project's returned mode leaves it green under a false title; only the end-to-end case reads Vitest |

- The subjective lane's `host.json` referral, settled by the Orchestrator: at `392aa1e0`, `host.json` records
  `d90a3808…` for `.agents/orchestration.md` and `9393ce28…` for `.claude/rules/styles.md`, while those files hash to
  `4cd7d762…` and `19bcde20…`. The inventory was stale before the unit, and the regenerated digests are correct; the
  release that carries them moves the vendored surface on those files' account as well.

## Findings outside the claims

- **F1 (subjective), accepted.** The end-to-end case holds its rival-scenario table inline and reads the Vitest JSON
  report a second time beside the existing reader in `tests/distribution.test.ts`; `.claude/rules/tests.md` puts data
  tables in a setup file and a reusable reader in the shared infrastructure.
- **F2 (subjective), accepted.** `guides/scaffold.md`'s added sentence says the root factories carry the mode into
  "each project"; the birth-owned journey wrapper registers `() => appJourney(variant, VARIANTS)`, which drops the
  record, so a journey project runs in `test`. The sentence narrows to the factories that receive the record, and "its"
  in "its own `test` mode" names Vitest.
- **The report-only `src/core/compilers.ts` comment, carried.** The existing comment beside the factory row states a
  necessary condition; the unit's patch names the `mergeOverride` step. It is carried with the subjective lane's pronoun
  fix, because the brief scoped out the prose describing the changed mechanism without naming a carrier.

## Carrier

RM-SCAFFOLD round 2 (`rm-scaffold-brief-2.md`, `opus` on Opus 5.5): claims 4, 7, and 8, F1, F2, and the `compilers.ts`
comment. Its audit runs `analyst` on Astra and `reviewer` on Opus 5.5.

## Ruling

FAIL. The fix and its end-to-end pin stand; round 2 carries one title, three comments, one guide sentence, the
provenance re-run, and the move of the scenario table and the report reader into the setup file.
