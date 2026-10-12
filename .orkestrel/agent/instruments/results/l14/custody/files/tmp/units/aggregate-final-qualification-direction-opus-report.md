# Recommended direction for the aggregate qualification defects

Finish the frozen Qwen4 unit untouched. Once root releases source custody, land one bounded source unit with two separate corrections:

1. **Scale criterion.** Remove the later cross-arm per-goal scale refusal. Keep the initial-equality check and the real capacity checks.
2. **Identifier index.** Stop rendering the code-collected `Ids:` line in the summary block. This is a treatment change, and it must be disclosed as one.

Then re-prepare configurations in the sustained candidate order, and stop at the first candidate that qualifies for the continuous pair. Both defects block the existing exploratory route as well, so a "disclosed conservative refusal" cannot carry the pair.

## Findings that decide the direction

### The 6% bound is planner headroom, not a pairing rule

- In the vendored code, `LEDGER_SCALE_DRIFT = .06` (`vendor/agent-0.0.30-trimmed/index.js:5478`). Its only use is to divide the arm's own prompt budget: `... / (1 + LEDGER_SCALE_DRIFT)` (`index.js:7170`; documented at `index.d.ts:5384`).
- So it reserves room for estimate error within one arm. It does not constrain one arm against the other.
- The matrix contract requires an equal initial selection and gauge, and says later differences caused by treatment "are recorded, including … gauge estimates" (`matrix.md:7`). It sets no later bound.
- `listMatrixPairFailures` adds that bound anyway: it refuses any goal whose later scale differs by more than `LEDGER_SCALE_DRIFT` (`bench5/matrix/helpers.ts:1319-1326`). The initial check is separate (`helpers.ts:1310-1318`).
- In the Gemma pilot the initial check passed: equal digest, tail, and scale, and an exactly equal gauge (scale 1.1326650943396226, overhead 230). The only failures were five later differences, from 6.282727% to 11.227219% (`tmp/units/aggregate-final-g2-pilot-report-2.md:23-33`).
- This is an unsupported criterion. It is not a measurement of harm, and it does not show a faulty ledger update.

### The stale-identifier findings come only from the `Ids:` line

- The wire check reads stale phrases over the summary bodies, including the `Ids:` header that `collectSummaryBodies` keeps (`bench5/aggregates/helpers.ts:616-622`). It refuses when the body carries a stale phrase that the rest of the prompt does not (`matrix/helpers.ts:1272-1279`).
- In the rest of the prompt, ESC-2291 appears only as "not ESC-2291", which the pattern's lookbehind exempts. So `seen.stale` is empty (`tmp/units/aggregate-final-g2-stale-reading-evidence.json:105`, `:114-119`).
- The match sits at offset 42 of the escalations body, which is the `Ids:` line (`evidence.json:16`, `:140-149`). The per-body prose readings are empty (`evidence.json:127-136`). The correction stays pinned outside the summary (`evidence.json:137-139`).
- The refund summary is similar. Its prose says "MX-4471 is dead" and reads as `expected: mx-4486, stale: []` (`evidence.json:361`, `:464-470`). Its separate `Ids:` line lists MX-4471 bare (offset 17, `evidence.json:479-486`).
- The `Ids:` line is code, not model prose. `collectIds` takes every id from the topic's sources (`aggregates/helpers.ts:366-368`). `filterProse` keeps any id that the shown text contains (`aggregates/helpers.ts:138`). `renderEntry` emits the line (`aggregates/helpers.ts:632-637`), fed from `Aggregator.ts:271-281`.

What this establishes:

- The index lists a superseded id with no status. That is a real unqualified stale token in the treatment arm's prompt. The records arm does not carry it.
- It is not contradictory prose, and none of the prose excuses it.
- It will recur by construction whenever a topic's sources hold both an original and its correction. No model behaviour is involved.

### Both defects also block the exploratory sustained route

- The exploratory matrix pair is rejected when `run.failures.length !== 0` (`sustained/helpers.ts:519-520`). Matrix run failures include the wire check (`matrix/parsers.ts:246`).
- The exploratory matrix admission also calls `listMatrixPairFailures` (`sustained/helpers.ts:533`).
- The sustained candidate itself is accepted only if `listMatrixPairFailures` returns nothing (`sustained/helpers.ts:648`, `:665`). The endurance pair audit calls the same function (`sustained/audit/Comparison.ts:73`, `:195`).
- A continuous 96-goal trajectory diverges by design (`endurance-plan.md:7-9`), so a fixed per-goal cross-arm bound would very probably refuse the pair. That is structural reasoning, not a measurement.
- Endurance runs cannot raise the stale-phrase finding. `projectCopy` sets `stale`, `forbidden`, and `forbiddenPatterns` to empty (`endurance/helpers.ts:59-68`). The `Ids:` defect therefore blocks the pair only through the copy-1 matrix pair that admission requires.

### Any source change makes every current freeze and fit stale

- A freeze binds the build manifest and every matrix source (`matrix/helpers.ts:292-306`). It refuses on any difference (`helpers.ts:347-348`).
- A fit binds `frozen.files` (`helpers.ts:685`), and a resource binds its freeze (`helpers.ts:671`).
- The prior ruling refused an archived-file resolver to work around this (`resumption-comparison-completion-direction.md:13`).

## Bounded units and their controls

### Unit 0: finish the frozen unit (running)

- Finish Qwen4 on build `d361e9d8…` with no source, build, or HEAD change.
- Keep the Gemma pilot manifest as written. It is create-only (`Matrix.ts:358-360`), and its refusal, eight findings, and costs stay as recorded.
- Its evidence is the pre-correction treatment under the pre-correction criterion. Never pool it with later results or relabel it.

### Unit S: one source correction unit (medium size)

Start Unit S only after root releases custody. It has two parts.

**S1. Source-contract correction (scale).**

- In `listMatrixPairFailures`, keep the refusals for:
  - an initial pick digest, tail, or scale difference;
  - a gauge difference (`helpers.ts:1310-1318`);
  - a nonpositive or non-finite paired scale, as an integrity check.
- Remove the per-goal cross-arm `LEDGER_SCALE_DRIFT` refusal (`helpers.ts:1319-1326`).
- Move the later per-goal scale differences from the invalid list (`matrix/Comparison.ts:434`) into a reported table of treatment differences, computed from the retained `rows`. This adds no manifest flag.
- Leave the historical l5 reader `report.ts:1075-1081` unchanged so archived readings reproduce.
- Do not touch the real capacity checks:
  - the first-request admission ceiling (`helpers.ts:1282-1292`);
  - missing usage, truncation, length finishes, and overflow invalidity (`matrix.md:33`);
  - `verifyMatrixFeasibility` (`Matrix.ts:361`).

**S2. Treatment change (identifier index).**

- Render summary entries without the `Ids:` line. Give `renderEntry` an empty ids list at `Aggregator.ts:279`, or drop the line in rendering.
- Keep `ids` in the maintenance rows for custody (`Aggregator.ts:376`, `:389`).
- Leave unchanged:
  - the scorer patterns;
  - the stale-phrase wire check (`helpers.ts:1276-1279`);
  - the sole-token check (`helpers.ts:1280-1281`);
  - the summarizer prompt, CHANGE, AGREE, and the judge.

**Controls.** Each control needs a passing case and a mutation that fails, using real components:

| Check | Required result |
| --- | --- |
| Initial gauge overhead or scale differs | Still refuses |
| Initial digest or tail differs | Still refuses |
| Later per-goal difference matching the observed 11.227219% | Does not refuse, and appears in the differences table with its value |
| Prior scale is 0 | Refuses |
| First request exceeds the admission ceiling | Still refuses |
| Original plus correction sources | Rendered block has no bare superseded id; the stored version still records both ids |
| Mutation: prose bare-lists a stale id | Still refuses as a sole-carried stale phrase (no excuse for prose) |
| Body binding and exposure counting with an unlabeled entry | Remain correct (`collectSummaryBodies` already accepts unlabeled entries, `aggregates/helpers.ts:618-619`) |

Close Unit S with one independent contract review and scoped verification (`resumption-comparison-completion-direction.md:37`). Do not run a broad audit.

**Optional post-hoc diagnostic, labeled as such.** Rerun the corrected pair leaf as a pure function over the retained Gemma `picks`, `gauge`, and `rows`. It changes no admission and rewrites no manifest. Even under S1 the Gemma pilot stays refused, because its three stale findings belong to the old rendering.

## Execution order

1. Unit 0 closes, and root releases custody.
2. Unit S lands: build, review, scoped gates, commit. The new build hash makes every earlier freeze, resource, and fit stale (`helpers.ts:347-348`, `:671`, `:685`).
3. Prepare candidates in the declared non-thinking order: larger Qwen, larger Gemma, smaller Qwen, smaller Gemma (`endurance-plan.md:19`). For each candidate, in order:
   1. Re-freeze.
   2. Run the unscored resource ladder (`matrix.md:31`).
   3. Run one fixed calibration generation for that candidate's summarizer on the corrected source. Its outcome is final, whatever it is (`resumption-comparison-completion-direction.md:9`). Label blind. Fit strict, or else derive exploratory AGREE (`resumption-comparison-completion-direction.md:15`).
   4. Run the qualified pilot, or the exploratory copy-1 records/aggregate pair (`resumption-comparison-completion-direction.md:21`).
   5. Run a fresh endurance development generation, labels, and fit, plus two development attempts (`sustained/helpers.ts:632`; `endurance-plan.md:25`).
   6. Move to the next candidate only on validated infeasibility, never on quality. A preparation fault does not count as infeasibility (`resumption-comparison-completion-direction.md:27`).
4. For the first eligible candidate, freeze the limits and arm order from development (`endurance-plan.md:41`). Run the complete continuous pair, then blind-audit it.
5. Run the remaining matrix stages for feasible configurations on the same corrected build, reusing step 3's preparation where the cells match. Then run the blind analysis and the separate judge-shadow table.

## Rejected alternatives

| Alternative | Reason |
| --- | --- |
| Retune or widen 6% | A new figure with no contract basis; it amounts to repeating until the run passes |
| Relabel the Gemma pilot as accepted, or rewrite its manifest | Breaks custody (`Matrix.ts:358-360`) |
| Exempt the `Ids:` line from the stale check | Changes the criterion to hide a real unqualified carrier that the records arm lacks |
| Edit the scorer regex | Touches the evaluation truth |
| Annotate status in the index | Needs supersession truth at runtime (leaks labels) or a generalized resolver |
| Index only ids that appear in the prose | Insufficient: the refund prose names MX-4471, so the index still lists it bare (`evidence.json:361`) |
| Keep both defects as disclosed refusals and proceed exploratory | Blocked at `sustained/helpers.ts:519-520`, `:533`, `:665` |
| Archived-file resolver to keep the current fits | Already rejected (`resumption-comparison-completion-direction.md:13`) |
| Recalibrate every summarizer up front | Not needed until a candidate in rank order reaches that step |

## Custody consequences

The work splits into four categories, kept separate:

| Category | Content |
| --- | --- |
| Source-contract correction | S1 conforms the code to `matrix.md:7` |
| Treatment change | S2 changes the decision prompt. Report results before and after it separately |
| Fresh model evidence | Every freeze, resource, calibration, pilot or exploratory pair, and endurance run on the corrected build |
| Post-hoc diagnostic | Only the labeled rereading of the Gemma rows |

- **Costs.** Fresh calibration is forced by file binding, not by a refused fit; the Gemma fit was accepted (`helpers.ts:681`). Record the earlier 4,513,834 ms calibration cost, its generations, and its fits beside the new costs, charged separately.
- **Qwen4.** Its in-flight results stay valid evidence of the old build. They cannot satisfy admission on the new build.

## Judgments root must make

1. Whether S2 falls under "No further prompt repair is authorized" (`matrix.md:39`). This report reads that clause as covering the summarizer prompt; S2 changes the decision-side rendering. It qualifies as tuning tied to a named result under `resumption-comparison-completion-direction.md:35`, the named result being requests 63, 64, and 66.
2. Whether the pair may run before matrix stages A–C. `endurance-plan.md:3` says "after the matrix", but selection depends only on feasibility, not on matrix quality (`endurance-plan.md:19`).
3. Whether the fresh calibration is confined to the summarizer of the candidate being prepared, as recommended.
4. Whether to commission the post-hoc diagnostic at all.
5. Whether to accept S1's differences table as the "recorded" form that `matrix.md:7` requires.

## What remains unmeasured

- The effect of removing the `Ids:` line on answer quality, exposure, and lookup behaviour.
- Whether any candidate passes resource, calibration, and copy-1 admission on the corrected build.
- Endurance development feasibility.
- Whether later scale differences reflect any harm.
- Qwen4's pilot outcome and every blind task-quality result. This lane did not read them.
- The continuous pair has not run, so the comparison is open. If no candidate meets the admission rule, it stays unresolved (`resumption-comparison-completion-direction.md:27`).

No file was written; this lane made only read calls.