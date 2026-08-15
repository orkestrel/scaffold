# J1 audit round 1 — the journey layer, the retrofit, the cascade's home

Subject: commit 87e2dc9 (baseline c1eb5a3), Sol implementer over the bench (journal
`tmp/codex/j1.jsonl`, session `01a002ea-11eb-7401-9fd0-39d7c826763d`), one round. Six test-tree
files; no product code. Decides whether the journey doctrine's instrument is sound before the
History chain builds journeys on it, and whether SK1 later canonizes this layer's design.

Established (Orchestrator-verified, not this audit's subject):
- Sol's sandbox denies loopback listeners, so its runtime proofs were blocked (recorded standing
  condition); the Orchestrator ran the listener-dependent acceptance at 87e2dc9:
  `test:app:browser` → `Test Files 33 passed / Tests 363 passed`; integration →
  `Test Files 3 passed / Tests 10 passed` (`tmp/redesign/j1-accept.log`). Static gates green in
  the unit's own run (format/lint/check exit 0, `git diff --check` clean).
- The runtime sweep found no cascade breakage beyond the unit's two static repairs — the browser
  project is green with the cascade in `tests/setupBrowser.ts`.

Evidence: diff `tmp/redesign/j1.diff` (git show 87e2dc9, 329 lines); the unit's full report
`tmp/redesign/j1-report.md` (surface, retrofit table, repairs); the unit brief
`tmp/redesign/j1-brief.md`; the doctrine block in
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`; the tree at 87e2dc9.

Claims (falsify shape; CONFIRMED names the failed attack; one terminal line; no diary):

1. **The resolver refuses everything the doctrine forbids.** `resolveJourneyTarget` admits only
   visible, focus-reachable, correctly-roled, unambiguous, enabled targets by accessible name;
   every refusal fails readably (named reason, not a timeout). Attack the admission edges: an
   ambiguous name (two buttons sharing a prefix), a `visibility:hidden` vs `display:none` vs
   zero-size target, a disabled control, an `inert` subtree, a control reachable by pointer but
   not Tab (tabindex=-1), and the textbox path's password handling (label-first resolution then
   real-control verification) — does any admit what a person cannot reach, or refuse what they
   can?
2. **The retrofit preserves the journey's facts on honest instruments.** All nine sites died
   (grep clean, Orchestrator-verified); the replacements read perception: `hasJourneyFocus`
   converges instead of `:focus`-attached waits; the refusal reads through the named region's
   alert; `aria-invalid` stands in for `.is-invalid` — attack whether `aria-invalid` is a
   perception read (AT-surfaced) or a styling-class read in disguise, and whether any replaced
   wait can pass while a person would still see the old state (convergence law).
3. **The rail journeys through the layer are the same journeys.** Pointer uses the returned
   locator's real click; keyboard walks bounded real Tabs and Enter; the layer adds no reach a
   person lacks and removes none they have; the below-`lg` modality asymmetry is recorded in
   the layer, not papered over.
4. **The cascade move is complete and honest.** One import in `tests/setupBrowser.ts`, none
   test-local; the two static repairs (OpenPanel `checkVisibility` pair, RunList focus-ring
   correction) describe the styled truth rather than weakening facts; nothing else in the
   browser project depended on the unstyled render (the Orchestrator's green run is the
   population-level evidence — attack the two repairs' content, not the sweep).
5. **Scope, doctrine, and residue.** Exactly six files touched, all owned; no product code; no
   forbidden constructs; no CSS-ID targeting, `dispatchEvent`, programmatic `.click()`/`.focus()`
   on any journey path; the layer's surface is minimal (no speculative options beyond its four
   consumers); naming and placement per the rules (`{verb}{Noun}` helpers, shared infra in
   setup files, exported and consumed).

Lane split: the analyst (Sol, bench) takes 1-5 objectively — note the writer was also Sol; this
is the primary audit round, not a fix round, so the two-lane pass stands and the reviewer's
independent lane keeps the round two-engined. The reviewer (Opus) takes 1-5 subjectively:
doctrine fit, the layer's shape and vocabulary as the thing SK1 will canonize, the retrofit's
readability, and whether the refusal messages teach the journey author what a person could not
do. Read-only lanes; the Orchestrator supplied diff, report, and acceptance evidence above.
