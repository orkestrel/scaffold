"""Restores each fact the retired guide cell carried and the doc block lacked."""
EDITS = [
	('src/core/types.ts',
	 '/** Describes the serializable input for a navigable browser snapshot. */',
	 """/**
 * Describes the serializable input for a navigable browser snapshot — the form a
 * `BrowserSnapshot` is built from and serializes back to.
 */"""),
	('src/core/types.ts',
	 ' * - `strict` — require the selector to resolve to exactly one element\n * - `force` — skip the actionability checks',
	 ' * - `strict` — require the selector to resolve to exactly one element (default `true`)\n * - `force` — skip the actionability checks'),
	('src/core/constants.ts',
	 ' * ({@link BROWSER_CODEGEN_BINDING_NAME}) as a JSON string payload. Guarded to',
	 ' * ({@link BROWSER_CODEGEN_BINDING_NAME}) as a JSON string payload. A `contenteditable`\n * fill is captured through `input` events, the same way an input or a textarea is.\n * Guarded to'),
	('src/server/constants.ts',
	 '/** Lists the environment variables checked (in order) for an explicit browser executable path override. */',
	 """/**
 * Lists the environment variables checked, in order, for an explicit browser executable path
 * override: `PLAYWRIGHT_EXECUTABLE_PATH`, then `CHROME_PATH`.
 */"""),
	('src/server/constants.ts',
	 '/** Lists the well-known Chrome/Chromium/Edge executable paths with no platform-specific root, keyed by `process.platform`. */',
	 """/**
 * Lists the well-known Chrome/Chromium/Edge executable paths with no platform-specific root,
 * keyed by `process.platform`, leaving `win32` empty because its roots come from
 * `BROWSER_WINDOWS_SUFFIXES`.
 */"""),
	('src/server/constants.ts',
	 '/** Lists the fallback Windows install roots used when the corresponding environment variable is absent. */',
	 """/**
 * Lists the fallback Windows install roots used when `PROGRAMFILES`, `PROGRAMFILES(X86)`, or
 * `LOCALAPPDATA` is absent.
 */"""),
	('src/server/constants.ts',
	 '/** Lists the well-known Playwright browser store base directories checked in addition to `PLAYWRIGHT_BROWSERS_PATH`. */',
	 """/**
 * Lists the well-known Playwright browser store base directories checked in addition to
 * `PLAYWRIGHT_BROWSERS_PATH`, starting with `/opt/pw-browsers`.
 */"""),
]
for path, before, after in EDITS:
	text = open(path).read()
	assert text.count(before) == 1, (path, before[:60], text.count(before))
	open(path, 'w').write(text.replace(before, after))
print('restored', len(EDITS))
