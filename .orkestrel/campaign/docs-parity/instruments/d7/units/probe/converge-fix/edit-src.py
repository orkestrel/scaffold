import pathlib, sys

def sub(path, old, new, count=1):
	p = pathlib.Path(path)
	t = p.read_text()
	if t.count(old) != count:
		sys.exit(f'{path}: expected {count} occurrence(s), found {t.count(old)}\n---\n{old}\n---')
	p.write_text(t.replace(old, new))
	print(f'{path}: replaced {count}')

# --- P3: src/core/types.ts Draft example ---
sub('src/core/types.ts',
""" * const draft: Draft = { path: 'src/core/greeting.ts', text: "export const GREETING = 'hi'\\n" }
""",
""" * const draft: Draft = {
 * 	path: 'src/core/factories.ts',
 * 	text: "export function createGreeting(): string {\\n\\treturn 'hi'\\n}\\n",
 * }
""")

# --- P3: src/core/types.ts Issue example path ---
sub('src/core/types.ts',
""" * 	path: 'src/core/greeting.ts',
 * 	message: "Type 'string' is not assignable to type 'number'.",
""",
""" * 	path: 'src/core/factories.ts',
 * 	message: "Type 'string' is not assignable to type 'number'.",
""")

# --- P3: src/core/validators.ts isDraft example ---
sub('src/core/validators.ts',
""" * isDraft({ path: 'src/core/greeting.ts', text: 'export const GREETING = "hi"\\n' }) // true
 * isDraft({ path: '../../etc/hosts', text: '' }) // false
 * isDraft({ path: 'src/core/greeting.ts' }) // false
""",
""" * const draft = { path: 'src/core/factories.ts', text: 'export function createGreeting() {}\\n' }
 * isDraft(draft) // true
 * isDraft({ path: '../../etc/hosts', text: '' }) // false
 * isDraft({ path: 'src/core/factories.ts' }) // false
""")
