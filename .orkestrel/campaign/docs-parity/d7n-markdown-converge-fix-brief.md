# Brief — `d7n-markdown-converge-fix` (markdown's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/markdown` from the committed tip `c38ae24` (clean; the final guide head start installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-markdown-converge-fix/` inside this checkout; your own red-first control on a file you own is yours to plant and reverse.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 12, § Ruling 13 and its amendment, § Ruling 15, § Ruling 17; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice6-audit-verdict.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-markdown-converge-report.md:111-126` (the dropped clauses); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` and its Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68`.

## Items

1. **The `Shape` idiom (M1, Ruling 15).** The `### Types` and `### Shapers` convention sentences take Ruling 15's one wording (the Shapers table keeps a second sentence naming the node shape it writes, if it needs one); every interface row's `Shape` cell holds data members as bare names with `?`, `plus` its call-signature members by name; every alias row its own literal with `\|`; no member type (`{ element, value }`, `{ element, strong, children }`, `{ document } plus walk, find, …`). Read each declaration in `src/core/types.ts`.
2. **The dropped clauses (M2, Ruling 7).** Each clause the converge report lists at `:111-126` as absent from its row's block — `TableAlign`'s `undefined` on `MarkdownCell.align`, `MarkdownCell`'s header derivation, `renderHTML`'s "one argument, no options, no opt-out", `foldNode`'s `table`-handler flattening — lands in that declaration's `@remarks`; the guide prose that carries it stays.
3. **All-caps and the count (M3).** Lower the emphasis in the owning `src/**` description paragraph (`ORIGINAL`, `ALREADY`, `SAME`, `IMMEDIATELY`, `NOT`, `NEW`, `BALANCED`, `THE`, `CANONICAL` — the cells at `guides/markdown.md:33`, `:34`, `:56`, `:102`, `:103`, `:108`, `:111`, `:114`, `:115`, `:117`, `:124`, `:131`, `:221`), then `--to guide`; `:277` drops "TWO" (name the caps or recast) and replaces "the anchor law below" with "the anchor law that follows". Sweep the guide and every owned block once more (`grep -nE '\b[A-Z]{3,}\b'`, ruling each hit; real tokens stay).
4. **The em dash (M4).** Every description paragraph under `src/core/**` that joins a clause with a spaced hyphen (` - `) takes the spaced em dash (` — `) the fleet writes; then `--to guide`.
5. **The drop-in's text (M5).** `tests/guides.test.ts`: line 2 reads "The constants that follow are this package's own" (Ruling 13 amended); the `INTERNAL` sentence at `:79` reads "the assertion that follows it fails when a name here stops being stranded".
6. **The overload descriptions (M6).** `src/core/types.ts` `find` and `filter`: each overload's description is true to its own signature; the first (guard) overload's description names the predicate overload as such ("a second overload takes a plain predicate") rather than claiming the guard signature accepts one; then `--to guide`.
7. **The titled pair stays** on the `Markdown` class's block (Ruling 17); do not retitle.
8. **Propagation.** `npx oxfmt --write <paths>` after edits; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/markdown.md`, the doc blocks under `src/core/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. The convention sentence's Ruling 15 wording above `### Types` and `### Shapers`; `grep -n '| interface *| `{[^`]*:' guides/markdown.md` prints nothing; `grep -nE '\b(ORIGINAL|ALREADY|SAME|IMMEDIATELY|NOT|NEW|BALANCED|CANONICAL|TWO)\b' guides/markdown.md` prints nothing; `grep -c ' - ' guides/markdown.md` reads its baseline minus every description-paragraph site (report the reading); lines 2 and 79 of the suite equal the amended pilot text.
5. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation (the host is under load; the `parsers.test.ts:626` 1000 ms case is re-run alone by the Orchestrator — report its reading, do not diagnose it).

## Output

`/home/user/scaffold/tmp/units/d7n-markdown-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red or a `Shape` cell Ruling 12 cannot express. Decide ancillary matters and record them.
