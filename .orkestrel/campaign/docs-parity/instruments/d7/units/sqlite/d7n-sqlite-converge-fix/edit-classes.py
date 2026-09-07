# Writes each class description's cross-references as `{@link}` tags, the form both files
# already use elsewhere. The compared form renders a tag as its target's code token, so the
# guide's Summary cells are unchanged.
from pathlib import Path

def swap(path, old, new):
    file = Path(path)
    text = file.read_text()
    assert text.count(old) == 1, f'not matched once in {path}: {old[:60]!r}'
    file.write_text(text.replace(old, new))
    print(f'{path} rewritten')

swap(
    'src/server/SQLiteDatabase.ts',
    """ * Implements `SQLiteDatabaseInterface` over a lazily opened `DatabaseSync` the instance
 * owns, gating every operation on that connection and mapping each native fault to a
 * `SQLiteError`.
""",
    """ * Implements {@link SQLiteDatabaseInterface} over a lazily opened `DatabaseSync` the instance
 * owns, gating every operation on that connection and mapping each native fault to a
 * {@link SQLiteError}.
""",
)

swap(
    'src/server/SQLiteStatement.ts',
    """ * Implements `SQLiteStatementInterface` over one compiled `StatementSync`, gating each call
 * on its owning connection still being open and mapping every native fault, a mid-stream one
 * included, to a `SQLiteError`.
""",
    """ * Implements {@link SQLiteStatementInterface} over one compiled `StatementSync`, gating each
 * call on its owning connection still being open and mapping every native fault, a mid-stream
 * one included, to a {@link SQLiteError}.
""",
)
