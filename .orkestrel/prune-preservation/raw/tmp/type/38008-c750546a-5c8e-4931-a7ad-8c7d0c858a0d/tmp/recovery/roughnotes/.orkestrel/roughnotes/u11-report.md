# Unit 11 report — the journey and transport layer

Every criterion is done. R1, R2, R3, R8, R9, and R10 are closed in the two owned files. R7 is built
and driven, and the interface's answer to a refused write is recorded here as a surface finding
rather than worked around.

**Touched files**

- `tests/app/browser/integration.test.ts` — traversals per surface, arrival assertions the
  destination alone satisfies, the shop department journeys, the announced-state assertions, the
  storage-failure transport leg, and `home` placed at the assertion that proves the home condition.
- `tests/app/browser/setup.ts` — the two masthead refusals pinned to one voice each with corrected
  remarks, the `QuotaStorage` real store, and the `readAnnounced` state reader.

**Diffstat**

```text
 tests/app/browser/integration.test.ts | 142 ++++++++++++++++++++++++++++++++--
 tests/app/browser/setup.ts            | 129 +++++++++++++++++++++++++++++--
 2 files changed, 256 insertions(+), 15 deletions(-)
```

## 1. Done / not done

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `oxfmt --check` on the owned files | Done | `All matched files use the correct format.` |
| 2 | `oxlint --deny-warnings` on the owned files | Done | No diagnostic, exit 0 |
| 3 | `npm run check` | Done | exit 0, taken after the final edit |
| 4 | A forward-Tab traversal per surface, of a control that surface owns | Done | § 2 |
| 5 | No assertion passes on more than one resolver voice | Done | § 3 |
| 6 | R3 closed for both detail journeys, negative beside positive, others swept | Done | § 4 |
| 7 | The storage-failure leg drives a real failing store, and the finding is recorded | Done | § 5 |
| 8 | The shop department filter is pressed, its filtered and missed states registered and placed | Done | `shop-filtered` and `shop-miss` are in the registry, both are placed, and the placement proof is green |
| 9 | `pressed` asserted where a journey sets it, and on an unselected sibling | Done | § 6 |
| 10 | `npm run test:journey` green for all four projects | Done | `Test Files 4 passed (4)`, `Tests 76 passed / 4 skipped (80)`, exit 0, 38.71s |
| 11 | `VITE_CAPTURE=true npm run test:journey` green twice, every registered frame written | Done | Run A: exit 0, `Tests 80 passed (80)`, 104 files in `tmp/capture/states`. Run B: exit 0, `Tests 80 passed (80)`, 104 files. |
| 12 | `npm test` exits 0 | Done | exit 0: `app` 181 passed over 43 files, `journey` 76 passed and 4 skipped over 4 files, `policy` 111 passed, `config` 46 passed |

The registry holds the states it held before this unit plus `shop-filtered` and `shop-miss`, so a
capture run writes 104 files where it wrote 96. Both capture runs wrote 104, and the disk-membership
proof passed in each.

### The failing proof R3 rests on

R3 is a false green: the assertions it names passed before this unit and proved nothing, so there is
no pre-fix red run to quote. The binding is proven the other way, by a negative control run on one
project with the three navigations removed and the old assertions left standing where the person is
still on the origin screen.

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project 'journey:light-1280'`

With the navigations removed: `Tests 4 failed | 15 passed | 1 skipped (20)`, exit 1.

- `opens the featured product from the site navigation` — `Condition "the product page paints" did not hold within 4000ms`
- `opens the shop catalog, narrows it to a department, and opens a SKU detail` — `Condition "the SKU paints" did not hold within 4000ms`
- `keeps invoice review enabled, announces a refusal, and accepts a valid amount` — `Condition "the payment view paints" did not hold within 4000ms`
- `places every registered state and places nothing else` — the three journeys stopped before their placements

In that same run, standing on the origin screen, `Policy Forms & Manual Analysis`, `The producer
toolkit`, `Catalog #30040`, `$78.00`, and `Pay a bill` all read as present. Each old assertion
passed on the screen the journey had not yet left, and each new predicate went red at the same
moment. That is what binds the new predicates to arrival.

After the navigations were restored, the same project is green inside the full journey run recorded
against criterion 10.

## 2. Traversals

Every routed surface carries a forward-Tab walk to a control that surface owns, inside the journey
standing on it. The skip link is excluded, and the fixture button in the matrix family is not
counted.

| Surface | Journey | Control the walk lands on |
| ------- | ------- | ------------------------- |
| home | lands on home and reaches subscribe | `Explore products` |
| shell masthead | lands on home and reaches subscribe | `Shop`, kept from before, which proves the shell rather than the screen |
| subscribe | lands on home and reaches subscribe | `Subscribe free` |
| products listing | opens the featured product | `PF&M Online` |
| product detail | opens the featured product | `Ask about this product` |
| publications | filters the magazine | `Rough Notes magazine` |
| magazine listing | filters the magazine | `Program business` |
| magazine detail | filters the magazine | `Read the magazine` |
| marketplace | searches the marketplace sample | `Coverage or industry` |
| about | opens about | `Explore products` |
| newsletter | opens the newsletter | `Subscribe free` |
| media | opens media kits | `2027 Rough Notes magazine rate card` |
| shop listing | opens the shop catalog | `Live catalog` |
| shop detail | opens the shop catalog | `Live catalog` |
| contact | keeps contact enabled | `Send inquiry` |
| payment | keeps invoice review enabled | `Customer number` |

Two targets are not the control the brief named. Each is recorded here with its reason.

- **Products listing.** The brief names the first entry link. `traverseAccessible` resolves a bare
  name, and `RoughNotes-Pro` answers for the listing entry and for the footer destination alike, so
  the walk cannot take it. The journey pins that ambiguity as a refusal assertion —
  `Interactive target "RoughNotes-Pro" is ambiguous across 2 elements` — and walks to `PF&M Online`,
  the first listed desk whose name the listing alone carries. The assertion holds at 1280 and at
  390, proven by the green run over all four variants.
- **Product detail.** The brief names the primary action, which is `Get started`. The masthead
  carries a `Get started` destination on every screen, so that name answers for two reachable
  elements on the detail screen too. The walk takes `Ask about this product`, the detail's own verb.

## 3. Refusal voices

Every refusal assertion in the two owned files, and the one voice it pins.

| Site | Assertion | Voice pinned |
| ---- | --------- | ------------ |
| `setup.ts` `openSite`, wide viewport | `refusal !== MENU_UNREACHABLE` throws | `Interactive target "Menu" is not visible and focus-reachable` |
| `setup.ts` `closeSite`, wide viewport | `refusal !== CLOSE_UNREACHABLE` throws | `Interactive target "Close menu" is not visible and focus-reachable` |
| home journey | `readRefusal(theme control)` is `undefined` | No refusal: the control resolves |
| magazine journey | `readRefusal(COPY.all)` | `No interactive element has the accessible name "Show all articles"` |
| marketplace journey | `readRefusal(COPY.clear)` | `No interactive element has the accessible name "Clear search"` |
| products journey | `readRefusal('RoughNotes-Pro')` | `Interactive target "RoughNotes-Pro" is ambiguous across 2 elements` |
| shop department journey | `readRefusal(COPY.every)` | `No interactive element has the accessible name "Show all items"` |
| subscribe journey | `readRefusal(COPY.subscribe)` is `undefined` | No refusal: the commit resolves |
| newsletter journey | `readRefusal(COPY.subscribe)` is `undefined` | No refusal: the commit resolves |
| contact journey | `readRefusal(COPY.send)` is `undefined` | No refusal: the commit resolves |
| payment journey | `readRefusal(COPY.pay)` is `undefined` | No refusal: the commit resolves |
| refusal journey | `readRefusal('Sign In')` | `No interactive element has the accessible name "Sign In"` |
| refusal journey | `readRefusal('PF&M database')` | `No interactive element has the accessible name "PF&M database"` |

R2's diagnosis is confirmed by the run rather than by reading the markup. The `light-1280` and
`dark-1280` projects are green with `openSite` and `closeSite` demanding the present-but-unreachable
voice, so at 1280 the masthead renders the trigger and the dismissal and paints no box for either.
Both remarks say that, where they claimed absence before.

## 4. R3 — arrival

### Product detail

The journey polled `Policy Forms & Manual Analysis` and asserted `The producer toolkit`. The listing
paints every desk's summary, and the `PF&M Online` summary opens with `Policy Forms & Manual
Analysis`, so both strings read as present on the listing the person had not left.

It polls the desk's audience sentence, `Individual producers who need the full technical desk on
every device.`, asserts the `Who it is for` heading beside it, and asserts the negative: the
listing's own lead, `Choose the desk your agency needs`, is gone.

### Shop detail

The journey polled `Catalog #30040` and asserted `$78.00`. The listing prints each entry's catalog
code and price as facts, so both read as present on the listing.

It polls `Catalog record`, asserts `Plus shipping and handling on a live order.` beside it, and
asserts the negative: the listing's lead, `A fixture sample of books`, is gone.

### The sweep of every other journey

One more journey carried the same shape, and this unit fixed it.

- **Payment.** The journey reached the desk from the shop listing and polled `COPY.payment`, which
  is `Pay a bill`. The shop listing's own continuation carries that same wording, so the predicate
  was already true before the click. It polls the desk's instruction, `Enter the customer number,
  the invoice number, and the full invoice amount.`, and asserts that the shop's lead is gone.

The rest assert a string the destination alone renders, checked against the screen each one
navigates from.

| Journey leg | Arrival string | Origin screen |
| ----------- | -------------- | ------------- |
| home to subscribe | `Free print and digital delivery` | home paints `Free print and digital subscription`, a different sentence |
| home to products listing | `Choose the desk your agency needs` | absent from home |
| publications to magazine | `Coverage, markets, and agency practice` | absent from the publications hub |
| magazine to article | `Court readings of occurrence continue to split insurers` | the listing paints the dek, not the body |
| publications to marketplace | `Search a fixture sample of specialty markets` | absent from the publications hub |
| home to about | `About Rough Notes` | absent from home |
| publications to newsletter | `It is about you, the customer` | absent from the publications hub |
| home to media | `Files open on Rough Notes. They are not stored in this application.` | absent from home |
| home to shop listing | `A fixture sample of books` | absent from home |
| home to contact | `Write the Indianapolis office` | absent from home |
| magazine filter legs | `No articles in this category.`, then the restored article title | each absent from the state before the press |

Negatives are now asserted beside the positive on the subscribe, about, article, contact, payment,
product-detail, and shop-detail arrivals, and on both shop department legs.

## 5. The storage failure

### What was built

`QuotaStorage` in `tests/app/browser/setup.ts`. It implements `Storage` over a real
`createMemoryStorage` store, accepts the number of writes its `QuotaOptions` declares, and raises a
`DOMException` named `QuotaExceededError` for every write after that, which is the condition a
browser raises when an origin's storage is full. Reads answer from what the store accepted, so a
journey can read what the application kept. Nothing is replaced or simulated: the application holds
a real `Storage` either way.

### What was driven

The transport block's `keeps the painted mode when the store refuses the write the theme control
makes`. The store is armed with one write, which `start` spends applying the stored mode, so the
theme control a person presses next makes the first write the store refuses. The press goes through
`toggleThemeControl`, which resolves the control by the name the painted mode obliges the masthead
to offer, so no step reaches past the interface.

### What the interface does

Nothing a person can see, and one thing a person cannot.

- **The mode does not change.** `data-bs-theme` is still `light` after the press. `writeTheme` writes
  the store before it paints the root, so the refusal stops the paint.
- **Nothing is persisted.** The store still holds `light`.
- **The page is unchanged.** The test captures `readPage()` before the press and asserts the page
  reads identically after it. There is no failure sentence, no alert, no status, and no retry
  control. That assertion passes, so the interface says nothing at all.
- **The control announces a mode the page is not in.** `ApplicationController.theme` assigns
  `dark.value` before it writes, so the flag flips and the refusal never unwinds it. The masthead
  control relabels itself `Use light theme` and announces `pressed=true` while the document paints
  light. The journey asserts that state, so the drift is pinned rather than described.
- **The refusal escapes as an uncaught error.** The handler does not catch it, so it reaches the
  window. The run records `[Vue warn]: Unhandled error during execution of native event handler` and
  `[Unhandled error] QuotaExceededError: No room is left for roughnotes-theme`. Vitest logs it to
  stderr and the test still passes, so nothing in the suite fails on it and nothing in the product
  reports it.

### The finding

**A refused theme write is unreported, and it leaves the control announcing a mode the page does not
paint.** The skill requires the visible half of the transport family, which is the failure sentence
a person reads and the retry control that clears it, and this surface offers neither. Writing that
sentence means editing `app/`, which this unit does not own, so the step is reported as a finding
about the interface rather than worked around in the layer. Closing it takes three decisions the
application owns: catch the refusal at the boundary that performs the write, unwind the flag the
write was meant to persist so the control stops announcing an unpainted mode, and paint a sentence
with a retry a journey can then drive and capture.

## 6. Announced state

`pressed` is asserted beside every drive that sets it, and on an unselected sibling.

| Control | Journey | Asserted |
| ------- | ------- | -------- |
| magazine filter `Program business` | filters the magazine | `pressed=false` before the press, `pressed=true` after, `pressed=false` again after the listing is restored |
| magazine filter `All articles` | filters the magazine | `pressed=true` at arrival, `pressed=false` while the category filter holds, `pressed=true` after the restore |
| shop filter `Calculator wheels` | opens the shop catalog | `pressed=false` at arrival, `pressed=true` after the press, `pressed=false` after the restore |
| shop filter `All items` | opens the shop catalog | `pressed=true` at arrival, `pressed=false` while the department filter holds, `pressed=true` after the restore |
| shop filter, vacant department | reports a department this catalog cannot fill | `pressed=true` on the pressed department, `pressed=false` on `All items`, then `pressed=true` on `All items` after the restore |
| theme control | hands the persisted theme to a second session | `pressed=false` before the toggle, `pressed=true` after |
| theme control, refused write | keeps the painted mode when the store refuses the write | `pressed=false` before the press, `pressed=true` after, against a document still painting light |

`readAnnounced` in the setup module is the one reader these use. It resolves the control by its
accessible name and returns the layer's `readStates` reading, so no test file declares a resolver.

## 7. Observations

- **The shop `miss` needs a smaller catalog.** Every shipped department holds items, so no press on
  the full catalog can paint `No items in this department.`. The filtered state is reached on the
  shipped catalog inside the shop journey. The missed state is reached in a second journey that
  mounts the real application over a catalog reporting one department, the way the matrix family
  already reaches the empty issue and the unindexed book. The states are named `shop-filtered` and
  `shop-miss`, matching `marketplace-miss` rather than the brief's word `missed`.
- **Durations.** The journey run took 38.71s. Each capture run took about 48s. `npm test` took about
  80s across its four legs. Bootstrap's 329 Sass deprecation warnings appeared in every run, as the
  brief said they would.
- **`CONTENT_CONTROL` names the wrong element.** Its comment calls `Shop catalog` the in-content link
  home carries to the shop, and home paints no such link. The name resolves to the footer
  destination, which is why it is not ambiguous. The matrix family reads it, so the correction
  belongs to unit 12's file scope rather than to a journey.
- **Repeated accessible names across the shell and a listing.** `RoughNotes-Pro`, `Advantage-Plus`,
  and `The Insurance Marketplace` each answer for a listing entry and a footer destination on the
  products listing. `Get started` answers for the masthead destination and a screen's own
  continuation on several screens. Region-scoped clicks already work around this, and a bare-name
  walk cannot. This is a surface finding about the footer sharing its labels with the content.

## 8. What I did not close

- **The visible half of the storage failure.** It takes an edit to `app/`, which this unit does not
  own. Recorded in § 5 as a surface finding, with what closing it requires.
- **The statechart family.** Not added, and not owed. `.orkestrel/roughnotes/journey-readiness-verdict.md`
  records why: this application declares no entity carrying the state and event unions the family
  must be typed on.
- **R4, R5, and R6.** The verdict routes the style instruments to unit 12.
