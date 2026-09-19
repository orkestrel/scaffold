# Unit 7 — the catalog and editorial screens

`implementer` — Opus 5, native Claude subagent, checkout
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer from `b4b5b0f`.

## 1. Done / not done

| #   | Criterion                                                    | State | Evidence                                                                                    |
| --- | ------------------------------------------------------------ | ----- | ------------------------------------------------------------------------------------------- |
| 1   | `oxfmt --check` over owned files                             | done  | `All matched files use the correct format.` on 24 files                                     |
| 2   | `oxlint --deny-warnings` over owned files                    | done  | exit 0, no diagnostics                                                                       |
| 3   | `npm run check`                                              | done  | exit 0; `tsc` root, `tsc` app/core, `vue-tsc` app/browser                                   |
| 4   | No style attribute, SFC style block, CSS, package, `any`, `as`, `!`, suppression | done | sweep below; `app/browser/styles/` and `package.json` absent from `git status` |
| 5   | Every screen composes from the primitives; each detail screen ends in a continuation with one primary action; no invented related record | done | § 2 |
| 6   | Every listing paints its count and its empty state in the record slot, keeps its filters and its clear path, and separates an empty collection from a filtered miss | done | § 2; `empty` and `miss` notices proven per screen |
| 7   | Every detail screen paints its miss inside the page frame; `/shop/:slug` paints its partial state | done | miss cases in `ProductView`, `ArticleView`, `ItemView`; partial case in `ItemView` |
| 8   | No eyebrow repeats its heading; page heads align consistently | done  | § 3 frames; `Frame` has no eyebrow member, and the magazine head and filter row now start   |
| 9   | Every compared figure carries `figures-tabular`               | done  | `ShopView` fact case reads the class; `ItemView` figure case reads `#30040`, `$78.00`, the ISBN |
| 10  | Every external destination is distinguishable by sight        | done  | `ShopView` and `ItemView` continuation cases; § 3 shop frames                                |
| 11  | `npm run test:app:browser`                                    | done  | Test Files 38 passed (38), Tests 129 passed (129)                                            |
| 12  | `npm run test:journey` green for all four projects, integration suite unchanged | done | Test Files 4 passed (4), Tests 68 passed \| 4 skipped (72); `tests/app/browser/integration.test.ts` and `tests/app/browser/setup.ts` absent from `git status` |
| 13  | Capture frames written and read                               | done  | `VITE_CAPTURE=true npm run test:journey` → Test Files 4 passed (4), Tests 72 passed (72); § 3 |

Banned-construct sweep, the command and its result:

```
grep -rnE '<style|style="|:style|@ts-|eslint-disable|oxlint-disable| as [A-Z]| any\b' <the eight SFCs, the four
  centralized modules, and every suite under tests/app/browser/components/>
```

No hit outside `as const` in a test data table. No `<style>` block, no `style` attribute, no
suppression directive, no type assertion, no non-null assertion, no dependency added.

### The failing proofs

**The seven screens.** One command, both readings:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser \
  tests/app/browser/components/ProductsView.test.ts tests/app/browser/components/ProductView.test.ts \
  tests/app/browser/components/MagazineView.test.ts tests/app/browser/components/ArticleView.test.ts \
  tests/app/browser/components/MarketplaceView.test.ts tests/app/browser/components/ShopView.test.ts \
  tests/app/browser/components/ItemView.test.ts
```

- **Red**, with the new cases in place and the seven views still at `b4b5b0f`:
  `Tests 29 failed | 7 passed (36)`.
- **Green**, with the views recomposed: `Tests 36 passed (36)`.

Every new case reddened against the shipped views. The cases that carried the brief's named defects:

| Case                                                                                    | Baseline failure                                                     |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `ProductView > ends in one primary action, a route to the desk, and the listing`         | the detail screen renders no control at all                          |
| `ProductView > paints the miss inside the page frame`                                    | the miss is a bare `h1` and a bare link                              |
| `MagazineView > starts its head and its filters at the same edge`                        | the head and the filter row are centred                              |
| `MagazineView > counts the issue and keeps its filters when a category matches nothing`  | no count, and the miss is an `alert` rather than a notice            |
| `MagazineView > announces an issue holding no articles and drops the filters it cannot operate` | an empty issue renders an empty grid and no notice            |
| `ArticleView > puts the headline before the category band`                               | the band is painted above the `h1`                                   |
| `ArticleView > ends in the next article in the issue and a way back to it`               | the article ends at its last paragraph                               |
| `MarketplaceView > bounds the search field to the words a reader types`                  | the field measures 927 px at 1280                                    |
| `MarketplaceView > keeps one clear path while a search still matches`                    | a search that matches offers no way back to the whole sample         |
| `ShopView > ends in the external commit and the in-app action, each distinguishable`     | `Live catalog` carries no external cue and names no host             |
| `ItemView > omits the ISBN line and names the gap on a book that has none`               | a book with no ISBN says nothing about the gap                       |
| `ItemView > ends in the external commit, the in-app action, and the return`              | `Pay a bill` is named in prose and links nowhere                     |

The red reading was taken by writing each view's `b4b5b0f` content back with `git show`, never with
`git checkout` or `git restore`.

**`Entry`'s `rank`.** `npx vitest run … --project app:browser tests/app/browser/components/Entry.test.ts`
reported `Tests 1 failed | 3 passed (4)` with `expected [ 'H3' ] to deeply equal [ 'P', 'H3' ]`
before `Entry.vue` painted the marker, and `Tests 4 passed (4)` after.

**`followArticle`.** `npm run test:app:core` reported `Tests 2 failed | 31 passed (33)` with
`TypeError: followArticle is not a function` before the helper existed, and `Tests 33 passed (33)`
after.

**`readHost` and `shellHref`.** `npx vitest run … tests/app/browser/helpers.test.ts` reported
`Test Files 1 failed (1)` with
`SyntaxError: The requested module '/app/browser/index.ts' does not provide an export named 'readHost'`
before the promotion, and `Tests 13 passed (13)` after.

## 2. Screen by screen

Every screen takes `Frame` for its head, its section rhythm, and its continuation. Every listing's
record slot renders exactly one of: an `empty` notice for a collection with no members, a `miss`
notice for a filter or a search that matched nothing, or the count row and the records. Every count
takes the `X of Y in this <collection>` form, so it states the result context in the filtered case
and needs no plural of its own.

### `/products`

**Regions.** `Frame` head; one `Product offerings` region holding the `Every product` heading, the
count, and the grid; the continuation.

**The featured desk.** `RoughNotes-Pro` is the first `Entry` in the grid and states its standing
through the new `rank` member, painted as the gold-ruled `— MOST REQUESTED` marker above its title.
I took the structural answer first and rejected it on the frame — see § 4. Every entry carries
`Included` as its fact, derived from the record's own inclusion list, which is the fact a reader
compares across desks.

**States.** A catalog with no products paints an `empty` notice carrying `Contact`. There is no
filter on this screen, so it owes no miss.

**Continuation.** `The Indianapolis office will help you choose between the desks.` then `Contact`
as the single primary.

**Narrow.** One card per row at 390; the marker sits above its title inside the card.
**Expansion.** Two across at `md`, three at `xl`, matching home's product grid.

### `/products/:slug`

**Regions.** `Frame` head carrying the name, the summary as the lead, and the `Home / Products /
<name>` trail; a `Split :span="7"` with `Included` as the primary region and the quiet
`Who it is for` panel beside it; the continuation.

**F2 closed.** The screen ends in `Get started` (primary, to subscribe), `Ask about this product`
(outline, to contact), and `All products` (a plain link). Three ranks rather than three peers, which
is the lesson F8 left on the about screen. No related record is invented: `Product` carries no
relation and none was derived.

**States.** An absent slug paints the `Products` frame with its trail and a `miss` notice carrying
`That page is not in this catalog.` and `All products` as the recovery.

**Narrow.** The regions stack; the continuation's controls stack and keep their ranks.

### `/magazine`

**Regions.** `Frame` head — the `MAGAZINE` eyebrow is gone with F9, and the head, the filter row,
the count row, and the records now all start at the container's edge with S5. Then the category
filter row, the `Articles` heading with its count, and the grid of entries.

**Entries.** Every article is an `Entry` carrying `Category` and `Issued` as facts, the same shape
home's issue cards took in unit 6. The category tone band does not survive on the listing — see § 6.

**States.** A filter that matches nothing paints a `miss` notice carrying `No articles in this
category.`, the count still reading `0 of 7 in this issue`, the filter row still holding the
reader's choice, and `Show all articles` as the recovery. An issue holding no articles paints an
`empty` notice and drops the filter row it cannot operate.

**Continuation.** `Every issue reaches licensed agents free, in print and digital.` then
`Get started` primary and `Publications` secondary.

**Narrow.** The filter row wraps to three rows of controls and stays start-aligned; the count stays
on the heading's row.

### `/magazine/:slug`

**Regions.** `Frame` head with the title, the dek as the lead, and the `Home / Magazine / <title>`
trail; the category band as the article's figure, the byline, and the body at `measure`; the
continuation.

**The band moved.** `Frame` owns the `h1`, so the band now follows the headline and the standfirst
instead of preceding them. That is the ruling on the narrow-height unknown — see § 4.

**Continuation.** `Next in this issue` heading, the next article as an `Entry`, then
`Read the magazine` as the quiet return. The next article is derived: every fixture article carries
the same `issued` date, so the catalog's order is the issue's running order, and
`followArticle` returns the record after this one, wrapping past the last. An issue holding one
article returns `undefined` rather than the article the reader is on, and the continuation then
carries the return alone.

**States.** An absent slug paints the `Magazine` frame with its trail and a `miss` notice carrying
`Read the magazine` as the recovery.

### `/marketplace`

**Regions.** `Frame` head — the `INSURANCE MARKETPLACE` eyebrow is gone with F9; the bounded search
form; the `Markets` heading with its count; the rows; the continuation.

**The field is bounded.** The search input takes `col-12 col-sm-8 col-lg-5` and measures 456 px at
1280 instead of 927. Its submit takes `btn-primary`: gold narrows to the commit on navy, and this
search sits on paper.

**Rows, not entries.** A `Market` has no detail route, and `Entry` requires one real destination. A
market therefore stays a row rather than becoming an entry with a fabricated href. Each row now uses
its width: the name, the industry, and the notes stay bounded at `measure` on the left, and the
coverage list sits at the row's end.

**States.** A search that matches nothing paints a `miss` notice carrying `No markets match this
search.`, the count reading `0 of 12 in this sample`, the query still in the field, and
`Clear search` as the recovery. A search that matches carries `Clear search` once, beside the count.
Before any search there is no clear control at all, which is what the journey's refusal assertion
requires. A sample holding no markets paints an `empty` notice and drops the search form.

**Continuation.** `Advertising in the Insurance Marketplace starts with the rate card.` then
`Media kits` as the single primary.

### `/shop`

**Regions.** `Frame` head; the department filter row, start-aligned with S5; the `Items` heading
with its count; the grid of entries; the continuation.

**Entries.** Every SKU is an `Entry` carrying `Catalog` and `Price` as facts, both in tabular
figures — the figures a buyer compares down a column.

**The actions moved to the continuation.** The three-control row that sat under the lead is now the
screen's ending: `Live catalog` (external, primary), `Order form (PDF)` (external, outline), and
`Pay a bill` (in-app, plain link), with `Live orders open on shoppingcart.roughnotes.com.` beneath
them. Each external destination carries `bi-box-arrow-up-right` and names its host outside the
anchor, so the link's accessible name is still exactly `Live catalog`; the in-app control carries
neither. S6 closed.

**States.** A department holding nothing paints a `miss` notice carrying `No items in this
department.`, the count, the filter row, and `Show all items`. A catalog holding no items paints an
`empty` notice and drops the filter row.

### `/shop/:slug`

**Regions.** `Frame` head with the name, the summary as the lead, and the `Home / Shop catalog /
<name>` trail; a `Split :span="7"` with the catalog record as the primary region and the price panel
beside it; the continuation.

**The record.** `Catalog` and, when the record publishes one, `ISBN`, as a definition list in
tabular figures. An absent ISBN omits its row; nothing paints an empty label.

**The partial state.** A **book** with no published ISBN paints a `partial` notice —
`No published ISBN` — naming the catalog code as the identifier the live listing uses, and carrying
`Contact` as the recovery scoped to the gap. A calculator wheel or a supply with no ISBN is a
complete record, not a partial one, so it paints nothing: the skill's rule is that missing is not
zero, and claiming a gap where none exists invents a defect. The state is unreachable in the shipped
fixtures, where both books carry ISBNs, and is proven through the `CatalogOptions` seam the plan
names.

**Continuation.** `Live catalog` (external, primary), `Pay a bill` (in-app, outline — the brief's
"named in prose without linking it" is closed), and `All shop items` (plain link), with the host
line beneath. The gold `btn-warning` left this screen: the panel is paper, not navy.

**States.** An absent slug paints the `Shop catalog` frame with its trail and a `miss` notice
carrying `All shop items`.

## 3. The rendered evidence

Frames written by `VITE_CAPTURE=true npm run test:journey` on 2026-09-16 into
`tmp/capture/states/`. Each reading is from a crop produced by `tmp/units/u6-frame.mjs`, the
instrument unit 6 added; the crops are retained beside it as `tmp/units/u7-*.png`.

**`product-detail--light-1280.png`** (1280×1287).
The trail reads `Home / Products / RoughNotes-Pro`, the `h1` is the product name, and the lead is
its summary. The gold-ruled `— MOST REQUESTED` marker sits inside the primary region above
`Included`, so no eyebrow precedes the title. The `Who it is for` panel ends at y≈595 while the
inclusion list ends at y≈623: the two regions keep their own heights. The screen ends in a rule,
one line of copy, and then `Get started →` solid navy, `Ask about this product` outline, and
`All products` as plain text. **F2 closed** — the baseline frame ended at the last inclusion with no
control of any kind.

**`shop-detail--light-1280.png`** (1280×1289).
`Coverages Applicable` with its trail, then `— BOOKS`, `Catalog record`, and the pair
`Catalog #30040` / `ISBN 978-1-56461-339-4` in tabular figures, beside the `$78.00` panel. The
continuation reads `Live catalog ⧉` solid navy, `Pay a bill` outline, `All shop items` plain, then
`Live orders open on shoppingcart.roughnotes.com.` **S6 closed** — the external control carries the
open-in-new glyph where the baseline painted `bi-arrow-right`, the in-app control carries no glyph,
and the host is named outside every anchor. **The `Pay a bill` dead end is closed**: it is a control
now, not a sentence.

**`shop-listing--light-1280.png`** (1280×1804).
No `SHOP` eyebrow above `Shop catalog` (**F9 closed**). The filter row starts at the head's edge
(**S5 closed**) and reads as one group: four controls of one height, an 8 px gap, the active one
filled navy. `Items` sits left with `5 of 5 in this catalog` at the container's right edge. The five
cards are one shape, their `Catalog` and `Price` facts bottom-aligned across each row and rendered
in tabular figures. None carries a rank marker, which is the `rank` member staying absent where no
standing exists. The continuation carries both external controls with their glyphs and the host
line.

**`magazine-empty--light-1280.png`** (1280×1303).
No `MAGAZINE` eyebrow over `Magazine` (**F9 closed**), and the head, the filter row, the count row,
and the notice all start at x=52 (**S5 closed**). `Program business` stays selected and filled; the
count reads `0 of 7 in this issue`; the notice carries the magnifier mark, `No articles in this
category.`, a bounded explanation, and `Show all articles`. The filters the reader must undo the
result with are all still on screen.

**`magazine-empty--light-390.png`** (390×2017).
One column throughout. The filter row wraps to three rows of controls, still start-aligned and still
reading as one group. `Articles` and `0 of 7 in this issue` share one line. The notice stacks mark,
title, bounded prose, then its recovery. The continuation stacks `Get started →` full width above
`Publications`, ranks intact. No horizontal overflow at any region.

**`marketplace-miss--light-1280.png`** (1280×1381).
No `INSURANCE MARKETPLACE` eyebrow over the `h1` (**F9 closed**). The search field runs from x=80 to
x=536 — **456 px against the 927 px the brief named** — with `Search markets →` beside it in navy
rather than gold. `Markets` sits left with `0 of 12 in this sample` at the right edge, so the miss
keeps its result context. The notice carries `No markets match this search.`, its explanation, and
one `Clear search`; the field still holds `zzzz-no-such-market`.

**Frames the capture registry does not carry.** `/products`, `/magazine/:slug`, `/magazine`, and
`/marketplace` have no registered state, and the `/products` ruling had to be judged on a render. I
shot them with a throwaway probe — `tmp/units/u7-frames-probe.txt` holds the instrument and the
command — read them, and deleted the probe from `tests/`. The frames are retained as
`tmp/units/u7-probe-*.png`.

- **`u7-probe-products-1280.png`, structural answer** (1280×1968): the spotlight read worse than the
  marker. The `h2` `Most requested` in the same serif as `RoughNotes-Pro` competed with the record's
  own name, the primary column ended 160 px above the panel beside it, and `More products` implied
  the spotlight had been a product while presenting it as a page section.
- **`u7-probe-products-390.png`, structural answer** (390×3578): the spotlight ran roughly 700 px
  before the reader reached a second product.
- **`u7-probe-products-1280.png`, after the widening** (1280×1623): six comparable cards, the first
  carrying `— MOST REQUESTED` above its title. The rank is visible, the grid is one shape, and the
  page is 345 px shorter.
- **`u7-probe-article-390.png`** (390×2198): trail, headline, dek, then the band, then the byline and
  the body. The headline meets the reader at y≈150 instead of after a 168 px band.
- **`u7-probe-article-1280.png`**: the continuation reads rule, `Next in this issue`, the next
  article as an `Entry` card carrying its own `Category` and `Issued`, then `Read the magazine`.
- **`u7-probe-marketplace-1280.png`**: before the row change the notes stopped at 640 px and the
  right half of every row was empty; after it the coverage list sits at the row's end and the page
  is 365 px shorter.

## 4. Rulings on the unknowns

**`Entry` widens by `rank`, and the structural answer is on the record as the thing it replaced.**
I built the distinct region first, rendered it at 1280 and 390, and read it. The reading is in § 3.
The spotlight loses the marker's meaning — a rank stated as a heading in the record's own typeface
reads as a section, not as a standing — and it costs a long prologue at 390. So `EntryOptions` gains
one member, `rank`, declared in `app/browser/types.ts` and typechecked before `Entry.vue` painted it.

- **The consumer is real and present.** `/products` renders it today, on the record
  `FEATURED_PRODUCT` names. Nothing else passes it, and nothing was added in anticipation.
- **The one-link invariant holds.** `rank` is a `<p>` above the title. The card's only interactive
  element is still the title's stretched link, and `Entry.test.ts` reads that in the same case.
- **The axis is named.** A marker above a repeated record states its standing among the records it
  sits with, which is what `rank` means. `mark` was unavailable: `ShellLink.mark` and `NOTICE_MARKS`
  already use that word for a Bootstrap Icons class, and one concept keeps one term.
- No second member was added and no other primitive was touched.

**The category tone bands survive on the article, not on the listing, and they no longer precede a
headline.** Adopting `Entry` on `/magazine` is what makes every repeated record in the application
one shape, and `Entry` has no slot for a band — so the listing states the category as a fact and the
band stays on `/magazine/:slug`. There it now follows the headline and the standfirst, because
`Frame` owns the `h1`. That answers the narrow-height question without touching the 10.5 rem
`.tone` rule, which `app/browser/styles/` owns: at 390 the band costs a third of a screen between
the dek and the byline, which is where a magazine puts its opening image, rather than a third of a
screen before the reader learns what the article is.

**The filter rows read as a group without the pill radius.** Read on
`magazine-empty--light-1280.png`, `magazine-empty--light-390.png`, and
`shop-listing--light-1280.png`. Three things carry the grouping: one height across every control, a
tight 8 px gap that separates the row from everything above and below it, and exactly one filled
control against outlines. At 390 the row wraps to three lines and still reads as one object. Nothing
needs the radius back.

**The next article is the next record in the catalog's order, and that order is the issue's.** Every
fixture article carries `issued: '2026-09-01'`, so the collection is one issue and its order is the
running order a reader follows. `followArticle` wraps past the last record, so the continuation
always offers a real article rather than a dead end. This is the honest derivation rather than an
arbitrary one: it uses the only ordering the data has, and it is the same order the listing paints.
It is not the related-record relation the plan refuses — no relation is invented, and the record it
returns is the one the reader would meet next in the listing.

## 5. Observations

**Wall-clock**, all inside this unit's own exec on a loaded host: `npm run test:app:browser` 22.23 s,
`npm run test:journey` 33.85 s, `VITE_CAPTURE=true npm run test:journey` 41.85 s. `npm test` was not
run here. Take the authoritative readings from an independent verifier on an idle host, per
`.agents/orchestration.md` § Writing concurrency rule 10.

**Nothing in the journey suite moved.** Every accessible name the integration suite resolves is
unchanged and every `waitForText` string it waits on is still painted: `Choose the desk your agency
needs`, `RoughNotes-Pro` inside the `Product offerings` region, `Policy Forms & Manual Analysis`,
`The producer toolkit`, `Coverage, markets, and agency practice`, `Program business`,
`No articles in this category.`, `Show all articles`, `Mass shootings; mass confusion?`,
`Search a fixture sample of specialty markets`, `Restaurant general liability`,
`Coverage or industry`, `Search markets`, `No markets match this search.`, `Clear search`,
`A fixture sample of books`, `Live catalog`, `Coverages Applicable`, `Catalog #30040`, `$78.00`, and
`Pay a bill`. Two of those needed care and are recorded as design constraints rather than
coincidences:

- `Show all articles` and `Clear search` exist **only** in their miss states, because the suite
  asserts the exact refusal sentence for each before the filter or the search runs. A clear control
  rendered unconditionally would have turned that refusal into `is not visible and focus-reachable`.
- `Live catalog` and `Pay a bill` each appear **once** on `/shop`, because `resolveRendered` refuses
  an ambiguous name. That is why the shop's action row moved into the continuation rather than being
  duplicated there.

**`Catalog #30040` survives the definition list.** `readPage` reads `innerText`, which separates
block elements, so `dt` `Catalog` followed by `dd` `#30040` renders as that string. My own first
reading of it used `textContent`, which does not, and the case failed until it read `innerText` the
way the journey does.

**Ancillary decisions recorded.**

- The count takes `X of Y in this <collection>` on every listing, never a bare total, so one
  expression serves the filtered and the unfiltered case and no reading is ever ungrammatical at a
  count of one.
- `/products` states `Included` as its fact — the size of the record's own inclusion list — which is
  the same class of derived catalog fact the publications desks carry.
- The shop entries carry `Catalog` and `Price`; the department is the filter axis and the filter row
  states it, so it is not repeated on every card.
- The repeated `bi-building` tile left the marketplace rows. Twelve identical glyphs carry nothing
  and they cost the row's start edge.
- The product and item detail panels keep their icon tiles. Those panels are not entries, the glyph
  occludes nothing there, and removing it would strand `PRODUCT_MARKS` and `DEPARTMENT_MARKS`.
- Empty-state and miss-state prose is written inline in each view, as unit 6 wrote its leads and
  continuation lines. `COPY` gained one line, `ask`, because `Ask about this product` is a control
  label and the suite resolves it.
- `/products` lists in catalog order and marks the featured record wherever it sits, rather than
  sorting it to the front. The fixture already carries it first.
- Section regions carry an `aria-label` only where a journey resolves one — `Product offerings`.
  Elsewhere the region's `h2` names it, so no `aria-labelledby` can point at a heading a state
  branch did not render.

**Two suites constrain these screens and both still pass.** `styles/signature.test.ts` requires
`.card.lift` on home, which `Entry` still renders, and `App.test.ts` requires the only
`ul[aria-label]` elements to be the utility bar's, which the new sections respect by labelling a
`section` rather than a list.

## 6. What I did not close, and why

**The reduced-catalog mount is written once per suite.** `ProductsView`, `MagazineView`,
`MarketplaceView`, `ShopView`, and `ItemView` each declare a local `open…` helper that builds an
application over `createCatalog({ … })`, following the precedent unit 6 set with `openEmptyMedia`.
They are near-duplicates, which `.claude/rules/tests.md` names a defect, and the consolidation
belongs in `tests/app/browser/setup.ts` — unit 9's file, off-limits to me. Report-only patch:

```ts
// tests/app/browser/setup.ts, beside mountView
/**
 * Mounts a view over an application whose catalog is built from `options`.
 *
 * @param component - The view to mount
 * @param options - The fixture collections the catalog reports
 * @returns The host, controller, and storage
 */
export function mountCatalog(component: Component, options: CatalogOptions): JourneySurface {
	clearSurface()
	const store = createMemoryStorage()
	const app = createApplication({ catalog: createCatalog(options), storage: store })
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(component)
	vue.provide(APPLICATION_KEY, app)
	vue.mount(host)
	TEARDOWNS.push(() => {
		vue.unmount()
		host.remove()
		app.destroy()
	})
	return { host, app, storage: store }
}
```

Applying it rewrites the five local helpers into one call each. I did not write it, and I did not
write a test that imports a function that does not exist yet.

**`Entry.test.ts` is not in my owned list.** The brief grants `Entry.vue` and `types.ts` for the
widening and names no suite for it. A widened primitive with no proof is a hole, so I added exactly
one case to the mirrored suite and changed nothing else in it. Flagging it as the one file I touched
that the scope did not name.

**Guide parity.** `guides/README.md` documents none of this: the `rank` member, `followArticle`,
`readHost`, `shellHref`, `COPY.ask`, the data states each screen paints, or the not-applicable
ruling on `loading` and a fetch `error`. Unit 9 owns the guide and `tests/guides.test.ts`.

**`COPY` gained a line and stranded none.** A reader over `app/browser/**` outside `constants.ts`
reports `home` and `about` as the only lines no module consumes, which is the pair unit 6 named and
this unit did not change. `feature` still has its consumer on home. Unit 9's parity pass rules on
that pair.

**The marketplace has no detail route, so its records are rows.** Criterion 5 says every screen
composes from the primitives; `/marketplace` composes from `Frame` and `Notice`, and its records
stay rows because `Entry` requires one real destination and a `Market` has none. Giving it a
fabricated href is the invented relation the plan refuses.

**One reading I did not take.** The contrast of the `partial` notice's quiet surface in dark mode.
It takes the same `bg-body-tertiary` panel as the `empty` and `miss` notices unit 5 shipped and unit
6 proved on `/media`, and nothing about it is new here, but that is an inherited reading rather than
a measurement of this state. It belongs with the resolved-style matrix widening in unit 9.
