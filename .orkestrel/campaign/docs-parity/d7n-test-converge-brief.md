# Brief — P.2 `d7n-test-converge` (test under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/test` from the committed baseline `8f0aa71` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.14`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/test.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/test/guides/test.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-test-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/test.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/test.md function stagePane: guide "Sets the viewport and renders the runner's tester pane at that size, unscaled." source "Sets the tester's viewport and renders the runner's pane at the size that viewport claims."
guides/test.md function releasePane: guide "Hands the staged pane back to the runner's own layout, at the viewport the tester had before staging." source "Hands the tester pane back to the runner's own layout, at the viewport it had before staging."
guides/test.md function captureFrame: guide "Stages, shoots the whole document at that width, reads the file back, and returns the verified absolute path; releases the pane either way." source "Shoots one frame at one viewport size and proves the file on disk holds this run's bytes."
guides/test.md function readFrame: guide "One written frame's size in device pixels and the single color its bottom row paints; refuses a path holding no frame." source "Reads one written frame back and reports its size and the color its bottom row paints."
guides/test.md function readCascade: guide "Every class token the stylesheets loaded into this document define." source "Collects every class token the stylesheets loaded into this document actually define."
guides/test.md function readClasses: guide "Every class token the markup under one root carries, the root's own included." source "Collects every class token the markup under one root carries."
guides/test.md function readRules: guide "Every rule the loaded stylesheets hold, level by level, nested grouping rules included; a `@keyframes` rule is collected and its children are not." source "Collects every rule the stylesheets loaded into this document hold, nested grouping rules included."
guides/test.md function findRule: guide "The first style rule whose selector text carries a fragment." source "Finds the first style rule in the cascade whose selector carries a fragment."
guides/test.md function findKeyframes: guide "The animation the cascade declares under an exact name." source "Finds the animation the cascade declares under one name."
guides/test.md function readRows: guide "One line per matched element, built from its text nodes rather than from `textContent`." source "Reads the normalized visible text of every element a selector matches, in document order."
guides/test.md function extractOrphans: guide "The markup of every element carrying the `child` class with no `parent` class above it." source "Collects every element carrying a component class rendered outside the container it belongs to."
guides/test.md function extractStyles: guide "The markup of every element carrying an inline `style` and of every `<style>` element, the root itself included." source "Collects the markup of every element carrying a non-empty `style` attribute and of every `<style>` element, in document order, `root` included in both populations when it is an `Element`."
guides/test.md function readStyle: guide "One resolved CSS property, trimmed, read from the real browser." source "Reads one resolved CSS property from a real browser element."
guides/test.md function readToken: guide "One custom property off an element's resolved style, its dashes optional." source "Reads one custom property from an element's resolved style."
guides/test.md function readRootToken: guide "The same reading taken against the document element." source "Reads one custom property from the document element."
guides/test.md function readPixels: guide "One resolved length as a number of pixels; `0` when it carries none." source "Reads one resolved CSS length as a number of pixels."
guides/test.md function expandCaptures: guide "The registry times the variants, as `<state>--<variant>.png` names." source "Expands a capture registry across every variant into the filenames a complete portfolio holds."
guides/test.md function createPointerEvent: guide "One real pointer event carrying a browser's own defaults." source "Creates one real pointer event, ready to dispatch."
guides/test.md function createDragEvent: guide "One real drag event carrying a live data transfer." source "Creates one real drag event carrying a live data transfer, ready to dispatch."
guides/test.md function createPortfolio: guide "The capture registry one run places its screenshots through." source "Creates the capture portfolio one run places its screenshots through."
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
```

## Facts for test (taken 2026-09-07T15:14Z by facts.sh)

- Checkout `/home/user/fleet/test`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `8f0aa71`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: no
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
    273:					const actual = source.methods(group.interface).map((method) => method.name)
    274:					expect(findMissing(documented, actual)).toEqual([])
    275:					expect(findMissing(actual, documented)).toEqual([])
    303:				expect(findMissing(imported, exported)).toEqual([])
    309:				for (const group of guide.methods()) {
    379:		expect(findMissing(routed, discovered)).toEqual([])
    381:		expect(findMissing(discovered, [...transcribed, ...routed])).toEqual([])
    382:		expect(findMissing([...transcribed, ...routed], discovered)).toEqual([])
- `## Tests` paragraph naming checks: 2682:## Tests — 2 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/test.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/test.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-test-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
