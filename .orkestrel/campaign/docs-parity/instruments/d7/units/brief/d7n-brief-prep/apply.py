from pathlib import Path

path = Path('tests/guides.test.ts')
text = path.read_text()

pairs = [
(
"\t\t\tconst declared = source.methods(group.interface)\n"
"\t\t\texpect(declared.length).toBeGreaterThan(0)\n"
"\t\t\texpect(findMissing(group.methods, declared)).toStrictEqual([])\n"
"\t\t\texpect(findMissing(declared, group.methods)).toStrictEqual([])\n"
"\t\t\tconst implementation = group.interface.replace(/Interface$/u, '')\n"
"\t\t\texpect(findMissing(source.methods(implementation), group.methods)).toStrictEqual([])\n",
"\t\t\tconst members = source.methods(group.interface).map((method) => method.name)\n"
"\t\t\tconst documented = group.methods.map((method) => method.name)\n"
"\t\t\texpect(members.length).toBeGreaterThan(0)\n"
"\t\t\texpect(findMissing(documented, members)).toStrictEqual([])\n"
"\t\t\texpect(findMissing(members, documented)).toStrictEqual([])\n"
"\t\t\tconst implementation = group.interface.replace(/Interface$/u, '')\n"
"\t\t\texpect(\n"
"\t\t\t\tfindMissing(\n"
"\t\t\t\t\tsource.methods(implementation).map((method) => method.name),\n"
"\t\t\t\t\tdocumented,\n"
"\t\t\t\t),\n"
"\t\t\t).toStrictEqual([])\n",
),
(
"\t\texpect(findUnexampled(functions, fences, source.examples())).toStrictEqual([])\n"
"\t\texpect(findUnexampled(['neverDocumented'], fences, source.examples())).toStrictEqual([\n"
"\t\t\t'neverDocumented',\n"
"\t\t])\n"
"\t\tfor (const group of guide.methods()) {\n"
"\t\t\tconst implementation = group.interface.replace(/Interface$/u, '')\n"
"\t\t\texpect(findUnexampled(group.methods, fences, source.examples(implementation))).toStrictEqual(\n"
"\t\t\t\t[],\n"
"\t\t\t)\n"
"\t\t}\n",
"\t\texpect(\n"
"\t\t\tfindUnexampled(\n"
"\t\t\t\tfunctions,\n"
"\t\t\t\tfences,\n"
"\t\t\t\tsource.examples().map((example) => example.name),\n"
"\t\t\t),\n"
"\t\t).toStrictEqual([])\n"
"\t\texpect(\n"
"\t\t\tfindUnexampled(\n"
"\t\t\t\t['neverDocumented'],\n"
"\t\t\t\tfences,\n"
"\t\t\t\tsource.examples().map((example) => example.name),\n"
"\t\t\t),\n"
"\t\t).toStrictEqual(['neverDocumented'])\n"
"\t\tfor (const group of guide.methods()) {\n"
"\t\t\tconst implementation = group.interface.replace(/Interface$/u, '')\n"
"\t\t\tconst documented = group.methods.map((method) => method.name)\n"
"\t\t\tconst examples = source.examples(implementation).map((example) => example.name)\n"
"\t\t\texpect(findUnexampled(documented, fences, examples)).toStrictEqual([])\n"
"\t\t}\n",
),
]

for old, new in pairs:
    if text.count(old) != 1:
        raise SystemExit('before-text not found exactly once: ' + old[:60])
    text = text.replace(old, new)

path.write_text(text)
print('applied')
