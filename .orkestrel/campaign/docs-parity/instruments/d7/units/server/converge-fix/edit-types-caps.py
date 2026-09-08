# Closes the all-caps sweep inside `src/server/types.ts`, the one scoped file whose
# doc blocks still carried emphasis after the audit's named sites were lowered.
import pathlib
import sys

pairs = [
    (
        ' *   timestamp is bound INTO the signed payload (HMAC-covered, tamper-proof);\n',
        ' *   timestamp is bound into the signed payload (HMAC-covered, tamper-proof);\n',
    ),
    (
        ' * @param maxAge - The `Max-Age` directive in SECONDS (the wire unit, not a\n',
        ' * @param maxAge - The `Max-Age` directive in seconds (the wire unit, not a\n',
    ),
    (
        " *   Connection.encrypted}). A `sameSite: 'None'` cookie is ALWAYS\n",
        " *   Connection.encrypted}). A `sameSite: 'None'` cookie is always\n",
    ),
    (
        ' * default `1` when absent); a `;q=0` entry explicitly REJECTS that token — a\n',
        ' * default `1` when absent); a `;q=0` entry explicitly rejects that token — a\n',
    ),
    (
        " * is deliberately OMITTED here — Brotli parity is the middleware package's\n",
        " * is deliberately omitted here — Brotli parity is the middleware package's\n",
    ),
    (
        " * Each key is a media type the route can PRODUCE (`application/json`,\n",
        " * Each key is a media type the route can produce (`application/json`,\n",
    ),
    (
        ' *   lines: the value is split on `\\n` into a `data:` line PER segment, so it\n',
        ' *   lines: the value is split on `\\n` into a `data:` line per segment, so it\n',
    ),
    (
        ' * - `event` — the optional event TYPE, emitted as an `event:` line; omitted\n',
        ' * - `event` — the optional event type, emitted as an `event:` line; omitted\n',
    ),
    (
        ' * @param headers - Extra response headers merged OVER the SSE headers the\n',
        ' * @param headers - Extra response headers merged over the SSE headers the\n',
    ),
    (
        ' * stream. Every method is a SAFE NO-OP once `closed` is `true`, so a late\n',
        ' * stream. Every method is a safe no-op once `closed` is `true`, so a late\n',
    ),
    (
        " * The stream's default strategy measures queued CHUNKS, not their byte length,\n",
        " * The stream's default strategy measures queued chunks, not their byte length,\n",
    ),
    (
        ' * A `Range: bytes=start-end` against a known resource `size` resolves to ONE\n',
        ' * A `Range: bytes=start-end` against a known resource `size` resolves to one\n',
    ),
    (
        " *   (INCLUSIVE, the HTTP wire convention), normalized from the header's\n",
        " *   (inclusive, the HTTP wire convention), normalized from the header's\n",
    ),
    (
        ' * `parseRange` returns `undefined` for an ABSENT / unparseable / multi-range\n',
        ' * `parseRange` returns `undefined` for an absent / unparseable / multi-range\n',
    ),
    (
        ' * without a separate flag. It is TOTAL — a hostile header never throws.\n',
        ' * without a separate flag. It is total — a hostile header never throws.\n',
    ),
    (
        ' * @param decompression - The maximum DECOMPRESSED body size in bytes (the\n',
        ' * @param decompression - The maximum decompressed body size in bytes (the\n',
    ),
    (
        ' *   highly-compressible payload small ON THE WIRE (under `limit`) can inflate\n',
        ' *   highly-compressible payload small on the wire (under `limit`) can inflate\n',
    ),
    (
        ' *   INDEPENDENT of `limit`, not aligned with it; a non-positive value means\n',
        ' *   independent of `limit`, not aligned with it; a non-positive value means\n',
    ),
    (
        ' *   UNCAPPED decompressed output — use only when `limit` already bounds the\n',
        ' *   uncapped decompressed output — use only when `limit` already bounds the\n',
    ),
]

path = pathlib.Path('src/server/types.ts')
text = path.read_text(encoding='utf8')
for old, new in pairs:
    if text.count(old) != 1:
        sys.exit(f'anchor not unique ({text.count(old)}): {old[:70]!r}')
    text = text.replace(old, new)

# One line documents the `event` member and one the `id` member, so both are swapped.
member = '\t/** Requires a SINGLE-LINE value — an embedded newline would corrupt the SSE wire format. */\n'
if text.count(member) != 2:
    sys.exit(f'member anchor count is {text.count(member)}, expected 2')
text = text.replace(member, member.replace('SINGLE-LINE', 'single-line'))

path.write_text(text, encoding='utf8')
print('src/server/types.ts written')
