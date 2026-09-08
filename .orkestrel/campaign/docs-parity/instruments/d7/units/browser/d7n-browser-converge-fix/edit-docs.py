"""Applies the fix round's guide and README edits as exact, single-occurrence replacements."""

import pathlib
import sys

EDITS = [
    # Item 2 — the core quickstart fence takes its own heading (B2, Ruling 22).
    (
        "guides/browser.md",
        "Core quickstart — drive the CDP client directly over any transport that\n"
        "satisfies `CDPTransportInterface`:\n",
        "### Drive the core client over an injected transport\n"
        "\n"
        "Drive the CDP client from any environment over a transport that satisfies\n"
        "`CDPTransportInterface`:\n",
    ),
    # Item 4 — the surfaces named by what they are, not by position (B4).
    (
        "guides/browser.md",
        "listening on the CDP endpoint; and a filesystem-backed browser writer. Import the first surface from\n"
        "`@orkestrel/browser` and the second from `@orkestrel/browser/server`. Source:\n"
        "[`src/core`](../src/core) (through `@src/core`) and [`src/server`](../src/server) (through\n"
        "`@src/server`).\n",
        "listening on the CDP endpoint; and a filesystem-backed browser writer. Import the\n"
        "environment-agnostic core from `@orkestrel/browser` and the Node runtime from\n"
        "`@orkestrel/browser/server`. Source: [`src/core`](../src/core) (through `@src/core`) and\n"
        "[`src/server`](../src/server) (through `@src/server`).\n",
    ),
    # Item 5 — the retired term leaves the guide's prose and its heading (B5, Ruling 22).
    (
        "guides/browser.md",
        "The focused CDP feature layer is grouped into small entities. Managers expose\n",
        "The focused CDP feature layer is grouped into small classes. Managers expose\n",
    ),
    (
        "guides/browser.md",
        "#### Extended constants and entities\n",
        "#### Extended constants\n",
    ),
    # Item 11 — pointers per `.claude/rules/writing.md` § Code tokens, references, and links (B11).
    (
        "guides/browser.md",
        "family's — see [`BrowserSnapshotInterface`](#browsersnapshotinterface) below.\n",
        "family's — see [`BrowserSnapshotInterface`](#browsersnapshotinterface) later.\n",
    ),
    (
        "guides/browser.md",
        "member it inherits from `BrowserFrameInterface`, whose own behavior the table\nabove states.\n",
        "member it inherits from `BrowserFrameInterface`, whose own behavior the\npreceding table states.\n",
    ),
    (
        "guides/browser.md",
        "entire serialized form; every method below derives structure from them on\n",
        "entire serialized form; every method that follows derives structure from them on\n",
    ),
    # Item 5 — the README drops the retired term for the classes it names (B5).
    (
        "README.md",
        "For the full surface — the CDP dispatch core, the `BrowserContext` /\n"
        "`BrowserPage` / `BrowserCodegen` entities, the server transports, and usage\n"
        "patterns — see [`guides/browser.md`](guides/browser.md).\n",
        "For the full surface — the CDP dispatch core, the `BrowserContext`,\n"
        "`BrowserPage`, and `BrowserCodegen` classes, the server transports, and usage\n"
        "patterns — see [`guides/browser.md`](guides/browser.md).\n",
    ),
    # Item 6 — the README's front door teaches the factory the guide teaches (B6).
    (
        "README.md",
        "```ts\n"
        "import { CDPClient } from '@orkestrel/browser'\n"
        "import type { CDPTransportInterface } from '@orkestrel/browser'\n"
        "\n"
        "const transport: CDPTransportInterface = /* your injected transport */\n"
        "const client = new CDPClient({ transport })\n"
        "await client.connect()\n"
        "const result = await client.send('Page.navigate', { url: 'https://example.com' })\n"
        "```\n",
        "```ts\n"
        "import { createCDPClient } from '@orkestrel/browser'\n"
        "\n"
        "const client = createCDPClient({ transport }) // transport: CDPTransportInterface\n"
        "await client.connect()\n"
        "const result = await client.send('Page.navigate', { url: 'https://example.com' })\n"
        "await client.close()\n"
        "```\n",
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

# Item 5 — the mixed table splits by kind, every row and column kept.
guide = root / "guides/browser.md"
lines = guide.read_text(encoding="utf-8").split("\n")
start = lines.index("#### Extended constants")
header, rule = lines[start + 2], lines[start + 3]
row = next(i for i in range(start + 4, len(lines)) if lines[i].split("|")[2].strip() == "class")
if not lines[row - 1].split("|")[2].strip() == "const":
    print("MISS guides/browser.md: the split point is not a const-to-class boundary")
    failed = True
else:
    lines[row:row] = ["", "#### Extended classes", "", header, rule]
    guide.write_text("\n".join(lines), encoding="utf-8")
    print(f"OK   guides/browser.md: split before line {row + 1}")

sys.exit(1 if failed else 0)
