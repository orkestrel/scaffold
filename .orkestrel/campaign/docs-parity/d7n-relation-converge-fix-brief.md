# Brief — `d7n-relation-converge-fix` (relation's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/relation` from the committed tip `6ab44aa` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-relation-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing and § Design laws (one concept, one term); `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 6, § Ruling 13 and its amendments, § Ruling 14, § Ruling 15, § Ruling 21; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-relation-audit-verdict.md` (items RL1 to RL8); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-relation-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-relation-close-brief.md` (the closing generator's lists); the pilot's guide `/home/user/fleet/abort/guides/abort.md:1-8` and suite `/home/user/fleet/abort/tests/guides.test.ts:1-3`; `/home/user/fleet/browser/guides/browser.md:221` and `:240` (the extended-interface sentence and a cell).

## Items

1. **The tagline (RL1, Ruling 6).** `guides/relation.md:3-6` and `README.md:3-6` read one nominal noun phrase throughout, identical in both files with the same breaks (for example "> A small, declarative ORM layer over the `@orkestrel/database` tables: a table's / > relations named once, then records loaded or found with their related rows already / > attached, batched so a direct relation costs one query across the whole record set and / > a `through` relation two."); no code token as an English verb; `npm run test:guides` keeps the pitch case green.
2. **`FindOptions`'s cell (RL2, Ruling 21).** `guides/relation.md:102` reads `OperationOptions plus { limit?, offset?, sort?, direction? }` (read `src/core/types.ts:238`); the `### Types` sentence at `:82` gains "An extended interface's name comes before `plus`, with the members it adds after."; rule every other `extends` declaration the closing brief lists the same way.
3. **One term for the foreign key (RL3).** `guides/relation.md:190`'s column header reads `Foreign key location`; the fence comments at `:21`, `:167`, and `README.md:45` read `// foreign key on accounts` (where a fence is the titled pair's guide side, the block's body changes with it so the pair stays equal); the prose keeps "foreign key".
4. **The half-swept prose (RL4).** `src/core/types.ts:26-30`, `:135`, `:154`, `:254-261`, `src/core/helpers.ts:305`, `:336`, and the comments at `src/core/Model.ts:218` and `:325`: `THIS table` and `RELATED table` become "the owning table" and "the related table", `NAME`, `COUNT`, `AFTER` lowered keeping the contrast; then `--to guide`. Close with `grep -rnE '\b[A-Z]{3,}\b' src guides/relation.md README.md` ruled hit by hit (`ORM`, `FK` where it survives as a code token, `API`, `CRUD`, error codes stay); state the pattern, the paths, and the permitted hits.
5. **The header (RL5, Ruling 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's; the region from `const root = ` through the manifest loop's closing brace equals the pilot's (the closing brief's diff shows the current state).
6. **The titled fence's lead-in (RL6, Ruling 21).** One complete sentence between `### Defining relations` (`guides/relation.md:151`) and its fence, outside the fence so the pair stays equal; the same at any other fence the closing brief lists.
7. **The `Returns` chrome (RL7).** `guides/relation.md:118`'s `Returns` cell drops "(or array)"; the `Summary` already spells both forms.
8. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/relation.md`, `README.md`, the doc blocks and the `//` comments item 4 names under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/relation.md README.md tests/guides.test.ts src/core/types.ts src/core/helpers.ts src/core/Model.ts src/core/factories.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `diff <(sed -n 3,6p guides/relation.md) <(sed -n 3,6p README.md)` prints nothing and neither carries "then `load` / `find`"; `grep -c 'OperationOptions plus' guides/relation.md` reads 1 and `grep -c "An extended interface's name comes before" guides/relation.md` reads 1; `grep -n 'FK location\|// FK' guides/relation.md README.md` prints nothing; `grep -nE '\b(THIS|RELATED|NAME|COUNT|AFTER)\b' src/core/types.ts src/core/helpers.ts src/core/Model.ts` prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `grep -c '(or array)' guides/relation.md` reads 0; `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/relation.md README.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-relation-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a cell Ruling 12 cannot express. Decide ancillary matters (the tagline's exact breaks, the lead-in sentence) and record them.
