# Unit item-12-fix-3 — element waits across a navigation, and the shared isolated world

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `b438c16` (`d6937be` plus the merged service-failure repairs: hidden-page actionability waits, page activation before pointer checks, the stderr pipe at teardown). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review

Opus, objective, over the snapshot `tmp/codex/review-d6937be/` (2026-10-03), saved at `tmp/codex/review-d6937be/verdict.md`: FAIL 2. Claims 1 (a close during a text wait rejects at once, in every ordering tried), 3 (task scheduling in both placements), 4, and 5 hold.

## Required

- `src/core/elements/BrowserElementManager.ts:262-270`: a navigation that lands during the `find` phase (after `DOM.getDocument`, before `DOM.querySelectorAll` or `DOM.describeNode`, or during an AX request) surfaces as a DOM-domain or AX `CDPError` that is neither `GONE` nor a context-loss match, so the wait rethrows it raw against the guide's promise that such waits resume against the destination. Retry when `this.#changes !== changes`, whatever the error, as `outline` does at `:103-107`; keep the context-loss arm for errors that arrive with no change step; a persistent real failure still rethrows once `#changes` is stable. Add a test that fails without it (a live test that starts the navigation and the wait together and repeats until a pass lands in the capture phase, or a seam that bumps `#changes` between `DOM.getDocument` and `DOM.querySelectorAll`).

## Rulings on the advisories and referrals (take each, with a test that fails without it where behavior changes)

- A1: add a test that closes a page during an element wait (it rejects at once, not at the deadline) and one that reaches the `GONE` arm; delete the guard at `BrowserPage.ts:476` that can never fire, and fold `BrowserElementManager.ts:261` into the path that already rethrows, if the review's reading holds when you check it.
- A2: `destroy()` skips the in-page cleanup because `#closed` is true and the session detaches without closing the target, so the observer, timer, and `globalThis[key]` live until the in-page deadline. Release pending in-page waits before the session detaches.
- A3: on context loss, reset element-wait readiness before parking, as the text wait clears `#dom` at `BrowserPage.ts:477`, so an absent wait never captures a half-parsed destination.
- A4: near the deadline, a retry can pass about 0 ms as the world-creation timeout (`BrowserElementManager.ts:229`, `:233`) and reject `BROWSER_CDP_TIMEOUT_ERROR`; reject `BROWSER_WAIT_TIMEOUT` when the remaining time is spent.
- A5: `BrowserDOMWait.ts:81` narrates the dropped animation-frame option; state the reason alone ("Hidden documents suspend animation frames; tasks still run.").
- The shared isolated world: `BrowserPage.ts:442` and `:1171-1188` share one `Page.createIsolatedWorld` request bound to the first caller's signal, so one wait's abort rejects every concurrent caller that joined it. Bind the shared request to the page's own release signal, never a caller's, and let each caller abandon its own wait on its own signal; add a test with two concurrent waits where aborting one leaves the other to settle.
- The guide's hidden-tab sentence: say a wake task in a hidden tab can be delayed by the browser's timer throttling (the delivered-event control measured about 987 ms for a 350 ms timer), without promising a figure.

## Gates

After the commit, run `node tmp/codex/merge-gates.ts item-12-fix-3` and read each exit code. When `test:service` fails, rerun the failing file alone and report both runs; never raise a budget. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/item-12-fix-3-report.md` and return it as your final message: per item the repair and its red and green evidence, the gate table, the commit hash, and any deviation. No process diary.
