import pathlib, sys

p = pathlib.Path('guides/probe.md')
t = p.read_text()

def sub(old, new):
	global t
	if t.count(old) != 1:
		sys.exit(f'found {t.count(old)}\n---\n{old}\n---')
	t = t.replace(old, new)

# Keep the quoted workspace message on its own lines, wrapping inside the span rather than
# starting it at a line end.
sub("""  drafts resolve from memory. A project the root configuration names by path carries no such plugin,
  so the stage installs no overlay and runs no test. The check reports an `origin: 'workspace'`
  issue, because the party that must act is the workspace owner editing `vite.config.ts`: `The
  runtime stage cannot instrument the string-declared Vitest project <name> because its
  configuration carries no runtime overlay plugin`. The project's `include` pattern is not the
  mechanism: the stage builds an explicit specification for the file it wrote, so a project whose
  glob matches nothing still serves a claim.
""",
"""  drafts resolve from memory. A project the root configuration names by path carries no such plugin,
  so the stage installs no overlay and runs no test. The check reports an `origin: 'workspace'`
  issue, because the party that must act is the workspace owner editing `vite.config.ts`:
  `The runtime stage cannot instrument the string-declared Vitest project <name> because its
  configuration carries no runtime overlay plugin`. The project's `include` pattern is not the
  mechanism: the stage builds an explicit specification for the file it wrote, so a project whose
  glob matches nothing still serves a claim.
""")

# Keep the command token whole rather than breaking `tsc --showConfig` across the line end.
sub("""  cover the configuration a stage's own tool was built around. The type stage reads `tsc
  --showConfig` once per project and keys that reading by resolved project path, so a
  `tsconfig.json` edited after that reading does not change the compiler options the stage applies
  or the project digest it reports. A project that declares its own `include` still re-expands on
""",
"""  cover the configuration a stage's own tool was built around. The type stage reads
  `tsc --showConfig` once per project and keys that reading by resolved project path, so a
  `tsconfig.json` edited after that reading does not change the compiler options the stage applies
  or the project digest it reports. A project that declares its own `include` still re-expands on
""")

p.write_text(t)
print('code spans restored to whole-token line breaks')
