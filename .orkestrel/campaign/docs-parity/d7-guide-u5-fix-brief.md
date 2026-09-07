# Brief — `d7-guide-u5-fix` (the audit's findings on U5 and the links fix)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/guide` from the committed tip `7c60ea1` (clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7-guide-u5-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Design laws (no nested functions, no superfluous wrappers) and § Writing; `/home/user/scaffold/.claude/rules/tests.md` § Shared test infrastructure; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-guide-u5-links-audit-verdict.md` and the lanes it names; `src/core/helpers.ts:1213-1330` and `:1715-1780`, `src/core/sources/Source.ts:40-160` and `:300-340`, `src/core/types.ts:485-510`, `guides/guide.md:40-60`, `:225-245`, `:355-380`, `:440-475`, `tests/src/core/sources/Source.test.ts:1170-1230`, `tests/src/core/helpers.test.ts:1640-1665`, `tests/setup.ts`.

## Items

1. **The wrapper's reason (G1).** `extractDeclaration`'s `@remarks` (`src/core/helpers.ts:1301-1316`) states why it stays: it owns the `${keyword} ${name}` key convention over `collectDeclarations`'s map, so a one-name consumer never spells the key; a consumer reading many names from one file calls `collectDeclarations` once.
2. **The false amortization claim (G2).** `guides/guide.md:467` ("`extractDeclaration` is the named lookup over that map, so a caller reading many names from one file projects it once rather than once per name") and the elliptical clause at `src/core/helpers.ts:1303-1304` say the opposite of the code (`extractDeclaration` calls `collectDeclarations` afresh on every call). Rewrite both to attribute the single projection to `collectDeclarations` and to `Source`, and let the guide cell follow through `npm run docs -- --to guide` where the description paragraph changed.
3. **The nested assignments (G3).** `tests/src/core/sources/Source.test.ts:1180` (`const declare = (member) => …`) and `:1194` (`const read = (source) => ({ … })`) move out of the `it` body: export module-helper builders from `tests/setup.ts` under `{verb}{Noun}` names (for example `buildStoreSource(member: string): string` and `readStoreReadings(source: SourceInterface)`), with doc blocks in the repository's voice, and import them; the `it` body keeps the assertions alone.
4. **The compared-form list (G4).** `guides/guide.md:362-372`: the bullet at `:364` names a package or path token ("a package or path token, one carrying `@` or `/`"), and a new bullet beside it states that `{@link Owner#member}` and `{@link #member}` travel whole (a `#` that no `@` or `/` precedes is JSDoc's member reference), ending ", outside a located span." as its neighbours do; `normalizeSummary`'s description paragraph stays as it is unless a clause there must move.
5. **One memo sentence (G5).** `guides/guide.md:234` and `:237-241` state the memoization twice in two vocabularies; keep one derive-once sentence covering every reading, with `:234`'s dedup and sort facts kept and its caching clause dropped. Where the sentence is a description paragraph's cell, change the block and `--to guide`.
6. **The wrap (G6).** Re-wrap whole the paragraphs at `guides/guide.md:467-468` and `:240-241` to the file's prose wrap (about 100 columns, as their neighbours), and the doc block at `src/core/sources/Source.ts:52-53` to its block's wrap (about 72 columns). `oxfmt` reflows neither; do it by hand.
7. **The locator references (G7).** `src/core/types.ts:495` and `:505` ("see `extractDeclaration`") and `guides/guide.md:50-51` point at `collectDeclarations`, which owns the head grammar, the body window, and the base reading. In `src/core/types.ts` those two doc-block references are the only edit permitted; no type changes.
8. **The test's name (G8).** `tests/src/core/helpers.test.ts:1648` is named for a property its assertions do not prove ("reads each file once however many names a caller looks up"); rename it for what it asserts (an absent and a metacharacter-carrying key answer with no entry, and `extractDeclaration` answers with the same record).
9. **Propagation.** `npx oxfmt --write <paths>`; `npm run build`; `npm run docs -- --to guide` where a description changed, then `npx oxfmt --write guides/guide.md`; `npm run docs` at `rows read: 1, disagreements found: 0`.

## Scope

Owned: `src/core/helpers.ts` (doc blocks), `src/core/sources/Source.ts` (doc blocks), `src/core/types.ts` (the two references in item 7 only), `guides/guide.md`, `tests/setup.ts`, `tests/src/core/sources/Source.test.ts`, `tests/src/core/helpers.test.ts`. Off-limits: everything else; no code token moves in `src/**`; the version stays `0.0.18`; `package.json` and the lockfile untouched.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `grep -nE '^\t+const [a-zA-Z]+ = \(' tests/src/core/sources/Source.test.ts` prints nothing; `grep -c 'travel whole' guides/guide.md` reads at least 1; `grep -n 'projects it once rather than once per name' guides/guide.md src/core/helpers.ts` prints nothing.
3. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
4. `npm run build` then `npm run docs` exit 0 at `disagreements found: 0`.
5. `npm run test:src:core`, `npm run test:guides`, `npm run test:policy` exit 0 (record the summaries).

## Output

`/home/user/scaffold/tmp/units/d7-guide-u5-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or an item that needs a type or a code token to move. Decide ancillary matters (the builders' exact names) and record them.
