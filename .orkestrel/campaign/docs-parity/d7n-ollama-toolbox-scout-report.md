I'll read the scout brief and the governing orchestration files first, then run the bounded read-only assignment.Acting as the read-only scout. I'll load the named rules and skills, then map the campaign files and live package state.The campaign folder is large. I'll pull the named skills and locate only ollama/toolbox briefs, verdicts, and reports.Campaign files are identified. Next I’ll read the retained verdicts and reports, then inspect live git and package state in both checkouts.Retained campaign files are mapped. Next I’ll inspect live git and package state in both checkouts, plus native-entry and owner-dirty paths.# Remaining native-guide and release preparation — Ollama and Toolbox

Live checkouts still sit on the campaign branch `claude/orkestrel-npm-audit-deps-14ibta`. Neither tree has a later commit than clone. Native `GuideCommand` is absent. Manifests still declare the pre-Agent/Probe pin set. Root owns the next catalog, registry, and ancestry refresh; this report does not sequence a layer from remembered publication data.

## Observed live state

**Ollama** (`C:/Users/mikes/WebstormProjects/ollama`)

- Branch file `/.git/HEAD` → `refs/heads/claude/orkestrel-npm-audit-deps-14ibta`.
- Tip `/.git/refs/heads/claude/orkestrel-npm-audit-deps-14ibta` = `98e9c3402f4ce7ac45c4d5b16b37da42399f9ca9`.
- Packed `origin/main` = `0f6b106039cb0edc98191e44d266a8b2f9db1cac`. Campaign branch packed ref equals the local tip. `/.git/logs/HEAD` records only the clone onto that tip.
- `package.json:2` version `0.0.15`. Lockfile root matches (`package-lock.json:2-9`).
- No `peerDependencies`. Runtime ranges: `agent ^0.0.20`, `budget ^0.0.9`, `contract ^0.0.16`, `ndjson ^0.0.9`, `timeout ^0.0.9`, `tool ^0.0.13` (`package.json:75-81`). Development: `abort ^0.0.9`, `guide ^0.0.17`, `probe ^0.0.12`, `router ^0.0.13`, `scaffold ^0.0.63`, `server ^0.0.18`, `test ^0.0.13`, `workspace ^0.0.7` (`package.json:83-92`).
- Lockfile resolved roots stay on that older graph (`package-lock.json:137-139` agent `0.0.20`; `:194-196` contract `0.0.16`; `:230-232` guide `0.0.17`; `:333-335` probe `0.0.12`; `:416-418` scaffold `0.0.63`).
- Installed overlay diverges: `node_modules/@orkestrel/guide/package.json` version `0.0.18`; installed `agent` `0.0.20`, `contract` `0.0.16`, `scaffold` `0.0.63`, `probe` `0.0.12`.
- Native entry is the `createGuide` drop-in. `tests/guides.test.ts:1-3` still names that drop-in; `:8-22` import `createGuide`, `createSource`, `createSourceManager`, `findDrift`, `parseManifest`, and the other `@orkestrel/guide` helpers; `GuideCommand` is absent. `package.json:64` `test:guides` is the Vitest `guides` project. `package.json:73` still runs `scripts/docs.ts`. Executed package cases start at `tests/guides.test.ts:265` `describe('flagship fences')`.
- No `ROADMAP.md`. Guide index: `guides/README.md:10` hermetic `tests/src/server` and live `tests/service`.
- Working-tree content matches the uncommitted fix candidate: `guides/ollama.md:8` opening sentence, `:62-86` filled `Shape` cells, `:112` `Either way`, `tests/setup.test.ts:140` `earlier`. HEAD has not moved, so those bytes are not in the tip commit.
- Standing service limit: `guides/ollama.md:12` and `:123` — `service` requires the daemon, model `qwen3.5:2b-q4_K_M`, no `skipIf`. `package.json:68` `prepublishOnly` includes `test:service`. `tests/guides.test.ts:261-264` keeps live fence claims in `tests/service`.

**Toolbox** (`C:/Users/mikes/WebstormProjects/toolbox`)

- Same campaign branch. Tip `f8175e9d241a3853cb7d1ee52b2dd9a68a53adfe`. Packed `origin/main` = `8a67ffa47c5db1cd3f7e3667610502923a9a4669`. Clone-only `/.git/logs/HEAD`.
- `package.json:2` version `0.0.13`. Lockfile root matches.
- No `peerDependencies`. Runtime: `agent ^0.0.20`, `contract ^0.0.16`, `database ^0.0.13`, `form ^0.0.5`, `relation ^0.0.11`, `server ^0.0.18`, `terminal ^0.0.14`, `tool ^0.0.13`, `workflow ^0.0.17`, `workspace ^0.0.7` (`package.json:86-97`). Development: `guide ^0.0.17`, `probe ^0.0.12`, `scaffold ^0.0.63`, `test ^0.0.13` (`package.json:98-103`).
- Lockfile resolved: agent `0.0.20`, contract `0.0.16`, relation `0.0.11`, workflow `0.0.17`, guide `0.0.17`, probe `0.0.12`, scaffold `0.0.63`.
- Installed overlay: guide `0.0.18`; workflow `0.0.17`; relation `0.0.11`; scaffold `0.0.63`; probe `0.0.12`; agent `0.0.20`.
- Native entry is the same `createGuide` drop-in (`tests/guides.test.ts:1-3`, `:6-20`). Package helpers at `:22-34` (`clampQuery`, `completeTaskDraft`, `createEndpointTool`, …). Flagship cases at `:285`. `package.json:73` Vitest `test:guides`; `:84` `scripts/docs.ts`. `INTERNAL` keeps `class TerminalBridge` and `class TerminalConnection` (`tests/guides.test.ts:61-64`).
- Live `guides/toolbox.md:47` `### Resolvers`; `:67` guard-table sentence alone. Guide index: `guides/README.md:9`. No `ROADMAP.md`. No live service project.

## Retained carriers (historical unless noted)

**Ollama**

- Audit FAIL: `d7n-ollama-audit-verdict.md` items O1–O10 into `d7n-ollama-converge-fix-brief.md`; close items ride O10 from `d7n-ollama-close-brief.md`. No close report exists as a separate unit.
- Returned candidate, not accepted: `d7n-ollama-fix-return-status.md`; report `d7n-ollama-converge-fix-report.md`; dirty list `d7n-ollama-converge-fix-return.status.txt`; host result `d7n-ollama-converge-fix-host-result.json`. Writer marked every shell gate **NOT RUN** (`d7n-ollama-converge-fix-report.md:195-205`). Denied read of the abort pilot header (`d7n-ollama-converge-fix-host-result.json` `denials`). Scope question: `tests/setup.test.ts:140` is an unreachable error string, not a comment (`d7n-ollama-fix-return-status.md:8-10`; report `:80-86`).
- Later landing-scope record: `d7n-landing-ollama-scope-check-report.md` admits only `ollama:fix:` on `tests/setup.test.ts` and the named `tests/service/{budget,tools,lifecycle,compaction,OllamaProvider}.test.ts` paths (`d7n-landing-ollama-scope.diff.txt:6-8`). Checker PASS; landing body was not executed.
- Scoped host chain (historical, candidate tree): `evidence/d7n-ollama-host-readonly/{audit,format,lint,types,docs,guides,policy}.log.txt` each `exit=0`, including audit controls PASS. `d7n-scaffold-path-retention-note.md:35-36` states that chain does **not** establish final-artifact closure or acceptance of the candidate’s scope. `test:service`, `test:src:server`, docs write directions, and the pilot header diff are absent from that packet.
- Root origin reading (historical): `evidence/d7n-upper-layer-reading/ollama/` HEAD `98e9c34…`, `origin/main` `0f6b106…`, `ancestry.exit.txt` `0`, `status.txt` the same dirty paths. Live refs still match. Historical registry packument there serves `0.0.14` / `gitHead` `76577410…` — not a live registry read.
- Prep/converge reports exist (`d7n-ollama-prep-report.md`, `d7n-ollama-converge-report.md`) against older landed commits. No ollama check brief, verify brief, or closure verdict.

**Toolbox**

- Audit FAIL then fix T1–T7: `d7n-toolbox-audit-verdict.md` → `d7n-toolbox-converge-fix-brief.md`. Close successor `d7n-toolbox-close-2-brief.md` / `-report.md` (docs `disagreements found: 0`, `test:guides` passed under `scripts/docs.ts`). Closure checker PASS: `d7n-toolbox-closure-checker-toolbox.md`.
- Verify brief exists: `d7n-toolbox-verify-brief.md`. No verify report. No closure verdict. Handoff next step remains verifier then verdict then `main` (`handoff.md:498`).
- Upper-layer reading: HEAD `f8175e9…`, `origin/main` `8a67ffa…`, ancestry `0`; no `status.txt` (clean at that reading). Live refs still match. Historical registry packument serves `0.0.12` / `gitHead` `ceeff856…`.
- Close-2 / checker greens used the `0.0.18` guide head-start over declared `^0.0.17` (`d7n-toolbox-verify-brief.md:8-9`; `d7n-toolbox-close-2-report.md:55-84`). That is not native-entry or current-registry preparation.

**Shared retained instruction**

- `d7n-agent-probe-catalog-result.md:11` historically placed Ollama and Toolbox in L6 after the dependent uploads.
- `d7n-agent-probe-layer-plan.md:35-37` and `d7n-agent-probe-registry-closure.md:22-23` keep Ollama/Toolbox outside the Agent/Probe upload layer, require catalog regeneration, and preserve Ollama’s edits.
- Agent/Probe confirmation is retained in `d7n-agent-probe-registry-closure.md` and `d7n-agent-probe-preparation-state.md`. Their publication is not this scout’s scope.

## Missing preparation evidence

- Catalog regeneration after Agent/Probe confirmation (root-owned).
- Live registry packuments and fresh `git fetch` / merge-base for these two checkouts (root-owned).
- Native `GuideCommand` adoption in `tests/guides.test.ts`; retirement of `scripts/docs.ts` / `scripts.docs`.
- Re-pin of runtime, development, and any later peer ranges from the regenerated catalog; lock regeneration; supported overwrite/audit; `prepublishOnly`; pack; campaign/`main` closure.
- Ollama: independent review of the setup-test string and comment-only claim; landing; check/verify/closure artifacts; `test:service` / `test:src:server` on the candidate; docs write-direction fixed point; pilot header comparison.
- Toolbox: whole-chain verifier receipt and closure verdict. No later owner-edit scope record.

## Unknowns and refused commands

Ask-mode shell rejected `git -C` (`status`, `rev-parse`, `log`). Refs were read from `.git/HEAD`, branch files, `packed-refs`, and `logs/HEAD`. Live Toolbox porcelain is therefore unread in this pass; Ollama dirtiness is inferred from working-tree bytes that match the retained candidate while HEAD stays `98e9c34…`.

Not run, per brief: `git fetch`, registry/`npm view`, installs, gates, builds, authentication, uploads. No worktree. No secrets read.

Historical greens (toolbox close-2 docs/`test:guides`; ollama host-readonly scoped chain; registry `0.0.14` / `0.0.12` packuments) do not close current native-entry or release preparation.
