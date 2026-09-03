# Unit setup-axis — the export-free setup proof in abort and emitter

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/abort` and then in `/home/user/fleet/emitter`, one checkout at a time. Perform the assignment directly and spawn nothing.

## Objective

Give each of the two checkouts the shape `scaffold audit --offline` accepts for a package whose `tests/setup.ts` exports nothing: a `tests/setup.test.ts` that proves the module is export-free, the `setup` Vitest project that runs it, and the `test:setup` script in the `test` chain. abort loses its unused `isBrowserVuePath` helper; emitter regains the axis its conformance unit removed.

## Context

**Law.** `AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`, `workspace.md`, `typescript.md`, `writing.md`; the package guides `guides/abort.md` and `guides/emitter.md`.

**The ruling this unit lands.** On 2026-09-03 at 13:04 UTC the Orchestrator ran `npx scaffold audit --offline` in emitter after its unit landed with the `setup` axis removed (commit 67433a5) and read: `setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it.` The audit requires a proof for every `tests/setup*.ts` module, and the close-out runs it in every target, so the axis stays and the proof takes the shape sqlite already carries. abort's `tests/setup.ts` exports only `isBrowserVuePath`, which no suite, config, or source file imports (`grep -rn isBrowserVuePath` over `src`, `tests`, `vite.config.ts`, and `package.json` hits only `tests/setup.ts:5` and `tests/setup.test.ts`), and abort has no browser environment (no `src/browser`, no `app/browser`, no `tests/setupBrowser.ts`).

**The exemplar, verbatim from `/home/user/fleet/sqlite/tests/setup.test.ts`.**

```ts
import * as setup from './setup.js'
import { describe, expect, it } from 'vitest'

// tests/setup.test.ts — proves `tests/setup.ts`, `setupFiles[0]` for every Vitest project. The
// module is deliberately export-free: it pins that loading it first contributes nothing to any
// project, including the host-free `src:core`/`app:core` projects a helper landing here by
// accident would silently leak into.

describe('setup', () => {
	it('adds no export', () => {
		expect(Object.keys(setup)).toEqual([])
	})
})
```

**The axis, verbatim from `/home/user/fleet/abort/package.json` and `vite.config.ts`, which emitter regains.** The script row `"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"` as the last row of `scripts`, after `"prepack": "npm run build"`; the `test` chain `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`; the project

```ts
export const setup = (): UserConfig => ({
	resolve,
	test: {
		name: { label: 'setup', color: 'white' },
		include: ['tests/setup*.test.ts'],
		setupFiles: ['./tests/setup.ts'],
		environment: 'node',
		browser: { enabled: false },
	},
})
```

placed between `config` and `guides`, and `setup` listed between `config` and `guides` in the default export's `projects` array. emitter's own removal of exactly these is the hunk at `/home/user/scaffold/.orkestrel/campaign/conform/units/conform-emitter.diff.txt:215-237` (`package.json`) and `:499-524` (`vite.config.ts`); restore what those hunks removed, byte for byte.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`, so never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix <checkout> run <script>`, `npm --prefix <checkout> test`, `git -C <checkout> status --short`, `git -C <checkout> diff`, `node /home/user/scaffold/tmp/work/evidence.mjs <pkg>`, and `cd <checkout> && npx scaffold audit --offline`, one command per call, with no other chain, no `;` sequence, no heredoc, no redirect, and no pipe except `2>&1 | tail -N`. Text appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

**Measurements.** abort: every gate green at tip 7aee9fd; `npx scaffold audit --offline` reads `0 of 34 planned paths drifted from the plan.` emitter: every gate green at tip 67433a5; the audit reads the `setup` finding quoted earlier and then `0 of 34 planned paths drifted from the plan.`

**Standing conditions.** none.

## Unknowns

None the unit must resolve. Where `npm run test:policy` or `test:guides` reddens in either checkout after the edits, stop and report the exact diagnostic.

## Scope

**Owned.** abort: `tests/setup.ts`, `tests/setup.test.ts`. emitter: `tests/setup.test.ts` (created), `package.json` (the `scripts` field only), `vite.config.ts`.

**Shared (report-only).** Every other file in both checkouts; every other fleet checkout.

**Off-limits.** `.claude/**`, `.codex/**`, `.cursor/**`, `AGENTS.md`, `CLAUDE.md`, `.agents/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/**`, `.mcp.json`, `.oxlintrc.json`, `.oxlintignore`, `.oxfmtrc.json`, `.prettierignore`, `.editorconfig`, `.gitattributes`, `.gitignore`, `LICENSE`, `package-lock.json`, `node_modules/**`, the `version` and dependency fields of `package.json`, `src/**`, `guides/**`, `README.md`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, tag, publish, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `git rm`, or `rm`. Never add a dependency. Never suppress a diagnostic.

## Rows

1. **abort-setup-1.** In `/home/user/fleet/abort/tests/setup.ts` delete the `isBrowserVuePath` function and its doc comment, leaving the two-line header comment as the file's whole content (the file stays; it is `setupFiles[0]` of every project).
2. **abort-setup-2.** Rewrite `/home/user/fleet/abort/tests/setup.test.ts` as the exemplar, byte for byte.
3. **emitter-setup-1.** Create `/home/user/fleet/emitter/tests/setup.test.ts` as the exemplar, byte for byte.
4. **emitter-setup-2.** In `/home/user/fleet/emitter/package.json` restore the `test:setup` script row and its step in the `test` chain exactly as the diff hunk shows them removed.
5. **emitter-setup-3.** In `/home/user/fleet/emitter/vite.config.ts` restore the `setup` project and its entry in `projects` exactly as the diff hunk shows them removed.

## Method

Work abort first, then emitter. In each checkout, after the rows: `npm --prefix <checkout> run test:setup` and read it green; then the gate chain in order, `format:check`, `lint:check`, `check`, `build`, `test`, each as one plain command, reading each result; then `cd <checkout> && npx scaffold audit --offline` and read the single summary line with a zero drift count and no finding line. Then `node /home/user/scaffold/tmp/work/evidence.mjs <pkg>`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/setup-axis-report.md`: per row `applied`, `stopped` (with the deviation), or `noop`; per checkout each gate command with its exit code and the audit's summary line; the paths touched. Then return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a gate or the audit reddens on something the rows did not touch, or when a file the rows name differs from the state this brief describes. Decide, record, and carry on for an ancillary choice.

## Acceptance criteria

1. abort: `tests/setup.ts` exports nothing and `tests/setup.test.ts` matches the exemplar; `npm run test:setup` exit 0.
2. emitter: `tests/setup.test.ts` matches the exemplar; `package.json` and `vite.config.ts` carry the axis as the diff hunks show it before removal; `npm run test:setup` exit 0.
3. In each checkout `format:check`, `lint:check`, `check`, `build`, `test` exit 0 and `npx scaffold audit --offline` prints the single line `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

**Observations, not criteria.** The whole-suite timing under concurrent load; the Orchestrator takes the deciding run at landing.

## Review evidence

`/home/user/work/evidence/conform-abort.diff`, `conform-abort.status`, `conform-emitter.diff`, `conform-emitter.status`; the report; the rows.
