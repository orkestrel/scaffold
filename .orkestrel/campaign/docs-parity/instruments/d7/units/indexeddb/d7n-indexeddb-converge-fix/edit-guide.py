# Applies the d7n-indexeddb-converge-fix guide edits (I1, I3, I4, I5).
import io, sys

PATH = 'guides/indexeddb.md'
text = io.open(PATH, encoding='utf-8').read()

def sub(old, new, label):
    global text
    if text.count(old) != 1:
        sys.exit('NOT UNIQUE (%d): %s' % (text.count(old), label))
    text = text.replace(old, new)

# --- I3: the opening prose no longer restates the tagline's closing clause.
sub(
    "Its job is to turn IndexedDB's event-driven, callback-shaped, structurally-untyped surface into one you can `await` — and nothing more. It exposes",
    "Its job is to type IndexedDB's event-driven, callback-shaped, structurally-untyped surface. It exposes",
    'I3 opening prose',
)

# --- I1: the Types table takes the Shape column under the convention sentence.
OLD_TYPES = """### Types

| API                                     | Kind      | Summary                                                                                                                          |
| --------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
"""
NEW_TYPES = """### Types

A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`.

| API | Kind | Shape | Summary |
| --- | --- | --- | --- |
"""
sub(OLD_TYPES, NEW_TYPES, 'I1 Types header')

SHAPES = [
    ('`Row`', '`Record<string, unknown>`'),
    ('`KeyPath`', '`string \\| readonly string[]`'),
    ('`IndexDefinition`', '`{ name, path, unique?, multiple? }`'),
    ('`StoreDefinition`', '`{ path?, increment?, indexes? }`'),
    ('`IndexedDBSchema`', '`Readonly<Record<string, StoreDefinition>>`'),
    ('`IndexedDBUpgradeContext`', '`{ transaction, old, version, stores, indexes }`'),
    ('`IndexedDBUpgradeStoreManagerInterface`', '`{ names } plus create, drop, store`'),
    ('`IndexedDBUpgradeIndexManagerInterface`', '`{} plus create, drop`'),
    ('`IndexedDBDatabaseOptions`', '`{ name, version?, stores, upgrade? }`'),
    ('`IndexedDBCursorOptions`', '`{ query?, direction? }`'),
    (
        '`IndexedDBErrorCode`',
        "`'NOT_OPEN' \\| 'CLOSED' \\| 'NOT_FOUND' \\| 'CONSTRAINT' \\| 'QUOTA' \\| 'ABORTED' \\| 'DATA' \\| 'OPEN' \\| 'UPGRADE' \\| 'INACTIVE' \\| 'READONLY' \\| 'INVALID' \\| 'UNKNOWN'`",
    ),
    (
        '`IndexedDBDatabaseInterface`',
        '`{ database, name, version, stores, open } plus connect, store, read, write, close, drop`',
    ),
    (
        '`IndexedDBRecordStoreInterface`',
        '`{} plus get, resolve, records, keys, has, count, set, add, remove, clear, cursor`',
    ),
    (
        '`IndexedDBStoreInterface`',
        '`{ name, path, indexes, increment } plus get, resolve, records, keys, has, count, set, add, remove, clear, index, cursor`',
    ),
    (
        '`IndexedDBIndexInterface`',
        '`{ name, path, unique, multiple } plus get, resolve, records, keys, primary, has, count, cursor`',
    ),
    (
        '`IndexedDBCursorInterface`',
        '`{ cursor, source, key, primary, value, direction } plus continue, seek, advance, update, remove`',
    ),
    (
        '`IndexedDBTransactionInterface`',
        '`{ transaction, mode, stores, active, finished, error } plus store, abort, commit`',
    ),
    (
        '`IndexedDBTransactionStoreInterface`',
        '`{ store } plus get, resolve, records, keys, has, count, set, add, remove, clear, cursor`',
    ),
]

lines = text.split('\n')
start = lines.index('| API | Kind | Shape | Summary |') + 2
for offset, (name, shape) in enumerate(SHAPES):
    row = lines[start + offset]
    cells = row.split(' | ')
    if cells[0].strip('| ').strip() != name.strip():
        sys.exit('ROW MISMATCH at %d: %r vs %r' % (start + offset, cells[0], name))
    lines[start + offset] = ' | '.join([cells[0], cells[1].strip(), shape, cells[2].rstrip(' |').strip()]) + ' |'
if lines[start + len(SHAPES)].strip() != '':
    sys.exit('TABLE LONGER THAN EXPECTED: %r' % lines[start + len(SHAPES)])
text = '\n'.join(lines)

# --- I1: the guide-body member lists give way to the column.
sub(
    "\nThe data-only shapes carry these members: `IndexDefinition` — `name` / `path` / `unique` / `multiple`; `StoreDefinition` — `path` / `increment` / `indexes`; `IndexedDBDatabaseOptions` — `name` / `version?` / `stores` / `upgrade?`; `IndexedDBCursorOptions` — a `query` key range and a `direction`.\n",
    '',
    'I1 data-only paragraph',
)
sub(
    "Each interface's `readonly` data members are named in the paragraph under its own heading in this section.",
    "Each interface's `readonly` data members are named in the `Shape` column of the [Types](#types) table, earlier.",
    'I1 Methods intro',
)
sub(
    '`IndexedDBUpgradeContext` carries only readonly data — `transaction` / `old` / `version` / `stores` / `indexes` — so no Methods table follows for it.',
    '`IndexedDBUpgradeContext` carries only readonly data, so no Methods table follows for it.',
    'I1 upgrade-context paragraph',
)
sub(
    '\nIts readonly data members are `database`, `name`, `version`, `stores`, and `open`.\n\n| Method    | Returns                   |',
    '\n| Method    | Returns                   |',
    'I1 database members',
)
sub(
    ' (`.claude/rules/patterns.md` § Managers § Batch operations). Each extending table that follows repeats these rows, because a consumer holding either interface calls them on it. It declares no readonly data member of its own.\n',
    ' (`.claude/rules/patterns.md` § Managers § Batch operations). Each extending table that follows repeats these rows, because a consumer holding either interface calls them on it.\n',
    'I1 record-store members',
)
sub(
    '`IndexedDBRecordStoreInterface` plus `index`, over the readonly data members `name`, `path`, `indexes`, and `increment`. Each call runs in its own implicit transaction.',
    '`IndexedDBRecordStoreInterface` plus `index`. Each call runs in its own implicit transaction.',
    'I1 store members',
)
sub(
    '\nIts readonly data members are `name`, `path`, `unique`, and `multiple`.\n\n| Method    | Returns                                     | Summary                                                                          |',
    '\n| Method    | Returns                                     | Summary                                                                          |',
    'I1 index members',
)
sub(
    'Its readonly data members are `cursor`, `source`, `key`, `primary`, `value`, and `direction` — each a snapshot of the position the cursor stopped on, because IndexedDB reuses the live cursor object on every move.',
    'Each readonly data member is a snapshot of the position the cursor stopped on, because IndexedDB reuses the live cursor object on every move.',
    'I1 cursor members',
)
sub(
    '\nIts readonly data members are `transaction`, `mode`, `stores`, `active`, `finished`, and `error`.\n\n| Method   | Returns                              |',
    '\n| Method   | Returns                              |',
    'I1 transaction members',
)
sub(
    'the same verbs as a store, without `index` and without an implicit per-call commit. It adds the raw `store` as its readonly data member.',
    'the same verbs as a store, without `index` and without an implicit per-call commit. Its `store` is the raw native handle the scope binds.',
    'I1 transaction-store members',
)
sub(
    'Its readonly data member is `names`, the store names the database holds at that point in the upgrade.',
    '`names` lists the store names the database holds at that point in the upgrade.',
    'I1 upgrade store-manager members',
)
sub(
    'It declares no readonly data member.\n\n| Method   | Returns | Summary                                                                         |',
    'Reached as `context.indexes`; the store a call names must already exist within the current upgrade transaction.\n\n| Method   | Returns | Summary                                                                         |',
    'I1 upgrade index-manager members',
)

# --- I4: the factory fence carries the schema demonstration again.
sub(
    """import { createIndexedDBDatabase, supportsIndexedDB } from '@orkestrel/indexeddb'

if (supportsIndexedDB()) {
	const db = createIndexedDBDatabase({ name: 'app', version: 1, stores: { users: { path: 'id' } } })
	await db.store('users').set({ id: 'u1', name: 'Ada' })
}""",
    """import { createIndexedDBDatabase, rangeFromKey, supportsIndexedDB } from '@orkestrel/indexeddb'

if (supportsIndexedDB()) {
	const db = createIndexedDBDatabase({
		name: 'app',
		version: 1,
		stores: {
			users: { path: 'id', indexes: [{ name: 'byAge', path: 'age' }] },
		},
	})
	await db.store('users').set({ id: 'u1', name: 'Ada', age: 36 })
	await db.store('users').index('byAge').records(rangeFromKey(18)) // adults, index-backed
}""",
    'I4 factory fence',
)

# --- I5: the residual all-caps emphasis.
sub(
    '(a miss AND a non-record value both read as `undefined` from `get`)',
    '(a miss and a non-record value both read as `undefined` from `get`)',
    'I5 contract AND',
)
sub(
    'await db.drop() // close AND delete the whole database',
    'await db.drop() // closes and deletes the whole database',
    'I5 drop AND',
)
sub(
    '// Every move returns the cursor at the NEW position and leaves the old wrapper',
    '// Every move returns the cursor at its new position and leaves the old wrapper',
    'I5 cursor NEW',
)

io.open(PATH, 'w', encoding='utf-8', newline='').write(text)
print('guide edits applied')
