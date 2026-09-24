#!/usr/bin/env python3
"""LEDGER (cl) round 2 guide writer: rewrites the round-2 hunks of guides/veneer.md from the 42fd88e
text, each paragraph wrapped greedily at the guide's 100-column width, and writes the result to the
path given as the only argument (the scratch copy's guide). Tables are left for oxfmt to align."""
import re, subprocess, sys

base = subprocess.run(['git', 'show', '42fd88e:guides/veneer.md'], cwd='/home/user/veneer-cl',
                      capture_output=True, text=True, check=True).stdout

def wrap(text):
    # A code span and a link are each one word, so no break falls inside either, no line opens with
    # a character Markdown reads as a block marker, and the width is counted in UTF-8 bytes, as a
    # byte-counting `awk 'length > 100'` check counts it.
    flat = re.sub(r'\[[^\]]*\]\([^)]*\)', lambda link: link.group(0).replace(' ', '\0'),
                  ' '.join(text.split()))
    words, current, inside = [], '', False
    for char in flat:
        if char == '`':
            inside = not inside
        if char == ' ' and not inside:
            words.append(current)
            current = ''
        else:
            current += char
    words.append(current)
    lines, line = [], ''
    for word in words:
        if line and len(f'{line} {word}'.encode()) > 100:
            lines.append(line)
            line = word
        else:
            line = f'{line} {word}' if line else word
    lines.append(line)
    for line in lines[1:]:
        if line[0] in '>#-+|*' or line.split(' ')[0].rstrip('.').isdigit():
            raise SystemExit(f'line opens with a block marker: {line[:40]!r}')
    return '\n'.join(lines).replace('\0', ' ')

def swap(text, old, new):
    if text.count(old) != 1:
        raise SystemExit(f'site not found exactly once: {old[:80]!r}')
    return text.replace(old, new)

guide = base

# § Styles: the priority sentence, reflowed from the line it starts on to the paragraph end.
guide = swap(guide, """conformance proof holds that agreement for every declaration both sheets make: each shared selector
and property carries the same priority on both sides, because the oracle records values without
their priority. Where a class name exists in Bootstrap and in Tailwind, the declaration Veneer ships
is Bootstrap's; § Tailwind states how a paired build keeps that true.
""", wrap("""conformance proof holds that agreement for every declaration both sheets make: each shared
selector, property, and media condition carries the same priority on both sides, because the oracle
records values without their priority. The condition is part of that comparison because the release
writes one selector's property at both priorities under different conditions: each responsive
offcanvas panel's fill is normal below its boundary and important at and above it. Where a class
name exists in Bootstrap and in Tailwind, the declaration Veneer ships is Bootstrap's; § Tailwind
states how a paired build keeps that true.""") + '\n')

# § Files: the tests/setupServer.ts row names the tables the module reads.
row = [l for l in guide.split('\n') if l.startswith('| `tests/setupServer.ts`')]
assert len(row) == 1
guide = swap(guide, row[0], '| `tests/setupServer.ts` | The Node-only readers: the installed and built '
             "cascades and the guide text, the compiled-stylesheet reader, the shared-name readings, the "
             "guide's compatibility, deferral, departure, addition, media condition, and keyframes tables, "
             'the cascade comparisons, and the elements-layer tag reader. |')

media_intro = wrap("""Each row names one media condition this cascade writes, the form the release writes for the
same condition, and the mixin or partial that writes it. The `readConditions` function in the
`tests/setupServer.ts` module reads this table.""")
media_template = wrap("""A `{breakpoint}` cell is a template. It stands for each boundary from `sm` to `xxl`, at the
width the release declares for that boundary in its `--bs-breakpoint-*` custom properties, so the
`(width >= {breakpoint})` row stands for the `(width >= 576px)` condition through the
`(width >= 1400px)` condition. The `xs` boundary sits at zero: every viewport meets it and none
falls below it, so it writes no condition. The release writes an exclusive upper bound 0.02px
below its boundary, which the `{breakpoint} - 0.02px` template states, so its
`(max-width: 575.98px)` condition is this cascade's `(width < 576px)` condition. A `—` cell
records a condition the release does not write, and § Additions records each rule this cascade
writes under it. A color mode is the `data-bs-theme` attribute rather than a
`prefers-color-scheme` query, so no row names a color scheme.""")
media_table = """| Condition | Bootstrap 5.3.8 | Written by |
| --- | --- | --- |
| `(width >= {breakpoint})` | `(min-width: {breakpoint})` | The `breakpoint-up` mixin, and the `breakpoint-each` mixin through it |
| `(width < {breakpoint})` | `(max-width: {breakpoint} - 0.02px)` | The `breakpoint-down` mixin |
| `(prefers-reduced-motion: reduce)` | `(prefers-reduced-motion: reduce)` | The `reduced-motion` mixin, and the `transition` mixin through it |
| `(prefers-reduced-motion: no-preference)` | `(prefers-reduced-motion: no-preference)` | The smooth-scrolling rule in the `src/styles/_reset.scss` partial |
| `print` | `print` | The print pass in the `src/styles/utilities/_display.scss` partial |
| `(forced-colors: active)` | — | The `forced-colors` mixin, and the `forced-ring` mixin through it |"""
media_parity = wrap("""A rule under two conditions at once, such as the reduced-motion twin of a responsive offcanvas
panel below its boundary, sits under both joined by the `and` keyword, and each part is a row here.
The conformance proof holds the table against each source it describes: the conditions the built
cascade writes, split at each `and` keyword, equal the `Condition` cells expanded over the
release's boundaries; each expanded `Bootstrap 5.3.8` cell, read in the range notation, equals its
row's `Condition` cell, and those cells together equal the conditions the pinned inventory's
`media` list carries, split the same way; and each condition the release does not write is a
`Condition` cell of § Additions.""")
key_intro = wrap("""Each row names one animation the release defines, the shipped key whose vocabulary records it,
and the treatment the release writes for it under the `prefers-reduced-motion: reduce` preference,
read from the release's compiled `bootstrap.css` stylesheet. Veneer defines each animation under the
release's name and writes the same treatment. The `readKeyframes` function in the
`tests/setupServer.ts` module reads this table.""")
key_table = """| Name | Key | Reduced motion |
| --- | --- | --- |
| `progress-bar-stripes` | `progress` | Stopped: the `.progress-bar-animated` rule sets its `animation` property to none, so the stripes stand still. |
| `spinner-border` | `spinner` | Slowed: the `.spinner-border` rule sets the `--bs-spinner-animation-speed` property to a `1.5s` duration, twice its resting `0.75s` duration, and the ring keeps turning. |
| `spinner-grow` | `spinner` | Slowed: the `.spinner-grow` rule sets the `--bs-spinner-animation-speed` property to a `1.5s` duration, twice its resting `0.75s` duration, and the dot keeps pulsing. |
| `placeholder-glow` | `placeholder` | Unchanged: the release writes no reduced-motion rule for a placeholder, so the glow runs. |
| `placeholder-wave` | `placeholder` | Unchanged: the release writes no reduced-motion rule for a placeholder, so the wave runs. |"""
key_parity = wrap("""Each written treatment is a rule of its own key, so each key's ledger compares the value its
twin rule writes, and no proof reads the treatments as one group. The conformance proof holds the
`Name` cells equal to the `@keyframes` rules the built cascade writes, and each `Key` cell equal to
the shipped key the pinned inventory records the name under. The `scanCompatibilityPresence`
function refuses a shipped key whose recorded animation the cascade does not define, because a rule
naming an undefined animation runs nothing and no ledger reading reports it. The keyframes parity
case refuses any animation the pinned inventory does not record under a shipped key, whether or not
a row names it, and the `collectAdditions` function throws naming that animation, so no animation
is an addition.""")
sections = '\n\n'.join(['### Media conditions', media_intro, media_template, media_table, media_parity,
                        '### Keyframes', key_intro, key_table, key_parity]) + '\n\n'
guide = swap(guide, '### Deferred selectors\n', sections + '### Deferred selectors\n')

# § Additions: the Category cell sentence drops the keyframes category, reflowed to the paragraph end.
guide = swap(guide, """The `Category` cell names what was added: a `selector` the release does not write, a `declaration`
the release omits on a selector it does write, a custom `property` the component's official
vocabulary lacks, or a `keyframes` animation it does not define. A `declaration` name is written
`selector { property }`. The `Condition` cell holds the at-rule enclosing the emitted rule, and a
`—` cell records a rule under none, so a selector the release writes unconditionally and this
cascade also writes under a query the release records for no rule of that selector is named at that
query. The `Reason` cell is the only cell no measurement fixes.
""", wrap("""The `Category` cell names what was added: a `selector` the release does not write, a
`declaration` the release omits on a selector it does write, or a custom `property` the component's
official vocabulary lacks. An animation is never an addition; § Keyframes states how the ledger
refuses one no shipped key records. A `declaration` name is written `selector { property }`. The
`Condition` cell holds the at-rule enclosing the emitted rule, and a `—` cell records a rule under
none, so a selector the release writes unconditionally and this cascade also writes under a query
the release records for no rule of that selector is named at that query. The `Reason` cell is the
only cell no measurement fixes.""") + '\n')

# § Tests: the conformance and helper sentences, reflowed.
guide = swap(guide, """The conformance proofs pin the official release and its artifact digests, reject runtime boundary
escapes, check shipped CSS vocabulary, compare each live Button step with its fixture, and
cross-check the compatibility rows; see [Bootstrap conformance](../tests/conformance.test.ts).
The helper proofs read compatibility tables, built CSS, and the pinned inventory, and verify the
service readiness and its stage; see [the Node-only readers and recorder](../tests/setupServer.test.ts)
and [the service readiness and stage](../tests/setupService.test.ts).
""", wrap("""The conformance proofs pin the official release and its artifact digests, reject runtime
boundary escapes, check shipped CSS vocabulary and recorded animations, compare each declaration's
priority at its media condition, hold the media condition and keyframes tables against the built
cascade and the release, compare each live Button step with its fixture, and cross-check the
compatibility rows; see [Bootstrap conformance](../tests/conformance.test.ts).""") + '\n' + wrap(
"""The helper proofs read compatibility, media condition, and keyframes tables, built CSS, and the
pinned inventory, and verify the service readiness and its stage; see
[the Node-only readers and recorder](../tests/setupServer.test.ts) and
[the service readiness and stage](../tests/setupService.test.ts).""") + '\n')

open(sys.argv[1], 'w').write(guide)
