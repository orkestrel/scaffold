# Audit: the test 0.0.8 chain

## Role and engine

Two blind lanes, dispatched in parallel, neither shown the other's answer:

- Subjective lane: role `reviewer`, engine Opus 5, native subagent, read-only (Read/Grep/Glob).
- Objective lane: role `analyst`, engine GPT-5.6 Sol, journaled `codex exec`, sandbox
  `workspace-write` rooted at `C:/Users/mikes/WebstormProjects/test`. Probes go under `tmp/`
  and are removed after reading; owned files are never edited.

Each lane performs the assignment directly and spawns nothing. The reviewer rules from source
plus the supplied diff and status; where a claim needs an executed reading the reviewer cannot
take, it marks the claim UNRESOLVED and names the settling command. The analyst may execute
scoped probes and scoped suite runs, and reports any timing-sensitive or whole-suite result as
an observation with both readings — the Orchestrator's host runs are authoritative.

## Objective

Falsify the claims below about the test package's 0.0.8 surface. Verdict per claim:
CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED, each with evidence. The verdict shape,
including the single terminal line, is fixed by
`.agents/skills/orkestrel-falsify/SKILL.md` — read it first.

## Context

- Subject checkout: `C:/Users/mikes/WebstormProjects/test`. The audited surface is the
  working-tree diff over commit `60e23dc`, captured to
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/audit-test-diff.patch`
  (supplied for the read-only lane; the working tree itself is current).
- Working-tree status at capture (evidence for the reviewer, verified at launch):
  SEE "Launch evidence" at the end of this brief.
- Governing documents, read before ruling: `AGENTS.md`, `.claude/rules/names.md`,
  `.claude/rules/typescript.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`,
  `.claude/rules/documentation.md`, `guides/test.md` in the subject checkout.
- Authorship, so each engine attacks the other's work at full strength and its own harder:
  `src/server/helpers.ts` `createLink` and the core helper set
  (`waitForCondition`/`retryUntil`/`waitForEvent`/`decodeJSONLines`) are Sol's work; the
  server additions (`isRunning`/`waitForSocketClose`/`destroyScratch`), the browser surface,
  the proofs, and the guide are Opus's work.
- Host facts: Windows 11, Git Bash, `npx.cmd` (PowerShell blocks `npx.ps1`). Junction
  semantics measured on this host: `lstat` reports a junction as a symbolic link; a junction
  to a file is silently broken; a relative symlink source denotes against the link's parent.
  The bench sandbox denies network and grandchild processes.

## The claims

1. `createLink(path, source)` tries `symlinkSync` first; only an `EPERM` fault enters the
   junction fallback; any other fault rethrows untouched. In the fallback, a relative
   `source` is resolved against the link path's parent before `statSync`; a resolved source
   that is not a directory rethrows the ORIGINAL `EPERM`; a directory source creates a
   junction at `path`. The tests pin each branch.
2. Every public symbol added for 0.0.8 is declared in the matching `*/types.ts`, interface
   properties and returned collections are readonly, entity members are single words, and
   module-scope helpers are `{verb}{Noun}`. No public symbol bypasses the environment barrel.
3. `waitForCondition`, `retryUntil`, and `waitForEvent` honour their `WaitOptions` and
   `RetryOptions` contracts: default budget and interval as the guide states, abort through
   `signal`, and a failure message that carries the caller's `description`. `waitForEvent`
   subscribes once and unsubscribes on every exit path.
4. `decodeJSONLines` frames per its documented rule, and its tests pin CRLF, lone-LF, and
   partial-trailing-line inputs. Any claim the guide makes about lone-CR framing is true of
   the code.
5. `isRunning`, `waitForSocketClose`, and `destroyScratch` match their types and guide rows.
   `destroyScratch` retries the transient Windows unlink faults its TSDoc names and rethrows
   anything else.
6. The browser readers (`readRole`, `readName`, `readStates`, `readText`) agree with the
   exported role constants' membership, and the constants the code consults are the constants
   the barrel exports.
7. `contrast(element, floor?)` implements the reconciled strict-by-floor-identity rule;
   `readBackdrop(element, floor)` blends per the documented compositing rule; `measureContrast`
   and `measureLuminance` agree with the WCAG formulas their TSDoc cites.
8. The capture set (`stagePane`, `releasePane`, `captureFrame`, `CAPTURE_PANE`) releases the
   pane on every exit path, including a mid-capture fault, and `FrameOptions` is honoured.
9. `createJournal` forwards console entries while started, stops cleanly, and leaves no
   listener attached after `stop`. `clearStorage` and `extractOrphans` do what their guide
   rows claim and nothing more.
10. No new proof uses a mock, behavioral fake, module replacement, framework spy, or fake
    clock. Every proof drives the real implementation.
11. Guide parity and prose truth: every public export is documented, every backticked name in
    `guides/test.md` resolves to a real public export, the flagship fences run in
    `tests/guides.test.ts`, and each narrative or Limits sentence claims only what the code
    earns. Attack the prose as prose: a sentence drafted for a design that lost, or written
    more confidently than the code, is a finding.
12. The skip inventory is honest: every gated or skipped case names a real absent host
    capability, and no gate silences the defect it exists to catch. (Totals are supplied
    under "Launch evidence"; the lanes rule on the gates' logic, not on timing.)
13. The manifest is release-ready except for what release prep owns: version still `0.0.7`,
    no `file:` or tarball reference in `dependencies`/`devDependencies`/`peerDependencies`,
    exports map and `files` cover the new surfaces, and `prepack` runs the build. A missing
    `prepack` line is a finding assigned to release prep, not a BROKEN verdict, if the line
    is absent at your reading.
14. The helpers adopted from the supervisor project are generalized: no supervisor-specific
    name, path, constant, or policy survives in the public surface, and nothing in the
    package imports or references that project.

## Unknowns

- Whether H-guide's final Limits wording survived its authority-conflict amendment intact —
  the guide text at your reading is the subject; rule on what is there.
- Lone-CR behaviour of `decodeJSONLines` was measured through `readline` on this host but the
  shipped decoder may not use `readline`; claim 4's last sentence is conditional on what the
  guide asserts.

## Scope

- Subject files: the working-tree diff named earlier plus every file it touches.
- Off-limits for both lanes: editing any subject file; `git checkout`/`restore`/`stash`/
  `reset`/`clean`; commits; installs; credential reads. Analyst probes live under `tmp/` in
  the subject checkout and are deleted after their reading is recorded.

## Output

Numbered verdicts in claim order, each with its evidence (executed output for the analyst,
source citation for the reviewer); findings outside the claims; one terminal line:
`VERDICT: PASS|FAIL — <n> broken, <n> unresolved, <n> not-evidenced, <n> findings outside the claims`.
No process diary.

## Deviation contract

A lane that cannot reach the subject checkout, or finds the diff file missing or stale
against the working tree, stops and reports rather than ruling on a surface it cannot see.
Ancillary choices (probe naming, reading order) are the lane's own: decide, record, carry on.

## Launch evidence

`git status --porcelain` in the subject checkout at capture (2026-08-21):

```text
 M guides/test.md
D  package-lock.json
 M package.json
 M src/browser/constants.ts
 M src/browser/factories.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/factories.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/browser/factories.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/factories.test.ts
 M tests/src/server/helpers.test.ts
?? package-lock.json
```

Diff capture: `git diff HEAD > .../audit-test-diff.patch`, 389458 bytes, taken after the
status read in the same shell.

Orchestrator's host totals, taken 2026-08-21 06:14 with
`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project <name>`:
`src:core` `67 passed`, exit 0; `src:server` `107 passed | 9 skipped (116)`, exit 0;
`src:browser` `130 passed`, exit 0. The `guides` project reported `13 passed`, exit 0, in the
H-guide unit's own run minutes earlier.
