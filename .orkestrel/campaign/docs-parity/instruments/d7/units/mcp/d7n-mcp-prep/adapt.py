from pathlib import Path

target = Path('tests/guides.test.ts')
text = target.read_text(encoding='utf8')

pairs = [
	(
		"\t\t\tconst members = source.methods(group.interface)\n"
		"\t\t\tconst entity = group.interface.replace(/Interface$/, '')\n",
		"\t\t\tconst members = source.methods(group.interface).map((method) => method.name)\n"
		"\t\t\tconst documented = group.methods.map((method) => method.name)\n"
		"\t\t\tconst entity = group.interface.replace(/Interface$/, '')\n",
	),
	(
		"\t\t\t\t\texpect(findMissing(members, group.methods)).toEqual([])\n",
		"\t\t\t\t\texpect(findMissing(members, documented)).toEqual([])\n",
	),
	(
		"\t\t\t\t\texpect(findMissing(group.methods, members)).toEqual([])\n",
		"\t\t\t\t\texpect(findMissing(documented, members)).toEqual([])\n",
	),
	(
		"\t\t\t\t\tconst extra =\n"
		"\t\t\t\t\t\tentity === group.interface ? [] : findMissing(source.methods(entity), group.methods)\n",
		"\t\t\t\t\tconst extra =\n"
		"\t\t\t\t\t\tentity === group.interface\n"
		"\t\t\t\t\t\t\t? []\n"
		"\t\t\t\t\t\t\t: findMissing(\n"
		"\t\t\t\t\t\t\t\t\tsource.methods(entity).map((method) => method.name),\n"
		"\t\t\t\t\t\t\t\t\tdocumented,\n"
		"\t\t\t\t\t\t\t\t)\n",
	),
	(
		"\t\t\texpect(findUnexampled(names, fences, source.examples())).toEqual([])\n",
		"\t\t\texpect(\n"
		"\t\t\t\tfindUnexampled(\n"
		"\t\t\t\t\tnames,\n"
		"\t\t\t\t\tfences,\n"
		"\t\t\t\t\tsource.examples().map((example) => example.name),\n"
		"\t\t\t\t),\n"
		"\t\t\t).toEqual([])\n",
	),
	(
		"\t\t\tconst entity = group.interface.replace(/Interface$/, '')\n"
		"\t\t\tdescribe(`${group.interface} examples`, () => {\n",
		"\t\t\tconst entity = group.interface.replace(/Interface$/, '')\n"
		"\t\t\tconst documented = group.methods.map((method) => method.name)\n"
		"\t\t\tconst examples =\n"
		"\t\t\t\tentity === group.interface\n"
		"\t\t\t\t\t? source.examples(group.interface).map((example) => example.name)\n"
		"\t\t\t\t\t: source\n"
		"\t\t\t\t\t\t\t.examples(group.interface)\n"
		"\t\t\t\t\t\t\t.map((example) => example.name)\n"
		"\t\t\t\t\t\t\t.concat(source.examples(entity).map((example) => example.name))\n"
		"\t\t\tdescribe(`${group.interface} examples`, () => {\n",
	),
	(
		"\t\t\t\t\tconst examples =\n"
		"\t\t\t\t\t\tentity === group.interface\n"
		"\t\t\t\t\t\t\t? source.examples(group.interface)\n"
		"\t\t\t\t\t\t\t: source.examples(group.interface).concat(source.examples(entity))\n"
		"\t\t\t\t\texpect(findUnexampled(group.methods, fences, examples)).toEqual([])\n",
		"\t\t\t\t\texpect(findUnexampled(documented, fences, examples)).toEqual([])\n",
	),
]

for before, after in pairs:
	count = text.count(before)
	if count != 1:
		raise SystemExit(f'expected exactly one occurrence, found {count}: {before!r}')
	text = text.replace(before, after)

target.write_text(text, encoding='utf8')
print('adapted')
