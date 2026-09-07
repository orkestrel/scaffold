// Applies each voice fix as one exact unique substring replacement.
// Fails loudly when a before-text is absent or appears more than once.
import { readFileSync, writeFileSync } from 'node:fs'

const edits = [
	[
		'tests/setup.ts',
		'* Encode `text` as UTF-8 into a freshly allocated',
		'* Encodes `text` as UTF-8 into a freshly allocated',
	],
	[
		'tests/setupServer.ts',
		'* Run `fn` with a fresh {@link ScratchInterface} pre-populated with `files`,\n * then destroy it unconditionally',
		'* Runs `fn` with a fresh {@link ScratchInterface} pre-populated with `files`,\n * then destroys it unconditionally',
	],
	['tests/setupServer.ts', '* Build valid {@link SEAOptions}', '* Builds valid {@link SEAOptions}'],
	[
		'tests/setupServer.ts',
		'* Build valid {@link InjectorOptions}',
		'* Builds valid {@link InjectorOptions}',
	],
	[
		'tests/setupServer.ts',
		'* Build a minimal but structurally valid synthetic PE image',
		'* Builds a minimal but structurally valid synthetic PE image',
	],
	[
		'tests/setupServer.ts',
		'/** One parsed PE resource leaf, returned by',
		'/** Holds one parsed PE resource leaf, returned by',
	],
	[
		'tests/setupServer.ts',
		'/** One PE section table entry, as',
		'/** Holds one PE section table entry, as',
	],
	[
		'tests/setupServer.ts',
		"* Re-parse a PE resource directory tree from a named section (e.g. the\n * Injector's",
		"* Re-parses a PE resource directory tree from a named section (for example\n * the Injector's",
	],
	[
		'tests/setupServer.ts',
		'/** One ELF64 program header entry, built',
		'/** Holds one ELF64 program header entry, built',
	],
	[
		'tests/setupServer.ts',
		'* Build a minimal but structurally valid synthetic ELF64',
		'* Builds a minimal but structurally valid synthetic ELF64',
	],
	[
		'tests/setupServer.ts',
		'/** Parse all ELF64 program header entries',
		'/** Parses all ELF64 program header entries',
	],
	[
		'tests/setupServer.ts',
		'/** A parsed, active (non-PT_NULL) ELF note',
		'/** Holds a parsed, active (non-PT_NULL) ELF note',
	],
	[
		'tests/setupServer.ts',
		'* Find every active PT_NOTE program header',
		'* Finds every active PT_NOTE program header',
	],
	[
		'tests/setupServer.ts',
		'/** The `__LINKEDIT` segment {@link buildMachoFixture} emits. */',
		'/** Configures the `__LINKEDIT` segment {@link buildMachoFixture} emits. */',
	],
	[
		'tests/setupServer.ts',
		'* Build a minimal but structurally valid synthetic thin Mach-O 64',
		'* Builds a minimal but structurally valid synthetic thin Mach-O 64',
	],
	[
		'tests/setupServer.ts',
		'/** Build a fat/universal Mach-O header',
		'/** Builds a fat/universal Mach-O header',
	],
	[
		'tests/setupServer.ts',
		'/** One raw Mach-O load command header',
		'/** Holds one raw Mach-O load command header',
	],
	[
		'tests/setupServer.ts',
		'/** Parse every load command header out of',
		'/** Parses every load command header out of',
	],
	[
		'tests/setupServer.ts',
		'/** One parsed LC_SEGMENT_64 load command. */',
		'/** Holds one parsed LC_SEGMENT_64 load command. */',
	],
	[
		'tests/setupServer.ts',
		'/** Parse every LC_SEGMENT_64 command out of',
		'/** Parses every LC_SEGMENT_64 command out of',
	],
	[
		'tests/setupServer.ts',
		'/** One parsed Mach-O section-table entry, found via {@link findMachoSection}. */',
		'/** Holds one parsed Mach-O section-table entry, found through {@link findMachoSection}. */',
	],
	[
		'tests/setupServer.ts',
		'/** Find a named section within a named segment',
		'/** Finds a named section within a named segment',
	],
	[
		'tests/src/server/injectors/Injector.test.ts',
		'// Confirm the fuse was actually flipped (sanity check the fixture).',
		'// Confirm the fuse was actually flipped (a quick check of the fixture).',
	],
	[
		'src/server/types.ts',
		'absolute path to the file just compressed.',
		'absolute path to the file compressed most recently.',
	],
	[
		'src/server/types.ts',
		'resource identifier (e.g. `"NODE_SEA_BLOB"`)',
		'resource identifier (for example `"NODE_SEA_BLOB"`)',
	],
	[
		'src/server/types.ts',
		"lookup key (e.g. `\"client.html.br\"`)",
		"lookup key (for example `\"client.html.br\"`)",
	],
	[
		'src/server/types.ts',
		'operation aborted via `AbortSignal`.',
		'operation aborted through `AbortSignal`.',
	],
	[
		'src/server/types.ts',
		'platform identifier (e.g. `"win32"`, `"darwin"`)',
		'platform identifier (for example `"win32"`, `"darwin"`)',
	],
	[
		'src/server/types.ts',
		'injects the blob via the built-in Injector',
		'injects the blob through the built-in Injector',
	],
	[
		'src/server/injectors/Injector.ts',
		'reads PT_NOTE segments via dl_iterate_phdr',
		'reads PT_NOTE segments through dl_iterate_phdr',
	],
	[
		'src/server/injectors/Injector.ts',
		'// blob. The segment defaults to "__POSTJECT" (or custom via options)\n\t// and the section is "__" + resource.',
		'// blob. The segment defaults to "__POSTJECT", or to a custom name the\n\t// options carry, and the section is "__" + resource.',
	],
	[
		'src/server/injectors/Injector.ts',
		'Bounded header read: just enough to cover',
		'Bounded header read: only enough to cover',
	],
	[
		'src/server/injectors/Injector.ts',
		'// arm64 (0x0100000c) requires 16K pages; every other architecture (x86_64\n\t\t\t// etc.) uses 4K',
		'// arm64 (0x0100000c) requires 16K pages; every other architecture,\n\t\t\t// including x86_64, uses 4K',
	],
	[
		'src/server/injectors/Injector.ts',
		'consistent with what was just written.',
		'consistent with what was written.',
	],
	[
		'src/server/helpers.ts',
		'at `output` (e.g. `X.br -> /victim`)',
		'at `output` (for example `X.br -> /victim`)',
	],
	[
		'src/server/helpers.ts',
		'truncated security directory cannot throw unexpectedly — it is simply\n * skipped and only the directory entry is zeroed.',
		'truncated security directory cannot throw unexpectedly — it is skipped\n * and only the directory entry is zeroed.',
	],
	[
		'src/server/helpers.ts',
		'@returns Formatted string (e.g. `"1.23 MB"`, `"456 KB"`)',
		'@returns Formatted string (for example `"1.23 MB"`, `"456 KB"`)',
	],
	[
		'src/server/helpers.ts',
		"Windows drive-relative specifier (e.g. `'C:foo'`), or any `/`-separated",
		"Windows drive-relative specifier (for example `'C:foo'`), or any\n * `/`-separated",
	],
	[
		'src/server/helpers.ts',
		'symlinked base itself (e.g. macOS `/tmp`',
		'symlinked base itself (for example macOS `/tmp`',
	],
	[
		'src/server/helpers.ts',
		'failure (e.g. `ENOENT`) is wrapped',
		'failure (for example `ENOENT`) is wrapped',
	],
	[
		'src/server/helpers.ts',
		"separator, an absolute path, or a Windows drive-relative specifier (e.g.\n * `'C:foo'`) — all of which could redirect the output executable outside",
		"separator, an absolute path, or a Windows drive-relative specifier (for\n * example `'C:foo'`) — all of which could redirect the output executable outside",
	],
	[
		'src/server/helpers.ts',
		'here" and swallowed; anything else (e.g. `ENOENT`, meaning the directory',
		'here" and swallowed; anything else (for example `ENOENT`, meaning the directory',
	],
	[
		'src/server/helpers.ts',
		'Anything else (e.g. ENOENT, the',
		'Anything else (for example ENOENT, the',
	],
	[
		'src/server/helpers.ts',
		'Note name (SEA resource identifier, e.g. `NODE_SEA_BLOB`)',
		'Note name (SEA resource identifier, for example `NODE_SEA_BLOB`)',
	],
	[
		'src/server/helpers.ts',
		"CLI flag, e.g. `'-e ...'`)",
		"CLI flag, for example `'-e ...'`)",
	],
]

const failures = []
const texts = new Map()
for (const [file, before, after] of edits) {
	const text = texts.get(file) ?? readFileSync(file, 'utf8')
	const hits = text.split(before).length - 1
	if (hits !== 1) {
		failures.push(`${file}: ${String(hits)} hits for ${JSON.stringify(before)}`)
		texts.set(file, text)
		continue
	}
	texts.set(file, text.replace(before, after))
}
if (failures.length > 0) {
	for (const failure of failures) console.error(failure)
	process.exit(1)
}
for (const [file, text] of texts) writeFileSync(file, text)
console.log(`applied ${String(edits.length)} replacements across ${String(texts.size)} files`)
