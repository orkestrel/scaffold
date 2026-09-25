"""Plants the motion ruling's values in the scratch copy's cascade, never in the worktree.

Usage: python tmp/j-motion-proofs-b/plant.py <scratch root>

The plant writes, in the scratch copy only:
- the `--vn-motion-slide` token, `calc(600ms * var(--vn-factor-motion))`, beside the other motion
  tokens, because the carousel's timing reads it and the shipped tokens partial does not declare it;
- the collapse panel's `height` and the horizontal panel's `width` over `--vn-motion-panel` on
  `--vn-ease-panel`;
- the `.fade` rule's `opacity` over `--vn-motion-feedback` on `--vn-ease-out`;
- the toast's `scale(0.98)` entry: a fading toast transitions `opacity` over `--vn-motion-feedback` on
  `--vn-ease-out` and `transform` over `--vn-motion-feedback` on `--vn-ease-standard`, and rests at
  `scale(0.98)` while it carries the `showing` class, which marks both directions;
- the carousel item's `transform` over `--vn-motion-slide` on `--vn-ease-panel`, the fade variant's
  `opacity` over `--vn-motion-slide` on `--vn-ease-out`, and the outgoing item's `0s` opacity change
  delayed by `--vn-motion-slide`.

Every block goes through the `transition` mixin, so the reduced-motion preference resolves it to
none. The script refuses a scratch root outside the worktree's own `tmp` tree, and a replacement
whose anchor text is absent or repeated.
"""

import pathlib
import sys

scratch = pathlib.Path(sys.argv[1]).resolve()
worktree = pathlib.Path(__file__).resolve().parents[2]
if scratch == worktree or not scratch.is_relative_to(worktree / 'tmp'):
    sys.exit('refusing to plant outside the scratch copy')

anchor = '--vn-motion-panel: calc(250ms * var(--vn-factor-motion));'
tokens = scratch / 'src/styles/_tokens.scss'
text = tokens.read_bytes().decode('utf-8')
if text.count(anchor) != 1:
    sys.exit('refusing: the motion token anchor is absent or repeated')
text = text.replace(
    anchor, anchor + '\n\t\t--vn-motion-slide: calc(600ms * var(--vn-factor-motion));'
)
tokens.write_bytes(text.encode('utf-8'))
print('planted src/styles/_tokens.scss')

appended = {
    'src/styles/components/_collapse.scss': """
@layer components {
	.collapsing {
		@include transition(height var(--vn-motion-panel) var(--vn-ease-panel));
	}

	.collapsing.collapse-horizontal {
		@include transition(width var(--vn-motion-panel) var(--vn-ease-panel));
	}
}
""",
    'src/styles/components/_fade.scss': """
@layer components {
	.fade {
		@include transition(opacity var(--vn-motion-feedback) var(--vn-ease-out));
	}
}
""",
    'src/styles/components/_toast.scss': """
@layer components {
	.toast.fade {
		@include transition(
			(
				opacity var(--vn-motion-feedback) var(--vn-ease-out),
				transform var(--vn-motion-feedback) var(--vn-ease-standard)
			)
		);
	}

	.toast.fade.showing {
		transform: scale(0.98);
	}
}
""",
    'src/styles/components/_carousel.scss': """
@layer components {
	.carousel-item {
		@include transition(transform var(--vn-motion-slide) var(--vn-ease-panel));
	}

	.carousel-fade .carousel-item {
		@include transition(opacity var(--vn-motion-slide) var(--vn-ease-out));
	}

	.carousel-fade .active.carousel-item-start,
	.carousel-fade .active.carousel-item-end {
		@include transition(opacity 0s var(--vn-motion-slide));
	}
}
""",
}

for relative, block in appended.items():
    path = scratch / relative
    text = path.read_bytes().decode('utf-8')
    if not text.startswith('@use '):
        text = "@use '../mixins' as *;\n\n" + text
    path.write_bytes((text.rstrip('\n') + '\n' + block).encode('utf-8'))
    print('planted', relative)
