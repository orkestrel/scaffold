# Unit CL2 — fix round (brief 3)

Succeeds `cl2-brief-2.md`, the effective brief of the work under audit, which stays in
force for everything this brief does not name and is left unedited. What changed and why: the
round-1 audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl2-audit-verdict.md`)
accepted every claim and carried four findings, one of which forces this round. Each finding
below names its source lane.

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `00a5bdc` with CL2's eleven files uncommitted
in the working tree (the state the audit ruled on; `git status --porcelain` lists them as ` M`).
Perform the assignment directly and spawn nothing. Run no `git checkout`, `restore`, `stash`,
`reset`, or `clean`; commit nothing; push nothing.

## Objective

Close the four findings inside three owned files so the round-2 audit rules on an implementation
with no hidden declaration and with proofs that fail for the defects they claim to catch.

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Design laws: no hidden module
helpers or declarations; fold trivial one-use logic into its caller), `.claude/rules/tests.md`
(§ Shared test infrastructure: export every reusable helper and constant from a setup file;
§ Discovery and adequacy audit: each assertion fails for the defect it claims to catch),
`typescript.md`, `names.md`. Standing clauses from brief 2 hold: audits cover implementation
only; the scoped formatter and a lint diagnostic's canonical rewrite are granted; the
`visitBreakpoint` and `holdOraclePointer` bodies stay untouched.

Findings, each with the lane that raised it and the fix it takes:

1. **Analyst 8 and reviewer 8 (forces the round).** `tests/setupStyles.ts` declares
   `MEDIA_WIDTH_CONDITION` at module scope (about line 1053), unexported, read once by
   `parseMediaWidth` (about line 1069). Fold the regex literal into `parseMediaWidth`'s body
   and delete the constant and its doc block; the export inventory in
   `tests/setupStyles.test.ts` is unchanged, so do not edit that file.
2. **Reviewer 9.** The `collectMediaConditions` case in `tests/setupBrowser.test.ts` (about
   lines 631-651) gives its two fixture gates the same width, so the parsed `[576, 576]` holds
   under a wrong order or a duplicated match. Give the gates two widths — `(width >= 576px)`
   and `(width < 768px)` — and assert `[576, 768]`, so the array binds both the order and the
   gate-to-selector correspondence while staying serialization-agnostic through
   `parseMediaWidth`.
3. **Reviewer 10.** The same case asserts `readRules()` over every `CSSMediaRule`
   `.not.toEqual([])` (about lines 648-650), which the shipped cascade already satisfies for
   any behaviour of the reader. Replace it with what the flat walk cannot do: the flat list
   carries both fixture conditions, and `collectMediaConditions(rules, <a fixture selector
   that sits under no gate>)` returns an empty array.
4. **Reviewer 11.** The stripe case in `tests/src/styles/tokens.test.ts` (about line 288)
   reads `--vn-state-stripe` on `[data-bs-theme]` islands, which inherit the `:root` value, so
   it does not bind the theme-closure placement. Add the observable assertion:
   `collectScopeProperties(rules, "[data-bs-theme='dark']")` (exported from
   `tests/setupBrowser.ts`; read its signature and how the sibling cases obtain `rules`) carries
   `--vn-state-stripe`. Keep the value assertions.

Host: Windows, Git Bash; `npm run <name>`; managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge`.

## Unknowns

None named. Where a line number has moved, re-read; never stop on it.

## Scope

Owned: `tests/setupStyles.ts` (finding 1 only), `tests/setupBrowser.test.ts` (findings 2 and 3
only), `tests/src/styles/tokens.test.ts` (finding 4 only), `cl2-report-2.md`.
Off-limits: everything else, including every other CL2 file, `tests/setupStyles.test.ts`,
`tests/setupBrowser.ts`, and the vendored files.

## Execution

1. Finding 1, then run `npm run test:setup` (the folded body still parses both spellings; the
   inventory case still passes).
2. Findings 2 and 3, with the red proof first: run the case against the unchanged reader
   after editing the fixture and expectations so it is green, then show it reddens on a
   reader defect it claims to catch — a temporary plant in `collectMediaConditions` that
   returns the first matching condition twice (or in reversed order) — and green restored,
   recording both commands and counts and the plant's removal (`tests/setupBrowser.ts` is
   otherwise off-limits: the plant is the only edit there and it is reverted by hand before
   the gates).
3. Finding 4, with the red proof first: the assertion reddens on a temporary move of the
   `--vn-state-stripe` line out of `theme-tokens` in `src/styles/_mixins.scss` into the
   `:root` block of `_tokens.scss` (the plant is the only edit there and is reverted by hand
   before the gates), then green restored, recorded.
4. Gates, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run test:setup`, `npm run test:setup:browser`, `npm run test:src:styles`, then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`.

## Output

Write `cl2-report-2.md` in the Veneer checkout and return it: per finding the change
as landed with its site, the red-then-green pairs (command and counts), each gate's exit code
and final lines on both engines, the actual `git diff --stat` and
`git status --porcelain --untracked-files=all` (the eleven CL2 files plus nothing new), and
every plant's removal with the grep that proves it.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the exact fixture selector
for finding 3 and the widths' placement in the case. Stop on: a gate red after your own fix
inside owned files; a finding whose fix needs a file outside the owned three.

## Acceptance criteria

1. `tests/setupStyles.ts` has no unexported module-scope declaration; `parseMediaWidth` still
   reads both spellings; `npm run test:setup` exits 0.
2. The reader case asserts `[576, 768]` and an empty result for an ungated selector, and
   reddened on the reader plant (recorded).
3. The stripe case asserts the dark scope carries `--vn-state-stripe`, and reddened on the
   placement plant (recorded).
4. Every gate in item 4 exits 0 on managed Chromium and Edge.
5. The status lists the eleven CL2 files and nothing else; the plants are gone.
