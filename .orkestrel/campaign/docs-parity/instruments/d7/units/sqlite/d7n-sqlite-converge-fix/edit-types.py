# Rewrites the doc-block descriptions whose trailing clause only listed the members a
# `Shape` cell now holds (Ruling 15), and drops the all-caps emphasis from one remark.
from pathlib import Path

path = Path('src/server/types.ts')
text = path.read_text()

def swap(old, new):
    global text
    assert text.count(old) == 1, f'not matched once: {old[:60]!r}'
    text = text.replace(old, new)

# SQLiteValue: the union's arms move to the cell; the bridge the alias names stays.
swap(
    """ * Represents a value SQLite stores and returns natively — the SQL ↔ JS bridge over `null`,
 * `number`, `bigint`, `string`, and `Uint8Array`.
 *
 * @remarks
 * `node:sqlite` maps `NULL` / `INTEGER` / `REAL` / `TEXT` / `BLOB` to exactly
 * these JS types (integers arrive as `number`, or `bigint` only past 2^53).
""",
    """ * Represents a value SQLite stores and returns natively — the bridge between SQLite's storage
 * classes and their JS types.
 *
 * @remarks
 * `node:sqlite` maps `NULL` / `INTEGER` / `REAL` / `TEXT` / `BLOB` to exactly the
 * JS types this union names (integers arrive as `number`, or `bigint` only past 2^53).
""",
)

# SQLiteBinding: the two arms move to the cell; what the alias is for stays.
swap(
    """ * Represents the normalized binding shape a native `StatementSync` call expects —
 * `{ positional }` or `{ named }`, what {@link SQLiteParameters} become on the way into
 * `node:sqlite`.
""",
    """ * Represents the normalized binding shape a native `StatementSync` call expects — what
 * {@link SQLiteParameters} become on the way into `node:sqlite`.
""",
)

# SQLiteExecuteResult: the member list moves to the cell.
swap(
    """ * Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL) — its
 * `changes` and `rowid`.
""",
    """ * Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL).
""",
)

# SQLiteDatabaseOptions: the member list moves to the cell; the consumers it serves stay.
swap(
    """ * Represents the options for `createSQLiteDatabase` — `path`, `readonly`, `timeout`,
 * `foreignKeys`, and `bigints`.
""",
    """ * Represents the options for opening a SQLite connection, accepted by the
 * `createSQLiteDatabase` function and the `SQLiteDatabase` constructor.
""",
)

# The remark's all-caps emphasis, the same defect the guide carried.
swap(
    """ * `bigints` is enabled; enabling it returns EVERY integer column as `bigint`,
""",
    """ * `bigints` is enabled; enabling it returns every integer column as `bigint`,
""",
)

path.write_text(text)
print('src/server/types.ts rewritten')
