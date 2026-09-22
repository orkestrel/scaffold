I hold the **subjective** lane: what the styles rule intends, the shape a partial author meets, and the vocabulary a reader would accept. I read `/home/user/veneer` at the working tree, `scanStyleBlocks` in `tests/setupServer.ts`, its existing scratch-tree proofs in `tests/setupServer.test.ts`, the gate in `tests/setupStyles.test.ts`, `src/styles/_mixins.scss` and its callers, `/home/user/scaffold/.claude/rules/styles.md`, and the two unit reports. I ran nothing; every block size here is a hand count of the authored text, flagged as such.

## 1. What the rule intends

**Ruling: a declaration block two independently recorded Bootstrap components share is a coincidence, not a pattern. Refuse `flush-box`, `painted-block`, `column-flow`, and `clip-line`. Each is the superfluous wrapper `AGENTS.md` § Design laws bans.**

The test that separates the two is whether the shared text is one decision or two decisions that agree. `.claude/rules/styles.md:45` ("If a pattern appears in at least two partials, move it to `_mixins.scss`") exists so an author who changes the pattern changes it once. Family ruling 1 pins every one of these declarations to the recorded Bootstrap value, so no author will ever change either copy, and the mixin's body is frozen for the life of the package. The rule's whole benefit is unreachable by construction, and its cost is paid on every read.

The confirming test is divergence. Ask of each candidate what happens when the two callers stop agreeing:

- `control-text` (`src/styles/_mixins.scss:33`), included by `elements/_input.scss:5`, `_select.scss:5`, `_textarea.scss:5`, and `_optgroup.scss:5`: divergence is a defect. A select that stops inheriting the page's type while an input keeps inheriting it is a bug in one decision, held in one place. That is a pattern.
- `painted-block`: divergence is correct. If Bootstrap retunes `.vr`'s `min-height` and leaves `.placeholder` alone, the mixin must be split and the ledger records a departure. A shared emitter that must be split when the external record moves holds no invariant. That is a wrapper.

Each candidate fails on its own terms as well:

- **`flush-box`** (`width: 100%; padding: 0`) names no treatment. `legend` writes the pair because a legend must not indent (`src/styles/elements/_fieldset.scss:9`); `.form-range` writes it because a slider fills its line. Two intents, one accident of spelling.
- **`painted-block`** is the worst of them, because its doc comment has to argue that a placeholder and a vertical rule are the same thing. They are not: one stands in for absent text, the other is a separator. The B-PASSIVE-E patch also concedes the tell — "the slot's position is chosen to keep the off-limits `_vr.scss` caller byte-identical" (`/home/user/scaffold/tmp/audit/be-report.md` § D3). The mixin's shape encodes a campaign scope rule, not a design intent.
- **`column-flow`** (`display: flex; flex-direction: column`) is the idiom every CSS author writes inline. Naming it adds a lookup and no invariant.
- **`clip-line`** asserts a shared intent that is false. `.btn-check` (`src/styles/components/_button.scss:118`) crops a visually hidden input; `.progress-bar` crops a label. The mechanics coincide; the reasons do not.

A `@content` slot makes each of them worse than a plain wrapper. It splits one rule's declaration list around a hole, so a reader auditing `_placeholder.scss` against Bootstrap's recorded block — the comparison this package's ledger, conformance run, and departures table all exist to support — can no longer read the rule's declarations in order.

The tree's own history supports the reading rather than contradicting it. Every existing member of `src/styles/_mixins.scss` that shares declarations across partials names something the domain names: `mark-text` (`_type.scss:43`, `elements/_mark.scss:5`), `image-size` (`components/_image.scss:6`, `elements/_img.scss:6`), `caption-text` (`elements/_figure.scss:11`, `elements/_table.scss:10`). `box-reset` (`src/styles/_mixins.scss:46`) is the borderline member, with `elements/_hr.scss:5`, `_fieldset.scss:7`, and `_button.scss:5` as callers, and it earns its place as the reset a bare element takes. That is the line: a named treatment several callers share is a pattern; a pair whose members are pinned externally and cannot co-vary is not.

**The rule's own text needs the reading landed in it**, or the next agent re-derives this round. Add one line to `.claude/rules/styles.md` § Prohibitions, beside line 45: a block two partials share because each records an external value is a coincidence, and both copies stay inline. That is a `scaffold` rule-file edit, routed to `opus`, not a `veneer` change.

## 2. The predicate

**Ruling: recalibrate, and put the judgment beside the measurement rather than inside it.**

The predicate, over `shared = overlap.declarations.length`, `left = overlap.left.declarations.length`, and `right = overlap.right.declarations.length`:

```text
(shared >= 4 && shared * 2 > Math.min(left, right)) || shared >= 6
```

In prose, the sentence the gate reports: one block is most of the other, or the overlap is too large for coincidence.

Against every measured pair. Block sizes are my hand count of the authored text; the `_progress.scss`, `_placeholder.scss`, and `_form-range.scss` sizes are read from the diffs in the two reports, because those partials do not exist in this checkout.

| Pair | shared | left | right | `shared >= 4` | `shared >= 6` | Reported |
| --- | --- | --- | --- | --- | --- | --- |
| `.btn` (`_button.scss` around line 5) ↔ `.placeholder` (around line 5) | 2 | 41 | 6 | no | no | no |
| `.btn-check` (around line 118) ↔ `.progress-bar` (around line 34) | 2 | 7 | 8 | no | no | no |
| `.placeholder` (around line 5) ↔ `.vr` (`_vr.scss:6`) | 3 | 6 | 6 | no | no | no |
| `.progress-bar` (around line 34) ↔ `figure` (`elements/_figure.scss:4`) | 2 | 8 | 4 | no | no | no |
| `.form-range` (around line 15) ↔ `legend` (`elements/_fieldset.scss:9`) | 2 | 5 | 6 | no | no | no |
| `.badge` ↔ `.btn` (the E report's forecast) | 2 | — | 41 | no | no | no |

Every measured pair is refused by the floor alone, with the maximum measured overlap at 3 and the floor at 4.

Rulings on the candidates the brief names:

- **`shared >= 3 && shared * 2 > min(left, right)`** clears the family, but the `.placeholder` ↔ `.vr` pair lands on an exact tie (3 shared, 6 and 6), so the strict `>` is the only thing refusing it. One declaration moving in either block flips the gate. Refused for that fragility.
- **`shared >= 3 && shared * 2 > max(left, right)`** refuses the case the gate exists for: a small rule pasted whole into a larger one. Copy `.vr`'s block into a 12-declaration rule and `max` reads 12 against 10 and stays silent, while `min` reads 6 against 10 and reports. Refused.
- **`shared >= 4`** alone reports everything the recommended predicate reports and more, because both recommended arms imply `shared >= 4`. What it adds is the minority overlap in a large block, and that is where coincidence lives: the `.btn` block carries around 41 written declarations with its `--bs-btn-*` set, so any future component sharing four of them fires. Refused, and this is a forecast rather than a measurement — see § 5.

What the recommendation admits that `>= 2` catches: a whole-block copy of a rule with three or fewer declarations, and a minority paste of four or five declarations into a block of nine or more. Both are named as open in § 5.

**Where the predicate lives is the load-bearing design choice, and it is not inside `scanStyleBlocks`.** Export a second pure function from `tests/setupServer.ts` beside it:

```ts
export function findDuplicates(shared: readonly StyleOverlap[]): readonly StyleOverlap[]
```

Three reasons, each checkable:

- **Folding the threshold into the scanner destroys proofs that have nothing to do with the threshold.** Every existing case in `describe('scanStyleBlocks')` is built on two-declaration fixtures and asserts on the reported intersection: `tests/setupServer.test.ts:100` (`margin: 0; color: inherit`), `:157`, `:203`, `:221`, `:242`. Those are proofs about the tokenizer — comments, interpolation, quoting, whitespace folding — and a floor of 4 turns each into a rewrite.
- **The scanner's documented contract stays true.** `tests/setupServer.ts:557` states the return as "every block intersection carrying at least two distinct identical declarations". Measurement and judgment are two concepts, and `AGENTS.md` § Design laws ("Functional core, imperative shell", "Export and test reusable logic") puts the judgment in an exported pure leaf rather than in an assertion.
- **The sub-threshold reading survives for an auditor.** The coincidences stay one call away instead of disappearing from the exported reading, which is what § 5's residual risk needs.

The name follows `findDrift`, the tree's existing precedent for selecting the offending subset from a reading already taken. The `collect*` family (`collectLedger`, `collectLayer`, `collectGridVocabulary`) gathers a population from a source and is the wrong verb here.

Three consequential edits follow, all mechanical and all citable:

- `tests/setupServer.ts:565`: the `@example` reads `scanStyleBlocks().shared // [] after shared blocks move into mixins`. That goes false the moment the family lands, and it prescribes the remedy § 1 refuses. Move the `[]` example onto `findDuplicates` and give `scanStyleBlocks` an example showing a coincidence in its reading.
- `tests/setupServer.test.ts` around line 353: the export-name inventory lists `scanStyleBlocks`; `findDuplicates` takes its sorted position there.
- `tests/setupStyles.test.ts:365`: the case title `carries no shared written declaration block across style partials` stops describing what the gate proves, because the tree will carry shared blocks by design. Retitle it to name the proved property — `repeats no partial's written declaration block in another partial` — and change line 372 to `expect(findDuplicates(sweep.shared)).toEqual([])`. The file and folder assertions at lines 367 to 371 stay.

## 3. The plant

**Ruling: the plant is a `describe('findDuplicates')` block in `tests/setupServer.test.ts`, built with the `createScratch` helper the scanner's own cases already use, and the whole-tree case in `tests/setupStyles.test.ts` stays as a regression watch.** A real scratch tree under the system temporary directory is what `AGENTS.md` requires (no behavioral fakes), `scanStyleBlocks` takes a `root` argument for exactly this, and `tests/setupServer.test.ts:98` is the idiom to copy. Partial names match `^_.*\.scss$`, and one fixture sits in a subfolder so the folder-relative path spelling is pinned alongside.

Each case, with its reading and the mutation its assertions distinguish from the passing case:

| Case | Fixture | Reading | Mutation it catches |
| --- | --- | --- | --- |
| A copied block, whole | `_origin.scss` and `components/_echo.scss`, each a rule of the same four declarations | one entry, both paths, both lines, all four declarations | `findDuplicates` returning nothing; the floor raised past 4 |
| The half-share boundary, refused | two rules of six declarations sharing three — the `.placeholder` ↔ `.vr` shape | empty | the floor lowered to 3, which restores the tie the family sits on |
| The two-of-two boundary, refused | two rules of `margin: 0; color: inherit` — the shape every existing scanner case uses | empty | the reversion to `shared >= 2`; this case is what pins the recalibration itself |
| Just over the majority line, reported | a five-declaration rule and an eight-declaration rule sharing four | one entry | the floor raised to 5; `>` relaxed toward `>=` on the wrong side |
| The absolute arm, reported | a twelve-declaration rule and a fourteen-declaration rule sharing six, below half of each | one entry | the `shared >= 6` arm deleted |
| The measurement is unmoved | the same tree read through `scanStyleBlocks(scratch.path).shared` | lists every intersection, the refused ones included | the predicate folded into `scanStyleBlocks` instead of sitting beside it |

The refusal cases carry the falsification weight, so each one needs its positive twin in the same case: write the refused pair, read empty, then add one declaration to the overlap, read the reported entry. A refusal asserted alone passes against a function that returns nothing.

On the whole-tree case's own falsifiability, stated plainly: after recalibration it reads green both before and after the family lands, so it cannot distinguish the family's arrival and it is a regression watch rather than a proof. Its failing proof is the scratch case for a copied block. What binds it to the defect is the record that the same call ran red under `>= 2` with the measured coincidences named in the two reports.

## 4. The alternative

**If the sweep stays at `>= 2`, `_mixins.scss` becomes a registry of Bootstrap's accidents, and the registry is self-reinforcing.** That last part is the argument that decides it, and it comes from the scanner's own code.

`_mixins.scss` is matched by the partial filter at `tests/setupServer.ts:572` and its mixin bodies are blocks, because a `{` at parenthesis depth zero pushes a block (`tests/setupServer.ts:609`) whatever precedes it. So every coincidence mixin added to clear the gate enters the swept population as a block of its own. A later component whose recorded rule happens to overlap `painted-block`'s body by two declarations now collides with the mixin rather than with a partial, and is forced to include it. Each extraction becomes an attractor that pulls in every future component the record happens to brush against. The current gate is green at this checkout, which is consistent: every existing mixin's callers were emptied of its body, so no caller retains it.

What the family does with the coincidences in the meantime, from the reports: `flush-box`, `painted-block`, `column-flow`, `clip-line`, one more for `badge`, and one per remaining unit. Every one of them touches `src/styles/_mixins.scss` and at least one off-limits partial, so every one is a unit stop and a serial patch. The campaign's throughput becomes the Orchestrator's integration queue, and a family designed to run its units in parallel serializes on one shared file.

What the file reads like after the family lands: a front half of named treatments a reader can look up — `heading-text`, `control-text`, `caption-text`, `code-text` — and a back half of shape names no reader can map to anything, most carrying a `@content` slot whose position was set by which caller was off-limits. Every partial loads this file with `@use '../mixins' as *`, so each addition widens the namespace every partial imports. The reading collapses where two coincidences meet in one rule: `.progress-bar` takes `column-flow` and `clip-line` with a slot, so a reader comparing that rule against Bootstrap's recorded block reads three sources and reassembles the declaration order by hand. The ledger comparison still passes, because it reads the compiled cascade — which is the point. The cost lands entirely on the human audit the ledger cannot perform.

The other alternatives, ruled: an exemption comment or a coincidence allowlist in the partial is a suppression mechanism, which `.claude/rules/documentation.md` refuses and which drifts as the tree moves. Excluding cross-folder pairs is unmeasurable from the authored text and would have refused the `.progress-bar` ↔ `figure` pair for the wrong reason.

## 5. Risk

**The recalibration most likely hides a genuine per-variant repetition whose copies are small against their host blocks** — the case `.claude/rules/styles.md:44` bans, where each partial writes the same handful of role or variant declarations inside a large rule. Four shared declarations inside two nine-declaration blocks is silent under the recommended predicate, and so is a whole-block copy of a rule with three or fewer declarations.

Three things bound it, in order of cost:

- **The `shared >= 6` arm** is the cheap insurance, and its number is set by the measured maximum coincidence of 3 across this tree plus the partials of the units that have returned. Carry that measurement and its date in the function's `@remarks`, so the next author changing the number knows what it was read from rather than re-deriving it.
- **The family's close re-runs the full sweep and records the coincidence set it measures.** Any pair whose overlap exceeds the previously recorded ceiling is a fact somebody rules on by hand. This is the mechanism that covers what the gate cannot, and it is the reason § 2 keeps `scanStyleBlocks` reporting everything: the reading has to survive the gate's narrowing. Name the carrier unit now — B-FORMS-CLOSE is the candidate the B-FORMS-RANGE report already names for its two stale prose lines.
- **What I refused:** a second assertion pinning the measured coincidence set itself. It would force a human read of every new coincidence, and it would also redden a shared file for every unit in flight, re-creating the stop-and-patch problem this round exists to end.

The judgments my lane made that the objective lane must challenge: that a four-declaration overlap inside large blocks will become common as the remaining Bootstrap components land, which is a forecast against a measured maximum of 3 and is the sole reason the majority arm exists rather than a plain `shared >= 4`; that the `.placeholder` ↔ `.vr` tie at exactly half is fragile enough to reject the floor of 3; and that `findDuplicates` belongs beside `scanStyleBlocks` rather than inside it, which rests on my reading that the fixtures at `tests/setupServer.test.ts:100`, `:157`, `:203`, `:221`, and `:242` all carry two-declaration blocks. That last one is a hand count of the fixture strings and is the cheapest claim in this proposal to falsify by running the file.

PROPOSAL: Rule the measured overlaps coincidences rather than patterns, refuse all four proposed mixins as superfluous wrappers, and recalibrate the gate by exporting `findDuplicates` beside an unchanged `scanStyleBlocks` with the predicate `(shared >= 4 && shared * 2 > min(left, right)) || shared >= 6`, proved by a scratch-tree plant that pins both boundaries from each side.