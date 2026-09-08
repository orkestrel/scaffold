import pathlib, sys

def sub(path, old, new, count=1):
	p = pathlib.Path(path)
	t = p.read_text()
	if t.count(old) != count:
		sys.exit(f'{path}: expected {count}, found {t.count(old)}\n---\n{old}\n---')
	p.write_text(t.replace(old, new))
	print(f'{path}: replaced {count}')

DRAFT = '"export function createGreeting(): string {\\n\\treturn \'hi\'\\n}\\n"'

# --- P3: OverlayInterface class-level example ---
sub('src/server/types.ts',
""" * const overlay: OverlayInterface = new Overlay()
 * overlay.set('/srv/checkout/src/core/greeting.ts', "export const GREETING = 'hi'\\n")
 * overlay.covers('/srv/checkout/src/core') // true
 * overlay.clear()
""",
f""" * const overlay: OverlayInterface = new Overlay()
 * const path = '/srv/checkout/src/core/factories.ts'
 * overlay.set(path, {DRAFT})
 * overlay.covers('/srv/checkout/src/core') // true
 * overlay.clear()
""")

# --- P3: OverlayInterface.set example ---
sub('src/server/types.ts',
"""	 * overlay.set('/srv/checkout/src/core/greeting.ts', "export const GREETING = 'hi'\\n")
	 * ```
	 */
	set(path: string, text: string): void
""",
f"""	 * const path = '/srv/checkout/src/core/factories.ts'
	 * overlay.set(path, {DRAFT})
	 * ```
	 */
	set(path: string, text: string): void
""")

# --- P2 + P3: OverlayInterface.covers example ---
sub('src/server/types.ts',
"""	 * overlay.set('/srv/checkout/src/core/greeting.ts', "export const GREETING = 'hi'\\n")
	 * const inside = overlay.covers('/srv/checkout/src/core')
""",
f"""	 * const path = '/srv/checkout/src/core/factories.ts'
	 * overlay.set(path, {DRAFT})
	 * overlay.covers('/srv/checkout/src/core') // true
""")

# --- P2: OverlayInterface.clear example ---
sub('src/server/types.ts',
"""	 * overlay.clear()
	 * const remaining = overlay.paths
""",
"""	 * overlay.clear()
	 * overlay.paths // []
""")

# --- P3: Overlay class example ---
sub('src/server/Overlay.ts',
""" * const overlay = new Overlay()
 * overlay.set('/srv/checkout/src/core/greeting.ts', "export const GREETING = 'hi'\\n")
 * console.log(overlay.text('/srv/checkout/src/core/greeting.ts'))
 * overlay.clear()
""",
f""" * const overlay = new Overlay()
 * const path = '/srv/checkout/src/core/factories.ts'
 * overlay.set(path, {DRAFT})
 * console.log(overlay.text(path))
 * overlay.clear()
""")
