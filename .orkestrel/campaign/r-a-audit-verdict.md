# Roughnotes unit R-A — audit verdict (Orchestrator, 2026-09-17)

Subject tip `86a9ef6`; claims `r-a-audit-claims.md`; lane reports `r-a-audit-objective-report.md`
(`analyst`, `gpt-6-astra`, thread `01a0b19a-0a8c-7221-889b-d96e081317c2`, 452 s) and
`r-a-audit-subjective-report.md` (`reviewer`, Opus 5, 635 s). Reproductions under
`r-a-audit-reproduction/` (three browser probes and their readings, the mutation script and its
summary).

## Lanes that ran

| Lane       | Role       | Engine        | Swap                                      | Terminal line                                                            |
| ---------- | ---------- | ------------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| Objective  | `analyst`  | `gpt-6-astra` | Default: Opus wrote the unit              | `VERDICT: FAIL 1, 2, 4, 5, 7, 8, 9, 10; outside the claims: O1`          |
| Subjective | `reviewer` | Opus 5        | Default                                   | `VERDICT: FAIL 3, 4, 7, 9, 10; outside the claims: F1, F2, F3, F4`       |

The objective lane's sandbox refused Vitest's temporary config write, so its browser vectors are
UNRESOLVED with named commands; the Orchestrator ran each.

## Orchestrator reproductions

| Vector | Reading | Record |
| ------ | ------- | ------ |
| Claim 4: what covers the compact masthead while the menu is open (390×844) | The dialog carries `aria-modal="true"`; the resolver resolves the masthead's `Get started, Site`; the pointer at its centre hits the menu's `Publications, Site` link; the header is neither `inert` nor `aria-hidden`; Tab traversal from the open menu cycles inside the dialog and refuses the masthead control | `probe-1-readings.txt` |
| Claim 5 / F1: `/media` with an empty catalog | Four bare `Contact` anchors; `Interactive target "Contact" is ambiguous across 4 elements` at 1280 and at 390 | `probe-1-readings.txt` |
| Claim 1a: open → navigate from the menu → reopen | `expanded` after open (`shown` fired), `collapsed` after the navigation (`hide`, `hidden` fired), `expanded` on reopen | `probe-1-readings.txt` |
| Claim 1b: a second click during the opening animation | Playwright refuses the click (the trigger is covered; 11 s actionability timeout) — not a person's vector | `probe-1-readings.txt` |
| Claim 1c: a same-view hash change with the menu open | The menu stays open (`show`, no hide event); a cross-view change hides it | `probe-2-readings.txt` |
| Claim 1d: widening past the breakpoint with the menu open | `aria-expanded` stays `true`, the trigger is hidden, the menu stays shown; `waitForState(absent)` refuses the hidden trigger; back at 390 the state is consistent | `probe-2-readings.txt` |
| Claim 2: the binding removed, read after `shown` | `shown events=1 states=[] attribute=null` — Bootstrap writes no `aria-expanded` on the trigger | `mutations-summary.txt` (m0) |
| Claim 8: `opened` never flips true | The menu case reddens: `Condition ""Menu" to announce "expanded"" did not hold within 4000ms (last states: ["collapsed"])` | `mutations-summary.txt` (m1) |
| Claim 8: `buildName` returns the label alone | The shell-name pin and the census redden (`expected [ '800-428-4384', …(30) ] to deeply equal [ '800-428-4384, Contact', …]`; `expected [ …(154) ] to deeply equal []`) | `mutations-summary.txt` (m2) |
| Baseline after every restore | `12 passed (12)`; the tree clean | `mutations-summary.txt` |

## Findings carried

| Finding | Source | Reproduction | Carrier |
| ------- | ------ | ------------ | ------- |
| `isReachable` counts a control an open `aria-modal` dialog covers; a pointer, the keyboard, and a screen reader cannot reach it; the consumer split one control's name to keep resolution unambiguous | subjective 4 and R1; objective 4 | claim 4 probe | T4 (test package): `isReachable` reports `false` for an element outside a visible `[aria-modal="true"]` element that does not contain it; ships in test 0.0.18 |
| The exception's stated reason ("the compact masthead keeps its own action beside the open menu") is false: the masthead is reachable only to the resolver | subjective 4 | claim 4 probe | R-A-2 item 1: state the true reason in `App.vue` and the guide; keep the split until roughnotes re-pins to test 0.0.18, then R-B restores `Get started, Site` for the menu's copy |
| The naming rule is not one rule: the home invite's suffix names display copy, not the region's accessible name; the menu's destinations announce `Site` inside a region named `Menu` | subjective 3 | By reading `HomeView.vue:255-268`, `App.vue:212-237` | R-A-2 item 2: the invite's section carries the accessible name its control's suffix names; the guide states the rule the code follows (a shell destination announces the navigation it belongs to) |
| `/products` and `/media` with an empty catalog carry a bare `Contact` on the notice recovery and on the screen's continuation (four on `/media`) — a collision in a state the guide's table declares, outside the census | subjective F1; objective 5 | claim 5 probe | R-A-2 item 3: name the recovery links with existing channel vocabulary, keep the continuation's bare label, and extend the census over the data states the guide's table declares (the Absent rows first) |
| The census infrastructure (`SHELL_NAMES`, `ROUTES`, `readHeading`, `followRoute`, `readShared`) sits in the test file, not the setup module | objective O1 | By reading `App.test.ts:69-151` | R-A-2 item 4 |
| `buildName` has no case in its mirrored `tests/app/browser/helpers.test.ts` | subjective R2 | By reading | R-A-2 item 5 |
| The guide overstates: "settles on the announced state" (R-B's work, present tense); "the region carrying each of its destinations" beside `Products, Site` in the menu; the speech-input sentence; `aria-expanded` presented as an interface improvement a person hears; the `aria-label`-per-link redundancy unrecorded | subjective 7, 10 | By reading `guides/README.md:140-222` | R-A-2 item 6: the guide states what exists, the rule the code follows, Label in Name in place of the speech claim, the state's observability as it is, and the redundancy as a recorded cost |
| The guide's block-3 paragraph runs to 186 characters after the Orchestrator's verbatim application | subjective F2 | By reading `guides/README.md:222` | R-A-2 item 6 (rewrap) |
| `COPY.join` sits in the action-copy block while used as a region word | subjective F3 | By reading `constants.ts` | R-A-2 item 2 |
| The hide gate reads the painted `show` class, so a navigation during the opening animation leaves the dialog open, and the watcher observes `view`, so a same-view navigation leaves it open | subjective F4; objective 1 | claim 1c probe (same-view: menu stays open) | R-A-2 item 7: gate on the instance's shown state and watch the location; the guide sentence says what the code does |
| `aria-expanded` stays `true` while the trigger is hidden after widening | objective 1 (d) | claim 1d probe | A bound, recorded: the menu is open, the state is true, the trigger is unreachable; no change |

## Confirmed on evidence, no carrier

- Claims 1 (a, b), 2, 5 (as scoped), 6, 8 held with the Orchestrator's reproductions and the lanes'
  attacks; claim 9's rulings are taken per finding in the table.
- Claim 10's "would you ship" — the listing, footer, and utility collisions are resolved and every
  composed name leads with its visible label; shipping waits on R-A-2's guide and the empty-state
  collisions.

## Dropped on the record

None.

## Where the lanes disagreed, and the ruling

- **Claim 4's mechanism.** The subjective lane ruled "retain the split, strike the reason; the durable
  carrier is upstream"; the objective lane withheld a ruling pending the accessibility reading. The
  probe supplies the reading (the pointer hits the dialog's link; Tab cycles inside the dialog;
  `aria-modal` is set). Ruling: the layer models the modal (T4); the split stays provisional until
  the re-pin.
- **Claim 1.** The objective lane's transition vectors reproduced one defect (same-view navigation)
  and one bound (widening); the subjective lane confirmed by reading the shown/hidden path. Both
  are right about their objects.

## Routing of the fix

T4 (`opus`, test checkout — the proof needs a browser the bench cannot launch) lands the modal
clause and ships as test 0.0.18. R-A-2 (`opus`, roughnotes) carries items 1–7 in one round; its
prescriptions adopt the lanes' wording where given, and it closes on the Orchestrator's re-run of
the claim 5 probe (no `ambiguous` refusal on `/media` and `/products` with an empty catalog), the
mutation readings its controls record, a `checker`, and a `verifier`, in place of a second
adversarial round. R-B follows R-A-2 and the re-pin.
