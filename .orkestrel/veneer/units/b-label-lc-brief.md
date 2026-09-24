# Unit LABEL (`lc`) — each fill's label by the release's contrast rule, and the state direction following it

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-lc` (branch `unit/lc` from the
session head `ac74459`, which carries THEME and Veneer `main`'s `afae42c`). The executor that opens this brief
is that subagent. The work class is objective, which routes to `sol` on Astra; the proofs run in Chromium,
which the bench sandbox cannot launch, so the unit runs native (recorded in the design verdict).

## Objective

Every filled site whose release value is a `color-contrast` pick carries the label the release's rule picks
against Veneer's own fill in each mode, and every hover and active tier moves in the direction that label
names, while the bare-button veil keeps its own mixer. The design is
`/home/user/scaffold/.orkestrel/veneer/label-contrast-design-verdict.md`, rulings L1 to L9; the two proposals
beside it (`units/label-contrast-design-planner-proposal.md` and `units/label-contrast-design-analyst-proposal.md`)
carry the measured tables. Where a proposal and the verdict disagree, the verdict wins; stop and report rather
than resolve a conflict the verdict does not settle.

## Context

**The work, implementation first, in this order.**
1. **The rule (L1, L2).** In `src/styles/_tokens.scss`, the `primary-rgb` and `secondary-rgb` entries of the
   `$light` and `$dark` maps become Sass lists, and the mode-independent roles' triplets move into a `$channels`
   map that the `:root` block emits from; the emitted `--vn-color-*-rgb` text stays byte-identical (compare the
   built `dist/src/styles/index.css` before and after, and retain the comparison). Add the candidate map (the
   white and black palette entries' CSS values to their triplets) and the named exceptions (`light`, `dark`).
   In `src/styles/_mixins.scss`, add the `luminance`, `ratio`, and `contrast` functions and the function that
   writes a mode pair as one value when the picks agree and as `light-dark(<light>, <dark>)` when they differ.
   No color literal is written outside `_tokens.scss`.
2. **The buttons (L3, L5, L6).** In `src/styles/components/_button.scss`, the `@each $role in tokens.$roles`
   loop drops its fixed `$foreground` local: each `.btn-{role}` label declaration and each `.btn-outline-{role}`
   hover and active label reads the role's pick, and each hover and active fill mixes toward the role's endpoint
   (the `$light` map's `state-mixer` value for shade, the white palette entry for tint) at the unchanged
   `--vn-state-hover` and `--vn-state-active` weights. The bare `.btn` hover and active background keep
   `var(--vn-state-mixer)`, and `src/styles/elements/_button.scss` is untouched.
3. **The other sites (L6).** `src/styles/utilities/_color-bg.scss` drops `$dark-labels`; each `.text-bg-{role}`
   `color` reads the pick with its `!important` kept. `src/styles/components/_validation.scss`: each
   `.{state}-tooltip` `color` reads the pick. `src/styles/utilities/_link.scss`: each `.link-{role}` `:hover`
   and `:focus` color and underline color move 20% from the role's color toward the direction its pick names,
   the release's `$link-shade-percentage`, with `--bs-link-opacity` and `--bs-link-underline-opacity` still
   scaling them.
4. **THEME's carried findings (F1, F2 of `units/ct-audit-verdict.md`), in the files this unit owns.**
   - F1: the `_tokens.scss` comments that say every non-primary role reaches its dark tiers through the mix
     and the border anchor, and that the anchor is what every dark role's border mixes against, exclude the
     `light` and `dark` roles, which take the release's gray tiers through `$retuned`; the map header says a
     literal is either an Elements reading or a Bootstrap value its own comment derives.
   - F2: the `$retuned` walk, written in both the `_tokens.scss` `:root` block and the `_theme.scss` mode scope,
     moves into the `theme-tokens` mixin; the dark secondary fill and its `--bs-secondary` and
     `--bs-secondary-rgb` aliases are emitted beside the primary's inside the mixin; the mixin's contract
     comment reads true. The built cascade's declarations stay the same set per scope (retain the comparison;
     a changed order inside one rule is recorded, not a defect).

**The proofs (L8), each red first against the tree without its fix, each mutation's red run retained.** The rule
fixture (the release's `$theme-colors` triplets against the release's own `.text-bg-*` colors, with `#0d6efd` as
the boundary); the floor in each mode for every filled, outline, `text-bg-*`, and tooltip state; the direction
in each mode; the agreement between each `.text-bg-{role}` and its `.btn-{role}`; the islands (black in a dark
island, white in a light island nested in it, white on a button carrying its own light attribute); the veil
(`BUTTON_BARE_CASES` green unedited, plus the dark hover step of 1.4 or more); the colored links. The mutations
are the ones L8 names. Existing cases that pin a ratio the fix changes become floor and direction assertions;
the rows move in the shared patch. Case populations live in setup files (`.claude/rules/tests.md` § setup
files); a test file holds registration and assertions.

**Standing conditions.**
- THEME round 2 runs beside this unit in `/home/user/veneer-ct2` and owns `tests/src/styles/theme.test.ts`,
  `tests/src/styles/tokens.test.ts`, `tests/src/styles/components/alert.test.ts`, `tests/setupServer.ts`,
  `tests/setupServer.test.ts`, and the Color modes section proof; if this unit's change makes one of those
  false, report the file and the case with the exact edit, and edit nothing there.
- The frames units (FOCUS-FRAME, FORMS-FRAMES, PASSIVE-FRAMES, OVERLAY-FRAMES, UTIL-FRAMES) run in their own
  worktrees and own the specimen tables, the registry in `tests/setup.ts`, and the driven cases; FORMS-FRAMES
  also edits `tests/setupStyles.ts` (the range rows). Every overlap merges three-way at landing; keep each edit
  local to its site.
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main`; it is
  outside this unit.
- The container is loaded. A timing failure is an observation you report with its command.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none.
Proofs read computed values where the browser serializes them (D45). A test is named for what it proves, never
for a ruling identifier.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141 at `/opt/pw-browsers/chromium`); the worktree's
`node_modules` is a hard-linked copy. Build the styles (`npm run build:src`) before any proof that reads the
built cascade. Write every instrument, extract, and log under the worktree's `tmp/units/` or `tmp/probe/` with
the `lc` prefix, and nothing into the session scratchpad or the system temporary directory.

## Unknowns

- Whether `sass` evaluates the functions exactly at the `#0d6efd` boundary (white at about 4.50): the rule
  fixture settles it; report the reading.
- Whether any existing case beyond the button, text-bg, tooltip, and link proofs pins a label or a state fill
  this change moves: run the styles project and report each.

## Scope

**Owned.** `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/styles/_theme.scss`,
`src/styles/components/_button.scss`, `src/styles/utilities/_color-bg.scss`, `src/styles/utilities/_link.scss`,
and the tooltip `color` in `src/styles/components/_validation.scss`; `tests/src/styles/fixtures/mixins.scss` and
a rule fixture beside it; `tests/src/styles/mixins.test.ts`, `tests/src/styles/components/button.test.ts`,
`tests/src/styles/elements/button.test.ts`, `tests/src/styles/utilities/color-bg.test.ts`,
`tests/src/styles/utilities/link.test.ts`, and the tooltip case in `tests/src/styles/components/validation.test.ts`.

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the `BUTTON_*`,
`TEXT_BG_CASES`, and `LINK_*` rows, and any table this unit adds); `guides/veneer.md` (the ledger rows L9
names, § Button states and bindings, the role tier table, the `text-bg` paragraph, the colored-link rows, and
the `light-dark()` sentence). Return one `lc-shared.patch` against `ac74459` and edit nothing there.

**Off-limits.** `src/styles/elements/_button.scss`; every other partial under `src/styles/**`; the files THEME
round 2 owns (Standing conditions); `tests/setup.ts`, `tests/setup.test.ts`, `tests/app/**`, and `app/**`;
`tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`; `tests/conformance.test.ts`;
`tests/fixtures/oracle/**`; `src/browser/**`; `src/core/**`; `tests/src/browser/**`; `tests/src/core/**` (D43);
`configs/**`; the manifests; the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and
`tests/config.test.ts`; `ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only;
a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-lc/tmp/units/lc-report.md` and the same text as the final message: the resolved
label and direction per role and mode as the built cascade and the browser read them; the byte comparisons for
the triplets and for F2; each proof with the mutation it distinguishes and its red run; the ledger rows changed;
each file outside the owned set the change makes false, with the exact edit; each gate's command exactly as it
ran with every argument, its exit, and its result line; the mutation log `tmp/units/lc-mutations.log.txt`;
`lc-shared.patch`, `lc.diff`, and `lc-status.txt` under `tmp/units/`. The report states no tally of a growable
set and no temporal word, and follows every code token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a site needs an
off-limits file, when the rule's pick for a shipped fill differs from the design verdict's table, or when a
change needs a new public token name. Decide, record, and carry on for function parameter names, the candidate
map's key form, case names, where each added case sits, and the fixture's file name.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run build:src` exits 0; the emitted `--vn-color-*-rgb` text is byte-identical to `ac74459`'s build, and
   F2's comparison shows the same declaration set per scope.
3. Every L8 proof exits 0 under the styles project and reddens on its named mutation.
4. `npm run test:setup` and `npm run test:conformance` exit 0 in a scratch copy under `tmp/probe/` with
   `lc-shared.patch` applied.
5. `npm run test:guides` exits 0 in that scratch copy.

**Observations, not criteria.** The whole styles suite, the whole suite, the capture runs, and
`npm run test:service` are the Orchestrator's at landing.

## Review evidence

`lc.diff`, `lc-status.txt`, `lc-shared.patch`, `lc-report.md`, `lc-mutations.log.txt`, and the byte
comparisons.
