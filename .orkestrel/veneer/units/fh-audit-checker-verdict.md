<!-- Retained from Workflow run wf_09941f27-ccb, agent a19da522e13e2fe00 (checker on Sonnet). -->

This confirms the class TSDoc for `FrameManager`. Sufficient evidence gathered. Producing final verdict now.

## Verdict

**Claim 1 — Scope and gates.** MET.
- `fh-status.txt:1-6` lists exactly six modified files, matching the report's six-file `## Files` list (`b-frame-helpers-report.md:157-167`).
- `fh.diff:5-71` shows the only `guides/veneer.md` hunks land at old-file lines 9876 and 9930, both inside `## Tests` (`veneer-fh/guides/veneer.md:9796` starts § Tests; § Showcase ends at 9795), so the guide change sits in § Tests alone.
- `fh-shared.patch:1-13` deletes exactly the "capture registry registers no frame for the light and dark role rings…" paragraph, the § Showcase paragraph the claim names, and nothing else.
- Gate logs exist and read green under `fh-instruments/`: `fh-format.log.txt:3` (`All matched files use the correct format.`), `fh-lint.log.txt`, `fh-check.log.txt`, `fh-test-setup.log.txt`, `fh-test-guides.log.txt`, `fh-setup-browser.log.txt`, `fh-test-policy.log.txt` header lines match the report's `## Gates` table commands.
- `fh-instruments/fh-journey-dark-1280-4.log.txt:76`, `fh-journey-light-390-3.log.txt:76`, `fh-journey-dark-390-1.log.txt:78` each read `Tests  62 passed (62)`.

**Claim 2 — One helper, one name per concept.** MET.
- `veneer-fh/tests/app/browser/integration.test.ts`: every lift site uses `FRAMES.lift(specimen|host|base|collapsed, async (wrapper) => {…})` (34 call sites, `wrapper` param name uniform); no private `lift`, `cropRegion`, `readRing`, or `computeRingReach` function exists in the file (search returned no matches).
- `readElement<HTMLElement>`-typed unchecked reads are gone: no occurrence of `querySelector<HTMLElement>` remains in the file; every prior unchecked-cast site now reads `readElement(specimen, …)` (32 call sites at `integration.test.ts:891` onward). Remaining bare `querySelector(...)` calls are untyped and either optional-chained (`?.contains`) or feed variables directly — none carry the `<HTMLElement>` unchecked-cast form the claim scopes.
- `veneer-fh/tests/setupBrowser.ts:532` defines `readElement`; `measureVariation`/`measureDifference`/`readImageRegion` are called from the test file, not reimplemented there.
- `veneer-fh/tests/setup.ts:3416` (`FrameRegion` interface), `:3480` (`scanFocusReading`), and the box helpers typed against `FrameRegion` (`:3232`, `:3234`) confirm the region type and pure readers live in `tests/setup.ts` with tests (`tests/setup.test.ts` diff hunk at `fh.diff:3993` adds a case).

**Claim 8 — Prose.** MOSTLY MET, with one referral.
- The carried plaintext comment matches verbatim: `integration.test.ts:2438-2439` reads "Focus paints no outline and no ring on a plaintext control, and it moves the content box of an empty floating one down to the floated inset…", matching the report's quote (`b-frame-helpers-report.md:100`).
- No changed sentence states a count; the only numerals added are versions (`Bootstrap 5.3.8`, `fh.diff:65`) or code/test data values, which the numeral rule permits.
- Spatial "above" (`strip above the element/ring`, `fh.diff:67,1257,3449,4083,4104,4933`) is not the banned cross-reference sense; enumerative "once…and once…" (`fh.diff:4715-4716,4864`) is not the banned temporal "after" sense. Both read as permitted senses under the rule's sense test.
- Every added code token I found in guide prose and TSDoc is followed by a noun (`lift` method, `focus` method, `:focus-visible` pseudo-class, `auto` outline, `readRing` function, `computeRingBand` helper) — `fh.diff:57-71, 4083-4104, 4864-4865`.
- **Referral 1 (UNRESOLVED, not a verdict of mine):** `fh.diff:71` (guide) and the comments at `integration.test.ts:1889,2007-2008` (carried report evidence at `b-frame-helpers-report.md:86-87`) write `` `outline: 0` `` with no noun after the token, which reads as a token-without-noun hit under the writing rule's literal text. This exact phrasing is pre-existing and pervasive elsewhere in the tree, untouched by this diff (`guides/veneer.md:3146`, `tests/src/styles/components/form-control.test.ts:330`, `form-range.test.ts:89`, `form-select.test.ts:112`), so whether `outline: 0` counts as an exempt CSS-value literal ("quote each as itself") or a bound code token needing a noun is a sense judgment the writing rule assigns to a reader, not to mechanical matching. I did not rule it either way; it needs the subjective lane's or the Orchestrator's call.
- **Referral 2 (UNRESOLVED):** `fh.diff:341` (`+ // pointer, so `:active` survives a staging that `:hover` does not.`) reproduces, byte-for-byte apart from indentation, text deleted at `fh.diff:268`. Neither `:active` nor `:hover` is followed by a noun there. Whether a reindented but textually unchanged comment counts as a "changed" comment under claim 8's scope is a boundary judgment, not a mechanical fact; I flag it rather than ruling.

**Outside the claims:** none found in the material I read.

VERDICT: FAIL 8; outside the claims: none
