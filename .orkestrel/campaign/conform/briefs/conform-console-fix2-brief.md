# Unit conform-console fix round 2 — the old word for the renamed targets, and the sweep that can see it

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/console`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 2's refutation of claim 3: the renamed `ServerSinkOptions.out` / `.err` targets survive as the old words `out` and `err` in five prose sites this unit rewrote, and the recorded sweep pattern could not reach prose. Replace the word at each site, replace the `selectWriter` example's sample strings, and record a word-boundary sweep with a ruling per remaining hit, with the gate chain green.

## Context

**Law.** `AGENTS.md` (one concept, one term); `/home/user/scaffold/.claude/rules/names.md`; `.claude/rules/documentation.md` § Parity (a transcribed fence line with a presence guard changes with its guard).

**The unit so far.** `conform-console-brief.md` is the unit's brief, `conform-console-report.md` its report with a `## Fix round 1` section. Round 2 (Grok-first): the Luna checker held claims 1, 3, 5, 7, 9 on the narrow pattern; the objective lane (Opus, from the Luna distillate) held every claim but 3 and named the sites; read its text at `/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/console-objective-r2.md` in full before editing.

**The Orchestrator's rulings.** The wording at `guides/console.md:603` is `// keep generated ANSI paired with the sink's stdout stripping` (the sink strips ANSI on its `stdout` target when unstyled, and the styler's `enabled` follows `sink.styled`). The `selectWriter` example at `src/core/helpers.ts:167-169` carries sample data, not the renamed key, and still reads as the old words: its strings become `'stdout'` and `'stderr'`.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/console run <script>`, `npm --prefix /home/user/fleet/console test`, `cd /home/user/fleet/console && npx vitest run …` with output captured under `/home/user/work/evidence/console-proofs/`, `git -C /home/user/fleet/console status --short`, `git -C /home/user/fleet/console diff`, `node /home/user/scaffold/tmp/work/evidence.mjs console`, `cd /home/user/fleet/console && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`. A note appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

## Scope

**Owned.** `src/server/types.ts`, `src/server/constants.ts`, `src/core/helpers.ts`, `guides/console.md`, `tests/src/server/factories.test.ts`, `tests/guides.test.ts` (only a presence guard quoting a changed line), `/home/user/work/evidence/console-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-console-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. `src/server/types.ts:67`: "enable or disable its styler for the out target" becomes "enable or disable its styler for the `stdout` target".
2. `src/server/constants.ts:24`: "when the out stream is not a TTY" becomes "when the `stdout` stream is not a TTY".
3. `guides/console.md:603`: the fence comment becomes `// keep generated ANSI paired with the sink's stdout stripping`. Grep `tests/guides.test.ts` for `out stripping` first; where a presence guard quotes the old comment, change the guard's string to the new text.
4. `tests/src/server/factories.test.ts:28`: the title becomes "infers styling independently for a TTY `stdout` target and a piped `stderr` target"; `:224` becomes "falls back to 80 when the `stdout` stream is not a TTY" (match the existing title's quoting style; backticks inside a test title are plain characters).
5. `src/core/helpers.ts:167-169`: the example's `'out'` becomes `'stdout'` and `'err'` becomes `'stderr'` in every position, including the `//` result comments. Grep `tests/**` for `selectWriter(` and align any assertion that reads those strings.
6. **Sweep.** Run `\b(out|err)\b` (case-sensitive) over `src`, `tests` (excluding the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `guides/console.md`, `guides/README.md`, and `README.md`; in the report's § Sweeps replace the row that records `\b(out|err)\s*:` with this pattern, and rule every remaining hit by its sense: the local bindings at `src/server/factories.ts:54-55, 58-59, 66, 77, 79` are permitted names of the sink's own members and stay; ordinary English `out` stays; any other hit that names the renamed target is a defect to fix under this row. Capture the hit list to `/home/user/work/evidence/console-proofs/fix2-out-err-sweep.txt` by writing the Grep tool's output there with the Write tool.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each (converging with `lint` then `format` only where a check reddens on an owned file), then `cd /home/user/fleet/console && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs console`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 2` section to the report naming each row, the line now at each site, the sweep's rulings, each gate command with its exit code, and the audit's summary line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when a quoted line is not at the line named or one line either side, when a presence guard cannot be matched to its fence line, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The five sites and the example carry the new words; the word-boundary sweep's remaining hits are each ruled permitted.
2. `test:guides` exits 0 with every presence guard matching.
3. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths beside the unit's earlier entries.

## Review evidence

`/home/user/work/evidence/conform-console.diff` and `conform-console.status`; the report; the sweep capture.
