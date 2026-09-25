# Unit FACTORS-LEDGER — § Factors names both ledgers that record a scaled duration

A unit found at the E-ID-MOTION-MODAL and E-ID-MOTION-FACTOR landing. After MODAL, the modal host's and both backdrops'
scaled durations differ from the release's and § Additions records them, so § Factors' closing sentence, which names
§ Departures alone, is false on the landing tree. The Item is exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer` (the session branch at `c3ef630`, the landing tree of MODAL and FACTOR). Start every shell command
with `cd /home/user/veneer &&` and give every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`
and the rule `/home/user/scaffold/.claude/rules/writing.md`. No skill applies.

## Objective

§ Factors' closing sentence names § Departures and § Additions, with an example from each.

## Context

**Evidence.** Measured on the session branch at `c3ef630`. Re-take the reading before editing, and stop if it differs.
- `guides/veneer.md` § Factors (around line 7183) ends its paragraph with "§ Departures records each scaled duration
  that differs from the release's, such as the `.icon-link` transform's."
- § Tokens › § Additions holds the `modal` row `.modal { transition }` with the Veneer value
  `opacity var(--vn-motion-panel) var(--vn-ease-out)` (around line 10717).

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`.
Write every log and backup under `/home/user/veneer/tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** The sentence the Evidence names and the re-wrap of its paragraph in `guides/veneer.md`, and `tmp/units/`.
**Off-limits.** Every other line of the guide and every other path. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Replace the quoted sentence with "§ Departures or § Additions records each scaled duration that differs from the
   release's, such as the `.icon-link` transform's in § Departures and the modal host's in § Additions." Re-wrap the
   paragraph at 100 columns without changing another word.

## Execution

Perform the assignment directly and spawn nothing. Back up the guide under `tmp/units/` before the edit. Re-take the
Evidence readings, apply Item 1, then run each gate in Acceptance, logged to `tmp/units/fl-<gate>.log.txt` with the
command echoed first and `echo "exit=$?"` appended.

## Output

Write `tmp/units/fl-report.md` and return the same text: the Item's before and after, the gate table, and
`tmp/units/fl-delta.diff` (against the backup).

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs or a gate reads red. Settle nothing else yourself.

## Acceptance criteria

1. oxfmt's `--check` exits 0 over the guide, logged with its exit.
2. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The delta and the gate logs. `analyst` on GPT-6 Astra rules the sentence true of the built cascade and the two ledger
tables on the landing tree.
