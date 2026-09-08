p = 'README.md'
s = open(p).read()

old = """A typed **relation manager** over [`@orkestrel/database`](https://github.com/orkestrel/database)
tables — name a table's relations once, then `load` / `find` records with their
related rows already attached. Loading is **batched** — a direct relation uses
one query across the whole record set, while a `through` relation uses two
(junction then target); either count stays constant as the parent count grows.
The relationships
(`belongs` / `many` / `one` / `through` / `morph`) cover the FK shapes; nested
includes recurse through the registry; `link` / `unlink` / `links` manage a
many-to-many junction without hand-writing join rows. Environment-agnostic —
no I/O, no browser or server assumptions. Part of the `@orkestrel` line.
"""

new = """> A small, declarative ORM layer over the `@orkestrel/database` tables: a table's
> relations named once, then `load` / `find` records with their related rows already
> attached, batched so a direct relation costs one query across the whole record set and
> a `through` relation two.

Declare each table's relations with the `belongsTo`, `hasMany`, `hasOne`,
`hasThrough`, and `hasMorph` builders, then reach a typed model through
`model(name)` and drop to `model.table` for plain typed reads and writes.
Environment-agnostic — no I/O, no browser or server assumptions. Part of the
`@orkestrel` line.
"""

assert s.count(old) == 1
s = s.replace(old, new)
open(p, 'w').write(s)
print('ok')
