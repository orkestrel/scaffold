# Debrief: the fleet name resolution wave of 2026-10-30

The round debriefs the wave `.orkestrel/plan.md` records, closed 2026-10-31 at scaffold 0.0.121 (`7c73e99ce`). Its evidence is `plan.md`, `ledger.md`, each package's commits, and the deviations quoted in the round's evidence file, ids `E1` to `E20` and `W1` to `W5`, whose text each finding row carries.

## Field evidence

- The wave built no agent-facing surface. Its consumable is the published fleet: the live `scaffold surface` run over all 52 catalog checkouts on 2026-10-31 exits 0 with 0 recorded collisions, and scaffold 0.0.121's `test:templates` project proves the generated workspaces on the published canon.

## Artifact audits

- Layer and boundary: the wave renamed and moved names; it moved no code between `src` and `app` and added no application policy to a package.
- Package promotion: executed inside the wave. contract keeps the shared helpers, limits, and Result guards (item 79), codec keeps `BOM` (item 80), and jsonrpc keeps the JSON-RPC 2.0 wire contract (item 81); every giver imports its keeper.
- Test infrastructure: no local helper duplicates an installed shared export in the units the reviews read. Two catalog scanners were built independently in `tmp/units/` (`census.ts` for dropped-name imports, `compat-sweep.ts` for brand keys and kept names), beside a chain-plan writer (`release-plan.ts`) that `ROADMAP.md` item 69 already names; D19 carries them.

## Instruction audit

Two blind lanes ran on the same brief in clean contexts: the subjective lane (`reviewer`, Claude Opus 5.5) and the objective lane (`reviewer` assigned the objective lane, Claude Opus 5.5, because the GPT-6 Astra bench is dark until 2026-11-04 per `.agents/orchestration.md` § Benches). The subjective lane returned S1 to S12, the objective lane O1 to O17.

## Findings

| Id | Lanes | Evidence | Finding | Bucket | Carrier |
| --- | --- | --- | --- | --- | --- |
| D1 | S1, O2 | E3, W5 | `orkestrel-publish/references/wave.md` orders visits "in parallel slices"; `orkestrel-parallel/SKILL.md` § Bound the host allows one process-running lane, and the slices produced every E3 timeout | Skill refinements | unit debrief-prose |
| D2 | S2, S4, O1 | E17, E10, W3 | With Astra dark, `opus` writes and the contract names no reviewer engine apart from the writer's; the reviewer charter fixes Opus; no brief or commit records the substitution; § Benches moves "the objective lane" without saying who takes `astra`'s units | Orchestration-contract refinements; Charter refinements | unit debrief-prose |
| D3 | S3 | E17, W3 | The `opus` charter says its load is subjective and carries no "hold the lane the dispatch names" clause, yet held every objective unit under the swap | Charter refinements | unit debrief-prose |
| D4 | S4 | none | `orkestrel-harden/SKILL.md` § Select the work lane uses "lane" for a phase selection, a third sense of the word | Skill refinements | unit debrief-prose |
| D5 | S5 | E3, W5 | The rerun-alone ruling has homes in `orkestrel-dispatch/SKILL.md`, `references/launch.md`, `orkestrel-parallel/SKILL.md`, and `wave.md`, which rule three ways | Root-reference trims | unit debrief-prose |
| D6 | S6 | E10 | `planner` carries the design job on Opus and the Fable consult job, and its charter names Opus alone | Charter refinements | unit debrief-prose |
| D7 | S7, O6 | E5 | Nothing holds a checkout between its release commit and its upload; the `git archive` recovery lives only in `plan.md` | Skill refinements | unit debrief-prose |
| D8 | S8, O3, O4 | E4, E7, E13 | The visit's pins step sweeps only the ranges the visit moved, and `pins.ts` skips `guides/`; scaffold's own visit after `swap.ts --restore` runs a `dist` that imports unserved names | Skill refinements | units debrief-prose and debrief-scripts |
| D9 | O4 | E6 | `scaffold surface` cannot resolve a package from that package's own checkout; the recovery lives only in `plan.md` | Skill refinements; roadmap | unit debrief-prose; `ROADMAP.md` item 115 |
| D10 | S9, O5 | E9, E8 | `wave.md` runs `scaffold catalog` without `--all`; no instruction tracks an added mirror or moves the declared vendored inventory | Skill refinements | unit debrief-prose |
| D11 | S10, O9 | E11 | Which Node a chain runs on is unlawed; npm adds no Node directory to a script's `PATH`; `chain.ts` merges `env` without case-folding names | Skill refinements | units debrief-prose and debrief-scripts |
| D12 | S10, O8 | E15 | No law forbids `npm exec` or `npx` for a package the checkout does not install | Orchestration-contract refinements | unit debrief-prose |
| D13 | S11, O7 | E19 | The push hold fires only on an unpublished local pin, not on a committed range that serves no version carrying the imported names | Orchestration-contract refinements | unit debrief-prose |
| D14 | S12 | E14 | A standing host-bound reading with no `ROADMAP.md` carrier has no home; ollama's dedicated-daemon reading lives only in its release commits | Skill refinements; roadmap | unit debrief-prose; `ROADMAP.md` items 76 and 114 |
| D15 | O10 | E17 | The wave's briefs omit the template's role, engine, and spawn-nothing lines, and `brief.ts --check` checks paths only | Skill refinements | unit debrief-scripts |
| D16 | O11 | E4, E7 | A release visit installs and commits and its chain reinstalls, which `verifier` may not do; no role holds them | Orchestration-contract refinements | unit debrief-prose |
| D17 | O12 | E16, E20 | The Orchestrator's post-review repairs and its 45-guide prose sweep take no review gate; E16 named the wrong actor: ledger row 46 shows the Orchestrator restored `@orkestrel/table.TableError` under the retired clause after the writer had renamed it | Stays as-is: the user's standing direction assigns small post-review fixes to the Orchestrator, and each ledger row names the repair; the attribution is corrected here | this row |
| D18 | O13 | W3 | The review briefs asked a read-only role to run commands and replaced the verdict shape with `holds`, `falsified`, and `unproven` | Skill refinements | unit debrief-prose |
| D19 | O14 | E8, E11 | The wave met `ROADMAP.md` items 68, 69, and 71's reopen triggers and rebuilt their tools in `tmp/units/`; no law makes a campaign opening read reopen triggers | Rule additions, one law each; roadmap | unit debrief-prose; `ROADMAP.md` item 69 |
| D20 | O15 | E1, E2, W4 | `window.md` records no 2026-10-31 code-life reading and asks for the code before re-reading `whoami` | Skill refinements | unit debrief-prose |
| D21 | O16 | none | The objective lens is restated in four charters, drifted in `planner`; the verifier's secret list omits `CURSOR_API_KEY` | Root-reference trims | unit debrief-prose |
| D22 | O17 | E12 | `.claude/rules/tests.md` names filesystem properties as host-varying and not the Node major | Rule additions, one law each | unit debrief-prose |
| D23 | O17 | E10 | A case proving a mechanism read live entries that doctrine empties | Stays as-is: closed in code at scaffold `164909120`, and no second instance in the record | this row |
| D24 | none | E17 | A writer ran command snippets from its own report text | Dropped on the record: no brief or charter line explains it, and no lane transcript survives to trace it | this row |
| D25 | Orchestrator | plan § Exit criterion | `ROADMAP.md` still carried items 77 to 112 | Fix now | the debrief's roadmap commit |
| D26 | Orchestrator | E3 | markdown's, database's, and guide's heavy cases time out at the 5-second default under contention | Roadmap | `ROADMAP.md` item 113 |
| D27 | Orchestrator | E13 | mcp's distribution consumer pins served versions and holds workspace at agent 0.0.33's range | Stays as-is: `pins.ts` reports the block at each visit, and mcp `39e2f00` records the hold | this row |
| D28 | S, O | E18 | The peer session asked for the lane in clock gaps, which `orkestrel-parallel` refuses; the handover complied | Stays as-is: the skill held | this row |
| D29 | S, O | E1, E2, W4 | `window.ts` re-probed `whoami` and resumed after `EOTP` as written | Stays as-is: the skill held | this row |
| D30 | S, O | W1, W2 | Local tarball pins and the declared transfer worked as `release.md` and `names.md` rule 5 state | Stays as-is: the instructions held | this row |
| D31 | Agent campaign | user, 2026-10-31 | `.agents/orchestration.md` § tmp layout names no home for the `@orkestrel/study` executable's output under `tmp/studies/<id>` | Orchestration-contract refinements | the debrief's contract commit |
| D32 | user | user, 2026-10-31 | No law fixes tracked names without hyphens; a JSON file takes one word, as `host.json` does; a convention-fixed name such as a skill directory is the narrow exception, and every path under a dot folder is exempt because a harness reads files there by name (the user, 2026-10-31) | Rule additions, one law each; roadmap | unit debrief-names; `ROADMAP.md` item 116 |
| D33 | Agent campaign | user, 2026-10-31 | "Anything that must be ignored lives under `tmp/`; no `.gitignore` patterns that reach into nested tracked folders" | Rule additions, one law each: the user ruled on 2026-10-31 that root-level tool outputs stay root ignores, no pattern reaches into a nested tracked folder, and dot folders are exempt | unit debrief-ignore |
| D34 | debrief-names writer | the writer's report: "In this session, Claude Code loaded it into context as memory when I read it." | `.agents/skills/orkestrel-parallel/references/claude.md` carries the name Claude Code loads as memory wherever it sits, the case `.agents/transports/claude-cli.md` avoids | Fix now | the page renamed `claude-code.md`, with its citations in the skill, `.claude/AGENTS.md`, and the distribution inventory |
| D35 | layout review | the review of units debrief-names and debrief-ignore | The generated screenshot directory under `tmp/` would also receive `toMatchScreenshot` reference images, which belong in the tracked tree | Roadmap: no catalog package calls the matcher (scan of 2026-10-31) | `ROADMAP.md` item 117 |
