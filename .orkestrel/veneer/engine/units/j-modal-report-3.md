# J-MODAL round 3 — the writer's report (returned 2026-09-24 by `opus` on Opus 5.5, the round-1 writer resumed in the modal worktree, briefed by `j-modal-brief-3.md`; 45 tool uses, 2399 s; retained verbatim from the subagent's return; the tree is `veneer/tmp/worktrees/modal` on `unit/modal` from `e24e2c3`, uncommitted, `main` not merged. The writer's round-3 instrument is the worktree's `tmp/j-modal/mutations-4.py`, retained as `j-modal-mutations-3.py` with its log `j-modal-mutations-3.log.txt`)

J-MODAL round 3 is done: item A is fixed, the item B sentences and return contract now match the code, and every gate exits 0. The full `mutations-4.py` run reads 61 `EXACT` and 49 `JOINED` rows, none missed, and ends `receipt: restored byte for byte`. Nothing was committed, merged or installed, and I made no `prove` MCP call (the server is not reachable from a subagent).

## A. The scroll lock under the modal's lifetime

**Red run** (the new tests against the round-2 source):
`node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Modal.test.ts tests/src/browser/ScrollLock.test.ts` gave `Tests  3 failed | 42 passed (45)`, `EXIT 1` (`tmp/j-modal/red-3.log.txt`). The failing cases:
- "releases the scroll lock whose compensation write a reaction answers by destroying the modal, writing nothing more". It failed because the lock kept writing after the destroy: `expected [ MutationRecord{} ] to deeply equal []`.
- "releases the scroll lock it constructed when a reaction inside the construction takes the show over". In that joint run it failed on the lock the previous case leaked. Run alone with `-t`, it failed on its own cause: `expected 'overflow: hidden; padding-right: 0px;' to be null` (`tmp/j-modal/red-3-takeover.log.txt`).
- "takes no reference under an aborted signal and releases its reference when its signal aborts".

After the fix the same two files run 45 of 45 green (`tmp/j-modal/green-3.log.txt`).

Two further cases are bound by mutation rows rather than a red run:
- "writes nothing more after a reaction to one of its margin writes aborts its signal" (`ScrollLock.test.ts`), bound by "the lock reads no lifetime after a margin write".
- "resolves a show true when a hook of its shown event hides the modal, the hide starting a new change" (`Modal.test.ts`). It pins behaviour the code already had, the contract item B describes.

**Mechanism as landed:**
- **`types.ts`:** `ScrollLockOptions.signal` is added. The summary now reads "Configures the document a scroll lock holds, the markup vocabulary it matches with, and the lifetime that ends it." The § Surface row matches.
- **`ScrollLock.ts`, before registering:** under an already-aborted signal the lock takes no reference. Otherwise it binds `abort` to `destroy`, the way `Isolation` does.
- **`ScrollLock.ts`, during compensation:** the first holder reads its own lifetime after each `padding-right` write and each `margin-right` write, and stops there. I read after every element's write, not after each batch.
- **What the release restores:** `destroy()` aborts the lock's own controller and removes the holder. When that holder was the last, it deletes the document's record and restores the shared snapshot, which covers the overflow and every padding and margin written so far. The first holder's selectors and the shared count are unchanged.
- **The body-overflow read, removed:** the brief lists the body's overflow write as reaction-capable. The body can never be a custom element, so no reaction runs there and no read is needed; I added none.
- **The dead `destroy()` guard, removed:** the holder set already decides whether a call releases anything, and a mutation removing the guard changed nothing observable.
- **The modal's door after construction:** `Modal.show` builds the lock inside `if (this.#lock === undefined)`, passing `signal: this.#controller.signal`. If `#holds(false)` fails once construction returns, it calls `lock.destroy()` and resolves `false`; only a lock that passes is stored.
- **`Modal.destroy`:** it no longer calls `lock?.destroy()`. The abort has already released the lock through its signal, so that call was dead: "destruction keeps the scroll lock" missed in the first full run. It still releases the body's `open` token through `lock.document`.
- **Guide:** under `#### Modal`, the lock bullet and the construction sentence now name the lock's signal beside the isolation's.

## B. The three sentences and the return contract
1. **Bootstrap's backdrop reading.**
   - Before: "Bootstrap throws a `TypeError` for an empty, `null`, or numeric value, `0` and `1` included, and reads any other string as a backdrop that hides on a press."
   - After: "Bootstrap first normalizes the value, turning `true` and `false` into booleans, a numeric string into a number, an empty value or `null` into `null`, and any other value that parses as JSON into what the JSON holds, and then requires a boolean or a string, throwing a `TypeError` otherwise. An empty value, `null`, a number such as `0` or `1`, and JSON that parses to an array or an object, such as `[]`, therefore fail there, and only a value that stays a string after normalization reads as a backdrop that hides on a press, `static` excepted. Veneer accepts `0` and `1`."
2. **The `static` sentence.**
   - Before: "…is not cancelable, so the `static` token always applies."
   - After: "…is not cancelable, so calling `preventDefault` on it does not veto the bounce; the bounce still stops when a listener inside the dispatch or the focus hides or destroys the modal."
3. **The `show`/`hide` `@returns` in `types.ts` and the guide's "Each resolves `false`" sentence.**
   - Before: "…or another write changed the host's `shown` token while the call ran."
   - After: "…or another write changed the host's `shown` token at a door the call read before it dispatched its completed event."
   - The guide adds that a listener to the completed event starts a change of its own, so a hide run by a `shown.vn.modal` hook leaves the show's `true` in place.
   - The door paragraph adds: "The doors end when the call dispatches its completed event: a listener to that event that shows or hides the modal starts a new change, and the call whose event it heard still resolves `true`."

## C. Correction to my round-2 report
I listed "bounces without moving focus when focus is false" as a red-first proof. That was wrong. Its original red failed inside the harness's `pressKeys`, because nothing had focus, so Escape never reached the modal and the failure did not bind the bounce's focus behaviour. The case is bound only by its `EXACT` mutation row, "the bounce focuses under focus false", and it counts as mutation-bound, not red-first.

## D. The instrument
`tmp/j-modal/mutations-4.py` writes `tmp/j-modal/mutations-4.log.txt`. It keeps every row of `mutations-3.py`.

**Rows changed from `mutations-3.py`:**
- **"the scroll lock is not taken"** is re-anchored to the new `if (this.#lock === undefined) {` block. It reads `JOINED`.
- **"destruction keeps the scroll lock"** is re-anchored to drop the signal the modal passes to the lock, since the explicit destroy it targeted is gone. It reads `JOINED` on "abandons a show in flight on destruction…".
- **"the show dispatch is not followed by a read"** is re-targeted to a different named case. Its old named case, "writes nothing when a listener to its show event destroys it", no longer reddens: the lock's own lifetime read now stops the same writes. Its named case is now "runs one show and one shown event when a listener to its show event shows it again…", where it reads `EXACT`.

**New rows:**

| Row | Named case | Result |
|---|---|---|
| the lock ignores its signal | releases the scroll lock whose compensation write a reaction answers by destroying the modal… | `JOINED` |
| the lock reads no lifetime after a padding write | same case | `EXACT` |
| a constructed lock is kept after the door fails | releases the scroll lock it constructed when a reaction inside the construction takes the show over | `EXACT` |
| the lock ignores a signal aborted before construction | takes no reference under an aborted signal… | `EXACT` |
| the lock reads no lifetime after a margin write | writes nothing more after a reaction to one of its margin writes aborts its signal | `EXACT` |

`GREEN?` rows: Modal `0 failed of 39`, Backdrop `0 failed of 7`, ScrollLock `0 failed of 7`, Isolation `0 failed of 7`, Delegate `0 failed of 48`, validators `0 failed of 12`, parsers `0 failed of 5`, index `0 failed of 3`. The log ends `receipt: restored byte for byte`. The earlier full run, where the two rows missed, is kept as `mutations-4-first.log.txt`.

## Gates (`tmp/j-modal/gates-3.log.txt`)
| Command | Exit | Summary |
|---|---|---|
| `npm run check:src:browser` | 0 | |
| `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser` | 0 | |
| `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md` | 0 | All matched files use the correct format. |
| `npm run test:src:browser` | 0 | 14 files, 282 passed |
| `npm run test:guides` | 0 | 19 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `npm run build:src:core` / `build:src:styles` / `build:src:browser` | 0 / 0 / 0 | |
| `npm run test:conformance` | 0 | 22 passed |
| `npm run test:setup` | 0 | 267 passed |

I also ran `npx tsc --noEmit -p tsconfig.json`, which reported no errors.

## `git status --short` and diffstat
```
 M guides/veneer.md
 A src/browser/Backdrop.ts
 M src/browser/Delegate.ts
 A src/browser/Isolation.ts
 A src/browser/Modal.ts
 A src/browser/ScrollLock.ts
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 A tests/src/browser/Backdrop.test.ts
 M tests/src/browser/Delegate.test.ts
 A tests/src/browser/Isolation.test.ts
 A tests/src/browser/Modal.test.ts
 A tests/src/browser/ScrollLock.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 M tests/src/browser/validators.test.ts
 19 files changed, 4074 insertions(+), 243 deletions(-)
```
This round wrote only `Modal.ts`, `ScrollLock.ts`, `types.ts`, `Modal.test.ts`, `ScrollLock.test.ts`, `guides/veneer.md` and files under `tmp/j-modal/`. The other paths in the status carry earlier rounds' work.

## Deviation state
No stops; item A needed no change outside `Modal.ts`, `ScrollLock.ts` and `types.ts`. The choices I settled myself were:
- **The body-overflow read:** omitted, as described under A.
- **The removed dead code:** the `ScrollLock.destroy()` guard and the explicit lock release in `Modal.destroy`.
- **The re-targeted named case:** "the show dispatch is not followed by a read", as described under D.
- **Guide sentences outside item B:** I reworded the `#### Modal` lock bullet and the construction sentence to name the lock's signal. The brief's guide scope names only item B's sentences and the `ScrollLockOptions` row, so these fall slightly outside it; left unchanged, they would have described only the isolation's signal.
