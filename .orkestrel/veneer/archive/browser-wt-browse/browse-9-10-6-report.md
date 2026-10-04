Item 10 is complete in commit `73c608fd4d284fc76d74b221210704851b533a41` on `ccr-d15a48b1-yyyll6`, following item 9 at `0a80b99b6019d86cbb05fb61645bd0e278264365`. The amended DOM/CDP comparison passes. Every required gate exits 0, and final `git status --porcelain` is empty.

The following table records the item 10 rulings and evidence. Earlier feature-removal counts are retained from run 5's report and mutation journal; the restored green measurements are from run 6.

| Ruling | Implementation | Red-before → green-after |
| --- | --- | --- |
| Row format and order | The shared renderer appends `pressed`, `expanded`, and `selected` after `value` and before bracket flags. It retains string and boolean values, including false, in outlines, matches, and focus rows. | Removing each rendered state separately fails 1 targeted core test. Restored core helper file: 136 passed. |
| CDP capture | Preserve `readBrowserAccessibility`; render the properties it already carries. Live tests cover toggle states, plain-button controls, and native form rows. | Run 5's initial focused service command failed 2 tests and the parity setup precondition. Run 6's complete document/toolset files: 42 passed. |
| DOM token mapping | `readBrowserToken` lowercases without trimming; missing, empty, and `undefined` tokens are absent. | Removing lowercasing fails 2 tests; adding trimming fails 1. Restored DOM helper/manager files: 209 passed. |
| DOM state mapping | Button-only pressed tristates; expansion follows the declared role set. Native single selects stay collapsed. Explicit ARIA selection overrides native option selectedness. Other elements without a selection token omit the property. | Removing pressed, expanded, or selected production in run 5 fails 6, 16, or 10 tests respectively. Restored DOM files: 209 passed, including the amended absence cases. |
| Role restrictions | Export the frozen readonly expanded and selected role sets. Keep unsupported-role controls and the existing summary-role gap. | The state-removal mutations fail the supported-role cases; unsupported link/radio/textbox and summary controls pass in the restored 209-test run. |
| Complete placement parity | Compare complete sorted rows after stripping references and deduplicating repeated references. CDP preconditions establish explicit true, explicit false, and absent selection in tablists, trees, and listboxes. | Candidate: 1 failed, 7 deselected. Removing the false default: 1 passed, 7 deselected. Reintroducing `else states['selected'] = false` and rebuilding: 1 failed, 7 deselected, with 5 differing rows. Restoring omission and rebuilding: 1 passed, 7 deselected. Removing all DOM state production independently fails the same test; restored full service files pass 42. |
| Guide and roadmap | Document the ordered row format, exported helpers/constants, and invalid out-of-tablist tab difference. Remove roadmap item 10 and update shifted citations in items 11/12. | Documentation has no artificial red count. Guide gate: 248 passed. |

The expanded roles are `button`, `link`, `checkbox`, `switch`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `tab`, `treeitem`, and `combobox`. Selected roles are `option`, `tab`, and `treeitem`. The DOM placement still gives `summary` no row; CDP's `DisclosureTriangle` role remains outside this item. No existing public type changed.

The focused commands use this prefix:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts
```

Their arguments and results are:

| Arguments after the prefix | Result |
| --- | --- |
| `--project src:core tests/src/core/helpers.test.ts -t "renders toggle states"` | Each run 5 renderer mutation: 1 failed, 135 deselected. |
| `--project src:core tests/src/core/helpers.test.ts` | Run 6: 136 passed. |
| `--project src:browser tests/src/browser/helpers.test.ts -t "readBrowserToken and readBrowserStates"` | Run 5 mutations: lowercase 2 failed/36 passed; trim 1/37; pressed 6/32; expanded 16/22; selected 10/28; each with 119 deselected. |
| `--project src:browser tests/src/browser/helpers.test.ts tests/src/browser/elements/BrowserDOMElementManager.test.ts` | Run 6: 209 passed. |
| `--project service tests/service/toolset.test.ts tests/service/document.test.ts -t "pressed and expanded\|runs one task end to end\|complete DOM rows"` | Run 5 initial red: 2 failed, 40 deselected/skipped, plus 1 failed setup precondition. |
| `--project service tests/service/document.test.ts -t "complete DOM rows"` | Run 6 default mutation: 1 failed → 1 passed; 7 deselected in each run. |
| `--project service tests/service/document.test.ts tests/service/toolset.test.ts` | Run 6: 42 passed. |

Red test commands exit 1; green commands exit 0. `node tmp/codex/item10-selection-mutation.ts` exits 0 after proving the false-default failure and restored success. `node tmp/codex/item10-parity-mutation.ts` exits 0 after proving DOM-state removal fails and restoring the browser bundle. All mutations were restored.

The probes ran on Windows with Node `24.21.0`, npm `12.0.2`, and Edge `154.0.4258.53`. The command `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project probe tmp/probes/toggle-states.test.ts` passes 1 test. Raw protocol and decoded readings are in `tmp/codex/toggle-states-6-reading.json`.

| Probe | Reading and control |
| --- | --- |
| Selection in valid containers | Unannotated tablist tabs, treeitems inside trees, and ARIA options inside listboxes omit `selected`. Explicit true and false controls retain their boolean values. Listbox options with empty or `undefined` tokens also omit selection. These cases are retained in the service parity fixture and DOM tests. |
| Invalid tab structure | An unannotated tab outside a tablist reports CDP `selected=false`; the DOM placement omits it. The guide explicitly names this difference. |
| Pressed tokens | True, false, mixed, uppercase, empty, undefined, arbitrary, and whitespace-bearing tokens retain the design's mapping. Plain buttons and unsupported links omit pressed state. |
| Native controls | A native single select remains collapsed despite `aria-expanded="true"`. Native option selectedness supplies the fallback; explicit ARIA true/false overrides it. |

The required gate chain ran after the final tracked edit. Its launcher exited 0 after 191,194 ms. Full output and exit records are in `tmp/codex/item10-6-gates.log`, `.err`, and `.json`.

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:src:core` | 0 | 1,201 passed |
| `npm run test:src:browser` | 0 | 289 passed, 1 skipped |
| `npm run test:src:server` | 0 | 249 passed, 9 skipped |
| `npm run test:src:bin` | 0 | 4 passed, 1 skipped |
| `npm run test:guides` | 0 | 248 passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run test:setup` | 0 | 176 passed, 4 skipped |
| `npm run test:setup:browser` | 0 | 21 passed |
| `npm run build` | 0 | Passed |
| `npm run test:service` | 0 | 105 passed |
| `git diff --check` | 0 | Clean |

There is no product or design deviation. An initial probe logging expression dereferenced an unnamed node and failed; optional name access repaired the instrument, and the corrected probe passed. That failure is not counted as product evidence. Builds emitted the existing API Extractor TypeScript-version and Vite output-format warnings. Existing capability skips remain skips; Linux was not executed.

No agents were spawned, no scaffold-owned files were edited, and no discovery script, push, publication, or installation outside the worktree ran. The committed worktree is clean.
