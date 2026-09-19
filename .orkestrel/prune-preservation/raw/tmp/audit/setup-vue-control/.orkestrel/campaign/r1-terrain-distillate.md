# Unit R1-terrain — Grok distillate

Journal `tmp/cursor/r1-terrain.jsonl` (swept at acceptance), session `7427e5fe-4c0b-4e5b-8c13-8d96a110a080`, model `Cursor Grok 4.6 High`, 386 s. Containment: the run script read `git status --porcelain` in the roughnotes checkout before and after the lane (0 lines each); the lane itself could not run git in ask mode.

I'll read the brief and the repository's agent contracts first, then follow the brief's Output section exactly.The brief names a terrain unit and a fixed file list. I'll load the orchestration contract for that role's shape, take git status, then read only those files.Git status was blocked; I'll retry it and pull the terrain role shape plus the brief's exact file list.The browser declaration file is large. I'll extract its exports and read the remaining listed files in parallel.Git status was blocked, so I’ll finish from the listed files and put the porcelain miss in Unknowns and Deviation.## Question

Which exports of the roughnotes browser test setup module duplicate a published `@orkestrel/test` 0.0.17 export, and where does its journey suite reach past the interface?

## Evidence

`git -C C:/Users/mikes/WebstormProjects/roughnotes status --porcelain` was invoked before the reads and after they finished. The shell rejected both invocations. No tree mutation was performed.

`tests/setupBrowser.ts` has no `export`. It loads `bootstrap`, `bootstrap-icons/font/bootstrap-icons.css`, and `../app/browser/styles/index.scss`.

### Setup-module exports

Each row is name, `tests/app/browser/setup.ts` line, what it does, and the published match in `C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/test/dist/src/browser/index.d.ts` or `.../core/index.d.ts`, or `none`.

- `SETTLE_BUDGET` `setup.ts:36` — Caps how long a surface may take to paint a heading after a hash change, in ms. Match: `WaitOptions.budget` `core/index.d.ts:859`. Difference: a local 4000 constant versus an optional field whose `waitForCondition` default is 1000.
- `SETTLE_INTERVAL` `setup.ts:39` — Sets how often a settle poll may re-read the page, in ms. Match: `WaitOptions.interval` `core/index.d.ts:861`. Difference: a local 25 constant versus an optional field whose `waitForCondition` default is 10.
- `PAINT_BUDGET` `setup.ts:42` — Caps how long a control's paint may keep moving before the matrix refuses to read it, in ms. Match: `waitForAnimations` `browser/index.d.ts:2465` via `WaitOptions.budget`. Difference: a local 4000 constant versus that wait's default 1000.
- `HOME_HEADING` `setup.ts:45` — Holds the heading the home view paints. Match: `none`.
- `SIGN_IN_ABSENT` `setup.ts:48` — Holds the voice the layer uses when Sign In is absent. Match: `none`.
- `MENU_UNREACHABLE` `setup.ts:57` — Holds the voice the layer uses for the compact trigger a wide masthead renders and hides. Match: `none`.
- `CLOSE_UNREACHABLE` `setup.ts:60` — Holds the voice the layer uses for the compact dismissal a closed menu renders and hides. Match: `none`.
- `COMPACT_WIDTH` `setup.ts:66` — Marks the width, in CSS px, below which the masthead folds its destinations into the compact menu. Match: `none`.
- `readCompact` `setup.ts:73` — Reports whether the masthead is folded into the compact menu at the current viewport. Match: `none`.
- `TEXT_CONTRAST` `setup.ts:78` — Sets the ratio information-bearing text must reach against the surface behind it. Match: `none`.
- `MARK_CONTRAST` `setup.ts:81` — Sets the ratio a meaningful textless mark, a state, and focus chrome must reach. Match: `none`.
- `MatrixRole` `setup.ts:87` — Describes one resolved-style role the matrix reads: membership rule and bar. Match: `none`.
- `MatrixControl` `setup.ts:97` — Describes one control the matrix focuses, to read fill and ring. Match: `none`.
- `GradientSurface` `setup.ts:104` — Pairs one painted gradient surface with the primitive tokens its stops name. Match: `none`.
- `GRADIENT_SURFACES` `setup.ts:117` — Names every surface whose paint is a gradient rather than a flat fill. Match: `none`.
- `SHELL_ROLES` `setup.ts:134` — Lists the roles the shell paints on every screen. Match: `none`.
- `HOME_ROLES` `setup.ts:150` — Lists the roles home paints across its paper sections and navy islands. Match: `none`.
- `LISTING_ROLES` `setup.ts:177` — Lists the roles a listing paints after its filter row and records. Match: `none`.
- `REFUSED_ROLES` `setup.ts:198` — Lists the roles a refused request paints. Match: `none`.
- `NOTICE_ROLES` `setup.ts:225` — Lists the roles a quiet notice paints. Match: `none`.
- `UNINDEXED_SKU` `setup.ts:245` — Holds a fixture book the live listing identifies by catalog code alone. Match: `none`.
- `COMMIT_CONTROL` `setup.ts:255` — Names the primary commit the subscribe desk ends on. Match: `none`.
- `CONTENT_CONTROL` `setup.ts:268` — Names the quiet destination the footer carries to the shop. Match: `none`.
- `SELECTED_CONTROL` `setup.ts:275` — Names the magazine filter row's selected control. Match: `none`.
- `UNSELECTED_CONTROL` `setup.ts:282` — Names the magazine filter row's unselected control. Match: `none`.
- `SUMMARY_CONTROL` `setup.ts:289` — Names the plain link a refused inquiry's summary offers. Match: `none`.
- `readThemeControl` `setup.ts:301` — Names the masthead color-mode control the painted mode obliges the shell to offer. Match: `none`.
- `readGradient` `setup.ts:311` — Finds the gradient surface `node` is painted on, when one sits between it and the nearest fill. Match: `none`.
- `readSurface` `setup.ts:330` — Reads the contrast `node` reaches against the surface a person actually sees behind it. Match: `readContrast` `browser/index.d.ts:1635`. Difference: on a named gradient it measures each token stop and takes the minimum; otherwise it calls `readContrast`.
- `isRunning` `setup.ts:354` — Reports whether one animation is still moving the paint it drives. Match: `none`.
- `readSettled` `setup.ts:373` — Reads the contrast `node` reaches once its own paint has stopped moving. Match: `waitForAnimations` `browser/index.d.ts:2465`. Difference: waits only the element's own running animations then returns `readSurface`; the published wait covers the subtree, parks on `finished`, and does not measure contrast.
- `selectRole` `setup.ts:390` — Selects every painted member of a role's population inside `root`. Match: `none`.
- `isPainted` `setup.ts:404` — Reports whether an element paints a box a reader can see. Match: `isRendered` `browser/index.d.ts:1194`. Difference: geometry, visibility, and opacity, and it accepts `aria-hidden` marks; `isRendered` is announcement and does not read the box.
- `readIsland` `setup.ts:416` — Reports whether `node` sits inside a declared color-mode island rather than on the page surface. Match: `none`.
- `JourneySurface` `setup.ts:421` — Describes the host one journey mounted and the application it provided. Match: `none`.
- `SurfaceOptions` `setup.ts:428` — Describes how one journey opens the shipped shell. Match: `none`.
- `QuotaOptions` `setup.ts:434` — Declares how many writes a `QuotaStorage` accepts before its quota is spent. Match: `StorageOptions` `browser/index.d.ts:2359`. Difference: only `writes`; the published shape also carries `values`, `reads`, `writes`, and `quota`.
- `QuotaStorage` `setup.ts:448` — Implements Web Storage over a real store whose quota runs out after `writes`. Match: `createStorage` `browser/index.d.ts:739`. Difference: quota-only class with no `permit`, seed, or read/write flags; the published factory folds quota into one store.
- `PermissionOptions` `setup.ts:519` — Declares which operations the host's storage permission covers. Match: `StorageOptions` `browser/index.d.ts:2359`. Difference: only `reads` and `writes`; no `values` or `quota`.
- `PermissionStorage` `setup.ts:535` — Implements Web Storage over a real store the host holds behind a permission. Match: `createStorage` `browser/index.d.ts:739` and `WebStorageInterface` `browser/index.d.ts:2545`. Difference: permission-only; `#denial` voices `Access is denied for ${detail}` while `buildDenial` `browser/index.d.ts:158` names the operation and key (`Access is denied for getItem "theme"`).
- `readRefusal` `setup.ts:637` — Reads the layer's exact refusal voice for `name`, or `undefined` when it resolves. Match: `readRefusal` `browser/index.d.ts:1863`. Difference: local exposes only the name overload; the published export also takes `role, name` at `browser/index.d.ts:1891`.
- `readAnnounced` `setup.ts:652` — Reads the states one painted control announces, `pressed` among them. Match: `readStates` `browser/index.d.ts:2040`. Difference: takes an accessible name and hardcodes role `button`; the published reader takes the element.
- `clearSurface` `setup.ts:659` — Tears down whatever the page is holding so the next journey meets a clean document. Match: `createTeardown` `core/index.d.ts:192`. Difference: also `replaceChildren`, clears `window.location.hash`, and resets `data-bs-theme`; the published helper is only a newest-first handler list.
- `openSurface` `setup.ts:672` — Mounts the shipped root over an isolated memory store and waits until home has painted. Match: `none`.
- `startSubscription` `setup.ts:698` — Opens subscribe through the home Introduction Get started control. Match: `none`.
- `followSite` `setup.ts:707` — Follows an in-app destination from the header, opening the compact menu when it is reachable. Match: `none`.
- `readMenuSettled` `setup.ts:723` — Checks whether the compact menu has finished opening or closing. Match: `waitForState` `browser/index.d.ts:2495`. Difference: reads Bootstrap `show` / `showing` / `hiding` on `#site-menu`; the published wait reads announced states and calls itself the replacement for a class-name settle.
- `openSite` `setup.ts:743` — Opens the compact navigation, and refuses a trigger that disagrees with the viewport. Match: `none`.
- `closeSite` `setup.ts:767` — Closes the compact navigation, and refuses a dismissal that disagrees with the viewport. Match: `none`.
- `toggleThemeControl` `setup.ts:791` — Toggles color mode through the control the painted mode obliges the masthead to offer. Match: `none`.
- `buildMarkControl` `setup.ts:802` — Builds an SVG carrying an undefined class token for the census extractor control. Match: `buildCensus` `browser/index.d.ts:101`. Difference: caller supplies the token and gets only the SVG; the published fixture builds HTML plus SVG tokens of its own.
- `STACK_BASE` `setup.ts:809` — Holds the opaque fill a composited stack ends on. Match: `CANVAS_COLOR` `browser/index.d.ts:196`. Difference: CSS string `rgb(255, 255, 255)` versus a `Color` tuple.
- `STACK_TINT` `setup.ts:812` — Holds the translucent layer a composited stack paints over `STACK_BASE`. Match: `none`.
- `STACK_REFUSED` `setup.ts:815` — Holds a foreground the flat reading clears and the composited reading fails. Match: `none`.
- `STACK_ACCEPTED` `setup.ts:818` — Holds a foreground the composited reading clears and the flat reading fails. Match: `none`.
- `CompositeStack` `setup.ts:824` — Pairs one translucent stack with the refused and accepted foregrounds the composited-contrast control reads over it. Match: `ContrastFixture` `browser/index.d.ts:500`. Difference: `base` versus `root`.
- `buildCompositeStack` `setup.ts:842` — Builds a translucent stack whose composited reading and flat reading disagree in both directions. Match: `buildContrast` `browser/index.d.ts:136`. Difference: hardcodes `STACK_*` colors and takes no bar; the published builder searches greys for a given bar and refuses an unreachable bar.
- `readFlat` `setup.ts:870` — Reads the contrast `node` reaches against its nearest declared background taken at full strength. Match: `readContrast` `browser/index.d.ts:1635`. Difference: stops at the first background with alpha > 0 and forces alpha to 1; `readContrast` composites translucent layers.
- `CENSUS_RULE` `setup.ts:885` — Holds the membership rule every census row names. Match: `none`.
- `CensusReading` `setup.ts:892` — Describes one authored-class census: the population it walked and the tokens the cascade never declares. Match: `CensusReading` `browser/index.d.ts:331`. Difference: local `tokens` is a count; published `tokens` is `readonly string[]`.
- `readCensus` `setup.ts:910` — Takes the authored-class census of one mounted screen, both controls included. Match: `readCensus` `browser/index.d.ts:1572`. Difference: takes `fed` and `carried`, appends an SVG mark, and reports a token count; the published reader takes only `root`, returns the token list, and throws on an empty walk.
- `EscapeFixtures` `setup.ts:925` — Describes the fixtures one style-escape reading carries, and the block it must leave alone. Match: `EscapeFixture` `browser/index.d.ts:817`. Difference: `block` versus `embedded`, no `root`; `permitted` is `HTMLStyleElement`.
- `buildEscapeFixtures` `setup.ts:943` — Builds one fixture per style-escape branch, plus the permitted document stylesheet block. Match: `buildEscapes` `browser/index.d.ts:186`. Difference: takes a CSS `declaration` and hardcodes `id` `roughnotes-stylesheet`; the published builder takes the permitted `id` and uses the package's own declaration.
- `DETAIL_SLUGS` `setup.ts:954` — Maps detail views to a fixture slug the catalog actually holds. Match: `none`.
- `mountView` `setup.ts:966` — Mounts a view that injects `APPLICATION_KEY` over an isolated application. Match: `mount` `browser/index.d.ts:1365`. Difference: mounts a Vue component with an application; `mount` appends a pre-built element to `document.body`.
- `THEME_PROBE` `setup.ts:987` — Renders the theme composable so tests can drive `toggle` without the shell. Match: `none`.

### Reach-past sites in `integration.test.ts`

Present: `vitest/browser` import at line 3; `elementFromPoint` at 218; `querySelectorAll` at 356; application/storage reads at 131, 976, 987, 1008, 1015, 1045, 1047, 1053, 1071, 1084, 1085, 1091. Quoted in Distillate.

Absent from this file: `userEvent.keyboard`; `.focus()`; `classList` / `className`; `push` / `replace` / `router.` as a router; `localStorage` / `sessionStorage`; `document.querySelector` / `getElementById`; `setTimeout` / `setInterval` / a hand poll loop.

### Variant channel

`JourneyVariant` type: `vite.config.ts:40-44`. `VARIANTS` declaration: `vite.config.ts:53-58`. `journey` factory: `vite.config.ts:364-379`. `provide` keys: `variant`, `variants` at `vite.config.ts:376`.

Test reads: `integration.test.ts:159` `inject('variants')`; `integration.test.ts:160` `inject('variant')`. No `import.meta.env.VITE_VARIANT` or `VITE_VARIANTS` identifier in `App.test.ts`, `helpers.test.ts`, `setup.test.ts`, or `integration.test.ts`. `vite.config.ts:51` and `vite.config.ts:352` name those env keys in comments; the factory uses `provide` instead. `integration.test.ts:155` assigns `import.meta.env` to `ENVIRONMENT`; `integration.test.ts:161` reads `ENVIRONMENT.VITE_CAPTURE`, which is not a variant key.

### What proves the setup exports

`App.test.ts:6` imports `clearSurface`, `openSurface`. `helpers.test.ts:28` imports `PermissionStorage`. `setup.test.ts:2` imports `buildMarkControl`, `readRefusal`, `SIGN_IN_ABSENT`.

### Capture wiring

`App.test.ts`, `helpers.test.ts`, and `setup.test.ts` name none of `CAPTURE`, `capture`, `createPortfolio`, `captureFrame`, or `expandCaptures`. `captureFrame` is unnamed in `integration.test.ts`. Sites in `integration.test.ts`:

- `1` `CaptureVariant`
- `12` `createPortfolio`
- `15` `expandCaptures`
- `89` `CaptureVariant`
- `93` `'capture'`
- `141` `CaptureVariant`
- `159` `CaptureVariant`
- `161` `CAPTURING`, `VITE_CAPTURE`
- `174` `capture frames`
- `183` `createPortfolio`
- `187` `tmp/capture/states`
- `188` `CAPTURING`
- `427` `CAPTURING`
- `431` `capturing`
- `1103` `'capture'`
- `1104` `expandCaptures`
- `1109` `CAPTURING`
- `1110` `expandCaptures`

## Distillate

The setup exports and their published matches:

| export | line | matching published export | difference |
| --- | --- | --- | --- |
| `SETTLE_BUDGET` | `setup.ts:36` | `WaitOptions.budget` `core/index.d.ts:859` | local 4000 versus optional field, `waitForCondition` default 1000 |
| `SETTLE_INTERVAL` | `setup.ts:39` | `WaitOptions.interval` `core/index.d.ts:861` | local 25 versus optional field, `waitForCondition` default 10 |
| `PAINT_BUDGET` | `setup.ts:42` | `waitForAnimations` `browser/index.d.ts:2465` | local 4000 versus that wait's default 1000 |
| `HOME_HEADING` | `setup.ts:45` | `none` | |
| `SIGN_IN_ABSENT` | `setup.ts:48` | `none` | |
| `MENU_UNREACHABLE` | `setup.ts:57` | `none` | |
| `CLOSE_UNREACHABLE` | `setup.ts:60` | `none` | |
| `COMPACT_WIDTH` | `setup.ts:66` | `none` | |
| `readCompact` | `setup.ts:73` | `none` | |
| `TEXT_CONTRAST` | `setup.ts:78` | `none` | |
| `MARK_CONTRAST` | `setup.ts:81` | `none` | |
| `MatrixRole` | `setup.ts:87` | `none` | |
| `MatrixControl` | `setup.ts:97` | `none` | |
| `GradientSurface` | `setup.ts:104` | `none` | |
| `GRADIENT_SURFACES` | `setup.ts:117` | `none` | |
| `SHELL_ROLES` | `setup.ts:134` | `none` | |
| `HOME_ROLES` | `setup.ts:150` | `none` | |
| `LISTING_ROLES` | `setup.ts:177` | `none` | |
| `REFUSED_ROLES` | `setup.ts:198` | `none` | |
| `NOTICE_ROLES` | `setup.ts:225` | `none` | |
| `UNINDEXED_SKU` | `setup.ts:245` | `none` | |
| `COMMIT_CONTROL` | `setup.ts:255` | `none` | |
| `CONTENT_CONTROL` | `setup.ts:268` | `none` | |
| `SELECTED_CONTROL` | `setup.ts:275` | `none` | |
| `UNSELECTED_CONTROL` | `setup.ts:282` | `none` | |
| `SUMMARY_CONTROL` | `setup.ts:289` | `none` | |
| `readThemeControl` | `setup.ts:301` | `none` | |
| `readGradient` | `setup.ts:311` | `none` | |
| `readSurface` | `setup.ts:330` | `readContrast` `browser/index.d.ts:1635` | on a named gradient measures each token stop and takes min; else calls `readContrast` |
| `isRunning` | `setup.ts:354` | `none` | |
| `readSettled` | `setup.ts:373` | `waitForAnimations` `browser/index.d.ts:2465` | own running animations then `readSurface`; published wait covers subtree and does not measure |
| `selectRole` | `setup.ts:390` | `none` | |
| `isPainted` | `setup.ts:404` | `isRendered` `browser/index.d.ts:1194` | box, visibility, opacity; accepts `aria-hidden`; published is announcement without geometry |
| `readIsland` | `setup.ts:416` | `none` | |
| `JourneySurface` | `setup.ts:421` | `none` | |
| `SurfaceOptions` | `setup.ts:428` | `none` | |
| `QuotaOptions` | `setup.ts:434` | `StorageOptions` `browser/index.d.ts:2359` | only `writes`; published also `values`, `reads`, `writes`, `quota` |
| `QuotaStorage` | `setup.ts:448` | `createStorage` `browser/index.d.ts:739` | quota-only class, no `permit`/seed/permission flags |
| `PermissionOptions` | `setup.ts:519` | `StorageOptions` `browser/index.d.ts:2359` | only `reads` and `writes`; no `values` or `quota` |
| `PermissionStorage` | `setup.ts:535` | `createStorage` `browser/index.d.ts:739`, `WebStorageInterface` `browser/index.d.ts:2545` | permission-only; denial names the key/`this document`, not `buildDenial`'s operation and key |
| `readRefusal` | `setup.ts:637` | `readRefusal` `browser/index.d.ts:1863` | local is name-only; published also `role, name` at `browser/index.d.ts:1891` |
| `readAnnounced` | `setup.ts:652` | `readStates` `browser/index.d.ts:2040` | takes accessible name, hardcodes role `button`; published takes the element |
| `clearSurface` | `setup.ts:659` | `createTeardown` `core/index.d.ts:192` | also clears DOM, hash, and theme; published is only a handler list |
| `openSurface` | `setup.ts:672` | `none` | |
| `startSubscription` | `setup.ts:698` | `none` | |
| `followSite` | `setup.ts:707` | `none` | |
| `readMenuSettled` | `setup.ts:723` | `waitForState` `browser/index.d.ts:2495` | Bootstrap class names on `#site-menu`; published reads announced states |
| `openSite` | `setup.ts:743` | `none` | |
| `closeSite` | `setup.ts:767` | `none` | |
| `toggleThemeControl` | `setup.ts:791` | `none` | |
| `buildMarkControl` | `setup.ts:802` | `buildCensus` `browser/index.d.ts:101` | caller-supplied token, SVG only; published builds HTML plus SVG tokens |
| `STACK_BASE` | `setup.ts:809` | `CANVAS_COLOR` `browser/index.d.ts:196` | CSS string versus `Color` tuple |
| `STACK_TINT` | `setup.ts:812` | `none` | |
| `STACK_REFUSED` | `setup.ts:815` | `none` | |
| `STACK_ACCEPTED` | `setup.ts:818` | `none` | |
| `CompositeStack` | `setup.ts:824` | `ContrastFixture` `browser/index.d.ts:500` | `base` versus `root` |
| `buildCompositeStack` | `setup.ts:842` | `buildContrast` `browser/index.d.ts:136` | hardcodes `STACK_*`; published searches greys for a given bar |
| `readFlat` | `setup.ts:870` | `readContrast` `browser/index.d.ts:1635` | first background at alpha 1; published composites translucent layers |
| `CENSUS_RULE` | `setup.ts:885` | `none` | |
| `CensusReading` | `setup.ts:892` | `CensusReading` `browser/index.d.ts:331` | local `tokens` is a count; published `tokens` is `readonly string[]` |
| `readCensus` | `setup.ts:910` | `readCensus` `browser/index.d.ts:1572` | extra `fed`/`carried`, SVG mark, token count; published is `root` only and throws on empty walk |
| `EscapeFixtures` | `setup.ts:925` | `EscapeFixture` `browser/index.d.ts:817` | `block` versus `embedded`, no `root` |
| `buildEscapeFixtures` | `setup.ts:943` | `buildEscapes` `browser/index.d.ts:186` | takes a declaration and hardcodes the permitted id; published takes the permitted id |
| `DETAIL_SLUGS` | `setup.ts:954` | `none` | |
| `mountView` | `setup.ts:966` | `mount` `browser/index.d.ts:1365` | Vue component plus application; published appends an element |
| `THEME_PROBE` | `setup.ts:987` | `none` | |

Reach-past sites in `tests/app/browser/integration.test.ts`:

- `3` `import { commands, page } from 'vitest/browser'`
- `131` `app.theme(variantDark(name))`
- `218` `const centre = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)`
- `356` `const walked = host.querySelectorAll('*').length`
- `976` `app.open(MAGAZINE_PATH)`
- `987` `app.open(CONTACT_PATH)`
- `1008` `empty.app.open(MAGAZINE_PATH)`
- `1015` `unindexed.app.open(skuHref(UNINDEXED_SKU.id))`
- `1045` `expect(first.storage.getItem(THEME_STORAGE)).toBe(THEME_DARK)`
- `1047` `const second = await openSurface({ storage: first.storage })`
- `1053` `expect(second.app.dark.value).toBe(true)`
- `1071` `expect(storage.getItem(THEME_STORAGE)).toBe(THEME_LIGHT)`
- `1084` `expect(app.dark.value).toBe(true)`
- `1085` `expect(storage.getItem(THEME_STORAGE)).toBe(THEME_LIGHT)`
- `1091` `expect(second.app.dark.value).toBe(false)`

## Unknowns

Porcelain status of `C:/Users/mikes/WebstormProjects/roughnotes` before and after the reads. The shell rejected `git status --porcelain` on each invocation.

Whether `app.open` is a router call under the brief's `push` / `replace` / `router.` test. The identifier is `open` on the application object, so it is listed with store/session reads and not as a router API.

## Journal

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/r1-terrain-brief.md`, then the brief's file list. `browser/index.d.ts` exceeded a single read, so its `export declare` lines were searched and the matching JSDoc blocks were read. `core/index.d.ts` was read in full. Capture, variant, and import tokens were searched inside the listed test files. `git status --porcelain` was invoked on `C:/Users/mikes/WebstormProjects/roughnotes` before those reads and after they finished; the shell rejected each invocation.

## Deviation

Expected: porcelain status before the reads and after they finished. Found: the shell rejected both invocations. Done: the listed files were read and the shape above was filled. Not done: the two porcelain readings. Hypothesis: Ask-mode shell policy blocked `git` even as a non-mutating status.