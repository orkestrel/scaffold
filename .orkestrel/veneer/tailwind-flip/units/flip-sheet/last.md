Stopped under the brief’s deviation contract. `test:setup` requires an unowned recipe record to change.

Expected: the gate passes. Found: `tests/setupServer.test.ts` calls `readRecipe()`, which rejects the recorded sheet digest:

- Recorded: `9b5ee0606c13e3c5f96811c8f83fa64c68a52fad75b1518fa34e9346e725454f`
- Built: `f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40`

Hypothesis: U3’s recipe regeneration resolves this failure. No unowned file was changed, no agent was spawned, and nothing was committed.

The source changes, instruments, tests, and guide table are implemented. The final `_mixins.scss` changes—rejecting class compounds containing `:not([class])` and suppressing `unlayer` while copying mixed declarations—were made after the successful sheet tests and remain unverified.

1. Acceptance results follow. Measurements describe the tested revision preceding those final mixin changes.

| Criterion | Expected | Measured |
|---|---|---|
| Bootstrap build and digest | Successful build; required digest | Passed; digest matches |
| Tailwind build and order | Successful build; order statement first | Passed after resolving Sass namespace collisions; first CSSOM rule equals the order statement |
| `check:src:bootstrap` | Exit 0 | Exit 0 |
| `check:src:tailwindcss` | Exit 0 | Exit 0 |
| `lint:check` | Exit 0 | Exit 0 before the final edits |
| `format:check` | Exit 0 | Exit 1; owned files formatted; full gate not rerun before stop |
| `test:src:bootstrap` | Unchanged tests pass | 14 passed |
| `test:src:tailwindcss` | Sheet, derivation, and curation proofs pass | 5 passed |
| `proves link 1` | Pass | 1 passed |
| `proves link 2` | Pass | 1 passed |
| `recreates the literal regions` | Pass | 51 passed |
| `recreates the utilities pass` | Pass | 8 passed |
| `configures the drop-in through the published barrel` | Pass | 1 passed |
| `test:setup` | Exit 0 | Exit 1: 152 passed, 1 failed in an unowned file |
| `test:setup:browser` | Exit 0 | Exit 0: 120 passed |

The passing derivation proof reads 73 normal reboot rules and 72 copies, excludes the shared utility rules and `[hidden]`, preserves the remaining important sequence, and rejects a planted rule, an unwithheld `.mt-3`, and a copy missing a curated class. Every guide witness passes against a scratch Tailwind compile and departs when its repair is removed.

The literal lists use one name per line. Bootstrap barrel imports use distinct Sass namespaces. The withholding guard lives in the existing `utility` emitter in `_mixins.scss`; `_utilities.scss` retains its map and schedule. Formatting used:

```text
npx oxfmt --config .oxfmtrc.json --write guides/veneer.md src/bootstrap/_mixins.scss src/bootstrap/_reset.scss src/bootstrap/_tokens.scss src/tailwindcss/_tokens.scss tests/setup.test.ts tests/setup.ts tests/setupStyles.test.ts tests/setupStyles.ts tests/src/tailwindcss/index.test.ts tests/types.ts
```

The failed Tailwind build output was:

```text
> @orkestrel/veneer@0.0.1 build:src:tailwindcss
> vite build --config configs/src/vite.tailwindcss.config.ts

vite v8.3.2 building client environment for production...
transforming...
✓ 2 modules transformed.
✗ Build failed in 1.24s
error during build:
Build failed with 1 error:

[plugin vite:css] /home/user/veneer/src/tailwindcss/index.scss
Error: [sass] There's already a module with namespace "elements".
    ╷
3   │ @use '../bootstrap/elements';
    │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ original @use
... │
6   │ @use 'elements';
    │ ^^^^^^^^^^^^^^^ new @use
    ╵
  src/tailwindcss/index.scss 6:1  root stylesheet
[sass] There's already a module with namespace "elements".
    ╷
3   │ @use '../bootstrap/elements';
    │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ original @use
... │
6   │ @use 'elements';
    │ ^^^^^^^^^^^^^^^ new @use
    ╵
  src/tailwindcss/index.scss 6:1  root stylesheet
Error: There's already a module with namespace "elements".
    ╷
3   │ @use '../bootstrap/elements';
    │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ original @use
... │
6   │ @use 'elements';
    │ ^^^^^^^^^^^^^^^ new @use
    ╵
  src/tailwindcss/index.scss 6:1  root stylesheet
    at Object.throwExpression (/home/user/veneer/node_modules/sass/sass.dart.js:2336:64)
    at _EvaluateVisitor_visitUseRule_closure2.call$2 (/home/user/veneer/node_modules/sass/sass.dart.js:97776:13)
    at _EvaluateVisitor__loadModule__closure6.call$0 (/home/user/veneer/node_modules/sass/sass.dart.js:96065:28)
    at /home/user/veneer/node_modules/sass/sass.dart.js:95303:29
    at _wrapJsFunctionForAsync_closure.$protected (/home/user/veneer/node_modules/sass/sass.dart.js:4988:15)
    at _wrapJsFunctionForAsync_closure.call$2 (/home/user/veneer/node_modules/sass/sass.dart.js:39061:12)
    at Object._asyncStartSync (/home/user/veneer/node_modules/sass/sass.dart.js:4952:20)
    at _EvaluateVisitor2._addExceptionSpanAsync$body$_EvaluateVisitor0 (/home/user/veneer/node_modules/sass/sass.dart.js:95347:16)
    at _EvaluateVisitor2._async_evaluate0$_addExceptionSpanAsync$1$3$addStackFrame (/home/user/veneer/node_modules/sass/sass.dart.js:95284:19)
    at /home/user/veneer/node_modules/sass/sass.dart.js:96036:39
    at aggregateBindingErrorsIntoJsError (file:///home/user/veneer/node_modules/rolldown/dist/shared/error-Bj1xBdEY.mjs:49:18)
    at unwrapBindingResult (file:///home/user/veneer/node_modules/rolldown/dist/shared/error-Bj1xBdEY.mjs:19:128)
    at #build (file:///home/user/veneer/node_modules/rolldown/dist/shared/rolldown-jmAeXo_f.mjs:133:34)
    at async buildEnvironment (file:///home/user/veneer/node_modules/vite/dist/node/chunks/node.js:34490:66)
    at async Object.build (file:///home/user/veneer/node_modules/vite/dist/node/chunks/node.js:34911:19)
    at async Object.buildApp (file:///home/user/veneer/node_modules/vite/dist/node/chunks/node.js:34908:153)
    at async CAC.<anonymous> (file:///home/user/veneer/node_modules/vite/dist/node/cli.js:780:3) {
  errors: [Getter/Setter]
}
```

The formatting gate output was:

```text
> @orkestrel/veneer@0.0.1 format:check
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

guides/veneer.md (2046ms)
src/bootstrap/_mixins.scss (0ms)
src/bootstrap/_reset.scss (0ms)
src/bootstrap/_tokens.scss (0ms)
src/tailwindcss/_tokens.scss (0ms)
tests/setup.test.ts (3ms)
tests/setup.ts (6ms)
tests/setupStyles.test.ts (1ms)
tests/setupStyles.ts (1ms)
tests/src/tailwindcss/index.test.ts (0ms)

Format issues found in above 10 files. Run without `--check` to fix.
Finished in 5082ms on 357 files using 4 threads.
```

The focused Node test initially failed because its Sass raw import did not supply the source text. Reading the file directly fixed it; the rerun passed 55 tests. Its failure output was:

```text
 RUN  v4.1.11 /home/user/veneer

 ❯ |setup| tests/setup.test.ts (55 tests | 1 failed) 2918ms
   × pins the curation table and shared literals to their sources with planted and removed controls 9ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |setup| tests/setup.test.ts > pins the curation table and shared literals to their sources with planted and removed controls
Error: Value is required
 ❯ requireValue node_modules/@orkestrel/test/src/core/helpers.ts:532:30
 ❯ tests/setup.test.ts:14:19
     12| it('pins the curation table and shared literals to their sources with …
     13|  const rows = readCuration(guide)
     14|  const curation = requireValue(/\$curation:\s*\(([\s\S]*?)\);/u.exec(c…
       |                   ^
     15|  const names = [...curation.matchAll(/'([^']+)'/gu)].map((match) => ma…
     16|  expect(rows.filter((row) => row.form === 'reboot').map((row) => row.s…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed (1)
      Tests  1 failed | 54 passed (55)
   Start at  07:52:06
   Duration  3.91s (transform 449ms, setup 168ms, import 665ms, tests 2.92s, environment 0ms)
```

The blocking full setup gate’s captured stdout and stderr were:

```text
> @orkestrel/veneer@0.0.1 test:setup
> vitest run --config vite.config.ts --no-cache --reporter=dot --project setup


 RUN  v4.1.11 /home/user/veneer

·······················································································································································x·

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 152 passed (153)
   Start at  07:54:32
   Duration  21.52s (transform 989ms, setup 351ms, import 1.45s, tests 23.91s, environment 0ms)


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |setup| tests/setupServer.test.ts > compatibility recipe infrastructure > refuses malformed recipes and each changed package or sheet identity
Error: Recipe sheet digest does not match
 ❯ readRecipe tests/setupServer.ts:996:9
    994|  }
    995|  if (record.sheet !== createHash('sha256').update(readFileSync(TAILWIN…
    996|   throw new Error('Recipe sheet digest does not match')
       |         ^
    997|  return record
    998| }
 ❯ tests/setupServer.test.ts:992:18

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


exit=1 signal=none capped=false duration_ms=22831
```

2. The copy table follows. `W` denotes this exact selector suffix:

```css
:where(.modal-title, .offcanvas-title, .popover-header, .card-title, .card-text, .accordion-header, .accordion-button, .pagination, .placeholder-glow, .stretched-link, .visually-hidden-focusable, .alert-link, .card-link, .icon-link, .link-primary, .link-secondary, .link-success, .link-danger, .link-warning, .link-info, .link-light, .link-dark, .link-body-emphasis)
```

Conditions remain unchanged. The passing Chromium derivation proof covers the following normal-rule sequence; universal selectors before pseudo-elements may be omitted by CSSOM serialization.

| Original selector | Copy selector | Condition |
|---|---|---|
| `*, *::before, *::after` | `*W, *W::before, *W::after` | |
| `:root` | `:rootW` | Reduced motion: no preference |
| `body` | `bodyW` | |
| `hr` | `hrW` | |
| `h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1` | `h6W, .h6, h5W, .h5, h4W, .h4, h3W, .h3, h2W, .h2, h1W, .h1` | |
| `h1, .h1` | `h1W, .h1` | |
| `h1, .h1` | `h1W, .h1` | Minimum width 1200px |
| `h2, .h2` | `h2W, .h2` | |
| `h2, .h2` | `h2W, .h2` | Minimum width 1200px |
| `h3, .h3` | `h3W, .h3` | |
| `h3, .h3` | `h3W, .h3` | Minimum width 1200px |
| `h4, .h4` | `h4W, .h4` | |
| `h4, .h4` | `h4W, .h4` | Minimum width 1200px |
| `h5, .h5` | `h5W, .h5` | |
| `h6, .h6` | `h6W, .h6` | |
| `p` | `pW` | |
| `abbr[title]` | `abbr[title]W` | |
| `address` | `addressW` | |
| `ol, ul` | `olW, ulW` | |
| `ol, ul, dl` | `olW, ulW, dlW` | |
| `ol ol, ul ul, ol ul, ul ol` | `ol olW, ul ulW, ol ulW, ul olW` | |
| `dt` | `dtW` | |
| `dd` | `ddW` | |
| `blockquote` | `blockquoteW` | |
| `b, strong` | `bW, strongW` | |
| `small, .small` | `smallW, .small` | |
| `mark, .mark` | `markW, .mark` | |
| `sub, sup` | `subW, supW` | |
| `sub` | `subW` | |
| `sup` | `supW` | |
| `a` | `aW` | |
| `a:hover` | `a:hoverW` | |
| `a:not([href]):not([class]), a:not([href]):not([class]):hover` | No copy: class restriction is unsatisfiable | |
| `pre, code, kbd, samp` | `preW, codeW, kbdW, sampW` | |
| `pre` | `preW` | |
| `pre code` | `pre codeW` | |
| `code` | `codeW` | |
| `a > code` | `a > codeW` | |
| `kbd` | `kbdW` | |
| `kbd kbd` | `kbd kbdW` | |
| `figure` | `figureW` | |
| `img, svg` | `imgW, svgW` | |
| `table` | `tableW` | |
| `caption` | `captionW` | |
| `th` | `thW` | |
| `thead, tbody, tfoot, tr, td, th` | `theadW, tbodyW, tfootW, trW, tdW, thW` | |
| `label` | `labelW` | |
| `button` | `buttonW` | |
| `button:focus:not(:focus-visible)` | `button:focus:not(:focus-visible)W` | |
| `input, button, select, optgroup, textarea` | `inputW, buttonW, selectW, optgroupW, textareaW` | |
| `button, select` | `buttonW, selectW` | |
| `[role="button"]` | `[role="button"]W` | |
| `select` | `selectW` | |
| `select:disabled` | `select:disabledW` | |
| `button, [type="button"], [type="reset"], [type="submit"]` | `buttonW, [type="button"]W, [type="reset"]W, [type="submit"]W` | |
| `button:not(:disabled), [type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled)` | `button:not(:disabled)W, [type="button"]:not(:disabled)W, [type="reset"]:not(:disabled)W, [type="submit"]:not(:disabled)W` | |
| `textarea` | `textareaW` | |
| `fieldset` | `fieldsetW` | |
| `legend` | `legendW` | |
| `legend` | `legendW` | Minimum width 1200px |
| `legend + *` | `legend + *W` | |
| `::-webkit-datetime-edit-fields-wrapper, ::-webkit-datetime-edit-text, ::-webkit-datetime-edit-minute, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-year-field` | `W::-webkit-datetime-edit-fields-wrapper, W::-webkit-datetime-edit-text, W::-webkit-datetime-edit-minute, W::-webkit-datetime-edit-hour-field, W::-webkit-datetime-edit-day-field, W::-webkit-datetime-edit-month-field, W::-webkit-datetime-edit-year-field` | |
| `::-webkit-inner-spin-button` | `W::-webkit-inner-spin-button` | |
| `[type="search"]` | `[type="search"]W` | |
| `[type="search"]::-webkit-search-cancel-button` | `[type="search"]W::-webkit-search-cancel-button` | |
| `::-webkit-search-decoration` | `W::-webkit-search-decoration` | |
| `::-webkit-color-swatch-wrapper` | `W::-webkit-color-swatch-wrapper` | |
| `::-webkit-file-upload-button` | `W::-webkit-file-upload-button` | |
| `::file-selector-button` | `W::file-selector-button` | |
| `output` | `outputW` | |
| `iframe` | `iframeW` | |
| `summary` | `summaryW` | |
| `progress` | `progressW` | |

Additional source rules have these outcomes:

| Original selector | Copy or omission |
|---|---|
| `[list]:not([type="date"]):not([type="datetime-local"]):not([type="month"]):not([type="week"]):not([type="time"])::-webkit-calendar-picker-indicator` | No copy: its only declaration is unlayered important |
| `[hidden]` | Original and copy withheld when `$reset` is true |
| `::-moz-focus-inner` | Authored copy is `W::-moz-focus-inner`; Chromium discards this selector, so it is outside the measured CSSOM sequence |

3. Digest measurements follow. The unlayered values are SHA-256 of the Sass CLI output files, using the same command before and after.

```text
$layered: false before
214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7

$layered: false after
214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7

Default built Bootstrap
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

These measurements precede the final unverified mixin changes.

4. Curation uses **verdict § 4’s seed, expanded exactly by the closing Curation note**. U1’s `report.md` and `curation.json` were present. Its 194-row curation was not used. The guide and Sass declarations contain the prescribed 23 reboot classes and 5 restore selectors.

5. The full `test:conformance` and `test:integration` observations were **not run** because the required stop occurred at `test:setup`. No U3/U4 failure titles are claimed. The already-running `test:setup:browser` completed successfully before this report.

6. Final `git status --porcelain` follows. `git diff --check` produced no output.

```text
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_reset.scss
 M src/bootstrap/_tokens.scss
 D src/tailwindcss/_reset.scss
 M src/tailwindcss/_tokens.scss
 M src/tailwindcss/index.scss
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
?? tests/types.ts
```