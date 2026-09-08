import pathlib

TAGLINE = (
	'> Concrete, LLM-callable tools for the `@orkestrel` line — workflow authoring, workspace '
	'editing, sub-agent delegation, terminal-mediated prompting, database and relation access, '
	'schema inference, and endpoint wrapping — over the `@orkestrel/tool` runtime, with pluggable '
	'stores.'
)

g = pathlib.Path('guides/toolbox.md')
t = g.read_text()
old = t.split('\n')[2]
assert old.startswith('> Concrete, LLM-callable **tools**'), old
displaced = (
	'The runtime supplies `ToolInterface`, registry execution, and result isolation; see '
	'[`tool.md`](tool.md). This package supplies the concrete behavior through one factory per tool.'
)
t = t.replace(old + '\n', TAGLINE + '\n\n' + displaced + '\n', 1)
g.write_text(t)

r = pathlib.Path('README.md')
rt = r.read_text()
old_pitch = (
	'Concrete, LLM-callable tools for the `@orkestrel` line. Toolbox supplies workflow\n'
	'authoring, workspace editing, sub-agent delegation, terminal prompts, database and\n'
	'relation operations, and schema inference over the\n'
	'[`@orkestrel/tool`](https://github.com/orkestrel/tool) runtime.\n'
)
assert old_pitch in rt
rt = rt.replace(old_pitch, TAGLINE + '\n')
rt = rt.replace(
	'## Install\n\n```sh',
	'## Install\n\nInstall the package from npm:\n\n```sh',
)
rt = rt.replace(
	'## Example\n\n```ts',
	'## Example\n\nRegister the workspace tool on a real manager and write one file through it:\n\n```ts',
)
r.write_text(rt)
