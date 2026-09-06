# Check brief — U4-fix and U4-fix-2 (scaffold), mechanical closure of the round-1 prescriptions

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing. Every edit in this unit adopts a round-1 lane's prescription verbatim, so this round closes with the checker and the verifier; the reviewer lanes do not re-run.

## Subject

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u4-fix-brief.md` (edits 1 to 5) and its report `u4-fix-report.md`, and the successor `u4-fix-2-brief.md` (the classifier fixture's shape and the `requireDriver` fold) with its report `u4-fix-2-report.md`; the prescriptions came from `u4-audit-subjective.md` (claim 8, F1, F2) and `u4-audit-objective.md` (F1, F2, F4), reconciled in `u4-audit-verdict.md`. Governing files: `/home/user/scaffold/AGENTS.md` § Design laws and § Writing, `.claude/rules/writing.md`, `.claude/rules/tests.md`.

## Review evidence

The fix slices as interdiffs: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u4-fix.diff.txt` (`a/`: the tree after U4; `b/`: after U4-fix) and `u4-fix-2.diff.txt` (`a/`: after U4-fix; `b/`: the tree now); the whole U4 change is `u4-fix-2.full.diff.txt`; the status is `u4-fix-2.status.txt`. Read `src/core/templates.ts` at its new state where the diff is not enough; the proof block is a template string with escaped backticks.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. The require drive selects its drivers into a binding and asserts that binding is not empty before the `flatMap`, in the shape the import drive uses; its comment reads the two sentences the brief quotes, with `whose … that` and `preceding`, and neither `above` nor a dropped relative pronoun survives.
2. `checkSurface` names the module `surface.<label><slug>.<extension>` and the project `tsconfig.surface.<label><slug>.<extension>.json`, so no two surfaces of one entry, and no browser and Node face under `bundler`, share a project file or a module path.
3. `Entry.declaration` carries three booleans set from `resolveDeclaration(...) !== undefined`, every reader reads the boolean, no `join(installed, declaration…)` survives, and the interface comment describes the members as facts.
4. A module-scope `BROWSER_DRIVER` binding beside `RESOLUTIONS` names the `bundler` row and throws when the row is absent, with no `requireDriver` helper surviving (the fold U4-fix-2 prescribes); the browser drive calls `checkSurface` once with it; the `BUNDLER` constant is gone and the row's `label` is the literal `'bundler'`.
5. The report names the prose sweep's pattern and every hit's ruling, and the block carries no `above`, `below`, `should`, `simply`, `easy`, or `just` in prose.
6. The classifier fixture in `tests/src/core/templates.test.ts` (`classifies staged exports by browser reachability and runtime format`) carries booleans in every `declaration` literal of its expected entries (`true` where a path stood, `false` where `undefined` stood) and nothing else in that expectation changed; no other line of that file changed.
7. Nothing outside the distribution proof block of `src/core/templates.ts` and that one fixture changed, and each report's criteria and deviations match its slice (U4-fix's deviation named the fixture it could not touch; U4-fix-2 closed it).

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
