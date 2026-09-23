# Unit J-SEED report — `ColorMode` writes nothing after `destroy()`

Executor: `opus` role on Opus 5.5, native Claude subagent, sole writer in
`C:/Users/mikes/WebstormProjects/veneer-seed` (branch `unit/seed`, base `376d84a`). No commit made.

## Outcome

The repair is in place and the proof ran red before it and green after it. After `destroy()`, the
`apply` method returns without writing the root or storage, and the `toggle` method returns the
root's live mode (`this.mode`) without writing. The destroyed state is the existing
`#original === undefined` reading; no second flag was added.

## Touched files

- `src/browser/ColorMode.ts` — adds the `#original === undefined` guard to the `apply` and `toggle`
  methods, extends the class `@remarks` with the post-destroy behaviour, and extends the `#original`
  field comment to name it as the destroyed state.
- `tests/src/browser/ColorMode.test.ts` — adds two cases: one for a root that carried an attribute
  and one for a root that carried none, each with storage supplied.
- `guides/veneer.md` — extends the § Surface sentence that begins "Destruction writes that
  construction reading back" to cover `apply` and `toggle`.

`src/browser/types.ts` and the guide's `ColorModeInterface` method table are unchanged.

## Red-first record

Command, run from `C:/Users/mikes/WebstormProjects/veneer-seed`:

```text
npm run test:src:browser -- tests/src/browser/ColorMode.test.ts
```

Before the repair (inherited source, new cases added), exit 1:

```text
 FAIL  |src:browser (chromium)| tests/src/browser/ColorMode.test.ts:157:2 > ColorMode > writes nothing after destruction of a root that carried an attribute, and toggles to the live mode
AssertionError: expected 'dark' to be 'light' // Object.is equality
 ❯ tests/src/browser/ColorMode.test.ts:166:45
 FAIL  |src:browser (chromium)| tests/src/browser/ColorMode.test.ts:180:2 > ColorMode > writes nothing after destruction of a root that carried no attribute, and toggles to the live mode
AssertionError: expected true to be false // Object.is equality
 ❯ tests/src/browser/ColorMode.test.ts:188:45
      Tests  2 failed | 12 passed (14)
```

After the repair, same command, exit 0:

```text
 Test Files  1 passed (1)
      Tests  14 passed (14)
```

Browser: the `src:browser (chromium)` project. `node_modules/playwright-core/browsers.json` pins
chromium revision `1243`, `browserVersion` `153.0.8010.12`, and `%LOCALAPPDATA%/ms-playwright` holds
only `chromium-1243` and `chromium_headless_shell-1243`. The version is read from the installed
Playwright pin, not from a runtime `navigator.userAgent` reading.

## Mutations the new assertions distinguish

Each mutation was applied to the repaired source, run with the same command, and then undone as that
exact edit. The final source matches the diff in § Review evidence.

| Mutation                                                             | Result                        | Reddening assertion                                                                                                                |
| -------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| A: remove the guard from `apply`                                     | 2 failed, 12 passed (14)      | the attribute assertion after `apply('dark')` in both new cases (lines 166 and 188)                                                |
| B: remove the guard from `toggle`                                    | 2 failed, 12 passed (14)      | `expect(controller.toggle()).toBe('light')` in both new cases (lines 168 and 190): the unrepaired `toggle` returns `'dark'`        |
| C: move one storage write in `apply` ahead of its guard              | 2 failed, 12 passed (14)      | the storage assertion after `apply('dark')` in both new cases (lines 167 and 189)                                                  |
| D: remove the early return from `destroy` (second-call guard)        | 4 failed, 10 passed (14)      | the post-second-`destroy` assertions in both new cases (lines 176 and 194), plus the existing second-`destroy` cases at 98 and 144 |

Mutations A and B each redden only the new cases, which are the tests that name the defect.
Mutation D is outside the defect and reddens the existing second-`destroy` cases as well; it shows
that the new cases' second-`destroy` assertions can fail.

## Acceptance criteria

1. Red, then green: see § Red-first record.
2. `npm run check:src:browser` → `tsc --noEmit -p configs/src/tsconfig.browser.json`, exit 0, no
   diagnostics.
3. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/ColorMode.ts tests/src/browser/ColorMode.test.ts`
   → exit 0, no diagnostics. `npx oxfmt --config .oxfmtrc.json --check src/browser/ColorMode.ts tests/src/browser/ColorMode.test.ts guides/veneer.md`
   → "All matched files use the correct format.", exit 0. No `--write` was needed.
4. Each new case asserts, after `destroy()`, that `apply('dark')` leaves the attribute and storage
   unchanged, that `toggle()` returns the live mode (`'light'`) and leaves both unchanged, and that a
   second `destroy()` writes nothing. One case covers a root with an original `light` attribute,
   including a live external `dark` write that `toggle()` reports and a second `destroy()` keeps.
   The other case covers a root with no original attribute. Both use `sessionStorage`.
5. `npm run test:policy` → `Tests 109 passed | 1 skipped (110)`, exit 0. The skip is in the vendored
   `tests/policy.test.ts`, which this unit did not touch. `npm run test:guides` →
   `Tests 19 passed (19)`, exit 0.

Observation, not a criterion: the whole `src:browser` project was not run; the Orchestrator takes
that run.

## Review evidence

`git status --short`:

```text
 M guides/veneer.md
 M src/browser/ColorMode.ts
 M tests/src/browser/ColorMode.test.ts
```

`git diff --stat`:

```text
 guides/veneer.md                    |  5 +++--
 src/browser/ColorMode.ts            | 12 ++++++++---
 tests/src/browser/ColorMode.test.ts | 41 +++++++++++++++++++++++++++++++++++++
 3 files changed, 53 insertions(+), 5 deletions(-)
```

`git diff` for the source and the guide:

```diff
--- a/src/browser/ColorMode.ts
+++ b/src/browser/ColorMode.ts
@@ -9,7 +9,8 @@
  * so a root nested inside an island of the other mode opens its own island rather than inheriting
- * the one around it.
+ * the one around it. After destruction, applying a mode writes neither the root nor storage, and
+ * toggling writes nothing and returns the root's live mode.
@@ -23,8 +24,9 @@
 	// attribute, and `undefined` after destruction has put that reading back. The three readings are
-	// what a second `destroy` call and a later external write are told apart by, so no separate flag
-	// records that this controller wrote anything.
+	// what a second `destroy` call and a later external write are told apart by, and `undefined` is
+	// the destroyed state that stops `apply` and `toggle` from writing, so no separate flag records
+	// that this controller wrote anything or that it was destroyed.
@@ -44,11 +46,15 @@
 	apply(mode: ColorModeState): void {
+		if (this.#original === undefined) return
 		this.#root.setAttribute(COLOR_MODE_ATTRIBUTE, mode)
 		this.#storage?.setItem(COLOR_MODE_KEY, mode)
 	}
 
 	toggle(): ColorModeState {
+		// A destroyed controller reports the mode the root carries rather than one it can no longer
+		// write, so the return value always matches the root.
+		if (this.#original === undefined) return this.mode
 		const mode = this.mode === 'dark' ? 'light' : 'dark'

--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -45,8 +45,9 @@
 writes that construction reading back, removes the attribute where the root carried none, and
-releases the root, so a later call writes nothing. Storage operations use the supplied browser
-storage directly and propagate its errors.
+releases the root, so a later `destroy`, `apply`, or `toggle` call writes neither the root nor
+storage, and a later `toggle` call returns the mode the root carries. Storage operations use the
+supplied browser storage directly and propagate its errors.
```

The test diff adds the two cases named in § Red-first record at the end of the `ColorMode`
`describe` block (from line 157), and changes no existing case.

## Deviation state

No deviation. Settled within scope:

- **Liveness check.** The check reads the existing `#original === undefined` state inline in `apply`
  and `toggle`. No flag or private getter was added.
- **`toggle` guard.** The `toggle` method carries its own guard. Guarding `apply` alone would have
  left `toggle` returning the flipped mode it never wrote.
- **Guide wording.** The sentence names `destroy`, `apply`, and `toggle` explicitly. "Writes
  neither the root nor storage" is also true of `destroy`, which never writes storage.
