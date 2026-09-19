# Done / not done

1. **Done:** scoped `oxfmt --check` passes.
2. **Done:** scoped `oxlint --deny-warnings` passes.
3. **Done:** `npm run check` passes.
4. **Done:** no authored inline styles or SFC style blocks added; surviving rules and their gaps are listed below. Removed the redundant italic rule.
5. **Done:** Bootstrap generates `.figures-tabular`; browser computation and the production CSS confirm `font-variant-numeric: tabular-nums !important`.
6. **Done:** generated colors match the baseline, including the configured light/dark triads. The remaining Sass deprecation count is **329**.
7. **Done:** Chromium proves that the mounted masthead repaints through a live light → dark → light round trip.
8. **Done:** the final `npm run test:app:browser` run passes: **65 passed**.
9. **Done:** `npm run build` succeeds.
10. **Not done:** every journey project fails its class census because the required CSS removals orphan classes in off-limits Home markup. The exact integration patch follows.

# W1 to W7

- **W1 — Radius; component/utility rung.** Returned patches remove `rounded-pill` from Magazine and Shop filter buttons, leaving Bootstrap's configured button radius. The hero badge keeps its pill: it is noninteractive longevity metadata, not a command. The declared radius family is unchanged. The patches pass `git apply --check`.
- **W2 — Elevation; extension and authorized authored rungs.** Mapped Bootstrap's small/base/large shadows to `--rn-shadow`, `--rn-shadow-md`, and `--rn-shadow-lg`. Resting cards and the masthead use the small step; hover lift and the drawer use the middle step; `.issue` and `.invite` retain the large step. Component-token consumers paint card and drawer shadows without enabling Bootstrap's inset control shadows globally. Removed the gold button's separate shadow. Chromium verifies resting, hovered, drawer, and floating values against generated shadow utilities. Returned the Home preview's `shadow-lg` removal.
- **W3 — Chips; authored-rule removal.** Removed `.chip`, `.chip-south`, and `.chip-north`. The style proof confirms their absence. Returned the exact Home markup deletion. Also removed `.hero h1 em, .voice`, which only repeated native emphasis italics; the Home patch removes the orphaned `voice` class.
- **W4 — Focus; authorized authored rung.** Added `:focus-visible` to the existing selector group. Retained the component selectors so Bootstrap's more-specific outline resets do not win. Real keyboard modality and focus checks cover links, buttons, inputs, textareas, and the compact drawer on Home, Contact, and Payment at 1280 and 390 CSS px in light and dark. The outline remains 2 px with a 2 px offset. The minimum composited reading is **15.538:1** in each variant. Captured pixels at the hero and marketplace commit rings measure **15.538–16.647:1**, including their gradient/glow backgrounds. No component collision appeared in this population. The application has no select control to exercise.
- **W5 — Figures; extension rung.** Configured the Utilities API through Bootstrap's `$utilities` map. The class for units 6 and 7 is **`figures-tabular`**. Its computed value is `tabular-nums`, and its generated rule is present in `dist/app/browser/assets/index-CebXZk_N.css`.
- **W6 — Sass; module configuration/extension rung.** The entry uses `@use 'tokens'`, then `@use 'bootstrap/scss/bootstrap' with (...)`, followed by `@use 'theme'` and `@use 'signature'`. Every existing Sass override is passed explicitly from the tokens namespace. `_tokens.scss` still emits its `--rn-*` properties from those same variables; the mixin consumers already use `@use`. The generated comparison matches **1,599** foreground, background, border, and non-shadow token declarations. The production asset also matches **92** baseline literal color tokens in their original scopes. A stock-blue substitution is rejected by the comparison. Baseline deprecations: **333**; final: **329**, with **0** attributed to authored styles. The abbreviated warning messages omit 313 and 309 respectively; those are not total warning counts.
- **W7 — Repaint; regression proof, no production repaint repair.** Added a test that calls `app.theme(...)` on the mounted application, waits for the computed foreground, and verifies that the same masthead link remains mounted. The original stylesheet already passes. A deliberately stale dark-mode foreground makes the proof fail.

The configured triads retain these emitted values, ordered emphasis / subtle background / subtle border:

| Family | Light | Dark |
| --- | --- | --- |
| Primary | `#0a2540 / #e7edf5 / #b7c5d6` | `#d0dcea / #1b4b7e / #2a6aaa` |
| Warning | `#6b4a12 / #f6ecd4 / #e7c67a` | `#e7c67a / #3a2a10 / #c8952b` |

The base navy remains `#0a2540`; gold remains `#c8952b`. The generated comparison also preserves the configured body, link, and border colors, their RGB companions, and the font tokens.

# W7's verdict

**The reported stale masthead foreground is an instrument artifact in the tested Chromium path, not a reproduced application defect.** The same mounted masthead `.nav-link` returns these readings:

| Live state | Computed `color` |
| --- | --- |
| Light | `rgba(0, 0, 0, 0.65)` |
| After `app.theme(true)` | `rgba(255, 255, 255, 0.65)` |
| After `app.theme(false)` | `rgba(0, 0, 0, 0.65)` |

There is no reload or remount between readings. Evidence is in `tmp/codex/u4-theme-before.log` and `tmp/codex/u4-theme-final.log`.

The negative-control command was `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/styles/theme.test.ts`. Removing the widened selector and forcing a stale masthead foreground produced **2 failed, 1 passed**: the skip link retained `outline-style: auto`, and the live-toggle condition failed. After removing those temporary controls, the same command passes, including the added rendered-gradient proof: **4 passed**. See `tmp/codex/u4-theme-control.log` and `tmp/codex/u4-theme-final.log`.

# Patches for files you do not own

These patches are unapplied. Their combined copy, `tmp/codex/u4-views.patch`, passes `git apply --check`.

```diff
diff --git a/app/browser/components/HomeView.vue b/app/browser/components/HomeView.vue
index 7b2b4dc..1e7c80a 100644
--- a/app/browser/components/HomeView.vue
+++ b/app/browser/components/HomeView.vue
@@ -41,7 +41,7 @@ const preview = app.catalog.markets().slice(0, 4)
 					</p>
 					<h1 class="mb-4">
 						The knowledge that makes
-						<em class="voice text-warning-emphasis">independent agents</em> unstoppable.
+						<em class="text-warning-emphasis">independent agents</em> unstoppable.
 					</h1>
 					<p class="lead text-body-secondary mb-4">
 						Authoritative technical content, real-world coverage analysis, and market intelligence —
@@ -98,30 +98,6 @@ const preview = app.catalog.markets().slice(0, 4)
 							</div>
 							<div class="card-footer bg-body small">{{ feature.author }}</div>
 						</article>
-						<p
-							class="chip chip-south d-none d-lg-flex align-items-center gap-2 rounded-3 bg-body text-body px-3 py-2 mb-0 small fw-semibold text-nowrap"
-							data-bs-theme="light"
-							aria-hidden="true"
-						>
-							<span
-								class="tile tile-sm d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary-emphasis"
-							>
-								<i class="bi bi-check2"></i>
-							</span>
-							Trusted since 1878
-						</p>
-						<p
-							class="chip chip-north d-none d-lg-flex align-items-center gap-2 rounded-3 bg-body text-body px-3 py-2 mb-0 small fw-semibold text-nowrap"
-							data-bs-theme="light"
-							aria-hidden="true"
-						>
-							<span
-								class="tile tile-sm d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary-emphasis"
-							>
-								<i class="bi bi-graph-up"></i>
-							</span>
-							Coverage insights, monthly
-						</p>
 					</div>
 				</div>
 			</div>
@@ -246,7 +222,7 @@ const preview = app.catalog.markets().slice(0, 4)
 					</a>
 				</div>
 				<div class="col-12 col-lg-6">
-					<div class="rounded-4 p-4 bg-body-secondary border shadow-lg">
+					<div class="rounded-4 p-4 bg-body-secondary border">
 						<p class="small text-body-secondary text-uppercase mb-3">Fixture sample</p>
 						<ul class="list-unstyled mb-0">
 							<li
diff --git a/app/browser/components/MagazineView.vue b/app/browser/components/MagazineView.vue
index b66e1f6..72eda01 100644
--- a/app/browser/components/MagazineView.vue
+++ b/app/browser/components/MagazineView.vue
@@ -36,7 +36,7 @@ function select(next: Category | undefined): void {
 				v-for="choice in FILTER_CHOICES"
 				:key="choice.label"
 				type="button"
-				class="btn rounded-pill"
+				class="btn"
 				:class="choice.category === category ? 'btn-primary' : 'btn-outline-secondary'"
 				:aria-pressed="choice.category === category"
 				@click="select(choice.category)"
diff --git a/app/browser/components/ShopView.vue b/app/browser/components/ShopView.vue
index 782db4d..8cd5aa4 100644
--- a/app/browser/components/ShopView.vue
+++ b/app/browser/components/ShopView.vue
@@ -48,7 +48,7 @@ function select(next: Department | undefined): void {
 				v-for="choice in DEPARTMENT_CHOICES"
 				:key="choice.label"
 				type="button"
-				class="btn rounded-pill"
+				class="btn"
 				:class="choice.department === department ? 'btn-primary' : 'btn-outline-secondary'"
 				:aria-pressed="choice.department === department"
 				@click="select(choice.department)"
```

# The authored rung

The surviving selectors fill these gaps. Supporting positioning and clipping belong to their signature effects; they are not additional general-purpose utilities.

| Rule | Gap |
| --- | --- |
| `.masthead` | Translucent, blurred masthead surface with its assigned resting elevation. |
| `.card`, `.offcanvas` | Paint component shadow tokens while Bootstrap's shadow mixin is disabled. |
| `.mark` | Brand monogram dimensions, gradient, display typography, and resting depth. |
| `.wordmark`, `.wordmark small` | Display lockup and its tracked, separately sized imprint. |
| `.navbar-nav .nav-link` | Containing block for the signature underline. |
| `.navbar-nav .nav-link::after` | Gold underline geometry and width transition. |
| `.navbar-nav .nav-link:hover::after`, `.navbar-nav .nav-link.active::after`, `.navbar-nav .nav-link[aria-current='page']::after` | Grow the underline for hover and active navigation states. |
| `.accent`, `.accent::before` | Tracked eyebrow composition and decorative gold hairline. |
| `.hero`, `.hero::before`, `.hero > .container-xl` | Hero gradient, masked grid, clipping, and content above the decoration. |
| `.hero h1` | The established fluid display size, tracking, and leading. |
| `.hero .lead` | The narrower hero reading measure. |
| `.card[data-bs-theme='dark']` | Existing navy gradient card treatment. |
| `.stage` | Issue-stage maximum width and asymmetric padding. |
| `.measure` | The established 40 rem prose maximum. |
| `.tile-sm`, `.tile`, `.confirm` | Declared icon/check tile dimensions and radius roles absent from stock sizing utilities. |
| `.issue`, `.issue-head` | Floating issue elevation, rotation, clipping, and cover-header gradient. |
| `.issue:hover` under `no-preference`; `.issue` under reduced motion | Unrotate/lift the issue for hover; remove its transform under reduced motion. |
| `.lift`, `.lift:hover` under `no-preference` | Coordinated transform/shadow/border transition and middle-step hover elevation. |
| `.btn:hover`, `.btn:hover .bi-arrow-right` under `no-preference`; `.bi-arrow-right` | Existing button lift and arrow movement with a reduced-motion cutoff. |
| `.panel`, `.panel::before`, `.panel > .container-xl` | Clipped marketplace glow and its content plane. |
| `.invite`, `.invite::before`, `.invite > .row` | Floating invitation surface, clipped gold glow, and content plane. |
| `.tone`, `.tone::after` | Editorial image-frame minimum height and decorative texture. |
| `.tone-coverage`, `.tone-specialty`, `.tone-management`, `.tone-technology`, `.tone-personal`, `.tone-program` | Existing category-specific gradient directions and token pairs. |
| `:focus-visible`, `.btn:focus-visible`, `.btn-close:focus-visible`, `.form-control:focus-visible`, `.form-select:focus-visible`, `.nav-link:focus-visible`, `.navbar-toggler:focus-visible` | Shared opaque, offset outline reaching native focus stops and surviving component resets. |
| Reduced-motion `.btn`, `.nav-link`, `.offcanvas`; generated transition cutoffs on underline, issue, lift, and arrow selectors | Remove motion without changing the resting treatment. |

The token and extension rules also remain: `_tokens.scss`'s `:root` owns the identity and scales; the light/dark selectors retune `--rn-accent`; dark `.btn-primary`, `.btn-outline-primary`, and `.btn-outline-secondary` map component states; `.btn-warning` maps its navy foreground states. These use token/component extension points. Bootstrap generates the figures utility. No separate italic utility survives.

# Observations

The final gate readings are recorded in `tmp/codex/u4-gates.log`, with individual logs beside it. `git diff --check` passes. The starting commit is `fd959fbdb4a1ffe8e141ccd1dc058a328204e12b`.

The journey results are:

| Project | Baseline | After stylesheet changes |
| --- | --- | --- |
| `journey:light-1280` | Passed | Failed: orphan-class matrix |
| `journey:dark-1280` | Passed | Failed: orphan-class matrix |
| `journey:light-390` | Passed | Failed: orphan-class matrix |
| `journey:dark-390` | Passed | Failed: orphan-class matrix |

The baseline totals are **68 passed, 4 skipped**. The final totals are **64 passed, 4 failed, 4 skipped**. Every failure is at `tests/app/browser/integration.test.ts:613`, where the returned class set additionally contains `chip`, `chip-north`, `chip-south`, and `voice`. See `tmp/codex/u4-journey-before.log` and `tmp/codex/u4-journey-after.log`.

An earlier browser-suite run failed the subscription acceptance test. Isolated runs pass with the captured baseline CSS and with the changed CSS; the final whole browser run also passes. No cause is assigned. See `tmp/codex/u4-browser.log`, `tmp/codex/u4-subscribe-baseline.log`, `tmp/codex/u4-subscribe-after.log`, and `tmp/codex/u4-browser-final.log`.

`npm test` took approximately **62 seconds** and exited **1**. Its application projects passed **96 tests**; its journey stage then encountered the same class-census failures. The chain did not reach policy or configuration tests. This is an observation, not an authoritative Orchestrator reading.

The CSS comparison instrument is `tmp/codex/u4-compare.mjs`; its inputs are `u4-before.css` and `u4-after.css`, and its scoped token record is `u4-palette.json`. Screenshot pairs are `tmp/codex/u4-{hero,panel}-{1280,390}-{false,true}-{false,true}.png`. Their measurements sample the top-center ring against the same pixels before focus; they are not an exhaustive pixel or accessibility audit.

# What you did not close

**Criterion 10 conflicts with the required split ownership.** Expected: journeys no worse than baseline. Found: removing the required chip rules leaves their classes in Home, which this unit cannot edit; removing the redundant italic rule similarly leaves `voice`. Exact evidence: the class-census failures at line 613 in every journey project. Done: stylesheet changes, regression proofs, gate readings, and applicable exact patches. Not done: integration of those patches and a green post-integration journey run.

The filter-radius and preview-shadow changes remain unapplied view patches. Applying `figures-tabular` to content remains units 6 and 7 work, as assigned. No `.vue` file, shared test infrastructure, package, or configuration was edited. No package was installed, and no commit or push was made.