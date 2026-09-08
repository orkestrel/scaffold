"""Applies the fix round's source doc-block edits as exact, single-occurrence replacements."""

import pathlib
import sys

EDITS = [
    # Item 1 — hyphenated compounds kept whole (B1, Ruling 22).
    (
        "src/core/errors.ts",
        " * connectable state — not connected, closed while connecting, or the connection dropped mid-\n"
        " * request — under the code `BROWSER_CDP_CONNECTION_ERROR`.\n",
        " * connectable state — not connected, closed while connecting, or the connection dropped\n"
        " * mid-request — under the code `BROWSER_CDP_CONNECTION_ERROR`.\n",
    ),
    (
        "src/core/helpers.ts",
        " * Decodes the `Page.addScriptToEvaluateOnNewDocument` result, throwing a `BrowserError` off-\n"
        " * shape.\n",
        " * Decodes the `Page.addScriptToEvaluateOnNewDocument` result, throwing a `BrowserError`\n"
        " * off-shape.\n",
    ),
    (
        "src/core/helpers.ts",
        " * Decodes the first `DOM.getContentQuads` quad and its center, throwing a `BrowserError` off-\n"
        " * shape.\n",
        " * Decodes the first `DOM.getContentQuads` quad and its center, throwing a `BrowserError`\n"
        " * off-shape.\n",
    ),
    (
        "src/core/helpers.ts",
        " * Decodes CDP snapshot sparse boolean data into a set of node indexes, skipping every off-\n"
        " * shape entry.\n",
        " * Decodes CDP snapshot sparse boolean data into a set of node indexes, skipping every\n"
        " * off-shape entry.\n",
    ),
    # Item 3 — code tokens in compared cells (B3, Ruling 22).
    (
        "src/core/types.ts",
        " * Represents a dumb text transport CDPClient sends and receives JSON-RPC frames over.\n",
        " * Represents the text pipe a `CDPClient` sends and receives JSON-RPC frames over.\n",
    ),
    (
        "src/core/types.ts",
        " * Describes the options for creating a CDPClient.\n",
        " * Describes the options for creating a `CDPClient` instance.\n",
    ),
    (
        "src/core/types.ts",
        " * Describes the options for creating a browser page.\n",
        " * Describes the options for creating a `BrowserPage` instance.\n",
    ),
    (
        "src/core/types.ts",
        " * Describes the options for creating a BrowserCodegen recorder.\n",
        " * Describes the options for creating a `BrowserCodegen` recorder.\n",
    ),
    (
        "src/server/types.ts",
        " * Describes the options for creating a Browser.\n",
        " * Describes the options for creating a `Browser` instance.\n",
    ),
    (
        "src/server/types.ts",
        " * Describes the options for creating a WebSocketCDPTransport.\n",
        " * Describes the options for creating a `WebSocketCDPTransport` instance.\n",
    ),
    # Item 5 — the retired term leaves the compared cell behind `guides/browser.md:475`.
    (
        "src/core/BrowserDiagnostics.ts",
        " * Groups the diagnostic subentities beneath one page.\n",
        " * Groups the tracing, coverage, performance, and profiler classes beneath one page.\n",
    ),
    # Item 7 — the pattern's literal in the description, its rationale in @remarks (B7).
    (
        "src/core/constants.ts",
        " * Matches the in-page result-limit sentinel error message, anchored immediately after the\n"
        " * `Error:` (optionally `Uncaught Error:`) prefix that Chromium prepends to a thrown error's\n"
        " * description, so the guard's own throw is recognized only at the start of the message rather\n"
        " * than wherever the substring happens to occur.\n",
        " * Matches the in-page result-limit sentinel error message, anchored immediately after the\n"
        " * `Error:` (optionally `Uncaught Error:`) prefix Chromium prepends to a thrown error's\n"
        " * description, `/^(?:Uncaught )?Error: \\[\\[ORKESTREL_BROWSER_RESULT_LIMIT\\]\\](\\d+)/`.\n"
        " *\n"
        " * @remarks\n"
        " * The anchor matches the guard's own throw only at the start of the message, rather than\n"
        " * wherever the substring happens to occur.\n",
    ),
    # Item 8 — the slack and the readiness-probe delay return to @remarks (B8).
    (
        "src/core/constants.ts",
        "/** Sets the poll interval while waiting for a selector to appear, `100` milliseconds. */\n",
        "/**\n"
        " * Sets the poll interval while waiting for a selector to appear, `100` milliseconds.\n"
        " *\n"
        " * @remarks\n"
        " * A wait adds the same interval as slack to its own CDP call timeout, so the in-page poll\n"
        " * expires before the call carrying it. Host-side CDP readiness probes wait it out between\n"
        " * attempts.\n"
        " */\n",
    ),
    # Item 8 — `CDPError`'s remark keeps the branching guidance alone (B8).
    (
        "src/core/errors.ts",
        " * @remarks\n"
        " * Carries the originating `method` plus the CDP error's own `code`,\n"
        " * `message`, and `data` (when present) in `context`, so callers can branch\n"
        " * on the protocol-level error instead of parsing the message string.\n",
        " * @remarks\n"
        " * Branch on the protocol-level error in `context` instead of parsing the message string.\n",
    ),
    # Item 9 — the link tag, and the emphasis lowered (B9).
    (
        "src/core/errors.ts",
        " * Reports that an `evaluate()`/`content()` result exceeded `BROWSER_RESULT_LIMIT` and was\n"
        " * rejected in-page before it could overflow the CDP transport frame, under the code\n",
        " * Reports that an `evaluate()`/`content()` result exceeded {@link BROWSER_RESULT_LIMIT} and\n"
        " * was rejected in-page before it could overflow the CDP transport frame, under the code\n",
    ),
    (
        "src/core/constants.ts",
        " * This counts UTF-16 STRING LENGTH (`String#length`), not transport BYTES —\n",
        " * This counts UTF-16 string length (`String#length`), not transport bytes —\n",
    ),
    (
        "src/server/types.ts",
        " *   attached browser this is a LOCAL DETACH ONLY because other clients may\n"
        " *   share its targets. Idempotent.\n"
        " * - `close` — graceful REMOTE shutdown: best-effort sends CDP `Browser.close`\n",
        " *   attached browser this is a local detach only, because other clients may\n"
        " *   share its targets. Idempotent.\n"
        " * - `close` — graceful remote shutdown: best-effort sends CDP `Browser.close`\n",
    ),
    # Item 10 — the codegen source's remark reflowed to the block's width (B10).
    (
        "src/core/constants.ts",
        " * Attaches capturing-phase listeners for `click`, `input` (fill), and\n"
        " * `change` (select) on `document`, builds a stable CSS selector for the\n"
        " * target element, and forwards each action to the CDP binding\n"
        " * ({@link BROWSER_CODEGEN_BINDING_NAME}) as a JSON string payload. A `contenteditable`\n"
        " * fill is captured through `input` events, the same way an input or a textarea is.\n"
        " * Guarded to\n"
        " * install exactly once per document (`window[name]` sentinel) so repeated\n"
        " * injection on every new document is idempotent.\n",
        " * Attaches capturing-phase listeners for `click`, `input` (fill), and `change` (select) on\n"
        " * `document`, builds a stable CSS selector for the target element, and forwards each action\n"
        " * to the CDP binding ({@link BROWSER_CODEGEN_BINDING_NAME}) as a JSON string payload. A\n"
        " * `contenteditable` fill is captured through `input` events, the same way an input or a\n"
        " * textarea is. Guarded to install exactly once per document (`window[name]` sentinel) so\n"
        " * repeated injection on every new document is idempotent.\n",
    ),
]

root = pathlib.Path("/home/user/fleet/browser")
failed = False
for path, old, new in EDITS:
    file = root / path
    text = file.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        print(f"MISS {path}: {count} occurrences of {old[:60]!r}")
        failed = True
        continue
    file.write_text(text.replace(old, new), encoding="utf-8")
    print(f"OK   {path}: {old[:60]!r}")

if failed:
    sys.exit(1)

for path in sorted({path for path, _, _ in EDITS}):
    for number, line in enumerate((root / path).read_text(encoding="utf-8").splitlines(), 1):
        if line.startswith((" *", "/**")) and len(line) > 100:
            print(f"WIDE {path}:{number} {len(line)}")
