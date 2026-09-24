# Unit TOAST (`to`), round 2 — the audit's fixes (successor of `b-modal-to-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-to` (branch `unit/to` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, and nothing else
changes: the verdict is `to-audit-verdict.md`; this brief carries each of its findings and names the
one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/to-audit-verdict.md`
and the three lane verdicts beside it (`to-audit-objective-verdict.md`, `to-audit-subjective-verdict.md`,
`to-audit-checker-verdict.md`); round 1's retained record under the same folder (`to.diff`,
`to-shared.patch`, `b-modal-to-report.md`, `to-instruments/`); the Orchestrator's settling run
`to-audit-settling.log.txt`. Where a verdict quotes a replacement sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names;
`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the round-1 brief
`b-modal-to-brief.md`, whose scope, off-limits list, standing conditions, and host facts bind this
round unchanged; skill: none.

**Installed primitives.** As round 1.

**Host.** As round 1: `/home/user/veneer-to`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.

**Measurements.** Round 1's gates, and the Orchestrator's settling run, which re-ran round 1's
mutation controls with their output retained (`to-audit-settling.log.txt`).

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: the validation copy under `tmp/probe/base/` is rebuilt for this
round from `2a3f223`, your owned files, and your revised shared patch; delete it before the report.
Sibling units still run in their own worktrees.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files.

**Shared (report-only).** Round 1's shared files; return one revised `to-shared-2.patch` against
`2a3f223` that supersedes `to-shared.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The cases each fix edits, and the sentences each fix
replaces; nothing outside round 1's files.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-to/tmp/units/to-report-2.md`: each fix below by its label with the file,
the before and after text or code, and the reading that proves it; each gate's command and result
line on the rebuilt validation copy; the mutation log for any case this round adds or edits, retained
as `tmp/units/to-mutations-2.log.txt` (the mutated site, the command, the exits, the summary, the
failing case names); the revised patch at `tmp/units/to-shared-2.patch`; `to-2.diff` and
`to-2-status.txt` captured as round 1 captured them. Delivered as that file plus the same text as the
final message. The report follows the writing rule; it states no count of a growable set.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence or case it names. Decide, record, and carry on for re-flowing
a paragraph the fix touches.

## Fixes

- **T1 (claim 5).** In the `TOAST_SPECIMENS` TSDoc `@remarks`, add: "The header title carries the
  `flex-grow-1` class where the release's markup writes the `me-auto` class, which does not ship. No
  specimen renders a colored toast, because the release writes one with the `text-bg-*` and
  `border-0` classes, and neither class ships."
- **T2 (claim 7, finding 7a).** In the Toast `plugin` row, replace the class clause with: "the `show`
  method adds the `show` and `showing` classes, and the `fade` class when animated, then removes the
  `showing` class after the transition; the `hide` method adds the `showing` class, then removes the
  `showing` and `show` classes and adds the deprecated `hide` class; the `dispose` method removes the
  `show` class", and end the row with "; no key or ARIA handling. Owner: J-ENGINE." Check each clause
  against `node_modules/bootstrap/js/src/toast.js` before writing it, and correct any clause the
  source contradicts.
- **T3 (claim 7, finding 7b, and F1).** In `### Toast classes`, replace the rung sentence with: "...which
  the `.toast` class and the `.toast-container` class each declare. The container applies the level,
  so a retune of that rung moves every container and the toasts inside it, and a toast outside a
  container declares the slot and applies no level of its own." In the `toast` variable row of
  § Compatibility, write "each one is read in `tests/src/styles/components/toast.test.ts`, and each
  one but the toast's stacking slot beside the property it drives." In the opening comment of
  `_toast.scss`, write that the engine writes the `showing` class for each fade, in and out alike,
  and that the container applies the stacking level from the toast rung, so a retune of that rung
  moves every container and the toasts inside it.
- **T4 (claim 8, token nouns).** Follow every code token the patch's guide text, TSDoc, and comments
  add with a noun: the `### Toast classes` section (for example "reads the `--vn-space-4` token", "the
  `1090` value", "the `--bs-toast-zindex` property"), the Toast `plugin` row ("the `show.bs.toast` and
  `hide.bs.toast` events", "the `delay` option"), and "the `showing` class" with the class name in
  backticks in the `CASCADE_KEYS` TSDoc. Sweep every added line for the same form, not only the cited
  sites.
- **T5 (claim 8, case population).** Remove the inline specimen-name list from the framed-geometry case
  in `ToastSection.test.ts`: derive the population from `TOAST_SPECIMENS` (the specimens whose markup
  carries a `.viewport` frame), or hold it in a frozen, exported table in a setup file. Prove the
  derivation reddens when a framed specimen is dropped from it, and retain that run in the mutation
  log.
- **T6 (the subjective lane's referral, ruled in).** In the `toast case tables` case of
  `tests/setupStyles.test.ts`, bind each `TOAST_SLOT_CASES` row's token by derivation, as the Alert
  precedent derives its token from the pixels (`tests/setupStyles.test.ts`, the alert space-case
  binding), rather than restating the literal list; prove the binding reddens when one row's token is
  edited, and retain that run.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style
   proof command, the round-1 section proof command, `npm run test:setup`, `npm run test:conformance`,
   `npm run test:guides`, and `npm run test:policy` exit 0.
3. Each fix T1 to T6 is present at its site, and T5 and T6 each carry a retained red run.
4. `to-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `to-shared.patch` only at the sites T1 to T6 name.

**Observations, not criteria.** The journey, `CAPTURE=1`, `test:service`, and the whole styles project
are the Orchestrator's runs at landing.

## Review evidence

`to-2.diff`, `to-2-status.txt`, `to-shared-2.patch`, `to-report-2.md`, and `to-mutations-2.log.txt`.
