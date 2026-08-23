# Round 3 — reconciliation

Both lanes returned FAIL against `.orkestrel/campaign/audit-v50-successor3.md`. Neither lane saw the
other's answer. Blind reports are immutable and recorded unedited in `audit-r3-sol.md` and
`audit-r3-reviewer.md`. This file is the Orchestrator's ruling and is the only place a finding is
dropped or promoted.

## Lane verdicts, side by side

| claim | subjective (Opus) | objective (Sol) | ruling |
| ----- | ----------------- | --------------- | ------ |
| C1 `.node` classified as an asset | BROKEN | BROKEN, loaded a real addon | **survives** |
| C2 dual `require` declaration uncompiled | BROKEN | BROKEN, real node16 consumer | **survives** |
| C3 `unreachable` assertion can fire | CONFIRMED | CONFIRMED with control | not vacuous, no action |
| C4 per-format controls | CONFIRMED | BROKEN, dual entry skips the probe | **survives, objective lane correct** |
| C5 seed-relative predicate | BROKEN, release boundary | CONFIRMED, not reachable today | split, see following |
| C6 remedy consistency | BROKEN | CONFIRMED | disputed, refuted independently |
| C7 npm environment pinning | UNRESOLVED, no Bash | CONFIRMED | **settled**, environment outranks project config |
| C8 `appBrowser` `ConfigEnv` | CONFIRMED, latent hazard | CONFIRMED, speculative | no publish block, successor row |
| C9 guide universals | BROKEN | BROKEN | **survives**, downstream of C1 and C2 |
| C10 coherence | BROKEN, three seams | BROKEN, new array defect | **survives**, both parts |

## Where the lanes disagreed, and why the ruling went as it did

**C4.** The subjective lane answered the vacuity question the brief actually posed and answered it
correctly: `stage.entries.length` is asserted greater than zero, so the loop cannot pass having
measured nothing. The objective lane attacked a different property and found the real hole beneath
it — the `.cts` partition filters on `entry.module === false`, so a dual entry never enters the
CommonJS compile probe and neither that probe nor its control runs for it. It supplied a firing
control. The objective reading is correct and does not contradict the subjective one; it supersedes
it. Confirmed by direct reading: `src/core/templates.ts:1576` filters on `entry.module === module`
while the CommonJS runtime drive at `:1605` already reads `entry.commonjs`, which is the discipline
the compile probe failed to follow.

**C6.** The lanes read the same sentence opposite ways, and the question is whether "the proof's
subject is behavior" is false for a setup module that exports a constant. That is a prose-truth
question in the subjective lane's own competence, so it does not win by default against the
objective lane's disagreement. It was routed to an independent refuter rather than ruled here.

**C5.** Both lanes are right about different things. The mechanism the subjective lane describes —
birth ownership plus a seed that moves between releases — is not open on this release: no
`tests/setup*.ts` seed literal moved in 0.0.50, verified by the Orchestrator. The guide sentence it
attacks is a separate question and went to a refuter.

## Dropped on the record

- **The `.d.mts` sub-claim of C9.** Refuted on `diagnosis-wrong`. It rests on `.mts` being a member
  of `MODULE_EXTENSIONS`; the member is `.mjs`. `isModule('./x.d.mts')` returns `false`, so the
  declaration set and the runtime-target test are disjoint exactly as the guide claims. Run recorded
  in `audit-r3-orchestrator-evidence.md`.
- **The `host.json` drift concern of C9.** The inventory entry and the file both hash to
  `c5fd8d870642e5400f560daf9fff67e2b78bc3036cc5e06d40369ec6af7cedb3`. No drift.

## Carried to units

| finding | carrier |
| ------- | ------- |
| C1 `.node` | FIX-J, item J1 |
| C2 per-format declaration | FIX-J, item J2 |
| C4 CommonJS partition predicate | FIX-J, item J3 |
| C10 array member validation | FIX-J, item J4 |
| the emitted guard's superseded predicate quote | FIX-J, item J5 |
| C9 guide universals | FIX-K, after FIX-J lands |
| C10 `bytes` where the code trims | FIX-K |
| the emitted guard's retired bundler reason | FIX-K |
| C8 `appBrowser` typing | recorded as a successor row, not carried into 0.0.50 |

## Refuter round: the subjective lane's findings, attacked independently

Nine refuters ran blind, one per finding, each given only that finding's vector and briefed to break
it, defaulting to refuted when uncertain. Four fell.

| finding | verdict | ground | severity |
| ------- | ------- | ------ | -------- |
| `.node` misclassified | survives | — | successor |
| dual `require` declaration uncompiled | survives | — | successor |
| release-boundary seed | survives | — | successor |
| the message's behavior sentence | **refuted** | behaviour correct and documented | none |
| extensionless target under ESM | **refuted** | does not reproduce | none |
| `bytes` where the code trims | survives | — | fix now |
| the emitted guard's stale quote | survives | — | **blocks publish** |
| the canon fixes the subject as exported behavior | **refuted** | does not reproduce | none |
| the same-stem advisory cannot be closed | **refuted** | behaviour correct and documented | none |

What the refutations establish:

- **The extensionless claim is factually wrong, and so was the Orchestrator's own version of it.**
  Node resolves such a file through `ESM_FILE_FORMAT` from the nearest `package.json` `type`. Both
  fixtures loaded through real specifiers with no `ERR_UNKNOWN_FILE_EXTENSION`, on the v22 line this
  package requires. Withdrawn in `audit-r3-orchestrator-evidence.md`.
- **The objective lane was right about C6.** The message's behavior sentence is correct and
  documented, so the subjective lane's reading falls and no prose changes on its account.
- **F1 and F2 do not reproduce**, so no canon conflict is carried and `.claude/rules/tests.md` is
  not reopened.
- **The stale guard quote is the one publish blocker.** A refuter generated the real emitted file
  from built `dist`, showed the comment quotes `it.runIf(!entry.browser)` while neither predicate in
  that file is spelled that way, traced which commit superseded it, and confirmed a third copy in
  `tests/src/core/compilers.test.ts:666` and that the text ships inside `dist`.

Severity is not the same question as scope. The user's standing instruction for this campaign is to
fix what the round finds before publishing, and every surviving finding sits inside the capability
0.0.50 owns — the distribution proof. So the successor-rated findings are fixed here too rather than
deferred; the ratings order the work and do not exempt any of it.

## Final carrier table

| finding | carrier |
| ------- | ------- |
| `.node` classification | FIX-J, item J1 |
| per-format declaration | FIX-J, item J2 |
| CommonJS partition predicate | FIX-J, item J3 |
| array member validation | FIX-J, item J4 |
| the emitted guard's superseded predicate quote | FIX-J, item J5 |
| the emitted guard's retired bundler reason | FIX-K |
| the third stale quote in `tests/src/core/compilers.test.ts` | FIX-K |
| `bytes` where the code trims | FIX-K |
| guide universals downstream of J1 and J2 | FIX-K |
| release-boundary seed, and the guide sentence claiming the door is shut | FIX-K, guide only; the mechanism is a successor row |
| `appBrowser` typing | successor row, not carried into 0.0.50 |

Dropped and not carried: the `.d.mts` sub-claim, the `host.json` drift concern, the extensionless
claim, the message's behavior sentence, F1, F2.

Every carried finding names exactly one carrier, and every dropped finding is named here rather than
left silent.
