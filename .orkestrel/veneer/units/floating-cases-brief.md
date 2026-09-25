# Unit FLOATING-CASES — the floating label's case row names the token its transition reads

A unit found at the E-ID-MOTION-MODAL and E-ID-MOTION-FACTOR landing. `eid-chain-12.sh` stopped at `test:setup` on the
session branch at `6052e25`: E-ID-MOTION-FACTOR moved the `.form-floating > label` transition onto the
`--vn-motion-feedback` token, and the `FORM_FLOATING_CASES` row for that selector in `tests/setupStyles.ts` names no
`transition` reads, so the case `floating label case table › binds every floating selector to the inventory, to its
condition, and each declaration to the tokens its row names for that property` fails. The Item is exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer` (the session branch at `6052e25`). Start every shell command with `cd /home/user/veneer &&` and give
every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md` and the rule
`/home/user/scaffold/.claude/rules/tests.md`. No skill applies.

## Objective

The `.form-floating > label` row of `FORM_FLOATING_CASES` names the tokens the compiled cascade's `transition`
declaration reads, and the case passes.

## Context

**Evidence.** Measured on the session branch at `6052e25`. Re-take the reading before editing, and stop if it differs.
- `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupStyles.test.ts` fails that one case with
  `AssertionError: expected { …(2) } to deeply equal { …(2) }`; the diff shows the received `reads` carrying
  `"transition": ["--vn-motion-feedback", "--vn-motion-feedback"]` beside `padding`, `color`, and `border`.
- `tests/setupStyles.ts` declares `FORM_FLOATING_CASES` (around line 7190); its `.form-floating > label` entry's `reads`
  holds `padding`, `color`, and `border` only.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`.
Write every log and backup under `/home/user/veneer/tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** The `.form-floating > label` entry of `FORM_FLOATING_CASES` in `tests/setupStyles.ts`, and `tmp/units/`.
**Off-limits.** Every other line and path. No git command that writes, no install, and no `npm run format`. Format with
`./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. In the `.form-floating > label` entry's `reads`, after the `border` line, add
   `transition: Object.freeze(['--vn-motion-feedback', '--vn-motion-feedback']),`.

## Execution

Perform the assignment directly and spawn nothing. Back up `tests/setupStyles.ts` under `tmp/units/` before the edit.

1. Run the Evidence command and log it to `tmp/units/fc-red.log.txt` with `echo "exit=$?"` appended.
2. Apply Item 1.
3. Run each gate in Acceptance, logged to `tmp/units/fc-<gate>.log.txt` with the command echoed first and
   `echo "exit=$?"` appended.

## Output

Write `tmp/units/fc-report.md` and return the same text: the red reading, the Item's before and after, the gate table,
and `tmp/units/fc-delta.diff` (against the backup).

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when the Evidence
reading differs or a gate reads red. Settle nothing yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` exits 0 over `tests/setupStyles.ts`.
2. `npm run test:setup` exits 0.

## Review evidence

The red log, the delta, and the gate logs. `checker` on Sonnet reads the delta against the Item and the red log's
received value.
