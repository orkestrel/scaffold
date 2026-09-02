# Last changes: mcp

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `249299f`, merge base with `origin/main` `fdd47f2`, layer L3, declared version 0.0.27, registry version 0.0.27.

## Commits since origin/main

```text
da71dcd 2026-08-28 Update every dependency to the published latest
163ea8c 2026-08-28 Re-record the conformance baseline at alpha.11 and arm the preservation scenario
5556e3f 2026-08-28 Re-pin @orkestrel/process to ^0.0.9
271dea5 2026-08-28 Refresh the process guide mirror for the 0.0.9 release
39de617 2026-08-28 Adopt the catalog and guide mirrors for the wave
b161255 2026-08-28 Apply the verified src-audit fixes
1c9ccdd 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
3ef77c1 2026-09-01 Adopt the renamed guide helpers in the parity test
d02596e 2026-09-01 Adopt extractFenceImports in the server test setup
e7d82a4 2026-09-02 Unify the HTTP client transport in core and name the mcp face factories
51775d1 2026-09-02 Name the server duplex adapter as the client adapter's mirror and tell both guide faces one story
249299f 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 src/core/MCPLegacy.ts                                                       |  12 +-
 src/core/MCPLegacyClientTransport.ts                                        |  14 +-
 src/core/MCPMethodManager.ts                                                |   2 +-
 src/core/MCPProgressReporter.ts                                             |   6 +-
 src/core/MCPServer.ts                                                       |  91 +++---
 src/core/MCPStreamController.ts                                             |   3 +-
 src/core/MCPTaskClient.ts                                                   |   4 +-
 src/core/MCPTextStreamController.ts                                         |   2 +-
 src/core/constants.ts                                                       | 122 +++++---
 src/core/errors.ts                                                          |   4 +-
 src/core/factories.ts                                                       |  18 +-
 src/core/helpers.ts                                                         | 164 ++++++++++-
 src/core/index.ts                                                           |   1 +
 src/core/inferers.ts                                                        |  24 +-
 src/core/parsers.ts                                                         |   3 +-
 src/{server => core}/transports/HTTPClientTransport.ts                      |  73 ++---
 src/core/types.ts                                                           | 572 +++++++++++++++++++++---------------
 src/core/validators.ts                                                      | 147 +++++----
 src/server/{transports => }/HTTPDisconnect.ts                               |  81 +++--
 src/server/MCPSession.ts                                                    |  16 +-
 src/server/constants.ts                                                     |  57 +---
 src/server/factories.ts                                                     | 121 +++++++-
 src/server/handlers.ts                                                      |  27 +-
 src/server/helpers.ts                                                       | 251 ++--------------
 src/server/index.ts                                                         |   3 +-
 src/server/inferers.ts                                                      |  84 ++++--
 src/server/middlewares.ts                                                   |  35 ++-
 src/server/transports/StdioClientTransport.ts                               |  17 +-
 src/server/transports/StdioServerTransport.ts                               |  25 +-
 src/server/transports/WebSocketClientTransport.ts                           |  50 ++--
 src/server/transports/WebSocketServerTransport.ts                           |  46 ++-
 src/server/types.ts                                                         | 133 ++++-----
 tests/conformance.test.ts                                                   | 113 ++++---
 tests/conformanceClient.ts                                                  |  57 +++-
 tests/fixtures/browserServer.ts                                             |  22 +-
 tests/guides.test.ts                                                        |  50 ++--
 tests/setup.test.ts                                                         |   3 +-
 tests/setup.ts                                                              |  35 +--
 tests/setupBrowser.ts                                                       |  11 +-
 tests/setupConformance.test.ts                                              |   9 +-
 tests/setupConformance.ts                                                   |   1 +
 tests/setupServer.ts                                                        |  23 +-
 tests/src/browser/factories.test.ts                                         | 495 ++++++++++++++++++++++++++++++-
 tests/src/browser/helpers.test.ts                                           | 432 ---------------------------
 tests/src/core/MCPClient.test.ts                                            |  37 ++-
 tests/src/core/MCPLegacyClientTransport.test.ts                             |   8 +-
 tests/src/core/MCPServer.test.ts                                            |  16 +-
 tests/src/core/helpers.test.ts                                              | 133 ++++++++-
 tests/src/{browser => core}/transports/HTTPClientTransport.test.ts          |  51 +++-
 tests/src/server/{transports => }/HTTPDisconnect.test.ts                    |  18 +-
 tests/src/server/MCPSession.test.ts                                         |   6 +-
 tests/src/server/factories.test.ts                                          |  14 +-
 tests/src/server/handlers.test.ts                                           |  21 +-
 tests/src/server/helpers.test.ts                                            | 170 ++---------
 .../server/{transports/HTTPClientTransport.test.ts => integration.test.ts}  |  46 ++-
 tests/src/server/middlewares.test.ts                                        |  30 +-
 tests/src/server/transports/StdioServerTransport.test.ts                    |   4 +-
 tests/src/server/transports/WebSocketClientTransport.test.ts                |   4 +-
 tests/src/server/transports/WebSocketServerTransport.test.ts                |   8 +-
 70 files changed, 2482 insertions(+), 2543 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

The surface diff is 122124 bytes, past the 60000-byte cap; read it with `git -C /home/user/fleet/mcp diff fdd47f2..249299f -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'`. Per-file stat:

```text
 src/browser/constants.ts |  51 ++------
 src/browser/index.ts     |   2 -
 src/browser/types.ts     |  99 +++++++--------
 src/core/constants.ts    | 122 +++++++++++++------
 src/core/errors.ts       |   4 +-
 src/core/index.ts        |   1 +
 src/core/types.ts        | 572 ++++++++++++++++++++++++++++++++++++++++++++++++++-------------------------------------
 src/server/constants.ts  |  57 +++------
 src/server/index.ts      |   3 +-
 src/server/types.ts      | 133 ++++++++++----------
 10 files changed, 558 insertions(+), 486 deletions(-)
```
