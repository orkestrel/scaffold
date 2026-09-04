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
| 20:27 | `@orkestrel/template` | `0.0.6` | L2 | accepted at 20:27 with the processing notice; served `0.0.6` at 20:30 | release tip `23fcb75`. Uploaded on the layer's one-time codes (`publish-template.log.txt`); the first code timed out at table, and a second carried table, template, and websocket. |
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

| 21:53 | `@orkestrel/agent` | `0.0.20` | L5 | served `0.0.20` at 21:54 | release tip `841e452`: every runtime range moved. Uploaded on a one-time code (`publish-agent.log.txt`). |

| 21:59 | `@orkestrel/toolbox` | `0.0.12` | L6 | served `0.0.12` at 21:59 | release tip `ceeff85`. Uploaded on one one-time code with ollama (`publish-toolbox.log.txt`). |
| 21:59 | `@orkestrel/ollama` | `0.0.14` | L6 | served `0.0.14` at 21:59 | release tip `7657741`. Every member of `prepublishOnly` exit 0 except `test:service`, recorded: the suite needs the `qwen3.5:2b-q4_K_M` model at a local Ollama daemon this host lacks (`instruments/prep-ollama-gates.sh`); owed on a daemon host per `ROADMAP.md` § 4. Uploaded on the same code (`publish-ollama.log.txt`). |


## The closing round: development re-pins

After the last upload, every checkout whose `@orkestrel` development ranges named an older release re-pinned to the registry's caret with no bump (`instruments/repin-dev.sh` over four slices, `instruments/devstale.mjs` the work list): the lockfile regenerated, `prepublishOnly` exit 0, and the rebuilt `dist/` unmoved against the released tarball. Process reddened on a chunking assertion under load and re-ran alone; scaffold's `dist/src` moved with its ranges because the compiler embeds the ranges it writes into generated workspaces, so its re-pin is the release `0.0.63` (no vendored byte moved, nothing depends on scaffold at runtime, so no cascade).

| Package | Re-pin commit | When (UTC) | Ranges moved |
| --- | --- | --- | --- |
| `abort` | `8327580` | 22:01 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `brief` | `6d894b1` | 22:03 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `browser` | `2d9902a` | 22:06 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `budget` | `9e6a7e0` | 22:07 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `codec` | `0218daa` | 22:09 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62, `@orkestrel/test:` ^0.0.12→^0.0.13 |
| `console` | `5354275` | 22:11 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `contract` | `ead0788` | 22:12 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62, `@orkestrel/test:` ^0.0.12→^0.0.13 |
| `csv` | `386ddbe` | 22:13 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `database` | `d11eff2` | 22:17 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `emitter` | `85bb137` | 22:18 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `form` | `df2a79c` | 22:19 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `guide` | `0c3a77f` | 22:20 | `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `html` | `36c2eb5` | 22:02 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `indexeddb` | `0f59989` | 22:04 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `interpret` | `95d4932` | 22:05 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `lsp` | `70045c0` | 22:06 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `markdown` | `86672cf` | 22:08 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `mcp` | `ac223a6` | 22:11 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `middleware` | `6d8de3c` | 22:13 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `msg` | `2f84a8a` | 22:14 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62, `@orkestrel/test:` ^0.0.12→^0.0.13 |
| `ndjson` | `98c07d9` | 22:15 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `pool` | `5474ecc` | 22:16 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `process` | `d6742df` | 22:22 | `@orkestrel/guide` ^0.0.16→^0.0.17, `@orkestrel/probe` ^0.0.11→^0.0.12, `@orkestrel/scaffold` ^0.0.61→^0.0.62; committed after the idle re-run cleared a stdout-chunking assertion the shared container reddened |
| `program` | `b923943` | 22:02 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `qualifier` | `3e7b005` | 22:03 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `queue` | `378bce4` | 22:05 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `rater` | `d4476e1` | 22:06 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `reason` | `8339bd6` | 22:08 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `relation` | `e9cb1b4` | 22:09 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `router` | `68d3622` | 22:11 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `sea` | `bfaf146` | 22:12 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `server` | `ccad969` | 22:14 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `sqlite` | `89c4b69` | 22:15 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `sse` | `805eead` | 22:16 | `@orkestrel/contract:` ^0.0.15→^0.0.16, `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62, `@orkestrel/test:` ^0.0.12→^0.0.13 |
| `table` | `467e55d` | 22:02 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `template` | `60d2a68` | 22:03 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `terminal` | `d02ac87` | 22:05 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `test` | `9a153b0` | 22:07 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `timeout` | `41e732e` | 22:08 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `tool` | `9ba4d00` | 22:10 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `websocket` | `ea62e8b` | 22:11 | `@orkestrel/guide:` ^0.0.16→^0.0.17, `@orkestrel/probe:` ^0.0.11→^0.0.12, `@orkestrel/scaffold:` ^0.0.61→^0.0.62 |
| `worker` | `9615ad8` | 22:13 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `workflow` | `52f0448` | 22:15 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |
| `workspace` | `2bf1ca7` | 22:16 | `@orkestrel/probe:` ^0.0.11→^0.0.12 |

| 22:35 | `@orkestrel/scaffold` | `0.0.63` | own account, after the closing round | served `0.0.63` at 22:36 | release tip `edeef9ed`: the closing round's development re-pin moved `dist/src` because the compiler embeds the ranges it writes; no vendored byte moved and no runtime dependent, so no cascade. Uploaded on a one-time code (`publish-scaffold-0.0.63.log.txt`). |

## The login

The registry answered the web login's polls inconsistently through this host's proxy: the proxy leaves from several addresses, and a poll from an address other than the one that minted the session answers `403 {"message":"forbidden"}`, which npm 10 and npm 11 read as web login unsupported and drop to the legacy prompt. On one kept-alive connection the polls answer `202` every 3 seconds (`instruments/login-diag.sh`). `instruments/login-retry.sh` mints attempts until one survives its first poll and relays that URL; the owner's click landed on the third relayed link at 19:32, and `npm whoami` answered.

## Re-baseline at L0: guide publishes early on its own account

The first L0 visits reddened at `check`: `npm install` restored the registry's `@orkestrel/guide` 0.0.15 over the staged tip, and every consumer's `tests/guides.test.ts` reads the tip's renamed API (`extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, `symbol.keyword`), which the catalog would publish only at L3. Guide's tip typechecks against the registry's contract 0.0.15 and markdown 0.0.12 (`npm ci` then `npm run check`, exit 0 at 19:39 UTC), so guide takes the same shape as scaffold: it publishes on its own account as 0.0.16 ahead of L0, every consumer's visit re-pins it from the registry, and guide publishes again at its L3 slot after its runtime ranges move. Probe has no such consumer: only probe's own tests import `@orkestrel/probe`. The visits' `scaffold overwrite` output (the refreshed catalog table and guide mirrors, test's `configs/browsers.ts`) is committed per target as "Adopt the vendored host of @orkestrel/scaffold 0.0.61" so the re-run starts from a committed baseline. The visit script's successor (`instruments/prep-one-2.sh`) commits the re-pin and bump before the overwrite, which refuses a tree carrying uncommitted changes.

## Release report

Layers in publish order, each package at its registry-confirmed version (the sweep at 22:36 UTC read every package's served version equal to its release tip's manifest, with no mismatch):

- own account, before L0: scaffold `0.0.61`; guide `0.0.16` (re-baseline: every consumer's guide tests read its renamed API)
- L0: codec `0.0.2`, contract `0.0.16`, msg `0.0.9`, sse `0.0.6`, test `0.0.13`
- L1: abort `0.0.9`, budget `0.0.9`, csv `0.0.6`, emitter `0.0.9`, html `0.0.8`, indexeddb `0.0.10`, ndjson `0.0.9`, sqlite `0.0.10`, timeout `0.0.9`, tool `0.0.13`
- L2: console `0.0.12`, database `0.0.13`, form `0.0.5`, markdown `0.0.13`, pool `0.0.10`, process `0.0.10`, reason `0.0.9`, router `0.0.13`, table `0.0.4`, template `0.0.6`, websocket `0.0.11`
- L3, own accounts first: scaffold `0.0.62`, guide `0.0.17`; then browser `0.0.15`, interpret `0.0.12`, lsp `0.0.6`, qualifier `0.0.13`, queue `0.0.12`, rater `0.0.13`, relation `0.0.11`, sea `0.0.14`, server `0.0.18`, terminal `0.0.14`, workspace `0.0.7`; after server: middleware `0.0.19`, mcp `0.0.28`
- L4: brief `0.0.7`, probe `0.0.12`, program `0.0.12`, worker `0.0.11`, workflow `0.0.17`
- L5: agent `0.0.20`
- L6: ollama `0.0.14`, toolbox `0.0.12`
- own account, after the closing round: scaffold `0.0.63`

Bump rulings: every package's `dist/` moved against its published tarball (the fourth inventory of 2026-09-04 and each visit's comparison), and every runtime range moved with the layers below; each release commit carries its ruling and its gate time. Guide's early release and scaffold's third release are the two rulings the plan did not foresee, recorded in the re-baseline and closing-round sections. Peer ranges were treated as ordering edges: middleware and mcp published after server with their peers re-pinned.

Approvals the owner granted: the web login on the third relayed link at 19:32 UTC, and one one-time code per layer or per resumed layer, each recorded beside the row it carried.

Standing readings, not gates: probe's `npm test` under its arming red (8 failed and 221 passed of 229, every failure the arming class); ollama's `test:service`, which needs the `qwen3.5:2b-q4_K_M` model at a local Ollama daemon and is owed on a daemon host per `ROADMAP.md` § 4.

Open after the wave: every target pins `@orkestrel/scaffold` at `^0.0.62` as a development range while the registry serves `0.0.63`; the contract obliges no re-pin for a development bump whose vendored surface did not move, so that alignment is a round the owner can ask for. Every checkout carries its release on `claude/orkestrel-npm-audit-deps-14ibta`, clean and level with its remote; merging to `main` is the owner's.

## After the release: main and the re-pin to scaffold 0.0.63

On the owner's word every checkout's release branch fast-forwarded to `main` (`instruments/push-main.sh`); scaffold's `main` carried twelve commits of the three-application campaign's records the branch lacked, merged cleanly into the branch with gates green and `dist/` unmoved against the released 0.0.63 before its push. The fleet then re-pinned `@orkestrel/scaffold` to `^0.0.63` with each target's catalog table and guide mirrors refreshed from the registry (`instruments/repin-dev-2.sh`), gates green, dist unmoved, and the round fast-forwarded to `main` again. Process re-ran alone after the shared round reddened a stdout-chunking assertion; probe and ollama ran their gates member by member under their standing readings. The closing sweep (`instruments/devstale.mjs`) read: every range names the registry caret.

| Package | Re-pin commit | Ranges moved |
| --- | --- | --- |
| `abort` | `9224bad` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `agent` | `a3b2a7d` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `brief` | `094b679` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `browser` | `f647a5a` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `budget` | `d92749c` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `codec` | `e7fe73d` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `console` | `3c8ed57` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `contract` | `0599b62` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `csv` | `0eaea88` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `database` | `1b731a0` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `emitter` | `a85bb05` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `form` | `f9bcf4e` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `guide` | `884bc8d` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `html` | `71affab` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `indexeddb` | `9740578` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `interpret` | `2c82cc7` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `lsp` | `9973533` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `markdown` | `aab4778` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `mcp` | `30a788b` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `middleware` | `684a0c1` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `msg` | `5b1950d` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `ndjson` | `7f7fbad` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `ollama` | `dfdf1fa` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `pool` | `a2a5268` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `probe` | `b331d93` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `process` | `ba0b4d0` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `program` | `af969d7` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `qualifier` | `525e97e` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `queue` | `7195226` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `rater` | `5d11e1d` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `reason` | `7661241` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `relation` | `aedb62f` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `router` | `a09d41b` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `sea` | `b11d4bb` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `server` | `1dbb1a6` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `sqlite` | `5fe9cac` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `sse` | `a394e30` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `table` | `88a2ef5` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `template` | `070f569` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `terminal` | `43d7839` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `test` | `5951098` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `timeout` | `d96438e` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `tool` | `0605881` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `toolbox` | `e47223c` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `websocket` | `9dc5aaf` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `worker` | `9d4b4f2` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `workflow` | `9078700` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |
| `workspace` | `1d29aab` | `@orkestrel/scaffold:` ^0.0.62→^0.0.63 |

RELEASE: LANDED
