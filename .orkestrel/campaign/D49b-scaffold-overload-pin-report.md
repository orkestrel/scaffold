# D4-9b — report (builder, Sonnet) — returned 2026-09-15 ~17:45Z

Brief: `D49b-scaffold-overload-pin-brief.md`. Captured from the completion notification.

## Carriers

1. **The pin's name and place.** Renamed `reads an exported function overload as one name` to `reads each signature of an exported function overload` and moved it to sit directly before `locates declarations across comments and CRLF while normalizing paths`, with one blank line on each side (`tests/setupPolicy.test.ts:160-188`).
2. **The pin's controls.** Kept the `export default 1` control and added the declaration-refusal control (`export import Legacy = require('node:path')`) and the statement-refusal control (`export = 1`), both asserting the exact messages named in the brief (`tests/setupPolicy.test.ts:174-186`).
3. **The door.** Added the `function overload` row to `POLICY_SURFACE_EXPORT_CASES` after the `function` row (`tests/setupPolicy.ts:84-90`).
4. **The collision key.** Dropped `line` from the collision dedupe key in `inspectPolicySurface` (`tests/setupPolicy.ts:1985`), and added the pin `reports an overloaded export's collision once` beside the matrix loop (`tests/setupPolicy.test.ts:45-75`).
5. **Regenerate.** Ran `npm run build`; `host.json` moved as detailed below.

## Red-then-green

Command: `npm run test:setup -- tests/setupPolicy.test.ts`

- Red (before the key change, key unchanged): `AssertionError: expected [ { rule: 'surface', …(3) }, …(2) ] to deeply equal [ { rule: 'surface', …(3) } ]` — three entries at lines 1, 2, 3 for `tests/setupServer.ts`. `Test Files 1 failed (1)`, `Tests 1 failed | 32 passed (33)`.
- Green (after the key change): `Test Files 1 passed (1)`, `Tests 33 passed (33)`.

## host.json hunks

```diff
@@ -700,7 +700,7 @@
 			"storage": "guides/agent.md",
 			"destination": "guides/agent.md",
 			"executable": false,
-			"digest": "78ca060a40cc7ae1f7fe4eacb2b0b3005323d3b1bacdc1419bf5637821e7dd5d"
+			"digest": "55487dfd29fd256ff5d770b422d9fc4f45d4bfad48edf094fefa3c36a8b069ba"
 		},
@@ -958,7 +958,7 @@
 			"storage": "guides/tool.md",
 			"destination": "guides/tool.md",
 			"executable": false,
-			"digest": "e98b3d3cd0aabd8f2f8576b847759088bfea26990340de35a9773bf506e7a8eb"
+			"digest": "ad68991917befd3cc8b2816035e91ceac62fad3a281684a9d943d7fc49615d48"
 		},
@@ -1030,7 +1030,7 @@
 			"storage": "tests/setupPolicy.ts",
 			"destination": "tests/setupPolicy.ts",
 			"executable": false,
-			"digest": "6e8f25094817161541d66d1a18938ec6c9ae4769c530569117e2b9565e84d2b7"
+			"digest": "22f94ac2be89aa62b812077b9786a9612898576e76bb3da488e4789e130447df"
 		}
 	],
@@ -1993,5 +1993,5 @@
 	],
-	"digest": "bc26629532b44cb4ff74aab6a00194ac90d9b5982d9fa63c52844f42a54dfd7c"
+	"digest": "8b55bfbb97b10ba9237e35e4e849d1350edb368efadae447d24f59dd90b1ec25"
 }
```

The `guides/agent.md` and `guides/tool.md` entry digests moved because `git status` shows those files already dirty (modified, untouched by this unit) before this unit started — the build regenerates `host.json` against the whole current tree, so their stale entries update alongside the `tests/setupPolicy.ts` entry. The staged file count stayed at 172 both before and after (`build-host: staged 172 file(s)`, `build-inventory: staged 172 file(s)`).

## Acceptance readings

1. `npm run format:check` exit 0. (First run flagged formatting on `tests/setupPolicy.test.ts` alone; ran `oxfmt` on that owned file, which added a required blank line, then `format:check` passed clean.)
2. `npm run lint:check` exit 0.
3. `npm run check` exit 0 (full `tsc` plus `check:src:core`, `check:src:server`, `check:src:bin`).
4. `npm run test:setup -- tests/setupPolicy.test.ts` exit 0, `Tests 33 passed (33)`; carrier 4's pin recorded red (three entries) before the key change and green after.
5. `npm run test:policy` exit 0, `Tests 102 passed (102)`.
6. `npm run build` exit 0; `git diff --stat host.json` shows `8 ++++----` (4 insertions, 4 deletions) across the three entry digests named above plus the manifest digest; staged count unchanged at 172.
7. `git status --short -- tests host.json` names only `host.json`, `tests/setupPolicy.test.ts`, `tests/setupPolicy.ts`, and the three pre-existing fixtures (`tests/src/core/fixtures/app-only-toolchain.txt`, `tests/src/core/fixtures/setup-false-manifest.txt`, `tests/src/core/fixtures/source-manifest.txt`).
8. No `any`, assertion, nested function, or default export in the hunks (`export default 1` and `as waitForCondition` occurrences are fixture string literals, not code); no count stated in added prose; the new pins are named for what they prove.

## Deviation state

None.

## Orchestrator note on the `host.json` hunks

The diff the builder read is against HEAD `bf7d33a2`, so it carries every movement since the
checkpoint: the hosted `guides/tool.md` and `guides/agent.md` entry digests moved with the floor
refresh that landed AFTER D4-9 returned and BEFORE D4-9b started (ledger rows `K-scaffold-floor-69`; both retained diffs read `host.json` from the same base blob, and D4-9 carries no guides hunk), and D4-9 moved the `tests/setupPolicy.ts`
entry to `9f3ab06e…` (`D49-diff.patch.txt`). D4-9b's own movement is that entry from `9f3ab06e…`
to `22f94ac2…` plus the manifest digest.
