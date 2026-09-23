#!/usr/bin/env python3
"""bfs round-2 integration edits: the reviewer's exact prose (5a, 5b, F1 in both homes, the "none of these keys" referent, the one-idea split, the specimen pair) applied in the worktree before landing."""
def edit(path, old, new):
    s=open(path).read(); assert s.count(old)==1, (path, old[:70]); open(path,'w').write(s.replace(old,new))
W='/home/user/veneer-bfs/'
I=W+'tests/app/browser/integration.test.ts'
edit(I,
"""		// Each key is addressed by the specimen label its section declared, because one class
		// answers for several specimens: one table can render several containers.
""",
"""		// Each key is addressed by the specimen label its section declared, because one class
		// answers for several specimens: the Layout table alone renders several containers.
""")
edit(I,
"""					// A key whose top sits at or below its host's bottom edge hangs outside the host's
					// box, so the copy the frame is shot on is where its room and its stacking are
					// read: its bottom edge against the frame's, and the hit at the centre of the
					// button leading the group after the host, which is a point inside both boxes.
""",
"""					// A key whose top sits at or below its host's bottom edge hangs outside the host's
					// box. The journey reads a hanging key on the copy the frame is shot on. It reads
					// the key's bottom edge against the frame's, and it hit-tests the centre of the
					// button that leads the group after the host, a point inside the key's box and
					// the button's box.
""")
edit(I,
"""		// A hit that reaches no element leaves `hit` undefined, which reddens like a hit on the
		// button does.
""",
"""		// A hit that reaches no element leaves the `hit` field undefined, which reddens like a hit
		// on the button does.
""")
T=W+'tests/setup.ts'
edit(T,
""" * that family's own list. A key is addressed by its specimen label rather than by its class,
 * because one class answers for several specimens: one table can render several containers.
""",
""" * that family's own list. A key is addressed by its specimen label rather than by its class,
 * because one class answers for several specimens: the Layout table alone renders several
 * containers.
""")
edit(T,
""" * renders beneath it. The journey reads a key as hanging when the key's top sits at or below the
 * bottom edge of its host, the element that holds it, and on the lifted copy it reads a hanging
 * key's bottom edge inside the frame's. A hanging key lies over that content, which is the release's
 * own overlap, and the journey reads which element paints on top where the two meet.
 *
 * A hover or focus frame is registered for none of them.""",
""" * renders beneath it. The journey reads a key as hanging when the key's top sits at or below the
 * bottom edge of its host, the element that holds it. On the lifted copy, the journey reads a
 * hanging key's bottom edge inside the frame's. A hanging key lies over that content, which is the
 * release's own overlap. The journey reads which element paints on top where the two meet.
 *
 * A hover or focus frame is registered for none of these keys.""")
C=W+'app/browser/constants.ts'
edit(C,
" * The tooltip pair is one passing and one failing group, derived from one state list so neither\n",
" * The tooltip pair is one passing and one failing specimen, derived from one state list so neither\n")
print('seven edits applied')
