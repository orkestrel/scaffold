import io
p = 'guides/program.md'
s = io.open(p, encoding='utf-8').read()
start = s.index('| Type                      | Kind      | Shape')
end = s.index('Every public data member is `readonly`')
rows = [
	('`Decision`', 'type', "`'approved' \\| 'denied' \\| 'submitted'`"),
	('`Status`', 'type', "`'ineligible' \\| 'referral' \\| 'conditional' \\| 'unrated' \\| 'eligible'`"),
	('`ProgramEffect`', 'type', "`'notice' \\| 'limit'`"),
	('`ProgramErrorCode`', 'type', "`'DUPLICATE' \\| 'MISSING' \\| 'DEFINITION' \\| 'MISMATCH' \\| 'RESERVED' \\| 'DESTROYED'`"),
	('`ProgramInput`', 'interface', '`{ description?, notices?, authority?, aggregate?, metadata? }`'),
	('`NoticeInput`', 'interface', '`{ scope? }`'),
	('`AggregateInput`', 'interface', '`{ partition?, gates? }`'),
	('`Notice`', 'interface', '`{ id, message, scope? }`'),
	('`Determination`', 'interface', '`{ id, effect, applied, scope?, message?, premises }`'),
	('`AggregateDefinition`', 'interface', '`{ fields, partition?, gates? }`'),
	('`AggregateProjection`', 'interface', '`{ count, sums, group? }`'),
	('`AggregateGroup`', 'interface', '`{ key, count, sums }`'),
	('`Tally`', 'interface', '`{ count, sums }`'),
	('`ProgramDefinition`', 'interface', '`{ id, name, description?, qualification, rating?, notices?, authority?, aggregate?, metadata? }`'),
	('`ProgramResult`', 'interface', '`{ id, name, eligibility, status, decision?, qualification, rating?, determinations, success, trace, errors }`'),
	('`AggregateResult`', 'interface', '`{ id, name, subjects, determinations, groups, tallies, count, sums, success, trace, errors }`'),
	('`ProgramValidationResult`', 'interface', '`{ valid, errors, warnings }`'),
	('`ProgramEventMap`', 'type', '`{ qualify, rate, determine, decide, execute, aggregate, destroy }`'),
	('`ProgramOptions`', 'interface', '`{ qualifier?, rater?, engine?, validate?, labels?, on?, error? }`'),
	('`ProgramInterface`', 'interface', '`{ id, name, definition, emitter } plus execute, validate, destroy`'),
	('`ProgramManagerEventMap`', 'type', '`{ add, remove, destroy }`'),
	('`ProgramManagerOptions`', 'interface', '`{ qualifier?, rater?, engine?, programs?, validate?, labels?, on?, error? }`'),
	('`ProgramManagerInterface`', 'interface', '`{ emitter, count } plus has, program, programs, add, remove, destroy`'),
]
sentence = (
	"A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an "
	"optional member and `plus` introducing its call-signature members, and a type alias's own "
	"type literal with a union's arms escaped as `\\|`.\n\n"
)
table = '| Type | Kind | Shape | Summary |\n| --- | --- | --- | --- |\n'
for name, kind, shape in rows:
	table += '| %s | %s | %s |  |\n' % (name, kind, shape)
s = s[:start] + sentence + table + '\n' + s[end:]
io.open(p, 'w', encoding='utf-8').write(s)
print('Types table rewritten')
