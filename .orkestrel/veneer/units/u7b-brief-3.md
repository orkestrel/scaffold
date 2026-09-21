# Unit U7b — fix round brief 3: the audit's implementation findings and the parity minimum

## What changed and why

This brief supersedes `u7b-brief-2.md`; that brief stands (with brief 1 it carries),
and `u7b-report-2.md` with `u7b-report.md` is the baseline. The audit round
on the brief-2 tree (claims `../u7b-audit-claims.md`) confirmed every claim except the
findings below, and the verifier's whole chain went red at `test:guides`: the guide parity case
`documents every barrel export` lists the eighteen new exports as undocumented. Brief 1 kept
`guides/**` off-limits and omitted `test:guides` from its gates — the Orchestrator's errors.
Audits cover implementation only by the user's ruling: the guide change here is the bare
minimum that makes parity pass, one Surface row per export and one method table per
behavioural interface, and nothing more.

## Findings carried

1. (analyst claim 2; reviewer claim 2) `tests/src/browser/Button.test.ts:43-67` observes the
   write order (class, then `aria-pressed`, then the event) through a `MutationObserver` on a
   `<button>` host only. Add the same `takeRecords()` ordering observation on an anchor host
   (`build('a', …)` with `role="button"`), in the same case or a sibling; red first against a
   planted reversal of the writes on the anchor path, then green, the plant restored
   byte-for-byte.
2. (reviewer 14) `src/browser/Delegate.ts:64` constructs `new Button(host)` unguarded inside the
   delegated click listener, so a host already owned (a consumer-held `Button`, or a second
   `Delegate` with an overlapping root) throws `AppError` `BUTTON_HOST_OWNED` out of the listener
   after the default was already prevented. Ruling: no error escapes the listener; a host owned
   elsewhere is left to its owner — the delegate neither constructs nor toggles it (it may still
   prevent the default, as the official data-api does unconditionally). Implement through the
   ownership the class already holds (a class-private static reader is yours to add, one word)
   or by refusing on the `BUTTON_HOST_OWNED` refusal; case it with a consumer-held `Button` on a
   `data-bs-toggle` host under a `Delegate`, and with two delegates over nested roots.
3. (reviewer 15) `src/browser/Delegate.ts:24` holds every engine it ever constructed in a strong
   `Set` for the delegate's whole life, so a document-rooted delegate in a long-lived page keeps
   every removed host's subtree reachable. Ruling: keep the `destroy()` contract (every engine
   the delegate constructed and still holds is destroyed) and prune: on each delegated click,
   destroy and drop every held engine whose host is no longer connected (`isConnected` false),
   so the set is bounded by the connected hosts plus those removed since the last click; case
   it with a host removed from the document, a later click elsewhere, and the removed host's
   engine gone (its class and attribute restored on the detached node).
4. (verifier, `test:guides`) `guides/veneer.md` documents every new barrel export at the parity
   minimum: in the surface table the readers consume, one row each for `AppError`, `isAppError`
   (core), `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_TOGGLE`, `Button`, `ButtonDetail`,
   `ButtonEventMap`, `ButtonHooks`, `ButtonInterface`, `ButtonOptions`, `Delegate`,
   `DelegateInterface`, `DelegateOptions`, `bindEventMap`, `emitEvent`, `isButtonEvent`,
   `isButtonHost` (browser), each Summary cell equal to the export's doc-block description
   paragraph as `findDrift` compares them, and a `## Methods` table for `ButtonInterface`
   (`toggle`, `destroy`) and `DelegateInterface` (`destroy`) keyed as the existing `ColorMode`
   section is; read `tests/guides.test.ts` and the existing `ColorMode` rows for the exact
   shape; write no other guide prose (U7e owns the rest).

## Role, engine, law, context, host, controls, unknowns, output, deviation contract

As in `u7b-brief-2.md`, verbatim, with the standing clause on enumerating assertions.
`HEAD` is `91e5906`; the working tree carries the complete brief-2 result, uncommitted (some
additions staged). Continue from it; do not restore or reset anything. Make no wording or
comment change beyond what the code and the parity rows require.

## Scope

As in brief 2, with `guides/veneer.md` granted for the Surface rows and the method tables of
finding 4 alone. `src/browser/Delegate.ts`, `Button.ts`, `types.ts` (a member the ownership
reader needs), and the browser proofs stay owned.

## Execution

Close the findings in order 1, 2, 3, 4, running `npm.cmd run test:src:browser` after each; then
record: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
`npm.cmd run build:src:browser`, `npm.cmd run test:src:core`, `npm.cmd run test:src:browser`,
`npm.cmd run test:setup:browser`, `npm.cmd run test:guides`,
`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser`.

## Output

Write `u7b-report-3.md` and return its content: per finding, the change and its
red-then-green pair (command and counts) with the restore proof where a plant was used; the
guide rows added (names only); each gate's final lines on both engines; the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`. Do not repeat reports 1
and 2.

## Acceptance criteria

1. Findings 1 to 3 closed with their cases green on managed Chromium and Edge; no error
   escapes the delegated listener in any case.
2. `npm.cmd run test:guides` exits 0 with the eighteen exports documented at the parity minimum.
3. Every gate in § Execution exits 0.
4. `git status --porcelain --untracked-files=all` shows only brief 2's owned set, `guides/veneer.md`,
   and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report with reports 1 and 2.
