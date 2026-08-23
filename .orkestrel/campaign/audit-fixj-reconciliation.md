# FIX-J audit — reconciliation

Both lanes returned FAIL against `.orkestrel/campaign/audit-fixj-brief.md`, blind to each other.
Blind reports are immutable: `audit-fixj-sol.md` holds the objective lane's; the subjective lane's
verdicts are recorded here with its findings. Dated 2026-08-23.

## Verdicts side by side

| claim | subjective (Opus) | objective (Sol) | ruling |
| ----- | ----------------- | --------------- | ------ |
| A1 J1 correct and complete | BROKEN | BROKEN | **split** — code correct, prose not |
| A2 per-format declaration, no site missed | CONFIRMED | **BROKEN**, executed | **survives**, objective lane correct |
| A3 partition selects correctly | CONFIRMED | CONFIRMED | holds |
| A4 validation matches Node | UNRESOLVED | CONFIRMED, executed | **refuted**, see following |
| A5 J5 left the comment true | CONFIRMED | CONFIRMED | holds |
| A6 the Orchestrator's edit | CONFIRMED | CONFIRMED | holds |
| A7 corpus is a fixed point | CONFIRMED | CONFIRMED | holds |
| A8 no refusal widened | UNRESOLVED | CONFIRMED | holds, with a coverage note |
| A9 coherent as one thing | BROKEN | BROKEN | **survives**, converged |

## A2 — the defect neither the brief nor round 3 saw

The objective lane found that the emitted proof ignores the `node` export condition. The
Orchestrator reproduced it against the walkers copied verbatim from the template:

```text
what the proof reads for the import declaration :  ./default.d.ts
what the proof reads for the require declaration:  ./default.d.ts
what the proof drives as the import runtime      :  ./default.js
what the proof drives as the require runtime     :  ./default.js

what a real Node ESM consumer loads              :  ./node.mjs
what a real Node CJS consumer loads              :  ./node.cjs
what a real TS nodenext consumer types against   :  ./node.d.mts
```

It is worse than the lane stated: not only the declarations but both runtime drives read the
`default` branch. A package publishing a `node` condition — a common shape — has its entire proof
measuring a branch no Node consumer loads, declaration and runtime alike.

**Pre-existing, not introduced by FIX-J.** The objective lane says so explicitly and it is right:
the condition sets predate this unit. That makes it a surviving defect of the campaign rather than a
regression, and it is in scope because the capability 0.0.50 owns is a proof that measures what a
consumer actually resolves.

The subjective lane's A2 CONFIRMED is not wrong about what it checked — it enumerated every reader of
`entry.declaration` and each reads the right field. The defect is one level up, in the condition
model those fields are computed from, which the claim did not ask about. The objective lane attacked
the model rather than the readers.

## A4 — the subjective lane's hypothesis, refuted by two independent runs

The subjective lane declined to rule without executed evidence and named the settling probe. That was
correct conduct. Its hypothesis was that Node bans an empty package-target segment alongside `.`,
`..`, and `node_modules`, so `isPackageTarget('./x//missing.cjs') === true` would produce a false red.

The Orchestrator ran it on Node v22.22.2, with a control:

```text
  empty-seg-array        RESOLVED {"from":"missing-dir"}  | [DEP0166]
  bare-dot-array         THREW MODULE_NOT_FOUND  | [DEP0166]
  encoded-sep-array      THREW ERR_INVALID_MODULE_SPECIFIER
  dotdot-array           RESOLVED {"from":"valid"}
  empty-seg-single       RESOLVED {"from":"missing-dir"}  | [DEP0166]
  encoded-sep-single     THREW ERR_INVALID_MODULE_SPECIFIER
  dotdot-single          THREW ERR_INVALID_PACKAGE_TARGET
  valid-single           RESOLVED {"from":"valid"}
```

Node does not ban the empty segment. It resolves it, collapsing the double slash, and warns
`DEP0166`. The encoded separator throws `ERR_INVALID_MODULE_SPECIFIER` in both positions rather than
falling through, so a package carrying one is broken for every consumer and the proof reddening on it
is a true red. Only `..` falls through in an array and throws standalone, which is what FIX-J
implements. The objective lane reached the same conclusion from its own probe, including a control
that could distinguish the rival behaviour.

FIX-J's validation matches Node. The hypothesis is dropped on the record.

## A1 — split, and partly an artifact of the brief

Both lanes broke A1 on the guide still defining a runtime target without `.node`. That repair was
deliberately scoped out of FIX-J, which owned the template and returned the falsified guide sentences
report-only so two writers would not share one file. `.orkestrel/campaign/fix-k-brief.md` carries it
and was written before this audit ran. The claim said "correct and complete", which invited the
reading both lanes gave it. That is a brief-wording miss by the Orchestrator, not a unit failure.

What is a real finding is the **code-side twin** the subjective lane named: `src/core/templates.ts`
comments at `:1170` and `:1331-1334` give `.node` no account and ship into every target. Those are
in FIX-J's own owned file and are carried below.

## A9 — converged, and it is the class this campaign keeps producing

Both lanes independently found the emitted comments describing mechanisms the same commit deleted.
This is the third instance in the campaign, and FIX-J's own fifth item existed to repair the second.
Both lanes said the change must not ship as written.

## Carried to FIX-L

| finding | source |
| ------- | ------ |
| the `node` condition ignored, declarations and runtimes alike | objective lane A2, reproduced |
| emitted comments describing deleted mechanisms | both lanes A9 |
| `.node` unaccounted for in the emitted comments | subjective lane A1 |
| `DECLARATION_CONDITIONS` reached by index with unreachable defaults | subjective lane A9 |
| the browser drive's declaration guard placed after the bundle and the browser launch | subjective lane A9 |
| `driveModule` and `driveClassifier` — two mechanisms, one job, both added or moved by FIX-J | subjective lane A9 |
| `below` as a directional reference, and the pre-existing instance beside it | subjective lane, finding 2 |

Dropped on the record: the empty-segment hypothesis (A4), refuted by two independent runs.

Carried to FIX-K unchanged: the guide's `.node` sentence and the other guide prose, already briefed.

Observation carried to the re-propagation, not to a unit: the emitted proof is executed nowhere in
this repository, because scaffold's own `tests/distribution.test.ts` is bespoke and presence
ownership leaves it alone. The subjective lane is right that the `.cts` branch has never run against
a real installed tree. Run `npm run test:distribution -- --mode release` in one propagated target
carrying the regenerated proof **before** the fleet re-propagates, because that is the gate
`prepublishOnly` hits.
