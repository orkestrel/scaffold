# Unit B-FORMS-ASSETS — the dark theme scope stops declaring the component-owned assets (D26)

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfa`, a git
worktree the Orchestrator cuts from the session branch after the SELECT landing (the commit is
named in the dispatch message; `node_modules` installed by the Orchestrator). Perform the
assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfa` for every
command and file, and run every npm and npx command from `/home/user/veneer-bfa`. Do not commit,
push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or
`git checkout-index`; undo a plant by the exact reverse edit.

## Objective

`select-indicator` and `switch-knob` leave the `$assets` map, so the dark theme scope no longer
declares `--bs-form-select-bg-img` and `--bs-form-switch-bg` (the CHECK and SELECT partials declare
each on the release's own dark component rule), every proof and sentence that stated the theme-scope
declaration follows, a plant that re-adds one entry reddens the new assertion, and the gates in
§ Acceptance criteria are green.

## Context

**Evidence.** Read on 2026-09-23 on the session branch and the SELECT worktree (line numbers
approximate; locate each site by its text): `src/styles/_tokens.scss` around lines 153 to 168
(`$assets` maps `'select-indicator': '--bs-form-select-bg-img'`, `'switch-knob':
'--bs-form-switch-bg'`, `'toggler-icon'`, `'accordion-icon'`, `'accordion-active-icon'`; its doc
comment says "Each keeps Bootstrap's own value until the component that paints it lands its
canonical token, and `guides/veneer.md` under Tokens records the limit"); `src/styles/_theme.scss`
around lines 18 to 27 walks `$assets` in the dark scope (unchanged by this unit);
`src/styles/components/_form-check.scss` (the dark knob on `[data-bs-theme='dark'] .form-switch
.form-check-input:not(:checked):not(:focus)` reading `map.get(tokens.$dark, 'switch-knob')`) and
`src/styles/components/_form-select.scss` (the dark caret on `[data-bs-theme='dark'] .form-select`
reading `map.get(tokens.$dark, 'select-indicator')`), both landed; `tests/setupStyles.ts` around
line 2729 (`BOOTSTRAP_DARK_VARIABLES`, Bootstrap's dark `--bs-*` names, the two names among them
around lines 2782 to 2783) and around line 2802 (`THEME_DARK_ADDITIONS`);
`tests/src/styles/tokens.test.ts` around line 132, the case "re-declares every theme-dependent name
inside each mode scope" (its last assertion compares the dark scope's `--bs-*` names, read by
`collectScopeProperties` over the exact scope selector, to `[...BOOTSTRAP_DARK_VARIABLES,
...THEME_DARK_ADDITIONS]`); `tests/src/styles/theme.test.ts` around line 134, the case "carries the
dark-only component assets in the dark scope alone" (reads `--bs-form-select-bg-img` on a bare
`div`: empty in light, a data URI under dark); `tests/setupStyles.test.ts` around lines 545 to 547
(the `_theme.scss` error probe compiles with `$assets: ('probe-absent': '--vn-probe')` and
`('select-indicator': '--vn-probe')`); `tests/src/styles/components/form-select.test.ts`, the case
"paints the dark caret on the element inside a dark scope, over the one the theme scope declares"
and its comment "The dark scope declares the caret variable on itself as well…"; `guides/veneer.md`
§ Form select classes ("Both declarations sit on the element, so each outranks the value the dark
theme scope also declares for that variable, and the component rules decide the caret in both
modes."), § Form check classes ("a declaration on the control outranks any value a theme scope
passes down to it"), and § Bootstrap variables Veneer retains ("Bootstrap also retunes
`--bs-form-select-bg-img`, `--bs-form-switch-bg`, `--bs-navbar-toggler-icon-bg`,
`--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` under a dark component selector, and
declares no light counterpart at theme scope. Veneer declares each in its dark scope with
Bootstrap's own value. A light island nested inside a dark one therefore inherits the dark asset,
and the component unit that owns each one closes that.").

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,documentation,writing}.md`; D26
and D28 in `/home/user/veneer-bfa/tmp/units/decisions-round-2.md`. Skill: none. Guide:
`guides/veneer.md` (the three sentences named under Evidence; owned).

**Installed primitives.** `@orkestrel/test`: `readStyle`, `requireValue` are the readers the cases
use; `collectNestedRules` and `collectScopeProperties` in `tests/setupBrowser.ts`; add no helper.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. `prettier` must never run; `oxfmt` is the formatter.
The styles project loads `dist/src/styles/index.css`, so run `npm run build:src` before every
browser reading and after every plant and revert.

**Measurements.** `collectScopeProperties` matches the exact scope selector only (its predicate is
`normalizeSelectorText(rule.selectorText) !== wanted`), so removing the two entries removes the two
names from the dark scope's list the tokens case compares.

**Control identifiers.** none; name every test for what it proves.

**Standing conditions.** none.

## Unknowns

- Whether the guide's § Tokens carries a sentence recording the "until the component lands" limit
  beyond the § Bootstrap variables paragraph: grep `until the component` and `theme scope` over the
  guide, rule each hit, and rewrite the ones this change makes false.

## Obligations

1. **`$assets`.** Remove the `'select-indicator'` and `'switch-knob'` entries. Rewrite the map's doc
   comment to state what the map now holds: the image-valued dark variables whose component has not
   landed (the toggler and accordion icons), each declared in the dark scope with Bootstrap's own
   value until that component declares it on its own dark rule, as the check and select partials do
   for the knob and the caret.
2. **`COMPONENT_DARK_ASSETS`.** In `tests/setupStyles.ts`, directly after `THEME_DARK_ADDITIONS`,
   export `COMPONENT_DARK_ASSETS: readonly string[]` as `Object.freeze(['--bs-form-select-bg-img',
   '--bs-form-switch-bg'])` with the TSDoc "Holds the image-valued dark variables a shipped component
   declares on its own dark rule, which the dark theme scope therefore no longer carries (D26)."
   Add its export-name row and a freeze assertion in `tests/setupStyles.test.ts` beside
   `THEME_DARK_ADDITIONS`'s.
3. **The tokens case.** In "re-declares every theme-dependent name inside each mode scope", the
   expected dark list becomes `[...BOOTSTRAP_DARK_VARIABLES, ...THEME_DARK_ADDITIONS].filter((name)
   => !COMPONENT_DARK_ASSETS.includes(name)).sort()`, with a comment stating that the component-owned
   assets are declared on the component's dark rule rather than the scope.
4. **The theme case.** Retitle "carries the dark-only component assets in the dark scope alone" to
   "carries the unlanded components' dark assets in the dark scope alone and leaves the landed
   components' to their own rules"; read `--bs-navbar-toggler-icon-bg` where it read
   `--bs-form-select-bg-img` (empty in light, a data URI under dark), and assert that each name of
   `COMPONENT_DARK_ASSETS` reads `''` on the bare `div` under dark. Plant: re-add
   `'select-indicator': '--bs-form-select-bg-img'` to `$assets`; build; the case must redden on that
   assertion; reverse exactly; build; green.
5. **The select proof.** Retitle the case "paints the dark caret on the element inside a dark scope,
   over the one the theme scope declares" to "paints the dark caret on the element inside a dark
   scope", and rewrite its comment to state that the select's own rules declare the caret variable
   on the element in both modes, so a wrapper retuning the variable reaches neither mode's caret.
6. **The guide.** § Form select classes: "Both declarations sit on the element, so each outranks the
   value the dark theme scope also declares for that variable, and the component rules decide the
   caret in both modes." becomes "Both declarations sit on the element, and the dark theme scope
   declares nothing for that variable, so the component rules decide the caret in both modes."
   § Bootstrap variables Veneer retains: the paragraph names `--bs-navbar-toggler-icon-bg`,
   `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` as the variables Veneer declares
   in its dark scope with Bootstrap's own value, and states that `--bs-form-select-bg-img` and
   `--bs-form-switch-bg` are declared on the select's and the switch's own dark rules by their
   partials, so a light island nested inside a dark one keeps the dark caret and knob as the release
   does; keep the closing sentence for the unlanded components. § Form check classes: keep "a
   declaration on the control outranks any value a theme scope passes down to it" only if a theme
   scope still passes one down; otherwise rewrite it to "the theme scopes declare nothing for that
   variable, so the control's own rules decide the knob in both modes". Rule the hits of the
   Unknown the same way. Rewrap at or under 100 columns.
7. **The error probe.** `tests/setupStyles.test.ts` around line 547 compiles with `$assets:
   ('select-indicator': '--vn-probe')` as the present-key control; it stays valid because `$dark`
   still declares `select-indicator` (the select reads it); confirm by running the case and report.
8. Run `npx oxfmt --config .oxfmtrc.json --write` over the owned files.

## Scope

**Owned.** `src/styles/_tokens.scss` (the `$assets` map and its comment only); `tests/setupStyles.ts`
(the new list and its TSDoc only); `tests/setupStyles.test.ts` (the inventory row and the freeze
assertion only); `tests/src/styles/tokens.test.ts` (the one case); `tests/src/styles/theme.test.ts`
(the one case); `tests/src/styles/components/form-select.test.ts` (the one case's title and
comment); `guides/veneer.md` (the sentences named under Evidence and the Unknown's hits).

**Shared (report-only).** `ROADMAP.md` (return the closing text of the "Theme-scope select caret
and switch knob" row).

**Off-limits.** `src/styles/_theme.scss`, `src/styles/components/**`, `tests/setupServer.ts`,
`tests/conformance.test.ts`, the vendored files, and every other file.

**What asserts the state this change ends.** The tokens and theme cases, the select proof, the
setup inventories (`npm run test:setup`), the ledger cases (`npm run test:conformance`, whose rows
do not name the theme scope), and `npm run test:guides`; derived by running them, bounded by a grep
for `form-select-bg-img\|form-switch-bg\|theme scope` over `tests/` and `guides/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Validate with `npx oxfmt --config .oxfmtrc.json --check` over the owned files, `npx oxlint --config
.oxlintrc.json --deny-warnings` over the owned TypeScript files, `npm run check`, `npm run
build:src`, `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
tests/src/styles/tokens.test.ts tests/src/styles/theme.test.ts
tests/src/styles/components/form-select.test.ts tests/src/styles/components/form-check.test.ts`, all
from `/home/user/veneer-bfa`.

## Output

Write `/home/user/veneer-bfa/tmp/units/b-forms-assets-report.md` and return the same text: each
obligation with its site; the Unknown's hits and rulings; the plant record (the red message, the
green reading); the ROADMAP closing text; the gate exits with counts; `git status --porcelain`; and
deviations per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. No process
diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on the tokens or theme case reddening for a reason other than the two names, on the
plant failing to redden, and on any file outside § Scope a gate names. Decide, record, and carry on
from the comments' wording and the paragraphs' wrapping.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, the scoped `oxlint`, and `npm run check` exit 0.
2. `npm run build:src` and the scoped browser run exit 0 with every case passing, and the plant
   record shows the theme case reddening.
3. `npm run test:setup`, `npm run test:conformance`, and `npm run test:guides` exit 0.
4. `git status --porcelain` lists the owned files and nothing else.

**Observations, not criteria.** `npm run test:src:styles`; any timeout under load.

## Review evidence

The report and the diff of the owned files against the worktree's base commit.
