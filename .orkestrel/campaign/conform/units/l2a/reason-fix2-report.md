# Unit conform-reason-fix2 — report

## R2-1 (objective F-6, checker F-1)

`applied`. The report's § Shared-file patches paragraph (previously lines 246-251) now reads:

```
Every row that names `guides/reason.md` moved it. Copy the file verbatim into
`/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md`.
```

`grep -n 'Four rows call for re-propagation' conform-reason-report.md` returns no hit. The
reason-fix1-3 entry (report lines 322-324) already read "Every row that names `guides/reason.md`
moved it. Copy the file verbatim into
`/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md`." and now matches
the paragraph it describes; it cites no line number that the edit moved, so nothing there needed
correction.

## R2-2 (objective F-7, checker F-3)

`applied`. Ran the four patterns the report's § Sweeps and fix-round entries name, over
`/home/user/fleet/reason`'s `src/**`, `tests/**` (excluding the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`), `guides/reason.md`, `guides/README.md`, and
`README.md`, and appended the four blocks below to
`/home/user/work/evidence/reason-proofs/sweeps.txt`, after its existing `\(default ` block:

```
### pattern: remove\((id|name|groupId[^)]*): string\): void
### population: src/**, tests/** (excluding the vendored tests/setupPolicy.ts, tests/policy.test.ts, tests/config.test.ts), guides/reason.md, guides/README.md, README.md
src/core/types.ts:980:	remove(groupId: string): void
src/core/builders/managers/FactorManager.ts:102:	remove(groupId: string): void

### pattern: subjectToFacts\(subject: Subject, trace
### population: src/**, tests/** (excluding the vendored tests/setupPolicy.ts, tests/policy.test.ts, tests/config.test.ts), guides/reason.md, guides/README.md, README.md
(no match)

### pattern: (factToArityKey|factToKey|instantiateFact|findUnboundVariables)\(source
### population: src/**, tests/** (excluding the vendored tests/setupPolicy.ts, tests/policy.test.ts, tests/config.test.ts), guides/reason.md, guides/README.md, README.md
(no match)

### pattern: premises: \[[^\]]*\], conclusion
### population: src/**, tests/** (excluding the vendored tests/setupPolicy.ts, tests/policy.test.ts, tests/config.test.ts), guides/reason.md, guides/README.md, README.md
tests/src/core/validators.test.ts:552:			isInference({ id: 'i1', name: 'i1', premises: [{}], conclusion: createFact('c', 'p', []) }),
```

The first and last blocks carry the two hits the report's reason-fix1-5 entry and § Sweeps rule
as false positives against surviving current code rather than survivals of a removed form: the
`remove\(...\): void` hits are `FactorManagerInterface.remove(groupId: string): void`'s current
no-argument clear-all overload, and the `premises: [...], conclusion` hit is a surviving
`Inference` literal.

While editing `sweeps.txt` around this insertion point, an Edit call also rewrote the pre-existing
`### pattern: \(default ` line, dropping its trailing space. The pattern text and every other line
in the file are unchanged; this is a spacing artifact on a line outside R2-2's scope, noted here
rather than left silent.

## R2-3 (objective F-8)

`applied`. Added under § Deviations, directly after the "Refused instruction from tool output"
entry:

```
**`Collection.remove`'s clear-all path left off `Collection`.** reason-subj-11's operative form
required `Collection.remove` to return whether the id existed and to add the no-argument clear-all
path. `src/core/builders/managers/Collection.ts:64-69` implements the first only. The manager owns
the per-item emit, so a `Collection`-level clear-all would be an uncalled internal path against
`AGENTS.md` § Minimal public API; the alternative left open is to snapshot ids, delegate to a
`Collection.remove()` clear-all, and emit per snapshotted id.
```

## R2-4 (objective F-9)

`applied`. The reason-obj-3 row in the report's disposition table now reads:

```
| reason-obj-3    | applied     | `subjectToFacts` returns `{ facts, trace }` with both members readonly, landed with reason-obj-5 as one signature change.        |
```

## Acceptance evidence

1. `grep -n 'Four rows call for re-propagation' conform-reason-report.md` — no hit.
   `grep -c "Every row that names \`guides/reason.md\` moved it" conform-reason-report.md` — 1.
2. `sweeps.txt` ends with the four appended `### pattern:` blocks shown under R2-2, matching the
   report's § Sweeps and reason-fix1-5 patterns verbatim.
3. The report's § Deviations carries the quoted `Collection.remove` clause under R2-3.
4. Row reason-obj-3 carries the R2-4 replacement note.
5. No file outside the two Owned files changed; `/home/user/fleet/reason` was not touched.
