# Unit docs-proposal — write `PROPOSAL.md`: the top three options for a single-source documentation pipeline

## Role and engine

`implementer` on Opus 5, a native Claude Code subagent. Perform the assignment directly and spawn nothing. This is a documentation-voice unit: the deliverable is prose the repository owner reads and rules on.

## Objective

Write `/home/user/scaffold/PROPOSAL.md` presenting the owner's top three options — as the Orchestrator reconciled them in `tmp/units/docs-reconciliation.md` — each with a full mechanism, a worked example on real scaffold code, an edit-cost account, a ruling on every existing check, a humans-and-agents section, a migration path, risks with the evidence that settles them, and falsifiable claims; then a recommendation with an order, the options refused on the evidence, and the probes the first unit runs.

## The owner's ask, verbatim

> Let's look at options for simplifying, deduplicating, and cutting down on waste. I feel that guides are important but so are the TS Doc comments, especially for IDE's and when reading source code, but guides are also important documentation that summarizes without having to do deep into the source code. I think having to write out the guides is a lot of duplication, so I'm thinking of having comprehensive tsdocs and then generating guides from them using tsdocs but I also don't want to get rid of all the important checks that guide does, maybe we can move some to oxlint or oxfmt like we have for other. My main concern has been all the work we did simply updating prose, especially at more than one site. Also, how can we come up with something for both LLMs and humans, especially with the voice and time and conventions we have come up with for our instructions in AGENTS.md/CLAUDE.md/agents/rules/skills. Do your research, pay special attention to scaffold and guide. Also check on tsdoc and how it works as well as oxfmt and oxlint.

## Context

**Inputs, in reading order.** Read all of them before writing; cite them by pointer inside the proposal's § Record and quote evidence from them with `file:line` pointers throughout.

1. `tmp/units/docs-reconciliation.md` — the Orchestrator's rulings R1 to R10, the ranked table, the refusals, and the probes. **These rulings are binding**: the proposal presents the options as ruled, and where a lens report disagrees with a ruling, the ruling wins and the proposal may note the alternative under the option's risks.
2. `tmp/units/docs-design-O-report.md` — the objective lane: the constraints C1 to C15, what the checks catch and miss, the baseline cost model, the falsification of each lens, the evaluation criteria.
3. `tmp/units/docs-design-A-report.md`, `docs-design-B-report.md`, `docs-design-C-report.md` — the subjective lenses, with the worked examples, the check tables, and the claims the proposal draws on.
4. `tmp/cursor/docs-absorb.result.md` — the repository terrain with pointers: guide anatomy, the check catalog, TSDoc in use, the duplication pairs, the multi-site commits, vendoring, the policy plugin, the installed tool surfaces, the README overlap.
5. `tmp/cursor/docs-research.result.md` and `tmp/units/docs-research-web-report.md` — the installed-package facts and the primary-source facts (tsdoc.org, api-extractor.com, typedoc.org, oxc.rs, llmstxt.org, the precedents, the prose linters).
6. `tmp/units/docs-ecosystem-report.md` — the fleet map, the `@orkestrel/guide` dependents, the blast radius by edge class.
7. `tmp/units/docs-orchestrator-measurements.md` — oxfmt already formats and checks Markdown here; TSDoc survives the rollup and plain `tsc`; the ladder record.

**Terrain you may verify directly.** `guides/scaffold.md`, `guides/guide.md`, `guides/README.md`, `.claude/rules/documentation.md`, `.claude/rules/typescript.md` lines 76-88, `.claude/rules/writing.md`, `AGENTS.md` § Writing and § Instruction files, `tests/guides.test.ts`, `configs/policy.ts`, `.oxlintrc.json`, `.oxfmtrc.json`, `src/core/constants.ts` (the catalog markers at 290-299, `HOST_PATHS` at 111-152), `src/core/types.ts`, `src/core/factories.ts`, `src/server/Materializer.ts`, and `/home/user/fleet/guide/src/core/**`. Prefer a pointer you re-read over one you copy.

**Law.** `AGENTS.md` § Writing (every rule, and above all: never state a count in prose — name the members or write the sentence without the number; the proposal's own three options are named `Option 1`, `Option 2`, `Option 3` and the sentence never tallies them), `AGENTS.md` § Communication, `.claude/rules/writing.md` in full (`must`/`can`/`might`, never `should`; the substitution table; headings in sentence case; a complete sentence introduces every list, table, and fence; a backticked token followed by a noun; `preceding`/`following`/`earlier`/`later`, never `above`/`below`; a spaced em dash), `.claude/rules/documentation.md` (a proposal is not a guide: it enters no index and claims no parity row); skill: none; guide: none.

**Host.** Linux, bash, working path `/home/user/scaffold`. `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` is the formatter gate for your file; `npx oxfmt --config .oxfmtrc.json --write PROPOSAL.md` is permitted on your owned file alone. No network.

**Measurements.** Copy a number only with the command that produced it (the distillates carry those). Versions: typescript 6.0.3, oxlint 1.80.0, oxfmt 0.65.0, `@microsoft/api-extractor` 7.59.0, `@microsoft/tsdoc` 0.16.0 (transitive), `@microsoft/api-extractor-model` 7.33.11 (transitive), `@orkestrel/guide` `^0.0.17` across the fleet.

**Control identifiers.** none.

**Standing conditions.** The Codex bench is dark, so the design round's objective lane ran on Opus as `reviewer`; the Cursor CLI's web tools were rejected, so the web research ran on the native `researcher`. State both in § Record. `PROPOSAL.md` does not exist yet; `.agents/skills/orkestrel-debrief/references/retention.md:44` fixes its lifecycle ("A proposal for work nobody has ruled on yet. Deleted after the work lands or the proposal is refused.").

## Unknowns

- The exact shape of the `@orkestrel/guide` render API is a design the first unit settles; name it in the proposal as a proposed shape (a `render` direction beside `Guide` and `Source`, single-word entity API per `AGENTS.md` § Design laws), never as an existing symbol.

## Scope

**Owned.** `PROPOSAL.md` (create).

**Shared (report-only).** none.

**Off-limits.** Every other file, including `guides/README.md`, `ROADMAP.md`, `README.md`, every guide, every rule file, and every file under `tmp/` and `.orkestrel/`.

**What asserts the state this change ends.** `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` (exit 0). Nothing else in the tree reads `PROPOSAL.md`.

**Tools and limits.** Read, Grep, Glob, Write, Edit on the owned file; Bash for the two `oxfmt` commands on `PROPOSAL.md` and for read-only inspection (`grep`, `sed -n`, `wc`). No install, no build, no test run, no git command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## The document

Write it for two readers at once: the owner deciding, and an agent that will later be dispatched to implement the chosen option and needs the mechanism exact. Lead with the decision. Keep every sentence checkable: a claim about the tree carries a pointer; a claim about a tool carries the version; a claim about cost names the files.

Use this outline, with these headings in sentence case (adjust wording, keep the order and the content of each):

1. `# Documentation pipeline proposal` and a one-paragraph blockquote stating the recommendation in plain words: which option to start with, what it removes, what it keeps, what it costs.
2. `## Summary` — the decision first: the recommended path (Option 3 as the floor, then Option 1 in its stages, with Option 2 kept in view as the maximal alternative and when it becomes worth taking), the constraints every option meets, and what is refused. Under a subheading, a table with one row per option: what it removes, what it adds, dependency delta, fleet cost, reversibility (from the reconciliation's ranked table).
3. `## What the evidence shows` with subsections:
   - `### Where one fact lives at more than one site` — the measured pairs (absorb row 4: `Materializer`, `Origin`, `HOST_PATHS`, the Origin `@remarks` against the table, the `Compiler` example against the fence; the two disagreements) and the README overlap (absorb row 10, including `npx scaffold` against `scaffold <verb>`).
   - `### What the multi-site edits cost` — the commit list from absorb row 5 as a table (hash, subject) and the reading Lens O gives it (dominated by prose corrections, not renames); the ROADMAP rows already recording guide and TSDoc voice repair.
   - `### What the checks prove and what they miss` — Lens O's two tables and the "presence guard is the trap" paragraph; EX declared but not run in scaffold; TE folded into LI (reconciliation § Referrals); the three live drifts the checks pass over.
   - `### What the installed tools permit` — a table: tool, installed version, what it parses, what it emits, what it lints or formats, whether a JS plugin reaches it, new dependency or not (from the two research distillates and the measurements); then a paragraph on the precedents (Rust, Go, Python execute examples; Deno/JSR score documentation; every one keeps the comment on the declaration) and the prose linters (Vale can read comments in source; none is installed).
   - `### The constraints every option must satisfy` — Lens O's C1 to C15, each in one or two sentences with its pointer.
4. `## Option 1 — Reference regions rendered from TSDoc (recommended)` with the blocks in this order and under `###` headings: Mechanism; Worked example; Edit cost; Checks; Humans and agents; Migration; Risks and open questions; Claims. Build it from Lens B options B1 and B2 (regions, markers, stages, the region-currency and containment checks, the precedent), Lens A option A2 (the extractor is `@orkestrel/guide`'s text-only scanner extended from the `@example` chain reader to first sentences; the render lives in `@orkestrel/guide`; `npm run docs`; no build; no dependency move), Lens C options C1 and C2 (the amendment to `.claude/rules/documentation.md:35`: the row is the TSDoc first sentence verbatim with `{@link X}` rendered as code; refuse the opener table per R1), and Lens A option A3 with Lens C option C3 for Stage 3 (the README head region, the first check `README.md` has had). State the three stages per R5 and the fallback carry-forward mode. In the worked example show `Origin` (TSDoc unchanged; the generated `## Surface` region; the authored Ownership table that stays) and `createBlueprint` (the row derived from `src/core/factories.ts:8` closing the `Constructs`/`Construct` pair). Rule on every check per R6, naming the tautology and its replacement. Under Humans and agents, state R9: one artifact for both readers; the voice law stated once and enforced by Option 3; the hover, the guide row, and the rollup carry one sentence; the agent's entry stays `AGENTS.md`, the rule map, and `guides/README.md`. Under Migration, give the order by edge class (the `@orkestrel/guide` development bump: re-pin and gates, no cascade; scaffold seeds the script and markers in `new`'s templates; each package adds markers and runs `docs` on its own schedule; `probe` hand-rolls its harness and is named), what stays byte-identical for mirrors, and the stale-mirror fact settled in the reconciliation. Under Risks, name the scanner miss rate against the compiler API, the first regeneration's diff, the multi-region splice, oxfmt stability, and the `birth` and `Compiler` drifts this option does not close (R10). Claims: five, falsifiable, with the refuting evidence.
5. `## Option 2 — TSDoc as the single source, the guide generated whole` — the same eight blocks, from Lens A options A1 and A2 with A3's multi-render as its extension: every guide sentence moves into the TSDoc of the symbol that owns it (`@remarks` for chapters, `@packageDocumentation` for the tagline and cross-cutting limits, `@example` for every fence), a whole-file render with byte equality replacing SB, MB, LI, TE, FL, FI as generator invariants, executed fences read from `@example`. Show the full `createBlueprint` block from Lens A and the passage it produces. State the extractor choice honestly: the guide scanner keeps the dependency delta at none; the compiler API moves `typescript` onto scaffold's runtime edge and needs the owner's request (R2, Lens O C1 and C5). Carry Lens O's falsification A1 to A5 into Risks and Claims: name the guide's H2 sections that have no owning symbol as the test that decides the option, the prose-heavy source risk, the `jsdoc` formatting question, and reversibility (authored prose deleted). This is the option that closes the `birth` substance disagreement and the `Compiler` example disagreement (R10); say so.
6. `## Option 3 — The voice gate: the prose law enforced where the prose lives` — the same eight blocks, from Lens C option C1 and Lens B's `policy/tsdoc-voice`: `policy/summary` (third-person `-s` opener, no symbol-name repeat) and `policy/prose` (the substitution table) in `configs/policy.ts` over comment text through `getAllComments` (`plugins-dev.d.ts:2697`, `:1315-1318`), each with a `PolicyControl` drawn from outside its membership; the Markdown term sweep in the vendored policy sweep with the denylist as frozen data derived from `.claude/rules/writing.md` § Substitutions and a currency check where the canon exists, excluding mirrors, fences, and backticked tokens; the summary-equality pairing of each TSDoc first sentence with its Surface row; the oxfmt `jsdoc` flip only after the measured diff over `src/core/`. State that it removes no edit site and converts silent drift into a red gate, that it composes with Options 1 and 2, and that it is a vendored-only scaffold release (bump, publish, per-target re-pin, `repair`, gates, one rewrite per target). Worked example: `createBlueprint` (`Constructs` against `Construct`) and `src/core/helpers.ts:61` against `guides/scaffold.md:221`. Claims: Lens C's C1.1 to C1.5.
7. `## Recommendation and order` — Option 3 first (it changes no artifact's shape and makes the later options' output checkable), then Option 1 Stage 1 after the six probes, then Stages 2 and 3, then a measured re-reading of the multi-site commit rate over one release cycle before deciding whether Option 2's whole-guide render is worth its editorial pass. Name what the owner must decide now: the `.claude/rules/documentation.md:35` amendment (R1), the render's home in `@orkestrel/guide` (R4), and whether `typescript` may ever move to a runtime edge (R2).
8. `## Refused on the evidence` — TypeDoc and `typedoc-plugin-markdown`, `@microsoft/api-documenter`, the api-extractor doc model as a reader, a split reference file, the `SUMMARY_VERBS` opener table, `llms.txt` as an authored second index (permitted only as a generated digest under Option 2's extension) — each with the one reason and its pointer.
9. `## Probes before the first unit` — the six from the reconciliation, each with the command or the comparison that settles it.
10. `## Record` — the campaign folder `.orkestrel/campaign/docs-proposal/` and its files, the bench substitutions, and the retention rule for this file.

Length: whatever the content needs; every block above is required and none is a placeholder.

## Output

`PROPOSAL.md` written, formatter-clean. Your final message is a report in this shape and nothing else:

- `Written`: the path and its line count from `wc -l`.
- `Format`: the exact `oxfmt --check` command and its last output line.
- `Rulings applied`: R1 to R10, each with the section that carries it.
- `Deviations`: any ruling you could not apply as written and why, or `none`.
- `Flags`: any sentence in your own draft you consider weaker than its evidence, with its line.

## Deviation contract

Stop and report if a named input file is missing or if a ruling in the reconciliation contradicts a constraint in Lens O's report in a way you cannot present without misstating one of them. A choice of wording, heading, or table shape is yours: decide it, record it under Flags where it matters, and continue.

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` exits 0.
2. Every section of the outline is present and filled.
3. Every claim about the tree or a tool carries a pointer or a version.
4. No count in prose (sweep your draft for a numeral followed by a plural noun that names a set; a version, a line number, a date, a measurement with its command, and a byte size are values and stay).
5. No `should`, `via`, `simply`, `just`, `easy`, `leverage`, `utilize`, `e.g.`, `i.e.`, `etc.`, `currently`, `now`, `new` (as a date), `latest`, temporal `once`, or `above`/`below` as a pointer; sweep case-insensitively and across inflections and rule each hit by its sense.
6. Headings in sentence case; every list, table, and fence introduced by a complete sentence.
