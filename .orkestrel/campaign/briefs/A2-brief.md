# Absorb lane A2 — helper inventory from tests/setup.ts (host-independent helpers)

You are a READ-ONLY evidence lane. Make no repository changes. Do not design, decide, or recommend an API.

## Files to read (read every one, in full)

- /home/user/taverna/tests/setup.ts
- /home/user/scsr/tests/setup.ts
- /home/user/workbench/tests/setup.ts
- /home/user/workflow/tests/setup.ts
- /home/user/terminal/tests/setup.ts
- /home/user/markdown/tests/setup.ts
- /home/user/middleware/tests/setup.ts
- /home/user/relation/tests/setup.ts
- /home/user/pool/tests/setup.ts
- /home/user/websocket/tests/setup.ts
- /home/user/router/tests/setup.ts
- /home/user/guide/tests/setup.ts
- /home/user/indexeddb/tests/setup.ts
- /home/user/sqlite/tests/setup.ts

### Current @orkestrel/test exported surface (the consolidation destination)

Entry '@orkestrel/test' (src/core — host-independent):
  - EventSubscriber
  - JSONSafe
  - JSONValue
  - RecorderInterface
  - RetryOptions
  - TeardownHandler
  - TeardownInterface
  - WaitOptions
  - captureError
  - collect
  - collectStream
  - createHostileValues
  - createRecorder
  - createTeardown
  - decodeJSONLines
  - requireValue
  - resolveRoot
  - retryUntil
  - roundTripJSON
  - waitForCondition
  - waitForDelay
  - waitForEvent

Entry '@orkestrel/test/server' (src/server — Node only):
  - CookieJarInterface
  - InventoryOptions
  - LoopbackInterface
  - REMOVE_TREE_MAX_ATTEMPTS
  - REMOVE_TREE_RETRYABLE_CODES
  - REMOVE_TREE_RETRY_DELAY_MS
  - ScratchIdentity
  - ScratchInterface
  - ScratchOptions
  - createCookieJar
  - createLink
  - createLoopback
  - createScratch
  - destroyScratch
  - isExcluded
  - isRunning
  - matchesIdentity
  - readInventory
  - removeTree
  - resolveContained
  - waitForSocketClose

Entry '@orkestrel/test/browser' (src/browser — DOM/Vue):
  - ACCESSIBLE_ROLES
  - CANVAS_COLOR
  - CAPTURE_PANE
  - CONTENT_ROLES
  - CaptureVariant
  - Color
  - FIELD_ROLES
  - FOCUSABLE_SELECTOR
  - FrameOptions
  - HEADER_ROLES
  - IMPLICIT_ROLES
  - JournalInterface
  - JournalStep
  - PortfolioInterface
  - PortfolioOptions
  - blendColor
  - captureFrame
  - clearStorage
  - clickAccessible
  - clickAccessibleWithin
  - clickDisclosure
  - contrast
  - createJournal
  - createPortfolio
  - describeFocus
  - describeTree
  - expandCaptures
  - extractOrphans
  - fillAccessible
  - isOutsideViewport
  - isReachable
  - isRendered
  - measureContrast
  - measureLuminance
  - parseColor
  - pressKeys
  - readBackdrop
  - readCascade
  - readFocus
  - readLayers
  - readName
  - readPage
  - readPerception
  - readRing
  - readRole
  - readRows
  - readStates
  - readText
  - readValue
  - releasePane
  - render
  - resolveAccessible
  - resolveRendered
  - stagePane
  - style
  - traverseAccessible
  - typeAccessible
  - waitForFrame

## Your task

Read every listed file in full. Produce ONE ROW PER EXPORTED SYMBOL declared in those files.

For each exported symbol report exactly these fields, pipe-separated, on one line:

`REPO | FILE:LINE | NAME | KIND | SIGNATURE | BEHAVIOR | HOST | GENERAL | DUPLICATE`

- `KIND` — one of: function, const, interface, type, class.
- `SIGNATURE` — the exact declared signature, parameters and return type, collapsed to one line.
- `BEHAVIOR` — at most 15 words describing what it does, from reading the body. Not a guess from the name.
- `HOST` — `core` if the body touches no `node:*` import, no DOM/`window`/`document`, and no Vue; `server` if it touches `node:*`; `browser` if it touches DOM or Vue; `styles` if it only reads CSS/computed style.
- `GENERAL` — `general` if the body encodes no knowledge of this package's own domain types and any workspace could use it; `specific` if it names or shapes this package's own domain.
- `DUPLICATE` — `exists:<name>` when it duplicates or near-duplicates a symbol already exported by @orkestrel/test (listed earlier), and append `diff:<what differs>` when behavior differs; `none` otherwise.

Then add these sections:

### Clusters
Group symbols across the files you read that do the same job under different names, or the same
name with different behavior. One line per cluster: the job, then every `repo:name` member, then
the behavioral differences between members. This is the most valuable part of your report — be
exhaustive and do not merge two clusters that only look alike.

### Notable bodies
For any symbol you marked `general` whose body is longer than about 25 lines, give three to six
lines describing the mechanism precisely enough that an engineer could reimplement it without
reopening the file: what it allocates, what it polls or awaits, how it cleans up, what it throws.

### Unknowns
Facts you could not establish, named as unknowns. No recommendations.

## Rules

- Read-only. Change nothing. Run no `git` command that writes.
- Never dump raw file contents. Every claim carries a `file:line` pointer.
- Do not design an API, do not recommend a consolidation, do not rank anything. You return evidence.
- If a listed file does not exist, write `MISSING <path>` and continue.
- Report every exported symbol. Completeness matters more than brevity.
