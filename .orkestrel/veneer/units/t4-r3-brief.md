# Unit T4-R3 — the capture harness reads a clipping frame's edge from its selected box

This brief supersedes `t4-test-clip-brief-3.md` as the effective brief for the third round of T4 TEST-CLIP. What changed: the writer is `opus` (a native subagent) instead of the Orchestrator, the helper's result is `number | undefined` so absence is `undefined`, and the case list is fixed here. The earlier briefs (`t4-test-clip-brief.md`, `-2.md`, `-3.md`) stay unedited.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in the checkout `/home/user/test` (`@orkestrel/test`, branch `claude/inspiring-allen-t4qzv1`, tip `10a9b3d`, clean). You are the executor that opens this brief.

## Objective

`measureContent` in `src/browser/helpers.ts` caps each descendant of a clipping frame at that frame's overflow clip edge, read from the box the frame's `overflow-clip-margin` value selects, so a bordered or padded frame with a clip margin reads the document edge the browser paints.

## Context

**Evidence.** The round-2 audit (`/home/user/scaffold/.orkestrel/veneer/units/t4-audit-2-verdict.md`, from the Astra lane `t4-audit-2-objective-verdict.md`) broke the cap: CSS Overflow 3 § 3.2 expands the clip margin from the selected visual box, the padding box by default, so a 400px frame with a 3px bottom border and a 100px `clip` margin over a 600px child paints to row 500 while the round-2 code caps at 503, and the `content-box` keyword over a 20px bottom padding paints to 500 while the code caps at 520. The round-2 code at `10a9b3d`: `readClipMargin` (around line 2962 of `src/browser/helpers.ts`) returns the pixel length of the computed `overflow-clip-margin` value for a `clip` overflow or a paint containment and `0` otherwise; `clipsOverflow` (around line 2990) reports a clipping frame; `measureContent` (around line 3035) caps a descendant at `frame.getBoundingClientRect().bottom + window.scrollY + readClipMargin(frame)`. The round-2 tables `CLIP_CASES` and `CLIP_MARGIN_CASES` sit at the head of `tests/setupBrowser.ts`; the cases `clipsOverflow`, `readClipMargin`, and `measureContent` sit around line 2909 of `tests/src/browser/helpers.test.ts`. Chromium on this host (141) parses `overflow-clip-margin: content-box 20px` (the round-2 `readClipMargin` case reads 20 from it). Locate every site by its symbol; line numbers are approximate.

**Law.** `/home/user/scaffold/AGENTS.md` (read it first); `/home/user/scaffold/.claude/rules/typescript.md`, `tests.md`, `browser.md`, `documentation.md`, `writing.md`, `names.md`; skill: none; guide: `guides/test.md` in the checkout (§ Surface, § Capture, the pattern "Measure a document's content edge").

**Installed primitives.** `@orkestrel/contract` (a dependency of this package, `node_modules/@orkestrel/contract/dist`): reuse its guards where one applies; a local guard that duplicates one is a defect. This package is `@orkestrel/test` itself; `readStyle` and `readPixels` in `src/browser/helpers.ts` are the readers to use.

**Host.** Linux, bash, working path `/home/user/test`. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` and `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` first in every shell. The browser project runs Chromium through Vitest's browser mode. No network is needed.

**Measurements.** Take one before writing: the computed `box-sizing` of an element `buildFixture` renders in this package's browser project (the expected values below assume `content-box`; where it reads `border-box`, add `box-sizing: content-box` to every fixture style this brief lists and say so in the report).

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** A Veneer capture probe and a Veneer landing run on the same container while you work, so a browser case can miss a deadline under load; re-run a timing failure alone once before believing it, and report the pair of readings.

## Unknowns

None beyond the measurement above.

## The edits

- **E9.** Add `readClipEdge(element: Element): number | undefined` to `src/browser/helpers.ts`, exported, placed before `readClipMargin`, with TSDoc in the file's form (summary, `@param`, `@returns`, `@remarks`, `@example`). It returns the element's overflow clip edge in document coordinates, and `undefined` for an element `clipsOverflow` reports as not clipping. For a computed `overflow-y` value of `hidden`, `auto`, or `scroll`, the edge is the padding box's bottom: `getBoundingClientRect().bottom + window.scrollY - readPixels(element, 'border-bottom-width')`. For a `clip` overflow or a paint containment, the edge is the bottom of the box the computed `overflow-clip-margin` value names (`border-box`: the border-box bottom; `content-box`: the padding box's bottom less `padding-bottom`; `padding-box` or no keyword: the padding box's bottom) plus `readClipMargin(element)`. `measureContent` then caps each descendant at `readClipEdge(frame)` for every ancestor between the element and the body whose edge is defined, and the `clipsOverflow` check in its loop goes. The frame's own contribution stays its border-box bottom plus its bottom margin. Update the `measureContent` remarks: the cap is the clip edge read from the selected box, the padding box by default.
- **E10.** In `tests/setupBrowser.ts`, add the frozen, documented table `CLIP_EDGE_CASES` (`ReadonlyArray<{ readonly style: string; readonly edge: number | undefined }>`, every row frozen), each row's style appended to the base `height: 400px; padding-bottom: 20px; border-bottom: 3px solid` and its `edge` the clip edge in rows from the frame's top: `overflow: hidden` → `420`; `overflow: auto; overflow-clip-margin: 100px` → `420`; `overflow: clip` → `420`; `overflow: clip; overflow-clip-margin: 100px` → `520`; `overflow: clip; overflow-clip-margin: content-box 100px` → `500`; `overflow: clip; overflow-clip-margin: border-box 100px` → `523`; `contain: paint; overflow-clip-margin: content-box 100px` → `500`; the empty style (the base alone) → `undefined`. In `tests/src/browser/helpers.test.ts`, add a `readClipEdge` case that renders each row through `buildFixture`, reads the frame through `requireValue(container.firstElementChild)`, and asserts `{ style, edge }` with `edge` measured as `readClipEdge(frame)` less the frame's top in document coordinates (or `undefined`), and a `measureContent` case: a frame styled `height: 400px; border-bottom: 3px solid; overflow: clip; overflow-clip-margin: 100px` over a `height: 600px` child reads `500` under the 844 and the 2356 pane (the border-box origin would read `503`). Keep every round-2 case unchanged.
- **E11.** `guides/test.md`: a Surface row for `readClipEdge` directly before the `readClipMargin` row, its summary equal to the TSDoc's first sentence (the guides project compares them); the § Capture sentence on the clipping cap and the pattern's closing sentence name the clip edge read from the selected box through the `readClipEdge` helper, each code token followed by a noun.

## Scope

**Owned.** `src/browser/helpers.ts`, `tests/setupBrowser.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`.

**Shared (report-only).** None.

**Off-limits.** Every other file, `package.json` and `package-lock.json` included (the release bumps and re-pins them).

**What asserts the state this change ends.** The round-2 `measureContent` cases (they must keep their readings) and the guides project's summary comparison.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix` (format your owned files by path with `npx oxfmt --write <paths>`).

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return, as your final message, the report: per edit E9 to E11 what changed; the box-sizing measurement; each gate's full command and its result line: `npx oxfmt --write <owned paths>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "clipsOverflow|readClipEdge|readClipMargin|measureContent"`, `npm run test:guides`; `git status --porcelain`; and one mutation per new case, run and restored, with the command and the red result line (the `padding-box` origin replaced by the border box for `readClipEdge`; the `content-box` keyword ignored; the cap removed from `measureContent`). Write the report with no count of a growable set, no list item named by its position, and a noun after every code token.

## Deviation contract

`/home/user/scaffold/.agents/orchestration.md` § Deviation protocol. Settle by yourself: where a helper or a case sits within its file, the TSDoc wording, and the line wrapping. Stop and report on a round-2 case whose reading changes, on a Chromium reading that contradicts an expected value in E10, and on a gate red for a cause outside these edits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. The scoped browser run exits 0 with every round-2 case and the new cases green, and each named mutation reddens its case.
3. `npm run test:guides` exits 0.

**Observations, not criteria.** The package's full `npm test`; the Orchestrator takes it after you return.

## Review evidence

The Orchestrator captures `git -C /home/user/test diff 10a9b3d` and `git -C /home/user/test status --porcelain` at hand-back as `t4-3.diff` and `t4-3-status.txt`, beside your report `t4-r3-report.md`.
