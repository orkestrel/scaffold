# Unit U-styles-config — successor brief 2: the comment's reason and three nouns

## What changed and why

This brief supersedes `u-styles-config-brief.md` for the remainder of the unit; that
brief stands except where this one says otherwise, and `u-styles-config-report.md` is
the baseline. The audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u-styles-config-audit-verdict.md`)
confirmed the wrapper's shape, the digests, the controls, the scripts, and the scope, and refuted
the prose in two places. The wrapper's comment says the fields are replaced by assignment
"because `mergeOverride` cannot remove the browser output boundary, which refuses this output
directory"; that is false: `mergeOverride` (root `vite.config.ts`) replaces a base plugin with a
same-named override plugin, and every `outputBoundary` plugin is named
`orkestrel-output-boundary`, so a merge would replace the browser boundary with the styles one.
What the merger cannot do is remove `environmentBoundary('src/browser')`, a base plugin no
override matches, and it concatenates every other array (`setupFiles`, `include`) instead of
replacing it. Three code tokens lack the kind word `.claude/rules/writing.md` § Code tokens
requires, and one remark gives a circular reason.

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. Sole writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing;
no `scaffold repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git add`. Law from
`C:/Users/mikes/WebstormProjects/scaffold`: `.claude/rules/writing.md`.

## Scope

**Owned.** `configs/src/vite.styles.config.ts` (the comment above `export default` and the
`exclude: [],` line alone), `tests/setupStyles.ts` (the two `@remarks` paragraphs the previous
brief rewrote alone), the report. **Off-limits.** Everything else.

## Execution

Perform the assignment directly and spawn nothing.

1. **The comment.** Replace the comment above `export default defineConfig({` in
   `configs/src/vite.styles.config.ts` with this text, wrapped at 100 columns:
   "The root supplies the alias table, the disabled public directory, and the resolved Playwright
   provider once for the workspace. The fields a styles build differs in are replaced by
   assignment rather than merged: the `mergeOverride` helper keeps a base plugin no override
   names, so the browser environment boundary would stay, and it concatenates every other array,
   so the setup files and the include list would double."
2. **The remark on `BOOTSTRAP_CASCADE_PATH`.** In `tests/setupStyles.ts`, the `@remarks` paragraph
   reads: "This module is loaded by the Node `setup` project and the browser `src:styles` project,
   imports no stylesheet, and takes no `node:fs` import; the styles project loads the built
   cascade through its `setupFiles` array. The Node proof reads the file itself and hands the text
   to {@link extractBootstrapVariables}."
3. **The remark on `extractBootstrapVariables`.** Its `@remarks` first paragraph reads: "The text
   arrives as an argument because this module must load in Node and in the browser alike: the
   Node `setup` project and the browser `src:styles` project both load it, and only the styles
   project loads the built cascade, through its `setupFiles` array. Keeping the reader pure also
   lets a case drive it with a written stylesheet and a control that must report nothing." The
   paragraph that follows it is unchanged.
4. **The inherited exclude.** In `configs/src/vite.styles.config.ts`, delete the `exclude: [],`
   line from the `test` object, so the styles project keeps the `exclude` the spread carries from
   the root (`tests/src/core/**/*.test.ts`, which the styles include cannot match) instead of an
   empty array that also discards Vitest's default exclusions. Nothing else in the object changes.
5. **Gates.** `npm run format:check`, `npm run lint:check`, `npm run check:src:styles`,
   `npm run test:src:styles` (expected: the same 7 files and 40 tests as before item 4),
   `npm run test:setup`; record each command's final lines.

## Output

Write `u-styles-config-report-2.md` and return its content: the diff per file; each
command's final lines; `git status --porcelain` (tracked rows only); deviations in the usual
shape.

## Deviation contract

Stop and report on: a gate red; a need to edit any other line. Decide, record, and carry on from:
line wrapping alone.

## Acceptance criteria

1. The three texts read as items 1 to 3 state, the `exclude: [],` line is gone, and nothing else
   in the two files changed.
2. `format:check`, `lint:check`, `check:src:styles`, `test:src:styles` (7 files, 40 tests), and
   `test:setup` exit 0.
3. `git status --porcelain` lists the report's three files exactly.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
