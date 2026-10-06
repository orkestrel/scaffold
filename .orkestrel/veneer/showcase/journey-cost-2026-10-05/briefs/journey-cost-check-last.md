The plan **holds with corrections** overall. Its arithmetic largely reproduces, but the acceptance floor double-counts savings, the scrollspy estimate omits waits, and the proof-preservation gate omits a logged reading.

References below use:

- **P**: [plan-v3.md](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/plan-v3.md)
- **I**: [integration.test.ts](/home/user/veneer/tests/app/browser/integration.test.ts)
- **SB**: [setupBrowser.ts](/home/user/veneer/tests/setupBrowser.ts)
- **SS**: [setupStyles.ts](/home/user/veneer/tests/setupStyles.ts)
- **A**: [journey-6.log](/home/user/veneer/tmp/units/tokens-t3/journey-6.log)
- **B**: [preserved test_journey.log](/home/user/veneer/tmp/units/tokens-t3/review/landing-prev/test_journey.log)
- **J**: [journey-4.json](/home/user/veneer/tmp/units/flip-preservation/journey-4.json)

Method: read the brief and contracts, then the plan, prior findings, and decision-bearing source and logs. Recomputed with read-only Node commands, retaining full precision before rounding. No files changed; no tests, browsers, servers, or agents launched.

**Question 1 — Does every adopted item preserve proof?**

**Verdict: holds with corrections.**

Items 1b and 2 preserve their original scans’ inputs under the stated cache boundaries; the sheet-rewrite controls retain fresh scans. Item 4 preserves `resolveSpecimen` and its exact-name and uniqueness refusals. Item 11 retains both widths and their assertions. These claims agree with SB:1383, SB:1974, SB:2158, I:1123, and I:1441.

Item 5 still permits a loss of refusal coverage. The original reader gathers links from every matching navigation, then rejects multiple active links (SB:5124). A scoped poll sees only the cached navigation. A second matching navigation with an active link can therefore cause the original poll to throw while the scoped poll continues. If that transient duplicate disappears before the closing read, the closing read cannot recover the missed refusal. This is a source-derived counterexample, not a browser reproduction.

The claimed complete line inventory is demonstrably incomplete: P:622 omits `390 header`, emitted at I:256 and present in A and B. The per-title failure-count rule also cannot detect different rows failing within an already-failing table.

Corrections:

1. Preserve item 5’s whole-document refusal population at every relevant poll, or prove and enforce navigation-population stability. Add a transient duplicate-navigation control.
2. Add `390 header` to the line gate; compare line multiplicity as well as normalized content.
3. Compare host-bound failures by row and cause alongside title counts, so an unchanged failing-title count cannot conceal lost passing rows.

**Question 2 — Are the figures right?**

**Verdict: holds with corrections.**

The layer-1 arithmetic is correct:

| Scenario | Recomputed sum |
|---|---:|
| Floor | 42 + 15 + 0 + 2.7 + 4 + 1 = **64.7 s** |
| Central | 51 + 50 + 5 + 3 + 7.3 + 2 = **118.3 s** |
| Ceiling | 69 + 72 + 10 + 3.3 + 11 + 3 = **168.3 s** |

These are sums of **modeled credits**, not savings measured by the logs.

Using P:382’s stated untimed allocation and the logs’ unrounded bodies reproduces the end model:

| Run | Logged bodies | Scale | Excess redistributed | Predicted ends: light-1280, dark-1280, light-390, dark-390 |
|---|---:|---:|---:|---|
| A | 604.3014 s | 1.27745265 | 7.3708 s | 858.59, 605.44, 588.05, 500.13 s |
| B | 577.1830 s | 1.25196051 | 6.3319 s | 817.88, 595.27, 575.66, 498.58 s |

The proportional redistribution conserves summed test time plus offsets.

Exhaustive enumeration of the stated assignments reproduces the reduction table within rounding:

| Scope | A | B |
|---|---:|---:|
| Every destination, central | 226.05–244.14 s | 208.75–222.87 s |
| Every destination, range | 203.64–255.07 s | 186.07–225.68 s |
| Dark-1280 only, central | 142.00–160.10 s | 145.55–159.67 s |
| Dark-1280 only, range | 117.40–200.50 s | 103.32–194.11 s |

The following executed command recomputes the layer sums, the log inputs, and both end-table rows. It also exposes the rounding difference in P:382’s historical allocation:

```bash
node - <<'NODE'
const fs = require('node:fs');
const root = '/home/user/veneer/';
const names = ['light-1280', 'dark-1280', 'light-390', 'dark-390'];
const sum = xs => xs.reduce((a, b) => a + b, 0);
const j = JSON.parse(fs.readFileSync(
  root + 'tmp/units/flip-preservation/journey-4.json', 'utf8'));
const measured = j.testResults.map(t =>
  (t.endTime - t.startTime - sum(t.assertionResults
    .filter(a => /J4 compares|compares paired open|attributes every component departure|partitions the shared names/.test(a.fullName))
    .map(a => a.duration || 0))) / 1000);
console.log('Raw historical untimed seconds:', measured, sum(measured));

const u = [360.18, 380.12, 416, 322.65]; // P:382 model inputs
const offsets = [10.29, 15.54, 16.26, 16.53];
for (const file of [
  'tmp/units/tokens-t3/journey-6.log',
  'tmp/units/tokens-t3/review/landing-prev/test_journey.log'
]) {
  const text = fs.readFileSync(root + file, 'utf8');
  const m = text.match(/Duration\s+([\d.]+)s.*tests ([\d.]+)s/);
  const bodies = [0, 0, 0, 0];
  for (const line of text.split('\n')) {
    if (!/^(Face journey duration|Paired engine duration|Component preservation duration|Partition duration) /.test(line)) continue;
    const value = JSON.parse(line.slice(line.indexOf('{')));
    bodies[names.indexOf(value.variant)] += value.seconds;
  }
  const wall = Number(m[1]);
  const scale = (Number(m[2]) - sum(bodies)) / sum(u);
  const raw = u.map((v, i) => offsets[i] + v * scale + bodies[i]);
  const excess = raw[0] - wall;
  const ends = raw.map((v, i) =>
    i ? v + excess * u[i] / sum(u.slice(1)) : wall);
  console.log({ file, logged: sum(bodies), scale, excess, ends });
}
console.log('Layer 1:', [
  42 + 15 + 0 + 2.7 + 4 + 1,
  51 + 50 + 5 + 3 + 7.3 + 2,
  69 + 72 + 10 + 3.3 + 11 + 3
]);
NODE
```

Material qualifications remain:

- Raw J data gives untimed seconds **360.1935, 380.1120, 415.9920, 322.6630**, totaling **1478.9605**, rather than P:382’s allocation totaling 1478.95. This is a small rounding inconsistency.
- Item 5 assumes two closing waits per row (P:229). `arrangeScrollspySelection` calls an assertion wait, `actOnScrollspyControl` contains another wait, and the scenario’s assertion supplies another (SB:5218, SB:5233, SB:5304). `scrollComponentTo` can add closing reads. Its net query estimate is therefore unsupported.
- The tail allowance is a heuristic. Adding `(f−1)W/4` after assignment does not establish equivalence to inflating identified work before a discrete assignment search, especially with restricted destinations.
- The displayed Q2 rows sum to **8,596.4 s** and **20,385.3 s**, each 0.1 s above the stated total. More materially, these are estimates, not bounds. `test:journey:vue`, worktree preparation, and correction runs are not fully priced.
- Actual optimization gains, anonymous-memory peaks, and a guaranteed contention factor remain **unverified**: the cited logs contain no candidate measurements of them.

Corrections:

1. Retain full precision internally and state one rounding convention.
2. Replace item 5’s credit after P-F counts all removed and retained queries.
3. Label the tail calculation an estimate; derive acceptance requirements from observed candidate runs.
4. Describe Q2’s duration as a partial estimate, including its unpriced work. Reconcile its “five suites” at P:526 with the four named at P:614.

**Question 3 — Is the plan feasible on this host?**

**Verdict: holds with corrections.**

The serial exclusive lock with bare child commands resolves the earlier nested-lock conflict (P:581–584). Preparing copied, separate worktrees before P0 resolves the setup and hard-link hazards (P:571–579). The preserved evidence directory is readable. Fresh full-run artifacts and unique run folders address overwrite and stale-artifact risks.

The memory proposal follows the earlier finding: anonymous/shared-memory accounting, renderer RSS, OOM counts, and the live limit replace the cache-inclusive reading (P:587–594). Its adequacy remains **unverified until J-B0**; the historical memory figure cannot supply the proposed anonymous-memory headroom.

Corrections:

1. Fix the acceptance-floor calculation described under Question 5 before making it a mandatory gate.
2. Specify artifact collection by command type. Non-journey commands produce neither fresh journey artifacts nor necessarily a JSON report; P:584 must apply its freshness requirement to full journey runs.
3. Extend item 9’s cleanup beyond the existing `finally`. Enables and stylesheet creation precede that block, and a failing stylesheet reset would prevent subsequently appended disables (SS:283–293, SS:320). Cleanup must cover partial setup and attempt both disables after reset failure.
4. Make the placement search’s tie-breaks explicit: minimum largest end, then fewest moves, then the stated destination preference.

**Question 4 — Does v3 close every prior finding?**

**Verdict: fails.**

Most prescribed changes are present. The blanket closure claim at P:708 is too strong: item 5’s arithmetic and refusal equivalence remain incomplete, the supposedly exhaustive line gate omits a reading, and the host-time estimate remains incomplete. The table below gives every finding’s disposition.

Corrections:

1. Replace the blanket closure claim with the per-finding dispositions.
2. Repair the partial and unclosed findings before declaring the prior check complete.
3. Track the acceptance double-counting defect separately; it predates v3 but was not identified in the prior findings.

**Question 5 — Which savings are measured, and what floor is enforceable?**

**Verdict: fails.**

**No nonempty set of the proposed optimizations has measured savings in the supplied evidence.** The logs measure existing durations. The role-query price is a proxy from another case; scan shares and reuse shares are assumptions. P:464–474 acknowledges these limitations. `report-5.md:317` explicitly says no ablation assigned its observed difference to individual work.

P:632 credits each item with the baseline-to-checkpoint improvement of its affected cases. Items 1b and 3 both affect preservation; item 10 also affects preservation and partition. Summing those “per-item” improvements counts overlapping improvements repeatedly. Case-time savings across concurrent projects also cannot automatically be summed into wall-time savings.

P:453 additionally calls a quantity “measured” while including layer 2’s modeled floor.

Corrections:

1. State that **no positive measured floor is established**. Zero seconds is a non-regression requirement, not evidence that a candidate will meet it.
2. Credit overlapping changes as one measured bundle, or isolate incremental effects before assigning per-item credits.
3. Establish the wall-time floor directly from comparable full runs: the faster baseline wall minus the slower candidate wall. Freeze the chosen requirement before independent acceptance runs.
4. Keep placement predictions and percentage targets separate from the measured acceptance floor.

**Question 6 — Which decisions need the user, and are the recommendations sound?**

**Verdict: holds with corrections.**

Q1 genuinely needs the owner’s ruling because the existing comments explicitly select light-1280 (I:1122, I:1440). Its recommendation is reasonable if the reading geometry and proof remain unchanged. However, the theme table already resides in **light-390**, not light-1280 (SB:5342).

Q2 genuinely needs coordination beyond this unit: it affects other work’s access to the host and pauses lane turns. Serial execution and quiet measurement windows are sound recommendations. The stated duration cannot be presented as a verified bound.

The per-lane gate choice, attribution method, and handling of regressions are implementation decisions for the Orchestrator. They do not inherently require another user question.

Corrections:

1. Reword Q1 to distinguish the halves’ light-1280 host from the theme table’s light-390 host. Keep deferred item 13 outside this approval unless its concrete change is presented.
2. Present Q2 with the estimated duration and explicitly unpriced work.
3. Retain the recommendation to investigate and change a regressing placement before repeating acceptance; do not rerun unchanged candidates until they happen to pass.
4. Remove the automatic zero-saving exemptions for items 7 and 10. They are optimizations without a demonstrated correctness defect; the performance rule requires a measured gain worth keeping. Item 9 has a distinct state-cleanup rationale.
5. Retain per-lane full runs if attribution is worth their cost, but describe the saved cost of consolidation as approximately two historical runs, not a guaranteed 1,717.18 s.

The complete findings disposition follows. “Closed” means the plan addresses the finding; it does not mean the proposed implementation has been executed or proved.

| ID | Disposition | Evidence |
|---|---|---|
| 1.1 | partly | A/B totals reproduce; P:382’s historical allocation differs slightly from raw J values. |
| 1.2 | closed | P:193 correctly dates the role control and primary-map demonstration after pass 3. |
| 1.3 | closed | P:526, P:533 distinguish 737 s from 1,769 s; `gates-4333d76.txt:2–32` recomputes to 1,769/948 s. |
| 1.4 | partly | P:228 fixes 18 rows per table; P:229 omits the act wait at SB:5233 and additional loop closures. |
| 1.5 | closed | P:68 names the tooltip path through SB:4934 and SB:4947. |
| 1.6 | closed | P:247–248 distinguish guarded rows, table ends, and reference-only checks. |
| 1.7 | closed | P:255 and P:624 correctly name dark-1280 and light-390. |
| 1.8 | closed | P:208–212 use 196 fewer queries; layer-1 floor recomputes to 64.7 s. |
| 1.9 | closed | P:649–654 attach separate sources to the acceptance scripts. |
| 1.10 | closed | P:576–579 distinguish PATH, browser environment, managed fallback, and bundled fallback. |
| 1.11 | closed | Corrected function ranges and indirect specificity call are stated at P:722 and the adopted items. |
| 1.12 | closed | P:449 correctly places 25% below the modeled central band’s low edge. |
| 1.13 | closed | P:40 uses 114.27 s; P:155 supplies unrounded operands yielding 4.5327 s. |
| 1.14 | closed | P:388 states proportional redistribution; the end rows reproduce. |
| 1.15 | partly | P:405–445 make the placement arithmetic reproducible; P:518–530 still supplies incomplete estimated costs rather than bounds. |
| 2.1 | closed | P:205–207 preserve `resolveSpecimen`; P:492 adds generated-content and refusal fixtures. |
| 2.2 | partly | P:220 restores role queries and the scoped throw, but a transient second matching navigation remains outside its population; SB:5124. |
| 2.3 | closed | P:641 implements the requested per-title count rule. Row-level preservation needs the additional correction under Question 1. |
| 2.4 | closed | P:621 requires a full run and fresh artifact mtimes. |
| 2.5 | closed | P:289–298 and P:496 specify pseudo-specific keys and all eight pseudo-elements. |
| 2.6 | closed | P:110 distinguishes preservation failure lists from partition assertions. |
| 2.7 | closed | P:138–140 keep the index outside shared options and retain fresh sheet-control scans. |
| 2.8 | closed | P:173–186 retain map identity boundaries, inverse position, and P-C equality conditions. |
| 2.9 | closed | P:490 adds differing-condition coverage; items 3, 6, 7, and 9 retain the cited readings. Cleanup completeness is an additional finding. |
| 2.10 | not | P:622 repeats the exhaustive-line claim, but I:256 emits the omitted `390 header` reading. |
| 3.1 | closed | P:591 and P:645 use the live limit rather than the incorrect fixed limit. |
| 3.2 | closed | P:10 uses preserved B; P:557–566 copy evidence; P:583–584 require unique run folders and hashes. |
| 3.3 | closed | P:581–582 specify one exclusive outer lock and no nested lock. |
| 3.4 | closed | Exclusive serialization removes the identified shared-reader starvation mechanism; P:750–751. |
| 3.5 | closed | P:567–568 prohibit the unlocked gate runner and establish the host lock rule before P0. |
| 3.6 | closed | P:600, P:607, P:612, and P:627 pause lanes for price windows; P:592 adds outside-CPU accounting. |
| 3.7 | closed | P:587–594 replace cache-inclusive usage; P:645 applies anonymous headroom and OOM checks. Actual readings remain unverified. |
| 3.8 | closed | P:44 serializes CPU/browser commands rather than relying on browser-instance counting. |
| 3.9 | closed | P:598 separates timeout/error outcomes; P:626 reruns loaded reds in a price window. |
| 3.10 | closed | P:581–585 serialize commands and require clean gate worktrees. |
| 3.11 | closed | P:571–575 prepare all worktrees before P0 and avoid unnecessary rebuilds after test-only changes. |
| 3.12 | closed | P:571–573 require external worktrees, ancestor checks, and actual dependency copies. |
| 3.13 | closed | P:573–579 retain the capacity/toolchain prerequisites and require recording the resolved browser. Historical free-space readings are not a future capacity guarantee. |