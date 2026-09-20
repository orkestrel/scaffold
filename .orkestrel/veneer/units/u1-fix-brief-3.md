# Unit U1-fix — successor brief 3

## What this supersedes

This brief supersedes `tmp/units/u1-fix-brief-2.md`; briefs 1 and 2 stand as landed in `690bbb4`.
Same role and engine: `builder` on native Sonnet, sole writer in
`C:/Users/mikes/WebstormProjects/veneer` (clean at `690bbb4`), performing the assignment directly
and spawning nothing. No `git` command that writes the index, the stash, or the working tree.

## Why a successor

Audit round 2 (`u1-fix-audit-verdict.md` under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`)
confirmed the fix round except for the findings below. Two of them trace to the Orchestrator's own
brief (the digest equalities asked for in the wrong file; a plant asked for in a file the brief
also forbade), and this brief corrects both.

## Fixes

1. **RTL guard as an exported, proved predicate** (round 2 claim 5 and finding 15 of the
   subjective lane; the dispatch defect the objective lane named). Move the physical-declaration
   check out of the test callback into `tests/setupStyles.ts` as an exported pure function
   `readPhysicalDeclaration(css: string): string | undefined` that returns the first declaration
   in a stylesheet text that is direction-sensitive: a physical inline-axis longhand
   (`margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left*`,
   `border-right*`, `left`, `right`, `float`, `clear`, `text-align: left|right`), or a `margin`,
   `padding`, `inset`, `border-width`, `border-style`, or `border-color` shorthand with four
   values whose second and fourth differ. Prove it in `tests/setupStyles.test.ts` against inline
   fixtures — flagged: `padding-left:1px`, `margin:0 1px 0 2px`, `text-align:right`; permitted:
   `margin:0 1px`, `margin:0 1px 0 1px`, `padding-inline-start:1px`, `inset-inline:0`, the
   layer statement alone — and make the cascade case call it on the built `index.css` while
   asserting `index.rtl.css` is byte-identical (the permitted state today). Update the
   setup-module export-set assertion in `tests/setupStyles.test.ts` to list the new export.
   No plant into `src/styles/**`; the fixtures are the red readings.
2. **Digest proofs where they belong** (round 2 finding N3, the objective lane; the brief's
   own error). In `tests/setupConformance.test.ts`, the digest case asserts only what is true of
   the constants themselves: each is a lowercase 64-character hex string and the three are
   pairwise distinct; the equalities against the installed artifacts stay in
   `tests/conformance.test.ts` alone. Name the case without a count (finding N2 and finding 16:
   "pins a distinct digest for the CSS, the RTL CSS, and the bundle" or equivalent).
3. **Nested function assignment** (finding 14). In `tests/setupBrowser.test.ts`, the control
   that adds a listener passes an anonymous callback directly to `addEventListener` with an
   `AbortController` signal and aborts it afterwards, so no `const listener = …` and no function
   declaration sits inside a test callback.
4. **Report honesty** (finding N1). Append to `tmp/units/u1-fix-report.md` a `## Correction`
   section stating that the first run's per-step green counts in its fix table were the
   end-state readings written into every row, that the projects were run once at the end, and
   that the red readings stand as measured; then the `## Successor 3` section below.
5. **Gates.** `npm run format:check`, `lint:check`, `check`, `test:setup`, `test:setup:browser`,
   `test:src:styles`, `test:conformance`. Record each command's final lines.

## Scope

**Owned.** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.test.ts`,
`tests/setupConformance.test.ts`, `tmp/units/u1-fix-report.md`. **Off-limits.** Everything else.

## Output

Append `## Correction` and `## Successor 3` to `tmp/units/u1-fix-report.md`: the fixture
readings of fix 1 (each flagged and permitted string with the function's return), the gate
readings, and `git status --porcelain`; return both sections.

## Acceptance criteria

1. The gates in step 5 exit 0.
2. `readPhysicalDeclaration` flags and permits exactly the fixtures named.
3. `git status --porcelain` lists only the four owned test files.
