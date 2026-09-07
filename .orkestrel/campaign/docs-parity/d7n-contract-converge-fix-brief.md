# Brief — `d7n-contract-converge-fix` (contract's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/contract` from the committed tip `796e893` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` as the head start). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument you write under `tmp/d7n-contract-converge-fix/` inside this checkout, never under the session scratchpad.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 11, § Ruling 12, § Ruling 13, § Ruling 14, § Ruling 15; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-contract-audit-verdict.md` (the findings this round carries, each numbered there); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole.

## Items, each named for the verdict's finding

1. **The pin's canon form (C1).** Replace the pin's `map`/`filter` form at `tests/guides.test.ts:97-99` with the pilot's guard-and-continue loop (`/home/user/fleet/abort/tests/guides.test.ts:72-95`), so the file matches the pilot byte for byte outside its constants block and the equality case's `30_000` budget (Ruling 13; the budget is a standing condition, item 10). Show the diff of that block against the pilot in the report.
2. **The guard table's `Shape` cells (C2).** `guides/contract.md:115-127`: the rows `isGeneratorFunction`, `isAsyncGeneratorFunction`, `isZeroArgGenerator`, `isZeroArgAsyncGenerator` hold prose; write the narrowed type each declaration carries (`src/core/validators.ts:1144-1146`, `:1161-1163`, `:1193-1195`, `:1210-1212`), a union's arms escaped as `\|`. The guard table's convention sentence at `:28` stays.
3. **Ruling 12 in every interface row (C3).** Sweep every `Shape` cell of an `interface` row in `guides/contract.md` (`grep -n '| interface *| `{' guides/contract.md`) and rewrite each that spells a member's type to bare names: `:299` `{ success: false, error: E }` → `{ success, error }`; `:320` `{ success: true, value: T }` → `{ success, value }`; the `### Shape types` rows `:480-491` — `{ category, min?, max?, pattern?, description? }` and so on, reading each interface in `src/core/types.ts` for the members the `…` elided, so no `…` remains (`.claude/rules/writing.md` § Examples). Call-signature members follow `plus` (Ruling 15). The convention sentences at `:507` and `:697` take Ruling 15's one wording, the resolver clause at `:697` kept as a second sentence.
4. **The cloner pairs (C4).** `JSONClonerInterface` (`src/core/types.ts:368`), `SchemaClonerInterface` (`:397`), `ShapeClonerInterface` (`:446`): rewrite each description paragraph to state the contract the interface defines rather than the state its class owns, the way `ShapeValidator` and `ShapeValidatorInterface` (`guides/contract.md:514-515`) already differ; then `npm run docs -- --to guide` carries the cells.
5. **The `isArray` remark (C5).** Move the `@remarks` at `src/core/validators.ts:505-509` ("Checks the container alone — no element is inspected. Use {@link arrayOf} …") to the `isArray` block at `:705`; give `isArrayBuffer` no remark, or one that is true of an `ArrayBuffer`.
6. **Counts and all-caps the unit authored (C6).** `guides/contract.md:329`: delete the line (the pilot's `### Classes` table has no introduction) or write the complete sentence "`ContractError` is documented in full under its own heading following this table."; `:534` drop "seven"; `:540-541` "IS" → plain wording, keeping "by identity rather than as a copy"; `:162` "The one bound the combinators carry" → recast without the count; `:929` "SUCCESSFUL" → plain; `src/core/combinators.ts:971` "CALLABLE", `:1017` "SEPARATELY"; `src/core/helpers.ts:1245` "MODULE BINDING", `:1314` "SOURCE"; `src/core/types.ts:1493` "OWN" → plain wording. Where the `@remarks` at `src/core/types.ts:1675-1682` carries the same count or caps as `:534-541`, fix that copy too. All-caps that predate the converge unit stay (a fleet question, not this round's).
7. **A voice rewrite that shifted a subject (C7).** `tests/setup.ts`, the class whose description reads "Carries one hostile RegExp scalar population on a type-correct string shape." → "Represents a type-correct string shape carrying one hostile RegExp scalar population." (its sibling `SingleReadPattern`'s form). Own that doc block alone in that file.
8. **The titled fence's value claims, executed (C8).** Beside the flagship cases at `tests/guides.test.ts:381-449`, add a case that builds the contract the `Compiling a contract` fence builds and asserts the readings its comments claim (`user.parse({ name: '', age: 36 })` → `undefined`; the `explain` fault's `constraint`, `limit`, `received`), keeping the presence guard. Where a claim proves false, Ruling 14 governs: the fence and the block both change to the true reading, and the report names it.
9. **Propagation.** After every doc-block edit: `npx oxfmt --write <paths>`; `npm run docs -- --to guide`; `npx oxfmt --write guides/contract.md`; `npm run docs` at `rows read: 1, disagreements found: 0`, and both write directions at `written: 0`.
10. **Standing condition.** The equality case's `30_000` budget stays: the reader's cost fix (U5) is committed in the guide checkout but not installed here, and the closing sweep removes the budget after re-installing the head start. Do not touch it.

## Scope

Owned: `guides/contract.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`, the one doc block in `tests/setup.ts` item 7 names. Off-limits: everything else, including `README.md`, every vendored file (`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `configs/**`, `scripts/docs.ts`), `package.json`, `package-lock.json`, `tests/src/**`, `src/core/**` code outside doc blocks.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>` exit 0; `npm run check` exit 0.
3. `npm run docs` → `rows read: 1, disagreements found: 0`, exit 0; `-- --to guide` and `-- --to source` at `written: 0`.
4. No `…` in a `Shape` cell; no `interface` row's `Shape` cell carries `:` (`grep -n '| interface *| `{[^`]*:' guides/contract.md` prints nothing).
5. The pin block equals the pilot's (`diff <(sed -n 72,95p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n <your lines> tests/guides.test.ts)` empty).
6. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); item 8's case red-first against a planted wrong expectation, then green (record both lines, remove the plant).

## Output

`/home/user/scaffold/tmp/units/d7n-contract-converge-fix-report.md`: per item the hunk or the diff, per criterion the command and its last lines, the wall clock. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop on: a gate outside the owned files going red; a `Shape` cell Ruling 12 cannot express (report the row); a fence claim that proves false and needs a code change rather than a prose change. Decide ancillary matters (which plain word replaces a capitalized one) and record them.
