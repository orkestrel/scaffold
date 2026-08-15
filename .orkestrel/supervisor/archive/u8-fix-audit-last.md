1. **UNRESOLVED** — The assertion enumerates disk-backed PNG/TXT files and rejects extras and empty files in [portfolio.test.ts](/workspace/supervisor/tests/app/browser/portfolio.test.ts:387). However, the two claimed red executions appear only in the non-authoritative writer report; the acceptance log records the restored green run. Settlement requires exit-code/stdout records for both mutations under the same test command.

2. **UNRESOLVED** — The shipped cascade correctly places `.btn-check:focus-visible + .btn` after Halfmoon at equal specificity in [focus.css](/workspace/supervisor/app/browser/styles/focus.css:27), and the retained readings are 4.34/4.83. The claimed pre-fix 2.25/1.93 red execution is not independently recorded. Settlement requires its failing command output and exit code.

3. **BROKEN** — Failing input: inspect `readRing`’s TSDoc. It describes measurement equivalence with `readFocus`, but never records the sanctioned future consolidation claimed by the report ([setupBrowser.ts](/workspace/supervisor/tests/setupBrowser.ts:893)). The diff is otherwise additive. Smallest fix: add an explicit sentence directing future consolidation of `readFocus` through `readRing` once the byte-identity constraint is lifted.

4. **CONFIRMED** — The app helper and every app consumer now use `deriveLineage`; the published core `deriveAddress` remains untouched. The guide’s row, import, and example call agree, and guide parity reports 374/374.

5. **BROKEN** — The exclusion ruling is honestly recorded where membership is enforced, and all 182 expected files are present and non-empty. However, the retained accessibility evidence is not fully truthful: `<th scope="row">` in [TaskView.vue](/workspace/supervisor/app/browser/components/TaskView.vue:146) is serialized as `columnheader`, visible in [open-wide-light-tree.txt](/workspace/supervisor/tests/app/browser/__screenshots__/portfolio/open-wide-light-tree.txt:55). The implicit-role table hard-codes every `TH` as `columnheader`. Additionally, [open-wide-light-steps.txt](/workspace/supervisor/tests/app/browser/__screenshots__/portfolio/open-wide-light-steps.txt:1) omits the preceding `open` interaction. Smallest fix: resolve `TH` roles from `scope`, route every scripted operation through action-and-record helpers, then recapture the affected trees and step journals.

6. **CONFIRMED** — The renamed test asserts separator-collapse behavior and records the ambiguity as a deliberate decision beside the assertion in [helpers.test.ts](/workspace/supervisor/tests/app/browser/helpers.test.ts:622).

7. **CONFIRMED** — The fix diff is limited to the owned app-browser/test files plus the integrated guide hunks. `src/**`, `configs/**`, `vite.config.ts`, `app/core`, and `app/server` are untouched.

8. **CONFIRMED** — Halfmoon’s `.focus-ring:focus` rule would outrank the app ring, but no app element uses that class. Recording rather than expanding the fix was correct.

**Finding outside the claims — BROKEN:** `Journal.watch()` introduces nested function assignments in [setupBrowser.ts](/workspace/supervisor/tests/setupBrowser.ts:640), contrary to the repository’s no-nested-functions rule. Smallest fix: move the console forwarders, event listeners, and restoration behavior into stable class methods/fields or a dedicated recorder entity.

VERDICT: FAIL — 2 broken, 2 unresolved, 0 not-evidenced, 1 findings outside the claims