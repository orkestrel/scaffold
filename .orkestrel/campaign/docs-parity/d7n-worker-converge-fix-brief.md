# Brief — `d7n-worker-converge-fix` (worker's fix round on the audit's findings, carrying the closing sweep's items)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/worker` from the committed tip `5d1fd14` (clean; the guide head start `0.0.18` installed `--no-save`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Put every instrument under `tmp/d7n-worker-converge-fix/` inside this checkout; a runtime probe goes under `tmp/probe/` and is deleted after it settles its question.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Sentence and paragraph order and § Code tokens, references, and links; `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 13, § Ruling 21, § Ruling 26, § Ruling 27; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-worker-audit-verdict.md` (items K1 to K8) and the two reviewer lanes it names; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-worker-converge-report.md` (its finding 1 site list); `/home/user/scaffold/tmp/units/d7n-worker-close-brief.md`; `/home/user/fleet/worker/node_modules/@orkestrel/queue/dist/src/core/index.d.ts` (the `abort` contract, about `:81`); the pilot `/home/user/fleet/abort/tests/guides.test.ts`.

## Items

1. **`abort`'s fact (K1).** `src/core/types.ts` at `WorkerInterface.abort` (about `:115-121`): the description or its `@remarks` carries "an aborted attempt is never retried", the queue's own contract that `src/core/Worker.ts` delegates to; then `--to guide`.
2. **`isReply` (K2).** `src/server/helpers.ts:14`: the `id` is the per-dispatch correlation key (`src/server/Dispatch.ts:60`, `:108-113`, `:123`), so the description reads "for a given correlation `id`" and never "job `id`"; then `--to guide` carries `guides/worker.md:91`.
3. **The lifecycle fence's gate (K3).** `tests/guides.test.ts` gains, in the package's executed section after the pilot's region, one case driving `pause`, `resume`, `clear`, `stop`, `start`, `abort`, and `destroy` over a real `createWorker`, asserting what the fence at `guides/worker.md:453-471` claims in its comments (dequeuing suspended with in-flight work running; the loops restarted after `stop`; the worker terminal after `abort`). Settle each reading by running it before asserting it. The case is named for what it proves.
4. **The pointers (K4).** `src/core/factories.ts:15`, `src/core/Worker.ts:36`, `:50` ("(§13)"), and `src/core/types.ts` ("(§4.5)") name the destination — "see the guide's `## Observing` section", or the section the pointer means — never a number.
5. **The all-caps sites (K5).** Every site the converge report's finding 1 lists plus `src/server/factories.ts:55` (`SAME`) is lowered keeping its contrast; then `grep -rnE '\b[A-Z]{3,}\b' src guides/worker.md README.md` is ruled hit by hit in the report (pattern, paths, permitted hits).
6. **The opening prose (K6).** `guides/worker.md:9-15` and `:20-24` no longer restate `## Contract` clause 2 and the observability clause; the opening keeps one sentence per displaced tagline fact and points at the clause ("see `## Contract`") rather than repeating it.
7. **The lifecycle pattern (K7).** Either the fence at `guides/worker.md:453-471` enqueues one job and awaits the `drain` event before the lifecycle tour (so the heading `### Pause, drain, and shut down` and its lead-in are true), or the heading and lead-in name what the fence shows (`### Pause, stop, and shut down`). Prefer the first; the item 3 case then covers the enqueue and drain too.
8. **The closing items (K8, Rulings 13, 20, 21, 25, 26).** Every item `d7n-worker-close-brief.md` lists: the `Shape` idiom where a table lacks it; `#` links; the drop-in's lines 1 to 3 equal the pilot's and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block and cases appended; a lead-in sentence before every fence directly under a heading.
9. **Propagation.** `npx oxfmt --config .oxfmtrc.json --write <paths>`; `PATH=/opt/npm11/bin:$PATH npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/worker.md`, `README.md`, the doc blocks and comments under `src/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `guides/README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only; `git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check guides/worker.md README.md tests/guides.test.ts src`, `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src`, `PATH=/opt/npm11/bin:$PATH npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -ic 'never retried' guides/worker.md` reads at least 1 in the `abort` row's line; `grep -c 'job \`id\`' src/server/helpers.ts` reads 0; `grep -rnE '\(§[0-9.]+\)' src` prints nothing; `grep -c 'SAME' src/server/factories.ts` reads 0; `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` prints nothing; the fence sweep `awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^\`\`\`/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/worker.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` (with the new case) and `npm run test:policy` exit 0 (record the summaries); `npm run test:src:core` as an observation.

## Output

`/home/user/scaffold/tmp/units/d7n-worker-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the ruled grep, the wall clock. No process diary. No count in prose.

## Deviation contract

Stop on a gate outside the owned files going red, a residual disagreement `--to guide` does not clear, or a lifecycle reading the item 3 probe falsifies (name it: the fence's comment is then the defect, and the Orchestrator rules). Decide ancillary matters (the K7 path, the case's name) and record them.
