# Brief — `d7n-reason-converge-fix` (reason's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/reason` from the committed tip `49648b5` (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-reason-converge-fix/` inside this checkout. Your own red-first control on a file you own is yours to plant and reverse (record the reversal); plant nothing for the lint control.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 12, § Ruling 13, § Ruling 15; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-reason-audit-verdict.md`; the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` and its Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row).

## Items

1. **Counts in the compared prose (R1).** Rewrite without the number, at the source block, then `--to guide`: `src/core/types.ts:19` ("the four reasoning strategies"), `:214` ("the four factor sources"), the `SubjectBuilderEventMap` description ("five verb-named events"), `src/core/validators.ts:349`, `:755` and the `@returns` lines at `:92`, `:159`, `:208` ("any of the four factor sources", "any of the four definition shapes"). Name the members or write the sentence without the number (`Names the reasoning strategies — the axis a Definition and a ReasonResult discriminate on`).
2. **All-caps emphasis (R2).** Plain wording, keeping every fact: the doc blocks `src/core/builders/DefinitionBuilder.ts:52-63` (`BRING-YOUR-OWN`, `KIND-FREE`, `TOTAL`, `FRESH`, `SAME`, `LAST`), `src/core/factories.ts:251` (`NO`), `:299` (`BRING-YOUR-OWN`), `:334` (`ANONYMOUS`, `OPTIONAL`), `src/core/helpers.ts:1458` (`DEDUPES`), `src/core/types.ts:75-78` (`BOTH`); the guide's fence comments and cell `guides/reason.md:626` (`ERROR`), `:697` (`DOWN`), `:1009` (`ALL`), `:1041` (`OWN`). Real tokens (`JSON`, `NaN`, the error codes, the `DOC ↔ SOURCE` label) stay. Sweep the whole guide and every owned doc block for a capitalized emphasis word once more (`grep -nE '\b[A-Z]{3,}\b'` and rule each hit).
3. **The drop-in's text (R3).** `tests/guides.test.ts`: line 2 takes the pilot's header verbatim ("The constants below are this package's own"); `:76-78` takes the pilot's `INTERNAL` sentence ("the assertion that follows it fails when a name here stops being stranded"); the hoist comment at `:155` drops the row count ("5192 ms measured on this guide, 2026-09-07"); the collection is named `drifts` and the row `drift` (`for (const drift of drifts)`, `drift.guide`, `drift.source`, `drift.key`), keeping the loop-scope `findDrift` call as the standing condition; the test title at `:355` becomes `§ Quantitative scoring — the operators driven directly`.
4. **The `…` elision (R4).** `SubjectBuilderInterface.set`'s description in `src/core/types.ts` ("`set('id', …)` throws") names the case without the ellipsis ("setting `id` throws, because the id is immutable"), then `--to guide`; the guide body at `:1017` takes the same wording.
5. **The manager `remove` rows (R5).** The description of each manager's `remove` in `src/core/types.ts` (the rows at `guides/reason.md:463`, `:478`, `:492`, `:507`, `:522`, `:537`, `:550`, `:574`) reads as one sentence a reader parses once ("Removes groups: every group with no argument, one group by id, or the groups an id list names; the id forms report whether every named id existed."), each naming its own noun; then `--to guide`.
6. **The `Shape` idiom (R6, Ruling 15).** The `### Types` convention sentence at `guides/reason.md:305` takes Ruling 15's one wording; every interface row's `Shape` cell holds data members as bare names in braces, `?` on an optional one, `plus` its call-signature members by name; every alias row its own literal with `\|`; no member type, no `…`. Read each declaration in `src/core/types.ts`.
7. **The brand fact (R7).** One sentence in the `### Classes` intro at `guides/reason.md:91` names `DefinitionBuilder` and `SubjectBuilder` as brand-carrying (the `SUBJECT_BUILDER_BRAND` and `DEFINITION_BUILDER_BRAND` symbols), outside any compared cell.
8. **Propagation.** `npx oxfmt --write <paths>` after edits; `npm run docs -- --to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/reason.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -nE '\b(four|five|three|two) (reasoning|factor|definition|verb|operators|constants)' guides/reason.md src/core/*.ts tests/guides.test.ts` prints nothing; the convention sentence once above `### Types`; `grep -n '| interface *| `{[^`]*:' guides/reason.md` and `grep -n '…' guides/reason.md` print nothing in a `Shape` cell.
5. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` is empty; the `INTERNAL` sentence equals the pilot's.
6. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7n-reason-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No count in prose. No process diary. Re-read every citation against the tree you leave.

## Deviation contract

Stop on a gate outside the owned files going red or a `Shape` cell Ruling 12 cannot express. Decide ancillary matters (which plain word replaces a capitalized one) and record them.
