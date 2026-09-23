# upl-landing-frame-band-2.py: successor of upl-landing-frame-band.py. The capture probe (t4-capture-probe.txt) showed a
# bottom margin never reaches a frame: each lifted frame is shot on the specimen's own box, and the `.viewport` frame's
# bottom margin collapses out of that box. A transparent bottom border sits inside the frame's own box and below its
# clip edge (the padding box), so a frame photographed alone ends on a band of the page's own surface, while the clip,
# the containing block of a fixed or absolute descendant, and every percentage height stay inside the padding box above
# it. Takes the checkout path as its argument. Anchor-refusing.
import sys
p = sys.argv[1] + '/app/browser/styles/_shell.scss'
s = open(p).read()
old = """	// reason. The frame declares no fill and no border, so everything inside it is what the
	// published cascade paints.
	.viewport {
		height: 24rem;
		overflow: clip;
"""
new = """	// reason. The frame declares no fill and paints no border, so everything inside it is what the
	// published cascade paints. Its transparent bottom border is a band of the page's own surface
	// inside the frame's box and below its clip edge, so a frame photographed alone ends on a row no
	// specimen paints, whatever a bar or a viewport-sized box inside the frame reaches; the clip, the
	// containing block, and every percentage height sit in the padding box above the band.
	.viewport {
		height: 24rem;
		border-bottom: var(--vn-space-4) solid transparent;
		overflow: clip;
"""
if s.count(old) != 1:
	sys.exit(f'integration refused: anchor count {s.count(old)}')
open(p, 'w').write(s.replace(old, new))
print('.viewport: a transparent bottom border as the band')
