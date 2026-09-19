import io

path = 'tests/conformance.test.ts'
source = io.open(path, encoding='utf-8').read()

numbered = "/** The number a non-string plugin name carries in these proofs. */\nconst NUMBERED_NAME = 42\n\n"
command_only = (
	"/**\n"
	" * A value carrying `command` without `mode`. No Vitest invocation record carries `command` alone,\n"
	" * so this is an override and merges.\n"
	" */\n"
	"const COMMAND_ONLY = Object.freeze({ command: 'serve', base: '/conformance-command-only/' })\n\n"
)
for block in (numbered, command_only):
	assert block in source, block[:40]
	source = source.replace(block, '', 1)

anchor = "/** Every field of that record, so a refusal is read across the record rather than one key. */\nconst INVOCATION_FIELDS: readonly string[] = ['command', 'isPreview', 'isSsrBuild', 'mode']\n\n"
assert anchor in source
source = source.replace(anchor, anchor + command_only + numbered, 1)

io.open(path, 'w', encoding='utf-8', newline='\n').write(source)
print('moved')
