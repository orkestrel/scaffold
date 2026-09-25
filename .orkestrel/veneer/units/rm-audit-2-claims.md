# RM-SCAFFOLD audit round 2 — claims

Subject: RM-SCAFFOLD round 2 in `/home/user/scaffold-rm` (branch `unit/rm`, uncommitted over scaffold `392aa1e0`), briefed
by `rm-scaffold-brief-2.md` to carry claims 4, 7, and 8, F1, F2, and the `src/core/compilers.ts` comment of
`rm-audit-verdict.md`. Written by `opus` on Opus 5.5 and reported in `rm-scaffold-report-2.md`. Evidence: `rm-2.diff`
(`git diff 392aa1e0`), `rm-2-status.txt`, and `rm-instruments/r2/` (the provenance script, the readings dumps, and the
logs). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. Round 1's claims 1, 3, 5, and 6 stand as ruled;
claims 1 and 3 here re-open them only as far as round 2's edits reach. A unit report's prose is not a claim subject. A
mutation counts as a kill only when the failing case's message names an assertion failure. Rule every claim.

1. **The fix and the end-to-end pin still hold.** Round 2 leaves the forwarding in `src/core/templates.ts` (the `vite`
   template's `mergeOverride`) and scaffold's own `vite.config.ts` byte-identical to round 1's, and the end-to-end case
   in `tests/distribution.test.ts` reads green after its move onto the shared fixtures (`rm-instruments/r2/logs/rm-2-e2e.log.txt`).
2. **The setup-file move (F1).** `tests/setupServer.ts` exports `readVitestReport` and `buildReleaseScenarios` with the
   `TestReportCase`, `TestReportFile`, and `TestReleaseScenario` shapes; `tests/setupServer.test.ts`
   `describe('the release-mode fixtures')` proves both, including `readVitestReport` returning `undefined` for a text
   that is not a Vitest report; the end-to-end case and the Vue SFC case read their reports through `readVitestReport`,
   and the end-to-end case builds its runs through `buildReleaseScenarios`; the case's readings are identical before and
   after the move (`rm-instruments/r2/rm-2-readings-before.json.txt` and `rm-instruments/r2/rm-2-readings-after.json.txt`, the scratch directory name
   normalized). The shapes' placement and names follow `.claude/rules/tests.md` and `.claude/rules/names.md`.
3. **The vendored title (claim 8).** The case in `tests/config.test.ts` is titled `returns the invocation mode and no
   other invocation field from every registered project factory`, its body is round 1's, and the title states what the
   body proves: it calls each factory with a synthetic record and reads the return, and it never runs Vitest.
4. **The comments (claim 7) and the compiler comment.** The comment near the factory-registration case in
   `tests/src/core/templates.test.ts` and the comment above `gives every application browser factory the caller
   override` in `tests/src/core/compilers.test.ts` each tell a factory receiving the record from one returning its mode,
   and each is true of the code; the comment beside `projects.push('appBrowser')` in `src/core/compilers.ts` equals the
   text `rm-scaffold-brief-2.md` item 3 prescribes, apart from the formatter's wrapping; no owned comment, TSDoc, or
   guide sentence still says registration alone carries the mode or that the record is refused.
5. **The guide sentence (F2).** The sentence added to the release paragraph of `guides/scaffold.md` is true of the
   code: the root factories receive the invocation record and run in its mode; a project whose factory returns no mode
   runs in Vitest's own `test` mode, where the proof skips; the journey wrapper `() => appJourney(variant, VARIANTS)`
   drops the record. Each pronoun names its referent.
6. **Failing first, with provenance (claim 4).** `rm-instruments/r2/rm-2-provenance.sh.txt` writes the `392aa1e0` blob of each fix site
   in place before the red runs; each log's header records that blob's SHA-256 and the in-place file's SHA-256, and the
   two are equal; `rm-instruments/r2/logs/rm-2-red-config.log.txt` and `rm-instruments/r2/logs/rm-2-red-distribution.log.txt` each read the new case failing
   with an assertion; the restore is byte-identical to the pre-run fixed copy. The recorded blob digests equal
   `git -C /home/user/scaffold-rm show 392aa1e0:<path> | sha256sum` for `src/core/templates.ts` and `vite.config.ts`.
7. **Gates.** `build`, `format:check`, `lint:check`, and `check` exit 0 (`rm-instruments/r2/logs/rm-2-*.log.txt`). The `npm test` reds are
   `src:core` timeouts only, read under a load average near 14 on 4 CPUs; the Orchestrator's re-run of the `src:core`
   project on the idle host reads `Tests 426 passed (426)` and exit 0 (`rm-instruments/r2/logs/rm-2-src-core-orchestrator-rerun.log.txt`),
   and the rest of the chain reads exit 0 project by project (`rm-instruments/r2/logs/rm-2-test-rest.log.txt`).
8. **Scope and law.** Every changed path is owned by round 1's brief or round 2's; `host.json` changes only by
   `npm run build`'s regeneration; `src/core/constants.ts`, `package.json`, and `package-lock.json` do not change; the
   diff adds no `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, or hidden
   helper; every added or retitled case title states what the case proves.
