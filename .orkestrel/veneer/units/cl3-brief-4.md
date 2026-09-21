# Unit CL3 — fix round (brief 4)

Succeeds `cl3-brief-3.md`, which, with `cl3-brief-2.md` beneath it, stays in
force for everything this brief does not name and is left unedited. What changed and why: the
round-1 audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl3-audit-verdict.md`)
confirmed every claim and carried five findings into this round, four of which force it. Each
finding below names its source lane.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `9f5ffda` with CL3's files
uncommitted in the working tree (the state the audit ruled on: fourteen modified and forty-four
untracked paths outside `tmp/`). You are the bench engine reading the brief inside your own CLI:
perform the assignment directly and spawn nothing. Run no `git checkout`, `restore`, `stash`,
`reset`, or `clean`; commit nothing; push nothing.

## Objective

Close the five findings inside the owned files so round 2 rules on an implementation with a
resolvable fragment, no duplicated partial pattern, its case tables in the setup module, no
instrumentation residue, and a reset proof that covers the unlayered important case.

## Context

Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/styles.md` ("if a
pattern appears in at least two partials, move it to `_mixins.scss`"; `_mixins.scss` holds
`@function` values and `@mixin` emitters and emits no top-level CSS), `tests.md` ("data tables
and case matrices belong in a setup file at any size; test registration does not"; "export
every reusable helper, fixture type, factory, constant, and guard from setup files";
`tests/setupStyles.ts` is host-independent: no DOM, no `window`), `typescript.md`, `names.md`,
`application.md`. Brief 2's and brief 3's standing clauses hold: audits cover implementation
only; the scoped formatter and a lint diagnostic's canonical rewrite are granted; a plant proves
an instrument and is removed before you return; rebuild with `npm.cmd run build:src:styles`
after every `.scss` edit before a styles proof is read.

Findings, each with the lane that raised it and the fix it takes:

1. **Analyst 10 (forces the round).** `app/browser/constants.ts:250` renders the specimen
   `<a href="#main">Return to content</a>`, and `app/browser/Showcase.ts:30` creates `main`
   with no id, so the fragment resolves to nothing. Give the shell's `main` the id `main` where
   it is created, and prove in `tests/app/browser/Showcase.test.ts` that
   `document.getElementById('main')` is the shell's main region while the shell is mounted and
   `null` after `destroy`; keep the specimen's markup.
2. **Analyst 11 (forces the round).** `src/styles/elements/_code.scss:3-6` and
   `src/styles/elements/_samp.scss:3-6` declare the identical font family, size, padding, and
   text colour. Move the shared text treatment into one `@mixin` in `src/styles/_mixins.scss`
   (a `{noun}-{noun}` name in the file's existing style, taking no argument unless a member
   varies a value), include it from `_code.scss` and `_samp.scss`, and from `_kbd.scss`,
   `_pre.scss`, and `_var.scss` only where their declarations are the same values (each keeps its
   partial, its surface, and its distinct declarations). The built cascade's resolved readings
   for every member are unchanged: the existing proofs stay green with no expectation edited.
3. **Analyst 12 (forces the round).** The mirrored proofs under `tests/src/styles/elements/`
   author their mode matrix (`it.each(['light', 'dark'])`) and their expected-value tables inline
   (`code.test.ts:12`, `samp.test.ts:12`, and the siblings). Move every such table into
   `tests/setupStyles.ts` as frozen, exported, host-independent data (one table per tag family
   or one keyed table, named for what it holds, in the shape `BREAKPOINT_CASES` and the
   `BUTTON_*_CASES` tables already use there), list each new export in the inventory assertion of
   `tests/setupStyles.test.ts`, and have the proofs import them; `it.each` stays in the proofs
   (test registration), reading the setup tables. This brief grants `tests/setupStyles.ts` and
   `tests/setupStyles.test.ts` for exactly that.
4. **Reviewer 10 (forces the round).** `tests/src/styles/tokens.test.ts:463-468` keeps a
   `console.log('CL3 code tokens', …)` call. Delete it; the assertions beside it already pin
   both readings. `grep -n console tests/src/styles/tokens.test.ts` returns nothing after.
5. **Reviewer 13.** `tests/src/styles/reset.test.ts:22-33` plants a component-layer rule, an
   unlayered normal rule, and an important later-layer rule against `[hidden]`, but no unlayered
   `!important` rule. Add that plant and assert what the cascade does (an unlayered important
   declaration loses to an important declaration inside a layer, so `[hidden]` still hides);
   record the reading in the report. If the reading contradicts that expectation, assert the
   reading you took and report it as a departure the guide row must carry (CL12).

Host: Windows, Git Bash; `npm.cmd run <name>`; managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge` (a `.cmd` launcher under `tmp/`); the `prove` tool is blocked, so
red-then-green pairs come from real runs; a nested `git` or `npm install` is denied.

## Unknowns

None named. Where a line number has moved, re-read; never stop on it.

## Scope

Owned: `app/browser/Showcase.ts` (finding 1), `tests/app/browser/Showcase.test.ts` (finding 1),
`src/styles/_mixins.scss` (finding 2: the one mixin, nothing else), `src/styles/elements/_code.scss`,
`_samp.scss`, `_kbd.scss`, `_pre.scss`, `_var.scss` (finding 2), `tests/setupStyles.ts` and
`tests/setupStyles.test.ts` (finding 3 only: the tables and the inventory), every proof under
`tests/src/styles/elements/` (finding 3: importing the tables), `tests/src/styles/tokens.test.ts`
(finding 4 only), `tests/src/styles/reset.test.ts` (finding 5), `cl3-report-3.md`.
Off-limits: everything else, including every other CL3 file, `_tokens.scss`, `src/core/**`,
`tests/setupBrowser.ts`, `tests/setupConformance*.ts`, and the vendored files.

## Execution

1. Finding 4, then finding 1 with the red proof first (the fragment assertion red against the
   id-less `main`, green after), then the shell proof and `npm.cmd run test:app:browser`.
2. Finding 2, rebuild, and run `npm.cmd run test:src:styles`: every code-family proof green with
   no expectation edited (record the readings before and after for `code`, `samp`, `kbd`,
   `pre`, `var`: font family, size, padding, colour, background).
3. Finding 3: move the tables, update the inventory, run `npm.cmd run test:setup` red on the
   inventory (the new exports missing from the list) then green, and `npm.cmd run test:src:styles`
   green.
4. Finding 5 with the reading recorded, then the full order: `npm.cmd run format:check`,
   `npm.cmd run lint:check`, `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run test:src:styles`,
   `npm.cmd run test:setup`, `npm.cmd run test:app:browser`, `npm.cmd run test:conformance`,
   `npm.cmd run test:guides`, `npm.cmd run test:policy`, then
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` and
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser`.

## Output

Write `cl3-report-3.md` in the Veneer checkout and return it: per finding the change
as landed with its site, the mixin's name and members, the tables' names and homes, the
red-then-green pairs (command and counts), the reset reading under the unlayered important
plant, each gate's exit code and final lines on both engines, the actual `git diff --stat` and
`git status --porcelain --untracked-files=all` (CL3's paths plus nothing outside this brief's
owned set), and every plant's removal with the grep that proves it.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the mixin's name and which
members include it; the tables' names and grouping; the fragment proof's placement. Stop on: a
gate red after your own fix inside owned files; a finding whose fix needs a file outside the
owned set.

## Acceptance criteria

1. `document.getElementById('main')` is the shell's main region while mounted, proven red then
   green; the specimen's fragment resolves.
2. No two partials under `src/styles/elements/` declare the same code-family text block; the
   mixin lives in `_mixins.scss`; every code-family resolved reading is unchanged.
3. No proof under `tests/src/styles/elements/` declares a mode matrix or an expected-value table;
   each imports its table from `tests/setupStyles.ts`, whose inventory lists every new export.
4. No `console` call remains in `tests/src/styles/tokens.test.ts`.
5. The reset proof covers the unlayered important plant with the reading recorded.
6. Every gate in item 4 exits 0 on managed Chromium and Edge.
7. The status lists CL3's paths and nothing outside this brief's owned set; the plants are gone.
