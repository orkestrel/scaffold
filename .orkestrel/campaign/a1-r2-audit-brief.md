# Audit round A1-R2 — falsify the A1-fix repairs (successor of A1-R1)

## Role and lane

Two blind lanes on this brief; your launch message names yours:

- **Subjective lane, deciding:** `reviewer` on Claude Opus 5, native, read-only. The fix was
  written by GPT 6 Astra; you are the engine that did not write it.
- **Mechanical lane:** `checker` on Sonnet, native, read-only.

The objective lane on Astra is not run this round: it is the writer's engine, the fix adopted the
objective findings' prescriptions, and the Orchestrator took the behavioural evidence itself
(mutation probes and readings named under "Already established"). The routing ledger records that
deviation with this reason.

Read the tree in the isolated worktree `C:\Users\mikes\WebstormProjects\agent-audit` (its HEAD is
the fix commit; the main checkout is being written by unit A2 and must not be read). Perform the
assignment directly and spawn nothing. Edit nothing. Do not hedge toward an imagined consensus.

## Subject

The chain: `337390c` (baseline) → `cef565d` (A1: the base landed; audit round A1-R1 ruled
`FAIL 3, 15, 16` plus F1–F6, recorded in
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\design-reconciliation.md`
§ "Audit round A1-R1" and § "A1-fix deviations") → the fix commit at the worktree's HEAD
("fix: cancellation owned by the readers, signal-bound error read, hostile-array guard"), landed
over three runs whose reports are `agent-audit\tmp\units\a1-fix-report.md`, `a1-fix-report-2.md`,
and `a1-fix-report-3.md` (the `tmp/` directory is not versioned; read the copies under
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\`), and whose briefs are
`a1-fix-brief.md`, `a1-fix-brief-2.md`, `a1-fix-brief-3.md` in the same campaign folder.

## What the round decides

Whether the fix is accepted and the base is the foundation unit A2 (the relay) and unit O2 (the
`OllamaProvider` rebuild) build on. A2 is already writing against it; a defect found now costs A2
a re-base, one found after O2 costs the rebuild.

## Already established — do not re-run

Verified by the Orchestrator on the host, not taken from the writer: `format:check`,
`lint:check`, `check`, and `build` exit 0; `test:src:core` 21 files / 701 tests; `test:setup` 54;
the working tree was clean at the commit. Three mutation probes
(`scaffold\.orkestrel\campaign\a1-fix-mutations.log.txt`): disabling the cancellation rule
reddens "normalizes a transport" and "replaces a caller"; removing the signal from the engine's
`readChunks` call reddens "cancels a stalled readable body on the deadline" and "refuses buffered
finish records after cancellation ends a pending read" by timeout; removing the signal from the
error read reddens "cancels a stalled 503 body within the deadline budget"; each restore is
byte-identical and green. The Orchestrator's earlier probes (`a1-probe-abort-identity.md`,
`a1-probe-cleanup-paths.md`, `a1-probe-analyst-vectors.md`, `a1-probe-pipe-abort.md`) are the
readings the repairs answer.

## Review evidence

The actual diff of the fix: `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a1-fix-diff.txt`
(`git diff cef565d HEAD`) and its stat `a1-fix-diffstat.txt`; the status after the commit is empty.
The source at the fix commit is in the worktree. Law: `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`
and `.claude\rules\{names,typescript,architecture,patterns,tests,quality,documentation}.md`. The
verdict shape is `.agents\skills\orkestrel-falsify\SKILL.md` § "Verdict shape".

## Numbered falsifiable claims

`CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is
`UNRESOLVED` with what would settle it; a claim whose only evidence is the writer's report is
`UNRESOLVED`.

1. **The cancellation rule is the ruled one and nothing wider.** In `AgentProvider.stream`'s
   catch, an error seen while the combined signal is aborted becomes `ProviderAbortError` with the
   locally accumulated partial whatever object was thrown, and an error seen while it is not
   aborted propagates unchanged — a remote `ProviderAbortError` thrown by `read` included. No other
   branch exists, and no refusal was widened: the pre-fix pins on the deadline, the mid-body cancel,
   the early `return()`, the `strict` failure, and the non-OK response still hold in substance.
2. **The readers own cancellation.** `readChunks(body, signal?)` and `readText(body, limit?, signal?)`
   register one `abort` listener that cancels their reader with `signal.reason`, remove it on every
   exit, cancel before the first read when the signal is already aborted, and keep their prior
   behaviour when no signal is given; `pipeThrough` is gone from `AgentProvider.ts`; the engine
   checks the combined signal after the read loop so `finish` never folds after a cancel, and after
   the non-OK read so a cancelled error read surfaces as the abort, not as an HTTP error.
3. **The hook seam is a real seam, not test scaffolding.** `ProviderOptions.headers` receives the
   call's combined `AbortSignal`, the TSDoc says what it is for (bounding a token refresh by the
   same deadline), every existing hook that ignores its argument still typechecks and runs, and the
   `RelayProviderOptions` and `OllamaOptions` consumers need no change. The fixture hook records
   the signal it received and the three hook-exit assertions read that object; `RecordedSignals`
   and every assignment to `AbortSignal.any` are gone; `tests/setup.ts` imports no `node:` module.
4. **`isMessage` is total against a hostile array.** Elements are validated through `arrayOf`
   from `@orkestrel/contract`; an array with an own `every` returning `true` is refused for both
   `images` and `calls`; the throwing-proxy and revoked-proxy cases stay `false`; every fixture the
   compiled message contract accepts is still accepted; a function-valued `arguments` is still
   accepted by the domain guard.
5. **The runtime fold matches its sibling.** `Agent.ts` folds an abort partial's `thinking` only
   when non-empty, exactly as it folds a result's, and nothing else in `Agent.ts` changed.
6. **The error taxonomy is documented and honest.** `ProviderErrorCode` is
   `'HTTP' | 'PROTOCOL' | 'PROVIDER'`, each arm documented inline in the `ConversationError` form
   naming what raises it; `ProviderError` carries an `@remarks` and documented `code` and `status`
   members; `'LIMIT'` appears nowhere under `src` or `tests`; `RelayOptions.limit`'s TSDoc says the
   handler answers `413`.
7. **One word, one concept.** `RelayProviderOptions.parser` is the factory option; `frame()` is the
   seam's method; `RelayFrame` is the wire record; no `frame:` member remains in `types.ts`.
8. **The base teaches extension.** `AgentProvider`'s `@example` declares a minimal subclass with
   `name`, a `super({ url, path })` call, and `frame`, `body`, `read`, `finish`; its `@remarks`
   names the five members a subclass fills and the `split` and `strict` switches.
9. **The constant and the overshoot are pinned as documented.** `MAX_ERROR_BODY_LENGTH` is pinned
   to `2048`; a non-OK body delivering one 8192-byte chunk yields an excerpt bounded to the constant,
   the source cancelled, and exactly one chunk delivered — the documented one-chunk overshoot, named
   as such in the test.
10. **Tests live with their subject.** `helpers.test.ts` holds one `joinThinking` block; the
    blocks the round-1 reviewer named (`provider stream helpers`, `record cancellation`,
    `provider call boundaries`) are split, moved, or renamed for the behaviour they scope; no
    assertion was weakened, no `.skip`, `.todo`, conditional skip, or retry added.
11. **No regression in the accepted A1 surface.** Every A1-R1 `CONFIRMED` claim still holds on the
    fix commit; the `types.ts` additions still equal the ruled contract in `plan.md` § "The ruled
    contract" as amended (the `headers` signature, the `parser` option, the three-arm error code);
    the diff contains no `any`, no assertion other than `as const`, no `!`, no suppression, no
    access modifier, no parameter property, no nested function declaration, and no module-scope
    declaration beside a class.
12. **Would you ship this base?** As a whole — the class, its seams, its errors, its helpers, its
    shapes, and its tests — it is coherent, plain enough for a provider author to extend from the
    guide alone, and carries no accumulated damage across three fix runs (a leftover fixture, a
    duplicated case, a comment describing the pipe that no longer exists, a test named for a
    control label).

## Unknowns

- Whether the fixture hook's recorded signal and the transport's recorded signal are the same
  object on the successful-hook path (the writer states so); a lane that finds them to differ
  names the test and the two objects.

## Threshold

A substantiated finding is worth more than a clean pass: A2 and O2 inherit this base. An
unsubstantiated attack belongs under "Attacked and held" or as an `UNRESOLVED` vector for the
Orchestrator.

## Output

Exactly the `orkestrel-falsify` verdict shape: `Lane:` first; verdicts 1–12 in order, each
`CONFIRMED` (with the attack that failed), `BROKEN` (input, state, or interleaving plus the
smallest correct fix), or `UNRESOLVED` (with what would settle it); findings outside the claims
substantiated to the `BROKEN` standard; "Attacked and held"; one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. No
process diary.
