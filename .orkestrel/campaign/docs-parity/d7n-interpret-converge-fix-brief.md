# Brief — `d7n-interpret-converge-fix` (interpret's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/interpret` from the committed tip `a0303e5` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-interpret-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 9, § Ruling 13 and its amendments, § Ruling 20, § Ruling 21; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-interpret-audit-verdict.md` (items IN1 to IN10); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-interpret-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-interpret-close-brief.md` (the closing generator's lists); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts:1-3` and guide `/home/user/fleet/abort/guides/abort.md:60-72`.

## Items

1. **The owned prose (IN1).** `guides/interpret.md:910-911` reads "`clear()` resets the history, the subject registry, and the definition registry without tearing the context down."; `:219` "Two postures, split by who produces the value." becomes "The posture splits by who produces the value."
2. **All-caps in `@remarks` (IN2).** Lower the emphasis at `src/core/Interpret.ts:49`, `:58`, `:60`, `:69`; `src/core/Narrator.ts:14-15`; `src/core/managers/SubjectManager.ts:23`; `src/core/types.ts:105`, `:587`, `:1074`, `:1088`; `src/core/InterpretContext.ts:29`; `src/core/helpers.ts:51`; `src/core/stages/Clarifier.ts:40`, keeping each sentence's contrast (`src/core/validators.ts:343` `'UNKNOWN'` is a code literal and stays). Close with `grep -rnE '\b[A-Z]{3,}\b' src guides/interpret.md README.md` ruled hit by hit; state the pattern, the paths, and the permitted hits.
3. **The titled fence's lead-in (IN3, Ruling 21).** `guides/interpret.md:22-27`: the § Surface lead-in ends with a full stop or moves below `### Interpret text against an added template`; one complete sentence sits between that heading and the fence, outside the fence so the pair stays equal.
4. **The header and the closing items (IN4, Rulings 13 and 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's; the region from `const root = ` through the manifest loop's closing brace equals the pilot's (the closing brief's diff shows the current state); a lead-in sentence before every fence the closing brief lists.
5. **The `destroy` cells (IN5).** Each `destroy` declaration's description names its entity ("Tears the template registry down idempotently — …", the subject registry, the definition registry, the narrator); then `--to guide`.
6. **The pipeline stated twice (IN6, Ruling 7).** `src/core/Interpret.ts:43-52`: the `@remarks` drops the pipeline clause the description carries and keeps "returns its `Interpretation` directly, never a `Promise` — each phase producing one `StageRecord`".
7. **Slash pairs (IN7).** `src/core/types.ts`'s options descriptions read "for `createNarrator` and the `Narrator` constructor" and the like; `guides/interpret.md:531-534`'s list spells `session`, `subjects`, and `definitions` with `and`; then `--to guide`.
8. **The specifier (IN8).** The untitled `@example` blocks in `src/core/factories.ts` import `@orkestrel/interpret`, the published specifier the titled block imports, or the split is recorded as deliberate in the report with its reason.
9. **The Validators intro (IN9).** `guides/interpret.md:225`: each exact-posture guard's description in `src/core/validators.ts` names its posture ("Determines … as an exact record" or the package's own phrase) so every row's `Summary` names the posture and the sentence stays true; or the sentence reads what shipped ("A `Summary` naming an open result record holds the result posture; every other guard is exact."). Choose the first where it reads well; then `--to guide`.
10. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/interpret.md`, `README.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/interpret.md README.md tests/guides.test.ts src/core`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -n 'WITHOUT\|both registries\|Two postures' guides/interpret.md` prints nothing; `grep -rnE '\b(SYNCHRONOUS|INCOMPLETE|THROW|LAST|DATA|OVER|ONLY|KNOWN|WITHOUT|ANY)\b' src/core --include=*.ts` prints nothing outside a code literal; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `grep -c ' / the `Narrator` constructor' src/core/types.ts guides/interpret.md` reads 0; `grep -n 'Tears the template registry\|Tears the subject registry\|Tears the definition registry' guides/interpret.md` prints the three rows (or the entity-naming forms you chose); `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/interpret.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-interpret-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a pair the block cannot hold. Decide ancillary matters (the lead-in sentences, the exact descriptions) and record them.
