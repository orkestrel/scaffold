## Question

For every row of `unit conform-qualifier`, what does the tree carry, what did its diff change, and do the report readings match?

## Evidence

Sweep scope `S`: `src/**/*.ts`, `tests/**/*.ts`, `guides/qualifier.md`, `guides/README.md`, and `README.md`, excluding `node_modules/**`.

### Per-row evidence

1. **qualifier-obj-1**
   - **Site now:** The old sites no longer exist. The bodies are in `src/core/factories.ts:61-74` as `createQualificationDefinition` and `:94-106` as `createRuling`; context includes the copied `passes`, `rulings`, and `metadata` logic.
   - **Law:** Factories belong in `*/factories.ts`; exported factory functions use `create*` names (`/home/user/scaffold/.claude/rules/architecture.md:12-18,65-70`).
   - **Diff:** `src/core/factories.ts` hunk `@@ -1,4 +1,13 @@` and added factory body lines include `+export function createQualificationDefinition` and `+export function createRuling`. Removal is in `src/core/helpers.ts` hunk `@@ -790,74 +788,3 @@`. The operative repair is present.
   - **Old-form sweep:** `\b(qualificationDefinition|rulingDefinition)(s|es|ed|ing)?\b` over `S`: no exact hits. Case-insensitive sweep has only `QualificationDefinition` type references in `src/core/helpers.ts:7,576,720,756`, `src/core/types.ts:3,91,197,222`, `src/core/factories.ts:2,41,66`, `src/core/validators.ts:3,189,194`, `tests/setup.ts:1,77,95,113,142,157,176,201,214`, `tests/setup.test.ts:10,40,76,88,108,127,155,166`, and `guides/qualifier.md:4,83,342`.
   - **Report:** `applied` — “Both value factories moved to `factories.ts` as `createQualificationDefinition` and `createRuling`; BREAKING.” (`conform-qualifier-report.md:7`). The report matches the tree.
   - **Proof:** `obj-1-red.txt` records `Tests 7 failed | 162 passed (169)`; `obj-1-obj-2-obj-7-obj-8-green.txt` records `Tests 167 passed (167)`. The factory tests are present in the diff.

2. **qualifier-obj-2**
   - **Site now:** The nested permutation function is absent from `tests/src/core/helpers.test.ts`; the call is `buildPermutations(subset)` at `:78`. The helper is exported at `tests/setup.ts:24-34`. `FAILING_RESULT` is at `tests/setup.ts:229-237`, and `reasonFailing` is at `:240-250`.
   - **Law:** Functions cannot be declared or assigned inside another function or method (`architecture.md:160-166`).
   - **Diff:** `helpers.test.ts` hunk `@@ -78,25 +69,13 @@` removes `permutations`; `tests/setup.ts` hunk `@@ -20,6 +20,29 @@` adds `buildPermutations`; hunk `@@ -?` around the failing engine adds `FAILING_RESULT` and `reasonFailing`. The operative repairs are present.
   - **Old-form sweep:** `function permutations`, `function reason`, `reason: reason`, and `failingResult` over `S`: no old callable-form hits. Generic `reason` tokens remain as domain terms, such as `src/core/helpers.ts:111,214,323`, and are not the removed function.
   - **Report:** `applied` — “`permutations` extracted to `buildPermutations`; `failingResult` and the overloaded `reason` hoisted out of the factory.” (`conform-qualifier-report.md:8`). The report matches the tree.
   - **Proof:** `obj-2-obj-7-red.txt`: `Tests 7 failed | 160 passed (167)`; green file: `Tests 167 passed (167)`. `obj-2-permutations-control.txt`: `Tests 1 failed | 14 passed (15)`; `setup-green.txt`: `Tests 15 passed (15)`. `obj-2-reasonfailing-control.txt`: `Tests 2 failed | 13 passed (15)`; `setup-green.txt`: `Tests 15 passed (15)`.

3. **qualifier-obj-3**
   - **Site now:** `tests/src/core/Qualifier.test.ts:35` imports `../../setup.js`; surrounding imports are at `:26-35`.
   - **Law:** Local ESM TypeScript imports require explicit `.js` extensions (`typescript.md:14-18`).
   - **Diff:** Hunk `@@ -27,12 +27,13 @@`; the added line is `+} from '../../setup.js'`. Present.
   - **Old-form sweep:** `from '../../setup'` over `S`: no hit.
   - **Report:** `applied` — “`Qualifier.test.ts` resolves `'../../setup.js'`.” (`conform-qualifier-report.md:9`). Matches.
   - **Proof:** Placement/naming row; the old-form sweep is empty.

4. **qualifier-obj-4**
   - **Site now:** `import type { Comparison } ...` is first at `tests/src/core/helpers.test.ts:1`, followed by value imports at `:2`. The former `Finding` type import was removed because row 7 moved its only use to `tests/setup.ts:1`.
   - **Law:** Type imports precede value imports (`typescript.md:16-18`).
   - **Diff:** Hunk `@@ -1,32 +1,31 @@`; the added first line is `+import type { Comparison } from '@orkestrel/reason'`. Present.
   - **Old-form sweep:** `import type` declarations after a value import over `tests/src/core/helpers.test.ts`: no hit.
   - **Report:** `applied` — “`helpers.test.ts` opens with its `import type` line, then the value imports.” (`conform-qualifier-report.md:9`). Matches.
   - **Proof:** Placement row; current import order agrees.

5. **qualifier-obj-5**
   - **Site now:** `tests/setup.test.ts:13` imports `isObject`; `:52` uses `while (isObject(current) && 'nested' in current)`. The local `isRecord` function is absent.
   - **Law:** Reuse a declared helper when semantics match; do not reimplement it (`patterns.md:3-20`; `tests.md:180-188`).
   - **Diff:** Hunk `@@ -10,6 +10,7 @@` adds `+import { isObject } from '@orkestrel/contract'`; hunk `@@ -53,7 +7,7 @@` changes the guard call. Present.
   - **Old-form sweep:** `function isRecord` over `S`: no hit. The broader `\bisRecord\b` sweep has existing dependency or distribution uses at `src/core/helpers.ts:25,635`, `src/core/validators.ts:15,202`, and `tests/distribution.test.ts:159,198,240,295,314,365,419,526,645`; none is the removed local guard.
   - **Report:** `applied` — “The local `isRecord` is gone; `setup.test.ts` walks with contract's `isObject`.” (`conform-qualifier-report.md:9`). Matches.
   - **Proof:** `obj-5-isobject-control.txt`: `Tests 1 failed | 14 passed (15)`; `setup-green.txt`: `Tests 15 passed (15)`.

6. **qualifier-obj-6**
   - **Site now:** The parity loop remains at `tests/guides.test.ts:1-180`. The executable fence suite is added at `:188-294`, with Surface assertions at `:191-218`, Patterns assertions at `:220-268`, and Methods assertions at `:270-292`.
   - **Law:** `tests/guides.test.ts` must execute flagship fences and assert their documented values (`tests.md:50-72`; `documentation.md:30-38`).
   - **Diff:** Hunk `@@ -17,7 +17,18 @@` adds imports; hunk `@@ -168,3 +179,119 @@` adds the three fence cases. Present.
   - **Old-form sweep:** No removed symbol or fence block remains; `describe('flagship fences'` occurs at `tests/guides.test.ts:188`.
   - **Report:** `applied` — “`tests/guides.test.ts` runs the Surface, Patterns, and Methods fences and asserts their commented values.” (`conform-qualifier-report.md:10`). Matches.
   - **Proof:** `obj-6-fences-control.txt`: `Tests 3 failed | 18 passed (21)`; `obj-6-green.txt`: `Tests 21 passed (21)`. The control file exists and matches the report.

7. **qualifier-obj-7**
   - **Site now:** `buildDottedFieldDefinition` is exported at `tests/setup.ts:214-226` and used at `tests/src/core/Qualifier.test.ts:486`. `buildFinding` is exported at `tests/setup.ts:37-44` and used at `tests/src/core/helpers.test.ts:400,407,420,440,448,465,473,487,495`. Both local declarations are gone.
   - **Law:** Shared fixture factories belong in setup files and use module-helper names (`tests.md:180-188`).
   - **Diff:** `tests/setup.ts` hunk `@@ -20,6 +20,29 @@` adds `buildFinding`; hunk `@@ -182,36 +205,56 @@` adds `buildDottedFieldDefinition`; local deletions occur in `helpers.test.ts` hunk `@@ -1,32 +1,31 @@` and `Qualifier.test.ts` hunk `@@ -836,17 +837,3 @@`. Present.
   - **Old-form sweep:** `qualitativeDefinitionWithDottedField` and `function finding` over `S`: no hit.
   - **Report:** `applied` — “`buildDottedFieldDefinition` and `buildFinding` moved into `tests/setup.ts`.” (`conform-qualifier-report.md:11`). Matches.
   - **Proof:** `obj-2-obj-7-red.txt`: `Tests 7 failed | 160 passed (167)`; `obj-1-obj-2-obj-7-obj-8-green.txt`: `Tests 167 passed (167)`.

8. **qualifier-obj-8**
   - **Site now:** The duplicate block is absent. The retained block is `tests/src/core/helpers.test.ts:371-393`, containing the valid-subject and reserved-key cases.
   - **Law:** Consolidation removes duplicate test behavior (`AGENTS.md` work process and TTTDD step 3).
   - **Diff:** Hunk `@@ -602,16 +590,6 @@` removes the duplicate `describe` block. Present.
   - **Old-form sweep:** `describe('hasReservedKey/assertSubject'` over `S`: no hit; retained block is `describe('assertSubject / hasReservedKey'` at `:371`.
   - **Report:** `applied` — “The duplicate `hasReservedKey/assertSubject` block is deleted.” (`conform-qualifier-report.md:11`). Matches.
   - **Proof:** The report groups this row with the `src:core` green control but records no row-specific failing-first control for the deletion.

9. **qualifier-obj-9**
   - **Site now:** The membership assertion is at `tests/setup.test.ts:271-283`; the duplicate size guard is absent from the freshness case at `:305-309`.
   - **Law:** Discovered populations require membership assertions, including the empty-population failure condition (`tests.md:31-39`).
   - **Diff:** Hunk `@@ -250,9 +246,41 @@` adds the membership case; hunk `@@ -277,12 +305,33 @@` removes the duplicate size guard and adds failing-engine assertions. Present.
   - **Old-form sweep:** `FIXTURES.size` and `exports a qualification definition builder` over `S`: no hit.
   - **Report:** `applied` — “`FIXTURES` is pinned by membership; the duplicate size guard is deleted.” (`conform-qualifier-report.md:19`). Matches.
   - **Proof:** `obj-9-membership-control.txt`: `Tests 1 failed | 14 passed (15)`; `setup-green.txt`: `Tests 15 passed (15)`.

10. **qualifier-obj-10**
    - **Site now:** `README.md:20` states `Node.js >= 22.12.0`, matching `package.json:91-93`.
    - **Law:** Runtime documentation, engines, and build targets must align (`workspace.md:240-247`).
    - **Diff:** `README.md` hunk `@@ -17,13 +17,13 @@`; added line `+- Node.js >= 22.12.0`. Present.
    - **Old-form sweep:** `Node\.js >= 24` over `S`: no hit.
    - **Report:** `applied` — “`README.md` states `Node.js >= 22.12.0`, matching `engines.node`.” (`conform-qualifier-report.md:20`). Matches.
    - **Proof:** Documentation row; the runtime sweep agrees.

11. **qualifier-subj-1**
    - **Site now:** `renderComparison`, `renderValue`, and `renderPremise` are exported from `src/core/helpers.ts:81,129,163`; their internal calls are at `:170-171`. The finding-message helpers remain `describe*` at `:576,720,756`.
    - **Law:** `describe*` describes findings; `render*` renders non-finding values (`names.md:96-104`).
    - **Diff:** Helper hunks `@@ -69,19 +66,19 @@`, `@@ -122,14 +119,14 @@`, and `@@ -154,24 +151,24 @@`; added exports are `+export function renderComparison`, `+export function renderValue`, and `+export function renderPremise`. Present.
    - **Old-form sweep:** `\b(describeComparison|describeValue|describePremise)(s|es|ed|ing)?\b` over `S`: no hit.
    - **Report:** `applied` — “`renderComparison`, `renderValue`, `renderPremise`; BREAKING.” (`conform-qualifier-report.md:21`). Matches.
    - **Proof:** Naming row; the old-name sweep is empty.

12. **qualifier-subj-2**
    - **Site now:** `checkToPremise` is exported at `src/core/helpers.ts:193`; `ruleToPremises` at `:240`; calls are at `:257` and `:451`.
    - **Law:** Module helpers use verb-noun names; projections use `{noun}To{Noun}` (`names.md:82-104,170-177`).
    - **Diff:** Hunk `@@ -185,15 +182,15 @@` adds `+export function checkToPremise`; hunk `@@ -228,19 +225,19 @@` adds `+export function ruleToPremises`; internal-call hunk `@@ -257,7 +254,7 @@` adds `+output.push(checkToPremise(...))`. Present.
    - **Old-form sweep:** `\b(premiseCheck|logicalPremises)(s|es|ed|ing)?\b` over `S`: no hit.
    - **Report:** `applied` — “`checkToPremise`, `ruleToPremises`; BREAKING.” (`conform-qualifier-report.md:22`). Matches.
    - **Proof:** Naming row; the old-name sweep is empty.

13. **qualifier-subj-4**
    - **Site now:** `src/core/helpers.ts:448` uses `result.rules.find((resolved) => resolved.id === ruling.rule)`.
    - **Law:** Generic words such as `item` are rejected (`names.md:219-222`).
    - **Diff:** Hunk `@@ -448,10 +445,10 @@`; added line contains `+const entry = result.rules.find((resolved) => resolved.id === ruling.rule)`. Present.
    - **Old-form sweep:** `\b(item|data|info|obj|thing|cfg|msg)\b` over `src`: no hit.
    - **Report:** `applied` — “The callback binding at `helpers.ts` is `resolved`.” (`conform-qualifier-report.md:23`). Matches.
    - **Proof:** Naming row; source sweep agrees.

14. **qualifier-subj-5**
    - **Site now:** `src/core/helpers.ts:475-476` documents both boolean branches and `Default: \`false\``.
    - **Law:** Boolean parameters use the explicit `If true; if false` form and defaults use `Default:` (`typescript.md:76-82`).
    - **Diff:** Hunk `@@ -475,7 +472,8 @@`; added lines begin `+ * @param failed - If \`true\``. Present.
    - **Old-form sweep:** `@param failed - Whether` over `S`: no hit.
    - **Report:** `applied` — “`@param failed` states both branches and its default.” (`conform-qualifier-report.md:24`). Matches.
    - **Proof:** Documentation row; the old wording is absent.

15. **qualifier-subj-6**
    - **Site now:** `src/core/helpers.ts:219` says “through `extractAtoms`”; `:656` says “for example `MISSING`”; `README.md:21` says “through the `exports` field”.
    - **Law:** Replace `via` with `through` and `e.g.` with `for example` (`writing.md:88-99`).
    - **Diff:** Helper hunk `@@ -216,7 +213,7 @@`; hunk `@@ -651,7 +649,7 @@`; README hunk `@@ -17,13 +17,13 @@`. Present.
    - **Old-form sweep:** `\b(via|e\.g\.|i\.e\.|etc\.)\b` over `S`: no hit. The diff-wide match at `conform-qualifier.diff:1208` is `new Set`, not prose.
    - **Report:** `applied` — “`via` → `through` and `e.g.` → `for example` at every named site, plus one hit outside the row (see § Sweeps).” (`conform-qualifier-report.md:24`). The named sites match; the outside test-title hit was also removed from the tree.
    - **Proof:** Documentation row; sweep agrees.

16. **qualifier-subj-7**
    - **Site now:** `QualifierOptions` remarks at `src/core/types.ts:140-149` document `engine`, `validate`, `labels`, `on`, and `error`. `createQualifier` repeats the `labels` behavior and `Default: \`true\`` at `src/core/factories.ts:16-23`. The guide documents labels at `guides/qualifier.md:678-681`.
    - **Law:** Options objects use one `@param`, with short fields explained under `@remarks` (`typescript.md:76-86`; `patterns.md:21-29`).
    - **Diff:** `types.ts` hunk `@@ -136,7 +136,17 @@`; `factories.ts` hunk around `@@ -7,?`; guide hunk `@@ 679,6 +676,10 @@`. Present.
    - **Old-form sweep:** `Validation is on by default` over `S`: no hit; `labels` documentation is present at all three sites.
    - **Report:** `applied` — “`QualifierOptions` carries an `@remarks` naming every key; `createQualifier` restates `labels` and `Default: \`true\``.” (`conform-qualifier-report.md:25`). Matches.
    - **Proof:** Documentation row; source and guide agree.

17. **qualifier-subj-8**
    - **Site now:** The five stale citations are absent: `src/core/types.ts:131`, `guides/qualifier.md:27,92`, and `guides/README.md:3,45`. The replacement link is at `guides/README.md:45`.
    - **Law:** Claims must name destinations the reader can check (`writing.md:35-45`); the shared row states that numbered `AGENTS §N` citations are invalid.
    - **Diff:** `types.ts` hunk `@@ -128,7 +128,7 @@`; guide hunk `@@ -13,18 +13,18 @@`; `guides/README.md` hunk `@@ -1,6 +1,6 @@` and `@@ -42,4 +42,4 @@`. Present.
    - **Old-form sweep:** `AGENTS §|§[0-9]` over `S`: no hit.
    - **Report:** `applied` — “Every `AGENTS §N` citation is gone; the `guides/README.md` link text names the destination.” (`conform-qualifier-report.md:26`). Matches.
    - **Proof:** Documentation sweep agrees.

18. **qualifier-subj-9**
    - **Site now:** The opening guide text is split at `guides/qualifier.md:16-20`; the remaining rewritten sentences are at `:458`, `:647-650`, and `:719-720`. The former `:818` sentence is deleted by row 11.
    - **Law:** Never write `should`; keep sentences short and name the actor (`writing.md:8-30`).
    - **Diff:** Guide hunks `@@ -13,18 +13,18 @@`, `@@ -458,7 +455,7 @@`, `@@ -?` around the referral paragraph, and `@@ -715,8 +716,8 @@`. Present.
    - **Old-form sweep:** `\bshould\b` over `S`: no hit.
    - **Report:** `applied` — “`should` is gone from the guide; the opening sentence is split and names the actor.” (`conform-qualifier-report.md:27`). Matches.
    - **Proof:** Documentation sweep agrees.

19. **qualifier-subj-10**
    - **Site now:** The former renderer list is replaced by `guides/qualifier.md:239-240`: “Every helper carries a worked `@example` in source and is composed by `Qualifier` rather than reimplemented by it.”
    - **Law:** Re-read prose against the shipped implementation and claim only checkable facts (`documentation.md:37-38`; `writing.md:35-45`).
    - **Diff:** Guide hunk `@@ -235,27 +235,22 @@`; the added sentence is present.
    - **Old-form sweep:** The removed list sentence has no hit over `S`; the renamed identifiers also have no old-name hits.
    - **Report:** `applied` — “The false renderer/`@example` paragraph is one symbol-free sentence.” (`conform-qualifier-report.md:28`). Matches.
    - **Proof:** Documentation row; current sentence matches.

20. **qualifier-subj-11**
    - **Site now:** `guides/qualifier.md:790-811` is a linked map for the real test files. `### Gates` and `### Terminal eligibility proof` no longer exist.
    - **Law:** Guides cannot create competing instruction copies (`documentation.md:22-28`).
    - **Diff:** Guide hunk `@@ -789,77 +790,26 @@`; the added `tests/setup.test.ts` bullet is at `:806-809`. Present.
    - **Old-form sweep:** `### Gates|### Terminal eligibility proof|Integration tests should prove` over `S`: no hit.
    - **Report:** `applied` — “`## Tests` is a file-to-proof map; the `### Gates` fence and the `### Terminal eligibility proof` are deleted.” (`conform-qualifier-report.md:28-29`). Matches.
    - **Proof:** Documentation row; the guide structure agrees.

21. **qualifier-subj-14**
    - **Site now:** `QualificationProjection` remains `number | boolean | Readonly<Record<string, unknown>>` at `src/core/types.ts:22`; the deliberate `return false` remains at `src/core/helpers.ts:326`; the guide documents the union at `guides/qualifier.md:75`; the test asserts it at `tests/src/core/helpers.test.ts:309`.
    - **Law:** Absence uses `undefined`, but real domain states remain literal unions (`AGENTS.md` design laws).
    - **Diff:** No hunk touches this behavior.
    - **Old-form sweep:** Not applicable; no name or phrase was removed.
    - **Report:** `noop` — “No edit ruled. The `false` arm at `helpers.ts:329` stands, pinned by its `@remarks`, the guide, and its named case.” (`conform-qualifier-report.md:31`). The line moved to `:326`, but the cited behavior remains.
    - **Proof:** No behavioral control is required for the retained state; the named test remains.

### Fleet rows

- **fleet-F1:** `isBrowserVuePath` has no hit in `src` or `tests`; no browser directories or `tests/setupBrowser.ts` exist. This matches the report’s `noop` evidence (`conform-qualifier-report.md:33-38`).
- **fleet-F2:** The only implementation classes read are `src/core/Qualifier.ts` and `src/core/errors.ts`. Neither declares a public `readonly id: string`; `Qualifier` uses `#` fields at `:54-60`, and `QualifierError` has `code` and `context` at `errors.ts:19-20`. No `JSON.stringify` of a `Qualifier` or `QualifierError` instance occurs in the applicable tests or guide fences. The report’s `noop` matches (`conform-qualifier-report.md:40-44`).

### Across the unit

**Scope.** Every status path is owned:

- `README.md` — owned by qualifier-obj-10 and qualifier-subj-6.
- `guides/README.md` — owned by qualifier-subj-8.
- `guides/qualifier.md` — owned by qualifier-obj-1, qualifier-obj-6, qualifier-subj-1, qualifier-subj-2, qualifier-subj-6 through qualifier-subj-11.
- `src/core/Qualifier.ts` — owned TSDoc changes under qualifier-obj-1.
- `src/core/factories.ts` — owned by qualifier-obj-1 and qualifier-subj-7.
- `src/core/helpers.ts` — owned by qualifier-obj-1 and qualifier-subj-1, qualifier-subj-2, qualifier-subj-4, qualifier-subj-5, qualifier-subj-6.
- `src/core/types.ts` — owned by qualifier-obj-1 and qualifier-subj-7, qualifier-subj-8.
- `tests/guides.test.ts` — owned by qualifier-obj-6.
- `tests/setup.test.ts` — owned by qualifier-obj-2, qualifier-obj-5, qualifier-obj-9.
- `tests/setup.ts` — owned by qualifier-obj-2 and qualifier-obj-7.
- `tests/src/core/Qualifier.test.ts` — owned by qualifier-obj-3 and qualifier-obj-7.
- `tests/src/core/factories.test.ts` — owned by qualifier-obj-1.
- `tests/src/core/helpers.test.ts` — owned by qualifier-obj-2, qualifier-obj-4, qualifier-obj-7, qualifier-obj-8.

**Unmapped diff hunks.** None. Every changed file and hunk belongs to a row’s declared site or operative repair.

**Residue.**
- Diff `+`-line sweep for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hits.
- Tree sweep over `src` and non-vendored `tests`: `src/core/Qualifier.ts:94` contains `console.log` inside an existing TSDoc example. The report’s residue section does not list this pre-existing hit (`conform-qualifier-report.md:129-149`); it is not an added debug statement.
- Vendored exclusions were `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

**Parity.**

| Entity | `types.ts` signature | Guide methods | Readonly data and guide surface |
|---|---|---|---|
| `QualifierInterface` | `qualify` `src/core/types.ts:197`; `validate` `:222`; `destroy` `:240` | `qualify`, `validate`, `destroy` at `guides/qualifier.md:384-386` | `emitter` at `types.ts:161`; guide Surface row at `guides/qualifier.md:89` |
| `Qualifier` | Implementation methods `src/core/Qualifier.ts:138,177,219` | Same guide rows `:384-386` | Its interface data surface is the `emitter` row at guide `:89` |

New guide API identifiers in tables and fences are exported through `src/core/index.ts:1-7`: `createQualificationDefinition`, `createRuling`, `renderComparison`, `renderValue`, `renderPremise`, `checkToPremise`, and `ruleToPremises`. Non-exported backticked terms in added prose — `ineligible`, `referral`, `labels`, `age`, `qualification.cap`, `label`, and `@example` — are values, option keys, paths, properties, or documentation markers, not public exports.

**Gates from the report.**

- `npm run format:check` — exit `0`; “All matched files use the correct format.” (`conform-qualifier-report.md:153-158`).
- `npm run lint:check` — exit `0`; “No diagnostic” (`conform-qualifier-report.md:158-160`).
- `npm run check` — exit `0`; “Both projects clean” (`conform-qualifier-report.md:160-162`).
- `npm run build` — exit `0`; “Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts” (`conform-qualifier-report.md:162-164`).
- `npm test` — exit `0`; `src:core` 167 passed, `policy` 111 passed, `config` 46 passed, `setup` 15 passed, `guides` 21 passed (`conform-qualifier-report.md:164-166`).

**Breaking.** The report lists these published renames (`conform-qualifier-report.md:177-187`):

- `qualificationDefinition` → `createQualificationDefinition`
- `rulingDefinition` → `createRuling`
- `describeComparison` → `renderComparison`
- `describeValue` → `renderValue`
- `describePremise` → `renderPremise`
- `premiseCheck` → `checkToPremise`
- `logicalPremises` → `ruleToPremises`

Breaking sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `qualifier` and guide mirrors:

- `/home/user/fleet/program/src/core/helpers.ts:34,228,265` — `logicalPremises`.
- `/home/user/fleet/program/tests/setup.ts:15,530,536,554,560,595,597,630,642,648,667,674,723,729,801,807,853,942,948,952` — old factory names.
- `/home/user/fleet/program/tests/setup.test.ts:22,176,180`.
- `/home/user/fleet/program/tests/src/core/helpers.test.ts:76,477-478,496-497,510,523,609,626,647,666-667,690-691,709,730,746,759,777`.
- `/home/user/fleet/program/tests/src/core/validators.test.ts:34,493`.
- `/home/user/fleet/program/tests/src/core/programs/Program.test.ts:64,434-435,445,887,914,935,959,1018`.
- `/home/user/fleet/program/tests/src/core/programs/ProgramManager.test.ts:13-14,83-85`.
- `/home/user/fleet/program/tests/src/core/factories.test.ts:4,15,17,35-36,45,70,90`.
- `/home/user/fleet/rater/tests/src/core/Rater.test.ts:105,115-119,137` — expected export-name strings.
- `/home/user/scaffold/src`: no hits.

**Writing sweep.** Added prose lines in the diff have no hits for the substitution pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e.g.|i.e.|etc.|please|sanity|dummy|ensure|guarantee)\b`, case-insensitive. The growable count pattern also has no prose hits. `above` occurrences at `conform-qualifier.diff:656,692,1100,1428` are code identifiers or comparison values, not prose.

## Distillate

- qualifier-obj-1: site now `src/core/factories.ts:61,94` | diff present yes | old form hits 0 symbol hits; type-name false positives only | report matches yes
- qualifier-obj-2: site now `tests/setup.ts:24,229,240` | diff present yes | old form hits 0 old callable-form hits | report matches yes
- qualifier-obj-3: site now `tests/src/core/Qualifier.test.ts:35` | diff present yes | old form hits 0 | report matches yes
- qualifier-obj-4: site now `tests/src/core/helpers.test.ts:1-2` | diff present yes | old form hits 0 | report matches yes
- qualifier-obj-5: site now `tests/setup.test.ts:13,52` | diff present yes | old form hits 0 local declarations; 14 unrelated `isRecord` token hits | report matches yes
- qualifier-obj-6: site now `tests/guides.test.ts:188-294` | diff present yes | old form hits 0 | report matches yes
- qualifier-obj-7: site now `tests/setup.ts:37,214` | diff present yes | old form hits 0 local-factory hits | report matches yes
- qualifier-obj-8: site now `tests/src/core/helpers.test.ts:371-393` | diff present yes | old form hits 0 duplicate-block hits | report matches yes
- qualifier-obj-9: site now `tests/setup.test.ts:271-283` | diff present yes | old form hits 0 | report matches yes
- qualifier-obj-10: site now `README.md:20` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-1: site now `src/core/helpers.ts:81,129,163` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-2: site now `src/core/helpers.ts:193,240` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-4: site now `src/core/helpers.ts:448` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-5: site now `src/core/helpers.ts:475-476` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-6: site now `src/core/helpers.ts:219,656; README.md:21` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-7: site now `src/core/types.ts:140-149; factories.ts:16-23; guide:678-681` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-8: site now citations absent; replacement at `guides/README.md:45` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-9: site now `guides/qualifier.md:16-20,458,647-650,719-720` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-10: site now `guides/qualifier.md:239-240` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-11: site now `guides/qualifier.md:790-811` | diff present yes | old form hits 0 | report matches yes
- qualifier-subj-14: site retained at `types.ts:22`, `helpers.ts:326`, `helpers.test.ts:309` | diff present no | old form hits N/A | report matches yes
- fleet-F1: site absent; no browser environment | diff present no | old form hits 0 | report matches yes
- fleet-F2: no matching class | diff present no | old form hits 0 | report matches yes

Scope tags: all 13 status paths are `owned`; no shared or off-limits path appears.

Residue: diff-added-line residue sweep clean; tree has one pre-existing `console.log` in `src/core/Qualifier.ts:94`.

Writing hits: none in added prose lines.

Parity: `QualifierInterface` has `qualify`, `validate`, `destroy` at `src/core/types.ts:197,222,240`; guide rows match at `guides/qualifier.md:384-386`. `emitter` is the readonly data member at `types.ts:161` and the guide Surface row at `:89`. All added public identifiers are exported by `src/core/index.ts:1-7`.

## Unknowns

- The live `git status --short` command was not independently rerun; the supplied status artifact was read and contains only owned paths.
- The report does not provide a row-specific failing-first control for qualifier-obj-8; it is treated as a duplicate-test deletion rather than a behavioral row.
- Gate exit codes are taken from the report and corresponding captured outputs; no gate was rerun in this read-only pass.

## Journal

Leave this line for the driver.

## Deviation

- The report omits the pre-existing `console.log` hit at `src/core/Qualifier.ts:94` from its tree residue listing.
- The supplied status artifact, rather than a refreshed live status command, was used for containment evidence.
- The report’s qualifier-subj-14 location is stale by three lines: the retained `false` arm is at `src/core/helpers.ts:326`, not `:329`.