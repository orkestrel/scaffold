# J-COLLAPSE guide edits: the Collapse rows under § Surface, the Collapse fence under § Examples,
# the Collapse entry under ### Vocabulary, the ### Components › #### Collapse subsection, and the
# Collapse plugin row's Status and Obligation cells.
import pathlib

PATH = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse/guides/veneer.md')
text = PATH.read_text(encoding='utf-8')


def replace(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    text = text.replace(old, new)


def row(cells, widths):
    return '| ' + ' | '.join(cell.ljust(width) for cell, width in zip(cells, widths)) + ' |'


def table(header, rows):
    widths = [max(len(line[index]) for line in [header, *rows]) for index in range(len(header))]
    rule = '| ' + ' | '.join('-' * width for width in widths) + ' |'
    return '\n'.join([row(header, widths), rule, *(row(line, widths) for line in rows)])


# § Surface: one row per export, after the collapse contract rows.
SURFACE = [41, 9, 150]
surface = [
    ('`Collapse`', 'class', "Shows and hides a panel through its size transition, keeping its triggers' expanded state in step."),
    ('`COLLAPSE_CLASSES`', 'const', "Names the class tokens a collapse writes, removes, and tests by default, the tokens Bootstrap's cascade selects on."),
    ('`COLLAPSE_ATTRIBUTES`', 'const', "Names the attributes a collapse reads by default, Bootstrap's attribute names."),
    ('`COLLAPSE_SELECTORS`', 'const', "Names the default selector a collapse finds its triggers by and the delegate routes collapse clicks by, Bootstrap's data-attribute selector."),
    ('`COLLAPSE_EVENTS`', 'const', 'Names the bubbling events a collapse dispatches on its panel, keyed by the verb each carries.'),
    ('`isCollapseEvent`', 'function', 'Checks whether a DOM event is a collapse event, which carries no payload.'),
    ('`parseElement`', 'function', 'Parses a selector, or an element, to the HTML element it names in the document.'),
]
for name, kind, summary in surface:
    if len(summary) > SURFACE[2]:
        raise SystemExit(f'summary wider than the column: {name}')
anchor = row(['`CollapseInterface`', 'interface', 'Shows and hides a `.collapse` panel through its height or width transition.'], SURFACE)
replace(anchor + '\n', anchor + '\n' + '\n'.join(row(list(line), SURFACE) for line in surface) + '\n')

# § Examples: the Collapse fence.
replace("""isColorModeState('dark') // true
isColorModeState('auto') // false
```
""", """isColorModeState('dark') // true
isColorModeState('auto') // false
```

Construct a collapse over an accordion panel, show it, which hides the accordion's open panel through
that panel's own collapse, and restore both.

```ts
import { Collapse } from '@orkestrel/veneer/browser'

const accordion = document.createElement('div')
const panel = document.createElement('div')
panel.className = 'collapse'
accordion.append(panel)
const collapse = new Collapse(panel, { parent: accordion })
const opened = await collapse.show()
collapse.destroy()
```
""")

# ### Vocabulary: the Collapse entry.
replace("""The button validates its `selectors` group and keeps none of it: the delegate routes button clicks
by the selector, and a button you construct directly matches with none. The following table lists
the default vocabulary of the button and the color-mode controller.
""", """The button validates its `selectors` group and keeps none of it: the delegate routes button clicks
by the selector, and a button you construct directly matches with none. The collapse keeps every
group: it finds its triggers by its own `trigger` selector, as § Components states under Collapse.
The following table lists the default vocabulary of the button, the collapse, and the color-mode
controller.
""")
old_vocabulary = """| Entity      | Group        | Key       | Default                     | Names                                    |
| ----------- | ------------ | --------- | --------------------------- | ---------------------------------------- |
| `Button`    | `classes`    | `pressed` | `active`                    | The token a pressed button carries       |
| `Button`    | `selectors`  | `trigger` | `[data-bs-toggle="button"]` | The buttons a delegated click toggles    |
| `ColorMode` | `attributes` | `theme`   | `data-bs-theme`             | The root attribute that carries the mode |"""
replace(old_vocabulary, table(
    ['Entity', 'Group', 'Key', 'Default', 'Names'],
    [
        ['`Button`', '`classes`', '`pressed`', '`active`', 'The token a pressed button carries'],
        ['`Button`', '`selectors`', '`trigger`', '`[data-bs-toggle="button"]`', 'The buttons a delegated click toggles'],
        ['`Collapse`', '`classes`', '`host`', '`collapse`', 'The token a panel carries while its size rests'],
        ['`Collapse`', '`classes`', '`shown`', '`show`', 'The token a shown panel carries'],
        ['`Collapse`', '`classes`', '`transition`', '`collapsing`', 'The token a panel carries while its size transitions'],
        ['`Collapse`', '`classes`', '`horizontal`', '`collapse-horizontal`', 'The token that makes a panel size its width'],
        ['`Collapse`', '`classes`', '`collapsed`', '`collapsed`', 'The token a trigger carries while its panels hide'],
        ['`Collapse`', '`attributes`', '`target`', '`data-bs-target`', 'The trigger attribute that names its panels'],
        ['`Collapse`', '`attributes`', '`parent`', '`data-bs-parent`', 'The panel attribute that feeds `parent`'],
        ['`Collapse`', '`selectors`', '`trigger`', '`[data-bs-toggle="collapse"]`', 'The triggers a collapse writes and a click drives'],
        ['`ColorMode`', '`attributes`', '`theme`', '`data-bs-theme`', 'The root attribute that carries the mode'],
    ],
))

# ### Components › #### Collapse, after ### Motion.
attributes = table(
    ['Attribute', 'Default', 'Feeds', 'Read by'],
    [
        ['`attributes.target`', '`data-bs-target`', 'The panels a trigger names, before its `href` fragment', 'The `readTargets` function'],
        ['`attributes.parent`', '`data-bs-parent`', 'The `parent` option, below the constructor object', 'The `parseElement` function'],
    ],
)
events = table(
    ['Key', 'Wire name', 'Cancelable', 'Dispatched'],
    [
        ['`show`', '`show.vn.collapse`', 'Yes', 'Before any write; prevention refuses the show'],
        ['`shown`', '`shown.vn.collapse`', 'No', 'After the transition settles and the size is cleared'],
        ['`hide`', '`hide.vn.collapse`', 'Yes', 'Before any write; prevention refuses the hide'],
        ['`hidden`', '`hidden.vn.collapse`', 'No', 'After the transition settles'],
    ],
)
components = f"""### Components

Each component's subsection names its host, the attributes it reads against the option paths they
feed, its events, what a call taken over reads as, and where it departs from Bootstrap. § Vocabulary
lists each component's default class tokens, attribute names, and selectors.

#### Collapse

The `Collapse` class owns one panel, the element Bootstrap's markup marks with the `host` token, and
shows and hides it through a size transition. Construction validates and copies the `classes`,
`attributes`, and `selectors` groups, resolves the `parent` option, claims the panel, binds the
hooks, and writes nothing. A trigger is any element the `trigger` selector matches in the panel's
document whose target attribute or `href` fragment names the panel, read at each change, so a
trigger added after construction is written at the next one.

Showing adds the `transition` token, removes the `host` token, sizes the panel to zero, sets each
trigger's `aria-expanded` attribute to `true` without its `collapsed` token, and writes the panel's
scroll height in pixels, which the cascade's `.collapsing` rule transitions. After the transition
settles it adds the `host` and `shown` tokens, removes the `transition` token, clears the inline
size, and dispatches `shown.vn.collapse`. Hiding writes the panel's measured height, adds the
`transition` token, removes the `host` and `shown` tokens, gives the `collapsed` token and an
`aria-expanded` value of `false` to each trigger none of whose panels is shown, and clears the inline
size, so the cascade's zero height transitions; after the transition settles it adds the `host`
token back and dispatches `hidden.vn.collapse`. A panel carrying the `horizontal` token sizes its
width instead of its height. The `show`, `hide`, and `toggle` methods resolve `true` after the
completed event, and `false` when the panel already carries the state, a transition is in flight on
the panel or on an open sibling, a listener prevented the pre-change event, or the collapse is
destroyed. The `shown` property reads the `shown` token on every access.

With a `parent`, showing first hides every open first-level panel inside the parent: a panel
carrying the `host` and `shown` tokens or the `transition` token that sits inside no other such
panel. Each one hides through its own collapse and dispatches its own events. That collapse is the
one the static `find` method returns, or one constructed with this collapse's groups and parent,
which this collapse owns and destroys when it is destroyed.

The collapse reads the following attributes, under the names its `attributes` group resolves.

{attributes}

The collapse dispatches the following events on its panel. Each one bubbles and carries no detail,
which the platform reads as `null`.

{events}

A collapse reads a call as taken over when the panel no longer carries the `transition` token that
call wrote, or when another call of the same collapse has started a change since. The earlier call
then stops and resolves `false`, writing and dispatching nothing more. A listener that shows the
panel again inside `show.vn.collapse` therefore runs the one transition and dispatches the one
`shown.vn.collapse` event: its own call resolves `true`, and the call whose event it heard resolves
`false`. Destruction aborts the wait, so a call awaiting the transition resolves `false` and
dispatches no completed event, and restoration writes back the panel's tokens and inline size and
each trigger's `collapsed` token and `aria-expanded` value.

The delegate's `collapse` option carries the collapse's groups. A click inside a trigger the resolved
`trigger` selector matches toggles each panel the trigger names that the root contains, through the
collapse the static `find` method returns or one the delegate acquires with the group. The delegate
prevents the click's default action only when the trigger or the clicked element is an anchor, as
Bootstrap's data API does.

The collapse departs from Bootstrap's in these ways:

- Construction writes nothing. Bootstrap writes each trigger's `aria-expanded` and `collapsed` state
  at construction and toggles the panel when its `toggle` option is `true`, its default. The collapse
  has no `toggle` option: you call the `toggle` method, and the triggers take their state at the
  first change.
- A trigger that names several panels takes the `collapsed` token only when none of them is shown.
  Bootstrap reads only the first panel the trigger names.
- A call while an open sibling transitions resolves `false`. Bootstrap's sibling query,
  `.collapse.collapsing`, matches no transitioning panel, because its transition removes the
  `collapse` class.
- A `data-bs-parent` value that names no HTML element throws an `AppError` carrying the
  `COLLAPSE_OPTION_INVALID` code. Bootstrap reads it as no parent.
- Destruction abandons a transition in flight and restores the panel, its triggers, and each sibling
  collapse it constructed. Bootstrap's `dispose` method must not follow `hide` before the transition
  ends.
- The delegate leaves a panel outside its root alone. Bootstrap's data API listens on the document,
  so it reaches every panel.

"""
replace("""task transitions from the element's present state.

## Styles
""", """task transitions from the element's present state.

""" + components + """## Styles
""")

# § Compatibility: the Collapse plugin row.
old_row_start = '| engine           | plugin         | Collapse: '
lines = text.split('\n')
indexes = [index for index, line in enumerate(lines) if line.startswith(old_row_start)]
if len(indexes) != 1:
    raise SystemExit('expected one Collapse plugin row')
line = lines[indexes[0]]
cells = line.split(' | ')
columns = [cell for cell in line.strip('|').split('|')]
widths = [len(cell) - 2 for cell in columns]
obligation = ('Collapse: a `[data-bs-toggle="collapse"]` trigger names panels by `data-bs-target` or '
              '`href`; `parent: null` and `toggle: true` defaults; `toggle`, `show`, and `hide`; cancelable '
              '`show.bs.collapse` and `hide.bs.collapse`, then `shown.bs.collapse` and `hidden.bs.collapse`; '
              'trigger `aria-expanded` and `collapsed` track the panel; `collapsing` and inline size until '
              'transition end. Proved in `tests/src/browser/Collapse.test.ts`. Owner: J-ENGINE.')
if len(obligation) > widths[2]:
    raise SystemExit(f'obligation {len(obligation)} wider than {widths[2]}')
new_cells = ['engine', 'plugin', obligation, '—', 'shipped']
lines[indexes[0]] = row(new_cells, widths)
text = '\n'.join(lines)

PATH.write_text(text, encoding='utf-8', newline='\n')
print('ok', len(obligation), widths)
