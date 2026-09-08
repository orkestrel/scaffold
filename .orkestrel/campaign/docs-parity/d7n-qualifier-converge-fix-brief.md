# Brief — `d7n-qualifier-converge-fix` (qualifier's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/qualifier` from the committed tip `a5764d6` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-qualifier-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/names.md` (the `build*` and `create*` meanings); `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 13, § Ruling 14, § Ruling 18, § Ruling 20, § Ruling 21, § Ruling 25, § Ruling 26, § Ruling 27, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-qualifier-audit-verdict.md` (items QF1 to QF9) and the two reviewer lanes it names; `/home/user/scaffold/tmp/units/d7n-qualifier-close-brief.md`; `/home/user/fleet/rater/README.md` (the onboarding sentence linking `@orkestrel/reason`); the pilot `/home/user/fleet/abort/tests/guides.test.ts`.

## Items

1. **All-caps emphasis (QF1).** `src/core/factories.ts:17` (`OWNS`), `src/core/Qualifier.ts:49` (`OWNED`), `src/core/helpers.ts:39` (`ONE`), `:42` (`UNRESOLVED`), `:114` (`NOT`), `:144` (`BOTH`), `:217` (`EMPTY`), `:413` (`SAME`), and any other emphasis `grep -rnE '\b[A-Z]{3,}\b' src guides/qualifier.md README.md` finds outside a code token, lowered keeping each sentence's contrast; then `--to guide` where a description moved (`renderPremise`, `interpolateMessage`); the grep ruled hit by hit in the report.
2. **The lead-in (QF2, Ruling 21).** One complete sentence between `#### Create a qualifier` (about `guides/qualifier.md:344`) and its fence, naming what the fence demonstrates beyond the quickstart (see item 5).
3. **The guard sentence (QF3, Ruling 27).** At about `guides/qualifier.md:150` the interface sentence in front of "In a guard table a `Shape` cell holds the type the guard narrows to." is struck.
4. **`createRuling` (QF4).** `src/core/factories.ts:90`'s description opens "Creates a fresh `Ruling` …" (the factory family's verb), distinct from the `Ruling` interface row by what follows the verb; then `--to guide`.
5. **The titled demonstration (QF5, Ruling 14).** The titled fence (about `guides/qualifier.md:346-365`) and its `@example` block show what the factory family adds over the `## Surface` quickstart — the optional `rulings` and `message` inputs and the fresh-value, absent-key contract the table's summaries claim — extended on both sides in one change so the pair stays equal, with the item 2 lead-in naming that difference. Delete nothing from either side.
6. **The header (QF6, Ruling 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's byte for byte; confirm the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own cases appended.
7. **The stranded literal (QF7, Ruling 18).** `src/core/constants.ts` (about `:387-388`): "Names `'qualification'`, the reserved internal projection namespace a pass's working projection is written under."; then `--to guide`.
8. **The README's route (QF8).** `README.md`'s onboarding paragraph links `@orkestrel/reason`'s repository the way `/home/user/fleet/rater/README.md`'s onboarding sentence does; the pitch blockquote stays a plain noun phrase.
9. **The closing items (QF9, Rulings 13, 20, 21, 25, 26, 28).** Every item `d7n-qualifier-close-brief.md` lists: the `Shape` idiom where a table lacks it (a table of `const` rows heads `Shape` under the constants sentence; a function row in a table carrying `Shape` holds its signature, a guard row the type it narrows to, a class row the interface it implements, with the Ruling 26 and 28 sentences added where such rows sit); `#` links; a lead-in sentence before every fence directly under a heading.
10. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/qualifier.md`, `README.md`, the doc blocks under `src/**` (no code token moves) and the fence lines item 5 names in the titled `@example`, `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/qualifier.md README.md tests/guides.test.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -rnE '\b(OWNS|OWNED|UNRESOLVED|EMPTY|SAME)\b' src` prints nothing; `grep -c 'In a guard table' guides/qualifier.md` reads 1 and `grep -B1 'In a guard table' guides/qualifier.md | grep -c "an interface's data members"` reads 0 (the sentences on separate lines or the interface sentence gone); `grep -c 'Builds a fresh' src/core/factories.ts guides/qualifier.md` reads 0 for each; `grep -c "Names \`'qualification'\`" src/core/constants.ts` reads 1; `grep -c 'orkestrel/reason' README.md` reads at least 2; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/qualifier.md` prints nothing; `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/qualifier.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-qualifier-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the ruled grep, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a titled-pair extension that cannot keep the pair equal. Decide ancillary matters (the exact wording, the demonstration's lines) and record them.
