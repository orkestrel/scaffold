# U1 fix round audit — numbered claims (round 2)

Subject: the fix-round diff in the Veneer checkout `C:/Users/mikes/WebstormProjects/veneer`,
from `ae0221d` to the commit the dispatch names, made by `builder` (native Sonnet) from
`units/u1-fix-brief.md` and `units/u1-fix-brief-2.md`, with its report `units/u1-fix-report.md`.
Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence. Read
the actual diff (`units/u1-fix-diff.patch.txt`) and the checkout, never the report alone.

1. **Containment.** `readEscapingImport` in `tests/setupConformance.ts` decides containment only
   through `resolveContained` imported from `@orkestrel/test/server`, keeping its specifier
   extraction and real-path resolution; the closure assertion in `tests/conformance.test.ts`
   calls the same primitive; no hand-written `relative`/`'..'`/`isAbsolute` predicate remains in
   either file; the rejecting controls in `tests/setupConformance.test.ts` still pass.
2. **CommonJS specifiers.** `readSpecifiers` collects the string argument of every `require(...)`
   call whose callee is the identifier `require`, in source order with the ES forms, and
   `tests/setupConformance.test.ts` carries the control `const dependency = require("vue")` →
   `['vue']` with `readForbiddenSource` returning `'vue'`; the report records that control red
   before the change.
3. **Digest controls.** `tests/setupConformance.test.ts` proves each of the three digest constants
   equals `readFileDigest` of its installed artifact and that the three digests are pairwise
   distinct; case names say what is proved where.
4. **Falsifiable layer assertion.** `tests/distribution.test.ts` no longer carries
   `expect(reading.layers).not.toStrictEqual(['utilities'])`; the replacement asserts the
   statement rule was found and that the first name is `theme`, each able to fail alone.
5. **RTL guard.** `tests/setupStyles.test.ts` fails when `dist/src/styles/index.css` carries a
   physical inline-axis declaration while `index.rtl.css` is byte-identical, is named for the
   permitted state, and the report records it red on a planted `padding-left: 1px` with
   `src/styles/_tokens.scss` restored byte-identical (`git diff --exit-code`).
6. **Static stylesheet import.** `app/browser/main.ts` imports `../../src/styles/index.scss`
   statically before `./styles/index.scss`, contains no dynamic import, declares nothing, and is
   synchronous; `lint:check` passes without a suppression.
7. **Ownership.** In `src/browser/color-mode/ColorMode.ts`, the ownership flag is true only after
   this controller's own set and false after its own removal; `destroy` removes the attribute
   only when the flag is true; `tests/src/browser/color-mode/ColorMode.test.ts` carries the
   ordering `apply('light')` → external `setAttribute('data-bs-theme', 'dark')` → `destroy()`
   leaving `dark`, recorded red first; `src/browser/types.ts` and `guides/veneer.md` still read
   "Removes the attribute only when this controller wrote it" and the code honors it.
8. **One landmark name.** `app/browser/showcases/Showcase.ts` sets no `aria-label` on `main`; the
   `section` keeps `Showcase`; the journeys and the showcase proof still resolve the region.
9. **Showcase column.** `guides/README.md` `## By concept` carries a `Showcase` column linking
   `app/browser`; `test:guides` is green with it.
10. **One recorder helper.** `tests/setupBrowser.ts` exports `recordListeners` (installs the
    recorder on `EventTarget.prototype.addEventListener`, runs the action, restores in `finally`,
    returns the recorded targets), `tests/setupBrowser.test.ts` proves the empty and the
    `[document]` readings, and both cases in `tests/src/browser/index.test.ts` call it with no
    inline recorder left.
11. **Distribution page.** `BROWSER_PAGE` carries the link
    `<link id="veneer-styles" rel="stylesheet" href="./styles.css" vite-ignore />`, `bundleEntry`
    writes the resolved stylesheet under the page's `public/` directory, and the two cases that
    timed out (`loads standalone styles with the declared cascade order [requires the registry]`
    and `publishes what it declares to a real browser, and no more [requires a browser]`) pass
    on the host with the registry reachable.
12. **Scope and process.** Only the files the two fix briefs own changed; `package.json`, the
    lockfile, and every vendored path are unchanged; the first fix run's use of `git stash` (a
    permission-floor breach it reported itself) left no trace in the tree or the reflog beyond a
    dropped stash, and the successor run used no git write.
13. **Gates.** Every gate the fix report lists reproduces green on the same commit on managed
    Chromium, `test:distribution` included.
