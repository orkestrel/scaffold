import io, sys

def sub(path, old, new, count=1):
    with io.open(path, encoding='utf-8', newline='') as f:
        t = f.read()
    n = t.count(old)
    if n != count:
        sys.exit('FAIL %s: expected %d occurrence(s), found %d for %r' % (path, count, n, old[:60]))
    t = t.replace(old, new)
    with io.open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(t)
    print('ok %s' % path)

# W1 — Workspace class block opener
sub('src/core/workspaces/Workspace.ts',
    ' * Provides a mutable path-keyed editing surface over immutable files.\n',
    ' * Implements `WorkspaceInterface` over one insertion-ordered path map the instance owns,\n'
    ' * projecting fresh arrays on every read.\n')

# W1 — WorkspaceManager class block opener
sub('src/core/workspaces/WorkspaceManager.ts',
    ' * Provides an insertion-ordered workspace registry with an active selection.\n',
    ' * Implements `WorkspaceManagerInterface` over an insertion-ordered id map and one active id\n'
    ' * the instance owns, resolving `active` through that map on every read and holding no emitter.\n')

# W2 — the guard table's doubled convention sentence
sub('guides/workspace.md',
    "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`. In a guard table a `Shape` cell holds the type the guard narrows to.\n",
    "In a guard table a `Shape` cell holds the type the guard narrows to.\n")

# W3 — `must` reads as an obligation on the caller
sub('guides/workspace.md',
    'the workspaces that caller must reach',
    'the workspaces that caller needs to reach')

# W4 — the no-data-member row takes the braces
sub('guides/workspace.md',
    '| `WorkspaceStoreInterface`   | interface | `get, set, delete`',
    '| `WorkspaceStoreInterface`   | interface | `{} plus get, set, delete`')

# W5 — the doubled preposition
sub('tests/src/core/workspaces/Workspace.test.ts',
    '// bytes). Built through the public createFile / createBinaryContent, placed through the\n',
    '// bytes). Built by using the public `createFile` / `createBinaryContent`, placed through the\n')

# W6 — the drop-in's header line
sub('tests/guides.test.ts',
    "// package's own, and are the only part a sibling package changes.\n",
    "// package's own, as is the executed section that closes the file.\n")

# W7 — the arm guards' signatures
sub('guides/workspace.md',
    '| `isText`             | function | `(content: FileContent) => boolean`',
    '| `isText`             | function | `(content: FileContent) => content is TextContent`')
sub('guides/workspace.md',
    '| `isBinary`           | function | `(content: FileContent) => boolean`',
    '| `isBinary`           | function | `(content: FileContent) => content is BinaryContent`')
