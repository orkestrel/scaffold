import io

def edit(path, pairs):
	s = io.open(path, encoding='utf-8').read()
	for old, new in pairs:
		if s.count(old) != 1:
			raise SystemExit('not unique in %s: %r (%d)' % (path, old[:60], s.count(old)))
		s = s.replace(old, new)
	io.open(path, 'w', encoding='utf-8').write(s)
	print('swept', path)

edit('src/core/programs/Program.ts', [
	(
		" * only its line before the first rating call. The rater always receives the\n"
		" * ORIGINAL subject; the qualifier's aggregate projection stays private. When no\n"
		" * qualifier, rater, or engine is injected the program creates ONE shared\n"
		" * quantitative-plus-logical engine, injects it into the qualifier and rater it\n",
		" * only its line before the first rating call. The rater always receives the\n"
		" * original subject; the qualifier's aggregate projection stays private. When no\n"
		" * qualifier, rater, or engine is injected the program creates one shared\n"
		" * quantitative-plus-logical engine, injects it into the qualifier and rater it\n",
	),
	(
		" * as its cause. `destroy()` is idempotent and REENTRANCY-SAFE — the destroyed\n"
		" * flag is set BEFORE any teardown or the `destroy` event fires, so a listener\n",
		" * as its cause. `destroy()` is idempotent and reentrancy-safe — the destroyed\n"
		" * flag is set before any teardown or the `destroy` event fires, so a listener\n",
	),
])

edit('src/core/factories.ts', [
	(
		" * {@link DEFAULT_PROGRAM_VALIDATE}. A standalone program creates and\n"
		" * OWNS one shared quantitative-plus-logical reason engine and injects it into the\n"
		" * qualifier and rater it creates; injected dependencies remain caller-owned.\n",
		" * {@link DEFAULT_PROGRAM_VALIDATE}. A standalone program creates and owns one\n"
		" * shared quantitative-plus-logical reason engine and injects it into the qualifier\n"
		" * and rater it creates; injected dependencies remain caller-owned.\n",
	),
])

edit('src/core/errors.ts', [
	(
		" * `DUPLICATE` — a program id collision on `ProgramManager.add`, or a duplicate\n"
		" * authored rating-line or notice id. `MISSING` — an\n"
		" * authored notice or qualification ruling scope names no rating line.\n",
		" * `DUPLICATE` — a program id collision on `ProgramManager.add`, or a duplicate\n"
		" * authored rating-line or notice id. `MISSING` — an authored notice or\n"
		" * qualification ruling scope names no rating line.\n",
	),
])
