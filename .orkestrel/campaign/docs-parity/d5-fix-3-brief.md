# Unit D5-fix-3 — seed-findings: the closure round's four findings on the seed

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing. Apply the items exactly as written; stop and report on any deviation.

## Read first

`/home/user/scaffold/AGENTS.md`; `.claude/rules/tests.md`; `.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-2-audit-objective.md` § Findings outside the claims (F1 to F4); `scripts/docs.ts` (whole); `tests/src/core/compilers.test.ts` from `const SEED_GUIDE` (about `:1868`) to the end of the file (the fixtures `SEED_*`, `buildSeedWorkspace`, `runSeed`, and `describe('the documentation seed')`); `guides/scaffold.md:1026-1057`.

## Items

- **M1. `collectCells`.** Rename the seed's local `collectSummaries` (`scripts/docs.ts:169`) to `collectCells` at its declaration and its call (`:396`); keep its doc block's sentence, changing the verb phrase only if it names the old word. `@orkestrel/guide` exports a `collectSummaries` with another contract, which is the collision.
- **M2. The no-op tally case.** In the overlap fixture, give `SEED_OVERLAP_CHILD` a third Surface row that documents the same declaration the parent row documents (`frame`), with the parent's cell text byte-identical, so the child row's rewrite of that block is a no-op after the parent's. In the case `carries every overlapping row into one source file and writes that file once`, assert the closing line reads the drifts found by the readers (measure it) with `written:` one less than that count, and one `wrote ` line; keep the whole-file and clean-re-report assertions. Record the measured closing line.
- **M3. The silent pitch limbs.** Two cases beside the existing pitch case: a fixture whose `package.json` declares no `name` (copy the seed fixture and delete the field) asserting the exact line array carries no `pitch` line and the exit code the standing drifts give; a fixture whose manifest names a guide the index does not carry (a `name` whose short form has no `guides/<name>.md` row) asserting the same. Name each case for what it proves.
- **M4. The write run's closing line.** In `guides/scaffold.md`'s write-run paragraph (`:1049-1057` region), add one sentence naming the `written:` and `reported:` values of a write run's closing line: `written:` counts the rewrites the run carried across, and `reported:` counts the disagreements it left standing with a reason. No count of a growable set; the code tokens followed by nouns.

## Standing conditions

D4, D5, D5-fix, and D5-fix-2 are on this tree uncommitted and accepted pending this round; `npm run test:guides` is red on exactly the two D4 cases by design. `node_modules/@orkestrel/guide` is a `--no-save` head start; never `npm install`. `guides/scaffold.md` is a staged host file, so `npm run build` moves `host.json` by its digest.

## Scope

- Owned: `scripts/docs.ts` (M1 only), `tests/src/core/compilers.test.ts` (M2, M3), `guides/scaffold.md` (M4 only), `host.json` (by regeneration alone).
- Off-limits: everything else.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:policy`, `npm run build`, `npm run build:inventory`, `npm run docs` (observation). Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "collectSummaries" scripts/docs.ts` prints nothing; `grep -n "collectCells" scripts/docs.ts` prints the declaration and the call.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `npm run test:src:core` exits 0 with the two M3 cases listed and the overlap case green under its new assertions; `npm run test:policy` exits 0.
4. `npm run build` exits 0; `sha256sum host.json` identical before and after a second `npm run build:inventory`.
5. Observation: `npm run docs` exits 1 with `disagreements found: 316`.

## Output

Write `/home/user/scaffold/tmp/units/docs-d5-fix-3-report.md`: each M with `file:line`, the measured closing line under M2, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims, no count of a growable set. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when M2's third row does not produce a no-op (the readers report it differently than F2 predicts), when M3's fixture cannot suppress the pitch line, or when a gate fails outside the owned files. The case names and the M4 sentence's wording are yours to decide and record.
