# Unit toolbox-form-adoption — successor to toolbox-migration

Role and engine: GPT-5.6 Sol (objective implementer), running inside `codex exec` in
`/workspace/toolbox`. You perform this assignment directly and spawn nothing.

## Why a successor

The prior unit (tmp/codex/toolbox-migration-brief.md) correctly stopped on deviation: terminal
0.0.10 is not a rename — it replaced the single-value prompt flow with a multi-field form flow
built on `@orkestrel/form`. The user has authorized adoption. The Orchestrator has already
declared `@orkestrel/form ^0.0.2` in `package.json` and run the install, so the tree you start
from has form installed and every pin current. Do not edit `package.json` or the lockfile.

## Objective

Toolbox adopts terminal 0.0.10's form flow end to end: every consumer call site moved to the new
architecture, all three gates green.

## Carried findings (from the prior unit's report, verified against installed .d.ts)

- `PendingForm` carries `schema`, `status`, `time` — no `form`, no `message`
  (`node_modules/@orkestrel/terminal/dist/src/core/index.d.ts:733`).
- `TerminalManagerInterface.ask(from, to, form)` takes a live `FormInterface`
  (`...index.d.ts:1370`); the old 4-argument form is gone (about twenty call sites).
- `answer` takes a `FormValues` record (`...index.d.ts:1373`); scalar answers are gone.
- `TerminalAnswerError` is `{ reason: 'unknown' | 'rejected' | 'terminal', ... }`
  (`...index.d.ts:1208`), not a string.
- `PromptType` has no successor in terminal; `PromptStep<T, S>` is a reducer result, not a form
  discriminator. Re-derive what helpers.ts actually needs from the new surface.
- `restoreWorkflow` → `createRestoredWorkflow`
  (`node_modules/@orkestrel/workflow/dist/src/core/index.d.ts:367`).
- `isAnswerPayload` → `isFormValues` from `@orkestrel/form`
  (`node_modules/@orkestrel/form/dist/src/core/index.d.ts:1008`) — import it from
  `@orkestrel/form` directly, never through terminal.

## Design guidance

- Adopt the flow terminal's own architecture prescribes: construct forms with `@orkestrel/form`'s
  installed factories/shapers, pass the live `FormInterface` to `ask`, read `PendingForm` by its
  new shape, answer with `FormValues` records, and narrow answer errors by `reason`.
- A former single-value prompt becomes a single-field form where that is the natural mapping;
  do not build a compatibility wrapper that re-creates the old scalar API. No shims — every
  consumer moves.
- Reuse `@orkestrel/form`'s installed primitives; reimplement nothing it exports. Read its
  installed `.d.ts` for the exact construction surface before designing.
- The rules bind: no `any`, no `as`, no `!`, no `@ts-*`, single-word entity members, guards for
  narrowing, real implementations in tests. Read `/workspace/toolbox/AGENTS.md`,
  `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/tests.md` before editing.

## Scope

- Owned: `/workspace/toolbox/src/**`, `/workspace/toolbox/tests/**` except the vendored
  `tests/setupPolicy.ts` and `tests/policy.test.ts`.
- Off-limits: `package.json`, `package-lock.json`, `node_modules/`, `guides/`, `.claude/`,
  `.agents/`, `configs/`, `vite.config.ts`, `tsconfig.json`. No commits, no pushes, no installs.
- Validation: `npm run check`, `npm run lint:check`, `npm run test` — read-only gates only; no
  mutating `format` or `lint --fix`.

## Output (your final message)

1. Design summary: how the form flow landed, five lines or fewer.
2. Changed-file list, one line each on what moved.
3. Gate evidence: each command with its exit code.
4. Any deviation per the contract below.
5. `git diff --stat` and `git status --short` output.

## Deviation contract

Stop and report only if the adoption requires an off-limits edit or a capability form/terminal
does not publish. Test phrasing, local names, and file-internal structure are yours to decide
and record.

## Acceptance criteria

- `npm run check` exit 0; `npm run lint:check` exit 0; `npm run test` exit 0.
- No suppression directives, `as`, `any`, or `!` introduced.
- No local reimplementation of a form or terminal export; `isFormValues` imported from
  `@orkestrel/form`.
