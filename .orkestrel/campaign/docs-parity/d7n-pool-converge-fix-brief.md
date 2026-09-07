# Brief — `d7n-pool-converge-fix` (pool's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/pool` from the committed tip `ff62d1d` (clean; the final guide head start installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-pool-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 15; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice6-audit-verdict.md`; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row).

## Items

1. **The `Shape` column (P1, Ruling 15).** `### Types` (`guides/pool.md:60-68`) heads `API | Kind | Shape | Summary` under Ruling 15's one convention sentence; each interface row's data members as bare names with `?`, `plus` its call-signature members (`PoolInterface`: `{ emitter, size, idle, active } plus acquire, …` — read `src/core/types.ts`; `PoolToken` `{ value } plus release`; `PoolOptions`, `PoolContext`, `PoolErrorOptions`); each alias its own literal (`PoolCode` as its union with `\|`; `PoolEventMap` as its literal). Delete the sentence at `:70` that only lists `PoolInterface`'s readonly members (its behavioural sentences about `size`, `idle`, `active` stay); a description that became a member list ("the codes `invalid`, `destroyed`, `create`, and `cleanup`"; "the events `create`, `acquire`, `release`, and `destroy`") is rewritten to state what the type represents, then `--to guide`.
2. **`isPoolSignal` (P2).** Its description (or `@remarks`) carries "for the acquire boundary" — the fact the pre-P.2 cell held — then `--to guide`.
3. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both directions `written: 0`.

## Scope

Owned: `guides/pool.md`, the doc blocks under `src/core/**` (no code token moves). Off-limits: everything else, including `README.md`, `tests/**`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. The convention sentence once above `### Types`; `grep -n '| interface *| `{[^`]*:' guides/pool.md` prints nothing; `grep -n 'are readonly data properties' guides/pool.md` prints nothing.
5. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7n-pool-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a `Shape` cell Ruling 12 cannot express. Decide ancillary matters and record them.
