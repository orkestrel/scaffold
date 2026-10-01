foundation-fix-11 stopped at the first failing gate, as the brief requires. The edits are present, but the unit is not complete: `npm run test:setup` exited 1 with 14 passed and 1 failed.

Files changed by this unit:

- `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`.
- `tests/src/bootstrap/index.test.ts`, `tests/src/tailwindcss/index.test.ts`, `tests/src/styles/index.test.ts`, `tests/src/styles/themes/index.test.ts`, `tests/integration.test.ts`, `tests/config.test.ts`.
- `vite.config.ts`, `configs/helpers.ts`, `configs/src/vite.bootstrap.config.ts`, `configs/src/vite.tailwindcss.config.ts`, `configs/src/vite.styles.config.ts`.
- `src/core/constants.ts`, `src/styles/themes/_default.scss`, `guides/veneer.md`, `ROADMAP.md`.

The following table records each execution item. “Edited” does not claim that an unrun project passed.

| Item | Change and verification |
| --- | --- |
| 1 — moved-rule control | Extracted the multiline `.last` rule with a regex, moved it, and asserted different text with equal length before unequal round trips. The case passed. Other controls and the CSSOM-loss pair remain. |
| 2 — stamp vectors | Added the empty-string SHA-256 vector and a `node:crypto` digest of `<html></html>`. Kept the existing stamp assertions and `stampPage` case. Edited; config tests not run. |
| 3 — guide pointers | Added the named dark-ancestor, importance, token, source-order, and cross-face override pointers. Removed the Tailwind/styles analogy paragraphs and documented empty layer blocks. Edited; guide tests not run. |
| 4 — roadmap | Deferred the disjointness proof to the Tailwind chunk and documented repair ownership and showcase-template propagation. Edited. |
| 5 — styles refusal | Removed the styles `--bs-` and `.btn` refusals and the roadmap's placeholder-refusal clause. Preserved ownership assertions, the todo, and Tailwind's refusals. Edited. |
| 6 — compiler name | Renamed `compileLayered` to `compileSass` and updated callers and documentation. Setup compiler case passed. |
| 7 — unused exports | Removed the Tailwind/styles path and build-script exports; the loader example uses the Bootstrap pair. |
| 8 — layer constants | Added frozen `LAYER_ORDER` and derived `LAYER_STATEMENT`; replaced duplicate expectations across the face, integration, and conformance proofs. The independent constant proof passed. |
| 9 — configuration duplication | Moved `isolate: false` into `sheetProject`, removed wrapper copies and benchmark comments, and shortened the dependency-prebundling comment. Existing config assertions remain. |
| 10 — token remarks | Removed the future-work sentence and retained the description, frozen-group statement, and example. |
| 11 — default pack | Replaced the narrative comment with the prescribed TODO. |
| 12 — Vue target | Added `app/vue/` to browser-target classification and direct refusal/admission cases. Edited; config tests not run. |
| 13 — tokens exemption | Added shared `scanBootstrapSources`, exempting only the conditional shared statement in tokens and the whole mixins file. Added the unused foreign-layer control to the browser proof and a real scratch-file proof. Setup guard and scratch-file cases passed; the scratch compile remained unchanged. |
| 14 — specificity | Qualified the guide row and added the later, lower-specificity `button` counterexample expecting `6px`. Edited; integration tests not run. |
| 15 — kind-file sentence | Added the exception for the shared order statement in `_tokens.scss`. |
| 16 — divergence inventory | Named all eight vendored files in both roadmap inventories and named the core wrapper as the `isCoreBuildExternal` carrier. |
| 17 — Vue specifier | Added `@app/vue` classification and real-server core refusal, browser admission, and Vue-to-core admission cases. Edited; config tests not run. |
| 18 — single-pass limit | Added the TSDoc limit and full Bootstrap case. Single-pass equality and second-pass inequality passed before banner extraction failed. This item remains incomplete. |
| 19 — census control | Replaced the non-test filename with `tests/nowhere/absent-control.test.ts` and retained zero expected owners through an explicit control-path comparison. Edited; config tests not run. |

Commands ran on 2026-09-30. In the table, `<owned files>` means every file listed above, in that order. Non-test commands have no test count.

| Command | Exit | Test count |
| --- | --- | --- |
| `node tmp/units/foundation-fix-11-edit.ts` | 0 | none |
| `npx oxfmt --config .oxfmtrc.json --write <owned files>` | 0 | none; formatted 20 files |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none |
| `npm run check:src:core` | 0 | none |
| `npx oxlint --config .oxlintrc.json vite.config.ts configs tests src/core` | 0 | none |
| `npm run build:src:core` | 0 | none |
| `npm run test:setup` | 1 | 14 passed, 1 failed; 2 files |
| `git diff -- <owned files>` | 0 | none; includes pre-existing campaign changes |
| `git status --porcelain` before and after | 0 | none; the reported path/status inventory is unchanged |

The stop prevented these commands from running: scoped `oxfmt --check`, `npm run test:setup:browser`, `npm run test:conformance`, `npm run test:src:bootstrap`, `npm run test:src:tailwindcss`, `npm run test:src:styles`, `npm run test:integration`, `npm run test:config`, `npm run test:policy`, and `npm run test:guides`. Each has no exit code or test count. The requested mutation-probe closure was not run.

Deviations:

- **Gate refusal.** Expected: the setup project passes, including the single-pass banner-limit case. Found: `compares Bootstrap with one pass per side and records the second-pass banner difference as a limit` failed with `Error: Value is required` at `tests/setupServer.test.ts:56`. Evidence: the anchored `/^\/\*![\s\S]*?\*\//u` expression found no banner at the start of the first-pass output. Done: preceding gates and the other setup cases passed. Not done: correcting this case, remaining gates, and mutation closure. One hypothesis: Sass emits a charset prefix before the banner, invalidating the start anchor. This hypothesis was not tested after the required stop.
- **Boundary-test interpretation.** The core refusal uses `appCore()`; browser and Vue admissions use `appBrowser()`. The plugin checks its configured owner before checking the importer path, so the admission case does not use the same core-configured server. This interpretation is unverified because the config gate was not reached.
- **Evidence location.** The analyst report was absent from the brief's stated scaffold directory. Read `veneer/tmp/units/foundation-audit-2-analyst-verdict.md`, the location named by the round verdict, instead. The initial combined read exited 1. A lookup for `configs/app/vite.core.config.ts` also found no file; the test uses the exported root factory.

Existing campaign changes were preserved. Shared report-only files and scaffold files were not edited. No commit, install, showcase rebuild, or sub-agent ran. No file was created under `tmp/probes/`. Unit artifacts remain under `tmp/units/`: the edit script, the before-content snapshot, the before-status record, and this report.
