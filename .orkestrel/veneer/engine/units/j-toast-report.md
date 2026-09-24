# J-TOAST round 1 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, native subagent, 159 tool uses, 5055 s; retained from the subagent's return text with the mutation table replaced by a pointer to the retained log `j-toast-mutations.log.txt`, which carries it row for row; the tree is the worktree `veneer/tmp/worktrees/toast` on `unit/toast` from `e24e2c3`, the two new files intent-to-add, otherwise uncommitted)

The Toast unit is complete in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast`, and every acceptance command exits 0 on Chromium 153.0.8010.12. The mutation instrument reddens every row except one, which I labelled equivalent before the run. One shared-file patch to `types.ts` is below, and nothing is committed.

## Touched files
- `src/browser/Toast.ts` (new): the `Toast` class, implementing `ToastInterface`.
- `src/browser/constants.ts`: adds `TOAST_EVENTS`, `TOAST_CLASSES`, `TOAST_ATTRIBUTES`, `TOAST_SELECTORS`, and `TOAST_DEFAULTS`, all frozen.
- `src/browser/validators.ts`: adds `isToastEvent`. Its class check reads `isInstance(value, CustomEvent) && value.detail === null`, and the typecheck accepts that form.
- `src/browser/Delegate.ts`: adds the resolved toast group, the `#routeToast` dismiss route, and the `#contests` same-host refusal. It also adds `Toast` to the mark, ownership, acquire, and discard unions.
- `src/browser/index.ts`: adds the `Toast.js` barrel row.
- `tests/src/browser/Toast.test.ts` (new): 33 cases.
- `tests/src/browser/Delegate.test.ts`: adds 8 toast route cases.
- `tests/src/browser/validators.test.ts`: adds 2 `isToastEvent` cases.
- `tests/src/browser/index.test.ts`: adds 7 export-list entries.
- `guides/veneer.md`: adds 7 § Surface rows, the Toast fence, and the `#### Toast` subsection. The Toast `plugin` row now reads Proof `tests/src/browser/Toast.test.ts` and Status `shipped`, with the catalog's Obligation wording unchanged.

The instruments and logs are under `tmp/j-toast/`. I ran `git add -N` on the two new files, as the review-evidence section describes. I made no call to the `prove` MCP server, because a subagent cannot reach it.

Diffstat (`git diff HEAD --stat`):
```
 guides/veneer.md                     |  161 ++++-
 src/browser/Delegate.ts              |  132 +++-
 src/browser/Toast.ts                 |  291 +++++++++
 src/browser/constants.ts             |   43 ++
 src/browser/index.ts                 |    1 +
 src/browser/validators.ts            |   29 +-
 tests/src/browser/Delegate.test.ts   |  261 +++++++-
 tests/src/browser/Toast.test.ts      | 1138 ++++++++++++++++++++++++++++++++++
 tests/src/browser/index.test.ts      |    7 +
 tests/src/browser/validators.test.ts |   38 ++
 10 files changed, 2085 insertions(+), 16 deletions(-)
```

Status (`git status --short`), which lists owned files only:
```
 M guides/veneer.md
 M src/browser/Delegate.ts
 A src/browser/Toast.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/validators.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/Toast.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
```

## Obligations
**TOAST1 (the engine).**
- **Show:** refuses while `showing` is on the toast or after destruction. It dispatches the cancelable `show.vn.toast`, reads the refusal again, clears the timer, and adds `fade` when `animated` is true. It then reads the layout, adds `show` and `showing`, waits through `settleAnimations` when animated, removes `showing`, and dispatches `shown.vn.toast`. Last, it starts the timer unless the toast matches `:hover` or `:focus-within`.
- **Hide:** mirrors show. It also refuses on a hidden toast, reads the layout before it writes `showing`, and removes `showing` and `show` together. It writes no `hide` token.
- **Timer:** a native `setTimeout`. `mouseover` and `focusin` clear it. `mouseout` and `focusout` start it again unless the related target is inside the toast or the other input is still inside.
- **Destroy:** clears the timer, abandons a transition in flight, and restores through `HostSnapshot`.
- **Doors:** every write goes through `#apply`/`#holds` with the `#change` identity.
- **Red:** `npm run test:src:browser -- tests/src/browser/Toast.test.ts` read `Tests  26 failed | 5 passed (31)` against a skeleton whose `show` and `hide` resolved `false` (`tmp/j-toast/red-toast.log.txt`, retained as `j-toast-red-toast.log.txt`).
- **Green:** the same command reads `Tests  33 passed (33)`.
- I added three cases after the red run: 'keeps the delay cleared when focus moves between descendants…', 'clears a pending delay when a show is accepted…', and the disabled-trigger delegate case. Each is bound by the mutation row that names it.

**TOAST2 (the dismiss route).**
- **Resolution:** the toast comes from `readTarget`, or else from the closest element carrying the `host` token, and must be inside the root.
- **Click handling:** the route prevents the default action on an anchor or area, then skips a trigger with the `disabled` token or attribute. It marks the click, finds or acquires the engine, and calls `hide`.
- **Same-host refusal:** `#contests` applies E12's refusal against the button route and the collapse route.
- **Red:** `npm run test:src:browser -- tests/src/browser/Delegate.test.ts` read `Tests  7 failed | 34 passed (41)` (`tmp/j-toast/red-delegate.log.txt`, retained as `j-toast-red-delegate.log.txt`).
- **Green:** the same command reads `Tests  42 passed (42)`.
- J-ALERT had not landed. I wrote the route in this unit's shape, so `#dismiss`, `#dismissed`, and `#disabled` will duplicate J-ALERT's dismiss resolution for the landing to reconcile.

**TOAST3 (guard, tables, barrel).** `isToastEvent`, the five frozen tables, the barrel row, and the export list are in place. The `validators.test.ts` rows and the export list were written after their code, so these have no red run of their own. Their mutation rows are the red evidence.

## Unknown 1
I ruled that `show` on a shown toast runs the sequence again rather than refusing. It dispatches both events and restarts the delay, as `toast.js` does. `ToastInterface.show` lists no "was shown" refusal, which supports this ruling. The case 'restarts the delay when show runs on a shown toast…' pins it.

## Mutation table
Retained verbatim as `j-toast-mutations.log.txt`. The instrument ran every row over the whole file, with its subprocess cap raised to 1200 s. At the 300 s cap, the transitionend row ended ERR on the loaded machine. Every row reads `EXACT` or `JOINED` but one: `MISSED exit=0 | destruction leaves the delay running (equivalent)`, labelled equivalent before the run: after destruction, a surviving timer calls `hide` on the destroyed engine, which refuses at once and writes nothing; the clear stays because R6's amendment requires it. The four `GREEN?` rows read 0 failed of 33, 42, 12, and 3, and the receipt reads `restored byte for byte` over identical digests.

## Acceptance command output
Each tail is quoted; the full logs are under `tmp/j-toast/final/`.
- `npm run check:src:browser` → `npm notice run tsc --noEmit -p configs/src/tsconfig.browser.json` / `check exit 0`
- `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` → no findings / `lint exit 0`
- `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` → `All matched files use the correct format.` / `Finished in 5560ms on 26 files using 16 threads.` / `format exit 0`
- `npm run test:src:browser` → `Test Files  11 passed (11)` / `Tests  247 passed (247)`. The known `HostSnapshot` `SyntaxError` diagnostic printed. The browser read `Chromium 153.0.8010.12` (`tmp/j-toast/browser-version.mjs`).
- `npm run test:guides` → `Test Files  1 passed (1)` / `Tests  19 passed (19)`
- `npm run test:policy` → `Test Files  1 passed (1)` / `Tests  109 passed | 1 skipped (110)`
- `npm run build:src:core` → exit 0, `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`
- `npm run build:src:styles` → exit 0, `✓ built in 923ms`
- `npm run build:src:browser` → exit 0, `dist/src/browser/index.js  65.49 kB │ gzip: 15.53 kB │ map: 118.51 kB` / `✓ built in 157ms`
- `npm run test:conformance` → `Test Files  1 passed (1)` / `Tests  22 passed (22)`
- `npm run test:setup` → `Test Files  4 passed (4)` / `Tests  267 passed (267)`

## Shared-file patch (`src/browser/types.ts`)
The implementation also resolves `false` when a call is taken over, which the two `@returns` sentences leave out. The guide carries no `@returns`, so this patch needs no guide row.
```diff
@@ -1902,7 +1902,7 @@ export interface ToastInterface {
-	 * @returns Resolves true after the `shown` event; false when a transition was in flight, a listener prevented `show`, or the toast is destroyed.
+	 * @returns Resolves true after the `shown` event; false when a transition was in flight, a listener prevented `show`, the toast is destroyed, or the toast's tokens read the change as taken over.
@@ -1912,7 +1912,7 @@ export interface ToastInterface {
-	 * @returns Resolves true after the `hidden` event; false when the toast was hidden, a transition was in flight, a listener prevented `hide`, or the toast is destroyed.
+	 * @returns Resolves true after the `hidden` event; false when the toast was hidden, a transition was in flight, a listener prevented `hide`, the toast is destroyed, or the toast's tokens read the change as taken over.
```

## Deviation state
There was no stop. I settled these choices myself; the guide lists every behaviour change against Bootstrap:
- **Delegate field type:** `Delegate`'s `#toast` field uses an inline `{ classes, attributes, selectors }` annotation. A `ToastVocabulary` type would match `ButtonVocabulary` and `CollapseVocabulary`, but `types.ts` is report-only for this unit. If you add `ToastVocabulary`, give it the same shape, a § Surface row, and a matching `index.test.ts` type proof, then swap the field annotation.
- **Hide reads the layout:** hide reads the layout before it writes `showing`, so a toast inserted already shown still fades out. Bootstrap's `hide` does not.
- **Pointer and focus reading:** whether the pointer or focus is still inside comes from `:hover` and `:focus-within`, not from stored flags.
- **Accepted hide clears the timer:** Bootstrap leaves it running.
- **Same-host refusal covers two routes:** E12's refusal now covers the toast against the button route and against the collapse route.
- **Stylesheets per case:** the toast key ships no transition. The wait proofs load a test-local `FADE` sheet with Bootstrap's `.fade` rule, including its reduced-motion rule, and each case states which sheets it reads.
- **Outside control placement:** the timer cases put their outside control ahead of the toasts. A toast coming into display used to shift the control under the resting pointer, and the `mouseover` that followed cleared the timer.

## Timing
One pointer case uses a 300 ms delay, because a trusted hover must land before the delay ends. Three back-to-back runs of the toast and delegate proofs all passed.

---

The Orchestrator's retention note: the instrument, its log, and the two red readings are retained beside this report as `j-toast-mutations.py`, `j-toast-mutations.log.txt`, `j-toast-red-toast.log.txt`, and `j-toast-red-delegate.log.txt`; the review evidence is `j-toast.diff` and `j-toast-status.txt`, captured by `w2-gates.sh toast`, whose log is `j-toast-gates.log.txt` (every gate exit 0, 247 browser proofs).
