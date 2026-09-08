import re, sys, pathlib
P = pathlib.Path('/home/user/fleet/workspace/guides/workspace.md')
t = P.read_text()

SPLIT = re.compile(r'(?<!\\)\|')
CONVENTION = "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`."
GUARD = "In a guard table a `Shape` cell holds the type the guard narrows to."
CONSTANT = "A `Shape` cell holds the constant's declared type."

def cells(line):
    parts = SPLIT.split(line)
    assert parts[0].strip() == '' and parts[-1].strip() == '', line
    return [p.strip() for p in parts[1:-1]]

def row(vals):
    return '| ' + ' | '.join(vals) + ' |'

def rename_last(block):
    """Rename the header's last column to Summary and blank every body cell there."""
    lines = block.rstrip('\n').split('\n')
    out = []
    for i, line in enumerate(lines):
        c = cells(line)
        if i == 0:
            c[-1] = 'Summary'
        elif i == 1:
            c = ['---'] * len(c)
        else:
            c[-1] = ''
        out.append(row(c))
    return '\n'.join(out) + '\n'

def grab(start_marker, end_marker):
    a = t.index(start_marker)
    b = t.index(end_marker, a)
    return t[a:b]

def sub(old, new):
    global t
    n = t.count(old)
    if n != 1:
        sys.exit(f'expected 1, found {n}: {old[:80]!r}')
    t = t.replace(old, new)

# ---------------------------------------------------------------- H1 and prose
sub("""> **The virtual file workspace for the `@orkestrel` line.** A workspace is a path-keyed map of
> immutable files with an editing surface over it. Every edit — `write`, `prepend`, `append`,
> `replace`, `move` — mints a new `FileInterface` value and puts it back under its path, so a file
> is a value a caller can hold and compare, never a handle that changes underneath it. `Workspace`
> is that map; `WorkspaceManager` keeps workspaces by id with one active selection; a
> `WorkspaceStoreInterface` persists snapshots. Source: [`src/core`](../src/core). Published
> through `@orkestrel/workspace`.
>
> **A workspace is not a filesystem.** There is no disk, no `node:fs`, no watcher, no
> synchronization lifecycle, and no dirty-state tracking. A path is a key, not a location:
> `src/main.ts` and `notes.md` sit in the same flat map with no directories between them, and
> nothing outside the process can change what the map holds. Durability is a separate seam —
> `snapshot()` produces a plain JSON-serializable value and a store persists it. A store that one
> day wrote those snapshots to disk would be one more implementation of that interface, not a
> change of identity here.
>
> **Anyone can drive it.** An agent loop, a tool handler, and plain application code are all
> callers.

A `Workspace` is the live editing surface over one map of files. A `WorkspaceManager` is a registry
of workspaces keyed by id, with an active selection and, when a store is supplied, lenient `open`
and `save`. A `WorkspaceStoreInterface` is the durability seam: `get`, `set`, and `delete` over a
`WorkspaceSnapshot`. Everything else in this module is the immutable data those nouns exchange,
plus the pure functions that derive it.
""",
"""> The virtual file workspace for the `@orkestrel` line: a path-keyed map of immutable files with
> an editing surface over it, a registry that holds those maps by id under one active selection,
> and a snapshot store seam that persists them.

Every edit — `write`, `prepend`, `append`, `replace`, `move` — mints a new `FileInterface` value
and puts it back under its path, so a file is a value a caller can hold and compare, never a handle
that changes underneath it. `Workspace` is the class behind the editing surface and
`WorkspaceManager` the class behind the registry, which gains lenient `open` and `save` whenever a
store is supplied. `WorkspaceStoreInterface` is the durability seam: `get`, `set`, and `delete` over
a `WorkspaceSnapshot`. Everything else in this module is the immutable data those nouns exchange,
plus the pure functions that derive it. Source: [`src/core`](../src/core). Published through
`@orkestrel/workspace`.

A workspace is not a filesystem. There is no disk, no `node:fs`, no watcher, no synchronization
lifecycle, and no dirty-state tracking. A path is a key, not a location: `src/main.ts` and
`notes.md` sit in the same flat map with no directories between them, and nothing outside the
process can change what the map holds. Durability is a separate seam — `snapshot()` produces a
plain JSON-serializable value and a store persists it. A store that one day wrote those snapshots
to disk would be one more implementation of that interface, not a change of identity here.

Anyone can drive it. An agent loop, a tool handler, and plain application code are all callers.
""")

# ---------------------------------------------------------------- Contracts
contracts_old = grab('| Name                        | Kind      | Shape / Purpose', '\n### Constants')
shapes = {
	'BinaryMIME': "`'image/png' \\| 'image/jpeg' \\| 'image/gif' \\| 'image/webp'`",
	'FileContent': '`TextContent \\| BinaryContent`',
	'TextContent': '`{ text, language }`',
	'BinaryContent': '`{ base64, mime }`',
	'FileState': "`'created' \\| 'modified'`",
	'FileInput': '`{ path, content, state? }`',
	'FileInterface': '`{ path, content, state, size, lines }`',
	'Position': '`{ line, column }`',
	'Range': '`{ start, end }`',
	'ReadResult': '`{ content, range }`',
	'SearchOptions': '`{ regex?, sensitive?, limit? }`',
	'SearchMatch': '`{ path, line, column, length, content }`',
	'ReplaceResult': '`{ occurrences, files }`',
	'WorkspaceEventMap': '`{ write, remove, move, clear }`',
	'WorkspaceOptions': '`{ id?, on?, error?, seed? }`',
	'WorkspaceSnapshot': '`{ id, files }`',
	'WorkspaceStoreInterface': '`get, set, delete`',
	'WorkspaceSnapshotRow': '`{ id, snapshot }`',
	'WorkspaceErrorCode': "`'MISSING' \\| 'MODALITY' \\| 'PATTERN' \\| 'RANGE'`",
	'WorkspaceInterface': '`{ id, emitter, count } plus file, files, read, has, search, replace, write, prepend, append, move, remove, clear, snapshot, destroy`',
	'WorkspaceManagerOptions': '`{ on?, error?, store? }`',
	'WorkspaceManagerInterface': '`{ count, active } plus workspace, workspaces, add, switch, open, save, remove, clear`',
}
lines = contracts_old.rstrip('\n').split('\n')
built = [row(['Name', 'Kind', 'Shape', 'Summary']), row(['---'] * 4)]
seen = []
for line in lines[2:]:
	c = cells(line)
	name = c[0].strip('`')
	if name not in shapes:
		sys.exit(f'no Shape for {name}')
	seen.append(name)
	built.append(row([c[0], c[1], shapes[name], '']))
if seen != list(shapes):
	sys.exit(f'row order drift: {seen}')
sub(contracts_old, '\n'.join(built) + '\n')

sub("""The data shapes, from [`types.ts`](../src/core/types.ts). Every property is readonly, and an
absent optional field is absent.
""",
"""The data shapes, from [`types.ts`](../src/core/types.ts). Every property is readonly, and an
absent optional field is absent. `WorkspaceInterface`, `WorkspaceManagerInterface`, and
`WorkspaceStoreInterface` are the behavioral contracts: each one's call-signature members are
documented under [`## Methods`](#methods), and its readonly data members stay here — `id`,
`emitter`, and `count` on `WorkspaceInterface`, `count` and `active` on
`WorkspaceManagerInterface`, and none on `WorkspaceStoreInterface`.

""" + CONVENTION + "\n")

# ---------------------------------------------------------------- Constants
constants_old = grab('| Name                  | Kind  | Purpose', '\n### Errors')
lines = constants_old.rstrip('\n').split('\n')
built = [row(['Name', 'Kind', 'Shape', 'Summary']), row(['---'] * 4)]
for line in lines[2:]:
	c = cells(line)
	built.append(row([c[0], c[1], '`Readonly<Record<string, string>>`', '']))
sub(constants_old, '\n'.join(built) + '\n')
sub("""### Constants

| Name""", "### Constants\n\n" + CONSTANT + "\n\n| Name")

# ---------------------------------------------------------------- Validators
validators_old = grab('| Name                  | Kind     | Signature                                        | Behavior', '\n### Factories')
narrows = {'isFile': '`FileInterface`', 'isWorkspaceSnapshot': '`WorkspaceSnapshot`'}
lines = validators_old.rstrip('\n').split('\n')
built = [row(['Name', 'Kind', 'Shape', 'Summary']), row(['---'] * 4)]
for line in lines[2:]:
	c = cells(line)
	built.append(row([c[0], c[1], narrows[c[0].strip('`')], '']))
sub(validators_old, '\n'.join(built) + '\n')
sub("""value arriving from outside the process without throwing on a hostile property access.

| Name""",
"""value arriving from outside the process without throwing on a hostile property access.

""" + CONVENTION + ' ' + GUARD + """

| Name""")

# ------------------------------------------- Errors, Helpers, Factories, Methods
for marker, end in [
	('| Name               | Kind     | Signature                                     | Behavior', '\n### Helpers'),
	('| Name                 | Kind     | Signature                                                     | Behavior', '\n### Validators'),
	('| Name                           | Kind     | Signature                                                          | Behavior', '\n### `Workspace`'),
	('| Method     | Returns                         | Behavior', '\n#### `WorkspaceManagerInterface`'),
	('| Method       | Returns                                    | Behavior', '\n#### `WorkspaceStoreInterface`'),
	('| Method   | Returns                                   | Behavior', '\n## Files and content'),
]:
	block = grab(marker, end)
	sub(block, rename_last(block))

# ---------------------------------------------------------------- Classes
sub("""### `Workspace`

The implementing class of `WorkspaceInterface`, from""",
"""### Classes

The implementing classes, from [`Workspace.ts`](../src/core/workspaces/Workspace.ts),
[`WorkspaceManager.ts`](../src/core/workspaces/WorkspaceManager.ts),
[`MemoryWorkspaceStore.ts`](../src/core/workspaces/stores/MemoryWorkspaceStore.ts), and
[`DatabaseWorkspaceStore.ts`](../src/core/workspaces/stores/DatabaseWorkspaceStore.ts) — each
documented in full under its own heading following this table.

""" + row(['Name', 'Kind', 'Summary']) + '\n' + row(['---'] * 3) + '\n'
+ row(['`Workspace`', 'class', '']) + '\n'
+ row(['`WorkspaceManager`', 'class', '']) + '\n'
+ row(['`MemoryWorkspaceStore`', 'class', '']) + '\n'
+ row(['`DatabaseWorkspaceStore`', 'class', '']) + """

### `Workspace`

The implementing class of `WorkspaceInterface`, from""")

# ---------------------------------------------------------------- Methods intro
sub("""The public call-signature members of each behavioral interface, one table per interface.""",
"""The public call-signature members of each behavioral interface, one table per interface. A
`Summary` cell carries its member's first overload; where a member is overloaded — `read`, `has`,
`write`, `prepend`, `append`, `move`, and `remove` on `WorkspaceInterface`, and `remove` on
`WorkspaceManagerInterface` — the `Returns` cell spans the whole set and the sections that follow
work each form.""")

# ---------------------------------------------------------------- H3 cross-links
sub("""and nothing else. See
[`## Methods`](#methods) for its public call surface.""",
"""and nothing else. See [`## Methods`](#methods) for its public call surface.""")

# ---------------------------------------------------------------- prose count
sub('Prepend and append are the two ends\nof the same map.', 'Prepend and append are the opposite\nends of the same map.')

# ---------------------------------------------------------------- Tests
sub("""## Tests

- [`helpers.test.ts`](../tests/src/core/helpers.test.ts)""",
"""## Tests

- [`guides.test.ts`](../tests/guides.test.ts) — the `## Surface` ↔ `src/core` bijection over values
  and types, each interface ↔ class method bijection, and the equality gate: every `Summary` cell
  against its declaration's description paragraph, the titled `Files and content` fence against the
  `@example` block of that title (pinned so the titled pair cannot be retired silently), and the
  README pitch against this guide's tagline. It also runs the flagship fences and asserts the
  values their comments claim.
- [`helpers.test.ts`](../tests/src/core/helpers.test.ts)""")

P.write_text(t)
print('ok')
