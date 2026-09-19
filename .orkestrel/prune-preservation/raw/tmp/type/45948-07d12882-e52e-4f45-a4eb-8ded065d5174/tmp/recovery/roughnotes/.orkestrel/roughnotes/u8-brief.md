# Unit 8 — the request surfaces

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Recompose `/subscribe`, `/newsletter`, `/contact`, and `/payment` and their three forms on the page
primitives, and turn the accepted state from a dead end into the moment the reader is given
somewhere to go. Correct the action rank on every commit.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/browser.md`, `rules/names.md`, `rules/architecture.md`, `rules/patterns.md`,
   `rules/styles.md`, `rules/tests.md`, `rules/writing.md`, `rules/quality.md`.
4. `tmp/authority/skill/SKILL.md` — the `enterprise-bootstrap` skill, and from
   `tmp/authority/skill/references/`: `inputs.md`, `frontend-design.md`, `responsive-layout.md`,
   `components.md`, `color-modes.md`, `bootstrap-reference.md` (§ Forms in production,
   § The data states, § Feedback discipline).
5. `guides/README.md` § Subscribe, § Newsletter, § Contact, § Pay a bill.
6. `.orkestrel/roughnotes/plan.md` § The system, § Page primitives, § Screen by screen.
7. `.orkestrel/roughnotes/finding-validation-commits.md` and
   `.orkestrel/roughnotes/finding-wrapped-link-target.md` — two defects unit 3 already closed here.
   **Do not undo either.** Your composition must preserve them.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Context

`C:\Users\mikes\WebstormProjects\roughnotes`, a private Vue 3 + Bootstrap 5.3.8 application for The
Rough Notes Company. Nothing is sent off the device; every form records a fixture outcome.

Unit 3 reshaped the request contracts. `ApplicationInterface` exposes `subscription`, `inquiry`, and
`payment` as `RequestInterface<Value, Field>` with `accepted`, `issues`, `check`, and `submit`.
`check` validates and updates feedback; only `submit` stores acceptance and emits. **Revalidation
must never call `submit`.** An `issues` value of `undefined` means unchecked or accepted; an empty
collection means a valid checked draft — and an empty array is truthy, so never branch on
`v-if="issues"` alone.

Unit 3 also gave each error-summary entry `d-block` so its bounding-box centre lands on the link.
Two of the three payment entries wrap at 390, and without that the centre falls between line boxes.
**Preserve it.** If your composition changes the summary markup, re-prove the centre-hit property.

Unit 5 declared and built `Frame`, `Split`, `Entry`, `Notice`, and `Brand`. Read
`tmp/units/u5-report.md`. **You adopt them; you do not change them.** Unit 4 settled the system;
unit 6 and unit 7 recomposed the other screens — read their reports so these read as the same
product.

### The defects these screens carry

- **S1 — the accepted state is a dead end, and it is the most damaging defect in the application.**
  `subscribe-accepted--light-1280.png` shows the whole form replaced by one green alert reading
  `You are subscribed` in an otherwise empty card. The single moment a reader chooses to trust this
  publisher offers them nothing to do next. Every accepted state restates what was accepted and
  carries a real continuation.
  - `/subscribe` accepted: the offer's claims in past tense, what arrives and when, then
    `Read the magazine` and `Explore products`.
  - `/payment` accepted: restate the invoice's customer, number, and formatted amount. A reader who
    just entered three figures needs them read back.
  - `/contact` accepted: it must not imply data that was never entered — `title` and `message` are
    optional and commonly omitted. That is the partial state and it ships.
- **S2 — green appears exactly once, at that moment.** `alert-success` is the only hue outside navy,
  gold, and the refusal red, and it reads as a stock component pasted into a designed surface.
- **F8 — action rank and register.** `Send inquiry`, `Review payment`, and the marketplace's
  `Search markets` commit with gold `btn-warning` on a paper card, against the application's own
  rule that gold fills thesis calls to action on navy and navy fills chrome calls to action on
  paper. Paper submits take `btn-primary`. Gold stays where it passes: on navy.
- **F4 — unrelated paired panels are stretched.** `contact-refused--light-1280.png` stretches the
  navy office card to the taller form, leaving roughly 660 px of empty navy. The office panel sizes
  to its own content and takes a quiet surface rather than navy — navy is a thesis surface a screen
  may hold once, not a container.
- **S10 — duplicated help.** `payment-refused--light-1280.png` states the customer-number hint twice:
  once in the left checklist and again as form text. It appears once, beside the field it governs.
- **S9 — `/newsletter` and `/subscribe` share one composition.** Both wrap the same form in an
  identical navy island. The content differs and is genuinely distinct — `/newsletter` carries four
  named benefits — so the fix is compositional. **Do not add a core record type**; the plan rules
  against it and unit 3's contracts are closed.
- **Reading order at 390.** On `/contact` the office panel goes above the form so a reader who wants
  the phone number does not scroll past six fields. On `/payment` and `/subscribe` the form is the
  main reading path and its action stays close to its fields.

Refusal keeps Bootstrap's `is-invalid` field treatment and `invalid-feedback`, which these forms
already use correctly. The summary takes the `danger` subtle pair rather than the solid pink fill.
Submit stays enabled while fields are invalid. A failed submit focuses the summary and leaves the
hash unchanged.

`loading` is **not applicable**: nothing here waits. Painting a pending state would be inventing
progress. Unit 9 records that in the guide.

Host facts:

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Each journey variant is its own Vitest project: `npm run test:journey`.
- Write capture frames with `VITE_CAPTURE=true npm run test:journey`.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.

## What units 6 and 7 established that binds you

Read `tmp/units/u6-report.md` and `tmp/units/u7-report.md` before composing. Four constraints they
discovered the hard way:

- **A control the journeys assert as absent must stay absent until its state.** The suite asserts an
  exact refusal sentence for a control before it exists, so rendering it unconditionally turns that
  refusal into `is not visible and focus-reachable`. Check every control you add against the
  integration suite's refusal assertions before you render it.
- **`resolveRendered` refuses an ambiguous accessible name.** A name that appears twice on one screen
  breaks the journey. Unit 7 moved the shop's action row into its continuation for exactly this
  reason.
- **`readPage` reads `innerText`, not `textContent`.** A definition list renders `Catalog` and
  `#30040` as `Catalog #30040` to the journey; `textContent` would not separate them. Write any
  `waitForText` expectation against `innerText` behaviour.
- **The count form is `X of Y in this <collection>`** and the continuation is a rule, one line of
  bounded copy, then ranked controls. Match that rhythm so these screens read as the same product.

`Entry` now carries `rank`. `helpers.ts` now exports `readHost` and `shellHref`. `app/core/helpers.ts`
now exports `followArticle`.

## Unknowns

- What the accepted state's continuation should be on `/contact`. The plan does not fix it. Rule on
  it and say why.
- Whether the navy island survives on `/subscribe` and `/payment` at all, or whether only one of
  them keeps it. A screen may hold navy once; these two screens are each mostly one region.
- Whether `alert-success` is replaced by a navy restatement or by a quieter paper treatment. Rule on
  it against the declared surface ownership.

## Scope

**Owned files:**

- `app/browser/components/SubscribeView.vue`, `NewsletterView.vue`, `ContactView.vue`,
  `PaymentView.vue`
- `app/browser/components/SubscribeForm.vue`, `ContactForm.vue`, `PaymentForm.vue`
- Their mirrored tests under `tests/app/browser/components/`
- `app/browser/constants.ts` — only to add copy these screens need

**Off-limits — do not edit, for any reason:**

- The four primitives and `Brand.vue`. Adopt, never change.
- Every other view component. Units 6 and 7 own them.
- `app/core/`, `app/browser/types.ts`, `controllers/`, `helpers.ts`, `composables/`, `App.vue`
- `app/browser/styles/` — unit 4 settled it. If a screen needs a rule that does not exist, stop and
  report; do not author CSS.
- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` — unit 9 owns them
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `guides/README.md` — unit 9 owns it
- `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. No `style` attribute, no SFC `<style>` block, no authored CSS, no new npm package, no `any`,
   `as`, `!`, or suppression comment.
5. No revalidation path calls `submit`. Prove it: after a refused submit, typing a valid draft leaves
   the form present, paints no acceptance, and emits nothing. All three forms.
6. Every error-summary entry's bounding-box centre resolves to its own link at 320 and 390 CSS px.
   All three forms.
7. No commit carries `btn-warning` on a paper surface. Gold survives only on navy.
8. Every accepted state restates what was accepted and carries a real continuation. No accepted
   state is a bare `alert-success` in an empty card.
9. `/contact` paints its partial state: an accepted inquiry with `title` and `message` omitted
   implies no data that was never entered.
10. The office panel sizes to its own content. `/contact` at 390 places it above the form.
11. The payment help sentence appears once.
12. `npm run test:app:browser` passes.
13. `npm run test:journey` is green for all four projects, with every accessible-name assertion in
    the integration suite unchanged. The journeys resolve `Subscribe free`, `Send inquiry`,
    `Review payment`, `Full name`, `Work email`, `Company`, `Phone`, `Customer number`,
    `Invoice number`, `Invoice amount`, `Write to us`, `Pay a bill`, `Newsletter`, and every
    summary-link sentence by exact name — keep them. If a rename is unavoidable, stop and report it;
    do not edit the journey file.
14. `VITE_CAPTURE=true npm run test:journey` writes the frames, and you have read
    `subscribe-accepted--light-1280.png`, `subscribe-refused--light-390.png`,
    `contact-refused--light-1280.png`, `contact-refused--light-390.png`, and
    `payment-refused--light-1280.png`, and confirmed the defects above are gone. Name what you saw
    in each. A source-only claim about a rendered result is not acceptable.

**Observations, not criteria:** the `npm test` wall-clock duration, and any journey result you
cannot attribute to your own change.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not change a primitive. Do not author CSS. Do not add a core record
type. Do not undo unit 3's `check`/`submit` boundary or its `d-block` summary entries. Do not
promise delivery, payment, or any outcome the fixture does not produce.

Where a detail is ancillary — how a sentence of body copy is worded, which of two equal orderings
reads better — decide it, record it, and carry on.

## Output

Write your report to `tmp/units/u8-report.md` in this checkout, and make your final message the same
content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **Screen by screen** — what each of the four became, and what each of the three forms became.
3. **The accepted states** — what each now says and where each now sends the reader.
4. **The rendered evidence** — per frame you read, what you saw, naming the defect it closed.
5. **Rulings on the unknowns.**
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
