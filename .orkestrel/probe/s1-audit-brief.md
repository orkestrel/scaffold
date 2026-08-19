# Unit S1 audit — falsify the runtime stage repair

## Role and engine

`reviewer` — Claude Opus 5, high reasoning effort. Unit S1 was written by GPT-5.6 Sol, so the auditor
is an engine that did not write it, per the cross-engine rule.

This lane is READ-ONLY. It carries no `Edit` and no `Write`. Every piece of executed evidence it needs
is supplied below by the Orchestrator, because a read-only lane cannot produce its own.

## Subject

Unit S1 repaired four defects in `src/server/stages/RuntimeStage.ts`:

- **A** — a skipped test produced a clean check, so a receipt was issued for a case that never ran.
- **B** — Vitest worker stdout was piped into the same `process.stdout` that frames the JSON-RPC
  channel, so a claim's test could corrupt or forge a protocol frame.
- **C** — the per-run eviction removed nothing, so runner state grew one entry per inspection forever.
- **D** — a `Case.test.path` outside every real Vitest project made `prove` throw instead of returning
  a verdict.

## Why this package makes a wrong proof worse than a crash

State this to yourself before you start, because it decides how you weigh a finding. This package
exists to issue a receipt saying a code change was proven. A crash is visible and someone fixes it. A
receipt issued for work that did not happen is believed, and it is believed precisely because the
package's whole purpose is to be believable.

So rank a defect that can produce a WRONG RECEIPT above a defect that can produce a hang, a leak, or a
crash — even when the crash looks more dramatic.

## The claims, numbered

The Orchestrator fills this section from S1's returned report before dispatch. Each claim is stated as
a falsifiable property, not as "S1 says it fixed A".

## Your posture

Attempt to REFUTE each claim. A claim you cannot break is CONFIRMED, with the evidence that convinced
you. A claim you break is BROKEN, with the exact input, state, or interleaving that breaks it and the
smallest correct fix.

Derive your attacks from what the change asserts under adverse conditions the happy path never
reaches. For this subject specifically:

- **Skip detection.** `test.skip`, `describe.skip`, `it.todo`, a `skipIf` that evaluates true, a test
  skipped at runtime by `ctx.skip()`, a file where every test is filtered out by a name pattern, an
  empty test file, and a file whose only export is a `describe` with no `it`. Which of these produce
  a clean check? Each one that does is a receipt for a case that never ran.
- **Stream isolation.** A test that writes to `process.stdout.write` directly, one that writes with no
  trailing newline, one that writes something that PARSES as valid JSON-RPC for an id the client is
  waiting on, one that writes a very large payload, and one that writes from a `setTimeout` after the
  test body returned. Also: if the replacement stream is in-memory, what bounds it? An unconsumed
  in-memory stream is a leak wearing a fix's clothing.
- **Eviction.** The measurement S1 reports is over 15 inspections. Ask what it did not measure:
  distinct paths versus one repeated path, a failing inspection versus a passing one, an inspection
  that throws part-way, and whether anything grows that the counted maps do not cover.
- **The `+2` that stays flat.** S1 reports module-graph setup reaching `+2` on the first inspection and
  staying flat. Ask whether `+2` is genuinely shared setup or whether it is two entries that happen not
  to grow under the workload measured.

## What to check beyond the four defects

- **Reaching into a dependency's internals.** S1 reports that Vite's public `onFileDelete` hook
  disconnects imports but does not remove module-graph map entries, and that it therefore deletes those
  nodes and their edges directly. Rule on this. A repair that reaches past a dependency's public
  surface is a maintenance liability that breaks silently on upgrade. Is there a public route? If there
  is not, is the reach minimal, documented at the call site, and covered by a test that would fail
  loudly rather than silently when Vite changes shape? Say plainly whether you would ship it.
- **The no-suppression law.** `AGENTS.md` forbids `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, and
  `eslint-disable`. S1 hit `no-control-regex` in its stdout proof. Confirm it fixed the cause rather
  than suppressing it, and that no suppression entered any file.
- **The fenced test.** `tests/src/bin/main.test.ts` contains `records the arming dependency leak when
  the entry is killed during boot`. S1 was told that test is not its and that reddening it is a
  deviation. Confirm its assertion and its name are unchanged.
- **Test isolation.** Four server test files share one `tmp/probe/` directory and `test:src` runs
  projects in parallel with no parallelism guard. Confirm no test S1 wrote or changed asserts that
  `tmp/probe/` is empty or asserts anything about that directory's whole contents. The correct form is
  asserting that the files the test itself created are gone.
- **Assertions that cannot fail.** For each new test, ask what value would make it red. A test asserting
  a count stays at `+0` passes trivially if the thing it counts is never populated. Confirm each proof
  was observed red before the fix, and that the red was the assertion the test names rather than a
  collection error or an import failure.

## Evidence supplied to you

The Orchestrator attaches, before dispatch:

- the full `git diff` of S1's change,
- `git status --short`,
- S1's returned report in full,
- the output of the five gates run by an independent verifier.

Rule on the diff and that evidence. Do not ask for a command to be run; name what you would have run
and what result would change your verdict, and the Orchestrator will run it and return to you.

## Scope

Read-only. You own no files and edit nothing. You may read anything in `/workspace/probe`.

## Execution

Perform this assignment directly. Spawn nothing.

## Output

For each numbered claim, exactly one block:

```text
CLAIM <n>: CONFIRMED | BROKEN | UNPROVEN
Evidence: <the file:line spans and quoted code that decided it>
Break: <the exact input, state, or interleaving — only for BROKEN>
Fix: <the smallest correct repair — only for BROKEN>
```

Then:

- **Beyond the claims** — findings outside the numbered list, strongest first, each with file:line.
- **Ruling on the Vite internals reach** — ship or do not ship, with the reason.
- **What you could not attack** — claims you could not falsify either way, so the next round knows what
  has already been tried.

End with exactly one terminal line: `VERDICT: PASS` or `VERDICT: FAIL`.

Do not manufacture a finding. An all-confirmed round is a legitimate result. If you find nothing, say
so and put the claims on trial instead: state whether any of them could have been falsified by the
evidence this round actually had, because a claim that could not be is descriptive rather than
falsifiable, and that is a finding about the brief.
