# U5d fix round — the honest re-entrancy proof and the bounded grant sentence

Successor to `u5d-brief.md`. Carries: Sol claim 5 BROKEN (the SubmitEvent dispatch is a doctrine
breach, not transport evidence — `u5d-analyst-verdict.md` item 5); the Orchestrator's ruling on
the reviewer's advisory 1 + Sol's shrink referral (the grant list sentence is unbounded prose in
a control strip and can crush the wordmark — bounded count form adopted); the reviewer's
advisory 4 (the identity rationale exists in two comments that can drift). Everything else:
claims 1-3 CONFIRMED by Sol, design CONFIRMED by the reviewer with no required changes; the
showcase finding carried to U7; degradation frames are the Orchestrator's capture debt after
this round.

## Role and engine

`builder` (three fully specified changes). Sole serial writer in `/workspace/supervisor` from
clean committed baseline **990027d**. Perform directly, spawn nothing, no
commits/pushes/installs.

## The changes

1. **`tests/app/browser/components/OpenPanel.test.ts` — real presses, restriction asserted.**
   Remove the `submit()` helper's `form.dispatchEvent(new SubmitEvent(...))`. Drive every
   reachable submission with trusted input (`userEvent.click` on the enabled submit button, or
   Enter via `userEvent.keyboard` from the field — match the file's idiom). Reshape the
   re-entrancy proof: while the first submission is in flight, assert the submit control reports
   `disabled` (the restriction a person feels) and, after settlement, that the recorded
   transport received exactly one call. Do not synthesize a second submit on a disabled control.
   Keep every other assertion.
2. **`app/browser/ApplicationView.vue` — the grant sentence is bounded.** In the `identity`
   computed, keep three branches as they are ("every", "none", and exactly one grant —
   `Authorized for workflow 'unused'.`) and change only the multi-grant branch: two or more
   grants render `Authorized for ${count} workflows.` (e.g. "Authorized for 2 workflows.") —
   no enumeration. Update the corresponding branch proof in
   `tests/app/browser/ApplicationView.test.ts` to the new expected string (this is the one
   authorized assertion change). The comment recording the below-sm limit stays; extend the
   script comment with one sentence: the enumeration belongs to the account surface already
   named there.
3. **`app/browser/ApplicationView.vue` — one rationale home.** The identity rationale exists in
   the script comment (~36-42) and again in the template comment (~286-293). Keep the script
   comment as the home; cut the template comment down to a one-line pointer or delete it if the
   markup is self-evident. No behavior change.

Touch nothing else.

## Scope

**Owned:** `tests/app/browser/components/OpenPanel.test.ts`, `app/browser/ApplicationView.vue`,
`tests/app/browser/ApplicationView.test.ts`. Everything else off-limits. Forbidden: the standing
list; no assertion weakening beyond the one authorized expected-string change in item 2.

## Acceptance criteria

1. No `dispatchEvent` remains in `OpenPanel.test.ts`; the re-entrancy proof asserts the disabled
   state and the single transport call; `npm run test:app:browser -- tests/app/browser/components/OpenPanel.test.ts`
   green.
2. The multi-grant branch renders the count form; the singular branch is unchanged;
   `npm run test:app:browser -- tests/app/browser/ApplicationView.test.ts` green (36/36).
3. One identity rationale comment remains in the file.

## Deviation contract

If the in-flight disabled state cannot be observed deterministically (the transport settles too
fast to catch it), stop and report the failing output — the harness's scripted client controls
settlement, so this should be reachable; a genuine race is a finding.

## Output

The diff, the test commands and their summary lines, `git status --porcelain`, deviations or
none.
