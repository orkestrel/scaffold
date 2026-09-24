p='guides/veneer.md'
s=open(p).read()
def rep(old,new,count=1):
    global s
    assert s.count(old)==count, (old[:80], s.count(old))
    s=s.replace(old,new)
lines=s.split('\n')
i=[k for k,l in enumerate(lines) if l.startswith('| `src/styles/components/_link.scss`')][0]
del lines[i]
def row(path,role):
    return f'| `{path}` | {role} |'
j=[k for k,l in enumerate(lines) if l.startswith('| `src/styles/components/_stacks.scss`')][0]
lines.insert(j+1,row('src/styles/components/_text-truncation.scss','The text truncation helper in the components layer.'))
j=[k for k,l in enumerate(lines) if l.startswith('| `src/styles/utilities/_flex.scss`')][0]
lines[j+1:j+1]=[
 row('src/styles/utilities/_link.scss','The colored-link helper in the utilities layer, ahead of every utility partial.'),
 row('src/styles/utilities/_text.scss','The text alignment, decoration, transform, wrapping, and break utilities in the utilities layer.'),
 row('src/styles/utilities/_color.scss','The color-and-background pairs, the text color, opacity, and emphasis utilities, and the link opacity, offset, and underline utilities in the utilities layer.'),
]
s='\n'.join(lines)
lines=s.split('\n')
hit=0
for k,l in enumerate(lines):
    if l.startswith('| link             | selector'):
        new=l.replace("Every official link selector is present; role colors read Veneer's role tokens at rest, hover, and focus instead of Bootstrap's literal state colors.","Every official link selector is present in the utilities layer, the colored-link helper ahead of every utility partial; role colors read Veneer's role tokens at rest, hover, and focus instead of Bootstrap's literal state colors.")
        assert new!=l; lines[k]=new; hit+=1
    if l.startswith('| link             | variable'):
        new=l.replace('tests/src/styles/components/link.test.ts','tests/src/styles/utilities/link.test.ts')
        assert new!=l; lines[k]=new; hit+=1
assert hit==3
s='\n'.join(lines)
rep('[the link classes](../tests/src/styles/components/link.test.ts),','[the link classes](../tests/src/styles/utilities/link.test.ts),')
rep("""[the visually hidden helpers](../tests/src/styles/utilities/visually-hidden.test.ts), and""","""[the visually hidden helpers](../tests/src/styles/utilities/visually-hidden.test.ts),
[the text utilities](../tests/src/styles/utilities/text.test.ts),
[the text truncation helper](../tests/src/styles/components/text-truncation.test.ts),
[the color utilities](../tests/src/styles/utilities/color.test.ts), and""")
rep("""[close specimens](../tests/app/browser/sections/CloseSection.test.ts),
""","""[close specimens](../tests/app/browser/sections/CloseSection.test.ts),
[color specimens](../tests/app/browser/sections/ColorSection.test.ts),
""")
rep("""[table specimens](../tests/app/browser/sections/TableSection.test.ts),
""","""[table specimens](../tests/app/browser/sections/TableSection.test.ts),
[text specimens](../tests/app/browser/sections/TextSection.test.ts),
""")
rep("""surface carries it, and a contextual fill class supplies the rest. Veneer ships no such class, so
the showcase paints each badge specimen on a dark table surface.""","""surface carries it, and a contextual fill class supplies the rest. The `.text-bg-*` pairs that
§ Color utilities describes are those classes: the Color region carries a badge on each of them, and
the Badge region paints each of its specimens on a dark table surface instead.""")
rep("""classes, the vertical rule and the gap steps sit in Layout beside the gutters, the stacks sit in
Flex beside the flex utilities, and the list and quotation classes sit in Type.""","""classes, the vertical rule and the gap steps sit in Layout beside the gutters, the stacks sit in
Flex beside the flex utilities, the truncation helper sits in Text beside the text utilities, the
color-and-background pairs sit in Color beside the text colors, and the list and quotation classes
sit in Type.""")
rep("""and Veneer's important declaration is on the physical `left` or `right` longhand, which does not
cover it. The proof asserts""","""and Veneer's important declaration is on the physical `left` or `right` longhand, which does not
cover it. The `text-start`, `text-end`, and `text-center` alignments and the `text-black` and
`text-white` colors are shipped names off the line: Tailwind's rule for each declares the
`text-align` or the `color` longhand, which Veneer declares with `!important`, so the `text-start`
class resolves Veneer's physical `left` value rather than Tailwind's logical `start` value. The
`text-wrap` and `text-nowrap` classes stay on the line: Tailwind's rule for each declares the
`text-wrap` shorthand, which Chromium expands to the `text-wrap-mode` and `text-wrap-style`
longhands, and Veneer's important `white-space` shorthand expands to the `white-space-collapse` and
`text-wrap-mode` longhands, which leave the `text-wrap-style` longhand uncovered. The proof asserts""")
sections = open('/home/user/veneer-ut/tmp/units/ut-guide-sections.md').read()
rep("### Deferred selectors\n", sections+"### Deferred selectors\n")
open(p,'w').write(s)
