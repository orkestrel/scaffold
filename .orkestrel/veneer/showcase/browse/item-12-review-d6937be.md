# Review of `d6937be` — item 12 repair 2, confirming pass

Lane: objective, Opus 5.5, read-only over this snapshot, 2026-10-03.

VERDICT: FAIL 2. Claims 1, 3, 4, and 5 PASS.

1. A close during a pending text wait rejects at once: `#releaseResources` aborts `#waitRelease` first (`BrowserPage.ts:985`), synchronously from every `#closed = true` site (`:731`, `:747`, `:1648`); `wait` merges that signal into `options.signal` (`:428-434`); `CDPClient.send` releases its abort listener on settle. Every ordering holds (close during `#ready`, before the evaluate is sent, during it, after it resolved; navigation then close; close then navigation). The red log shows Chromium does not answer the pending evaluate when the target closes, so the abort carries the fix.
2. Element waits a navigation interrupts: FAIL. Context loss in the parked evaluate is retried and proved; the deadline is checked (`BrowserElementManager.ts:271`); a closed page rethrows through `page.assert()` (`:261`); a departed `within` scope rethrows `GONE` from `#scopeFrame` (`:231`, `:431`). Counterexample: click a button that navigates, then `elements.wait({ css: '#spinner' }, { absent: true })`; the first `find` sends `DOM.getDocument` (`:151`); the navigation commits and replaces the document and its node ids; `DOM.querySelectorAll` (`:165`) or `DOM.describeNode` (`:175`) rejects with a DOM-domain `CDPError` ("Could not find node with given id"), or an AX request (`:324`) does; `#changes` has moved, but the error is neither `GONE` nor a `BROWSER_CONTEXT_LOSS_PATTERN` match, so `:262-270` rethrows it raw, against the guide's resume promise (line 2883). `outline` handles the same fact on `#changes` alone (`:103-107`). The exact Chromium message is UNRESOLVED by reading; the path is certain.
3. Coalesced checks on a zero-delay task, both placements: one check per burst; an event after the task ran schedules another; settle, abort, deadline, and `pagehide` clear the task; a late task returns early on the aborted release; restoring animation frames fails the controls at about 5,983 ms and 5,988 ms. The guide states the hidden CSS-only limit honestly.
4. Each added test fails for its defect (close latency, departed-root signals, bursts and the final event, element navigation).
5. Rules and wording hold; `BROWSER_CONTEXT_LOSS_PATTERN` has no `g` flag.

## Advisory

- A1: deleting the `GONE` arm (`BrowserElementManager.ts:263-267`) leaves the element navigation test green; `BrowserPage.ts:476` can never fire; `BrowserElementManager.ts:261` changes only the message; no test closes a page during an element wait.
- A2: `destroy()` leaves the in-page wait running: `BrowserPage.ts:463` skips the cleanup evaluate whenever `#closed`, and `destroy()` detaches without closing the target, so the observer, timer, and `globalThis[key]` live until the in-page deadline.
- A3: the text wait clears `#dom` before parking (`BrowserPage.ts:477`); the element wait calls `#input.ready` only; if context loss arrives before `Page.frameNavigated` updates the loader, an absent wait can capture a half-parsed destination and resolve `[]` (ordering UNRESOLVED).
- A4: `BrowserElementManager.ts:229`, `:233` pass `remaining` as the world-creation timeout, so a retry with about 0 ms left can reject `BROWSER_CDP_TIMEOUT_ERROR` instead of `BROWSER_WAIT_TIMEOUT`.
- A5: `BrowserDOMWait.ts:81` narrates the animation-frame option.

## Outside the claims

- Pre-existing: `BrowserPage.ts:442` and `:1171-1188` share one `Page.createIsolatedWorld` request bound to the first caller's signal; a user abort of one text wait rejects the request for every concurrent caller that joined it.
- The delivered-event control's 350 ms in-page timer measured about 987 ms in a hidden tab, consistent with Chromium's timer alignment there; the guide could say wake tasks there may be delayed.

## Required change

- `src/core/elements/BrowserElementManager.ts:262-270`: retry when `this.#changes !== changes`, whatever the error; keep the context-loss arm for errors with no change step; add a test that fails without it.
