# G1 distillate — Cursor Grok

Session 3bdf3c2e-da0c-40d4-b8c0-b94638d4480d, journal tmp/cursor/g1.jsonl, duration 370922 ms.

I'll read the brief and the repository contracts it depends on, then answer exactly as specified.The brief names a fixed read order. I’ll load those files next and inventory the journey instruments from them.Setup is loaded. Next I’ll read the journey suite, theme matrix, and the variant/capture config.Question: Which browser-journey instruments did Rough Notes hand-roll, which are application-specific vs generic, and which published `@orkestrel/test` exports they overlap, wrap, or should have used?

Evidence:

**1. Instrument table**

`tests/app/browser/setup.ts` exports:

| name | file:line | job | specific/generic | overlaps |
|---|---|---|---|---|
| SETTLE_BUDGET | setup.ts:36 | Caps heading/menu settle polls at 4000ms | generic | waitForCondition |
| SETTLE_INTERVAL | setup.ts:39 | Settle poll cadence 25ms | generic | waitForCondition |
| PAINT_BUDGET | setup.ts:42 | Caps animation-settle reads at 4000ms | generic | waitForCondition / waitForFrame |
| HOME_HEADING | setup.ts:45 | Home heading needle | specific | none |
| SIGN_IN_ABSENT | setup.ts:48 | Exact absent-Sign-In refusal voice | specific | resolveRendered / resolveAccessible |
| MENU_UNREACHABLE | setup.ts:57 | Exact hidden-menu-trigger refusal voice | specific | resolveRendered / isReachable |
| CLOSE_UNREACHABLE | setup.ts:60 | Exact hidden-close refusal voice | specific | resolveRendered / isReachable |
| COMPACT_WIDTH | setup.ts:66 | Bootstrap `lg` 992px fold | specific | isOutsideViewport |
| readCompact | setup.ts:73 | Viewport below `lg` | specific | isOutsideViewport |
| TEXT_CONTRAST | setup.ts:78 | WCAG text bar 4.5 | generic | measureContrast / readContrast |
| MARK_CONTRAST | setup.ts:81 | WCAG non-text bar 3 | generic | readRing / measureContrast |
| MatrixRole | setup.ts:87 | Role selector + contrast bar | generic | none |
| MatrixControl | setup.ts:97 | Role+name of a focused control | generic | resolveRendered / resolveAccessible |
| GradientSurface | setup.ts:104 | Selector + token stops | generic | readToken / parseCSSColor |
| GRADIENT_SURFACES | setup.ts:117 | RN gradient islands (`.hero`, `.invite`, …) | specific | readBackdrop / readLayers |
| SHELL_ROLES | setup.ts:134 | Utility-bar/footer populations | specific | none |
| HOME_ROLES | setup.ts:150 | Home `#main` populations | specific | none |
| LISTING_ROLES | setup.ts:177 | Listing `#main` populations | specific | none |
| REFUSED_ROLES | setup.ts:198 | Refused-form populations | specific | none |
| NOTICE_ROLES | setup.ts:225 | Quiet-notice populations | specific | none |
| UNINDEXED_SKU | setup.ts:245 | Fixture book without ISBN | specific | none |
| COMMIT_CONTROL | setup.ts:255 | Subscribe commit (COPY.subscribe) | specific | resolveAccessible |
| CONTENT_CONTROL | setup.ts:268 | Footer catalog link | specific | resolveAccessible |
| SELECTED_CONTROL | setup.ts:275 | “All articles” pressed filter | specific | resolveAccessible |
| UNSELECTED_CONTROL | setup.ts:282 | “Program business” filter | specific | resolveAccessible |
| SUMMARY_CONTROL | setup.ts:289 | Refused-inquiry summary link | specific | resolveAccessible |
| readThemeControl | setup.ts:301 | Masthead light/dark control for painted mode | specific | resolveAccessible |
| readGradient | setup.ts:311 | Nearest GRADIENT_SURFACES ancestor | specific | readLayers / readStyle / parseCSSColor |
| readSurface | setup.ts:330 | Contrast vs visible fill or worst gradient stop | specific | readContrast / measureContrast / readToken |
| isRunning | setup.ts:354 | `animation.playState === 'running'` | generic | none |
| readSettled | setup.ts:373 | Contrast after node's animations finish | generic | waitForFrame / waitForCondition |
| selectRole | setup.ts:390 | `querySelectorAll(role.selector)` then isPainted | specific | resolveRendered / isRendered |
| isPainted | setup.ts:404 | Non-zero box, visibility, opacity | generic | isRendered / isReachable |
| readIsland | setup.ts:416 | Nearest `[data-bs-theme]` ≠ documentElement | specific | none |
| JourneySurface | setup.ts:421 | host + app + storage | specific | mount / render |
| SurfaceOptions | setup.ts:428 | Optional storage/catalog | specific | none |
| QuotaOptions | setup.ts:434 | Allowed write count | generic | none |
| QuotaStorage | setup.ts:448 | Storage that raises QuotaExceededError after N writes | generic | none |
| PermissionOptions | setup.ts:519 | reads/writes permission flags | generic | none |
| PermissionStorage | setup.ts:535 | Storage that raises SecurityError when denied | generic | none |
| readRefusal | setup.ts:637 | Catch resolveRendered message | generic | captureError / resolveRendered |
| readAnnounced | setup.ts:652 | readStates of a named button | generic | readStates / resolveAccessible |
| clearSurface | setup.ts:659 | Unmount, wipe body, hash, force light theme | specific | createTeardown / clearStorage |
| openSurface | setup.ts:672 | Mount shipped App until HOME_HEADING | specific | mount / render / waitForCondition / readPage |
| startSubscription | setup.ts:698 | Click Introduction “Get started” | specific | clickAccessibleWithin |
| followSite | setup.ts:707 | openSite + click dest + wait #main focus | specific | clickAccessible / clickDisclosure |
| readMenuSettled | setup.ts:723 | `#site-menu` has `show` and not `showing`/`hiding` | specific | none (clickDisclosure is native `<summary>` only) |
| openSite | setup.ts:743 | Click menu or pin MENU_UNREACHABLE | specific | clickAccessible / clickDisclosure |
| closeSite | setup.ts:767 | Click close or pin CLOSE_UNREACHABLE | specific | clickAccessible / clickDisclosure |
| toggleThemeControl | setup.ts:791 | Click light/dark from `data-bs-theme` | specific | clickAccessible |
| buildMarkControl | setup.ts:802 | SVG carrying an undeclared class | generic | build |
| STACK_BASE | setup.ts:809 | Opaque white composite floor | generic | CANVAS_COLOR / blendColor |
| STACK_TINT | setup.ts:812 | Translucent black overlay | generic | blendColor |
| STACK_REFUSED | setup.ts:815 | Foreground that fails the composite | generic | measureContrast |
| STACK_ACCEPTED | setup.ts:818 | Foreground that clears the composite | generic | measureContrast |
| CompositeStack | setup.ts:824 | base/refused/accepted nodes | generic | build |
| buildCompositeStack | setup.ts:842 | Tint stack whose flat vs composite disagree | generic | build / blendColor / readContrast |
| readFlat | setup.ts:870 | Contrast vs first bg taken at alpha 1 | generic | readLayers / readBackdrop / readContrast |
| CENSUS_RULE | setup.ts:885 | Census membership sentence | generic | readClasses / readCascade |
| CensusReading | setup.ts:892 | elements/tokens/undeclared | generic | readClasses |
| readCensus | setup.ts:910 | Authored classes vs cascade, SVG trap | generic | readClasses / readCascade |
| EscapeFixtures | setup.ts:925 | inline/block/permitted style escapes | specific | extractStyles / extractOrphans |
| buildEscapeFixtures | setup.ts:943 | Inline + component `<style>` + `#roughnotes-stylesheet` | specific | extractStyles / build |
| DETAIL_SLUGS | setup.ts:954 | product/article/item fixture slugs | specific | none |
| mountView | setup.ts:966 | Mount a view with APPLICATION_KEY | specific | mount / render |
| THEME_PROBE | setup.ts:987 | Button driving useTheme.toggle | specific | mount |

`tests/app/browser/integration.test.ts` module-scope:

| name | file:line | job | specific/generic | overlaps |
|---|---|---|---|---|
| FAMILIES | integration.test.ts:93 | Declared family names | generic | none |
| STATES | integration.test.ts:97 | Capture-registry screen ids | specific | createPortfolio |
| variantDark | integration.test.ts:126 | Name starts with `dark-` | specific | none |
| paintVariant | integration.test.ts:130 | `app.theme` from variant name | specific | none |
| parseVariants | integration.test.ts:141 | Narrow inject('variants') | generic | none |
| ENVIRONMENT | integration.test.ts:155 | import.meta.env | generic | none |
| VARIANTS | integration.test.ts:159 | inject('variants') | generic | createPortfolio |
| VARIANT | integration.test.ts:160 | inject('variant') | generic | createPortfolio |
| CAPTURING | integration.test.ts:161 | VITE_CAPTURE === 'true' | generic | createPortfolio |
| CURRENT | integration.test.ts:162 | Matching variant record | generic | requireValue |
| ABSENT_CLASS | integration.test.ts:167 | Fed undeclared class token | specific | readClasses |
| ABSENT_MARK | integration.test.ts:168 | Carried undeclared SVG class | specific | readClasses |
| ESCAPE_DECLARATION | integration.test.ts:169 | Inline color probe | generic | extractStyles |
| JOURNEY_BUDGET | integration.test.ts:170 | 30000ms journey timeout | generic | none |
| MATRIX_BUDGET | integration.test.ts:171 | 180000ms matrix timeout | generic | none |
| TRANSPORT_BUDGET | integration.test.ts:172 | 30000ms transport timeout | generic | none |
| ARTIFACT_PATH | integration.test.ts:173 | `tmp/journeys/${VARIANT}.txt` | specific | none |
| FRAMES_HEADING | integration.test.ts:174 | Artifact frames section | generic | expandCaptures |
| FORBIDDEN | integration.test.ts:175 | Words the page must not speak | specific | readPage |
| portfolio | integration.test.ts:183 | createPortfolio(STATES, VARIANTS) | generic | createPortfolio |
| WALKED | integration.test.ts:193 | Matrix coverage accumulators | generic | none |
| PLACED | integration.test.ts:194 | States this run placed | generic | createPortfolio |
| PROVEN | integration.test.ts:195 | Families this run proved | generic | none |
| MATRIX_ROWS | integration.test.ts:196 | Artifact style rows | generic | none |
| JOURNAL | integration.test.ts:197 | createJournal() | generic | createJournal |
| SHOTS | integration.test.ts:198 | scrollHeight per placed file | generic | readFrame |
| TREE | integration.test.ts:199 | describeTree snapshot | generic | describeTree |
| FOCUS | integration.test.ts:200 | describeFocus snapshot | generic | describeFocus |
| place | integration.test.ts:202 | PLACED + SHOTS + portfolio.place | generic | createPortfolio |
| waitForText | integration.test.ts:208 | Poll readPage().includes(text) | generic | waitForCondition / readPage |
| followField | integration.test.ts:215 | Click error link; prove focus id + hash | specific | readHit / clickAccessible |
| waitForOrigin | integration.test.ts:228 | #main focused and scrollY 0 | specific | waitForCondition |
| readFileName | integration.test.ts:239 | Basename of a capture path | generic | none |
| readOpeningTag | integration.test.ts:246 | Markup through first `>` | generic | none |
| readGroup | integration.test.ts:258 | Worst readSurface vs bar | generic | readContrast |
| readRole | integration.test.ts:281 | Split population by readIsland | specific | selectRole |
| readControl | integration.test.ts:301 | Settled fill + Tab + ring | generic | resolveRendered / traverseAccessible / readRing / readSettled |
| readScreenCensus | integration.test.ts:331 | Census + expect only fed traps | generic | readCensus |
| readEscapes | integration.test.ts:352 | extractStyles on surface vs head | generic | extractStyles |
| readComposite | integration.test.ts:383 | Flat vs composited pair | generic | readSurface / readFlat |
| readWrittenFrames | integration.test.ts:411 | Parse artifact frames when not capturing | specific | none |
| writeArtifact | integration.test.ts:425 | Write tree/focus/matrix/journal/frames | specific | createJournal / expandCaptures |

`tests/app/browser/styles/theme.test.ts`: no module-scope function or constant (helpers sit inside `it` bodies).

**2. Reach-past sites**

querySelector / id / class:
- `setup.ts:119` `selector: '.hero'`
- `setup.ts:122` `selector: '.invite'`
- `setup.ts:123` `selector: '.issue-head'`
- `setup.ts:125` `selector: ".card[data-bs-theme='dark']"`
- `setup.ts:128` `selector: '.monogram'`
- `setup.ts:137` `selector: "div.small[data-bs-theme='dark'] a"`
- `setup.ts:145` `selector: 'footer .text-body-secondary'`
- `setup.ts:154` `selector: '#main p:not(.text-body-secondary):not(.accent)'`
- `setup.ts:159` `selector: '#main .text-body-secondary'`
- `setup.ts:161` `selector: '#main h1, #main h2'`
- `setup.ts:163` `selector: '#main article.card h3 a'`
- `setup.ts:166` `selector: '#main article.card dt'`
- `setup.ts:171` `selector: '#main article.card dd'`
- `setup.ts:173` `selector: '#main .confirm'`
- `setup.ts:180–193` listing roles repeat `#main` / `.card` / `.text-body-secondary`
- `setup.ts:201–218` refused roles `#main .form-label`, `#main .invalid-feedback`, `#main [role="alert"]…`
- `setup.ts:228` `selector: '#main [role="status"].bg-body-tertiary p:not(.text-body-secondary)'`
- `setup.ts:233` `selector: '#main [role="status"].bg-body-tertiary .text-body-secondary'`
- `setup.ts:391` `return [...root.querySelectorAll(role.selector)].filter(isPainted)`
- `setup.ts:417` `return node.closest('[data-bs-theme]') !== document.documentElement`
- `setup.ts:712` `() => document.activeElement?.id === 'main' && readMenuSettled(false)`
- `setup.ts:724` `const menu = document.getElementById('site-menu')`
- `setup.ts:914` `const elements = root.querySelectorAll('*').length`
- `setup.ts:948` `permitted.id = 'roughnotes-stylesheet'`
- `integration.test.ts:224` `expect(\`${document.activeElement?.id ?? 'nothing'} | ${reading}\`).toBe(\`${id} | ${reading}\`)`
- `integration.test.ts:231` `() => document.activeElement?.id === 'main' && window.scrollY === 0`
- `integration.test.ts:356` `const walked = host.querySelectorAll('*').length`
- `integration.test.ts:512` `expect(document.activeElement?.id).toBe('main')`
- `theme.test.ts:158` `const surface = requireValue(host.querySelector(\`.${region}\`))` (`hero` / `panel`)
- `theme.test.ts:159` `const control = requireValue(surface.querySelector('.btn-warning'))`
- `theme.test.ts:212` `for (const control of host.querySelectorAll(FOCUSABLE_SELECTOR))`
- `theme.test.ts:227` `const drawer = requireValue(host.querySelector('#site-menu'))`
- `theme.test.ts:228` `[...drawer.querySelectorAll(FOCUSABLE_SELECTOR)]`
- `theme.test.ts:244` `const link = requireValue(host.querySelector('.masthead .nav-link'))`
- `theme.test.ts:256` `expect(host.querySelector('.masthead .nav-link')).toBe(link)`

elementFromPoint:
- `integration.test.ts:218` `const centre = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)`

application state / store:
- `setup.ts:995–996` `'aria-pressed': theme.dark.value` / `'aria-label': theme.dark.value ? COPY.light : COPY.dark`
- `integration.test.ts:131` `app.theme(variantDark(name))`
- `integration.test.ts:976` `app.open(MAGAZINE_PATH)`
- `integration.test.ts:987` `app.open(CONTACT_PATH)`
- `integration.test.ts:1008` `empty.app.open(MAGAZINE_PATH)`
- `integration.test.ts:1015` `unindexed.app.open(skuHref(UNINDEXED_SKU.id))`
- `integration.test.ts:1045` `expect(first.storage.getItem(THEME_STORAGE)).toBe(THEME_DARK)`
- `integration.test.ts:1053` `expect(second.app.dark.value).toBe(true)`
- `integration.test.ts:1084` `expect(app.dark.value).toBe(true)`
- `integration.test.ts:1085` `expect(storage.getItem(THEME_STORAGE)).toBe(THEME_LIGHT)`
- `integration.test.ts:1091` `expect(second.app.dark.value).toBe(false)`
- `theme.test.ts:154` `app.theme(dark)`
- `theme.test.ts:205` `app.theme(dark)`
- `theme.test.ts:209` `app.open(path)`
- `theme.test.ts:247` `app.theme(dark)`

element.focus():
- `theme.test.ts:57` `button.focus()`
- `theme.test.ts:60` `button.blur()`
- `theme.test.ts:123` `control.focus()`
- `theme.test.ts:163` `if (focused) control.focus()`
- `theme.test.ts:164` `else control.blur()`
- `theme.test.ts:214` `control.focus()`
- `theme.test.ts:232` `control.focus()`

constructed event: none in the named files (`createPointerEvent` / `new *Event` / `dispatchEvent` unused). `integration.test.ts:1067–1068` listens for `error` with `createRecorder`, it does not construct one.

fixed delay: none (`waitForDelay` / `setTimeout` unused). Polls use `waitForCondition` budgets (Q9).

Bootstrap implementation classes / flags:
- `setup.ts:54` remark: trigger sits inside a `d-lg-none` wrapper
- `setup.ts:66` `export const COMPACT_WIDTH = 992`
- `setup.ts:74` `return window.innerWidth < COMPACT_WIDTH`
- `setup.ts:125` `.card[data-bs-theme='dark']`
- `setup.ts:209` `'#main .form-label'`
- `setup.ts:213` `'#main .invalid-feedback'`
- `setup.ts:663` `document.documentElement.setAttribute('data-bs-theme', 'light')`
- `setup.ts:727–729` `menu.classList.contains('show') === opened && !menu.classList.contains('showing') && !menu.classList.contains('hiding')`
- `setup.ts:737` remark: `d-lg-none` wrapper still renders
- `setup.ts:792` `document.documentElement.getAttribute('data-bs-theme') === THEME_DARK`
- `theme.test.ts:34` `document.documentElement.dataset.bsTheme = requireValue(modes[0])`
- `theme.test.ts:38` `scope.dataset.bsTheme = nested`
- `theme.test.ts:44` ``button.className = `btn btn-${variant}` ``
- `theme.test.ts:52` `button.classList.add('active')`
- `theme.test.ts:84–89` `dataset.bsTheme` + `card bg-body`
- `theme.test.ts:111–117` `btn btn-primary`, `btn-close`, `form-control`, `form-select`, `nav-link`, `navbar-toggler`
- `theme.test.ts:141` `control.className = 'text-primary bg-body'`
- `theme.test.ts:159` `.btn-warning`
- `theme.test.ts:257` `expect(document.documentElement.dataset.bsTheme).toBe(dark ? 'dark' : 'light')`
- `theme.test.ts:268–271` `root.setAttribute('data-bs-theme', …)`

**3. Refusal assertions**

| site | voice asserted | multi-voice? |
|---|---|---|
| setup.ts:745–746 `readRefusal(COPY.menu)` | exact `MENU_UNREACHABLE` (`Interactive target "${COPY.menu}" is not visible and focus-reachable`) | no (anything else, including `undefined`, throws) |
| setup.ts:769–770 `readRefusal(COPY.close)` | exact `CLOSE_UNREACHABLE` | no |
| integration.test.ts:477 `readRefusal(variantDark(VARIANT) ? COPY.light : COPY.dark)` | `toBeUndefined()` (success, no voice) | no |
| integration.test.ts:517 `readRefusal('RoughNotes-Pro')` | `Interactive target "RoughNotes-Pro" is ambiguous across 2 elements` | no |
| integration.test.ts:550 `readRefusal(COPY.all)` | `No interactive element has the accessible name "${COPY.all}"` | no |
| integration.test.ts:592 `readRefusal(COPY.clear)` | `No interactive element has the accessible name "${COPY.clear}"` | no |
| integration.test.ts:633 `readRefusal(COPY.subscribe)` | `toBeUndefined()` | no |
| integration.test.ts:679 `readRefusal(COPY.subscribe)` | `toBeUndefined()` | no |
| integration.test.ts:762 `readRefusal(COPY.every)` | `No interactive element has the accessible name "${COPY.every}"` | no |
| integration.test.ts:806 `readRefusal(COPY.send)` | `toBeUndefined()` | no |
| integration.test.ts:851 `readRefusal(COPY.pay)` | `toBeUndefined()` | no |
| integration.test.ts:868 `readRefusal('Sign In')` | `SIGN_IN_ABSENT` = `No interactive element has the accessible name "Sign In"` | no |
| integration.test.ts:875 `readRefusal('PF&M database')` | `No interactive element has the accessible name "PF&M database"` | no |

No site uses `!== undefined`, a regex, or a substring as the accepted voice. `toBeUndefined()` is the no-refusal success path, not a family of voices.

**4. Families declared**

Declared at `integration.test.ts:93`: `const FAMILIES: readonly string[] = ['journey', 'refusal', 'matrix', 'transport', 'capture']`.

Proven via `PROVEN.add`: `journey` at 471/504/540/584/612/647/666/692/714/753/783/819; `refusal` at 864; `matrix` at 887; `transport` at 1034/1062; `capture` at 1103. The write-frames test at 1109 does not add `capture`.

Tie declaration to proof, quoted, `integration.test.ts:1122–1124`:

`it('proves every declared family and claims no family it did not prove', () => { expect([...PROVEN].sort()).toEqual([...FAMILIES].sort()) })`

**5. Variant and capture axis**

How the run reads its variant: `vite.config.ts:53–58` declares `VARIANTS` (`light-1280`, `dark-1280`, `light-390`, `dark-390`). `vite.config.ts:376` `provide: { variant: variant.name, variants: VARIANTS }` on each `journey(variant)` project (`vite.config.ts:387`). `integration.test.ts:159–165` reads `inject('variants')` / `inject('variant')` and `import.meta.env.VITE_CAPTURE === 'true'`. `tests/setupBrowser.ts:1–5` only loads Bootstrap + app SCSS; it does not fan variants. Comments at `vite.config.ts:351–353` still name `VITE_VARIANT` / `VITE_VARIANTS`; the live channel is `provide`.

Registry states: `STATES` at `integration.test.ts:97–124` holds `home`, `product-listing`, `product-detail`, `publications`, `magazine-listing`, `magazine-empty`, `magazine-detail`, `marketplace-listing`, `marketplace-miss`, `subscribe`, `subscribe-refused`, `subscribe-accepted`, `about`, `newsletter`, `newsletter-accepted`, `media`, `shop-listing`, `shop-filtered`, `shop-miss`, `shop-detail`, `contact`, `contact-refused`, `contact-accepted`, `payment`, `payment-refused`, `payment-accepted` (26). Passed into `createPortfolio` at `integration.test.ts:183–189`. Variant registry: the four `VARIANTS` above.

`place` vs proof (place is after the screen needle/asserts, sometimes after an extra Tab):
- `home` place 483 after 475–480, before Tab
- `subscribe` 495 after 491–494
- `product-listing` 514 after 509–513
- `product-detail` 531 after 524–530
- `publications` 546 after 545
- `magazine-listing` 555 after 549–554
- `magazine-empty` 561 after 558–560
- `magazine-detail` 574 after 568–573
- `marketplace-listing` 595 after 590–594
- `marketplace-miss` 600 after 599
- `subscribe-refused` 627 after 621–626
- `subscribe-accepted` 638 after 636–637
- `about` 656 after 652–655
- `newsletter` 675 after 673–674
- `newsletter-accepted` 683 after 682
- `media` 704 after 697–703, before Tab 705
- `shop-listing` 725 after 719–724
- `shop-filtered` 732 after 728–731
- `shop-detail` 744 after 740–743
- `shop-miss` 770 after 766–769
- `contact` 791 after 788–790, before Tab 792
- `contact-refused` 801 after 796–800
- `contact-accepted` 810 after 809
- `payment` 834 after 828–833, before Tab 835
- `payment-refused` 847 after 839–846
- `payment-accepted` 855 after 854

No registered state is placed outside the journey that reached it. `place` is only called from those journey tests. The matrix test at 885–1027 reaches overlapping screens via `app.open` and does not call `place`. `integration.test.ts:1126–1128` then asserts `PLACED` equals `STATES`.

**6. Transport family**

| impl | configured to fail | journey that drives it | real Storage? |
|---|---|---|---|
| `createMemoryStorage()` (`@app/browser`, default in `openSurface` setup.ts:674) | nothing | `hands the persisted theme to a second session over the same storage` integration.test.ts:1031–1057 | yes |
| `QuotaStorage` setup.ts:448 | `setItem` after `writes` with `QuotaExceededError` / `No room is left for ${key}` | `paints the mode the store refuses to keep…` with `{ writes: 1 }` integration.test.ts:1066 | yes: wraps `createMemoryStorage`, implements `Storage` |
| `PermissionStorage` setup.ts:535 | withheld reads/writes raise `SecurityError` / `Access is denied for ${detail}`; `permit()` grants later | none of the named journey files | yes: wraps `createMemoryStorage`, implements `Storage` (`permit` is extra) |

No other Storage implementations are declared in the named files.

**7. Keyboard**

`userEvent.keyboard` (all `'{Tab}'`):
- theme.test.ts:56 nested btn-variant matrix, then `button.focus()`
- theme.test.ts:97 nested card/accent/ring island
- theme.test.ts:156 home after `openSurface`, before `.hero`/`.panel` `.btn-warning`
- theme.test.ts:211 after `app.open` on `HOME_PATH`, `CONTACT_PATH`, `PAYMENT_PATH`, then every `FOCUSABLE_SELECTOR`
- theme.test.ts:226 after `openSite()`, then `#site-menu` focusables

`traverseAccessible` targets:
- integration.test.ts:309 `control.name` inside `readControl` (home footer `COPY.catalog`, theme control, subscribe `COPY.subscribe`, magazine `All articles` / `Program business`, contact summary `${COPY.name} is required.`)
- 486 `COPY.explore` (home)
- 488 `COPY.shop` (home, after `openSite`)
- 494 `COPY.subscribe` (subscribe)
- 510 `COPY.skip` (product listing)
- 520 `'PF&M Online'` (product listing)
- 530 `COPY.ask` (product detail)
- 547 `'Rough Notes magazine'` (publications)
- 556 `'Program business'` (magazine listing)
- 573 `COPY.magazine` (magazine detail)
- 596 `COPY.query` (marketplace)
- 657 `COPY.explore` (about)
- 676 `COPY.subscribe` (newsletter)
- 705 `'2027 Rough Notes magazine rate card'` (media)
- 726 `COPY.live` (shop listing)
- 743 `COPY.live` (shop detail)
- 792 `COPY.send` (contact)
- 835 `COPY.customer` (payment)
- 906 `'Focus ring control'` (matrix fixture)

Forward-Tab walks land on: home content + compact/inline shop nav; product listing (skip + a desk); product detail; publications hub; magazine listing; magazine detail; marketplace query; subscribe; about; newsletter; media; shop listing/detail; contact send; payment customer; matrix named controls. Theme adds a full focusable walk of home, contact, and payment, plus the compact drawer at 390px. Integration never calls `userEvent.keyboard`.

**8. Statechart**

No `StateTransition`, `StateScenario`, `executeScenario`, `executeScenarios`, or `STATECHART_*` in the named files. The suite says nothing about why.

**9. Text-convergence**

| helper | file:line | predicate | budget | false→true after the action? |
|---|---|---|---|---|
| openSurface waitForCondition | setup.ts:688–691 | `readPage().includes(HOME_HEADING)` | SETTLE_BUDGET 4000 / SETTLE_INTERVAL 25 | yes, after mount |
| followSite waitForCondition | setup.ts:710–714 | `document.activeElement?.id === 'main' && readMenuSettled(false)` | 4000 / 25 | yes, after dest click (menu `hiding`→closed) |
| readMenuSettled | setup.ts:723–731 | `#site-menu` `show===opened` and not `showing`/`hiding` | used under 4000 / 25 | yes, during offcanvas animation |
| openSite waitForCondition | setup.ts:754–757 | `readMenuSettled(true)` | 4000 / 25 | yes, after menu click |
| closeSite waitForCondition | setup.ts:778–781 | `readMenuSettled(false)` | 4000 / 25 | yes, after close click |
| readSettled | setup.ts:373–381 | no `getAnimations()` in `running`, then `readSurface` | PAINT_BUDGET 4000 | yes, after a color/fill transition (proved integration.test.ts:944–948) |
| waitForText | integration.test.ts:208–212 | `readPage().includes(text)` | 4000 / 25 | yes after nav/click **unless the needle already sits on the prior screen** (comments at 522–523, 738–739, 826–827) |
| waitForOrigin | integration.test.ts:228–236 | `#main` focused and `scrollY === 0` | 4000 / 25 | yes after hash navigation |
| transport dark | integration.test.ts:1039–1043 | `data-bs-theme === THEME_DARK` | 4000 / 25 | yes after toggle |
| transport restore | integration.test.ts:1048–1052 | same | 4000 / 25 | yes after remount |
| transport quota | integration.test.ts:1075–1078 | same | 4000 / 25 | yes after toggle that cannot persist |
| theme masthead | theme.test.ts:249–254 | computed masthead color equals the mode’s rgba | waitForCondition default 1000 / 10 | yes after `app.theme` (transitions) |

Distillate:
Generic instruments the package could publish: QuotaStorage and PermissionStorage; readRefusal as captureError around resolveRendered; waitForText as waitForCondition+readPage; isPainted; isRunning+readSettled (animation.finished within a paint budget); parameterized gradient-stop contrast and the composite-stack fixture; authored-class census (readClasses vs readCascade, including SVG className).
Skill must forbid more clearly: querySelector by id/class (`#main`, `.hero`, `#site-menu`, Bootstrap utilities); elementFromPoint (readHit already exists; followField:218 reimplements it); `app.theme` / `app.open` / `app.dark.value`; `element.focus()` instead of traverseAccessible; Bootstrap `show`/`showing`/`hiding` and `d-lg-none`/992px probes.
Defects that would most change the skill: (1) clickDisclosure only covers native `<summary>`, so consumers poll offcanvas classes — the skill must either publish an ARIA-disclosure settle or forbid class-list settling by name. (2) The matrix and theme suites are allowed to leave the accessible journey (`app.open`, CSS selectors, programmatic focus), so “drive through the interface” is not binding on style proofs.

Unknowns:
Q8 why statechart is unused — named files never mention it.
Q5 comments at vite.config.ts:351–353 name `VITE_VARIANT`/`VITE_VARIANTS` while the code uses `provide`; whether an unused env path still exists was not visible in the named slices.
Q6 PermissionStorage’s other drivers (if any) sit outside the named files.
Q1 THEME_PROBE / DETAIL_SLUGS / mountView consumers outside the named journey files were not required; unused-in-suite is all those files show.
Default waitForCondition budget for theme.test.ts:249 was taken from `@orkestrel/test` types (1000/10), not from a named Rough Notes file.
