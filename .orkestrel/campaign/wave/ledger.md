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
| 20:09 | `@orkestrel/html` | `0.0.8` | L1 | accepted at 20:09 with the processing notice; served `0.0.8` at 20:11 | release tip `2b96a5c`. Uploaded on a one-time code shared by the layer (`publish-html.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/indexeddb` | `0.0.10` | L1 | served `0.0.10` at 20:10 | release tip `1373443`. Uploaded on a one-time code shared by the layer (`publish-indexeddb.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/ndjson` | `0.0.9` | L1 | accepted at 20:10 with the processing notice; served `0.0.9` at 20:11 | release tip `9a3eb49`. Uploaded on a one-time code shared by the layer (`publish-ndjson.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/sqlite` | `0.0.10` | L1 | served `0.0.10` at 20:10 | release tip `173062c`. Uploaded on a one-time code shared by the layer (`publish-sqlite.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/timeout` | `0.0.9` | L1 | served `0.0.9` at 20:10 | release tip `a487540`. Uploaded on a one-time code shared by the layer (`publish-timeout.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |
| 20:10 | `@orkestrel/tool` | `0.0.13` | L1 | served `0.0.13` at 20:10 | release tip `6a4a9bc`. Uploaded on a one-time code shared by the layer (`publish-tool.log.txt`); abort rode the first code alone before the layer script learned to read the acceptance line. |

| 20:25 | `@orkestrel/console` | `0.0.12` | L2 | accepted at 20:25 with the processing notice; served `0.0.12` at 20:26 | release tip `55a067c`. Uploaded on the layer's one-time codes (`publish-console.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:25 | `@orkestrel/database` | `0.0.13` | L2 | served `0.0.13` at 20:25 | release tip `3252a30`. Uploaded on the layer's one-time codes (`publish-database.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:25 | `@orkestrel/form` | `0.0.5` | L2 | served `0.0.5` at 20:25 | release tip `ea64d69`. Uploaded on the layer's one-time codes (`publish-form.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:25 | `@orkestrel/markdown` | `0.0.13` | L2 | served `0.0.13` at 20:25 | release tip `4d5ec37`. Uploaded on the layer's one-time codes (`publish-markdown.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:25 | `@orkestrel/pool` | `0.0.10` | L2 | served `0.0.10` at 20:25 | release tip `0029ff3`. Uploaded on the layer's one-time codes (`publish-pool.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:25 | `@orkestrel/process` | `0.0.10` | L2 | served `0.0.10` at 20:25 | release tip `e0a6603`. Uploaded on the layer's one-time codes (`publish-process.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:25 | `@orkestrel/reason` | `0.0.9` | L2 | served `0.0.9` at 20:25 | release tip `d9a4e8e`. Uploaded on the layer's one-time codes (`publish-reason.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:25 | `@orkestrel/router` | `0.0.13` | L2 | accepted at 20:25 with the processing notice; served `0.0.13` at 20:30 | release tip `c8d0ff3`. Uploaded on the layer's one-time codes (`publish-router.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:27 | `@orkestrel/table` | `0.0.4` | L2 | served `0.0.4` at 20:27 | release tip `c64e792`. Uploaded on the layer's one-time codes (`publish-table.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:27 | `@orkestrel/template` | `0.0.6` | L2 | accepted at 20:27 with the processing notice; served TEMPLATE-SERVED-AT | release tip `23fcb75`. Uploaded on the layer's one-time codes (`publish-template.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
| 20:27 | `@orkestrel/websocket` | `0.0.11` | L2 | served `0.0.11` at 20:27 | release tip `a1baf72`. Uploaded on the layer's one-time codes (`publish-websocket.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |

| 20:33 | `@orkestrel/guide` | `0.0.17` | L3 | accepted at 20:33 with the processing notice; served `0.0.17` at 20:33 | release tip `7b93a5c`: runtime ranges contract `^0.0.16` and markdown `^0.0.13`. Uploaded on a one-time code (`publish-guide-0.0.17.log.txt`). |

| 20:42 | `@orkestrel/scaffold` | `0.0.62` | L3 | served `0.0.62` at 20:42 | release tip `aa0d28f4`: runtime ranges moved with L0 to L2; the generated-manifest fixtures and the CLI audit's test-floor advisory moved with the release; `tests/guides.test.ts` reads guide's renamed API. Uploaded on a one-time code (`publish-scaffold-0.0.62.log.txt`). |

| 20:50 | `@orkestrel/server` | `0.0.18` | L3 | accepted at 20:50 with the processing notice; served `0.0.18` at 20:52 | release tip `a8ceab3`. Uploaded on one one-time code with the round, server first (`publish-server.log.txt`). |
| 20:51 | `@orkestrel/interpret` | `0.0.12` | L3 | accepted at 20:51 with the processing notice | release tip `c9881bb`. Uploaded on one one-time code with the round, server first (`publish-interpret.log.txt`). |
| 20:51 | `@orkestrel/lsp` | `0.0.6` | L3 | accepted at 20:51 with the processing notice | release tip `ff004ba`. Uploaded on one one-time code with the round, server first (`publish-lsp.log.txt`). |
| 20:51 | `@orkestrel/qualifier` | `0.0.13` | L3 | served `0.0.13` at 20:51 | release tip `a24b399`. Uploaded on one one-time code with the round, server first (`publish-qualifier.log.txt`). |
| 20:51 | `@orkestrel/queue` | `0.0.12` | L3 | served `0.0.12` at 20:51 | release tip `04a2644`. Uploaded on one one-time code with the round, server first (`publish-queue.log.txt`). |
| 20:51 | `@orkestrel/rater` | `0.0.13` | L3 | accepted at 20:51 with the processing notice | release tip `fb9605f`. Uploaded on one one-time code with the round, server first (`publish-rater.log.txt`). |
| 20:51 | `@orkestrel/relation` | `0.0.11` | L3 | served `0.0.11` at 20:51 | release tip `7691b0e`. Uploaded on one one-time code with the round, server first (`publish-relation.log.txt`). |
| 20:51 | `@orkestrel/sea` | `0.0.14` | L3 | accepted at 20:51 with the processing notice | release tip `a46be1c`. Uploaded on one one-time code with the round, server first (`publish-sea.log.txt`). |
| 20:51 | `@orkestrel/terminal` | `0.0.14` | L3 | served `0.0.14` at 20:51 | release tip `0037e59`. Uploaded on one one-time code with the round, server first (`publish-terminal.log.txt`). |
| 20:51 | `@orkestrel/workspace` | `0.0.7` | L3 | served `0.0.7` at 20:51 | release tip `5b6e5ec`. Uploaded on one one-time code with the round, server first (`publish-workspace.log.txt`). |
| 20:58 | `@orkestrel/browser` | `0.0.15` | L3 | served `0.0.15` at 20:58 | release tip `92f3d7e`: the HAR creator constant moved with the bump. Uploaded on one one-time code with middleware and mcp (`publish-browser.log.txt`). |

| 20:58 | `@orkestrel/middleware` | `0.0.19` | L3, after server | served `0.0.19` at 20:58 | release tip `615e8d4`: peer ranges `@orkestrel/server` `^0.0.18` and `@orkestrel/database` `^0.0.13`. Uploaded on the same code (`publish-middleware.log.txt`). |
| 20:58 | `@orkestrel/mcp` | `0.0.28` | L3, after server | accepted at 20:58 with the processing notice | release tip `68b2e28`: peer ranges `@orkestrel/server` `^0.0.18` and `@orkestrel/router` `^0.0.13`. Uploaded on the same code (`publish-mcp.log.txt`). |

| 21:47 | `@orkestrel/brief` | `0.0.7` | L4 | accepted at 21:47 with the processing notice | release tip `e0986c4`. Uploaded on one one-time code with the layer, after a first code expired unused (`publish-brief.log.txt`). |
| 21:47 | `@orkestrel/probe` | `0.0.12` | L4 | accepted at 21:47 with the processing notice | release tip `c8d1fa9`. Uploaded on one one-time code with the layer, after a first code expired unused (`publish-probe.log.txt`). `npm test` under the standing arming red: 8 failed and 221 passed of 229, every failure the arming class; every other member of `prepublishOnly` exit 0 (`instruments/prep-probe-gates.sh`). |
| 21:47 | `@orkestrel/program` | `0.0.12` | L4 | served `0.0.12` at 21:47 | release tip `1ebc20b`. Uploaded on one one-time code with the layer, after a first code expired unused (`publish-program.log.txt`). |
| 21:48 | `@orkestrel/worker` | `0.0.11` | L4 | accepted at 21:48 with the processing notice | release tip `6929232`. Uploaded on one one-time code with the layer, after a first code expired unused (`publish-worker.log.txt`). |
| 21:48 | `@orkestrel/workflow` | `0.0.17` | L4 | accepted at 21:48 with the processing notice | release tip `2e07e2a`. Uploaded on one one-time code with the layer, after a first code expired unused (`publish-workflow.log.txt`). |

| 21:53 | `@orkestrel/agent` | `0.0.20` | L5 | accepted at 21:53 with the processing notice | release tip `841e452`: every runtime range moved. Uploaded on a one-time code (`publish-agent.log.txt`). |

## The login

The registry answered the web login's polls inconsistently through this host's proxy: the proxy leaves from several addresses, and a poll from an address other than the one that minted the session answers `403 {"message":"forbidden"}`, which npm 10 and npm 11 read as web login unsupported and drop to the legacy prompt. On one kept-alive connection the polls answer `202` every 3 seconds (`instruments/login-diag.sh`). `instruments/login-retry.sh` mints attempts until one survives its first poll and relays that URL; the owner's click landed on the third relayed link at 19:32, and `npm whoami` answered.

## Re-baseline at L0: guide publishes early on its own account

The first L0 visits reddened at `check`: `npm install` restored the registry's `@orkestrel/guide` 0.0.15 over the staged tip, and every consumer's `tests/guides.test.ts` reads the tip's renamed API (`extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, `symbol.keyword`), which the catalog would publish only at L3. Guide's tip typechecks against the registry's contract 0.0.15 and markdown 0.0.12 (`npm ci` then `npm run check`, exit 0 at 19:39 UTC), so guide takes the same shape as scaffold: it publishes on its own account as 0.0.16 ahead of L0, every consumer's visit re-pins it from the registry, and guide publishes again at its L3 slot after its runtime ranges move. Probe has no such consumer: only probe's own tests import `@orkestrel/probe`. The visits' `scaffold overwrite` output (the refreshed catalog table and guide mirrors, test's `configs/browsers.ts`) is committed per target as "Adopt the vendored host of @orkestrel/scaffold 0.0.61" so the re-run starts from a committed baseline. The visit script's successor (`instruments/prep-one-2.sh`) commits the re-pin and bump before the overwrite, which refuses a tree carrying uncommitted changes.
