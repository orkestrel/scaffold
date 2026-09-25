# J-CONCERNS-A audit — the checker job (grok on Cursor Grok, grok-4.7-high, ask mode), retained verbatim

Brief: `units/j-concerns-a-checker-brief.md` (launch copy `tmp/cursor/j-concerns-a-checker-brief.md`, swept); journal `tmp/cursor/j-concerns-a-checker.jsonl` (swept at acceptance); session id in the first line below.

---

<!-- Grok lane j-concerns-a-checker, session af841f64-645e-4dea-b56d-b24a130a34e0 -->

I'll read the brief and follow its instructions exactly.**Claim 7: CONFIRMED.** The net diff and `j-concerns-a-2-status.txt` change only `tests/src/browser/Button.test.ts` and `tests/src/browser/ScrollSpy.test.ts`. No added line breaks a `tests.md` rule.

Scope is those two files (`j-concerns-a-2-status.txt`). Added cases use `Button` and `ScrollSpy`, `createRecorder`, and real browser events. Cleanup is `Button.test.ts:12` `afterEach(() => scene.clear())` plus `onTestFinished` on each new case. The keyboard case restores the hash at `ScrollSpy.test.ts:551` and the window scroll at `ScrollSpy.test.ts:553`. Titles at `Button.test.ts:480`, `Button.test.ts:501`, `ScrollSpy.test.ts:166`, `ScrollSpy.test.ts:217`, `ScrollSpy.test.ts:549`, and `ScrollSpy.test.ts:594` name the proof. No added mock, spy, local helper, or inline case matrix. `Button.test.ts:575` `it.each` is pre-existing.

**Claim 8: CONFIRMED.** Each cited Bootstrap line says what the report says.

- `scrollspy.js:24` `const EVENT_ACTIVATE = \`activate${EVENT_KEY}\`` with `EVENT_KEY` `.bs.scrollspy` at `scrollspy.js:21`. `scrollspy.js:233` `EventHandler.trigger(this._element, EVENT_ACTIVATE, { relatedTarget: target })`. `_process` (`scrollspy.js:223–234`) does not read `defaultPrevented`. No `focus(` in `scrollspy.js`.
- `scrollspy.js:138` `event.preventDefault()`. `scrollspy.js:142` `root.scrollTo({ top: height, behavior: 'smooth' })`. `scrollspy.js:147` `root.scrollTop = height`. That branch does not move focus.
- `dom/event-handler.js:282` `const evt = hydrateObj(new Event(event, { bubbles, cancelable: true }), args)`.
- `button.js:38` `this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE))`. No `focus(` in `button.js`.
- `button.js:58` `event.preventDefault()`. `button.js:63` `data.toggle()`. No focus call in `button.js:57–64`.

**`tests.md` rules checked.** Mirror path. Deterministic tests. Real implementations, no mocks, behavioral fakes, module replacement, or spies. Recorders and real nodes. No local fixture factory and no inline case matrix. Helpers imported from `@orkestrel/test`, `@orkestrel/test/browser`, and `setupBrowser.ts`. Cleanup through `onTestFinished` or `afterEach`, including after a failed assertion. `waitForCondition` and `waitForEvent` instead of a handwritten poll. Observable DOM, events, focus, classes, and attributes. No private state. A runtime-chosen duration or scroll position asserted as a relationship (`duration > 0`, an intermediate scroll position). No `Date.now`. No new `.skip`, `.todo`, or conditional skip. No reimplemented framework helper. Browser APIs not replaced.

VERDICT: PASS
