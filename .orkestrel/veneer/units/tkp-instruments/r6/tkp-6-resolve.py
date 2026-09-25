# TOKEN-PROOFS round 6 resolved scope reading. Reads dist/src/styles/index.css and resolves every
# custom property the way an element resolves it: the `:root` blocks resolve against themselves, and
# each `[data-bs-theme=light]` or `[data-bs-theme=dark]` scope resolves its own declarations against
# its own resolved values plus the values it inherits from the root. A `var()` whose referenced value
# is `initial` or undeclared takes its fallback. It then lists the names each mode scope declares
# again whose resolved value is the same in the root, the light scope, and the dark scope — a name no
# mode changes — and the names that differ between the modes. The control perturbs one such name's
# dark declaration and must move it to the differing list.
import re
import sys

CSS = open('/home/user/veneer-tkp/dist/src/styles/index.css').read()


def collect(selector, css):
	values = {}
	for match in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
		selectors = [part.strip() for part in match.group(1).split(',')]
		if selector not in selectors:
			continue
		for declaration in split_declarations(match.group(2)):
			name, _, value = declaration.partition(':')
			name = name.strip()
			if name.startswith('--'):
				values[name] = value.strip()
	return values


def split_declarations(body):
	parts, depth, current = [], 0, ''
	for char in body:
		if char == '(':
			depth += 1
		elif char == ')':
			depth -= 1
		if char == ';' and depth == 0:
			parts.append(current)
			current = ''
		else:
			current += char
	if current.strip():
		parts.append(current)
	return parts


def substitute(value, lookup, trail):
	out = ''
	index = 0
	while True:
		start = value.find('var(', index)
		if start < 0:
			return out + value[index:]
		out += value[index:start]
		depth, cursor = 0, start + 3
		while True:
			if value[cursor] == '(':
				depth += 1
			elif value[cursor] == ')':
				depth -= 1
				if depth == 0:
					break
			cursor += 1
		inner = value[start + 4 : cursor]
		name, comma, fallback = inner.partition(',')
		name = name.strip()
		resolved = lookup(name, trail)
		if resolved is None or resolved == 'initial':
			if not comma:
				return None
			resolved = substitute(fallback.strip(), lookup, trail)
			if resolved is None:
				return None
		out += resolved
		index = cursor + 1


def resolver(declared, parent):
	cache = {}

	def lookup(name, trail):
		if name in cache:
			return cache[name]
		if name not in declared:
			return parent(name, trail) if parent else None
		if name in trail:
			return None
		raw = declared[name]
		result = raw if raw == 'initial' else substitute(raw, lookup, trail | {name})
		cache[name] = result
		return result

	return lookup


def normalize(value):
	return None if value is None else re.sub(r'\s+', ' ', value).strip()


def read(css, label):
	root = collect(':root', css)
	light = collect('[data-bs-theme=light]', css)
	dark = collect('[data-bs-theme=dark]', css)
	root_lookup = resolver(root, None)
	light_lookup = resolver(light, root_lookup)
	dark_lookup = resolver(dark, root_lookup)
	same, differ = [], []
	for name in sorted(set(light) | set(dark)):
		readings = [normalize(lookup(name, frozenset())) for lookup in (root_lookup, light_lookup, dark_lookup)]
		(same if readings[0] == readings[1] == readings[2] else differ).append((name, readings))
	print(f'[{label}] names the light scope declares: {len(light)}; the dark scope: {len(dark)}; set equal: {set(light) == set(dark)}')
	print(f'[{label}] light scope names absent from :root: {sorted(set(light) - set(root))}')
	print(f'[{label}] declared again in the mode scopes with one resolved value in root, light, and dark:')
	for name, readings in same:
		print(f'  {name}: {readings[0]!r}')
	print(f'[{label}] resolved differently between the modes: {len(differ)} names')
	for name, readings in differ:
		print(f'  {name}: light={readings[1]!r} dark={readings[2]!r}')
	light_vs_root = [name for name, readings in same + differ if readings[0] != readings[1]]
	print(f'[{label}] names whose light-scope value differs from root: {light_vs_root}')
	return [name for name, _ in same]


found = read(CSS, 'built')
print()
target = '--vn-state-hover'
start = CSS.index('[data-bs-theme=dark]{')
end = CSS.index('}', start)
block = CSS[start:end].replace(target + ':12%', target + ':13%', 1)
control = read(CSS[:start] + block + CSS[end:], 'control')
print(f'control: {target} same before={target in found} same after perturbing dark={target in control}')
sys.exit(0 if target in found and target not in control else 1)
