# J-ALERT round 1 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, native subagent, 126 tool uses, 1980 s; retained verbatim from the subagent's return text; the tree is the worktree `veneer/tmp/worktrees/alert` on `unit/alert` from `e24e2c3`, uncommitted)

The unit is complete and every acceptance gate passes in the worktree. `Alert` implements `AlertInterface`, the delegate has its dismiss route, and the Alert `plugin` row reads `shipped`. I made four design decisions the audit needs to rule on; they are listed under "Decisions" near the end. No deviation stop was raised. I made no `prove` MCP call, because that server isn't reachable from a subagent.

## Files touched
Worktree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/alert`

- `src/browser/Alert.ts` (new): the `Alert` class.
- `tests/src/browser/Alert.test.ts` (new): the Alert proofs.
- `src/browser/constants.ts`: adds `ALERT_EVENTS`, `ALERT_CLASSES`, `ALERT_ATTRIBUTES` and `ALERT_SELECTORS`. There is no `ALERT_DEFAULTS`, because the alert has no default option.
- `src/browser/validators.ts`: adds `isAlertEvent`.
- `tests/src/browser/validators.test.ts`: `isAlertEvent` cases.
- `src/browser/Delegate.ts`: the alert group, the dismiss route, and the conflict check widened to cover the alert.
- `tests/src/browser/Delegate.test.ts`: the alert route cases.
- `src/browser/index.ts`: exports `./Alert.js`.
- `tests/src/browser/index.test.ts`: the export list grows.
- `guides/veneer.md`: Alert rows under § Surface, the Alert fence under § Examples, the `#### Alert` subsection, and the plugin row's Proof and Status cells. The Obligation cell is unchanged.

`git diff --stat`:
```
 guides/veneer.md                     | 132 ++++++++++-
 src/browser/Delegate.ts              | 199 +++++++++++++---
 src/browser/constants.ts             |  28 +++
 src/browser/index.ts                 |   1 +
 src/browser/validators.ts            |  29 ++-
 tests/src/browser/Delegate.test.ts   | 424 ++++++++++++++++++++++++++++++++++-
 tests/src/browser/index.test.ts      |   6 +
 tests/src/browser/validators.test.ts |  39 ++++
 8 files changed, 815 insertions(+), 43 deletions(-)
```
The new files are 172 lines (`Alert.ts`) and 595 lines (`Alert.test.ts`).

`git status --short`:
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Alert.ts
?? tests/src/browser/Alert.test.ts
```

## Obligations

**ALERT1 – the `Alert` class.**
- Construction checks the host with `isInstance`, resolves the three groups with `ALERT_OPTION_INVALID`, claims the host with `ALERT_HOST_OWNED`, and binds the hooks and the `signal` option. It keeps only the `classes` group; the other two are validated and dropped, as `Button` does.
- `close` dispatches a cancelable `close.vn.alert` and reads the refusal again after the dispatch. It then saves the `shown` token, reads layout (`reflow`), and removes `shown` through a check that the alert is still live.
- It waits on `settleAnimations` only when the `fade` token is present. It then removes the host, requiring the host to be out of the document afterwards, dispatches `closed.vn.alert` on the detached host, releases itself, and resolves `true`.
- `destroy` during the fade restores `shown`, never removes the host, and makes the close resolve `false` with no `closed` event.
- Red: `npm run test:src:browser -- tests/src/browser/Alert.test.ts` →
  `Caused by: SyntaxError: The requested module '/src/browser/index.ts' does not provide an export named 'Alert'` / `Test Files  1 failed (1)` / `Tests  no tests`.
- Green: `Test Files  1 passed (1)` / `Tests  21 passed (21)`.

**ALERT2 – the dismiss route.** It is `#routeAlert`, built on a shared private `#dismiss(event, target, route, selector, classes, attributes)` and a side-effect-free `#dismissed(trigger, classes, attributes)`.
- It prevents the default action for an `A` or `AREA` trigger, before the disabled check, as Bootstrap does.
- A trigger with the `disabled` token or attribute closes nothing.
- The alert is resolved by `readTarget`, else the closest element with the `host` token. It must be inside the root, and the delegate must be live.
- `#mark` makes each alert close once per click; the engine comes from `Alert.find`, or the delegate acquires one with the alert group.
- `#conflicts` now covers any two routes that would each construct an engine on the same element: the E12 button-versus-alert case, plus collapse-versus-alert.
- Red: `npm run test:src:browser -- tests/src/browser/Delegate.test.ts` → `Tests  13 failed | 35 passed (48)`.
- Green: `Tests  48 passed (48)`.
- Two more cases came after the route existed: "carries an alert a consumer constructed" and "leaves an alert outside its root alone". The mutation rows are their only red readings.

**ALERT3 – guard, tables and barrel.**
- `isAlertEvent` uses `isInstance(value, CustomEvent) && value.detail === null` inside `try`. The type check accepts this form (`check:src:browser` exit 0).
- The tables are frozen.
- validators red: `SyntaxError: ... does not provide an export named 'isAlertEvent'` / `Tests  no tests`. Green: `Tests  12 passed (12)`.
- index red: `Tests  1 failed | 2 passed (3)`. Green: `Tests  3 passed (3)`.

## Unknowns
1. The fallback from `readTarget` to `closest(host)` lives in the delegate itself, in its private `#dismissed` method. It is not a `helpers.ts` export. `#dismiss` takes the entity's class, selector and host token, so the Modal and Toast routes can call it directly.

## Mutation table
This is the tail of `tmp/j-alert/mutations.log.txt`. The full log has one row per mutation; every row reads EXACT or JOINED, with no MISSED, ERR or NOREPORT rows. The per-row lines are in `mutations.log.txt`, and the "joined" lists there are verbatim.
```
GREEN? exit=0 | tests/src/browser/Alert.test.ts | 0 failed of 21 | []
GREEN? exit=0 | tests/src/browser/Delegate.test.ts | 0 failed of 50 | []
GREEN? exit=0 | tests/src/browser/validators.test.ts | 0 failed of 12 | []
GREEN? exit=0 | tests/src/browser/index.test.ts | 0 failed of 3 | []
receipt: restored byte for byte
```
The instrument is `tmp/j-alert/mutations.py`. It runs each mutation over the whole test file, with no `-t`.

## Acceptance commands
All ran on Chromium 153.0.8010.12. `tmp/j-alert/receipt.mjs` printed `C:\Users\mikes\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe` / `153.0.8010.12`. Exit codes are from `tmp/j-alert/gates/summary.log.txt`:
```
check-src-browser exit=0 | oxlint exit=0 | oxfmt exit=0 ("All matched files use the correct format.")
test-src-browser exit=0  Test Files  11 passed (11) / Tests  243 passed (243)
test-guides exit=0       Test Files  1 passed (1) / Tests  19 passed (19)
test-policy exit=0       Tests  109 passed | 1 skipped (110)
build-src-core exit=0 | build-src-styles exit=0 | build-src-browser exit=0
test-conformance exit=0  Test Files  1 passed (1) / Tests  22 passed (22)
test-setup exit=0        Test Files  4 passed (4) / Tests  267 passed (267)
```
- The browser run prints the known `SyntaxError: Failed to execute 'toggle' on 'DOMTokenList'` diagnostic from the landed `HostSnapshot` case, and the run still passes.
- The skipped policy case is the vendored `it.skipIf` in `tests/policy.test.ts`; this unit didn't cause it.

## Shared-file patches (not applied)
Patch A is `tmp/j-alert/types.patch.txt`. The `close` `@returns` sentence is now wrong: it says "a transition was in flight", and it omits closes that stop because the alert changed under them.
```diff
-	 * Fades the alert out, removes it from the document, and dispatches `closed` on it.
+	 * Fades the alert out, removes it from the document, dispatches `closed` on it, and releases it.
 	 *
-	 * @returns Resolves true after the `closed` event; false when a transition was in flight, a listener prevented `close`, or the alert is destroyed.
+	 * @returns Resolves true after the `closed` event; false when a close was in flight, a listener prevented `close`, the alert is destroyed or already closed, or the alert's tokens or its place in the document read the change as taken over.
```
Patch A must land together with this guide § Methods patch (`tmp/j-alert/guide-methods.patch.txt`, which passes the formatter check):
```diff
-| Method    | Summary                                                                           |
-| --------- | --------------------------------------------------------------------------------- |
-| `close`   | Fades the alert out, removes it from the document, and dispatches `closed` on it. |
-| `destroy` | Releases hooks and restores the alert without removing it.                        |
+| Method    | Summary                                                                                        |
+| --------- | ---------------------------------------------------------------------------------------------- |
+| `close`   | Fades the alert out, removes it from the document, dispatches `closed` on it, and releases it. |
+| `destroy` | Releases hooks and restores the alert without removing it.                                     |
```

## Decisions for the audit
- **A completed close releases the alert without restoring it.** This follows Bootstrap's `dispose` after `closed` and the catalog's "disposes the instance". Afterwards `find` returns undefined, `close` resolves `false`, and `destroy` does nothing. The alternative, restoring `show` on the detached host, was rejected. The guide lists this as a departure.
- **The in-flight marker is a `#closing` boolean, not Collapse's `#change` identity.** Because a close already in flight refuses any new one, an identity check could never fail, so it would be dead code.
- **`#conflicts` was rewritten as a general rule:** any two routes that would construct an engine on the same element. A `#closest` helper uses `isInstance`. This rewrites lines that J-ISINSTANCE also edits, so expect a mechanical merge conflict there. The Button and Collapse routes are untouched and still use `instanceOf`.
- **The delegate's `#alert` field has an inline type**, because there is no `AlertVocabulary` in `types.ts`. Adding one is optional; it would mirror `CollapseVocabulary` and need a § Surface row.
- **The shipped cascade has no `.fade` rule.** Under it alone a close finds no animation and finishes in a microtask. The guide says so.

## Deviation state
None. The only files touched are the owned files and ignored instruments under `tmp/j-alert/`. The § Delegation paragraph in the guide isn't in my owned set; it still mentions only the button-versus-collapse refusal, and `#### Alert` states the alert refusals.

---

The Orchestrator's retention note: the instrument and its log are retained beside this report as `j-alert-mutations.py` and `j-alert-mutations.log.txt`; the two patches as `j-alert-patches/j-alert-types.diff` and `j-alert-patches/j-alert-guide-methods.diff`; the review evidence is `j-alert.diff` (`git diff HEAD` with the two new files intent-to-add) and `j-alert-status.txt`, captured by `w2-gates.sh alert`, whose log is `j-alert-gates.log.txt`.
