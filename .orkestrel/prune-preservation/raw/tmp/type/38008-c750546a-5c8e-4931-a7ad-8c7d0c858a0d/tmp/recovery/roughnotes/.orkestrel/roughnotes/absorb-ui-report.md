session_id: 80f5a1a3-aa96-443d-87d8-51b5a243bfd8
---
I'll read the scaffold contracts first, then follow the absorb-ui brief exactly.The brief is a read-only terrain map. Next I’ll load the writing contract, the app spec, and the Vue/CSS surface it names.I'll read the shell, views, styles, tests, and mockup next so the distillate can cite each claim.Next I’ll inventory every view component, the integration tests, and the redesign mockup.# Absorb-ui distillate

## 1. Shell

`App.vue` paints, in DOM order: skip link, nested-dark utility bar, sticky masthead navbar, offcanvas menu, `main#main`, nested-dark footer (`app/browser/App.vue:79`).

**Skip link.** An `a.visually-hidden-focusable` named `Skip to content` (`COPY.skip` at `app/browser/constants.ts:157`) targets `#main` and calls `focusNode('main')` without writing a hash (`app/browser/App.vue:80`).

**Utility bar.** A `div` with `data-bs-theme="dark"` and `bg-body text-body` (`app/browser/App.vue:84`). Inside `container-xl`: `tel:800-428-4384` and `mailto:rnc@roughnotes.com` with Bootstrap Icons `bi-telephone` / `bi-envelope`, hidden below `md` (`app/browser/App.vue:88`); `list-inline` of external `rel="noreferrer"` links `RoughNotes-Pro Login` and `Advantage-Plus Login` (`app/browser/App.vue:104`, `COPY.pro` / `COPY.advantage` at `app/browser/constants.ts:162`). Bootstrap used: Container, List inline, link utilities, Icons.

**Masthead.** `header.masthead.border-bottom.sticky-top` (`app/browser/App.vue:125`) wrapping `nav.navbar.navbar-expand-lg` with `aria-label="Site"` (`COPY.site` at `app/browser/constants.ts:204`; `app/browser/App.vue:126`). Brand is `navbar-brand` to `#/` with `.mark` “R” and `.wordmark` `Rough Notes` plus `Since 1878` (`app/browser/App.vue:128`). Bootstrap used: Navbar, Navbar brand, Buttons, Offcanvas trigger.

**Compact chrome** (`d-lg-none`, `app/browser/App.vue:135`): icon-only `btn btn-outline-secondary` theme toggle; `btn btn-primary` `Get started` to `#/subscribe`; `navbar-toggler` with `data-bs-toggle="offcanvas"` / `data-bs-target="#site-menu"`, `aria-label="Menu"`.

**Desktop chrome** (`d-none d-lg-flex`, `app/browser/App.vue:157`): `navbar-nav` of `NAV_ITEMS` — `About`, `Publications`, `Products`, `Shop` (`app/browser/constants.ts:110`) — with `nav-link` `active` / `aria-current="page"` via `isCurrent`; the same theme toggle; `btn btn-primary` `Get started` plus `bi-arrow-right`.

**Theme toggle.** Two copies of the same control (`app/browser/App.vue:136` compact, `app/browser/App.vue:169` desktop). `aria-pressed` tracks `dark`. `aria-label` is `Use dark theme` or `Use light theme` (`COPY.dark` / `COPY.light` at `app/browser/constants.ts:160`). Icon is `bi-moon` when light, `bi-sun` when dark (`app/browser/App.vue:48`).

**Offcanvas.** `#site-menu.offcanvas.offcanvas-end` with `data-bs-theme="dark"`, `aria-label="Menu"` (`app/browser/App.vue:187`). Header: `h2.offcanvas-title` `Menu` and `btn-close` `Close menu` (`app/browser/App.vue:194`). Body: `navbar-nav` of the header destinations plus `Contact` (`app/browser/App.vue:214`); `btn btn-warning` `Get started`. A location change calls `hideMenu` then `revealView` (`app/browser/App.vue:65`). Bootstrap used: Offcanvas, Offcanvas header/body, Close button, Navbar nav, Warning button.

**Main.** `main#main` `tabindex="-1"` `aria-label="Content"` (`COPY.content` at `app/browser/constants.ts:205`; `app/browser/App.vue:231`). It switches on `meta.view`: `home`, `about`, `publications`, `newsletter`, `products`, `product`, `magazine`, `article`, `marketplace`, `subscribe`, `media`, `contact`, `shop`, `item`, `payment` (`app/browser/App.vue:232`, table at `app/browser/routes.ts:24`).

**Footer.** `footer` `aria-label="Site footer"` (`COPY.footer` at `app/browser/constants.ts:206`), nested `data-bs-theme="dark"` (`app/browser/App.vue:249`). Bootstrap used: Container, Grid (`row` / `col-*`), unstyled lists, link utilities. Columns: brand mark; `Products` (`RoughNotes-Pro`, `Advantage-Plus`, `The Insurance Marketplace`); `Resources` (`Publication desks`, `Magazine issue`, `Marketplace search`, `Newsletter`, `Free magazine delivery`); `Company` (`Our story`, `Media kits`, `Write to us`, `Shop catalog`, `Existing invoice`, phone, email). Closing line: `© 1878–2026 The Rough Notes Company, Inc.` (`app/browser/App.vue:386`). Column titles are `p`, not headings (`app/browser/App.vue:266`).

**Landmarks.** `header` (banner) with `nav` named `Site`; offcanvas named `Menu`; `main` named `Content`; `footer` named `Site footer`. The utility bar has no landmark name.

**Heading order in the shell.** The only heading `App.vue` emits is offcanvas `h2` `Menu` (`app/browser/App.vue:195`), and that node sits in the DOM before `main`, so it precedes each view’s `h1`. Footer labels are not headings.

## 2. View inventory

Each row is a file under `app/browser/components/`. `loading` is absent on every file (no loading branch in any template). `ideal` means the populated happy path.

| File | Route | Page heading | Bootstrap components | ideal | empty | loading | error |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `HomeView.vue` | `/` (`app/browser/routes.ts:25`) | `The knowledge that makes independent agents unstoppable.` (`HomeView.vue:42`) | Card, Button, Badge; embedded `SubscribeForm` adds Form + Alert | present (`HomeView.vue:24`) | absent | absent | absent as a view; form refusal/accepted can paint via `SubscribeForm` (`HomeView.vue:360`) |
| `AboutView.vue` | `/about` (`routes.ts:26`) | `About Rough Notes` (`AboutView.vue:13`) | Card, Button | present (`AboutView.vue:11`) | absent | absent | absent |
| `PublicationsView.vue` | `/publications` (`routes.ts:27`) | `Publications` (`PublicationsView.vue:16`) | Card | present (`PublicationsView.vue:14`) | absent | absent | absent |
| `NewsletterView.vue` | `/newsletter` (`routes.ts:28`) | `Rough Notes newsletters` (`NewsletterView.vue:12`) | Card, Form, Alert, Button via `SubscribeForm` | present (`NewsletterView.vue:7`) | absent | absent | form refusal via `SubscribeForm` (`NewsletterView.vue:58`) |
| `ProductsView.vue` | `/products` (`routes.ts:29`) | `Products` (`ProductsView.vue:14`) | Card | present (`ProductsView.vue:12`) | absent | absent | absent |
| `ProductView.vue` | `/products/:slug` (`routes.ts:30`) | `product.name` when found (`ProductView.vue:47`); `That page is not in this catalog.` when missing (`ProductView.vue:76`) | Breadcrumb, Card, Button | present (`ProductView.vue:41`) | absent | absent | present — missing slug (`ProductView.vue:75`) |
| `MagazineView.vue` | `/magazine` (`routes.ts:31`) | `Magazine` (`MagazineView.vue:25`) | Button group, Alert, Card, Badge | present (`MagazineView.vue:57`) | present — `No articles in this category.` + `Show all articles` (`MagazineView.vue:47`) | absent | absent |
| `ArticleView.vue` | `/magazine/:slug` (`routes.ts:32`) | `article.title` (`ArticleView.vue:46`); missing uses `COPY.missing` (`ArticleView.vue:55`) | Breadcrumb, Badge | present (`ArticleView.vue:36`) | absent | absent | present — missing slug (`ArticleView.vue:54`) |
| `MarketplaceView.vue` | `/marketplace` (`routes.ts:33`) | `Insurance Marketplace` (`MarketplaceView.vue:26`) | Card, Form, Button, Alert | present (`MarketplaceView.vue:58`) | present — `No markets match this search.` + `Clear search` (`MarketplaceView.vue:52`) | absent | absent |
| `SubscribeView.vue` | `/subscribe` (`routes.ts:34`) | `Subscribe` (`SubscribeView.vue:11`) | Card, Form, Alert, Button via `SubscribeForm` | present (`SubscribeView.vue:6`) | absent | absent | form refusal via `SubscribeForm` (`SubscribeView.vue:47`) |
| `MediaView.vue` | `/media` (`routes.ts:35`) | `Media kits` (`MediaView.vue:14`, `COPY.media` at `constants.ts:214`) | Card, Button | present (`MediaView.vue:12`) | absent (channel lists render with no empty message) | absent | absent |
| `ContactView.vue` | `/contact` (`routes.ts:36`) | `Contact` (`ContactView.vue:10`) | Card; Form/Alert/Button via `ContactForm` | present (`ContactView.vue:8`) | absent | absent | form refusal via `ContactForm` (`ContactView.vue:57`) |
| `ShopView.vue` | `/shop` (`routes.ts:37`) | `Shop catalog` (`ShopView.vue:28`) | Button, Alert, Card | present (`ShopView.vue:69`) | present — `No items in this department.` + `Show all items` (`ShopView.vue:59`) | absent | absent |
| `ItemView.vue` | `/shop/:slug` (`routes.ts:38`) | `sku.name` (`ItemView.vue:42`); missing uses `COPY.missing` (`ItemView.vue:74`) | Breadcrumb, Card, Button | present (`ItemView.vue:36`) | absent | absent | present — missing slug (`ItemView.vue:73`) |
| `PaymentView.vue` | `/payment` (`routes.ts:39`) | `Pay a bill` (`PaymentView.vue:13`) | Button; Form/Alert/Card via `PaymentForm` | present (`PaymentView.vue:8`) | absent | absent | form refusal via `PaymentForm` (`PaymentView.vue:46`) |
| `SubscribeForm.vue` | none (home, newsletter, subscribe) | none | Card, Alert, Form, Button | present — form (`SubscribeForm.vue:54`) and accepted `You are subscribed` (`SubscribeForm.vue:28`) | absent | absent | present — `The subscription could not be sent` (`SubscribeForm.vue:32`) |
| `ContactForm.vue` | none (contact) | none | Card, Alert, Form, Button | present — form (`ContactForm.vue:85`) and accepted `Your inquiry is recorded on this device` (`ContactForm.vue:46`) | absent | absent | present — `The inquiry could not be sent` (`ContactForm.vue:50`) |
| `PaymentForm.vue` | none (payment) | none | Card, Alert, Form, Button | present — form (`PaymentForm.vue:68`) and accepted `The invoice is recorded on this device` (`PaymentForm.vue:37`) | absent | absent | present — `The payment could not be recorded` (`PaymentForm.vue:41`) |

`HomeView` Introduction uses `aria-label="Introduction"` (`HomeView.vue:28`, `COPY.introduction` at `constants.ts:207`). `ProductsView` uses `aria-label="Product offerings"` (`ProductsView.vue:12`). `AboutView` uses `aria-label="About"` (`AboutView.vue:11`). `PublicationsView` uses `aria-label="Publications"` (`PublicationsView.vue:14`). `MediaView` uses `aria-label="Media kits"` (`MediaView.vue:12`). `ContactView` uses `aria-label="Contact"` (`ContactView.vue:8`). `ShopView` uses `aria-label="Shop catalog"` (`ShopView.vue:26`).

## 3. Design system

### Tokens (`app/browser/styles/_tokens.scss`)

Sass variables assigned before Bootstrap import (`index.scss:1` then `index.scss:2`). Each is a Bootstrap `$` API override unless noted.

Color: `$primary` `#0a2540` (`_tokens.scss:1`); `$secondary` `#4a5a6e` (`:2`); `$warning` `#c8952b` (`:3`); `$body-color` `#0f1b2d` (`:4`); `$body-bg` `#ffffff` (`:5`); `$body-secondary-color` `#4a5a6e` (`:6`); `$body-secondary-bg` `#e7edf5` (`:7`); `$body-tertiary-bg` `#f5f7fa` (`:8`); `$body-bg-dark` `#0a2540` (`:9`); `$body-color-dark` `#e8eef5` (`:10`); `$body-emphasis-color-dark` `#ffffff` (`:11`); `$body-secondary-color-dark` `#c4d2e2` (`:12`); `$body-secondary-bg-dark` `#123a63` (`:13`); `$body-tertiary-bg-dark` `#0d2c4d` (`:14`); `$border-color-dark` `#1b4b7e` (`:15`); `$link-color` `$primary` (`:16`); `$link-hover-color` `#123a63` (`:17`); `$link-color-dark` `#8bb4e8` (`:18`); `$link-hover-color-dark` `#c4d2e2` (`:19`); `$primary-text-emphasis` `#0a2540` (`:20`); `$primary-bg-subtle` `#e7edf5` (`:21`); `$primary-border-subtle` `#b7c5d6` (`:22`); `$primary-text-emphasis-dark` `#d0dcea` (`:23`); `$primary-bg-subtle-dark` `#1b4b7e` (`:24`); `$primary-border-subtle-dark` `#2a6aaa` (`:25`); `$warning-text-emphasis` `#6b4a12` (`:26`); `$warning-bg-subtle` `#f6ecd4` (`:27`); `$warning-border-subtle` `#e7c67a` (`:28`); `$warning-text-emphasis-dark` `#e7c67a` (`:29`); `$warning-bg-subtle-dark` `#3a2a10` (`:30`); `$warning-border-subtle-dark` `#c8952b` (`:31`).

Radius: `$border-radius` `0.75rem` (`:32`); `$border-radius-sm` `0.5rem` (`:33`); `$border-radius-lg` `1rem` (`:34`); `$border-radius-xl` `1.25rem` (`:35`); `$border-radius-xxl` `1.5rem` (`:36`).

Type: `$font-family-sans-serif` system UI stack (`:37`); `$headings-font-family` Georgia / `ui-serif` stack (`:50`); `$headings-font-weight` `600` (`:52`); `$headings-line-height` `1.15` (`:53`); `$display-line-height` `1.1` (`:54`); `$line-height-base` `1.6` (`:55`). Contrast: `$min-contrast-ratio` `4.5` (`:56`).

Buttons / chrome: `$btn-font-weight` `600` (`:57`); `$btn-padding-y` `0.75rem` (`:58`); `$btn-padding-x` `1.35rem` (`:59`); `$btn-border-radius` `0.75rem` (`:60`); `$navbar-padding-y` `0.75rem` (`:61`); `$card-spacer-y` `1.5rem` (`:62`); `$card-spacer-x` `1.65rem` (`:63`).

Space / container: `$spacer` `1rem` (`:64`); `$spacers` map `0`–`5` plus `6` (`4.5rem`) and `7` (`6rem`) (`:65`) — Bootstrap `$spacers` extended; `$container-max-widths` sm `540px` through xxl `1320px` (`:75`).

`:root` custom properties (`_tokens.scss:83`), not Bootstrap names: `--rn-navy` from `$primary`; `--rn-navy-mid` `#123a63`; `--rn-navy-deep` `#071a2f`; `--rn-blue` `#1f6feb`; `--rn-blue-deep` `#155ac9`; `--rn-gold` from `$warning`; `--rn-gold-soft` `#e7c67a`; `--rn-gold-ink` `#6b4a12`; `--rn-hero-muted` `#c4d2e2`; `--rn-accent` `var(--rn-gold)`; `--rn-display` Georgia stack; `--rn-shadow`, `--rn-shadow-md`, `--rn-shadow-lg` navy `color-mix` shadows.

### `_signature.scss` rules (grouped by what they paint)

Masthead glass: `.masthead` translucent `--bs-body-bg` plus `backdrop-filter` (`_signature.scss:3`) — no Bootstrap class of this name; sits on `header` that also uses `sticky-top`.

Brand: `.mark` gradient square (`:8`) — this token collides with Bootstrap’s `.mark` highlight utility; `.wordmark` / `.wordmark small` display type (`:21`, `:27`).

Navbar underline: `.navbar-nav .nav-link` positioning (`:34`); `::after` gold hairline (`:38`); hover / `.active` / `[aria-current='page']` expand width (`:49`) — extends Bootstrap `.nav-link`.

Eyebrow: `.accent` inline-flex tracking (`:55`); `::before` gold bar (`:63`).

Hero island: `.hero` radial navy (`:70`); `::before` grid mask (`:81`); `> .container-xl` stacking (`:97`); `.hero h1` clamp size (`:102`); `.hero h1 em, .voice` italic (`:108`); `.hero .lead` max-width (`:113`). Overrides Bootstrap `h1` / `.lead` inside `.hero`.

Featured card: `.card[data-bs-theme='dark']` navy gradient, transparent border (`:117`) — overrides Bootstrap `.card` background.

Thesis button: `.btn-warning` sets `--bs-btn-*-color` to `--rn-navy` plus gold shadow (`:122`) — overrides Bootstrap `.btn-warning` CSS variables.

Issue stage: `.stage` padded frame (`:130`); `.measure` `40rem` measure (`:137`); `.tile-sm` (`:141`); `.issue` shadow + rotation (`:146`); `.issue-head` navy gradient (`:153`); `.issue:hover` under `prefers-reduced-motion: no-preference` (`:157`); `.issue` `transform: none` under `reduced-motion` (`:163`).

Chips: `.chip` absolute + shadow (`:169`); `.chip-south` / `.chip-north` corners (`:175`, `:180`).

Tiles / checks / lift: `.tile` (`:185`); `.confirm` (`:191`); `.lift` transition (`:197`); `.lift:hover` (`:201`); `.btn:hover` lift (`:207`) — extends Bootstrap `.btn`; `.btn:hover .bi-arrow-right` (`:211`); `.bi-arrow-right` transition (`:216`).

Marketplace panel: `.panel` overflow (`:220`); `::before` blue radial (`:225`); `> .container-xl` stacking (`:241`).

Subscribe invite: `.invite` navy gradient + shadow (`:246`); `::before` gold radial (`:253`); `> .row` stacking (`:269`).

Article tones: `.tone` min-height + overflow (`:274`); `::after` dot pattern (`:280`); `.tone-coverage` through `.tone-program` category gradients (`:292`–`:312`).

### `_theme.scss` rules

Light island: `[data-bs-theme='light']` `--rn-accent: var(--rn-gold)` (`_theme.scss:3`).

Dark island: `[data-bs-theme='dark']` `--rn-accent: var(--rn-gold-soft)` (`:7`); nested `.btn-primary` paper fill / navy type via `--bs-btn-*` (`:10`); `.btn-outline-primary` (`:25`); `.btn-outline-secondary` (`:38`) — overrides Bootstrap dark button tokens.

Focus chrome: `.btn:focus-visible`, `.btn-close:focus-visible`, `.form-control:focus-visible`, `.form-select:focus-visible`, `.nav-link:focus-visible`, `.navbar-toggler:focus-visible` `0.125rem` `--bs-emphasis-color` outline (`:52`) — restores a visible ring on Bootstrap interactive classes.

Reduced motion: `.btn`, `.nav-link`, `.offcanvas` `transition: none` (`:62`) — overrides Bootstrap component transitions.

### `_mixins.scss` rules

`reduced-motion` wraps `@content` in `@media (prefers-reduced-motion: reduce)` (`_mixins.scss:1`). `transition($value)` sets `transition: $value` then `transition: none` inside `reduced-motion` (`:7`). No painted selectors of their own.

## 4. Authored-CSS census

No SFC `<style>` block exists under `app/` (search of `app/**/*.vue` returned none). `index.scss` contains only `@import` (`app/browser/styles/index.scss:1`). `_mixins.scss` contains no selectors.

### `app/browser/styles/_tokens.scss` — total `1`

- `:root` (`_tokens.scss:83`) — publishes `--rn-*` custom properties.

### `app/browser/styles/_theme.scss` — total `14`

- `[data-bs-theme='light']` (`:3`) — gold accent on light islands.
- `[data-bs-theme='dark']` (`:7`) — soft-gold accent on dark islands.
- `[data-bs-theme='dark'] .btn-primary` (`:10`) — paper-filled primary on dark.
- `[data-bs-theme='dark'] .btn-outline-primary` (`:25`) — outline primary on dark.
- `[data-bs-theme='dark'] .btn-outline-secondary` (`:38`) — outline secondary on dark.
- `.btn:focus-visible` (`:52`) — focus ring.
- `.btn-close:focus-visible` (`:53`) — focus ring.
- `.form-control:focus-visible` (`:54`) — focus ring.
- `.form-select:focus-visible` (`:55`) — focus ring.
- `.nav-link:focus-visible` (`:56`) — focus ring.
- `.navbar-toggler:focus-visible` (`:57`) — focus ring.
- `.btn` inside `reduced-motion` (`:63`) — kills button transition.
- `.nav-link` inside `reduced-motion` (`:64`) — kills nav transition.
- `.offcanvas` inside `reduced-motion` (`:65`) — kills offcanvas transition.

### `app/browser/styles/_signature.scss` — total `51`

- `.masthead` (`:3`) — sticky bar glass.
- `.mark` (`:8`) — “R” badge.
- `.wordmark` (`:21`) — brand / logo-band serif.
- `.wordmark small` (`:27`) — `Since 1878` tracking.
- `.navbar-nav .nav-link` (`:34`) — underline host.
- `.navbar-nav .nav-link::after` (`:38`) — gold underline.
- `.navbar-nav .nav-link:hover::after` (`:49`) — underline grow.
- `.navbar-nav .nav-link.active::after` (`:50`) — underline grow.
- `.navbar-nav .nav-link[aria-current='page']::after` (`:51`) — underline grow.
- `.accent` (`:55`) — eyebrow row.
- `.accent::before` (`:63`) — eyebrow hairline.
- `.hero` (`:70`) — home hero field.
- `.hero::before` (`:81`) — hero grid overlay.
- `.hero > .container-xl` (`:97`) — hero content above overlay.
- `.hero h1` (`:102`) — hero display size.
- `.hero h1 em` (`:108`) — italic stress.
- `.voice` (`:109`) — italic stress class.
- `.hero .lead` (`:113`) — hero dek width.
- `.card[data-bs-theme='dark']` (`:117`) — featured product card fill.
- `.btn-warning` (`:122`) — gold CTA navy type + glow.
- `.stage` (`:130`) — magazine card frame.
- `.measure` (`:137`) — readable measure.
- `.tile-sm` (`:141`) — chip icon box.
- `.issue` (`:146`) — tilted issue card.
- `.issue-head` (`:153`) — issue masthead.
- `.issue:hover` (`:158`) — untilt on hover.
- `.issue` under `reduced-motion` (`:164`) — no tilt.
- `.chip` (`:169`) — floating chip.
- `.chip-south` (`:175`) — lower-left chip.
- `.chip-north` (`:180`) — upper-right chip.
- `.tile` (`:185`) — icon tile.
- `.confirm` (`:191`) — check tile.
- `.lift` (`:197`) — card hover transition.
- `.lift:hover` (`:202`) — card lift.
- `.btn:hover` (`:207`) — button lift.
- `.btn:hover .bi-arrow-right` (`:211`) — arrow nudge.
- `.bi-arrow-right` (`:216`) — arrow transition.
- `.panel` (`:220`) — marketplace split field.
- `.panel::before` (`:225`) — blue glow.
- `.panel > .container-xl` (`:241`) — panel content stacking.
- `.invite` (`:246`) — subscribe/newsletter/payment invite.
- `.invite::before` (`:253`) — gold glow.
- `.invite > .row` (`:269`) — invite content stacking.
- `.tone` (`:274`) — article color block.
- `.tone::after` (`:280`) — tone dot pattern.
- `.tone-coverage` (`:292`) — coverage gradient.
- `.tone-specialty` (`:296`) — specialty gradient.
- `.tone-management` (`:300`) — management gradient.
- `.tone-technology` (`:304`) — technology gradient.
- `.tone-personal` (`:308`) — personal gradient.
- `.tone-program` (`:312`) — program gradient.

### `app/browser/styles/_mixins.scss` — total `0`

No selectors.

### `app/browser/styles/index.scss` — total `0`

No selectors.

### SFC `<style>` blocks — empty population

Every file in `app/browser/components/` and `app/browser/App.vue` has none.

## 5. Copy register

Quoted strings are authored in the named file. Catalog-driven titles are named as slots.

### `App.vue`

Eyebrows / labels: `Rough Notes`, `Since 1878`, `Menu`, `Site`, `Content`, `Site footer`. CTAs: `Skip to content`, `Get started`, `RoughNotes-Pro Login`, `Advantage-Plus Login`, header `About` / `Publications` / `Products` / `Shop`, offcanvas `Contact`. Footer column titles `Products`, `Resources`, `Company`. Footer destinations: `RoughNotes-Pro`, `Advantage-Plus`, `The Insurance Marketplace`, `Publication desks`, `Magazine issue`, `Marketplace search`, `Newsletter`, `Free magazine delivery`, `Our story`, `Media kits`, `Write to us`, `Shop catalog`, `Existing invoice`. Theme names: `Use dark theme`, `Use light theme`. Close: `Close menu`. Brand line in footer: `The Rough Notes Company has served the independent agency system with risk and insurance information since 1878. Carmel, Indiana.` (`App.vue:260`).

### `HomeView.vue`

Eyebrows: `147 years` / `of trusted insurance authority` (`:37`); `Rough Notes magazine` (`:79`); `Agency of the month` (`:83`); `Products` (`:146`); `Insurance Marketplace` (`:203`); `From the latest issue` (`:277`); `Join the community` (`:320`); `Most requested` on the featured card (`:160`); `Fixture sample` (`:250`). Heading: `The knowledge that makes independent agents unstoppable.` (`:42`). Section headings: `Everything an agency needs, in one trusted system` (`:147`); `Find the specialty market before you write the file` (`:204`); `Insights that keep agents ahead of the market` (`:278`); `Get Rough Notes delivered — free to licensed agents` (`:321`); visual `September issue` (`:80`, `p.h3` not `h3`). Issue `h2` is `feature.title` (fixture `A permanent part of the local landscape` at `app/core/constants.ts:182`). Product `h3` is `product.name`. Article `h3` is `article.title`. CTAs: `Get started` (`:51`); `Read the magazine` (`:55`, `:309`); `Read the feature` (`:95`); `Learn more` (`:180`); `Explore products` (`:188`); `Search markets` (`:243`); form `Subscribe free` via `SubscribeForm`. Chips: `Trusted since 1878` (`:111`); `Coverage insights, monthly` (`:123`). Trust band: `Powering the independent agency system with` / `PF&M Analysis` / `Risk Evaluation System` / `The Insurance Marketplace` / `Coverages Applicable` (`:135`). Stats labels: `Monthly readers`, `Market categories`, `Classes of business` (`:59`).

### `AboutView.vue`

Eyebrows: `Since 1878` (`:12`); `Mission` (`:23`); `Our credo` (`:37`). Heading: `About Rough Notes` (`:13`). Headings: `Serve the independent agent market` (`:24`); `Satisfaction, or your money back` (`:38`); `Company timeline` (`:48`); `Our team` (`:62`); `Editorial board` (`:74`); era `h3` is `era.title`. CTAs: `Explore products`, `Publications`, `Back to home` (`:84`).

### `PublicationsView.vue`

Eyebrow: `Publications` (`:15`). Heading: `Publications` (`:16`). Card headings: `Rough Notes magazine` (`:32`); `The Insurance Marketplace` (`:58`); `Newsletter`; `Free magazine delivery`; `Media kits`. CTAs in cards: `Read the magazine` (`:42`); `Search markets` (`:67`).

### `NewsletterView.vue`

Eyebrow: `Newsletter` (`:11`). Heading: `Rough Notes newsletters` (`:12`). CTA: form `Subscribe free`.

### `ProductsView.vue`

Eyebrow: `Products` (`:13`). Heading: `Products` (`:14`). `Most requested` (`:23`). Product `h2` is `product.name`.

### `ProductView.vue`

Breadcrumb: `Home`, `Products` (`:29`, `:36`). Eyebrow when featured: `Most requested` (`:44`). Heading: `product.name`. Side heading: `Included` (`:60`). Missing: `That page is not in this catalog.` CTA: `All products` (`:78`).

### `MagazineView.vue`

Eyebrow: `Magazine` (`:22`). Heading: `Magazine` (`:25`). Filter names: `All articles`, `Coverage`, `Specialty`, `Management`, `Technology`, `Personal lines`, `Program business` (`FILTER_CHOICES` at `constants.ts:120`, labels at `app/core/constants.ts:36`). Empty: `No articles in this category.` CTA: `Show all articles` (`MagazineView.vue:47`). Article `h2` is `article.title`.

### `ArticleView.vue`

Breadcrumb: `Home`, `Magazine`. Eyebrow: `CATEGORY_LABELS[article.category]`. Heading: `article.title`. Missing: `That page is not in this catalog.` CTA: `Read the magazine` (`:57`).

### `MarketplaceView.vue`

Eyebrow: `Insurance Marketplace` (`:25`). Heading: `Insurance Marketplace` (`:26`). Field: `Coverage or industry`. CTA: `Search markets`. Empty: `No markets match this search.` CTA: `Clear search`. Result `h2` is `market.name`.

### `SubscribeView.vue`

Eyebrow: `Join the community` (`:10`). Heading: `Subscribe` (`:11`). CTA: form `Subscribe free`.

### `MediaView.vue`

Eyebrow: `Advertising` (`:13`). Heading: `Media kits`. Channel headings: `Rough Notes magazine`, `The Insurance Marketplace`, `Banner ads` (`CHANNEL_LABELS` at `app/core/constants.ts:330`). Heading: `Advertising representatives` (`:47`). Asset link text is `asset.name`. CTA: `Contact` (`:73`).

### `ContactView.vue`

Eyebrow: `Questions and inquiries` (`:9`). Heading: `Contact`. Office heading: `The Rough Notes Company, Inc.` (`:19`). Labels: `Toll free`, `Phone`, `Fax`, `Email`. Form CTAs live on `ContactForm`.

### `ShopView.vue`

Eyebrow: `Shop` (`:27`). Heading: `Shop catalog`. CTAs: `Live catalog`, `Order form (PDF)`, `Pay a bill` (`:34`). Filters: `All items`, `Books`, `Calculator wheels`, `Agency supplies` (`DEPARTMENT_CHOICES` at `constants.ts:128`, labels at `app/core/constants.ts:316`). Empty: `No items in this department.` CTA: `Show all items`. SKU `h2` is `sku.name`. Price line suffix: `plus shipping` (`:88`).

### `ItemView.vue`

Breadcrumb: `Home`, `Shop`. Eyebrow: `DEPARTMENT_LABELS[sku.department]`. Heading: `sku.name`. CTA: `Live catalog` (`:60`). Missing: `That page is not in this catalog.` CTA: `All shop items` (`:76`). Mentions `Pay a bill` in body (`:66`).

### `PaymentView.vue`

Eyebrow: `Existing customers` (`:12`). Heading: `Pay a bill`. CTAs: `Shop`, `Pay on Rough Notes` (`:39`). Form CTAs on `PaymentForm`.

### `SubscribeForm.vue`

Labels: `Full name`, `Work email`. CTA: `Subscribe free`. Error heading: `The subscription could not be sent`. Summary links: `Full name is required.`, `Work email must be an email address.` Field errors: `Enter your full name.`, `Enter a work email.` Accepted: `You are subscribed`. Fine print: `Fixture only — nothing is sent off this device.`

### `ContactForm.vue`

Labels: `Full name`, `Title`, `Company`, `Work email`, `Phone`, `Message`. CTA: `Send inquiry`. Error heading: `The inquiry could not be sent`. Summary links: `Full name is required.`, `Company is required.`, `Work email must be an email address.`, `Phone must include a number.` Accepted: `Your inquiry is recorded on this device.`

### `PaymentForm.vue`

Labels: `Customer number`, `Invoice number`, `Invoice amount`. CTA: `Review payment`. Error heading: `The payment could not be recorded`. Summary links: `Customer number is required.`, `Invoice number is required.`, `Invoice amount must be a positive dollar amount.` Accepted: `The invoice is recorded on this device.`

## 6. Test coverage over the surface

Families declared at `tests/app/browser/integration.test.ts:52`: `journey`, `refusal`, `matrix`, `transport`, `capture`.

### Journey (`integration.test.ts:225`)

Accessible-name bindings (a rename breaks the click/fill/resolve):

- Theme button `Use dark theme` or `Use light theme` (`:234`, values `COPY.dark` / `COPY.light`).
- `Shop` via `traverseAccessible(COPY.shop)` (`:240`).
- Link `Get started` inside landmark/region `Introduction` (`startSubscription` at `tests/app/browser/setup.ts:96`, used at `:242`).
- Link `Skip to content` (`:259`).
- Link `Products` (via `followSite`, which may first click button `Menu` then link, and waits for `Close menu`; `setup.ts:104`).
- Link `RoughNotes-Pro` inside `Product offerings` (`:263`).
- Link `About` (`:363`); link `Publications` (`:279`); link `Shop` (`:419`).
- Link `Rough Notes magazine` inside `Publications` (`:281`).
- Button `Program business` (`:286`); button `Show all articles` (`:289`).
- Link `The Insurance Marketplace` inside `Publications` (`:306`).
- Textbox `Coverage or industry` (`:312`); button `Search markets` (`:313`); button `Clear search` (`:316`).
- Button `Subscribe free` (`:333`); textbox `Full name` (`:337`); link `Full name is required.` (`:340`); link `Work email must be an email address.` (`:341`); textbox `Work email` (`:344`).
- Link `Newsletter` inside `Publications` (`:382`).
- Link `Media kits` (`:398`); link `2027 Rough Notes magazine rate card` (`:403`).
- Link `Live catalog` (`:421`); link `Coverages Applicable` (`:424`).
- Link `Write to us` (`:440`); button `Send inquiry` (`:443`); links `Full name is required.`, `Company is required.`, `Work email must be an email address.`, `Phone must include a number.` (`:447`); textboxes `Full name`, `Company`, `Work email`, `Phone` (`:452`).
- Link `Pay a bill` (`:474`); button `Review payment` (`:477`); links `Customer number is required.`, `Invoice number is required.`, `Invoice amount must be a positive dollar amount.` (`:481`); textboxes `Customer number`, `Invoice number`, `Invoice amount` (`:489`).

`followSite` also binds button `Menu` and `Close menu` on compact viewports (`setup.ts:105`).

Page-text assertions (not role+name, but copy a redesign still hits): `HOME_HEADING` `The knowledge that makes independent agents unstoppable.` (`setup.ts:27`, `:232`); `RoughNotes-Pro` (`:233`); `Free print and digital delivery` (`:243`); `Subscribe` (`:244`); `Choose the desk your agency needs` (`:258`); `Policy Forms & Manual Analysis` (`:264`); `The producer toolkit` (`:265`); `The magazine and the Insurance Marketplace` (`:280`); `Coverage, markets, and agency practice` (`:282`); `No articles in this category.` (`:287`); `Mass shootings; mass confusion?` (`:290`); `Search a fixture sample of specialty markets` (`:307`); `Restaurant general liability` (`:308`); `No markets match this search.` (`:314`); `The subscription could not be sent` (`:336`); `You are subscribed` (`:348`); `About Rough Notes` (`:364`); `Serve the independent agent market` (`:366`); `It is about you, the customer` (`:383`); `Rough Notes newsletters` (`:384`); `Files open on Rough Notes. They are not stored in this application.` (`:400`); `A fixture sample of books` (`:420`); `Catalog #30040` (`:425`); `$78.00` (`:426`); `Write the Indianapolis office` (`:441`); `The inquiry could not be sent` (`:446`); `Your inquiry is recorded on this device` (`:459`); `Pay a bill` (`:475`); `The payment could not be recorded` (`:480`); `The invoice is recorded on this device` (`:495`).

Forbidden visible strings: `ApplicationController`, `Navigator`, `Orkestrel`, `hashchange`, `slug` (`:103`, asserted at `:235`).

### Refusal (`integration.test.ts:501`)

- Absent name `Sign In` — exact voice `No interactive element has the accessible name "Sign In"` (`setup.ts:30`, `:508`).
- Link `RoughNotes-Pro Login` (`:509`) — href contains `shoppingcart.roughnotes.com`, `rel="noreferrer"`.
- Link `Shop` (`:512`) — href `#/shop`.
- Absent name `PF&M database` (`:514`).

### Matrix (`integration.test.ts:522`)

Harness-built names (not app copy): `Focus origin control`, `Focus ring control`, `Contrast control`, `Escape control` (`:531`–`:560`).

App bindings: link `Shop catalog` (`COPY.catalog`, `:578`) contrast ≥ `4.5`; button `Subscribe free` (`:584`) contrast ≥ `4.5` and focus ring ≥ `3` after `startSubscription` (so also `Get started` inside `Introduction`). Variants named `light-1280`, `dark-1280`, `light-390`, `dark-390` (`:77`).

### Transport (`integration.test.ts:605`)

Theme button `Use dark theme` / `Use light theme` via `toggleThemeControl` (`setup.ts:124`, used at `:611`). Asserts `data-bs-theme="dark"` and storage key `roughnotes-theme`.

### Capture (`integration.test.ts:631`)

No accessible-name bindings. Expands state filenames: `home`, `product-detail`, `magazine-empty`, `marketplace-miss`, `subscribe-refused`, `subscribe-accepted`, `about`, `newsletter`, `media`, `shop`, `contact-refused`, `payment-refused` (`:54`).

## 7. Mockup delta

Structure and copy only. Mockup: `docs/redesign.html`. Shipped home: `app/browser/components/HomeView.vue` inside `App.vue`.

### In `docs/redesign.html`, not in shipped `HomeView.vue`

- Document title `The Rough Notes Company — Trusted Insurance Knowledge Since 1878` (`redesign.html:5`); meta description about nearly 150 years (`:7`); Fraunces + Inter webfont requests (`:10`).
- Utility `Shop Catalog` plus separators (`:1193`); brand `aria-label="The Rough Notes Company home"` (`:1201`).
- Header destinations `Products`, `Solutions`, `Insights`, `Magazine`, `Marketplace` (`:1205`); `Sign In` (`:1213`); compact `Open menu` (`:1217`); mobile sheet of those destinations plus `Get Started →` (`:1237`).
- Hero primary CTA `Explore Our Products` (`:1269`); secondary `Read the Magazine` (`:1272`); lead uses a closed em dash `intelligence—built` (`:1265`).
- Magazine kicker `Rough Notes Magazine` / `September Issue` (`:1290`); feature title `A Permanent Part of the Local Landscape` (`:1295`); dek `How a Southeast-based agency grew with regional operating and distributed-equity models.` (`:1296`); footer `By Christopher W. Cook` and `12 min read` (`:1303`).
- Products eyebrow `Products & Solutions` (`:1336`); dek `A digital delivery platform insurance professionals use anytime, anywhere, on any device—grounded in nearly 150 years of technical authority.` (`:1338`); tag `Most Popular` (`:1345`); per-card CTAs `Search markets` / `Shop catalog` / `Subscribe free` on later cards (`:1370`, `:1388`, `:1397`); Books card titled `Books & Calculator Wheels` (`:1383`).
- Entire `#solutions` Risk Evaluation split (`:1403`): heading `Uncover every coverage concern, avoid every E&O gap`; bullets `Comprehensive coverage checklists`, `Reduce errors & omissions exposure`, `Turn knowledge into sales`; visual mini-search `Restaurant — general liability` with rows `Commercial Property Exposure`, `Liquor Liability`, `Equipment Breakdown`, `Cyber & Data Breach`.
- Home insights filter pills `All`, `Coverage Concerns`, `Excess & Specialty`, `Agency Management`, `Technology`, `Personal Lines` (`:1501`); category chips `Producers Blog`, `Program Business`; CTA `View All Articles` (`:1593`); dek `Fresh analysis, coverage concerns, and agency strategy—published every month by professionals who know the business.` (`:1496`).
- Join dek `Join 46,000+ independent agents who rely on Rough Notes each month…` (`:1606`); bullets `Trending newsletter every week`, `Full access to the Insurance Marketplace directory` (`:1616`); form on the navy field with placeholders `Mike Garcia` / `you@agency.com`; CTA `Subscribe Free`; fine print `No cost for licensed agents. Unsubscribe anytime.` (`:1630`).
- Footer socials `LinkedIn`, `X`, `Facebook`, `YouTube` (`:1651`); product links `PF&M Online`, `Risk Evaluation System`, `Coverages Applicable` (`:1663`); resource links `Rough Notes Magazine`, `Insurance Marketplace`, `Books & Wheels`, `Agency Supplies`, `Article Search` (`:1671`); company `About Us`, `Advertise`, `Contact`, `Pay Invoice`, `Change of Address` (`:1681`); copyright `© 1878–2026 The Rough Notes Company, Inc. · Carmel, Indiana` plus `Privacy`, `Terms`, `Accessibility` (`:1690`); footer `id="marketplace"` (`:1639`).
- Scroll-reveal script and visual-only filter script (`:1700`). No skip link, no color-mode control, no hash routes.

### In shipped `HomeView.vue` / `App.vue`, not in the mockup home

- Skip link, theme toggle, Bootstrap offcanvas `Menu` including `Contact`, compact `Get started` beside the toggler, live `tel:` / `mailto:` / `rel="noreferrer"` shopping-cart logins (`App.vue:80`–`:227`).
- Nested `data-bs-theme` islands on hero, issue card, chips, marketplace panel, invite, and subscribe form (`HomeView.vue:27`, `:74`, `:103`, `:196`, `:317`; `SubscribeForm.vue:26`).
- Hero primary `Get started` to subscribe (`HomeView.vue:51`); secondary `Read the magazine` (`:55`); lead with spaced dash `intelligence — built` (`:47`); issue title sentence case from the catalog (`HomeView.vue:86` + `app/core/constants.ts:182`); author-only card footer (`HomeView.vue:99`); chips `Trusted since 1878` south and `Coverage insights, monthly` north (`:101`, `:113`).
- Products eyebrow `Products`; dek names fixture content and live logins (`HomeView.vue:146`); tag `Most requested`; every card CTA `Learn more`; catalog names `Books and calculator wheels` (`app/core/constants.ts:103`); listing CTA `Explore products` (`HomeView.vue:188`).
- Marketplace split (`HomeView.vue:195`) in the slot the mockup uses for Risk Evaluation: heading `Find the specialty market before you write the file`; bullets `Coverage notes on the submission`, `Hospitality through transportation`; `Fixture sample` of `market.name` / `market.industry`; CTA `Search markets`.
- Insights dek `Coverage, markets, and agency practice from the September fixture issue.` (`:279`); no home filters; CTA `Read the magazine` (`:309`); `CATEGORY_LABELS` chips `Coverage`, `Specialty`, `Management`, `Technology`, `Personal lines`, `Program business`.
- Invite dek names fixture-only delivery (`:324`); bullets `Free print and digital subscription`, `September magazine issue in this catalog`, `Fixture Insurance Marketplace search` (`:337`); nested light `SubscribeForm` with `Subscribe free` and `Fixture only — nothing is sent off this device.`
- Footer destinations for publication desks, newsletter, media kits, shop catalog, existing invoice, phone, and email (`App.vue:291`); no socials, Privacy, Terms, or Accessibility links.

`git status --porcelain` before and after this pass: `?? .claude/launch.json`. Identical. No deviation.