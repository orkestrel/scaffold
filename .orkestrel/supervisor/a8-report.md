# A8 report (Opus implementer, returned complete; landed at 2d68a77 with guide integration)

Touched: helpers.ts (describeFailures new leaf; describeOutcome bounds all three provider
strings and answers in words for empty records), WorkflowView.vue (status row qualification),
helpers/WorkflowView/PhaseView tests, portfolio (failed + mixed states). TaskView.vue and
ContentPane.vue owned but deliberately unchanged: rendering the probe's exact shape at
baseline showed the task tier already states the message in full and the phase tier already
voices failed in words — the workflow tier's false-success reading was the only gap.

Ground truth from @orkestrel/workflow (index.js:385,421): a failed task fails its phase;
derivePhaseStatus + deriveWorkflowStatus fold a failed bail:false phase into 'completed'.

Voice: 'Test failed, and this run continued past it.' — withheld when the run's own status
is failed; carried by every other status including running-past-failure. Names joined by
Intl.ListFormat, unbounded (definition-controlled). Colour text-danger-emphasis measured
7.07:1 light / 5.02:1 dark via throwaway readContrast probe (deleted); adding that reading
to contrast.test.ts recorded as a later-change candidate.

Bounding both ways, deliberate: feed card bounds message+reason via describeValue (closes
A7's recorded nick); task tier stays unbounded as the detail destination.

Proofs: red round A (1 failed WorkflowView proof + missing-export syntax fail), red round B
(2 failed bounding proofs: 648 vs 169; 'Failed:   ' vs the words), then 109/109 scoped;
app:browser 480/480 (467→480); check green; scoped oxfmt/oxlint clean; no prohibited
constructs (grep proof in report). Parity measured red 373/374 on describeFailures, closed
by the three-part guide patch in integration → 374/374.

Deviations: none.
