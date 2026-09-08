# Brief — `d7n-probe-converge-fix` (probe's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/probe` from the committed tip `d06b186` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-probe-converge-fix/` inside this checkout; a runtime probe goes under `tmp/probe/` and is deleted after it settles its question.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing and § Non-negotiable rules; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 14, § Ruling 20, § Ruling 21, § Ruling 26, § Ruling 27; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-probe-audit-verdict.md` (items P1 to P8) and the two reviewer lanes it names; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-probe-converge-report.md`; `/home/user/scaffold/tmp/units/d7n-probe-close-brief.md` (the closing generator's lists); the pilot `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/abort/guides/abort.md:58`.

## Items

1. **The class descriptions (P1, Ruling 7).** `src/server/Overlay.ts` (about `:6`) and `src/server/ProbeServer.ts` (about `:25`) open by naming the interface each implements and what the class adds (the state it owns, the transport it binds), the pilot's form at `abort.md:58`; the sentences that follow stay; then `--to guide` carries the `### The engine` rows so `Overlay` and `ProbeServer` no longer repeat `OverlayInterface` and `ProbeServerInterface`.
2. **The read values (P2).** `src/server/types.ts` at the `clear` example (about `:199-205`) and the `covers` example (about `:867-872`): show the value the constants blocks' way — `overlay.paths // []` after `overlay.clear()`, and `overlay.covers('/srv/checkout/src/core') // true` — with no unread binding.
3. **The `Draft` illustrations (P3).** `src/core/types.ts:29`, `:211`, `src/server/types.ts:858`, `:870`: the draft at `src/core/greeting.ts` carrying `export const GREETING = 'hi'` (module data the workspace's own lint policy refuses, per `guides/probe.md:659-663`) becomes the flagship claim's draft — a `src/core/factories.ts` draft exporting `createGreeting` — so one candidate path runs through the guide, the contracts, and the tests; then `--to guide` where a compared cell moved.
4. **The paragraph (P4).** `guides/probe.md:851-855` rewraps at the guide's prose width, no line past it.
5. **The tally (P5).** `guides/probe.md:1146` "on both eras" reads "on the legacy and the modern era" (or the members the sentence means).
6. **The README's copy (P6).** The executed case `states the same claim in the guide, the contract, and this proof` in `tests/guides.test.ts` (about `:489-499`) also reads `README.md`'s copy of the flagship claim (about `README.md:48-76`) and asserts it equals the documented copy; `files['README.md']` is already loaded.
7. **`IMPLEMENTATIONS` (P7).** `tests/guides.test.ts` (about `:325`): `LintStage`'s row reads `['LintStageInterface', 'StageInterface']`, matching `src/server/stages/LintStage.ts:54`.
8. **The closing items (P8, Rulings 13, 20, 21, 25, 26).** Every item `d7n-probe-close-brief.md` lists: the `Shape` idiom where a table lacks it (a table of `const` rows heads `Shape` under the constants sentence; a function row in a table carrying `Shape` holds its signature and a guard row the type it narrows to, with the Ruling 26 sentence added); `#` links; the drop-in's lines 1 to 3 equal the pilot's and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block and cases appended; a lead-in sentence before every fence directly under a heading.
9. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/probe.md`, `README.md`, the doc blocks under `src/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/probe.md README.md tests/guides.test.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -c 'GREETING' src/core/types.ts src/server/types.ts` reads 0 for each; `grep -c "on both eras" guides/probe.md` reads 0; `grep -c "LintStageInterface" tests/guides.test.ts` reads at least 1; `grep -c "README.md" tests/guides.test.ts` reads at least 2; `awk 'length > 100' guides/probe.md | grep -vc '^|'` reads 0 for prose lines (table rows excepted); `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/probe.md` prints nothing; `grep -nE '^\| \`[^\`]+\` +\| (function|const) +\| +\| ' guides/probe.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:server` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-probe-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a closing item the generator lists that Rulings 25 and 26 cannot express (name it). Decide ancillary matters (the openers' wording, the draft example's exact lines) and record them.
