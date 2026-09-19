# Unit 8b report

## 1. Done / not done

1. **Done** — `npx.cmd oxfmt --config .oxfmtrc.json --check app/browser/styles/_theme.scss tests/app/browser/styles/theme.test.ts` passed.
2. **Done** — `npx.cmd oxlint --config .oxlintrc.json --deny-warnings app/browser/styles/_theme.scss tests/app/browser/styles/theme.test.ts` passed.
3. **Done** — `npm.cmd run check` passed.
4. **Done** — No style attribute, SFC style block, package change, or off-limits edit. The authored rule inventory follows.
5. **Done** — The nested-light proof ran red before the stylesheet edit, then green; every required variant clears 4.5:1.
6. **Done** — The same variants clear 4.5:1 in light and dark roots, including hover, active, and keyboard-focus states.
7. **Done** — Focus rings, the accent retune, and the dark-card treatment were checked; their readings follow.
8. **Done** — `npm.cmd run test:app:browser`: 148 passed, 0 failed.
9. **Done** — `npm.cmd run test:journey`: all four projects passed; 68 passed, 0 failed, 4 capture-only cases skipped.
10. **Done** — `npm.cmd run build` succeeded.

## 2. The mechanism

In `app/browser/styles/_theme.scss`, the dark button overrides sit inside `@scope ([data-bs-theme='dark']) to ([data-bs-theme])`. A nested theme boundary ends the ancestor's repaint. A nested dark boundary establishes its own scope. The accent declarations remain directly on their theme boundaries.

This uses the bounded-selector candidate. CSS scope limits exclude the boundary and its descendants from the outer scope; see [CSS Cascading and Inheritance: scoping styles](https://www.w3.org/TR/css-cascade-6/#scoped-styles). The browser proof verifies light, dark, dark/light, light/dark/light, and dark/light/dark paths against this application's compiled Bootstrap cascade.

The changed rule and its retained component rules fill these gaps:

- `@scope` prevents an ancestor's component override from crossing a theme boundary.
- `.btn-primary` retains the dark navy-on-paper pair across its enabled and disabled states.
- `.btn-outline-primary` retains readable dark-surface labels and the corresponding hover/active pair.
- `.btn-outline-secondary` retains readable dark-surface labels and the corresponding hover/active pair.

The unbounded descendant mechanism is rejected by the 1.1124:1 reading. Boundary-rebound aliases and a redesigned token mapping were not implemented or experimentally rejected. The bounded mechanism passed while retaining the existing declarations and Bootstrap's light-mode states, so no additional token system was needed.

The regression tests live in `tests/app/browser/styles/theme.test.ts`. They compare nested paint with the corresponding root mode, measure enabled-state contrast, and verify disabled-state paint equivalence without imposing an enabled-state contrast requirement.

## 3. The failing proof

The same command produced the red and green records:

```text
npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/styles/theme.test.ts -t 'nearest color-mode scope'
```

Before: **3 failed, 0 passed**. After: **0 failed, 3 passed**. The filter excluded the other cases. The secondary outline case failed paint equivalence before the fix; its contrast already passed.

The records are `tmp/codex/u8b-proof-red.log` and `tmp/codex/u8b-proof-green.log`. The following nested-light readings use hex equivalents of computed RGB. Transparent backgrounds resolve to the white scope surface.

| Variant and state | Before: foreground / background; ratio | After: foreground / background; ratio |
| --- | --- | --- |
| Primary, rest | #0a2540 / #0f1b2d; **1.1124** | #ffffff / #0a2540; **15.5375** |
| Primary, hover/focus | #0a2540 / #4a5a6e; **2.2040** | #ffffff / #091f36; **16.6551** |
| Primary, active | #0a2540 / #4a5a6e; **2.2040** | #ffffff / #081e33; **16.8832** |
| Outline primary, rest | #0f1b2d / #ffffff; **17.2843** | #0a2540 / #ffffff; **15.5375** |
| Outline primary, hover/active/focus | #0a2540 / #0f1b2d; **1.1124** | #ffffff / #0a2540; **15.5375** |
| Outline secondary, rest | #0f1b2d / #ffffff; **17.2843** | #4a5a6e / #ffffff; **7.0498** |
| Outline secondary, hover/active/focus | #ffffff / #0f1b2d; **17.2843** | #ffffff / #4a5a6e; **7.0498** |

The light-root readings equal the repaired nested-light readings. Directly inside a dark root, every variant measures **13.3027:1** at rest. The primary variant measures **10.1097:1** on hover, active, and focus; the outline variants measure **13.3027:1**.

A retained negative control outside the repaired button variants, `text-primary bg-body` in dark mode, measures **1:1** and is detected as unreadable.

## 4. What else leaked

No additional leak appeared in the checked rules:

- **Focus selectors:** `:focus-visible`, `.btn`, `.btn-close`, `.form-control`, `.form-select`, `.nav-link`, and `.navbar-toggler` retain a solid 2px outline with a 2px offset. Inside the nested light card, the outline resolves to `rgb(0, 0, 0)` on white: **21:1**. Changing the island to dark resolves the outline to `rgb(255, 255, 255)`; returning to light restores black. This existing rule supplies the visible focus treatment.
- **Accent retune:** `--rn-accent`, read through `.accent::before`, resolves to `rgb(200, 149, 43)` in nested light, `rgb(231, 198, 122)` in dark, then the original gold on return. The boundary declarations preserve the decorative accent's mode-specific color.
- **Dark-card selector:** `.card[data-bs-theme='dark']` paints `linear-gradient(160deg, rgb(10, 37, 64), rgb(18, 58, 99))`. Its nested light card reads `background-image: none` and `background-color: rgb(255, 255, 255)`. The gradient belongs to the card carrying the dark attribute and does not cross into the light card.

The browser gate also passed the existing screenshot-based focus proofs over the hero gradient and marketplace glow. Flat-color readings are not presented as gradient contrast measurements.

## 5. Patches for files you do not own

None.

## 6. Observations

- `npm.cmd test` passed in **82.112 seconds**, measured with a monotonic stopwatch. Evidence: `tmp/codex/u8b-npm-test.log` and `tmp/codex/u8b-npm-test-time.txt`.
- The build reported **329 Sass deprecations**: 20 detailed warnings and 309 omitted repetitions. Evidence: `tmp/codex/u8b-build.log`.
- The build retained the scope boundary in `dist/app/browser/assets/index-hhVhdyP4.css` and reported a JavaScript chunk exceeding its 500 kB warning threshold.
- The configured browser proofs use Chromium. The journey projects are `light-1280`, `dark-1280`, `light-390`, and `dark-390`. Capture-only cases require `VITE_CAPTURE=true`; their skips are pre-existing.
- Only `_theme.scss` and its mirrored test changed among tracked files. The pre-existing untracked `.orkestrel/roughnotes/u8b-brief.md` file was untouched. No commit, installation, or delegation occurred.

## 7. What you did not close

No acceptance criterion remains open. Sass deprecation cleanup and the bundle-size warning remain outside this stylesheet repair. Browser engines beyond the configured Chromium were not exercised.