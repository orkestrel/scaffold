"""Rebuilds each Surface and Methods table of the guide into the headers the gate reads.

Splits a row on a pipe not preceded by a backslash, so a `\\|` inside a union
literal stays inside its cell. Writes single-space padding; oxfmt realigns.
"""
import re, sys, json

ROOT = '/home/user/fleet/browser/'
GUIDE = ROOT + 'guides/browser.md'
TMP = ROOT + 'tmp/d7n-browser-converge/'

CELL = re.compile(r'(?<!\\)\|')

def split_row(line):
    parts = CELL.split(line)
    assert parts[0].strip() == '' and parts[-1].strip() == '', line
    return [p.strip() for p in parts[1:-1]]

def join_row(cells):
    return '| ' + ' | '.join(cells) + ' |'

def rule(n):
    return '| ' + ' | '.join(['---'] * n) + ' |'

def load_shapes():
    shapes = {}
    for name in ('shapes-core.txt', 'shapes-server.txt'):
        for line in open(TMP + name):
            key, kind, base, shape = line.rstrip('\n').split('\t')
            shapes[key] = (kind, base, shape)
    return shapes

def load_source_text():
    """Reads each key's source-side description from the current docs worklist."""
    decoder = json.JSONDecoder()
    out = {}
    for raw in open(TMP + 'docs-01.txt'):
        line = raw.rstrip('\n')
        if not line.startswith('guides/browser.md '):
            continue
        head, sep, rest = line.partition(': guide ')
        if sep == '':
            continue
        name = head.split(' ')[-1]
        if rest.startswith('absent'):
            rest = rest[len('absent'):]
        else:
            _, at = decoder.raw_decode(rest)
            rest = rest[at:]
        assert rest.startswith(' source '), line
        right = rest[len(' source '):]
        if right == 'absent':
            continue
        out[name] = decoder.raw_decode(right)[0]
    return out

lines = open(GUIDE).read().split('\n')
shapes = load_shapes()
OVERRIDES = {
	'BrowserLocatorClickOptions': ('interface', 'BrowserPointerOptions, BrowserClickOptions', '`{}`'),
	'BrowserLocatorDragOptions': ('interface', 'BrowserPointerOptions, BrowserDragOptions', '`{}`'),
	'BrowserLocatorTypeOptions': ('interface', 'BrowserActionOptions, BrowserInputOptions', '`{}`'),
	'BrowserCodegenAction': (
		'type',
		'',
		"`{ action: 'navigate', url } \\| { action: 'click', selector } \\| "
		"{ action: 'fill', selector, value } \\| { action: 'select', selector, values }`",
	),
}
shapes.update(OVERRIDES)
source_text = load_source_text()

def find_table(header_needle, occurrence=0):
    """Returns (start, end) line indexes of the table whose header carries the needle."""
    hits = [i for i, l in enumerate(lines) if l.startswith('|') and header_needle in l]
    assert len(hits) > occurrence, (header_needle, len(hits))
    start = hits[occurrence]
    end = start + 2
    while end < len(lines) and lines[end].startswith('|'):
        end += 1
    return start, end

def shape_cell(name):
    kind, base, shape = shapes[name]
    body = shape.strip('`')
    if base:
        bases = ' plus '.join(p.strip() for p in base.split(','))
        if body == '{}':
            return '`' + bases + '`'
        if body.startswith('{} plus '):
            return '`' + bases + ' plus ' + body[8:] + '`'
        return '`' + bases + ' plus ' + body + '`'
    return '`' + body + '`'

def summary_cell(name, fallback):
    text = source_text.get(name)
    return text if text is not None else fallback

def rebuild(needle, transform, occurrence=0):
    start, end = find_table(needle, occurrence)
    header = split_row(lines[start])
    rows = [split_row(l) for l in lines[start + 2:end]]
    new_header, new_rows = transform(header, rows)
    block = [join_row(new_header), rule(len(new_header))] + [join_row(r) for r in new_rows]
    lines[start:end] = block
    return len(new_rows)

def insert_sentence(needle, sentence, occurrence=0):
    start, _ = find_table(needle, occurrence)
    assert lines[start - 1] == '', repr(lines[start - 1])
    lines[start - 1:start - 1] = [sentence, '']

def table_after(heading, occurrence=0, index=0):
    """Returns (start, end) of the table under the given heading occurrence."""
    hits = [i for i, l in enumerate(lines) if l == heading]
    assert len(hits) > occurrence, (heading, len(hits))
    at = hits[occurrence]
    seen = -1
    i = at + 1
    while i < len(lines):
        if lines[i].startswith('#'):
            raise AssertionError('no table under ' + heading)
        if lines[i].startswith('|'):
            seen += 1
            start = i
            end = i + 2
            while end < len(lines) and lines[end].startswith('|'):
                end += 1
            if seen == index:
                return start, end
            i = end
            continue
        i += 1
    raise AssertionError('no table under ' + heading)

def rebuild_at(heading, transform, occurrence=0, index=0):
    start, end = table_after(heading, occurrence, index)
    header = split_row(lines[start])
    rows = [split_row(l) for l in lines[start + 2:end]]
    new_header, new_rows = transform(header, rows)
    block = [join_row(new_header), rule(len(new_header))] + [join_row(r) for r in new_rows]
    lines[start:end] = block

def sentence_at(heading, sentence, occurrence=0, index=0):
    start, _ = table_after(heading, occurrence, index)
    assert lines[start - 1] == '', repr(lines[start - 1])
    lines[start - 1:start - 1] = [sentence, '']

def key_of(cells):
    return cells[0].strip('`')

# --- guards: `Narrows to` becomes `Shape`, and the table gains `Summary`.
def guard(header, rows):
    assert header == ['Guard', 'Kind', 'Narrows to'], header
    out = [[c[0], c[1], c[2], summary_cell(key_of(c), '')] for c in rows]
    for row in out:
        assert row[3] != '', row
    return ['Guard', 'Kind', 'Shape', 'Summary'], out

# --- errors: `Extends` and `Code` give way to `Signature`; the code moves to the block.
def error(header, rows):
    assert header == ['Error', 'Kind', 'Extends', 'Code', 'Summary'], header
    out = [[c[0], c[1], '`extends ' + c[2].strip('`') + '`', c[4]] for c in rows]
    return ['Error', 'Kind', 'Signature', 'Summary'], out

# --- constants: `Value` gives way to the declared type in `Shape` plus `Summary`.
def constant(types):
    def run(header, rows):
        assert header == ['Constant', 'Kind', 'Value'], header
        out = []
        for c in rows:
            name = key_of(c)
            assert name in types, name
            out.append([c[0], c[1], '`' + types[name] + '`', summary_cell(name, c[2])])
        return ['Constant', 'Kind', 'Shape', 'Summary'], out
    return run

# --- types: the `Shape` cell takes the idiom and the table gains `Summary`.
def typed(header, rows):
    assert header == ['Type', 'Kind', 'Shape'], header
    out = []
    for c in rows:
        name = key_of(c)
        out.append([c[0], c[1], shape_cell(name), summary_cell(name, c[2])])
    return ['Type', 'Kind', 'Shape', 'Summary'], out

# --- extended types: the table gains `Shape` between `Kind` and `Summary`.
def extended(header, rows):
    assert header == ['API', 'Kind', 'Summary'], header
    out = [[c[0], c[1], shape_cell(key_of(c)), c[2]] for c in rows]
    return ['API', 'Kind', 'Shape', 'Summary'], out

CORE_CONSTANT_TYPES = {
	'BROWSER_DEFAULT_TIMEOUT_MS': 'number',
	'BROWSER_WAIT_POLL_INTERVAL_MS': 'number',
	'BROWSER_DEFAULT_VIEWPORT_WIDTH': 'number',
	'BROWSER_DEFAULT_VIEWPORT_HEIGHT': 'number',
	'BROWSER_CODEGEN_BINDING_NAME': 'string',
	'BROWSER_CODEGEN_SOURCE': 'string',
	'BASE64_CHARS': 'string',
	'BASE64_LOOKUP': 'Readonly<Record<string, number>>',
	'BROWSER_RESULT_LIMIT': 'number',
	'BROWSER_RESULT_LIMIT_SENTINEL_PREFIX': 'string',
	'BROWSER_RESULT_LIMIT_PATTERN': 'RegExp',
	'BROWSER_STOP_LOADING_TIMEOUT_MS': 'number',
	'BROWSER_FRAME_WORLD_NAME': 'string',
	'BROWSER_SNAPSHOT_NODE_LIMIT': 'number',
}
SERVER_CONSTANT_TYPES = {
	'BROWSER_DEFAULT_CDP_PORT': 'number',
	'BROWSER_DEFAULT_HOST': 'string',
	'BROWSER_CDP_PROTOCOL': 'string',
	'BROWSER_CDP_VERSION_PATH': 'string',
	'BROWSER_CDP_LIST_PATH': 'string',
	'BROWSER_LAUNCH_ARGS': 'readonly string[]',
	'BROWSER_HEADLESS_ARG': 'string',
	'BROWSER_PROFILE_PREFIX': 'string',
	'BROWSER_KILL_GRACE_MS': 'number',
	'BROWSER_PORT_PROBE_TIMEOUT_MS': 'number',
	'BROWSER_TRANSPORT_LOSS_DEFER_MS': 'number',
	'BROWSER_PROCESS_EXIT_CAUSE': 'string',
	'BROWSER_TRANSPORT_LOSS_CAUSE': 'string',
	'BROWSER_ENV_PATH_KEYS': 'readonly string[]',
	'BROWSER_EXECUTABLE_PATHS': 'Readonly<Record<string, readonly string[]>>',
	'BROWSER_WINDOWS_SUFFIXES': 'readonly string[]',
	'BROWSER_WINDOWS_ROOT_FALLBACKS': 'Readonly<Record<string, string>>',
	'BROWSER_EXECUTABLE_NAMES': 'readonly string[]',
	'BROWSER_STORE_ENV_KEY': 'string',
	'BROWSER_STORE_DEFAULT_DIRS': 'readonly string[]',
	'BROWSER_STORE_CACHE_DIRS': 'Readonly<Record<string, string>>',
	'BROWSER_STORE_LINK_NAME': 'string',
	'BROWSER_STORE_GLOBS': 'Readonly<Record<string, string>>',
	'BROWSER_ENGINE_HINTS': 'Readonly<Record<BrowserEngine, readonly string[]>>',
}

IDIOM = (
	"A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
	'optional member and `plus` introducing its call-signature members, and a type alias\'s own '
	"type literal with a union's arms escaped as `\\|`."
)
EXTENDS = 'An extended interface\'s name comes before `plus`, with the members it adds after.'
CONSTANT_IDIOM = "A `Shape` cell holds the constant's declared type."
GUARD_IDIOM = 'In a guard table a `Shape` cell holds the type the guard narrows to.'

rebuild_at('#### Constants', constant(CORE_CONSTANT_TYPES), 0)
rebuild_at('#### Constants', constant(SERVER_CONSTANT_TYPES), 1)
rebuild_at('#### Errors', error, 0, 0)
rebuild_at('#### Errors', error, 1, 0)
rebuild_at('#### Errors', guard, 0, 1)
rebuild_at('#### Errors', guard, 1, 1)
rebuild_at('#### Types', typed, 0)
rebuild_at('#### Types', typed, 1)
rebuild_at('#### Extended types', extended, 0)

sentence_at('#### Extended types', IDIOM + ' ' + EXTENDS, 0)
sentence_at('#### Types', IDIOM, 1)
sentence_at('#### Types', IDIOM + ' ' + EXTENDS, 0)
sentence_at('#### Errors', GUARD_IDIOM, 1, 1)
sentence_at('#### Errors', GUARD_IDIOM, 0, 1)
sentence_at('#### Constants', CONSTANT_IDIOM, 1)
sentence_at('#### Constants', CONSTANT_IDIOM, 0)

renamed = 0
for i, l in enumerate(lines):
	if l == '#### Entities':
		lines[i] = '#### Classes'
		renamed += 1
assert renamed == 2, renamed

open(GUIDE, 'w').write('\n'.join(lines))
print('rebuilt')
