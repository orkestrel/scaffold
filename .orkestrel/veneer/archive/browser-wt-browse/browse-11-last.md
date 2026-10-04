Item 11 stopped under the brief’s product-defect deviation contract. No implementation commit was made.

**Expected:** The corrected design requires `markdown.includes('Option label kept') === innerText.includes('Option label kept')`, while preserving `BrowserReading` and adding no option exception when computed display is `block`.

**Found:** `innerText` includes that phrase, but both `markdown()` and `markdown({ distill: false })` omit it. A paragraph carrying the same phrase survives. Satisfying the oracle requires an additional ruling: change projection behavior, rewrite select markup, or exempt option text.

**Evidence:** `BrowserReading.ts:68` invokes `htmlToMarkdown`; its default source is distilled at `:86`. HTML’s `UNSAFE_ELEMENTS` includes `option` and `select`. Markdown removes those subtrees independently of distillation at its installed `index.js:2823`. This behavior is documented in `guides/html.md:294` and `guides/markdown.md:544,561`.

**Hypothesis:** The design accounted for Chromium’s option layout but overlooked the downstream projection’s documented subtree removal.

**Done:** P1–P3 with controls, both browser versions, B0, preliminary failing tests, and an isolated reproduction. The lane record was updated. Unfinished tracked edits were removed and preserved as a patch. The probe was removed from `tmp/probes/`.

**Not done:** Implementation, complete citation re-verification, promotion, feature-removal mutations, green-after proofs, B1, final gates, and commit.

Measurements were taken on Windows on 2026-10-03.

| Browser | Version |
|---|---|
| System Edge/Chromium | 154.0.4258.53 |
| Playwright Chromium | 153.0.8010.12 |

P1–P3 agreed between the main and isolated worlds. `npm run test:probe -- tmp/probes/read-rendered.test.ts` exited 0: **1 passed**.

| Probe | Reading and control |
|---|---|
| P1: details | Summary present; closed body absent; open-details control present |
| P1: content visibility | Hidden and offscreen auto contents absent; visible twin present. Ruling 5 retains auto despite this divergence |
| P1: until-found | Contents absent |
| P1: select | Option label present; option display `block`, select `inline-block` |
| P1: fallback | Canvas, video, audio, and iframe fallback absent |
| P1: textarea | Default text absent from body `innerText`; data-only ruling unchanged |
| P2: import | Zero requests; constructor counters main 1→1, isolated 3→3 |
| P2: clone control | Two media requests per world; constructor counters main 1→2, isolated 3→4 |
| P3 | Only “Slotted shown” present; hidden-slot, unassigned element/text, and shadow-root-owned text absent |

The P2 stop condition did not fire.

B0 used veneer's existing showcase through the guarded bench block. `npm run test:bench -- tmp/probes/read-rendered.test.ts` exited 0.

| Measurement, milliseconds | B0 | B1 |
|---|---:|---|
| Samples | 386.6187, 316.6214, 330.8159, 311.8977, 322.6014 | Not run |
| Median | 322.6014 | Not run |
| Minimum–maximum | 311.8977–386.6187 | Not run |
| Spread | 74.7210 | Not run |

Preliminary proofs ran against the original capture implementation; no feature-removal mutation was performed.

```text
R1:
npx vitest run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts tests/src/browser/BrowserDOMView.test.ts -t rendered

Exit 1: 18 failed, 15 passed, 183 skipped.

R2:
npx vitest run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "rendered capture agrees with innerText for Option label kept"

Exit 1: 1 failed, 198 skipped; expected false to be true.
```

Each ruling’s status at the stop follows. No green-after command ran.

| Ruling | Red-before evidence | Green-after |
|---|---|---|
| 1: capture placements | R1 includes DOM-view failure; CDP not reached | Not run |
| 2: inert copy | P2 controls pass; no mutation | Not run |
| 3: pruning | R1 includes hidden text, alt, ancestor, and shadow failures | Not run |
| 4: roots without layout | Preliminary control passes; no mutation | Not run |
| 5: P1 rules | R1 includes details/fallback failures; R2 establishes blocker | Not run |
| 6: placement parity | Not reached | Not run |
| 7: no export | No export shipped | Not run |
| 8: TSDoc home | Draft removed at stop | Not run |
| 9: tool/wait/receipts unchanged | No changes made | Not run |
| 10: pruned limit | R1 includes oversized-hidden-markup failure | Not run |

The earlier `npm run check:src:core` passed, but was not a final gate.

| Gate | Exit/result |
|---|---|
| `npm run format:check` | Not run: stop condition |
| `npm run lint:check` | Not run: stop condition |
| `npm run check` | Not run: stop condition |
| `npm run test:src:core` | Not run: stop condition |
| `npm run test:src:browser` | Not run: stop condition |
| `npm run test:src:server` | Not run: stop condition |
| `npm run test:src:bin` | Not run: stop condition |
| `npm run test:guides` | Not run: stop condition |
| `npm run test:policy` | Not run: stop condition |
| `npm run test:setup` | Not run: stop condition |
| `npm run test:setup:browser` | Not run: stop condition |
| `npm run build` | Not run: stop condition |
| `npm run test:service` | Not run: stop condition |
| `git diff --check` | 0 |
| `git status --porcelain` | 0; empty |

Commit: **none**. HEAD remains `73c608fd4d284fc76d74b221210704851b533a41`.

Report saved to [browse-11-report.md](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/browse-11-report.md). Evidence beside it includes `read-rendered-readings.json`, `read-rendered-B0.json`, `browse-11-probe.test.ts`, and `browse-11-stopped.patch`.

No push, publication, installation, sub-agent, or discovery script was run.