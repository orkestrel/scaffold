# upl-landing-frame-band.py: the UTIL-PLACEMENT landing's second capture edit (the ruling in upl-landing-capture-note.txt,
# revised: a bottom margin rather than a padding, because a margin moves no geometry inside the frame). The portfolio
# census refuses a lifted frame whose registered region is one flat fill when the frame's bottom row is no single
# colour; a bounded `.viewport` frame's percentage and viewport-sized bars reach its bottom row. A bottom margin on the
# shell's `.viewport` frame puts a band of the page's own surface under every such frame, so a frame photographed alone
# ends on a row no specimen paints, while the containing block, the clip, and every percentage height inside the frame
# keep their geometry. Takes the file path as its argument (a probe worktree or the landing checkout). Anchor-refusing.
import sys
p = sys.argv[1] + '/app/browser/styles/_shell.scss'
s = open(p).read()
old = """	// reason. The frame declares no fill and no border, so everything inside it is what the
	// published cascade paints.
	.viewport {
		height: 24rem;
		overflow: clip;
"""
new = """	// reason. The frame declares no fill and no border, so everything inside it is what the
	// published cascade paints. The bottom margin is a band of the page's own surface under the
	// frame, so a frame photographed alone ends on a row no specimen paints, whatever a bar or a
	// viewport-sized box inside the frame reaches.
	.viewport {
		height: 24rem;
		margin-bottom: var(--vn-space-4);
		overflow: clip;
"""
if s.count(old) != 1:
	sys.exit(f'integration refused: anchor count {s.count(old)}')
open(p, 'w').write(s.replace(old, new))
print('.viewport: a bottom band of the page surface')
