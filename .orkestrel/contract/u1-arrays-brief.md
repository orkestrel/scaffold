# Unit u1-arrays — order-aware array snapshot in readArrayEntries

## Role and engine

`implementer`, Opus 5 (this unit's work class is Sol's — objective, mechanical precision — and
Sol is dark by the user's 2026-09-01 instruction; the substitution is recorded in the plan).
You are a native subagent: perform the assignment directly yourself and spawn nothing.

## Objective

Land, in `/home/user/contract/src/core/helpers.ts`, the exact mechanism the admitted dist probe
proved: `readArrayEntries` sorts only when the reflected arrival is out of ascending order, and
reuses the already-verified key string on the ascending path. Nothing else about the function
changes: every refusal, both freezes, the `dense` fact, and the read-once discipline stay.

## Context

- Read first: `/home/user/scaffold/AGENTS.md`, `.claude/rules/typescript.md`,
  `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md` (all under
  `/home/user/scaffold/`), then the current
  `/home/user/contract/src/core/helpers.ts:1000-1060` (the `readArrayEntries` TSDoc and body)
  and its tests in `/home/user/contract/tests/src/core/helpers.test.ts` around lines 600-650.
- The proven change, in built-JS form, is
  `/home/user/scaffold/.orkestrel/contract/u1-patch.mjs` — read its `replacement` template
  string. Your TypeScript must implement exactly that mechanism: a parallel `keys` array, an
  `ascending` flag with a `previous` cursor, `ascending ? collected : sortValues(collected)`,
  and `ascending ? keys[position] : INTRINSICS.text(index)` in the second loop with the
  existing own-membership re-check and refusals untouched.
- Probe verdict backing this unit (do not re-derive): B/A median 0.860 on medium `is`, 0.892 on
  a 48-string list, parity IDENTICAL over 1170 comparisons including a descending-`ownKeys`
  proxy over a real array, a throwing-index proxy, and a maximum-sparse array
  (`.orkestrel/contract/u1-ab.out`, `u1-parity.out`).
- Standing conditions: the tree at `/home/user/contract` is clean at commit adbff1b-equivalent
  baseline 859d149; `npm` scripts exist for scoped checks; Node v22.22.2.

## Scope

- Owned: `/home/user/contract/src/core/helpers.ts` (only the `readArrayEntries` function body
  and, if the mechanism needs describing, the minimum edit to its own TSDoc `@remarks`);
  `/home/user/contract/tests/src/core/helpers.test.ts` (one added case; see acceptance).
- Off-limits: every other file in both repositories. No formatter or lint `--fix` runs over the
  tree; validate scoped to your owned files only.
- Do not commit, push, install, or run `git checkout`/`restore`/`stash`/`reset`/`clean`.

## The added test case

Add, beside the existing `readArrayEntries` cases, a case proving the sort branch stays live: a
`Proxy` over a real array whose `ownKeys` trap returns the index keys in descending order (and
`'length'`), asserting the returned snapshot equals the one an ordinary copy of the same array
returns — same entries, same `dense` — so the reordering branch is executed and its answer pins
to the ascending branch's answer. Name the test for what it proves (a reordered key view reads
identically), not for the mechanism.

## Coding constraints that bind this diff

- Tabs, single quotes, no semicolons except where ASI requires; no `any`, no assertions, no
  nested named functions (the existing arrow inside `attempt` stays the pattern).
- The comment style of the file: comments state constraints the code cannot show, never
  narration. If you touch the TSDoc, keep every documented property (frozen snapshot, hole
  semantics, `4294967295` metadata, proportional-to-population work) word-for-word unless a
  sentence becomes false — none should.

## Execution

Perform the edit directly. Validate with, in order (scoped, read-only toward the rest of the
tree): `npx tsc --noEmit -p configs/src/tsconfig.core.json`, then
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core -t readArrayEntries`
if filtering is unreliable run the helpers test file via
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, one short hypothesis at
most) when: the current source body differs from what this brief quotes; a test outside your
added case goes red under your edit; the mechanism cannot be expressed without touching a file
outside scope. Ancillary choices (variable names within the rules, where the added case sits in
the file) are yours: decide, record, continue.

## Output (your final message)

- The exact diff of both owned files.
- The exact commands run with their tail lines (pass counts).
- Any decision you recorded, one line each.
- No process diary.

## Acceptance criteria (cheap first)

1. Scoped typecheck green (`configs/src/tsconfig.core.json`).
2. The helpers test file green including the added descending-view case.
3. The diff touches only the two owned files, only the named regions.
4. Observation to report, not a criterion: your reading of any timing effect. The deciding A/B
   and parity runs are the Orchestrator's after you exit.
