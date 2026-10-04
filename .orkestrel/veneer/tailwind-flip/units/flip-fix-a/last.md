1. **Done — controls.** The ownership, exclusion, and precedence cases run their predicates against altered inputs. Deleted the redundant `SHEET_LAYERS` case: the complete derivation proof already pins ownership. Negative runs each exit 1:
   - Planted `base`: “expected false to be true”.
   - Layered importance: “expected false to be true”.
   - Reordered exclusion: “expected 123 to be greater than 23908”.
   - Dropped exclusion name: expected 1833 names, received 1832.
   - `.table tr` replacement: “copy :where(.table) tr: expected -1 to be greater than or equal to 0”.
   - Late copy: “copy :where(.table) tr: expected 2502 to be less than 164”.

2. **Done — hazard witnesses.** Only the Witness cells change for `thead` and `tfoot`. Each now has a plain and hazard element; the witness case reads both. Removed-repair controls each exit 1: expected plain border color `rgb(222, 226, 230)`, received `rgb(33, 37, 41)`.

3. **Done — vocabulary and titles.** Removed the dead exemption branch, corrected the compile helper’s TSDoc, used “Bootstrap for Tailwind” in the introduction, and pluralized the switch comment. Title replacements are:

   | Old title | Replacement |
   |---|---|
   | `assigns reset and bootstrap to the tuned sheet and refuses the mirror ownership` | Deleted under item 1 |
   | `compatibility recipe guards and exemptions` | `compatibility recipe guards and exclusions` |
   | `refuses a separate Bootstrap sheet beside the recipe because its important utility wins` | `reads the Bootstrap important utility winning beside the recipe` |
   | `reads the resolved values under its declared variant and partitions every departure of the tailwindcss face` | `reads resolved values, Tailwind readings, the census, and contrast under its declared variant` |
   | `keeps every fixed text color readable in the %s color mode` | `keeps the licensed light, white, dark, and black text frames readable in the %s color mode` |
   | `exports only the Bootstrap registries with names keyed by their segments` | `exports the registries and coded error contract` |
   | `settles retained, configured, replaced, and destroyed lifetimes in the registry` | `settles retained, configured, replaced, and destroyed lifetimes` |
   | `drives the $family table through its controls` | `drives the $family table through its controls with motion=$motion` |
   | `drives the modal table through its controls` | `drives the modal table through its controls with motion=false` |

   All seven matrix citations follow the renamed case. The modal command filter follows its resolved title. The `%s` citation keeps the literal source title because the resolver accepts that form. Regenerated titles resolve with **`unresolved: 0`**.

4. **Done — overrides table and integration cases.** Installed Tailwind 4.3.3 defines `dark` through `@media (prefers-color-scheme: dark)`.
   - Later unlayered important override: `32px`; removed control: “expected `32px`, received `12px`”.
   - `mt-3!`: `12px` under both Tailwind faces; removed-rule controls: expected `['12px', '12px']`, received `['0px', '0px']`.
   - `dark:bg-black`: `rgb(0, 0, 0)` under dark media emulation, including with the Bootstrap light theme; `rgba(0, 0, 0, 0)` under light media with `data-bs-theme="dark"`. Removed-class control: expected black, received transparent.

5. **Done — proof placement.** Both artifact proofs move into conformance’s `Tailwind compatibility recipe` describe with their titles and controls retained; ROADMAP lists them. Negative runs exit 1: removed literal expects 6 scoped selectors and receives 5; planted literal receives 7; the barrel control receives an additional `.planted{opacity:.5}` rule instead of the equal built-sheet round trip.

6. **Done — chrome census.** Checks cover `h-100`, `rounded`, `border`, and card-body `gap-3` and `w-100`. Each planted control exits 1: “expected [ … ] to strictly equal []”.

7. **Done — positional coupling.** Both selections use specimen and subject. Missing-selection controls exit 1:
   - Face: “bootstrap stays bootstrap through the Bootstrap button: Value is required”.
   - Alignment: “Value is required”.

8. **Done — Sass names.** `$withhold`, `$curated`, `$restored`, and `$scoped` match across the configuration boundary; pins and prose follow. Both requested builds exit 0, and both sheets remain byte-identical.

9. **Done — composition order.** The integration case reads equal shared-name witness longhands under both raw composition orders. Its planted unlayered rule fails equality: expected opacity `1`, received `0.5`.

10. **Done — R11 and writer.** ROADMAP includes the full R11 token list. Removed the writer’s Chromium-141 assertion. The writer was not run.

11. **Done — guide voice.** Kept the Bootstrap-class path. Heading sizes are described as literal declarations, separately from `--bs-*` declarations.

12. **Done — structural file retained.** `src/tailwindcss/_mixins.scss` is untouched.

Negative-run evidence is retained in [controls.log](/home/user/veneer/tmp/units/flip-fix-a/controls.log) and [moved-controls.log](/home/user/veneer/tmp/units/flip-fix-a/moved-controls.log).

The final acceptance run exits as follows:

| Gate | Exit | Result |
|---|---:|---|
| `npm run check` | 0 | |
| `npm run lint:check` | 0 | |
| `npm run format:check` | 0 | |
| `npm run test:setup` | 0 | 150 passed |
| `npm run test:src:tailwindcss` | 0 | 6 passed |
| `npm run test:conformance` | 0 | 119 passed |
| `npm run test:guides` | 0 | 15 passed |
| `npm run test:policy` | 0 | 119 passed, 1 existing canon-only skip |
| `npm run test:setup:browser` | 0 | 134 passed |
| `npm run test:integration` | 0 | 58 passed |
| `npm run test:app:browser` | 0 | 236 passed |
| `git diff --check` | 0 | |
| `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | 0 | Both unchanged |
| `git diff --stat` | 0 | No record files |
| `node tmp/flip-guide/resolve.ts tmp/units/flip-fix-a/all-titles.txt guides/veneer.md` | 0 | `unresolved: 0` |

`npm run test:journey` was not run. The earlier check, lint, and formatting failures were corrected. Their failure output was:

```text
tests/setup.test.ts(5,1): error TS6133: 'requireValue' is declared but its value is never read.
```

```text
tests/app/browser/sections/integration.test.ts:138:4: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/app/browser/sections/integration.test.ts:142:18: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/app/browser/sections/integration.test.ts:146:4: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/src/tailwindcss/index.test.ts:388:7: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/integration.test.ts:763:9: warning eslint(no-shadow): 'tailwind' is already declared in the upper scope. help: Consider renaming 'tailwind' to avoid shadowing the variable from the outer scope.
tests/integration.test.ts:865:9: warning eslint(no-shadow): 'utilities' is already declared in the upper scope. help: Consider renaming 'utilities' to avoid shadowing the variable from the outer scope.
tests/integration.test.ts:607:8: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/integration.test.ts:607:21: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/setup.test.ts:5:10: error eslint(no-unused-vars): Identifier 'requireValue' is imported but never used. help: Consider removing this import.
```

```text
ROADMAP.md (516ms)
guides/veneer.md (1693ms)
tests/app/browser/sections/integration.test.ts (0ms)
tests/conformance.test.ts (12ms)
tests/integration.test.ts (4ms)
tests/setup.ts (6ms)
tests/setupBrowser.test.ts (40ms)
tests/setupBrowser.ts (148ms)
tests/src/tailwindcss/index.test.ts (1ms)

Format issues found in above 9 files. Run without `--check` to fix.
Finished in 4009ms on 357 files using 4 threads.
```

Only those owned files were formatted with `npx oxfmt`.

The digests before and after are identical:

```text
Bootstrap before: 7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
Bootstrap after:  7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
Tailwind before:  22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43
Tailwind after:   22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43
```

Copy this deletion to the durable preflight writer:

```diff
-	expect(chromium).toBe(141)
```

Final `git status --porcelain` follows. Nothing is committed.

```text
 M ROADMAP.md
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/tailwindcss/_tokens.scss
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/conformance.test.ts
 M tests/integration.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupServer.ts
 M tests/src/tailwindcss/index.test.ts
```