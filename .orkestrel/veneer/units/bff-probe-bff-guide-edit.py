import re
p='guides/veneer.md'
s=open(p).read()
def rep(old,new,count=1):
    global s
    assert s.count(old)==count,(old[:90], s.count(old))
    s=s.replace(old,new)

n=0
lines=s.split('\n')
for i,l in enumerate(lines):
    if re.match(r"^\| `(is-invalid|is-valid|was-validated)` +\| `(\.was-validated )?\.form-control-color(\.is-(in)?valid|:(in)?valid)` +\| `width`", l):
        l2=l.replace('`calc(3rem + 1.5em + 0.75rem)`','`calc(var(--vn-space-24) + 1.5em + 0.75rem)`')
        l2=re.sub(r"\| declared +\|$", "| tokenized |", l2)
        assert l2!=l
        lines[i]=l2; n+=1
assert n==4, n
s='\n'.join(lines)

rep("""- **The color control's width is written as one sum.** The release writes
  `calc(3rem + calc(1.5em + 0.75rem))`; Sass flattens the nested call to
  `calc(3rem + 1.5em + 0.75rem)`, which computes the same width.
""", """- **The color control's width reads the space token.** The release writes
  `calc(3rem + calc(1.5em + 0.75rem))`; the partial writes its `3rem` term as `var(--vn-space-24)`,
  the token the resting `.form-control-color` rule reads, and Sass flattens the nested call to
  `calc(var(--vn-space-24) + 1.5em + 0.75rem)`. The resting and validated widths therefore retune
  together under `--vn-factor-density`, and the icon room stays the release's literal, as the rest
  of the icon geometry does.
""")

rep("""The validated color control's width is the validation partial's own `3rem` literal plus the icon
room, so under a density retune the validated color control keeps that width while the resting one
widens.
""", """The validated color control's width is the same `--vn-space-24` token the resting one reads plus
the icon room, so a density retune widens the resting and the validated color control together.
""")

rep("""ring; its component caller reads `--bs-btn-focus-box-shadow`. In forced colors, the mixin replaces
the shadow with an outline in the system highlight color.
""", """ring; its component caller reads `--bs-btn-focus-box-shadow`. In forced colors, the mixin replaces
the shadow with an outline in the system highlight color, which it draws through the `forced-ring`
mixin. The `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`, and
`.form-range:focus` rules include `forced-ring` beside the shadow ring they keep from the release,
because forced colors paint no shadow and those controls would otherwise show no focus indicator
there.
""")

rep("""The resting fill reads `--bs-body-bg`, and the border reads `--bs-border-width` and
`--bs-border-color`, each of which this package already declares""", """Under forced colors the focused box also draws an outline in the system highlight through the
`forced-ring` mixin, because forced colors do not paint the shadow ring. § Additions records it.

The resting fill reads `--bs-body-bg`, and the border reads `--bs-border-width` and
`--bs-border-color`, each of which this package already declares""")
rep("""ring after keyboard traversal and its ratio in each mode, the held and disabled states, the reverse""",
    """ring after keyboard traversal and its ratio in each mode, the outline under staged forced colors,
the held and disabled states, the reverse""")

rep("""The fill, the text, the border, the corners, the disabled surface, and the Gecko reset read the""",
"""Under forced colors the focused select also draws an outline in the system highlight through the
`forced-ring` mixin, because forced colors do not paint the shadow ring. § Additions records it.

The fill, the text, the border, the corners, the disabled surface, and the Gecko reset read the""")
rep("""reads the transition; the keyboard focus case reads the focused border, ring, and outline.""",
"""reads the transition; the keyboard focus case reads the focused border, ring, and outline, and the
forced-colors case reads the outline under staged forced colors.""")

rep("""The text, surface, border, placeholder, disabled, and file-button colors, the radii, and the border
width read the""", """Under forced colors the focused control also draws an outline in the system highlight through the
`forced-ring` mixin, because forced colors do not paint the shadow ring. § Additions records it.
The validation partial's focus rules write a border and a shadow and no outline, so a validated
control keeps that outline. The plaintext form's focus rule writes the release's `outline: 0` with
no ring, so it draws no focus indicator in any mode; forced colors remove nothing there, and the
rule takes no outline.

The text, surface, border, placeholder, disabled, and file-button colors, the radii, and the border
width read the""")
rep("""The focus ring is read after keyboard traversal and its contrast ratio is held to the calibrated
ratio the Button sweep pins in each mode.""", """The focus ring is read after keyboard traversal and its contrast ratio is held to the calibrated
ratio the Button sweep pins in each mode. The outline is read under staged forced colors on the text
control and on a validated one, by its style and width, because forced colors replace every color
a rule writes.""")

rep("""The track fill reads `--bs-secondary-bg` and the disabled thumb reads `--bs-secondary-color`,""",
"""Under forced colors the focused control draws an outline in the system highlight on the host
through the `forced-ring` mixin, because forced colors do not paint the thumb's shadow ring.
§ Additions records it.

The track fill reads `--bs-secondary-bg` and the disabled thumb reads `--bs-secondary-color`,""")
rep("""rather than entering the part's `:active`, so the held thumb has a declaration reading and no drive.""",
"""rather than entering the part's `:active`, so the held thumb has a declaration reading and no drive.
The host's outline under staged forced colors has a resolved reading, because the host wears it.""")

last = "| `table`   | `.table > :not(caption) > * > * { vertical-align }`"
idx = s.index(last)
end = s.index('\n', idx)
ring = "Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there."
rows = [
 ("form-control", ".form-control:focus { outline }", ring),
 ("form-select", ".form-select:focus { outline }", ring),
 ("form-check", ".form-check-input:focus { outline }", ring),
 ("form-range", ".form-range:focus { outline }", "Under forced colors the ring is drawn as a system-color outline on the host, because the shadow the thumb wears elsewhere is not painted there."),
]
add = ''.join(f"\n| `{c}` | `{n}` | `@media (forced-colors: active)` | declaration | {r} |" for c,n,r in rows)
s = s[:end] + add + s[end:]

rep("""Button's forced-colors browser reading remains open: the installed Test `MediaOptions` contract
stages print and motion only. The cascade supplies system-color fallbacks, but a later Test unit
must add a forced-colors axis before this reading closes.
""", """The installed Test `MediaOptions` contract stages forced colors through its `forced` axis, and the
forms proofs read under it the system-highlight outline each focused text control, select, check,
and range draws. Button's own forced-colors browser reading is B-PASSIVE-CLOSE-B's; until it lands,
the cascade's system-color fallbacks for the button have no browser reading.
""")
open(p,'w').write(s)
