# Unit LEDGER (`cl`) — media conditions, keyframes, and the reader findings (B-CROSS, X6 and X7)

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-cl` (branch `unit/cl` from the
session head `42fd88e`). The executor that opens this brief is that subagent.

## Objective

The ledger reads the release's media conditions and keyframes, per
`/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` rulings X6 and X7 and § Family record,
and closes the two reader findings routed to this unit: the priority case compares each declaration's
priority keyed by its condition, and the inventory reader keeps a `__proto__` digest key.

## Context

**Design.** The verdict above. The findings this unit carries, each with its source:

- **Condition-keyed priority.** `oc-audit-verdict.md` claim 4 and its § Re-baseline: the priority case
  in `tests/conformance.test.ts` (the `declaration priority` describe block) compares each sheet's set
  of priorities for a selector and property, so a priority swapped between the conditions of one pair
  passes. The swap `.offcanvas-sm { background-color }`, important below the boundary and normal above
  it, is the negative control.
- **The `__proto__` digest.** `dr-audit-verdict.md` claim 3: the `readOracleInventory` function in
  `tests/setupServer.ts` writes each digest into an ordinary object, whose prototype setter swallows a
  `__proto__` key. The reader writes into a null-prototype object, and a proof shows the key is kept.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,names,documentation,writing,architecture,typescript,patterns}.md`;
the notes `w2-w3-note-1.md` and `w2-w3-note-2.md` beside this brief; skill: none. Each named mutation's
red run is retained. The `key` arrow function declared inside the priority case is a nested function
under `AGENTS.md` § Design laws; the rewrite extracts it to the module that owns the reader.

**Terrain, measured at `a9dff19` (re-measure at `42fd88e` before editing).**

- `tests/setupServer.ts` exports `readCompatibility`, `collectKeyframeNames`, the `SheetReader` class,
  `collectAdditions`, `scanCompatibilityPresence`, and `readOracleInventory`. No `readConditions` or
  `readKeyframes` reader exists, and the inventory reader returns no top-level `media` field.
- The inventory (`tests/fixtures/oracle/inventory.json`) carries top-level `keyframes` and `media`
  fields beside `components`.
- CONDITIONS landed as `8ca1609`, so compound-condition normalization exists; X6 gives it to this unit
  only if it were absent.
- `guides/veneer.md` carries no `### Media conditions` and no `### Keyframes` section.
- At `42fd88e`, OFFCANVAS's refinement of the priority case has landed; the condition-keyed comparison
  builds on that version.

**Tree.** `/home/user/veneer-cl` at `42fd88e`: the session branch with the B-MODAL wave 2 landings and
Veneer `main`'s engine landings merged. FADE runs beside this unit in `/home/user/veneer-cf` and owns
the `transition` entries in the conformance file; UTIL-SPACING, UTIL-TEXT, and BARE-BUTTON may land
after this checkout is cut. Shared patches merge three-way at landing.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree has its own `node_modules`. Build with
`npm run build:src` before the conformance gate. Write every instrument, extract, and log under the
worktree's `tmp/units/` or `tmp/probe/` with the `cl` prefix, and nothing into the session scratchpad or
the system temporary directory.

## Unknowns

- Whether a condition-aware reading needs a new `SheetReader` field or a separate reader: decide from
  the class's shape and record why.
- The reduced-motion treatment the release writes for each keyframe name: read it from the release's
  compiled CSS and record the reading beside the table.

## Scope

**Owned.** `tests/setupServer.ts` (the readers, the presence scan's keyframes gate, the `collectAdditions`
keyframe refusal, the condition-aware reading, the null-prototype digest map, and their TSDoc) and
`tests/setupServer.test.ts` (their proofs, each with its plant).

**Shared (report-only).** `tests/conformance.test.ts` (the priority case, the media and keyframes
parity cases); `tests/setup.ts` and `tests/setup.test.ts` (a row type that must be shared);
`guides/veneer.md` (`### Media conditions`, `### Keyframes`, § Tests, and each sentence the readers
make false). Return one `cl-shared.patch` against `42fd88e` and edit nothing there.

**Off-limits.** `src/styles/**` (no cascade byte changes; a unit that finds it needs one stops);
`tests/fixtures/oracle/**`; `app/**`; `src/browser/**`; `src/core/**`; `tests/src/browser/**`;
`tests/src/core/**` (D43); `configs/**`; the manifests; the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md` (the Orchestrator's fold).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped
runs only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-cl/tmp/units/cl-report.md` and the same text as the final message: the
readers' signatures and row types; the coverage matrix (each gate and parity case, the plant or
mutation that reddens it, and the failing case); the failing-first run of every added case; each
gate's command exactly as it ran with every argument, its exit, and its result line; the mutation log
`tmp/units/cl-mutations.log.txt`; both guide tables as written; `cl-shared.patch`, `cl.diff`, and
`cl-status.txt` under `tmp/units/`. The report states no tally of a growable set, no temporal word, and
no list item by position, and follows every code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix needs an off-limits file,
when an emitted condition fails to normalize to a table row, or when a shipped key records a keyframe
the cascade does not define. Decide, record, and carry on for the reader names, the row type names, the
case titles, and where each added case sits in its file.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 with the shared patch applied in a scratch
   copy under `tmp/probe/`; `npm run check` exits 0 there.
2. `npm run test:setup` exits 0, and each added proof reddens on its plant: a keyframe deleted from a
   written fixture reddens the presence scan alone; an unattributed keyframe makes `collectAdditions`
   throw with its name; an inventory carrying a `__proto__` digest key returns that key.
3. `npm run build:src` and then `npm run test:conformance` exit 0 in the scratch copy, and the priority
   case reddens on the `.offcanvas-sm` swap control.
4. `npm run test:guides` exits 0 in the scratch copy, with the media and keyframes parity cases green
   and each reddening on a table row removed.

**Observations, not criteria.** The whole suite and `npm run test:service` are the Orchestrator's runs
at landing.

## Review evidence

`cl.diff`, `cl-status.txt`, `cl-shared.patch`, `cl-report.md`, and `cl-mutations.log.txt`.
