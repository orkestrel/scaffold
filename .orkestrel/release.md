# Release wave of 2026-11-15: contract 0.0.24 and scaffold 0.0.137

Layer order: `@orkestrel/contract`; layers 1 to 7 as `wave.ts --plan` prints them; then `@orkestrel/scaffold`; then the closing round, which re-pins every catalog package to scaffold `^0.0.137` per § Close the wave in the publish skill's wave reference. Each package's release commit quotes its visit, its ruling, and its release chain; the closing column comes from the closing visit, as `wave.js` wrote it. Every release commit is pushed with `main` fast-forwarded to it, after the registry served its version; every closing commit is pushed.

| Package | Registry | Ruling | Evidence | Round |
| --- | --- | --- | --- | --- |
| `@orkestrel/contract` | 0.0.24 | no bump | closing `20ea273`: dist same, ranges same, 0 self-pin hits | closing |
| `@orkestrel/abort` | 0.0.17 | bump to 0.0.18, published and confirmed | release `635ed80`, contract `^0.0.24`; closing `ec345b1`: dist same, ranges same | layer 1 |
| `@orkestrel/budget` | 0.0.18 | bump to 0.0.19, published and confirmed | release `1e7e76f`, contract `^0.0.24`, with the revoked-proxy previews read as `instance` (`6357e2c`); closing `5b2e418`: dist same, ranges same | layer 1 |
| `@orkestrel/codec` | 0.0.10 | bump to 0.0.11, published and confirmed | release `f4ed5a3`, contract `^0.0.24`; closing `aa3131d`: dist same, ranges same | layer 1 |
| `@orkestrel/emitter` | 0.0.16 | bump to 0.0.17, published and confirmed | release `25565a5`, contract `^0.0.24`; closing `c012709`: dist same, ranges same | layer 1 |
| `@orkestrel/html` | 0.0.16 | bump to 0.0.17, published and confirmed | release `57e8499`, contract `^0.0.24`; closing `32a8e1b`: dist same, ranges same | layer 1 |
| `@orkestrel/indexeddb` | 0.0.19 | no bump | closing `8a1397e`: dist same, ranges same; 1 self-pin hit in the vendored `guides/browser.md` mirror, ruled inert | closing |
| `@orkestrel/jsonrpc` | 0.0.3 | bump to 0.0.4, published and confirmed | release `d2d622c`, contract `^0.0.24`; closing `9513555`: dist same, ranges same | layer 1 |
| `@orkestrel/ndjson` | 0.0.17 | bump to 0.0.18, published and confirmed | release `aa1cb31`, contract `^0.0.24`; closing `ef2f602`: dist same, ranges same | layer 1 |
| `@orkestrel/sqlite` | 0.0.19 | no bump | closing `fe9e1fb`: dist same, ranges same, 0 self-pin hits | closing |
| `@orkestrel/test` | 0.0.39 | bump to 0.0.40, published and confirmed | release `42fcd5b`, contract `^0.0.24`; closing `813e7e0`: dist same, ranges same | layer 1 |
| `@orkestrel/timeout` | 0.0.17 | bump to 0.0.18, published and confirmed | release `5f1bd60`, contract `^0.0.24`; closing `cf8ecc0`: dist same, ranges same | layer 1 |
| `@orkestrel/console` | 0.0.20 | bump to 0.0.21, published and confirmed | release `b96e46d`; closing `d35fb0d`: dist same, ranges same | layer 2 |
| `@orkestrel/csv` | 0.0.14 | bump to 0.0.15, published and confirmed | release `4b2c1bb`; closing `fde0f67`: dist same, ranges same; 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 2 |
| `@orkestrel/database` | 0.0.26 | bump to 0.0.27, published and confirmed | release `0c64ab0`, emitter `^0.0.17` alone; closing `6eb64f9`: dist same, ranges same; 2 self-pin hits in the vendored `guides/test.md` mirror, ruled inert | layer 2 |
| `@orkestrel/form` | 0.0.18 | bump to 0.0.19, published and confirmed | release `5c5c1ac`; closing `67c61bf`: dist same, ranges same; 1 self-pin hit in the vendored `guides/browser.md` mirror, ruled inert | layer 2 |
| `@orkestrel/markdown` | 0.0.21 | bump to 0.0.22, published and confirmed | release `4d948d0`; closing `79ce880`: dist same, ranges same | layer 2 |
| `@orkestrel/msg` | 0.0.17 | bump to 0.0.18, published and confirmed | release `b45f22e`; closing `e580c0c`: dist same, ranges same | layer 2 |
| `@orkestrel/pool` | 0.0.21 | bump to 0.0.22, published and confirmed | release `e215079`; closing `ce9c250`: dist same, ranges same | layer 2 |
| `@orkestrel/process` | 0.0.19 | bump to 0.0.20, published and confirmed | release `baa43f1`; closing `f378c23`, rebased onto process 0.0.21 (`bd6da48`): dist same, ranges same, with one `test` case failing per § Standing host-bound readings | layer 2 |
| `@orkestrel/reason` | 0.0.18 | bump to 0.0.19, published and confirmed | release `309f7c9`, `SubjectDoor` admits through `repairValue`; closing `1ef439d`: dist same, ranges same | layer 2 |
| `@orkestrel/router` | 0.0.21 | bump to 0.0.22, published and confirmed | release `0a316a2`; closing `33ea571`: dist same, ranges same | layer 2 |
| `@orkestrel/sse` | 0.0.14 | bump to 0.0.15, published and confirmed | release `81204b9`; closing `5d31cdb`: dist same, ranges same; 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 2 |
| `@orkestrel/table` | 0.0.17 | bump to 0.0.18, published and confirmed | release `640342b`; closing `eb565aa`: dist same, ranges same | layer 2 |
| `@orkestrel/template` | 0.0.14 | bump to 0.0.15, published and confirmed | release `c9c23db`; closing `bb1a580`: dist same, ranges same; 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 2 |
| `@orkestrel/tool` | 0.0.23 | bump to 0.0.24, published and confirmed | release `be40ff3`, `Tool.execute` admits through `repairValue`; closing `a187888`: dist same, ranges same | layer 2 |
| `@orkestrel/websocket` | 0.0.19 | bump to 0.0.20, published and confirmed | release `bd31687`; closing `8bb9f5a`: dist same, ranges same; 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 2 |
| `@orkestrel/capture` | 0.0.7 | bump to 0.0.8, published and confirmed | release `c43b7a6`; closing `aca2f9f`: dist same, ranges moved (process `^0.0.21`); 3 self-pin hits in the vendored `guides/probe.md` and `guides/test.md` mirrors, ruled inert | layer 3 |
| `@orkestrel/guide` | 0.0.31 | bump to 0.0.32, published and confirmed | release `10b780b`; closing `9f39f0a`: dist same, ranges same | layer 3 |
| `@orkestrel/interpret` | 0.0.23 | bump to 0.0.24, published and confirmed | release `6a3a89b`; closing `e83844c`: dist same, ranges same | layer 3 |
| `@orkestrel/lsp` | 0.0.15 | bump to 0.0.16, published and confirmed | release `b09131a`; closing `9a915ff`: dist same, ranges moved (process `^0.0.21`); 3 self-pin hits in the vendored `guides/probe.md` mirror, ruled inert | layer 3 |
| `@orkestrel/qualifier` | 0.0.22 | bump to 0.0.23, published and confirmed | release `4caf229`; closing `c7cfbf3`: dist same, ranges same | layer 3 |
| `@orkestrel/queue` | 0.0.23 | bump to 0.0.24, published and confirmed | release `d787b40`, database `^0.0.27`; closing `7b7fa0e`: dist same, ranges same; 2 self-pin hits in the vendored `guides/database.md` mirror, ruled inert | layer 3 |
| `@orkestrel/rater` | 0.0.22 | bump to 0.0.23, published and confirmed | release `41f540f`; closing `75c230d`: dist same, ranges same | layer 3 |
| `@orkestrel/relation` | 0.0.24 | bump to 0.0.25, published and confirmed | release `7bd9933`, database `^0.0.27`; closing `91717e9`: dist same, ranges same; 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 3 |
| `@orkestrel/sea` | 0.0.23 | bump to 0.0.24, published and confirmed | release `b4a561d`; closing `ea29663`: dist same, ranges moved (process `^0.0.21`); 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 3 |
| `@orkestrel/server` | 0.0.27 | bump to 0.0.28, published and confirmed | release `4b9278d`; closing `2eb2876`: dist same, ranges same | layer 3 |
| `@orkestrel/terminal` | 0.0.26 | bump to 0.0.27, published and confirmed | release `a49f1a2`, database `^0.0.27`; closing `8047d2e`: dist same, ranges same; 2 self-pin hits in the vendored `guides/test.md` mirror, ruled inert | layer 3 |
| `@orkestrel/workspace` | 0.0.19 | bump to 0.0.20, published and confirmed | release `3aa3423`, database `^0.0.27`; closing `ac97184`: dist same, ranges same; 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 3 |
| `@orkestrel/brief` | 0.0.18 | bump to 0.0.19, published and confirmed | release `deaf580`, its emitted types embedding contract 0.0.24's fault union (`674e06b`); closing `cf9fee9`: dist same, ranges same | layer 4 |
| `@orkestrel/mcp` | 0.0.43 | bump to 0.0.44, published and confirmed | release `ad026b7`; closing `68104bf`: dist same, ranges moved (process `^0.0.21`); 4 self-pin hits, in the vendored `guides/probe.md` mirror, ruled inert, and in `tests/distribution.test.ts`, whose consumer overrides name earlier fleet releases by design, ruled standing | layer 4 |
| `@orkestrel/middleware` | 0.0.32 | bump to 0.0.33, published and confirmed | release `660ceb7`, its refusal naming U+007F through contract 0.0.24's preview (`85b2ab6`); closing `03cfaef`: dist same, ranges same | layer 4 |
| `@orkestrel/program` | 0.0.21 | bump to 0.0.22, published and confirmed | release `b3b1323`; closing `5303be6`: dist same, ranges same | layer 4 |
| `@orkestrel/worker` | 0.0.23 | bump to 0.0.24, published and confirmed | release `a252034`, database `^0.0.27`; closing `6996bc0`: dist same, ranges same; 2 self-pin hits in the vendored `guides/database.md` mirror, ruled inert | layer 4 |
| `@orkestrel/workflow` | 0.0.29 | bump to 0.0.30, published and confirmed | release `9f7d47f`, `admitDefinition` and `admitPatch` admit through `repairValue` (`1f914a8`); closing `9fdb85b`: dist same, ranges same | layer 4 |
| `@orkestrel/agent` | 0.0.44 | bump to 0.0.45, published and confirmed | release `dd413ab5`, both built-in re-admissions through `repairValue` (`42fea1a4`, `dc5dd1a8`); closing `abefde23`: dist same, ranges same; 2 self-pin hits, a `tests/setup.ts` comment naming the 0.0.29 snapshot shape and the vendored `guides/probe.md` mirror, ruled inert | layer 5 |
| `@orkestrel/browser` | 0.0.33 | bump to 0.0.34, published and confirmed | release `b683d0a`; closing `094313d`: dist same, ranges moved (process `^0.0.21`); 4 self-pin hits, `BROWSER_HAR_CREATOR` naming the served 0.0.34 in `src/core/constants.ts` and its guide row, a dated guide reading, and the vendored `guides/probe.md` mirror, ruled inert | layer 5 |
| `@orkestrel/probe` | 0.0.30 | bump to 0.0.31, published and confirmed | release `aff77a5`; closing `178af1d`: dist same, ranges moved (process `^0.0.21`); 1 self-pin hit in its own `guides/probe.md` history, ruled inert | layer 5 |
| `@orkestrel/ollama` | 0.0.38 | bump to 0.0.39, published and confirmed | release `0ce5380`; closing `3f5ade2`: dist same, ranges moved (process `^0.0.21`); 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 6 |
| `@orkestrel/toolbox` | 0.0.33 | bump to 0.0.34, published and confirmed | release `5ef5b1b`, `requireToolCall` admits through `repairValue` and the database tool's `remove` reads one boolean (`fbcfe10`); closing `bc3edb4`: dist same, ranges same; 1 self-pin hit in the vendored `guides/probe.md` mirror, ruled inert | layer 6 |
| `@orkestrel/study` | 0.0.20 | bump to 0.0.21, published and confirmed | release `d2b4dad`; closing `0a64dca`: dist same, ranges same, 0 self-pin hits | layer 7 |
| `@orkestrel/scaffold` | 0.0.136 | bump to 0.0.137, published and confirmed | release `7f9465f`, with the catalog refresh (`8dcfdc1`); its release commit was pushed before the registry served the version, which it served within the confirm's wait | scaffold |

Every bump in this wave was published and confirmed on 2026-11-15.

## Process 0.0.21

A session outside this campaign published process 0.0.21 (process `bd6da48`) at 2026-11-15T13:58Z, after layer 7 and scaffold 0.0.137. The closing visits of capture, lsp, sea, mcp, browser, probe, and ollama re-pin it at runtime, so each owes a release; study owes one through ollama, and scaffold owes 0.0.138 for its own process range and its vendored process guide. The user ruled on 2026-11-15 to close this wave and take those releases with process's further publishes, so no release here carries process 0.0.21.

## Registry sweep

The sweep of 2026-11-15, after the closing round, read every `@orkestrel` range in the 51 catalog checkouts and the runtime and peer ranges of each served manifest against the version the registry serves. Every checkout pins the served version of each `@orkestrel` dependency except scaffold's own process `^0.0.20`. The served manifests that trail pin process `^0.0.20` at runtime: capture 0.0.8, lsp 0.0.16, sea 0.0.24, mcp 0.0.44, browser 0.0.34, probe 0.0.31, ollama 0.0.39, and scaffold 0.0.137, each owed by § Process 0.0.21. A served manifest's development ranges move with the package's next release and are outside the sweep. Taverna's ranges are read in taverna's session.

The wave closed on 2026-11-15.

## Standing host-bound readings

| Package | Gate | Reading | Cause | Carrier |
| --- | --- | --- | --- | --- |
| `@orkestrel/browser` 0.0.34 | `test:distribution` in release mode | Five cases unread: each reads a `/proc` table or parks on a FIFO. The normal mode passed 15, with 9 skipped. | The cases need a Linux host. | Browser's release commit `b683d0a`. |
| `@orkestrel/ollama` 0.0.39 | `test` service proof | Passed 89 of 89 against a second daemon on port 11435. | The dedicated-daemon case needs a daemon it owns, per scaffold `ROADMAP.md` item 114. | Scaffold `ROADMAP.md` item 114. |
| `@orkestrel/mcp` 0.0.44 | `test:distribution` | Passes with its consumer overrides pinning earlier fleet releases. | The overrides are pinned rather than floating by design. | Mcp's owner. |
| `@orkestrel/process` 0.0.21 | `test` (`src:server`) | `matchesProcessEnded` "reads nothing as ended and collects no member through a table that names another process" fails on a Windows host: `inspectProcess(-group)` refuses the negative id with `Invalid process id`. 232 passed, 13 skipped. | The case (process `tests/src/server/helpers.test.ts`, from `b8646f6`) probes a negative process-group id, which `inspectProcess` refuses on a Windows host, and carries no host guard. | The session that publishes process's next release. |
