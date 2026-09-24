# Unit UTIL-FRAMES (`fu`) — the text-bg label polarity, the utility family's unframed states, and § Showcase

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-fu` (branch `unit/fu` from the
session head `cf5e447`). The executor that opens this brief is that subagent.

## Objective

The `text-bg-*` label follows the fill Veneer ships, every developer-written utility state has a frame that shows it, and § Showcase reads whole. The design is `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md`, rows
P9, P17, and P18, with the lens returns `/home/user/scaffold/.orkestrel/veneer/units/pv-utilities-lenses.json` (the critic's
`unframed` list names each state's selector and site).

## Context

**The work, implementation first.**
1. **P9, the label polarity.** `text-bg-info` and `text-bg-warning` keep the release's black label on
   Veneer's darker `info` and `warning` fills (about 3.6 and 4.2 to 1), while the buttons on the same fills carry
   white. The release picks each label with its `color-contrast` function against its own fill
   (`node_modules/bootstrap/scss/helpers/_color-bg.scss`); make `src/styles/utilities/_color-bg.scss` pick each
   role's label by the contrast of the fill Veneer ships, the way `src/styles/components/_button.scss` picks the
   button label, and prove the label and its contrast for every role in both modes in the color-bg style proof,
   with a mutation that restores the black label. Record the change in the ledger (shared patch).
2. **P17, the frames.** Role-link hover and focus; `link-body-emphasis` hover; the link opacity, underline offset,
   underline color, and underline opacity specimens, which exist and have no scenario; the icon links at rest,
   hover, and focus; every `focus-ring-<role>` under focus; the default focus ring at rest; and
   `.visually-hidden-focusable` revealed by `:focus-within`. Record the `xxl` step, print media, and scrollbars as
   outside the journey's variants.
3. **P18, § Showcase.** The guide's § Showcase paragraph carries garbled fragments from mechanical merges (a
   repeated "Flex beside the flex utilities" clause, a repeated list clause, and a dangling Offcanvas run).
   Rewrite the paragraph so every region appears once, in the order the showcase mounts them, and move the link
   utilities proof's § Tests link beside the Color utilities companions, the order the § Tests sentence states
   (`xo-audit-2-verdict.md` claim 3) (shared patch).

Each focus or pointer state is an element frame of its lifted specimen inside a padded wrapper, the pattern the
`nav-underline-focus` case uses, never a page frame; each pointer-held placement carries the structural guard
`expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)`; each resting state is a
`CASCADE_KEYS` row over a specimen.

**Standing conditions.**
- Other frames units run beside this one in their own worktrees and add rows and cases to the same shared files.
  Keep each edit local to the site it changes and inside this family's run of each file; every overlap merges
  three-way at landing.
- THEME owns `src/styles/_tokens.scss` and `src/styles/_theme.scss`.
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main`; it is
  outside this unit.
- The container is loaded. A timing failure is an observation you report with its command.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill: none.
Every added case runs red first against the tree without its fix, and each named mutation's red run is retained.
A test is named for what it proves, never for a row identifier. Section proofs derive their populations from the
specimen tables.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build the styles
(`npm run build:src`) before any browser proof. A capture run is
`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:<variant>*"`
with a variant from `light-1280`, `dark-1280`, `light-390`, and `dark-390`; run one variant at a time. Write every instrument, extract, and log under the worktree's `tmp/units/` or `tmp/probe/` with the
`fu` prefix, and nothing into the session scratchpad or the system temporary directory.

## Unknowns

- Whether each state can be reached in Chromium from the showcase: drive the ones the installed functions reach,
  and record any that they do not, with the reading.

## Scope

**Owned.** The utility specimen tables in `app/browser/constants.ts` (`LINK_SPECIMENS`, `FOCUS_RING_SPECIMENS`, `VISIBILITY_SPECIMENS`, `COLOR_SPECIMENS`, and `TEXT_SPECIMENS`, with their TSDoc); the utility registry rows in `tests/setup.ts` and their TSDoc; the utility driven cases in `tests/app/browser/integration.test.ts`; the utility section proofs under `tests/app/browser/sections/`; `src/styles/utilities/_color-bg.scss` and its style proof; `tests/setup.test.ts` and `tests/app/browser/Showcase.test.ts` where a registry or specimen change makes a case false.

**Shared (report-only).** `guides/veneer.md` (the `text-bg` ledger row, § Showcase, the utility sections a specimen changes, and § Tests). Return one `fu-shared.patch` against `cf5e447` and
edit nothing there.

**Off-limits.** every other partial under `src/styles/**`; every other specimen table; `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`;
`tests/fixtures/oracle/**`; `src/browser/**`; `src/core/**`; `tests/src/browser/**`; `tests/src/core/**` (D43);
`configs/**`; the manifests; the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`;
`ROADMAP.md`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only;
a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-fu/tmp/units/fu-report.md` and the same text as the final message: each row's
change, its specimen or scenario, its frames by path, and its proof with its red run; each state recorded as
unreachable with its reading; each gate's command exactly as it ran with every argument, its exit, and its result
line; the mutation log `tmp/units/fu-mutations.log.txt`; `fu-shared.patch`, `fu.diff`, and `fu-status.txt`
under `tmp/units/`. The report states no tally of a growable set and no temporal word, and follows every code
token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a row needs an
off-limits file or a cascade change the brief does not name. Decide, record, and carry on for specimen labels,
scenario stems, case titles, the order of added rows, and where each case sits.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. Each added proof reddens on its mutation.
3. `npm run build:src` exits 0, the color-bg proof reads every role's label and reddens on its mutation, `npm run test:setup` exits 0 with the added registry rows, and the utility section proofs and `tests/app/browser/Showcase.test.ts` exit 0.
4. A `CAPTURE=1` run at `light-1280` and at `dark-390` writes every added frame and passes the journey.
5. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `fu-shared.patch` applied.

**Observations, not criteria.** The other capture variants, the whole suite, and `npm run test:service` are the
Orchestrator's at landing.

## Review evidence

`fu.diff`, `fu-status.txt`, `fu-shared.patch`, `fu-report.md`, `fu-mutations.log.txt`, and the frames
the report names.
