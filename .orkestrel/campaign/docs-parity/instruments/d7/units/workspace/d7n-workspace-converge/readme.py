import sys, pathlib
p = pathlib.Path('/home/user/fleet/workspace/README.md')
t = p.read_text()
old = """The virtual file workspace for the `@orkestrel` line.

A workspace is a path-keyed map of immutable files with an editing surface over it: write, read,
search, replace, move, remove. Every edit mints a new file value and puts it back under its path,
so a file is a value a caller can hold and compare rather than a handle that changes underneath it.
Around that map sit a registry of named workspaces with one active selection, and pluggable stores
that persist plain snapshots.

It is not a filesystem. There is no disk, no `node:fs`, no watcher, no synchronization lifecycle,
and no dirty-state tracking — a path is a key, not a location. Durability is a separate seam: a
snapshot is a plain serializable value, and a store is the thing that keeps one.

Nothing here is model-specific. An agent loop, a tool handler, and plain application code are all
callers.
"""
new = """> The virtual file workspace for the `@orkestrel` line: a path-keyed map of immutable files with
> an editing surface over it, a registry that holds those maps by id under one active selection,
> and a snapshot store seam that persists them.

Reach a file by its path — `write`, `read`, `search`, `replace`, `move`, `remove` — and every edit
mints a new file value and puts it back, so a file is a value you can hold and compare rather than
a handle that changes underneath you. Part of the `@orkestrel` line.

It is not a filesystem. There is no disk, no `node:fs`, no watcher, no synchronization lifecycle,
and no dirty-state tracking — a path is a key, not a location. Durability is a separate seam: a
snapshot is a plain serializable value, and a store is the thing that keeps one.

Nothing here is model-specific. An agent loop, a tool handler, and plain application code are all
callers.
"""
if t.count(old) != 1:
    sys.exit(f'expected 1, found {t.count(old)}')
p.write_text(t.replace(old, new))
print('ok')
