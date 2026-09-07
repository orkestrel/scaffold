# Unit D6 — scaffold-converge: scaffold green under the summary, method, example, and pitch checks

Draft written 2026-09-07 while D5 runs; the seed's invocation lines are amended from D5's accepted report before launch, and the amendment is recorded at the end of this file.

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the subjective lane's unit (documentation voice: every doc-block sentence and guide cell this unit rewrites, the guide's tagline, the README's shape). Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing.

## Objective

`npm run test:guides` exits 0 in scaffold: every compared `Summary` cell equals its doc-block description paragraph, every titled `@example` equals the guide fence of its title, the README pitch equals the guide's tagline, the example population is pinned non-empty, and every other gate stays green. The seed carries the mechanical part; this unit rules and writes the part that needs judgment.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and its rule map: `.claude/rules/names.md`, `.claude/rules/typescript.md` (§ TSDoc: the voice rule), `.claude/rules/tests.md`, `.claude/rules/documentation.md` (§ Parity: the equality bullet and the voice bullet), `.claude/rules/writing.md` (§ Substitutions: the banned rows the sweep reads).
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` (Ruling 6), `plan.md` decision 4, decision 8, decision 9, and § Re-baseline (after D4 returned), `d4-scaffold-gate-report.md:119-268` (the drift list in its two groups, and the README readings), `orchestrator-measurements.md` § P7 (the three example pairs known to disagree), `d5-scaffold-seed-report.md` (the seed's command shape, its output lines, its miss reporting).
3. `/home/user/fleet/guide/guides/guide.md` § The check catalog and § The renderers and the replacers (`:344-372` the compared form's clauses; `:389-399` the pairing rule: a `GuideFence` carries its nearest preceding heading's flattened text as `title`, a `SourceExample` carries the text after its `@example` tag, and the first fence a title reaches is the compared one).
4. The code: `scripts/docs.ts` (the seed), `tests/guides.test.ts` (the equality case, the README case, the executed fences at `:210-235`), `configs/policy.ts` (`POLICY_VOICE_STOPWORDS`, the malformed-summary rule's conditions), `guides/scaffold.md`, `README.md`, the doc blocks under `src/**`.

## What is fixed

- **The direction.** A `Summary` cell adopts the doc block's verb-first description paragraph (Ruling 6). A doc block is never rewritten to match a guide cell's wording; it is rewritten only to carry information the cell has and the block lacks, in verb-first form under the voice rule, and then the seed propagates it to the cell.
- **The leading-word group** (`d4-scaffold-gate-report.md:127-181`): the seed's `--to guide` closes it. No hand edit.
- **The wider group** (`d4-scaffold-gate-report.md:183-263`): rule each key by reading both sides. Where the two say the same thing and the cell is a noun phrase, the seed's `--to guide` closes it. Where the cell carries information the block lacks — `type Lookup` names the four resolutions where the source names none; `MANIFEST_PATH` names birth ownership — rewrite the block's description paragraph first to carry that information verb-first, under `policy/no-malformed-summary` (verb-first, not naming its own symbol, no stop-word opener), then let the seed propagate. Where the two contradict each other, read the code, keep the true statement, and flag the key in the report. Record every key you rewrote by hand with one line naming what the block gained.
- **The order of the summary work.** Hand-edit the blocks first; run the seed `--to guide` once; run `npm run format`; run the seed with no flag and read zero summary lines. A seed miss (a key it reports with no cell or no block located) is closed by hand and named in the report with its cause.
- **The examples.** Title each `@example` block whose code duplicates a guide fence with that fence's heading text, written after the `@example` tag on the tag line, so `findDrift` pairs them. The guide fence wins on content (decision 4): after titling, run the seed `--to source` so each titled block adopts its fence's body, and run `npm run format`. Where `replaceExample` refuses a body its three-backtick fence cannot enclose, or where the block's code is a fragment the fence's full program would bloat, rule it: adopt the fence by hand where the block should carry the program, and leave the block untitled where the fence is a concept illustration rather than that declaration's example. The three P7 pairs — `createBlueprint` (`src/core/factories.ts` against `guides/scaffold.md` § the `createBlueprint` fence executed at `tests/guides.test.ts:212-221`), `Materializer`, and `Compiler` — land whichever way, and the report names the title each took. A fence with no `@example` counterpart stays as it is; an `@example` with no fence stays untitled.
- **The readable worklist (D4's F4).** The equality case collects one readable line per drift — the spec, the key, and each side's text or `absent`, the shape the seed prints — rather than the `{ spec, drift }` record, so a failure prints the worklist flat, the way the file's other collectors print; its comment says the same list is what `npm run docs` prints.
- **The population pin.** In `tests/guides.test.ts`, beside the equality case, one case asserts that for `guides/scaffold.md` the set of titles present on both sides — the guide's `fences()` titles intersected with the source's `examples()` titles — is non-empty, so the example half of the equality case can never pass over an empty population. Name the case for what it proves. Apply the file's collector idiom.
- **The tagline and the pitch.** The guide's blockquote under its H1 becomes a noun phrase in plain text and code spans, with no link and no second sentence: what scaffold is, in one line. The sentence naming the source entry points (`Source: …`) moves to the paragraph after the blockquote if a gate reads it, and is deleted otherwise (record which). `README.md` opens with its H1 and the same blockquote, byte-equal to the guide's after the compared form.
- **The README shrink (Ruling 6).** The README keeps: the H1, the pitch blockquote, § Install as it stands (the install fence and the Node floor line), one library fence (the `Compiler` program under § Library, and no second fence), the guide link, § Notes, and § License. The verb subsections, the flag paragraph, and the exit-code sentence become one list under a `## Verbs` heading — one line per verb naming what it does and linking to the guide's section for it — and one line pointing at the guide for flags and exit codes. Where a README paragraph carries information `guides/scaffold.md` lacks (read each verb subsection against the guide's verb sections before deleting it), the guide adopts that information first, in the guide's voice, so nothing is lost.
- **The voice and the sweep.** Every sentence this unit writes passes `policy/no-malformed-summary` (doc blocks), `policy/no-banned-term` (comments), and the Markdown prose sweep in `tests/setupPolicy.ts` (guides and README, the substitution table's unconditional rows). No count of a growable set in prose.

## Standing conditions

- D4 and D5 are accepted and uncommitted on this tree; they land with this unit in one commit. `npm run test:guides` is red on the two D4 cases at dispatch and on nothing else; every other project is green at dispatch.
- `node_modules/@orkestrel/guide` is the head start installed with `--no-save`. Never `npm install`.
- The seed: `npm run docs` reports; `npm run docs -- --to guide` and `npm run docs -- --to source` write; exit 1 while any disagreement or miss stands; the seed does not format. `SEED_INVOCATION_NOTE`
- `.oxlintrc.json` lints `src/**`, `tests/**`, `configs/**`, and `scripts/**` under the voice rules; `npm run lint:check` is the doc-block voice gate.
- `npm run format` is permitted to this unit because it is the sole writer and no other unit is live; run it after each seed write and before every check.
- Linux, bash, Node v22.22.2. The host's command classifier refuses `npx scaffold …`; this unit needs no scaffold command.
- Whole-suite timing: `npm test` runs for several minutes on this container; report its exit code and duration as an observation, and the Orchestrator takes the deciding run after you exit.

## Scope

- Owned: `guides/scaffold.md` (a host file: `npm run build` restages it and `host.json` moves by regeneration alone), `host.json` (by regeneration alone), `README.md`, the doc comments under `src/**/*.ts` (comment text only; no code token, signature, or export moves), `tests/guides.test.ts` (the pin, and a consumer edit only where a rewritten fence needs one), `guides/README.md` (only where a row must change).
- Off-limits: `scripts/docs.ts`, `src/core/templates.ts` (its `readonly module: boolean` member is unit D6b's), `src/core/constants.ts`, `src/core/compilers.ts`, `package.json`, `package-lock.json`, `configs/**`, `tests/setup*.ts`, `tests/src/**`, `.claude/**`, `.agents/**`, `PROPOSAL.md`, `ROADMAP.md`.
- Permitted commands: `npm run docs` and its two `--to` forms, `npm run format`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npm run test:policy`, `npm run test:src:core`, `npm run build`, `npm test` (an observation). Never `npm install`, lint `--fix`, a discard-class git command, or a commit.

## Unknowns

- Whether any case in `tests/guides.test.ts` or `tests/policy.test.ts` reads the guide blockquote's source links; the unit greps both for `Source:` and for the blockquote and records the answer before moving the sentence.
- Whether `renderMarkdown` re-renders a table's column widths when `replaceCell` changes one cell, and whether `npm run format` then settles the file; the unit reads the first `--to guide` diff for width-only churn and records it.
- How many of the wider group's keys need a hand rewrite is not known; the report names them, not their number.

## Acceptance criteria, cheapest first

1. `npm run docs` exits 0 and prints no drift line and no pitch line.
2. `grep -n "@example " src/**/*.ts` (recursive) prints the titled blocks; `grep -n "<pin case title>" tests/guides.test.ts` prints the pin case.
3. `npm run format:check` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
4. `npm run test:policy` exits 0.
5. `npm run test:guides` exits 0, with the two D4 cases and the pin case listed green.
6. `npm run build` exits 0; `sha256sum host.json` is identical before and after a second `npm run build:inventory`.
7. Observation: `npm test` exit code and duration.

## Output

Write `/home/user/scaffold/tmp/units/docs-d6-scaffold-converge-report.md`: the keys rewritten by hand with one line each; the titles given to the `@example` blocks and the three P7 rulings; the guide tagline and the README's final section list; every seed run's closing line; the answers to the Unknowns; each criterion with exit code and last lines; `git status --short` and `git diff --stat`; flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a guide cell and the code disagree in a way the block cannot state truthfully without a code change, when the seed cannot locate a block for a key that exists, when a vendored file must move, when `tagline()` cannot read a noun-phrase blockquote you wrote, or when a gate fails outside the owned files. The wording of each rewritten sentence, the title each `@example` takes, the README's verb-list wording, and where the source-links sentence lands are yours to decide and record.

## Review evidence

The actual diff and the actual status output, captured by the Orchestrator on return as `d6-scaffold-converge.diff.txt` and `d6-scaffold-converge.status.txt`.

## Amendments

- 2026-09-07, before launch: `host.json` and `guides/scaffold.md` are owned by regeneration and by edit respectively; D5's report shows the guide is a staged host file, so a guide edit moves the inventory. Criterion 6 reads the digest across a second inventory run rather than across the build.
- 2026-09-07, after the D5 fork's design round: the equality case adopts one readable line per drift (D4's F4, the cheap form); `npm run docs` is the manifest script D5 landed (`node --experimental-strip-types scripts/docs.ts`, with `--to guide` and `--to source` after `--`), and the seed prints `run npm run format` after a write.
