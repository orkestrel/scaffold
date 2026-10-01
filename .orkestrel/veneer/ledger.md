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
