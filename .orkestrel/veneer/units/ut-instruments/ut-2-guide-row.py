#!/usr/bin/env python3
"""Shortens the `text` selector row T-b qualifies, so its cell stays inside the table's existing width."""
p = '/home/user/veneer-ut/tmp/probe/base/guides/veneer.md'
s = open(p).read()
old = "Every official `.text-*` selector ships in the utilities layer, except the `.text-truncate` helper, which the `text-truncate` row records: the alignment at every breakpoint infix, the decoration, transform, wrapping, and break classes, the role, body, and emphasis colors, the opacity steps, and the `.text-bg-*` color-and-background pairs; resolved values"
new = "Every official `.text-*` selector ships in the utilities layer, except the `.text-truncate` helper, which the `text-truncate` row records; resolved values"
assert s.count(old) == 1
open(p, 'w').write(s.replace(old, new))
