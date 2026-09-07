import sys
sys.path.insert(0, '/home/user/fleet/terminal/tmp/d7n-terminal-converge')
from members import document as doc

T = 'src/core/types.ts'
S = 'src/server/types.ts'

# TerminalInterface
doc(T, 'TerminalInterface', 'ask', "Walks the given form to settlement and resolves its values. The Contract section names the ctrl-c exception.")

# PromptInterface — data members first, then the call signatures the guide compares.
doc(T, 'PromptInterface', 'emitter', "Holds the typed emitter every broker event is published on.")
doc(T, 'PromptInterface', 'count', "Reports how many forms this broker currently holds parked.")
doc(T, 'PromptInterface', 'park', "Parks a live form, mints its id, emits `pending`, and arms the expiry deadline. Returns the id; the caller already holds the promise.")
doc(T, 'PromptInterface', 'pending', "Lists every parked record (`pending()`), or looks one up by id (`pending(id)`).")
doc(T, 'PromptInterface', 'answer', "Fills and submits the authoritative parked form. Accepted, it settles and the record is dropped; refused, the form stays parked.")
doc(T, 'PromptInterface', 'stop', "Releases a batch (`stop(ids)`, the array overload declared first), one id, or every parked form. The broker stays usable.")
doc(T, 'PromptInterface', 'destroy', "Tears the broker down — abandons every parked form, cancels every deadline, then destroys the emitter. Idempotent.")

# PromptClientInterface
doc(T, 'PromptClientInterface', 'emitter', "Holds the typed emitter every client event is published on.")
doc(T, 'PromptClientInterface', 'url', "Holds the remote broker's SSE endpoint this client reads from and answers to.")
doc(T, 'PromptClientInterface', 'connected', "Reports whether the SSE stream is open.")
doc(T, 'PromptClientInterface', 'connect', "Opens the stream and pumps it, queueing each received form for the local terminal; reconnects on the `delay` backoff.")
doc(T, 'PromptClientInterface', 'disconnect', "Stops the current connection and the reconnect loop. An active local render continues, and a later `connect()` can restart the stream.")
doc(T, 'PromptClientInterface', 'destroy', "Tears the client down permanently — disconnects, drops the queue, abandons the active local form, and destroys the emitter.")

# TerminalManagerInterface
doc(T, 'TerminalManagerInterface', 'emitter', "Holds the typed emitter every mounted broker's events are re-published on, attributed by name.")
doc(T, 'TerminalManagerInterface', 'count', "Reports how many endpoints are mounted.")
doc(T, 'TerminalManagerInterface', 'terminal', "Looks up one endpoint's broker by name.")
doc(T, 'TerminalManagerInterface', 'terminals', "Lists every mounted broker, in insertion order.")
doc(T, 'TerminalManagerInterface', 'add', "Mints, or returns unchanged, the broker for `name`. Idempotent; it never clobbers a live endpoint.")
doc(T, 'TerminalManagerInterface', 'ask', "Parks `form` from `from` to `to` and resolves with the settled values. Rejects `TARGET` or `DEADLOCK`.")
doc(T, 'TerminalManagerInterface', 'pending', "Lists every endpoint's parked records (`pending()`), or scopes to one endpoint (`pending(to)`).")
doc(T, 'TerminalManagerInterface', 'answer', "Routes an answer to the named endpoint's broker; `{ reason: 'target' }` when no endpoint carries that name.")
doc(T, 'TerminalManagerInterface', 'open', "Returns the live broker for `name`, or restores an empty one from the `store`. Parked forms are never resurrected.")
doc(T, 'TerminalManagerInterface', 'save', "Persists an endpoint's config snapshot; false with no store, or an unknown name.")
doc(T, 'TerminalManagerInterface', 'remove', "Removes a batch (`remove(names)`, the array overload declared first, true only when every name was mounted), one endpoint, or every endpoint.")
doc(T, 'TerminalManagerInterface', 'destroy', "Tears down every broker, then the manager's own emitter.")

# TerminalStoreInterface
doc(T, 'TerminalStoreInterface', 'get', "Resolves the snapshot stored for `id`, or `undefined` when none is.")
doc(T, 'TerminalStoreInterface', 'set', "Inserts or replaces under the snapshot's own `id`; there is no id argument.")
doc(T, 'TerminalStoreInterface', 'delete', "Drops a snapshot by id. An absent id is a no-op, never a throw.")

# InputStreamInterface
doc(S, 'InputStreamInterface', 'on', "Subscribes a `'data'` chunk listener — the irreducible event seam.")
doc(S, 'InputStreamInterface', 'off', "Unsubscribes that listener. The driver always pairs it, so no listener leaks.")
doc(S, 'InputStreamInterface', 'setRawMode', "Switches the TTY in and out of raw mode. Absent on a piped stream.")
doc(S, 'InputStreamInterface', 'resume', "Starts the flow of `'data'` events.")
doc(S, 'InputStreamInterface', 'pause', "Stops it again on cleanup.")
doc(S, 'InputStreamInterface', 'isTTY', "Reports whether the stream is a real terminal; absent or false when piped.")
print('members ok')
