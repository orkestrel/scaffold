# Unit T4 — `isReachable` models an open modal dialog

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/test` checkout. You open this brief
yourself; every later section is written for you. The unit is routed to the native lane because its
proof runs in Playwright Chromium, which the Codex bench cannot launch.

## Objective

Make `isReachable` report `false` for an element outside a visible `[aria-modal="true"]` element
that does not contain it, so the resolver, the ambiguity count, the Tab trail's population, and every
verb that inherits reachability agree with what a person meets while a modal dialog is open; prove
it with a fixture and a control; document the bound in the guide.

## Context

**Evidence.** Measured by the Orchestrator in the roughnotes checkout on 2026-09-17
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/r-a-audit-reproduction/probe-1-readings.txt`),
with Bootstrap 5.3.8's offcanvas dialog (`aria-modal="true"`, `role="dialog"`, a focus trap, a
backdrop) open at 390×844 over a masthead that stays rendered beneath it:

```text
PROBE c4 resolver masthead "Get started, Site": resolves
PROBE c4 pointer at masthead centre hits: a.nav-link.fs-4 "Publications, Site"; is the masthead or inside it: false
PROBE c4 header inert=false aria-hidden=none
PROBE c4 Tab traversal to the masthead from the open menu: Interactive target "Get started, Site" is not reachable through forward Tab traversal: BUTTON: > A:About > A:Publications > A:Products > A:Shop > A:Contact > A: …
```

The resolver counts the covered masthead control as reachable; a pointer, the keyboard, and a screen
reader honouring `aria-modal` cannot reach it. The audit's subjective lane
(`.orkestrel/campaign/r-a-audit-subjective-report.md`, claim 4 and referral R1) reads the installed
contract: `dist/src/browser/index.d.ts` documents `isReachable` as connectedness, visibility, a
non-zero box, focus order, disabled state, and `[inert]` ancestry, and stops there. The consumer had
to split one control's name in two (`Get started, Site` in the masthead, `Get started, Menu` in the
dialog) to keep resolution unambiguous — a name split the layer's model forced, not the product.

**The ruling to implement.** An element is unreachable while a visible element carrying
`aria-modal="true"` exists in the document that does not contain it. Visibility is the same reading
`isRendered`/`checkVisibility` already takes, so a closed dialog (hidden) does not exclude anything.
Nesting follows containment: an element inside the innermost open modal is inside every outer one.
Apply it inside `isReachable` itself so `resolveRendered`, `resolveAccessible`, the `ambiguous`
count, `traverseAccessible`'s population, `readRefusal`, and `clickAccessible` inherit it with no
second gate. Read `src/browser/helpers.ts` (`isReachable` and its callers) and `src/browser/types.ts`
before editing; add no option — the behaviour is the contract.

**Law.** `AGENTS.md`; `.claude/rules/tests.md`, `browser.md`, `typescript.md`, `architecture.md`,
`documentation.md`, `writing.md`; `guides/test.md` (the `isReachable` row, § Limits, § Bounds a
shipped helper carries — keep every Summary cell equal to its doc block; `tests/guides.test.ts`
asserts it). Skill: none.

**Installed primitives.** This package's own `src/browser` entry; Vitest browser mode with
Playwright Chromium (`npm run test:src:browser`).

**Host.** Windows 11; Bash; the browser project runs through `npm run test:src:browser`. Edit
through your editor tools so no non-ASCII code point round-trips through cp1252.

**Measurements.** Baseline: `1b0a800` (the 0.0.17 release commit), clean. `npm test` green at that
tip in the retained verifier reading (`.orkestrel/campaign/t-verify-report.md` in the scaffold
checkout: browser `577 passed | 9 skipped`).

**Control identifiers.** `T4-C1` through `T4-C3`. Name a test for what it proves, never for the
control label.

**Standing conditions.** `tmp/` is ignored; `tmp/pack/` holds the 0.0.16 tarball from an earlier
step; leave it.

## Unknowns

- Whether any existing browser proof mounts a fixture carrying `aria-modal="true"` beside a
  target it expects reachable. Run `grep -rn "aria-modal" tests/ src/` first and report; a proof
  that depended on the old reading is a proof of the old model and moves with the ruling.

## Scope

**Owned.** `src/browser/helpers.ts` (`isReachable` and its doc block), `src/browser/types.ts` (a
doc block alone, if one describes reachability), `tests/src/browser/helpers.test.ts` (the
reachability proofs), `guides/test.md` (the `isReachable` row, its Bounds bullet, the Limits row if
one names reachability), `README.md` only if it states the reachability list.

**Off-limits.** Everything else, including `package.json`, `dist/**`, `tmp/**`, and every file
under `.orkestrel/`.

**What asserts the state this change ends.** `tests/src/browser/helpers.test.ts`,
`tests/guides.test.ts`, and every browser proof that resolves a target beside a dialog fixture.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. Format only your owned files with
`./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <files>`; lint them scoped; never
run the tree-wide `format` or `lint --fix`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/t4-report.md` (retained as `.orkestrel/campaign/t4-report.md` in the scaffold checkout): the unknown's answer; the landed doc block and guide row; each
control's command with its red and green readings; the mutation reading (the modal clause disabled
turns `T4-C1` red and the control stays green); the gate table (scoped format and lint,
`npm run check`, `npm run test:src:browser`, `npm run test:guides`); the claims you flag as least
certain; the diff and `git status --short`. No process diary. Return, as your final message, only
"The report is written." and the path.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol (the copy in the scaffold checkout at
`C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`; this checkout carries none).
You settle the fixture's shape and the doc block's wording. Stop and report if the ruling breaks an
existing proof whose subject is not reachability, or if `isReachable`'s callers gate reachability
a second time in a way the ruling cannot reach.

## Acceptance criteria

Cheap first.

- **T4-C1.** A browser proof mounts a visible `[aria-modal="true"]` element beside a focusable
  control outside it and asserts `isReachable(control)` is `false`, `resolveAccessible(name)` for
  a control inside the dialog resolves unambiguously though a control of the same name sits
  outside, and `traverseAccessible` never lands on the outside control; red before the ruling,
  green after.
- **T4-C2.** The negative control: the same fixture with the dialog's `aria-modal` attribute
  removed, or the dialog hidden, reports the outside control reachable; green before and after.
- **T4-C3.** `npm run test:src:browser`, `npm run test:guides`, `npm run check` exit 0; scoped
  format and lint exit 0; the `isReachable` Summary cell equals its doc block and the Bounds bullet
  names the modal clause.

**Observations, not criteria.** The whole `npm test` chain.

## Review evidence

The actual diff and the actual `git status --short` output, in the report.
