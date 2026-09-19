# Audit verdict — unit 3, request contracts

Round run 2026-09-16 against commit `fd959fb`. Five independent lenses — contract conformance,
correctness, scope honesty, proof quality, design fit — each in a clean context, blind to the
others, on Opus 5, which is not the engine that wrote the unit (GPT-6 Astra). Every finding was
then put to a refuter instructed to default to rejecting it. 34 agents, 0 errors.

Findings that survived refutation: **three**, of which two name the same residue.

## A1 — major — the journey layer cannot bind the defect this unit closed

`tests/app/browser/integration.test.ts:382` guards the second submit click:

```js
if (readRefusal(COPY.subscribe) === undefined) {
	await clickAccessible('button', COPY.subscribe)
}
await waitForText('the accepted status paints', COPY.accepted)
```

`readRefusal` returns the resolver's message when the control is absent
(`tests/app/browser/setup.ts:47-54`). Under the self-submitting defect the form has already
committed by the time the reader finishes typing, so the button is gone, the guard skips the click,
and `waitForText(COPY.accepted)` reads the acceptance **the defect painted**. The same guard shape
sits at `:494` for contact and `:530` for payment.

The verifier did not reason about this — it reintroduced the defect and re-ran the journey project,
and the result was identical to the baseline. The only suite that drives the assembled application
is blind to this defect.

What the finding's own framing gets wrong, recorded so the fix is aimed correctly:

- The brief's shared-file clause is conditional. It asks for a patch only if a journey **must**
  change to match the corrected behaviour, and the journeys do pass under the corrected behaviour.
  The unit's "Shared-file patches: None" complies with the clause as written.
- The red-then-green requirement was met. The component suite recorded 3 failed then 9 passed on one
  command. The binding exists; it is at the component layer, not the journey layer.
- The guard predates the defect. It dates from the initial commit `3498359`; `fd959fb` did not touch
  the journey file.

What survives is the measured gap: a guard written before the defect was known absorbs it, and the
assembled-application proof cannot see it.

**Why this matters beyond the unit.** The campaign ends with a journey-driven production-readiness
pass. A journey that passes whether or not the application is broken proves nothing about
readiness. Any guard of the form "click this only if it is still there" hides exactly the class of
defect where a control disappears when it should not.

**Carrier:** unit 9, which owns `tests/app/browser/integration.test.ts` and `tests/app/browser/setup.ts`.
Its brief must require that every conditional guard around an interaction is either removed or
justified in the report, and that the journey binds the self-submitting sequence directly.

## A2 — minor — debug instrumentation left in three shipped tests

`SubscribeForm.test.ts:31`, `ContactForm.test.ts:33`, and `PaymentForm.test.ts:32` each carry an
unconditional seven-argument `console.info` inside the summary-link loop. The cases run
`it.each([320, 390])` over 2, 4, and 3 links, so **18 lines** print on every `app:browser` run. The
output reaches the accepted gate log at `tmp/codex/u3-browser.log:282-316`, for example
`320 "#inquiry-name" 180 25.59375 375.078125 "A" "d-block"`.

`git log -S"console.info" -- tests/app/browser/components/` names one commit: `fd959fb`. This is
residue from the measurement that diagnosed the hit-target defect, left in after the measurement was
taken. The assertion beside it is `expect.soft`, so nothing suppresses the print, and no `no-console`
rule is configured, so no gate catches it.

No contract clause forbids it — roughnotes carries no rule file on console output — so this rests on
the observation rather than on a rule. It is still residue and it still goes.

**Carrier:** the fix round below.

## A3 — duplicate of A2

A second lens found the same residue independently and measured the same 18 lines. Recorded as
corroboration, not as a separate finding.

## Findings the round did not sustain

Every other candidate was refuted. The lenses actively checked, and found nothing they could
sustain, on: forbidden constructs (`any`, `as`, `!`, suppression comments), readonly discipline on
the new contract, declaration placement, superfluous wrappers, the `check`/`submit` boundary being
genuinely closed against every revalidation path, event-name migration completeness, scope honesty
against the brief's owned and off-limits lists, and mock or fake usage in the new tests.

## The Orchestrator's own finding, carried alongside

`#validate` sets `issues.value = []` on a successful `check` and `undefined` on a successful
`submit`. The unit's report documents the distinction — undefined means unchecked or accepted, an
empty collection means a valid checked draft — but `app/browser/types.ts` does not: the `issues`
TSDoc describes neither state. An empty array is truthy, so any future `v-if="issues"` renders an
empty summary. The distinction is a real one and may stay; the contract must state it.

**Carrier:** the fix round below.

## Fix round

One unit, after unit 4 releases the checkout:

- Remove the `console.info` residue from the three form tests. (A2)
- Document the `issues` states on the contract in `app/browser/types.ts`. (Orchestrator finding)

A1 goes to unit 9 as a brief requirement, not to this fix round, because unit 9 owns those files and
will be rewriting the proof layer anyway.
