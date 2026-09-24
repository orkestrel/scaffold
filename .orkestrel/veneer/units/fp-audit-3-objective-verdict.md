1. **CONFIRMED — The disabled check.** The per-host assertion precedes the shared-variant assertion at [ButtonGroupSection.test.ts:287](/home/user/veneer-fp/tests/app/browser/sections/ButtonGroupSection.test.ts:287).

   P1 gives every host `btn-primary btn-secondary`. The assertions distinguish this mutation: the per-host check fails. I read [fp-mutations-3.log.txt:4](/home/user/veneer-fp/tmp/units/fp-mutations-3.log.txt:4), which records exit 1 at line 287, and its [driver:13](/home/user/veneer-fp/tmp/units/fp-mutate-3.py:13), which restricts the mutation to the disabled specimen.

   N2 changes the check label to `btn-outline-primary`. The per-host check passes, but the shared-variant check fails. I evaluated the current source expressions against the original and mutated class lists in memory; the original passes and each mutation fails as described. The earlier browser failure is recorded at [fp-mutations-2.log.txt:14](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-mutations-2.log.txt:14). The passing current browser case appears at [fp-3-sections.log.txt:80](/home/user/scaffold/.orkestrel/veneer/units/fp-instruments/fp-3-sections.log.txt:80). No browser run occurred in this audit.

2. **CONFIRMED — The bar and the guide.** The attack for retained perceptual claims or audit history found neither in the [TSDoc:2585](/home/user/veneer-fp/tests/setup.ts:2585) or [case comment:1753](/home/user/veneer-fp/tests/app/browser/integration.test.ts:1753). They describe a luminance ratio against the row’s rest fill. The TSDoc places `1.2` between the excluded and photographed readings, consistent with [the recorded measurements:61](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-2.md:61).

   An exact comparison confirms that replacing “through the `MODE_TOKEN` pattern” with “through its mode-token pattern” transforms the previous patch into [fp-shared-3.patch:39](/home/user/scaffold/.orkestrel/veneer/units/fp-shared-3.patch:39), with no other difference. The attack for an additional patch change failed.

3. **CONFIRMED — Scope and law.** [fp-3-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/fp-3-status.txt:1) matches the previous status and the live worktree. The live diff and retained [fp-3.diff:1](/home/user/scaffold/.orkestrel/veneer/units/fp-3.diff:1) have identical SHA-256 digests.

   A TypeScript AST inspection of added lines found no `any`, prohibited assertion, or forbidden nested function. An in-memory control containing those constructs was detected. Reading the added code and searching suppression, mock, spy, and fake-clock spellings found none. Anonymous callbacks passed directly to calls remain permitted.

   The requested report counts follow, referencing [b-passive-frames-report-3.md](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-3.md):

   - Line 4: “three items.”
   - Lines 11–13: “exactly one variant class,” “the same one,” the named class pair, and the “one-class assertion”; these describe the tested cardinality.
   - Line 14: diagnostic `(6)`.
   - Line 15: `1 failed | 7 passed (8)`.
   - Line 25: “both sites.”
   - Line 38: `8 passed (8)`.
   - Line 42: `20 passed (20)`.
   - Line 48: `7 files changed, 1003 insertions(+), 49 deletions(-)`.

   The diagnostic, test, and diffstat values match the inspected records.

Findings outside the claims:

- **R1 — BROKEN: missing retained mutation evidence.** [Report:16](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-3.md:16) and [audit brief:5](/home/user/scaffold/.orkestrel/veneer/units/fp-audit-3-analyst-brief.md:5) name a mutation log and driver under `fp-instruments/`. Filesystem checks find neither there. Their worktree copies exist and support claim 1, but the named retention paths fail the [retention contract:506](/home/user/scaffold/.agents/orchestration.md:506). Smallest fix: retain the existing log and driver at the named destinations. This finding concerns evidence custody, not assertion behavior.

- **R2 — BROKEN: report tallies violate the reporting constraint.** [Report:4](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-3.md:4) states “three items,” and [report:25](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-report-3.md:25) states “both sites.” These tally growable sets despite [brief:34](/home/user/scaffold/.orkestrel/veneer/units/b-passive-frames-brief-3.md:34) and [AGENTS.md:172](/home/user/scaffold/AGENTS.md:172). Smallest fix: remove the item tally and name the TSDoc and case comment. Quoted run measurements and the per-host cardinality constraint remain valid.

Attacked and held: the verdicts record the attacks. Adjacent correct behavior includes different disabled forms sharing a variant, direct anonymous callbacks, and a calibrated luminance threshold making no perceptual guarantee.

VERDICT: FAIL none; outside the claims: R1, R2