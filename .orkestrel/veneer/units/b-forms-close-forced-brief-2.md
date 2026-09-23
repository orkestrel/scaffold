# Unit B-FORMS-CLOSE-FORCED (`bff`), round 2 — the audit's titles, prose, the scoped density pair, and the single-block proof

Successor to `b-forms-close-forced-brief.md` (round 1, unedited). What changed and why: round 1's
audit (`bff-audit-verdict.md`) confirmed the mixin, the forms rules, the width, the proofs'
mutations, and the axis move, and faulted the case titles (they claim a colour no assertion
reads), the density case's coverage (class swatches only), several guide sentences, the mixin
comment, and the unpromoted expanded-compile probe. This round carries exactly those.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bff` (the round-1
worktree over `ccb10a7`, holding round 1's uncommitted writes, which this round builds on and never
discards; `dist/` is built). Perform the assignment directly and spawn nothing. Use absolute paths
under `/home/user/veneer-bff`, run every npm and npx command from there, and run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every forced-colours case is titled for what it reads, the density case covers the scoped
native-validity form, a committed Node case pins that the expanded cascade emits one forced-colours
block per selector, the faulted sentences carry the lanes' exact text, and the gates in
§ Acceptance criteria are green.

## Context

**Evidence.** The findings and their sites (locate each by the quoted text; lines are approximate):

```text
tests/src/styles/components/form-control.test.ts:317   it('outlines the focused control in the system highlight under forced colors, where its shadow ring is not painted'
tests/src/styles/components/form-select.test.ts:373    it('outlines the focused select in the system highlight under forced colors, where its shadow ring is not painted'
tests/src/styles/components/form-check.test.ts:342     it('outlines the focused box in the system highlight under forced colors, where its shadow ring is not painted'
tests/src/styles/components/form-range.test.ts:106     it('outlines the focused host in the system highlight under forced colors, where its thumb ring is not painted'
tests/src/styles/components/validation.test.ts:379     'keeps the system-highlight outline on a focused $state control under forced colors, because the state ring writes no outline'
tests/src/styles/components/validation.test.ts:402     it.each(FORM_ICON_CASES)('widens the $state swatch by the same icon room at any density and under a direct space override' (class swatches only)
src/styles/_mixins.scss:184-187   the forced-ring doc comment ("Emits the focus indicator a shadow ring keeps under forced colors ... such as `focus-ring`'s shadow reset ...")
guides/veneer.md:1215-1217        "The plaintext form's focus rule writes the release's `outline: 0` with no ring, so it draws no focus indicator in any mode; forced colors remove nothing there, and the rule takes no outline."
guides/veneer.md:2070             "rules include `forced-ring` beside the shadow ring they keep from the release,"
guides/veneer.md:3668-3670        "the forms proofs read under it the system-highlight outline each focused text control, select, check, and range draws."
guides/veneer.md:810-815          the § Validation classes proof paragraph (the list of what validation.test.ts reads)
tests/setupStyles.test.ts         the Node cases over compileExpandedCascade() and readCascadeBlocks (the bft precedent: the planted range case and renderRuleKey); no case counts forced-colours blocks per selector
```

The verdict is `/home/user/scaffold/.orkestrel/veneer/units/bff-audit-verdict.md`; the lane
verdicts sit beside it. `renderRuleKey`, `readCascadeBlocks`, `compileExpandedCascade`, and
`normalizeMediaCondition` are exported from `tests/setupServer.ts`.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing,documentation}.md`.
Skill: none. Guide: `guides/veneer.md` (owned).

**Installed primitives.** As round 1.

**Host.** As round 1. **Measurements.** Read each site before editing. **Control identifiers.**
Claims 4, 5, 7, F1, F2, UNPROMOTED-COMPILE-PROOF. Name a test for what it proves. **Standing
conditions.** The worktree is dirty with round 1's writes by design; `tmp/probe/` holds round 1's
instruments (leave them).

## Unknowns

none.

## Scope

**Owned.** `src/styles/_mixins.scss` (the comment only), the five forms proofs,
`guides/veneer.md`, `tests/setupStyles.test.ts` (one new Node case and its import lines only),
`tmp/units/bff-report-2.md`.

**Shared (report-only).** `tests/setupStyles.ts`, `tests/setupServer.ts`, `ROADMAP.md`.

**Off-limits.** As round 1, plus every other line of `tests/setupStyles.test.ts`.

**What asserts the state this change ends.** The five titles (Owned); the density case (Owned);
the quoted sentences (Owned); the absent Node case (Owned).

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bff-report-2.md`: the diff summary against round 1, each criterion with its
command and result line, the failing-first evidence for the Node case and the scoped density
readings, and the claims you flag as weakest. Return the same content as your final message.

## Deviation contract

Stop and report on a quoted site not found or a criterion needing a file outside Owned. Decide,
record, and carry on for the Node case's title, where it sits, and rewrapping.

## Acceptance criteria

1. The five case titles carry no colour claim: `outlines the focused control at the focus width
   under forced colors, where its shadow ring is not painted` (and the select, box, and host forms
   of it, the range's naming its thumb ring), and the validation case `keeps the forced-colors
   outline on a focused $state control, because the state ring writes no outline`; each case's
   assertions are unchanged.
2. The density case mounts, beside the class pair, a `.was-validated` form holding a resting
   swatch and a swatch made invalid through `setCustomValidity` (and valid for the valid state),
   and reads the same room, density-2, and override differences on it. Failing-first: with the
   width written as the `3rem` literal on the scoped selectors alone (split the rule in a copy,
   restore with `cmp`), the scoped readings redden while the class readings hold; record the run.
3. `tests/setupStyles.test.ts` gains a Node case, named for what it proves, that reads
   `readCascadeBlocks(compileExpandedCascade())`, groups the blocks whose normalized condition is
   `(forced-colors: active)` by `renderRuleKey`, and asserts no key holds more than one block, with
   a comment saying a caller's content shares the mixin's media block. Failing-first: with the
   button's reset emitted in a second media block (edit `focus-ring` in a copy, restore with
   `cmp`), the case reddens; record the run.
4. The sentences carry this exact text:
   - `guides/veneer.md` around line 2070: "rules include the `forced-ring` mixin beside the shadow
     ring they keep from the release,".
   - `guides/veneer.md` around line 1215: "The plaintext form's focus rule writes the release's
     `outline: 0` declaration and no ring. The plaintext form therefore draws no focus indicator in
     any mode, so forced colors remove nothing there and the rule includes no outline."
   - `guides/veneer.md` around line 3668: "the forms proofs read under it the outline's style and
     width on each focused text control, select, check, and range."
   - `guides/veneer.md` § Validation classes proof paragraph: the list ends "…the check label's
     tint, the stacking an input-group child takes, the outline a focused validated control keeps
     under staged forced colors, and the validated color control's width against the resting one
     at a doubled density and under a direct `--vn-space-24` override." with the following sentence
     unchanged.
   - `src/styles/_mixins.scss` comment: "Emits the outline a focused control draws in place of its
     shadow ring under forced colors, in the system highlight, because forced colors paint no
     `box-shadow`. A caller includes it beside its shadow. Content passed to it, such as the shadow
     reset the `focus-ring` mixin passes, lands in the same media block after the outline."
   Each rewrapped at the file's width.
5. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
6. `npm run test:setup`, `npm run test:guides`, `npm run test:conformance`, and the scoped styles
   run over `validation.test.ts` and the four control proofs exit 0.

**Observations, not criteria.** The whole `npm run test:src:styles`.

## Review evidence

The diff against `ccb10a7` and the status, this report, and round 1's records.
