# Names the interface the `transacting` member belongs to, without spelling its declaration.
from pathlib import Path

path = Path('guides/sqlite.md')
text = path.read_text()
old = "`transacting` reports whether a transaction is open on this connection"
new = "The `transacting` member of `SQLiteDatabaseInterface` reports whether a transaction is open on this connection"
assert text.count(old) == 1
path.write_text(text.replace(old, new))
print('guides/sqlite.md rewritten')
