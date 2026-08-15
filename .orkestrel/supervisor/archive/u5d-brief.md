# U5d — the rail footer: identity to the banner, the door to an icon

## The user's ruling (binding)

"On the bottom left the open by id and all the words down there don't look right — they should
go somewhere else. Maybe the open by id can be just a plus icon button, or maybe just like a
search bar. This should feel more or less like a usual admin dashboard; still be creative, but
fix that stuff that feels out of place."

Orchestrator's ruling split, recorded in REDESIGN: the search bar is H6's terminal form for the
door (History carries prefix search over completed runs — do NOT build an interim search here).
This unit does the cleanup: identity leaves the rail footer for the banner, the door compacts
to an icon-button disclosure, and the copy defects in the same file are repaired with it.

## Role and engine

`implementer`, engine **Opus 5** (dashboard feel, placement, and copy are design-bearing). Sole
serial writer in `/workspace/supervisor` from clean committed baseline **995c30a** (U5c closed through its fix round).
Perform directly, spawn nothing, no commits/pushes/installs.

## The work

1. **Identity moves to the banner.** `OpenPanel.vue`'s `identity` computed ("Logged in as X.
   Authorized for Y.") leaves the rail footer. The banner is the dashboard's identity home —
   design its form there: the reader's name visible at `lg` and up near Logout; below `lg` the
   banner already carries glyph-only signature + theme + logout, so decide what survives
   visibly there and what lives in accessible names, and record the call. The grants sentence
   ("Authorized for …") is part of the move — where it lands (beside identity, or with the
   door's disclosure) is yours, recorded; it must not stay in the footer.
2. **The grant sentences get their nouns.** The three branches repair with number agreement:
   "Authorized for every workflow." stays; "Authorized for no workflow." stays; the list branch
   becomes noun-bearing — "Authorized for workflow 'unused'." / "Authorized for workflows
   'build', 'release'." (the current branch renders "Authorized for unused." — a sentence a
   person cannot parse; reviewer finding, verified).
3. **The door compacts to an icon-button disclosure.** Same never-primary ruling, same
   collapsed-by-default behavior, same expanded form beneath. The visible caption goes — the
   control is an icon with the accessible name `Open by id` (the ruled name stays; the
   `getByRole('button', { name: 'Open by id' })` locator in the integration suite keeps
   answering through the aria-label). GLYPH HAZARD, named: a plus icon reads as "create new" in
   dashboards, and this door OPENS an existing ended run — pick a glyph that reads as
   open/find (`bi-box-arrow-in-right`, `bi-search`, or similar established icon), not `bi-plus`.
   Where the icon button sits so the rail ends clean (rail footer slimmed, or the door folded
   near the Stack heading) is yours, recorded — "admin dashboard" is the bar.
4. **The reader-facing "workflow" nouns become "run"** in the door's copy: the field label, the
   help text ("For a run that has already ended." already says run — the field label `Workflow`
   and `aria-label="Open this workflow"` do not), and any other reader-facing string in
   `OpenPanel.vue`. The identity sentences' "workflow" nouns are grant-domain language and may
   stay if you rule them technical — record either way.
5. **The local fault echo dies.** `OpenPanel` copies `operator.fault?.message` into its own
   `refusal` and renders it in `invalid-feedback`; since U5c the same fault renders as a toast,
   so the door shows the message twice (writer probe, recorded). Remove the local mirror; the
   field keeps only validity marking that is genuinely field-local (empty-input refusal). If
   removing it changes the `described`/aria-describedby wiring, carry that wiring correctly.
6. **The caption sweep follows.** `tests/app/browser/ApplicationView.test.ts:760` allows exactly
   `['Open by id']` as the one multi-word caption; with the caption gone icon-only, tighten the
   allowance to `[]` (every lettered control back to one word) and keep the aria-label
   containment rule intact.

## Carried advisories (reviewer, U5c final pass — bind on this unit's placement work)

- The toast surface pins to the bottom trailing corner and its cards cover the current rail
  footer on mobile (`u5b-gone-mobile-light.png`: the gone toast sits over the door that answers
  it). Place the compacted door and anything else that stays low so the toasts' routine
  footprint does not bury a control a reader needs while a toast is up — or place them
  elsewhere entirely; record the call.
- `exit` (the drawer's way out) and `leave` (the session's) are two departure words in
  `ApplicationView.vue`. If your identity/banner work touches that cluster, settle which
  departure owns which word and record it; do not churn either gratuitously.

## Scope

**Owned:** `app/browser/components/OpenPanel.vue`, `tests/app/browser/components/OpenPanel.test.ts`,
`app/browser/ApplicationView.vue`, `tests/app/browser/ApplicationView.test.ts`,
`tests/app/browser/integration/integration.test.ts` (only if a door/identity signal needs
re-pointing — measure first; the aria-label likely keeps it green).

**Off-limits:** everything else — `RunList.vue`, `StackList.vue`, `LoginPanel.vue`,
`CommandBar.vue`, all controllers/stores/services, `types.ts`, `tests/setupBrowser.ts`,
`journey.test.ts`, `integration/setup.ts`, configs, guides.

Forbidden: the standing list; no aria-live; no new dependencies; no invented classes; trusted
input on every asserted interaction (`userEvent`, no `dispatchEvent`, no bare `.click()`).

## Acceptance criteria

1. The rail footer holds no identity sentences and no worded door — at most the compact icon
   disclosure in its ruled place; the banner (or its recorded below-lg form) carries identity.
2. The grant list branch renders number-agreeing nouns; the three branches proved.
3. The door expands and opens exactly as before through its icon control; the integration
   suite's door path stays green.
4. No reader-facing string in the owned files says "workflow" where the campaign vocabulary
   says "run", except grant-domain sentences you rule technical (recorded).
5. The fault renders once application-wide: the toast; the door's local mirror is gone; the
   field-local empty refusal still marks the field.
6. Caption sweep tightened to `[]` passes; file suites green; `app:browser` project green;
   static gates green.

## Deviation contract

Stop and report if the identity move needs a controller or store change, or if the door's
integration signal cannot stay green from the owned files. Ancillary placement/glyph/copy calls
are yours, recorded. Failing-first where the defect class can run red (the noun branch, the
double-echo removal, the sweep tightening).

## Output

Touched files + diffstat; the full diff; per-criterion proofs with commands and tails; recorded
calls; `git status --porcelain`; deviations or none. No diary.
