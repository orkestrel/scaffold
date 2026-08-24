# Unit PD5 — probe: issue party for inferred projects + message hygiene

Role: implementer. Engine: Claude Opus 5 (native). You perform this unit directly and spawn
nothing. Read `/home/user/orkestrel/probe/AGENTS.md` and the applicable `.claude/rules/*` there
before editing.

## Objective

In `/home/user/orkestrel/probe` (baseline: the head commit when you start), land ruling 6 from
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` (read it first):

1. **The party flip.** A file-less diagnostic on an INFERRED project becomes
   `origin: 'workspace'` (an Issue whose message is translated workspace-relative). The inferred
   project is the workspace's own; the current `instrument` label makes every claim permanently
   unprovable while blaming probe — `computeReceipt` refuses on instrument issues. The
   caller-selected door stays `claimant`/`refused`. Find the exact site by tracing where a
   diagnostic with no file lands today (the `#issue` path in the stages/Probe — re-derive, do
   not trust remembered lines).
2. **Message hygiene generalizes.** Export `relativeWorkspaceMessage` from
   `src/server/helpers.ts` (a pure leaf; name and shape per the rules), route the existing
   workspace-relative translations through it, and make the runtime `#issue` rewrite revision
   filenames out of messages (the `.probe-` suffix leak).
3. Guide prose is CARRIED BY PD6; touch no guide.

## TTTDD

Types first if any public shape moves. Red-first pins: a file-less diagnostic on an inferred
project currently reports `instrument` (red: assert `workspace`, watch it fail), and a runtime
message currently carrying a revision filename (red: assert the rewritten form). Record commands
and counts red then green. Helpers get direct unit tests in
`tests/src/server/helpers.test.ts`.

## Environment

Native run; `node_modules` installed; Vitest runs for you. Scoped suites only; the whole-suite
reading is the Orchestrator's host run.

## Scope

- Owned: `src/server/Probe.ts`, `src/server/stages/*.ts` (only where the `#issue` path lives),
  `src/server/helpers.ts`, `src/server/types.ts`, `tests/src/server/helpers.test.ts`, the stage
  or Probe test files whose pins the flip makes false (name each flip in the report).
- Off-limits: `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, guides.
  No commits.

## Acceptance criteria (cheap-first)

1. Scoped oxlint/oxfmt clean on owned files.
2. `npm run check:src:server` green (verify the script name first).
3. Red-first pins recorded red then green; every flipped existing pin named with its reason.

## Deviation contract

Stop and report on: a conflict with the primary objective, or the file-less path proving
unreachable through the real doors. Ancillary wording and placement are yours.

## Output

Final message = report: the flip site (file:line), the helper's signature, red/green records,
flipped pins named, gate tails, `git diff --stat`, `git status --porcelain`, deviations or none.
