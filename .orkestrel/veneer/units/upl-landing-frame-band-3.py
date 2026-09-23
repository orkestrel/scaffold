# upl-landing-frame-band-3.py: successor of upl-landing-frame-band-2.py. The transparent bottom border on the `.viewport`
# frame turned the census green at every variant (t4-capture-probe.txt), but it broke the frame's own contract in
# tests/app/browser/sections/PositionSection.test.ts: the frame reserves no gutter (`clientHeight` equals the border-box
# height), a fixed-bottom bar holds to the frame's bottom edge, and the frame carries no border width
# (band-gates.log.txt). The capture photographs the whole `[data-specimen]` container a section renders, not the frame,
# so the band moves there: a bottom padding on a specimen container whose child is a `.viewport` frame. The frame's box,
# clip, and containing block stay exactly as committed. Reverts band 2 where it is applied, then adds the container rule.
# Takes the checkout path as its argument. Anchor-refusing.
import sys

p = sys.argv[1] + '/app/browser/styles/_shell.scss'
s = open(p).read()

BAND_2 = """	// reason. The frame declares no fill and paints no border, so everything inside it is what the
	// published cascade paints. Its transparent bottom border is a band of the page's own surface
	// inside the frame's box and below its clip edge, so a frame photographed alone ends on a row no
	// specimen paints, whatever a bar or a viewport-sized box inside the frame reaches; the clip, the
	// containing block, and every percentage height sit in the padding box above the band.
	.viewport {
		height: 24rem;
		border-bottom: var(--vn-space-4) solid transparent;
		overflow: clip;
"""
COMMITTED = """	// reason. The frame declares no fill and no border, so everything inside it is what the
	// published cascade paints.
	.viewport {
		height: 24rem;
		overflow: clip;
"""
if s.count(BAND_2) == 1:
	s = s.replace(BAND_2, COMMITTED)
	print('.viewport: band 2 reverted')
elif s.count(COMMITTED) != 1:
	sys.exit('integration refused: neither band 2 nor the committed frame matches once')

ANCHOR = """		contain: layout paint;
	}

	// Layout alone: the box a sticky specimen scrolls"""
RULE = """		contain: layout paint;
	}

	// Layout alone: a specimen whose child is the frame ends on a band of the page's own surface below
	// the frame, because a bar or a viewport-sized box inside the frame can paint the frame's last row,
	// and a capture of the specimen then ends on a row no specimen paints. The band is the container's
	// padding rather than the frame's, so the frame's box, clip, and containing block stay the ones
	// the frame rule sets.
	[data-specimen]:has(> .viewport) {
		padding-bottom: var(--vn-space-4);
	}

	// Layout alone: the box a sticky specimen scrolls"""
if s.count(ANCHOR) != 1:
	sys.exit(f'integration refused: anchor count {s.count(ANCHOR)}')
s = s.replace(ANCHOR, RULE)
open(p, 'w').write(s)
print('[data-specimen]:has(> .viewport): a bottom padding as the band')
