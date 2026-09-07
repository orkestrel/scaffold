# Brief — `d7n-console-converge-fix` (console's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/console` from the committed tip `10b4f2c` (clean; the final guide head start installed `--no-save` — `dist/src/core/index.js` sha256 `b6dae38c…` — whose compared form drops a link target's `import('./module.js').` part and keeps `Owner#member` whole). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-console-converge-fix/` inside this checkout; your own red-first control on a file you own is yours to plant and reverse.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 15; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice6-audit-verdict.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-console-converge.diff.txt` (the flattened links); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` and its Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row).

## Items

1. **The `examples` binding (C1).** Hoist the mapped `examples` ternary out of the `it` body at `tests/guides.test.ts:258-264` to the examples loop's own scope beside `documented`, matching the pilot's `:209-228` byte for byte.
2. **The links (C2).** Restore every `{@link import('./x.js').Name}` tag the converge diff flattened to a code span inside a description paragraph (read the `-`/`+` pairs in `d7n-console-converge.diff.txt` under `src/**`), and leave the multi-line tags as they are; then `npm run docs -- --to guide` under the installed readers writes each cell as the target's name (`` `SinkInterface` ``, never `import('./types.js').SinkInterface`), and `npx oxfmt --write guides/console.md`. Report the reading of `npm run docs` before and after.
3. **The `Shape` column (C3, Ruling 15).** Every `## Surface` table carrying an `interface` or `type` row heads `Shape` between `Kind` and `Summary` under Ruling 15's one convention sentence; each interface row's data members as bare names with `?`, `plus` its call-signature members by name (read `src/**/types.ts`); each alias's own literal with `\|`; a description that is only a member list is rewritten to state what the type represents, then `--to guide`.
4. **The fence comment (C4).** `guides/console.md:565` "// Both captures buffer through this one engine…" names the members ("// The console capture and the process capture buffer through this one engine…"); the transcription guard in `tests/guides.test.ts` that pins that fence follows.
5. **A typo (C5).** `tests/src/core/helpers.test.ts:706` "failureing" → "failing". That line alone is granted in that file.
6. **The drop-in's text (C6).** `tests/guides.test.ts`: line 2 reads "The constants that follow are this package's own" (Ruling 13 amended); the `INTERNAL` sentence at `:74` reads "the assertion that follows it fails when a name here stops being stranded".
7. **The opening prose (C7).** `guides/console.md:8-9` restates the tagline's backend clause; open the paragraph at "ANSI / SGR escape codes are the default…" and let the tagline carry the split.
8. **Propagation.** `npx oxfmt --write <paths>` after edits; `--to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/console.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`, the one line `tests/src/core/helpers.test.ts:706`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`; `grep -c "import('" guides/console.md` reads 0.
4. The convention sentence once above every table carrying `Shape`; `grep -n '| interface *| `{[^`]*:' guides/console.md` prints nothing; the examples block equals the pilot's (`diff` empty); lines 2 and 74 of the suite equal the amended pilot text.
5. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation (the host is under load; report a timing red with its reading).

## Output

`/home/user/scaffold/tmp/units/d7n-console-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red, a `Shape` cell Ruling 12 cannot express, or a restored link the readers still render with its module part. Decide ancillary matters and record them.
