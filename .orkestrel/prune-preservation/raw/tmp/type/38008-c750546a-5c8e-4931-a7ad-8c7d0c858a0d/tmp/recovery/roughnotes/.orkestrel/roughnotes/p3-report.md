# Unit P3 report — the guide, the two views, and the refusal headings

## 1. Done / not done per item

| # | Item | State | Evidence |
| - | ---- | ----- | -------- |
| 1 | Patch A, `guides/README.md`, four passages | done | Applied verbatim, with the refusal sentences carried into the item-4 ruling. Diff in § 2. |
| 2 | Patch B, `NewsletterView.vue` | done | Both hunks applied verbatim. |
| 3 | Patch C, `HomeView.vue` | done | Applied verbatim. |
| 4 | Rule on the refusal headings and act | done, ruled **it holds** | § 3. Three values rewritten, one failing-first test per form, guide updated. |

Two further guide edits fall out of items 1 and 4, recorded in § 2: the contact refusal sentence,
which patch A did not cover but the item-4 ruling falsifies, and the `Accepted` column of the data
states table, whose `Recorded` vocabulary patch A replaces with `Entered` two sections earlier.

## 2. What changed in the guide

Patch A applied at the passages P1 named: subscribe (lines 288-293), newsletter (297-299), contact
accepted (318-322), pay a bill (326-330). P1's replacement text is verbatim except for the two
refusal strings inside A1 and A4, which the item-4 ruling changed, so the guide quotes what the
application paints.

Beyond the four passages:

- **The contact refusal sentence, line 314.** It quoted `The inquiry could not be sent`, which the
  item-4 ruling retires. No patch covered it. Left alone it would be the only guide sentence quoting
  a string the application no longer paints.
- **The `Accepted` column of the data states table, lines 354-357.** Patch A replaces `recorded name
  and email` with `entered name and email` and `recorded fields` with `entered fields` in the prose.
  The table's `Recorded name and email`, `Recorded fields`, and `Recorded invoice` are the same fact
  in the retired word, so they read as a second vocabulary for it. Each cell now reads `Entered`.
  `oxfmt` reflowed the table's last column by one character when the cells shortened, and that
  reflow is the rest of the table diff.

Guide diffstat: `1 file changed, 40 insertions(+), 37 deletions(-)`.

## 3. The refusal ruling

**P1's observation holds. The three headings are rewritten.**

The reasoning, in order:

1. `The subscription could not be sent` names a send. No input ever produces a send: P1's storage
   probe found no storage key after three submits, and the sweep of `app/**` for `fetch`,
   `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`, and `axios` returned nothing. So the
   clause is not merely unproven on this path; it is false on every path.
2. A refusal heading is read against the accepted heading a person would otherwise have reached.
   `No subscription was started` says nothing was sent. `The subscription could not be sent` says a
   valid entry would have been. The two sentences on the same form contradict each other, and the
   refusal is the one that is wrong.
3. `The payment could not be recorded` fails the same way. Nothing is recorded for any input.

What actually failed is the form's own check of the entries. `parseSubscription`, `parseInquiry`,
and `parseInvoice` own the rules, and each returns the issues the summary lists as field links.

New values in `app/browser/constants.ts`:

```diff
-	summary: 'The subscription could not be sent',
-	inquirySummary: 'The inquiry could not be sent',
-	paymentSummary: 'The payment could not be recorded',
+	summary: 'The subscription form refused these entries',
+	inquirySummary: 'The inquiry form refused these entries',
+	paymentSummary: 'The payment form refused these entries',
```

Each names the form as the actor, `refused` as what it did, and the entries as what it did it to. No
clause reaches past the page. `refused` is the word this repository already uses for the state: the
guide's `Refused` column, the `Refusal` family in `tests/app/browser/integration.test.ts`, and the
parse functions that refuse. The heading therefore uses one term for one concept rather than a
fourth synonym. The values stay distinct per form, because a journey resolves the summary by its
text.

The keys are unchanged. `summary`, `inquirySummary`, and `paymentSummary` name the element the
controller focuses, not the sentence in it.

## 4. Tests

One case added per form test file, named for what it proves, each bound to the rendered summary
rather than to the constant it reads:

| File | Case |
| ---- | ---- |
| `tests/app/browser/components/SubscribeForm.test.ts` | `refuses the entries without implying a subscription would be sent` |
| `tests/app/browser/components/ContactForm.test.ts` | `refuses the entries without implying an inquiry would be sent` |
| `tests/app/browser/components/PaymentForm.test.ts` | `refuses the entries without implying a payment would be recorded` |

Each submits an empty form, resolves `#<form>-summary`, asserts the new sentence, and asserts the
retired clause is absent.

No existing assertion needed updating. Every test that reads a refusal heading reads it through
`COPY.summary`, `COPY.inquirySummary`, or `COPY.paymentSummary`, including
`tests/app/browser/integration.test.ts` at lines 621, 637, 796, 839, and 990.
`tests/app/browser/components/NewsletterView.test.ts` asserts neither sentence patch B replaced; it
asserts `SUBSCRIBER.name` and `SUBSCRIBER.email` appear, and the replacement sentence still renders
each. `tests/app/browser/components/HomeView.test.ts` asserts the invite band's controls, never its
prose.

### Failing-first proof

Command, identical on both runs:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser \
  tests/app/browser/components/ContactForm.test.ts \
  tests/app/browser/components/SubscribeForm.test.ts \
  tests/app/browser/components/PaymentForm.test.ts
```

- Before the constants change, with the three cases in place: `Test Files 3 failed (3)` /
  `Tests 3 failed | 15 passed (18)`. Each failed on its own assertion rather than on a timeout, for
  example `expected ' The payment could not be recordedCus…' to contain 'The payment form refused
  these entries'`.
- After: `Test Files 3 passed (3)` / `Tests 18 passed (18)`.

## 5. The sweeps

Patterns run with `grep -rn -F` over `app tests configs scripts guides README.md vite.config.ts
package.json`:

```
could not be sent                   → ContactForm.test.ts:75, SubscribeForm.test.ts:73, both negative bindings
could not be recorded               → PaymentForm.test.ts:74, a negative binding
Fixture only                        → the three form tests, all negative bindings P1 added
records the request on this device  → none
The newsletter list records         → none
nothing is sent off this device     → none
You are subscribed                  → none
Your inquiry is recorded            → none
The invoice is recorded             → none
Recorded without                    → none
Recorded with this subscription     → none
What the subscription carries       → none
on this device                      → SubscribeView.vue:30, the pre-submission band P1 § 8 item 4 ruled stands
```

Each new string resolves to its constant, its test, and its guide sentence, and nowhere else:
`The subscription form refused these entries` at `app/browser/constants.ts:184`,
`SubscribeForm.test.ts:72`, `guides/README.md:289`; `The inquiry form refused these entries` at
`constants.ts:185`, `ContactForm.test.ts:74`, `guides/README.md:315`; `The payment form refused
these entries` at `constants.ts:186`, `PaymentForm.test.ts:73`, `guides/README.md:329`.

`Fixture` survives in `HomeView.vue:206`, `HomeView.vue:297`, and `SubscribeView.vue:17` as
`Fixture sample` and `Fixture Insurance Marketplace search`, which label sample content rather than
promise anything about a submission. Outside this unit's items.

## 6. Gate evidence

| Gate | Result |
| ---- | ------ |
| `npx oxfmt --config .oxfmtrc.json --check` on owned files | `All matched files use the correct format.` over the six code files, and over `guides/README.md` separately. |
| `npx oxlint --config .oxlintrc.json --deny-warnings` on owned files | `LINT_EXIT=0`, no diagnostic. |
| `npm run check` | `CHECK_EXIT=0`. `tsc --noEmit`, `check:app:core`, and `check:app:browser` all clean. |
| `npm test` | `TEST_EXIT=0`. Counts following. |
| `npm run build` | `BUILD_EXIT=0`, built in 3.78s, `grep -ic deprecat` returns 0, `index-hhVhdyP4.css 323.24 kB │ gzip: 48.09 kB`. |

`npm test` per project, on the run taken after the last edit:

| Project | Files | Tests |
| ------- | ----- | ----- |
| `app:core` + `app:browser` | 43 passed (43) | 192 passed (192) |
| `journey:*`, four variants | 4 passed (4) | 76 passed, 4 skipped (80) |
| `policy` | 1 passed (1) | 111 passed (111) |
| `config` | 1 passed (1) | 46 passed (46) |
| `setup` | 1 passed (1) | 3 passed (3) |
| `conformance` | 1 passed (1) | 12 passed (12) |

The app total moved from P1's 189 to 192, which is this unit's three refusal cases. The skipped
journey cases are the `it.runIf(CAPTURING)` capture rows, skipped because `VITE_CAPTURE` is unset;
pre-existing.

`oxfmt --write` ran scoped to `guides/README.md` alone, never tree-wide. Logs retained at
`tmp/units/p3-test.log.txt` and `tmp/units/p3-build.log.txt`.

## 7. Files touched

| File | Change |
| ---- | ------ |
| `guides/README.md` | Patch A at its four passages, the contact refusal sentence, and the data states `Accepted` column. |
| `app/browser/components/NewsletterView.vue` | Patch B, both hunks. |
| `app/browser/components/HomeView.vue` | Patch C. |
| `app/browser/constants.ts` | The three refusal headings rewritten. |
| `tests/app/browser/components/SubscribeForm.test.ts` | One refusal case added. |
| `tests/app/browser/components/ContactForm.test.ts` | Same. |
| `tests/app/browser/components/PaymentForm.test.ts` | Same. |

Tree diffstat, which carries P1's uncommitted work as well as this unit's:
`16 files changed, 159 insertions(+), 78 deletions(-)`. This unit's exclusive files —
`guides/README.md`, `NewsletterView.vue`, and `HomeView.vue` — stand at
`3 files changed, 44 insertions(+), 42 deletions(-)`.

## 8. Deviation state

No deviation. Nothing off-limits was opened: `app/core/constants.ts`, `app/browser/controllers/`,
`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `vite.config.ts`,
`package.json`, `.orkestrel/`, and `tmp/authority/` are unmodified, and
`.orkestrel/roughnotes/p1-report.md` was read only. No commit, push, install, or bump. No
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

This unit took two decisions rather than stopping on them, both ancillary to the named items and
both recorded in § 2: the contact refusal sentence in the guide, and the data states table's
vocabulary.

## 9. Observations, for whoever owns the next scope

- `SubscribeView.vue:30` still reads `Delivery is free to licensed agents, and the request stays on
  this device.` P1 ruled it true and not a confirmation, and this unit's items do not reach it. It
  overlaps `COPY.privacy` by one clause.
- The three refusal summaries now share a sentence shape that differs only in the form's name. If a
  later change puts two of these forms on one screen, that shared shape is what a journey has to
  disambiguate.
