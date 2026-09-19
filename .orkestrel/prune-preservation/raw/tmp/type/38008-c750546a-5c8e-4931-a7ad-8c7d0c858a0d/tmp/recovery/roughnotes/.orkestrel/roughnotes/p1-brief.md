# Unit P1 — make the confirmations tell the truth, and say what happens to a person's data

## Role and engine

`implementer` — Opus 5, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer. The tree is committed and clean at
`18e6352`.

A read-only unit is surveying `app/core/constants.ts` at the same time. Do not edit that file.

## Objective

Close two product defects the repository owner ruled on. Both are about what the interface tells a
person, and both ship today.

## The first defect — a confirmation that promises follow-through

The forms are honest. `ContactForm.vue`, `SubscribeForm.vue`, and `PaymentForm.vue` each carry
`Fixture only — nothing is sent off this device` beside the submit control.

The confirmations are not. After submitting, a person reads:

- `ContactView.vue:74` — `The Indianapolis office answers on the number and address beside this
  confirmation.` No office answers. Nothing left the browser.
- `SubscribeView.vue:38` — `Print and digital delivery is recorded for {{ record.name }} at
  {{ record.email }}.` under the heading `COPY.accepted`, with `Nothing was sent off this device.`
  placed in the `#next` continuation lower down the page.
- `PaymentView.vue:38` — `COPY.paymentAccepted`, with the same shape.

A person reads the confirmation. The disclaimer sits below it, in a different block, after the
sentence that already told them the thing succeeded.

**The property to change.** The confirmation states what actually happened, in the confirmation
itself, before any continuation. The request is held on this device; nothing was sent; no office,
no delivery, and no payment follows. Keep the confirmation useful — it should still show the person
what they entered, which is real — and stop it promising an action nobody will take.

Write the copy yourself. It is product prose for a person, so `.claude/rules/writing.md` governs it
as developer prose does not: plain, specific, no euphemism. "Held on this device" is true; "queued",
"submitted", and "received" are not.

Rule on `COPY.accepted` and `COPY.paymentAccepted` in the constants file that owns them. If the word
"accepted" is what makes the heading a promise, change the value rather than papering over it with a
sentence underneath.

## The second defect — personal data collected with no notice

`ContactView.vue` renders a name, a company, an email address, a phone number, an optional title,
and an optional message. `PaymentForm.vue` collects billing details. No privacy notice exists
anywhere in the tree.

**The property to change.** Tell the person what happens to what they type, where they type it. The
true statement is short: it stays in this browser, it is not transmitted anywhere, and clearing the
site's data removes it. Do not write a policy for data handling that does not happen — no retention
schedule, no third parties, no rights request address. A notice that invents machinery is worse than
none, because it is the same lie in a longer form.

Place it where a person meets the collection, not on a separate page they would have to find. Decide
the placement and say why.

## What must not change

- What the application stores, and where. This unit changes what the interface says, not what the
  controller does.
- Any route, any navigation, any control's accessible name unless the copy change requires it — and
  where it does, the tests that assert that name change with it.
- The four primitives and the component structure.

## The hazard that makes this unit non-trivial

The journey suite asserts rendered text. Changing a confirmation sentence reddens every case that
quotes it, and that is correct behaviour rather than a problem to work around. Find every test that
asserts a string you change and update it to the new truth. A test still asserting the old promise
after this unit is a test asserting a sentence the application no longer makes.

`tests/app/browser/integration.test.ts` and the component tests under `tests/app/browser/components/`
are the likely sites. Sweep for each string you change rather than guessing.

## Unknowns

- Whether `COPY` carries the confirmation headings or the views hold them inline. Establish it and
  say which.
- Whether the capture registry names a state whose frame shows a confirmation. If a registered state's
  rendered text changes, the frame changes; that is expected, and the registry itself should not need
  editing. Say what you found.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- `npm test` runs six projects: app, journey across four variants, policy, config, setup, conformance.
- The built CSS asset is 323.24 kB. A copy change must not move it; if it does, say so.
- Bootstrap's Sass deprecations are silenced. A `deprecat` line in a build or test run is a regression.

## Scope

**Owned files:**

- `app/browser/components/ContactView.vue`, `SubscribeView.vue`, `PaymentView.vue`
- `app/browser/components/ContactForm.vue`, `SubscribeForm.vue`, `PaymentForm.vue` — only for the
  privacy notice
- the constants file that owns `COPY`, for the confirmation headings only
- every test that asserts a string you change

**Off-limits — do not edit, for any reason:**

- `app/core/constants.ts` — a read-only survey is reading it
- `app/browser/controllers/`, `app/core/` behaviour, `app/browser/types.ts`
- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- `vite.config.ts`, `package.json`, `guides/`, `.orkestrel/`, `tmp/authority/`
- the scaffold and test checkouts

Do not commit, push, install, or bump anything. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. No confirmation surface states or implies that a request was sent, received, delivered, answered,
   or paid. Quote each confirmation's new text in your report.
5. A privacy notice reaches a person at the point of collection on every form that collects personal
   data, and states only what is true.
6. Every test asserting a changed string is updated, and a sweep for each old string returns nothing
   outside the campaign records under `.orkestrel/`.
7. `npm test` exits 0. Report every project's counts.
8. `npm run build` succeeds, no `deprecat` line appears, and the CSS asset is 323.24 kB.

**Observations, not criteria:** the wall-clock durations; whether any capture frame's content changed.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not change what the controller stores. Do not write a privacy notice
describing handling the application does not perform. Do not weaken a test to keep it green — update
it to the new truth or report why it cannot be updated.

## Output

Write your report to `tmp/units/p1-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The confirmations** — each surface, its old text and its new text.
3. **The notice** — its text, its placement, and why there.
4. **The tests** — every assertion you updated, and the sweep that proves no old string survives.
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
