# Campaign context block (pasted into every unit brief of the second contract performance campaign)

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill: none unless the brief names one; guide `/home/user/contract/guides/contract.md`.

**Host.** Linux container, bash, 4 CPUs, node v22.22.2, npm 10. Working path `/home/user/contract` (git branch `claude/method-memoization-contracts-yus26p`, baseline commit named in the brief, clean tree at dispatch). Outbound HTTPS goes through a proxy; nothing in a unit needs the network. Foreground commands are capped at 10 minutes. `oxfmt` and `oxlint` are the formatter and linter (`npm run format:check`, `npm run lint:check`); `npm run check` is the typecheck; scoped tests run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <test file>`. A whole-suite run (`npm test`) takes minutes and is an observation, never a criterion, for a unit.

**Gates the Orchestrator runs after the unit exits.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, plus the paired A/B and the answer-parity differential against the 0.0.15 dist. A unit reports its own scoped readings; the authoritative runs are the Orchestrator's.

**Standing conditions.** No file is expected dirty at dispatch. No gate is red at the baseline. No role commits, pushes, installs, or runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Write instruments only under `/home/user/contract/tmp/` (gitignored) and remove them before returning. Never read or print credentials or environment values.

**Measurement doctrine for this campaign.** Every performance claim rests on the Orchestrator's paired A/B (6 fresh processes, load order swapped, admission: median across replicates ≤ 0.95 and every replicate ≤ 0.98 on the target family) and on the answer-parity differential reading IDENTICAL. A unit never claims a magnitude; it reports what it measured under what conditions.

**Test doctrine.** Real implementations only: no mocks, spies, module replacement, or fake clocks. A pin is named for what it proves, never for the control that specified it. A behaviour change lands with the test that turns red without it: record the exact command and its failing count before the fix, then the same command green after it.

**Retention.** The Orchestrator copies the brief and the returned report to `/home/user/scaffold/.orkestrel/contract/`. The unit writes its report as its final message.

# Unit U1f — fix round for U1: delete the index-text table, bind the refusal pins

Successor of `u1-packed-brief.md` (U1, report `u1-packed-report.md`). What changed and why: the audit round (`u1-audit-verdict.md`) measured that `INDEX_TEXTS` contributes nothing (U1 against U1 without the table reads 0.99–1.00 in 6 processes) and that its module-evaluation statements make the manifest's `"sideEffects": false` false; two test findings and one guide clause follow from the lanes' prescriptions, adopted verbatim.

## Role and engine

`implementer` on Opus 5, native Claude subagent, clean context (objective work class; Opus substitutes for the excluded Sol bench). Perform the assignment directly and spawn nothing.

## Objective

`readArrayEntries` keeps the direct copy for an exactly canonical reflected population with no index-text table: the comparison reads `INTRINSICS.text(position)`, `INDEX_TEXTS` and every trace of it are gone, the disowning pins bind the exact refusal on the first and the last index, the restating parity test is removed, and the guide row is tightened.

## Context

**Evidence.** Baseline: the U1 working tree (uncommitted over 3193da1; `git status --porcelain` lists `guides/contract.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`). Read the U1 diff you are correcting with `git -C /home/user/contract diff`. Measurement behind the deletion: `/home/user/scaffold/.orkestrel/contract/results/multi-table-contribution.out` (is-medium 0.996, is-deep 0.992, is-list48 0.992, audit-list48 1.001 for U1 versus U1 with `INTRINSICS.text(position)` at every position). The built artifact currently carries a top-level `for` and a bare `INTRINSICS.freeze(INDEX_TEXTS)` call (`dist/src/core/index.js:243-244`) while `package.json` declares `"sideEffects": false`; after this unit no module-evaluation statement may exist under `src/`.

**Standing conditions.** The tree is dirty at dispatch with U1's edits; that is the state you correct, not a deviation.

## Mechanism (fixed by the audit reconciliation)

1. `src/core/constants.ts`: delete `INDEX_TEXTS`, its section comment, its TSDoc, the fill loop, and the freeze call. The file returns to its U1-baseline content (`git diff src/core/constants.ts` must be empty when you finish).
2. `src/core/helpers.ts`: drop the `INDEX_TEXTS` import; in `readArrayEntries` compare `members[position] !== INTRINSICS.text(position)`; collapse the `let canonical` flag and its two `if (canonical)` blocks into one predicate shape (a single canonicality decision, then the direct copy or the walk) with no size gate. Keep: `length` once, `members` once, per-index `INTRINSICS.own` corroboration before the single indexed read, `new INTRINSICS.list`, both freezes, `dense: true`. Update the TSDoc remark: remove the `{@link INDEX_TEXTS}` sentence clause; keep the sentence that a canonical population is copied straight under the same corroboration with the same answers and refusals. Sweep every line you add or keep from U1 for `above` and `below` (`.claude/rules/writing.md` bans them for cross-references); use `earlier`/`later`/`preceding`/`following`.
3. `tests/src/core/helpers.test.ts`: delete the test `snapshots an array at the index-text table length and one past it alike` and the test `answers a canonical view and a reordered view of the same members identically` (it restates the pre-existing three-member case at the `reads a reordered key view identically to an ordinary copy` test). Keep `snapshots an array carrying an extra own string key like a plain array` and `snapshots an array carrying an own symbol key like a plain array`. Replace `refuses a canonical population that disowns one of its own indices` with a case that asserts the refusal is `Array index views disagree` (read the failure's `error` and assert its message, in the style of the existing exact-message case near the `Array length is outside the native array domain` assertion) for a proxy disowning the LAST index and for the same proxy shape disowning the FIRST index (`'0'`). Remove the `INDEX_TEXTS` import.
4. `guides/contract.md`: delete the `INDEX_TEXTS` row; in the `readArrayEntries` row, remove the clause `; INDEX_TEXTS bounds what that decision costs and nothing about what it decides` from the added sentence, and change `are sorted numerically` to `arrive in ascending order, or are sorted numerically`.

## Unknowns

None.

## Scope

**Owned.** `src/core/constants.ts`, `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, `guides/contract.md`.

**Shared (report-only).** None. **Off-limits.** Every other file.

**What asserts the state this change ends.** Derive by running the scoped helpers suite after the change; every pre-existing pin named in `u1-packed-brief.md` stays green.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or history-rewriting git command (undo an edit by editing, never with `git checkout`/`restore`). Instruments only under `/home/user/contract/tmp/`, removed before returning.

## Execution

Perform the assignment directly and spawn nothing.

## Red/green proof (record the exact commands and counts)

Mutation probe: remove the `!INTRINSICS.own(value, key)` clause from the direct copy only; run the scoped helpers suite; record the failing count and names (both disowning cases must fail); restore; record green. Record the suite count before your edits (the U1 tree) and after.

## Output

Return, as your final message: the mechanism as landed in two sentences; the exact scoped command with before, mutation-red, and after counts; `git status --porcelain` and `git diff --stat`; confirmation that `git diff src/core/constants.ts` is empty; the guide row as it now reads, quoted; the result of `grep -n -E '^(for|if|while) ' src/core/*.ts` (must be empty); any deviation. No process diary.

## Deviation contract

Stop and report on: a pre-existing pin going red; a needed change outside the owned files; a formatter or lint failure you cannot converge on your owned files. Decide, record, and carry on from: TSDoc wording, the exact shape of the single predicate, test placement.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. The scoped helpers suite exits 0 with the mutation probe recorded red then green.
5. `npm run test:guides` exits 0.
6. `git diff src/core/constants.ts` is empty; `grep -rn INDEX_TEXTS src tests guides` finds nothing.
7. `git status --porcelain` lists only the owned files.

**Observations, not criteria.** `npm test`; timing.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after the unit returns, re-runs the hostile-array, trap-count, parity, and 6-process A/B instruments, reproduces the mutation, and dispatches `checker` on the mechanical criteria.
