Implemented the owned-file changes; **acceptance remains incomplete**. No commit.

[Full diff](/home/user/.wave/veneer-audit-sheet/tmp/units/as1.patch) · [Proof readings and deviations](/home/user/.wave/veneer-audit-sheet/tmp/units/as1/report.md) · [Every gate’s command, folder, exit and result](/home/user/.wave/veneer-audit-sheet/tmp/units/as1/gates.md)

| Measurement | Before | After |
|---|---:|---:|
| `./bootstrap` bytes | 332,388 | 332,388, byte-identical |
| Curated reboot copies | 72 | 72 |
| Curation-table rows | 56 | 93 |
| Restoration rules / declarations | 11 / 11 | 12 / 14 |
| Caption reading rows | 58 | 73 |

Both required curation cases pass with all 37 additions and their removal controls. Lone-class proofs read:

- `link-offset-2`: underline; offset **4px**, equivalent to `0.25em`.
- `link-opacity-10`: **rgba(21, 93, 252, 0.1)**.
- `link-underline-danger`: decoration color **rgb(231, 0, 11)**.
- All 30 object-fit names: **64×64** boxes with the expected five computed fits. Bare control: **64×32**. Exact `base` selector and three declarations pass.

All 73 caption readings pass across three faces, both widths and both modes. One measured departure from the audit wording: the no-layer list retains **32px indent / 16px bottom margin**; the caption and guide state this.

The full journey passes **98/0**. Comparison exits **67**, with [all 300 differences individually classified](/home/user/.wave/veneer-audit-sheet/tmp/units/as1/journey-classification.md). No case or statechart row changes. The finding outside prediction is partition population **8,001→8,012**, explained by the added specimen and caption nodes.

The **390px light and 1280px light** captures passed without page errors; all requested Bootstrap/layer images were read and confirm the repairs. Both showcase builds have SHA-256:
`ef96d1fdaa64bbc2773e31a0161efd6b110ef75110ec9096b4006e04c398082e`.

Two jobs remain queued: **390px dark capture** and the **final type-check repeat**. A completion watcher records their exits and restores the generated showcase file. Dark visual review remains unfinished. [Continuation details](/home/user/.wave/veneer-audit-sheet/tmp/units/as1/resume.md).

App-browser is **244 passed / 1 failed**: the unowned specimen-order expectation lacks the new title. All other completed mandatory gates pass. `diff --check` and Bootstrap `cmp` exit 0; the `src/browser` diff is empty.

Current `git status --porcelain` includes the generated showcase awaiting capture and restoration:

```text
 M app/browser/recipe.json
 M app/browser/sections/tailwindcss.html
 M guides/veneer.md
 M showcase/browser.html
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_tokens.scss
 M src/tailwindcss/_tokens.scss
 M tests/conformance.test.ts
 M tests/fixtures/tailwindcss/recipe.json
 M tests/integration.test.ts
 M tests/setupBrowser.ts
 M tests/src/tailwindcss/index.test.ts
```

May I apply the [prepared one-row title patch](/home/user/.wave/veneer-audit-sheet/tmp/units/as1/specimen-order-proposed.patch) and rerun app-browser? Your explicit “Nothing else” ownership boundary excludes `tests/app/browser/sections/integration.test.ts`, so that file remains untouched.