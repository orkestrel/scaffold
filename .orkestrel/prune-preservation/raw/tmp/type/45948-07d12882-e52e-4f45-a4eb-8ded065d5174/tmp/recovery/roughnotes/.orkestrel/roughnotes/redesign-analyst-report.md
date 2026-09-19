## Thesis

The redesign makes all fifteen Rough Notes routes a consistent, accessible path from discovering an offering to judging it and taking its real next action, while preserving the identity, fixture boundaries, and Bootstrap foundation.

## Verdict on each finding F1 to F11 and C1 to C6

Capture filenames below refer to `tmp/capture/states/`; source citations are repository-relative.

- **F1 — Real, with a narrower diagnosis.** Composition is inconsistent, but I disagree that every other page is an undressed slab: About has substantial editorial structure, and Newsletter already has a composed invitation (`about--light-1280.png`, `newsletter--light-390.png`).
- **F2 — Not real as stated.** The captured SKU detail has a visible **Live catalog** action, and both frames show ordinary separation before the footer; the product detail’s missing local next action is the actual defect (`shop--light-1280.png`, `product-detail--light-1280.png`).
- **F3 — Real.** Timeline prose spans an unnecessarily broad region, while media-file labels occupy little of their full-width rows; these need bounded reading and action regions (`about--light-1280.png`, `media--light-1280.png`).
- **F4 — Real.** Unrelated content is stretched to equal heights; Contact’s office panel and About’s credo should size to their own contents (`contact-refused--light-1280.png`, `about--light-1280.png`).
- **F5 — Real visually.** Underlined card titles add repeated decoration, but heading-with-link semantics are correct and must survive the treatment change (`home--light-1280.png`; `app/browser/components/ProductsView.vue:32`).
- **F6 — Real overlap, not the alleged clipping.** I disagree with the edge-clipping diagnosis: the card and chips remain inside the viewport, but the upper chip obscures part of the magazine label (`home--light-1280.png`).
- **F7 — Real wrap defect, incorrect alignment description.** The final title becomes an isolated centered row; the lead-in is also centered, not left-aligned (`home--light-1280.png`).
- **F8 — Real for form actions.** Gold submits on paper conflict with the declared action roles; About already distinguishes its filled primary from outlined alternatives, so that part is lower priority (`contact-refused--light-1280.png`, `payment-refused--light-1280.png`, `about--light-1280.png`; `guides/README.md:117`).
- **F9 — Real, minor.** “MAGAZINE” supplies no information above “Magazine”; remove it during page framing, without a separate redesign unit (`magazine-empty--light-1280.png`).
- **F10 — Real.** The journal records only two text readings and one ring reading; the test does iterate all declared variants, but still samples only those controls (`tmp/journeys/light-1280.txt`; `tests/app/browser/integration.test.ts:552`, `:578`, `:594`).
- **F11 — Real gate omission; reported failures remain supplied evidence.** Full journeys default to light-1280, while only the matrix loops variants; the dark failure count was not independently rerun during this read-only assignment (`package.json:24`; `tests/app/browser/integration.test.ts:85`, `:231`, `:552`; `tmp/journeys/dark-1280.txt`).
- **C1 — Real duplication, modest priority.** Consolidate repeated navigation rendering where it owns meaningful structure; do not introduce a CSS alias merely to abbreviate three shipped utilities (`app/browser/App.vue:90`, `:97`, `:270`).
- **C2 — Not worth fixing.** The explicit view chain is readable dispatch; branch count establishes neither a correctness defect nor a performance problem (`app/browser/App.vue:232`).
- **C3 — Real.** Header navigation uses declared data while footer destinations repeat literals; share typed destinations while retaining the footer’s distinct grouping (`app/browser/constants.ts:110`; `app/browser/App.vue:159`, `:265`).
- **C4 — Real, small.** A shared brand composition can prevent lockup drift without taking ownership of its surrounding link or footer semantics (`app/browser/App.vue:128`, `:253`).
- **C5 — Real deprecation, overstated local remedy.** The app barrel uses imports, but Bootstrap also imports internally; an in-memory probe showed that mechanical `@use` replacement loses navy configuration, so neither a blind replacement nor a warning-free promise is acceptable (`app/browser/styles/index.scss:1`; `node_modules/bootstrap/scss/bootstrap.scss:7`).
- **C6 — Real.** A scoped read-only formatter check reproduces the reported failure on the committed test; correct it before relying on the gate baseline (`tests/app/browser/styles/mixins.test.ts:9`).

## The system

**The route and product contracts stay intact.** Keep all fifteen hash routes. No evidence establishes that merging Publications with Products, removing Newsletter, or adding account and checkout screens would improve the declared tasks. Publications remains the editorial gateway; Products compares knowledge offerings; Shop handles catalog records. The registered paths and guide explicitly establish these distinctions (`app/browser/routes.ts:24`; `guides/README.md:86`, `:106`, `:166`).

The following are proposed implementation decisions, not claims that new layouts have been rendered.

| Role | Reused unchanged | Proposed application and Bootstrap source |
|---|---|---|
| Identity | Navy `#0a2540`, gold `#c8952b`, Georgia-first headings, system-sans body | Continue configuring Bootstrap `$primary`, `$warning`, `$headings-font-family`, and `$font-family-sans-serif`; no new palette or font request (`app/browser/styles/_tokens.scss:1`, `:3`, `:37`, `:50`). |
| Adaptive surfaces | Existing light and dark body, secondary, and tertiary families | Page canvas uses `bg-body text-body`; quiet grouping uses body-secondary or body-tertiary backgrounds with an explicit readable foreground. Bootstrap color-mode variables own these roles (`app/browser/styles/_tokens.scss:4`). |
| Fixed surfaces | Navy editorial islands and intentional paper forms | Every nested mode boundary declares its foreground as well as background. A light card inside dark must regain the complete light button treatment; the current broad dark-descendant selector requires correction before paper actions switch to primary (`app/browser/styles/_theme.scss:10`; `guides/README.md:125`). |
| Action hierarchy | Navy/paper primary pair; gold thesis action | Paper form submits and search use `btn-primary`; dark primary controls use the inverse pair. Gold remains for thesis actions on actual navy surfaces. Secondary actions use measured outlines or links; status remains Bootstrap semantic variants. |
| Text | Existing body and secondary colors | Use `text-body`, `text-body-secondary`, and component-owned foregrounds. Do not use gold, opacity, or tertiary text as a shortcut for readable metadata. Inline prose links remain underlined. |
| Type | Existing serif/sans pairing and body line-height | Inner-page H1 uses Bootstrap’s 2.5rem role with RFS; H2 2rem, H3 1.5rem, card titles 1.25rem, body 1rem. Metadata is .875rem; useful eyebrows .75rem. Generate missing size utilities through Bootstrap’s utilities API. Keep body and lead copy at readable weight; retain the existing bounded home display scale (`app/browser/styles/_tokens.scss:52`; `app/browser/styles/_signature.scss:102`). |
| Spacing | Existing spacer map | Use .5rem within compact groups, 1rem between fields, 1.5rem panel padding, 3rem between sections, and 4.5rem where wide compositions justify it. These are existing map values, not a second spacing system (`app/browser/styles/_tokens.scss:64`). |
| Width | Existing responsive container configuration and 40rem measure | Use `.container`, grid columns, and the existing `.measure` for prose. Add a utilities-API form maximum of 36rem. A content region may be narrower than its container; neither needs filler height (`app/browser/styles/_tokens.scss:75`; `app/browser/styles/_signature.scss:137`). |
| Radius | Existing .5–1.5rem family | Keep the existing button, card, and larger editorial radii. Use ordinary rounded filter buttons rather than pills where they behave as commands. No additional radius scale (`app/browser/styles/_tokens.scss:32`, `:60`). |
| Elevation | Existing shadow tokens | Map existing values into Bootstrap shadow roles. Reading panels default to no shadow; the document preview may retain stronger elevation. In dark mode, surface steps and borders must establish separation without depending on shadows (`app/browser/styles/_tokens.scss:96`). |

**The signature is restrained application of the existing identity.** Retain the navy editorial field, Georgia display, gold hairline, and magazine preview. Remove the chips that obscure its content and put any useful information into normal flow. Give the trust band a separate lead-in followed by a regular responsive grid. These address the observed overlap and isolated final row (`home--light-1280.png`).

**Bootstrap owns ordinary paint and behavior.** Use components first, then shipped utilities, then configured variables or utilities-API extensions. Custom CSS is reserved for the established brand signature and verified gaps. No SFC style blocks, inline layout styles, invented responsive classes, or vendor edits. Preserve tokens in `_tokens.scss`, mode treatment in `_theme.scss`, and one stylesheet entry.

The Sass migration must preserve generated values and utilities, including the configured primary color. Bootstrap’s documented Sass setup still has import-order dependencies, while Sass itself deprecates imports; those are separate migration concerns. [Bootstrap Sass documentation](https://getbootstrap.com/docs/5.3/customize/sass/), [Sass import deprecation](https://sass-lang.com/documentation/breaking-changes/import/).

**Acceptance thresholds are explicit.** Informative text—including headings—must reach 4.5:1. Meaningful control boundaries, state marks, and focus indicators must reach 3:1 against their actual adjacent surfaces. Test rest, hover, focus, selected, and invalid states in both modes and across nested light/dark boundaries. Measure composited backgrounds where transparency or gradients are involved; token values alone are insufficient.

Controls must satisfy the 24 CSS-pixel target requirement or its applicable spacing exception; principal mobile actions should provide 44 CSS pixels. Preserve visible keyboard focus and prevent the sticky masthead from obscuring focused content.

All routes must reflow at 320 and 390 CSS pixels. Test each used breakpoint immediately below, at, and above it. Also test 200% text resizing and actual browser zoom to 400%; resizing a viewport alone is not proof of zoom behavior. The 320 CSS-pixel reflow requirement applies to ordinary content without two-dimensional scrolling. [W3C reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

**State support requires a browser contract, not decorative placeholders.** Catalog methods are synchronous and return complete records or `undefined`; silently changing them into promises would change the core contract (`app/core/types.ts:247`; `guides/README.md:40`).

Add a typed browser presentation-state input through application options. It supplies honest resource snapshots for ideal, empty, loading, partial, and error branches; default fixture execution is ready immediately. Those branches ship in the normal renderers and are exercised through inert composition inputs, without fake timers or simulated network behavior.

Partial means usable records or regions plus an identified unavailable region. It does not mean weakening required domain fields with `Partial<Product>`. Error recovery must perform a real operation: clear a filter, revisit a collection, navigate to an available route, or reload an actual provider. Do not offer a pretend retry that merely flips an error into success.

Forms require an additional correctness change: field revalidation currently calls committing application methods, so correcting input can submit the request (`app/browser/components/SubscribeForm.vue:19`; `app/browser/controllers/ApplicationController.ts:113`). Separate parsing from committing. Validate on blur, then on input after a field becomes invalid; submit stays enabled for invalid drafts. Failed submit focuses a linked summary, preserves input, and leaves the hash unchanged.

Any browser contract expansion happens in `app/browser/types.ts` first. Replace affected multiword entity members such as `inquiryIssues` and `paymentIssues` with grouped request surfaces whose members are single words; migrate their consumers and guide together (`app/browser/types.ts:79`). Expose state read-only and preserve controller ownership of mutation. No `any`, assertions, `$emit`, or browser imports into core.

## Page primitives

Four page shapes are sufficient. They compose domain-specific content rather than becoming a configurable component library.

| Name | Owns | Refuses |
|---|---|---|
| **Frame** | Container, optional breadcrumb, one H1, bounded introduction, section rhythm, and continuation placement | Mandatory heroes, duplicate eyebrows, artificial minimum heights, or invented breadcrumb levels |
| **Split** | A primary region and independent supporting region; stacked DOM order below `lg`, top-aligned columns from 992px | Equal-height unrelated panels, CSS order that contradicts reading order, or sticky support by default |
| **Record** | Repeated collection-item anatomy: title, supporting facts, and a clear existing destination; comparable cards or compact rows | Domain lookups, fabricated fields, nested interactive stretched links, or a universal collection of boolean appearance flags |
| **Notice** | Contextual empty, loading, partial, and error presentation; appropriate announcements and a real recovery action | Fetching, route ownership, fake progress, automatic success, or replacing usable content during partial failure |

`Measure` is a width role, not another wrapper component. `Brand` and grouped navigation rendering are small shell compositions, not page primitives. Equal-height cards remain valid for comparable items in a grid; F4 does not justify banning them everywhere.

## Screen by screen

Every route keeps the common shell: skip link, utility navigation, masthead, main landmark, and footer. The compact header retains **Get started**, theme control, and menu. At 320 and 390px, every proposed composition starts with one column and wrapping content; action groups stack when needed. Offcanvas expansion remains at 992px, with Escape, focus restoration, route-change closure, and open–resize–close cleanup verified. These preserve the shell’s declared behavior (`guides/README.md:96`).

“Loading” below describes a supplied loading state, not an artificial delay around synchronous fixtures. Blank form input is an empty draft, not an error. Accepted form outcomes remain fixture outcomes.

**1. `/` — Discover and choose.**  
Reading order is thesis, **Get started**, supporting magazine action, evidence, magazine preview, trust grid, product offerings, marketplace preview, issue articles, and subscription invitation. At 320/390px this is one column without floating chips. The hero splits at 992px; collection grids become two columns at 768px and three at 1200px. The primary action remains **Get started → subscribe**. Existing sections provide the starting material (`app/browser/components/HomeView.vue:25`, `:132`; `home--light-1280.png`).

States: **ideal** shows the supplied collections; **empty** preserves the thesis and real destination links with an honest empty message in each absent collection; **loading** marks only affected collection regions busy; **partial** retains available regions and identifies omissions; **error** offers their collection destinations without inventing featured records. The embedded form uses the subscription states below.

**2. `/about` — Establish trust.**  
Introduction precedes mission and credo, then bounded chronology, people, and **Explore products**. Mission and credo size independently. At 320/390px everything stacks; chronology gains a date column at 768px, and the mission/support split begins at 992px. No timeline paragraph inherits the full page width. This corrects the measured stretch and measure problems (`about--light-1280.png`).

States: **ideal** includes all supplied eras and people; **empty** leaves the company introduction and product continuation intact; **loading** belongs to the affected record section; **partial** retains available chronology or people; **error** names that unavailable section and keeps Contact and Products reachable. Static company text never becomes a skeleton merely because a collection is absent.

**3. `/publications` — Choose an editorial destination.**  
Introduction leads to Magazine, Marketplace, and Newsletter as distinct choices; subscription and advertising resources follow as secondary routes. At 320/390px records stack in that order; at 768px the choices form two columns, reaching three at 1200px. **Read the magazine** leads. Preserve the existing destination distinction (`app/browser/components/PublicationsView.vue:14`).

States: the hub’s route links remain available in **ideal**, **empty**, **loading**, **partial**, and **error** catalog scenarios because navigation is static. Any affected data-backed addition gets a local notice; no whole-page unavailable state is fabricated for a static hub.

**4. `/newsletter` — Understand the invitation and subscribe.**  
A short promise precedes the subscription form, followed by supporting benefits. At 320/390px the form appears before extended promotional copy; at 992px the introduction/support and bounded form become independent columns. **Subscribe free** is primary. Reuse the form rather than inventing newsletter preferences or a separate entitlement (`app/browser/components/NewsletterView.vue:58`; `guides/README.md:155`).

States: **ideal** is a ready valid draft or an accepted fixture confirmation; **empty** is the initial labeled form; **loading** shows truthful pending status only when supplied; **partial** retains a partly completed draft; **error** preserves values and presents either linked validation errors or a distinct operation failure. The confirmation states the device-local boundary.

**5. `/products` — Compare offerings.**  
Introduction is followed by offering records showing name, purpose, audience, and a meaningful detail link; the page ends with **Get started**. At 320/390px records stack; two columns begin at 768px and three at 1200px. Do not invent prices, plans, or feature-comparison claims outside the product contract (`app/core/types.ts:81`; `app/browser/components/ProductsView.vue:20`).

States: **ideal** shows all offerings; **empty** explains that no fixture offerings are available while retaining Contact and Subscribe; **loading** marks the collection busy; **partial** keeps complete available offerings and identifies the omission; **error** preserves the introduction and a real Contact route. Each record’s action opens its existing detail route.

**6. `/products/:slug` — Judge an offering.**  
Breadcrumb, title, summary, audience, and inclusions precede the commitment area. At 320/390px the inclusions remain in reading order before the action; at 992px they can occupy the supporting side of a 7/5 split. **Get started** opens subscription with copy making that destination explicit; **Ask about this product** links to Contact without pretending to transfer context automatically. Finish with All products. The current detail already supplies the relevant facts but lacks the local action (`app/browser/components/ProductView.vue:42`; `product-detail--light-1280.png`).

States: **ideal** shows a complete product; **empty** is a missing-product message with All products; **loading** retains breadcrumb and loading status without stale facts; **partial** keeps the complete main record when only supporting content is unavailable; **error** distinguishes failure from an unknown slug and provides the collection route.

**7. `/magazine` — Find an article.**  
Title and issue context precede wrapping category controls, results, and a modest subscription invitation. Remove the repeated eyebrow. At 320/390px controls wrap without horizontal scrolling and articles stack; cards expand at 768px and 1200px. The principal action is each article’s real reading link. Preserve selected-state semantics (`app/browser/components/MagazineView.vue:30`; `magazine-empty--light-1280.png`, `magazine-empty--dark-390.png`).

States: **ideal** shows matching articles; **empty** distinguishes an empty collection from a filter with no results, retaining controls and Show all articles; **loading** retains the chosen category; **partial** shows available matches and a completeness notice; **error** retains controls but does not misreport failure as zero results.

**8. `/magazine/:slug` — Read.**  
Breadcrumb and category lead into title, dek, byline/date, bounded article body, and a return-to-issue continuation. At 320/390px everything follows one reading column. From 992px, available issue navigation may sit beside the bounded article; the body itself does not expand to fill the viewport. Reading remains primary, with **Back to magazine** as the continuation. Reuse the existing measure (`app/browser/components/ArticleView.vue:42`).

States: **ideal** shows the complete article; **empty** reports a missing article and links to Magazine; **loading** announces loading without showing the preceding slug’s article; **partial** retains the complete article if supporting issue navigation is missing; **error** identifies the unavailable article and offers Magazine. Do not fabricate an excerpt by treating required body content as optional.

**9. `/marketplace` — Search the directory sample.**  
Introduction leads directly to a named search form, query/result context, and market records with industry, notes, and coverages. At 320/390px the input and **Search markets** action stack; from 768px they share a row. Wider results remain readable rows rather than a speculative comparison table. Keep the entered query visible, as the narrow miss frame already does (`marketplace-miss--light-390.png`).

States: **ideal** shows matches; **empty** distinguishes an empty sample from a query miss and offers Clear search; **loading** retains the submitted query; **partial** labels results incomplete; **error** preserves the query and explains unavailability without claiming no matches. No market-detail or purchase action is invented: the record contract supplies no such destination (`app/core/types.ts:112`).

**10. `/subscribe` — Complete one clear request.**  
A concise promise and fixture explanation precede the bounded form; supporting benefits follow. At 320/390px the action remains close to the fields. At 992px a top-aligned split separates supporting copy from the form. **Subscribe free** is primary; accepted output offers Read the magazine. Preserve the shared parser and form (`guides/README.md:56`, `:149`).

States: **ideal** supports ready submission and accepted fixture confirmation; **empty** is a blank enabled form; **loading** is an explicitly pending request; **partial** preserves a draft; **error** differentiates validation refusal from operation failure, retains input, and focuses the appropriate summary. Existing accepted output needs explicit fixture context, not stronger delivery promises (`subscribe-accepted--dark-390.png`).

**11. `/media` — Obtain the right advertising material.**  
Introduction precedes channel-grouped file rows with meaningful file names, followed by deadlines and representative contacts. At 320/390px groups and support stack. At 992px bounded file rows occupy the main region and contacts the support region. Each actual PDF link is its own primary action; Contact remains secondary. This replaces the unnecessarily broad rows observed in the frame (`media--light-1280.png`).

States: **ideal** shows files and representatives; **empty** explains missing files while keeping contact information; **loading** applies to the relevant inventory; **partial** retains available channels or representatives and identifies omissions; **error** reports inventory failure. Do not pretend the application can detect whether an externally opened PDF downloaded successfully (`app/browser/components/MediaView.vue:26`; `guides/README.md:160`).

**12. `/contact` — Send an inquiry.**  
Introduction and form come before office information in DOM order. At 320/390px that keeps the task ahead of supporting addresses; from 992px the form sits left and the independently sized office panel right. **Send inquiry** is primary. Eliminate the unrelated equal-height treatment visible in the refused form (`contact-refused--light-1280.png`).

States: **ideal** supports a valid request and device-local confirmation; **empty** presents the blank form; **loading** marks a genuinely pending supplied state; **partial** preserves completed fields; **error** keeps input and provides a linked summary plus field errors or a separate operation failure. Preserve required name, company, email, and phone; title and message remain optional (`guides/README.md:65`).

**13. `/shop` — Compare catalog items.**  
Introduction and fixture boundary precede department controls and SKU records; live commerce, order-form PDF, and invoice review remain clearly distinguished. At 320/390px filters wrap and items stack; grids expand at 768px and 1200px. Record titles open details; **Live catalog** is the page’s commerce action. Preserve integer-cent formatting and catalog-code behavior (`app/browser/components/ShopView.vue:26`; `guides/README.md:49`).

States: **ideal** shows the supplied items; **empty** distinguishes an empty catalog from an empty department and retains All items; **loading** retains department selection; **partial** keeps complete available SKUs with an incompleteness notice; **error** explains local catalog failure while retaining the real external catalog link. The supplied `shop--light-1280.png` is a detail capture, not evidence for this listing (`tests/app/browser/integration.test.ts:424`).

**14. `/shop/:slug` — Judge an item and continue externally.**  
Breadcrumb, title, summary, catalog code, and optional ISBN lead to price and ordering information. At 320/390px these stack before **Live catalog**; at 992px use an independently sized 7/5 split. End with All shop items. Preserve the real action already present in the capture (`shop--light-1280.png`; `app/browser/components/ItemView.vue:37`).

States: **ideal** shows the complete SKU; **empty** reports an unknown item and offers Shop; **loading** avoids stale price or identity; **partial** keeps a complete SKU if only supporting content is missing; **error** distinguishes unavailable data from a missing item. An absent optional ISBN is normal, not partial failure (`app/core/types.ts:127`).

**15. `/payment` — Review fixture invoice information.**  
A plain task introduction and explicit fixture boundary precede customer, invoice, and amount fields; billing help follows. At 320/390px the form remains the main reading path. At 992px supporting information sits beside the bounded, top-aligned form. **Review payment** is primary; **Pay on Rough Notes** remains a separate external destination. The existing navy invitation can become more compact without deleting its explanation (`payment-refused--light-1280.png`).

States: **ideal** supports a valid review and device-local invoice confirmation; **empty** shows the blank enabled form; **loading** requires an explicitly pending supplied state; **partial** retains the draft; **error** preserves values and presents linked validation or operation failure. Keep invoice identifiers as text and preserve positive-dollar parsing, including an optional `$`; collect no card details (`guides/README.md:76`, `:179`).

## Units

Units are ordered by dependency. Shared files change serially; each implementation unit must reach its acceptance conditions before its dependents proceed. The final acceptance belongs to the Orchestrator.

1. **Baseline — Objective.**  
   **Owns:** `tests/app/browser/styles/mixins.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`, and `package.json`.  
   **Acceptance:** correct C6; reproduce the dark journey failures; determine the theme-control failure from observable behavior; run full journeys through every existing theme/viewport variant in the gate. Preserve accessible-name assertions. Correct capture naming so Shop listing and SKU detail have separate evidence. Do not hide failures through conditional clicks, skipped assertions, or broader selectors.

2. **Design contract — Subjective.**  
   **Owns:** `guides/README.md`.  
   **Acceptance:** record the fifteen-route ruling, page hierarchy, action roles, width and type roles, state meanings, and fixture wording. Remove obsolete chip requirements if the proposed signature is chosen. Keep the concept and directory indexes accurate. This unit settles voice and shape; it cannot relax objective thresholds.

3. **State and request contracts — Objective.**  
   **Owns:** `app/browser/types.ts`, `app/browser/controllers/ApplicationController.ts`, browser factories/helpers/constants/barrel as required, their mirrored tests, and the corresponding guide sections.  
   **Acceptance:** declare browser state inputs before implementation; ship all five states without changing synchronous core catalog semantics; expose read-only state; group affected request surfaces under single-word members. Separate validation from committing. Prove that blur or input correction neither accepts a request nor emits a submission event. Preserve core parsing rules.

4. **Bootstrap system — Objective.**  
   **Owns:** `app/browser/styles/index.scss`, `_tokens.scss`, `_theme.scss`, `_signature.scss`, `_mixins.scss` where needed, and mirrored stylesheet tests.  
   **Acceptance:** preserve configured identity and generated utilities through the Sass migration; bind complete button states to the nearest mode; establish measured text, control, invalid, and focus roles; generate only needed width/type utilities. No new package, vendor change, inline style, or duplicate scale. Record remaining upstream deprecations honestly.

5. **Shell and primitives — Objective.**  
   **Owns:** `app/browser/App.vue`, `app/browser/constants.ts`, new `Frame.vue`, `Split.vue`, `Record.vue`, `Notice.vue`, `Brand.vue`, grouped navigation composition if warranted, and mirrored component tests.  
   **Acceptance:** implement the four owned shapes; preserve landmarks and one H1; centralize actual navigation/brand duplication; retain explicit route dispatch. Prove compact Get started visibility, skip-link hash preservation, route focus—including same-view slug changes—and offcanvas lifecycle across resize.

6. **Home and company composition — Subjective.**  
   **Owns:** `HomeView.vue`, `AboutView.vue`, `PublicationsView.vue`, and `MediaView.vue` under `app/browser/components/`, plus their mirrored tests.  
   **Acceptance:** remove observed occlusion and isolated trust wrapping; bound chronology/file measures; size independent panels to content; retain all real destinations and content facts. Produce ideal and adverse-state evidence at both narrow widths and desktop. Update guide claims in the same unit.

7. **Catalog and editorial composition — Subjective.**  
   **Owns:** `ProductsView.vue`, `ProductView.vue`, `MagazineView.vue`, `ArticleView.vue`, `MarketplaceView.vue`, `ShopView.vue`, `ItemView.vue`, and their mirrored tests.  
   **Acceptance:** implement the specified reading orders and continuation actions; retain filtering, query preservation, currency formatting, optional ISBN behavior, and missing-slug semantics. Exercise every declared state through the shipped renderer. No fabricated market actions, product pricing, or ranking claims.

8. **Request surfaces — Objective.**  
   **Owns:** `SubscribeForm.vue`, `ContactForm.vue`, `PaymentForm.vue`, `SubscribeView.vue`, `NewsletterView.vue`, `ContactView.vue`, `PaymentView.vue`, and their mirrored tests.  
   **Acceptance:** apply bounded, independently sized layouts and correct submit colors; preserve labels, required metadata, parser rules, drafts, and explicit-submit behavior. Failed submits focus linked summaries without changing routes. All three request types prove empty, pending, partial, refused, failed, and accepted behavior without real delivery or payment claims.

9. **Surface proof and guide parity — Objective.**  
   **Owns:** `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`, authored `tests/guides.test.ts`, required test registration/scripts, and `guides/README.md`.  
   **Acceptance:** gate all fifteen routes, both modes, 320/390/desktop widths, actual expansion boundaries, and declared data states. Expand contrast coverage to navigation, text roles, buttons, fields, placeholders, errors, filters, links, focus, and nested boundaries. Test keyboard traversal, 200% text resizing, and 400% browser zoom. Distinguish behavioral proof from screenshots and registry membership.

   Guide parity must execute documented behavior and verify the app’s spec → source → tests index; string-presence checks alone do not prove behavior. This private application owes neither a fictional public-library export map nor a showcase, but it does owe parity for its actual documented surface (`guides/README.md:5`, `:14`; `tmp/authority/rules/documentation.md:29`, `:54`). Complete formatting, lint, type, build, application, policy, configuration, and guide checks.

10. **Visual judgment — Subjective.**  
    **Owns:** review evidence and findings; no implementation files.  
    **Acceptance:** inspect the resulting captures for hierarchy, density, measure, action rank, and continuity across all routes. Report remaining defects to the Orchestrator. Passing mechanical tests does not authorize this lane to accept the design.

## What you would refuse

- **A rebrand, webfonts, or another dependency.** The brief fixes the identity and Bootstrap foundation.
- **Route consolidation without task evidence.** Fifteen explicit routes are a declared contract, not an aesthetic defect.
- **A dynamic component registry solely to remove the dispatch chain.** C2 supplies no failure that earns that abstraction (`app/browser/App.vue:232`).
- **Blank-space filling through invented related records, larger heroes, or minimum heights.** The detail captures do not support the alleged giant void; useful continuation is the appropriate change (`product-detail--light-1280.png`, `shop--light-1280.png`).
- **Root overflow hiding as an overflow fix.** Content must fit and remain reachable; the observed hero defect is overlap (`home--light-1280.png`).
- **Removing heading semantics to remove underlines.** Keep heading links and change their visual treatment.
- **Disabled invalid submits, validation that commits, and decorative retry buttons.** These conceal or introduce behavioral defects.
- **A fabricated backend, account, cart, payment capture, or asynchronous core catalog.** They exceed the application’s fixture and host boundaries (`guides/README.md:38`, `:149`, `:166`, `:179`).
- **Mechanical Sass import replacement or a zero-warning promise.** The read-only probe demonstrated configuration loss; Bootstrap’s own imports remain a separate concern (`app/browser/styles/index.scss:1`; `node_modules/bootstrap/scss/bootstrap.scss:7`).
- **Treating `docs/redesign.html` as executable product authority.** Its section sequence remains useful reference material, but its webfont requests, fake search, and visual-only filtering cannot enter the application (`docs/redesign.html:11`, `:1451`, `:1720`). It supplies no established reason to change the route contract.
- **Equal priority for every finding.** Form correctness, contrast, reflow, and gate coverage precede redundant eyebrows, lockup extraction, and navigation repetition.

## Open risks

**Visual coverage is incomplete.** No supplied 320px evidence establishes narrow acceptance. The capture called `shop` represents a SKU detail, and the inspected frames do not establish the proposed Publications, Products listing, article, or Shop listing layouts. Every redesign layout above still requires rendering.

**The dark journey cause remains unproved.** Expected: the theme control exposes the name corresponding to the rendered mode. Found: the supplied dark journal lacks the successful home evidence, and the test reads immediately after changing theme state (`tmp/journeys/dark-1280.txt`; `tests/app/browser/integration.test.ts:231`). Done: source and journal inspection. Not done: a failure reproduction. One hypothesis is a missing Vue render flush before the accessible-name lookup.

**Existing source exposes additional regression risks.** Form revalidation calls committing methods, and the shell watches the selected view rather than the full location; these warrant focused behavioral proof, especially field correction and navigation between two slugs of the same view (`app/browser/components/SubscribeForm.vue:19`; `app/browser/App.vue:76`). The nested-mode button selector also needs measured evidence after correction (`app/browser/styles/_theme.scss:10`).

**Content authority remains limited to fixtures and the guide.** Do not turn the literal “147 years” into a maintained live claim without resolving its date basis; “Since 1878” avoids that maintenance burden (`app/browser/components/HomeView.vue:37`). External commerce, billing, PDFs, and delivery outcomes were not validated.

**Taste remains outside objective acceptance.** This lane can reject broken contracts and specify measurable boundaries; it cannot certify that the final density, wording, or rhythm earns an insurance professional’s trust without the rendered subjective review.

This assignment remained read-only: no files were edited, no agents were spawned, and no implementation was accepted. The scoped formatter check and in-memory Sass probes were performed; the writing integration suite and full gate chain were not rerun.