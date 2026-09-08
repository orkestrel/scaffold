import io
p = 'guides/program.md'
s = io.open(p, encoding='utf-8').read()

def cut(start_marker, end_marker, new):
	global s
	a = s.index(start_marker)
	b = s.index(end_marker, a)
	s = s[:a] + new + s[b:]

# --- Constants: gain a Shape column under the constants convention sentence.
cut(
	'| API                        | Kind  | Summary                                             |',
	'Every constant is `Object.freeze`d.',
	"A `Shape` cell holds the constant's declared type.\n\n"
	'| API | Kind | Shape | Summary |\n'
	'| --- | --- | --- | --- |\n'
	"| `DEFAULT_PROGRAM_VALIDATE` | const | `true` |  |\n"
	"| `STATUSES` | const | `readonly ['ineligible', 'referral', 'conditional', 'unrated', 'eligible']` |  |\n"
	'| `ELIGIBILITY_DECISIONS` | const | `Readonly<Record<Eligibility, Decision>>` |  |\n'
	"| `AGGREGATE_KEY` | const | `'aggregate'` |  |\n"
	"| `OUTCOME_KEY` | const | `'outcome'` |  |\n"
	'\n',
)

# --- The prose under the Constants table: the freeze claim the code falsifies, and
# the two sentences the Summary cells now carry.
cut(
	'Every constant is `Object.freeze`d.',
	'### Errors',
	'`STATUSES` and `ELIGIBILITY_DECISIONS` are `Object.freeze`d; the reserved keys and\n'
	'the validation default are primitives. The reserved keys exist only for composed\n'
	'program execution — neither sibling package reserves these subject keys.\n'
	'`completeTallies` writes every `Status` member as a literal record, and `isTallies`\n'
	'checks membership through `STATUSES`.\n\n',
)

# --- Errors: a mixed class-and-guard table, so no Shape column; the header is already
# `Summary` and only the cells converge.
cut(
	'| `ProgramError`   | class    | Coded programmer error with optional context and cause. |',
	'```ts\nimport { isProgramError, ProgramError }',
	'| `ProgramError` | class |  |\n| `isProgramError` | function |  |\n\n',
)

# --- Validators: a dedicated guard table, so `Narrows to` becomes `Shape` holding the
# narrowed type, under the base sentence plus the guard sentence.
guards = [
	('`isDecision`', 'const', '`Decision`'),
	('`isStatus`', 'const', '`Status`'),
	('`isProgramEffect`', 'const', '`ProgramEffect`'),
	('`isNotice`', 'function', '`Notice`'),
	('`isAggregateDefinition`', 'function', '`AggregateDefinition`'),
	('`isProgramDefinition`', 'function', '`ProgramDefinition`'),
	('`isProgramSums`', 'function', '`Readonly<Record<string, number>>`'),
	('`isDetermination`', 'const', '`Determination`'),
	('`isAggregateGroup`', 'const', '`AggregateGroup`'),
	('`isTally`', 'const', '`Tally`'),
	('`isTallies`', 'function', '`Readonly<Record<Status, Tally>>`'),
	('`isProgramResult`', 'const', '`ProgramResult`'),
	('`isAggregateResult`', 'const', '`AggregateResult`'),
	('`isProgramValidationResult`', 'const', '`ProgramValidationResult`'),
]
table = '| API | Kind | Shape | Summary |\n| --- | --- | --- | --- |\n'
for name, kind, shape in guards:
	table += '| %s | %s | %s |  |\n' % (name, kind, shape)
cut(
	'| API                         | Kind     | Narrows to                         |',
	'`isProgramSums` checks every own string-named member',
	"A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
	"optional member and `plus` introducing its call-signature members, and a type alias's own "
	"type literal with a union's arms escaped as `\\|`. In a guard table a `Shape` cell holds "
	'the type the guard narrows to.\n\n' + table + '\n',
)

# --- Helpers: the header is already `Summary`; only the cells converge.
helpers = [
	'selectProgramLines', 'deriveStatus', 'decideEligibility', 'buildNoticeDeterminations',
	'buildLimitDeterminations', 'buildProgramResult', 'buildOutcomeProjection',
	'buildQualificationSubject', 'findMissingScopes', 'hasReservedKey', 'assertProgramSubject',
	'assertProgramDefinition', 'validateProgramDefinition', 'formatGroupKey', 'sumFields',
	'aggregateSums', 'aggregateGroups', 'buildAggregateProjection', 'buildAggregateRecord',
	'buildEmptySums', 'buildEmptyTallies', 'completeTallies', 'tallySubject',
	'buildAggregateResult', 'buildProgramDefinition', 'buildNotice', 'buildAggregateDefinition',
]
table = '| API | Kind | Summary |\n| --- | --- | --- |\n'
for name in helpers:
	table += '| `%s` | function |  |\n' % name
cut(
	'| API                         | Kind     | Summary ',
	'The per-subject orchestration leaves guard the subject',
	table + '\n',
)

# --- Factories: `Builds…` becomes `Summary`.
cut(
	'| API                    | Kind     | Builds…                                |',
	'The factories compile entities.',
	'| API | Kind | Summary |\n| --- | --- | --- |\n'
	'| `createProgram` | function |  |\n'
	'| `createProgramManager` | function |  |\n\n',
)

# --- Entities becomes Classes: every row's Kind is `class`.
cut(
	'### Entities\n',
	'The package has no entity named `Rater`.',
	'### Classes\n\n'
	'| API | Kind | Summary |\n| --- | --- | --- |\n'
	'| `Program` | class |  |\n'
	'| `ProgramManager` | class |  |\n\n',
)

# --- ProgramInterface methods: `Behavior` becomes `Summary`.
cut(
	'| Method     | Returns                              | Behavior ',
	'```ts\nconst aggregate = program.execute(subjects)',
	'| Method | Returns | Summary |\n| --- | --- | --- |\n'
	'| `execute` | `AggregateResult` or `ProgramResult` |  |\n'
	'| `validate` | `ProgramValidationResult` |  |\n'
	'| `destroy` | `void` |  |\n\n',
)

# --- ProgramManagerInterface methods: `Behavior` becomes `Summary`.
cut(
	'| Method     | Returns                         | Behavior ',
	'```ts\nconst manager = createProgramManager()',
	'| Method | Returns | Summary |\n| --- | --- | --- |\n'
	'| `has` | `boolean` |  |\n'
	'| `program` | `ProgramInterface \\| undefined` |  |\n'
	'| `programs` | `readonly ProgramInterface[]` |  |\n'
	'| `add` | `ProgramInterface` |  |\n'
	'| `remove` | `boolean` or `void` |  |\n'
	'| `destroy` | `void` |  |\n\n',
)

io.open(p, 'w', encoding='utf-8').write(s)
print('tables rewritten')
