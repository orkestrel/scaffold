# J-SANITIZER audit — the reconciled verdict (the Orchestrator, 2026-09-24)

Lanes: `analyst` on GPT-6 Astra (objective; thread `01a0d523-f53d-7b82-af81-2dacbadbc5ad`, `j-sanitizer-audit-objective-verdict.md`), `reviewer` on Opus 5.5 (subjective; `j-sanitizer-audit-subjective-verdict.md`), `checker` on Sonnet (`j-sanitizer-audit-checker-verdict.md`), one claims file. Opus wrote the unit; the objective lane ran on Astra. The Orchestrator's gates (`j-sanitizer-gates-2.log.txt`) read green: 847 of 847.

| Claim | Objective | Subjective | Checker | Ruling |
|---|---|---|---|---|
| 1 Selection | CONFIRMED | CONFIRMED | UNRESOLVED | CONFIRMED (the checker lacked the test file; the Orchestrator read it) |
| 2 Context parse | FAIL | CONFIRMED | CONFIRMED | FAIL: the context element carries neither the target's attributes (an `annotation-xml` `encoding`) nor a realm-independent `template` read (R2) |
| 3 Safety floor | FAIL | FAIL | CONFIRMED | FAIL: DOM clobbering bypasses the floor (objective), and the animation rule's walk-only removal is unstated (subjective) |
| 4 Configuration semantics | FAIL | CONFIRMED | UNRESOLVED | FAIL: the same clobbering skips a kept form's subtree under any configuration |
| 5 Construction | CONFIRMED | CONFIRMED (R1 referred) | CONFIRMED | FAIL on R1, adopted: a non-plain or accessor configuration clones to `{}` and passes |
| 6 Destination refusal | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 Another window | CONFIRMED | CONFIRMED | UNRESOLVED | CONFIRMED on the Orchestrator's reading, with F1 and R2 carried into round 3 |
| 8 Conditional proofs | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 Tooltip default | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 10 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 11 Instrument | CONFIRMED | UNRESOLVED | CONFIRMED | Closes on the Orchestrator's own run after round 3, with a control row that must survive |

## The defect that blocks the landing

DOM clobbering (the objective lane, claims 3 and 4, derived from the source and the HTML standard's `[LegacyOverrideBuiltIns]` form interface). Under `{}`:
- `<form onclick="alert(1)" action="javascript:alert(2)"><input name="attributes"><button>Submit</button></form>`: `node.attributes` resolves to the input, so the form's handler and script action are never checked.
- `<form><input name="childNodes"><iframe srcdoc="<script>alert(1)</script>"></iframe></form>`: `node.childNodes` resolves to the input, so the iframe and its `srcdoc` are never walked.

Native safe sanitization removes all of these. On a Chromium without `setHTML` the walk is the only sanitizer, so the unit does not land until every property and method the walk reads on a parsed node goes through the prototype.

## Round 3 (successor brief `j-sanitizer-brief-3.md`)

- **C1 Clobbering.** Traversal and every read and removal go through a mechanism a named property cannot shadow.
- **C2 Context.** The context carries the target's attributes, and a `template` context or target is recognised without the current realm's constructors.
- **C3 Construction (R1).** A configuration that is not plain data is refused.
- **C4 The floor's walk-only removals (claim 3).** The `attributeName="action"` case is added with its `walked` literal and named in the remarks.
- **C5 Proof gaps.** R3 (the `data-*` agreement case), R4 ("nothing loads" pinned).
- **C6 Findings.** F1 (the cross-window sentence) and F2 (`matchesJavaScriptURL`).
- **C7 The instrument.** Rows for each round-3 mechanism and a control row that must survive. The Orchestrator re-runs the whole instrument after the round.

RULING: round 3 on C1 to C7; the objective lane re-audits the walk after it
