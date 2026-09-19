# Brand-identity inventory

Read-only survey, 2026-09-17, over the `roughnotes` checkout at `18e6352`. Produced for the
repository owner's ruling on whether the application can ship under its current identity. Reports
what is in the tree; takes no legal position and characterises nobody's rights.

## What a reader of the shipped application meets

Every item renders on a shipped page.

- **The browser tab** reads `Rough Notes` — `app/browser/index.html:6`.
- **The masthead and footer wordmark** read `Rough Notes` and `Since 1878`, from `COPY.brand` and
  `COPY.mark` through `app/browser/components/Brand.vue:9-10`.
- **The About page** carries a first-person company history naming the founder, the mission, and a
  money-back credo — `app/browser/components/AboutView.vue:14-15,21-25,30-33`.
- **The Contact page** renders the legal name `The Rough Notes Company, Inc.`, a full street address
  with suite, city, state, and postal code, a toll-free number, a voice line, a fax number, and an
  email address — `app/browser/components/ContactView.vue:34-65`.
- **Named individuals with direct contact details**, rendered as clickable `tel:` and `mailto:`
  links — `app/browser/components/MediaView.vue:61-79`, sourced from `app/core/constants.ts:354-363`.
- **Outbound links** to `shoppingcart.roughnotes.com` for product logins, the live catalog, and
  billing, and nine media-kit PDF paths under `roughnotes.com/wp-content/uploads/` —
  `app/browser/constants.ts:138-143` and `app/core/constants.ts:432-480`.

**No rendered page states that the application is unaffiliated, a sample, or a demonstration.** The
only disclaimers are developer-facing: a line in `guides/README.md` and a source comment.

## The claim the tree makes about its own data

`guides/README.md` states the data is a sample rather than a scrape, and the `MARKETS` table carries
a matching source comment. The catalog does not. `app/core/constants.ts:368-373` reads:

```text
 * Holds a fixture sample of orderable shop SKUs.
 *
 * @remarks
 * Prices and codes are taken from the public catalog listings. This is not a
 * scrape of every SKU, and live orders stay on Rough Notes.
```

"Taken from the public catalog listings" is an authorial claim that the prices, catalog codes, and
ISBNs are real values rather than invented ones. The guide's sample claim does not cover them.

## What the survey could not establish, and what would settle each

No network request was made. Each of these is a lookup against the real company's own published
pages or a registry:

- Whether the founder narrative, the 1878 founding date, and each historical era match the company's
  published history.
- Whether the named advertising representatives, their titles, and their direct lines are current
  real personnel.
- Whether the office address, voice line, toll-free number, and fax match the company's current
  contact details or an older set carried forward.
- Whether the catalog prices, codes, and ISBNs match the real catalog the source comment names.
- Whether the outbound URLs resolve to live pages.
- Whether the article bylines name real contributors.

## The options, with what each costs

**A — keep the data, add an on-page disclaimer.** One new element plus its copy constant and a guide
row. Additive: no existing rendered string changes, so no journey assertion moves. A new assertion
for the disclaimer's presence is optional.

**B — replace the identity with an invented brand throughout.** Reaches `app/core/constants.ts`,
`app/browser/constants.ts`, `index.html`, `Brand.vue`, `AboutView.vue`, `ContactView.vue`,
`MediaView.vue`, `NewsletterView.vue`, and every guide reference. Breaks every test quoting the
literal strings, which the journey suite does directly — it clicks, types, and reads back these
exact values as accessible names and page text. The historical eras are written around a real
founder and a real 1906 event and cannot be renamed without rewriting the history they tell.

**C — reduce the specific checkable facts to obviously invented values**, leaving the names. Targets
the office block, the representatives, the catalog codes, prices and ISBNs, and the outbound URLs.
Fewer files than B if the names stay. Any replacement URL must remain well-formed, because
`MediaView` renders the host beside each link and a helper test reads it.

## The interaction with the privacy work

Unit P1 is adding a notice telling a person their form entries stay in this browser. That statement
is true of what the controller does. It does not address the identity question, and a page carrying
both a privacy notice and an unmarked real-company identity is more confusing than one carrying
neither, because the notice signals care about accuracy elsewhere on the page.
