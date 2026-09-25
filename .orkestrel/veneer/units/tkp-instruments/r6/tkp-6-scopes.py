# TOKEN-PROOFS round 6 scope reading. Reads dist/src/styles/index.css, collects every custom property
# the `:root` blocks and each `[data-bs-theme=light]` and `[data-bs-theme=dark]` block declare, and
# lists, per mode scope, the names that scope declares with the same value the `:root` blocks give
# them, then the names each mode scope declares with a value different from `:root`'s, and the names
# `:root` declares that neither mode scope declares. Derived from tmp/units/tkp-2-probe-scopes.py.
# The control at the end reruns the comparison with one `:root` value perturbed and must report that
# name as differing.
import re

CSS = open('/home/user/veneer-tkp/dist/src/styles/index.css').read()


def collect(selector, css):
	values = {}
	blocks = 0
	for match in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
		selectors = [part.strip() for part in match.group(1).split(',')]
		if selector not in selectors:
			continue
		blocks += 1
		for name, value in re.findall(r'(--[\w-]+)\s*:\s*([^;]*)', match.group(2)):
			values[name] = value.strip()
	return values, blocks


def compare(css, label):
	root, root_blocks = collect(':root', css)
	print(f'[{label}] :root blocks={root_blocks} names={len(root)}')
	scopes = {}
	for mode in ('light', 'dark'):
		scope, blocks = collect(f'[data-bs-theme={mode}]', css)
		scopes[mode] = scope
		same = sorted(name for name in scope if name in root and root[name] == scope[name])
		differ = sorted(name for name in scope if name in root and root[name] != scope[name])
		absent = sorted(name for name in scope if name not in root)
		print(f'[{label}] {mode}: blocks={blocks} names={len(scope)}')
		print(f'[{label}] {mode} same-as-root: ' + ' '.join(f'{name}={scope[name]}' for name in same))
		print(f'[{label}] {mode} differs-from-root: ' + ' '.join(differ))
		print(f'[{label}] {mode} not-on-root: ' + ' '.join(absent))
	both_same = sorted(
		name
		for name in scopes['light']
		if name in scopes['dark']
		and name in root
		and root[name] == scopes['light'][name] == scopes['dark'][name]
	)
	print(f'[{label}] same value at :root and in both mode scopes: ' + ' '.join(both_same))
	light_only_same = sorted(
		name
		for name in scopes['light']
		if name in root and root[name] == scopes['light'][name] and name not in both_same
	)
	print(f'[{label}] light scope same as :root, not in both-same: ' + ' '.join(light_only_same))
	root_only = sorted(name for name in root if name not in scopes['light'] and name not in scopes['dark'])
	print(f'[{label}] declared at :root and in neither mode scope: {len(root_only)} names')
	return both_same


found = compare(CSS, 'built')
print()
# Control: perturb the first both-same name's value inside the first `:root` block; the comparison
# must drop it from the both-same list.
if found:
	target = found[0]
	start = CSS.index(':root{')
	end = CSS.index('}', start)
	block = CSS[start:end]
	perturbed = re.sub(re.escape(target) + r':[^;}]*', target + ':999%', block, count=1)
	control = CSS[:start] + perturbed + CSS[end:]
	after = compare(control, 'control')
	print(f'control target {target} dropped from both-same: {target not in after}')
