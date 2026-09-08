# Brief — `d7n-toolbox-converge-fix` (toolbox's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/toolbox` from the committed tip `d4c724d` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-toolbox-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 15, § Ruling 18, § Ruling 19, § Ruling 20, § Ruling 21, § Ruling 25, § Ruling 26; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-toolbox-audit-verdict.md` (items T1 to T7) and the two reviewer lanes it names; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-toolbox-converge-report.md`; `/home/user/fleet/brief/guides/brief.md` § Shapers (the Ruling 25 form, landed); `/home/user/fleet/abort/guides/guide.md` (function rows carrying their signature in `Shape`, the Ruling 26 form).

## Items

1. **The lowercase `note` (T1).** `guides/toolbox.md` Contract invariant 7 (about line 312) reads "… in-memory default. note the deliberate `store` divergence from invariant 6: …"; recast off the pointer imperative: "The `store` slot deliberately diverges from invariant 6: …". The fence comments at about `:948` and `:985` ("// note: …") start with a capital.
2. **The tallies (T2).** `guides/toolbox.md:79` "the ancestry tags shared by both delegating tools" names the members ("the ancestry tags `createAgentTool` and `createAgentFunction` share"); `:344` "Both factories' inferred schemas …" names them too. Where the sentence sits in a compared cell, edit the doc block and run `--to guide`.
3. **The heading (T3).** `### Lifecycle classes` (about `:47`) stands over one `DatabaseResolver` row whose summary describes resolution and caching; rename it `### Resolvers`. Update any link or sentence naming the heading.
4. **The `### Shapes` table (T4, Rulings 18 and 25).** Its rows are `const` shape values, so the table heads `Shape` under "A `Shape` cell holds the constant's declared type." placed between the section's prose and the table. Each cell holds the declared type in Ruling 25's form: an `objectShape(...)` value holds `ObjectShape<{ members }>` with the property record in bare-member form in declaration order and `?` on an optional property; a `unionShape(...)` value holds `UnionShape<[Member, Member]>` naming each arm's shape value (or, where an arm is an inline object shape, its bare-member record); a `literalShape([...])` value holds `LiteralShape<'a' \| 'b'>` with the literals; any other shape kind holds its declared generic's name with its argument in the same spirit. Read the outer generic names from `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` (`objectShape` returns `ObjectShape<P, A>`, `stringShape` returns `StringShape`; read `unionShape` and `literalShape` there). Record the form you chose for each kind. Move no `API`, `Kind`, or `Summary` cell.
5. **`createTerminalRoutes`'s `Shape` cell and the mixed table's sentences (T5, Rulings 20, 21, and 26).** The `### Server routes` table's empty cell holds the signature `(manager: TerminalManagerInterface, options?: TerminalRoutesOptions) => readonly TerminalRoute[]` (read it from `src/server/factories.ts`). The table's convention text (about `:234`) becomes: the Ruling 15 interface sentence, then "A function row's `Shape` cell holds its signature, and a guard row's the type it narrows to.", then the exact constants sentence "A `Shape` cell holds the constant's declared type." — the "In a constants row …" variant is struck.
6. **The section comments (T6).** The `//` comments at `src/core/types.ts:26,33,35-40`, `src/core/helpers.ts:117-123`, `src/core/shapers.ts:56-57`, `src/core/factories.ts:486-501,600,616-617,1056`, and `src/core/errors.ts:7,11` lower their all-caps emphasis keeping each sentence's contrast, and drop their counts ("the six required `id`/`name` strings", "the six identity strings" name the members or recast). Then `grep -rnE '\b[A-Z]{3,}\b' src guides/toolbox.md README.md` is ruled hit by hit in the report: the pattern, the paths, and every permitted hit (acronyms, HTTP vocabulary, error codes, code literals, filenames, placeholders).
7. **The test infrastructure openers (T7).** `tests/setup.ts:170` opens "Represents one recorded `generate` / `stream` call on a `ScriptedProvider`." and `:187` "Represents the minimal shape a `ScriptedProvider` fixture exposes — a scripted `ProviderInterface` plus its `started` call count and recorded `calls`." (write the pair with `or` in place of `/`).
8. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/toolbox.md`, `README.md`, the doc blocks and `//` comments under `src/**` (no code token moves), `tests/setup.ts` (its doc blocks only), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setupPolicy.ts`, `tests/setupServer.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src tests/setup.ts | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/toolbox.md README.md tests/guides.test.ts tests/setup.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts tests/setup.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -n '\. note ' guides/toolbox.md` and `grep -n '// note:' guides/toolbox.md` print nothing; `grep -nE '\bboth delegating tools\b|^Both factories' guides/toolbox.md` prints nothing; `grep -c '^### Resolvers' guides/toolbox.md` reads 1 and `grep -c 'Lifecycle classes' guides/toolbox.md` reads 0; `grep -c "A \`Shape\` cell holds the constant's declared type." guides/toolbox.md` reads 3 (Shapes, Constants, Server routes) and `grep -c 'In a constants row' guides/toolbox.md` reads 0; `grep -c "A function row's \`Shape\` cell holds its signature" guides/toolbox.md` reads 1; `grep -nE '^\| \`[^\`]+\` +\| (function|const) +\| +\| ' guides/toolbox.md` prints nothing (no empty `Shape` cell); `grep -nE 'the six (required|identity)' src/core/types.ts src/core/helpers.ts` prints nothing; `grep -n '^ \* Records one\|^ \* Exposes' tests/setup.ts` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides`, `npm run test:policy`, and `npm run test:setup` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-toolbox-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the ruled grep, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a `Shape` cell Ruling 25 cannot express (name the shape kind and its declared type), or a residual disagreement `--to guide` does not clear. Decide ancillary matters (exact wording of recast sentences, the union and literal cell forms) and record them.
