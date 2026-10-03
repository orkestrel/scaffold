Slice 3 is chunks 3 and 5. I’ll read the roadmap, the plan, the styles and Vue trees, and the four distillates.# Chunks 3 and 5 at `dc4654b`

## Chunk 3 — Veneer styles

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| Opens after browser stage A | moot | `ROADMAP.md:146` still says that. `scaffold:.orkestrel/veneer/plan.md:17` puts stage B inside chunk 4 before chunk 3. | |
| Tokens and Veneer rules only; do not copy the Bootstrap cascade or the Tailwind map | done | `src/styles` has no `--bs-` and no `.btn`. `guides/veneer.md:1308` states the same limit. `tests/src/styles/index.test.ts:8` pins owned layers. | |
| First `--vn-*` token | open | `src/styles/_tokens.scss:1` is only the shared `@layer` order. | Declare the first `--vn-*` custom property. |
| `veneer` token group and class groups, pinned both ways | open | `src/core/constants.ts:14` freezes only `bootstrap`. `tests/src/styles/index.test.ts:38` is `it.todo` for `TOKEN_NAMES.veneer`. | Add the groups and replace that todo with the two-way pin. |
| Fill the default theme pack | open | `src/styles/themes/_default.scss` calls `retune('default', (), ())` under a TODO for the light and dark maps. `guides/veneer.md:1353` and `tests/src/styles/themes/index.test.ts:23` pin the empty pack. | Replace the empty maps with the default pack’s values. |
| Themes barrel copies the order statement once `_tokens.scss` has `:root` | open | `src/styles/themes/index.scss` still `@use`s `../tokens`. `ROADMAP.md:68` requires the copy at the first `:root` token. | Give the themes barrel its own order statement in that same change. |
| Replace the `--bs-` / `.btn` placeholder refusal with the additions record | open | No such refusal string was found under `src/styles` or `tests/src/styles`. `guides/veneer.md:1174` says additions belong to this face. | The named refusal is unverified. Write the additions record. |
| Take source mechanisms; drop identity-marked values | open | `scaffold:.orkestrel/veneer/plan.md:25`. The sheet has `retune` and no `--vn-*` values. | Land the reuse list below and omit the drop list. |
| `retune` is the theme-pack scheme | done | `src/styles/_mixins.scss` defines `retune` with `@layer theme` and `@scope ([data-vn-theme])`. `ROADMAP.md:100`, `ROADMAP.md:111`. | |
| `index.scss` does not `@use` themes or mixins; exports `./styles`, `./styles/scss`, `./styles/themes`, `./styles/themes/scss` | done | `src/styles/index.scss` loads tokens, reset, and the six folder barrels. `package.json:58`. `ROADMAP.md:96`. | |
| Styles `index.ts` is only `import './index.scss'` | moot | `ROADMAP.md:98` says that. `ROADMAP.md:153` says `index.ts` star-exports `sheet.ts`. `src/styles/index.ts:1` and `src/styles/sheet.ts:1` match line 153. | |
| Order first; blocks only in owned layers; theme-pack cases under `tests/src/styles/themes/` | done | `tests/src/styles/index.test.ts:8`, `tests/src/styles/themes/index.test.ts:22`. `ROADMAP.md:84`. | |
| Full kind-file set; empty folders keep a barrel | done | Kind files are present. `elements/_index.scss`, `components/_index.scss`, and `utilities/_index.scss` are empty. `ROADMAP.md:103`. | |

## Chunk 5 — Vue composables

| item | status | evidence | remaining work |
| --- | --- | --- | --- |
| Composables wrap the engine | open | `src/vue/index.ts:1` re-exports `./composables/index.js`. No `src/vue/composables` file is in the tree. `tests/src/vue/index.test.ts:5` expects no exports. `app/vue/Example.vue` renders the heading “Veneer Vue”. `ROADMAP.md:147`, `scaffold:.orkestrel/veneer/plan.md:27`. | Add composables that wrap the browser engine. |
| Optional `vue` peer | open | `package.json:130` has no `peerDependencies`. `vue` is a devDependency at `package.json:155`. `guides/veneer.md:945`. | Declare `vue` optional in `peerDependencies` and `peerDependenciesMeta`. |
| Externalize `vue` | open | `configs/src/vite.vue.config.ts:28` refuses `vue` until it is a peer. `configs/helpers.ts:418` throws that message. `configs/helpers.ts:404` externalizes `vue` once it is a peer. | The peer declaration is what turns the throw into an external. |
| Keep `@vue/*` refused | done | `configs/helpers.ts:413` throws for a refused scope even when that package is a peer. `tests/config.test.ts:3114`. | |
| Packed consumer under npm, pnpm strict, and Yarn Plug'n'Play | open | No `pnpm` or Plug'n'Play case under `tests/`. | Add those three packed-consumer proofs. |
| `.` and `./browser` without Vue | open | `guides/veneer.md:576` already excludes Vue from the packed browser graph. `guides/veneer.md:946` assigns the chunk’s proof. | Prove `.` and `./browser` with Vue absent from the install. |

## Reuse and drop for chunk 3

`absorb-styles-source-distillate.md` marks reuse in the Reuse column. **Reuse (`styles` or `both`):** `property-factors`, `palette-gray`, `tertiary-role`, `light-dark-base`, `triplet-emit`, `font-stacks`, `type-ramp`, `space-scale`, `radius-scale`, `shadow-scale`, `motion-scale`, `focus-metrics`, `container-gap`, `stack-scale`, `role-mix`, `heading-size-fn`, `anchor-visibility`, `html-interpolate` (`scaffold:.orkestrel/veneer/distillates/absorb-styles-source-distillate.md:7`–`:56`); `breakpoint-tokens`, `color-scheme-root`, `variant-loops` (`:22`, `:36`, `:65`). **Drop:** `layer-order`, `oklch-roles`, `mark-tokens`, `button-system-colors`, `mode-maps`, `state-amounts`, `theme-closure`, `bs-alias-root`, `mode-islands`, `scheme-fn`, `gutter-alias`, `button-reboot`, `element-button`, `anchor-reboot`, `fade-ease`, `modal-scale`, `text-emphasis`, `link-helpers` (`:6`–`:67`). Rows marked `bootstrap` stay on the Bootstrap face. `scaffold:.orkestrel/veneer/plan.md:25` also names the contrast rule and `retune` for this chunk; the source marks `contrast-fns` and `retune-tiers` `bootstrap` (`:28`, `:38`).

`absorb-styles-identity-distillate.md` marks drop with class `identity` and reuse with class `carry`. **Drop:** striped row at 12% (`:11`), `--vn-size-2` `0.875rem` (`:15`), primary `oklch(0.48 0.255 264)` (`:16`), near-black shade endpoint (`:20`), `--vn-surface-code` 12% chip (`:23`), `--vn-weight-heading` `600` (`:24`), modal `scale(0.96)` (`:37`), offcanvas opacity fade (`:41`), `.fade` on `ease-out` (`:45`), tooltip/popover `scale(0.98)` (`:46`), toast scale-in (`:47`), spinners still at `1.5s` under reduced motion (`:51`), collapse `interpolate-size` (`:52`), dialog `blur(2px)` (`:53`), dark primary light-cyan (`:67`), outline active mix (`:72`), `dl` grid (`:113`), bare `blockquote` bar (`:114`, `:132`), code chip (`:119`), `hr` opacity `0.2` (`:120`), `dd` on `--vn-text-muted` (`:137`). **Reuse** is every `carry` row in that facts table (`:8`–`:159`), including `--vn-factor-motion`, the three motion durations, the contrast pick at 4.5, and `retune`’s ledger member `retuned` (`:27`, `:59`, `:74`).

`absorb-styles-plan-distillate.md` drops Elements panel motion, the offcanvas fade, toast scale `0.98`, carousel `--vn-motion-slide` as an Elements duration, and mode-scoped primary, secondary, and focus color (`:185`–`:190`). `absorb-styles-reports-distillate.md` has no reuse or drop column; its Class column is `token` or `cascade` (`:5`).

## Decisions left open

| item | status | evidence | decision |
| --- | --- | --- | --- |
| Chunk 3 start versus stage B | partial | `scaffold:.orkestrel/veneer/plan.md:17` records stage B before chunk 3. `ROADMAP.md:146` still says after stage A. | The plan has ruled. The sequence sentence has not been updated. |
| Where `!important` sits for this face | open | `scaffold:.orkestrel/veneer/distillates/absorb-styles-identity-distillate.md:266`: adopt unlayered importance, or keep it layered and amend the roadmap. | Unruled for the styles face. |
| Toast entry geometry | open | Same file `:268`. | State geometry per direction, or keep opacity only. |
| Dropdown entry motion | open | Same file `:269`. | Waits on the engine session settling an entry animation after synchronous `shown`. |
| Witness for a `bootstrap` token that cannot have one | open | Same file `:270`. | Whether those tokens need an `Upstream` locator. |
| Chunk 5 | done | `ROADMAP.md:147` and `scaffold:.orkestrel/veneer/plan.md:27` name the peer, the external, the `@vue/*` refusal, and the pack proofs. No open product question is recorded. | |

Counts. Chunk 3: done 6, partial 0, open 6, moot 2. Chunk 5: done 1, partial 0, open 5, moot 0. Decisions: done 1, partial 1, open 3, moot 0.