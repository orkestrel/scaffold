# A6-fix — the stream's end demands a read that starts after it

## Role and engine

`sol` implementer, engine **GPT-5.6 Sol** via the journaled codex CLI, workspace-write
sandbox. Sole serial writer in `/workspace/supervisor` from clean committed baseline
**bdb5d7c**. Perform directly, spawn nothing, no commits/pushes/installs. Opus reviews this
fix afterward; your self-report is not acceptance.

## The findings this round carries (Sol audit of 311c9b5..bdb5d7c, verdicts 1 and 7)

1. REFUTED claim 1: the clean-end call at `app/browser/controllers/Operator.ts:494` runs
   `refresh()`, and `refresh()` at `:317` joins any read already in flight. A component
   refresh begun before closure (`app/browser/components/ReplyForm.vue:82` — the reader
   answering the final prompt, which is exactly what precedes completion) spans the close,
   the clean-end trigger joins that pre-close read, its answer is pre-terminal, and the
   required post-close inspect never runs. The viewer stays `running` with no further
   trigger ever arriving.
2. REFUTED claim 7 (consequence): `guides/src/supervisor.md:1962`'s promise that the stream
   ending obtains the reporting inspect is false in that window.

## The mechanism (ruled)

- Keep the join law for ordinary triggers exactly as documented at
  `guides/src/supervisor.md:1948-1951`: two triggers that fire at once join one read.
- The clean stream end is the one exception: it must guarantee at least one read that
  STARTS after the end was observed. In the clean-end path (`Operator.ts:494` region):
  drain any in-flight read first (`await` the stored reading), re-check `signal.aborted`
  and the generation after that await (state may have moved during it), then call
  `refresh()`. After the drain the reading slot is clear, so `refresh()` starts a fresh
  read — or joins one that necessarily began after the drain, which is still after closure
  and therefore reads post-barrier state (the server's closure barrier precedes stream
  close; proven at `tests/app/server/SupervisorApplication.test.ts:94`).
- No new public API, no polling, no retries, no stored flag. `#terminal` stays the computed
  it is.
- Guide: amend the two touched paragraphs so the prose states the drain rule — the stream's
  end does not join a read that began before it; it waits for that read and then asks
  again. Keep both paragraphs true to the code you land, and keep every backticked name
  resolving.

## Proof discipline

Red first, in `tests/app/browser/controllers/Operator.test.ts`: script a client whose
in-flight inspect answer is gated (deferred promise) with a pre-terminal snapshot; start a
`refresh()`; end the stream cleanly while that read is in flight; release the gated answer;
assert a second inspect is asked and `terminal` becomes true. Record the exact command and
failing count red at bdb5d7c's behavior, then green after the fix. Keep the existing
negative (aborted/released end does not refresh) green — the drain must not weaken it.

## Scope

**Owned:** `app/browser/controllers/Operator.ts`,
`tests/app/browser/controllers/Operator.test.ts`, `guides/src/supervisor.md` (only the two
paragraphs at ~1948-1951 and ~1959-1966). **Off-limits:** everything else, including
`app/browser/components/**`, `tests/setupBrowser.ts`, `app/server/**`, `src/**`, configs,
manifests.

## Acceptance criteria

1. The red/green pair above, commands and counts pasted.
2. `npx vitest run --config vite.config.ts --project app:browser tests/app/browser/controllers/Operator.test.ts` fully green.
3. `npm run check` green.
4. Scoped `npx oxfmt --check` and `npx oxlint --deny-warnings` on the three owned files clean.
5. The two guide paragraphs state the landed semantics; no backticked name in them fails to
   resolve; the join law's sentence and the exception cannot be read as contradicting each
   other.
6. No `as`, no non-null `!`, no suppressions, no new public symbol, no polling.

## Output

Touched files + diffstat; the exact clean-end code landed; per-criterion proofs with
commands and tails (red first); `git status --porcelain`; deviations or none. No diary.

## Deviation contract

If draining the in-flight read cannot close the window without changing `refresh()`'s
public contract or adding API, stop and report with the evidence — the join law and the
single-word API are not yours to move. Ancillary calls (helper naming inside the class,
exact guide phrasing) are yours to decide and record.
