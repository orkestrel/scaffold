# Measured finding — the forms submit themselves while the reader is typing

Found by the objective design lane in source, reproduced by the Orchestrator against the running
dev server at `http://localhost:5179/#/subscribe` on 2026-09-16, on the tip before unit 3.

## What happens

Each form revalidates on `blur` and on `input` by calling the application's **committing** method,
not a parsing one. `SubscribeForm.vue`'s `check` calls `app.subscribe(...)`, `ContactForm.vue`'s
calls `app.inquire(...)`, and `PaymentForm.vue`'s calls `app.pay(...)`. Each of those sets the
accepted record and emits its event (`app/browser/controllers/ApplicationController.ts`).

`check` runs only once `issues` is set, so the path opens after one refused submit. From there, the
next keystroke that makes the draft valid commits it.

## The reproduction

```
1. Open #/subscribe.
2. Press "Subscribe free" with both fields empty.   -> refusal painted, no acceptance
3. Type a valid full name.                          -> no acceptance yet
4. Type a valid work email.                          -> ACCEPTED
```

Readings taken at each step, in the page:

```
after step 2   { refusal: true,  accepted: false }
after step 3   { accepted: false }
after step 4   { accepted: true, text: "You are subscribed", formStillPresent: false }
```

The reader never pressed the submit control the second time. The form vanished, the confirmation
appeared, and `ApplicationController` emitted `subscribe` with the record — so every emitter
consumer sees a submission that was never made.

## Why it also breaks a journey

This is the mechanism behind the `dark-390` failure `expected '' to be 'payment-customer'`. Clicking
an error-summary link blurs the field that had focus, which runs `check`, which re-renders the form,
which replaces the node `focusNode` is about to target. Focus lands on the body. Two symptoms, one
defect.

## What the fix must establish

Separate parsing from committing. Revalidation parses and updates the issues it reports; only an
explicit submit commits the record and emits. The proof is behavioural, not structural: drive the
reproduction above and assert that step 4 leaves the form present, paints no acceptance, and emits
nothing.

The same change carries the single-word rule. `inquiryIssues` and `paymentIssues` on
`ApplicationInterface` are multiword entity members, which `AGENTS.md` § Design laws forbids; the
shape it prescribes for an insufficient single word is to group the members into a sub-entity rather
than to lengthen the name.
