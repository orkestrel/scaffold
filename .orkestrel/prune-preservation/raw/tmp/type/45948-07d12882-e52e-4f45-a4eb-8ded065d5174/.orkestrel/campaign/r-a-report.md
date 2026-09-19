# Unit R-A report — the roughnotes interface announces its menu state and names its controls distinctly

Both repairs landed in the application. `npm run test:app:browser` reports 38 files and 162 passed,
`npm run test:journey` reports 4 files and 76 passed with 4 skipped, and `npm run check` exits 0.

## The Bootstrap `aria-expanded` measurement

Bootstrap 5.3.8 writes no `aria-expanded` on an offcanvas trigger, so the repair authors the
attribute. Two readings establish it.

Source: `node_modules/bootstrap/js/dist/offcanvas.js` carries two `setAttribute` calls, both on the
offcanvas element itself (`aria-modal` at `:98` and `role` at `:99`) and neither on a trigger. The
command `grep -n "aria-expanded|ariaExpanded|setAttribute" node_modules/bootstrap/js/dist/offcanvas.js`
returns those two lines and nothing else.

Runtime: the shell mounted at 390x844, the menu opened through the trigger, and the trigger read
before and after. The measurement ran against `app/browser/App.vue` with the new binding removed:

```text
before states [] attribute null | after states [] attribute null
```

The `after` reading was taken once `#site-menu` carried Bootstrap's own `show` class, so the menu
was open and the trigger still announced nothing. `readStates` returned the empty list in both
frames.

The repair therefore authors the attribute and keeps it true to the offcanvas's own events:
`App.vue` holds an `opened` ref, binds `:aria-expanded="opened"` on the trigger, and drives the ref
from `shown.bs.offcanvas` and `hidden.bs.offcanvas` listeners attached through a template ref. The
ref flips when the offcanvas has finished opening or closing, so a settle keyed to the announced
state reports the state the menu is in rather than the frame it is animating through.

## The collision list the resolver reported

The resolver ran over every screen the product guide's data-state table names, at both declared
widths, and at the compact width again with the menu open. The population is what the layer counts
as focusable (`FOCUSABLE_SELECTOR`) filtered by the layer's own `isReachable`, and every distinct
accessible name in that population went back through `resolveRendered`. The reading is every
`ambiguous` refusal it raised.

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts`

Before the repair: **1 failed | 9 passed**, the failure naming 154 rows over 16 distinct names.
After the repair: **12 passed**, the same test green.

### The names, their cause, and the repair each received

| Name | Where it repeated | Repair |
| ---- | ----------------- | ------ |
| `800-428-4384` | The utility bar's Contact cluster, the footer's Company column, the contact office panel, and a media-kit representative | The utility bar and the footer announce the cluster carrying each link; the screen's own copy keeps the bare name |
| `rnc@roughnotes.com` | The same four places | The same |
| `Get started` | The masthead at both widths, the compact menu, home's hero, and home's subscribe invite | The masthead announces `Get started, Site`, the menu `Get started, Menu`, home's invite `Get started, Join the community`; home's hero keeps the bare name |
| `RoughNotes-Pro` | The product listing entry, home's product card, and the footer's Products column | The footer announces its column; the entry keeps the name |
| `Advantage-Plus` | The same three places | The same |
| `The Insurance Marketplace` | The product listing entry, home's product card, the publications hub entry, and the footer's Products column | The same |
| `Newsletter` | The publications hub entry and the footer's Resources column | The same |
| `Media kits` | The publications hub entry, the marketplace continuation, and the footer's Company column | The same |
| `Shop catalog` | The shop detail's breadcrumb step and the footer's Company column | The same |
| `Publications` | The masthead destination and the continuation on about and on the magazine | The masthead and the menu announce `Publications, Site`; the continuation keeps the name |
| `Products` | The masthead destination and the product detail's breadcrumb step | The same |
| `Contact` | The compact menu destination and the continuation on products and on media kits | The same |

The rule the repair applies, in one sentence: **the shell announces the region carrying each of its
destinations, and the screen's own control keeps the bare name.** Home's subscribe invite is the one
screen-internal repeat, and it announces the section carrying it.

The compact menu is the one exception inside that rule, and it is a measured one. The first pass
gave the menu's action `Get started, Site` like the masthead's, on the belief that only one of the
two is ever reachable. The census reddened on 15 rows: at 390 the compact masthead keeps its own
action visible beside the open menu, so both are reachable at once. The menu's destinations do
replace the masthead's rather than sitting beside them, so those keep `, Site` and one name serves
`followSite` at either width. `app/browser/App.vue` carries that reason beside the binding.

### The full red reading

```text
1280 px | / | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | / | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | / | Interactive target "Get started" is ambiguous across 3 elements
1280 px | / | Interactive target "RoughNotes-Pro" is ambiguous across 2 elements
1280 px | / | Interactive target "Advantage-Plus" is ambiguous across 2 elements
1280 px | / | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
1280 px | /about | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /about | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /about | Interactive target "Publications" is ambiguous across 2 elements
1280 px | /publications | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /publications | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /publications | Interactive target "Get started" is ambiguous across 2 elements
1280 px | /publications | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
1280 px | /publications | Interactive target "Newsletter" is ambiguous across 2 elements
1280 px | /publications | Interactive target "Media kits" is ambiguous across 2 elements
1280 px | /products | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /products | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /products | Interactive target "RoughNotes-Pro" is ambiguous across 2 elements
1280 px | /products | Interactive target "Advantage-Plus" is ambiguous across 2 elements
1280 px | /products | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
1280 px | /products/roughnotes-pro | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /products/roughnotes-pro | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /products/roughnotes-pro | Interactive target "Products" is ambiguous across 2 elements
1280 px | /products/roughnotes-pro | Interactive target "Get started" is ambiguous across 2 elements
1280 px | /magazine | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /magazine | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /magazine | Interactive target "Publications" is ambiguous across 2 elements
1280 px | /magazine | Interactive target "Get started" is ambiguous across 2 elements
1280 px | /magazine/local-landscape | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /magazine/local-landscape | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /marketplace | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /marketplace | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /marketplace | Interactive target "Media kits" is ambiguous across 2 elements
1280 px | /shop | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /shop | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /shop/coverages-applicable | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /shop/coverages-applicable | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /shop/coverages-applicable | Interactive target "Shop catalog" is ambiguous across 2 elements
1280 px | /media | Interactive target "800-428-4384" is ambiguous across 3 elements
1280 px | /media | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /subscribe | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /subscribe | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /newsletter | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /newsletter | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
1280 px | /contact | Interactive target "800-428-4384" is ambiguous across 3 elements
1280 px | /contact | Interactive target "rnc@roughnotes.com" is ambiguous across 3 elements
1280 px | /payment | Interactive target "800-428-4384" is ambiguous across 2 elements
1280 px | /payment | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | / | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | / | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | / | Interactive target "Get started" is ambiguous across 3 elements
390 px | / | Interactive target "RoughNotes-Pro" is ambiguous across 2 elements
390 px | / | Interactive target "Advantage-Plus" is ambiguous across 2 elements
390 px | / | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
390 px | / | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | / | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | / | menu open | Interactive target "Get started" is ambiguous across 4 elements
390 px | / | menu open | Interactive target "RoughNotes-Pro" is ambiguous across 2 elements
390 px | / | menu open | Interactive target "Advantage-Plus" is ambiguous across 2 elements
390 px | / | menu open | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
390 px | /about | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /about | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /about | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /about | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /about | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /about | menu open | Interactive target "Publications" is ambiguous across 2 elements
390 px | /publications | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /publications | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /publications | Interactive target "Get started" is ambiguous across 2 elements
390 px | /publications | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
390 px | /publications | Interactive target "Newsletter" is ambiguous across 2 elements
390 px | /publications | Interactive target "Media kits" is ambiguous across 2 elements
390 px | /publications | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /publications | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /publications | menu open | Interactive target "Get started" is ambiguous across 3 elements
390 px | /publications | menu open | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
390 px | /publications | menu open | Interactive target "Newsletter" is ambiguous across 2 elements
390 px | /publications | menu open | Interactive target "Media kits" is ambiguous across 2 elements
390 px | /products | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /products | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /products | Interactive target "RoughNotes-Pro" is ambiguous across 2 elements
390 px | /products | Interactive target "Advantage-Plus" is ambiguous across 2 elements
390 px | /products | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
390 px | /products | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /products | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /products | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /products | menu open | Interactive target "RoughNotes-Pro" is ambiguous across 2 elements
390 px | /products | menu open | Interactive target "Advantage-Plus" is ambiguous across 2 elements
390 px | /products | menu open | Interactive target "The Insurance Marketplace" is ambiguous across 2 elements
390 px | /products | menu open | Interactive target "Contact" is ambiguous across 2 elements
390 px | /products/roughnotes-pro | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /products/roughnotes-pro | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /products/roughnotes-pro | Interactive target "Get started" is ambiguous across 2 elements
390 px | /products/roughnotes-pro | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /products/roughnotes-pro | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /products/roughnotes-pro | menu open | Interactive target "Get started" is ambiguous across 3 elements
390 px | /products/roughnotes-pro | menu open | Interactive target "Products" is ambiguous across 2 elements
390 px | /magazine | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /magazine | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /magazine | Interactive target "Get started" is ambiguous across 2 elements
390 px | /magazine | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /magazine | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /magazine | menu open | Interactive target "Get started" is ambiguous across 3 elements
390 px | /magazine | menu open | Interactive target "Publications" is ambiguous across 2 elements
390 px | /magazine/local-landscape | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /magazine/local-landscape | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /magazine/local-landscape | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /magazine/local-landscape | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /magazine/local-landscape | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /marketplace | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /marketplace | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /marketplace | Interactive target "Media kits" is ambiguous across 2 elements
390 px | /marketplace | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /marketplace | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /marketplace | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /marketplace | menu open | Interactive target "Media kits" is ambiguous across 2 elements
390 px | /shop | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /shop | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /shop | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /shop | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /shop | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /shop/coverages-applicable | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /shop/coverages-applicable | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /shop/coverages-applicable | Interactive target "Shop catalog" is ambiguous across 2 elements
390 px | /shop/coverages-applicable | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /shop/coverages-applicable | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /shop/coverages-applicable | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /shop/coverages-applicable | menu open | Interactive target "Shop catalog" is ambiguous across 2 elements
390 px | /media | Interactive target "800-428-4384" is ambiguous across 3 elements
390 px | /media | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /media | menu open | Interactive target "800-428-4384" is ambiguous across 3 elements
390 px | /media | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /media | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /media | menu open | Interactive target "Contact" is ambiguous across 2 elements
390 px | /subscribe | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /subscribe | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /subscribe | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /subscribe | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /subscribe | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /newsletter | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /newsletter | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /newsletter | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /newsletter | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /newsletter | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /contact | Interactive target "800-428-4384" is ambiguous across 3 elements
390 px | /contact | Interactive target "rnc@roughnotes.com" is ambiguous across 3 elements
390 px | /contact | menu open | Interactive target "800-428-4384" is ambiguous across 3 elements
390 px | /contact | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 3 elements
390 px | /contact | menu open | Interactive target "Get started" is ambiguous across 2 elements
390 px | /payment | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /payment | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /payment | menu open | Interactive target "800-428-4384" is ambiguous across 2 elements
390 px | /payment | menu open | Interactive target "rnc@roughnotes.com" is ambiguous across 2 elements
390 px | /payment | menu open | Interactive target "Get started" is ambiguous across 2 elements
```

## Each control's command with its red and green readings

| Control | Command | Red | Green |
| ------- | ------- | --- | ----- |
| R-A-C1 | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts -t "announces the compact menu trigger"` | 1 failed, 11 skipped — `AssertionError: expected [] to include 'collapsed'` at `App.test.ts:352`, with the `:aria-expanded` binding removed from `App.vue` | 1 passed, 11 skipped |
| R-A-C2 | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts` | 1 failed, 9 passed — 154 ambiguous refusals, listed earlier | 12 passed |
| R-A-C3 | `npm run test:app:browser` | not taken; the baseline reads 38 files, 159 passed | 38 files, 162 passed |
| R-A-C3 | `npm run test:journey` | not taken; the baseline reads 4 files, 76 passed and 4 skipped | 4 files, 76 passed and 4 skipped |
| R-A-C4 | scoped `oxfmt --check`, scoped `oxlint --deny-warnings`, `npm run check` | not taken | exit 0, exit 0, exit 0 |

The R-A-C1 red was taken by removing the one line the repair adds, which reddens exactly the test
that names the defect and leaves the import and collection graph valid: the same run collected 12
tests and reported 11 skipped by the `-t` filter.

## The gate table

| Gate | Command | Result |
| ---- | ------- | ------ |
| Format (scoped) | `./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --check` over the seven owned files | exit 0, `All matched files use the correct format.` |
| Lint (scoped) | `./node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings app/browser/ tests/app/browser/` | exit 0, `Found 0 warnings and 0 errors.` over 37 and 40 files |
| Typecheck | `npm run check` | exit 0 |
| Browser | `npm run test:app:browser` | exit 0, 38 files, 162 passed |
| Journey | `npm run test:journey` | exit 0, 4 files, 76 passed and 4 skipped |

Observations, not criteria: `npm run test:app:core` reports 5 files and 33 passed; `npm run test:policy`
reports 109 passed and 1 skipped; `npm run test:config` reports 171 passed and 3 skipped. Each matches
the baseline the dispatch recorded. The whole `npm test` chain was not run: `format:check` and
`test:conformance` fail at the baseline for reasons this unit does not own.

## The guide patch

`guides/README.md` is shared, so these are the exact replacements rather than edits. Three blocks
move.

### Block 1 — the knowledge shell, the primary action and the menu trigger (lines 140-147)

Replace:

```markdown
The primary action is `Get started`, which opens subscribe. It sits in the masthead at every width,
beside the menu trigger under `lg` and beside the destinations from `lg` up, and again inside the
compact menu. Header destinations are About, Publications, Products, and Shop. Magazine reading and
marketplace search open from the publications hub. Contact is in the compact menu and the footer.
Sign-in is not a fake session: RoughNotes-Pro Login and Advantage-Plus Login stay external
`rel="noreferrer"` links. Shop is in-app. The compact menu is an offcanvas dialog. In-app
destinations there are hash links. The shell hides the dialog when `location` changes. Color mode is
an icon-only masthead toggle named `Use dark theme` or `Use light theme`.
```

with:

```markdown
The primary action is `Get started`, which opens subscribe. It sits in the masthead at every width,
beside the menu trigger under `lg` and beside the destinations from `lg` up, and again inside the
compact menu. The masthead copies announce `Get started, Site` and the menu's copy announces
`Get started, Menu`, because the compact masthead keeps its own action beside the open menu and a
name answers for one control. Header destinations are About, Publications, Products, and Shop, and
each announces `Site` whichever of the two surfaces renders it, because the menu's destinations
replace the masthead's rather than sitting beside them. Magazine reading and marketplace search open
from the publications hub. Contact is in the compact menu and the footer. Sign-in is not a fake
session: RoughNotes-Pro Login and Advantage-Plus Login stay external `rel="noreferrer"` links. Shop
is in-app. The compact menu is an offcanvas dialog whose trigger announces `aria-expanded`, written
from the offcanvas's own `shown` and `hidden` events, so the disclosure settles on the announced
state rather than on the classes the framework toggles. In-app destinations there are hash links.
The shell hides the dialog when `location` changes. Color mode is an icon-only masthead toggle named
`Use dark theme` or `Use light theme`.
```

### Block 2 — the shell destinations, after the `FOOTER_GROUPS` bullet (line 204)

Insert this paragraph between the `FOOTER_GROUPS` bullet and the paragraph opening
`A ShellGroup carries`:

```markdown
The shell announces the region carrying each of its destinations, through `buildName`, which returns
the label followed by that region: `RoughNotes-Pro, Products` in the footer, `800-428-4384, Contact`
in the utility bar, `Products, Site` in the masthead and the compact menu. The screen's own control
keeps the bare label, so a listing entry, a breadcrumb step, and a screen's continuation each answer
to a name no other reachable control on that screen shares. Home's subscribe invite is the one
screen-internal repeat and announces `Get started, Join the community`. The label a reader sees opens
every announced name, so speech input still reaches the control by what it reads.
```

### Block 3 — the shell destinations, the `ShellGroup` paragraph (lines 206-208)

Replace:

```markdown
A `ShellGroup` carries a `title` and its `ShellLink` members. The footer paints the title as a
heading and the utility bar paints it as the list's accessible name, so a cluster is named whichever
region renders it.
```

with:

```markdown
A `ShellGroup` carries a `title` taken from `COPY` and its `ShellLink` members. The footer paints the
title as a heading, the utility bar paints it as the list's accessible name, and every link in the
cluster announces it, so a cluster names itself and its members whichever region renders it.
```

## The claims I flag as least certain

- **The census is bounded by `isReachable`, which does not model `aria-modal`.** Bootstrap marks the
  open offcanvas `aria-modal="true"` and leaves the masthead behind it neither `inert` nor
  `aria-hidden`, so the layer counts a covered masthead control as reachable. That is what forced the
  menu's action to announce `Menu`. Whether the correct product repair is instead to make the shell
  inert while the dialog is open is a question this unit did not settle, and a screen reader honouring
  `aria-modal` would not reach the covered control at all.
- **The census reads two widths and one menu state.** It walks 1280x800 and 390x844, and the compact
  width again with the menu open. A width between them, or a screen driven into a data state a
  journey reaches but a bare landing does not — a refused form, a filtered listing — is outside what
  this proof walked. A collision that appears only in such a state is unreported.
- **`followRoute` lands by writing `window.location.hash`.** The navigator carries `history: false`,
  so that is the same navigation a destination link performs, and the wait reads the painted heading.
  It is not a click, and a screen reachable only through a control would not be covered this way.
  Every screen the guide's table names is reachable by path, so the substitution costs nothing here.
- **`buildName` is proven through the surface rather than in its mirrored test file.**
  `tests/app/browser/helpers.test.ts` is outside this unit's owned set, so the helper's contract is
  asserted by `App.test.ts` reading the accessible name of every shell destination against a declared
  literal list. That is the stronger proof of the shipped behaviour and the weaker proof of the
  function in isolation. A successor unit that owns `helpers.test.ts` closes the gap.
- **The 154-row red count is this host's reading.** It is the population the census walked at these
  two viewports on Chromium, not a property of the application independent of them.

## Scope notes

- `tests/app/browser/setup.ts` changed in two places only: the `@app/browser` import gained
  `buildName`, and `CONTENT_CONTROL` now names `buildName(COPY.catalog, COPY.company)` with its
  remark corrected. `openSite`, `closeSite`, `followSite`, and `readMenuSettled` are untouched, so the
  hand-rolled settle still drives the journeys for unit R-B to replace.
- `tests/app/browser/integration.test.ts` changed only where a journey named a control this unit
  renamed, plus four sites where the journey routed around a collision that is now closed:
  `clickAccessibleWithin` is gone from the file and each of those targets resolves by its bare name.
  The assertion that pinned `RoughNotes-Pro` as ambiguous now asserts the refusal is `undefined`.
- `app/browser/constants.ts` gained `COPY.join`, `COPY.logins`, and `COPY.resources`, and the five
  `ShellGroup` titles now read from `COPY` instead of repeating their literals. `COPY.join` holds copy
  home already rendered; the eyebrow now reads from it. No visible copy is new.
- No vendored file changed. `vite.config.ts`, `configs/**`, `package.json`, `tests/setupBrowser.ts`,
  and `.orkestrel/**` are untouched.

## Deviation state

None. Every choice the deviation contract scopes to this unit was settled inside it: the attribute's
wiring (a Vue ref driven by the offcanvas's `shown` and `hidden` events), the label mechanism
(`aria-label` composed by `buildName` from published vocabulary, with the visible label leading so
Label in Name holds), and where each new assertion sits (`tests/app/browser/App.test.ts`, beside the
shell's other naming proofs). No repair needed visible copy the product guide does not supply, no
collision needed a product decision about which screen owns a shared verb, and no vendored file
needed to change.

## `git status --short`

```text
 M app/browser/App.vue
 M app/browser/components/HomeView.vue
 M app/browser/constants.ts
 M app/browser/helpers.ts
 M tests/app/browser/App.test.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/setup.ts
```

## Diffstat

```text
 app/browser/App.vue                   |  52 ++++++--
 app/browser/components/HomeView.vue   |  10 +-
 app/browser/constants.ts              |  13 +-
 app/browser/helpers.ts                |  21 ++++
 tests/app/browser/App.test.ts         | 219 +++++++++++++++++++++++++++++++++-
 tests/app/browser/integration.test.ts |  44 ++++---
 tests/app/browser/setup.ts            |   7 +-
 7 files changed, 321 insertions(+), 45 deletions(-)
```

## The diff

```diff
diff --git a/app/browser/App.vue b/app/browser/App.vue
index 31af249..a42cf68 100644
--- a/app/browser/App.vue
+++ b/app/browser/App.vue
@@ -1,7 +1,7 @@
 <script setup lang="ts">
 import type { ApplicationInterface } from './types.js'
 import { Offcanvas } from 'bootstrap'
-import { computed, onBeforeUnmount, onMounted, provide, watch } from 'vue'
+import { computed, onBeforeUnmount, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
 import {
 	APPLICATION_KEY,
 	COPY,
@@ -13,7 +13,15 @@ import {
 	UTILITY_GROUPS,
 } from './constants.js'
 import { createApplication } from './factories.js'
-import { focusNode, hashHref, isCurrent, revealView, shellHref, toggleDark } from './helpers.js'
+import {
+	buildName,
+	focusNode,
+	hashHref,
+	isCurrent,
+	revealView,
+	shellHref,
+	toggleDark,
+} from './helpers.js'
 import Brand from './components/Brand.vue'
 import HomeView from './components/HomeView.vue'
 import AboutView from './components/AboutView.vue'
@@ -36,18 +44,32 @@ const app = props.application ?? createApplication()
 provide(APPLICATION_KEY, app)
 
 const dark = app.dark
+const menu = useTemplateRef<HTMLElement>('menu')
+const opened = ref(false)
 const view = computed(() => app.location.value?.meta.view ?? 'home')
 const current = computed(() => app.location.value?.path)
 const themeLabel = computed(() => (dark.value ? COPY.light : COPY.dark))
 const themeIcon = computed(() => (dark.value ? 'bi-sun' : 'bi-moon'))
+// The compact masthead keeps its own action beside the open menu, so the menu's copy announces the
+// menu. The menu's destinations replace the masthead's instead of sitting beside them, so those
+// keep the one name the site navigation answers to at either width.
+const startedLabel = computed(() => buildName(COPY.started, COPY.site))
+
+function onMenuShown(): void {
+	opened.value = true
+}
+
+function onMenuClosed(): void {
+	opened.value = false
+}
 
 function onMenuHidden(): void {
 	revealView()
 }
 
 function hideMenu(): boolean {
-	const node = document.getElementById('site-menu')
-	if (!(node instanceof HTMLElement)) return false
+	const node = menu.value
+	if (node === null) return false
 	const instance = Offcanvas.getInstance(node)
 	if (instance === null) return false
 	if (!node.classList.contains('show')) return false
@@ -62,8 +84,12 @@ function onView(): void {
 
 onMounted(() => {
 	app.start()
+	menu.value?.addEventListener('shown.bs.offcanvas', onMenuShown)
+	menu.value?.addEventListener('hidden.bs.offcanvas', onMenuClosed)
 })
 onBeforeUnmount(() => {
+	menu.value?.removeEventListener('shown.bs.offcanvas', onMenuShown)
+	menu.value?.removeEventListener('hidden.bs.offcanvas', onMenuClosed)
 	app.destroy()
 })
 
@@ -89,6 +115,7 @@ watch(view, onView, { flush: 'post' })
 					<a
 						class="link-body-emphasis link-underline-opacity-0 link-underline-opacity-100-hover"
 						:href="link.destination"
+						:aria-label="buildName(link.label, group.title)"
 						rel="noreferrer"
 					>
 						<i
@@ -109,7 +136,9 @@ watch(view, onView, { flush: 'post' })
 			<div class="container-xl">
 				<a class="navbar-brand py-2" :href="hashHref(HOME_PATH)"><Brand /></a>
 				<div class="d-flex align-items-center gap-2 d-lg-none ms-auto">
-					<a class="btn btn-primary" :href="hashHref(SUBSCRIBE_PATH)">{{ COPY.started }}</a>
+					<a class="btn btn-primary" :href="hashHref(SUBSCRIBE_PATH)" :aria-label="startedLabel">{{
+						COPY.started
+					}}</a>
 					<button
 						class="btn btn-outline-secondary"
 						type="button"
@@ -125,6 +154,7 @@ watch(view, onView, { flush: 'post' })
 						data-bs-toggle="offcanvas"
 						data-bs-target="#site-menu"
 						aria-controls="site-menu"
+						:aria-expanded="opened"
 						:aria-label="COPY.menu"
 					>
 						<span class="navbar-toggler-icon"></span>
@@ -138,11 +168,12 @@ watch(view, onView, { flush: 'post' })
 								:class="{ active: isCurrent(item.path, current) }"
 								:href="hashHref(item.path)"
 								:aria-current="isCurrent(item.path, current) ? 'page' : undefined"
+								:aria-label="buildName(item.label, COPY.site)"
 								>{{ item.label }}</a
 							>
 						</li>
 					</ul>
-					<a class="btn btn-primary" :href="hashHref(SUBSCRIBE_PATH)">
+					<a class="btn btn-primary" :href="hashHref(SUBSCRIBE_PATH)" :aria-label="startedLabel">
 						{{ COPY.started }}
 						<i class="bi bi-arrow-right" aria-hidden="true"></i>
 					</a>
@@ -180,6 +211,7 @@ watch(view, onView, { flush: 'post' })
 
 	<div
 		id="site-menu"
+		ref="menu"
 		class="offcanvas offcanvas-end bg-body text-body"
 		tabindex="-1"
 		data-bs-theme="dark"
@@ -202,11 +234,16 @@ watch(view, onView, { flush: 'post' })
 						:class="{ active: isCurrent(item.path, current) }"
 						:href="hashHref(item.path)"
 						:aria-current="isCurrent(item.path, current) ? 'page' : undefined"
+						:aria-label="buildName(item.label, COPY.site)"
 						>{{ item.label }}</a
 					>
 				</li>
 			</ul>
-			<a class="btn btn-primary align-self-start" :href="hashHref(SUBSCRIBE_PATH)">
+			<a
+				class="btn btn-primary align-self-start"
+				:href="hashHref(SUBSCRIBE_PATH)"
+				:aria-label="buildName(COPY.started, COPY.menu)"
+			>
 				{{ COPY.started }}
 				<i class="bi bi-arrow-right" aria-hidden="true"></i>
 			</a>
@@ -230,6 +267,7 @@ watch(view, onView, { flush: 'post' })
 							<a
 								class="link-body-emphasis link-underline-opacity-0 link-underline-opacity-100-hover"
 								:href="shellHref(link.destination)"
+								:aria-label="buildName(link.label, group.title)"
 								>{{ link.label }}</a
 							>
 						</li>
diff --git a/app/browser/components/HomeView.vue b/app/browser/components/HomeView.vue
index 23ea81a..dea392f 100644
--- a/app/browser/components/HomeView.vue
+++ b/app/browser/components/HomeView.vue
@@ -7,7 +7,7 @@ import {
 	PRODUCTS_PATH,
 	SUBSCRIBE_PATH,
 } from '../constants.js'
-import { articleHref, formatIssued, hashHref, productHref } from '../helpers.js'
+import { articleHref, buildName, formatIssued, hashHref, productHref } from '../helpers.js'
 import { CATEGORY_LABELS } from '@app/core'
 import { useApplication } from '../composables/useApplication.js'
 import Entry from './Entry.vue'
@@ -255,14 +255,18 @@ const insights = app.catalog
 	<section class="container-xl pb-5 pb-xl-6" aria-labelledby="join-heading">
 		<div class="invite rounded-4 p-4 p-lg-5 bg-body text-body" data-bs-theme="dark">
 			<Split>
-				<p class="accent small text-uppercase text-body-secondary mb-3">Join the community</p>
+				<p class="accent small text-uppercase text-body-secondary mb-3">{{ COPY.join }}</p>
 				<h2 id="join-heading" class="mb-3">Get Rough Notes delivered — free to licensed agents</h2>
 				<p class="text-body-secondary measure mb-4">
 					Independent agents rely on Rough Notes for coverage intelligence, agency strategy, and the
 					market connections that grow a book. This site is a demonstration and sends nothing.
 				</p>
 				<p class="mb-0">
-					<a class="btn btn-primary" :href="hashHref(SUBSCRIBE_PATH)">
+					<a
+						class="btn btn-primary"
+						:href="hashHref(SUBSCRIBE_PATH)"
+						:aria-label="buildName(COPY.started, COPY.join)"
+					>
 						{{ COPY.started }}
 						<i class="bi bi-arrow-right" aria-hidden="true"></i>
 					</a>
diff --git a/app/browser/constants.ts b/app/browser/constants.ts
index 31320e5..d6f3699 100644
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -163,6 +163,7 @@ export const COPY = Object.freeze({
 	order: 'Order form (PDF)',
 	billing: 'Pay on Rough Notes',
 	started: 'Get started',
+	join: 'Join the community',
 	explore: 'Explore products',
 	feature: 'Read the feature',
 	magazine: 'Read the magazine',
@@ -204,6 +205,8 @@ export const COPY = Object.freeze({
 	site: 'Site',
 	content: 'Content',
 	footer: 'Site footer',
+	logins: 'Logins',
+	resources: 'Resources',
 	trail: 'Breadcrumb',
 	introduction: 'Introduction',
 	offerings: 'Product offerings',
@@ -255,7 +258,7 @@ export const MENU_ITEMS: readonly NavItem[] = Object.freeze([
  */
 export const UTILITY_GROUPS: readonly ShellGroup[] = Object.freeze([
 	Object.freeze({
-		title: 'Contact',
+		title: COPY.contact,
 		links: Object.freeze([
 			Object.freeze({ label: COPY.phone, destination: `tel:${COPY.phone}`, mark: 'bi-telephone' }),
 			Object.freeze({
@@ -266,7 +269,7 @@ export const UTILITY_GROUPS: readonly ShellGroup[] = Object.freeze([
 		]),
 	}),
 	Object.freeze({
-		title: 'Logins',
+		title: COPY.logins,
 		links: Object.freeze([
 			Object.freeze({ label: COPY.pro, destination: EXTERNAL_LINKS.pro }),
 			Object.freeze({ label: COPY.advantage, destination: EXTERNAL_LINKS.advantage }),
@@ -283,7 +286,7 @@ export const UTILITY_GROUPS: readonly ShellGroup[] = Object.freeze([
  */
 export const FOOTER_GROUPS: readonly ShellGroup[] = Object.freeze([
 	Object.freeze({
-		title: 'Products',
+		title: COPY.products,
 		links: Object.freeze([
 			Object.freeze({ label: 'RoughNotes-Pro', destination: `${PRODUCTS_PATH}/roughnotes-pro` }),
 			Object.freeze({ label: 'Advantage-Plus', destination: `${PRODUCTS_PATH}/advantage-plus` }),
@@ -294,7 +297,7 @@ export const FOOTER_GROUPS: readonly ShellGroup[] = Object.freeze([
 		]),
 	}),
 	Object.freeze({
-		title: 'Resources',
+		title: COPY.resources,
 		links: Object.freeze([
 			Object.freeze({ label: COPY.desks, destination: PUBLICATIONS_PATH }),
 			Object.freeze({ label: COPY.issue, destination: MAGAZINE_PATH }),
@@ -304,7 +307,7 @@ export const FOOTER_GROUPS: readonly ShellGroup[] = Object.freeze([
 		]),
 	}),
 	Object.freeze({
-		title: 'Company',
+		title: COPY.company,
 		links: Object.freeze([
 			Object.freeze({ label: COPY.story, destination: ABOUT_PATH }),
 			Object.freeze({ label: COPY.media, destination: MEDIA_PATH }),
diff --git a/app/browser/helpers.ts b/app/browser/helpers.ts
index 71ffe4a..f0764fc 100644
--- a/app/browser/helpers.ts
+++ b/app/browser/helpers.ts
@@ -325,3 +325,24 @@ export function readHost(href: string): string {
 export function shellHref(destination: string): string {
 	return destination.startsWith('/') ? hashHref(destination) : destination
 }
+
+/**
+ * Builds the accessible name a control answers to where its label alone repeats on the screen.
+ *
+ * @remarks
+ * The shell repeats a destination the screen names too — a footer column beside a listing entry,
+ * the masthead action beside the screen's own. The repeat announces the region carrying it, so one
+ * name answers for one control and the label a reader sees still opens the name.
+ *
+ * @param label - The label the control renders
+ * @param region - The name of the region the control sits in
+ * @returns The label followed by the region
+ *
+ * @example
+ * ```ts
+ * buildName('RoughNotes-Pro', 'Products') // 'RoughNotes-Pro, Products'
+ * ```
+ */
+export function buildName(label: string, region: string): string {
+	return `${label}, ${region}`
+}
diff --git a/tests/app/browser/App.test.ts b/tests/app/browser/App.test.ts
index 1fc7885..b4ab283 100644
--- a/tests/app/browser/App.test.ts
+++ b/tests/app/browser/App.test.ts
@@ -1,9 +1,47 @@
 import { afterEach, describe, expect, it } from 'vitest'
 import { page } from 'vitest/browser'
-import { requireValue } from '@orkestrel/test'
-import { describeFocus, findRule, readClasses } from '@orkestrel/test/browser'
-import { COPY, FOOTER_GROUPS, UTILITY_GROUPS } from '@app/browser'
-import { clearSurface, openSurface } from './setup.js'
+import { requireValue, waitForCondition } from '@orkestrel/test'
+import {
+	FOCUSABLE_SELECTOR,
+	clickAccessible,
+	describeFocus,
+	findRule,
+	isReachable,
+	readClasses,
+	readName,
+	readStates,
+	resolveAccessible,
+	waitForState,
+} from '@orkestrel/test/browser'
+import {
+	ABOUT_PATH,
+	CONTACT_PATH,
+	COPY,
+	FOOTER_GROUPS,
+	HOME_PATH,
+	MAGAZINE_PATH,
+	MARKETPLACE_PATH,
+	MEDIA_PATH,
+	NEWSLETTER_PATH,
+	PAYMENT_PATH,
+	PRODUCTS_PATH,
+	PUBLICATIONS_PATH,
+	SHOP_PATH,
+	SUBSCRIBE_PATH,
+	UTILITY_GROUPS,
+	hashHref,
+} from '@app/browser'
+import {
+	DETAIL_SLUGS,
+	SETTLE_BUDGET,
+	SETTLE_INTERVAL,
+	clearSurface,
+	closeSite,
+	openSite,
+	openSurface,
+	readCompact,
+	readRefusal,
+} from './setup.js'
 
 /** The hrefs the footer owes, in reading order, declared apart from the source that builds them. */
 const FOOTER_HREFS: readonly string[] = [
@@ -24,12 +62,131 @@ const FOOTER_HREFS: readonly string[] = [
 	'mailto:rnc@roughnotes.com',
 ]
 
+/**
+ * The accessible name every shell destination announces, in reading order, declared apart from the
+ * source that builds them.
+ */
+const SHELL_NAMES: readonly string[] = [
+	'800-428-4384, Contact',
+	'rnc@roughnotes.com, Contact',
+	'RoughNotes-Pro Login, Logins',
+	'Advantage-Plus Login, Logins',
+	'Get started, Site',
+	'About, Site',
+	'Publications, Site',
+	'Products, Site',
+	'Shop, Site',
+	'Get started, Site',
+	'About, Site',
+	'Publications, Site',
+	'Products, Site',
+	'Shop, Site',
+	'Contact, Site',
+	'Get started, Menu',
+	'RoughNotes-Pro, Products',
+	'Advantage-Plus, Products',
+	'The Insurance Marketplace, Products',
+	'Publication desks, Resources',
+	'Magazine issue, Resources',
+	'Marketplace search, Resources',
+	'Newsletter, Resources',
+	'Free magazine delivery, Resources',
+	'Our story, Company',
+	'Media kits, Company',
+	'Write to us, Company',
+	'Shop catalog, Company',
+	'Existing invoice, Company',
+	'800-428-4384, Company',
+	'rnc@roughnotes.com, Company',
+]
+
 /** The viewports the shell changes shape at. */
 const WIDTHS: ReadonlyArray<readonly [number, number]> = [
 	[1280, 800],
 	[390, 844],
 ]
 
+/**
+ * The screens the product guide's data-state table names, each detail on a slug the catalog holds.
+ */
+const ROUTES: readonly string[] = [
+	HOME_PATH,
+	ABOUT_PATH,
+	PUBLICATIONS_PATH,
+	PRODUCTS_PATH,
+	`${PRODUCTS_PATH}/${requireValue(DETAIL_SLUGS.product)}`,
+	MAGAZINE_PATH,
+	`${MAGAZINE_PATH}/${requireValue(DETAIL_SLUGS.article)}`,
+	MARKETPLACE_PATH,
+	SHOP_PATH,
+	`${SHOP_PATH}/${requireValue(DETAIL_SLUGS.item)}`,
+	MEDIA_PATH,
+	SUBSCRIBE_PATH,
+	NEWSLETTER_PATH,
+	CONTACT_PATH,
+	PAYMENT_PATH,
+]
+
+/** Names the voice the resolver raises when one name answers for several reachable controls. */
+const AMBIGUOUS = 'is ambiguous across'
+
+/** Caps the walk over every screen at both widths, in ms. */
+const CENSUS_BUDGET = 180_000
+
+/**
+ * Reads the screen heading the shell is painting.
+ *
+ * @returns The rendered `h1` text, or an empty string before a screen has painted one
+ */
+function readHeading(): string {
+	return document.querySelector('#main h1')?.textContent?.trim() ?? ''
+}
+
+/**
+ * Lands on one screen the way a person opening a bookmark lands on it, and waits for its heading.
+ *
+ * @param path - The registered path to land on
+ *
+ * @remarks
+ * The navigator carries `history: false`, so a hash write is the same navigation a destination link
+ * performs. The wait reads the painted heading rather than the controller, because a heading that
+ * has replaced the previous one is what tells a reader the screen arrived.
+ */
+async function followRoute(path: string): Promise<void> {
+	const previous = readHeading()
+	window.location.hash = hashHref(path)
+	await waitForCondition(
+		`${path} paints its own heading`,
+		() => readHeading().length > 0 && readHeading() !== previous,
+		{ budget: SETTLE_BUDGET, interval: SETTLE_INTERVAL },
+	)
+}
+
+/**
+ * Reads every accessible name the painted screen offers a person more than one control under.
+ *
+ * @returns The resolver's own refusal for each shared name, in reading order
+ *
+ * @remarks
+ * The population is what the layer counts as focusable, filtered by the layer's own reachability,
+ * so the census walks the controls a person can reach rather than a hand-picked list. Each name
+ * then goes back through the resolver, so the finding is the voice a journey would meet.
+ */
+function readShared(): readonly string[] {
+	const names = new Set<string>()
+	for (const node of document.querySelectorAll(FOCUSABLE_SELECTOR)) {
+		if (!isReachable(node)) continue
+		const name = readName(node)
+		if (name.length > 0) names.add(name)
+	}
+	const shared: string[] = []
+	for (const name of names) {
+		const refusal = readRefusal(name)
+		if (refusal !== undefined && refusal.includes(AMBIGUOUS)) shared.push(refusal)
+	}
+	return shared
+}
+
 /**
  * Reads what a pointer aimed at a control's own centre actually reaches.
  *
@@ -147,6 +304,19 @@ describe('App', () => {
 		}
 	})
 
+	it('names every shell destination for the region carrying it', async () => {
+		const { host } = await openSurface()
+		const utility = [...host.querySelectorAll('ul[aria-label]')].flatMap((list) => [
+			...list.querySelectorAll('a'),
+		])
+		const masthead = [...host.querySelectorAll('.masthead .btn-primary, .masthead .nav-link')]
+		const menu = [...host.querySelectorAll('#site-menu .nav-link, #site-menu .btn-primary')]
+		const footer = [...requireValue(host.querySelector('footer')).querySelectorAll('a')]
+		expect([...utility, ...masthead, ...menu, ...footer].map((node) => readName(node))).toEqual(
+			SHELL_NAMES,
+		)
+	})
+
 	it('keeps the masthead sticky from lg and lets it scroll away below it', async () => {
 		const readings: string[] = []
 		for (const [width, height] of WIDTHS) {
@@ -176,6 +346,47 @@ describe('App', () => {
 		await page.viewport(1280, 800)
 	})
 
+	it('announces the compact menu trigger as collapsed, expanded, and collapsed again', async () => {
+		await page.viewport(390, 844)
+		await openSurface()
+		expect(readStates(resolveAccessible('button', COPY.menu))).toContain('collapsed')
+		await clickAccessible('button', COPY.menu)
+		expect(
+			await waitForState('button', COPY.menu, 'expanded', { budget: SETTLE_BUDGET }),
+		).toContain('expanded')
+		await clickAccessible('button', COPY.close)
+		expect(
+			await waitForState('button', COPY.menu, 'collapsed', { budget: SETTLE_BUDGET }),
+		).toContain('collapsed')
+		clearSurface()
+		await page.viewport(1280, 800)
+	})
+
+	it(
+		'leaves no reachable control on any screen sharing a name with another',
+		async () => {
+			const findings: string[] = []
+			for (const [width, height] of WIDTHS) {
+				await page.viewport(width, height)
+				await openSurface()
+				for (const [index, path] of ROUTES.entries()) {
+					if (index > 0) await followRoute(path)
+					findings.push(...readShared().map((voice) => `${String(width)} px | ${path} | ${voice}`))
+					if (!readCompact()) continue
+					await openSite()
+					findings.push(
+						...readShared().map((voice) => `${String(width)} px | ${path} | menu open | ${voice}`),
+					)
+					await closeSite()
+				}
+				clearSurface()
+			}
+			await page.viewport(1280, 800)
+			expect(findings).toEqual([])
+		},
+		CENSUS_BUDGET,
+	)
+
 	it('leaves no two adjacent focus stops sharing an accessible name', async () => {
 		for (const [width, height] of WIDTHS) {
 			await page.viewport(width, height)
diff --git a/tests/app/browser/integration.test.ts b/tests/app/browser/integration.test.ts
index 80113be..f561f1a 100644
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -7,7 +7,6 @@ import {
 	build,
 	clearStorage,
 	clickAccessible,
-	clickAccessibleWithin,
 	createJournal,
 	createPortfolio,
 	describeFocus,
@@ -36,6 +35,7 @@ import {
 	MAGAZINE_PATH,
 	PAYMENT_PATH,
 	SUBSCRIBE_PATH,
+	buildName,
 	hashHref,
 	skuHref,
 } from '@app/browser'
@@ -486,7 +486,7 @@ describe('knowledge site journeys', () => {
 			// masthead proves the shell's tab order and says nothing about the screen under it.
 			await traverseAccessible(COPY.explore)
 			await openSite()
-			await traverseAccessible(COPY.shop)
+			await traverseAccessible(buildName(COPY.shop, COPY.site))
 			await closeSite()
 			await startSubscription()
 			await waitForText('the subscribe view paints', 'Free print and digital delivery')
@@ -506,20 +506,18 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await followSite('Products')
+			await followSite(buildName(COPY.products, COPY.site))
 			await waitForText('the products listing paints', 'Choose the desk your agency needs')
 			await traverseAccessible(COPY.skip)
 			await clickAccessible('link', COPY.skip)
 			expect(document.activeElement?.id).toBe('main')
 			expect(readPage()).toContain('Choose the desk your agency needs')
 			await place('product-listing')
-			// The first listed desk answers for the entry and for the footer destination alike, and a
-			// walk resolves a bare name, so the walk takes the first desk the listing alone names.
-			expect(readRefusal('RoughNotes-Pro')).toBe(
-				'Interactive target "RoughNotes-Pro" is ambiguous across 2 elements',
-			)
+			// The listing entry owns the desk's name: the footer destination carrying the same label
+			// announces the footer column it sits in, so the bare name reaches the entry alone.
+			expect(readRefusal('RoughNotes-Pro')).toBeUndefined()
 			await traverseAccessible('PF&M Online')
-			await clickAccessibleWithin(COPY.offerings, 'link', 'RoughNotes-Pro')
+			await clickAccessible('link', 'RoughNotes-Pro')
 			// The desk's audience sentence is the detail's own: the listing paints every summary,
 			// and one of those summaries names PF&M, so both of those read the same on either screen.
 			await waitForText(
@@ -542,11 +540,11 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await followSite('Publications')
+			await followSite(buildName(COPY.publications, COPY.site))
 			await waitForText('the publications hub paints', 'The magazine and the Insurance Marketplace')
 			await place('publications')
 			await traverseAccessible('Rough Notes magazine')
-			await clickAccessibleWithin(COPY.publications, 'link', 'Rough Notes magazine')
+			await clickAccessible('link', 'Rough Notes magazine')
 			await waitForText('the magazine paints', 'Coverage, markets, and agency practice')
 			expect(readRefusal(COPY.all)).toBe(
 				`No interactive element has the accessible name "${COPY.all}"`,
@@ -585,9 +583,9 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await followSite('Publications')
+			await followSite(buildName(COPY.publications, COPY.site))
 			await waitForText('the publications hub paints', 'The magazine and the Insurance Marketplace')
-			await clickAccessibleWithin(COPY.publications, 'link', 'The Insurance Marketplace')
+			await clickAccessible('link', 'The Insurance Marketplace')
 			await waitForText('the marketplace paints', 'Search a fixture sample of specialty markets')
 			expect(readPage()).toContain('Restaurant general liability')
 			expect(readRefusal(COPY.clear)).toBe(
@@ -649,7 +647,7 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await followSite('About')
+			await followSite(buildName(COPY.about, COPY.site))
 			await waitForText('the about view paints', 'About Rough Notes')
 			await waitForOrigin()
 			expect(readPage()).toContain('Serve the independent agent market')
@@ -668,9 +666,9 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await followSite('Publications')
+			await followSite(buildName(COPY.publications, COPY.site))
 			await waitForText('the publications hub paints', 'The magazine and the Insurance Marketplace')
-			await clickAccessibleWithin(COPY.publications, 'link', COPY.newsletter)
+			await clickAccessible('link', COPY.newsletter)
 			await waitForText('the newsletter view paints', 'It is about you, the customer')
 			expect(readPage()).toContain('Rough Notes newsletters')
 			await place('newsletter')
@@ -694,7 +692,7 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await clickAccessible('link', COPY.media)
+			await clickAccessible('link', buildName(COPY.media, COPY.company))
 			await waitForText(
 				'the media view paints',
 				'Files open on Rough Notes. They are not stored in this application.',
@@ -716,7 +714,7 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await followSite('Shop')
+			await followSite(buildName(COPY.shop, COPY.site))
 			await waitForText('the shop paints', 'A fixture sample of books')
 			const live = resolveAccessible('link', COPY.live)
 			expect(live.getAttribute('href')).toContain('shoppingcart.roughnotes.com')
@@ -758,7 +756,7 @@ describe('knowledge site journeys', () => {
 			// only the catalog is smaller.
 			const { app } = await openSurface({ catalog: { skus: [UNINDEXED_SKU] } })
 			await paintVariant(app, VARIANT)
-			await followSite('Shop')
+			await followSite(buildName(COPY.shop, COPY.site))
 			await waitForText('the shop paints', UNINDEXED_SKU.name)
 			expect(readRefusal(COPY.every)).toBe(
 				`No interactive element has the accessible name "${COPY.every}"`,
@@ -785,7 +783,7 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await clickAccessible('link', COPY.write)
+			await clickAccessible('link', buildName(COPY.write, COPY.company))
 			await waitForText('the contact view paints', 'Write the Indianapolis office')
 			await waitForOrigin()
 			expect(readPage()).not.toContain(HOME_HEADING)
@@ -821,7 +819,7 @@ describe('knowledge site journeys', () => {
 			await page.viewport(CURRENT.width, CURRENT.height)
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
-			await followSite('Shop')
+			await followSite(buildName(COPY.shop, COPY.site))
 			await waitForText('the shop paints', 'A fixture sample of books')
 			await clickAccessible('link', COPY.payment)
 			// The shop's own continuation carries the words `Pay a bill`, so the desk's instruction
@@ -867,11 +865,11 @@ describe('knowledge site journeys', () => {
 			const { app } = await openSurface()
 			await paintVariant(app, VARIANT)
 			expect(readRefusal('Sign In')).toBe(SIGN_IN_ABSENT)
-			const pro = resolveAccessible('link', COPY.pro)
+			const pro = resolveAccessible('link', buildName(COPY.pro, COPY.logins))
 			expect(pro.getAttribute('href')).toContain('shoppingcart.roughnotes.com')
 			expect(pro.getAttribute('rel')).toBe('noreferrer')
 			await openSite()
-			const shop = resolveAccessible('link', COPY.shop)
+			const shop = resolveAccessible('link', buildName(COPY.shop, COPY.site))
 			expect(shop.getAttribute('href')).toBe('#/shop')
 			expect(readRefusal('PF&M database')).toBe(
 				'No interactive element has the accessible name "PF&M database"',
diff --git a/tests/app/browser/setup.ts b/tests/app/browser/setup.ts
index bac6d5b..8bb0f1b 100644
--- a/tests/app/browser/setup.ts
+++ b/tests/app/browser/setup.ts
@@ -27,6 +27,7 @@ import {
 	App,
 	COPY,
 	THEME_DARK,
+	buildName,
 	createApplication,
 	createMemoryStorage,
 	useTheme,
@@ -262,13 +263,13 @@ export const COMMIT_CONTROL: MatrixControl = Object.freeze({
  * Names the quiet destination the footer carries to the shop.
  *
  * @remarks
- * Home paints no link under this name, so the name resolves to the footer's own destination and
- * the matrix reads the shell's plain link rather than a screen's.
+ * The footer announces the column carrying each destination, so this name reaches the footer's own
+ * link and the matrix reads the shell's plain link rather than a screen's.
  */
 export const CONTENT_CONTROL: MatrixControl = Object.freeze({
 	label: 'footer destination',
 	role: 'link',
-	name: COPY.catalog,
+	name: buildName(COPY.catalog, COPY.company),
 })
 
 /** Names the magazine filter row's selected control. */
```
