# Unit html-sanitizer — executed assertions for the sanitize-floor prose claims

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/html`. Perform the assignment directly and spawn nothing.

## Objective

Three behaviour claims in `guides/html.md` § The sanitize floor sit under no executable fence: a sanitized `img` keeps its `alt` text and loses its `src` (`:285`), an entity-obfuscated scheme such as `java&#115;cript:` is decoded before it is judged and refused (`:281`), and table-cell `align` survives only on `td` and `th` with `center`, `left`, or `right` in trimmed lowercase and is lost elsewhere even when the attribute allowlist names it (`:280`). After the unit, the fence under `### Sanitize, and watch the floor hold` (`:415-441`) demonstrates each claim with the value it returns in a trailing comment, and the transcription in `tests/guides.test.ts` (`it('sanitizes to the floor whatever the element and attribute allowlists say')`, `:308-328`) asserts each value.

## Context

Read before editing, in this order: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity (a prose claim about behaviour under no fence gains the executed assertion that would break if the claim went false, with the substring check kept only as a presence guard beside it); `/home/user/scaffold/.claude/rules/tests.md` § Cross-cutting proofs (transcribe each flagship fence and assert the values its comments claim; change a fence, change the transcription beside it); `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/fleet/html/guides/html.md` § The sanitize floor and § Sanitize, and watch the floor hold; `/home/user/fleet/html/tests/guides.test.ts` (the `flagship fences` block from `:227`, and the presence-guard form the block uses for every fence).

This is the html twin of the markdown-sanitizer follow-on (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/markdown-sanitizer-brief.md`, landed in markdown as `8823dc1`): markdown's guide claimed a hostile subtree dropped, a refused destination stripped, and a resource `src` surviving, under no fence. In html the first two claims are already fenced and transcribed; the `src` claim is the inverse (the default `SAFE_ATTRIBUTES` omits every resource `src`), and the Orchestrator widened the unit to the two sibling claims in the same section that also carry no fence, because one fence line each closes them.

Sites: `guides/html.md:415-441` (add the lines to the existing fence, after the `link` lines, each in the fence's own form: a `renderHTML(... .sanitize(...).document)` call with a `// '<expected>' - <reason>` trailing comment); `tests/guides.test.ts:308-328` (one `expect(renderHTML(...)).toBe('<expected>')` per added line, in the fence's order, and the presence guard for the fence updated if the block keeps one per fence). Read `src/core/constants.ts` for `SAFE_ATTRIBUTES`, `TABLE_ALIGNMENTS`, and `TABLE_CELL_ELEMENTS`, and run each new input through the real `sanitize` before writing its expected value into the guide: the guide states what the code returns, never the reverse.

Vectors, one per claim, adjusted only if the real output differs and the difference is the code's ruling rather than a defect: `createHTML('<img src="/x.png" alt="x">')` sanitized with defaults; `createHTML('<a href="java&#115;cript:alert(1)">bad</a>')` sanitized with defaults; `createHTML('<table><tr><td align=" Center ">c</td></tr></table><p align="center">p</p>')` sanitized with `{ attributes: ['align'] }` (if `table` or `tr` is unwrapped or dropped by the default element allowlist, read `SAFE_ELEMENTS` and choose the vector the vocabulary keeps, so the expected value shows `align="center"` on the cell and no `align` on the paragraph). If a vector reveals a defect — the code contradicts the prose — stop and report it under Deviations with the exact input and output; do not change the prose to match a defect.

Host: POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile (an npm shim on `PATH` refuses install-class subcommands and logs every npm invocation). Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run check`, `npm run format:check`, `npm run lint:check`, `npm run test:guides`, `node -e "<one expression>"` only to run a vector through the built or source sanitizer (prefer `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts` with a temporary assertion you then replace), `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rn <pattern> src tests guides/html.md`, `ls`, `cat`, and `mkdir -p /home/user/work/evidence/html-sanitizer-proofs`. Capture a runner with `> /home/user/work/evidence/html-sanitizer-proofs/<name>.txt 2>&1`.

Standing conditions: the checkout is clean at the landed tip `b3de1fa`; every `.md` under `guides/` other than `guides/html.md` and `guides/README.md` is a vendored mirror, off-limits.

## Unknowns

Whether the default element allowlist keeps `table`, `tr`, and `td` (read `SAFE_ELEMENTS`; report what you found and the vector you used).

## Scope

Owned: `guides/html.md` (the one fence under `### Sanitize, and watch the floor hold`, and nothing else in the file), `tests/guides.test.ts` (the one transcription case and its presence guard), `/home/user/fleet/html/tmp/units/html-sanitizer-report.md` (create `tmp/units/` if absent). Off-limits: everything else, including `src/**`, `package.json`, `configs/**`, the vendored tests, and every vendored guide mirror.

## Execution

Run each vector through the real sanitizer first and record its output. Then add the fence lines with the recorded values, then the transcription. Before the proof passes, capture it red with one expected value planted wrong (`red.txt`), restore the value by editing, and capture it green (`green.txt`). Perform every step yourself; spawn nothing.

## Output

Write the report to `/home/user/fleet/html/tmp/units/html-sanitizer-report.md` and return its content as your final message. Sections: Vectors (each input, the recorded output, the claim it proves, `file:line` of the fence line and of the assertion), Failing-first controls (command, red and green counts, capture paths), Gates (`format:check`, `lint:check`, `check`, `test:guides` — command and exit), Sweeps (`git status --short`; `git diff --stat`), Deviations.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a vector's real output contradicts the prose claim, when the fence's transcription case cannot hold the new assertions without restructuring the block, or when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: the exact vector text, the wording of a trailing comment.

## Acceptance criteria

1. `guides/html.md`'s sanitize fence carries one line per claim with the value the code returns in its trailing comment, and nothing else in the file changed.
2. `tests/guides.test.ts` asserts each value in the fence's order; `red.txt` reads the case failing on the planted value and `green.txt` reads the `guides` project passing.
3. `npm run test:guides`, `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
4. `git status --short` lists only `guides/html.md` and `tests/guides.test.ts`.

## Review evidence

The auditor receives `git diff` and `git status --short` from the Orchestrator's own run plus the captures under `/home/user/work/evidence/html-sanitizer-proofs/`.
