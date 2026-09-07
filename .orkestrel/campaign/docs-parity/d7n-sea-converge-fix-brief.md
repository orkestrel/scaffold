# Brief — `d7n-sea-converge-fix` (sea's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/sea` from the committed tip `2b94a78` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-sea-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Structure; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendments, § Ruling 15, § Ruling 20, § Ruling 21; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-sea-audit-verdict.md` (items S1 to S8); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-sea-converge-report.md`; the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole (its header lines 1 to 3 and its `INTERNAL` block are the canon) and its guide `/home/user/fleet/abort/guides/abort.md:1-30` (the H1, the lead-in sentence before the titled fence); `/home/user/fleet/browser/guides/browser.md:221-222` and `:240` (the extended-interface sentence and a row).

## Items

1. **All-caps emphasis (S1).** Lower the emphasis at `src/server/types.ts:476` (`LAST`), `:480` (`HOST`), `:493` (`SENSITIVE`), `:501` (`ONE`) and `src/server/helpers.ts:618` (`EXACTLY ONE`), `:624` (`NEVER`), `:752` (`BOTH`) to the word each sentence carries, keeping the contrast; then `npm run docs -- --to guide` where a description paragraph changed. Close with `grep -nE '\b[A-Z]{3,}\b' guides/sea.md src/server/*.ts src/server/**/*.ts` ruled hit by hit (real tokens — `SEA`, `PE`, `ELF`, `NUL`, `UTF-8`, opcode names — stay); state the pattern, the paths, and the permitted hits in the report.
2. **`execute`'s failure clause (S2, Ruling 21).** `src/server/types.ts:551` `SEAInterface.execute` gains `@throws SEAError` naming the coded failure and pointing at `SEAErrorCode`; the description paragraph stays, so the cell stays equal.
3. **Fence lead-ins (S3, Ruling 21).** One complete sentence between each heading and its fence at `guides/sea.md:12`, `:233`, `:250`, `:272` (the titled fence's sentence names what the demonstration builds, the way `/home/user/fleet/abort/guides/abort.md:19` does), and at any other fence that sits directly under a heading (`awk` over the guide: a heading, a blank line, then a fence).
4. **The Methods preamble (S4).** `guides/sea.md:198` reads to the effect of "A `readonly` data member stays in the interface's `Shape` cell and off these tables: `format` on `InjectorInterface`, `emitter` and `status` on `SEAInterface`, `emitter` and `count` on `AssetManagerInterface`." — read each interface in `src/server/types.ts` and name the members it declares.
5. **The H1 (S5).** `guides/sea.md:1` reads `# SEA`; the tagline keeps the expansion. Check `guides/README.md`'s manifest row and `tests/guides.test.ts` for a reader of the H1 text before changing it (the manifest's `concept` column is what the drop-in reads; the H1 is not).
6. **The extended interface's cell (S6, Ruling 21).** `guides/sea.md:161`'s `SEACompressionOptions` row reads `SEABrotliOptions plus { paths }`; the table's convention sentence gains "An extended interface's name comes before `plus`, with the members it adds after." after Ruling 15's sentence. Read every `extends` in `src/server/types.ts` (`grep -n 'extends' src/server/types.ts`) and give each extended interface's row the same form.
7. **The drop-in's header and `INTERNAL` sentence (S7, Rulings 13 and 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's lines 1 to 3 byte for byte (the `sea.md fences` sentence is struck: the canon's "as is the executed section that closes the file" covers it); the `INTERNAL` block's doc comment carries the pilot's sentence "the assertion that follows it fails when a name here stops being stranded" in the pilot's wording (`grep -n 'stranded' /home/user/fleet/abort/tests/guides.test.ts`). The region from `const root = ` through the manifest loop's closing brace already equals the pilot's; keep it so.
8. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/sea.md`, the doc blocks under `src/server/**` (no code token moves), `tests/guides.test.ts` (the header comment and the `INTERNAL` block's comment alone). Off-limits: everything else, including `README.md`, `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/sea.md tests/guides.test.ts src/server/types.ts src/server/helpers.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings src/server tests/guides.test.ts`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -nE '\b(LAST|HOST|SENSITIVE|ONE|EXACTLY|NEVER|BOTH)\b' src/server/types.ts src/server/helpers.ts` prints nothing; `grep -c '@throws SEAError' src/server/types.ts` reads at least 1; `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/sea.md` prints nothing; `sed -n 1p guides/sea.md` reads `# SEA`; `grep -c 'SEABrotliOptions plus { paths }' guides/sea.md` reads 1; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `grep -c 'stops being stranded' tests/guides.test.ts` reads 1.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:server` as an observation (the host is under load; report a timing red with its reading, do not diagnose it).

## Output

`/home/user/scaffold/tmp/units/d7n-sea-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the all-caps sweep's pattern, paths, and permitted hits, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red, a cell Ruling 12 cannot express, or a reader of the H1 text outside the owned files. Decide ancillary matters (the exact lead-in sentences) and record them.
