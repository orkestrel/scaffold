# R3 — Ruling 9's demonstrating heading over the Surface fence, and the titled pair
# moved from `createListener` onto the primary factory `createRouter`.
from pathlib import Path

EDITS = [
	(
		'guides/router.md',
		"## Surface\n\nRegister routes on a `Router`, resolve the most-specific match, and dispatch\n",
		"## Surface\n\n### Register and match\n\nRegister routes on a `Router`, resolve the most-specific match, and dispatch\n",
	),
	(
		'src/core/factories.ts',
		" * @returns A {@link RouterInterface}\n *\n * @example\n",
		" * @returns A {@link RouterInterface}\n *\n * @example Register and match\n",
	),
	(
		'src/server/handlers.ts',
		" * @example Basic server\n",
		" * @example\n",
	),
]

for name, old, new in EDITS:
	path = Path(name)
	text = path.read_text(encoding='utf8')
	if text.count(old) != 1:
		raise SystemExit(f'{name}: no unique match ({text.count(old)}) for {old[:60]!r}')
	path.write_text(text.replace(old, new), encoding='utf8')
	print(f'retitled: {name}')
