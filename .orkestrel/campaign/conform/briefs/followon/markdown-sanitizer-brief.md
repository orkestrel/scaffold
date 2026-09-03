# Unit markdown-sanitizer — an executable fence for the guide's sanitizer claims

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/markdown`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of markdown, from the landed tip.

## Objective

Close the round-1 and round-2 checkers' F-sanitizer-fence (`units/l2a/markdown-r1-checker-luna.md`, `units/l2a/markdown-r2-checker-luna.md`): the prose under "**`renderHTML` sanitizes, unconditionally.**" and "**The one widening: `src`.**" in `guides/markdown.md` (formerly lines 424-438) claims that a hostile subtree is dropped, that a refused destination is stripped, and that a resource `src` survives, under no executable fence. After the unit, one ```ts fence beside that prose demonstrates each claim with the value it returns in a comment, and `tests/guides.test.ts` executes the fence and keeps a presence guard beside it, in the shape the file's `describe('flagship fences', …)` section already uses.

## Context

**Law.** `/home/user/scaffold/.claude/rules/documentation.md` § Parity (a prose claim about behaviour under no fence gets the executed assertion that would break if the claim went false; the substring check stays only as a presence guard) and § Guide examples (fences import `@orkestrel/markdown`, never `@src/*`); `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/AGENTS.md` § Writing.

**Evidence.** `guides/markdown.md` at the two bold paragraphs named in the Objective and the `text` fence between them (`markdownToHTML(node) → new HTML(document).sanitize({ attributes: [...SAFE_ATTRIBUTES, 'src'] }) → renderHTML(document)`); `src/core/helpers.ts` `renderHTML` and `markdownToHTML`; `tests/guides.test.ts` § flagship fences (its transcription and presence-guard pattern, and the `extractSurfaceNames`-style module-scope helpers); the installed `@orkestrel/html` under `node_modules` for `SAFE_ATTRIBUTES` and the sanitizer's refusal of a `javascript:` destination.

**Unknowns.** The exact rendered bytes for a hostile document are read from the real code, never written from expectation: run the fence's input through `renderHTML` first, then write the comment values from what it returned, then assert those values in the test.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/markdown run <script>`, `npm --prefix /home/user/fleet/markdown test`, `cd /home/user/fleet/markdown && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts > /home/user/work/evidence/markdown-proofs/<name>.txt 2>&1`, `cd /home/user/fleet/markdown && npx tsx <file under /home/user/work/evidence/markdown-proofs/>` (to read the real rendered bytes), `cd /home/user/fleet/markdown && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/markdown status --short`, `git -C /home/user/fleet/markdown diff`, `node /home/user/scaffold/tmp/work/evidence.mjs markdown`, `cd /home/user/fleet/markdown && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `guides/markdown.md` (the sanitizer paragraphs and the one fence this unit adds), `tests/guides.test.ts` (the transcription, its presence guard, and any module-scope helper it needs), `/home/user/work/evidence/markdown-proofs/**` (new).

**Off-limits.** Everything else, `src/**` included. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, the vendored guide mirrors under `guides/`, `configs/**`, `.claude/**`, `scripts/**`). The canonical html guide's twin claim is html's own follow-on row, not this unit's.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, delete a file, or run a discarding git command. Never use a mock, spy, or fake.

## Rows

1. **The fence.** Add one ```ts fence after "**The one widening: `src`.**" (or between the two paragraphs, where it reads best; record the choice) that imports `renderHTML` from `@orkestrel/markdown`, parses one markdown source carrying a raw `<script>` block, a link whose destination is `javascript:alert(1)`, and an image whose `src` is an `https:` URL, and shows in `// ` comments the rendered output: the script subtree absent, the link kept with its destination removed (or the exact form the sanitizer produces), and the image kept with its `src`. Write the comment values from a real run (row 2 first), never from expectation.
2. **The reading.** Before writing the fence's comments, run the input through the real code with a script under `/home/user/work/evidence/markdown-proofs/sanitizer-read.ts` and record its output to `sanitizer-read.txt`.
3. **The transcription.** In `tests/guides.test.ts` § flagship fences, add the case that executes the fence's code and asserts every value its comments claim, plus the presence guard that the fence's first line is in the guide. Capture a red control by planting a wrong comment value in the transcription (never in `src/**`), run the guides project to `sanitizer-control-red.txt`, restore the value, and run it green to `sanitizer-green.txt`.
4. **The prose.** Where a sentence in the two paragraphs claims more than the fence shows, narrow the sentence to what the fence shows or extend the fence; the prose and the fence agree when the unit ends.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs markdown`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/markdown-sanitizer-report.md`: the fence as added, the real reading and its command, the transcription's red and green counts with their capture paths, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the real output contradicts a claim the prose makes and narrowing the sentence would change the documented contract, or when a gate reddens on something the rows did not touch. Where the fence sits and how a sentence is worded is yours to decide and record.

## Acceptance criteria

1. `guides/markdown.md` carries one ```ts fence importing `@orkestrel/markdown` whose comments show a dropped script subtree, a stripped `javascript:` destination, and a kept `https:` `src`, each value read from a real run.
2. `tests/guides.test.ts` executes that fence and asserts each value, with a presence guard beside it; the red control shows the planted value failing and the green run shows the case passing.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the Owned paths.
