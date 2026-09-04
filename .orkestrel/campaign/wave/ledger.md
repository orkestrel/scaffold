# Publish wave — ledger (2026-09-04)

The release runs from `report.md` under the `orkestrel-publish` skill. Rows record what landed and what the registry confirmed; the order is derived per round from the catalog and the peer edges, never written ahead.

| When (UTC) | Package | Version | Round | Registry confirmation | Notes |
| --- | --- | --- | --- | --- | --- |
| 19:33 | `@orkestrel/scaffold` | `0.0.61` | own account, before L0 | `npm view @orkestrel/scaffold@0.0.61 version` served `0.0.61` at 19:33 | Uploaded with a one-time code under `instruments/publish-one.sh` (`publish-scaffold.log.txt`). Preparation commit `fafab919`: the generated-manifest fixtures moved with the bump. |

| 19:44 | `@orkestrel/guide` | `0.0.16` | own account, before L0 (re-baseline) | `npm view @orkestrel/guide@0.0.16 version` served `0.0.16` at 19:44 | Uploaded with a one-time code (`publish-guide.log.txt`). Release commits `3c05022` and `f5b19f7` (the lockfile regenerated for the vendored toolchain ranges). Publishes again at L3 after its runtime ranges move. |

| 19:51 | `@orkestrel/codec` | `0.0.2` | L0 | served `0.0.2` at 19:51 | release tip `3e55247`. Uploaded back-to-back on one one-time code (`publish-layer.sh`; log `publish-codec.log.txt`). |
| 19:51 | `@orkestrel/contract` | `0.0.16` | L0 | served `0.0.16` at 19:51 | release tip `2ced48e`. Uploaded back-to-back on one one-time code (`publish-layer.sh`; log `publish-contract.log.txt`). |
| 19:52 | `@orkestrel/msg` | `0.0.9` | L0 | served `0.0.9` at 19:52 | release tip `f1ed94a`. Uploaded back-to-back on one one-time code (`publish-layer.sh`; log `publish-msg.log.txt`). |
| 19:52 | `@orkestrel/sse` | `0.0.6` | L0 | served `0.0.6` at 19:52 | release tip `f7f21e6`. Uploaded back-to-back on one one-time code (`publish-layer.sh`; log `publish-sse.log.txt`). |
| 19:52 | `@orkestrel/test` | `0.0.13` | L0 | accepted at 19:52 with the registry's processing notice; served `0.0.13` at 19:55 | release tip `b8b0977`. Uploaded back-to-back on one one-time code (`publish-layer.sh`; log `publish-test.log.txt`). |

| 20:03 | `@orkestrel/abort` | `0.0.9` | L1 | served `0.0.9` at 20:07 | release tip `ebbb837`. Uploaded on a one-time code shared by the layer (`publish-abort.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:09 | `@orkestrel/budget` | `0.0.9` | L1 | served `0.0.9` at 20:09 | release tip `a756e36`. Uploaded on a one-time code shared by the layer (`publish-budget.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:09 | `@orkestrel/csv` | `0.0.6` | L1 | served `0.0.6` at 20:09 | release tip `4ee35ef`. Uploaded on a one-time code shared by the layer (`publish-csv.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:09 | `@orkestrel/emitter` | `0.0.9` | L1 | served `0.0.9` at 20:09 | release tip `f1a5e05`. Uploaded on a one-time code shared by the layer (`publish-emitter.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:09 | `@orkestrel/html` | `0.0.8` | L1 | accepted at 20:09 with the processing notice; served HTML-SERVED-AT | release tip `2b96a5c`. Uploaded on a one-time code shared by the layer (`publish-html.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/indexeddb` | `0.0.10` | L1 | served `0.0.10` at 20:10 | release tip `1373443`. Uploaded on a one-time code shared by the layer (`publish-indexeddb.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/ndjson` | `0.0.9` | L1 | accepted at 20:10 with the processing notice; served NDJSON-SERVED-AT | release tip `9a3eb49`. Uploaded on a one-time code shared by the layer (`publish-ndjson.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/sqlite` | `0.0.10` | L1 | served `0.0.10` at 20:10 | release tip `173062c`. Uploaded on a one-time code shared by the layer (`publish-sqlite.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/timeout` | `0.0.9` | L1 | served `0.0.9` at 20:10 | release tip `a487540`. Uploaded on a one-time code shared by the layer (`publish-timeout.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/tool` | `0.0.13` | L1 | served `0.0.13` at 20:10 | release tip `6a4a9bc`. Uploaded on a one-time code shared by the layer (`publish-tool.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |

## The login

The registry answered the web login's polls inconsistently through this host's proxy: the proxy leaves from several addresses, and a poll from an address other than the one that minted the session answers `403 {"message":"forbidden"}`, which npm 10 and npm 11 read as web login unsupported and drop to the legacy prompt. On one kept-alive connection the polls answer `202` every 3 seconds (`instruments/login-diag.sh`). `instruments/login-retry.sh` mints attempts until one survives its first poll and relays that URL; the owner's click landed on the third relayed link at 19:32, and `npm whoami` answered.

## Re-baseline at L0: guide publishes early on its own account

The first L0 visits reddened at `check`: `npm install` restored the registry's `@orkestrel/guide` 0.0.15 over the staged tip, and every consumer's `tests/guides.test.ts` reads the tip's renamed API (`extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, `symbol.keyword`), which the catalog would publish only at L3. Guide's tip typechecks against the registry's contract 0.0.15 and markdown 0.0.12 (`npm ci` then `npm run check`, exit 0 at 19:39 UTC), so guide takes the same shape as scaffold: it publishes on its own account as 0.0.16 ahead of L0, every consumer's visit re-pins it from the registry, and guide publishes again at its L3 slot after its runtime ranges move. Probe has no such consumer: only probe's own tests import `@orkestrel/probe`. The visits' `scaffold overwrite` output (the refreshed catalog table and guide mirrors, test's `configs/browsers.ts`) is committed per target as "Adopt the vendored host of @orkestrel/scaffold 0.0.61" so the re-run starts from a committed baseline. The visit script's successor (`instruments/prep-one-2.sh`) commits the re-pin and bump before the overwrite, which refuses a tree carrying uncommitted changes.
