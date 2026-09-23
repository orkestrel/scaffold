#!/usr/bin/env python3
"""bft round-2 integration edits: the lanes' exact prose (analyst claim 3; reviewer 6a, 6b, 6c; analyst 6) applied in the worktree before landing."""
import re
def edit(path, old, new):
    s=open(path).read(); assert s.count(old)==1, (path, old[:60]); open(path,'w').write(s.replace(old,new))
W='/home/user/veneer-bft/'
edit(W+'tests/setupServer.ts',
""" * naming it. An empty condition is still a condition, so only `undefined` renders the selector
 * alone.
""",
""" * naming it. An empty condition is still a condition, so only the `undefined` value renders the
 * selector alone.
""")
edit(W+'tests/setupServer.ts',
""" * declaration of a property replaces what the earlier one read. A property whose declaration reads
 * no custom property is absent from the entry, so a rule writing no `var()` at all reads as an
 * empty entry rather than as no entry.
""",
""" * declaration of a property replaces what the earlier one read. A property whose declaration reads
 * no custom property is absent from the entry. An entry is empty when none of its merged
 * declarations reads a custom property.
""")
edit(W+'tests/setupServer.ts',
" * @returns Each block whose selector opens with `prefix` and whose condition, normalized by the\n",
" * @returns Each block whose selector opens with the prefix and whose condition, normalized by the\n")
edit(W+'tests/setupServer.test.ts',
"""		// A block nested under two at-rules carries both in its condition, and the key keeps them as
		// the reader joined them.
""",
"""		// A block nested under more than one at-rule carries each of them in its condition, and the
		// key keeps them as the reader joined them.
""")
edit(W+'tests/setupServer.test.ts',
"""		// Absence is `undefined` alone, so an empty condition keeps the separator rather than reading
		// as a rule under none.
""",
"""		// Absence is the `undefined` value alone, so an empty condition keeps the separator rather
		// than reading as a rule under none.
""")
edit(W+'tests/setupServer.test.ts',
"""		// The block under the release's width notation is kept, the block under a condition no rule
		// records is left out, and a block outside the prefix is left out under any condition.
""",
"""		// A rule records the width condition in the release's notation, so the block written in the
		// range notation is kept. The block under a condition no rule records is left out, and a block
		// outside the prefix is left out under any condition.
""")
print('six edits applied')
