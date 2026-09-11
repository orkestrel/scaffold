Objective lane held. This is a source review backed by the retained root native receipts; I ran no new executable attack.

### Claim 1 — CONFIRMED

The entry has only native-safe static imports: `@orkestrel/guide/server`, `@orkestrel/test/server`, and `vitest/node`. Repository aliases load only inside the worker registration callback. The entry constructs and executes `GuideCommand` directly, with no local launcher or parity engine ([guides.test.ts](C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts:5), [guides.test.ts](C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts:27), [guides.test.ts](C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts:35)).

The retained pre-edit command failed on the static `@src/core` import ([action.stderr.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-abort-next-native-before/action.stderr.txt:5)). The same native entry after the edit collected and passed the real guides project with exit code `0` ([action.stdout.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-abort-next-native-root/action.stdout.txt:2), [action.exit.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-abort-next-native-root/action.exit.txt:1)).

### Claim 2 — BROKEN

The README-pitch obligation can silently disappear when the package name stops selecting `guides/abort.md`.

`GuideCommand` derives the pitch spec from `package.json`; when selection returns `undefined`, it omits the pitch option ([index.js](C:/Users/mikes/WebstormProjects/abort/node_modules/@orkestrel/guide/dist/src/server/index.js:3723)). `Parity` then skips pitch inspection and returns an empty `report.pitch` ([index.js](C:/Users/mikes/WebstormProjects/abort/node_modules/@orkestrel/guide/dist/src/server/index.js:3485)). The consumer asserts only that empty result ([guides.test.ts](C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts:59)).

Source-review counterexample: change the manifest name from `@orkestrel/abort` to a name with no indexed guide while leaving `README.md` and `guides/abort.md` unequal. The own-row assertion still finds `guides/abort.md`, but `report.pitch` is empty because no pitch comparison ran. This loses the old unconditional README-to-`GUIDE_SPEC` comparison.

Smallest correction: keep product identity downstream. Add `package.json` to the inventory, parse it with the installed Contract parser and guard, and assert its name equals the package-name constant used as the `MODULES` key before asserting `report.pitch`. This pins the selector without changing Guide’s accepted API or duplicating tagline comparison logic.

The remaining named obligations are structurally preserved. In particular, missing rows reach `report.input`; sections and method populations produce findings; example fences and title pairs have explicit empty-population findings; imports, links, tests, fence languages, drift, barrel membership, and `INTERNAL` anti-staleness remain asserted.

### Claim 3 — CONFIRMED

The executable cases still use the real `createAbort` and recorder implementations. They preserve the parent cascade, signal firing, reason identity, and aborted-state inputs and assertions ([guides.test.ts](C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts:184)). The transcription guards retain the exact documented lines ([guides.test.ts](C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts:215)).

The prototype checks inspect the real `Abort.prototype`, require the documented `AbortInterface` group, compare its methods, inspect accessors, and reject symbol members ([guides.test.ts](C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts:142)). No skip, mock, fake, suppression, or narrower inventory was introduced.

### Claim 4 — CONFIRMED

The implementation reuses the installed Guide command, Test inventory reader, and Vitest native runner. Package policy remains in the Abort-owned test. The source contains no prohibited assertion, non-null assertion, `any`, nested named function, or public API addition.

The frozen status names only `tests/guides.test.ts`, and the retained before/after hashes preserve `package.json` and `package-lock.json` ([manifests-before.sha256](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-abort-next-native-root/manifests-before.sha256:1), [manifests-after.sha256](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-abort-next-native-root/manifests-after.sha256:1)).

### Claim 5 — BROKEN

The report’s mapping says `report.pitch` preserves README pitch validation ([d7n-abort-next-native-report.md](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-abort-next-native-report.md:25)). That statement omits the package-name selector precondition and therefore overstates the implemented obligation. Update this row after adding the downstream package-identity pin.

Wording-only: the report records a `614ms` successful run, while the retained root run took `494ms` ([d7n-abort-next-native-report.md](C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-abort-next-native-report.md:42), [action.stdout.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-abort-next-native-root/action.stdout.txt:9)). Separate executions may legitimately differ, but the report should label the `614ms` receipt as the writer’s run so it is not mistaken for root evidence.

VERDICT: FAIL
