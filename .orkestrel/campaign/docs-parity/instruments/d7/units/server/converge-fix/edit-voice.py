# Lowers the all-caps emphasis the audit named, replaces the `below`/`above`
# pointers, and rewrites the content-coding description.
import pathlib
import sys

edits: dict[str, list[tuple[str, str]]] = {
    'src/server/constants.ts': [
        (
            ' * XML / SVG / WASM / a few document formats) — NOT already-compressed\n',
            ' * XML / SVG / WASM / a few document formats) — never already-compressed\n',
        ),
    ],
    'src/server/types.ts': [
        (
            ' *   uses the FIRST secret (a single string, or the current head of a\n',
            ' *   uses the first secret (a single string, or the current head of a\n',
        ),
        (
            """ * Represents a content-coding the substrate compresses / decompresses with. The listed
 * codings are the `Content-Encoding` and `Accept-Encoding` token vocabulary the substrate
 * understands.
""",
            """ * Represents a content-coding the substrate compresses or decompresses with. Its
 * members are the `Content-Encoding` and `Accept-Encoding` token vocabulary the
 * substrate understands.
""",
        ),
        (
            """ *   handler that owns a long-lived socket closes it from here, so the drain
 *   below settles instead of running out the deadline.
""",
            """ *   handler that owns a long-lived socket closes it from here, so the drain
 *   settles instead of running out the deadline.
""",
        ),
        (
            """ *   carries the still-pending request count AND the still-attached upgraded
 *   socket count. Both `0` is a clean drain; either non-zero means the close
 *   that follows was FORCED and cut that work.
""",
            """ *   carries the still-pending request count and the still-attached upgraded
 *   socket count. Both `0` is a clean drain; either non-zero means the close
 *   that follows was forced and cut that work.
""",
        ),
        (
            " *   `buildRequest` INNER boundary (a plain `400`, for example a malformed\n",
            " *   `buildRequest` inner boundary (a plain `400`, for example a malformed\n",
        ),
        (
            """ * order, the FIRST to return `true` CLAIMS (owns) the socket and stops the
 * fan-out; a handler that THROWS is treated as declined (the throw surfaces
 * on the `error` event) and the fan-out continues; if NONE claim it, the
""",
            """ * order, the first to return `true` claims (owns) the socket and stops the
 * fan-out; a handler that throws is treated as declined (the throw surfaces
 * on the `error` event) and the fan-out continues; if none claim it, the
""",
        ),
        (
            " * A CLAIMED socket is TRACKED until it closes. The handler still owns it —\n",
            " * A claimed socket is tracked until it closes. The handler still owns it —\n",
        ),
        (
            " * @returns True if the handler CLAIMS the socket (this handler now owns\n",
            " * @returns True if the handler claims the socket (this handler now owns\n",
        ),
        (
            " * configured `host`/`port` (an omitted/`0` port ⇒ an EPHEMERAL port, resolved\n",
            " * configured `host`/`port` (an omitted/`0` port ⇒ an ephemeral port, resolved\n",
        ),
    ],
    'src/server/Server.ts': [
        (
            """		// Bound to THIS run's server instance, discarded with it on stop/restart —
		// no manual removal needed (the same per-run lifecycle as the handler above).
""",
            """		// Bound to this run's server instance, discarded with it on stop/restart —
		// no manual removal needed (the same per-run lifecycle as the request
		// handler `createHTTPServer` takes).
""",
        ),
        (
            """		// A pure signal — NOT the drain deadline's parent (a parent abort would
		// clear the Timeout so it never fires). The drain deadline is an
		// independent clock; the wake-park below resolves on the last finish OR
		// the deadline, event-driven, never a busy-loop.
""",
            """		// A pure signal — not the drain deadline's parent (a parent abort would
		// clear the Timeout so it never fires). The drain deadline is an
		// independent clock; the wake-park inside `#drainPending` resolves on the
		// last finish or the deadline, event-driven, never a busy-loop.
""",
        ),
        (
            """		// Hoisted above the inner try (not block-scoped inside it) so the catch
		// below can attach real request context to the `error` emit / `report`
""",
            """		// Hoisted out of the inner try (not block-scoped inside it) so that try's
		// catch can attach real request context to the `error` emit / `report`
""",
        ),
    ],
    'tests/setupServer.ts': [
        (
            ' * Completes a real protocol upgrade and KEEPS the socket open — the long-lived\n',
            ' * Completes a real protocol upgrade and keeps the socket open — the long-lived\n',
        ),
    ],
}

for name, pairs in edits.items():
    path = pathlib.Path(name)
    text = path.read_text(encoding='utf8')
    for old, new in pairs:
        if text.count(old) != 1:
            sys.exit(f'{name}: anchor not unique ({text.count(old)}): {old[:70]!r}')
        text = text.replace(old, new)
    path.write_text(text, encoding='utf8')
    print(f'{name} written')
