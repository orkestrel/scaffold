# Unit reading-change â€” the reading design the user decided, in three commits

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `cfc3ad4` (item 11 and its review repair). Make three commits, in order; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Authority, in order

1. The user's decisions and the Orchestrator's rulings: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md` Â§ Reading design.
2. The recommended design: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\reading-design.md` (sections 3 to 7 and Units U1 to U3), with its judges in `reading-design/judge-*.md`. Where it leaves plain text to the user (D2), the user chose a sibling tool named `plain`; where it keeps `distill: true` as a library option, the default flips (D3).
3. This checkout's `AGENTS.md` and rules.

## Commit 1: the library (U1)

- `distill` defaults to `false` in `reading.markdown()` and `reading.text()` (`src/core/BrowserReading.ts`), with every TSDoc and test that relied on the distilled default updated; the undistilled projection resolves link targets left relative by caller HTML against the reading's `url`.
- Add `collectBrowserWords(text): ReadonlySet<string>` (extracted from the word rule `matchBrowserOutline` uses, which then calls it) and `matchBrowserText(text, search): readonly BrowserReadMatch[]` (each `{ offset, text }`, the best-scoring lines in document order, offsets from the scan so duplicate lines carry their own), with `BrowserReadMatch` in `src/core/types.ts`.
- Accept when: the matcher fails with its top-score filter removed; duplicate lines carry distinct offsets; a relative link in an undistilled projection comes out absolute and fails with the resolution removed; a capture-level page with `nav` and one `main` drops the nav text only under `distill: true`; `npm run check`, `test:src:core`, `test:src:browser`, and `test:setup` exit 0.

## Commit 2: the toolset (U2, with `plain`)

- Rename the argument `what` to `search` on `look`, `read`, `tabs`, and `journeys`, still required (D4). On every one it does one job: on the first page only (offset 0), the entries that share the most words with it are listed first, in a block outside the paged text that takes at most half the room, so offsets never depend on it; a first row too long for the room is cut with `â€¦` without splitting a surrogate pair; a later row that does not fit is skipped and the scan continues; no block without a word of 3 letters or digits or without a match. `look` lists rows as today; `read` and `plain` list `[OFFSET] LINE`; `tabs` lists matching tab rows; `journeys` lists `[OFFSET] HEADING` of matching journeys.
- A call that still sends `what` is refused through the existing unknown-parameter check, naming `search`.
- The synthetic placeholder page tools receive becomes `purpose`, its description unchanged.
- Add the `plain` tool: the plain-text projection (`reading.text()`) of the same capture `read` uses, with `search` and `offset`, annotated `pure` and `untrusted`, an observation (never a journey step), allowed under a replay hold as `read` is, refused while a dialog is open, sharing `read`'s retained reading and continuation rules keyed by projection.
- The copy, exactly:
  - `read`: "Reads the page as Markdown, with headings, tables, and link addresses. Call it to learn a fact; continue with the offset a cut result names."
  - `plain`: "Reads the page as plain text, without Markdown, link addresses, or image text. Call it for words to pass to wait or type."
  - `search` on `look`: "Words to find on this page; matching elements come first." On `read` and `plain`: "Words to find on this page; the lines that share them come first." On `tabs`: "Words to find; matching tabs come first." On `journeys`: "Words to find; matching journeys come first."
  - `BROWSER_TOOL_VIEW_FOOTER`: "the rest was cut; call look with words to find".
  - `look`'s description stays as it is.
- Measure the serialized tool definitions before and after (`tests/src/core/BrowserToolset.test.ts`'s bound, 6,050) and the journey bound; shorten nothing the user fixed; raise the bound to the smallest multiple of 50 that holds the measured length, recording both lengths in the test's comment and the guide's figure, per Â§ Item 12 rulings.
- Accept when: a `read` with `search` lists a header line from past 4,000 characters with an offset that continues correctly; `plain` returns the plain projection and pages it; an offset above 0 or a non-matching search gives no block; a long first row is cut and later rows still list; `journeys` and `tabs` list their matches first; a call with `what` is refused; `npm run build` then `npm run test:service` exit 0.

## Cost: the user's rule (2026-10-03)

Keep performance reasonable and measurable, and make no fractional or micro optimization: a change for speed must be worth it under a heavy load real pages produce, never an invented one. No figure here is a target or a cap; size fixtures, samples, and thresholds to the case and state the reasoning. Measure, as a guarded bench (`.claude/rules/tests.md` Â§ Probes), the first-page `read`, `plain`, and `look` with a `search` against without one, on veneer's showcase and on a heavy page of the kind real sites serve (a large data table), with the host's other load. Say before the run what added cost would be too much for this case and why; if matching exceeds it, repair the algorithm rather than caching one cheap read, and report every number either way.

## Commit 3: the guide and README (U3)

Every guide row, fence, prompt line (`guides/browser.md:48`, `:3416`: "call read with search set to words from your question"; the site-search distinction at `:49`; the seeding at `:63` and `:3428`), the tool table, the bound figure, the distill example, and `README.md`, in parity with the source. `npm run test:guides` and `npm run test:policy` exit 0.

## Gates

After the last commit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`; then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/reading-change-report.md` and return it as your final message: per commit its changes, each acceptance proof's red and green command and counts, the two bound measurements, the gate table, the three commit hashes, and any deviation. No process diary.

## Deviation contract

Stop only if a decision cannot hold without changing `@orkestrel/html`, `@orkestrel/markdown`, or a contract the design does not name, and report: expected, found, evidence, and one hypothesis.
