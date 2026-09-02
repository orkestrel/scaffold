# Unit breaking-markdown — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s10-08** — applied: Renamed isWhitespace to isFlankingWhitespace at src/core/helpers.ts:334 and at both call sites inside locateEmphasis (helpers.ts:942, :965). isFenceWhitespace untouched, as the ruling directs. The predicate stays in helpers.ts: it takes a raw string and narrows no type, so it is a predicate rather than a Guard<T>, which .claude/rules/architecture.md Kind purity keeps outside validators.ts by the isVacant precedent; the ruling's 'is* stays' holds. Touching the block, I rewrote its TSDoc first sentence into the third-person form .claude/rules/typescript.md requires ('Checks whether ...') and carried the term change into its @returns line, its @example calls, the test import, the four assertions, and the guides/markdown.md Surface row. Word-boundary sweep for the old name over src, tests, guides, README.md returns no hit; the term sweep for 'inline whitespace' over the same paths also returns no hit.
- **s10-02** — applied: Repointed the stale comment at tests/src/core/parsers.test.ts:37 from helpers.test.ts to compilers.test.ts. Verified first that renderHTML is declared in src/core/compilers.ts:29 and that its structure, escaping, URL-floor, composed-element, and MAX_DEPTH describes live in tests/src/core/compilers.test.ts, while helpers.test.ts reads renderHTML only inside AST-engine and htmlToMarkdown proofs. Decision recorded: the same stale claim sat twice more in guides/markdown.md's Tests section, which the unit owns. The helpers.test.ts row credited renderHTML's structure, escaping, URL floor, src widening, and depth cap to helpers.test.ts, and the list carried no compilers.test.ts row at all. I moved that clause onto a new compilers.test.ts row and left the helpers row naming markdownToHTML as the unsanitized projection. Fixing the comment while the guide kept asserting the same falsehood would have left the stale copy the finding exists to remove.
- **s10-06** — applied: Replaced the anonymous return spellings in the guides/markdown.md Helpers rows with the named types: extractHeading with HeadingMatch, extractFence with FenceMatch, scanCode with CodeSpanMatch, locateLink with LinkBounds, locateEmphasis with EmphasisBounds, collectTable with TableCollection, collectList with ListCollection. Each was checked against the declaration in src/core/helpers.ts first: every one of those signatures already returns the named type, so the guide was the only place still spelling the shape. The scanLink and scanEmphasis rows keep their inline object spellings because those two functions genuinely return an anonymous shape in source, and the ruling's list names no type for them. The Types table already carried rows for all named types, so no row was added there. Fixed-string sweep for each replaced spelling over src, tests, guides, README.md returns no hit.

## Symbols moved

- isWhitespace → isFlankingWhitespace (src/core/helpers.ts, barrelled through src/core/index.ts via export * from './helpers.js')

## Files touched

- /home/user/fleet/markdown/src/core/helpers.ts
- /home/user/fleet/markdown/tests/src/core/helpers.test.ts
- /home/user/fleet/markdown/tests/src/core/parsers.test.ts
- /home/user/fleet/markdown/guides/markdown.md

## Tests changed

- /home/user/fleet/markdown/tests/src/core/helpers.test.ts — import moved to its alphabetical slot after isFenceWhitespace; the four assertions in the 'line predicates' block now call isFlankingWhitespace; the case title changed from 'recognizes inline whitespace characters' to 'recognizes the whitespace characters the emphasis flanking rule tests for', naming what it proves rather than the retired term
- /home/user/fleet/markdown/tests/src/core/parsers.test.ts — header comment repointed to compilers.test.ts (comment only; no assertion changed)

## Gates

- `npm run check (pre-edit, to read the red as the adoption list)` → exit 0 — tsc --noEmit --project tsconfig.json && npm run check:src → check:src:core → tsc --noEmit -p configs/src/tsconfig.core.json. No diagnostics. The staged upstream closure required no symbol adoption in this package; node /home/user/work/verify-stage.mjs markdown reported contract OK (contract-2c15840.tgz), guide OK (guide-be6111e.tgz), html OK (html-bc53632.tgz), test OK (test-cced24a.tgz).
- `npm run lint (mutating, to converge)` → exit 0 — oxlint --config .oxlintrc.json --fix --deny-warnings . — no output, no rewrite.
- `npm run format (mutating, to converge)` → exit 0 — oxfmt --config .oxfmtrc.json --write . — Finished in 2896ms on 47 files using 4 threads. oxfmt formats Markdown as well as TypeScript and reflowed the Helpers table's Signature column after the shortened signature cells.
- `npm run format:check` → exit 0 — All matched files use the correct format. Finished in 2780ms on 47 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no output.
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json && npm run check:src → check:src:core → tsc --noEmit -p configs/src/tsconfig.core.json. No diagnostics.
- `npm run build` → exit 0 — dist/src/core/index.js 134.07 kB │ gzip: 31.19 kB; dist/src/core/index.cjs 139.65 kB │ gzip: 31.66 kB; built in 2.96s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts.
- `npm test` → exit 0 — test:src — Test Files 7 passed (7), Tests 602 passed (602). test:policy — Test Files 1 passed (1), Tests 111 passed (111). test:config — Test Files 1 passed (1), Tests 46 passed (46). test:setup — Test Files 1 passed (1), Tests 24 passed (24). test:guides — Test Files 1 passed (1), Tests 18 passed (18).
- `grep -rn '\bisWhitespace\b' src tests guides` → exit 1 — No hit. Acceptance criterion 1 met. The same sweep over README.md is also clean, as is a fixed-string sweep for each of the seven replaced anonymous return spellings.

## Diff stat

```text
guides/markdown.md             | 105 +++++++++++++++++++++--------------------
 src/core/helpers.ts            |  16 +++----
 tests/src/core/helpers.test.ts |  12 ++---
 tests/src/core/parsers.test.ts |   2 +-
 4 files changed, 68 insertions(+), 67 deletions(-)
```

Status at return (writer's reading): `M guides/markdown.md |  M src/core/helpers.ts |  M tests/src/core/helpers.test.ts |  M tests/src/core/parsers.test.ts |  | (git status --porcelain --untracked-files=all adds nothing: no untracked file, no tmp/ directory in the subject tree. My instruments went to the session scratchpad, never into /home/user/fleet/markdown.)`
Built `dist/` moves: true

## Observations

- dist moves, as expected for a rename. After npm run build, dist/src/core/index.js carries isFlankingWhitespace and dist/src/core/index.d.ts declares it; a grep for the old name in dist/src/core/index.d.ts returns no hit. dist/ is gitignored, so it does not appear in the status or the diffstat.
- oxfmt formats Markdown, which I did not expect and confirmed by running format:check against my hand-padded table: it failed on guides/markdown.md alone. The converge run reflowed the Helpers table's Signature column to the width the shortened cells allow. Of the guide's changed lines, only these are substantive: the isWhitespace row, the seven signature cells, the helpers.test.ts Tests row, and the new compilers.test.ts Tests row; the remainder is the reflow and its separator row. I verified this by normalizing whitespace on every added and removed line and diffing the sets, so the reflow is provably content-free.
- npm run check exited 0 before any edit, so the staged L0/L1/W-DEV closure left no renamed upstream symbol for this package to adopt. The prior commit de72312 had already adopted the renamed @orkestrel/guide helpers in tests/guides.test.ts.
- test:distribution was not run: the brief excludes it as a criterion while a dependency tarball is staged.
- Outside this unit's scope, for the next matrix, against the TSDoc capability in src/core/helpers.ts: every other boolean predicate there opens its TSDoc with the fragment 'Whether ...' rather than the third-person -s verb .claude/rules/typescript.md fixes, and every boolean @returns there reads '`true` when ...' rather than the 'True if ...; false otherwise' form the same rule fixes. I rewrote only the block this rename touched, per the brief's 'where you touch a block'. The file now carries one block in the required form beside its siblings in the older form.
- No timing-suspect failure. The whole npm test chain completed well inside its own runs on this host; the slowest project (test:src) is the only one carrying real weight and it passed on both runs.

## Deviations

- No row was refused and no row was stopped. Nothing in the deviation contract fired: isFlankingWhitespace collided with no existing export (checked before the rename, no hit anywhere in the tree), no two rows moved the same symbol, no rename reached an off-limits file, and no gate failed.
- One decision recorded rather than reported as a stop, under the deviation contract's 'decide, record, and carry on' clause. Under s10-02 I edited two guides/markdown.md Tests rows beyond the brief's literal wording ('repoint the parsers.test.ts comment'). The guide's Tests section carried the same stale claim the comment carried — it credited renderHTML's structure, escaping, URL-floor, src-widening, and depth-cap proofs to helpers.test.ts and listed no compilers.test.ts row at all — so I moved that clause onto a new compilers.test.ts row. The file is owned by this unit and the claim is the same one s10-02 corrects. The guide parity test does not enforce Tests-list completeness, so nothing mechanical would have caught the omission. Reverse it by dropping the compilers.test.ts row and restoring the renderHTML clause to the helpers row.
- One judgment recorded on s10-06's boundary. The finding's repair text also said to add the seven named types to the guide's type table; that half had already landed, so the Types table needed no edit and I changed only the Helpers rows the carried finding names. Verified by reading the Types table rows for HeadingMatch, FenceMatch, CodeSpanMatch, LinkBounds, EmphasisBounds, TableCollection, and ListCollection before editing.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/markdown.diff`,
`tmp/units/breaking/markdown.status`.
