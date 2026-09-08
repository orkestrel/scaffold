# Guide heading repair: acceptance pending

Do not pack or install this candidate yet. The focused regression ran red before the
repair and green afterward. The conformance checker returned PASS. The subjective
review found fixture placement, naming, and prose defects. The root full chain then
failed in the vendored configured-policy test; the named case failed again alone.

The full-chain log is retained under evidence/d7n-guide-heading-host. Its format, lint,
type, build, source-test, and policy-test stages passed. The config stage failed because
the real binary did not emit the expected policy(no-mocking) diagnostic. The chain did
not reach its later stages. d7n-guide-config-scout-brief.md bounds the diagnostic map.
No evidence yet attributes that failure to the heading repair.

## Review reconciliation

- R1 is supported. Name the reader as the actor that refuses a heading. Use "additional
  code span", not the review's positional wording. Describe surrounding spaces plainly.
- R2 is supported. Remove the guide's expression over the local block variable. Keep the
  public behavioral rule and the appropriate implementation detail in source remarks.
- R3 is supported. Place encounter-order and deduplication behavior beside extractSurface,
  before the paragraph moves to extractMethods.
- R4 is supported. Align extractCellText's parameter and return descriptions with its
  newly documented heading use, without changing the parameter name or public signature.
- R5 is supported. Name the shared document for its demonstration heading, and update its
  actual importers.
- R6 is supported. The inline case matrix violates tests.md's setup-file rule. Relocate
  the data, keep registration in the test file, and retain the existing assertions.

Do not adopt F1 as a defect. The text names supported forms without claiming an exhaustive
set; the accepted design expressly leaves image handling and its promise unchanged.
The returned review supplies no executed counterexample to that promise.

Ref-1 misstates the supplied evidence. The review brief named the real red and green logs;
the reviewer did not read them. Root's full-chain evidence remains separate. Ref-2 does
not require a test that asserts a static fixture against itself: the direct and cached
tests already consume that document and assert its observable result. Ref-3 restates the
accepted genuine-heading-first residual; do not reopen deduplication or docs propagation.
Ref-4 is covered by the pending replacement-artifact fleet validation, not by this audit.

Preserve the returned reports. Their tallies and pointer defects are report-only. The
conformance PASS missed the inline-matrix rule and is not sufficient acceptance evidence.
The instrument check's earlier trap-placement claim is also report-only; its supported
marker-ordering and metadata-retention defects were corrected and independently rechecked.

The source candidate remains uncommitted at guide baseline 1d5afa3. Retain its full diff,
status, briefs, and run evidence. Resolve the host gate blocker and establish the required
clean checkpoint before another writer starts. Keep the old 2b76b363 artifact installed.
Publication and guide main remain pending.
