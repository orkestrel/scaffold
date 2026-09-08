# Brief — `d7n-program-converge-fix` (program's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/program` from the committed tip `a60327f` (clean; install the guide head start first per the handoff's `head-start.sh`, and confirm `sha256sum node_modules/@orkestrel/guide/dist/src/core/index.js | cut -c1-8` reads `2b76b363`; the closure re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install anything else, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-program-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 13, § Ruling 18, § Ruling 20, § Ruling 21, § Ruling 24, § Ruling 25, § Ruling 26, § Ruling 27, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-program-audit-verdict.md` (items PF1 to PF8) and the three lanes it names; the pilot `/home/user/fleet/abort/guides/abort.md` and `/home/user/fleet/abort/tests/guides.test.ts`; `/home/user/fleet/qualifier/guides/qualifier.md:1-12` (the sibling's opening).

## Items

1. **`### Constants` (PF1, Ruling 21).** `guides/program.md` about `:165`, `:168`, `:169`: `true` → `boolean`, `'aggregate'` → `string`, `'outcome'` → `string`. The descriptions already carry the literals; the doc blocks do not move.
2. **The dropped characterization (PF2).** The guide's opening prose (about `:17-27`) gains one sentence stating that `execute` runs synchronously and deterministically — the same definition and subject produce the same result — and the tagline stays a noun phrase.
3. **All-caps emphasis (PF3).** `guides/program.md:742` `OMITTED` → `omitted`; then every hit `grep -rnE '\b[A-Z]{3,}\b' src guides/program.md README.md` finds outside a code token (`src/core/types.ts:125,158,290,342,557`, `src/core/helpers.ts:96,130,306,307,605,627,889`, `src/core/programs/ProgramManager.ts:25,32,322`, `src/core/programs/Program.ts:218,280`, and any other) lowered keeping its contrast, the grep ruled hit by hit in the report (acronyms, codes, and code literals stay).
4. **The guard sentence (PF4, Ruling 27).** `guides/program.md` about `:222` carries "In a guard table a `Shape` cell holds the type the guard narrows to." alone.
5. **The drop-in's header (PF5, Ruling 13).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's byte for byte; the region from `const root = ` through the manifest loop's closing brace stays equal to the pilot's.
6. **The fences (PF6, Ruling 21).** One sentence under `#### Compile a program and a manager` naming what the fence demonstrates; a lead-in before every other fence directly under a heading in `guides/program.md`.
7. **The tagline (PF7).** `guides/program.md:3-6` and `README.md:3-6`: "then authorize" becomes the package's own term (`authority` is the concept; write "then decide" or "then evaluate authority"), and "executes them" names its noun ("executes that definition"); the guide's blockquote and the README's stay identical line for line, and the README case in `tests/guides.test.ts` stays green.
8. **The closing items (PF8, Rulings 20, 24, 25, 26, 28).** The `Shape` idiom where a table lacks it (a table of `const` rows heads `Shape`; a function row in a table carrying `Shape` holds its signature, a guard row the type it narrows to, a class row the interface it implements, with the Ruling 26 and 28 sentences where such rows sit); `#` links; the README's `## Install` and `## Usage` fences directly under their headings.
9. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/program.md`, `README.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/program.md README.md tests/guides.test.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -nE '^\| \`[A-Z_]+\` +\| const +\| \`(false|true|'"'"'[^'"'"']*'"'"')\` ' guides/program.md` prints nothing; `grep -c 'synchronous' guides/program.md` reads at least 2; `grep -nE '\bOMITTED\b' guides/program.md` prints nothing; `grep -c 'In a guard table' guides/program.md` reads 1 and the line before the guard sentence's table carries no interface sentence; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; `grep -c 'then authorize' guides/program.md README.md` reads 0 for each; `diff <(sed -n 3,6p guides/program.md) <(sed -n 3,6p README.md)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/program.md` prints nothing; `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/program.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-program-converge-fix-report.md`: per item the hunk (the sweeps summarized by file with one example), per criterion the exact command with its argument list and its last lines, the ruled grep, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a tagline edit that reddens the README case. Decide ancillary matters (exact wording) and record them.
