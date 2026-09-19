# Rough Notes guides

> Coverage knowledge for independent agents: products, magazine, marketplace, company pages, shop catalog, and subscribe.

This workspace is a private Vue 3 application. It publishes no library, so the `src` half of the
project model is absent and `app/core` plus `app/browser` are the whole surface. The `AGENTS.md`
file at the repository root names where the coding contract, the rule files, and the skills resolve.

Read the concept index for what this application documents about itself. Read the directory index
for the package guides this repository vendors.

## Concept index

Each row runs spec ↔ source ↔ tests. The workspace builds no showcase of a public API, so that
column is absent.

| Concept                 | Spec                                              | Source                                                                                                                                                                                                      | Tests                                                                                                                                                                                                                                 |
| ----------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The catalog             | [The catalog](#the-catalog)                       | `app/core/types.ts`, `app/core/Catalog.ts`, `app/core/constants.ts`, `app/core/helpers.ts`                                                                                                                  | `tests/app/core/Catalog.test.ts`, `tests/app/core/helpers.test.ts`                                                                                                                                                                    |
| Subscription parsing    | [Subscription parsing](#subscription-parsing)     | `app/core/parsers.ts`, `app/core/validators.ts`                                                                                                                                                             | `tests/app/core/parsers.test.ts`, `tests/app/core/validators.test.ts`                                                                                                                                                                 |
| Inquiry parsing         | [Inquiry parsing](#inquiry-parsing)               | `app/core/parsers.ts`                                                                                                                                                                                       | `tests/app/core/parsers.test.ts`                                                                                                                                                                                                      |
| Invoice parsing         | [Invoice parsing](#invoice-parsing)               | `app/core/parsers.ts`                                                                                                                                                                                       | `tests/app/core/parsers.test.ts`                                                                                                                                                                                                      |
| The request contract    | [The request contract](#the-request-contract)     | `app/browser/types.ts`, `app/browser/controllers/ApplicationController.ts`                                                                                                                                  | `tests/app/browser/controllers/ApplicationController.test.ts`                                                                                                                                                                         |
| Hash navigation         | [Hash navigation](#hash-navigation)               | `app/browser/routes.ts`, `app/browser/controllers/ApplicationController.ts`                                                                                                                                 | `tests/app/browser/routes.test.ts`, `tests/app/browser/controllers/ApplicationController.test.ts`                                                                                                                                     |
| The knowledge shell     | [The knowledge shell](#the-knowledge-shell)       | `app/browser/App.vue`, `app/browser/helpers.ts`                                                                                                                                                             | `tests/app/browser/App.test.ts`, `tests/app/browser/helpers.test.ts`                                                                                                                                                                  |
| The page primitives     | [The page primitives](#the-page-primitives)       | `app/browser/components/Frame.vue`, `app/browser/components/Split.vue`, `app/browser/components/Entry.vue`, `app/browser/components/Notice.vue`, `app/browser/components/Brand.vue`, `app/browser/types.ts` | `tests/app/browser/components/Frame.test.ts`, `tests/app/browser/components/Split.test.ts`, `tests/app/browser/components/Entry.test.ts`, `tests/app/browser/components/Notice.test.ts`, `tests/app/browser/components/Brand.test.ts` |
| The shell destinations  | [The shell destinations](#the-shell-destinations) | `app/browser/constants.ts`, `app/browser/helpers.ts`                                                                                                                                                        | `tests/app/browser/App.test.ts`, `tests/app/browser/helpers.test.ts`                                                                                                                                                                  |
| Color mode              | [Color mode](#color-mode)                         | `app/browser/helpers.ts`, `app/browser/MemoryStorage.ts`, `app/browser/styles/_theme.scss`                                                                                                                  | `tests/app/browser/helpers.test.ts`, `tests/app/browser/MemoryStorage.test.ts`, `tests/app/browser/styles/theme.test.ts`                                                                                                              |
| Products                | [Products](#products)                             | `app/browser/components/ProductsView.vue`, `app/browser/components/ProductView.vue`, `app/core/helpers.ts`                                                                                                  | `tests/app/browser/components/ProductsView.test.ts`, `tests/app/browser/components/ProductView.test.ts`                                                                                                                               |
| Publication desks       | [Publication desks](#publication-desks)           | `app/browser/components/PublicationsView.vue`                                                                                                                                                               | `tests/app/browser/components/PublicationsView.test.ts`                                                                                                                                                                               |
| Magazine filter         | [Magazine filter](#magazine-filter)               | `app/core/helpers.ts`, `app/browser/components/MagazineView.vue`                                                                                                                                            | `tests/app/core/helpers.test.ts`, `tests/app/browser/components/MagazineView.test.ts`                                                                                                                                                 |
| Reading an article      | [Reading an article](#reading-an-article)         | `app/core/helpers.ts`, `app/browser/components/ArticleView.vue`                                                                                                                                             | `tests/app/core/helpers.test.ts`, `tests/app/browser/components/ArticleView.test.ts`                                                                                                                                                  |
| Marketplace search      | [Marketplace search](#marketplace-search)         | `app/core/helpers.ts`, `app/browser/components/MarketplaceView.vue`                                                                                                                                         | `tests/app/core/helpers.test.ts`, `tests/app/browser/components/MarketplaceView.test.ts`                                                                                                                                              |
| Shop catalog            | [Shop catalog](#shop-catalog)                     | `app/core/helpers.ts`, `app/browser/components/ShopView.vue`, `app/browser/components/ItemView.vue`                                                                                                         | `tests/app/core/helpers.test.ts`, `tests/app/browser/components/ShopView.test.ts`, `tests/app/browser/components/ItemView.test.ts`                                                                                                    |
| Subscribe               | [Subscribe](#subscribe)                           | `app/browser/components/SubscribeView.vue`, `app/browser/components/SubscribeForm.vue`                                                                                                                      | `tests/app/browser/components/SubscribeView.test.ts`, `tests/app/browser/components/SubscribeForm.test.ts`                                                                                                                            |
| Newsletter              | [Newsletter](#newsletter)                         | `app/browser/components/NewsletterView.vue`                                                                                                                                                                 | `tests/app/browser/components/NewsletterView.test.ts`                                                                                                                                                                                 |
| Media kits              | [Media kits](#media-kits)                         | `app/browser/components/MediaView.vue`, `app/browser/helpers.ts`, `app/core/constants.ts`                                                                                                                   | `tests/app/browser/components/MediaView.test.ts`, `tests/app/browser/helpers.test.ts`                                                                                                                                                 |
| Contact                 | [Contact](#contact)                               | `app/browser/components/ContactView.vue`, `app/browser/components/ContactForm.vue`                                                                                                                          | `tests/app/browser/components/ContactView.test.ts`, `tests/app/browser/components/ContactForm.test.ts`                                                                                                                                |
| Pay a bill              | [Pay a bill](#pay-a-bill)                         | `app/browser/components/PaymentView.vue`, `app/browser/components/PaymentForm.vue`                                                                                                                          | `tests/app/browser/components/PaymentView.test.ts`, `tests/app/browser/components/PaymentForm.test.ts`                                                                                                                                |
| The data states         | [The data states](#the-data-states)               | `app/browser/components/Notice.vue`, `app/browser/constants.ts`                                                                                                                                             | The journey family in `tests/app/browser/integration.test.ts`                                                                                                                                                                         |
| The focus ring          | [The focus ring](#the-focus-ring)                 | `app/browser/styles/_theme.scss`                                                                                                                                                                            | `tests/app/browser/styles/theme.test.ts`, the matrix family in `tests/app/browser/integration.test.ts`                                                                                                                                |
| Proving the surface     | [Proving the surface](#proving-the-surface)       | `tests/app/browser/setup.ts`                                                                                                                                                                                | `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.test.ts`                                                                                                                                                            |
| The test infrastructure | [Proving the surface](#proving-the-surface)       | `tests/setup.ts`, `tests/setupBrowser.ts`                                                                                                                                                                   | `tests/app/browser/setup.test.ts`                                                                                                                                                                                                     |

## The catalog

`Catalog` is the host-independent collection of products, articles, markets, shop SKUs, media-kit assets, and timeline eras.

- Lookups are `product(id)`, `article(id)`, `market(id)`, `sku(id)`, `asset(id)`, and `era(id)`. Absence is `undefined`.
- Listing methods return the frozen collections. Filtering and search live in helpers so the class
  does not grow a toolbox of query modes.
- Featured status is derived by `matchesFeatured` against `FEATURED_PRODUCT`. It is not stored on
  the product record.
- Magazine `category` is the article discriminant: coverage, specialty, management, technology,
  personal, program. Absence of a filter is `undefined`.
- Shop `department` is the SKU discriminant: books, wheels, supplies. `filterSkus` returns every
  SKU when the department is omitted. `price` is integer USD cents. `formatPrice` paints it.
  `formatCode` paints a `#` prefix only on digit-only catalog numbers.
- Media-kit `channel` is magazine, marketplace, or banner. `href` is the live public PDF.
- Fixtures are a sample drawn from the public Rough Notes offerings, history, media kits, and shop
  catalog. They are not a scrape of the live directory.

## Subscription parsing

`parseSubscription` owns the form. Submit stays enabled.

- `name` must be a non-empty trimmed string.
- `email` must classify as the contract `email` format after trimming.
- A refusal returns the failed field names. The view paints a focusable summary and `aria-invalid`
  on those fields.

## Inquiry parsing

`parseInquiry` owns the contact form. Submit stays enabled.

- `name`, `company`, `email`, and `phone` are required after trimming.
- `email` must classify as the contract `email` format.
- `phone` must contain a digit.
- `title` and `message` may be omitted. Blank values become `undefined`.
- A refusal returns the failed field names. The view paints a focusable summary and `aria-invalid`
  on those fields.

## Invoice parsing

`parseInvoice` owns the fixture bill-pay form. Submit stays enabled. No card number is collected.

- `customer` and `number` must be non-empty trimmed strings.
- `amount` must parse as a positive dollar amount, optionally with a leading `$`. The stored value
  is integer USD cents.
- A refusal returns the failed field names. The view paints a focusable summary and `aria-invalid`
  on those fields.

## The request contract

`RequestInterface<Value, Field>` is the boundary every form crosses. The application controller
exposes one per domain — `subscription`, `inquiry`, and `payment` — and each carries the same
members, so the owning noun supplies the domain and no member needs a prefix.

- `check(input)` updates feedback and accepts nothing. A field's `input` and `blur` handlers call
  it, and only after a refusal has already painted, so typing never commits a draft.
- `submit(input)` validates, records the accepted value, and emits the domain event.
- `accepted` holds the recorded value, and is `undefined` until a submission succeeds. A view
  reads it to decide between the request and the confirmation; there is no second flag.
- `issues` names the fields the last check refused. `undefined` means unchecked or accepted,
  because submission clears the collection. An empty collection means a checked draft is valid,
  which is what keeps a later edit revalidating. An empty collection is truthy, so paint a summary
  from the named fields rather than from the ref holding a value.

An accepted request stays on the device. Nothing is sent.

## Hash navigation

`createNavigator` from `@orkestrel/router/browser` owns routing. `history` is `false`, so locations
are `#/` paths. The fallback is `/`.

Registered paths: `/`, `/about`, `/publications`, `/newsletter`, `/products`, `/products/:slug`,
`/magazine`, `/magazine/:slug`, `/marketplace`, `/subscribe`, `/media`, `/contact`, `/shop`,
`/shop/:slug`, `/payment`. The shell derives the desk from `location`, which tracks the navigator's
active match. It does not keep a second route flag.

## The knowledge shell

`App.vue` mounts the skip link, the utility bar, the `masthead` `navbar`, the offcanvas menu,
`<main id="main">`, and the footer. `Site` names the navbar, `Content` names main, and `Site footer`
names the footer. Home paints an `Introduction` region. The product listing paints a `Product
offerings` region.

The masthead carries `sticky-lg-top`, so it pins from the `lg` breakpoint up and scrolls away with
the page under it. `app/browser/styles/_signature.scss` reserves `scroll-padding-top` at the same
breakpoint and nowhere else, so an anchor jump, a focus move, and a driver's scroll clear the pinned
chrome (WCAG 2.2 SC 2.4.11) without reserving depth the narrow layout does not need.

Skip to content focuses `main` and does not write a hash the navigator would treat as a miss.
Error-summary links do the same for their fields: they call `focusNode` and prevent the default hash
write. A path change calls `revealView`, which scrolls to the origin and focuses `main`, so the
destination starts at the top rather than at the previous scroll and focus.

The primary action is `Get started`, which opens subscribe. It sits in the masthead at every width,
beside the menu trigger under `lg` and beside the destinations from `lg` up, and again inside the
compact menu. Header destinations are About, Publications, Products, and Shop. Magazine reading and
marketplace search open from the publications hub. Contact is in the compact menu and the footer.
Sign-in is not a fake session: RoughNotes-Pro Login and Advantage-Plus Login stay external
`rel="noreferrer"` links. Shop is in-app. The compact menu is an offcanvas dialog. In-app
destinations there are hash links. The shell hides the dialog when `location` changes. Color mode is
an icon-only masthead toggle named `Use dark theme` or `Use light theme`.

Home is a marketing thesis: a nested-dark hero carrying a nested-light magazine issue card whose own
header nests dark again, a trust band, product cards, a marketplace panel over fixture listings,
issue cards, and a subscribe invite. The invite carries the `Get started` link to the subscribe desk,
not a form. Gold `$warning` fills thesis CTAs; navy `$primary` fills chrome CTAs on paper.
`[data-bs-theme='dark']` inverts that primary fill to `--bs-body-color` with `--rn-navy` type so the
control stays the same navy-and-paper pair on navy islands.

## The page primitives

Every screen composes from the same small set, so a view holds its own copy and nothing else.

- `Frame` is the page frame. `title` is the screen's only `h1`, `lead` is the bounded introduction
  under it, and `trail` renders exactly the steps it receives — the frame invents no root step and
  no level the caller did not declare. The default slot carries the screen's sections and the frame
  spaces them; the `next` slot carries the continuation the screen ends in. A `TrailStep` with no
  `path` is the page the reader is on, and the frame marks it current rather than linking it.
- `Split` is a primary region beside an independent supporting region. `span` is how many of the
  twelve grid columns the primary region takes from 992 px, and the supporting region takes the
  rest; it defaults to 7. Under 992 px the regions stack in reading order. The regions align to
  their top edge and neither stretches to the other's height.
- `Entry` is one repeated collection record. `href` is its single real destination and the title
  carries it, so the entry holds one interactive element and nothing nested inside its stretched
  link. `rank` is the record's standing among the records it sits with, painted over the title as
  text rather than as a control, so the one-link invariant holds; a record with no standing to state
  omits it. The product listing is the one caller that passes it, marking the featured desk
  `Most requested` so the featured product keeps the entry every record takes instead of becoming a
  region of its own. An entry renders only the `EntryFact` rows it receives and looks nothing up.
- `Notice` is one contextual state and its recovery. `category` fixes the announcement, the glyph,
  and the fill. The default slot carries the real recovery control.
- `Brand` is the wordmark: the gradient monogram, `Rough Notes`, and the `Since 1878` mark. The
  masthead and the footer both render it, so the wordmark has one home.

`NoticeCategory` is the axis: `empty` is a collection with no members, `miss` a search or a lookup
that matched nothing, `partial` a record the application holds incompletely, and `refusal` a request
it declined. The union carries no success and no progress member, because a notice reports neither
an outcome nor a wait it did not receive. `refusal` announces assertively through `role="alert"` and
every other category announces politely through `role="status"`, so politeness is derived from the
state rather than carried as a second member that can contradict it. `NOTICE_MARKS` binds one
Bootstrap Icons glyph to each category: `bi-inbox`, `bi-search`, `bi-funnel`, and
`bi-exclamation-triangle`.

## The shell destinations

The shell's navigation is declared data, so the markup renders every region through one loop and no
label is written twice.

- `NAV_ITEMS` is the masthead's in-app destinations in header order. Each label a published word
  already names is taken from `COPY`, so the masthead, the compact menu, and the copy a test
  resolves a destination by cannot drift apart.
- `MENU_ITEMS` is the compact menu: every header destination plus Contact, which the header has no
  room for.
- `UTILITY_GROUPS` is the utility bar's clusters of destinations outside this application — the
  Contact cluster carrying the toll-free number and the published address, and the Logins cluster
  carrying the RoughNotes-Pro and Advantage-Plus logins.
- `FOOTER_GROUPS` is the footer's destinations grouped as the footer paints them: Products,
  Resources, and Company.

A `ShellGroup` carries a `title` and its `ShellLink` members. The footer paints the title as a
heading and the utility bar paints it as the list's accessible name, so a cluster is named whichever
region renders it. A `ShellLink` `destination` is an in-app navigator path when it starts with `/`,
and a complete external or protocol URL otherwise; `shellHref` resolves the first to a `#/` href and
returns the second unchanged. `mark` is the Bootstrap Icons class the link paints beside its label,
and is `undefined` for a link that carries no icon.

## Color mode

`dark` is a boolean. Persistence uses the Web `Storage` interface, defaulting to `localStorage` and
accepting `MemoryStorage` in tests. The document paints `data-bs-theme` as `light` or `dark`.

A navy island nests `data-bs-theme="dark"` with `bg-body text-body`, so copy and icons follow
`--bs-body-color` instead of naming a fixed foreground. The islands are the utility bar, the
offcanvas menu, the footer, home's hero, home's marketplace panel, home's subscribe invite, and the
subscribe desk's own invite. Home's magazine issue card nests `data-bs-theme="light"` with
`bg-body text-body` so it stays paper inside the hero, and that card's header nests dark again for
the issue line.

The company mission, the credo, the team and editorial-board cards, the contact office panel, and a
shop SKU's price panel are quiet `bg-body-tertiary` surfaces rather than navy islands. They follow
the document's mode and own no foreground of their own.

Muted copy uses `text-body-secondary`. Icon tiles use `bg-primary-subtle text-primary-emphasis`.
Check marks use `bg-warning-subtle text-warning-emphasis`. Gold `--rn-accent` is an eyebrow
hairline. It is not information-bearing text. Headings use Georgia, then `ui-serif`, then named
serif fallbacks. Body copy uses the system UI sans stack. There is no webfont request. `$warning` is
the gold metal used for thesis buttons; its foreground is `--rn-navy`.

`_theme.scss` ends each dark repaint at the next mode boundary with
`@scope ([data-bs-theme='dark']) to ([data-bs-theme])`, so a light island inside a dark region keeps
Bootstrap's own button states rather than inheriting the navy inversion.

## Products

The listing paints every offering as an `Entry` with its inclusion count as a fact, and marks the
featured desk `Most requested` through `rank`. A detail paints the desk's audience and inclusions in
a `Split`, and ends on `Get started`, `Ask about this product` — which opens contact — and a plain
link back to `All products`. A slug the fixture catalog does not hold paints a `miss` notice whose
recovery is that same listing link.

## Publication desks

`/publications` is the hub the magazine, the Insurance Marketplace, the newsletter, and the media
kits open from. Each is an `Entry` carrying a fact the catalog derives at render: the magazine names
its issue month through `formatIssued`, the Marketplace names its listing count, and the media kits
name their document count. The newsletter carries no fact, because nothing it holds is countable
this way.

## Magazine filter

`filterArticles` returns every article when `category` is omitted. The Program business filter has
no fixture article, which is the filtered-empty state: the filter row remains and `Show all
articles` clears the filter. That state is a `miss` notice, so it carries the funnel glyph, the
quiet `bg-body-tertiary` surface, and `role="status"` every other non-refusal state carries. An
issue holding no articles at all paints an `empty` notice instead, whose recovery is the
publications hub.

## Reading an article

An article paints its category tone band, its dek as the `Frame` lead, and a trail of Home →
Magazine → the article title. `followArticle` returns the record after this one in the catalog's
order and wraps at the end, so every article offers a next one to read. Every article in one issue
shares its date, so the catalog's order is the issue's running order. A slug the fixture issue does
not hold paints a `miss` notice whose recovery returns to the magazine.

## Marketplace search

`searchMarkets` returns the full sample for a blank query. A non-blank query that hits nothing
returns an empty list. The view keeps the query and offers `Clear search`. That state is a `miss`
notice. A directory with no listings at all paints an `empty` notice whose recovery is contact.

## Shop catalog

`filterSkus` returns every SKU when `department` is omitted. The listing offers All items, Books,
Calculator wheels, and Agency supplies, and a department with no SKU paints a `miss` notice offering
`Show all items`. A SKU detail paints price, catalog code, and ISBN when the listing has one; a book
the live listing identifies by its catalog code alone paints a `partial` notice beside the facts,
because the record is real and one field is absent rather than the record being missing. Live orders
stay on Rough Notes through `Live catalog`. Fixture invoice review is `Pay a bill`. This application
does not take card payment for catalog items.

## Subscribe

The form is `novalidate` so `parseSubscription` owns the rules. The submit control stays enabled. A
refusal focuses the summary `The subscription form refused these entries`. Summary links focus the
named field and leave the hash on this desk. Above the fields the form states what happens to what a
person types, through `COPY.privacy`. An accepted request paints `No subscription was started` in a
`role="status"` line and replaces the form with the entered name and email under a sentence naming
what did not happen. The invite heading stays `What a subscription carries` in either state, because
it describes the real Rough Notes subscription rather than this record.

## Newsletter

`NewsletterView` reuses `SubscribeForm`, so it carries the same notice above its fields. The copy is
the live newsletter pitch. An accepted request paints the same `No subscription was started` status
the subscribe desk paints.

## Media kits

`MediaView` groups fixture `Asset` records by channel and paints each group as a list of rows. A row
carries the document name as an external `rel="noreferrer"` link and, beside it, the host that link
opens on. That host comes from `readHost`, which resolves the destination URL and reports its
hostname, so the external cue is derived from the destination rather than stored beside it and a
record cannot name one host and link to another. The files are not stored in this application. A
channel with no document paints an `empty` notice whose recovery is contact. Advertising
representatives are fixture `Rep` records with live phone and email.

## Contact

The inquiry form is `novalidate` so `parseInquiry` owns the rules. The submit control stays enabled.
A refusal focuses the summary `The inquiry form refused these entries`. Summary links focus the
named field and leave the hash on this desk. The office panel sits beside the form and stays there
through every state, so the published address and number are reachable whether or not the form is.

Above the fields the form states what happens to what a person types, through `COPY.privacy`. An
accepted request paints `No inquiry was sent` and replaces the form with the entered fields under a
sentence naming what did not happen. `title` and `message` are optional, so an accepted inquiry that
holds neither paints a `partial` notice naming what is absent — `You left out a job title and a
message` — with a call to the office as its recovery, rather than painting an empty row for each. An
inquiry holding a title and a message paints no notice.

## Pay a bill

The invoice form is `novalidate` so `parseInvoice` owns the rules. The submit control stays enabled.
A refusal focuses the summary `The payment form refused these entries`. Summary links focus the
named field and leave the hash on this desk. Above the fields the form states that no card number is
collected and what happens to what a person types, through `COPY.privacy`. An accepted request
paints `No payment was made` under a sentence naming what did not happen. Card capture is not on
this surface; `Pay on Rough Notes` is the live billing link.

## The data states

Every screen states what it paints when the catalog is full, when a filter or a search reduces it to
nothing, when the catalog holds no record at all, when a lookup misses, and when a request is
refused or accepted. A screen with no row for a state does not reach it.

| Screen            | Full                                                               | Reduced       | Absent                     | Missed        | Refused                                  | Accepted                                                             |
| ----------------- | ------------------------------------------------------------------ | ------------- | -------------------------- | ------------- | ---------------------------------------- | -------------------------------------------------------------------- |
| `/`               | Hero, trust band, products, marketplace panel, issue cards, invite | —             | —                          | —             | —                                        | —                                                                    |
| `/about`          | Mission, credo, timeline, team, editorial board                    | —             | —                          | —             | —                                        | —                                                                    |
| `/publications`   | Magazine, Marketplace, newsletter, and media-kit entries           | —             | —                          | —             | —                                        | —                                                                    |
| `/products`       | Product entries                                                    | —             | `empty` notice             | —             | —                                        | —                                                                    |
| `/products/:slug` | Audience and inclusions                                            | —             | —                          | `miss` notice | —                                        | —                                                                    |
| `/magazine`       | Filter row and article entries                                     | `miss` notice | `empty` notice             | —             | —                                        | —                                                                    |
| `/magazine/:slug` | Tone band, article, next entry                                     | —             | —                          | `miss` notice | —                                        | —                                                                    |
| `/marketplace`    | Search form and listings                                           | `miss` notice | `empty` notice             | —             | —                                        | —                                                                    |
| `/shop`           | Department row and SKU entries                                     | `miss` notice | `empty` notice             | —             | —                                        | —                                                                    |
| `/shop/:slug`     | Price panel and facts                                              | —             | —                          | `miss` notice | `partial` notice for a book with no ISBN | —                                                                    |
| `/media`          | Document rows per channel and the reps                             | —             | `empty` notice per channel | —             | —                                        | —                                                                    |
| `/subscribe`      | Invite and request form                                            | —             | —                          | —             | Error summary                            | Entered name and email                                               |
| `/newsletter`     | Pitch and request form                                             | —             | —                          | —             | Error summary                            | Entered name and email                                               |
| `/contact`        | Office panel and inquiry form                                      | —             | —                          | —             | Error summary                            | Entered fields, `partial` notice when a title or a message is absent |
| `/payment`        | Invite and invoice form                                            | —             | —                          | —             | Error summary                            | Entered invoice                                                      |

## The focus ring

Focus chrome carries state, so it must reach 3:1 against the surface behind it. The
`app/browser/styles/_theme.scss` file restores a `0.125rem` outline in `--bs-emphasis-color` on the
interactive controls this surface focuses. The matrix family reads that ring on every control it
measures, in every declared variant.

## Proving the surface

The `tests/app/browser/integration.test.ts` file drives the shipped shell the way a person drives
it: every target resolves by its ARIA role and its accessible name through the journey layer
`@orkestrel/test/browser` publishes. Setup helpers live in `tests/app/browser/setup.ts`.

The file declares the families it carries, and one of its own proofs reads that declaration against
what the file proved.

| Family    | Proves                                                                                       |
| --------- | -------------------------------------------------------------------------------------------- |
| Journey   | Each user intent reaches its outcome through the interface                                   |
| Refusal   | Each control the surface withholds, through one exact failure voice                          |
| Matrix    | The contrast, the focus chrome, the authored-class census, and the style escapes per variant |
| Transport | Theme persistence across a second session over the same `Storage`                            |
| Capture   | The registry times the variants, each registered file written to disk                        |

A journey drives each interaction unconditionally. A conditional click is what lets a control that
disappears when the application must still offer it read as a control that was pressed, so every second submit asserts the
control is still reachable and no acceptance has painted, then clicks.

The matrix reads roles rather than named elements. A role names its membership rule and the bar
every member clears, and the reading is the worst member of the population that rule selects, split
between the page surface and any color-mode island, so an island cannot hide behind a page-surface
average. `readSurface` measures text over a declared gradient against that gradient's stops and
takes the worst, because a gradient leaves `background-color` transparent and a walk up the
ancestors would read past it to a fill nobody sees. `readSettled` waits for a control's own
animations to finish before measuring, because a control transitions its fill and its label color
whenever the pointer crosses it, and a reading taken inside that window reports an interpolated
frame no state of the application paints.

Each reader carries its controls through the same path the production population takes: a foreground
that fails against a gradient stop beside one that clears it, and a fixture whose transition is
still running when the unsettled read takes it and finished when the settling read does.

`STATES` registers every screen a person reaches, in each data state a journey drives it to. A
screen with no row there writes no frame, and a design review that cannot see a screen cannot judge
it, so one proof reads the placed set against the registered set and refuses either a state that was
registered and never placed or a state that was placed and never registered.

Each variant pairs a theme with a viewport: `light-1280`, `dark-1280`, `light-390`, and `dark-390`.
One run renders one variant, named by the project's provided `variant`, and writes
`tmp/journeys/<variant>.txt`.

Run one variant, and add `VITE_CAPTURE=true` to write the frames as well:

```sh
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project journey:dark-390
```

This surface has no transition table, so it carries no statechart family and no harness.

## Directory index

Every file that follows mirrors the guide its `@orkestrel` package publishes. Read a mirror for that
package's API, and this repository's own `AGENTS.md` file for how code here is written.

| Guide             | Guide                   |
| ----------------- | ----------------------- |
| [Guide](guide.md) | [Scaffold](scaffold.md) |
