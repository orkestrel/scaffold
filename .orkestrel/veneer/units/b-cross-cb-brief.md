# Unit BARE-BUTTON (`cb`) — the bare button's scope (B-CROSS, V9)

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-cb` (branch `unit/cb` from the
session head `a9dff19`). The executor that opens this brief is that subagent.

## Objective

The elements layer's calibrated button surface reaches only a button with no class and no
`data-bs-target` attribute, every button keeps the release's reboot, and each component's button form
paints as its anchor form does, per `/home/user/scaffold/.orkestrel/veneer/b-cross-cb-design-verdict.md`
(B1 to B7).

## Context

**Design.** The verdict above, and the two proposals beside this brief
(`b-cross-cb-design-planner-proposal.md`, `b-cross-cb-design-analyst-proposal.md`) for the evidence
each ruling rests on; where a proposal and the verdict disagree, the verdict wins. The finding is V9 in
`/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md`.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`;
the notes `w2-w3-note-1.md` and `w2-w3-note-2.md` beside this brief (nouns after code tokens, case
populations in setup tables, mutation logs, no scratchpad writes); skill: none. Proofs read computed
values (D45) and each named mutation's red run is retained.

**Tree.** `/home/user/veneer-cb` at `a9dff19`: Veneer `main` `86b3d46` plus the UTIL-EFFECT, UTIL-FLOW,
MODAL, TIP, and UTIL-FONT landings. OFFCANVAS, UTIL-PAINT, UTIL-SPACING, and UTIL-TEXT are in fix rounds
and land after this checkout was cut; none touches `src/styles/elements/**`.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree has its own `node_modules`. Build the styles
(`npm run build:src:styles` or `npm run build:src`) before any proof that reads the built cascade. Write
every instrument, extract, and log under the worktree's `tmp/units/` or `tmp/probe/` with the `cb`
prefix, and nothing into the session scratchpad or the system temporary directory.

## Unknowns

- The data attribute that hooks the showcase control (B4): the unit names it and records why.
- The full set of shipped component button forms: re-derive it by running the styles, app, and
  conformance projects before editing and by searching `app/browser/constants.ts` for `<button`; name
  the searches in the report.

## Scope

**Owned.** `src/styles/elements/_button.scss`; `app/browser/styles/_shell.scss` (the control rule and its
comment); `tests/src/styles/elements/button.test.ts`; `tests/src/styles/components/nav.test.ts`,
`dropdown.test.ts`, `list-group.test.ts`, `carousel.test.ts`, and `close.test.ts`.

**Shared (report-only).** `guides/veneer.md`; `tests/conformance.test.ts`; `app/browser/Showcase.ts`;
`app/browser/constants.ts` (`SHOWCASE_CONTROL`); `tests/app/browser/Showcase.test.ts`;
`tests/app/browser/integration.test.ts` (the close-control comment); `tests/app/browser/index.test.ts`
if an export name changes; `tests/setupStyles.ts` and `tests/setupStyles.test.ts` if a case table is
added. Return one `cb-shared.patch` against `a9dff19` and edit nothing there.

**Off-limits.** Every component partial; `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`,
`index.scss`; every other elements partial; `tests/setupServer.ts`; `tests/fixtures/oracle/**`;
`src/browser/**`; `src/core/**`; `configs/**`; the manifests; the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts`; `ROADMAP.md` (the Orchestrator's fold).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped
runs only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-cb/tmp/units/cb-report.md` and the same text as the final message: the
emitted cascade's `button` rules before and after; the coverage matrix (each component button form, the
properties it no longer inherits from the bare rule, the proof case, and the mutation it distinguishes);
the failing-first run of every added case against the unchanged partial; each gate's command exactly as
it ran with every argument, its exit, and its result line; the mutation log `tmp/units/cb-mutations.log.txt`
(site, command, exits, summary, failing cases); the ledger and additions rows as the gate printed them;
`cb-shared.patch`, `cb.diff`, and `cb-status.txt` under `tmp/units/`. The report states no tally of a
growable set, no temporal word, and no list item by position, and follows every code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix needs an off-limits file,
when a component's button form loses a declaration its release rule writes, or when a gate refuses a row
B5 rules. Decide, record, and carry on for the data attribute's name, the case titles, and where each
added case sits in its file.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree; `npm run check` exits 0.
2. `npm run build:src` exits 0, and the emitted cascade's universal `button` rule carries the release's
   reboot declarations alone while B1's selector carries the calibrated surface and its states.
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` over the owned
   proofs exits 0, and each added case reddens on its named mutation: the bare selector widened back to
   `button`; `font-size: inherit` dropped from the universal rule; the `[data-bs-target]` exclusion
   dropped (the non-active indicator takes the bare ring); a state branch left unscoped.
4. `npm run test:conformance` and `npm run test:guides` exit 0 with the shared patch applied in a scratch
   copy under `tmp/probe/`.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/Showcase.test.ts` exits 0 with the shared patch applied in that copy.

**Observations, not criteria.** The whole suite, `npm run test:service`, the journey, and `CAPTURE=1`
are the Orchestrator's runs at landing.

## Review evidence

`cb.diff`, `cb-status.txt`, `cb-shared.patch`, `cb-report.md`, and `cb-mutations.log.txt`.
