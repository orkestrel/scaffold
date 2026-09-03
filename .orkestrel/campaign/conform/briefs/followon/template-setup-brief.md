# Unit template-setup — the export-free setup proof in template (the ruling on template-obj-5 and fleet-F1)

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/template`. Perform the assignment directly and spawn nothing.

## Objective

Land the Orchestrator's ruling on the stopped rows template-obj-5 and fleet-F1 of unit conform-template: the unused `isBrowserVuePath` helper leaves `tests/setup.ts`, `tests/setup.test.ts` becomes the export-free proof, and the `setup` Vitest project and the `test:setup` script stay, so that `scaffold audit --offline` keeps reading clean and the unit's report records both rows as landed.

## Context

**Law.** `AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md`, `workspace.md`, `writing.md`.

**The ruling (2026-09-03, 14:52 UTC).** The conformance unit's successor implementer stopped template-obj-5 (which deletes the helper, `tests/setup.test.ts`, the `setup` project, and the `test:setup` script) because the fleet-F1 clause rules the opposite for the axis, and measured that the installed scaffold's plan infers the `setup` project and the `test:setup` script from the presence of `tests/setup.test.ts` (`node_modules/@orkestrel/scaffold/dist/bin/main.js:1266-1270`). The audit also refuses a `tests/setup.ts` that no proof covers (emitter, 13:04 UTC: `setup: The target at . carries a test setup module that no proof covers: tests/setup.ts`), and `tests/setup.ts` is `setupFiles[0]` of every project, a structural file that stays. The one shape that is audit-clean with the structural file in place is therefore the proof plus the axis, which is what fleet-F1 prescribes; template-obj-5 folds into fleet-F1 with the axis kept. The unit's report at `/home/user/scaffold/tmp/units/conform/conform-template-report.md` records both rows as `stopped` with the deviation; this unit lands them and updates that record.

**The exemplar, verbatim from `/home/user/fleet/sqlite/tests/setup.test.ts` (tip 87ab520).**

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

**The tree.** `/home/user/fleet/template` carries the conformance unit's uncommitted changes (16 status entries, every one Owned by that unit); `tests/setup.ts:6-10` declares `isBrowserVuePath` with its doc comment, `tests/setup.test.ts:1-14` is its only consumer, `vite.config.ts:75-84` and `:133` carry the `setup` project, `package.json:52,66` carry the script and its chain step. `npm run test:setup` reported `2 passed`; every gate is green and the audit reads `0 of 34 planned paths drifted from the plan.`

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`, so never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix /home/user/fleet/template run <script>`, `npm --prefix /home/user/fleet/template test`, `git -C /home/user/fleet/template status --short`, `git -C /home/user/fleet/template diff`, `node /home/user/scaffold/tmp/work/evidence.mjs template`, and `cd /home/user/fleet/template && npx scaffold audit --offline`, one command per call, with no other chain, no `;` sequence, no heredoc, no redirect, and no pipe except `2>&1 | tail -N`. Text appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

## Unknowns

None. Where `npm run test:policy` or `test:guides` reddens after the edits, stop and report the exact diagnostic.

## Scope

**Owned.** `tests/setup.ts`, `tests/setup.test.ts`, and `/home/user/scaffold/tmp/units/conform/conform-template-report.md` (the two rows and one added section only).

**Shared (report-only).** Every other file in the checkout.

**Off-limits.** `vite.config.ts`, `package.json`, `src/**`, `guides/**`, `README.md`, and every vendored file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, tag, publish, install, delete a file, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `git rm`, or `rm`. Never add a dependency. Never suppress a diagnostic.

## Rows

1. **template-setup-1.** In `/home/user/fleet/template/tests/setup.ts` delete the `isBrowserVuePath` function and its doc comment, leaving the header comment as the file's whole content; where the header comment names the helper, drop that clause.
2. **template-setup-2.** Rewrite `/home/user/fleet/template/tests/setup.test.ts` as the exemplar, byte for byte.
3. **template-setup-3.** In `/home/user/scaffold/tmp/units/conform/conform-template-report.md`, change the `template-obj-5` row's disposition to `applied` with the note `Folded into fleet-F1 by the Orchestrator's ruling of 14:52 UTC: the helper is gone and \`tests/setup.test.ts\` is the export-free proof; the \`setup\` project and the \`test:setup\` script stay because the audit infers them from the proof and refuses an uncovered \`tests/setup.ts\`.` and the `fleet-F1` row's disposition to `applied` with the note `Carries template-obj-5; the export-free proof shape.`; add a section `## Ruling on template-obj-5 and fleet-F1` after § Deviations stating the ruling in one paragraph (the measurement, the structural file, the shape) and naming this unit's gates.

## Method

Rows in order. Then `npm --prefix /home/user/fleet/template run test:setup` and read it green (1 passed); then the gate chain `format:check`, `lint:check`, `check`, `build`, `test`, one plain command each, reading each result; then `cd /home/user/fleet/template && npx scaffold audit --offline` and read the single zero-drift line; then `node /home/user/scaffold/tmp/work/evidence.mjs template`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/template-setup-report.md`: per row `applied`, `stopped` (with the deviation), or `noop`; each gate command with its exit code and the audit's summary line; the paths touched. Then return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a gate or the audit reddens on something the rows did not touch, or when a file the rows name differs from the state this brief describes.

## Acceptance criteria

1. `tests/setup.ts` exports nothing; `tests/setup.test.ts` matches the exemplar; `npm run test:setup` exit 0.
2. The report's two rows read `applied` with the notes given, and the ruling section exists.
3. `format:check`, `lint:check`, `check`, `build`, `test` exit 0, and the audit prints the single line `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

## Review evidence

`/home/user/work/evidence/conform-template.diff` and `conform-template.status`; the reports; the rows.
