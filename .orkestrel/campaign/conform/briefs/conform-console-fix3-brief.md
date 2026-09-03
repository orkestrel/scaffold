# Unit conform-console fix round 3 — one vocabulary for the renamed targets, and a capture that reproduces

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/console`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 3's refutation of claim 3 and its findings F3-1 to F3-3 and referral R3-B: every test title and comment that names the renamed `ServerSinkOptions.stdout` / `.stderr` targets with the old words reads `stdout` and `stderr`, the `selectWriter` example demonstrates the configuration its remark describes, and the sweep capture is the Grep tool's own output over the recorded path set, with the gate chain green.

## Context

**Law.** `AGENTS.md` (one concept, one term); `/home/user/scaffold/.claude/rules/writing.md` § Examples (no `...` for omission).

**The unit so far.** `conform-console-brief.md` is the unit's brief, `conform-console-report.md` its report with `## Fix round 1` and `## Fix round 2` sections. Round 3: the Luna checker held claims 1, 3, 5, 7, 9 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/console-r3-checker-luna.md`); the objective lane (Opus) held every claim but 3 and named the sites; read `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/console-objective-r3.md` in full before editing.

**The Orchestrator's rulings.** R3-B: the file lands on one vocabulary — every title or comment naming a target uses `stdout` and `stderr`; the local bindings `out` and `err` stay as names. F3-1: the example becomes the server sink's folded set so it agrees with the remark at `src/core/helpers.ts:156-158`. The `configs/browsers.ts` stale row in the offline audit is the Orchestrator's, settled at landing; report the audit's line as read and do not stop on it.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/console run <script>`, `npm --prefix /home/user/fleet/console test`, `git -C /home/user/fleet/console status --short`, `git -C /home/user/fleet/console diff`, `node /home/user/scaffold/tmp/work/evidence.mjs console`, `cd /home/user/fleet/console && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. A note appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

## Scope

**Owned.** `tests/src/server/factories.test.ts`, `src/server/factories.ts` (the comment at line 77 only), `src/core/helpers.ts` (lines 156-169 only), `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt`, `/home/user/scaffold/tmp/units/conform/conform-console-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. `tests/src/server/factories.test.ts:11`: the title becomes `routes error and warn to the stderr stream, everything else to stdout`.
2. `:87` and `:98`: `applies styled:false to out and err even when one target is a TTY` becomes `applies styled:false to stdout and stderr even when one target is a TTY`, and its `styled:true` twin the same way.
3. `:375`: `routes only error and warn to err; info / debug / an omitted level go to out` becomes `routes only error and warn to stderr; info / debug / an omitted level go to stdout`.
4. `:214`: `reports the live out-stream width on a TTY` becomes `reports the live stdout-stream width on a TTY`; change the same phrase in the comment at `src/server/factories.ts:77` to `stdout-stream`.
5. `src/core/helpers.ts:167-169`: the example's set becomes `{ log: 'stdout', warn: 'stderr', error: 'stderr' }` on every line, with the result comments `// 'stderr'` for `'error'`, `// 'stdout'` for `'debug'`, and `// 'stdout'` for `undefined`; read the remark at `:156-158` and confirm the example now demonstrates it.
6. **Capture and sweep.** Re-run `\b(out|err)\b` (case-sensitive) with the Grep tool over `src`, `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`, `guides/console.md`, `guides/README.md`, and `README.md`; write the tool's output verbatim to `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt` with the Write tool, keeping its `[Omitted long matching line]` rendering and no `...`, with no row from the three excluded files; rewrite the report's § Sweeps rulings for this pattern so that every remaining hit is ruled by sense (a local binding, ordinary English `out`, `fan out`), the rulings for the sites rows 1 to 5 changed are removed, and the recorded paths match the capture.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each (converging with `lint` then `format` only where a check reddens on an owned file), then `cd /home/user/fleet/console && npx scaffold audit --offline` (report its output as read), then `node /home/user/scaffold/tmp/work/evidence.mjs console`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 3` section to the report naming each row and the line now at its site, the sweep's rulings, each gate command with its exit code, and the audit's output as read. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a quoted line is not at the line named or one line either side, or when a gate other than the audit reddens.

## Acceptance criteria

1. The word-boundary sweep's remaining hits are each a local binding or ordinary English, ruled in the report; no title, comment, or example names a target with the old words.
2. The example agrees with its remark.
3. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0; the capture is the tool's own output.

## Review evidence

`/home/user/work/evidence/conform-console.diff` and `conform-console.status`; the report; the capture.
