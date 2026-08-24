# Unit PD2-FIX — centralize the stage fault door

Role: sol implementer. Engine: GPT-5.6 Sol. You perform this unit directly and spawn nothing.
This is a fix round adopting an audit prescription verbatim; keep it minimal.

## The finding (checker audit of PD2, claim 7)

The `#door<T>` method is duplicated verbatim across the three stage classes, differing only in
the interpolated stage name: `src/server/stages/RuntimeStage.ts:602-614`,
`src/server/stages/TypeStage.ts:221-233`, `src/server/stages/LintStage.ts:128-140`. The
repository law routes repeated behavior through one shared implementation, and
`src/server/helpers.ts` already centralizes comparable cross-stage functions.

## Objective

In `/home/user/orkestrel/probe` (working tree as PD2 left it — six modified files, uncommitted;
touch nothing you do not own):

1. Extract the three identical bodies into ONE exported helper in `src/server/helpers.ts`,
   parameterized by the stage name (and message shape) plus the guarded operation. Name it per
   the naming rules (`{verb}{Noun}` for a module helper — pick the honest verb; `door` alone is
   a noun and fails the rule). The helper imports at most types and `ProbeError` — it stays in
   the class-free leaf pair.
2. Retarget the three stages to call it. The workspace-fault exception in `RuntimeStage#warm`
   stays exactly where it is — only the shared instrument door moves.
3. Add the helper's direct unit test in `tests/src/server/helpers.test.ts` (the escaping
   non-`ProbeError` wraps to `origin: 'instrument'`, `code: 'malformed'`, with `cause`; a
   `ProbeError` passes through unchanged) — take expected values from a run, not derivation.
4. Declare the exported type in `src/server/types.ts` only if a reusable shape emerges;
   otherwise no type change.

## Scope

- Owned: `src/server/helpers.ts`, `src/server/types.ts` (conditional),
  `src/server/stages/{RuntimeStage,TypeStage,LintStage}.ts`,
  `tests/src/server/helpers.test.ts`.
- Off-limits: everything else, including the stage test files (the behavior is unchanged, so
  their pins stay green untouched — if one reds, STOP and report rather than editing it). No
  commits.

## Environment and limits

Sandbox denies network, git index writes, and child spawns. Scoped non-spawning runs pass; the
stage suites spawn — record their commands as host observations. `npm run check:src:server` and
scoped oxfmt/oxlint are your gates.

## Acceptance criteria (cheap-first)

1. Scoped oxfmt/oxlint clean; `npm run check:src:server` green.
2. The three duplicate bodies are gone; one exported helper; the helper's unit test green in a
   scoped run.
3. No stage test file edited.

## Output

Final message = report: the helper's name and signature, the three retargeted sites (file:line),
gate tails, `git diff --stat`, `git status --porcelain`, deviations or none.
