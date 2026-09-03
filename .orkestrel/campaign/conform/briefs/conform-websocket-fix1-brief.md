# Unit conform-websocket fix round 1 — a false control count, a false header comment, and four prose sites

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/websocket`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 1's refutation of claim 4 (the report's `websocket-obj-7` integration control count is false against its file), the objective lane's F1 (the helper header in `tests/setup.ts` claims a purity the file no longer has), and the checker's F1 to F4 (banned words in files the unit touched), with the gate chain green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Claims and time and § Substitutions; `.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped").

**The unit so far.** `conform-websocket-brief.md` is the unit's brief, `conform-websocket-report.md` its report; the tree carries the unit's uncommitted changes (24 status entries, all Owned). Round 1 (Grok-first): the Luna checker held claims 1, 3, 5, 7, 9 with F1 to F4 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/websocket-r1-checker-luna.md`); the objective lane (Opus, from the Luna distillate) held every claim but 4, with F1 and three referrals (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/websocket-objective-r1.md`). Read both in full before editing.

**The Orchestrator's rulings.** The `guides/websocket.md` mirrors in mcp and browser are refreshed byte-for-byte at those consumers' landings, never by this unit. The checker's prose findings are this round's rows because they sit in files the unit rewrote. The fleet-shared `tests/guides.test.ts` drop-in wording is scaffold's L3 unit's.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save` (re-staged 16:50 UTC after a bench lane replaced it); never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/websocket run <script>`, `npm --prefix /home/user/fleet/websocket test`, `git -C /home/user/fleet/websocket status --short`, `git -C /home/user/fleet/websocket diff`, `node /home/user/scaffold/tmp/work/evidence.mjs websocket`, `cd /home/user/fleet/websocket && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. A note appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

## Scope

**Owned.** `tests/setup.ts` (lines 39-42 only), `tests/integration.test.ts` (line 3 only), `tests/src/server/NodeWebSocket.test.ts` (lines 227, 530, 1457 only), `src/server/NodeWebSocket.ts` (line 274 only), `tests/src/server/parsers.test.ts` (lines 296 and 302 only), `/home/user/scaffold/tmp/units/conform/conform-websocket-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **Claim 4.** In the report at line 84, correct the `websocket-obj-7` integration control to `9 failed | 5 passed`, the reading at `/home/user/work/evidence/websocket-proofs/obj-7-control-integration.txt:367`; then re-read every other count in the failing-first table against its named file and correct any that differs, recording which you re-read.
2. **F1.** At `tests/setup.ts:39`, replace `(pure — WebSocket + Promise only)` with `` (the platform `WebSocket` plus `@orkestrel/test`'s `waitForEvent` — no `node:*` API) ``; at `:42`, drop `framework-free` or qualify it the same way; at `tests/integration.test.ts:3`, rule `env-agnostic, framework-free` the same way, because it describes the same helpers.
3. **Checker F1.** `tests/src/server/NodeWebSocket.test.ts:1457`: `should` becomes `can` where the sense is ability, or the imperative where it is a requirement; read the sentence and choose.
4. **Checker F2.** `src/server/NodeWebSocket.ts:274`: delete `currently` so the comment reads `Decode every complete frame in the buffer.`
5. **Checker F3.** `tests/src/server/parsers.test.ts:296` and `:302`: delete `now` from both comments.
6. **Checker F4.** `tests/src/server/NodeWebSocket.test.ts:227` and `:530`: `now` becomes `closed` and `new` becomes `additional`, by the sentences' sense.
7. **Sweep.** Run the case-insensitive sweep `\b(should|currently|now|new|framework-free)\b` with the Grep tool over `src`, `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, `guides/websocket.md`, `guides/README.md`, and `README.md`; record the pattern, the paths, and every remaining hit with its ruling by sense in the report's § Sweeps (`new` as a constructor keyword or a value stays; `now` as a timestamp value stays).

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each (converging with `lint` then `format` only where a check reddens on an owned file), then `cd /home/user/fleet/websocket && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs websocket`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 1` section to the report naming each row and the line now at its site, the counts re-read, the sweep with its rulings, each gate command with its exit code, and the audit's summary line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a quoted line is not at the line named or two lines either side, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. Every count in the failing-first table matches its file.
2. The header comments claim only what the file carries; the sweep's remaining hits are each ruled permitted.
3. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0, and the audit prints its single zero-drift line.

## Review evidence

`/home/user/work/evidence/conform-websocket.diff` and `conform-websocket.status`; the report.
