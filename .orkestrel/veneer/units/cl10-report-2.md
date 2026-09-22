<!-- sol on Astra (gpt-6-astra), bench unit, journal tmp/codex/cl10-2.jsonl, thread
01a0c766-e373-78f1-a939-63cc4031d851, exit=0. Sole writer in the Veneer checkout, continuing the
authored CL10 tree from 5e011a3. Round 1 was written natively by Opus 5, so this fix round went to
an engine that did not write it. Retained 2026-09-22 from the --output-last-message file. Its brief
is cl10-brief-2.md over cl10-brief.md; its measurements are cl10-fix-terrain.md. -->

CL10 fix round is implemented on HEAD `5e011a3`, continuing the authored CL10 working tree. The final gate chain passes, as do the required Edge projects. The built CSS is byte-identical to the baseline. No agent was spawned, and nothing was committed, pushed, or installed.

**Obligation 1 — selector admission.** `collectGridVocabulary` uses one shared boundary for every prefix it names. It refuses ASCII identifier continuations, non-ASCII code points through U+10FFFF, and backslash escapes. Family separators, selector endings, and genuine punctuation boundaries remain admitted; `caption-top` retains its exact-name restriction.

The existing control covers the terrain's refusal classes, including the earlier grid, gutter, table, and caption prefixes. It also checks admitted pseudo-classes, combinators, attributes, adjacent classes, and grouped selectors. The mutation it distinguishes is restoring the original ASCII-only boundary: non-ASCII and escaped extensions become false vocabulary members.

**Obligation 2 — reader extraction.** `readParentOffset(element: Element): number` is exported from `tests/setupBrowser.ts`. The icon-shift case calls it instead of assigning a local arrow function. The SVG geometry comment remains intact.

The setup proof reads an SVG child's signed painted offset, child translation, parent movement and translation, zero and negative offsets, and refusal without a parent. The browser setup files changed only for this export, its import, its export-list assertion, and its proof. Lint is not cited as evidence for removing the nested assignment.

**Obligation 3 — carried edits.** The ratio loop destructures `$width, $height` in its header and drops `sass:list`. The icon-class selector comparison sorts its actual and expected lists. The icon-link compatibility row changes only its Notes cell, naming the underline-color substitution through `--vn-link-rgb` and the transition-timing substitution through Veneer's motion tokens. Row granularity stays intact. The ratio-size case is synchronous and drops the resolved-promise await. `ICON_LINK_MARKUP` moves before `IMAGE_PAINT_CASES` in the export-list literal.

**Obligation 4 — CL9 carry.** Container freeze assertions remain for every table. Entry freeze assertions cover only `TABLE_ROLE_CASES`, `TABLE_RESPONSIVE_CASES`, and `TABLE_GEOMETRY_CASES`; their nested readings, cell, and row checks remain. The normalizer regression supplies its own typed compatibility row and still drives `scanCompatibilityPresence`, including its odd-child negative control. Its unused `readCompatibility` import is removed. The exact-text, depth-zero even-child equivalence is unchanged, as ruled.

**Cascade evidence.** Each digest reading follows `npm.cmd run build:src:styles`; the full build and Edge styles run reproduce the same result. SHA-256 for `dist/src/styles/index.css` is:

| Reading | SHA-256 |
| --- | --- |
| Before the ratio-loop edit | `0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2` |
| After the ratio-loop edit | `0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2` |
| After final gates | `0d8e87332f2184836faff4fe8f09aed307e7fafc0376f6dfbf5556a03ecadec2` |

`dist/src/styles/index.rtl.css` has that same digest at each reading. The comparison of the original and fixed admission expressions against the built cascade returned the following actual output:

```text
$ node tmp/units/cl10-cascade-boundary-2.mjs
{"admitted":421,"differences":[]}
exit 0
```

The setup suite also passes the inventory-bound selector/media-condition multiset comparison. No key, family, deferral, or departure was added.

**Boundary red/green evidence.** The staged `node tmp/units/cl10-boundary-probe.mjs` reproduced the recorded admissions. After extending the permanent control, this exact command ran against the unfixed collector:

```text
npm.cmd run test:setup -- -t "collects the helper prefixes and their preference condition without admitting longer names"

FAIL  |setup| tests/setupStyles.test.ts > styles setup > collects the helper prefixes and their preference condition without admitting longer names
AssertionError: expected [ '[".icon-linké",[]]', …(8) ] to deeply equal []

 Test Files  1 failed | 2 skipped (3)
      Tests  1 failed | 153 skipped (154)
exit 1
```

After the boundary fix, the same command returned:

```text
npm.cmd run test:setup -- -t "collects the helper prefixes and their preference condition without admitting longer names"

 Test Files  1 passed | 2 skipped (3)
      Tests  1 passed | 153 skipped (154)
exit 0
```

The final full setup run includes the additional punctuation controls and returns `Tests 154 passed (154)`.

The reader proof was also challenged by changing parent subtraction to addition. Its command and failure were:

```text
npm.cmd run test:setup:browser -- -t "reads signed painted offsets"

AssertionError: expected 263 to be 23 // Object.is equality
 Test Files  1 failed (1)
      Tests  1 failed | 34 skipped (35)
exit 1
```

After restoring subtraction, the same command returned:

```text
 Test Files  1 passed (1)
      Tests  1 passed | 34 skipped (35)
exit 0
```

**Unknowns.** The browser setup module is the correct home: it owns DOM readers and mounted specimens. The installed `@orkestrel/test/browser` declarations provide computed-style readers but no matching parent-relative painted-offset reader.

The consumer search covered `tests/**/*.ts` for the named table constants. It found the setup proof and `tests/src/styles/components/table.test.ts`; the latter consumes the object-bearing geometry, role, and responsive tables. No table value changed. Narrowing only the primitive-entry assertions leaves the sibling proof's inputs and the object-bearing freeze checks intact.

**Gate evidence.** Windows PowerShell refuses the `npm.ps1` shim, so commands use `npm.cmd`. The saved runner captures each native `$LASTEXITCODE` and stops on failure:

```text
powershell -NoProfile -ExecutionPolicy Bypass -File tmp/units/cl10-gates-2.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File tmp/units/cl10-gates-2.ps1 -Edge
```

The final managed-Chromium chain ran in this order:

| Command | Exit | Final result |
| --- | --- | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics |
| `npm.cmd run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics |
| `npm.cmd run build` | 0 | `✓ built in 601ms` |
| `npm.cmd run test` | 0 | Final project: `Test Files 1 passed (1)`, `Tests 18 passed (18)` |

The full test log records these project results:

| Project | Test Files | Tests |
| --- | --- | --- |
| src:core + src:browser | 8 passed (8) | 51 passed (51) |
| src:styles | 58 passed (58) | 411 passed (411) |
| app:browser | 10 passed (10) | 26 passed (26) |
| journey | 4 passed (4) | 84 passed / 4 skipped (88) |
| policy | 1 passed (1) | 109 passed / 1 skipped (110) |
| config | 1 passed (1) | 173 passed / 1 skipped (174) |
| setup | 3 passed (3) | 154 passed (154) |
| setup:browser | 1 passed (1) | 35 passed (35) |
| conformance | 1 passed (1) | 10 passed (10) |
| guides | 1 passed (1) | 18 passed (18) |

With `PLAYWRIGHT_CHANNEL=msedge`, the required projects returned:

| Command | Exit | Final result lines |
| --- | --- | --- |
| `npm.cmd run test:src:styles` | 0 | `Test Files 58 passed (58)`; `Tests 411 passed (411)` |
| `npm.cmd run test:setup:browser` | 0 | `Test Files 1 passed (1)`; `Tests 35 passed (35)` |
| `npm.cmd run test:app:browser` | 0 | `Test Files 10 passed (10)`; `Tests 26 passed (26)` |

Logs are under `tmp/units/cl10-2-chromium-*.log.txt` and `tmp/units/cl10-2-edge-*.log.txt`. An earlier direct PowerShell capture returned shell exit 1 despite passing project summaries; the saved runner removes that ambiguity by explicitly returning npm's native exit code. The final runner exits 0 for Chromium and Edge.

**Tree evidence.** The following is actual `git diff --stat` output, including the inherited CL10 work. Untracked partials and proofs appear in the status output rather than the diff stat.

```text
 app/browser/constants.ts                         |  31 +++-
 guides/veneer.md                                 | 182 ++++++++++++++++-------
 src/styles/index.scss                            |   3 +
 tests/app/browser/sections/LayoutSection.test.ts |   2 +
 tests/app/browser/sections/LinkSection.test.ts   |  11 ++
 tests/app/browser/sections/MediaSection.test.ts  |  24 ++-
 tests/conformance.test.ts                        |   3 +
 tests/setupBrowser.test.ts                       |  22 +++
 tests/setupBrowser.ts                            |  20 +++
 tests/setupConformance.test.ts                   |   3 +
 tests/setupStyles.test.ts                        | 149 ++++++++++++++++++-
 tests/setupStyles.ts                             |  41 ++++-
 12 files changed, 420 insertions(+), 71 deletions(-)
```

The following is actual `git status --porcelain --untracked-files=all` output, including its stderr warnings:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M app/browser/constants.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/sections/LayoutSection.test.ts
 M tests/app/browser/sections/LinkSection.test.ts
 M tests/app/browser/sections/MediaSection.test.ts
 M tests/conformance.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/components/_icon-link.scss
?? src/styles/components/_ratio.scss
?? src/styles/components/_vr.scss
?? tests/src/styles/components/icon-link.test.ts
?? tests/src/styles/components/ratio.test.ts
?? tests/src/styles/components/vr.test.ts
```

Every listed path is owned by the effective briefs. `git diff --check` exits 0.

**Unclosed evidence.** No implementation finding remains open. The required probe MCP call was attempted with the fixed collector as its case and the original boundary as its runtime-failing control. The tool refused before execution:

```text
MCP tool call requires approval, but approval policy is never
```

No probe receipt was issued. The direct Vitest red/green readings and final gates are the executed evidence; they are not represented as an MCP receipt.