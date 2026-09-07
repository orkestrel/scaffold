# Adds the `Shape` column to the `### Types` table under Ruling 15's convention sentence,
# re-attaches the `node:sqlite` link, and replaces the all-caps emphasis.
from pathlib import Path

path = Path('guides/sqlite.md')
text = path.read_text()

def swap(old, new):
    global text
    assert text.count(old) == 1, f'not matched once: {old[:70]!r}'
    text = text.replace(old, new)

# S3: the upstream reference, beside the runtime requirement.
swap(
    "Requires Node.js ^22.18 || >=24.4 (the releases carrying the `timeout`,\n`isTransaction`, and `readBigInts` options and `StatementSync.iterate`).",
    "Requires Node.js ^22.18 || >=24.4 for\n[`node:sqlite`](https://nodejs.org/api/sqlite.html) (the releases carrying the `timeout`,\n`isTransaction`, and `readBigInts` options and `StatementSync.iterate`).",
)

# S2: the Types table takes the `Shape` column between `Kind` and `Summary`.
old_types = """### Types

| API                        | Kind      | Summary                                                                                                                                                                                                          |
| -------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SQLiteValue`              | type      | Represents a value SQLite stores and returns natively — the SQL ↔ JS bridge over `null`, `number`, `bigint`, `string`, and `Uint8Array`.                                                                         |
| `SQLiteRow`                | type      | Represents a result row — a record of column name to `SQLiteValue`.                                                                                                                                              |
| `SQLiteParameters`         | type      | Represents the bind parameters for a prepared statement — positional (an array, bound to `?`) or named (a record, bound to bare `:name` placeholders).                                                           |
| `SQLiteBinding`            | type      | Represents the normalized binding shape a native `StatementSync` call expects — `{ positional }` or `{ named }`, what `SQLiteParameters` become on the way into `node:sqlite`.                                   |
| `SQLiteExecuteResult`      | interface | Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL) — its `changes` and `rowid`.                                                                                              |
| `SQLiteErrorCode`          | type      | Represents a machine-readable `SQLiteError` code.                                                                                                                                                                |
| `SQLiteDatabaseOptions`    | interface | Represents the options for `createSQLiteDatabase` — `path`, `readonly`, `timeout`, `foreignKeys`, and `bigints`.                                                                                                 |
| `SQLiteStatementInterface` | interface | Represents a prepared statement — the only way the wrapper runs SQL.                                                                                                                                             |
| `SQLiteDatabaseInterface`  | interface | Represents the contract a synchronous SQLite database fulfills over `node:sqlite`'s `DatabaseSync` — prepared statements, transactions, and pragmas, every call returning a plain value rather than a `Promise`. |

Row values arrive"""

new_types = """### Types

A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`.

| API | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `SQLiteValue` | type | `null \\| number \\| bigint \\| string \\| Uint8Array` | Represents a value SQLite stores and returns natively — the SQL ↔ JS bridge over `null`, `number`, `bigint`, `string`, and `Uint8Array`. |
| `SQLiteRow` | type | `Record<string, SQLiteValue>` | Represents a result row — a record of column name to `SQLiteValue`. |
| `SQLiteParameters` | type | `readonly SQLiteValue[] \\| Readonly<Record<string, SQLiteValue>>` | Represents the bind parameters for a prepared statement — positional (an array, bound to `?`) or named (a record, bound to bare `:name` placeholders). |
| `SQLiteBinding` | type | `{ positional } \\| { named }` | Represents the normalized binding shape a native `StatementSync` call expects — `{ positional }` or `{ named }`, what `SQLiteParameters` become on the way into `node:sqlite`. |
| `SQLiteExecuteResult` | interface | `{ changes, rowid }` | Represents the outcome of a non-query statement (`INSERT` / `UPDATE` / `DELETE` / DDL) — its `changes` and `rowid`. |
| `SQLiteErrorCode` | type | `'CLOSED' \\| 'CONSTRAINT' \\| 'BUSY' \\| 'INVALID' \\| 'UNKNOWN'` | Represents a machine-readable `SQLiteError` code. |
| `SQLiteDatabaseOptions` | interface | `{ path?, readonly?, timeout?, foreignKeys?, bigints? }` | Represents the options for `createSQLiteDatabase` — `path`, `readonly`, `timeout`, `foreignKeys`, and `bigints`. |
| `SQLiteStatementInterface` | interface | `{} plus execute, get, all, iterate` | Represents a prepared statement — the only way the wrapper runs SQL. |
| `SQLiteDatabaseInterface` | interface | `{ path, connected, transacting } plus connect, close, execute, prepare, transact, begin, commit, rollback, pragma, [Symbol.dispose]` | Represents the contract a synchronous SQLite database fulfills over `node:sqlite`'s `DatabaseSync` — prepared statements, transactions, and pragmas, every call returning a plain value rather than a `Promise`. |

The `path`, `connected`, and `transacting` members of `SQLiteDatabaseInterface` are `readonly` data members (the preceding Surface row) — its call-signature methods are documented under [Methods](#methods).

Row values arrive"""

swap(old_types, new_types)

# S2: the Methods paragraph keeps what `transacting` does and drops its spelled-out declaration.
swap(
    "`SQLiteDatabaseInterface` also exposes `readonly transacting: boolean` — whether a transaction is open on this connection (node:sqlite's `isTransaction`, wrapping `sqlite3_get_autocommit()`), `false` when not connected.",
    "`transacting` reports whether a transaction is open on this connection (node:sqlite's `isTransaction`, wrapping `sqlite3_get_autocommit()`), and reads `false` when not connected.",
)

# S5: all-caps emphasis.
swap(
    "a statement prepared on the OLD connection stays `CLOSED` permanently",
    "a statement prepared on the earlier connection stays `CLOSED` permanently",
)
swap(
    "enabling it returns EVERY integer\n// column as bigint, not just the out-of-range ones:",
    "enabling it returns every integer\n// column as bigint, not the out-of-range ones alone:",
)

path.write_text(text)
print('guides/sqlite.md rewritten')
