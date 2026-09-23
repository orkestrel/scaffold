# Unit B-PASSIVE-CLOSE-A — the passive family's code carriers

The first of two B-PASSIVE-CLOSE units. This one closes the carriers that touch code alone and can
land before the forms family closes: the size pairs' single `@each` (D30), the `BUTTON_OUTLINE_CASES`
mode axis, the ledger readers' guide-path defaults, and a comment's cross-reference word. The guide
sweep, the `MOTION` constant, the driven-key consolidation (D20), and the prose carriers stay with
B-PASSIVE-CLOSE-B after the forms family lands.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bpc`, a git
worktree detached at `d60d91c` (the session branch with F8c landed; `node_modules` installed by the
Orchestrator, the lockfile normalized by that install and off-limits). Perform the assignment
directly and spawn nothing. Use absolute paths under `/home/user/veneer-bpc` for every command and
file, and run every npm and npx command from `/home/user/veneer-bpc`. Do not commit, push, install,
or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or
`git checkout-index`; undo a plant by the exact reverse edit.

## Objective

Every obligation under § Obligations is applied, the three partials compile byte-identical to their
compile before the change, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** Read on 2026-09-23 at `d60d91c` (line numbers approximate; locate each site by its
text):

- `src/styles/components/_button.scss` around lines 196 to 210: two blocks, `.btn-sm, .btn-group-sm >
  .btn { --bs-btn-padding-x: var(--vn-space-4); --bs-btn-padding-y: var(--vn-space-2);
  --bs-btn-font-size: var(--vn-size-1); --bs-btn-border-radius: var(--vn-radius-small); }` then
  `.btn-lg, .btn-group-lg > .btn { … var(--vn-space-8); var(--vn-space-4); var(--vn-size-3);
  var(--vn-radius-large); }`.
- `src/styles/components/_pagination.scss` around lines 110 to 122: `.pagination-lg { …
  var(--vn-space-12); var(--vn-space-6); var(--vn-size-5); var(--bs-border-radius-lg); }` then
  `.pagination-sm { … var(--vn-space-4); var(--vn-space-2); var(--vn-size-2);
  var(--bs-border-radius-sm); }` (the variables `--bs-pagination-padding-x`, `-padding-y`,
  `-font-size`, `-border-radius`).
- `src/styles/components/_placeholder.scss` around lines 21 to 31: `.placeholder-xs { min-height:
  0.6em; }`, `.placeholder-sm { min-height: 0.8em; }`, `.placeholder-lg { min-height: 1.2em; }`.
- The `@each` precedents: `src/styles/components/_input-group.scss` lines 4 to 7 (`$sizes` as a list
  of tuples, `@each $size, $padding, $font in $sizes`), `_form-range.scss` lines 9 to 12
  (`$engines`), `_form-check.scss` (`$glyphs` with a comment naming what the list holds).
- `tests/setupStyles.ts` around line 1894 (`BUTTON_FILLED_CASES`'s TSDoc: "Holds the role and theme
  readings for the filled-button interaction cases.") and around lines 2217 to 2222
  (`BUTTON_OUTLINE_CASES` derived through `BUTTON_FILLED_CASES.filter(([, theme]) => theme ===
  mode).map(([role, theme, fill, , active, focus]) => …)`); the outline TSDoc at 2215 already says
  "mode". `tests/src/styles/components/button.test.ts` around line 163 (`it.each(BUTTON_OUTLINE_CASES)`
  destructures `mode`); the filled case's parameter list is yours to read.
- `tests/setupServer.ts` lines 967, 1024, 1069, and 1144: `path: string = resolve(WORKSPACE_ROOT,
  'guides/veneer.md')` on the four ledger readers; `VENEER_GUIDE_PATH` is already imported at line
  37 and `readVeneerGuide` is declared around line 1210.
- `tests/setupStyles.test.ts` lines 1689, 1902, 2523, and 2537: `readFileSync(VENEER_GUIDE_PATH,
  'utf8')`, a read relative to the working directory; the file already imports from
  `./setupServer.js` (lines 1 and 11 to 24).
- `tests/setupServer.test.ts` line 603: "the row below names a category that has entries and an
  obligation none of them carries."

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,architecture,writing}.md`; D20 and
D30 in `/home/user/veneer-bpc/tmp/units/decisions-round-2.md`;
`/home/user/veneer-bpc/tmp/units/b-passive-family.md`. Skill: none. Guide: `guides/veneer.md`
(report-only; see § Scope).

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/server/index.d.ts`
and `browser/index.d.ts`): add no helper; `readVeneerGuide` in `tests/setupServer.ts` is the guide
loader.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Sibling units and a gate chain share the container: a
timeout is a timing reading you report. `prettier` must never run; `oxfmt` is the formatter. The
styles project loads `dist/src/styles/index.css`, so run `npm run build:src` before every browser
reading.

**Measurements.** `npx sass --no-source-map src/styles/index.scss` is the compile the byte-identity
proof compares (take the baseline before any edit and keep it under
`/home/user/veneer-bpc/tmp/units/bpc-baseline.css`); `git status --porcelain` at dispatch is
`M package-lock.json` (the Orchestrator's install normalization; leave it).

**Control identifiers.** none.

**Standing conditions.** `package-lock.json` is modified at dispatch and stays so; `tmp/capture/`
is absent in this worktree (no journey run is owed).

## Unknowns

- Whether `guides/veneer.md` describes the size blocks' shape in a sentence the `@each` makes false:
  grep `btn-group-sm\|btn-group-lg\|pagination-lg\|placeholder-xs\|size pair\|one .@each` over the
  guide and report each hit with a ruling (true, false, or unaffected); return a patch for a false
  one (the guide is report-only).
- Which `theme` occurrences in the button tables and proof name the light-and-dark axis (rename
  to `mode`) and which name the `data-bs-theme` attribute or a theme scope (keep): grep `\btheme\b`
  over `tests/setupStyles.ts` from the `BUTTON_FILLED_CASES` TSDoc to the end of
  `BUTTON_OUTLINE_CASES`, and over `tests/src/styles/components/button.test.ts`; report every hit
  with its ruling.

## Obligations

1. **`_button.scss`.** Declare, after the `@use` lines and before `@layer components`, a comment and
   a list in the `_input-group.scss` form: `// Names each size's padding pair, type size, and radius
   token; one loop over this list emits the two size blocks in the partial's order.` then
   `$sizes: (('sm', var(--vn-space-4), var(--vn-space-2), var(--vn-size-1), var(--vn-radius-small)),
   ('lg', var(--vn-space-8), var(--vn-space-4), var(--vn-size-3), var(--vn-radius-large)));`.
   Replace the two blocks with `@each $size, $x, $y, $font, $radius in $sizes { .btn-#{$size},
   .btn-group-#{$size} > .btn { --bs-btn-padding-x: #{$x}; --bs-btn-padding-y: #{$y};
   --bs-btn-font-size: #{$font}; --bs-btn-border-radius: #{$radius}; } }`, keeping any comment that
   precedes the blocks.
2. **`_pagination.scss`.** The same shape: `$sizes: (('lg', var(--vn-space-12), var(--vn-space-6),
   var(--vn-size-5), var(--bs-border-radius-lg)), ('sm', var(--vn-space-4), var(--vn-space-2),
   var(--vn-size-2), var(--bs-border-radius-sm)));` with the comment adapted, and `@each $size, $x,
   $y, $font, $radius in $sizes { .pagination-#{$size} { --bs-pagination-padding-x: #{$x};
   --bs-pagination-padding-y: #{$y}; --bs-pagination-font-size: #{$font};
   --bs-pagination-border-radius: #{$radius}; } }`.
3. **`_placeholder.scss`.** `$sizes: (('xs', 0.6em), ('sm', 0.8em), ('lg', 1.2em));` with a comment
   naming the minimum heights, and `@each $size, $height in $sizes { .placeholder-#{$size} {
   min-height: $height; } }`, keeping the comments around the blocks in place.
4. **Byte identity.** After obligations 1 to 3, `npx sass --no-source-map src/styles/index.scss >
   /home/user/veneer-bpc/tmp/units/bpc-after.css` and `cmp tmp/units/bpc-baseline.css
   tmp/units/bpc-after.css` exits 0. Control: swap the two tuples of `_button.scss`'s `$sizes`, compile,
   and record that `cmp` exits 1; restore by the exact reverse edit and record `cmp` exiting 0 again.
5. **The mode axis.** In `tests/setupStyles.ts`, the `BUTTON_FILLED_CASES` TSDoc reads "Holds the role
   and mode readings for the filled-button interaction cases."; the `BUTTON_OUTLINE_CASES`
   derivation reads `.filter(([, candidate]) => candidate === mode).map(([role, mode, fill, ,
   active, focus]) => …)`; every other `theme` the second Unknown rules as naming the axis is renamed
   `mode`, and every one naming the attribute or a scope stays.
6. **The guide-path defaults.** In `tests/setupServer.ts`, each of the four `path: string =
   resolve(WORKSPACE_ROOT, 'guides/veneer.md')` defaults becomes `path: string =
   resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH)`; where a reader's TSDoc names the literal path, name
   `VENEER_GUIDE_PATH` in its place. In `tests/setupStyles.test.ts`, each of the four
   `readFileSync(VENEER_GUIDE_PATH, 'utf8')` reads becomes `readVeneerGuide()`, imported from
   `./setupServer.js` in the existing named import list (sorted where sorted); drop the
   `VENEER_GUIDE_PATH` import there only if no other use remains (line 145's import and the
   export-name row at 309 stay because the inventory names it).
7. **The comment.** `tests/setupServer.test.ts` line 603: "the row below names" becomes "the
   following row names".
8. Run `npx oxfmt --config .oxfmtrc.json --write` over the owned files.

## Scope

**Owned.** `src/styles/components/_button.scss`, `_pagination.scss`, `_placeholder.scss`;
`tests/setupStyles.ts` (the button tables' TSDoc and derivation only); `tests/src/styles/components/button.test.ts`
(the axis rename only); `tests/setupServer.ts` (the four defaults and their TSDoc only);
`tests/setupStyles.test.ts` (the four reads and the import only); `tests/setupServer.test.ts` (the
comment only).

**Shared (report-only).** `guides/veneer.md` (return a patch for a sentence the change makes
false); `ROADMAP.md` (return the rows this unit closes: the size pairs, the `BUTTON_OUTLINE_CASES`
axis, the ledger readers' defaults, the `below` comment).

**Off-limits.** `package.json`, `package-lock.json`, `src/styles/_tokens.scss`, `_mixins.scss`,
every other partial, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`,
`app/**`, `configs/**`, the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`.claude/settings.json`), and every other file.

**What asserts the state this change ends.** The ledger cases (`npm run test:conformance`, unchanged
values), the button, pagination, and placeholder browser proofs, the setup inventories (`npm run
test:setup`), and the byte-identity compile; derived by running them.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --check` over the owned files, `npx oxlint --config
.oxlintrc.json --deny-warnings` over the owned TypeScript files, `npm run check`, `npm run
build:src`, `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
tests/src/styles/components/button.test.ts tests/src/styles/components/pagination.test.ts
tests/src/styles/components/placeholder.test.ts`, all from `/home/user/veneer-bpc`.

## Output

Write `/home/user/veneer-bpc/tmp/units/b-passive-close-a-report.md` and return the same text: each
obligation with its site; the byte-identity record (the two `cmp` exits and the control's); the
rulings the Unknowns asked for; the guide and ROADMAP patches; the gate exits with counts;
`git status --porcelain`; `git diff d60d91c --stat`; and deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on `cmp` exiting non-zero after the obligations, on any file outside § Scope a gate
names, and on any ruling the tree contradicts. Decide, record, and carry on from the comment
wording, the list placement inside each partial's head, and the import ordering.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, the scoped `oxlint`, and `npm run check` exit 0.
2. The byte-identity `cmp` exits 0 and the control exits 1.
3. `npm run build:src`, the scoped browser run, `npm run test:setup`, `npm run test:conformance`,
   and `npm run test:guides` exit 0.
4. `git status --porcelain` lists the owned files and `package-lock.json`, and nothing else.

**Observations, not criteria.** Any timeout under load.

## Review evidence

The report and the diff of every owned file against `d60d91c`.
