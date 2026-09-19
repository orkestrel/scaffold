# Unit 6 — home and the company screens

`implementer` — Opus 5, native Claude subagent, checkout
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer from `faa0ec7`.

## 1. Done / not done

| #   | Criterion                                                | State | Evidence                                                                        |
| --- | -------------------------------------------------------- | ----- | ------------------------------------------------------------------------------- |
| 1   | `oxfmt --check` over owned files                         | done  | `All matched files use the correct format.` on 9 files                          |
| 2   | `oxlint --deny-warnings` over owned files                | done  | no diagnostics on 9 files, exit 0                                               |
| 3   | `npm run check`                                          | done  | exit 0; `tsc` root, `tsc` app/core, `vue-tsc` app/browser                       |
| 4   | No style attribute, SFC style block, CSS, package, `any`, `as`, `!`, suppression | done | sweep below; `package.json` and `app/browser/styles/` unmodified in `git status` |
| 5   | Four screens compose from the primitives and end in a continuation | done | § 2; ranks named per screen                                             |
| 6   | No prose at container width; no unrelated equal-height pair | done | `AboutView` measure case and mission/credo height case; frames read in § 3    |
| 7   | No card title paints the prose underline; every one keeps heading-with-link | done | `HomeView` underline case reads the computed decoration colour; `Entry` fixes `h3 > a` |
| 8   | Every external destination distinguishable, derived      | done  | `MediaView` host case; `readHost` derives from `Asset.href`                      |
| 9   | Media assets render as a list                            | done  | `MediaView` row case; `media--light-1280.png` in § 3                             |
| 10  | `npm run test:app:browser`                               | done  | Test Files 38 passed (38), Tests 100 passed (100)                               |
| 11  | `npm run test:journey` green for all four projects, integration suite unchanged | done | Test Files 4 passed (4), Tests 68 passed \| 4 skipped (72); `tests/app/browser/integration.test.ts` and `tests/app/browser/setup.ts` absent from `git status` |
| 12  | Capture frames written and read                          | done  | `VITE_CAPTURE=true npm run test:journey` → Test Files 4 passed (4), Tests 72 passed (72); six frames read in § 3 |

Banned-construct sweep, the command and its result:

```
grep -nE '<style|style="|:style|@ts-|eslint-disable| as | any\b|!\.|!\)|![,;]' <the four SFCs and their four suites>
```

Four hits, all prose: `any product`, `any product or service`, `as an entry`, `as a row`. No `<style>`,
no `style` attribute, no suppression directive, no type assertion, no non-null assertion.

### The failing proof

One command, both readings, over the four mirrored suites:

```
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser \
  tests/app/browser/components/HomeView.test.ts tests/app/browser/components/AboutView.test.ts \
  tests/app/browser/components/PublicationsView.test.ts tests/app/browser/components/MediaView.test.ts
```

- **Red**, with the four views restored to their `faa0ec7` content and the new suites in place:
  `Tests 12 failed | 4 passed (16)`.
- **Green**, with the implementation in place: `Tests 16 passed (16)`.

Every new case reddened, and each reddened on its own defect rather than on a missing selector:

| Case                                                                       | Baseline failure                                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `HomeView > paints each repeated record as an entry whose title carries no prose underline` | the product card title paints an opaque underline                         |
| `HomeView > starts the trust line and its wordmarks at the same edge`       | the lead-in and the wordmarks sit on one centred row                      |
| `HomeView > ends in one continuation action and asks for nothing there`     | the invite holds two form inputs and a gold submit                        |
| `AboutView > leaves the mission and the credo at their own heights`         | the credo measures the mission's height, not its own                      |
| `AboutView > bounds every timeline entry to the reading measure`            | era bodies run past 640 px                                                |
| `AboutView > ranks its continuation and leaves the masthead to carry home`  | three peer controls, `Back to home` among them                            |
| `PublicationsView > carries the catalog fact a reader chooses each desk by` | no desk renders a fact list                                               |
| `PublicationsView > lists the newsletters desk once and keeps magazine delivery out of the desks` | `Free magazine delivery` stands as a fifth peer desk    |
| `PublicationsView > ends in the delivery offer the desks no longer repeat`  | the screen ends with no action at all                                     |
| `MediaView > lists every document as a row rather than a full-width card`   | no `li.list-group-item` exists; every asset is an `a.card`                |
| `MediaView > names the host a document opens on without joining it to the link name` | the same, plus no destination cue                                |
| `MediaView > announces a channel holding no documents and offers the advertising desk` | an empty channel renders an empty list and no notice          |

The corrected form of the publications fact case (reading `dt` and `dd` separately rather than the
`dl` text) was re-verified red against the baseline view on its own:
`Tests 3 failed | 1 passed (4)`, with `expected [] to deeply equal [ 'Issue', 'Listings', 'Documents' ]`.

The red reading was taken by writing each view's `faa0ec7` content back over it with `git show`,
never with `git checkout` or `git restore`, and the implementation was restored from a scratchpad
copy taken before the revert.

## 2. Screen by screen

### `/` — home

**Regions.** Navy `hero` band carrying the `h1` — a `Split` with the copy, the one commit, and the
statistics beside the September issue card; a quiet `bg-body-tertiary` trust band; a paper band with
the product listing; the navy `panel` marketplace band as a `Split :span="6"`; a paper band with the
issue listing; and the `invite` plate as the continuation, also a `Split`.

**Primitives.** `Split` four times, `Entry` for both listings. Home does **not** take `Frame`, and
that is a decision rather than an omission — see § 6.

**Continuation.** `invite`, one primary and no secondary: `Get started` → `/subscribe`, painted
`btn-primary`, which `_theme.scss` repaints white-on-navy inside the plate's dark scope. The
embedded `SubscribeForm` left home: the hero already routes to `/subscribe` and the form duplicated
that screen whole. Home's focus order lost three stops as a result.

**Narrow.** At 390 every `Split` stacks in reading order — copy, commit, statistics, then the issue
card; the trust lead-in above its wordmarks; one card per row; the marketplace copy above its
fixture sample; the invite copy above its proof list.

**Expansion.** Listings go one, two at `md`, three at `xl` — moved up from `lg`, because at a 960
container three columns give a 296 px card holding a two-line title and a four-line summary. The
hero and the marketplace split at `lg`, which is `Split`'s own threshold.

**Ranks.** `Get started` gold in the hero (the commit on navy), `Explore products` outline after the
products, `Search markets` gold in the navy panel, `Read the magazine` outline after the issues,
`Get started` primary in the continuation. Every name appears once except `Get started`, which is
the page's single commit stated at the top and again at the end.

### `/about` — about

**Regions.** `Frame` head — `h1` and a bounded lead, with the `Since 1878` eyebrow gone because the
frame has no member for one. Then a `Split :span="6"` holding the mission beside the credo; the
timeline section; a `Split :span="6"` holding the team beside the editorial board; the continuation.

**F4.** Both panels dropped `h-100` and the mission dropped navy for `bg-body-tertiary`, so navy is
now a chrome-only surface on this screen and each panel is its own height.

**F3.** The timeline stopped being a card per era. Each era is a list item carrying the span as a
gold-ruled `accent` marker in tabular figures, the title, and the body at `measure`. The
`text-uppercase` left the span, because it rendered `1850s–1878` as `1850S–1878`.

**Continuation.** One line — `Continue to the desks this history built.` — then `Explore products`
primary and `Publications` secondary. `Back to home` is gone; the masthead brand is that.

**Narrow.** One column throughout; the era span above its title; the continuation's controls stack
full width and keep their ranks.

**Expansion.** `lg`, which is `Split`'s threshold. The planner asked for `md` for the mission and
credo; `Split` splits at `lg` only, and widening it would change a primitive this unit must adopt
unchanged. Each panel's paragraph carries `measure`, so between 768 px and 991 px the panel spans
the column while its prose stays bounded.

### `/publications` — publications hub

**Regions.** `Frame` head; one section named `Publications` holding four `Entry` desks in a
`col-12 col-md-6` grid; the continuation.

**Facts.** The magazine carries `Issue September 2026`, the Marketplace `Listings 12`, the media kits
`Documents 9` — each derived from the live catalog. The newsletters desk carries no fact; see § 4.

**Continuation.** `Rough Notes reaches licensed agents free, in print and digital.` then
`Get started` primary → `/subscribe` and `Read the magazine` secondary.

**Narrow.** One column. **Expansion.** Two across at `md`; four near-equal desks do not survive four
across at `xl`, where a 1140 container gives 285 px for `The Insurance Marketplace` plus a summary.

### `/media` — media kits

**Regions.** `Frame` head; one section per channel; the advertising representatives; the continuation.

**The rows.** Each channel's documents are a `list-group`. A row carries the document name at the
start as the only link, and its destination cue at the end: an open-in-new glyph plus the host the
file opens on. The cue sits outside the anchor, so the link's accessible name is still exactly the
document name — which is what the journey resolves `2027 Rough Notes magazine rate card` by.

**The cue is derived.** `readHost` reads `new URL(asset.href, window.location.href).hostname`. No
second field stores it, so a record cannot name one host and link to another. No in-app arrow glyph
appears on these rows; the in-app buttons on the same screen keep theirs.

**The deadline.** The marketplace channel's publication and deadline sentence moved under that
channel's heading at `measure`, so it reads as part of the channel head rather than as a stray
paragraph.

**Empty.** A channel holding no documents renders a `Notice` with `category="empty"`, announced
politely, carrying `Contact` as its real recovery. Reachable because `CatalogOptions` permits an
empty asset collection; proven through that seam.

**Continuation.** `Ask the advertising desk about placement, deadlines, and artwork.` then `Contact`
primary, no secondary.

**Narrow.** The same rows at 390, with the destination cue under the name. **Expansion.** The cue
moves to the row end at `sm`; the representative cards split at `md`.

## 3. The rendered evidence

Frames written by `VITE_CAPTURE=true npm run test:journey` on 2026-09-16 into
`tmp/capture/states/`. Each reading below is from a crop produced by `tmp/units/u6-frame.mjs`,
which is the instrument this unit added; the crops are retained beside it.

**`about--light-1280.png`** (2756 px tall before, 2561 px now).
The page opens with `About Rough Notes` and its bounded lead, with no eyebrow above it and no
breadcrumb — the frame head F1 said the screen lacked. The mission and the credo are two quiet
`bg-body-tertiary` panels, and their bottom edges are at different heights: the mission ends at
y≈672 and the credo at y≈597. **F4 closed** — the baseline crop shows the credo running to the
mission's height with an empty band under its two lines. The timeline is no longer six cards: each
era is a gold hairline plus its span (`1850s–1878`, no longer `1850S–1878`), a serif title, and a
body that stops at x≈686 against a container edge at 1228. **F3 closed** — the baseline ran that
same body to x≈1143.

**`about--light-390.png`** (3826 px).
One column throughout. The lead, the two panels, and the timeline bodies are each bounded by the
366 px column with no horizontal overflow. The continuation stacks: the rule, the line of copy, then
`Explore products` full width and `Publications` under it, ranks intact. Nothing is centred that was
start-aligned at 1280.

**`about--light-1280.png`, continuation band.**
A top rule, `Continue to the desks this history built.`, then exactly two controls — the navy
`Explore products →` and the outline `Publications`. **F8 closed**: the baseline's third near-equal
`Back to home` is gone and the two survivors no longer read as peers.

**`media--light-1280.png`** (2502 px before, 2119 px now).
Nine full-width cards became nine `list-group` rows. Each row is ~58 px instead of ~110 px, the
document name sits at x=68 and the destination cue — an open-in-new glyph and `roughnotes.com` — at
x≈1090–1211, hard against the row's end. **F3's wide-layout half and the media-row finding are
closed**: the row now uses its width instead of leaving two thirds of it empty. **S6 closed**: the
`bi-arrow-right` glyph every in-app action uses is absent from these rows, and the external glyph and
the host name are what a reader sees. The marketplace channel's deadline sentence sits under that
channel's heading, bounded, before its rows.

**`media--light-390.png`** (3209 px).
The same rows at 390: long document names wrap to two lines and the destination cue drops under the
name, which is the narrow shape the planner recorded as already correct. The representative cards
stack. The wide layout is no longer the narrow layout un-adapted; both now carry the same
information in the shape their width allows.

**`home--light-1280.png`** (4802 px before, 4146 px now).
The trust band reads `Powering the independent agency system with` on its own line at x=52, with
all four wordmarks on one row beneath it starting at the same x=52 — `Coverages Applicable` among
them. **F7 closed**: the baseline crop shows that lead-in centred across two lines with
`Coverages Applicable` wrapped alone onto a centred second row. The band is ~100 px instead of
~145 px. In the products grid every card title — `RoughNotes-Pro`, `Advantage-Plus`,
`The Insurance Marketplace`, `PF&M Online`, `Books and calculator wheels`, `Rough Notes magazine` —
renders as a plain serif heading with no underline, against the baseline crop where all six were
underlined. **F5 closed**, with the heading-containing-link structure intact. The hero is top-aligned
with one gold commit; the marketplace panel's two regions start at the same y and neither stretches
to the other's height; the issue cards carry `Category` and `Issued` as bottom-aligned facts; the
page ends in the `invite` plate with one action and no form fields.

**`home--dark-1280.png`** (4146 px).
Every change above holds in dark. The trust band takes the dark tertiary surface and separates the
navy hero above from the page below by lightness rather than by a rule. Entry titles are light on
the card surface with no underline, and the fact labels stay on the quiet tier while their values
take the body tier, so both remain readable. The `invite` plate keeps its own dark scope, and its
`Get started` renders as the white-on-navy `.btn-primary` repaint. No control lost contrast against
its surface in the flip.

## 4. Rulings on the unknowns

**`/publications` no longer lists magazine delivery as a peer desk, and it reads better for it.**
The hub now lists four desks — the magazine, the Marketplace, the newsletters, and the media kits —
each a place with its own content. `Free magazine delivery` was not that: it was a second door to
`/subscribe`, which the hub's own continuation now carries as its primary action under the line
`Rough Notes reaches licensed agents free, in print and digital.` The reading gain is that the grid
became four comparable things instead of five things of two kinds, and delivery moved from
competing with the desks to closing the page. `/newsletter` keeps its route and its position in the
grid, as the plan ruled.

The plan's wording places delivery in `/subscribe`'s own continuation. I made it the **hub's**
continuation primary as well, because a reader on the hub otherwise has no path to delivery at all
once the desk card is gone. `/subscribe`'s own continuation is unit 8's and this unit did not touch
it.

**The facts each destination carries, and the one that does not exist.**

| Desk                        | Fact                  | Where it comes from                       |
| --------------------------- | --------------------- | ----------------------------------------- |
| Rough Notes magazine        | `Issue September 2026` | the issued date on the catalog's articles |
| The Insurance Marketplace   | `Listings 12`         | the catalog's market collection           |
| Media kits                  | `Documents 9`         | the catalog's asset collection            |
| Newsletter                  | none                  | the catalog holds no newsletter record    |

The newsletters desk carries no fact because there is nothing in the catalog to draw one from. The
plan ruled out a `Newsletter` record type, so inventing a cadence, a count, or a name here would be
manufacturing a fact. It carries its summary and nothing else.

The planner asked for "the media kit's year" rather than a document count. The `Asset` record has no
year field; the years live inside the display names and the ids (`magazine-rate-2027`). Deriving a
year by parsing an id or a name would treat an identifier as data and would break the moment a name
changed, so I took the document count instead — the same class of fact the Marketplace carries, and
derived the same way.

## 5. Observations

**Wall-clock.** `npm run test:app:browser` 27.14 s, `npm run test:journey` 34.31 s,
`VITE_CAPTURE=true npm run test:journey` 39.04 s, all inside this unit's own exec on a loaded host.
Take the authoritative readings from an independent verifier on an idle host, per
`.agents/orchestration.md` § Writing concurrency rule 10. `npm test` was not run here.

**Nothing in the journey suite moved.** Every accessible name the integration suite resolves is
unchanged: the `Introduction` region still holds one `Get started` link, the `Publications` region
still holds `Rough Notes magazine`, `The Insurance Marketplace`, and `Newsletter`, the media rate
card link still resolves by its exact name with `rel="noreferrer"` and its `roughnotes.com/wp-content`
href, and every `waitForText` string the four screens own is still on the page — including
`The magazine and the Insurance Marketplace` and
`Files open on Rough Notes. They are not stored in this application.`

**Three off-limits suites constrain these screens and all three still pass.**
`tests/app/browser/styles/theme.test.ts` requires a `.btn-warning` inside `.hero` and inside `.panel`
on home, which is why both gold controls stayed exactly where they are; `styles/signature.test.ts`
requires `.card.lift`, `.issue`, and `.invite` to render on home; `App.test.ts` requires the only
`ul[aria-label]` elements in the tree to be the utility bar's two. Each of those was read before
composing rather than discovered by a red.

**Ancillary decisions recorded.**

- The statistics in the hero took `figures-tabular`. `46,000+`, `800+`, and `750` are figures a
  reader compares across three columns, which is what unit 4 generated the utility for.
- Home's section eyebrows stayed. `Frame` refuses an eyebrow, so about, publications, and media lost
  theirs; home is not a `Frame` and its band eyebrows are the marketing rhythm unit 4 settled.
- The about panels' headings became their own labels. `MISSION` and `OUR CREDO` were `accent`
  eyebrows labelling headings that already said what they were, and four `accent` marks across two
  adjacent panel pairs is the repetition that stops an accent reading as one. The timeline's per-era
  markers are now the only `accent` on the screen.
- `Entry`'s facts on the issue cards are `Category` and `Issued`, not the author. On a preview grid a
  reader chooses by subject and recency; the byline is on the article.
- The media representatives stayed cards rather than becoming list rows. A representative carries two
  destinations, a phone and an email, and `Entry` holds exactly one; the card keeps both reachable.
- `COPY.absent` was added for the empty-channel notice, beside the existing `empty`, `none`, and
  `vacant` lines.
- The frames read at `light-390` after this change carry no horizontal overflow at any of the four
  screens' regions.

**Two `COPY` members lost their last consumer.** `COPY.home` (`Back to home`) was used only by the
about continuation F8 removed, and `COPY.about` (`About`) only by the page region `Frame` replaced.
Neither was deleted: a later unit's continuation may want `Back to home`, and removing a declared
line to satisfy nothing is not a change this unit should make. They are named here so unit 9's parity
pass rules on them rather than rediscovering them.

**One reading I did not take.** The contrast of the `confirm` check badges on the navy `invite` and
`panel` surfaces. They render as a dark brown tile with a gold tick in both themes, which is unit 4's
settled `bg-warning-subtle text-warning-emphasis` pair inside a `data-bs-theme="dark"` scope, and it
is unchanged from the baseline. It is visible in `home--light-1280.png` and `home--dark-1280.png` and
belongs to whoever owns the resolved-style matrix widening in unit 9.

## 6. What I did not close, and why

**Home does not take `Frame`, by decision.** Criterion 5 says each screen composes from the
primitives; home composes from `Split` and `Entry` and ends in a real continuation, but its `h1`
stays inside the navy `hero` band rather than in a frame head. Three things decide it, and the first
two are pins I cannot move:

- `tests/app/browser/styles/theme.test.ts` measures the focus ring against "the rendered hero
  gradient and marketplace glow" by requiring a `.btn-warning` inside `.hero` and inside `.panel` on
  home. That suite is off-limits to this unit.
- `_signature.scss` styles `.hero h1` with its own clamp and `.hero .lead` with its own width, and
  `app/browser/styles/` is off-limits. Moving the `h1` out of `.hero` strands those rules with no
  consumer and no way for this unit to clean up after them.
- The plan's screen-by-screen list gives every screen a `Head` region except home, whose list starts
  at the navy hero. The plan also records home as the screen that "needs repair, not redesign".

The cost is real and I am naming it rather than hiding it: home reads as a marketing page with a
framed body, and the other three read as framed pages throughout. If the Orchestrator wants home
inside a `Frame`, that is a successor unit that also owns `theme.test.ts` and `_signature.scss`.

**Home's product cards lost their icon tiles and the featured navy card.** `Entry` carries a title,
a summary, a destination, and facts, and has no member for a glyph or a rank marker. Adopting it on
home's product preview is what closes F5 structurally and makes every repeated record in the
application one shape; the price is that `Most requested` and the `PRODUCT_MARKS` tiles no longer
appear on home. Both still appear on `/products`, `/products/:slug`, and the shop, which unit 7 owns,
so nothing is stranded. The same trade removed the `CATEGORY_TONES` gradient band from home's issue
cards, where the category is now a stated fact; `MagazineView` and `ArticleView` still paint it.

**Unit 7 will meet the same wall on `/products`.** The planner's `/products` repair asks for the
featured product to become "the first record with a gold-ruled `Most requested` marker". `Entry` has
no member for that either. This unit did not widen the primitive and did not work around it; the
decision belongs with whoever briefs unit 7.

**`readHost` lives in `MediaView.vue`, not in `helpers.ts`.** `app/browser/helpers.ts` is where a
derivation like this belongs, and it is outside this unit's owned files. The function is module-scope
in the SFC with a TSDoc note saying so, matching the precedent unit 5 set with `shellHref` in
`App.vue`. Proposed patch for a later unit, report-only:

```ts
// app/browser/helpers.ts
/**
 * Reads the host a destination opens on.
 *
 * @param href - The destination URL
 * @returns The host name the destination resolves to
 *
 * @example
 * ```ts
 * readHost('https://roughnotes.com/kit.pdf') // 'roughnotes.com'
 * ```
 */
export function readHost(href: string): string {
	return new URL(href, window.location.href).hostname
}
```

`MediaView.vue` then imports it and drops its local copy. Unit 5 left the same promotion open for
`shellHref`; one unit can take both.

**`Live catalog` still wears the in-app arrow.** S6 names it beside the media PDFs, and it lives in
`ShopView.vue`, which unit 7 owns. Criterion 8 is closed for the external destinations on these four
screens, and that one carries forward.

**Guide parity.** `guides/README.md` is unit 9's. It does not yet describe the media list rows, the
derived external cue, the publications desk facts, or home's continuation losing its form.
