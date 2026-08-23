# FIX-R audit — reconciliation

Both lanes returned FAIL, blind to each other. Objective: 7 broken. Subjective: 6 broken, 1 finding
outside the claims. Dated 2026-08-23.

**The ruling held.** Neither lane attacked the invariant — compile membership from the resolved
declaration, runtime from the target. Every finding is an incompleteness in realising it, not a
reason to change it. That is the first round in this seam where the subject survived.

## Verdicts side by side

| claim | subjective (Opus) | objective (Sol) | ruling |
| ----- | ----------------- | --------------- | ------ |
| C1 invariant implemented correctly | CONFIRMED | **BROKEN**, extension substitution | **survives**, objective lane correct |
| C2 the two booleans separated | CONFIRMED | **BROKEN**, runtime set incomplete | **survives**, same root as the subjective lane's outside finding |
| C3 constraint held | **BROKEN**, filter withholds TS1479 | CONFIRMED | **survives**, different subjects |
| C4 no regression | CONFIRMED | **BROKEN**, new entry points | **survives**, same root as C2 |
| C5 guide describes what ships | BROKEN | BROKEN | **survives** |
| C6 emitted proof reconstructible | **BROKEN**, false comment | CONFIRMED | **survives**, routing difference |
| C7 instrument cannot be evaded | BROKEN | BROKEN | **survives** |
| C8 writing contract | BROKEN | BROKEN | **survives**, campaign files only |
| C9 would you ship it | BROKEN, "not yet" | BROKEN | **no** |

## C1 — the finding only one lane found, confirmed by the Orchestrator

TypeScript performs **extension substitution**: it finds a declaration adjacent to the runtime target
without any `types` condition. Reproduced with a control:

```text
  no types condition, adjacent index.d.cts present   accepts
  control: index.d.cts removed                       TS7016
```

The first probe attempt did not discriminate, because `noImplicitAny: false` suppresses the TS7016 the
control depends on. That is the Orchestrator's error, corrected here rather than reported as a null
result.

So `exports: { require: './index.cjs', import: './index.mjs' }` with `index.d.cts` beside it is typed
by TypeScript and reported `undeclared` by the proof — **a false red on a conventional shape**. The
ruling is right and its implementation reads only the `types` condition, which is a subset of what
TypeScript resolves.

The subjective lane confirmed C1 because it attacked the declaration shapes the brief named, all of
which carry a `types` condition. The shape with no `types` condition at all was outside the set it
was pointed at. That is a brief limitation, not a lane failure.

## C2 and C4 — one root, found by both lanes through different doors

The subjective lane filed it outside the claims; the objective lane filed it under C2 and again under
C4 at the entry points it reaches. Same defect. Confirmed by the Orchestrator from the constants:

```text
1177:  module: ['node-addons', 'node', 'import', 'module-sync']   ← import side, full set
1183:  COMMONJS_CONDITIONS = ['node', 'require']                  ← require side, missing two
```

`COMMONJS_CONDITIONS` is TypeScript's set with `types` removed. It was correct for the job it held in
the previous revision and wrong for the runtime job this one gave it. Node's require resolver matches
`module-sync` and `node-addons`, measured earlier in this campaign.

The fix carries C6's false comment with it: the comment claims this is Node's require resolver's set.
Restoring the real set makes the sentence true rather than needing a separate prose edit.

## C3 and C6 — the lanes ruled on different subjects

**C3.** The objective lane checked the named constraint changes and found no measurement removed —
correct for what it checked. The subjective lane found the filter itself withholding a diagnostic: a
`.d.mts`-declared entry over a `.cjs` target is dropped from the compile probe, and the TS1479 the
compiler would have reported lands nowhere. Confirmed by the Orchestrator at `selectEntries:1451`.
Both readings hold; the subjective finding carries.

Its bound is the important half: **do not drop the filter.** It keeps a legitimately ESM-only subpath
out of the CommonJS probe. The repair is a mirror assertion beside `unreachable` naming every entry
that is require-loadable and CommonJS-untypable.

**C6.** The objective lane ruled the emitted file reconstructible and routed its semantic errors to C1
and C2. The subjective lane broke it on the false comment. Not a disagreement about the fact — a
difference in where it was filed. The comment repair rides with C2.

## C4's confirmed half is worth keeping on the record

The subjective lane re-asked every case this seam has repaired — the dual subpath, the ESM-only
package, `module-sync` first, the `node` branch, extensionless targets, nested scope — at every entry
point reaching the rule, and broke none. The objective lane's C4 break is a **new** entry point rather
than a regression. So the repairs held and the coverage was incomplete, which are different things.

## Carried to FIX-S

| finding | source |
| ------- | ------ |
| resolve the declaration as TypeScript does, including extension substitution | C1, objective lane, confirmed |
| restore `node-addons` and `module-sync` to the runtime condition set, and the comment with it | C2, C4, C6, both lanes, confirmed |
| the mirror assertion for require-loadable and CommonJS-untypable entries | C3, subjective lane, confirmed |
| the guide's substitution rule and its condition set | C5, both lanes |
| fixture witnesses that discriminate every boolean the walk computes | C7, both lanes |
| `should` and the counts in the campaign reports | C8, both lanes, the Orchestrator's prose |

Dropped: nothing. The Orchestrator's own probe error on C1 is recorded rather than dropped.
