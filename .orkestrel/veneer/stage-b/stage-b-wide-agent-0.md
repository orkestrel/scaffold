# W4: what the Veneer styles surface must take over and come up with (chunk 3 inventory)

**Lane:** objective. This section covers what the records and contracts allow, what Bootstrap's sheet already covers, and what is still open. Taste calls are listed under Tensions.

**Citation roots and abbreviations used in this section:**
- `RM` is `C:\Users\mikes\WebstormProjects\veneer\ROADMAP.md`.
- `G` is `…\veneer\guides\veneer.md`.
- `bs/` is `…\veneer\src\bootstrap\`.
- `st/` is `…\veneer\src\styles\`.
- `es1` and `es2` are `…\veneer\tmp\units\elements-styles-1.md` and `-2.md`, the elements readings. Each line they cite carries its `elements:` path.
- `rm3` is `…\veneer\tmp\units\veneer-remainder-3.md`.
- `ni1` and `ni2` are `…\veneer\tmp\units\native-inventory-1.md` and `-2.md`.
- `nrN` is `…\veneer\tmp\units\native-research-agent-N.md`.
- `feas` is `…\veneer\tmp\units\browser-feasibility-report.md`.
- `syn` is `…\veneer\tmp\units\stage-b-design-agent-2.md`, the judge.
- `cdx` is `…\veneer\tmp\codex\browser-stage-b-design-verdict.md`.
- `sbm` is `…\veneer\tmp\codex\stage-b-measurements.md`.
- `src-d`, `id-d`, `plan-d`, and `rep-d` are `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\distillates\absorb-styles-{source,identity,plan,reports}-distillate.md`.

## Design

### Main finding: which layer Veneer's tag rules go in

The shared order statement puts `elements`, `components`, `surfaces`, `composables`, `modifiers`, and `utilities` after `bootstrap` (`RM:26`, `st/_tokens.scss:2`). So any tag rule in `./styles`, in any of those layers, beats Bootstrap's class rules on the same element at any specificity (`es2:3`).

That contradicts two existing contracts:
- "Classes stay the explicit control" (`RM:17`).
- The ruled pairing "Bootstrap wins a conflict" (`plan-d:7`).

The elements readings would put a bare `button`, `table`, `input`, `article`, or `dialog` look over every Bootstrap `.btn`, `.table`, `.form-control`, `.card`, or `dialog.modal` (`es2:53`, `:55`, `:79`, `:81`). The old cascade's button rulings S15, S17, and S19 (`id-d:123`, `:125`, `:127`) and the layer order S22 (`id-d:130`) were made under the earlier order, where `elements` came before the Bootstrap classes. `RM:26` supersedes them, so all four are reopened, not carried.

### Proposed placement rule

1. **`reset` layer.** It sits before `base` and `bootstrap` (`RM:26`). It holds:
   - all UA neutralization of native hosts;
   - every Veneer tag default that sets a property a Bootstrap selector can also set on that element.

   Bootstrap's reboot and classes then win every overlap, and Veneer fills only what Bootstrap leaves to the user agent.

2. **Layers after `bootstrap`.** A rule there may match an element that a Bootstrap selector styles on the same property only if it is a named row in the additions record. `G:1309` already allows a class-level addition that wins by layer. A tag-only rule never qualifies.

3. **`surfaces` layer.** It takes pseudo-elements, attribute APIs, and UA pieces that no Bootstrap selector reaches (`RM:109`). Examples are a bare dialog's `::backdrop`, `::details-content`, the scroll-marker pseudo-elements, and `::view-transition-*`.

4. **`theme` layer.** It holds `--vn-*` defaults on `:root` from `st/_tokens.scss` and the packs through `retune` (`RM:111`, `st/_mixins.scss:3`).

5. **Proof of the rule.** For every `./styles` rule in a layer after `bootstrap`, the proof reads the built sheet against Bootstrap's inventory and fails on an overlap that has no additions row. It follows the shape of the shared-name proof (`plan-d:69`).

Placing the neutralization in `reset` also settles the warning in `cdx:248`. Stage B's unlayered consumer fence beats Bootstrap, so its borderless reset would strip `.popover`'s border and background. In `reset`, the same reset loses to `bs/components/_popover.scss:4` and neutralizes only the UA box.

### W4.1 What Bootstrap's sheet already covers

| Subject | Covered in `bs/` | Gap Bootstrap leaves |
| --- | --- | --- |
| Reboot | `summary{display:list-item;cursor:pointer}` at `_reset.scss:375`; `[hidden]` unlayered `!important` at `:382`; smooth scrolling gated on reduced motion at `:9` | `dialog`, `[popover]`, `::backdrop`, `::details-content`, `@starting-style`, `interpolate-size`, `scrollbar-gutter`, `::view-transition`, and `inert` are absent (`es1:3`) |
| Fade and collapse | `.fade` at `_transitions.scss:4`; `:not(.show)` at `:12`; `.collapse:not(.show)` at `:15`; `.collapsing` at `:18`; horizontal at `:28`; reduced-motion twins | No native disclosure; `.collapse:not(.show)` hides `until-found` content (`sbm:133`) |
| Modal | `.modal` at `_modal.scss:4` with z-index 1055; `.modal-dialog` slide at `:43`; static at `:55`; `.modal-backdrop` at `:86` with opacity 0.5 at `:89` | UA `dialog` box and `::backdrop` (`nr3:128-133`) |
| Offcanvas | `_offcanvas.scss:423`, `.showing`/`.hiding` at `:473`, z-index 1045 at `:10` | Popover or dialog host UA box |
| Dropdown, tooltip, popover | `_dropdown.scss:28` (1000 at `:29`), `_tooltip.scss:4` (1080), `_popover.scss:4` (1070) | `[popover]` UA inset and overflow remain on the menu (`feas:15`); tooltip and popover roots keep a 3 px border, 3.5 px padding, and white fill when promoted (`cdx:214`) |
| Toast | `_toasts.scss:4`, `.showing` at `:31`, `:not(.show)` at `:34` | Popover host UA box (`nr6:19`) |
| Carousel | `_carousel.scss:4`, item transition at `:28`, indicators at `:141` | Scroll-marker and scroll-button pseudo-elements (`nr2:63-95`) |
| Tabs | `.tab-content > .tab-pane` at `_nav.scss:131` | `hidden` panes refused in stage A (`ni2:59`) |
| Focus | `.btn:focus-visible` at `_buttons.scss:58`; `.focus-ring:focus` at `_focus-ring.scss:4`; width 0.25rem and opacity 0.25 at `_tokens.scss:131-132` | Ring on native surfaces; forced-colors outline |
| Placeholder | `.form-control::placeholder` at `_form-control.scss:50` | Bare `::placeholder` |
| Tokens | `--bs-primary` at `_tokens.scss:44`, radius at `:120`, body size at `:90`, box shadow at `:127`; component variables are literal (`.btn-primary` at `_buttons.scss:98-103`) | Density, radius, elevation, and motion factors; the tertiary role (`es1:23`) |

`G` § Bootstrap sheet states that a value, selector, or context departure is inadmissible in that sheet (`G:1144`) and that its additions belong to the styles face (`G:1176-1177`). Every gap in the table therefore lands in `./styles` or in the consumer's sheet.

### W4.2 What Veneer takes over

**From stage B's consumer fences.** The judge records this CSS as stage B's (`syn:115`, `:305`, `:320`). The fences stay valid; `./styles` becomes the second home.

| Fence | Rule stage B ships | Chunk 3 home | Reading to re-run |
| --- | --- | --- | --- |
| `dialog.modal` reset | `margin:0;border:0;padding:0;max-width:none;max-height:none;color:inherit;background:transparent` plus `[open]{display:block}` (`cdx:235-245`) | `reset` layer | Matched the div's boxes at 414 × 896 (`feas:13`, `cdx:210`) |
| `dialog.modal::backdrop` | `background:transparent` (`syn:305`) | `reset` | The native backdrop paints `rgba(0,0,0,0.1)` (`feas:13`) |
| `.dropdown-menu[popover]` | UA `inset` and `overflow` (`feas:15`, `syn:196`) | `reset` | Box at (70, 212), 160 × 50 (`cdx:213`) |
| `.tooltip[popover]` | Border, padding, background, margins, maximum sizes, overflow (`cdx:248`) | `reset` | Arrow within 0.141 px after neutralization (`cdx:214`) |
| `.popover[popover]` | Inset, margin, overflow, and maximum sizes only; border and background stay Bootstrap's (`cdx:248`) | `reset`, where the borderless reset loses to `bs/components/_popover.scss:4` by layer | Not measured |

If W1 adds the following opt-ins, chunk 3 also takes over:
- a `.toast[popover]` and `.offcanvas[popover]` UA reset;
- an `@starting-style` fade block;
- `interest-delay: 0s`, so `interestfor` matches Bootstrap's zero default delay against Chromium's `normal` of 0.25 s and 0.15 s (`nr3:214`).

**From the old cascade and elements**, which `rm3:34-36` lists as reusable. These are factors, motion tokens, eases, role-mix, tertiary, font and type ramps, space, radius, shadow, the contrast floor, `retune`, the `transition` reduced-motion twin, `html-interpolate`, and the additions-record shape. W4.4 rules each one.

### W4.3 What Veneer comes up with: native-surface CSS families

| Family | UA or browser baseline | Proposed home | Identity drops and limits | Status |
| --- | --- | --- | --- | --- |
| Bare `dialog` and `:modal` | `position:absolute; margin:auto; border:solid; padding:1em; Canvas`; `:modal` caps sizes (`nr3:128-133`) | Chrome in `reset`; `dialog.modal` neutralization at higher specificity in the same layer overrides it | Drop `scale(0.96)` (M09, `id-d:35`). Motion falls back to Bootstrap's modal timing, which needs a ruling (Q-I3) | Original to Veneer |
| Bare-dialog `::backdrop` scrim | `dialog::backdrop` at 0.1; inherits from its dialog since Chromium 122 (`nr3:95`) | `surfaces` | Keep the 0 → 0.5 fade with no blur (M11 carry, `id-d:37`); drop `blur(2px)` and its `@starting-style` (M25, `id-d:51`). Elements put tokens on `:root` because it assumed the pseudo-element does not inherit (`es1:27`); that assumption is outdated | Original |
| `[popover]` and `:popover-open` look, hint and tooltip | UA box at `nr3:59-62`. `:popover-open::backdrop` has `pointer-events:none !important` (UA important, which no author rule can override) | Neutralization in `reset`; Veneer panel look in `reset` because a Bootstrap class can share the host | Drop `scale(0.98)` (M18, M19; `id-d:44-45`) | Original |
| Anchor defaults for bare popovers | `position-anchor` initial `normal` resolves to `auto` when `position-area` is set, from Chromium 151 (`nr1:20`) | `reset` | — | Original |
| `position-visibility` | Initial value `anchors-visible` measured on Chromium 153 (`sbm:52`) | Refused while 153 is the floor (Refusals) | — | Moot on 153 |
| Entry and exit motion (`@starting-style`, `allow-discrete`, `overlay`) | Starting style applies only on first render (`nr0:31`). The `transition` shorthand resets `transition-behavior` (`nr0:54`). Removal of `overlay` is proposed (`nr0:55`) | The `transition` mixin in `st/_mixins.scss` emits `allow-discrete` after the shorthand plus the reduced-motion twin (M22, `id-d:48`) | Elements' scales dropped | Original; the mechanism carries |
| `details`, `summary`, `::details-content` | Closed content is `content-visibility:hidden` (`nr2:29-33`); reboot sets the summary (`bs/_reset.scss:375`) | Marker and spacing in `reset`; tween in `surfaces` | The tween must sit under reduced-motion gating, because M24 drops Elements' ungated one (`id-d:50`). The sampled tween runs with no `getAnimations()` entry and no transition events (`sbm:137`) | Original |
| `hidden="until-found"` | `content-visibility:hidden` (`nr2:56`) | Refused on Bootstrap pages: only a layered `!important` beats `bs/_reset.scss:382` (Decision D-4) | — | Blocked |
| Scrollbar, gutter, and CSS scroll lock | Root `overflow:hidden` plus a stable gutter locks wheel scrolling with no padding; `html:has(dialog:modal)` supplies the condition (`sbm:70-71`) | `reset`, scoped to bare dialogs: `html:has(dialog:modal:not(.modal))` | Elements' universal `scrollbar-gutter: stable` (`es1:35`) would enter stage B's `lock-gutter` path if the gutter is detected from CSS (`syn:309`); see Decision D-5 | Original |
| `:focus-visible` on native surfaces | UA heuristics | `reset`, so `.btn`, `.nav-link`, and `.focus-ring` keep Bootstrap's rings | Width and opacity values: Q-I13. Add a forced-colors `Highlight` outline (`es1:37`) | Original |
| `::selection`, `::marker`, `::placeholder` | UA | `reset`; Bootstrap's `.form-control::placeholder` wins | Elements values are not identity-marked (`es1:39`) | Original, low priority |
| `::view-transition-*` | Default 0.25 s cross-fade; reduced motion does not apply (`nr0:92-94`, `sbm:166`) | `surfaces`: `animation:none` under `prefers-reduced-motion` | Elements' retiming to 150 ms ease is not marked (`es1:39`) | Needed only if W1 or the consumer starts view transitions |
| Scroll-marker carousel (`::scroll-marker`, `::scroll-marker-group`, `::scroll-button()`, `:target-current`, `:target-before`, `:target-after`) | Works on 153 (`sbm:145`); marker modes arrive in 154, not 153 (`nr2:71`); every box needs full styling (`nr2:88`) | `surfaces`, with a Veneer-owned class that does not collide | No Bootstrap lifecycle (`sbm:147`) | Original; scope in Decision D-9 |
| Scrollspy (`scroll-target-group`, `:target-current`) | Works on 153 (`sbm:145`) | `surfaces` | Bootstrap's `.active` stays the engine's contract | Original; D-9 |
| `inert`, `interactivity` | No UA style (`nr2:137`) | None | — | Refused: no CSS needed |
| `::interest-button` | Experimental at 153 (`nr9:12`); no node generated (`sbm:51`) | None | — | Deferred |

### W4.4 Token system

Rows follow `src-d`, with `id-d` and `es1` beside them. Reader law: a token ships only with a reader. Unread tokens were retired for exactly this reason (T52, `rep-d:58`; S3, `plan-d:95`).

| Group | Source | Ruling |
| --- | --- | --- |
| Factors: density, radius, elevation, motion | `src-d:8`; M02 (`id-d:28`); elements has density and radius only, without `@property` (`es1:7`) | Carry all four as registered `<number>` with initial value 1. Readers: radius and shadow through the `--bs-*` routing in D-2; density and motion through Veneer rules |
| Motion durations: feedback 150, panel 250, slide 600 | `src-d:20`; M03–M05 (`id-d:29-31`) | Carry. Slide is the 600 ms token (M05 carry). The drop at `plan-d:189` concerned routing Bootstrap's carousel through the token, which is moot now that the Bootstrap face is pinned |
| Eases: standard `ease`, out `ease-out`, panel `cubic-bezier(0.32,0.72,0,1)` | M06 (`id-d:32`), token tree (`id-d:165`) | Carry the tokens. Readers are Veneer-owned surfaces only; no rule routes a Bootstrap class through the panel curve (D48, `plan-d:59`). Tension T-3 |
| Roles, tertiary, light and dark base, triplets | `src-d:11-13`; T09, T14 (`id-d:17`, `:22`); T57 (`rep-d:63`) | Carry tertiary as fill plus emphasis only. Keep the triplets only where a contrast reader exists |
| Role-mix (oklab subtle, emphasis 70%, border) | `src-d:34`; elements matches in light and uses different dark amounts (`es1:13`, `:21`) | Carry for non-default packs. The default pack keeps Bootstrap's literal tiers, because oklab mixes do not reproduce Bootstrap's tints. Elements' dark amounts: Q-I1 |
| Contrast pick at 4.5 | `src-d:39` marks it `bootstrap`; C01 carry (`id-d:59`); named for this chunk at `rm3:34` | Carry as a compile-time `@function` in `st/_mixins.scss` for authoring packs. The pinned Bootstrap face carries literal labels, so the function has no Bootstrap job. A runtime retune keeps the compiled label (C12, `id-d:70`) |
| Font stacks, type ramp, heading size function | `src-d:15-16`, `:42`; T07 drops the 0.875rem value (`id-d:15`) | Carry the mechanism with Bootstrap-equal values |
| Space, radius, shadow scales | `src-d:17-19`; inset shadow in px form (`rep-d:69`) | Carry, factor-scaled |
| Focus metrics | `src-d:21`; elements 0.1875rem and 0.45 against Bootstrap 0.25rem and 0.25 (`es1:37`) | Carry the mechanism. Values: Q-I13 |
| State hover, active, stripe, mixer | `src-d:27` drops the map; T11 and T13 carry the tokens (`id-d:19`, `:21`); stripe 5% (T01) | Carry the names. Drop the Elements amounts and the near-black endpoint (T12, `id-d:20`). Readers: Veneer-filled surfaces only |
| Breakpoints | `src-d:23` (both faces) | Defer: a custom property cannot feed a media query, and Bootstrap already declares `--bs-breakpoint-*` |
| Stacking ladder | `src-d:25` | Defer: top-layer surfaces ignore z-index (`nr1:103-104`), and Bootstrap's z-index variables are component-level. No reader exists |
| Containers, gutters, gaps | `src-d:24` | Defer until a Veneer layout rule reads them |
| Link, form, and button groups | T18 (`id-d:26`) | Defer: they were alias groups of the fused cascade |
| Color scheme on `:root` | `src-d:37` (both faces) | Carry in `theme` |
| `html` keyword interpolation | `src-d:57` | Carry scoped to `details` rather than `html` (D-5) |
| Elements-only groups: floater gutter with safe-area insets, icon data URLs and summary chevron, slide distance 0.5rem, tint opacities 8% and 14%, disabled opacity 0.5 | `es1:9-17` | Each enters only with a Veneer rule that reads it. None is identity-marked |

### W4.5 Theme pack

- **Shape.** `retune($name, $light, $dark)` emits a scoped `@layer theme` block (`RM:111`, `st/_mixins.scss:3`). Every pack declares its complete defaults (`RM:55`, `G:1394-1397`). Mode scopes re-declare only the mode-varying names (D51a, `plan-d:63`).
- **Default pack.** It carries the same values as the `./styles` `:root` defaults: every `--vn-*` default plus the `--bs-*` names that `./styles` routes (D-2), at Bootstrap-equal values. A nested `data-vn-theme="default"` then resets an outer custom pack. One source feeds both copies: a `@function` that returns the default map, kept in `st/_mixins.scss` because that file holds only functions. The themes barrel can no longer `@use '../tokens'` after the first `:root` token (`RM:68`).
- **Proof changes.** The empty-pack case pins `flattenRules(...)` as empty (`tests/src/styles/themes/index.test.ts:36`). Chunk 3 replaces it with a completeness case. The `not.toContain(':root')` assertion stays (`:38`).
- **Out of scope.** Extra named packs, including Elements' four cores (`es1:19`); see Q-I11.

### W4.6 `veneer` registry groups

- **`TOKEN_NAMES.veneer`** holds `--vn-*` names under the key law of `RM:50`.
  - Proposed subtrees: `factor`, `motion`, `ease`, `color`, `font`, `size`, `line`, `weight`, `space`, `radius`, `shadow`, `focus`, `state`, `scheme`.
  - A terminal `base` adds nothing. The old names `--vn-radius-base`, `--vn-text-body-base`, `--vn-link-base`, and `--vn-color-tertiary-base` (`rep-d:63`, `:165`) would need a key path of `…base.base`, so chunk 3 names avoid a trailing `-base` segment (T-4).
  - Pin it in both directions against the built sheet, replacing `tests/src/styles/index.test.ts:38`. `src/core/constants.ts:14` freezes only `bootstrap`.
- **`CLASS_NAMES.veneer`** holds every class name a `./styles` selector reacts to, under the category law (`RM:50`), with `elements` and `surfaces` only where declared.
  - It includes the Bootstrap names that the `reset`-layer neutralization selects: `modal`, `dropdown-menu`, `tooltip`, `popover`, and any W1 adds.
  - It stays disjoint per shared layer (`RM:40`). Today no layer is shared: Bootstrap writes only `bootstrap` plus unlayered rules.
- **Constraint on Veneer-owned names.** A Veneer-owned class must not reuse a `CLASS_NAMES.bootstrap` name. Elements' `.small` modifier collides with `bs/_reset.scss:146`. It must also be checked against the Tailwind record (`RM:15`).

### W4.7 Component looks

The elements readings style tags, roles, and a few class roots (`es2:3`).

| Family | Elements look | Bootstrap covers | Disposition |
| --- | --- | --- | --- |
| Alert | `aside[role=alert]` banner, 4 px bar, height tween (`es2:7`) | `bs/components/_alert.scss:4` | Defer; the tween is M24's pattern (`es2:49`) |
| Badge | `.badge`, subtle by default (`es2:9`) | `_badge.scss:4` | Refuse the take-over of a Bootstrap class (D-6) |
| Button and group | Bare `button`, 88/78 state mixes, `[role=group]` (`es2:11`) | `_buttons.scss:58`, `_button-group.scss:37` | Tag defaults in `reset`, if any (D-1). Drop the mixes toward strong text (C02, `id-d:60`) |
| Card | Bare `article` (`es2:13`) | `_card.scss:4` | `reset` only; it also matches an `article` inside `.card` (`es2:55`) |
| Carousel | `.carousel` with timing 0.6 s on the panel curve (`es2:15`) | `_carousel.scss:4` | Refuse the take-over of `.carousel`. A native carousel is D-9 |
| Collapse and accordion | `details` with `name` (`es2:17`) | `_transitions.scss:15`, `_accordion.scss:4` | `details` look per W4.3; no `.collapse` rule |
| Dropdown | `menu[popover]` (`es2:19`) | `_dropdown.scss:28` | Neutralization only (W4.2). The Elements menu scale stays unshipped (M20, `id-d:46`) |
| List group, nav, tabs, navbar, pagination | Role and `aria-label` looks; pagination active fill reads the dropped primary (`es2:21-31`, `:67`) | `_list-group.scss:4`, `_nav.scss:4`, `_navbar.scss:4` | Defer; these are not take-overs |
| Modal | Bare `dialog` with sizes (`es2:23`) | `_modal.scss:4` | W4.3 |
| Offcanvas | `aside[popover]` drawer: travel 100% plus a fade (`es2:29`) | `_offcanvas.scss:423` | Keep the travel (M12, `id-d:38`); drop the fade (M13, `:39`). Scope in D-9 |
| Popover and tooltip | `[popover]`, hint (`es2:33`) | `_popover.scss:4`, `_tooltip.scss:4` | W4.3 |
| Progress | Bare `progress` (`es2:35`) | `_progress.scss:9` | `reset` tag default; low priority |
| Spinner | `.spinner` at 0.75 s, 1.5 s under reduced motion (`es2:37`) | `_spinners.scss:5` | Under reduced motion use `animation:none` (M21 carry, `id-d:47`) and drop M23 (`:49`). Name is free of collisions |
| Toast | `[popover][role=status]` (`es2:39`) | `_toasts.scss:4` | Only with W1's top-layer toast; drop M19 |
| Forms and tables | Bare `input`, `select`, `table` (`es2:41-43`) | `_form-control.scss:4`, `_tables.scss:4` | `reset` only. Drop the 12% stripe (T03, `id-d:11`) and header weight 600 (T16, `:24`) |

### W4.8 Identity: drops kept, and where the elements readings argue against the rule

**Drops kept**, under the standing rule `rm3:14`:
- T03, T07, T08, T12, T15, T16 (`id-d:11-24`);
- M09, M13, M17, M18, M19, M23, M24, M25 (`id-d:35-51`);
- C08, C14 (`:66`, `:72`);
- S04, S05, S11, S12 (`:112-120`);
- Elements' cores (`es1:23`);
- the mode-scoped primary, secondary, and focus color (`plan-d:190`).

**Cases where the elements readings argue against the rule.** These go to the user as questions; my reading follows each.

- **Q-I1.** Primary `oklch(48% 0.255 264)`, dark primary light cyan, and Elements' dark mix amounts (`es1:13`). Without them the default pack equals Bootstrap, and Veneer has no color identity. My reading: keep them dropped. Ruling needed together with D-3.
- **Q-I2.** Body and control size 0.875rem (T07; `es1:17`). Keep it dropped.
- **Q-I3.** Native-surface entry motion: dialog scale 0.96, popover and toast scale 0.98, backdrop blur (`es1:43`). Bootstrap has no motion for a bare `dialog` or `[popover]` to fall back on. My reading: an opacity fade on `--vn-motion-feedback` and `--vn-ease-standard`; for bare dialogs, Bootstrap's modal translate at 0.3 s ease-out (`bs/components/_modal.scss:43-45`).
- **Q-I4.** `interpolate-size` for disclosure (M24 drop against `html-interpolate` reuse; `es1:43`). This is the only native disclosure motion. My reading: allowed on `details` behind reduced-motion gating; never on `html` (D-5).
- **Q-I5.** Drawer opacity fade (M13). Keep it dropped.
- **Q-I6.** The panel curve on Veneer-owned surfaces (D48 against M06). My reading: allowed on Veneer-owned surfaces only.
- **Q-I7.** Table and text looks: stripe 12%, weight 600, `dl` grid, blockquote bar (`es2:81`). Keep them dropped.
- **Q-I8.** Code chip and `hr` opacity 0.2. Keep them dropped.
- **Q-I9.** Spinner slowed to 1.5 s under reduced motion, which keeps a progress signal (`es2:37`). Keep M21's `none`.
- **Q-I10.** Outline active mix (C14). Keep it dropped.
- **Q-I11.** Port Elements' four cores as optional packs (`es1:19`). Not in chunk 3.
- **Q-I12.** Hover and active amounts toward strong text against the carried token names (`es1:11`, T11). Carry the names with Bootstrap-derived amounts.
- **Q-I13.** Focus width 0.1875rem and opacity 0.45. These are not marked identity (`es1:37`, `plan-d:194`). My reading: Bootstrap's 0.25rem and 0.25 for native surfaces.

**Distillate conflicts, ruled:**
- Contrast functions, source against identity: carry, per W4.4.
- Carousel slide, M05 against `plan-d:189`: carry the token.
- S22 is superseded by `RM:26`.
- Dropdown entry motion and toast entry geometry (`id-d:268-269`) are moot for Bootstrap classes, because the Bootstrap face is pinned. For Veneer-owned surfaces they fold into Q-I3.

## Alternatives

1. **Keep tag rules in `elements` and pair each with same-layer `revert-layer` exemptions** generated from `CLASS_NAMES.bootstrap`. This is the preflight-mirror mechanism (`G:1241-1256`). Ruling: rejected as the default. It turns every tag rule into a generated exemption list that each Bootstrap re-pin must regenerate, and a missed class leaves Veneer beating Bootstrap. It stays available if the user wants Veneer tag looks to win over reboot on unclassed elements.
2. **Reorder the statement so `elements` precedes `bootstrap`.** Ruling: rejected without a user ruling. It changes the published statement in every face, `LAYER_STATEMENT`, the 24-permutation proof, and every Tailwind-recipe consumer who copied the statement (`RM:44`). Under the no-shim law that is a breaking release.

## Constraints

- Faces and layers: `./styles` writes `theme`, `reset`, `elements`, `components`, `surfaces`, `composables`, `modifiers`, and `utilities`, and never `base` or `bootstrap` (`RM:37`, `G:1333-1334`).
- Consumer override paths: an unlayered normal rule beats every sheet, and a layered `!important` wins at any specificity (`RM:42`, `G:1343-1348`).
- The themes sheet carries no `:root` (`tests/src/styles/themes/index.test.ts:38`). The barrel gets its own copy of the statement at the first `:root` token (`RM:68`).
- Kind law: literal colors appear only in `_tokens.scss` (`RM:99`). `_mixins.scss` holds no top-level CSS (`RM:100`).
- The styles face copies neither the Bootstrap cascade nor the Tailwind map (`RM:16`, `RM:146`).
- Pack scopes stop selectors, not inheritance (`RM:55`).
- UA `!important` declarations (`:popover-open::backdrop` pointer events at `nr3:62`; `overlay: auto` at `nr3:232`) cannot be overridden by any author rule.
- Bootstrap's component variables are literal at component level (`bs/components/_buttons.scss:98-103`). A root `--bs-*` retune reaches only names Bootstrap reads from `:root`, such as `--bs-btn-border-radius: var(--bs-border-radius)` at `:15`.
- Chromium 153 is the browser floor of the proofs (`RM:145`).

## Refusals

- **Bootstrap-sheet homes for native CSS.** Refused: "A value, selector, or context departure is inadmissible in the Bootstrap sheet" (`G:1144`).
- **Restating `position-visibility: anchors-visible`.** Refused on 153, because it equals the initial value (`sbm:52`). The D47 reason was Chromium 141 (`plan-d:56`).
- **`./styles` rules on `.collapse`, `.tab-pane`, or `.carousel-item` to support `until-found`.** Refused: they would override the classes the engine drives, against "Classes stay the explicit control" (`RM:17`).
- **Copying Bootstrap's component-level variables** into `./styles`, for example `.btn` padding for the density factor. Refused: "do not copy the Bootstrap cascade" (`RM:146`).
- **Unread tokens.** Refused under the T52 and S3 retirements (`rep-d:58`, `plan-d:95`).

## Measurements

**Supplied:**
- Dialog neutralization (`feas:13`, `cdx:210`).
- Tooltip residue and its corrected arrow (`cdx:214`).
- UA residue on the menu (`feas:15`).
- Initial value of `position-visibility` (`sbm:52`).
- `details` tween geometry with no animations (`sbm:137`).
- View Transitions ignore reduced motion (`sbm:166`).
- Scroll-lock strategies (`sbm:67-78`).
- Top-layer order (`feas:29`, `cdx:216`).
- Scroll markers, `scroll-target-group`, and scroll timelines operate (`sbm:145`).
- `until-found` defeated by Bootstrap's `[hidden]` (`sbm:133`).

**Missing:**
- The `reset`-layer neutralization under lifted Bootstrap, against each fence reading, including `.popover[popover]` keeping its border.
- `interpolate-size` declared on `details` reaching `::details-content` without reaching a nested `.collapse`.
- Whether `./styles` declarations trigger stage B's detection paths (gutter, intrinsic) if W1 keeps detection.
- Tailwind preflight with the mirror over `reset`-layer native rules.
- Forced-colors rendering of neutralized popovers.
- Gutter behavior on 153 under fixed elements (`nr8:74`).

## Units

These units open chunk 3 after the user's rulings.

| Unit | Role and engine | Owned files | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| S0 `styles-registry` | Writer; Astra (objective) | `src/core/constants.ts` (`veneer` groups), `src/core/types.ts`, `tests/src/core/*`, `tests/src/styles/index.test.ts` | D-1, D-2, D-6 | Two-way pin of `TOKEN_NAMES.veneer` against the built sheet, with renamed, appended, and mis-keyed controls; Veneer-owned names disjoint from `CLASS_NAMES.bootstrap`, with a planted `.small` control |
| S1 `styles-tokens` | Writer; Astra | `st/_tokens.scss`, `st/_mixins.scss`, `st/themes/index.scss` | S0 | Themes sheet carries no `:root`; motion proof at factors 0 and 2 plus reduced motion (P01, `id-d:148`); routed `--bs-*` names equal the release at factor 1 |
| S2 `default-pack` | Writer; Astra | `st/themes/_default.scss`, `tests/src/styles/themes/index.test.ts` | S1, D-3 | A nested default pack resets every token of an outer fixture pack; light and dark follow D51a |
| S3 `native-reset` | Writer; Astra | `st/_reset.scss`, `tests/src/styles/*.test.ts` | S1 and stage B's fences | Re-run the fence readings with `./styles` in place of the fence; `.popover[popover]` keeps Bootstrap's border and fill |
| S4 `native-surfaces` | Writer; Opus (subjective look) with an Astra review | `st/surfaces/*`, `st/elements/*` | S3, Q-I3, D-9 | Collision proof per the placement rule; reduced-motion twin on every transition and animation |
| S5 `styles-record` | Writer; Opus | `G` § Styles sheet and § Additions, the chunk 3 lines in `RM` | S0–S4, D-7 | `npm run test:guides`; the additions table is read in both directions |

Every unit runs `npm run test:src:styles`. S3–S5 also run the integration case `resolves the same cascade in all 24 sheet permutations`.

## Tensions

**For the other lane or the Orchestrator:**
- **T-1.** If W1 detects the gutter and intrinsic opt-ins from CSS (`syn:309`, `:313`), a `./styles` declaration of `scrollbar-gutter` on `html` or of `interpolate-size` above a `.collapse` opts the page into stage B rows silently. `cdx:174-183` uses typed options instead, which removes the coupling. W1 must rule.
- **T-2.** The stage B fences stay unlayered, which beats Bootstrap, while chunk 3's copy sits in `reset`, which loses to Bootstrap. The guide must state that the two homes have different precedence.
- **T-3.** Whether the panel curve may appear on any Veneer-owned surface is a matter of taste (Q-I6).
- **T-4.** Avoiding a trailing `-base` segment in token names is a naming call.
- **T-5.** `RM:146` still says chunk 3 opens after stage A, while the plan ruled stage B first (`rm3:44`).

**Open decisions chunk 3 needs from the user:**
- **D-1.** The layer for tag defaults: `reset` (proposed), `elements` with `revert-layer` exemptions, or a reordered statement.
- **D-2.** Whether `./styles` re-declares root-level `--bs-*` names in `theme` (radius, box shadow, focus ring, body font), routed through `--vn-*` factors at Bootstrap-equal values. Proposed: yes for root-read names only.
- **D-3.** What the default pack means: Bootstrap-equal complete defaults (proposed), or a Veneer look (tied to Q-I1).
- **D-4.** Whether `./styles` uses `!important` at all (`rm3:45`). Proposed: never. The consequence is that `until-found` stays refused on Bootstrap pages.
- **D-5.** Whether `./styles` may declare properties that stage B detects. Proposed: never on `html` or on collapse scopes.
- **D-6.** Whether `./styles` restyles Bootstrap component classes (Elements' `.badge` and `.carousel`). Proposed: no take-over beyond native-host neutralization.
- **D-7.** The shape of the additions record: the value ledger with witnesses (L04, L09; `id-d:77`, `:82`), or a flat table read in both directions like the departures table. Proposed: the flat table.
- **D-8.** Q-I1 through Q-I13.
- **D-9.** Whether CSS-only native components (scroll-marker carousel, `scroll-target-group` nav, popover drawer, bare dialog chrome) belong in chunk 3 or later.
- **D-10.** The supported browser floor, 153 only or also 141 (P03, `id-d:150`). It decides the `position-visibility` refusal.

## Risks

- **All tag rules in `reset`:** with Bootstrap loaded, reboot wins every overlapping property, so Veneer's tag looks partly disappear. Over-correcting toward `elements` puts Veneer over Bootstrap classes instead.
- **Routing `--bs-*` through factors:** Bootstrap pages that load `./styles` change visibly whenever a factor differs from 1. Refusing the routing entirely leaves the factors with no reach into Bootstrap.
- **Dropping every identity value:** `./styles` ships tokens with almost no visible product. Restoring them breaks the plan's identity rule.
- **CSS-detected opt-ins:** pages enter stage B departure rows unasked (T-1).
- **`overlay` removal proposal** (`nr0:55`): exit transitions that rely on it would break; the emitter must survive its removal.
- **Name collisions** with Bootstrap or Tailwind classes silently merge rules across faces.