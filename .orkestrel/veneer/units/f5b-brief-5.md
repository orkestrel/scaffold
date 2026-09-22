# Unit F5b ACCOUNTING-LEDGER — brief 5 (the direct-path collision is a skip)

Successor to `tmp/units/f5b-brief-4.md`, which stays unedited. What changed: the Orchestrator ruled
on brief 4's deviation. Brief 4 had the direct comparison path refuse a site another shipped
component holds. Applied to the real cascade that refusal fires on `.row-gap-0`, because the pinned
upstream inventory records every `.row-gap-*` utility identically under `row` and under `row-gap`.
The ruling: a direct-path collision is a skip, not a refusal.

## Role and engine

`opus` on Opus (native Claude subagent), sole writer in `/home/user/veneer-f5b`, a git worktree
detached at `07fc3c3` carrying every earlier round's writes, uncommitted (the ledger files are
untracked). Perform the assignment directly and spawn nothing.

## Objective

`collectValueGaps` writes one row for an emitted declaration two shipped components record
identically, attributed to the component `attributeSelector` answers with, and
`guides/ledger/departures.md` carries that single row.

## Context

- Law: `/home/user/scaffold/AGENTS.md`,
  `/home/user/scaffold/.claude/rules/{tests,typescript,architecture,names,writing}.md`.
- `tests/fixtures/oracle/inventory.json` is the pinned upstream input. It stays as it is.
- The fallback path's refusal stays exactly as it is.
- Brief 4's cross-path plant must still throw: `btn` records `.btn` and `close` records the withheld
  `.btn-close-white`, so the two components record different selectors and `close` reaches `.btn`
  only through the fallback path.
- `attributeSelector` answers with the first shipped component the inventory records the selector
  under, in inventory order. Inventory order is not the `shipped` array's order, which is sorted.
- `tests/conformance.test.ts` § `cascade ledger` compares the measurement against the guide through
  `scanLedgerDrift`. It never rewrites the guide, so a refreshed row leaves the guide by hand,
  guided by the `stale` list the comparison reports.
- Host: npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`).
  The repository formats with `oxfmt`, never with Prettier.

## Obligations

### Obligation 1 — the skip

Where two shipped components record the identical declaration at one selector and condition, the
measurement writes one row, attributed to the component `attributeSelector` answers with, and the
other component's pass over that site writes nothing. A component writing the same site twice from
two of its own recorded rules stays measured twice. The fallback path's refusal is unchanged, and a
direct-path claim colliding with a claim that is not an identical recording is still refused.

Plant in `tests/setupServer.test.ts` a case built from two shipped vocabularies recording the same
selector and the same declaration, ordered so the ladder's answer is not the one claim order would
name, asserting one row attributed to the ladder's answer. Record it red against brief 4's reader
and green after, with `npm run test:setup` and its counts.

### Obligation 2 — the refreshed ledger

Run `npm run build:src && npm run test:conformance`, and remove from `guides/ledger/departures.md`
every row the comparison reports stale: the `row-gap`-attributed `.row-gap-*` duplicates.
`guides/ledger/additions.md` stays unchanged.

## Scope

- Owned: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `guides/ledger/departures.md`,
  `guides/ledger/additions.md`.
- Shared, report-only: none.
- Off-limits: everything else, including `tests/fixtures/oracle/inventory.json`, `guides/veneer.md`,
  `tests/conformance.test.ts`, `src/**`, and every file under `tmp/` other than
  `tmp/units/f5b-brief-5.md`, `tmp/units/f5b-report-5.md`, and your own `tmp/probe/` (delete it
  before reporting). No git command that discards a working-tree change.

## Execution

Perform the assignment directly and spawn nothing. Validate with `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run build:src && npm run
test:conformance`, `npm run test:guides`, and `npm run test:policy`.

## Output

Write `tmp/units/f5b-report-5.md` and return the same text: the plant's red-then-green reading with
its command and counts, the exact rows that left counted by `grep -c` of the `row-gap` component
cell before and after, the `collectValueGaps` remark's new wording, the touched files,
`git status --porcelain`, the gate exits, deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`, and the claims flagged unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: the identical-recording
predicate's name and signature, where it sits, the plant's fixture shape and component keys, and
the remark's wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the new plant present, recorded red before the change.
3. `npm run build:src && npm run test:conformance` exits 0.
4. `npm run test:guides` and `npm run test:policy` exit 0.
5. `guides/ledger/departures.md` carries no `row-gap`-attributed row, and every `.row-gap-*` site
   keeps exactly one row.
6. `guides/ledger/additions.md` is byte-identical to its brief 4 state.
7. `git status --porcelain` lists the earlier rounds' files and nothing else.

## Review evidence

The report, `git diff 07fc3c3 -- tests/setupServer.ts tests/setupServer.test.ts`, the departures
file's removed rows, and the status.
