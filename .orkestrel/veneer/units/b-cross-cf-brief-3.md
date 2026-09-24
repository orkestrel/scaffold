# Unit FADE (`cf`), round 3 — one clause of the registry remark

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote rounds 1 and 2, in the worktree
`/home/user/veneer-cf`.

## What changed and why

Round 2's audit (`/home/user/scaffold/.orkestrel/veneer/units/cf-audit-2-verdict.md`) confirmed every code
clause and broke one clause of the `CASCADE_KEYS` paragraph in `tests/setup.ts`: "as on every inactive
tab pane" generalizes the hidden fade state to a pane that need not carry the `fade` class, and the
shipped Tab panes specimen carries such a pane. Rounds 1 and 2's briefs stand for everything else.

## Objective

- **F-e.** Delete the clause "as on every inactive tab pane" from that paragraph, keep the explanation
  tied to the hidden card body, and change nothing else.

## Scope

Shared (report-only) `tests/setup.ts`. Return one `cf-shared-3.patch` against `42fd88e` that supersedes
`cf-shared-2.patch` whole and differs from it in that clause alone.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-cf/tmp/units/cf-report-3.md` and the same text as the final message: the
paragraph before and after; the interdiff of `cf-shared-3.patch` against `cf-shared-2.patch`; the gates'
commands, exits, and result lines. Follow every code token with its noun, list labels and paths
included.

## Acceptance criteria

1. The interdiff changes that one clause and nothing else.
2. `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:setup` exit 0 in a
   scratch copy under `tmp/probe/` with `cf-shared-3.patch` and `cf-offlimits.patch` applied.

## Review evidence

`cf-shared-3.patch`, the interdiff, and `cf-report-3.md`.
