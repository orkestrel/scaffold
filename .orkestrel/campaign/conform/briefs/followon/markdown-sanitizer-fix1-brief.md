# Unit markdown-sanitizer fix round 1 — the prose the fence does not yet support

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/markdown`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 checker's refutations of claims 5 and 9 (`units/followon/markdown-sanitizer-checker-luna.md`): the fence exercises every sentence the two sanitizer paragraphs claim, and where a sentence claims what no markdown input can show, the sentence is narrowed to what the fence shows; the report states no count.

## Context

**Law.** `/home/user/scaffold/.claude/rules/documentation.md` § Parity (a prose claim about behaviour under no fence gets the executed assertion that would break if it went false; re-read the prose last, against what shipped) and `/home/user/scaffold/AGENTS.md` § Writing (never state a count). The markdown-sanitizer brief (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/markdown-sanitizer-brief.md`) this round extends.

**Sites, as read at 18:53 UTC.** Line numbers can have moved; read each site before changing it.

- `guides/markdown.md:432` (in "**The one widening: `src`.**"): "A refused image keeps its element and its alt text and loses only the destination." — no input in the fence produces a refused image.
- `guides/markdown.md` "**`renderHTML` sanitizes, unconditionally.**" and the sentences around the fence at `:446-449`: the prose claims whole unsafe-subtree removal, while the fence shows a raw `<script>` line rendered as escaped paragraph text because the parser projects no raw HTML into an element.
- The report at `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md:45-46`: "gained two cases" states a count.

**Unknowns.** Which image destination the sanitizer refuses (a `javascript:` URL, a `data:` URL, or another scheme) is read from the installed `@orkestrel/html` under `node_modules` and from a real run, never assumed; whether any markdown input reaches the sanitizer as an element subtree it removes (for example an inline HTML span, if the parser projects one) is read the same way.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/markdown run <script>`, `npm --prefix /home/user/fleet/markdown test`, `cd /home/user/fleet/markdown && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/markdown-proofs/<name>.txt 2>&1`, `cd /home/user/fleet/markdown && npx tsx /home/user/work/evidence/markdown-proofs/<script>.ts`, `cd /home/user/fleet/markdown && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/markdown status --short`, `git -C /home/user/fleet/markdown diff`, `node /home/user/scaffold/tmp/work/evidence.mjs markdown`, `cd /home/user/fleet/markdown && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the markdown-sanitizer unit's uncommitted edits in `guides/markdown.md` and `tests/guides.test.ts`; build on them.

## Scope

**Owned.** `guides/markdown.md` (the two sanitizer paragraphs and the fence), `tests/guides.test.ts` (the fence's transcription and presence guard), `/home/user/work/evidence/markdown-proofs/**`, `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md`.

**Off-limits.** Everything else, `src/**` included. Never edit a vendored file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, delete a file, or run a discarding git command. Never use a mock, spy, or fake.

## Rows

1. **The refused image.** Read what the sanitizer refuses for an `img` `src` from the installed `@orkestrel/html` (its guide and declarations under `node_modules/@orkestrel/html/`) and from a real run (`sanitizer-read-2.ts`, output to `sanitizer-read-2.txt`); add to the fence's source an image whose destination the sanitizer refuses, and extend the fence's comment with the rendered result, read from the run. Where the real output keeps the element and its `alt` and drops only `src`, the sentence at `:432` stands; where it does not, rewrite the sentence to what the output shows.
2. **The subtree claim.** Where a markdown input exists that the parser projects into an element the sanitizer removes as a subtree (read the parser's projection in the installed built output and the guide's own description of raw HTML), add it to the fence and its comment; where none exists, rewrite the sentences that claim unsafe-subtree removal to what the pipeline does: the projection produces no raw HTML element, so hostile markup renders as escaped text, and the sanitizer's judgment falls on the destinations and attributes of the elements the projection does produce. Keep the `text` pipeline fence and the `src` widening paragraph's meaning.
3. **The transcription.** Update the case in `tests/guides.test.ts` to assert the extended fence's value; re-capture the red control with a planted value (`sanitizer-control-red-2.txt`) and the green run (`sanitizer-green-2.txt`).
4. **The report.** Replace "gained two cases" with the members (the executing case and the presence guard) and sweep the report for any other count.
5. Append a `## Fix round 1` section to the report: the extended fence, the readings and their commands, the prose sentences changed with old and new text, the captures with their counts, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs markdown`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the real output contradicts the `src` widening itself (an `https:` `src` dropped) or when a gate reddens on something the rows did not touch. Where a sentence is worded is yours to decide and record.

## Acceptance criteria

1. Every sentence in the two sanitizer paragraphs is shown by the fence's comment values, each read from a real run; no sentence claims a subtree removal the fence does not show.
2. `tests/guides.test.ts` asserts the extended value; the red control fails on the planted value and the green run passes.
3. The report states no count; every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only `guides/markdown.md` and `tests/guides.test.ts`.
