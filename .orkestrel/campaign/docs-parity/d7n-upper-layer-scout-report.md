I'll start by reading the saved brief and every instruction it names, then collect only the evidence it asks for.Next I’ll load the named rules, skills, and campaign files so the bound of the scout is exact.I’ll read the canonical skills, their required references, and the campaign roster next.The bound is the remaining unpublished roster after the uploaded following layer. I’ll pull that roster and the published-set evidence next.Roster and published-set bounds are clear. Next I’ll list the sibling checkouts and read each remaining manifest.I’ll read remaining manifests, local git state, and public registry versions in parallel—no fetches, no archive downloads.L2 registry versions match the prepared tips. Next I’ll confirm the rest of that layer, then read remaining git refs without fetching.# Remaining-layer evidence

Live `npm view` (version and `gitHead` only; no archive download) shows the prepared following layer on the registry at the tips named in `.orkestrel/campaign/docs-parity/d7n-following-layer-prepared.md`. That set joins the handoff-confirmed initial and next layers as the **reported published set**. No `git fetch` ran. Cached `origin/main` is the local packed-ref; root owns freshness.

**Published set (live or closure-confirmed `dist-tags.latest`):** contract `0.0.17`, codec `0.0.3`, msg `0.0.10`, sse `0.0.7`, test `0.0.14`; abort `0.0.10`, budget `0.0.10`, csv `0.0.7`, emitter `0.0.10`, html `0.0.9`, indexeddb `0.0.11`, ndjson `0.0.10`, sqlite `0.0.11`, timeout `0.0.10`, tool `0.0.14`; console `0.0.13` `ed57bc7…`, database `0.0.14` `4453c26…`, form `0.0.6` `0f4f28d…`, markdown `0.0.14` `99978d8…`, pool `0.0.11` `25ea973…`, process `0.0.11` `ea3b717…`, reason `0.0.10` `e7e318e…`, router `0.0.14` `fbc69d7…`, table `0.0.5` `f4805ea…`, template `0.0.7` `c053c4d…`, websocket `0.0.12` `cc62597…`.

**Development cycle (not runtime order).** Guide and scaffold declare runtime edges that now sit in that published set, and also form the Guide/Scaffold/Probe/Test bootstrap named in `d7n-layer-graph-report.md`. Registry still serves Guide `0.0.17` and Scaffold `0.0.63`. Canonical Guide is pending `0.0.18`; canonical Scaffold is pending `0.0.64`. Wave rule: a fleet development dependency publishes on its own account, not in the runtime layer. Database’s historical Probe `0.0.13` overlay remains compiler-helper only (`d7n-following-layer-prepared.md`); it is not MCP/Probe transport proof.

Roster source: `clone-fleet.sh` (`abort` through `workspace`, plus Guide). Scaffold is the orchestrator checkout. Supervisor is outside the pass and has no sibling checkout. No `optionalDependencies` in any remaining manifest.

Declared pins on remaining packages still name the **prior** triples (`contract ^0.0.16`, `emitter ^0.0.9`, …), not the published latest. That is pin-rewrite evidence for a visit, not an unmet package name.

---

## Eligible (runtime/peer/optional names all in the published set)

Working branch unless noted: `claude/orkestrel-npm-audit-deps-14ibta` tracking `origin/claude/orkestrel-npm-audit-deps-14ibta`, porcelain empty. Native `GuideCommand` files are absent for this set (`d7n-<pkg>-native-*` glob empty). Drop-in is `createGuide` plus `scripts.docs` → `scripts/docs.ts`. `test:guides` is the Vitest `guides` project.

| Package | Pending / registry | Release edges | HEAD / cached `origin/main` | Native entry | Authored cases that must survive | Retained blockers |
| --- | --- | --- | --- | --- | --- | --- |
| browser | `0.0.16` / `0.0.15` | runtime contract `^0.0.16`, emitter `^0.0.9`, html `^0.0.8`, websocket `^0.0.11`; no peer/optional | `15aab0e…` = `origin/main` | `tests/guides.test.ts:7-20` `createGuide`; `package.json:87` `docs` | drop-in only (file ends `tests/guides.test.ts:267`) | `d7n-browser-closure-verdict.md` closed at `15aab0e`; `prepublishOnly` includes `test:service` (`package.json:81`) |
| interpret | `0.0.13` / `0.0.12` | contract, emitter, reason `^0.0.9`, template `^0.0.6` | `1b11d3e…` = `origin/main` | `tests/guides.test.ts:8-21` | `describe('flagship fences')` `tests/guides.test.ts:352` | `d7n-interpret-closure-verdict.md` closed at `1b11d3e` |
| lsp | `0.0.7` / `0.0.6` | contract, emitter, process `^0.0.10` | HEAD `c4842c8…`; `origin/main` `f62aec4…` (SHAs differ; ancestor unmeasured) | `tests/guides.test.ts:16-28` | `advertised position encodings` `:281`; `framing bytes yourself` `:296` | no closure verdict; `d7n-lsp-audit-verdict.md` L1–L8; `d7n-lsp-close-2-report.md` landed; `d7n-lsp-check-brief.md` / `d7n-lsp-verify-brief.md` unclosed per `handoff.md` |
| qualifier | `0.0.14` / `0.0.13` | contract, emitter, reason | `7a65257…` = `origin/main` | `tests/guides.test.ts:7-20` | `flagship fences` `:275` | `d7n-qualifier-closure-verdict.md` closed at `7a65257` |
| queue | `0.0.13` / `0.0.12` | abort `^0.0.9`, contract, database `^0.0.13`, emitter, timeout `^0.0.9` | `1ae3fa1…` = `origin/main` | `tests/guides.test.ts:7-20` | `guide fences` `:275` | `d7n-queue-closure-verdict.md` closed at `1ae3fa1` |
| rater | `0.0.14` / `0.0.13` | contract, emitter, reason | `76fab91…` = `origin/main` | `tests/guides.test.ts:7-20` | `flagship fences` `:284` | `d7n-rater-closure-verdict.md` closed at `76fab91` |
| relation | `0.0.12` / `0.0.11` | contract, database, emitter | `d6945c9…` = `origin/main` | `tests/guides.test.ts:7-20` | `executable guide fences` `:275` | `d7n-relation-closure-verdict.md` closed at `d6945c9` |
| sea | `0.0.15` / `0.0.14` | contract, emitter, process | `76cfbe2…` = `origin/main` | `tests/guides.test.ts:7-20` | `sea.md fences` `:274` | `d7n-sea-closure-verdict.md` closed at `76cfbe2`; carried comment residue in that verdict; `engines` `>=24.8.0` (`package.json:93`) while this host’s npm warn names Node `v24.5.0` |
| server | `0.0.19` / `0.0.18` | abort, codec `^0.0.2`, contract, emitter, router `^0.0.13`, timeout | `9d35664…` = `origin/main` | `tests/guides.test.ts:17-30` | `guide fences` `:276` | `d7n-server-closure-verdict.md` closed at `9d35664` |
| terminal | `0.0.15` / `0.0.14` | console `^0.0.12`, contract, database, emitter, form `^0.0.5`, sse `^0.0.6` | HEAD `0b01536…`; `origin/main` `a33b4c1…` (SHAs differ; ancestor unmeasured) | `tests/guides.test.ts` drop-in plus executed `guide fences` `:342` | `guide fences` `:342` (T7: keep additive/executed section) | `d7n-terminal-audit-verdict.md` T1–T7 open; checker not run; `d7n-terminal-converge-fix-windows-brief.md`; no closure verdict |
| workspace | `0.0.8` / `0.0.7` | contract, database, emitter | `eb02ec0…` = `origin/main` | `tests/guides.test.ts:24-37` | `flagship fences` `:280` | `d7n-workspace-closure-verdict.md` closed at `eb02ec0` |

---

## Guide / Scaffold (prereqs published; development cycle)

| Package | Pending / registry | Runtime edges | Branch / dirty | Native entry | Authored cases | Pointers |
| --- | --- | --- | --- | --- | --- | --- |
| guide | `0.0.18` / `0.0.17` | contract `^0.0.16`, markdown `^0.0.13` | campaign `327470a…`; cached `origin/main` `d3ee1bb…`; porcelain empty | `tests/guides.test.ts:4-25` `GuideCommand`; `test:guides` is `node --experimental-strip-types tests/guides.test.ts`; no `docs` script | `flagship fences` `:170` | `d7n-guides-api-product-landing.md`: campaign pushed; Guide main waits |
| scaffold | `0.0.64` / `0.0.63` | console `^0.0.12`, contract, emitter, markdown, process, template | `main` = cached `origin/main` `aa36f0b…`; porcelain empty | `tests/guides.test.ts:3-23` `GuideCommand`; same native `test:guides` launcher; no `docs` script | `guides` `:43`; `guide examples` `:121` | accepted tarball identity in `handoff.md` / `d7n-guides-api-product-landing.md` |

---

## Excluded remaining roster (unmet fleet runtime/peer/optional name)

| Package | Local version | Unmet edge | HEAD / cached `origin/main` | Dirty |
| --- | --- | --- | --- | --- |
| brief | `0.0.8` | interpret | `2660b0a…` / `3849b1d…` | clean |
| mcp | `0.0.29` | peer server (`peerDependencies` router `^0.0.13`, server `^0.0.18`; router is published) | `a01d5e8…` / `292c966…` | clean |
| middleware | `0.0.20` | required peer server (runtime abort/budget/contract/timeout are published; optional peer database is published) | `5747e3f…` = `origin/main` | clean |
| program | `0.0.13` | qualifier, rater | `a60327f…` / `32cef62…` | clean |
| worker | `0.0.12` | queue | `021c8ad…` = `origin/main` | porcelain unread |
| workflow | `0.0.18` | queue | `1151786…` / `f1f2d65…` | clean |
| agent | `0.0.21` | queue, workflow, workspace | `305af91…` / `a65878c…` | clean |
| probe | `0.0.13` | lsp, mcp, queue (also the development bootstrap; optional peers are oxlint/typescript/vitest) | `93fc01d…` / `b816749…` | clean |
| ollama | `0.0.15` | agent | `98e9c34…` / `0f6b106…` | dirty: `guides/ollama.md`, `src/server/{OllamaProvider,constants,factories,types}.ts`, `tests/guides.test.ts`, `tests/service/*`, `tests/setup.test.ts` |
| toolbox | `0.0.13` | agent, relation, server, terminal, workflow, workspace | `f8175e9…` / `8a67ffa…` | clean |

Probe’s optional peers are foreign. Do not read Database’s compiler-only Probe overlay as Probe transport evidence.

---

## Unread roster members

Every `clone-fleet.sh` name has a canonical sibling under `C:/Users/mikes/WebstormProjects` and a manifest read. Supervisor is not on that roster. Worker porcelain was not read.

Registry `version` was not re-queried for brief, mcp, middleware, program, worker, workflow, agent, probe, ollama, toolbox.

`git merge-base` was refused; where HEAD and cached `origin/main` differ, ancestry is unmeasured.

---

## Limits

- No fetch. Cached `origin/main` can lag the remote.
- Following-layer archives were not downloaded; identity is `npm view` `version`/`gitHead` against the prepared table.
- Catalog in `.claude/agents/orkestrel.md` lags live registry and is not live state.
- Host npm warn: npm `v12.0.2`, Node `v24.5.0`.

**Journal / session:** the saved brief supplied no journal path and no session id. This is the Cursor-native Grok executor return for `tmp/units/d7n-upper-layer-scout-brief.md`.

This is evidence, never acceptance.
