# Brief — `d7n-queue-converge-fix` (queue's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/queue` from the committed tip `bb89ae0` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-queue-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 6, § Ruling 7, § Ruling 13 and its amendments, § Ruling 20, § Ruling 21; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-queue-audit-verdict.md` (items Q1 to Q8); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-queue-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-queue-close-brief.md` (the closing generator's lists); the pilot's guard table `/home/user/fleet/abort/guides/abort.md:46-52`, its Methods preamble `:69`, its README `/home/user/fleet/abort/README.md:3-10`, and its suite `/home/user/fleet/abort/tests/guides.test.ts:1-3`.

## Items

1. **The Guards table (Q1, Ruling 20).** `guides/queue.md:88-97` heads `| API | Kind | Shape | Summary |` with `QueueError`, `number`, `number`, `number`, `AbortSignal`, `StoredEntry<unknown>` (read the predicates at `src/core/errors.ts:48` and `src/core/validators.ts:17`, `:33`, `:51`, `:68`, `:98`) under "In a guard table a `Shape` cell holds the type the guard narrows to." between the heading's prose and the table.
2. **`QueueErrorContext`'s clause (Q2, Ruling 7).** `src/core/types.ts:32-39` gains an `@remarks` naming `option` as a `QueueOption` and `operation` as the store call that failed; the cell stays.
3. **One convention, one home (Q3).** `guides/queue.md:131` takes the pilot's sentence naming the members ("The `emitter`, `count`, `active`, `paused`, and `stopped` members of `QueueInterface` are `readonly` data members (Surface rows, earlier) — its call-signature methods are documented under [Methods](#methods)."); the parenthetical at `:135` goes.
4. **The README's onboarding (Q4, Ruling 6).** `README.md:7` reads "and await each input's result." rather than echoing the tagline's "hands back"; the pitch stays equal to the tagline.
5. **The header and the closing items (Q5, Q6, Rulings 13 and 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's; the region from `const root = ` through the manifest loop's closing brace equals the pilot's (the closing brief's diff shows the current state); one complete sentence before each fence at `guides/queue.md:245` (the titled fence, outside the fence), `:266`, `:278`, `:288`, `:300`, `:312`, and after the tables at `:99` and `:124`, and at any other fence the closing brief lists.
6. **`BROAD` (Q7).** `src/core/factories.ts:96` reads `// runs on the broad ContractShape`.
7. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/queue.md`, `README.md`, the doc blocks under `src/core/**` and the one comment item 6 names (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/queue.md README.md tests/guides.test.ts src/core`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c 'In a guard table' guides/queue.md` reads 1 and `grep -n '^| API *| Kind *| Shape *| Summary' guides/queue.md` lists the Guards table; `grep -c 'QueueOption' src/core/types.ts` reads at least 2; `grep -c 'stay Surface rows' guides/queue.md` reads 0; `grep -c 'hands back' README.md` reads 1 (the tagline alone); `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `grep -c 'BROAD' src/core/factories.ts` reads 0; `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/queue.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-queue-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a cell Ruling 12 cannot express. Decide ancillary matters (the lead-in sentences) and record them.
