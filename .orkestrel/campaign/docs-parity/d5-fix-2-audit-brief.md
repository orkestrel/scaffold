# Audit brief — D5-fix-2 seed-close (the objective lane, round 2 of D5)

## Lane

One lane, `reviewer` on Opus 5 holding the objective perspective on the recorded substitution for the dark Sol bench: correctness of the seed's one-map rewrite across rows, what the installed readers permit, the exit codes, and the reality of the added cases. A `checker` (Sonnet) runs beside it on `d5-fix-2-check-brief.md`. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing. Rule on every claim with PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing.

## Subject

Unit D5-fix-2 (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-2-brief.md`) closed the findings of D5's first audit round (`d5-audit-verdict.md` round 1). The report: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-2-report.md`. The evidence, at absolute paths: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-2.diff.txt` and `d5-fix-2.status.txt` (the whole uncommitted tree: D4, D5, D5-fix, and D5-fix-2 together), `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-audit-objective.md` (claims 5 and 10 and § Findings outside the claims, the findings this unit closes), `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-audit-subjective.md` § Findings outside the claims (F1 to F7), the changed files at their new state under `/home/user/scaffold`, and the installed `@orkestrel/guide` declaration at `/home/user/scaffold/node_modules/@orkestrel/guide/dist/src/core/index.d.ts` (`replaceCell`, `locateComment`, `replaceSummary`, `replaceExample`, `spliceSpan`).

## Claims

1. **One map across rows (L1).** The seed seeds one mutable text map from the inventory once before the row loop; `writeGuide` and `writeSource` read from and write into that map; every `locateComment` and `spliceSpan` reads the map's current text so offsets stay valid across successive rewrites of one file within a row and across rows; each changed file is flushed once after every row ran, compared against the original inventory; `wrote <path>` prints once per moved file; the two-row case builds two index rows whose modules overlap on one source file carrying a drift under each, asserts both rewrites survive in the file, and asserts `wrote <path>` once — and the case fails against the pre-fix per-row re-seeding (state how you established that from the diff, or CANNOT RULE).
2. **The whole-file proof (L2).** The `--to guide` case asserts the written guide byte for byte against an expected constant, and the constant is the file `replaceCell` produces (one-space padded cells per the installed declaration), with the `toContain` lines kept as landmarks.
3. **`written` counts a change (L3).** `written` increments only when a replacement differs from the current text; a no-op replacement prints no `wrote` line, no next-step line, and `written: 0`.
4. **A missing index exits inside the code set (L4).** A workspace with no `guides/README.md`, and an index row naming a spec the inventory lacks, each print one line naming the file and exit 2 without a throw; a case proves each; the guide's exit-code sentence names the case.
5. **The names (L5, L6).** `Outcome.reported`, `formatReported`, and the printed `reported:` label agree; `collectSummaries` replaces `buildSummaries`; no other occurrence of `left`, `formatLeft`, or `buildSummaries` remains in the seed or its cases.
6. **The seed's path has one home (L7).** `DOCS_SEED_PATH` is declared once in `src/core/constants.ts` with its doc block, `HOST_PATHS` reads it, `blueprintToHostArtifacts` and the `docs` command in `blueprintToScripts` read it, no `'scripts/docs.ts'` literal remains in `src/core/compilers.ts`, the guide's `## Surface` carries its row, and a case pins `HOST_PATHS` carrying it.
7. **The pinned vendored list (L12).** `tests/distribution.test.ts`'s hand-pinned list carries `'scripts/docs.ts'` after `'scripts/ollama.sh'` and nothing else in that file moved.
8. **Report honesty.** Every `file:line` the report cites matches the files at their new state; the renumbering table names the D5 and D5-fix citations this round moved; every criterion carries its exit code; the observations (`test:distribution` under npm 11, `npm run docs`, `test:guides`) are recorded with output; no count of a growable set in the prose.

## Output

Per claim, the verdict and its evidence. Then findings outside the claims, each with `file:line` and what right looks like. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
