# upl-landing-capture.py: the UTIL-PLACEMENT landing's capture edit, taken by the Orchestrator at the landing as the
# capture referrals are. With the harness repaired, the portfolio census refuses the `width-steps` lifted frame as
# blank: the `.w-75` bar is one flat fill, and the frame's bottom row is no floor because the last paragraph's
# `w-auto` bar, holding text, fills its line box to the frame's edge and the row paints grey and white. The sibling
# `placeholder-ramp` frame reads a white floor because its empty bars sit inside taller line boxes. Moves the
# `w-auto` paragraph to the front of the Width steps specimen, so the frame ends on an empty bar's white line box.
# The section proof reads the bars by selector, not by position. Anchor-refusing.
import sys
p='/home/user/veneer/app/browser/constants.ts'; s=open(p).read()
old="""		markup: [
			...['25', '50', '75', '100'].map(
				(step) => `<p><span class="placeholder w-${step}" aria-hidden="true"></span></p>`,
			),
			'<p><span class="placeholder w-auto" aria-hidden="true">Auto width</span></p>',
		].join(''),
"""
new="""		markup: [
			'<p><span class="placeholder w-auto" aria-hidden="true">Auto width</span></p>',
			...['25', '50', '75', '100'].map(
				(step) => `<p><span class="placeholder w-${step}" aria-hidden="true"></span></p>`,
			),
		].join(''),
"""
if s.count(old)!=1: sys.exit(f'integration refused: anchor count {s.count(old)}')
open(p,'w').write(s.replace(old,new)); print('Width steps: the auto-width row first')
