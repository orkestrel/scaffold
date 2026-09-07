// Inserts the `Shape` column into the named tables of guides/sea.md, between
// `Kind` and `Summary`, and writes the convention sentence above each table.
// Splits a row on a pipe not preceded by a backslash, so a `\|` inside a union
// literal stays inside its cell. Every non-`Summary` cell keeps its text.
import { readFileSync, writeFileSync } from 'node:fs'

const PATH = 'guides/sea.md'
const SPLIT = /(?<!\\)\|/

const CONSTANT_SENTENCE = 'A `Shape` cell holds the constant’s declared type.'.replace(
	'’',
	"'",
)
const TYPE_SENTENCE =
	"A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`."

const CONSTANTS = {
	SEA_SENTINEL_FUSE: '`string`',
	SEA_BLOB_RESOURCE: '`string`',
	DEFAULT_SEA_COMPRESSION_QUALITY: '`number`',
	WINDOWS_SUBSYSTEM_GUI: '`number`',
	WINDOWS_SUBSYSTEM_CONSOLE: '`number`',
	BROTLI_EXTENSION: '`string`',
	SKIP_EXTENSIONS: '`ReadonlySet<string>`',
	PE_MAGIC: '`number`',
	PE_SIGNATURE: '`number`',
	PE32_MAGIC: '`number`',
	PE32_PLUS_MAGIC: '`number`',
	ELF_MAGIC: '`number`',
	ELF_CLASS_64: '`number`',
	ELF_DATA_LSB: '`number`',
	ELF_PT_NOTE: '`number`',
	ELF_PT_LOAD: '`number`',
	ELF_PT_PHDR: '`number`',
	ELF_PF_R: '`number`',
	ELF_PAGE_SIZE: '`number`',
	MACHO_MAGIC_64: '`number`',
	MACHO_LC_SEGMENT_64: '`number`',
	PE_RT_RCDATA: '`number`',
	PE_RESOURCE_DIR_SIZE: '`number`',
	PE_RESOURCE_ENTRY_SIZE: '`number`',
	PE_RESOURCE_DATA_ENTRY_SIZE: '`number`',
	PE_SECTION_HEADER_SIZE: '`number`',
	PE_RESOURCE_SUBDIR_FLAG: '`number`',
	PE_RESOURCE_NAME_FLAG: '`number`',
	PE_SCN_INITIALIZED_DATA: '`number`',
	PE_SCN_MEM_READ: '`number`',
	SEA_PLATFORMS: '`Readonly<Record<string, SEAPlatform>>`',
	SEA_COMPRESSION_MODE_VALUES: '`Readonly<Record<SEACompressionMode, number>>`',
	DEFAULT_ENTRY_FORMAT: '`SEAEntryFormat`',
}

const TYPES = {
	SEACompressionSize: '`{ original, compressed, ratio }`',
	SEACompressionMode: "`'generic' \\| 'text' \\| 'font'`",
	SEACompressionResult: '`{ input, output, size }`',
	SEACompressionManifest: '`{ assets, total }`',
	SEAProgress: '`{ path, current, total }`',
	SEACompressionHandler: '`(result: SEACompressionResult) => void`',
	SEABrotliOptions: '`{ mode?, quality? }`',
	SEACompressionOptions: '`{ paths, mode?, quality? }`',
	SEAPlatform: '`{ executable, remove?, sign?, verify? }`',
	SEAShellOptions: '`{ cwd?, env?, timeout?, signal? }`',
	ExecutableFormat: "`'pe' \\| 'elf' \\| 'macho'`",
	ELFNoteHeader: '`{ header, total }`',
	ELFProgramHeader: '`{ type, flags, offset, vaddr, paddr, filesz, memsz, align }`',
	PEResourceLeaf:
		'`{ typeId, typeName, nameId, nameName, language, codePage, dataRVA, dataSize }`',
	PEResourceEntry: '`{ language, codePage, leafIndex, dataSize }`',
	PESection:
		'`{ name, virtualSize, virtualAddress, rawSize, rawOffset, characteristics, headerOffset }`',
	InjectorOptions: '`{ executable, resource, blob, fuse?, macho?, overwrite? }`',
	InjectorMachOOptions: '`{ segment? }`',
	InjectorInterface: '`{ format } plus inject`',
	AssetInput: '`{ key, content, compressed? }`',
	AssetInterface: '`{ key, content, compressed }`',
	AssetManagerEventMap: '`{ register, load, clear, error }`',
	AssetManagerOptions: '`{ on?, error?, root?, assets? }`',
	AssetManagerInterface:
		'`{ emitter, count } plus asset, assets, keys, register, load, clear, destroy`',
	SEAStatus: "`'idle' \\| 'active' \\| 'done' \\| 'error'`",
	SEAErrorCode:
		"`'PLATFORM' \\| 'ENTRY' \\| 'ASSET' \\| 'BLOB' \\| 'FORMAT' \\| 'INJECT' \\| 'ROOM' \\| 'FUSE' \\| 'SIGN' \\| 'SHELL' \\| 'TIMEOUT' \\| 'ABORT' \\| 'OUTPUT' \\| 'STATE' \\| 'BROWSER'`",
	SEAEntryFormat: "`'cjs' \\| 'esm'`",
	SEAEntryOptions: '`{ path, format? }`',
	SEABlobOptions: '`{ cache?, snapshot? }`',
	SEAEventMap: '`{ compress, progress, blob, assemble, complete, error }`',
	SEAOptions:
		'`{ on?, error?, name, entry, output, assets?, compression?, windows?, root?, signal?, timeout?, blob? }`',
	SEAWindowsOptions: '`{ terminal?, sign? }`',
	SEAWindowsSignOptions: '`{ file?, password?, thumbprint?, timestamp?, digest? }`',
	SEAResult:
		'`{ executable, platform, size, duration, compression?, signed, stripped, terminal? }`',
	SEAInterface: '`{ emitter, status } plus execute, destroy`',
}

/**
 * Splits one table row into its cells.
 *
 * @param line - The row, with its leading and trailing pipe.
 * @returns One entry per cell, trimmed.
 */
function splitRow(line) {
	const cells = line.split(SPLIT)
	return cells.slice(1, cells.length - 1).map((cell) => cell.trim())
}

/**
 * Rebuilds one table row from its cells.
 *
 * @param cells - The cells, in order.
 * @returns The row, with its leading and trailing pipe.
 */
function joinRow(cells) {
	return `| ${cells.join(' | ')} |`
}

/**
 * Inserts one column into every row of the table starting at `start`.
 *
 * @param lines - Every line of the guide.
 * @param start - The index of the table's header row.
 * @param header - The inserted column's header text.
 * @param values - Each row key mapped to its inserted cell.
 * @returns The index one past the table's last row.
 */
function insertColumn(lines, start, header, values) {
	let at = start
	while (at < lines.length && lines[at].startsWith('|')) {
		const cells = splitRow(lines[at])
		if (at === start) {
			cells.splice(2, 0, header)
		} else if (at === start + 1) {
			cells.splice(2, 0, '---')
		} else {
			const key = cells[0].replaceAll('`', '')
			const value = values[key]
			if (value === undefined) throw new Error(`no Shape for ${key}`)
			cells.splice(2, 0, value)
		}
		lines[at] = joinRow(cells)
		at += 1
	}
	return at
}

const lines = readFileSync(PATH, 'utf8').split('\n')
for (const [heading, header, values, sentence] of [
	['### Constants', 'Shape', CONSTANTS, CONSTANT_SENTENCE],
	['### Types', 'Shape', TYPES, TYPE_SENTENCE],
]) {
	const at = lines.indexOf(heading)
	if (at === -1) throw new Error(`no heading ${heading}`)
	let start = at + 1
	while (!lines[start].startsWith('|')) start += 1
	insertColumn(lines, start, header, values)
	lines.splice(start, 0, sentence, '')
}
writeFileSync(PATH, lines.join('\n'))
process.stdout.write('rewrote the Constants and Types tables\n')
