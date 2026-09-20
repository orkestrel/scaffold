# Unit U6 — successor brief 5: a knowable settle target

## What changed and why

This brief supersedes `u6-brief-4.md` for the remainder of the unit; every section of
`u6-brief.md` stands except where this brief says otherwise. Round 3 (objective lane on
Opus, subjective lane on Astra, verifier with Edge run twice) confirmed the per-query waits, the
inverse-staging axis cases, the pointer retry, the narrowed remarks, the guide parity, and every
earlier contract, and refuted the settle claim on the same counterexample from both lanes. The
verdict is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u6-audit-verdict-3.md`;
read its § Ruling on the settle before editing. The lane reports sit beside it under ``.

The ruling: the settle has had no knowable target, so every version of "wait for the readings to
stabilise" has left a hole. Give it one, the way this layer already does for the pointer and the
capture pane: record what was observed before the first stage, and release to exactly that.

## Role and engine

Unchanged: `sol` on `gpt-6-astra` inside `codex exec --sandbox workspace-write` rooted at
`C:/Users/mikes/WebstormProjects/test`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout.

## Context

**The tree.** `HEAD` is `f49bc7f`; the working tree carries the U6 edits over the six files. Build
on it.

**Host.** Unchanged.

## Scope

**Owned.** `src/browser/helpers.ts`, `src/browser/constants.ts`, `tests/src/browser/helpers.test.ts`,
`guides/test.md`. **Off-limits.** Everything else (`src/browser/types.ts` and `tests/setup.ts`
stand as they are).

## Execution

1. **The settle (verdict § Ruling; reviewer 13; analyst claim 8).** Add
   `MEDIA_STAGE = 'data-media-stage'` to `src/browser/constants.ts` in alphabetical place, with a
   TSDoc naming the value form. In `stageMedia`, before the first send when the root carries no
   marker, read the four axes (`print`, `prefers-reduced-motion: reduce`,
   `prefers-color-scheme: dark`, `forced-colors: active`) and park them on the tester root as the
   marker's value (a compact form you choose and document). In `releaseMedia`: when the marker is
   present, re-send those recorded readings as explicit emulation (`media` from the print reading,
   the three features from the rest), wait per axis with `waitForCondition` until each reading
   equals its recorded value, then remove the marker; when it is absent, send the empty reset,
   take the first reading strictly after the send as the baseline, and wait until a later reading
   equals the baseline — never seed the streak from a pre-reset sample. Keep the exhaustion voice
   `Media emulation did not clear from the tester`. Document in the description, the guide
   `Summary`, and the `Bounds`: a release returns the readings the first stage observed, kept as
   explicit emulation; a release with nothing staged clears every override and waits for a stable
   reading, which is stable rather than proved to be the engine's own; the budget is checked
   between polls, so a frame that never paints is not bounded by it. Prove: the all-axis
   immediate-read case still passes; a provider-staged inverse survives a stage-and-release round
   trip and reads its staged value after the release (a case that the old clearing contract would
   fail); a release with nothing staged reads a stable value.
2. **Read each option once (reviewer 11, 19; claim 3).** `const print = options.print` and
   `const motion = options.motion` at the top of `stageMedia`; every later branch reads the
   locals. Delete the accessor fixture case. Record in the report, and in the guide's `Bounds`,
   that the read-back exhaustion path cannot be driven from inert input against a conforming
   engine, so its restoration is covered by review and by the shared payload code rather than by
   a case; if you find an inert way to drive it, take it and say so.
3. **Guard the restoration (reviewer 12, 18).** Wrap the refusal-path restore (`sendProtocol` and
   its wait) in its own `try`/`catch`; throw the refusal
   `Media emulation did not reach the tester: <query>` with the restore failure attached as
   `cause`, so the documented voice always reaches the caller. State in the guide that the refusal
   path can take two budgets.
4. **Pointer marker on a rejected press (reviewer 15; reviewer 14, analyst 11).** In
   `holdAccessible`, remove the marker before rethrowing when the `mousePressed` send rejects (or
   set it after the send resolves, keeping the release-on-miss ordering). Rewrite the
   `POINTER_HOLD` remark in `constants.ts`: the release removes the marker only after the button-up
   send resolves, so a rejected send keeps it for a retry. Prove the rejected press leaves no
   marker (drive a real rejection the way the round-4 release case does, with malformed
   coordinates through a hold you can reach; if the resolver's centre computation cannot be made
   malformed from data, state what you proved instead).
5. **Bounds (reviewer 16, 17).** Add to `Bounds`: a release whose park also rejects surfaces the
   park's error with the release rejection attached; a release restores readings as explicit
   emulation rather than removing every override.
6. **Gates.** `npx.cmd oxfmt --config .oxfmtrc.json --write` on the owned files; then
   `npm.cmd run format:check`, `lint:check`, `check`, `build`, `test:src`, `test:policy`,
   `test:config`, `test:setup`, `test:guides`; run `npm.cmd run test:src:browser` twice and record
   both.

## Output

Write `u6-report-5.md` and return its content: the diff summary per owned file; the
marker's value form; each new or changed case and what it proves; each gate's exit code and final
lines with both browser runs; every deviation in the usual shape. Do not restate earlier reports.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; an axis the engine refuses to re-emulate from a recorded reading (name it and the response).
Decide, record, and carry on from: the marker's value form, assertion wording, case order, TSDoc
wording within the meaning fixed here.

## Acceptance criteria

1. A provider-staged inverse survives a stage-and-release round trip and reads its staged value on
   the line after `await releaseMedia()`.
2. `stageMedia` reads each option once; no case depends on an option being read more than once.
3. The refusal voice reaches the caller even when the restoration fails (proved by review of the
   `try`/`catch` shape; state it in the report).
4. A rejected press leaves no marker.
5. Every gate exits 0 and both browser runs agree.
6. `git status --porcelain` lists the six U6 files and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the two browser-run logs.
