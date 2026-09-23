# Applies the COLLAPSE guide patch to the guide at the path given, which must be the 87ff1d0 text.
import sys
p=sys.argv[1]
s=open(p).read()
cell=open(sys.argv[2]).read().strip()
def rep(old,new,count=1):
    global s
    assert s.count(old)==count,(old[:80],s.count(old))
    s=s.replace(old,new)
rep("""each name that one component. `emitEvent`, `bindEventMap`, and `Delegate` are mechanisms with one
consumer, so they stay that shape until a second component needs them. B-COLLAPSE is the unit that
generalizes them, because Collapse is the first component carrying a cancelable pre-change event.
""","""each name that one component. `emitEvent`, `bindEventMap`, and `Delegate` are mechanisms with one
consumer, so they stay that shape until the first engine component carrying a cancelable pre-change
event lands.
""")
lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if l.startswith("| `src/styles/components/_pagination.scss`")][0]
lines.insert(idx+1, "| `src/styles/components/_collapse.scss` | The hidden and shown panel, the closing box on each axis, and their transitions in the components layer, read by `tests/src/styles/components/collapse.test.ts`. |")
s='\n'.join(lines)
old_line='@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 container table");'
new_line='@source not inline("caption-bottom caption-top col-auto col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 collapse container table");'
rep(old_line,new_line,2)
rep("""The line withholds a name that stays on it from Tailwind's generation, so Veneer's declaration is
the only one the page carries for it.
""","""The line withholds a name that stays on it from Tailwind's generation, so Veneer's declaration is
the only one the page carries for it. The `collapse` class is one such name: Tailwind's `collapse`
utility writes `visibility: collapse`, so a paired build that generated it would hide every shown
panel, and [the consumer pairing](../tests/service/tailwind/consumer.test.ts) reads the shown panel
its markup fixture carries resolving what the shipped cascade alone resolves for it.
""")
rep("""### Button group classes
""", open(sys.argv[3]).read() + """
### Button group classes
""")
lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if l.startswith("| pagination       | variable")][0]
lines[idx+1:idx+1]=[
"| collapse | selector | Every official `.collapse` selector ships in the components layer, the hiding rule and the horizontal closing box included; resolved display, clip, and motion are proved in `tests/src/styles/components/collapse.test.ts`. | — | shipped |",
"| collapsing | selector | Every official `.collapsing` selector ships in the components layer, the horizontal compound and each reduced-motion twin included; resolved clip, size, and motion are proved in `tests/src/styles/components/collapse.test.ts`. | — | shipped |",
]
idx=[i for i,l in enumerate(lines) if l.startswith("| engine           | initialization | util/index.js: `getjQuery`")][0]
lines[idx+1:idx+1]=[
"| engine | plugin | " + cell + " | — | accepted |",
"",
"A `plugin` row records behavior the engine owns and no shipped Veneer module performs, while the classes that plugin sets ship in the cascade and render in markup.",
]
s='\n'.join(lines)
rep("""label, a Form range, and a Form select region follow the Spinner region; and an Input group region
follows the Close region, each carrying that key's own specimens.""","""label, a Form range, and a Form select region follow the Spinner region; an Input group region
follows the Close region; and a Collapse region follows the Input group region, each carrying that
key's own specimens.""")
rep("""[the close classes](../tests/src/styles/components/close.test.ts),
""","""[the close classes](../tests/src/styles/components/close.test.ts),
[the collapse classes](../tests/src/styles/components/collapse.test.ts),
""")
open(p,'w').write(s)
