Repaired the confirmed findings and ruled referrals, excluding portability O4 as instructed. Commit: `b1c66e32c7716f39135c33965f26016b8643da2f` on `browse-fix`. Final `git status --porcelain`: empty.

The finding results are recorded here. Mutation commands run the named test with the defect restored, restore the repaired source, and run the same test again. Each reported red run exited 1; each green run exited 0. Unselected tests aren't included in these counts.

| Finding | Repair | Red-before and green-after evidence |
| --- | --- | --- |
| Item 10 F1 | Added unannotated native options and `aria-pressed` tokens `TRUE`, `foo`, ` false `, empty, and `undefined`, with explicit CDP preconditions. | `node tmp/codex/mutate-review.ts native` and `node tmp/codex/mutate-review.ts pressed`: each 1 failed → 1 passed. |
| Item 10 F3 | Corrected the row-state order in TSDoc and the roadmap citation to `BrowserDOMElementManager.ts:163-166`; added the live lone-tab difference assertion. | `node tmp/codex/mutate-review.ts lone`: 1 failed → 1 passed. `npm run test:guides`: 248 passed. Prose and citation corrections have no runtime mutation. |
| Item 10 O1 | Used a negative contraction in the added guide sentence. | Prose correction; no runtime mutation. Guide gate passed. |
| Item 10 O2 | Declared the native summary's CDP disclosure row and its absence from the DOM outline. | Documentation of the reviewed capture; no behavior change or runtime mutation. Guide gate passed. |
| Item 10 O3 | Added `aria-expanded="mixed"` and `aria-expanded="foo"` to live parity. Both CDP preconditions report `expanded=true`. | `node tmp/codex/mutate-review.ts expanded`: 1 failed → 1 passed. |
| Item 10 O4 | Declared the lone-treeitem difference: CDP generic without states, DOM treeitem with authored states. | Documentation of the reviewed capture; no behavior change or runtime mutation. Guide gate passed. |
| Portability F1 | After release receives `ENOENT`, accept absence or a replacement directory; retain refusal of a non-directory. The regression commits bytes, removes the empty lock, creates the replacement after the real failing `rmdir`, and checks the result and foreign entry survive. | `node tmp/codex/mutate-review.ts lock`: 1 failed → 1 passed. The test also failed against the original defect before repair. |
| Portability F2 | Restricted directory-replacement classification to `EISDIR` or `EPERM`; preserved unrelated rename errors. | `node tmp/codex/mutate-review.ts rename`: 1 failed → 1 passed, using a real missing temporary file and directory destination. |
| Portability F3a | Split paging, truncation, offset, and malformed-entry assertions from the file-link case. | `node tmp/codex/mutate-review.ts paging`: 1 failed → 1 passed on this host without file-link capability. |
| Portability F3b | Used independent `supportsMode()` measurement, then required mode zero in both parent and child and retained the mandatory `EACCES` assertion. Removed the readable-file exit-77 skip. | `npx vitest run --config vite.config.ts --project src:server tests/src/server/stores/FileBrowserJourneyStore.test.ts -t 'reports chmod 000' --reporter verbose`: the selected assertion was capability-skipped because permission bits don't round-trip. No red/green mode claim is made on Windows. |
| Portability F3c and O1 | Removed `linkBrowserFixture` and its permissive test. Every consumer uses installed `createLink`, `supportsFileLinks`, or `supportsDirectoryLinks`; no local helper can manufacture an `EPERM` skip. | Closed by the required dependency reuse rather than retaining and repairing the duplicate helper. `npm run test:src:server`: 252 passed, 9 skipped; the directory-link boundary cases ran. No mutation of the deleted helper is claimed. |
| Portability F3d | Removed the observational early-timer skip and asserted that clock alignment actually consumes its requested offset. | `node tmp/codex/mutate-review.ts timer`: a no-op aligner gives 1 failed → 1 passed after restoration. |
| Portability F4 | Removed the unmeasured inherited-handle and incomplete-domain-list claims; named both `ENOTDIR` and `ENOENT`; replaced the stale Windows launch limit with the recorded Edge run. | Documentation corrections; no runtime mutation. Guide, setup, server, and service results are recorded in the gate table. |
| Portability O2 | Removed the duplicated registry classifier. Live tests assert the raw command outcome, use `BROWSER_REGISTRY_ABSENT_CODE`, and compare registry startup with command success. Corrected the test name. | `node tmp/codex/mutate-review.ts registry`: 1 failed → 1 passed when successful activation incorrectly returns false. The missing-method control also runs. |
| Portability O3 | Documented `mute` as exiting and removed the probe-history comments. | Documentation correction; no runtime mutation. Setup gate passed. |
| Portability O4 | Excluded history. | No change, as instructed. |

The mutation runner uses `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project PROJECT FILE -t FILTER` with these exact selections. DOM mutations rebuild with `node node_modules/vite/bin/vite.js build --config configs/src/vite.browser.config.ts` before both runs.

| Mutation | PROJECT | FILE | FILTER |
| --- | --- | --- | --- |
| native, pressed, expanded | `service` | `tests/service/document.test.ts` | `complete DOM rows` |
| lone | `service` | `tests/service/document.test.ts` | `lone tab` |
| lock | `src:server` | `tests/src/server/stores/FileBrowserStore.test.ts` | `preserves the committed result` |
| rename | `src:server` | `tests/src/server/stores/FileBrowserStore.test.ts` | `unrelated rename` |
| paging | `src:server` | `tests/src/server/stores/FileBrowserRunStore.test.ts` | `pages readable runs` |
| timer | `setup` | `tests/setup.test.ts` | `bounds real timer lead` |
| registry | `service` | `tests/service/browser.test.ts` | `resolves registry.start` |

The required gates ran after the last tracked edit. Every exit code was read without output filtering.

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:src:core` | 0 | 1201 passed |
| `npm run test:src:browser` | 0 | 289 passed, 1 skipped |
| `npm run test:src:server` | 0 | 252 passed, 9 skipped |
| `npm run test:src:bin` | 0 | 4 passed, 1 skipped |
| `npm run test:guides` | 0 | 248 passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run test:setup` | 0 | 175 passed, 3 skipped |
| `npm run test:setup:browser` | 0 | 21 passed; runner reported a 10000 ms close warning |
| `npm run build` | 0 | Passed |
| `npm run test:service` | 0 | 106 passed on the final run |
| `git diff --check` | 0 | Passed |

Deviations and limits: validation ran on Windows, not Linux or macOS. Mode-zero and file-symlink assertions remain gated by measured capabilities. F3c was resolved by removing the duplicate helper as O1 requires. The earlier service runs each reported 105 passed and 1 failed: a `Runtime.callFunctionOn` timeout in the journey-edit case, a stopped preparation control, and a stopped wait control. The isolated commands `npx vitest run --config vite.config.ts --project service tests/service/journey.test.ts -t 'records, saves, lists, edits with a ref'` and the same command with `-t 'stores the run of the same journey'` each passed 1 test. Running the complete journey file without `-t` passed 32 tests. The final unchanged `npm run test:service` passed 106 tests. Shared-host browser resource pressure is an unverified hypothesis; no assertion or timeout was relaxed.

The supplementary installed discovery command exited 1 because it treated `src:browser (chromium)` and `setup:browser (chromium)` as ungated projects and their base names as empty. The direct required gates collected and passed those projects. No scaffold-owned file was edited. Full gate and mutation logs remain under `tmp/codex/`.