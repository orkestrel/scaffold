import io

path = 'tests/conformance.test.ts'
source = io.open(path, encoding='utf-8').read()
helpers = io.open('tmp/units/r1-helpers.txt', encoding='utf-8').read()
cases = io.open('tmp/units/r1-cases.txt', encoding='utf-8').read()

marker = "describe('configuration conformance', () => {"
assert marker in source, 'describe marker missing'
source = source.replace(marker, helpers + marker, 1)

assert source.endswith('})\n'), 'unexpected file tail'
source = source[: -len('})\n')] + cases + '})\n'

io.open(path, 'w', encoding='utf-8', newline='\n').write(source)
print('spliced')
