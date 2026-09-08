import pathlib, sys
p = pathlib.Path('guides/probe.md')
t = p.read_text()
old = """  own line client and by the `@orkestrel/mcp` stdio client, the record and the rendered text its
  reply carries on both eras, and the signals delivered to it during boot and in service.
"""
new = """  own line client and by the `@orkestrel/mcp` stdio client, the record and the rendered text its
  reply carries on the legacy and the modern era, and the signals delivered to it during boot and
  in service.
"""
if t.count(old) != 1:
	sys.exit(f'found {t.count(old)}')
p.write_text(t.replace(old, new))
print('eras named')
