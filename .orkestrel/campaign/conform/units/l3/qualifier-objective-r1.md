## Lane

I held the **objective** lane — correctness, constraints, and what the code and contracts actually permit — as the recorded substitution for the dark GPT-5.6 Sol bench. I read the Luna distillate as evidence, then re-derived every sweep myself and opened each site I ruled on.

## Per-claim verdicts

**1. Every row dispositioned, none silently skipped — CONFIRMED.**
The report's table (`/home/user/scaffold/tmp/units/conform/conform-qualifier-report.md:11-33`) carries a disposition for every row of `conform-qualifier-brief.md` § Rows and § Fleet rows. The two folded rows have live carriers: qualifier-subj-3 lands inside qualifier-obj-1 (`/home/user/fleet/qualifier/src/core/factories.ts:61,94`), and qualifier-subj-13's extra assertion is present at `/home/user/fleet/qualifier/tests/guides.test.ts:262` (`expect(subject).toEqual({ total: 1_250_000 })`). `fleet-F1` and `fleet-F2` are `noop` with the paths read; I confirmed no `isBrowserVuePath` in the tree and no public `readonly id: string` on `Qualifier` or `QualifierError`.

**2. Each `applied` row implements the refuter's operative repair — CONFIRMED.**
Sampled every row at its site. The refuter's amendments are honoured, not the finder's originals: `createRuling` rather than `createRulingDefinition` (`src/core/factories.ts:94`); the membership list carries `buildDottedFieldDefinition` and the duplicate size guard is gone while the three `countFixtures` guards remain (`tests/setup.test.ts:272-283,287,294,301`); `guides/qualifier.md:807` adds the `tests/setup.test.ts` bullet; `guides/qualifier.md:818` is deleted by qualifier-subj-11 rather than edited by qualifier-subj-9. `createFailingEngine` returns `reason: reasonFailing` (`tests/setup.ts:257`). The `conclusion` deviation is inert: `reasonResultToProjection` reads `result.conclusion` and `authored.conclusion` (`src/core/helpers.ts:327,330-332`), never `RuleResult.conclusion`; the diff removes only the member and leaves every `expect` unchanged (`/home/user/work/evidence/conform-qualifier.diff:2080,2089,2098,2259`).

**3. No old name survives — CONFIRMED.**
My own sweeps over `src/**/*.ts`, `tests/**/*.ts`, `README.md`, `guides/qualifier.md`, `guides/README.md`: `\b(rulingDefinition|describeComparison|describeValue|describePremise|premiseCheck|logicalPremises)\w*` case-insensitive — no matches; `(^|[^a-zA-Z])qualificationDefinition\b` — no matches. Every surviving `QualificationDefinition` hit is the retained type name. The local removals sweep clean too: `from '../../setup'`, `qualitativeDefinitionWithDottedField`, `failingResult`, `function permutations`, `FIXTURES.size` — no matches in that population. The report's § Sweeps names the paths (`conform-qualifier-report.md:129-130`).

**4. Failing-first proofs and old-form sweeps — REFUTED (record, not tree).**
The proofs hold: every control file the report names exists and its counts and failing case names match — `obj-1-red.txt:12` and `:98`, `obj-2-obj-7-red.txt:98` (7 failed | 160 passed), `obj-2-permutations-control.txt:12,45`, `obj-2-reasonfailing-control.txt:12,49,70`, `obj-5-isobject-control.txt:12,33`, `obj-9-membership-control.txt:12,42`, `obj-6-fences-control.txt:12,28,44,62`, greens at `obj-1-obj-2-obj-7-obj-8-green.txt:11`, `setup-green.txt:11`, `obj-6-green.txt:11`.
The second conjunct fails. The report's § Sweeps table (`conform-qualifier-report.md:132-142`) records no sweep for these placement, naming, and documentation rows: qualifier-obj-3, qualifier-obj-4, qualifier-subj-4, qualifier-subj-5, qualifier-subj-7, qualifier-subj-10, qualifier-subj-11. I re-derived each and all read empty, so this is a gap in the record, not in the tree.
**What right looks like:** add one § Sweeps row per named row, each with its pattern and the population — `from '\.\./\.\./setup'`; a type-import-after-value-import read of `tests/src/core/helpers.test.ts:1-41`; `\b(item|data|info|obj|thing|cfg|msg)\b` over `src`; `@param failed - Whether`; `Validation is on by default`; the removed renderer sentence; `### Gates|### Terminal eligibility proof`. No code change is required.

**5. Guide parity — CONFIRMED.**
`guides/qualifier.md:384-386` lists exactly the call-signature members of `QualifierInterface` (`src/core/types.ts:197,222,240`), and the readonly `emitter` (`types.ts:161`) sits in the Surface row at `guides/qualifier.md:89`, not the method table. The Helpers table rows `:217-237` match the 21 `export function` declarations of `src/core/helpers.ts` name for name and order; both moved factories sit in the Factories table `:342-343`. Every guide fence imports the published specifier (`:35,127,178,255,317,346,389,530`). `tests/guides.test.ts:189-296` transcribes all three flagship fences, and each presence guard string matches the guide verbatim (`guides/qualifier.md:57-59,579-581,584,405-406`). No `AGENTS §` citation survives in any touched file; the remaining hits are in the vendored mirror `guides/reason.md`.

**6. Breaking changes named with their consumers and the exact consumer edit — REFUTED.**
The report's § Shared-file patches derives its consumer set from `grep -rn "qualificationDefinition\|rulingDefinition" src tests` (`conform-qualifier-report.md:249`), so it misses `@orkestrel/program`'s own authored prose, which imports and calls the renamed published symbols:
- `/home/user/fleet/program/README.md:31` (import), `:50`, `:56`
- `/home/user/fleet/program/guides/program.md:38` (import), `:57`, `:63`, `:770`, `:786`, `:792`, `:821`, `:832`, `:876`, `:890`
- `/home/user/fleet/program/guides/program.md:279` names `logicalPremises` as a public qualifier export

These are not the vendored mirror `program/guides/qualifier.md` the report correctly routes to re-vendoring; they are program's own README and guide, and nothing in program's parity suite reads a foreign package's fence imports, so they would ship documenting removed symbols.
**What right looks like:** extend § Shared-file patches with a third block. Rewrite `program/README.md:31` and `program/guides/program.md:38` as `import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'`; apply the whole-word renames `qualificationDefinition` → `createQualificationDefinition` at `README.md:50` and `guides/program.md:57,770,786,876`, and `rulingDefinition` → `createRuling` at `README.md:56` and `guides/program.md:63,792,821,832,890`; rewrite `guides/program.md:279` to name `ruleToPremises`. Record the sweep bound as `**/*.{ts,md}` excluding vendored mirrors.

**7. Containment — CONFIRMED.**
`/home/user/work/evidence/conform-qualifier.status` lists 13 modified paths, every one under the brief's Owned set, with no added or untracked entry (the evidence script runs `git add -N`, so an untracked file would appear). The diff's `diff --git` headers (`conform-qualifier.diff:1,34,52,482,517,623,941,1020,1163,1275,1478,1752,1846`) name exactly those 13 files: no `package-lock.json`, no `node_modules`, no off-limits path. No compatibility alias, re-export, or shim: `src/core/helpers.ts` no longer exports either factory and `src/core/index.ts:1-7` is unchanged star re-exports of the module set.

**8. First conjunct CONFIRMED; the independent gate run NOT-EVIDENCED.**
No `.skip`, `.only`, `.todo`, retry, or inflated timeout entered the tree: the added-line sweep `^\+.*(\.skip\(|\.only\(|\.todo\(|\.concurrent|retry|timeout|TODO|FIXME|console\.|debugger|eslint-disable|@ts-)` over the diff returns no match. The report's § Gates (`conform-qualifier-report.md:156-163`) names `format:check`, `lint:check`, `check`, `build`, and `test`, each with its command, exit 0, a reading, and an output file that exists; `gate-test.txt:15,29,43,57,71` carries the five project readings. The independent reading of that chain is a run no read-only lane can take: **NOT-EVIDENCED** — the Orchestrator's deciding run at landing settles it.

**9. Nothing hidden — CONFIRMED.**
No TODO, deferred row, commented-out code, or debug residue entered the tree; the only `console.` in the package sits at `src/core/Qualifier.ts:94` inside a pre-existing TSDoc example and appears nowhere in the diff (the Qualifier.ts hunks are `conform-qualifier.diff:486-516`). The disposition table matches the diff file for file, including the two `noop` rows and the recorded deviation. One inaccuracy, recorded as F3 rather than as a break: the qualifier-subj-14 note cites a line the unit's own edits moved.

## Findings outside the claims

**F1. `tests/distribution.test.ts:159` reimplements contract's `isObject` under the name `isRecord`.** This is the defect qualifier-obj-5 removed from `tests/setup.test.ts`, surviving in the fleet-wide distribution drop-in whose header declares it package-neutral (`tests/distribution.test.ts:1-6`). No row named it, and repairing it here forks the drop-in.
**Prescription:** route as a fleet row worded like fleet-F1 — where a package's `tests/distribution.test.ts` declares a local `isRecord` whose body is `typeof value === 'object' && value !== null`, replace it with `@orkestrel/contract`'s `isObject` across every target in one pass. Do not edit it in `qualifier`.

**F2. `tests/guides.test.ts:2-3` states a contract the ruled qualifier-obj-6 change breaks.** The header reads "The four constants below are this package's own, and are the only part a sibling package changes", while the file now carries a package-specific `describe('flagship fences')` at `:188-297` and four-plus constants at `:36-40`. The report routes the count and the `below` as a fleet row (`conform-qualifier-report.md:322-325`); the stale "only part a sibling package changes" clause is not in that route.
**Prescription:** extend the same fleet row to rewrite the header as one sentence naming the constants block and the package's own fence suite as the two parts a sibling package changes, with no count and no positional reference.

**F3. `conform-qualifier-report.md:31` cites a line the unit moved.** The qualifier-subj-14 note reads "The `false` arm at `helpers.ts:329`"; the arm is at `src/core/helpers.ts:326` after this unit's edits.
**Prescription:** correct the citation to `src/core/helpers.ts:326` in the report's row table.

## Referrals to the Orchestrator

**R1. The consumer bound that produced the claim 6 gap is the brief's, not only the unit's.** `conform-qualifier-brief.md:25` states program's consumer surface as "checked by grepping `@orkestrel/qualifier` across program/{src,tests,app}/**/*.ts", which excludes Markdown by construction. The unit's `grep … src tests` inherited it. Decide whether the added patch block rides the existing program L4 unit's brief or a successor pair, and fix the standing rule for a breaking row's consumer sweep to `**/*.{ts,md}` minus vendored mirrors.

**R2. The `conclusion` deviation is verified and routes as the report asks.** I confirmed independently that no code reads `RuleResult.conclusion` and that no assertion changed, so the deletion is the reason bump's consumer carry rather than this unit's defect. It needs the successor finding against the `@orkestrel/reason` bump that the report names, and program's suites carry the same literal shape in places its own unit must re-derive.

## Claims attacked and held

Attacked hardest: claim 2 (re-read every row at its site rather than trusting the distillate's "report matches yes"), claim 3 (re-derived both sweeps myself over the full population), claim 6 (swept the whole fleet rather than program's `src` and `tests`, which is where it broke), claim 4 (checked every control file's real counts and failing case names). Held: 1, 2, 3, 5, 7, 8 (first conjunct), 9. Refuted: 4, 6.

VERDICT: FAIL 4, 6; outside the claims: F1, F2, F3
