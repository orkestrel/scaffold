# Brief — `d7n-middleware-converge-fix` (middleware's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/middleware` from the committed tip `6576d98` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-middleware-converge-fix/` inside this checkout; a runtime probe goes under `tmp/probe/` and is deleted after it settles its question.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing and § Non-negotiable rules; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 13, § Ruling 18, § Ruling 20, § Ruling 21, § Ruling 22, § Ruling 25, § Ruling 26, § Ruling 28; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-middleware-audit-verdict.md` (items MF1 to MF11) and the two reviewer lanes it names; `/home/user/scaffold/tmp/units/d7n-middleware-close-brief.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` (its `describe('flagship fences')` executed section) and `/home/user/fleet/abort/guides/abort.md:101`.

## Items

1. **`isBufferingIneligible` (MF1).** `src/core/helpers.ts` (about `:275-277`): the description states the predicate's polarity — the response must skip the compression and ETag buffering pipeline (HEAD, `204`, `304`, a bodyless response, SSE, an already-stamped header) — agreeing with its `@returns`; then `--to guide`.
2. **The line-end hyphen (MF2, Ruling 22).** `src/server/helpers.ts:124`: `reserved-device-name` sits on one line, the paragraph rewrapped; then `--to guide` so `guides/middleware.md:227` reads the compound whole. Sweep `grep -rnE '[a-z]-$' src --include=*.ts` and rewrap every description-paragraph hit that is a compound.
3. **The lead-in (MF3, Ruling 21).** One complete sentence between `### Mount a battery` (about `guides/middleware.md:27`) and its fence, naming what the fence demonstrates; the intro sentence above the heading stays.
4. **The extended interfaces (MF4, Ruling 21).** `guides/middleware.md:104` reads `SessionLimits plus { capacity?, evict? }` and `:110` `SessionCursors plus { id, session }` (read the parents at `src/core/types.ts:612` and `:454`); the Types convention text gains "An extended interface's name comes before `plus`, with the members it adds after."; every other `extends` interface in `src/**` is ruled the same way and recorded.
5. **The Shapers table (MF5, Ruling 25).** `guides/middleware.md:181-185` heads `Shape` between `Kind` and `Summary` under "A `Shape` cell holds the constant's declared type." with `sessionColumns`'s declared type in Ruling 25's form.
6. **The header (MF6, Ruling 21).** `tests/guides.test.ts` lines 1 to 3 equal the pilot's byte for byte; the region from `const root = ` through the manifest loop's closing brace equals the pilot's.
7. **The executed section (MF7, Ruling 20).** `tests/guides.test.ts` gains, after the pilot's region, a `describe('flagship fences')` in the pilot's form: a presence guard (`carries the fence lines the transcriptions copy`) and a transcription of the titled `### Mount a battery` fence driving real batteries over `compose` and asserting what its comments claim, plus one case per `## Contract` claim a guide fence demonstrates that the acceptance bar (about `:413-518`) states as behaviour and no suite under `tests/src/**` already asserts — settle each reading by probe before asserting it, and record which claims already had a gate and were left to it. Each case is named for what it proves.
8. **All-caps and the count (MF8).** `src/core/types.ts:179` ("EXACTLY ONE of the two forms" — name the forms), `:337`, `:500`; `src/core/middlewares.ts:376`; `src/server/types.ts:39`, `:130`, `:167`, `:170`; `src/server/parsers.ts:13`, `:17`, `:29`; `src/server/middlewares.ts:176`: lowered keeping the contrast; then `--to guide` where a description moved; `grep -rnE '\b[A-Z]{3,}\b' src guides/middleware.md README.md` ruled hit by hit in the report (acronyms, HTTP vocabulary, header values, CVE identifiers, and code literals stay).
9. **The unnamed literals (MF9, Ruling 18).** `DEFAULT_LIMITER_MESSAGE` (`src/core/constants.ts:85`) and `DEFAULT_PERMISSIONS_POLICY` (`:33`) name their literals in their descriptions, as every sibling default does; rule `DEFAULT_CSP` the same way and record it; then `--to guide`.
10. **The README (MF10).** `README.md:49-53`'s second battery enumeration goes; the paragraph keeps the fact it alone carries (each battery is a typed `options => MiddlewareHandler<TState>` factory composing over the frozen seam, scoped with `only()` and `except()` where needed).
11. **The closing items (MF11, Rulings 13, 20, 21, 25, 26, 28).** Every item `d7n-middleware-close-brief.md` lists beyond the preceding: the `Shape` idiom where a table lacks it, `#` links, a lead-in sentence before every fence directly under a heading.
12. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Standing condition

The reader keys the guide's surface by name alone, so the node-face `createCompression` row (`guides/middleware.md:71`) is outside every comparison while the core-face row is compared; converge the node-face cell to its block by reading, and record it.

## Scope

Owned: `guides/middleware.md`, `README.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/middleware.md README.md tests/guides.test.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c 'must skip\|must be left untouched\|skips the' guides/middleware.md` reads at least 1 on the `isBufferingIneligible` row (name the exact wording in the report); `grep -c 'reserved- ' guides/middleware.md` reads 0; `grep -c 'SessionLimits plus' guides/middleware.md` reads 1 and `grep -c 'SessionCursors plus' guides/middleware.md` reads 1; `grep -c "describe('flagship fences'" tests/guides.test.ts` reads 1; `grep -rnE '\b(EXACTLY|SYNCHRONOUSLY|RETURNED|OUTSIDE)\b' src` prints nothing; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/middleware.md` prints nothing; `grep -nE '^\| \`[^\`]+\` +\| (function|const|class) +\| +\| ' guides/middleware.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` (with the executed section) and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` and `npm run test:src:server` as observations.

## Output

`/home/user/scaffold/tmp/units/d7n-middleware-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the ruled grep, the executed cases with the probe readings behind them, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a guide claim the item 7 probe falsifies (name it: the guide's sentence is then the defect, and the Orchestrator rules). Decide ancillary matters (wording, which contract claims take a case) and record them.
