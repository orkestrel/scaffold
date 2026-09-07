import io
EDITS = [
 ('src/core/constants.ts',
  " * Names the revision offered and defaulted to in the legacy `initialize` handshake.\n",
  " * Names the revision offered and defaulted to in the legacy `initialize` handshake,\n * `'2025-11-25'`.\n"),
 ('src/core/constants.ts',
  "/** Names the older legacy revision the optional legacy decorator accepts and an adapter can pin. */\n",
  "/**\n * Names the older legacy revision the optional legacy decorator accepts and an adapter can pin,\n * `'2025-06-18'`.\n */\n"),
 ('src/core/constants.ts',
  "/** Names the modern revision offered by an unpinned client during discovery. */\n",
  "/** Names the modern revision offered by an unpinned client during discovery, `'2026-07-28'`. */\n"),
 ('src/core/constants.ts',
  " * Lists the modern MCP protocol revisions a bare server accepts and advertises.\n",
  " * Lists the modern MCP protocol revisions a bare server accepts and advertises, `2026-07-28`.\n"),
 ('src/core/constants.ts',
  "/** Lists the protocol revisions accepted by the optional legacy decorator. */\n",
  "/**\n * Lists the protocol revisions accepted by the optional legacy decorator, `2025-11-25` and\n * `2025-06-18`.\n */\n"),
]
for p, old, new in EDITS:
    s=io.open(p,encoding='utf8').read()
    assert s.count(old)==1, (p, old[:60], s.count(old))
    io.open(p,'w',encoding='utf8').write(s.replace(old,new,1))
print('ok')
