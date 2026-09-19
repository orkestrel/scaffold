# Rough Notes redesign — subjective lane

Lane held: **subjective**. Engine: Opus 5. Role: `planner`.
Captured to this path by the Orchestrator: the lane is read-only and carries no `Write` tool, so it
returned the argument as its final message. The deviation is recorded at the end.

## 1. Thesis

Rough Notes stops being one designed marketing page with fourteen attachments and becomes one
continuous desk: every screen composed from the same small set of page primitives, every screen
ending in a named next move, and the navy-and-gold identity spent on ranking actions instead of
decorating regions.

## 2. Verdict on each finding

### The Orchestrator's findings

**F1 — One designed page, fourteen under-composed ones. Real, and the root finding.** The frames
show two page shapes, not one: an `invite` navy island on `newsletter--light-1280.png`,
`subscribe-accepted--light-1280.png`, and `payment-refused--light-1280.png`, and a bare
`container-xl` slab everywhere else (`about--light-1280.png`, `media--light-1280.png`,
`marketplace-miss--light-1280.png`, `magazine-empty--light-1280.png`,
`contact-refused--light-1280.png`, `product-detail--light-1280.png`, `shop--light-1280.png`). The
code confirms the split: `app/browser/components/SubscribeView.vue:7`,
`app/browser/components/NewsletterView.vue:8`, and `app/browser/components/PaymentView.vue:9`
carry `invite`; every other view opens with `container-xl py-5 py-xl-6` and nothing else. Home is a
third shape again. Neither shape is wrong. Having them unowned and unnamed is.

**F2 — Hollow detail pages. Real in substance, misdescribed in geometry; the frame wins.**
`product-detail--light-1280.png` is a 1280x1080 frame whose content ends at y=545 and whose footer
begins at y=615, so the band above the footer is about 70 px, not large. The real defect is visible
on the same frame and is worse than the stated one: the left column runs dry at y=460 and the page
offers no action at all — no `Get started`, no related product, no route onward except the
breadcrumb. `shop--light-1280.png` has the same shape and its only action leaves the application.
`app/browser/components/ProductView.vue:41-73` and `app/browser/components/ItemView.vue:36-71`
confirm no closing region exists in either.

**F3 — Unbounded measure. Real, and cheaper to fix than the finding implies.** The `measure` role
already exists at `app/browser/styles/_signature.scss:137` as `max-width: 40rem` and is already
applied to the About lead (`app/browser/components/AboutView.vue:14`), the Media lead
(`app/browser/components/MediaView.vue:15`), and the whole article body
(`app/browser/components/ArticleView.vue:42`). It is not applied to the timeline bodies
(`AboutView.vue:54`) or the team and board panels (`AboutView.vue:63,75`), which is why
`about--light-1280.png` runs timeline prose across the full 1176 px content width. The
`media--light-1280.png` diagnosis is different: nine `list` rows each 1176 px wide holding a label
occupying the left third. Compare `media--light-390.png`, where the identical markup reads
correctly. The wide layout is the narrow layout un-adapted, not a measure that was set too wide.

**F4 — Unequal paired cards. Real, and the mechanism is one utility.** `h-100` on
`app/browser/components/ContactView.vue:17` stretches the navy office card to the taller form
sibling; `contact-refused--light-1280.png` shows the card running y=402 to y=1481 with its last
line of content at y=815, leaving about 660 px of empty navy.
`app/browser/components/AboutView.vue:21` and `:35` do the same to the mission and credo pair in
`about--light-1280.png`. At 390 the defect disappears because the columns stack
(`contact-refused--light-390.png`), so this is a wide-viewport defect only.

**F5 — Link-underlined headings. Real.** `light-1280.txt` records
`heading "RoughNotes-Pro" > link "RoughNotes-Pro"` and `home--light-1280.png` paints every card
title underlined. The cause is that `stretched-link link-body-emphasis`
(`app/browser/components/HomeView.vue:171,294`) omits the
`link-underline-opacity-0 link-underline-opacity-100-hover` pair that `App.vue` applies to every
other link. A card title is not an inline prose link and must not wear the prose treatment.

**F6 — Hero stage overflow. Real as an overlap defect; the container-clipping claim does not hold.
The frame wins.** In `home--light-1280.png` the issue card's right edge sits inside the container,
whose content band runs x=52 to x=1228 in this build (`container-xl` caps at 1200 px per
`app/browser/styles/_tokens.scss:75-81`, less 12 px of padding each side). What the frame does show
is the `Coverage insights, monthly` chip sitting over the card's top-right corner and the card's
`Rough Notes magazine` label rendering cut where the chip lands. The defect is decorative geometry
covering informational text: `.chip-north` is positioned to the stage edge at
`app/browser/styles/_signature.scss:180-183` while the card is inset 2.5 rem by `_signature.scss:134`.

**F7 — Trust band break. Real.** `home--light-1280.png` shows `Coverages Applicable` alone on a
second line, centred, under a row whose lead-in sits left.
`app/browser/components/HomeView.vue:133-141` sets `justify-content-center` with `text-center` on a
row that also carries a start-aligned lead-in sentence, so the wrap has no honest alignment to fall
back to.

**F8 — Action rank. Real, and it is two findings.** The first is rank: `about--light-1280.png` ends
with `Explore products`, `Publications`, and `Back to home` at near-equal weight
(`app/browser/components/AboutView.vue:84-88`), and `shop--light-1280.png`'s sibling listing opens
with three peer outline buttons of which two leave the application
(`app/browser/components/ShopView.vue:34-40`). The second is register: gold commits sit on paper
cards in `contact-refused--light-1280.png`, `marketplace-miss--light-1280.png`, and
`shop--light-1280.png`, against the application's own rule that gold fills thesis calls to action
and navy fills chrome calls to action on paper (`guides/README.md:117-118`). The contrast is fine —
`light-1280.txt` measures `Subscribe free` at 5.763 — so this is a rank argument, not a contrast one.

**F9 — Eyebrow repeats the heading. Real, and it recurs beyond the named frame.**
`magazine-empty--light-1280.png` paints `MAGAZINE` over `Magazine`
(`app/browser/components/MagazineView.vue:23,25`). `marketplace-miss--light-1280.png` paints
`INSURANCE MARKETPLACE` over `Insurance Marketplace`
(`app/browser/components/MarketplaceView.vue:25,26`). `PublicationsView.vue:15,16` does it a third
time. The gold hairline that introduces the eyebrow is the best mark in the product; the words
beside it carry nothing.

**F10 — Thin contrast matrix. Real, low priority on its own.** `light-1280.txt` § resolved styles
records readings on `Shop catalog` and `Subscribe free` and nothing else, against a focus order of
48 stops. Treat this as coverage carried by the variant work in F11 rather than as a design unit.

**F11 — A red variant no gate runs. Real, and it gates the whole campaign.** `package.json:24-25`
runs `test:app` with no `VITE_VARIANT`, so only `light-1280` ever executes under `npm test` while
`guides/README.md:211` declares four variants. A redesign that cannot read its own dark and narrow
renders is a redesign done blind. Fix this before any visual unit starts.

**C1 — Repeated link class triple. Real; the count in the brief is high.** The triple appears at
`app/browser/App.vue:90, 97, 107, 115, 270, 277, 284, 296, 303, 310, 317, 324, 336, 343, 350, 357,
364, 371, 378` — nineteen occurrences, not more than twenty. The finding stands regardless.

**C2 — Fifteen-branch view chain. Real.** `app/browser/App.vue:232-246`. Every added screen edits
the shell.

**C3 — Footer destinations are literal markup. Real.** `app/browser/App.vue:265-384` against
`app/browser/constants.ts:110-115`. The footer is the largest navigation surface in the product and
the only one with no declared source.

**C4 — Duplicated brand lockup. Real.** `app/browser/App.vue:128-134` and `:253-259`.

**C5 — Sass `@import`. Real, not worth a design unit.** `app/browser/styles/index.scss:1-4`. Zero
rendered effect; the migration is mechanical and reorders the Bootstrap configuration because
`_tokens.scss` currently relies on `@import` ordering to seed `!default` variables. Schedule it
after the visual work, not before it.

**C6 — `format:check` red on a committed file. Real, and it blocks the first commit.**
`tests/app/browser/styles/mixins.test.ts`. One formatter run; it is not redesign work, it is the
starting line.

### Findings the brief did not name

**S1 — The success state is a dead end, and it is the most damaging defect in the application.**
`subscribe-accepted--light-1280.png` shows the entire form replaced by one green alert reading
`You are subscribed` inside an otherwise empty white card, on a page whose only other content is
three bullet points. `app/browser/components/SubscribeForm.vue:28-30` confirms there is nothing
else. The single moment where a reader has chosen to trust this publisher offers them nothing to do
next.

**S2 — Green appears exactly once, at that moment.** `alert-success`
(`app/browser/components/SubscribeForm.vue:28`) is the only hue in the product outside navy, gold,
and the red refusal. It reads as a stock Bootstrap component pasted into a designed surface.

**S3 — Two radius families ship together.** `btn rounded-pill` filters
(`app/browser/components/MagazineView.vue:39`, `app/browser/components/ShopView.vue:51`) sit beside
0.75 rem cards (`app/browser/styles/_tokens.scss:32`). `magazine-empty--light-1280.png` shows the
pill row directly above a `rounded` alert.

**S4 — The same control changes colour by location.** `Get started` is `btn-primary` in the
masthead (`app/browser/App.vue:145,178`) and `btn-warning` in the drawer (`App.vue:224`).

**S5 — Page-head alignment is inconsistent.** `magazine-empty--light-1280.png` centres its head;
`about--light-1280.png`, `media--light-1280.png`, `contact-refused--light-1280.png`, and
`marketplace-miss--light-1280.png` start theirs.

**S6 — External destinations wear the internal affordance.** `Live catalog` in
`shop--light-1280.png` is a gold button carrying `bi-arrow-right`, the same glyph every in-app call
to action uses (`app/browser/components/ItemView.vue:60-63`). A reader cannot tell which controls
leave the application.

**S7 — The focus ring does not cover links.** `app/browser/styles/_theme.scss:52-57` lists `btn`,
`btn-close`, `form-control`, `form-select`, `nav-link`, and `navbar-toggler`. Most of the 48 focus
stops in `light-1280.txt` are plain links, which fall back to the user agent's ring.

**S8 — Two adjacent focus stops share one accessible name.** `light-1280.txt` focus order 12 and 13
are both `link "Get started"`.

**S9 — `/newsletter` and `/subscribe` are the same job in different copy.** Both wrap
`SubscribeForm` inside an identical `invite` island (`NewsletterView.vue:8`, `SubscribeView.vue:7`),
and `PublicationsView.vue:77-97` lists them as separate destinations.

**S10 — Duplicated help on the payment screen.** `payment-refused--light-1280.png` states "If you do
not know the customer number, use the invoice number twice" in the left checklist and again as form
text under the field.

### Not worth fixing

- **F10 as its own unit.** Fold the matrix breadth into the variant-gate unit.
- **C5 before the visual work.** No rendered effect; it competes for the same files.
- **The `tone` gradient bands.** They are the only imagery this product has, they encode the article
  category honestly through their badge, and there is no photography budget. Keep them.
- **The `.issue` card's 1.2° tilt** (`app/browser/styles/_signature.scss:149`). It is the one piece
  of wit in the product and it sits on a magazine cover, where a tilt is literal rather than
  decorative.

## 3. The system

### Colour families and surface ownership

Reused unchanged, each already declared: `$primary: #0a2540` and `$warning: #c8952b`
(`app/browser/styles/_tokens.scss:1,3`); the dark body as navy, `$body-bg-dark: #0a2540`
(`_tokens.scss:9`), which makes the identity and the dark mode the same object; the hand-picked
`primary` and `warning` emphasis, subtle, and border triads with their dark twins
(`_tokens.scss:20-31`), which are exactly what `color-modes.md` § Extend the theme requires of a
brand colour and which stock Bootstrap's mechanical `tint-color` ramps would not produce.

What changes is ownership, not paint.

**Navy becomes a thesis surface and stops being a container.** Today navy paints the utility bar,
the hero, the marketplace split, the invite, the featured product card, the About mission card, the
Contact office card, the drawer, and the footer. When nine regions are navy, navy ranks nothing. The
rule: the chrome owns navy permanently (utility bar, drawer, footer), and each screen may hold at
most one navy `Band`. Everything else that is navy today takes `bg-body-tertiary` (`color-modes.md`
§ Fixed and adaptive classes, replacement map: `bg-light` panel → `bg-body-tertiary`). That single
change also removes F4's 660 px of empty navy, because a quiet tertiary panel at content height
reads as correct where a stretched navy slab reads as broken.

**Gold narrows to one job: the commit on navy.** `light-1280.txt` measures gold on navy at 5.763, so
it passes and stays where it passes. It leaves `Send inquiry`, `Review payment`, `Search markets`
(`app/browser/components/MarketplaceView.vue:44`), `Live catalog`
(`app/browser/components/ItemView.vue:60`), and the drawer's `Get started` (`App.vue:224`). Those
take `btn-primary`. This applies the identity `guides/README.md:117` already declares; it does not
change it.

**The refusal red and the acceptance green both go.** Refusals keep Bootstrap's `is-invalid` field
treatment and `invalid-feedback`, which the forms already use correctly
(`app/browser/components/SubscribeForm.vue:61,74`), and the summary becomes an `alert` styled on the
`danger` subtle pair rather than the solid pink of `contact-refused--light-1280.png`. Acceptance
stops being `alert-success` and becomes a navy `Band` carrying the confirmation and its next move —
the same surface the invitation used, so the reader sees their action land on the object they acted
on.

**Text tiers stay as shipped.** Inherited body and `text-body-secondary` are the two readable tiers
(`color-modes.md` § Text tiers). `$body-secondary-color: #4a5a6e` on white and
`$body-secondary-color-dark: #c4d2e2` on navy (`_tokens.scss:6,12`) are opaque declared tokens, not
alpha composites, so they hold on every declared surface. `text-body-tertiary` is never used for
reading.

### Type roles and scale

Reused unchanged: display is Georgia-first with no webfont request
(`app/browser/styles/_tokens.scss:50-51`), body is the system sans stack (`_tokens.scss:37-49`),
`$headings-font-weight: 600` and `$line-height-base: 1.6` (`_tokens.scss:52,55`). The hero's
`clamp(2.25rem, 4.8vw, 3.75rem)` (`_signature.scss:103`) stays and stays unique: one display moment,
on the one marketing screen.

One role is added, because the subject demands it and the product does not have it. **Data.** Prices,
catalog codes, ISBNs, phone numbers, invoice amounts, and issue dates are painted today as ordinary
body text, so `$78.00` in `shop--light-1280.png` and `#30040` beneath it do not align with anything.
Declare one class through the Utilities API (`bootstrap-reference.md` § Utilities API, which
`responsive-layout.md` names as the sanctioned route for a missing role) setting
`font-variant-numeric: tabular-nums`, and apply it to every figure a reader compares. An insurance
publisher whose numbers do not line up is a publisher whose numbers a reader checks twice.

Utility role stays as the existing `small text-uppercase` eyebrow with the `accent` hairline
(`_signature.scss:55-68`), with F9's copy corrected.

### Spacing and width roles

Reused unchanged: `$spacers` reaching 4.5 rem and 6 rem at steps 6 and 7 (`_tokens.scss:65-74`),
which already gives the band rhythm `py-5 py-xl-6` every view uses.

Width takes three named roles and one rule.

- **`measure`**, 40 rem (`_signature.scss:137`). Prose, form columns, standfirsts, empty-state copy.
  Already declared; the work is applying it where `about--light-1280.png` and
  `media--light-1280.png` show it missing.
- **`column`**, the 7/5 split the detail screens already use
  (`app/browser/components/ProductView.vue:43,51`). Prose beside a bounded fact panel.
- **`full`**, the container. Repeating records and comparisons only.

The rule: **body prose never takes `full`.** That one sentence closes F3 on every screen without a
new component.

### Radius and elevation

Radius takes one family and no exceptions: `$border-radius: 0.75rem` with its `sm`, `lg`, `xl`, and
`xxl` steps (`_tokens.scss:32-36`), matched by `$btn-border-radius: 0.75rem` (`_tokens.scss:60`).
`rounded-pill` leaves the filter rows (`MagazineView.vue:39`, `ShopView.vue:51`) and leaves the hero
badge (`HomeView.vue:34`). `frontend-design.md` § Ground it in the subject states the reason
directly: pill buttons beside square cards read as two products.

Elevation takes the declared three-step scale (`_tokens.scss:96-100`) assigned by z-position, per
`bootstrap-reference.md` § Elevation and depth:

- `--rn-shadow` — resting cards and the masthead.
- `--rn-shadow-md` — the hover lift and the drawer.
- `--rn-shadow-lg` — the issue card and the `invite` island, the only two elements that float.

One removal: `shadow-lg` on the home marketplace preview panel (`HomeView.vue:249`). That panel is
`bg-body-secondary` inside a navy `Band`, which the same reference states already reads inset. A
large soft shadow on an inset panel argues with its own surface.

### The signature

The gold hairline before an eyebrow (`.accent::before`, `_signature.scss:63-68`) and the gold
underline that grows under the active navigation item (`_signature.scss:38-53`) are the same mark in
two places, both structural, both earning their position. That is the signature and it is enough.

Everything decorative beside it goes: the two floating chips (`_signature.scss:169-183`), which are
`aria-hidden` ornaments that cover informational text at 1280 and vanish below `lg` anyway; and the
`shadow-lg` noted earlier. `frontend-design.md` § Depth and finishing details states the test —
remove the least-useful accessory and restore it only if the surface loses information. These lose
nothing.

## 4. Page primitives

Every screen composes from these and nothing else. Each is a Vue component in
`app/browser/components/`, each contract declared in `app/browser/types.ts` before implementation,
each member a single descriptive word.

**`Head`** — the page opening. Owns the eyebrow with its hairline, the `h1`, the standfirst at
`measure`, and the parent trail where the route has one. Props: `eyebrow`, `title`, `lead`, `trail`,
the last reusing the declared `NavItem` shape at `app/browser/types.ts:28`. Always start-aligned.
Refuses: an eyebrow that repeats the title (F9), a centred variant (S5), and actions — a head
introduces, it does not commit.

**`Band`** — one full-width horizontal region owning a surface. Props: `surface`, a literal union
over `paper`, `quiet`, and `navy` named for the axis it varies, and `label` for the region's
accessible name. Owns the vertical rhythm, the `data-bs-theme` scope and its `bg-body text-body`
restatement at the boundary (`color-modes.md` § Scope the mode), and the `aria-labelledby` wiring.
Refuses: more than one `navy` per screen, and nesting inside another `Band`.

**`Panel`** — a bounded block inside a `Band`: the `Included` list, the office block, the credo, the
invoice help. Owns its own height. Refuses `h-100`. That single refusal closes F4 everywhere it
appears.

**`Listing`** — the repeating-record region. Generic over the record type, taking `records` and
`label`, with a `record` slot and an `empty` slot. Owns the record count line, the column contract
for its record type, and the empty state painted in the same slot the records occupy. Derives the
count from `records.length` rather than storing it. Refuses: a card around a record carrying one
line of text — the media rows become a `list-group`, not nine full-width cards
(`media--light-1280.png`).

**`Next`** — the closing region every screen ends in. Slots: `actions` and `related`. Owns action
rank: one primary, at most one secondary, related records below them. Refuses: three peer buttons
(F8), and a `Back to home` control — the masthead brand is that, and
`app/browser/components/AboutView.vue:88` is spending a button on it.

`Head` and `Band` close F1. `Next` closes F2. `Head` and `Panel` close F3. `Panel` closes F4. `Next`
closes F8. No component library, no npm package, no new dependency.

## 5. Screen by screen

Container content is 1176 px at 1280, 366 px at 390, and 296 px at 320 in this build
(`_tokens.scss:75-81`; `.container` padding is 12 px each side). Thresholds are named individually,
not applied by habit.

Declared data states, and their triggers in the contracts:

- **ideal** — records present.
- **empty** — a listing with no records. Reachable on every listing because `CatalogOptions` permits
  an empty collection (`app/core/types.ts:229-236`), and reachable in the shipped fixtures for the
  magazine category and the marketplace query.
- **miss** — a detail route whose slug is absent (`ProductView.vue:75`, `ArticleView.vue:54`,
  `ItemView.vue:73`).
- **partial** — a record with an optional field absent: `Sku.isbn` (`app/core/types.ts:134`),
  `Inquiry.title` and `Inquiry.message` (`:206-207`).
- **refused** — a parser returning failed field names.
- **accepted** — a parser returning a record.

**loading is declared absent, with the reason recorded in the guide.** The catalog is frozen in the
bundle and every view reads it synchronously; there is no wait to acknowledge. Painting a skeleton
or a spinner here would be inventing progress, which `bootstrap-reference.md` § The data states
forbids in the same paragraph that requires the state. I rule it out rather than fake it, and I flag
the ruling in § 8 for the objective lane.

### `/` — home

Regions: navy `Band` (hero), quiet `Band` (trust line), paper `Band` (`Listing` of products), navy
`Band` (marketplace split), paper `Band` (`Listing` of issues), `Next` (the subscribe invite).
Reading order is unchanged; this screen is already right and needs repair, not redesign.

Repairs: the chips go (F6), so the issue card stops being covered. The trust line becomes
start-aligned with its lead-in on its own line above the wordmarks, so the wrap in
`home--light-1280.png` has an alignment to fall back to (F7). Card titles lose the prose underline
(F5). The preview panel loses `shadow-lg`.

Narrow: at 390 and 320 the hero stacks copy, actions, statistics, then the issue card; the
statistics run as a single column at 320 where three 4-figure groups will not fit in 296 px.
Expansion: the hero splits at `lg` (960 container), because the issue card's stage is capped at
26.25 rem (`_signature.scss:132`) and below 960 the copy column falls under 500 px. Product and
issue `Listing` columns go one, then two at `md`, then three at `xl` — moved up from `lg`, because
at a 960 container three columns give a 296 px card holding a two-line title and a four-line
summary, which `home--light-1280.png` already shows cramped at 356 px.

Primary action: `Get started`. States: ideal, plus refused and accepted from the embedded form.

### `/about` — about

Regions: `Head`; paper `Band` with the mission and credo as `Panel` pairs; paper `Band` with the
timeline; quiet `Band` with team and board; `Next`.

Repairs: the mission `Panel` drops navy for `bg-body-tertiary` and both drop `h-100` (F4). Timeline
entries stop being a card each and become a single ordered list with the era span as a
start-aligned gold-ruled marker and the body at `measure` (F3). `Next` carries `Explore products` as
primary and `Publications` as secondary; `Back to home` goes (F8).

Narrow: one column throughout at 390 and 320; the era span sits above its title rather than beside
it. Expansion: mission and credo split at `md` (720 container), because each holds one short
paragraph and needs no more than 340 px. Primary action: `Explore products`. States: ideal.

### `/publications` — publications hub

Regions: `Head`; paper `Band` with a `Listing` of the desks; `Next`.

Repairs: the eyebrow stops repeating the title (F9) and names what a desk is. Each destination card
gains the fact a reader needs to choose — the magazine's issue date, the marketplace's record count,
the media kit's year — rather than another summary sentence. Today `PublicationsView.vue:73-112`
paints three near-identical one-line cards.

`/newsletter` and `/subscribe` both appear here today (`PublicationsView.vue:77,91`) and are the same
job (S9). The hub lists the newsletters desk once; magazine delivery moves into `/subscribe`'s own
`Next` rather than standing as a peer desk.

Narrow: one column. Expansion: the two lead desks split at `md`; the three secondary desks go three
across at `lg`, where 960 gives 296 px each for a title and one line. Primary action:
`Read the magazine`. States: ideal.

### `/newsletter` — newsletters

Regions: `Head`; paper `Band` naming each newsletter and what it carries; `Next` holding the form.

This route keeps its path and gains a reason to exist. Today it is `/subscribe` with different copy
(S9). The content it needs — the named newsletters — is not in the catalog, so this screen costs a
core record type and its fixtures. That cost is stated, not hidden; see § 8.

Narrow: one column; the form is the last region at every width, so a reader reaches the offer before
the fields. Expansion: the form splits beside its explanation at `lg` only, where 960 leaves the
form column above `measure`'s lower bound. Primary action: `Subscribe free`. States: ideal, refused,
accepted.

### `/products` — product listing

Regions: `Head`; paper `Band` with a `Listing` of products; `Next`.

Repairs: the featured product stops being a navy card inside a paper `Band` and becomes the first
record with a gold-ruled `Most requested` marker, so navy stays a `Band` surface rather than a card
surface. Card titles lose the underline.

Narrow: one card per row at 390 and 320; the icon tile drops to `tile-sm` at 320 so the title starts
at the same baseline as the eyebrow. Expansion: two at `md`, three at `xl`, for the reason given on
home. Primary action: `Get started`. States: ideal, empty.

### `/products/:slug` — product detail

Regions: `Head` with the trail; `column` `Band` holding the summary and audience at `measure` beside
an `Included` `Panel`; `Next`.

`Next` is the whole repair (F2). It carries `Get started` as primary, the neighbouring products as
related records, and — where the product is the magazine or the marketplace — the desk that product
opens. `Product` carries no relation field (`app/core/types.ts:81-87`), so the relation is derived
from the catalog order rather than stored, which `AGENTS.md` § Design laws requires.

Narrow: `Head`, summary, `Included`, `Next`, in that DOM order at 390 and 320. Expansion: the split
at `lg`, where 960 gives a 540 px prose column and a 380 px panel; below that the `Included` list
wraps its longest entry, `Commercial and Personal Lines Risk Evaluation System`, across three lines.
Primary action: `Get started`. States: ideal, miss.

### `/magazine` — issue listing

Regions: `Head`; a filter group; paper `Band` with a `Listing` of articles; `Next`.

Repairs: the eyebrow stops repeating the title (F9). The head is start-aligned like every other
screen (S5). The filters lose `rounded-pill` (S3) and become `btn-sm` in a wrapping group. The
filtered-empty state moves into the `Listing`'s `empty` slot, keeping the filters and the record
count in view, which `bootstrap-reference.md` § The data states requires and
`magazine-empty--light-1280.png` currently satisfies only by accident of the filters sitting above.

Narrow: filters wrap to as many rows as they need at 296 px; no scroller, no disclosure — there are
few enough that wrapping is honest. Expansion: cards one, two at `md`, three at `xl`. Primary
action: the first article. States: ideal, empty.

### `/magazine/:slug` — article

Regions: `Head` with the trail over the category tone band; `measure` `Band` with the body; `Next`.

This screen is already the best-composed detail page in the product — `ArticleView.vue:42` applies
`measure` to the whole body. `Next` adds what it lacks: the next article in the issue, the category
filter that returns to it, and `Get started`.

Narrow: the tone band drops from 10.5 rem to 6 rem at 390, because a decorative gradient occupying a
third of a 390 px viewport before the headline is a cost the reader pays for nothing. Expansion:
none; the body stays at `measure` at every width. Primary action: `Read the next feature`. States:
ideal, miss.

### `/marketplace` — market search

Regions: `Head`; a search `Band`; paper `Band` with a `Listing` of markets; `Next`.

Repairs: the eyebrow stops repeating the title (F9). `Search markets` drops gold for navy (F8). The
input drops from the full 927 px in `marketplace-miss--light-1280.png` to `measure` — a coverage or
industry name is a few words, and a 927 px field tells the reader to type an essay. The `Listing`
gains its count line, so a reader knows the sample's size before searching and after. The miss state
keeps the query, the count, and `Clear search`, and adds the industries present in the sample so the
reader has somewhere to go rather than a dead sentence.

Narrow: search field above its button at 320 and 390, both full width (`responsive-layout.md` §
Build the base, `d-grid gap-2 d-sm-flex`). Market records stay a single column at every width — they
are read, not compared. Expansion: the field and button sit on one row from `md`. Primary action:
`Search markets`. States: ideal, empty.

### `/subscribe` — magazine delivery

Regions: navy `Band` holding the offer and the form; `Next`.

Repairs: the accepted state stops being a green alert in an empty card (S1, S2). It becomes the same
navy `Band` restated — the offer's claims turn to past tense, the confirmation names what the reader
will receive and when, and `Next` carries `Read the magazine` as primary and `Explore products` as
secondary. A reader who has just given their name gets somewhere to go.

Narrow: offer, then form, then `Next`, one column. Expansion: the offer and form split at `lg`;
below that a 720 container gives a 340 px form column, under `measure`'s useful floor for a labelled
field with error text. Primary action: `Subscribe free`. States: ideal, refused, accepted.

### `/media` — media kits

Regions: `Head`; one quiet `Band` per channel, each a `Listing` of assets; paper `Band` with the
representatives; `Next`.

Repairs: the asset rows stop being full-width cards and become a `list-group`
(`media--light-1280.png` shows nine cards each wasting about two thirds of its width). Each row
carries the document name at the start and its destination note at the end — the file opens on
roughnotes.com, derived from `Asset.href` (`app/core/types.ts:147`) rather than stored — so the row
uses its width and a reader knows they are leaving (S6). The deadline sentence on the marketplace
channel becomes part of that `Band`'s head rather than a stray paragraph (`MediaView.vue:22-25`).

Narrow: identical structure at 390 and 320, with the destination note moving under the name. This
screen's narrow layout is already correct (`media--light-390.png`); the work is composing the wide
one. Expansion: the destination note moves to the row end at `sm`. Representative cards split at
`md`. Primary action: `Contact`. States: ideal, empty per channel.

### `/contact` — contact

Regions: `Head`; `column` `Band` with the office `Panel` beside the form; `Next`.

Repairs: the office `Panel` drops navy for `bg-body-tertiary` and drops `h-100`, closing the 660 px
of empty navy in `contact-refused--light-1280.png` (F4). `Send inquiry` drops gold for navy (F8).
The form column takes `measure`. The refusal summary takes the `danger` subtle pair rather than the
solid pink fill.

Narrow: office `Panel` above the form at 390 and 320 — a reader who wants the phone number gets it
without scrolling past six fields. Expansion: the split at `lg`; a 720 container would give the form
a 420 px column, which wraps `Work email must be an email address.` in the summary. Primary action:
`Send inquiry`. States: ideal, refused, accepted, partial — `title` and `message` omitted is the
common case and the accepted state must not imply data that was never entered.

### `/shop` — catalog listing

Regions: `Head`; a department filter group; paper `Band` with a `Listing` of SKUs; `Next`.

Repairs: the three peer buttons that open the page (`ShopView.vue:33-41`) move into `Next`, where
`Pay a bill` is the primary in-app action and the two external destinations are quiet links marked
as leaving (F8, S6). Filters lose `rounded-pill` (S3) and stop being centred against a start-aligned
page (S5). Prices take the new data role so they align down the column.

Narrow: one card per row; price and code on one line beneath the title. Expansion: two at `md`,
three at `xl`. Primary action: the first SKU. States: ideal, empty.

### `/shop/:slug` — SKU detail

Regions: `Head` with the trail; `column` `Band` with the description at `measure` beside the price
`Panel`; `Next`.

Repairs: `Live catalog` drops gold for navy and gains an explicit external marker (F8, S6). Price,
catalog code, and ISBN take the data role, so `shop--light-1280.png`'s stack of unaligned figures
lines up. `Next` carries other items in the same department as related records and `Pay a bill` as
the in-app action — `ItemView.vue:66` names `Pay a bill` in prose today without linking it.

Narrow: description, price `Panel`, `Next`. Expansion: the split at `lg`. Primary action:
`Live catalog`. States: ideal, miss, partial — a SKU with no `isbn` (`app/core/types.ts:134`) omits
the line rather than painting an empty label.

### `/payment` — pay a bill

Regions: navy `Band` holding the explanation and the invoice form; `Next`.

Repairs: `Review payment` drops gold for navy (F8). The duplicated help sentence appears once, as
form text beside the field it governs (S10) — `payment-refused--light-1280.png` states it twice. The
`Shop` and `Pay on Rough Notes` buttons split by rank: `Pay on Rough Notes` is the real external
commit and takes the secondary slot in `Next`; `Shop` is a destination, not an action, and becomes a
link. The accepted state restates the invoice's customer, number, and formatted amount, because a
reader who has just entered three figures needs to see them read back.

Narrow: explanation, form, `Next`. The amount field takes `inputmode` appropriate to a currency
entry at every width. Expansion: the split at `lg`, matching `/subscribe` and `/contact` so the
three form screens reflow identically. Primary action: `Review payment`. States: ideal, refused,
accepted.

## 6. Units

One writer per checkout, so these are serial. Each names its role, its engine, and its lane.

**U1 — Clear the format gate.** `builder` / Sonnet / objective. Owns
`tests/app/browser/styles/mixins.test.ts`. Accepts when `npm run format:check` is clean and
`npm run lint:check` is still clean. Carries C6.

**U2 — Run every declared variant under the gate.** `sol` / objective. Owns `package.json`,
`tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`. Accepts when `npm test` runs
`light-1280`, `dark-1280`, `light-390`, and `dark-390` and all four are green, including the dark
theme-control resolution named in F11, and when the matrix family records a reading for every `Band`
surface rather than for two controls. Carries F10, F11. Blocks every visual unit.

**U3 — Extract the shell.** `sol` / objective. Owns `app/browser/App.vue`,
`app/browser/constants.ts`, `app/browser/types.ts`, and a new `app/browser/components/Brand.vue`.
Accepts when the footer destinations are declared constants, the brand lockup has one definition,
the repeated link triple has one home, the view chain is a declared map, and
`tests/app/browser/App.test.ts` plus the journey family are green with the accessible tree in
`tmp/journeys/light-1280.txt` unchanged. Carries C1, C2, C3, C4, S4 — the drawer's `Get started`
becomes `btn-primary` in the same pass.

**U4 — Declare and build the primitives.** `implementer` / Opus 5 / subjective. Owns
`app/browser/types.ts` and new `Head.vue`, `Band.vue`, `Panel.vue`, `Listing.vue`, `Next.vue` under
`app/browser/components/`, plus their tests under `tests/app/browser/components/`. Edits no view.
Accepts when each contract is in `types.ts` before its implementation, every member is one word,
`Panel` carries no `h-100`, `Listing` derives its count, and `npm run check` and
`npm run test:app:browser` are green.

**U5 — Settle the system in the stylesheet.** `sol` / objective. Owns
`app/browser/styles/_tokens.scss`, `_signature.scss`, `_theme.scss`. Accepts when the radius family
has one member set, the elevation steps are assigned by z-position, the chip rules are gone, the
data type role is generated through the Utilities API, the focus-ring selector reaches links, and
the matrix family from U2 records no contrast regression in any variant. Carries F6, S3, S7, and the
elevation change.

**U6 — Recompose home.** `implementer` / Opus 5 / subjective. Owns
`app/browser/components/HomeView.vue`. Accepts when the trust line is start-aligned and its wrap has
an alignment, card titles carry no prose underline, the preview panel carries no `shadow-lg`, and
the four-variant capture shows no element overlapping informational text. Carries F5, F7.

**U7 — Close the detail screens.** `implementer` / Opus 5 / subjective. Owns `ProductView.vue`,
`ItemView.vue`, `ArticleView.vue`. Accepts when each ends in a `Next` with one primary action and
derived related records, each paints its miss state inside the page frame, `/shop/:slug` paints its
partial state for an absent `isbn`, and figures carry the data role. Carries F2.

**U8 — Recompose the listings.** `implementer` / Opus 5 / subjective. Owns `MagazineView.vue`,
`ShopView.vue`, `MarketplaceView.vue`. Accepts when each head is start-aligned and its eyebrow does
not repeat its title, filters carry no `rounded-pill`, each `Listing` paints its count and its empty
state in the record slot, and the marketplace field is bounded at `measure`. Carries F9, S3, S5.

**U9 — Recompose the company screens.** `implementer` / Opus 5 / subjective. Owns `AboutView.vue`,
`PublicationsView.vue`, `MediaView.vue`. Accepts when no `Panel` carries `h-100`, no prose region
carries the container width, media assets render as a `list-group` with an external marker, and each
screen ends in a `Next` with one primary action. Carries F3, F4, F8, S6.

**U10 — Recompose the form screens and their accepted states.** `implementer` / Opus 5 /
subjective. Owns `SubscribeView.vue`, `NewsletterView.vue`, `ContactView.vue`, `PaymentView.vue`,
`SubscribeForm.vue`, `ContactForm.vue`, `PaymentForm.vue`. Accepts when no commit carries
`btn-warning` on paper, no accepted state is `alert-success`, every accepted state names a next
move, the payment help appears once, and the refusal journeys are green in every variant. Carries
F8, S1, S2, S10.

**U11 — Give `/newsletter` its own content.** `implementer` / Opus 5 / subjective. Owns
`app/core/types.ts`, `app/core/constants.ts`, `app/core/Catalog.ts`, `NewsletterView.vue`, and their
tests. Accepts when the newsletter record type is declared before implementation, `Catalog` exposes
it through the same lookup-and-listing pair as every other collection, and `/newsletter` no longer
duplicates `/subscribe`. Carries S9. This unit is optional if the Orchestrator rules the route
merges instead; see § 8.

**U12 — Migrate Sass to `@use`.** `sol` / objective. Owns `app/browser/styles/index.scss` and the
partials' `@use` headers. Accepts when the build emits no deprecation warning and the four-variant
matrix is byte-identical to U11's. Carries C5. Runs last among the writing units because it touches
every stylesheet the visual units depend on.

**U13 — Restore guide parity.** `implementer` / Opus 5 / subjective. Owns `guides/README.md`.
Accepts when the concept index names the primitives and their tests, the knowledge-shell section
describes the surface as built, the declared data-state set and the absence of `loading` are
recorded with the reason, and the parity check is green.

**U14 — Gate evidence.** `verifier` / Sonnet / objective. Runs `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build`, `npm test` and reports exit codes. Fixes
nothing.

## 7. What you would refuse

**A replacement identity.** Navy, gold, Georgia-first display, and the system sans body are correct
for a 147-year-old technical publisher and the brief bars changing them. I would refuse the change
anyway. `frontend-design.md` § Restraint and self-critique names this exactly: preserve an
established restrained identity instead of manufacturing risk.

**A component library.** The primitives named in § 4 are not a design system and must not become
one. Adding a `Button`, a `Card`, or an `Alert` wrapper over Bootstrap's own adds a boundary that
translates nothing, which `AGENTS.md` § Design laws forbids as a superfluous wrapper.

**Deleting a route.** `/newsletter` duplicates `/subscribe` today, and the tempting fix is to merge
them. I refuse it. The route is declared in `guides/README.md:91`, in the `View` union
(`app/core/types.ts:39-54`), and in `ROUTES` (`app/browser/routes.ts:28`); removing it changes the
application's published surface, which is the user's decision and not an auditor's. The duplication
is a content defect and gets a content fix.

**Adding a route.** Nothing in the frames or the catalog needs a screen that does not exist. A
search results page, a pricing page, an account page, and a cart would each imply behaviour this
application does not build, which `frontend-design.md` § Ground it in the subject forbids outright.

**A skeleton or spinner.** There is no wait. See § 5 and § 8.

**Removing the link from card headings.** The objective lane may argue that `heading > link` is the
cause of F5 and that the heading must be plain with a separate action link beneath it. That trades
one defect for two: the card loses its hit area, and the focus order gains a stop per record —
`light-1280.txt` already lists 48. The fix is the underline utility pair, not the structure.

**Photography.** There is no asset budget, and `frontend-design.md` § Images at their intended size
forbids composing around a placeholder. The category tone bands are honest abstraction and stay.

**A left rail or sticky sub-navigation.** The application has four header destinations
(`app/browser/constants.ts:110-115`). A rail is chrome for a product that does not have the depth to
fill it.

**Commerce affordances on `/shop`.** No cart, no quantity, no `Add to basket`. Live orders leave,
and the screen must say so rather than imitate a store.

## 8. Open risks

**`Panel` refusing `h-100` may read ragged at wide widths.** About's mission and credo and Contact's
office and form are pairs of visibly unequal content. Content-height panels are correct and
stretched ones are not, but the ragged bottom edge is a real aesthetic cost I cannot settle from the
1280 and 390 frames alone. Evidence needed: captures of `/about` and `/contact` at 992, 1280, and
1400.

**Moving the third card column from `lg` to `xl` may leave 992 sparse.** Two product cards in a 960
px container gives 456 px each, which is wide for a card holding a title and a four-line summary.
Evidence needed: captures of `/products` and `/magazine` at 992 and 1200.

**The new quiet panels must be measured, not assumed.** `color-modes.md` § Text tiers states its
readings bound stock 5.3.8 and that a declared theme re-points every value. This theme declares
`$body-secondary-color`, `$body-tertiary-bg`, and their dark twins
(`app/browser/styles/_tokens.scss:6,8,12,14`), so `text-body-secondary` on `bg-body-tertiary` in
both modes needs its own reading. Evidence needed: the widened matrix from U2 across all four
variants.

**Dropping `rounded-pill` may weaken the filter row's read as a group.** Pills read as filters by
convention. Square `btn-sm` buttons in a wrapping group with `aria-pressed` read as a toggle group,
which is what they are. Evidence needed: captures of `/magazine` and `/shop` filter rows at 390 and
1280, ideal and filtered-empty.

**The gold-to-navy commit swap is a taste call I own and cannot measure.** There is no conversion
metric on a fixture application. My argument is that gold ranks nothing when it appears on every
submit, and that reserving it for the thesis call to action on navy is what `guides/README.md:117-118`
already declares. The objective lane can test whether the swap holds contrast; it cannot test
whether it holds attention, and neither can I.

**`Next`'s related records have no declared relation.** `Product` carries no relation field
(`app/core/types.ts:81-87`) and `Article` carries no product link. Deriving the relation from
catalog order or from `Department` and `Category` is honest and stores no second fact, but it is
weaker than a declared one. Evidence needed: a types decision from the Orchestrator on whether a
relation field is in scope.

**The `loading` ruling needs the Orchestrator, not me.** The brief's constraint states every
declared data state must ship, and `bootstrap-reference.md` § The data states names loading among
them. I declare it absent because the catalog is frozen in the bundle and inventing progress is
forbidden by the same reference. If the objective lane reads the constraint as unconditional, this
becomes a contradiction only the Orchestrator can rule on, and the alternative — introducing a real
asynchronous boundary so the state has something true to paint — is a larger change than anything
else in this proposal.

**U11's cost may exceed its value.** Giving `/newsletter` its own content means a new core record
type, new fixtures, new `Catalog` members, new tests, and a guide parity row, to remove one
duplicated screen. I argue it is worth it because the newsletters are a real Rough Notes product and
because a hub listing the same form twice reads as a product nobody maintains. An Orchestrator who
disagrees can strike U11 and accept the duplication; that is a defensible ruling and I name it as
one.

---

## Deviation report

- **Expected:** write this argument to `tmp/units/redesign-planner-report.md`, then return it.
- **Found:** `Error: No such tool available: Write. Write is disabled for this session, in subagents
  as well as here.`
- **Evidence:** the `Write` call against that absolute path returned that error; no file was created.
- **Done or not done:** the design argument is complete and returned in full. The file write is not
  done.
- **Hypothesis:** this lane's tool allowlist enforces the read-only floor, which
  `.agents/orchestration.md` § Check the brief before you send it anticipates — "A read-only lane
  writes no report file and runs no probe, so hand it the rendered evidence instead." Capture this
  message to the report path yourself.
