#!/usr/bin/env python3
"""B-PASSIVE-ORDER landing integration edit: the composition case's comment takes the objective lane's
prescribed nouns (round-2 verdict, claim 2)."""
import pathlib, sys
p = pathlib.Path('/home/user/veneer-bpo/tests/src/styles/components/ratio.test.ts'); s = p.read_text()
old = """		// `.ratio > *` and `.card` both declare `position` at specificity `(0,1,0)`, so the barrel
		// that loads later wins the tie. The release loads its helpers, `_ratio.scss` among them,
		// after `card`, so a card nested in a ratio box reads `position: absolute` from the ratio
		// rule rather than `relative` from its own.
"""
new = """		// The `.ratio > *` selector and the `.card` selector both declare the `position` property at
		// specificity `(0,1,0)`, so the partial that loads later wins the tie. The release loads its
		// helpers, the `_ratio.scss` partial among them, after the `card` partial, so a card nested
		// in a ratio box reads the `absolute` value from the ratio rule rather than the `relative`
		// value from its own.
"""
if s.count(old) != 1: sys.exit('integration refused: anchor')
p.write_text(s.replace(old, new)); print('bpo integration applied')
