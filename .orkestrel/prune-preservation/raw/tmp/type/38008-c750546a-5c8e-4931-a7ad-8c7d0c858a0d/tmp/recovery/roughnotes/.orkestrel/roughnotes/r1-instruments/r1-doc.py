import io

path = 'vite.config.ts'
source = io.open(path, encoding='utf-8', newline='').read()

edits = [
	(
		" * Merges a caller's override onto the configuration a factory declares.\n",
		" * Merges a caller's override onto the configuration a factory declares, so this workspace's\n"
		" * own configuration reaches the factory through its parameter instead of wrapping the call\n"
		" * from outside.\n",
	),
	(
		' * @returns The merged configuration, carrying one entry per base plugin name.\n',
		' * @returns The merged configuration: every base entry in the position the base gave it, and\n'
		' * every override entry that replaced none in the order the caller wrote it.\n',
	),
]
for find, replace in edits:
	assert find in source, find
	source = source.replace(find, replace, 1)

io.open(path, 'w', encoding='utf-8', newline='').write(source)
print('documented')
