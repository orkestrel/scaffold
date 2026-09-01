# Unit design-perf2 — adversarial design round for the second contract performance campaign

## Role and engine

One brief, two blind lanes, each a fresh clean-context Opus 5 subagent dispatched through the `planner` role file. The dispatch prompt names which lane the reader holds: the SUBJECTIVE lane argues shape, naming, ergonomics, design fit, and what the API must feel like; the OBJECTIVE lane argues correctness, constraints, and what the code, tests, and documented contracts actually permit. The Sol bench is excluded by the user's standing instruction, so Opus 5 holds the objective lane as a recorded substitution. Read-only: `Read`, `Grep`, `Glob` only. Perform the assignment directly and spawn nothing.

## Objective

Rule on every candidate row in § Candidates — ADOPT, TRANSFORM (state the surviving mechanism), or REFUSE — with the mechanism shape, the owned files, the tests that pin it, the documented contract that bounds it, and the probe that must settle any open question; then propose the unit decomposition, its serial order, and a draft exit criterion for the campaign.

## Context

**Subject.** `@orkestrel/contract` 0.0.15 at `/home/user/contract` (commit 3193da1, clean tree). Source `src/core/`, tests `tests/src/core/`, guide `guides/contract.md`. The first performance campaign (accepted 2026-09-01, published as 0.0.15) landed the order-aware array snapshot, the compile-time presence bitmask (`PRESENCE_MASK_LIMIT` 31), the single-slot cycle ledger, the refinement gate on diagnostic leaves, and the `anyOf` first-clean-variant return. It refused inline try/catch over `attempt` (0.992 measured), dropping internal freezes (47 ns), de-Reflect (tie), and excluded lazy `readValue` diagnostics on the reader doctrine and refined-leaf capture on the single-source law with the reopen condition "a campaign allowed to move the helper signatures".

**Evidence to read first.**

- Scout distillate with `file:line` pointers on the current tree: `/home/user/scaffold/.orkestrel/contract/s2-scout-distillate.md`.
- Research distillate (techniques, contracts each must not break, harness recipe): `/home/user/scaffold/.orkestrel/contract/r3-research-distillate.md`. Every external claim there is `[memory]`; treat it as direction, not fact.
- Baselines on 0.0.15 (node v22.22.2, Maglev off): `/home/user/scaffold/.orkestrel/contract/results/ops-015.out` (medium `is` 2100 ns/op, `parse` 2204, `audit` 4802, `explain` 3262, `generate` 5813; deep `is` 6383, `audit` 13731, `explain` 8897, `generate` 16870), `heap-015.out` (medium contract 13681 B, deep 59257 B), CPU attribution `cpu-attribution-015.out` and `cpu-attribution2-015.out`.
- Probe results (dist-level surgical patches under `/tmp/claude-0/-home-user/3ec60757-0c2d-5c44-9e42-96e2e2ce9d94/scratchpad/instruments/*-patch.mjs`, paired A/B under `.../results/ab-idle-*.out`, parity under `.../results/parity-*.out`). Copies of the instruments sit in `/home/user/scaffold/.orkestrel/contract/instruments/`.

**Documented contracts that bound every row** (`guides/contract.md`, line numbers as on disk):

- Line 15 and 269: a guard is total and never throws; line 272: exotic views are refused.
- Line 216 (`readArrayEntries`): `length` and the reflected key population are each captured once; canonical indices are sorted numerically, corroborated with `Object.hasOwn`, and read once; the frozen `entries` are one native sparse array of the captured length; `dense` means the reflected canonical count equals length; caller-defined iteration is ignored.
- Lines 391, 395, 700: every `shape.pattern` read rebuilds a FRESH frozen zero-state `RegExp` (two reads are never the same object). That contract is on the shape accessor, not on the compiled hot path.
- Line 597: refinement faults come out in declaration order `min`, `max`, `pattern`; the pattern is applied through an owned stateless rebuild (`readPattern`) asked through `matchesPattern`.
- `ContractCompiler.ts` `#auditOf` comment: "Each clean answer is its own array, because a report's identity is the caller's." `createStringFaults` / `createNumberFaults` TSDoc: "A fresh array of faults."
- Reader doctrine (guide line 5): a REQUIRED reader refuses an incomplete advertised read with a coded `ContractError`; `readValue` therefore reads its options eagerly and refuses before the real read.
- Single-source law from the first campaign: one construction site per refinement report (`createStringFaults` / `createNumberFaults` stay the single source for every refined leaf).

**Laws.** `AGENTS.md`; `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill `orkestrel-falsify` for the later audit shape; guide `guides/contract.md`. Orchestrator ruling for this campaign: an ADDITIVE change to an exported helper's signature is allowed when every consumer is updated in the same change and the guide row moves with it; a change that alters any published answer, throw, fault order, path, or `received` text is not.

**Host.** Linux container, 4 CPUs, node v22.22.2, no network needed for a lane. The lanes cannot run code; every behavioural question they raise is named as a probe for the Orchestrator.

**Measurement instrument and admission rule (declared before any unit runs).** Paired in-process A/B (both dist copies in one process, 49 alternating-order rounds, median of per-round B/A). Certification today: the single-process identity control drifts up to ±8% per process (is-medium read 1.080 in one process and 0.999 in another) and a planted ~1% slowdown is invisible, so single-process medians below about 5% carry no evidence. Deciding readings therefore use 6 fresh processes with load order swapped (3 per order), aggregated as the per-process median ratio; the identity control reads medians 1.004–1.012 with replicate spread 0.977–1.081. Admission: median across replicates ≤ 0.95 AND every replicate ≤ 0.98 on the family the row targets, answer parity IDENTICAL over the differential corpus (1062 comparisons; the sabotaged copy reads 16 differences), and no rise in call-path allocation. A row whose ceiling probe reads above 0.95 is REFUSED on measurement without a design argument.

## Candidates (single-process idle medians; bracket = p25–p75; every parity-preserving row read IDENTICAL)

| Row | Mechanism probed at dist level | Reading | Notes |
| --- | --- | --- | --- |
| A1 packed-array fast path | `readArrayEntries`: when `Reflect.ownKeys` reports exactly `0..length-1` then `length` (checked against an interned index-string table up to 1024), copy entries directly with the `Object.hasOwn` corroboration kept; every other view takes the existing walk | is-medium 0.903 [0.883–0.938], parse-medium 0.914, is-deep 0.943, is-list48 0.813 [0.806–0.840], audit-list48 0.898 | Guide line 216 semantics unchanged: length and population captured once, corroborated, read once, sorted trivially. Pins: `helpers.test.ts:625,639,646,676,738,1498,1556`. |
| A2 lean `readValue` projection | Four named reads (`path`, `shape`, `limit`, `received`) into one flat record instead of two spread copies plus four conditional spreads; the context object is materialized only on refusal; `code` and `subject` reads unchanged | audit-medium 0.789 [0.760–0.811], audit-deep 0.790, audit-list48 0.864, parse-medium 0.914, parse-deep 0.957, explain-medium 0.946 | Behaviour difference to rule on: an own key of `context` that is NOT one of the four advertised names but carries a throwing getter is read by the spread today (refusal) and not by named reads. Pins: `helpers.test.ts:524` (readValue), `compilers.test.ts:3420` (auditor container context). |
| A3b compile-time pattern capture | The auditor and reporter string leaves capture `readPattern(node.pattern)` once at compile and hand it to the refinement helper; the shape accessor's fresh-`RegExp` contract is untouched; the probe used a copy of `createStringFaults` taking a fourth `captured` parameter | audit-deep 0.906 [0.879–0.942], explain-deep 0.879 [0.843–0.914], medium families within band | Design question: the shape of the helper signature (additive parameter on `createStringFaults`, a separate capture record for min/max/pattern, or another single-source form). The WeakMap-cache form (A3, `results/ab-a3.out`) was a net loss on medium audit (1.086) and is refused. |
| A6 lazy fault paths (BOUND only) | Passing the parent path down instead of `pathOf` per declared field and per array index; the probe breaks fault paths and measures only the ceiling | audit-medium 0.880, audit-deep 0.885, audit-list48 0.866 under load; `explain` unchanged as internal control | A mechanism must materialize the exact `pathOf` array on every fault and for every `readValue` context. Internal plan signature `(value, path)` is compiler-private. Pins: `helpers.test.ts:2407`, `compilers.test.ts:3773`, `ContractCompiler.test.ts:532`. |
| A7 mask-based extra scan | Masked auditor object plan notes an undeclared key during the presence pass and runs the second scan only then, using the `positions` record instead of `Set.has` through `Reflect.apply` | audit-medium 0.947 [0.900–0.990], audit-deep 0.948 | Inside the instrument's noise on a single process; needs the 6-process rule to admit. Fault order unchanged by construction. |
| A10 folded array guard | One contained closure instead of `whereOf(arrayOf(item), bound)` (two nested `holds` layers), read order kept | is-medium 0.976, is-deep 0.972, audit-list48 0.926 | Inside noise; refuse unless a lane finds a reason the fold is also a design-fit improvement. |
| A11 `preview` fast path | Whole-string `JSON.stringify` when the encoded form fits under the 64-character cap, else the existing per-character boundary walk; output identical by construction, boundary samples IDENTICAL (`results/a11-boundary.out`) | explain-medium (invalid value) 0.826 [0.801–0.855] | Every `received` text unchanged. Pins: `helpers.test.ts` preview cases. |
| A8 ledger ceiling (BOUND) | `#trackGuard` / `#trackFaults` returning their plan untracked | is-medium 0.980, is-deep 0.954, audit families 0.956 | Ceiling under the bar and the mechanism changes documented reuse; REFUSE on measurement. |
| Lazy fault-array slot (unprobed) | Container plans open `faults = []` per node even on a clean walk; R3 names the lazy slot; the shared-empty-sentinel form is barred by the identity comment | no probe | A lane may name it as a probe for the Orchestrator; expected magnitude is one small array per container node. |
| `oneOf` guard-first tally (unprobed; ROADMAP seam) | Reporter `oneOf` runs every variant report plan then every guard; auditor tallies empty reports (S2 evidence 20) | no fixture in the harness | Rule on whether a guard-first form changes any published answer; if not, name the probe fixture. |
| Compile-tier heap | Medium contract 13681 B, deep 59257 B; guard-only 5177 B / 18840 B; R3 names lazy family compilation, shared plan tables, interning | not probed | Rule whether any form cuts retained bytes without per-call cost or a surface change; `createContract` is documented as eager lockstep. |

## Unknowns

- The exact mechanism cost of a lazy path (A6): the bound is 12%; a parent-pointer form that materializes `pathOf` on each fault and each `readValue` context has not been probed. A lane names the shape; the Orchestrator probes it before any unit.
- Whether A2's named-read form is admissible under the reader doctrine (see the row). Both lanes rule; the Orchestrator reconciles.
- Whether any candidate changes read counts observable through stateful getters in a way an existing pin detects. Name the pin if you find one.

## Scope

Read anything under `/home/user/contract/src`, `/home/user/contract/tests`, `/home/user/contract/guides`, `/home/user/scaffold/.orkestrel/contract`, `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules`, and the scratchpad results named earlier. Edit nothing. Run nothing.

## Output

Return, as your final message and nothing else, under 2500 words:

1. **Rulings.** One row per candidate: ADOPT / TRANSFORM / REFUSE; the surviving mechanism in two sentences; owned files; tests to add (named for what they prove); the documented contract that bounds it and whether the guide moves; the probe that must run first, if any.
2. **Units.** The serial unit list with owned files, dependencies, and which rows each carries; name the writer's work class (objective mechanical precision versus shape and documentation voice).
3. **Exit criterion draft.** The enumerated capabilities whose closure ends the campaign.
4. **Risks and missed candidates.** Anything the probes did not cover that the profiles suggest, with the frame it appears in.

No process diary. Argue your lane's perspective; do not balance it.
