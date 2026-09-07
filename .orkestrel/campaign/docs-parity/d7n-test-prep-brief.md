# Brief — P.1 `d7n-test-prep` (test's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/test` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `27a841b`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

test's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== test 2026-09-07T14:57:42Z tarball sha256 85031b9260758fe3
== before
0.0.18
(status end)
== replaced range
87:		"@orkestrel/guide": "^0.0.17",
== install

up to date in 639ms
EXIT 0
== after
0.0.18
9
(status end)
== note: this log is the second, idempotent run of head-start.sh test; the first run read 0.0.17 before and printed 'removed 30 packages, and changed 2 packages in 1s', EXIT 0, 0.0.18 after — the same transition as codec's log
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### test (27a841b, version 0.0.13, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 38 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupServer.ts(5)
   src/server/helpers.ts(2)
   tests/src/browser/helpers.test.ts(1)
   tests/setup.ts(1)
-- docs
   guides/test.md function createChannel: guide "One console channel that records every call it receives and forwards it unchanged." source "Creates one console channel that records every call it receives and hands that call on unchanged."
   guides/test.md function createJournal: guide "The record of one scenario's steps and the page's own output." source "Creates the journal one scenario records its steps and the page's own output into."
   guides/test.md interface ScratchInterface: guide absent source "Holds a temporary directory a test owns, writes into, reads back, and removes when it is done."
   guides/test.md interface ScratchIdentity: guide absent source "Represents the fields that together identify one allocated directory on its host."
   guides/test.md interface ScratchOptions: guide absent source "Configures a scratch directory allocation."
   guides/test.md interface LoopbackInterface: guide absent source "Holds a server a test owns, listening on an ephemeral loopback port until the test releases it."
   guides/test.md interface CookieJarInterface: guide absent source "Holds a name-keyed cookie store a test drives one origin with, filled from real responses."
   guides/test.md interface InventoryOptions: guide absent source "Configures a source inventory read."
   guides/test.md interface UpgradeOptions: guide absent source "Configures a client upgrade request."
   guides/test.md type UpgradeResult: guide absent source "Represents what one server did with a client upgrade request."
   guides/test.md const REMOVE_TREE_MAX_ATTEMPTS: guide "The attempts `removeTree` makes before rethrowing a retryable removal error." source "Caps the attempts `removeTree` makes before rethrowing a retryable removal error."
   guides/test.md const REMOVE_TREE_RETRY_DELAY_MS: guide "The synchronous delay, in milliseconds, `removeTree` waits between attempts." source "Names the synchronous delay, in milliseconds, `removeTree` waits between attempts."
   guides/test.md const REMOVE_TREE_RETRYABLE_CODES: guide "The removal error codes `removeTree` retries; every other code rethrows immediately." source "Names the error codes `removeTree` retries; every other code rethrows immediately."
   guides/test.md function readInventory: guide "Named files and walked directories, keyed by root-relative path in sorted order." source "Reads files from selected targets below a root directory."
   guides/test.md function resolveContained: guide "The absolute target below `root`, or `undefined` when it escapes." source "Resolves a target that stays below a root directory."
   guides/test.md function requireContained: guide "The same resolution, refusing an escape with the message every scratch member spells." source "Resolves a target that stays below a root directory, refusing an escape."
   guides/test.md function isExcluded: guide "Whether an exclusion names the key or one of its ancestors." source "Reports whether a root-relative key matches an exclusion."
   guides/test.md function readIdentity: guide "The device, index node, and creation time read off one host status." source "Reads the identity of one allocated directory off a host status."
   guides/test.md function matchesIdentity: guide "Whether two identities name the same allocation." source "Reports whether two directory identities name the same allocation."
   guides/test.md function readErrorCode: guide "The string `code` an unknown thrown value carries, or `undefined` when it carries none." source "Reads the `code` an unknown thrown value carries."
   guides/test.md function createLink: guide "Create a symbolic link, or a directory junction where the host refuses one." source "Creates a symbolic link with a directory-junction fallback for hosts that refuse symbolic links."
   guides/test.md function removeTree: guide "Remove a directory tree, retrying a briefly-held handle before rethrowing." source "Removes a directory tree, retrying past a transient Windows handle-release race."
   guides/test.md function isRunning: guide "Whether a process id names a live process at the moment of the call." source "Reports whether a process id names a live process."
   guides/test.md function waitForSocketClose: guide "Wait for a socket's `close`, waiting past a peer reset." source "Waits for a socket to close, accepting a peer reset as a forced close."
   guides/test.md function destroyScratch: guide "Destroy a scratch directory, retrying until the host releases it." source "Destroys a scratch directory, retrying until the host releases it."
   guides/test.md function requestUpgrade: guide "Drives one client upgrade request within a budget and reports what the server did." source "Drives a real client upgrade request against a loopback port and reports what the server did."
   guides/test.md function supportsDirectoryLinks: guide "Whether this host links a directory and reads through the link." source "Checks whether this host links a directory, by creating one link and reading through it."
   guides/test.md function supportsFileLinks: guide "Whether this host links a file and reads the file through the link." source "Checks whether this host links a file, by creating one link and reading the file through it."
   guides/test.md function supportsMode: guide "Whether POSIX permission bits round-trip through this host's `chmod` and `stat` calls." source "Checks whether POSIX permission bits round-trip through this host's `chmod` and `stat`."
   guides/test.md function supportsCase: guide "Whether names differing only by case are distinct files on this host." source "Checks whether this host treats two names differing only by case as distinct files."
   guides/test.md function supportsBytes: guide "Whether a filename carrying a raw non-UTF-8 byte is written and read back." source "Checks whether this host accepts a filename carrying a raw byte no UTF-8 decoder resolves."
   guides/test.md function createScratch: guide "Allocates a directory below `parent` the caller owns and destroys." source "Allocates an owned temporary directory with contained file operations."
   guides/test.md function createLoopback: guide "Binds a caller-supplied server to `127.0.0.1` on a host-picked port." source "Starts a server on an ephemeral IPv4 loopback port."
   guides/test.md function createCookieJar: guide "Records a real response's cookies and replays them as one header." source "Creates a cookie jar that records a real response's cookies and replays them as one header."
   guides/test.md RecorderInterface.clear: guide absent source "Discards the recorded calls and keeps the recorder usable."
   guides/test.md EventSourceInterface.on: guide absent source "Subscribes a handler to an event."
   guides/test.md ResourceFactoryInterface.create: guide absent source "Creates a numbered resource."
   guides/test.md ResourceFactoryInterface.destroy: guide absent source "Destroys a numbered resource."
   guides/test.md TeardownInterface.add: guide absent source "Registers a handler to run when the list is destroyed."
   guides/test.md TeardownInterface.destroy: guide absent source "Runs every registered handler in reverse registration order, awaiting each in turn, and empties the list."
   guides/test.md StateScenario.arrange: guide absent source "Puts the entity into the transition's `from` state."
   guides/test.md StateScenario.act: guide absent source "Applies the transition's event to the arranged entity."
   guides/test.md StateScenario.assert: guide absent source "Checks that the entity reached the transition's `to` state."
   guides/test.md LoopbackInterface.destroy: guide absent source "Drops every live connection on a server that carries `closeAllConnections`, stops listening, and releases the port."
   guides/test.md CookieJarInterface.read: guide absent source "Reads one stored cookie value."
   guides/test.md CookieJarInterface.capture: guide absent source "Applies every `Set-Cookie` field a response carries."
   guides/test.md PortfolioInterface.place: guide absent source "Places one registered state: applies the variant, stages the pane, and writes the verified screenshot."
   guides/test.md JournalInterface.start: guide absent source "Starts a fresh recording, dropping whatever the previous scenario left."
   guides/test.md JournalInterface.stop: guide absent source "Stops recording and hands every intercepted console channel back by identity."
   guides/test.md JournalInterface.record: guide absent source "Records one step, when the journal is started."
   guides/test.md ScratchInterface.write: guide absent source "Writes a file, creating each parent directory that does not exist."
   guides/test.md ScratchInterface.read: guide absent source "Reads a file."
   guides/test.md ScratchInterface.has: guide absent source "Reports whether a path exists without following its final symbolic link."
   guides/test.md ScratchInterface.names: guide absent source "Lists the names directly inside a directory in sorted order."
   guides/test.md ScratchInterface.ensure: guide absent source "Creates a directory and every missing parent."
   guides/test.md ScratchInterface.link: guide absent source "Creates a symbolic link at a contained path, creating its missing parent directories."
   guides/test.md ScratchInterface.remove: guide absent source "Removes a file, an empty directory, or a directory and its descendants."
   guides/test.md ScratchInterface.destroy: guide absent source "Removes the allocated directory and everything in it when its identity still matches."
   guides/test.md pitch: readme absent tagline "The test helpers the fleet kept rewriting, published once. They read as families of what a test records, what it waits for, and what it owns, with a pair outside all of them and a browser journey layer beside them. What a test records. A call recorder, a map of recorders subscribed to an emitter's events, a signal's live abort-listener tally, a numbered resource ledger, a captured throw, a drained async source, a JSON copy, a required value, a decoded JSON Lines stream, and a cookie jar filled from real responses. Each turns what the code under test did into a value you can assert on. What a test waits for. A real delay, and — each bounded by a budget, an interval, and an abort signal — a named condition, a produced value, a first event delivery, a socket's close, and a directory the host has finally let go. One wait takes no bound at all, because it needs none: `waitForAbort` parks on a signal's own abort. Nothing here replaces the host clock: every bound is a real elapsed interval read with `performance.now()`. What a test owns and must give back. A temporary directory, a cleanup list, and a loopback server, each carrying `destroy()`. Each one takes something from the host. `resolveRoot` and `readInventory` are the pair outside all of them: together they read the real tree a test checks itself against. Neither records anything, neither waits for anything, and neither owns anything to give back. `createHostileValues` sits outside them too, on the input side: it is what a test feeds its guards, a corpus whose every member throws on a naive read or violates a naive structural assumption. The host-capability probes are outside them on the environment side, answering what this filesystem does rather than what its platform is called. `invokeUnchecked` and `readProperty` are outside them at the type boundary, where a value nothing declares meets a claim its caller owns, and `flattenHeaders` is outside them on the comparison side, turning any header initializer into one frozen record. The journey layer drives a real interface by role and accessible name through the installed Vitest provider, measures what a reader can see of the result, records the scenario and the page's own output as it goes, and generates the capture portfolio from the same journeys. Around it sit the fixture the journey runs against and the readings a styling claim rests on: an element built and mounted, a field driven the way its component listens for, the tokens, colors, and rules the cascade resolved, and a database given back at the end of the test that filled it. A helper ships here when it is a reusable test mechanism with a real consumer that no native or declared primitive already covers; Limits states that rule and what it refused. This package holds one implementation of each and ships as a `devDependency`. Nothing here runs in production code. Source: `src/core`, `src/browser`, and `src/server`. It has zero runtime dependencies, and no exported type here names an `@orkestrel/*` type. A dependency on `@orkestrel/emitter` would install a second copy of it beside the one a consumer already pins, and the compiler reads two copies as two distinct types. A foreign type in a signature fails the other way, rejecting the consumer's own local value inside the consumer's own repository. The zero-runtime-dependencies contract holds both."
   rows read: 1, disagreements found: 186
   exit 1
-- check
   tests/guides.test.ts(274,25): error TS2345: Argument of type 'MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(275,25): error TS2345: Argument of type 'MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  1 failed | 39 passed (40)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 129ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(3) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(3) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 9 | summary 6 | banned 3 | tests/setupServer.ts(5) src/server/helpers.ts(2) tests/src/browser/helpers.test.ts(1) tests/setup.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+730,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/test.md"
+739,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/test.md"
+2027,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/test.md"
+2817,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/test.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for test (taken 2026-09-07T14:58Z by facts.sh)

- Checkout `/home/user/fleet/test`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `27a841b`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: no
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 9 | summary 6 | banned 3 | tests/setupServer.ts(5) src/server/helpers.ts(2) tests/src/browser/helpers.test.ts(1) tests/setup.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                 | Source                                                                                    | Tests                                                                                                                         |
    8:| ------- | -------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
    9:| Test    | [`test.md`](test.md) | [`src/core`](../src/core), [`src/browser`](../src/browser), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/browser`](../tests/src/browser), [`tests/src/server`](../tests/src/server) |
    13:| Directory     | Guide                |
    14:| ------------- | -------------------- |
    15:| `src/core`    | [`test.md`](test.md) |
    16:| `src/browser` | [`test.md`](test.md) |
    17:| `src/server`  | [`test.md`](test.md) |
- Guide `guides/test.md`: 2927 lines. Headings:
    1:# Test
    52:## Install
    73:## Surface
    100:### Core
    104:#### Types
    131:#### Constants
    144:#### Validators
    160:#### Helpers
    190:#### Factories
    201:### Browser
    222:#### Types
    236:#### Constants
    250:#### Helpers
    313:#### Factories
    578:### Server
    582:#### Types
    595:#### Constants
    603:#### Helpers
    720:#### Factories
    748:## Methods
    753:#### `RecorderInterface`
    759:#### `EventSourceInterface`
    765:#### `ResourceFactoryInterface`
    772:#### `TeardownInterface`
    779:#### `StateScenario`
    787:#### `LoopbackInterface`
    793:#### `CookieJarInterface`
    800:#### `PortfolioInterface`
    806:#### `JournalInterface`
    814:#### `ScratchInterface`
    842:### Traversal
    872:### Hosts that create no symbolic link
    901:## Voices
    957:### Refusals outside the journey layer
    972:## Contract
    1264:### Threat model
    1308:## Limits
    1377:### Bounds a shipped helper carries
    1409:## Patterns
    1411:### Record calls without a spy
    1433:### Record an emitter's events
    1476:### Count the listeners on a signal
    1522:### Number the resources a fixture allocates
    1547:### Capture a throw, then assert on it
    1567:### Narrow without `!` or `as`
    1579:### Cross an unchecked boundary
    1606:### Flatten headers into one record
    1630:### Drain an async source
    1653:### Wait for a named condition
    1728:### Copy a JSON value
    1752:### Prove a guard is total
    1802:### Prove a wire fixpoint
    1820:### Drive a statechart table
    1919:### Read a source inventory
    1964:### Own a temporary directory
    2048:### Give everything back in one hook
    2079:### Answer a real request on a loopback port
    2103:### Request an HTTP upgrade
    2157:### Probe what the host supports
    2183:### Replay response cookies
    2220:### Refuse an escaping path in your own fixture
    2240:### Build and mount a fixture
    2275:### Drive an interface the way a person does
    2306:### Drive a field the component listens to
    2336:### Measure what a reader sees
    2389:### Read the tokens and colors a theme declares
    2425:### Find a rule in the cascade
    2454:### Read the classes and styles the markup carries
    2501:### Remove an IndexedDB database
    2527:### Record a browser journal
    2565:### Place a capture portfolio
    2603:### Measure a document's content edge
    2630:### Read a written frame back
    2659:### Practices
    2682:## Tests
    2924:## See also
- Table headers in `guides/test.md` (a header row is the row before a `| ---` row):
    106: | Type                       | Kind      | Shape                                                                                                                                                                                                                                                                                    |
    133: | API                     | Kind  | Signature                                                                                                    | Summary                                                                             |
    146: | API                     | Kind     | Signature                                                                                      | Summary                                                                       |
    162: | API                   | Kind     | Signature                                                                             | Summary                                                           |
    192: | API                     | Kind     | Signature                                                                                                 | Summary                                                          |
    224: | Type                 | Kind      | Shape                                                                                                                                               |
    238: | API                  | Kind  | Signature                          | Summary                                                                                                                            |
    252: | API                     | Kind     | Signature                                                                                               | Summary                                                                                                                                            |
    315: | API                  | Kind     | Signature                                                                                                 | Summary                                                                            |
    584: | Type                 | Kind      | Shape                                                                                                                                                                                 |
    597: | API                           | Kind  | Shape               | Summary                                                                              |
    605: | API                      | Kind     | Signature                                                                                                           | Summary                                                                                 |
    722: | API               | Kind     | Signature                                        | Summary                                                              |
    755: | Method  | Returns | Behavior                                                                     |
    761: | Method | Returns | Behavior                                                                                                                                                                             |
    767: | Method    | Returns  | Behavior                                                                                                                                                                                                                          |
    774: | Method    | Returns         | Behavior                                                                                                                                                                                                                                 |
    781: | Method    | Returns                 | Behavior                                                                                                                                                              |
    789: | Method    | Returns         | Behavior                                                                                                                                                                                                                                                                                               |
    795: | Method    | Returns               | Behavior                                                                                                                                                                                                                                                                                                                                                                                       |
    802: | Method  | Returns                        | Behavior                                                                                                                                                                                                                                                                           |
    808: | Method   | Returns | Behavior                                                                                                                                                            |
    816: | Method    | Returns               | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
    906: | Voice                                                                                 | Thrown by               |
    961: | Voice                                  | Thrown by         |
    1337: | Candidate                                                                                        | Ruling  | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/test.md`):
    3: > The test helpers the fleet kept rewriting, published once. They read as families of what a test
    4: > records, what it waits for, and what it owns, with a pair outside all of them and a browser journey
    5: > layer beside them.
    6: >
    7: > **What a test records.** A call recorder, a map of recorders subscribed to an emitter's events, a
    8: > signal's live abort-listener tally, a numbered resource ledger, a captured throw, a drained async
    9: > source, a JSON copy, a required value, a decoded JSON Lines stream, and a cookie jar filled from
    10: > real responses. Each turns what the code under test did into a value you can assert on.
    11: >
    12: > **What a test waits for.** A real delay, and — each bounded by a budget, an interval, and an abort
    13: > signal — a named condition, a produced value, a first event delivery, a socket's close, and a
    14: > directory the host has finally let go. One wait takes no bound at all, because it needs none:
    15: > `waitForAbort` parks on a signal's own abort. Nothing here replaces the host clock: every bound is
    16: > a real elapsed interval read with `performance.now()`.
    17: >
    18: > **What a test owns and must give back.** A temporary directory, a cleanup list, and a loopback
    19: > server, each carrying `destroy()`. Each one takes something from the host.
    20: >
    21: > `resolveRoot` and `readInventory` are the pair outside all of them: together they read the
    22: > real tree a test checks itself against. Neither records anything, neither waits for anything, and
    23: > neither owns anything to give back.
    24: >
    25: > `createHostileValues` sits outside them too, on the input side: it is what a test feeds its guards,
    26: > a corpus whose every member throws on a naive read or violates a naive structural assumption. The
    27: > host-capability probes are outside them on the environment side, answering what this filesystem
    28: > does rather than what its platform is called. `invokeUnchecked` and `readProperty` are outside them
    29: > at the type boundary, where a value nothing declares meets a claim its caller owns, and
    30: > `flattenHeaders` is outside them on the comparison side, turning any header initializer into one
    31: > frozen record.
    32: >
    33: > The journey layer drives a real interface by role and accessible name through the installed Vitest
    34: > provider, measures what a reader can see of the result, records the scenario and the page's own
    35: > output as it goes, and generates the capture portfolio from the same journeys. Around it sit the
    36: > fixture the journey runs against and the readings a styling claim rests on: an element built and
    37: > mounted, a field driven the way its component listens for, the tokens, colors, and rules the
    38: > cascade resolved, and a database given back at the end of the test that filled it.
    39: >
    40: > A helper ships here when it is a reusable test mechanism with a real consumer that no native or
    41: > declared primitive already covers; [Limits](#limits) states that rule and what it refused. This
    42: > package holds one implementation of each and ships as a `devDependency`. Nothing here runs in
    43: > production code. Source: [`src/core`](../src/core), [`src/browser`](../src/browser), and
    44: > [`src/server`](../src/server).
    45: >
    46: > It has **zero runtime dependencies**, and no exported type here names an `@orkestrel/*` type. A
    47: > dependency on `@orkestrel/emitter` would install a second copy of it beside the one a consumer
    48: > already pins, and the compiler reads two copies as two distinct types. A foreign type in a
    49: > signature fails the other way, rejecting the consumer's own local value inside the consumer's own
    50: > repository. The zero-runtime-dependencies contract holds both.
- Opening prose after the blockquote (first two lines):
    52: ## Install
    54: ```bash
- README (`README.md`) first lines:
    # @orkestrel/test
    
    The test helpers the `@orkestrel` fleet kept rewriting, published once. A call recorder that is a
    real callback rather than a spy. A real host delay. A throw-to-value converter and a presence
    narrower, so `!` and `as` stay banned in tests. An async-iterable collector, a stream collector, and
    a JSON copier. A frozen hostile-value corpus for proving guards are total. A cleanup list that gives
    every owned resource back, newest first. A scratch directory the test owns and destroys, a loopback
    port for a server the test built, and a symlink-refusing source-file walker. And the browser journey
    layer, which drives a real interface by role and accessible name through the installed Vitest
    provider. A helper ships here only when enough packages had already written their own; the guide's
    [Limits](guides/test.md#limits) section states that rule, what it excluded, and the one door the
    journey layer came through instead. Add it as a devDependency; nothing here runs in production code.
- `## Patterns` fences, each with its nearest preceding heading:
    54: fence under "## Install"
    78: fence under "## Surface"
    1416: fence under "### Record calls without a spy"
    1439: fence under "### Record an emitter's events"
    1462: fence under "### Record an emitter's events"
    1482: fence under "### Count the listeners on a signal"
    1527: fence under "### Number the resources a fixture allocates"
    1552: fence under "### Capture a throw, then assert on it"
    1569: fence under "### Narrow without `!` or `as`"
    1586: fence under "### Cross an unchecked boundary"
    1612: fence under "### Flatten headers into one record"
    1632: fence under "### Drain an async source"
    1667: fence under "### Wait for a named condition"
    1698: fence under "### Wait for a named condition"
    1730: fence under "### Copy a JSON value"
    1762: fence under "### Prove a guard is total"
    1810: fence under "### Prove a wire fixpoint"
    1828: fence under "### Drive a statechart table"
    1873: fence under "### Drive a statechart table"
    1903: fence under "### Drive a statechart table"
    1925: fence under "### Read a source inventory"
    1966: fence under "### Own a temporary directory"
    2039: fence under "### Own a temporary directory"
    2053: fence under "### Give everything back in one hook"
    2081: fence under "### Answer a real request on a loopback port"
    2109: fence under "### Request an HTTP upgrade"
    2162: fence under "### Probe what the host supports"
    2199: fence under "### Replay response cookies"
    2225: fence under "### Refuse an escaping path in your own fixture"
    2246: fence under "### Build and mount a fixture"
    2280: fence under "### Drive an interface the way a person does"
    2311: fence under "### Drive a field the component listens to"
    2353: fence under "### Measure what a reader sees"
    2378: fence under "### Measure what a reader sees"
    2396: fence under "### Read the tokens and colors a theme declares"
    2431: fence under "### Find a rule in the cascade"
    2465: fence under "### Read the classes and styles the markup carries"
    2507: fence under "### Remove an IndexedDB database"
    2537: fence under "### Record a browser journal"
    2570: fence under "### Place a capture portfolio"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/server/factories.ts:38:export function createScratch(options?: ScratchOptions): ScratchInterface {
    src/server/factories.ts:149:export async function createLoopback(server: Server): Promise<LoopbackInterface> {
    src/server/factories.ts:199:export function createCookieJar(): CookieJarInterface {
    src/server/helpers.ts:143:export function createLink(path: string, source: string): void {
    src/browser/factories.ts:31:export function createPointerEvent(name: string, options?: PointerEventInit): PointerEvent {
    src/browser/factories.ts:68:export function createDragEvent(name: string, options?: DragEventInit): DragEvent {
    src/browser/factories.ts:106:export function createPortfolio(options: PortfolioOptions): PortfolioInterface {
    src/browser/factories.ts:172:export function createChannel(
    src/browser/factories.ts:207:export function createJournal(): JournalInterface {
    src/core/factories.ts:60:export function createHostileValues(): readonly unknown[] {
    src/core/factories.ts:126:export function createRecorder<
    src/core/factories.ts:160:export function createRecorders<
    src/core/factories.ts:185:export function createSignal(): SignalInterface {
    src/core/factories.ts:287:export function createResourceFactory(): ResourceFactoryInterface {
    src/core/factories.ts:309:export function createTeardown(): TeardownInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/helpers.ts:1
    src/browser/index.ts:1
    src/browser/factories.ts:5
    src/browser/helpers.ts:61
    src/core/factories.ts:1
    src/core/helpers.ts:2
    src/core/constants.ts:2
    src/core/types.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    13:} from '@orkestrel/guide'
    239:			// empties `guide.methods()`, and a check anchored only to the guide then passes with
    244:					(symbol) => symbol.keyword === 'interface' && source.methods(symbol.name).length > 0,
    265:				const documented = guide.methods().map((group) => group.interface)
    266:				expect(findMissing(behavioral, documented)).toEqual([])
    267:				expect(findMissing(documented, behavioral)).toEqual([])
    271:				for (const group of guide.methods()) {
    273:					const actual = [...source.methods(group.interface)]
    274:					expect(findMissing(documented, actual)).toEqual([])
    275:					expect(findMissing(actual, documented)).toEqual([])
    303:				expect(findMissing(imported, exported)).toEqual([])
    309:				for (const group of guide.methods()) {
    379:		expect(findMissing(routed, discovered)).toEqual([])
    381:		expect(findMissing(discovered, [...transcribed, ...routed])).toEqual([])
    382:		expect(findMissing([...transcribed, ...routed], discovered)).toEqual([])
- `## Tests` paragraph naming checks: 2682:## Tests — 2 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.13"` → `"version": "0.0.14"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-test-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
