# Unit P1 report — the confirmations tell the truth, and the forms say what happens to a person's data

## 1. Done / not done per criterion

| # | Criterion | State | Evidence |
| - | --------- | ----- | -------- |
| 1 | `oxfmt --check` on owned files | done | `All matched files use the correct format.` over 13 files. Ran `oxfmt --write` scoped to those 13 files first, never tree-wide. |
| 2 | `oxlint --deny-warnings` on owned files | done | No diagnostic on 13 files. |
| 3 | `npm run check` | done | `tsc --noEmit`, `check:app:core`, `check:app:browser` all clean. `CHECK_EXIT=0`. |
| 4 | No confirmation surface claims a request was sent, received, delivered, answered, or paid | done | Rendered text of all three confirmations quoted in § 2, read out of a real mount rather than out of source. |
| 5 | A privacy notice reaches a person at the point of collection, stating only what is true | done | § 3. Proved by one test per form, each of which ran red first. |
| 6 | Every test asserting a changed string updated; no old string survives outside `.orkestrel/` | done for code and tests, **not done for `guides/README.md`** (off-limits) | § 4 sweep. The guide drift has an exact patch in § 6. |
| 7 | `npm test` exits 0, per-project counts | done | `TEST_EXIT=0`. Counts in § 5. |
| 8 | `npm run build` succeeds, no `deprecat` line, CSS asset 323.24 kB | done | `BUILD_EXIT=0`; `grep -ic deprecat` on the build log returns 0; `index-hhVhdyP4.css 323.24 kB` — unmoved. |

### Failing-first proof

Every assertion added or changed ran red against the committed baseline sources before the fix.

Procedure: the seven edited source files were copied to the scratchpad, the baseline content was
written back over them with `git show HEAD:<path> > <path>`, the suite ran, and the edited files
were copied back and verified byte-identical with `diff -q`. No `git checkout`, `restore`, `stash`,
`reset`, or `clean` was used.

Command, identical on both runs:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser \
  tests/app/browser/components/ContactView.test.ts \
  tests/app/browser/components/SubscribeView.test.ts \
  tests/app/browser/components/PaymentView.test.ts \
  tests/app/browser/components/ContactForm.test.ts \
  tests/app/browser/components/SubscribeForm.test.ts \
  tests/app/browser/components/PaymentForm.test.ts
```

- Before the fix: `Test Files 6 failed (6)` / `Tests 6 failed | 20 passed (26)`.
- After the fix: `Test Files 6 passed (6)` / `Tests 26 passed (26)`.

The red cases were:

- `ContactForm > tells a person what happens to what they type, before any field` — `Value is required`, because no notice element existed.
- `SubscribeForm > tells a person what happens to what they type, before any field` — same.
- `PaymentForm > tells a person what happens to what they type, before any field` — same.
- `ContactView > restates an accepted inquiry without implying what was never entered` — expected the page to contain `Nothing reached the Indianapolis office`.
- `SubscribeView > restates the accepted subscription and carries a real continuation` — `expected [ 'Recorded with this subscription' ] to include 'What a subscription carries'`.
- `PaymentView > reads the recorded invoice back and sends the reader on to settle it` — expected the page to contain `It took no card and settled no invoice`.

### What settled the notice's wording

`tmp/probe/p1storage.test.ts` drives the real `ApplicationController` over a real `MemoryStorage`,
submits an inquiry, a subscription, and an invoice, then prints every storage key:

```
STORAGE KEYS AFTER THREE SUBMITS: []
ACCEPTED INQUIRY: {"name":"Ada Lovelace","company":"Lovelace Agency","email":"ada@agency.com","phone":"800-428-4384"}
```

Nothing a person submits reaches storage at all. The accepted record lives in a Vue `shallowRef` and
dies with the page. A separate sweep of `app/**` for `fetch`, `XMLHttpRequest`, `sendBeacon`,
`WebSocket`, `EventSource`, and `axios` returns nothing, so no transmission path exists anywhere in
the application.

**This corrects one clause of the brief.** The brief proposed saying "clearing the site's data
removes it". That would be an invention: there is no site data to clear. The notice says instead
that the page discards what you typed when you close or reload it, which is what the run shows.

## 2. The confirmations — old text and new text

Each "new" block is the rendered text read out of a real mount, not the template source.

### `/contact` — `ContactView.vue`

Old:

> Your inquiry is recorded on this device
> The Indianapolis office answers on the number and address beside this confirmation.

New:

> No inquiry was sent
> This site is a demonstration. Nothing reached the Indianapolis office, and nobody will answer this inquiry. What you typed is below, and it stays in this browser.

The entered fields still follow as a definition list — `Full name Ada Lovelace`, `Company Lovelace
Agency`, `Work email ada@agency.com`, `Phone 800-428-4384` — so the confirmation stays useful.

Further promises on the same screen went with it:

| Site | Old | New |
| ---- | --- | --- |
| lead | `Write the Indianapolis office, or send an inquiry through the form. The form stays on this device.` | `Write the Indianapolis office, or fill in the form beside it. The form is a demonstration and sends nothing.` |
| `gap` notice title | `Recorded without a job title and a message` | `You left out a job title and a message` |
| `gap` notice detail | `The office can add a job title or a note to this inquiry over the phone.` | `Nothing was sent, so there is nothing to complete. The number beside this page reaches the real Rough Notes office.` |
| `#next` | `The desks and the magazine are open to read while the office answers.` | `The desks and the magazine are open to read.` |

The `Call 800-428-4384` control stays. That number reaches the real office, so it is the one real
action on the screen.

### `/subscribe` — `SubscribeView.vue`

Old:

> You are subscribed
> Print and digital delivery is recorded for Ada Lovelace at ada@agency.com.

New:

> No subscription was started
> This site is a demonstration. It holds Ada Lovelace and ada@agency.com in this page only, and no print or digital issue follows.

Two further changes:

- The claims heading was a `computed` that swung from `What the subscription carries` to `Recorded
  with this subscription` on acceptance. The tense was the promise. With the promise gone both
  states want the same heading, so the `computed` is deleted and the heading is the literal `What a
  subscription carries` — it describes the real Rough Notes subscription, never this record. A
  derived label that returns one value for either state is a second label that can drift.
- `#next` lost `Nothing was sent off this device.`, which the confirmation now says above it.

### `/payment` — `PaymentView.vue`

Old:

> The invoice is recorded on this device

with nothing between the status and the figures. `Nothing was charged.` sat in the `#next` block
lower down the page.

New:

> No payment was made
> This site is a demonstration. It took no card and settled no invoice. What you typed is below, and it stays in this browser.

Further changes:

| Site | Old | New |
| ---- | --- | --- |
| lead | `Enter the customer number, the invoice number, and the full invoice amount. This records the request on this device.` | `Enter the customer number, the invoice number, and the full invoice amount.` |
| side panel | `This form records which invoice you are settling. No card number is collected here.` | `This form settles no invoice. Use the Rough Notes billing page to pay one.` |
| `#next` | `Nothing was charged. The Rough Notes billing page takes the card for this invoice.` | `The Rough Notes billing page takes the card for this invoice.` |

The card fact moved to the form itself, beside the fields, where a person meets it before typing.

### The `COPY` ruling

The brief's first unknown: `app/browser/constants.ts` carries the three confirmation headings, and
the views hold every other sentence inline. The off-limits `app/core/constants.ts` was never opened.

```diff
-	accepted: 'You are subscribed',
-	inquiryAccepted: 'Your inquiry is recorded on this device',
-	paymentAccepted: 'The invoice is recorded on this device',
+	accepted: 'No subscription was started',
+	inquiryAccepted: 'No inquiry was sent',
+	paymentAccepted: 'No payment was made',
```

The word `accepted` was the promise. Each value now answers the exact question a person asks after
pressing the button, and answers it first, because anything softer is read as the positive they
expected. The key names the controller's validation state and is unchanged.

## 3. The notice — text, placement, and why there

Text, added to `COPY` as `privacy` and rendered on all three forms:

> What you type here stays in this browser. It is not sent to Rough Notes or anyone else, and this page discards it when you close or reload it.

`PaymentForm.vue` renders it after one more true fact, because that form collects billing
identifiers:

> No card number is collected here. What you type here stays in this browser. It is not sent to Rough Notes or anyone else, and this page discards it when you close or reload it.

**Placement: directly above the fields, inside each form component.** The reasons, in order:

1. A person reads top-down. A notice about what happens to what you type has to arrive **before**
   you type it. The retired `Fixture only — nothing is sent off this device.` line sat under the
   submit control, which a person reaches after entering their name, company, email, and phone.
2. Putting it in the form component rather than the view means `SubscribeForm.vue` carries it to
   `/subscribe` and to `/newsletter`, so `NewsletterView.vue` — which this unit does not own —
   needs no edit for criterion 5 to hold there.
3. It is not on a separate page. There is no privacy page to find, and inventing one would have
   invited a policy describing handling this application does not perform.

Each form's old fine print was removed rather than left beside the notice. A rule stated twice
drifts; each new test asserts its form no longer says `Fixture only`.

**What the notice deliberately does not say.** No retention schedule, no third parties, no rights
request address, no consent language, no cookie claim. Every clause is something the run in § 1
shows. The one storage key this application writes is the colour-mode flag `roughnotes-theme`, which
holds no personal data and is not what a person types into a form.

## 4. The tests — every assertion updated, and the sweep

These assertions quoted a string that changed:

| File | Line | Old assertion | New assertion |
| ---- | ---- | ------------- | ------------- |
| `tests/app/browser/components/ContactView.test.ts` | 83 | `toContain('Recorded without a job title and a message')` | `toContain('You left out a job title and a message')` |
| `tests/app/browser/components/SubscribeView.test.ts` | 53 | `toContain('Recorded with this subscription')` | `toContain('What a subscription carries')` |
| `tests/app/browser/components/PaymentView.test.ts` | 61 | `toBe(COPY.paymentAccepted)` — quotes the symbol, whose value changed | unchanged, plus the bindings below |

The `SubscribeView` heading assertion stopped discriminating once the heading became the same in
either state, so it is no longer left to carry the case alone. Each view case gained a binding on
the new truth and a negative binding on the retired promise:

- `ContactView` — `toContain('Nothing reached the Indianapolis office')` and `not.toContain('answers on the number')`
- `SubscribeView` — `toContain('no print or digital issue follows')` and `not.toContain('delivery is recorded')`
- `PaymentView` — `toContain('It took no card and settled no invoice')` and `not.toContain('Nothing was charged')`

One test name was corrected, because it named the promise being removed:
`ends the accepted screen in the desks the office answers about` becomes
`ends the accepted screen in the desks a reader can actually open`.

New cases bind criterion 5, one per form file, each named for what it proves:
`tells a person what happens to what they type, before any field`. Each resolves the notice
paragraph by its text, asserts the first field **follows** it in document order, and asserts the
form no longer says `Fixture only`.

### The sweep

Patterns run with `grep -rn -F` over `app tests configs scripts docs guides README.md
vite.config.ts package.json` — the whole tree bar `node_modules`, `dist`, `.orkestrel/`, and `tmp/`:

```
You are subscribed                                          → guides/README.md:290, :298
Your inquiry is recorded on this device                     → guides/README.md:318
The invoice is recorded on this device                      → guides/README.md:329
Recorded without                                            → guides/README.md:320
Recorded with this subscription                             → guides/README.md:292
What the subscription carries                               → guides/README.md:292
The Indianapolis office answers on the number and address … → none
Print and digital delivery is recorded for                  → none
Nothing was sent off this device                            → none
Nothing was charged            → tests/…/PaymentView.test.ts:72, a `not.toContain` proving its absence
while the office answers                                    → none
This records the request on this device                     → none
This form records which invoice you are settling            → none
send an inquiry through the form                            → none
The form stays on this device                               → none
The office can add a job title or a note                    → none
```

Every survivor is in `guides/README.md`, which the brief places off-limits. § 6 returns the patch.

## 5. Gate evidence

`npm test` → `TEST_EXIT=0`. Per project:

| Project | Files | Tests | Duration |
| ------- | ----- | ----- | -------- |
| `app:core` + `app:browser` | 43 passed (43) | 189 passed (189) | 31.79s |
| `journey:*`, four variants | 4 passed (4) | 76 passed, 4 skipped (80) | 39.96s |
| `policy` | 1 passed (1) | 111 passed (111) | 1.51s |
| `config` | 1 passed (1) | 46 passed (46) | 1.66s |
| `setup` | 1 passed (1) | 3 passed (3) | 0.23s |
| `conformance` | 1 passed (1) | 12 passed (12) | 0.78s |

The skipped journey cases are `it.runIf(CAPTURING)('writes every frame this run owes')`, one per
variant, skipped because `VITE_CAPTURE` is unset. Pre-existing and unrelated to this unit.

`npm run build` → `BUILD_EXIT=0`, `✓ built in 3.69s`:

```
dist/app/browser/assets/index-hhVhdyP4.css   323.24 kB │ gzip: 48.09 kB
```

The CSS asset did not move. `grep -ic deprecat tmp/units/p1-build.log.txt` returns `0`, and the same
sweep over the test log returns `0`.

Logs retained at `tmp/units/p1-build.log.txt` and `tmp/units/p1-test.log.txt`. The storage
instrument is `tmp/probe/p1storage.test.ts`; it is collected only by `npm run test:probe`, never by
`npm test`.

## 6. Patches for files this unit does not own

These files carry drift this unit created or exposed. All are report-only. Apply them serially.

### Patch A — `guides/README.md`, off-limits, four passages

**A1.** Replace lines 288-293:

```markdown
The form is `novalidate` so `parseSubscription` owns the rules. The submit control stays enabled. A
refusal focuses the summary `The subscription could not be sent`. Summary links focus the named
field and leave the hash on this desk. Above the fields the form states what happens to what a
person types, through `COPY.privacy`. An accepted request paints `No subscription was started` in a
`role="status"` line and replaces the form with the entered name and email under a sentence naming
what did not happen. The invite heading stays `What a subscription carries` in either state, because
it describes the real Rough Notes subscription rather than this record.
```

**A2.** Replace lines 297-299:

```markdown
`NewsletterView` reuses `SubscribeForm`, so it carries the same notice above its fields. The copy is
the live newsletter pitch. An accepted request paints the same `No subscription was started` status
the subscribe desk paints.
```

**A3.** Replace lines 318-322:

```markdown
Above the fields the form states what happens to what a person types, through `COPY.privacy`. An
accepted request paints `No inquiry was sent` and replaces the form with the entered fields under a
sentence naming what did not happen. `title` and `message` are optional, so an accepted inquiry that
holds neither paints a `partial` notice naming what is absent — `You left out a job title and a
message` — with a call to the office as its recovery, rather than painting an empty row for each. An
inquiry holding a title and a message paints no notice.
```

**A4.** Replace lines 326-330:

```markdown
The invoice form is `novalidate` so `parseInvoice` owns the rules. The submit control stays enabled.
A refusal focuses the summary `The payment could not be recorded`. Summary links focus the named
field and leave the hash on this desk. Above the fields the form states that no card number is
collected and what happens to what a person types, through `COPY.privacy`. An accepted request
paints `No payment was made` under a sentence naming what did not happen. Card capture is not on
this surface; `Pay on Rough Notes` is the live billing link.
```

### Patch B — `app/browser/components/NewsletterView.vue`, needed before this ships

`NewsletterView` reads `COPY.accepted`, so its heading already reads `No subscription was started`.
Its body still says the list records the person, which the run in § 1 shows it does not. The page is
no longer promising, so criterion 4 holds there unpatched, but the two sentences now disagree.

```diff
 			<p class="text-body-secondary measure mb-0">
-				The newsletter reaches licensed agents free, beside the print and digital magazine. This
-				form records the request on this device.
+				The newsletter reaches licensed agents free, beside the print and digital magazine.
 			</p>
```

```diff
 			<p id="newsletter-joined" class="h4 mb-3" role="status">{{ COPY.accepted }}</p>
 			<p class="text-body-secondary measure mb-0">
-				The newsletter list records {{ record.name }} at {{ record.email }} on this device, beside
-				the print and digital magazine.
+				This site is a demonstration. It holds {{ record.name }} and {{ record.email }} in this page
+				only, and no newsletter follows.
 			</p>
```

`tests/app/browser/components/NewsletterView.test.ts` asserts neither sentence, so the patch reddens
nothing. Run `oxfmt --write` on the file after applying.

### Patch C — `app/browser/components/HomeView.vue:261-262`, vocabulary only

The home invite band carries the retired `Fixture only` wording. The band holds no form — it links
to `/subscribe` — so criterion 5 does not reach it, and this is consistency rather than a defect.

```diff
 				<p class="text-body-secondary measure mb-4">
 					Independent agents rely on Rough Notes for coverage intelligence, agency strategy, and the
-					market connections that grow a book. Fixture only — nothing is sent off this device.
+					market connections that grow a book. This site is a demonstration and sends nothing.
 				</p>
```

## 7. Observations

- **The capture registry needs no edit.** The brief's second unknown: `STATES` in
  `tests/app/browser/integration.test.ts` names `subscribe-accepted`, `contact-accepted`, and
  `payment-accepted` as state names, never as text. The rendered content of those frames changed, so
  a capture run produces different images; the registry itself is untouched and the journey suite is
  green.
- **The subscribe confirmation still shows the offer list.** Under `WHAT A SUBSCRIPTION CARRIES` the
  screen still reads `Print and digital magazine delivery`, `September issue coverage and agency
  features`, `Fixture sample of the Insurance Marketplace`. The heading now describes the real
  Rough Notes product rather than this record, and the confirmation directly above it says no issue
  follows, so the list reads as the offer it is. A design review may still want to judge it.
- Wall clock: format, lint, and `check` under a minute; `npm run build` reports 3.69s of build
  inside a roughly 20s script; `npm test` reports about 80s of suite time across its projects.
- No capture frames were produced. `VITE_CAPTURE` was unset on every run.
- The scratchpad copies used for the failing-first proof sit under `scratchpad/p1/mine/`, and every
  restored file was verified byte-identical with `diff -q`.

## 8. What I did not close, and why

1. **`guides/README.md`.** Off-limits by the brief. The guide states the retired confirmations as
   product truth in four passages, so it is wrong the moment this lands. Patch A is exact and needs
   a carrier. This is the documentation-parity obligation the brief scoped out.
2. **`NewsletterView.vue` and `HomeView.vue`.** Outside owned files. Patches B and C are exact.
   Patch B is the one that matters: `NewsletterView` reads the changed `COPY.accepted`, so its two
   sentences disagree until it is applied.
3. **The refusal headings.** `COPY.summary` is `The subscription could not be sent`,
   `COPY.inquirySummary` is `The inquiry could not be sent`, and `COPY.paymentSummary` is `The
   payment could not be recorded`. Each implies that a valid submission *would* be sent or recorded,
   which is the promise this unit removed from the confirmations wearing the refusal's clothes. A
   refusal is not a confirmation surface, so this sits outside the brief's named property and
   outside criterion 4. Recorded here for the change that owns it rather than reopened inside this
   one.
4. **`SubscribeView.vue:30`** still reads `Delivery is free to licensed agents, and the request stays
   on this device.` on the pre-submission band. It is true and it is not a confirmation, so it
   stands. It overlaps the form's notice by one clause; a successor may want to cut the clause.

## 9. Scope note the Orchestrator must rule on

The brief granted `app/browser/constants.ts` "for the confirmation headings only". I added one key
beyond that grant: `privacy`, carrying the notice sentence.

The alternative was the same literal sentence repeated in three `.vue` files, which violates
`AGENTS.md` § Design laws "Centralize by kind" and creates exactly the drift a shared line exists to
prevent. `COPY` is the file's declared home for a published line reused across components, and the
notice appears on three components across three routes. The key is one word, the value is prose, and
no consumer outside the three forms reads it.

This is not a conflict with the objective, so it did not stop the unit. It is flagged because it
widens one scope line the brief wrote narrowly.

## 10. Files touched

| File | Change |
| ---- | ------ |
| `app/browser/constants.ts` | Three confirmation headings rewritten; `privacy` added. |
| `app/browser/components/ContactView.vue` | Confirmation, lead, gap notice title and detail, and continuation all stop promising an answer. |
| `app/browser/components/SubscribeView.vue` | Confirmation rewritten; the state-swinging heading `computed` deleted for one literal; duplicate disclaimer removed from the continuation. |
| `app/browser/components/PaymentView.vue` | Confirmation body added; lead, side panel, and continuation stop claiming a record or a charge. |
| `app/browser/components/ContactForm.vue` | Notice above the fields; fine print removed from under the button. |
| `app/browser/components/SubscribeForm.vue` | Same. |
| `app/browser/components/PaymentForm.vue` | Same, with the card fact carried into the notice. |
| `tests/app/browser/components/ContactView.test.ts` | Gap title updated; confirmation truth bound; one case renamed. |
| `tests/app/browser/components/SubscribeView.test.ts` | Claims heading updated; confirmation truth bound. |
| `tests/app/browser/components/PaymentView.test.ts` | Confirmation truth bound. |
| `tests/app/browser/components/ContactForm.test.ts` | Notice placement proof added. |
| `tests/app/browser/components/SubscribeForm.test.ts` | Same. |
| `tests/app/browser/components/PaymentForm.test.ts` | Same. |

Diffstat: `13 files changed, 79 insertions(+), 33 deletions(-)`.
