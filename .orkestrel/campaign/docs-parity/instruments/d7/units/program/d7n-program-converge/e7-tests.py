import io
p = 'guides/program.md'
s = io.open(p, encoding='utf-8').read()
old = '''Guide parity must verify every backticked export and every `ProgramInterface` and
`ProgramManagerInterface` method.
'''
new = '''[`tests/guides.test.ts`](../tests/guides.test.ts) proves guide parity: every
backticked export resolves, every `ProgramInterface` and `ProgramManagerInterface`
method is documented, and the equality gate holds — every `Summary` cell against its
declaration's description paragraph, the titled `Compile a program and a manager`
fence against the `@example` block of that title, and the README pitch against this
guide's tagline. It also runs the flagship fences and asserts the values their
comments claim.
'''
if s.count(old) != 1:
	raise SystemExit('not unique')
s = s.replace(old, new)
io.open(p, 'w', encoding='utf-8').write(s)
print('Tests section updated')
