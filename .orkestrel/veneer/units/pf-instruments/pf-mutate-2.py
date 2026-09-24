# Applies one named round-2 mutation to an owned file, in place. Usage: pf-mutate-2.py NAME
import sys
NAME = sys.argv[1]
B = 'tests/setupBrowser.ts'
I = 'tests/app/browser/integration.test.ts'
MUTATIONS = {
	'viewport-branch-skips-reread': (B, "\t\tconst pane = Math.max(measureContent(), height)\n\t\tawait stagePane(width, pane)\n", "\t\tconst pane = Math.max(measureContent(), height)\n\t\tif (pane === height) return pane\n\t\tawait stagePane(width, pane)\n"),
	'settle-refusal-dropped': (B, "if (reading !== pane) {", "if (reading !== pane && Number.isNaN(reading)) {"),
	'primary-unlifted': (I, "\t\tconst lifted = build('div')\n\t\tlifted.append(host)\n\t\tdocument.body.prepend(lifted)\n\t\tonTestFinished(() => {\n\t\t\tmarker.replaceWith(host)\n", "\t\tconst lifted = build('div')\n\t\tonTestFinished(() => {\n\t\t\tmarker.remove()\n"),
	'primary-unlifted-unguarded': (I, "\t\tconst lifted = build('div')\n\t\tlifted.append(host)\n\t\tdocument.body.prepend(lifted)\n\t\tonTestFinished(() => {\n\t\t\tmarker.replaceWith(host)\n", "\t\tconst lifted = build('div')\n\t\tonTestFinished(() => {\n\t\t\tmarker.remove()\n"),
}
path, old, new = MUTATIONS[NAME]
text = open(path).read()
if text.count(old) != 1:
	sys.exit(f'{NAME}: site matched {text.count(old)} times in {path}')
text = text.replace(old, new, 1)
if NAME == 'primary-unlifted-unguarded':
	title = "it('repaints a host under the pointer while it is hovered and while it is held'"
	start = text.index(title)
	end = text.index("\n\tit(", start + len(title))
	guard = "\t\t\texpect(mounted.host.querySelector('main')?.contains(host)).toBe(false)\n"
	body = text[start:end]
	if guard not in body:
		sys.exit(f'{NAME}: no guard found in the Primary case')
	text = text[:start] + body.replace(guard, '') + text[end:]
open(path, 'w').write(text)
print(path)
