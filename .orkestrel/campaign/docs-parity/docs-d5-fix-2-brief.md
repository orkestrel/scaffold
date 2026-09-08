# Unit D5-fix-2 — seed-close: the audit's findings on D5 and D5-fix, closed

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the objective lane's unit on the recorded substitution (the Sol bench is dark this round). Sole writer in `/home/user/scaffold`, with no other unit live. Perform the assignment directly and spawn nothing.

## Objective

Every finding `d5-audit-verdict.md` round 1 carries lands: the seed writes each source file once with every row's rewrites intact, the `--to guide` proof compares the whole file, a missing index exits inside the documented code set, the names read as one word per concept, the seed's path has one home, the vendored list in the distribution proof names the seed, and the prose carries no count.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`, `.claude/rules/documentation.md`.
2. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-audit-verdict.md`, `d5-audit-objective.md` (claims 5 and 10, and § Findings outside the claims), `d5-audit-subjective.md` (claims 11 and 13, and F1 to F7), `orchestrator-measurements.md` § M8.
3. The code: `scripts/docs.ts` (whole), `src/core/constants.ts:130-160` (`HOST_PATHS`), `src/core/compilers.ts:340-360` (`blueprintToScripts`) and `:1580-1605` (`blueprintToHostArtifacts`), `tests/src/core/compilers.test.ts` (the seed's fixture and cases from `describe('the documentation seed')` to the end of the file, and `emits the documentation seed beside the guides proof`), `tests/distribution.test.ts:250-300`, `guides/scaffold.md:1025-1051` and `:254`, `.claude/rules/workspace.md:77-83`.

## What is fixed

- **L1. One current-text map across rows.** Seed one mutable `Map<string, string>` from the inventory before the row loop; `writeGuide` and `writeSource` read from and write into that map; flush each changed file once after every row has run, comparing against the original inventory to decide whether a file moved, and print `wrote <path>` once per moved file. Add a case with two concept-index rows whose modules overlap (a parent directory and a child directory, both selecting one source file that carries a drift under each row) asserting both rewrites survive in the file and `wrote <path>` appears once.
- **L2. The whole-file proof.** The `--to guide` case asserts the written guide byte for byte against an expected constant, keeping the `toContain` lines only as named landmarks.
- **L3. `written` counts a change.** Increment `written` only when the replacement differs from the current text.
- **L4. A missing index exits inside the code set.** A workspace with no `guides/README.md`, and an index row naming a spec the inventory lacks, each print one line naming the file and set exit code 2, with no throw; a case proves each; the guide's exit-code sentence names it.
- **L5. One word for one quantity.** `Outcome.left` becomes `reported` and `formatLeft` becomes `formatReported`, so the field, the helper, and the printed `reported:` label agree.
- **L6. `buildSummaries` becomes `collectSummaries`** (it gathers members into a set).
- **L7. The seed's path has one home.** `export const DOCS_SEED_PATH = 'scripts/docs.ts'` in `src/core/constants.ts` with the doc block `/** Names the vendored module \`npm run docs\` runs. */`, read by `blueprintToHostArtifacts` and by the `docs` command `blueprintToScripts` emits; `HOST_PATHS` reads it too; the guide's `## Surface` gains its row; a case pins that `HOST_PATHS` carries it.
- **L8. The guide.** `guides/scaffold.md:1033` reads "and `2` for an argument outside `--to`" and, after L4, names the missing-index exit; the pitch paragraph (`:1026-1031`) names the guide the manifest's short name selects (`guides/<name>.md`) and states that a workspace whose manifest declares no name, whose index carries no such row, or which has no `README.md` reports no pitch line. No count of a growable set anywhere in the file's changed lines.
- **L9. The seed's own comments.** `scripts/docs.ts:42` and any other comment in the file drop a count of a growable set ("the one option", "the two values").
- **L10. The next-step line.** `run npm run format` becomes `next: npm run format`; every expectation pinning it follows.
- **L11. The rule bullet.** `.claude/rules/workspace.md:77-83`'s first sentence reads "import only what resolves in every workspace: a `node:` module, or a package `BASE_DEV_DEPENDENCIES` declares." — the second "for every workspace" goes; nothing else in the bullet or the file moves.
- **L12. The pinned vendored list.** `tests/distribution.test.ts:250-285` gains `'scripts/docs.ts'` after `'scripts/ollama.sh'`.
- **L13. The inventory.** `npm run build` regenerates `host.json`.

## Standing conditions

- D4, D5, and D5-fix are on this tree uncommitted; `npm run test:guides` is red on exactly the two D4 cases by design; every other project is green at dispatch except `test:distribution`, red on exactly `tests/distribution.test.ts:293` under npm 11 (L12 closes it).
- `npm run test:distribution` needs npm 11 first on the path: `PATH=/opt/npm11/bin:$PATH npm run test:distribution`, about 75 seconds, a reachable registry. Under the shell's default npm 10.9.7 the packed-scaffold install crashes inside npm (M8); that is not this tree's defect. Run it once as an observation at the end; the Orchestrator takes the deciding run.
- `node_modules/@orkestrel/guide` is a head start installed with `--no-save`. Never `npm install`.
- Linux, bash, Node v22.22.2. The host's command classifier refuses `npx scaffold …`.

## Scope

- Owned: `scripts/docs.ts`, `src/core/constants.ts` (the `DOCS_SEED_PATH` declaration and the `HOST_PATHS` member only), `src/core/compilers.ts` (the two read sites only), `guides/scaffold.md`, `.claude/rules/workspace.md` (L11's sentence only), `tests/distribution.test.ts` (L12's row only), `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts` (only if L7's pin belongs there), `tests/src/core/constants.test.ts` (only if it exists and L7's pin belongs there), `host.json` (by regeneration alone).
- Off-limits: everything else — `tests/guides.test.ts`, `package.json`, `src/core/templates.ts`, `src/core/Compiler.ts`, `src/core/helpers.ts`, `tsconfig.json`, `tests/setup*.ts`, `tests/src/server/**`, `configs/**`, `README.md`, `.claude/rules/*` beyond L11's sentence.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:server`, `npm run test:config`, `npm run test:policy`, `npm run test:guides` (observation), `npm run build`, `npm run build:inventory`, `npm run docs` (observation), `PATH=/opt/npm11/bin:$PATH npm run test:distribution` (observation, once). Never `npm install`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "DOCS_SEED_PATH" src/core/constants.ts src/core/compilers.ts` prints the declaration and both reads; `grep -n "'scripts/docs.ts'" src/core/compilers.ts` prints nothing; `grep -n "formatLeft\|buildSummaries\|run npm run format" scripts/docs.ts` prints nothing; `grep -n "'scripts/docs.ts'" tests/distribution.test.ts` prints the row; `grep -c "declares for every workspace" .claude/rules/workspace.md` prints 0.
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. `npm run test:src:core` exits 0 with the two-row case, the whole-file case, and the two exit-2 cases listed; `npm run test:src:server`, `npm run test:config`, `npm run test:policy` exit 0.
4. `npm run build` exits 0; `sha256sum host.json` identical before and after a second `npm run build:inventory`.
5. Observations: `PATH=/opt/npm11/bin:$PATH npm run test:distribution` exit code and last lines; `npm run docs` exits 1 with the same key set; `npm run test:guides` red on exactly the two D4 cases.

## Output

Write `/home/user/scaffold/tmp/units/docs-d5-fix-2-report.md`: each L with `file:line`; a table of the citations this round renumbers in `d5-scaffold-seed-report.md` and `d5-fix-report.md` (which sites moved and where they are now); each criterion with exit code and last lines; the observations; `git status --short` and `git diff --stat`; flagged claims; no count of a growable set. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when L1's single-map shape cannot keep a `replaceCell` or a `spliceSpan` offset valid, when a criterion needs an off-limits file, or when a gate fails outside the owned files. The two-row fixture's content, the expected-guide constant's name, the exit-2 messages' wording, and the guide sentences are yours to decide and record.
