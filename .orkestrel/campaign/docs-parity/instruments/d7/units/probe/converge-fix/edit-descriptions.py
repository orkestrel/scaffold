import pathlib, sys

def sub(path, old, new):
	p = pathlib.Path(path)
	t = p.read_text()
	if t.count(old) != 1:
		sys.exit(f'{path}: found {t.count(old)}\n---\n{old}\n---')
	p.write_text(t.replace(old, new))
	print(f'{path}: replaced')

# --- P1: Overlay's description names its interface and the state it owns ---
sub('src/server/Overlay.ts',
"""/**
 * Holds the candidate drafts one inspection substitutes for the files a tool would read from disk.
 *
 * @remarks
""",
"""/**
 * Implements `OverlayInterface` over a private map from normalized absolute path to candidate text,
 * minting at construction the `revision` a resident tool caches its answers against.
 *
 * @remarks
""")

# --- P1: ProbeServer's description names its interface and the transport it binds ---
sub('src/server/ProbeServer.ts',
"""/**
 * Serves one probe over this process's Model Context Protocol stdio transport.
 *
 * @remarks
""",
"""/**
 * Implements `ProbeServerInterface` over a `PassThrough` stream this server owns, binding the
 * published `prove` tool and the dual-era dispatcher to this process's Model Context Protocol
 * stdio transport.
 *
 * @remarks
""")
