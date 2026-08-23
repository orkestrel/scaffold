# FIX-M and FIX-N audit — reconciliation

Both lanes returned FAIL, blind to each other. Objective lane: 6 broken. Subjective lane: 5 broken,
1 unresolved, 3 findings outside the claims. Dated 2026-08-23.

## Verdicts side by side

| claim | subjective (Opus) | objective (Sol) | ruling |
| ----- | ----------------- | --------------- | ------ |
| C1 selector right and complete | BROKEN, `module-sync` vector | BROKEN, `node`-condition vector | **survives**, two distinct vectors |
| C2 guide assertions bind | CONFIRMED | BROKEN, helper not bound to caller | **survives**, objective lane correct |
| C3 the true cause is true | CONFIRMED | CONFIRMED | holds |
| C4 three copies say one thing | **BROKEN** | CONFIRMED | **survives**, subjective lane correct |
| C5 rules are directives | BROKEN, duplication | BROKEN, narrative | **survives**, both, different grounds |
| C6 Vite sentence and formatter edit | CONFIRMED | CONFIRMED | holds |
| C7 the two residue edits | CONFIRMED | CONFIRMED | holds |
| C8 no refusal widened, no coverage lost | BROKEN | BROKEN | **survives**, same root as C1 |
| C9 writing contract | UNRESOLVED, evidence incomplete | BROKEN, campaign artifacts | **split**, see following |
| C10 would you ship it | BROKEN | BROKEN | **no** |

## C1 — two vectors, and neither lane's proposed fix covers the other's

Each lane found a different falsifying shape and each proposed a fix for its own. The Orchestrator
ran both shapes against both predicates:

```text
  case                                  shipped(NodeCJS)  proposed(TS-CJS)
  module-sync first (subjective lane)   false             true
  node condition   (objective lane)     false             false
  plain ESM-only   (must stay false)    false             false
  plain dual       (must stay true)     true              true
```

The subjective lane's fix — evaluate the walk under TypeScript's require-mode conditions rather than
Node's runtime set — closes its own vector and leaves the objective lane's open. Both controls hold
in both columns, so neither predicate over-corrects.

**The ruling: the proxy itself is wrong, not its condition set.** Asking which condition names a walk
traversed cannot answer whether a typed CommonJS consumer can take the subpath. Both vectors resolve a
real CommonJS target and both are refused. A third condition-set patch would be the fourth selector
and would fail on the next shape neither lane happened to try. The predicate must read the resolved
target's module format — its extension, and the package's `type` for a `.js` target.

## C4 — the reason of record is wrong for the third time

The subjective lane broke a clause the objective lane confirmed. It is right, and the Orchestrator
confirmed the mechanism:

```text
src/core/compilers.ts:677   if (machinery.browser) imports.push("… '@vitest/browser-playwright'")
src/core/compilers.ts:1314  const browser = blueprint.src.includes('browser')
```

`machinery.browser` is the `src` **or** `app` axis; the branch selector is the `src` axis alone. So
the shared clause "those imports follow a published face rather than selecting the branch" is false:
the imports follow either axis. Each of the three copies states the falsifying counterexample in the
sentence immediately before the clause.

The objective lane confirmed C4 because it checked that the three copies agree and that each states
the cause. They do agree — on a false sub-clause. **Agreement between copies is not evidence**, which
is the rule this very range landed, and the audit found the rule's own subject still violating it.

This sentence has now been wrong three times: the launcher imports are not present (false), the
imports follow a published face (false), and the correct form — the imports are declared by either
axis, so they do not select the branch.

## C2 — the assertion proves the helper, not the caller

The objective lane replaced `collectTargets(entry)` inside the emitted `buildStage` with an empty
array and the assertion still passed; mutating the extracted helper made it fail. So the instrument
binds the helper and not the shipped call site. The subjective lane confirmed C2 on the strength of
the assertion executing real code, which it does — but executing real code is not the same as
binding the code under audit. The objective reading supersedes.

## C5 — both lanes broke it, on different grounds, and both grounds hold

The objective lane: explanatory consequences remain in both bullets, which `AGENTS.md` § Instruction
files forbids. The subjective lane: the fact-check rule duplicates two existing homes in the same
file — the assumption-checking bullet and the paste-the-command bullet directly above it — and
`AGENTS.md` requires one home per rule.

Ruling: fold the additive cross-copy clause into the existing paste-the-command bullet and delete the
restated directive. Keep the second rule, which the subjective lane found unique and correctly scoped
as a specialization to prose; strip its explanatory tail.

## C9 — split, and the Orchestrator's own dispatch was at fault

The subjective lane returned UNRESOLVED because the supplied diff was not the stated range: the
diffstat listed twelve paths and the diff carried seven. That is the Orchestrator's error — the
diffstat was generated unfiltered and the diff with a path filter — and by `orkestrel-falsify`
§ Evidence it is a dispatch deviation. The lane was right to refuse to report a population it had not
walked.

The objective lane swept the wider set and found banned-sense `now` and growable-set tallies in
campaign artifacts the Orchestrator authored. Those are real and are corrected; the campaign folder
is pruned at acceptance, so they do not reach a consumer.

## Findings outside the claims

**F1 — a roadmap row reported a filtered set as its population.** Corrected in the same session. The
row claimed no fleet manifest uses a bare-string exports entry; every generated manifest carries the
`./package.json` pointer, and the sweep behind the claim skipped that subpath explicitly. The
conclusion survived for a reason the row did not state. Its example was also wrong: a bare string
naming a `.cjs` file lands in `undeclared` and reddens rather than failing quiet.

**F2 — the Orchestrator's two prose edits left over-width lines, and re-wrapping one reddens a
test.** `guides/scaffold.md` carries a 111-character line and a 154-character line in paragraphs that
otherwise wrap at 100. No gate sees it: `oxfmt` formats no Markdown. The trap is that
`tests/guides.test.ts` asserts the exact text of a line inside one of those paragraphs, so a unit
given only the guide meets a red it cannot close. Both files go to the same unit, and the assertion
moves to a fragment that survives re-wrapping.

**F3 — the evidence bundle was incomplete.** Carried into C9 above.

## Carried to FIX-P

| finding | source |
| ------- | ------ |
| the CommonJS predicate must read the resolved target's format, not a traversed condition name | C1, C8, both lanes, two vectors |
| the fallback assertion must bind the shipped caller | C2, objective lane |
| the reason of record's third wrong clause, in three copies | C4, subjective lane |
| the duplicated fact-check rule, and the explanatory tails | C5, both lanes |
| the two over-width guide paragraphs and the test assertion coupled to one | F2, subjective lane |

Dropped on the record: nothing. Every finding either carries or was corrected in session.

Corrected by the Orchestrator before FIX-P: the false roadmap row (F1), and the banned-sense prose in
campaign artifacts (C9, objective lane).
