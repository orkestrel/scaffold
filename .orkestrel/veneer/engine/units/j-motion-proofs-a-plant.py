"""Plants the motion ruling's values in the scratch copy's cascade, never in the worktree.

Usage: python tmp/j-motion-proofs-a/plant.py <scratch root>

The plant appends one rule block to each partial the owned proofs load: the `.fade` rule on the
`--vn-ease-out` easing; the modal dialog's `scale(0.96)` entry over `--vn-motion-panel` (250ms) on
`--vn-ease-panel`, with the modal host and both backdrops fading over `--vn-motion-panel` on
`--vn-ease-out`; and the bare offcanvas panel's `transform` over `--vn-motion-panel` on `--vn-ease-panel`
with its `opacity` over `--vn-motion-panel` on `--vn-ease-out`, transparent while hidden or hiding.
Every block goes through the `transition` mixin, so the reduced-motion preference resolves it to none.
The script refuses a scratch root inside the worktree's own `src` tree.
"""

import pathlib
import sys

scratch = pathlib.Path(sys.argv[1]).resolve()
worktree = pathlib.Path(__file__).resolve().parents[2]
if scratch == worktree or not scratch.is_relative_to(worktree / 'tmp'):
    sys.exit('refusing to plant outside the scratch copy')

plants = {
    'src/styles/components/_fade.scss': """
@layer components {
	.fade {
		@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-out));
	}
}
""",
    'src/styles/components/_modal.scss': """
@layer components {
	.modal.fade {
		@include transition(opacity var(--vn-motion-panel) var(--vn-ease-out));
	}

	.modal.fade .modal-dialog {
		transform: scale(0.96);
		@include transition(transform var(--vn-motion-panel) var(--vn-ease-panel));
	}

	.modal.show .modal-dialog {
		transform: none;
	}

	.modal.modal-static .modal-dialog {
		transform: scale(1.02);
	}

	.modal-backdrop.fade {
		@include transition(opacity var(--vn-motion-panel) var(--vn-ease-out));
	}
}
""",
    'src/styles/components/_offcanvas.scss': """
@layer components {
	.offcanvas {
		opacity: 0;
		@include transition(
			(
				transform var(--vn-motion-panel) var(--vn-ease-panel),
				opacity var(--vn-motion-panel) var(--vn-ease-out)
			)
		);
	}

	.offcanvas.showing,
	.offcanvas.show:not(.hiding) {
		opacity: 1;
	}

	.offcanvas-backdrop.fade {
		@include transition(opacity var(--vn-motion-panel) var(--vn-ease-out));
	}
}
""",
}

for relative, block in plants.items():
    path = scratch / relative
    text = path.read_bytes().decode('utf-8')
    path.write_bytes((text.rstrip('\n') + '\n' + block).encode('utf-8'))
    print('planted', relative)
