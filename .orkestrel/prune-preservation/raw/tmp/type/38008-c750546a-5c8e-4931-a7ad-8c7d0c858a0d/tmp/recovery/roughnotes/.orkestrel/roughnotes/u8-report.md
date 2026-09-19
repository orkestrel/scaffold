# Unit 8 — the request surfaces

`implementer` — Opus 5, native Claude subagent, checkout
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer from `3156e40`.

## 1. Done / not done

| #   | Criterion                                                                         | State | Evidence                                                                                                                |
| --- | --------------------------------------------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | `oxfmt --check` over owned files                                                  | done  | `All matched files use the correct format.` on 14 files                                                                 |
| 2   | `oxlint --deny-warnings` over owned files                                         | done  | exit 0, no diagnostics                                                                                                  |
| 3   | `npm run check`                                                                   | done  | exit 0; `tsc` root, `tsc` app/core, `vue-tsc` app/browser                                                               |
| 4   | No style attribute, SFC style block, CSS, package, `any`, `as`, `!`, suppression  | done  | sweep below; `app/browser/styles/`, `package.json`, `constants.ts` absent from `git status`                             |
| 5   | No revalidation path calls `submit`; all three forms                              | done  | the three `announces a refusal then accepts …` cases assert the form present, `accepted.value` undefined, and 0 emissions after the valid draft |
| 6   | Every summary entry's box centre resolves to its own link at 320 and 390          | done  | the three `keeps every summary link hittable at %i CSS px` cases, re-proved against the recomposed markup               |
| 7   | No commit carries `btn-warning` on paper                                          | done  | `grep -rn btn-warning app/browser/` reports `HomeView.vue` twice — the `.hero` and `.panel` navy commits — and nothing else |
| 8   | Every accepted state restates and continues                                       | done  | § 3; frames in § 4                                                                                                      |
| 9   | `/contact` paints its partial state                                               | done  | `ContactView` cases for the bare and the complete inquiry; frame in § 4                                                 |
| 10  | The office panel sizes to its own content, and sits above the form at 390         | done  | `ContactView` height case and document-order case; `contact-refused--light-390.png` and `contact-refused--light-1280.png` |
| 11  | The payment help sentence appears once                                            | done  | `PaymentView` case splits the rendered text on the hint and reads two parts; `payment-refused--light-1280.png`          |
| 12  | `npm run test:app:browser`                                                        | done  | Test Files 38 passed (38), Tests 143 passed (143)                                                                        |
| 13  | `npm run test:journey` green for all four projects, integration suite unchanged   | done  | Test Files 4 passed (4), Tests 68 passed \| 4 skipped (72); `tests/app/browser/integration.test.ts` and `tests/app/browser/setup.ts` absent from `git status` |
| 14  | Capture frames written and read                                                   | done  | `VITE_CAPTURE=true npm run test:journey` → Test Files 4 passed (4), Tests 72 passed (72); § 4                            |

Banned-construct sweep, the command and its result:

```
grep -nE '<style|style="|:style|@ts-|eslint-disable|oxlint-disable| as [A-Z]|\bany\b|!\.|!\)|![,;]' <the seven SFCs and their seven suites>
```

One hit, prose: `Get answers on demand on any modern device`. No `<style>` block, no `style` attribute,
no suppression directive, no type assertion, no non-null assertion, no dependency added, and no new
type — the screens compose on unit 3's `RequestInterface` and unit 5's primitives as declared.

### The failing proof

One command, both readings, over the four view suites and the three form suites:

```
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser \
  tests/app/browser/components/SubscribeView.test.ts tests/app/browser/components/NewsletterView.test.ts \
  tests/app/browser/components/ContactView.test.ts tests/app/browser/components/PaymentView.test.ts \
  tests/app/browser/components/SubscribeForm.test.ts tests/app/browser/components/ContactForm.test.ts \
  tests/app/browser/components/PaymentForm.test.ts
```

- **Red**, with the new cases in place and the seven files still at `3156e40`:
  `Tests 20 failed | 7 passed (27)`. Log: `tmp/units/u8-red.log.txt`.
- **Green**, with the screens recomposed: `Tests 27 passed (27)`.

The seven that passed red are the six summary hit-target cases unit 3 closed, which this unit
retains unchanged, plus `SubscribeView > paints the offer and the request while nothing is accepted`.
Every new case reddened on its own defect:

| Case                                                                              | Baseline failure                                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `SubscribeView > restates the accepted subscription and carries a real continuation` | the accepted screen is `<p class="alert alert-success">` and no link at all |
| `SubscribeView > commits in the application navy rather than in gold`              | the submit is `btn-warning`                                            |
| `NewsletterView > composes its own screen rather than repeating the subscribe island` | the newsletter renders the same `.invite` navy island as subscribe   |
| `NewsletterView > shares no region with subscribe beyond the request itself`       | neither screen paints an `h2` at all                                   |
| `NewsletterView > restates the accepted subscription in its own voice and continues` | the accepted screen paints the green alert and no continuation        |
| `ContactView > leaves the office panel at its own height on a quiet surface`        | the office panel is the navy `h-100` card                              |
| `ContactView > puts the office before the form so a phone number costs no scrolling` | the gold commit is still on the paper card                            |
| `ContactView > restates an accepted inquiry without implying what was never entered` | no definition list exists; the accepted screen is the green alert     |
| `ContactView > claims no gap on an inquiry that filled every field`                 | the same                                                               |
| `PaymentView > states each field hint once, beside the field it governs`            | the customer-number hint is stated twice                               |
| `PaymentView > leaves navy to the chrome and commits in the application navy`        | the screen is one navy island with a gold commit                       |
| `PaymentView > reads the recorded invoice back and sends the reader on to settle it` | the accepted screen is the green alert                                 |
| the three `refuses on the quiet danger pair and commits in the application navy`     | the summary is `alert alert-danger` and each submit is `btn-warning`   |
| the three `announces a refusal then accepts …`                                       | the form replaces itself with the accepted alert                       |

The red reading was taken by writing each file's `3156e40` content back with `git show`, never with
`git checkout` or `git restore`.

## 2. Screen by screen

The rule these four screens now share: **a request screen ends in its request; once the request is
accepted, the screen restates what was accepted and ends in the continuation that replaces the
form.** Unaccepted, the submit is the screen's action, so no continuation competes with it.

### The forms

All three forms lost their card and their accepted branch. A form now renders its refusal summary
and its fields, and nothing else; the screen owns the surface it sits on and owns the accepted
state. That is what lets `/subscribe` put the form on a bounded paper card and `/newsletter` put the
same component straight on the page.

- **The summary takes the refusal treatment `Notice` uses** — `border-danger-subtle
  bg-danger-subtle text-danger-emphasis` with the `bi-exclamation-triangle` mark — instead of the
  solid `alert-danger` fill. It keeps its `id`, its `role="alert"`, its `tabindex="-1"`, its focus
  on a failed submit, and the `d-block` on every entry.
- **Every submit is `btn-primary`**, enabled while fields are invalid, on paper.
- **`check` and `submit` are untouched.** Revalidation still parses, only submission commits, and
  the guard that opens revalidation only after one refusal is unchanged.
- **`PaymentForm`'s amount error and amount help stopped saying the same thing.** The error is
  `Enter an amount greater than zero.` and the help is `Include sales tax, shipping, and handling in
  the total.` Read on the frame: the baseline stacked two sentences of one meaning under that field,
  the same duplication S10 names one field higher.

### `/subscribe`

**Regions.** `Frame` head — `Subscribe` and `Free print and digital delivery for licensed agents.`;
the navy `.invite` offer band as a `Split :span="5"`; the request section holding the bounded form
card; the continuation, which exists only after acceptance.

**Navy survives here and only here among these four.** The band is the offer — the thesis of the one
screen a reader visits to decide — and it is one region inside the frame rather than the page's
container. The three claims are written once and the band's heading carries the tense:
`What the subscription carries` before, `Recorded with this subscription` after.

**The form left the dark scope.** It sits in a `col-12 col-sm-10 col-md-7 col-lg-5` card on the page
surface. That is a measured requirement, not a preference — see § 6.

**Narrow.** At 390 the band stacks copy then claims, and the form follows under `Send the request`.

### `/newsletter`

**Regions.** `Frame` head — `Rough Notes newsletters` with the lead the journey waits on; a
`What each newsletter carries` section holding the four named benefits as a two-across grid of quiet
panels; a `Join the list` section as a `Split :span="7"` with the offer copy beside the form; the
continuation, after acceptance.

**S9 closed compositionally.** No navy island, no check badges, no shared region: the screens'
heading sets are disjoint, which the suite asserts rather than describes. The benefits are the
distinct substance the plan said this screen already had; nothing was added to the core.

### `/contact`

**Regions.** `Frame` head — `Contact` and the lead the journey waits on; a `Split :span="5"` with
the office panel as the primary region and the form beside it; the continuation, after acceptance.

**F4 closed.** The office panel is a `bg-body-tertiary` panel with no `h-100` and no dark scope. It
ends where its content ends; the suite reads its height against the form column's rather than
describing it.

**Reading order at 390.** The office is the primary region, so it precedes the form in the DOM and
therefore at every width. A reader who wants the phone number meets it before the six fields, and at
1280 it still sits left of the form in the 5/7 split the screen had.

### `/payment`

**Regions.** `Frame` head — `Pay a bill` and the lead; a `Split :span="7"` with the form as the
primary region and the `Card capture stays on Rough Notes` panel beside it; the continuation, after
acceptance.

**S10 closed.** The two checklist lines that repeated the form's own help are gone. Each hint appears
once, under the field it governs.

**Navy left this screen.** The island was a container, not a thesis: the screen is one task for an
existing customer. The supporting panel is quiet, carries the one external destination with the
open-in-new mark, and names the host outside the anchor the way unit 7's screens do.

## 3. The accepted states

None of them is an alert, and `alert-success` no longer appears in the application's request
surfaces. Green is gone from the product.

**`/subscribe`.** `You are subscribed` as the status, then
`Print and digital delivery is recorded for Ada Lovelace at ada@agency.com.` — the reader's own
record read back. The three claims stand under `Recorded with this subscription`, the offer's claims
in the past. The continuation reads `Rough Notes publishes every month, and the September issue is
the one this catalog holds. Nothing was sent off this device.` then `Read the magazine` (primary) and
`Explore products` (outline). What arrives and when is stated as the publishing cadence and the issue
this catalog holds — no delivery is promised, because the fixture produces none.

**`/newsletter`.** The same status line in the newsletter's own voice:
`The newsletter list records Grace Hopper at grace@agency.com on this device, beside the print and
digital magazine.` The continuation reads `The newsletter draws on the same desks the magazine
reports from.` then `Read the magazine` (primary) and `Publications` (outline).

**`/contact`.** `Your inquiry is recorded on this device`, then
`The Indianapolis office answers on the number and address beside this confirmation.` — true,
because the office panel stays on screen in this state and carries both. The definition list holds
`Full name`, `Company`, `Work email`, and `Phone`, and adds `Title` and `Message` only when the
sender entered them. When either is absent the screen paints a `partial` notice titled
`Recorded without a job title and a message` (or naming whichever one is missing), with the recovery
scoped to the gap: `Call 800-428-4384`. The continuation reads
`The desks and the magazine are open to read while the office answers.` then `Explore products`
(primary) and `Read the magazine` (outline).

**`/payment`.** `The invoice is recorded on this device`, then the three figures read back in tabular
figures — `Customer number 1001`, `Invoice number 4821`, `Invoice amount $78.00`, the amount
formatted through the core's own `formatPrice` from the stored cents. The continuation reads
`Nothing was charged. The Rough Notes billing page takes the card for this invoice.` then
`Pay on Rough Notes` (external, primary, open-in-new mark, host named beneath) and `All shop items`
(outline). The reader who just recorded an invoice is sent to the only place that can settle it.

## 4. The rendered evidence

Frames written by `VITE_CAPTURE=true npm run test:journey` on 2026-09-16 into `tmp/capture/states/`.
Crops produced by `tmp/units/u6-frame.mjs`, unit 6's instrument, and retained as `tmp/units/u8-*.png`.

**`subscribe-accepted--light-1280.png`** (1280×1237; 1043 at the baseline).
`Subscribe` and its lead on paper, then the navy band: `You are subscribed` in the display face,
`Print and digital delivery is recorded for Ada Lovelace at ada@agency.com.` beneath it, and
`RECORDED WITH THIS SUBSCRIPTION` labelling the three gold-checked claims on the right. Then a rule,
one line of copy, and `Read the magazine →` solid navy beside `Explore products` outline.
**S1 closed** — the baseline crop `tmp/units/u8-base-subscribe-accepted.png` is a pale green box
reading `You are subscribed` inside an otherwise empty white card, with the offer's claims still in
the present tense beside it and no control anywhere on the screen. **S2 closed** — no green remains;
the confirmation is carried by the product's own navy and its gold check marks.

**`subscribe-accepted--dark-1280.png`** (1280×1237).
The same composition in dark. The band separates from the dark page by its gradient rather than by
hue, the status and restatement keep the body and secondary tiers, and the primary control flips to
the white-on-navy repaint while the outline control keeps its border. No control lost contrast.

**`subscribe-refused--light-390.png`** (390×2292).
One column: head, the navy claims band, `Send the request`, then the form card. The summary is the
quiet danger pair with the warning mark and three block links, and `Subscribe free →` is solid navy,
full width. **F8 closed at 390** — the baseline painted that commit gold on the same paper card.

**`contact-refused--light-1280.png`** (1280×1919; 1985 at the baseline).
No `QUESTIONS AND INQUIRIES` eyebrow over `Contact`. The office panel is a quiet
`bg-body-tertiary` panel ending at y≈803 while the form runs on to its fixture line at y≈1430, with
the footer beginning at y≈1492. **F4 closed** — the baseline
crop `tmp/units/u8-base-contact-a.png` shows the same panel as a navy card stretched the full height
of the form, with roughly 660 px of empty navy under the email row. `Send inquiry` is solid navy on
paper. **F8 closed.**

**`contact-refused--light-390.png`** (390×2879).
The office panel comes first: the toll-free number is on screen at y≈680, before any field.
**Criterion 10's narrow half closed** — a reader who wants the phone number scrolls past no fields.
The refusal summary and the six fields follow.

**`payment-refused--light-1280.png`** (1280×1529).
`Pay a bill` on paper, no navy island anywhere. The customer-number hint appears once, under its
field; the amount's error and help now say different things. The `Card capture stays on Rough Notes`
panel sits beside the form, quiet, with `Pay on Rough Notes ⧉` and `Opens on
shoppingcart.roughnotes.com.` beneath it. `Review payment` is solid navy. **S10 and F8 closed** —
the baseline crop `tmp/units/u8-base-payment.png` states the customer-number hint in the navy
checklist and again as form text, and commits in gold.

**`newsletter--light-1280.png`** (1280×1402; 1202 at the baseline).
A framed editorial page: head, `What each newsletter carries` over four quiet panels two across,
then `Join the list` with its copy beside the bounded form. **S9 closed** — nothing of the subscribe
island survives here.

**Frames the capture registry does not carry.** The accepted contact, payment, and newsletter states
and the accepted subscribe at 390 have no registered state, and the registry is unit 9's file. I shot
them with a throwaway probe through the library's own `captureFrame`; the instrument and its command
are `tmp/units/u8-frames-probe.txt`, and the frames are retained as `tmp/units/u8-probe-*.png`. The
probe file was deleted from `tests/` before this report.

- **`u8-probe-contact-accepted.png`** (1280×1457): the office panel unchanged on the left; on the
  right `Your inquiry is recorded on this device`, the four entered fields as a two-column definition
  list, and the `partial` notice reading `Recorded without a job title and a message` with
  `Call 800-428-4384`. No `Title` row and no `Message` row is painted. **Criterion 9 closed on the
  render**, not in source.
- **`u8-probe-contact-full.png`** (1280×1457): the same screen for an inquiry carrying a title and a
  message paints six rows and no notice.
- **`u8-probe-payment-accepted.png`** (1280×1130): `The invoice is recorded on this device` over
  `1001 / 4821 / $78.00`, then the rule, `Nothing was charged…`, `Pay on Rough Notes ⧉` solid navy,
  `All shop items` outline, and the host line.
- **`u8-probe-newsletter-accepted.png`** (1280×1395): the benefits grid stays, the join section is
  replaced by `You are subscribed` and the list restatement, and the screen ends in
  `Read the magazine →` and `Publications`.
- **`u8-probe-subscribe-accepted-390.png`** (390×1942): the accepted band stacks status,
  restatement, label, claims; the continuation stacks its copy and a full-width primary.

## 5. Rulings on the unknowns

**Navy survives on `/subscribe` and dies on `/payment`.** A screen may hold navy once as a thesis.
`/subscribe` has one: the offer a reader is deciding on, and the band is where the claims and the
confirmation live. `/payment` has none — it is one task for a customer who already bought something,
and its navy was a container holding a form and two outline buttons. Read on the frames, the payment
screen lost nothing by giving it up and gained the hint discipline the island was hiding.

**The accepted state is a navy restatement, not a quieter paper one, and never `alert-success`.** The
declared surface ownership decides it: green belongs to no tier in this palette and appeared exactly
once in the whole application, which is why it read as a stock component. Navy already owns the
offer on `/subscribe`, so the confirmation of that offer belongs on the same surface — the band
changes tense, not colour. On `/contact` and `/payment`, where navy is not the screen's thesis, the
restatement is ordinary body text under a display-face status line: the reader's own data is the
content, and it needs no tint to be found.

**`/contact`'s continuation is `Explore products` and `Read the magazine`.** The plan does not fix
it, so here is the reasoning. A reader who has just sent an inquiry needs three things: proof of what
was recorded, who answers, and something to do while they wait. The restatement gives the first; the
office panel stays on screen and gives the second, which is why the continuation must not duplicate
the phone and email controls sitting beside it; the desks and the magazine are the two subjects this
form's traffic is actually about, so they give the third. The one control that does duplicate an
office destination — `Call 800-428-4384` — earns its place because it is the recovery scoped to the
partial state, and it carries a distinct accessible name.

## 6. Observations

**The dark-theme repaint leaks into a nested light scope, and it is measured.** Making the subscribe
submit `btn-primary` inside the forced-light form card turned all four journey projects red with
`expected 1.1124211287157046 to be greater than or equal to 4.5`. `_theme.scss` writes its
overrides as `[data-bs-theme='dark'] .btn-primary`, which matches every descendant of a dark root
including one inside a nested `data-bs-theme="light"` scope, while the `var(--bs-body-color)` it
assigns resolves in that nested light scope. A probe against the shipped cascade read the button as
`color rgb(10, 37, 64)` on `background rgb(15, 27, 45)` — navy on near-navy — inside a card whose own
background is `rgb(255, 255, 255)`. Gold never surfaced it because `.btn-warning` carries no dark
override.

I composed around it rather than authoring CSS: the subscribe form left the island's dark scope for
the page surface, where the repaint resolves against the theme it was written for. The stylesheet
finding stands for whoever owns `app/browser/styles/`: **a nested `data-bs-theme` scope cannot
restore a token an ancestor-scoped descendant selector overrode.** One forced-light scope remains in
the application, `HomeView.vue:82`'s `.issue` card, and it is inert today because nothing inside it
is a `.btn-primary`. A later unit that puts one there will meet this failure.

**Wall-clock**, all inside this unit's own exec on a loaded host: `npm run test:app:browser` 20.41 s,
`npm run test:journey` 28.13 s, `VITE_CAPTURE=true npm run test:journey` 32.41 s. `npm test` was not
run here. Take the authoritative readings from an independent verifier on an idle host, per
`.agents/orchestration.md` § Writing concurrency rule 10.

**Nothing in the journey suite moved.** Every accessible name it resolves on these four screens is
unchanged — `Subscribe free`, `Send inquiry`, `Review payment`, `Full name`, `Work email`, `Company`,
`Phone`, `Customer number`, `Invoice number`, `Invoice amount`, `Write to us`, `Pay a bill`,
`Newsletter` — as is every summary-link sentence and every `waitForText` string: `Free print and
digital delivery`, `Subscribe`, `Write the Indianapolis office`, `It is about you, the customer`,
`Rough Notes newsletters`, `You are subscribed`, `Your inquiry is recorded on this device`, and
`The invoice is recorded on this device`. `constants.ts` needed no new line: every control these
screens carry was already declared.

**A conditional `#next` slot works and is load-bearing.** `v-if` on a `<template #next>` compiles to
a dynamic slot entry the runtime skips, so `$slots.next` is absent and `Frame` paints no continuation
rule. That is what lets an unaccepted request screen end in its submit and the accepted one end in a
continuation, from one `Frame`.

**`innerText` reads the transform.** My first accepted-state assertion searched the rendered text for
`Recorded with this subscription` and failed against `RECORDED WITH THIS SUBSCRIPTION`, the
`text-uppercase` heading. The case now reads the heading element instead, which is the assertion that
survives a styling change. Unit 7 recorded the same lesson from the other direction.

**Ancillary decisions recorded.**

- The error summary stayed authored markup rather than becoming `Notice`. `Notice` has no member for
  a list of field links and returns a component instance rather than an element, so the focus a
  failed submit needs would have to go through `$el`. The two now share their treatment through the
  same Bootstrap subtle utilities and the same mark.
- The three claims on `/subscribe` are one list with a state-dependent heading, not two lists. The
  offer and the confirmation name the same three things; only the tense differs.
- `/subscribe`'s `Join the community` eyebrow is gone. `Frame` has no member for one, and home's
  invite plate already carries that line.
- `/payment`'s in-app control is `All shop items`, not `Shop`. `Shop` duplicated the masthead's
  destination name on the same screen; `All shop items` is what unit 7 named the same destination.
- The submits keep `w-100`. On a bounded form card it is the field width, and on the wider contact
  and payment columns it keeps the commit unmissable at the end of a long form.
- The accepted status is a `<p role="status">` rather than a heading, so the restatement's headings
  stay the screen's outline and the announcement stays one sentence long.

## 7. What I did not close, and why

**The capture registry carries no accepted contact, payment, or newsletter state.** `STATES` lives in
`tests/app/browser/integration.test.ts`, which is unit 9's. The three accepted states this unit is
built around therefore have no frame under `npm test`, and I shot them with a throwaway probe
instead. Report-only patch for unit 9 — add to `STATES`:

```ts
'contact-accepted',
'payment-accepted',
'newsletter-accepted',
```

with a `place(…)` call after each acceptance in the matching journey. The contact journey already
drives its acceptance to completion, so only `place` is missing there; the payment journey the same.

**The reduced-catalog and accepted-state mounts are written per suite.** Each of my four view suites
declares its own `readText`, and unit 7 reported the same duplication for `mountCatalog`. The home
for both is `tests/app/browser/setup.ts`, unit 9's file. `readText` is the smaller of the two:

```ts
// tests/app/browser/setup.ts
/**
 * Reads an element's rendered text with every run of whitespace collapsed.
 *
 * @param node - The element to read
 * @returns The collapsed text, as `innerText` renders it
 */
export function readText(node: Element): string {
	const rendered = node instanceof HTMLElement ? node.innerText : (node.textContent ?? '')
	return rendered.replaceAll(/\s+/gu, ' ').trim()
}
```

**Guide parity.** `guides/README.md` documents none of this: the accepted-state contract, the partial
inquiry, the request screens' surface rules, or the `loading` and fetch-`error` states these screens
do not paint because nothing here waits. Unit 9 owns the guide and `tests/guides.test.ts`.

**The nested-scope repaint is reported, not repaired.** `app/browser/styles/` is off-limits to this
unit and the brief says to report rather than author CSS. § 6 carries the measurement and the one
remaining forced-light scope it could bite.

**`ContactForm`'s optional fields say so in a sentence, not in their labels.** The skill prefers the
requirement in each visible label, which would rename `Title` and `Message`. Both names are
accessible names the suites resolve, and renaming a control was outside what this brief authorises
without stopping, so the existing sentence above the form still carries it.

**One reading I did not take.** The contrast of the `partial` notice and the office panel where they
sit side by side on `/contact` in dark mode. Both take the `bg-body-tertiary` surface unit 5 shipped
and unit 7 proved on `/shop/:slug`, and nothing here is new, but that is inherited rather than
measured on this screen. It belongs with the resolved-style matrix widening in unit 9.
