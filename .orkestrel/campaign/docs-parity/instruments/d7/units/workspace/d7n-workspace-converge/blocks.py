import sys, pathlib
ROOT = pathlib.Path('/home/user/fleet/workspace')
edits = {}
def sub(rel, old, new):
    edits.setdefault(rel, []).append((old, new))

sub('src/core/types.ts',
"""/**
 * Holds a file's immutable content: either text with a language tag or a base64 string with a
 * MIME.
 */""",
"""/**
 * Holds a file's immutable content: either text with a language tag or a base64 string with a
 * MIME. The union carries no discriminant field, so a caller narrows it with a guard.
 */""")

sub('src/core/types.ts',
"""/** Names the edit state of an immutable file value. */""",
"""/**
 * Names the edit state of an immutable file value: `created` for the first write to a path and
 * `modified` for every later edit of that path.
 */""")

sub('src/core/types.ts',
"""/** Carries the caller-supplied values used to create an immutable file. */""",
"""/**
 * Carries the caller-supplied values used to create an immutable file. The byte size and the line
 * count are derived rather than supplied.
 */""")

sub('src/core/types.ts',
"""/** Carries the tallies produced by a replacement operation. */""",
"""/** Carries the tallies a replacement produced: the occurrences replaced and the files changed. */""")

sub('src/core/types.ts',
"""	 * Resolves a snapshot.
	 *
	 * @param id - The workspace identifier""",
"""	 * Resolves a snapshot by workspace id.
	 *
	 * @param id - The workspace identifier""")

sub('src/core/constants.ts',
""" * Maps file extensions to language tags for text content.
 *
 * Unknown extensions intentionally fall back to `text` in
 * {@link import('./helpers.js').inferLanguage}.""",
""" * Maps file extensions to language tags for text content.
 *
 * The table is frozen, and an extension it does not list falls back to `text` in
 * {@link import('./helpers.js').inferLanguage}.""")

sub('src/core/errors.ts',
"""/** Reports an invalid workspace edit or search operation. */""",
"""/**
 * Reports an invalid workspace edit or search operation, carrying a {@link WorkspaceErrorCode}
 * and, when the operation had one, the context it ran under.
 */""")

sub('src/core/errors.ts',
""" * @param value - The caught value
 * @returns True if the value is a workspace error; false otherwise
 *
 * @example""",
""" * @remarks
 * The check is one `instanceof` test, so it stays total: every input answers `true` or `false`
 * and none throws.
 *
 * @param value - The caught value
 * @returns True if the value is a workspace error; false otherwise
 *
 * @example""")

sub('src/core/helpers.ts',
""" * Checks whether content is the binary arm.""",
""" * Determines whether content is the binary arm.""")

sub('src/core/helpers.ts',
""" * Computes the decoded byte length of a base64 string.""",
""" * Computes the decoded byte length of a base64 string, arithmetically rather than by decoding it.""")

sub('src/core/factories.ts',
""" * Creates the text arm of {@link FileContent}.""",
""" * Creates the text arm of {@link FileContent}, returned as {@link TextContent} rather than as
 * the whole union.""")

sub('src/core/factories.ts',
""" * Creates the binary arm of {@link FileContent}.""",
""" * Creates the binary arm of {@link FileContent}, returned as {@link BinaryContent} rather than
 * as the whole union.""")

sub('src/core/factories.ts',
""" * Creates a workspace.
 *
 * @param options - Optional identity, emitter configuration, and initial files
 * @returns A working workspace""",
""" * Creates a workspace with the same identity, emitter, and seed reach the constructor takes.
 *
 * @param options - Optional identity, emitter configuration, and initial files
 * @returns A working workspace""")

sub('src/core/factories.ts',
""" * Creates a database-backed workspace snapshot store.""",
""" * Creates a database-backed workspace snapshot store, over an in-memory driver when the caller
 * supplies none.""")

sub('src/core/workspaces/Workspace.ts',
""" * binary files remain available through construction-time hydration. Mutations emit after the
 * registry has changed.""",
""" * binary files remain available through construction-time hydration. Mutations emit after the
 * file map has changed.""")

for rel, pairs in edits.items():
    p = ROOT / rel
    t = p.read_text()
    for old, new in pairs:
        n = t.count(old)
        if n != 1:
            sys.exit(f'{rel}: expected 1, found {n}: {old[:60]!r}')
        t = t.replace(old, new)
    p.write_text(t)
    print(f'{rel}: {len(pairs)} edits')
