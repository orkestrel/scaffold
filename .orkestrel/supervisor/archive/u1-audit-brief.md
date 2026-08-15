# U1 audit round 1 — roster-liveness capability

## Subject

The whole U1 chain in `/workspace/supervisor` on branch `claude/orkestrel-test-package-0m1m8u`:

| Round | Claimed to close |
| --- | --- |
| U1 implement (Sol, thread 01a00068, cap-killed then resumed) | The roster capability per `tmp/redesign/u1-brief.md`: rich-entry `ApplicationRoster`, `GET /roster/live` SSE, RosterBroker/Viewer composed into LiveBroker, `Client.roster` sub-entity, one shared projection, `waiting` priced and dropped |
| U1 fix round 1 (same thread, `tmp/redesign/u1-brief-2.md`) | One Orchestrator-found defect: the roster-stream test's one-read-per-action assumption vs buffered status-transition frames; fixed as a bounded drain in the test |

Checkpoint commit under audit: `173dffa` (baseline was `3390fa0`).

## What the round decides

Whether U2 (browser RosterManager), U3 (restore), and the rail UI are built on this contract, and
whether the checkpoint stands. A defect that survives this round is inherited by every downstream
unit and surfaces as theirs.

## Already established — do not re-run (verified by the Orchestrator directly, not from the writer's report)

- In the Orchestrator's environment: `test:app:browser` 307/307 green; `test:app:server` green
  after fix round 1 (was 207/208 with exactly the read-discipline failure); full-suite result in
  `tmp/redesign/u1-gates.log` (594/595, same single cause, now fixed) plus the post-fix re-run
  pasted in the evidence file.
- Forbidden-construct sweep of the full diff: clean (single hit is an `import type { X as Y }`
  alias, not an assertion).
- `LiveFrame` does not appear in the `app/core/types.ts` diff.
- The three files outside the strict owned list are ruled in-scope fallout: `app/browser/helpers.ts`
  (exported event resolver the generalized LiveStream requires), `tests/app/setup.ts` (shared SSE
  message helper in the file that owns shared test infrastructure), `tests/setupBrowser.ts`
  (ScriptedClient stub gains the roster sub-entity — the criterion-5 consumer move).
- Sol's sandbox denied loopback listeners; its in-sandbox gate table is corroboration only. The
  Orchestrator's runs above are the executed evidence for this round.

## Review evidence

- The actual diff: `/home/user/scaffold/tmp/redesign/u1.diff` (checkpoint vs 3390fa0).
- The actual status output: `/home/user/scaffold/tmp/redesign/u1-status.txt`.
- Gate outputs: `/home/user/scaffold/tmp/redesign/u1-gates.log` (pre-fix) and the post-fix re-run
  section at its end.
- Writer reports (corroboration, not authority): `/home/user/scaffold/tmp/codex/u1-last.md`,
  `/home/user/scaffold/tmp/codex/u1-fix1-last.md`.
- Briefs: `/home/user/scaffold/tmp/redesign/u1-brief.md`, `u1-brief-2.md`.
- The tree itself at the checkpoint commit.

You are read-only: rule from the diff, the source, and the executed evidence supplied above. Where
a claim would need a probe you cannot run, return `UNRESOLVED` and state exactly what run would
settle it — the Orchestrator executes it in reconciliation.

## Numbered falsifiable claims

CONFIRMED requires naming the attack you tried that failed. A claim you cannot decide is
UNRESOLVED, not CONFIRMED — say what would settle it. Do not hedge toward an imagined consensus.

1. **Handshake-only auth.** `GET /roster/live` authenticates the cookie session at handshake and
   never re-reads credentials per frame; an unauthenticated request is refused with the uniform
   refusal; the stream being a GET cannot be driven cross-site into a state change (CSRF posture
   sound). Primary: objective.
2. **Wire truth over the run lifecycle.** A bearer-started run appears in a subsequent frame; its
   completion emits a frame without it; status transitions emit frames; two identical filtered
   rosters emit nothing; coalescing replaces only unwritten payloads and never reorders flushed
   frames. Primary: objective.
3. **Channel isolation.** The `LiveFrame` union and its parse path are untouched; the roster
   channel is its own broker/viewer pair composed into `LiveBroker`, one class per file; the
   browser has exactly one SSE parser (the generalized `LiveStream`), not a duplicate. Primary:
   objective.
4. **One projection, both doors, grants bind.** `'*'` sees all runs and a named grant sees only
   its runs on both `GET /roster` and the stream; both doors consume one projection function; the
   divergence test would actually fail if membership diverged — name a membership change it would
   not catch, if one exists. Primary: objective.
5. **Viewer lifecycle is leak-free.** `close()` ends the viewer after its admitted snapshot is
   consumed; `destroy()` settles a parked consumer as done and releases it; a parked consumer with
   no pending snapshot cannot hang; a client disconnect or server destroy releases every
   server-side viewer (none survives its response). Primary: objective.
6. **The client surface is the contract.** `Client.roster` is a sub-entity `{ read(), watch(signal) }`;
   enumerate the tree yourself for any surviving `.roster()` call site rather than trusting the
   writer's search; `CommandBar.vue` consumes the new surface with the smallest move. Primary:
   objective, with subjective on the surface shape.
7. **The `waiting` omission ruling is sound.** No existing in-memory surface offers a cheap
   unanswered-human-request count; the measured claim (a `HumanLedger` full-table ticket scan per
   publish) is true against the source. Primary: objective.
8. **Scope honesty.** The touched set is exactly the owned set plus the four flagged fallout files;
   `Operator.ts`, `src/**`, the three vendored files, `package.json`, `configs/**`, `guides/**`
   are untouched; no polling, timers, `Date.now()` loops, or forbidden constructs anywhere in the
   diff. Primary: objective.
9. **Names and placement obey the laws.** Every new public symbol (`ApplicationRun`,
   `RosterBroker`, `RosterViewer`, `ClientRoster`, `resolveLiveFrameEvent`, the new constants and
   handler types) satisfies the naming rules; types live in `*/types.ts` first; barrels are
   correct per environment; TSDoc is present and true. Primary: subjective.
10. **The red set is exactly the declared red set.** Beyond the round-1-fixed test, the only red
    anywhere in the Orchestrator's runs is guide parity, and its failing set is exactly the 16
    named exports plus the two phantom `Client.roster`-method rows — U7's carrier, nothing else
    hides in it. Primary: objective.
11. **Coherent as a whole.** As the roster capability the reconciled design describes (complete
    snapshots, rich entries without `waiting`, no polling, decay left to the browser): would you
    ship this diff? Attack accumulated damage no single hunk shows. Primary: subjective.
12. **Round 1's own ruling holds.** The bounded drain in the fixed test cannot mask a real
    removal failure — a server that never removes a completed run still fails the test loudly.
    Primary: objective.

## Unknowns

- Whether any test covers the interleaving `server.destroy()` while a viewer's consumer is parked
  mid-await. If none does, say so under claim 5 rather than inventing a verdict.
- Whether session invalidation mid-stream (logout/expiry) closes the roster stream server-side.
  If undecidable from source + supplied runs, mark claim 1 or 5 UNRESOLVED and name the run.

## The threshold

A finding here is worth more than a clean pass: whatever survives this round is inherited by U2,
U3, and the rail, and surfaces there as their defect at several times the cost. Findings fitting
no claim enter the verdict only substantiated to the BROKEN standard.

Return the exact verdict shape from `.agents/skills/orkestrel-falsify/SKILL.md` (four-valued
numbered verdicts, findings outside the claims, one terminal line). No process diary.
