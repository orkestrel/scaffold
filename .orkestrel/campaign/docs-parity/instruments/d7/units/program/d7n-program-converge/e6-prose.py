import io
p = 'guides/program.md'
s = io.open(p, encoding='utf-8').read()

def swap(old, new):
	global s
	if s.count(old) != 1:
		raise SystemExit('not unique: %r (%d)' % (old[:70], s.count(old)))
	s = s.replace(old, new)

# Ruling 9: a heading one level deeper directly above the fence that demonstrates
# the titled declaration, worded as the demonstration it shows. Ruling 14: the fence
# gains the execution and teardown lines the `@example` block already carried.
swap(
	'''The factories compile entities. The authored definitions they compile are plain
values, so their builders are helper leaves rather than factories.

```ts
import { buildProgramDefinition, createProgram, createProgramManager } from '@orkestrel/program'

const definition = buildProgramDefinition('standard', 'Standard', qualification, rating)

const program = createProgram(definition)
const manager = createProgramManager({ programs: [definition] })
```
''',
	'''The factories compile entities. The authored definitions they compile are plain
values, so their builders are helper leaves rather than factories.

#### Compile a program and a manager

```ts
import { buildProgramDefinition, createProgram, createProgramManager } from '@orkestrel/program'

const definition = buildProgramDefinition('standard', 'Standard', qualification, rating)

const program = createProgram(definition)
const manager = createProgramManager({ programs: [definition] })

program.execute({ id: 'risk-1' })

program.destroy()
manager.destroy()
```
''',
)

# Ruling 7: the overload facts a single compared cell cannot hold land in the prose
# beside their table.
swap(
	'''The array overload is declared first. `execute` is the correct verb
because it performs a composed workflow rather than qualification or rating alone.
''',
	'''The array overload is declared first, so the `execute` row's `Summary` carries the
batch form and the single-subject form returns one `ProgramResult` through the same
call. `execute` is the correct verb because it performs a composed workflow rather
than qualification or rating alone.
''',
)

swap(
	'''The manager follows the singular/plural accessor and batch-removal conventions.
''',
	'''The manager follows the singular/plural accessor and batch-removal conventions. The
id-list overload of `remove` is declared first, so that row's `Summary` carries the
list form; one id removes that program and returns a `boolean`, and no argument
removes every compiled program and returns `void`.
''',
)

io.open(p, 'w', encoding='utf-8').write(s)
print('prose landings written')
