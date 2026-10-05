# Review of item 16 (browser worktree `tmp/worktrees/item16`, service-worker start), Opus 5.5 reviewer, 2026-10-05

Objective lane on the fix, its tests, and the guide paragraph. Terminal: **FAIL** (the tests and the guide; the code fix holds).

- Claim 1 (cause): CONFIRMED on Edge 154. In `traffic.json` the worker attaches on the page session, waiting for the debugger, and command 16, `Runtime.enable`, gets no reply or resume within 5 s. In `traffic-green.json` the enable reply arrives only after the resume. The frame-session candidate was not involved.
- Claim 2 (`#attachWorker` ordering, `BrowserPage.ts:1403-1412`): CONFIRMED. Because `send` is async, no unhandled rejection can escape. The `#closed` and catch paths detach after resuming. Instrumentation holds: the execution context is created before the script loads. Dedicated and shared workers keep the old order with no real-Chromium proof: UNVERIFIED, referred.
- Claim 3 (a non-frame target reported by a frame session is released, `:2056-2058`): CONFIRMED in behavior. The detach goes through the reporting session. It is likely unreachable under the `iframe` filter, so the change is defensive.
- Claim 4 (tests): mostly CONFIRMED. Each case fails without its mechanism, and the real-Chromium case was red at 5,687 ms and green at 1,076 ms. One defect: a hand-made `Promise.withResolvers` wait (`tests/src/core/BrowserPage.test.ts:2116`, `:2154`), which `tests.md` § Condition forbids.
- Claim 5 (guide, `guides/browser.md:1673`): REFUTED in part. The opening sentence overclaims for "any other target" and for released targets, and "that reply waits for worker startup" carries no version.
- Referred: a "therefore" whose referent was lost; a comment line that restates the code.

Repair unit `item16fix` (worktree `tmp/codex/item16fix-brief.md`) carries the three prescriptions and the two referrals, and settles dedicated and shared workers in real Chromium.
