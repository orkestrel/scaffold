from pathlib import Path

path = Path('src/core/validators.ts')
text = path.read_text(encoding='utf8')

buffer_old = """/** Determines whether a value is an `ArrayBuffer`.
 *
 * @remarks
 * Checks the container alone — no element is inspected. Use {@link arrayOf} to check
 * every element against a guard.
 *
 * @param value - The value to inspect"""
buffer_new = """/** Determines whether a value is an `ArrayBuffer`.
 *
 * @param value - The value to inspect"""

array_old = """/** Determines whether a value is an array.
 *
 * @param value - The value to inspect"""
array_new = """/** Determines whether a value is an array.
 *
 * @remarks
 * Checks the container alone — no element is inspected. Use {@link arrayOf} to check
 * every element against a guard.
 *
 * @param value - The value to inspect"""

assert text.count(buffer_old) == 1, 'isArrayBuffer block not unique'
text = text.replace(buffer_old, buffer_new)
assert text.count(array_old) == 1, 'isArray block not unique'
text = text.replace(array_old, array_new)

path.write_text(text, encoding='utf8')
print('ok')
