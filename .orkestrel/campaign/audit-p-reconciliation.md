# FIX-P audit — reconciliation

Both lanes returned FAIL with eight broken each, blind to each other, and they converge on every
substantive finding. Dated 2026-08-23.

## Verdicts side by side

| claim | subjective (Opus) | objective (Sol) | ruling |
| ----- | ----------------- | --------------- | ------ |
| D1 fourth selector right | BROKEN | BROKEN | **survives**, same two shapes |
| D2 manifest `type` sound | BROKEN | BROKEN | **survives** |
| D3 assertion binds the caller | BROKEN | BROKEN | **survives**, subjective vector sharper |
| D4 reason true in three copies | BROKEN | BROKEN | **survives**, a graft |
| D5 consolidation lost nothing | CONFIRMED | CONFIRMED | holds |
| D6 no refusal widened | BROKEN | BROKEN | **survives** |
| D7 guide describes the predicate | BROKEN | BROKEN | **survives** |
| D8 writing contract | BROKEN | BROKEN | **survives**, campaign artifact only |
| D9 would you ship it | BROKEN | BROKEN | **no** |

Independent agreement on eight of nine, from lanes that could not see each other. The one confirmed
claim is the rule consolidation, which each lane attacked on different grounds and neither could
break.

## D1, D2, D6 — the same root, and the brief's named unknown paid for itself

Both lanes found the same two shapes and the Orchestrator confirmed both against real Node:

```text
extensionless under require, "type": "module"   node: requires fine   predicate: false
.js under a nested "type": "commonjs"           node: requires fine   predicate: false
```

The subjective lane added the sharpest reading: **the same file contradicts itself.** `isModule`
returns `true` for an extensionless target and its comment gives the reason — `require` reads such a
file through its JavaScript handler — while `resolvesCommonJS` returns `false` for the same name. The
guide publishes the `isModule` rule and names an extensionless path as its worked example.

It also named why the second shape cannot be fixed at the call site: `resolvesCommonJS(entry,
packageType)` takes a **package-level** fact to answer a **file-level** question, so no caller can
supply a correct value. That settles the first unknown this brief named — a nested `package.json`
does change the answer — which is the return on naming it.

D6 is the consequence and it cuts both ways: an extensionless subpath that the third selector drove
successfully now reaches the unreachable assertion and **reddens a publishing workspace with a false
message**, while the nested-scope shape **stops being measured silently**. A widened refusal and a
lost coverage from one change.

## D3 — the assertion binds one call site of three

The Orchestrator's caller-mutating control fired and neither lane disputes that reading. Both lanes
then showed it is not enough. Sol: `collectTargets(entry).slice(0, 1)` passes the substring while
dropping a fallback member. Opus, sharper: changing the `resolveTarget` call in `buildStage` to a
fixed lookup stops the proof traversing fallback lists during resolution — half the rule the guide
states — and the assertion still passes, because it names `collectTargets` and nothing else. A sweep
of the whole test tree returns no assertion binding any `resolveTarget` or `resolvesCommonJS` call
site inside `buildStage`.

The fix both lanes reach independently: the test already holds the `buildStage` AST node, so assert
its call expressions rather than one substring.

## D7 — the guide and the code name different condition sets

The guide says the proof resolves under "the typed CommonJS consumer's runtime conditions", and the
same section defines those as `node-addons`, `node`, `require`, `module-sync`. The code uses
`['node', 'require']`. On the `module-sync` shape this round added a test for, those sets give
**opposite** answers: the guide's set resolves `./s.js` and answers false; the shipped set skips
`module-sync`, resolves `./s.cjs`, and answers true. A maintainer reproducing the rule from the guide
gets the opposite of the gate.

## The Orchestrator's own errors this round

- **An integration note asserted an edit that did not land.** It repeated the unit's report without
  opening `src/core/compilers.ts`, so a false claim reached this round's brief as settled. Corrected
  in `fix-p-report.md`, in place rather than edited away.
- **The ragged-wrap decision rested on a coupling that does not apply.** The stated reason was an
  assertion reading that paragraph. The subjective lane swept the tree and found no test reads the
  browser paragraph at all; only the release-skew paragraph is coupled, and there the coupling
  constrains where the break falls rather than whether to reflow. The lane is right; both paragraphs
  reflow.
- **Banned prose in the campaign report.** Temporal `now`, and counts over growable sets — cases,
  vectors, controls, paragraphs, lines. Both lanes found them. They sit in a campaign artifact and
  not in the bytes any target receives, which bounds the damage without excusing it.

## The selector: the ruling, revisited against both lanes

`.orkestrel/campaign/selector-ruling.md` ruled against a fifth patch of the same shape, on the
grounds that predicting Node's answer is unbounded. **Both lanes independently propose a bounded
prediction** — nearest enclosing manifest for a `.js` target, extensionless classified as CommonJS —
and that is worth weighing rather than overriding, because they are the engines that found the gaps.

The honest reading is that Node's format rules for `require` are finite and documented: `.cjs`,
`.mjs`, `.json`, `.node`, extensionless, and `.js` by nearest scope. Four attempts failed because each
enumerated fewer rules than Node has, not because the set is open.

So the ruling narrows rather than reverses: **the next unit establishes the property — the probe
includes exactly the subpaths a typed CommonJS consumer can take — and rules for itself between
observing the answer and enumerating Node's complete rule set, with the enumeration supplied as
evidence either way.** The Orchestrator owns the property; the objective engine owns the mechanism.
A fifth partial enumeration presented without that evidence is refused.

## Carried to FIX-Q

| finding | source |
| ------- | ------ |
| the selector, by observation or a complete enumeration with evidence | D1, D2, D6, both lanes |
| the assertion must bind every call site the rule names | D3, both lanes |
| the graft in `src/core/compilers.ts` | D4, both lanes |
| the emitted copy's undefined "axis" for a consumer reading it | D4, subjective lane |
| the guide's condition set, and the extensionless and `.mjs` cases | D7, both lanes |
| both paragraphs reflowed, the coupled fragment kept on one line | D9, subjective lane |
| the banned prose in the campaign report | D8, both lanes |

Dropped: nothing. Corrected in session: the false report entry and integration note.
