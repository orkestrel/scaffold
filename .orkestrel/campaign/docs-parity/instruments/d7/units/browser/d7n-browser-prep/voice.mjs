// d7n-browser-prep item 3: apply one exact before/after pair per voice diagnostic.
// Fails loudly when a before-text is absent or occurs more than once.
import { readFileSync, writeFileSync } from 'node:fs'

const edits = [
	// --- tests/setup.ts
	['tests/setup.ts', '/** Ignore an intentional callback invocation. */', '/** Ignores an intentional callback invocation. */'],
	['tests/setup.ts', '/** Ignore an intentional asynchronous callback invocation. */', '/** Ignores an intentional asynchronous callback invocation. */'],
	['tests/setup.ts', '/** Throw the stable listener failure used by emitter containment tests. */', '/** Throws the stable listener failure emitter containment tests use. */'],
	['tests/setup.ts', '/** Evaluate a JavaScript expression fixture and expose its result as unknown. */', '/** Evaluates a JavaScript expression fixture and exposes its result as unknown. */'],
	['tests/setup.ts', "/** One JSON-RPC frame recorded by the fake transport's `send()`. */", "/** Describes one JSON-RPC frame the fake transport's `send()` recorded. */"],
	['tests/setup.ts', "/** Handler invoked synchronously when the fake transport observes a matching `send()`. */", "/** Runs synchronously when the fake transport observes a matching `send()`. */"],
	['tests/setup.ts', ' * An in-memory {@link CDPTransportInterface} for tests, plus scripting hooks.', ' * Implements {@link CDPTransportInterface} in memory for tests, plus scripting hooks.'],
	['tests/setup.ts', '/** A connected client and the transport used to drive it. */', '/** Pairs a connected client with the transport that drives it. */'],
	['tests/setup.ts', ' * Create a fake in-memory CDP transport for driving a real {@link CDPClient}', ' * Creates a fake in-memory CDP transport for driving a real {@link CDPClient}'],
	['tests/setup.ts', ' * Create and connect a real CDP client over the in-memory test transport.', ' * Creates and connects a real CDP client over the in-memory test transport.'],
	['tests/setup.ts', '/** A real page attached over the in-memory transport, and the transport driving it. */', '/** Pairs a real page attached over the in-memory transport with the transport driving it. */'],
	['tests/setup.ts', ' * Create a real {@link BrowserPage} over a connected in-memory CDP client.', ' * Creates a real {@link BrowserPage} over a connected in-memory CDP client.'],
	['tests/setup.ts', ' * Read the parameter record of every frame the transport recorded for one method.', ' * Reads the parameter record of every frame the transport recorded for one method.'],
	['tests/setup.ts', ' * Script an automatic success reply for the next (and every subsequent)', ' * Scripts an automatic success reply for the next (and every subsequent)'],
	['tests/setup.ts', '/** Script the target attach and required domain-enable handshake. */', '/** Scripts the target attach and required domain-enable handshake. */'],
	['tests/setup.ts', '/** Read a sent Runtime expression without a type assertion. */', '/** Reads a sent Runtime expression without a type assertion. */'],
	['tests/setup.ts', '/** Script a selector lookup that resolves as present. */', '/** Scripts a selector lookup that resolves as present. */'],
	['tests/setup.ts', ' * Script the complete trusted-input path for one present selector.', ' * Scripts the complete trusted-input path for one present selector.'],
	['tests/setup.ts', '/** Script the nested frame tree shared by page frame tests. */', '/** Scripts the nested frame tree page frame tests share. */'],
	['tests/setup.ts', '/** A fully started codegen fixture. */', '/** Describes a fully started codegen fixture. */'],
	['tests/setup.ts', '/** Create a connected client with a started codegen recorder. */', '/** Creates a connected client with a started codegen recorder. */'],
	['tests/setup.ts', '/** Create the CDP payload delivered by the codegen binding. */', '/** Creates the CDP payload the codegen binding delivers. */'],
	['tests/setup.ts', ' * Script a `Runtime.evaluate` response keyed by a predicate over the sent', ' * Scripts a `Runtime.evaluate` response keyed by a predicate over the sent'],
	['tests/setup.ts', ' * Build a {@link CDPTarget} fixture, overriding any fields.', ' * Builds a {@link CDPTarget} fixture, overriding any fields.'],
	['tests/setup.ts', ' * Build a two-document `DOMSnapshot.captureSnapshot` result with sparse node', ' * Builds a two-document `DOMSnapshot.captureSnapshot` result with sparse node'],
	['tests/setup.ts', '/** A {@link BrowserWriterInterface} recording every `write()` call. */', '/** Extends {@link BrowserWriterInterface} with a record of every `write()` call. */'],
	['tests/setup.ts', '/** Base64 for bytes `[137, 80, 78, 71, 13]` (PNG-signature-prefixed). */', '/** Encodes bytes `[137, 80, 78, 71, 13]` as base64 (PNG-signature-prefixed). */'],
	['tests/setup.ts', '/** Base64 for bytes `[255, 216, 255, 224]` (JPEG-signature-prefixed). */', '/** Encodes bytes `[255, 216, 255, 224]` as base64 (JPEG-signature-prefixed). */'],

	// --- tests/setupServer.ts
	['tests/setupServer.ts', ' * Whether this platform delivers `SIGTERM` as a catchable signal a process can\n * trap and outlive.', ' * Reports whether this platform delivers `SIGTERM` as a catchable signal a\n * process can trap and outlive.'],
	['tests/setupServer.ts', ' * Reserve a free localhost port by binding an ephemeral server to port 0 and', ' * Reserves a free localhost port by binding an ephemeral server to port 0 and'],
	['tests/setupServer.ts', ' * @returns A currently-free TCP port number', ' * @returns A free TCP port number'],
	['tests/setupServer.ts', '/** Read the bound TCP port or throw when the server has no address. */', '/** Reads the bound TCP port, or throws when the server has no address. */'],
	['tests/setupServer.ts', ' * Wait until a process exits.', ' * Waits until a process exits.'],
	['tests/setupServer.ts', '/** Allocate and register a temporary scratch directory for deterministic test teardown. */', '/** Allocates and registers a temporary scratch directory for deterministic test teardown. */'],
	['tests/setupServer.ts', '/** Remove every registered test directory. */', '/** Removes every registered test directory. */'],
	['tests/setupServer.ts', '/** Raw TCP fixture that accepts connections without completing a handshake. */', '/** Accepts raw TCP connections without completing a handshake. */'],
	['tests/setupServer.ts', '/** Start a raw TCP server that leaves every accepted connection open. */', '/** Starts a raw TCP server that leaves every accepted connection open. */'],
	['tests/setupServer.ts', '/** Stateful implementation of the stalling TCP fixture. */', '/** Implements the stalling TCP fixture and holds its socket state. */'],
	['tests/setupServer.ts', '/** Restartable raw TCP proxy fixture used to sever and restore a connection. */', '/** Severs and restores a connection through a restartable raw TCP proxy. */'],
	['tests/setupServer.ts', '/** Create a restartable TCP proxy bound to a fixed local port. */', '/** Creates a restartable TCP proxy bound to a fixed local port. */'],
	['tests/setupServer.ts', '/** Stateful implementation of the restartable TCP proxy fixture. */', '/** Implements the restartable TCP proxy fixture and holds its socket state. */'],
	['tests/setupServer.ts', '/** A CDP JSON-RPC request frame received by the test server. */', '/** Describes one CDP JSON-RPC request frame the test server received. */'],
	['tests/setupServer.ts', '/** Handler that computes an auto-reply result for a scripted CDP method. */', '/** Computes an auto-reply result for a scripted CDP method. */'],
	['tests/setupServer.ts', ' * An in-process HTTP+WebSocket server speaking just enough raw CDP to drive\n * `Browser`/`WebSocketCDPTransport` end-to-end in tests — real sockets, no\n * mocks. Exposes', ' * Serves enough raw CDP over HTTP and WebSocket to drive\n * `Browser`/`WebSocketCDPTransport` end-to-end in tests — real sockets, no\n * mocks. Exposes'],
	['tests/setupServer.ts', '/** Count of currently open WebSocket sockets (for close-propagation assertions). */', '/** Count of open WebSocket sockets (for close-propagation assertions). */'],
	['tests/setupServer.ts', ' * Start an in-process CDP test server on a free localhost port.', ' * Starts an in-process CDP test server on a free localhost port.'],
	['tests/setupServer.ts', '/** Real HTTP and WebSocket fixture implementing the test CDP surface. */', '/** Implements the test CDP surface over a real HTTP and WebSocket server. */'],
	['tests/setupServer.ts', '/** A registered fake-browser fixture, tracked for guaranteed teardown. */', '/** Tracks one registered fake-browser fixture for teardown. */'],
	['tests/setupServer.ts', ' * Guaranteed teardown safety net for every fake browser process created\n * through `createFakeBrowserProcess` — SIGKILLs any still-alive registered pid\n * (tolerating a not-yet-written pid file or an already-dead process) and\n * clears the registry. Wire into a top-level `afterEach` alongside each\n * test\'s own explicit kills.', ' * Clears the fake-browser registry, sending `SIGKILL` to every still-alive\n * registered pid — the teardown safety net for every process created through\n * `createFakeBrowserProcess`, tolerating a not-yet-written pid file or an\n * already-dead process. Wire into a top-level `afterEach` alongside each\n * test\'s own explicit kills.'],
	['tests/setupServer.ts', ' * Read a fixture process identifier after its spawned script has published it.', ' * Reads a fixture process identifier after its spawned script has published it.'],
	['tests/setupServer.ts', '/** A real, spawned stand-in "browser" process for exercising Browser\'s launch path. */', '/** Describes a real, spawned stand-in "browser" process for exercising Browser\'s launch path. */'],
	['tests/setupServer.ts', ' * Write a small, real Node script that stands in for a browser executable in', ' * Writes a small, real Node script that stands in for a browser executable in'],

	// --- tests/setupService.ts
	['tests/setupService.ts', ' * Container-safe launch flags shared by every live-browser proof.', ' * Lists the container-safe launch flags every live-browser proof shares.'],
	['tests/setupService.ts', ' * Resolve the engine service discovery narrows to, from a requested value.', ' * Resolves the engine service discovery narrows to, from a requested value.'],
	['tests/setupService.ts', ' * Resolve the live browser a service proof drives, or throw naming what to install.', ' * Resolves the live browser a service proof drives, or throws naming what to install.'],

	// --- tests/src/server/Browser.test.ts
	['tests/src/server/Browser.test.ts', '// === abort mid-connect (robustness-3) leaves no orphaned process', '// === abort mid-connect leaves no orphaned process'],
	['tests/src/server/Browser.test.ts', '// === host option (robustness-7)', '// === host option'],

	// --- src/**, doc block and comment only
	['src/server/types.ts', '/** Assumes responsibility for terminating the currently connected browser. */', '/** Assumes responsibility for terminating the connected browser. */'],
	['src/core/helpers.ts', ' * @param buttons - Currently pressed public mouse buttons', ' * @param buttons - Pressed public mouse buttons'],
]

const texts = new Map()
const failures = []
for (const [file, before, after] of edits) {
	const text = texts.get(file) ?? readFileSync(file, 'utf8')
	const hits = text.split(before).length - 1
	if (hits !== 1) {
		failures.push(`${file}: ${hits} hits for ${JSON.stringify(before)}`)
		texts.set(file, text)
		continue
	}
	texts.set(file, text.replace(before, after))
}
if (failures.length > 0) {
	for (const failure of failures) console.error(failure)
	process.exit(1)
}
for (const [file, text] of texts) writeFileSync(file, text)
console.log(`applied ${edits.length} pairs across ${texts.size} files`)
