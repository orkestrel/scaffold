# R2 — Rulings 12, 15, 18, and 19: one `Shape` idiom over the Surface tables that
# carry an interface, a type alias, or a constant.
import re
from pathlib import Path

path = Path('guides/router.md')
text = path.read_text(encoding='utf8')

CONVENTION = (
	"A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
	"optional member and `plus` introducing its call-signature members, and a type alias's own "
	"type literal with a union's arms escaped as `\\|`."
)

OLD_CONVENTION = (
	"A `Shape` cell holds a type alias's value and an interface's members, abbreviated with `…`\n"
	"where the declaration runs longer than the cell.\n"
)

START_CHARS = [chr(c) for c in range(ord('a'), ord('z') + 1)]
START_CHARS += [chr(c) for c in range(ord('A'), ord('Z') + 1)]
START_CHARS += ['_']
TAIL_CHARS = [str(d) for d in range(10)]

IDENTIFIER_START = ' \\| '.join(f"'{c}'" for c in START_CHARS)
IDENTIFIER_CHAR = ' \\| '.join(['IdentifierStartChar'] + [f"'{c}'" for c in TAIL_CHARS])

# Each cell is the declaration's own shape, read from `src/core/types.ts`,
# `src/browser/types.ts`, and `src/server/types.ts`.
SHAPES = {
	'PathParams': '`{ readonly [K in keyof PathParamsRaw<Path>]: PathParamsRaw<Path>[K] }`',
	'PathParamsRaw': (
		'``string extends Path ? Readonly<Record<string, string>> : '
		'Path extends `${infer Segment}/${infer Rest}` ? '
		'SegmentParam<Segment> & PathParamsRaw<Rest> : SegmentParam<Path>``'
	),
	'IdentifierStartChar': f'`{IDENTIFIER_START}`',
	'IdentifierChar': f'`{IDENTIFIER_CHAR}`',
	'TakeIdentifierTail': (
		'``S extends `${infer Head}${infer Tail}` ? Head extends IdentifierChar ? '
		'TakeIdentifierTail<Tail, `${Acc}${Head}`> : Acc : Acc``'
	),
	'IdentifierHead': (
		"``S extends `${infer Head}${infer Tail}` ? Head extends IdentifierStartChar ? "
		"TakeIdentifierTail<Tail, Head> : '' : ''``"
	),
	'SegmentParam': (
		"``Segment extends `:${infer Rest}` ? IdentifierHead<Rest> extends infer Name extends "
		"string ? Name extends '' ? unknown : { readonly [K in Name]: string } : unknown : "
		"Segment extends `*${infer Rest}` ? IdentifierHead<Rest> extends infer Name extends "
		"string ? Name extends '' ? unknown : { readonly [K in Name]: string } : unknown : unknown``"
	),
	'CompiledPath': '`{ regex, params }`',
	'RouteEntry': '`{ path, meta, name? }`',
	'RouterMatch': '`{ path, params, meta, name? }`',
	'AnswerHandler': '`(meta: Meta) => boolean`',
	'RouterOptions': '`{ entries?, sensitive?, key? }`',
	'RouterInterface': '`{ count } plus add, match, entries, group, clear`',
	'GroupInterface': '`{ prefix } plus add, group`',
	'Method': "`'GET' \\| 'POST' \\| 'PUT' \\| 'PATCH' \\| 'DELETE' \\| 'HEAD' \\| 'OPTIONS'`",
	'RouteContext': '`{ params, pattern, url, state }`',
	'RouteHandler': (
		'`(request: Request, context: RouteContext<Path, TState>) => '
		'Response \\| Promise<Response>`'
	),
	'RouteInput': '`{ method, path, handler, name? }`',
	'RouteRecord': '`{ method, handler, name? }`',
	'DispatchResult': (
		"`{ status: 'matched', match } \\| { status: 'unmethoded', allow } \\| "
		"{ status: 'unmatched' }`"
	),
	'DispatcherEventMap': '`{ match, miss }`',
	'DispatcherOptions': '`{ routes?, sensitive?, unmatched?, unmethoded?, on?, error? }`',
	'DispatcherInterface': '`{ router, emitter } plus add, group, match, handle, destroy`',
	'DispatchGroupInterface': '`{ prefix } plus add, group`',
	'NavigatorEventMap': '`{ navigate }`',
	'NavigatorOptions': (
		'`{ routes, history?, base?, fallback?, guard?, intercept?, sensitive?, on?, error? }`'
	),
	'NavigatorInterface': '`{ router, emitter, active } plus start, stop, navigate, match, destroy`',
	'RequestOptions': '`{ origin?, response? }`',
	'ListenerFunction': '`(request: IncomingMessage, response: ServerResponse) => void`',
	'StateFunction': '`(message: IncomingMessage) => TState`',
}

# Each constant's declared type, read from `dist/src/core/index.d.ts`.
CONSTANT_SHAPES = {
	'METHOD_LIST': "`readonly ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']`",
	'METHODS': '`ReadonlySet<string>`',
	'TIER_LITERAL': '`2`',
	'TIER_PARAM': '`1`',
	'TIER_WILDCARD': '`0`',
}

CELL = re.compile(r'(?<!\\)\|')


def splitRow(line: str) -> list[str]:
	parts = CELL.split(line.strip())
	return [part.strip() for part in parts[1:-1]]


def joinRow(cells: list[str]) -> str:
	return '| ' + ' | '.join(cells) + ' |'


def rewriteTypes(block: str) -> str:
	out = []
	for line in block.split('\n'):
		if not line.startswith('| `'):
			out.append(line)
			continue
		cells = splitRow(line)
		name = cells[0].strip('`')
		shape = SHAPES.get(name)
		if shape is None:
			raise SystemExit(f'no shape for type row {name}')
		out.append(joinRow([cells[0], cells[1], shape, cells[3]]))
	return '\n'.join(out)


def rewriteConstants(block: str) -> str:
	out = []
	for line in block.split('\n'):
		stripped = line.strip()
		if stripped.startswith('| ---'):
			out.append('| --- | --- | --- | --- |')
			continue
		if stripped.startswith('| API'):
			cells = splitRow(line)
			out.append(joinRow([cells[0], cells[1], 'Shape', cells[2]]))
			continue
		if not line.startswith('| `'):
			out.append(line)
			continue
		cells = splitRow(line)
		name = cells[0].strip('`')
		shape = CONSTANT_SHAPES.get(name)
		if shape is None:
			raise SystemExit(f'no shape for constant row {name}')
		out.append(joinRow([cells[0], cells[1], shape, cells[2]]))
	return '\n'.join(out)


def sliceSection(source: str, heading: str) -> tuple[int, int]:
	start = source.index(f'\n{heading}\n')
	end = source.index('\n### ', start + 1)
	return start, end


# The Types table: Ruling 15's one convention sentence, then every cell in the idiom.
if text.count(OLD_CONVENTION) != 1:
	raise SystemExit('the Types convention sentence did not match')
text = text.replace(OLD_CONVENTION, f'{CONVENTION}\n')

start = text.index('\n### Types\n')
end = text.index('\n\nThe `count` member of `RouterInterface`', start)
text = text[:start] + rewriteTypes(text[start:end]) + text[end:]

# The Constants table: Ruling 18's declared-type column and its own sentence.
start, end = sliceSection(text, '### Constants')
block = text[start:end].replace(
	'\n### Constants\n\n| API',
	"\n### Constants\n\nA `Shape` cell holds the constant's declared type.\n\n| API",
)
text = text[:start] + rewriteConstants(block) + text[end:]

# The members paragraph points at Methods; the cells now carry the members themselves.
OLD_TAIL = """The `count` member of `RouterInterface`, the `prefix` members of
`GroupInterface` / `DispatchGroupInterface`, the `router` / `emitter`
members of `DispatcherInterface`, and the `router` / `emitter` / `active`
members of `NavigatorInterface` are all `readonly` data members (Surface
rows, preceding) — the call-signature methods of `RouterInterface`,
`GroupInterface`, `DispatcherInterface`, `DispatchGroupInterface`, and
`NavigatorInterface` are documented under [Methods](#methods).
"""
NEW_TAIL = """The `count` member of `RouterInterface`, the `prefix` member of `GroupInterface` and
`DispatchGroupInterface`, the `router` and `emitter` members of `DispatcherInterface`, and the
`router`, `emitter`, and `active` members of `NavigatorInterface` are all `readonly` data members
(the preceding Surface rows) — the call-signature members each `Shape` cell names after `plus` are
documented under [Methods](#methods).
"""
if text.count(OLD_TAIL) != 1:
	raise SystemExit('the members paragraph did not match')
text = text.replace(OLD_TAIL, NEW_TAIL)

path.write_text(text, encoding='utf8')
print('item2 applied')
