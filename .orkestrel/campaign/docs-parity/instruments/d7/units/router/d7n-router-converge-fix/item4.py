# R4 — restore every module-qualified `{@link}` the converge flattened to a code span.
from pathlib import Path

EDITS = [
	(
		'src/core/Group.ts',
		" * Represents a prefix-scoped registration handle over a `Router` — pure string\n"
		" * composition, no independent state or storage.\n",
		" * Represents a prefix-scoped registration handle over a {@link import('./Router.js').Router} —\n"
		" * pure string composition, no independent state or storage.\n",
	),
	(
		'src/core/DispatchGroup.ts',
		" * Represents a prefix-scoped registration handle over a `Dispatcher` — the\n"
		" * method-dimensioned counterpart of `Group`.\n",
		" * Represents a prefix-scoped registration handle over a\n"
		" * {@link import('./Dispatcher.js').Dispatcher} — the method-dimensioned counterpart of\n"
		" * `Group`.\n",
	),
	(
		'src/core/constants.ts',
		" * Lists the HTTP methods a `DispatcherInterface` registers routes under, in canonical\n"
		" * order — a frozen literal tuple, and the single source the `Method` type, `METHODS`,\n"
		" * and `parseMethod` are all derived from.\n",
		" * Lists the HTTP methods a {@link import('./types.js').DispatcherInterface} registers\n"
		" * routes under, in canonical order — a frozen literal tuple, and the single source the\n"
		" * {@link import('./types.js').Method} type, {@link METHODS}, and `parseMethod` are all\n"
		" * derived from.\n",
	),
	(
		'src/core/constants.ts',
		" * Holds every HTTP method a `DispatcherInterface` registers routes under as a\n"
		" * `ReadonlySet` — backs the registration guard (`add` rejects any `method` outside\n"
		" * this set) and the auto-`OPTIONS` `Allow` derivation.\n",
		" * Holds every HTTP method a {@link import('./types.js').DispatcherInterface} registers\n"
		" * routes under as a `ReadonlySet` — backs the registration guard (`add` rejects any\n"
		" * `method` outside this set) and the auto-`OPTIONS` `Allow` derivation.\n",
	),
	(
		'src/core/types.ts',
		" * Names the HTTP methods a {@link DispatcherInterface} dimensions dispatch over —\n"
		" * derived from `METHOD_LIST`, whose membership counterpart is `METHODS`.\n",
		" * Names the HTTP methods a {@link DispatcherInterface} dimensions dispatch over —\n"
		" * derived from {@link import('./constants.js').METHOD_LIST}, whose membership\n"
		" * counterpart is {@link import('./constants.js').METHODS}.\n",
	),
	(
		'src/core/types.ts',
		"\t * A registration is malformed when its path is not `/`-prefixed, its handler is not\n"
		"\t * a function, or its method sits outside `METHODS`. Path validation is delegated to\n"
		"\t * the underlying router's own guard.\n",
		"\t * A registration is malformed when its path is not `/`-prefixed, its handler is not\n"
		"\t * a function, or its method sits outside {@link import('./constants.js').METHODS}.\n"
		"\t * Path validation is delegated to the underlying router's own guard.\n",
	),
]

for name, old, new in EDITS:
	path = Path(name)
	text = path.read_text(encoding='utf8')
	if text.count(old) != 1:
		raise SystemExit(f'{name}: no unique match ({text.count(old)}) for {old[:60]!r}')
	path.write_text(text.replace(old, new), encoding='utf8')
	print(f'restored: {name}')
