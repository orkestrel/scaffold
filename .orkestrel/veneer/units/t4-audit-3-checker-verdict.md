## Verdict — claims 4 and 5, `t4-audit-claims-3.md`

### Claim 4 — The guide

- **Surface row placement.** `guides/test.md` gains a `readClipEdge` Surface row immediately before the `readClipMargin` row. CONFIRMED — `t4-3.diff:9-10` (added row at line 9, unchanged `readClipMargin` row at line 10, in that order).
- **Summary parity.** The row's Summary cell, "Measures the row a clipping element cuts its content off at, in document coordinates.", equals the TSDoc description's first sentence verbatim. CONFIRMED — `t4-3.diff:9` (guide) against `t4-3.diff:57` (`src/browser/helpers.ts` TSDoc summary line).
- **§ Capture sentence and pattern-closing sentence.** Both edited sentences name the clip edge read from the selected box through the `readClipEdge` helper, each code token followed by a noun (`readClipEdge` helper, `overflow-clip-margin` value, `readClipMargin` helper, `clip` keyword). CONFIRMED — `t4-3.diff:13-30` (narrative block, informally "§ Capture" per the brief's own usage, verified live at `/home/user/test/guides/test.md:623-628`) and `t4-3.diff:34-44` (pattern's closing sentence, verified live at `/home/user/test/guides/test.md:3429-3433`, under the `### Measure a document's content edge` heading confirmed at `/home/user/test/guides/test.md:3404`).
- **"the guides project reads green."** UNRESOLVED — rests only on the writer's report (`t4-r3-report.md:58`: `npm run test:guides`: `51 passed (51)`, exit 0). No independent verifier log or gate-log file was among the named evidence files (`t4-3.diff`, `t4-3-status.txt`, `t4-r3-brief.md`, `t4-r3-report.md`, `t4-2.diff`, `t4-audit-2-objective-verdict.md`). Command to run: `npm run test:guides`.

Claim 4 overall: the readable, checkable sub-clauses are CONFIRMED; the gate-result sub-clause is UNRESOLVED for want of independently produced evidence.

### Claim 5 — Law and scope

- **File-set exclusivity.** The delta touches exactly `guides/test.md`, `src/browser/helpers.ts`, `tests/setupBrowser.ts`, and `tests/src/browser/helpers.test.ts`, and no other file. CONFIRMED — `t4-3-status.txt:1-4` lists exactly those four modified paths, matching `t4-3.diff`'s four `diff --git` headers (`t4-3.diff:1,47,141,173`).
- **No `any`, assertion, suppression, mock, or nested function beyond the exceptions.** `readClipEdge` (`t4-3.diff:80-92`) is a module-scope function declaration, uses no `any`, no `as`, no `!`, no `@ts-ignore`/`@ts-expect-error`/`eslint-disable`, and contains no nested function declaration. The `measureContent` loop edit (`t4-3.diff:129-138`) replaces two lines with a `for`-loop body only, introducing no nested function. The two new test cases (`t4-3.diff:197-212`, `217-236`) use `buildFixture`, `requireValue`, `stagePane`/`releasePane` — real fixtures, no mocks or fakes. CONFIRMED.
- **No inline case matrix.** The new case data (`CLIP_EDGE_CASES`) is centralized in `tests/setupBrowser.ts` (`t4-3.diff:149-168`), frozen with `Object.freeze` at both levels, not declared inline inside the test file. CONFIRMED — `t4-3.diff:198-199` shows the test importing `CLIP_EDGE_CASES` rather than declaring a literal table.
- **No banned term, no count of a growable set.** Every added sentence in the diff (TSDoc in `helpers.ts`, `measureContent` doc-block, both guide-prose edits, the `CLIP_EDGE_CASES` doc comment, and the test-file comment at `t4-3.diff:224-226`) was checked against `.claude/rules/writing.md` § Substitutions and `AGENTS.md` § Writing's count ban. No banned-term hit found, and no sentence states a count of a growable set (the numbers present are measured pixel values, not counts). CONFIRMED.
- **Gate exits.** UNRESOLVED — `npm run format:check`, `npm run lint:check`, `npm run check`, the scoped browser vitest run, and `npm run test:guides` all rest only on the writer's self-report (`t4-r3-report.md:53-58`). No independently produced gate log was among the named evidence files. Commands to run: `npm run format:check`; `npm run lint:check`; `npm run check`; `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "clipsOverflow|readClipEdge|readClipMargin|measureContent"`; `npm run test:guides`.

Claim 5 overall: the scope, code-law, and vocabulary sub-clauses are CONFIRMED; the gate-exit sub-clause is UNRESOLVED for want of independently produced evidence.

### Findings outside claims 4 and 5

None found within the assigned reading scope.

VERDICT: PASS

Note to Orchestrator: two sub-clauses are UNRESOLVED, not BROKEN — "the guides project reads green" (claim 4) and the five gate-exit lines (claim 5) — because their only evidence is the writer's own report. Independent gate evidence (a `verifier` log) is needed to close them.
