import io

def edit(path, pairs):
	s = io.open(path, encoding='utf-8').read()
	for old, new in pairs:
		if s.count(old) != 1:
			raise SystemExit('not unique in %s: %r (%d)' % (path, old[:70], s.count(old)))
		s = s.replace(old, new)
	io.open(path, 'w', encoding='utf-8').write(s)
	print('edited', path)

edit('src/core/constants.ts', [
	(
		"/** Names the default definition validation policy for `createProgram` / `ProgramManager.add`. */",
		"/**\n"
		" * Names the default definition validation policy, `true`, for `createProgram` /\n"
		" * `ProgramManager.add`.\n"
		" */",
	),
	(
		"/** Lists every {@link Status} literal — the source the union and its guard derive from. */",
		"/**\n"
		" * Lists every {@link Status} literal in tally order — the source the union and its\n"
		" * guard derive from.\n"
		" */",
	),
	(
		"/** Names the reserved working-subject key a batch's aggregate projection is written under. */",
		"/**\n"
		" * Names the reserved working-subject key a batch's aggregate projection is written\n"
		" * under, `'aggregate'`.\n"
		" */",
	),
	(
		"/** Names the reserved working-subject key the authority's outcome projection is written under. */",
		"/**\n"
		" * Names the reserved working-subject key the authority's outcome projection is\n"
		" * written under, `'outcome'`.\n"
		" */",
	),
])

edit('src/core/errors.ts', [
	(
		" * Reports a coded programmer error thrown by the program layer.\n",
		" * Reports a coded programmer error thrown by the program layer, carrying a\n"
		" * machine-readable code and an optional context and cause.\n",
	),
])

edit('src/core/factories.ts', [
	(
		" * Creates one compiled program over a qualifier and rater.\n",
		" * Creates one compiled {@link ProgramInterface} over a qualifier and rater.\n",
	),
	(
		" * Creates one ordered manager over compiled programs.\n",
		" * Creates one ordered {@link ProgramManagerInterface} over compiled programs.\n",
	),
])

edit('src/core/programs/Program.ts', [
	(
		" * Composes one qualifier and one rater over a shared reason engine and executes\n"
		" * single subjects or aggregate-aware batches.\n",
		" * Composes one qualifier and one rater over a shared reason engine, compiling one\n"
		" * authored definition and executing single subjects or aggregate-aware batches.\n",
	),
])

edit('src/core/helpers.ts', [
	(
		" * Builds a fresh {@link Notice}.\n"
		" *\n"
		" * @param id - The notice id",
		" * Builds a fresh {@link Notice}.\n"
		" *\n"
		" * @remarks\n"
		" * An absent `scope` is omitted entirely rather than stored as `undefined`.\n"
		" *\n"
		" * @param id - The notice id",
	),
	(
		" * Builds a fresh {@link AggregateDefinition}.\n"
		" *\n"
		" * @param fields - The aggregate fields to sum across a batch",
		" * Builds a fresh {@link AggregateDefinition}.\n"
		" *\n"
		" * @remarks\n"
		" * `fields` is copied into a fresh array; an absent `partition` or `gates` is\n"
		" * omitted entirely rather than stored as `undefined`.\n"
		" *\n"
		" * @param fields - The aggregate fields to sum across a batch",
	),
])
