import sys

PATH = 'src/server/types.ts'
BLOCKS = {
	"\tset(path: string, text: string): void": [
		"overlay.set('/srv/checkout/src/core/greeting.ts', \"export const GREETING = 'hi'\\n\")",
	],
	"\tcovers(directory: string): boolean": [
		"overlay.set('/srv/checkout/src/core/greeting.ts', \"export const GREETING = 'hi'\\n\")",
		"const inside = overlay.covers('/srv/checkout/src/core')",
	],
	"\tclear(): void": [
		"overlay.clear()",
		"const remaining = overlay.paths",
	],
	"\tinspect(subject: Case): Promise<Check>": [
		"const check = await stage.inspect(subject)",
		"console.log(check.stage, check.elapsed, check.issues.length)",
	],
	"\tinspect(subject: Case, project?: string): Promise<Check>": [
		"const check = await stage.inspect(subject, 'configs/src/tsconfig.core.json')",
	],
	"\tresolve(project: string): Promise<Project>": [
		"const project = await stage.resolve('configs/src/tsconfig.core.json')",
		"console.log(project.path, project.digest)",
	],
	"\tinspect(subject: Case, options?: InspectionOptions): Promise<Check>": [
		"const check = await stage.inspect(subject, { signal: AbortSignal.timeout(30_000) })",
	],
	"\tstart(): void": [
		"const server = new ProbeServer({ workspace: process.cwd() })",
		"server.start()",
	],
}

text = open(PATH).read()
for signature, lines in BLOCKS.items():
	old = "\t */\n" + signature + "\n"
	if text.count(old) != 1:
		sys.exit(f"anchor not unique: {signature} ({text.count(old)})")
	body = "".join(f"\t * {line}\n" for line in lines)
	new = "\t *\n\t * @example\n\t * ```ts\n" + body + "\t * ```\n\t */\n" + signature + "\n"
	text = text.replace(old, new, 1)
open(PATH, 'w').write(text)
print('ok')
