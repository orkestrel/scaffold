# A6 audit — viewer freshness (fix-round law: writer was Opus, auditor is Sol)

## Role and engine

`analyst`, engine **GPT-5.6 Sol** via the journaled codex CLI. Read-only correctness audit.
You never implement, reconcile, or accept. Your verdicts advise the Orchestrator.

## Subject

Commit `bdb5d7c` in `/workspace/supervisor` (range `311c9b5..bdb5d7c`, 11 files,
+425/-66). One unit plus its serial integration: a run that self-completes must be reported
by the open viewer from its own stream ending; `terminal` derives from the snapshot.

Read the actual diff first: `git -C /workspace/supervisor diff 311c9b5..bdb5d7c`.
Baseline at 311c9b5 was green: app:browser 449/449, integration 14/14, app:server 216/216.
At bdb5d7c: app:browser 452/452, integration 15/15, app:server 217/217, `npm run check` green
(Orchestrator-run; you may re-run scoped read-only checks but not the browser suites — they
need the display stack and their budget belongs to the acceptance chain).

## Context

- `AGENTS.md` non-negotiables and design laws bind (no `any`/`as`/`!`/suppressions; derive
  state; absence is `undefined`; single-word entity APIs).
- The ruled mechanism (both design lanes, reconciled): on a current-generation, non-aborted,
  CLEAN stream end, ONE authoritative `inspect` replaces the snapshot; `Operator.terminal`
  computed from `isTerminalStatus(snapshot.workflow.status)`; stored `#terminal` flag deleted;
  roster never feeds the snapshot; `ApplicationTail.terminal` retained only if its ripple
  exceeds the unit's owned list.
- The writer's ripple measurement found unowned consumers (MCPProjection.ts:137 `closed`
  fact, ApplicationHandlers.ts:303 journal route key, helpers.ts:225,314, seeders, guides)
  and retained the field. `Operator` no longer reads `tailed.value.terminal` anywhere.
- Writer's finding F3: the `signal.aborted` clean-end guard is not independently falsifiable
  through public API because `#invalidate()` both aborts and bumps the generation; the
  negative test covers the observable rule (a released subscription reads nothing).

## Claims to falsify (verdict each, with file:line evidence)

1. The clean-end refresh fires exactly once per clean end, only under a current generation
   and a non-aborted signal; an aborted or stale-generation end cannot refresh.
2. `terminal` has no stored copy anywhere in `app/browser`: it is computed from the retained
   snapshot's workflow status, and no code path assigns or caches a second terminal fact.
3. The subscribe decision in `open` and the header read the SAME derived fact; no remaining
   read of `tailed.value.terminal` or any tail-carried terminal fact exists in `app/browser`.
4. The integration proof drives a real workflow to self-completion through the real broker
   with no injected terminal frame anywhere in the test or its setup, and asserts the open
   viewer reports the finished run.
5. The negative holds: after `logout()`/release, no further inspect occurs and `live` is
   false — and the guard implementing it matches claim 1's conditions.
6. The serial integration is internally consistent: ContentPane.vue renders "This run has
   finished" under `operator.terminal` alone; ContentPane.test.ts's FINISHED fixture reaches
   that state only through a terminal snapshot; no test or component still carries the old
   "finished before it was opened" sentence or the tail-flag fixture shape.
7. The two guide edits in `guides/src/supervisor.md` state only what the code does: the
   re-inspect trigger list matches Operator's actual triggers, and the `terminal` paragraph's
   derivation claim matches the implementation. No backticked API name in the touched
   paragraphs fails to resolve.
8. The new app:server test proves the closure barrier (viewer close precedes a terminal
   inspect answer for a self-completed run) rather than asserting a fact the fixture injected.
9. The diff introduces no `any`, `as`, non-null `!`, suppression comment, mock, behavioral
   fake, module replacement, or fake clock, and no new public API symbol.

## Scope

Read-only. Owned evidence: the diff range, `app/browser/**`, `app/core/types.ts`,
`app/server/**` (read), `tests/**` (read), `guides/src/supervisor.md`. Run only read-only
commands (`git diff/show/log`, `grep`, file reads). Do not run the browser suites, format,
lint `--fix`, build, or any write.

## Execution

Perform the audit directly and spawn nothing. Journal your run under
`/workspace/supervisor/tmp/codex/` and return the journal path and session id with the result.

## Output

Numbered verdicts 1-9, each `CONFIRMED` or `REFUTED` with `file:line` evidence, one line of
reasoning each; any finding outside the claims as `F<n>` with evidence and a proposed carrier;
then exactly one terminal line: `AUDIT: PASS` (all confirmed) or `AUDIT: FAIL <claim numbers>`.
No process diary.

## Deviation contract

If the diff range cannot be read or a claim cannot be evaluated read-only, stop and report
which claim and why. Ancillary judgment calls (how deep to grep) are yours.
