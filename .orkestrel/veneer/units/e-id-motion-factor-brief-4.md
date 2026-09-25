# Unit E-ID-MOTION-FACTOR round 4 — § Factors drops its claim about § Additions

Successor to `e-id-motion-factor-brief-3.md`. What changed: the check of round 3 (`mfac-audit-3-verdict.md`) confirmed
every Item but one clause the Orchestrator wrote, which states the ledger's coverage wrongly. The Item is exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-mfac`, which holds rounds 1 to 3 uncommitted over Veneer `b613ae4`. Start every shell command with
`cd /home/user/veneer-mfac &&` and give every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`,
the rule `/home/user/scaffold/.claude/rules/writing.md`, and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/mfac-audit-3-verdict.md`. No skill applies.

## Objective

The § Factors paragraph ends its ledger sentence at the `.icon-link` example.

## Context

**Evidence.** Measured in the worktree at round 3's tree. Re-take the reading before editing, and stop if it differs.
- `guides/veneer.md` § Factors (around lines 7111 to 7113) contains "§ Departures records each scaled duration that
  differs from the release's, such as the `.icon-link` transform's, and § Additions records each transition the release
  does not write."

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`.
Write every log and backup under this worktree's `tmp/units/`.

**Control identifiers.** None.

## Unknowns

None.

## Scope

**Owned.** The sentence the Evidence names and the re-wrap of its paragraph in `guides/veneer.md`, and `tmp/units/`.
**Off-limits.** Every other line of the guide and every other path.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. Replace the quoted sentence with "§ Departures records each scaled duration that differs from the release's, such as
   the `.icon-link` transform's." Re-wrap the paragraph at 100 columns without changing another word.

## Execution

Perform the assignment directly and spawn nothing. Back up the guide under `tmp/units/` before the edit. Re-take the
Evidence reading, apply Item 1, then run each gate in Acceptance, logged to `tmp/units/mfac-4-<gate>.log.txt` with the
command echoed first and `echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/mfac-report-4.md` and return the same text: the Item's before and after; the gate table;
`tmp/units/mfac-4.diff` (`git diff b613ae4`), `tmp/units/mfac-4-delta.diff` (this round alone, against the backup), and
`tmp/units/mfac-4-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when the Evidence reading
differs or a gate reads red. Settle nothing else yourself.

## Acceptance criteria

1. oxfmt's `--check` exits 0 over the guide, logged with its exit.
2. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff, the delta, the status, and the gate logs. `analyst` on GPT-6 Astra confirms the delta strikes only the
clause.
