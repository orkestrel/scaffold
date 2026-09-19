# Unit 14 report — the refused read

Every criterion is done. The refused read no longer escapes `createApplication`: `readTheme` catches
the refusal at the same boundary shape `rememberTheme` uses for the write, answers with the light
default, and the shipped shell paints home over a store whose `getItem` raises. `readStorage` needed
the same treatment, and it got it — the unknown resolved against the guarded answer.

**Touched files**

- `app/browser/helpers.ts` — `readTheme` catches the refused read and answers light; `readStorage`
  catches a refused `localStorage` property and answers `undefined`.
- `tests/app/browser/setup.ts` — `PermissionOptions` and `PermissionStorage`, the real `Storage` a
  host holds behind a permission, beside `QuotaStorage`.
- `tests/app/browser/helpers.test.ts` — the refused-read proof for `readTheme` with its later
  accepted write, and the denied-property proof for `readStorage`.
- `tests/app/browser/controllers/ApplicationController.test.ts` — construction, start, and the
  shell's home paint over a store that refuses everything.

**Diffstat**

```text
 app/browser/helpers.ts                             |  31 +++++-
 .../controllers/ApplicationController.test.ts      |  31 +++++-
 tests/app/browser/helpers.test.ts                  |  40 ++++++++
 tests/app/browser/setup.ts                         | 111 +++++++++++++++++++++
 4 files changed, 207 insertions(+), 6 deletions(-)
```

`app/browser/controllers/ApplicationController.ts` is unchanged. The boundary did not have to move:
`readTheme` already was the single place the constructor reaches the store for a reading, and
`readStorage` already was the single place the default store is chosen.

## 1. Done / not done

| #  | Criterion                                                    | State | Evidence                                                                        |
| -- | ------------------------------------------------------------ | ----- | ------------------------------------------------------------------------------- |
| 1  | `oxfmt --check` on the owned files                           | Done  | `All matched files use the correct format.` over the owned files, exit 0    |
| 2  | `oxlint --deny-warnings` on the owned files                  | Done  | No diagnostic, exit 0                                                           |
| 3  | `npm run check`, no `any`, `as`, `!`, or suppression         | Done  | exit 0 after the final edit; the added lines carry none of them                 |
| 4  | `createApplication` constructs and the surface paints, red first | Done | § 3                                                                            |
| 5  | The refused read answers light, and a later write persists   | Done  | `theme helpers > answers light when the store refuses the read, and keeps a later write` |
| 6  | The read and write boundaries match                          | Done  | § 2                                                                             |
| 7  | The sweep of every other store call in `app/`                | Done  | § 4                                                                             |
| 8  | `npm run test:app:browser`                                   | Done  | `Test Files 38 passed (38)`, `Tests 153 passed (153)`, 30.40s                   |
| 9  | `npm run test:journey` green for every journey project           | Done  | `Test Files 4 passed (4)`, `Tests 76 passed / 4 skipped (80)`, 38.14s           |
| 10 | `npm test` exits 0                                           | Done  | exit 0; its legs reported `app` 186 passed over 43 files, `journey` 76 passed and 4 skipped, `policy` 111 passed, `config` 46 passed |

## 2. The boundary

### What changed

`readTheme` wraps its single `getItem` call in a `try` and answers `false` from the `catch`. That is
the whole repair for the named defect. The controller's constructor calls it, so a `SecurityError`
raised by a store held behind a permission is absorbed where the mode reaches the store instead of
travelling out of `createApplication`.

`readStorage` wraps its host check the same way. The unknown in the brief resolved against it: the
`typeof` guard reads the `localStorage` property rather than guarding it, so on a denied origin that
line raised before the constructor ever reached `readTheme`. A refused property now answers
`undefined`, and the constructor falls through to `MemoryStorage`, which keeps the mode for the
session.

### How the read door and the write door match

- **Same shape.** One `try` around one store call, one `catch` that neither rethrows nor logs, no
  branch on the error. `rememberTheme` is `try { setItem } catch { return }`; `readTheme` is
  `try { getItem } catch { return false }`.
- **Same signature order.** `(storage, key, …)`: the store first, the key second, the mode last
  where there is one.
- **Same answer discipline.** Each refusal leaves the application in the state a reader with no
  stored preference is already in. A refused write leaves the mode unremembered; a refused read
  answers light. Neither invents a sentinel and neither reports a third state.
- **Same vocabulary.** Each `@remarks` opens by naming itself as the one place the color mode reaches
  the store, then names the browser condition and the exact call it raises from — a full origin
  raising from `setItem`, a permission-held store raising from `getItem`. `readTheme` points at
  `rememberTheme` by name so the pair reads as one boundary from either side.
- **Same silence toward the person.** Unit 12 ruled that a refused write gets no sentence and no
  retry control. A refused read has even less to tell: the page paints the mode the reader would have
  had anyway, and no recovery exists inside the application. The ruling carries over unchanged.
- **Same treatment one level out.** `readStorage` catches at the property access for the same reason
  and in the same form, so every door to the host store behaves alike.

## 3. The failing proof

One command, the count before and the count after, with nothing but the source fix between them:

```text
npm run test:app:browser -- tests/app/browser/helpers.test.ts tests/app/browser/controllers/ApplicationController.test.ts
```

Before the fix: `Test Files 2 failed (2)`, `Tests 3 failed | 22 passed (25)`.

```text
FAIL tests/app/browser/helpers.test.ts > theme helpers > answers light when the store refuses the read, and keeps a later write
SecurityError: Access is denied for roughnotes-theme

FAIL tests/app/browser/helpers.test.ts > readStorage > answers undefined when the host refuses the localStorage property
SecurityError: Access is denied for this document

FAIL tests/app/browser/controllers/ApplicationController.test.ts > ApplicationController > constructs and paints the light default when the host refuses the read
SecurityError: Access is denied for roughnotes-theme
```

The controller failure is the defect itself: the `SecurityError` escaped the `createApplication` call
in the test body, before any assertion ran and before anything mounted.

After the fix: `Test Files 2 passed (2)`, `Tests 25 passed (25)`.

The controller proof drives the shipped shell. It constructs the application over
`new PermissionStorage({ reads: false, writes: false })`, starts it, then hands the same store to
`openSurface`, which mounts `App` and waits for the home heading to paint. The test asserts the page
carries that heading, the flag reads light, and the document element carries `data-bs-theme="light"`.

`PermissionStorage` is a real `Storage` over a real in-memory store: reads and writes it does not
permit raise `SecurityError`, the permitted ones answer from the store beneath, and `permit` grants
what the host withheld so a test can read what the store kept while reads were refused. That last
method is what proves criterion 5 — the refused read answers light, `writeTheme` then persists dark,
and the store hands dark back after the permission is granted.

## 4. The sweep

Pattern `getItem|setItem|removeItem|localStorage|sessionStorage|indexedDB|document\.cookie` over
`app/**/*.ts` and `app/**/*.vue`, which is every TypeScript module and every single-file component
under `app/`.

| Site                                          | State                                                                       |
| --------------------------------------------- | --------------------------------------------------------------------------- |
| `app/browser/helpers.ts` `readTheme`          | Was unguarded. Closed by this unit.                                          |
| `app/browser/helpers.ts` `readStorage`        | Was unguarded at the property access. Closed by this unit.                   |
| `app/browser/helpers.ts` `rememberTheme`      | Guarded by unit 12. Unchanged.                                               |
| `app/browser/MemoryStorage.ts`                | The calls target its own `Map`, not a host store, so no host can refuse them. |
| `app/browser/factories.ts`                    | Constructs `MemoryStorage`. The `getItem` in its `@example` is over that store. |
| `app/browser/controllers/ApplicationController.ts` | Reaches the store only through `readStorage`, `readTheme`, `rememberTheme`, and `writeTheme`. Unit 12 removed its last raw call. |
| `app/browser/constants.ts`, `app/browser/types.ts` | Prose and a declared option. No call.                                   |

No `sessionStorage`, `indexedDB`, or `document.cookie` call exists anywhere in `app/`. `app/core`
names `Storage` nowhere. Every remaining executable path from the application to a host store is
guarded.

## 5. Observations

- **`readStorage()` can itself throw, and this codebase's call did.** `typeof` suppresses a
  `ReferenceError` for an undeclared binding, and nothing else; `localStorage` is a declared accessor
  on `window`, so the operator invokes the getter and a denied origin's `SecurityError` propagates. A
  Chromium probe confirmed it before the test was written, and the test then reproduced it in the
  suite's own browser: with a refusing accessor installed on `window`, the pre-fix `readStorage()`
  raised `SecurityError: Access is denied for this document`. The same probe showed the real
  unpermitted case unprompted — on the opaque origin of an `about:blank` document, Chromium's own
  getter raises `SecurityError: Failed to read the 'localStorage' property from 'Window': Access is
  denied for this document.` That is the same access point and the same error name the test installs,
  which is what makes the reproduction faithful.
- **The `readStorage` proof swaps the window's own `localStorage` accessor and restores it in a
  `finally`.** The probe established that the descriptor is an own, configurable accessor on `window`,
  so the swap is the host condition rather than a replacement of the store behind it: a permitted page
  cannot be denied from inside itself, and the suite's page is served from a permitted origin. The
  test re-reads `readStorage()` after the restore and asserts it is `localStorage` again, so a leaked
  swap fails the test that caused it.
- **`ApplicationController.test.ts` now tears down its surface.** The new case mounts through
  `openSurface`, so its `afterEach` calls `clearSurface` before resetting the hash and the theme
  attribute, the way every other mounting suite does.
- **Durations.** `npm run test:app:browser` 30.40s; `npm run test:journey` 38.14s;
  `npm run test:app` 30.59s. Inside `npm test` the legs I read reported: journey 39.45s, policy
  1.39s, config 1.65s. Bootstrap emitted its Sass deprecation warnings on every run, as the brief
  said it would.
- **A `[Vue warn]: Unhandled error during execution of setup function` line in the `app` project is
  not mine.** `tests/app/browser/composables/useApplication.test.ts` drives that refusal deliberately;
  that file is unowned and unmodified.

## 6. What I did not close

- **A capture run.** No criterion asked for one and nothing this unit changed alters what the surface
  paints, so `VITE_CAPTURE=true npm run test:journey` was not run.
- **A journey leg for the refused read.** `tests/app/browser/integration.test.ts` is off-limits in
  this brief, so the refusal is driven through the shipped shell from the controller suite instead —
  real `App`, real mount, real paint — rather than from a journey variant. A variant-level leg for the
  refused read belongs to the capability that owns theme persistence.
- **A `rememberTheme` row in `tests/app/browser/helpers.test.ts`.** Unit 12 recorded its absence. The
  file is owned here, but that row belongs to the write leg's scope rather than this one; the new
  refused-read case exercises `writeTheme` through `rememberTheme` over a store that permits the
  write, which is not the same proof.
