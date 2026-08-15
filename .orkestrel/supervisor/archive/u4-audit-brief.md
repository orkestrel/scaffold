# U4 audit round 1 — the Runs rail and the demoted door

Subject: commit df8d622 (baseline 439e6d2), Opus implementer, one round. Files: RunList.vue (new)
+ its 9-test suite (new), OpenPanel.vue demotion + its updated suite. Decides whether U5 composes
the rail and whether the rail closes exit criterion 2's component half.

Established (Orchestrator-verified): the writer's binding probe (planted defects → 5 red,
restored → green) and door-demotion failing-first (1 red → green) claimed in its report; the
predicted integration red from the hidden `#open-workflow` signal confirmed by the Orchestrator
(7 timeouts) and carried to the in-flight harness round — NOT this audit's subject; the
ApplicationView caption-sweep red is U5's carried patch; guides 4 = U7's set, this diff adds no
export.

Evidence: diff /home/user/scaffold/tmp/redesign/u4.diff; the tree at df8d622; the writer's full
report is in the campaign record; design record /home/user/scaffold/.orkestrel/supervisor/REDESIGN.md
(rail rulings; NO waiting field; decay-in-place; never-primary door; status-line ruling; journey
doctrine — rows resolvable by role/name with no hooks).

Claims (falsify verdict shape; CONFIRMED names the failed attack; pixel judgment defers to
U5-composition captures and U8):

1. **The merge is derivation, not a second store.** Rows recompute from snapshot+departed on
   every read; ordering is `created` then id, stable under arrival/departure/reopen; no retained
   row collection exists; the open row pins in place and survives departure. Attack the sort's
   edge cases (equal created, reopened id) and the claim that nothing reorders under the reader.
2. **Five states from facts alone.** loading/ideal/empty/partial/error each derive from
   {snapshot, departed, live, fault} with no stored state label; partial keeps rows + one
   non-alert notice; error is the alert; retry drives the manager seam exactly once per
   activation; no input/form in any rail state; the empty state surfaces no typed-id door.
3. **The a11y contract.** One visible role="status" line carries the coalesced fact; the list has
   no live region and no aria-hidden truth the status line contradicts; rows are buttons with
   accessible names carrying id+state (+ last-seen for decayed); aria-current on exactly the open
   row; the skeleton is aria-hidden and motionless; keyboard reach proved with real userEvent.
4. **The demotion is the ruling.** Disclosure closed by default, correct aria-expanded/controls,
   ruled help text, no btn-primary anywhere in the door, expansion by real click, the form still
   functions; the Vue-owned collapse toggling is sound without Bootstrap JS (verify the writer's
   cascade claim that .collapse:not(.show) hides).
5. **Names, placement, scope.** One component ruling sound (no RunItem — verify against the
   component rules); deriveTone reuse not a parallel mapping; data-row marker per the documented
   convention; touched set exactly the four owned files; no forbidden constructs, no timers, no
   invented classes (enumerate the classes the diff adds).
6. **Ship it to U5.** The rail mounts standalone, needs no shell hook, and its fixed `id="runs"`
   single-instance assumption is safe under offcanvas-lg; the CommandBar duplicate-read finding
   is real and correctly deferred (verify it is a read-consolidation, not a correctness defect).

One terminal line each. No process diary. A concurrent writer owns LoginPanel.test.ts and the
integration files — not your subject; do not read them as evidence.
