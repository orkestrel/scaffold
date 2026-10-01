# `@orkestrel/veneer` routing ledger — foundation campaign

Every dispatch of the foundation campaign, its engine, its transport, its duration, and its outcome. Durations are the journal's `durationMs` rounded to seconds. The bench journals under the scaffold checkout's `tmp/cursor/` and `tmp/codex/` were swept on 2026-10-01; each unit's brief and report are archived in git history at the sweep commit's parent.

## Substitutions and standing readings

- A Claude CLI lane launched for the round-1 subjective audit answered the word `Read` in 8 s after `Start-Process` split its prompt; the user ruled that Anthropic models run natively here, and the lane was discarded and re-dispatched through the Agent tool.
- A native Agent-tool subagent receives no shell in the desktop app on this Windows host. `foundation-fix-4` (Opus) edited its files and stopped at its first command; the Orchestrator ran its gates. From `foundation-fix-5` on, a unit that must build, test, or benchmark runs on Astra through `codex exec --sandbox danger-full-access`, and an Opus unit (`foundation-fix-9`) receives edits only plus a command list.
- `codex exec` under `danger-full-access` refused one recursive delete inside `tmp/probes/` ("blocked by policy", `foundation-fix-5`); the unit stopped under the permission floor and the Orchestrator deleted the directory.
- `Start-Process -ArgumentList` splits an argument with spaces in Windows PowerShell 5.1; every bench launch is a TypeScript launcher file under `tmp/codex/` run with `node`.
- Vite's dependency optimizer reloaded a browser test mid-run in the first full `npm test` (2026-09-30); `optimizeDeps.include` on every browser project closed it.

## Absorption lanes (Grok 4.7, Cursor bench, one at a time)

| Lane | Subject | Duration | Outcome |
| --- | --- | --- | --- |
| `ROADMAP-AUDIT` | the local roadmap read against the old one | 657 s | distillate |
| `absorb-engine-rulings` | the old engine's design rulings | 764 s | distillate, 148 citations |
| `absorb-engine-terrain` | the old engine's terrain and the preflight probe | 865 s | distillate |
| `absorb-engine-findings` | the old engine's audit findings | 803 s | distillate |
| `absorb-styles-plan` | the old styles plan (recreation, token, proof facts) | 684 s | distillate |
| `absorb-styles-baseline` | the old Bootstrap baseline records | 1188 s | distillate |
| `absorb-styles-identity` | the Elements identity rulings and what the successor drops | 835 s | distillate |
| `absorb-old-roadmap` | the old roadmap's tenets, rulings, and protocol | 1024 s | distillate, 153 citations |
| `absorb-styles-source` | the old cascade's mechanisms, tokens, and mixins | 1327 s | distillate, 319 citations |
| `absorb-tailwind` | the old Tailwind compatibility proofs and recipes | 610 s | distillate, 186 citations |
| `absorb-old-guide` | the old guide's engine departures and limits | 549 s | distillate, 222 citations |
| `absorb-engine-contract` | the old engine's wire tables and types | 724 s | distillate, 344 citations |
| `absorb-engine-mechanisms` | the old engine's platform mechanisms | 571 s | distillate, 303 citations |
| `absorb-test-infra` | the old test infrastructure | 742 s | distillate, 134 citations |
| `absorb-showcase` | the old showcase | 425 s | distillate, 190 citations |
| `absorb-styles-reports` | the old styles unit reports | 729 s | distillate, 276 citations |
| `absorb-engine-reports` | the old engine unit reports (the oracle recordings against Bootstrap's bundle) | 827 s | distillate |

Every distillate's citations resolved against the tree at the time it was saved (`cite.ts`, 0 unresolved each). The absorption lanes cited the old repository's clone under `tmp/mikesaintsg-veneer/` and the prior campaign's records under `.orkestrel/veneer/`, which this campaign swept on 2026-09-30; both resolve in git history at `9cc22b237`, the last commit before the sweep, and the clone's commit is `86491c2`.

## Audit, design, and fix lanes

| Unit | Lane | Engine | Transport | Duration | Outcome |
| --- | --- | --- | --- | --- | --- |
| `foundation-audit` | objective | GPT-6 Astra | `codex exec` | 789 s | 23 of 27 claims broken; verdict retained |
| `foundation-audit` | subjective | Claude Opus 5.5 | native Agent | — | same rulings |
| `foundation-fix-1` | writer | GPT-6 Astra | `codex exec` | 818 s | gates, collection, fences, loaders, exports |
| `foundation-fix-2` | writer | GPT-6 Astra | `codex exec` | 501 s | guide, journeys, showcase stamp; Orchestrator closed lint and journey findings |
| `foundation-design` | subjective | Claude Opus 5.5 | native Agent | — | proposal |
| `foundation-design` | objective | GPT-6 Astra | `codex exec` | 641 s | proposal, 108 citations |
| `foundation-fix-3` | writer | GPT-6 Astra | `codex exec` | 336 s | registry re-keyed; stopped at lint; Orchestrator closed three array-type diagnostics |
| `foundation-fix-4` | writer | Claude Opus 5.5 | native Agent | 414 s | stamp over the final page; no shell; Orchestrator ran gates; test project removed on the user's ruling |
| `scout` | read-only | Claude Opus 5.5 | native Agent | 109 s | wiring report for units 5 and 6 |
| `foundation-fix-5` | writer | GPT-6 Astra | `codex exec` | 813 s | Chromium face projects, `conformance`, instrument; stopped at probe cleanup; Orchestrator closed lint and ran gates |
| `foundation-fix-6` | writer | GPT-6 Astra | `codex exec` | 429 s | order line, `$layered`, `layer`/`unlayer`; green |
| `foundation-fix-7` | writer | GPT-6 Astra | `codex exec` | 387 s | theme packs and built themes sheet; green on rerun after an optimizer reload |
| `foundation-fix-8` | writer | GPT-6 Astra | `codex exec` | 360 s | composition proof; green |
| `foundation-fix-9` | writer | Claude Opus 5.5 | native Agent | 707 s | guide sections; no shell; Orchestrator ran gates |
| `foundation-fix-10` | writer | GPT-6 Astra | `codex exec` | 384 s | six guide sentences pinned; green |
| `foundation-audit-2` | objective | GPT-6 Astra | `codex exec` | — | FAIL 2, 7, 10, 11, 13, 14; outside O1; no tracked change |
| `foundation-audit-2` | subjective | Claude Opus 5.5 | native Agent | 680 s | FAIL 3, 8, 10, 11, 13, 14; outside F1 to F6 |
| `foundation-fix-11` | writer | GPT-6 Astra | `codex exec` | 598 s | nineteen items landed; stopped on one new case whose banner anchor ignored the byte-order mark; Orchestrator closed it; the tree-wide chain then exited 0 for every gate, and both mutation probes (an order-insensitive round trip; a whole-file tokens exemption) reddened exactly the cases that name the instruments |

## Chunk 1, the Bootstrap cascade (opened 2026-10-01)

Standing readings and rulings for the chunk:

- The user ruled on 2026-10-01 that Grok 4.7 at Extra High effort (`grok-4.7-xhigh`, listed by `agent models` on this date) carries every absorption, distillation, and mapping lane of the chunk and as much bounded mechanical work as its read-only transport admits; Opus 5.5 and GPT-6 Astra carry design, review, and judgment; Sonnet 5.5 only where needed; never Fable as a subagent. The transport contract pins `grok-4.7-high`; the chunk launches with the Extra High id and records the departure here.
- `bench.ts --cursor --model grok-4.7-high` answered `READY` in 13 s (live) on 2026-10-01 before the first lane.
- The user ruled on 2026-10-01, during the absorb phase: (a) every check runs against Bootstrap's bundled `dist/css/bootstrap.css`, never against the Sass sources directly, which explain generation only; (b) the chunk maps Bootstrap completely first, the `!important` declarations above all, as a durable record, so a later deviation is made knowingly and stays traceable; (c) `src/core` keeps the registry of every token group (`bootstrap` now, `veneer` later) so the tokens are mapped and tested deterministically against the CSS that declares them and reach the consumer in JavaScript.
- Bootstrap 5.3.8's exported `bootstrap.css` measures 280311 bytes, 12048 lines, 1716 `!important` occurrences, 109 `@media` blocks, no `@layer`, and ships `bootstrap.css.map` with 74 sources and their content, so a region slicer attributes every top-level statement to its Sass partial (`veneer/tmp/units/cascade-regions.ts`).
- Bootstrap declares 127 distinct `--bs-*` names across 7 top-level `:root` or `[data-bs-theme]` blocks (`veneer/tmp/units/cascade-root-names.ts`): the registry's 117 plus the 6 `--bs-breakpoint-*` names, `--bs-btn-close-filter` from `_close.scss`, and `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and `--bs-carousel-control-icon-filter` from `_carousel.scss`.

| Unit | Lane | Engine | Transport | Duration | Outcome |
| --- | --- | --- | --- | --- | --- |
| `cascade-map`, first run | absorb | Grok 4.7 Extra High | Cursor bench, `--mode=ask`, session `c02d8413-2085-4313-a67b-51b1303c63f2` | 992 s | 204 reads; the final message was cut at 11.4 KB after the `_type.scss` subsection (§ Partial map complete for all 53 regions; § Generation facts for `_root`, `_reboot`, `_type`); citations were spelled relative to the Bootstrap package root and normalised to veneer-root paths by the Orchestrator (40 citations, 0 unresolved after the rewrite); the remaining sections are collected in slices under 9 KB through `--resume` on the same session |
| `cascade-map`, slices 2 to 7 | absorb | Grok 4.7 Extra High | Cursor bench, `--resume` on the same session (the `init` event carries the same id and the model name `Grok 4.7 256K Extra High`) | 134 s, 145 s, 226 s, 139 s, 309 s, 227 s | each slice saved from its journal, normalised to veneer-root citations (a preamble glued to the first heading or table row is split off), and checked: 61, 54, 54, 92, 180, and 70 citations, 0 unresolved each; the 136 important-declaration rows of slices 5 and 6 match `tmp/units/cascade-facts.json` row for row on line, property, and placement (`tmp/units/check-importants.ts`, 0 failures); a ten-line sample per slice read true against the tree, one citation naming a rule's first declaration line instead of its selector line |
| `cascade-map`, slices 8 to 12 and assembly | absorb | Grok 4.7 Extra High | Cursor bench, `--resume` on the same session | 276 s, 145 s, 86 s, 116 s, 170 s | 178, 106, 45, 59, and 11 citations, 0 unresolved each after normalisation (slice 11 spelled partials bare, `_root.scss:13`, and the normaliser gained that rule); slices 9 and 10 cover exactly the 97 keys of the `$utilities` map (71 through `font-weight`, then 26); slice 8 counts 178 build-time declarations with no Sass origin, whole duplicated `::-webkit-file-upload-button` rules included; slice 12 reports two attribution notes (the `@charset` line sits in the banner region; `.btn-group-sm > .btn` closes the buttons region through `@extend`) and names what it did not walk (the full statement list for duplicates, which `tmp/units/cascade-facts.json` covers; the source map); the assembled `tmp/units/cascade-map-distillate.md` measures 137852 bytes with 950 citations, 0 unresolved; the whole series ran 2938 s of bench time over one session |
| `cascade-design`, analyst, first run | objective | GPT-6 Astra | `codex exec`, session `01a0f784-da88-7e70-83b9-5f37f6c0d1b8` | 198 s | stopped under the deviation contract on a premise error in the Orchestrator's brief: question 3 placed the `--bs-breakpoint-*` block in the `_root.scss` output, while the map and the regions attribute it to `_grid.scss` (bundled CSS lines 782 to 790, before `.row`), and the question list skipped a number; no tracked change, no probe; the corrected brief-2 separates registry membership from declaration placement and reruns both lanes as needed |
| `cascade-design`, planner | subjective | Claude Opus 5.5 | native Agent, `model: opus` | 1088 s | a full proposal on the first brief: it read the map, placed the breakpoint block in `_grid.scss` on its own, noted the missing question number, and answered the ten questions (literal exported CSS per region with the utilities as a map plus one emitter; a one-off port instrument run by the Orchestrator; no pivotal row; a 459-name registry partitioned `root`, `local`, `optional`; `BOOTSTRAP_REGIONS` as the durable table; the departure record in the guide; a ten-unit plan); one deviation report on the emitter's home (roadmap `utilities/` against the rule's `_mixins.scss`); accepted as the subjective lane of brief-2 because its answers already rest on the corrected facts; saved to `tmp/units/cascade-design-planner-proposal.md` (123 citations, 0 unresolved after the shorthand paths were expanded) |
| `cascade-design`, analyst, second run | objective | GPT-6 Astra | `codex exec`, session `01a0f789-51a9-7512-9cb5-cbc9ca8a0dcd` | 1420 s | a full proposal on brief-2 (51.6 KB, 183 citations, 0 unresolved; tree unchanged; the probe `tmp/probes/cascade-analyst-2.ts` deleted); its probe compiled the whole bundled CSS as SCSS and all 53 regions in isolation with every important declaration routed through `unlayer` as ordered pairs, equal after one round trip each (235185 bytes), and settled every parser hazard (top-level commas need a parenthesized list, `16/9` needs interpolation, `RGBA(` and data URIs and `"\2014\00A0"` and empty custom properties survive, `@charset` precedes everything in expanded output, the tokens-mixins module loop throws); it rules no pivotal row, recommends a 449-name flat registry without the 10 fallback-only names, a committed lossless inventory `tests/fixtures/bootstrap/oracle.json` verified by a renderer, nested kind files under `utilities/`, mixins parameterised by `$layered`, and a keyframes companion to link 3 |
| `cascade-design`, reconciliation | Orchestrator; the user rules | — | — | — | reconciled in `veneer/tmp/units/cascade-design-verdict.md`: literal exported CSS per region, `unlayer` as ordered pairs, the utilities as a map plus one emitter plus a schedule, the port by a one-off Orchestrator instrument with Grok on the bounded map transcription and the census, the switch declared in `_mixins.scss` and configured by `_tokens.scss`, no pivotal row, a keyframes companion to link 3; the user ruled on 2026-10-01: the registry holds all 449 declared names in the flat tree (the 10 fallback-only names stay out), the map is a committed `tests/fixtures/bootstrap/oracle.json` verified by a renderer and by CSSOM, and the bootstrap face's utilities are one kind file `src/bootstrap/_utilities.scss` with the emitter in `_mixins.scss` and no `utilities/` folder; the convention was amended in scaffold's `.claude/rules/styles.md` (uncommitted, for the next release) and in veneer's `ROADMAP.md` |
