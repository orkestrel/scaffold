# Applies or restores one named round-2 mutation of the UTIL-FRAMES unit. Usage:
#   python3 tmp/units/fu-mutate-2.py apply <name>
#   python3 tmp/units/fu-mutate-2.py restore <name>
# Each mutation replaces one exact string in one file, after copying the file to
# tmp/units/fu-mutation-2-backup/<name>; restore copies that backup back, which undoes exactly the
# mutation and nothing else. The stylesheet mutations are the ones brief 2 names, and they are the
# only writes to a file outside the unit's owned set.
import os, shutil, sys

ROOT = '/home/user/veneer-fu'
TABLES = open(os.path.join(ROOT, 'tmp/units/fu2-tables-block.txt')).read()
MUTATIONS = {
	'emphasis-state-rule-deleted': (
		'src/styles/utilities/_link.scss',
		"""		&:hover,
		&:focus {
			color: rgba(var(--vn-text-emphasis-rgb), var(--bs-link-opacity, 0.75)) !important;
			text-decoration-color: rgba(
				var(--vn-text-emphasis-rgb),
				var(--bs-link-underline-opacity, 0.75)
			) !important;
		}
""",
		'',
	),
	'role-link-hover-color': (
		'src/styles/utilities/_link.scss',
		"""	.link-body-emphasis {""",
		"""	@each $role in $aliased {
		.link-#{$role}:hover {
			color: color-mix(
				in srgb,
				var(--vn-palette-black-base) 20%,
				rgb(var(--vn-color-#{$role}-rgb))
			) !important;
		}
	}

	.link-body-emphasis {""",
	),
	'link-tables-absent': ('tests/setup.ts', TABLES, ''),
}

action, name = sys.argv[1], sys.argv[2]
path, old, new = MUTATIONS[name]
target = os.path.join(ROOT, path)
backup = os.path.join(ROOT, 'tmp/units/fu-mutation-2-backup', name)
if action == 'apply':
	os.makedirs(os.path.dirname(backup), exist_ok=True)
	shutil.copyfile(target, backup)
	text = open(target).read()
	if text.count(old) != 1:
		sys.exit(f'{name}: the mutated site occurs {text.count(old)} times in {path}')
	open(target, 'w').write(text.replace(old, new))
	print(f'applied {name} to {path}')
elif action == 'restore':
	shutil.copyfile(backup, target)
	os.remove(backup)
	print(f'restored {path} after {name}')
