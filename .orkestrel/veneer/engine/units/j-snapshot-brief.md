# Unit J-SNAPSHOT — the host snapshot's shared presence record and its write-back re-entry (E13's successors)

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot` (branch `unit/snapshot`, cut from Veneer `main` at `afae42c`, the J-HELPERS landing; E14). J-TOOLTIP and J-OFFCANVAS write beside you in their own worktrees; neither owns `HostSnapshot.ts` or its test, and you own no engine file, so the sets are disjoint.

## Objective

`HostSnapshot` closes the two bounds E13 recorded and carries in `../plan.md` § Carried findings: a presence record for the `class` and `style` attributes shared across snapshots, so an overlapping or later restoration by another engine on the same element leaves no attribute present and empty; and a write-back re-entry contract under which a `destroy()` an engine runs from a reaction to the restoration's own write leaves no write pending after it returns. Both go red first on the interleavings the audits derived, and every sentence the landings bounded is un-bounded in the same unit.

## Context

**Evidence.** `../decisions.md` E13 and its amendment (the re-entry: `restore()` takes its records and empties its collections before writing them back, and a nested `restore()` restores only the records saved since, so a `destroy()` from a reaction to the restoration's own write returns while the interrupted invocation still has writes pending); the carried rows in `../plan.md` § Carried findings ("The `class` and `style` attribute presence across snapshots…" and "`HostSnapshot.restore()`'s write-back re-entry…"); the audit records, readable with `git -C C:/Users/mikes/WebstormProjects/scaffold show fd96a0b1~1:.orkestrel/veneer/engine/units/<file>`: `j-binder-precedence-audit-objective-verdict.md` claim 1 (the interleavings A and B and the `Button`-and-`Collapse` shared trigger), `j-binder-precedence-audit-5-verdict.md` (what landed and the bounded sentences' sites), and `j-dropdown-audit-3-verdict.md` claim 1 (the counter-interleaving: a custom-element menu whose `popover` attribute reaction destroys the dropdown during the placement's restoration). The landed source on `main` `afae42c`: `src/browser/HostSnapshot.ts` (`save`, `restore`, the static `#publish`, `#writeBack`, `#take`, `#withdraw`, the per-element `#classes` and `#styles` presence maps with their save-order stamps) and `tests/src/browser/HostSnapshot.test.ts`; the contract `HostSnapshotInterface`, `HostSnapshotTarget`, and `HostSnapshotCategory` in `src/browser/types.ts` (around line 328) with the bounded sentences; the consumers (`Button.ts`, `Collapse.ts`, `Dropdown.ts`, `Placement.ts`, `Modal.ts`, `ScrollLock.ts`, `Isolation.ts`, `Tooltip` when it lands) as the realistic call patterns; the guide `guides/veneer.md` `#### HostSnapshot` (or the section that documents it) and every `####` sentence that states the bound (search `present and empty`, `pending`, `interrupted`).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md` (real browser, custom-element reactions as the real interleaving driver, the mutation each assertion distinguishes, a red reading before a new behaviour), `documentation.md`, `writing.md`; skill: none; spec: the design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` R4 (ownership and restoration) and R13 as amended.

**Installed primitives.** `@orkestrel/contract` 0.0.18; `@orkestrel/test` 0.0.22 (`createRecorder`, `waitForCondition`) and `@orkestrel/test/browser` (`mount`, `build`); `tests/setupBrowser.ts` (`scene`, `recordEvents`).

**Host.** Windows 11; Git Bash (`npm.cmd` and `npx.cmd` resolve as `npm` and `npx`); the worktree root; the browser project launches Chromium 153.0.8010.12 and every receipt names it; `npm run test:src:browser -- <file>` runs one file. The `prove` MCP server is not reachable to a subagent; record that you made no call.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The element guard is `isInstance(x, HTMLElement)` for every immediately invoked check. E6: no alias, re-export, `@deprecated` tag, or shim. `types.ts` is owned for the `HostSnapshot*` declarations only, and only where a bounded sentence is un-bounded or the contract changes for the mechanism; return every change as its own diff block. Every consumer's suite stays green without edits: the change is inside `HostSnapshot` and its contract, not in the engines. Where a consumer's bounded sentence in the guide is un-bounded, that guide sentence is yours.

**The scoped chain (the user's instruction, 2026-09-24).** Run scoped checks while you work and the whole chain once at the end: per obligation, `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts` (and one consumer file where the case sits there); before the report, `npm run check:src:browser`, `npm run check`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`, `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`, `npm run test:src:browser` (whole, once), `npm run test:guides`, `npm run test:policy`; the three builds, `test:conformance`, and `test:setup` run at the landing, not in this round. The instrument runs each row against the one test file its case sits in.

**The obligations (each an edit and a proof; red first).**

- **S1 The shared presence record.** A record per element and attribute (`class`, `style`) shared across every snapshot that saved a token or a property on that element, read at save time (present or absent when first saved) and withdrawn when the last overlapping restoration's writes are done, so the removal of an attribute that was absent is judged once, at that point, and never leaves the attribute present and empty. Red first on the two interleavings the J-BINDER-PRECEDENCE objective lane derived (A and B in its claim 1: an overlapping and a sequential restoration by another engine on one element) and on the `Button`-and-`Collapse` shared trigger (two engine classes on one host, each restoring); each asserts the attribute absent after the last restoration and every token and property restored.
- **S2 The write-back re-entry.** `restore()` publishes its pending writes so a `destroy()` an engine runs from a reaction to the restoration's own write, when it returns, leaves nothing of the interrupted invocation pending: either the nested destroy's restoration completes the interrupted writes (the records still to write are handed to the nested invocation) or the interrupted invocation reads its lifetime after each write and stops, with the nested invocation owning the rest; rule the shape from the source and record it. Red first on the Dropdown reproduction: a custom-element menu whose `popover` attribute reaction destroys the dropdown during the placement's restoration, asserting that after `destroy()` returns no write lands later (a `MutationObserver` records nothing after the return). The Dropdown suite stays green.
- **S3 The un-bounded sentences.** Every sentence the landings bounded (`types.ts` `HostSnapshotInterface`, `HostSnapshot.ts`'s remarks, the guide's `#### HostSnapshot` and the `####` sections of Dropdown, Modal, and any other consumer that states the bound) states the closed behaviour; `test:guides` green.
- **S4 The instrument.** A whole-file mutation instrument (`tmp/j-snapshot/mutations.py`, the W2 shape, each row over `HostSnapshot.test.ts` or the one consumer file) with rows: the presence record withdrawn early, judged per snapshot again, read at restore time rather than save time; the re-entry hand-off dropped, the lifetime read dropped; each `EXACT` or `JOINED`, the receipt `restored byte for byte`.

## Unknowns

1. Whether the presence record lives on the element (a `WeakMap<HTMLElement, …>` keyed per attribute, as the per-snapshot maps do today) or in the static registry `#publish` uses: rule from the source, prefer the smaller change, record.
2. The re-entry shape (S2): rule and record.

## Scope

**Owned.** `src/browser/HostSnapshot.ts`, `tests/src/browser/HostSnapshot.test.ts`; `src/browser/types.ts` for the `HostSnapshot*` declarations; `guides/veneer.md` in the HostSnapshot section and the bounded sentences S3 names; a consumer test file only where an S1 or S2 case sits there (`tests/src/browser/Dropdown.test.ts`, `Button.test.ts`, `Collapse.test.ts`), report-only otherwise; `tmp/j-snapshot/**`.

**Shared (report-only).** `tests/setupBrowser.ts`; `ROADMAP.md`.

**Off-limits.** Every engine file (`Button.ts`, `Collapse.ts`, `Dropdown.ts`, `Placement.ts`, `Modal.ts`, `ScrollLock.ts`, `Isolation.ts`, `Delegate.ts`, `Tooltip.ts`, and the rest), `Registry.ts`, `helpers.ts`, `constants.ts`, `validators.ts`, `parsers.ts`; `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/src/styles/**`, `tests/service/**`, `src/styles/**`, `app/**`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`.

**What asserts the state this change ends.** `tests/guides.test.ts` read-only, closed through the guide; `tests/policy.test.ts` read-only. Search bound: `grep -rn "present and empty\|pending\|interrupted\|HostSnapshot" src/browser guides/veneer.md tests/src/browser` at dispatch.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. No install, commit, push, or discarding git command; no tree-wide `format`, `lint --fix`, or `build`. The scoped chain above; write it to `tmp/j-snapshot/acceptance.sh` and run the file; keep each log under `tmp/j-snapshot/`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: the files touched; per obligation, what was built and the case that pins it with its red reading and its green reading, verbatim; the Unknowns' answers; every `types.ts` change as its own diff block; the mutation table verbatim; the verbatim output of every chain command; `git status --short` and `git diff --stat`; every shared-file patch as an exact diff block; the deviation state. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — on a consumer suite the change makes red for a reason inside the consumer, a contract sentence the mechanism cannot satisfy beyond the owned declarations, a shared file outside the report-only row you would have to edit, or a scoped check red you cannot close inside the owned files. Decide, record, and carry on from the order of cases, the wording of comments and guide sentences, and the placement of a guide paragraph.

## Acceptance criteria

1. `npm run check:src:browser` exit 0; `npm run check` exit 0; oxlint and oxfmt on the scoped paths exit 0.
2. `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts` green with S1's three cases and S2's case present and their red readings recorded before the fixes; then `npm run test:src:browser` whole green once.
3. `npm run test:guides` green; `npm run test:policy` green.
4. The instrument's log carries one row per S4 mutation, every named case reddening, and the receipt `restored byte for byte`.
5. The status lists only owned files; every shared-file change and every `types.ts` change is returned as a diff block.

**Observations, not criteria.** The three builds, `test:conformance`, and `test:setup`, which the Orchestrator runs at the landing.

## Review evidence

The actual diff (`git diff HEAD`) and `git status --short` of the worktree, captured by the Orchestrator as `j-snapshot.diff` and `j-snapshot-status.txt`, and the report; the audit runs `analyst` on Astra (objective: the interleavings, the record's lifetime, the re-entry), `checker` on Sonnet (mechanical), and `reviewer` on Opus (the contract's wording).
