# Unit markdown-sanitizer fix round 2 — the reading capture, the prose breadth, the counts

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/markdown`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 checker's refutations of claims 1, 5, and 9 (`units/followon/markdown-sanitizer-r2-checker-luna.md`): the reading capture the report names exists and reproduces the fence's exact input; every sentence in the two sanitizer paragraphs claims only what the fence's output shows, or the fence is extended to show it; the report's authored prose states no count.

## Context

**Law.** `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/AGENTS.md` § Writing (never state a count; `both` is a count where it tallies a growable set; write a number only as a value the reader needs).

**Findings, as the checker read them at 19:02 UTC.**

- Claim 1: `/home/user/work/evidence/markdown-proofs/sanitizer-read-2.txt` is absent though the report names it, and `sanitizer-read-2.ts` does not reproduce the fence's input.
- Claim 5: `guides/markdown.md:430-432` claims refusals for schemes and attributes the fence does not exercise (read the sentences; they name what html's floor refuses beyond the `javascript:` destinations the fence shows).
- Claim 9: `markdown-sanitizer-report.md:169` still reads "gained two cases", and lines 106-110 use "one" and "both" as authored counts.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/markdown run <script>`, `npm --prefix /home/user/fleet/markdown test`, `cd /home/user/fleet/markdown && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/markdown-proofs/<name>.txt 2>&1`, `cd /home/user/fleet/markdown && npx tsx /home/user/work/evidence/markdown-proofs/<script>.ts > /home/user/work/evidence/markdown-proofs/<name>.txt 2>&1`, `cd /home/user/fleet/markdown && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/markdown status --short`, `git -C /home/user/fleet/markdown diff`, `node /home/user/scaffold/tmp/work/evidence.mjs markdown`, `cd /home/user/fleet/markdown && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the unit's uncommitted edits in `guides/markdown.md` and `tests/guides.test.ts`; build on them.

## Scope

**Owned.** `guides/markdown.md` (the two sanitizer paragraphs and the fence), `tests/guides.test.ts` (the fence's transcription and presence guard), `/home/user/work/evidence/markdown-proofs/**`, `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md`.

**Off-limits.** Everything else, `src/**` included. Never edit a vendored file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, delete a file, or run a discarding git command. Never use a mock, spy, or fake.

## Rows

1. **The reading.** Write `/home/user/work/evidence/markdown-proofs/sanitizer-read-3.ts` whose `source` is the fence's `source` array verbatim (copy the lines from the guide) and which prints `renderHTML(parseDocument(source))` from the built `dist/src/core/index.js`; run it to `sanitizer-read-3.txt`; confirm the printed string equals the fence's comment value byte for byte (compare in the report with both strings quoted); name `sanitizer-read-3.txt` in the report wherever the reading is cited and drop the name of the file that does not exist.
2. **The prose.** Read `guides/markdown.md` from "**`renderHTML` sanitizes, unconditionally.**" through the end of "**The one widening: `src`.**". For each sentence that names a scheme, an attribute, an element, or a behaviour the fence's output does not show, do one of: add to the fence's `source` an input that shows it (a `data:` image for a `data:` refusal, a link with a `vbscript:` destination, a table cell for `align`), extend the comment from a re-run of the reading (row 1 again, to `sanitizer-read-3.txt`), and extend the transcription; or rewrite the sentence to claim only what the fence shows and point the reader at html's guide (`guides/html.md`, the sanitizer's home) for the floor's full list. Record every sentence changed with its old and new text.
3. **The transcription.** Where row 2 extended the fence, update the executing case's source and expected value, re-capture a red control with a planted value to `sanitizer-control-red-3.txt`, restore, and capture the green run to `sanitizer-green-3.txt`.
4. **The report.** Rewrite every authored count: "gained two cases" (name the executing case and the presence guard), "one" and "both" where they tally the cases or the readings (name them), and any other number word or numeral that answers "how many" in authored prose; leave a runner tally or an audit line quoted as evidence inside a code fence.
5. Append a `## Fix round 2` section to the report: the reading command and its equality check, the sentences changed, the captures, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs markdown`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the real output contradicts the `src` widening itself, or when a gate reddens on something the rows did not touch. How a sentence is worded is yours to decide and record.

## Acceptance criteria

1. `sanitizer-read-3.txt` exists and its content equals the fence's comment value byte for byte.
2. Every sentence in the two paragraphs is shown by the fence's output or points to html's guide for what it does not show.
3. The report's authored prose states no count; every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only `guides/markdown.md` and `tests/guides.test.ts`.
