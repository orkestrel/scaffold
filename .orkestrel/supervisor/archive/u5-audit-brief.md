# U5 audit round 1 — shell composition, fleet signature, restore notice

Subject: commit 7c0ddd3 (baseline 5993301), Opus implementer, one round. Files:
`app/browser/ApplicationView.vue` (306 changed lines), `tests/app/browser/ApplicationView.test.ts`
(rewritten), `tests/app/browser/integration/{setup.ts,integration.test.ts,journey.test.ts}`, and
one out-of-owned edit in `tests/app/browser/seeders.test.ts` (ruled below). Decides whether the
composed shell closes the campaign's shell half and whether J1 starts from this baseline.

Established (Orchestrator-verified, not this audit's subject):
- Gates at 7c0ddd3, from `tmp/redesign/u5-gates.log`: `Test Files 61 passed (61)` /
  `Tests 652 passed (652)` for the app projects; the only red is the declared U7 parity set
  (`tests/guides/src/parity.test.ts`, 4 failures — pre-existing, carried by U7).
- The capture portfolio at 7c0ddd3 exists: 10 frames (rail-empty/rail-live/run-open/rail-decay
  desktop light+dark; drawer-live/run-open/drawer-reopened mobile) — the reviewer's primary
  evidence for every rendered-surface claim.
- The brief's one factual error (the shell's path) was corrected mid-unit by the Orchestrator;
  the writer confirmed it blocked nothing.

Evidence: diff `/home/user/scaffold/tmp/redesign/u5.diff` (full `git show 7c0ddd3`, 1514 lines);
status `/home/user/scaffold/tmp/redesign/u5-status.txt` (empty = clean); the writer's report
`/home/user/scaffold/tmp/redesign/u5-report.md`; the unit brief
`/home/user/scaffold/tmp/redesign/u5-brief.md`; design record
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` (rail rulings, fleet-readout ruling — NO
waiting indicator, never-primary door, status-line ruling, journey doctrine, convergence law);
the tree at 7c0ddd3 in `/workspace/supervisor`.

Claims (falsify verdict shape per `orkestrel-falsify`; CONFIRMED names the failed attack; one
terminal line; no process diary):

1. **One rail, one region.** The rail is ONE `offcanvas-lg` element mounted once — the shell's
   dual-mount idiom is not used for it; the authenticated shell contains exactly one `id="runs"`
   and exactly one visible `role="status"` line at both widths; the mobile content overlay and
   its duplicate heading are gone. Attack via the diff and the both-width tests: does any width,
   state, or restore path render a second instance or a second status region?
2. **The signature is derived, static, honest.** The fleet readout computes from
   `operator.roster` facts alone (live count, paused count, updates-stopped from the fault),
   with no stored label, no waiting indicator, no animation or continuous-motion class; below
   `lg` the same computed drives the drawer-opening control (`aria-controls="rail"`) whose
   caption is the count and whose words live in `aria-label` — the recorded caption-law
   consequence. Verify the sweep's single multi-word allowance is exactly `['Open by id']` and
   that the control's aria-label contains its caption per the sweep's own law.
3. **The notice states and clears without announcing.** `operator.notice` renders exactly once
   in the rail, naming the run and distinguishing gone/refused; it carries NO live region — the
   writer's recorded departure from the skill's "alert-styled notice is role=alert" line,
   resolved by not styling it as an alert. Rule on that resolution. The logout fault keeps its
   own surface under the renamed `refusal` local, and nothing collides with RunList's status
   line.
4. **Focus and Escape discipline.** Opening the drawer moves focus to its close control; closing
   returns it to the opener; Escape dismisses the drawer when the drawer's control is on screen
   and otherwise clears the selection; clearing a selection whose row sits in a closed drawer
   reopens the drawer so the row takes focus; the ask-the-element idiom keeps every breakpoint
   out of script. The proofs run real `userEvent` against the shipped cascade at both widths.
5. **Journey and convergence doctrine.** The two rail journeys (click-open; keyboard-only Tab to
   the row, Enter) use trusted input and role/name resolution only — no `dispatchEvent`, no
   `.click()`, no CSS-id targeting on the asserted path, no networkidle, no timers. The
   re-pointed integration signals (run request text in `main [role="log"]`; row counts scoped to
   `li [data-row]`) are convergence waits, and `driveApplication` centralizes acquisition
   leak-safely across the five re-based tests.
6. **The cascade import is real and rightly placed.** `ApplicationView.test.ts` imports
   `halfmoon/css/halfmoon.min.css`; without it the suite renders unstyled and hidden elements
   answer role queries and take focus, so the both-width proofs depend on it. Rule the
   placement: `tests/tests.md` puts shared setup in `tests/setupBrowser.ts` (not owned by U5).
   Is the per-file import a defect this round must fix, or a recorded J1 carry (J1 owns
   `setupBrowser.ts`)?
7. **Scope honesty and the deferred set.** The touched set is exactly the five owned files plus
   `seeders.test.ts` — 3 assertions rewritten because the removed gate/badge made green
   unreachable; rule ratify-or-revert. The report-only patches (StackList empty-state copy + its
   test; OpenPanel's "workflow" nouns → H6) are genuinely unapplied and nothing in the diff
   depends on them. The fault-surface observation (`operator.fault` has no general shell
   surface; non-ABSENT restore failures retain it invisibly) is outside U5's six items — confirm
   it is real and name the carrier you would assign.
8. **Rendered truth** (reviewer lane, portfolio primary). The frames show: an empty rail with no
   typed-id field anywhere primary; live rows appearing with no id entry; the open run beside
   the rail at desktop; decayed rows reading "Last seen"; the mobile drawer flow
   (drawer→run→reopened) with the signature control visible. Each frame is consistent with
   claims 1–4 and with the never-primary-door ruling, in both themes captured.

Lane split: the Sol analyst takes claims 1–7 against the diff and tree. The reviewer takes all
eight with the portfolio primary for 2, 3, and 8. The checker takes conformance: exact touched
set vs the owned list, forbidden constructs (`any`/`as`/`!`/suppressions/mocks/timers/`style`
attributes), naming and caption law, added class tokens against the established framework set,
and rule-map letter for `tests.md`/`browser.md` on the files touched.

No concurrent writer exists; the tree at 7c0ddd3 is the subject and is clean. Read-only lanes:
the Orchestrator supplied the diff, status, gates excerpt, and portfolio above — do not write
anything.
