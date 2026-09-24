#!/usr/bin/env python3
"""Re-flows the Tailwind paragraph T-b touches, after ut-2-guide-edit.py and the formatter ran."""
p = '/home/user/veneer-ut/tmp/probe/base/guides/veneer.md'
s = open(p).read()
old = """cover it. The `text-start`, `text-end`, and `text-center` alignments and the `text-black` and
`text-white` colors are shipped names off the line: Tailwind's rule for each declares the
`text-align` or the `color` longhand, which Veneer declares with the `!important` flag, so the `text-start`
class resolves Veneer's physical `left` value rather than Tailwind's logical `start` value. The
`text-wrap` and `text-nowrap` classes stay on the line: Tailwind's rule for each declares the
`text-wrap` shorthand, which Chromium expands to the `text-wrap-mode` and `text-wrap-style`
longhands, and Veneer's important `white-space` shorthand expands to the `white-space-collapse` and
`text-wrap-mode` longhands, which leave the `text-wrap-style` longhand uncovered. The proof asserts that the `gap-3` name is in the branch and reads what the rule claims:
"""
new = """cover it. The `text-start`, `text-end`, and `text-center` alignments and the `text-black` and
`text-white` colors are shipped names off the line: Tailwind's rule for each declares the
`text-align` or the `color` longhand, which Veneer declares with the `!important` flag, so the
`text-start` class resolves Veneer's physical `left` value rather than Tailwind's logical `start`
value. The `text-wrap` and `text-nowrap` classes stay on the line: Tailwind's rule for each declares
the `text-wrap` shorthand, which Chromium expands to the `text-wrap-mode` and `text-wrap-style`
longhands, and Veneer's important `white-space` shorthand expands to the `white-space-collapse` and
`text-wrap-mode` longhands, which leave the `text-wrap-style` longhand uncovered. The proof asserts
that the `gap-3` name is in the branch and reads what the rule claims:
"""
assert s.count(old) == 1
s = s.replace(old, new)
open(p, 'w').write(s)
