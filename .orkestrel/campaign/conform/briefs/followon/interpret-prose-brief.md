# Unit interpret-prose — the prose sites outside the conformance rows

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/interpret`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of interpret (`b2cd68e`), from the landed tip.

## Objective

Close the prose findings the conformance audit recorded outside its rows: `via` and `e.g.` leave the test titles and comments; the `design §N` and `ledger N` citations that resolve to no document in this repository leave the test headers; the `as const` leaves the `scoreTemplate` fence in `guides/interpret.md` and its transcription; and every sentence that tallies the pipeline's stages as "five" names the stages or drops the number, with the gate chain and the guide parity test green.

## Context

**Law.** `AGENTS.md` § Writing (never state a count over a set anyone can add to — stages are such a set; name the members or write the sentence without the number); `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`via` → `through` or `by using`; `e.g.` → `for example`) and § Code tokens, references, and links; `/home/user/scaffold/.claude/rules/typescript.md` line 29 on `as const` (it annotates a literal with its own type; a guide fence models the published API and takes a typed declaration instead).

**Evidence.** `reports/conform-interpret-report.md` § Findings outside the rows and the round-1 objective lane's F-1 site list (`units/l3/interpret-objective-r1.md`). Sites on the landed tip, read 19:52 UTC; line numbers can have moved:

- `via`: `tests/setup.ts:323`; `tests/src/core/stages/Clarifier.test.ts:13,111`; `tests/src/core/stages/Normalizer.test.ts:24`; `tests/src/core/Narrator.test.ts:25`; `tests/src/core/factories.test.ts:91,183,198,217`.
- `e.g.`: `tests/src/core/Narrator.test.ts:455`.
- `design §N` and `ledger N` citations: `tests/src/core/stages/Clarifier.test.ts:12`; `tests/src/core/stages/Extractor.test.ts:5`; `tests/src/core/Interpret.test.ts:30`; `tests/src/core/integration.test.ts:19`; `tests/src/core/managers/TemplateManager.test.ts:9`; `tests/src/core/managers/DefinitionManager.test.ts:9`; `tests/src/core/managers/SubjectManager.test.ts:8`. Router's precedent (`briefs/conform-router-fix1-brief.md`): state the cited fact inline or delete the parenthetical; never leave a citation to a document the repository does not carry.
- `as const`: `guides/interpret.md:411` inside the `scoreTemplate` fence (`definition: { reasoning: 'symbolic' as const, … }`), transcribed at `tests/guides.test.ts:414` and nearby. Replace the assertion with a typed declaration: annotate `template` with the published template type the fence already imports or imports next (read `src/core/types.ts` for the name), so `reasoning` narrows from the annotation; change the fence and the transcription together and keep the printed result `// 1` executed.
- The "five" tally: `src/core/types.ts:35` ("Names the five fixed pipeline phases"); `src/core/types.ts:279` ("exactly five records, `[normalize, extract, clarify, format, generate]`"); `guides/interpret.md:17`, `:23`, `:65`, `:77`, `:512`, `:957`. Where the sentence already lists the members, drop the numeral; elsewhere name the stages or write the sentence without the number.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/interpret run <script>`, `npm --prefix /home/user/fleet/interpret test`, `cd /home/user/fleet/interpret && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure on an owned file), `git -C /home/user/fleet/interpret status --short`, `git -C /home/user/fleet/interpret diff`, `node /home/user/scaffold/tmp/work/evidence.mjs interpret`, `cd /home/user/fleet/interpret && npx scaffold audit --offline`, and `grep -rn <pattern> /home/user/fleet/interpret/src /home/user/fleet/interpret/tests /home/user/fleet/interpret/guides/interpret.md /home/user/fleet/interpret/guides/README.md /home/user/fleet/interpret/README.md`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `src/core/types.ts` (the two doc sentences only), `guides/interpret.md`, `tests/**` except the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. **`via` and `e.g.`.** Replace by sense at every site listed and any the sweep in row 5 finds.
2. **Citations.** At every `design §N` or `ledger N` site, state the fact inline or delete the parenthetical.
3. **`as const`.** Rewrite the fence and its transcription as the Evidence names; run `npm --prefix /home/user/fleet/interpret run test:guides` and record the reading.
4. **The tally.** Rewrite every "five" site as the Evidence names.
5. **Sweep.** Record the sweeps `\bvia\b`, `e\.g\.`, `design §|ledger [0-9]|§[0-9]`, `as const`, and `\b(five|5)[- ](stage|fixed|record|phase|pipeline)|\bfive\b` (case-insensitive) over `src`, the owned `tests/**`, `guides/interpret.md`, `guides/README.md`, and `README.md`, ruling every remaining hit by sense.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs interpret`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/interpret-prose-report.md`: per row the sites changed with the line now, the sweeps with their rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the published template type cannot be named from `src/core/types.ts` for the fence, or when a gate reddens on something the rows did not touch. A citation whose fact cannot be stated inline is deleted, not escalated.

## Acceptance criteria

1. The sweeps read empty of banned senses in the Owned files; `as const` is absent from `guides/interpret.md` and `tests/guides.test.ts`.
2. `test:guides` exits 0; every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
