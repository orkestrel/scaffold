# Unit PD2 — probe: re-warm recovery and the stage fault doors

Role: sol implementer. Engine: GPT-5.6 Sol. You perform this unit directly and spawn nothing.

## Objective

In `/home/user/orkestrel/probe`, land rulings 3 and 4 of
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` (read it first; evidence in
`.orkestrel/campaign/g-probe-stages.md` and `g-probe-flow.md`). Baseline: commit 12809a9
("Bound the coordinator's blind spots") — read its diff first; the coordinator now owns `#bound`
and a serialization chain, and your doors must compose with them, not around them.

## Binding design

1. **Re-warm recovery (ruling 3, the objective mechanism).** `RuntimeStage`'s stored runner
   becomes `#vitest: Promise<Vitest> | undefined`. A stored warm or replacement that rejects
   clears the slot (identity-checked: clear only if the stored promise is still the one that
   rejected); the next `inspect` starts one fresh warm; a failed fresh warm clears again and
   rejects THAT inspection with the coded translation below — never looping within one call, and
   never leaving a permanently rejected stage. `#replace` keeps close-then-warm order; the
   64-specification counter resets only on a successful replacement.
2. **The fault doors (ruling 4).** Each stage's public `inspect`, `resolve` (where it exists),
   and `destroy` translate any escaping non-`ProbeError` into a `ProbeError` with
   `code: 'malformed'`, `cause` retained, and the party split: `origin: 'workspace'` when the
   fault is the workspace's own configuration failing to serve (the re-warm failure of the
   target's `vite.config.ts` is the canonical case, `context: { stage: 'runtime', path:
   'vite.config.ts' }`), `origin: 'instrument'` otherwise (a tool crash, a disposed-service
   throw, a resident-runner close fault). One door per stage — not a wrapper per call. The
   named unwrapped sites from the evidence: `createSpecification` before the try (~172),
   `#invalidate`'s Vitest calls (~582-586), the language-service calls in the type stage, the
   lint stage's equivalents.

## Pins (red-first where the mechanism permits; record exact commands)

- The sentinel fixture (extend the existing bound proof at
  `tests/src/server/stages/RuntimeStage.test.ts:~1081-1155`, whose scratch `vite.config.ts`
  already logs warms): make the scratch config throw while a sentinel file exists. Warm
  successfully; cross the 64-specification bound with the sentinel present; assert the crossing
  inspection rejects with the coded `workspace` translation (record the red against the current
  code, which returns the permanently rejected promise instead); remove the sentinel; assert the
  next inspection warms fresh and passes, and the warm log shows the recovery warm.
- A stage-door pin per stage: drive a real escaping fault out of each stage's door and assert
  `isProbeError` with the ruled origin and a retained `cause`. For the type stage the reachable
  real fault is a disposed service (the serialization tests show the shape); for the runtime
  stage, a scratch project whose configuration makes `createSpecification` refuse.

## Environment and limits

Run from `/home/user/orkestrel/probe`; `node_modules` installed. Your sandbox denies network,
git index writes, and grandchild spawns — the runtime stage's Vitest workers and the lint
stage's language server MAY fail to spawn in-sandbox; where a suite run fails on sandbox
denials, record the exact scoped command as an observation for the Orchestrator's host run and
rely on the runs that succeed. The vendored set (`tests/config.test.ts`, `tests/policy.test.ts`,
`tests/setupPolicy.ts`) is off-limits.

## Scope

- Owned: `src/server/stages/RuntimeStage.ts`, `src/server/stages/TypeStage.ts`,
  `src/server/stages/LintStage.ts`, `tests/src/server/stages/RuntimeStage.test.ts`,
  `tests/src/server/stages/TypeStage.test.ts`, `tests/src/server/stages/LintStage.test.ts`.
- Off-limits: `src/server/Probe.ts` (the coordinator landed; if a door needs a coordinator
  change, stop and report), `src/server/types.ts` unless a context shape genuinely needs it
  (name it if so), everything else. No commits, installs, tree-wide mutating commands.

## Acceptance criteria (cheap-first)

1. The design lands as ruled; no `!`/`as`/`any`.
2. Scoped oxfmt/oxlint clean on owned files; `npm run check:src:server` green.
3. The pins green in-sandbox where runnable, with reds recorded; otherwise exact observation
   commands for the host.

## Output

Final message = report: mechanism (file:line), pin results or observations, gate tails,
`git diff --stat`, `git status --porcelain`, deviations or none.
