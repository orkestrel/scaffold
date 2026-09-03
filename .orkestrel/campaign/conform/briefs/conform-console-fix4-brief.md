# Unit conform-console fix round 4 — the last old-word site, the stale ruling, and the warn branch

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/console`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 4's refutation of claim 3 (one comment in `tests/setupServer.ts` still names the `createServerSink` option keys with the old words), its F4-2 (the report carries a stale second ruling for the same sweep), and its F4-1 (the `selectWriter` example shows no `warn` selection), with the gate chain green. The Orchestrator has read the full `\b(out|err)\b` hit list (`/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`) and ruled every other hit permitted: a local binding named `out` or `err`, a comment or string value referring to that binding, ordinary English (`fan out`, `pads out`, `swapped out`, `lay out`), or the generic `WriterSet` sample strings at `tests/src/core/helpers.test.ts:1164-1195`.

## Context

**Law.** `AGENTS.md` (one concept, one term); `/home/user/scaffold/.claude/rules/writing.md`.

**The unit so far.** `conform-console-report.md` carries `## Fix round 1` to `## Fix round 3`. Round 4: the Luna checker held claims 1, 3, 5, 7, 9 on the narrow reading; the objective lane (Opus) held every claim but 3 at one site; read `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/console-objective-r4.md` in full before editing.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/console run <script>`, `npm --prefix /home/user/fleet/console test`, `git -C /home/user/fleet/console status --short`, `git -C /home/user/fleet/console diff`, `node /home/user/scaffold/tmp/work/evidence.mjs console`, `cd /home/user/fleet/console && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. The offline audit's `configs/browsers.ts` row is the Orchestrator's, settled at landing: report it as read and do not stop on it.

## Scope

**Owned.** `tests/setupServer.ts` (line 38 only), `src/core/helpers.ts` (lines 160-170 only), `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`, `/home/user/scaffold/tmp/units/conform/conform-console-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. `tests/setupServer.ts:38`: `` (pass as `out` / `err` / a process-stream stand-in) `` becomes `` (pass as `stdout` / `stderr` / a process-stream stand-in) ``.
2. `src/core/helpers.ts:167-169`: add one example line inside the same fence, after the `'error'` line: `` selectWriter('warn', { log: 'stdout', warn: 'stderr', error: 'stderr' }) // 'stderr' ``, so the example covers the `warn` branch the summary at `:150-151` names.
3. **The report.** In `conform-console-report.md:227-250`, strike the earlier ruling paragraph that lists lines `11, 16, 87, 98, 214, 330-331, 341, 346, 375, 381` with the phrases `err stream`, `out-stream width`, `to out`, `to the out side`, and replace it with one sentence pointing to the `## Fix round 3` rulings as the current ruling for `\b(out|err)\b`; then add row 1's site to those rulings as repaired. Re-run the sweep with the Grep tool over the recorded path set and rewrite the capture file verbatim as the tool's output.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each, then `cd /home/user/fleet/console && npx scaffold audit --offline` (report as read), then `node /home/user/scaffold/tmp/work/evidence.mjs console`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 4` section to the report naming each row and the line now at its site, each gate command with its exit code, and the audit's output as read. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted line is not at the line named or one line either side, or when a gate other than the audit reddens.

## Acceptance criteria

1. `\b(out|err)\b` over the recorded path set returns no title, comment, or example naming a `ServerSinkOptions` target with the old words; the capture is the tool's output.
2. The example carries the `warn` line.
3. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0.
