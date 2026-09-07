# Applies the d7n-indexeddb-converge-fix remark edits (I2). Doc blocks only; no code token moves.
import io, sys

def edit(path, old, new, label):
    text = io.open(path, encoding='utf-8').read()
    if text.count(old) != 1:
        sys.exit('NOT UNIQUE (%d): %s' % (text.count(old), label))
    io.open(path, 'w', encoding='utf-8', newline='').write(text.replace(old, new))
    print('applied: %s' % label)

edit(
    'src/browser/IndexedDBTransaction.ts',
    ' * Wraps `IDBTransaction` with state tracking and typed, scope-bound store access.\n',
    ' * Wraps `IDBTransaction` with state tracking.\n',
    'I2 transaction remark',
)

edit(
    'src/browser/errors.ts',
    """ * Carries an {@link IndexedDBErrorCode} and the originating native error as the
 * standard `cause`. Construct it directly for wrapper-lifecycle faults; the""",
    """ * The `code` is an {@link IndexedDBErrorCode}, and the originating native error
 * rides as the standard `cause`. Construct it directly for wrapper-lifecycle faults; the""",
    'I2 error remark',
)
