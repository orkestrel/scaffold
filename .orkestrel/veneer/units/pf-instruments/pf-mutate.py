# Applies one named mutation to an owned file, in place. Usage: pf-mutate.py NAME
import sys
NAME = sys.argv[1]
B = 'tests/setupBrowser.ts'
S = 'tests/setup.ts'
MUTATIONS = {
	'no-bounding': (B, "const excluded = this.#exclude(subject, frame)\n", "const excluded: readonly Element[] = []\n"),
	'subject-child-hidden': (B, "if (child.contains(subject) || (frame !== undefined && child.contains(frame))) continue", "if (frame !== undefined && child.contains(frame)) continue"),
	'region-before-bounding': (B, "\t\tconst excluded = this.#exclude(subject, frame)\n", "\t\tconst early = readRegion(subject, frame)\n\t\tconst excluded = this.#exclude(subject, frame)\n"),
	'element-frames-unbounded': (B, "const excluded = this.#exclude(subject, frame)\n", "const excluded = frame === undefined ? this.#exclude(subject, frame) : []\n"),
	'region-at-viewport-pane': (B, "\t\tawait stagePane(width, height)\n\t\tconst pane = Math.max(measureContent(), height)\n", "\t\tawait stagePane(width, height)\n\t\tif (height > 0) return height\n\t\tconst pane = Math.max(measureContent(), height)\n"),
	'area-off-by-one': (B, "if (across * down > FRAME_AREA) {", "if (across * down >= FRAME_AREA) {"),
	'area-refusal-dropped': (B, "if (across * down > FRAME_AREA) {", "if (across * down > Number.POSITIVE_INFINITY) {"),
	'restore-outside-finally': (B, "\t\t\t} finally {\n\t\t\t\tawait releasePane()\n\t\t\t}\n\t\t} finally {\n\t\t\tfor (const child of excluded) child.removeAttribute('hidden')\n\t\t}\n", "\t\t\t} finally {\n\t\t\t\tawait releasePane()\n\t\t\t}\n\t\t\tfor (const child of excluded) child.removeAttribute('hidden')\n\t\t} finally {\n\t\t\tvoid excluded\n\t\t}\n"),
	'restore-clears-every-hidden': (B, "for (const child of excluded) child.removeAttribute('hidden')", "for (const child of document.querySelectorAll('main > *')) child.removeAttribute('hidden')"),
	'settle-refusal-dropped': (B, "if (reading !== pane) {", "if (reading !== pane && Number.isNaN(reading)) {"),
	'frame-area-unexported': (S, "export const FRAME_AREA = 1280 * 41954", "const FRAME_AREA = 1280 * 41954"),
}
path, old, new = MUTATIONS[NAME]
text = open(path).read()
if NAME == 'region-before-bounding':
	text = text.replace("\t\t\t\tconst region = readRegion(subject, frame)\n", "\t\t\t\tconst region = early\n", 1)
if text.count(old) != 1:
	sys.exit(f'{NAME}: site matched {text.count(old)} times in {path}')
open(path, 'w').write(text.replace(old, new, 1))
print(path)
