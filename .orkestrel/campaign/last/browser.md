# Last changes: browser

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `c25c36b`, merge base with `origin/main` `480ff90`, layer L3, declared version 0.0.14, registry version 0.0.14.

## Commits since origin/main

```text
2a03289 2026-08-28 Update every dependency to the published latest
da715d9 2026-08-28 Adopt the catalog and guide mirrors for the wave
ba0fbe5 2026-08-28 Apply the verified src-audit fixes
9d7471e 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
78e4d72 2026-09-01 Adopt the renamed guide helpers in the parity test
e7a2299 2026-09-02 Rename the browser readers to parsers and reshape the frame, writer, and input surfaces
9563556 2026-09-02 Emit drop only for an unrequested close and put the drive methods back on their contracts
35443be 2026-09-02 Emit close when close() interrupts a pending connect()
c25c36b 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 src/core/BrowserFrame.ts                       |   41 +-
 src/core/BrowserHARManager.ts                  |   17 +-
 src/core/BrowserHandle.ts                      |   14 +-
 src/core/BrowserKeyboard.ts                    |   23 +-
 src/core/BrowserLocator.ts                     |   75 +--
 src/core/BrowserMouse.ts                       |   32 +-
 src/core/BrowserNavigationManager.ts           |   18 +-
 src/core/BrowserNetworkManager.ts              |  112 ++---
 src/core/BrowserPage.ts                        |   81 +--
 src/core/BrowserPerformance.ts                 |   67 +--
 src/core/BrowserPermissionManager.ts           |   11 +-
 src/core/BrowserProfiler.ts                    |   70 +++
 src/core/BrowserRoute.ts                       |    2 +-
 src/core/BrowserScriptManager.ts               |   21 +-
 src/core/BrowserSelectorManager.ts             |   15 +-
 src/core/BrowserSnapshot.ts                    |   14 +-
 src/core/BrowserStorageManager.ts              |   26 +-
 src/core/BrowserTouch.ts                       |   10 +-
 src/core/BrowserTracing.ts                     |   17 +-
 src/core/BrowserTransition.ts                  |   43 ++
 src/core/BrowserWebSocket.ts                   |   10 +-
 src/core/BrowserWorker.ts                      |   12 +-
 src/core/CDPClient.ts                          |  198 ++++----
 src/core/compilers.ts                          |  888 +++++++++++++++++++++++++++++++++
 src/core/constants.ts                          |   59 ++-
 src/core/errors.ts                             |   38 +-
 src/core/factories.ts                          |   10 +-
 src/core/helpers.ts                            | 1709 +++++++---------------------------------------------------------
 src/core/index.ts                              |   10 +-
 src/core/parsers.ts                            |  563 +++++++++++++++++++++
 src/core/types.ts                              |  593 ++++++++++++++--------
 src/server/Browser.ts                          |   96 ++--
 src/server/constants.ts                        |   48 +-
 src/server/errors.ts                           |   18 +-
 src/server/factories.ts                        |   14 +-
 src/server/helpers.ts                          |  133 ++---
 src/server/transports/WebSocketCDPTransport.ts |   59 +--
 src/server/types.ts                            |   40 +-
 tests/guides.test.ts                           |   31 +-
 tests/setup.test.ts                            |   31 +-
 tests/setup.ts                                 |   24 +-
 tests/src/core/BrowserContext.test.ts          |    2 +-
 tests/src/core/BrowserCookieManager.test.ts    |    6 +-
 tests/src/core/BrowserDiagnostics.test.ts      |   33 +-
 tests/src/core/BrowserEmulationManager.test.ts |    2 +-
 tests/src/core/BrowserFrame.test.ts            |    4 +-
 tests/src/core/BrowserHARManager.test.ts       |   24 +-
 tests/src/core/BrowserHandle.test.ts           |    3 +-
 tests/src/core/BrowserLocator.test.ts          |   28 +-
 tests/src/core/BrowserPage.test.ts             |   14 +-
 tests/src/core/BrowserSnapshot.test.ts         |   24 +-
 tests/src/core/BrowserTransition.test.ts       |   96 ++++
 tests/src/core/CDPClient.test.ts               |   63 ++-
 tests/src/core/compilers.test.ts               |  146 ++++++
 tests/src/core/helpers.test.ts                 |  454 ++++-------------
 tests/src/core/parsers.test.ts                 |  216 ++++++++
 tests/src/server/Browser.test.ts               |  113 ++---
 tests/src/server/factories.test.ts             |   10 +-
 tests/src/server/helpers.test.ts               |   47 +-
 73 files changed, 3920 insertions(+), 3092 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

The surface diff is 87777 bytes, past the 60000-byte cap; read it with `git -C /home/user/fleet/browser diff 480ff90..c25c36b -- 'src/**/types.ts' 'src/**/index.ts' 'src/**/constants.ts' 'src/**/errors.ts'`. Per-file stat:

```text
 src/core/constants.ts   |  59 ++++++---
 src/core/errors.ts      |  38 +++---
 src/core/index.ts       |  10 +-
 src/core/types.ts       | 593 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++------------------------------
 src/server/constants.ts |  48 ++++----
 src/server/errors.ts    |  18 +--
 src/server/types.ts     |  40 +++---
 7 files changed, 505 insertions(+), 301 deletions(-)
```
