# Unit conform-terminal fix round 1 — the flagship fences the transcription omits

## Role and engine

`implementer` on Claude Opus 5, a native subagent, the sole writer in `/home/user/fleet/terminal`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutation of claim 9 and its findings F1 and F3 (`units/l3/terminal-objective-r1.md`): `tests/guides.test.ts`'s `guide fences` block transcribes every fence line of `guides/terminal.md` that carries a value comment, the manager fence included, so the header sentence at `tests/guides.test.ts:3-5` is true; the two new TSDoc blocks in `tests/setupServer.ts` open in the third person; the report's terminal-obj-5 evidence states what landed.

## Context

**Law.** `/home/user/scaffold/.claude/rules/tests.md` § Cross-cutting proofs (transcribe each flagship fence and assert the values its comments claim); `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation (a doc block's first sentence states what the symbol does in the third person); `/home/user/scaffold/AGENTS.md` § Writing.

**The ruling on R1.** The terminal-obj-5 row (`/home/user/scaffold/tmp/units/conform/conform-terminal-brief.md:66-72`) reads "the required minimum is every fence line carrying a value comment (the finder's list)", and the clause and its parenthetical name different sets. The Orchestrator rules that the clause governs: the population is every fence line of `guides/terminal.md` carrying a value comment, because the parity rule executes the flagship fences and the manager fence is the flagship.

**Untranscribed value-claiming fence lines, as the lane read them at 19:5x UTC** (line numbers can have moved; read the guide before transcribing): the manager fence at `guides/terminal.md:900-936` (`:926` `// { success: true, value: { name: 'Ada' } }`, `:927` `// { name: 'Ada' }`), the password lines `:806-808`, the select lines `:814-825`, the checkbox lines `:827-839`, the editor lines `:841-843`, `renderSelectView` at `:889-895`, and the database-store lines `:965-969`. The existing block at `tests/guides.test.ts:240-426` transcribes the other fences and is the shape to follow. `tests/setupServer.ts` exports `createFakeTTY` with `scripts` (each listener registration draws the next script and replays it), which drives a prompt fence to its claimed answer; where a fence claims plain text from a styled render, strip with `@orkestrel/console`'s `strip` as `tests/src/server/helpers.test.ts` does.

**F3 sites.** `tests/setupServer.ts:43` "Settings for a recording TTY." → "Configures a recording TTY."; `:50` "Create a recording TTY. …" → "Creates a recording TTY. …". The untouched siblings `createLineInput` and `createStreamTarget` keep their pre-existing form; converting them is not this unit's.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/terminal run <script>`, `npm --prefix /home/user/fleet/terminal test`, `cd /home/user/fleet/terminal && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`, `cd /home/user/fleet/terminal && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/terminal status --short`, `git -C /home/user/fleet/terminal diff`, `node /home/user/scaffold/tmp/work/evidence.mjs terminal`, `cd /home/user/fleet/terminal && npx scaffold audit --offline`, and `mkdir -p /home/user/work/evidence/terminal-proofs`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`; capture a runner's output with `> /home/user/work/evidence/terminal-proofs/<name>.txt 2>&1`. The Edit tool converts a `\uXXXX` escape in a string literal into a raw control byte: build a control byte from `String.fromCharCode` as the unit did, never from an escape.

**Standing condition.** The tree carries the conform-terminal unit's uncommitted edits; leave every edit outside the Sites as it is.

## Scope

**Owned.** `tests/guides.test.ts`, `tests/setupServer.ts` (the two doc sentences only), `/home/user/scaffold/tmp/units/conform/conform-terminal-report.md`.

**Off-limits.** Everything else, `guides/terminal.md` included: a fence whose claimed value the code contradicts is a finding to report, never a guide edit. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. **Transcriptions.** Add cases to the `guide fences` block for every untranscribed value-claiming line, each named for what it proves. Before adding them, plant one existing transcription's expected value wrong and read the guides project red, restore by editing, then add the cases and read it green; after adding them, plant one new case's expected value wrong (the manager fence's `{ name: 'Ada' }`), read red, restore, read green. Capture the four readings.
2. **The header.** Re-read `tests/guides.test.ts:3-5` against the block; where a value-claiming line stays untranscribed for a reason you record, rewrite the sentence to name the covered scope. Otherwise leave it.
3. **F3.** The two doc sentences.
4. **Report.** Rewrite the terminal-obj-5 evidence cell (`report.md:13`) to state the population transcribed; append a `## Fix round 1` section: each finding, the edit that closes it, the four readings with their commands and capture files, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs terminal`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when a fence's claimed value contradicts what the code returns (the guide is off-limits), when a prompt fence cannot be driven with `createFakeTTY`'s scripts, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. Every value-claiming fence line of `guides/terminal.md` has a transcription, or the header names the covered scope and the report names each omitted line with its reason.
2. The four control readings are captured; `test:guides` exits 0.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the unit's paths.
