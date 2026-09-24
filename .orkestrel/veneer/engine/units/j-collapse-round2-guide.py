# J-COLLAPSE round 2 guide edits: C4 (the sentences, the departures, the tables' home under R18),
# C9 (the delegate-prose hunks that depend on no types.ts sentence), and the plugin row's Proof cell.
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


# § Examples: the lead-in and the fence agree.
replace("""Construct a collapse over an accordion panel, show it, which hides the accordion's open panel through
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
""", """Construct a collapse over one panel of an accordion whose other panel is open, and show it: the open
panel hides through its own collapse. Destruction restores both panels.

```ts
import { Collapse } from '@orkestrel/veneer/browser'

const accordion = document.createElement('div')
const open = document.createElement('div')
open.className = 'collapse show'
const panel = document.createElement('div')
panel.className = 'collapse'
accordion.append(open, panel)
document.body.append(accordion)
const collapse = new Collapse(panel, { parent: accordion })
const opened = await collapse.show()
collapse.destroy()
```
""")

# ### Vocabulary: R18 puts a component's default tables in its own subsection, so the collapse rows
# leave this table, which keeps the entities that have no subsection under § Components.
replace("""by the selector, and a button you construct directly matches with none. The collapse keeps every
group: it finds its triggers by its own `trigger` selector, as § Components states under Collapse.
The following table lists the default vocabulary of the button, the collapse, and the color-mode
controller.
""", """by the selector, and a button you construct directly matches with none. Each component under
§ Components lists its own default tables beside its attribute table. The following table lists the
default vocabulary of the button and the color-mode controller.
""")
replace("""| Entity      | Group        | Key          | Default                       | Names                                                |
| ----------- | ------------ | ------------ | ----------------------------- | ---------------------------------------------------- |
| `Button`    | `classes`    | `pressed`    | `active`                      | The token a pressed button carries                   |
| `Button`    | `selectors`  | `trigger`    | `[data-bs-toggle="button"]`   | The buttons a delegated click toggles                |
| `Collapse`  | `classes`    | `host`       | `collapse`                    | The token a panel carries while its size rests       |
| `Collapse`  | `classes`    | `shown`      | `show`                        | The token a shown panel carries                      |
| `Collapse`  | `classes`    | `transition` | `collapsing`                  | The token a panel carries while its size transitions |
| `Collapse`  | `classes`    | `horizontal` | `collapse-horizontal`         | The token that makes a panel size its width          |
| `Collapse`  | `classes`    | `collapsed`  | `collapsed`                   | The token a trigger carries while its panels hide    |
| `Collapse`  | `attributes` | `target`     | `data-bs-target`              | The trigger attribute that names its panels          |
| `Collapse`  | `attributes` | `parent`     | `data-bs-parent`              | The panel attribute that feeds `parent`              |
| `Collapse`  | `selectors`  | `trigger`    | `[data-bs-toggle="collapse"]` | The triggers a collapse writes and a click drives    |
| `ColorMode` | `attributes` | `theme`      | `data-bs-theme`               | The root attribute that carries the mode             |""", """| Entity      | Group        | Key       | Default                     | Names                                    |
| ----------- | ------------ | --------- | --------------------------- | ---------------------------------------- |
| `Button`    | `classes`    | `pressed` | `active`                    | The token a pressed button carries       |
| `Button`    | `selectors`  | `trigger` | `[data-bs-toggle="button"]` | The buttons a delegated click toggles    |
| `ColorMode` | `attributes` | `theme`   | `data-bs-theme`             | The root attribute that carries the mode |""")

# § Delegation: the delegate-prose hunk, which no types.ts sentence carries.
replace("""none; an engine you constructed keeps its own groups. The delegate prevents the click's default
action, as Bootstrap's data API does. A host under nested delegate roots is driven once per click
for each entity whose selector matches, by whichever delegate hears the click first.
""", """none; an engine you constructed keeps its own groups. The button route prevents the click's
default action, as Bootstrap's data API does. The `collapse` option carries the collapse's groups
the same way, and § Components states its route under Collapse. A host under nested delegate
roots is driven once per click for each entity whose selector matches, by whichever delegate
hears the click first.
""")

# § Surface: the delegate-prose hunk's Delegate row, which the Delegate class summary carries.
SURFACE = [41, 9, 150]
replace(row(['`Delegate`', 'class', "Activates data-attribute button hosts through a root's delegated click listener."], SURFACE),
        row(['`Delegate`', 'class', "Activates data-attribute hosts through a root's delegated click listener."], SURFACE))

# ### Components and #### Collapse.
classes = table(
    ['Key', 'Default', 'Marks'],
    [
        ['`host`', '`collapse`', 'A panel while its size is not transitioning'],
        ['`shown`', '`show`', 'A shown panel'],
        ['`transition`', '`collapsing`', 'A panel while its size transitions'],
        ['`horizontal`', '`collapse-horizontal`', 'A panel that transitions its width instead of its height'],
        ['`collapsed`', '`collapsed`', 'A trigger none of whose panels is shown'],
    ],
)
attributes = table(
    ['Key', 'Default', 'Feeds', 'Read through'],
    [
        ['`target`', '`data-bs-target`', 'The panels a trigger names, before its `href` fragment', 'The `readTargets` function'],
        ['`parent`', '`data-bs-parent`', 'The `parent` option, unless the constructor supplies it', 'The `parseElement` function'],
    ],
)
selectors = table(
    ['Key', 'Default', 'Selects'],
    [
        ['`trigger`', '`[data-bs-toggle="collapse"]`', 'The triggers a collapse writes and a delegated click drives'],
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
start = text.index('### Components\n')
end = text.index('## Styles\n')
text = text[:start] + f"""### Components

Each component's subsection names its host, its default tables beside the attributes it reads and
the option paths they feed, its events, what a call taken over reads as, and where it departs from
Bootstrap.

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
token back, removes the `transition` token, and dispatches `hidden.vn.collapse`. A panel carrying
the `horizontal` token sizes its width instead of its height. The `show`, `hide`, and `toggle`
methods resolve `true` after the completed event. Each resolves `false` when the panel already
carries the state, a transition is in flight on the panel, a listener prevented the pre-change
event, or the collapse is destroyed, and `show` also resolves `false` while an open sibling
transitions. The `shown` property reads the `shown` token on every access.

With a `parent`, showing first hides every open first-level sibling inside the parent: a panel that
carries the `host` and `shown` tokens or the `transition` token and sits inside no other panel
carrying the `host` or `transition` token. Each one hides through its own collapse and dispatches its
own events. That collapse is the one the static `find` method returns, or one constructed with this
collapse's groups and parent, which this collapse owns: it destroys one whose panel left the
document at its next `show` or `hide` call, and the rest when it is destroyed.

The collapse writes, removes, and tests the following class tokens, under the names its `classes`
group resolves; each default is the token the shipped cascade selects on.

{classes}

The collapse reads the following attributes, under the names its `attributes` group resolves; each
default is Bootstrap's attribute name.

{attributes}

The collapse matches its triggers with the following selector, under the name its `selectors` group
resolves; the default is Bootstrap's selector.

{selectors}

The collapse dispatches the following events on its panel. Each one bubbles and carries no detail,
which the platform reads as `null`.

{events}

A call reads the panel at each of its doors for the phase it is in. From its write of the
`transition` token until it removes that token, the panel must carry the token; at completion the
panel must carry the `host` and `shown` tokens without the `transition` token after a show, and the
`host` token without the `shown` or `transition` token after a hide; before a hide writes its token,
the panel must still carry the `shown` token without the `transition` token. A call that finds the
panel otherwise, the collapse destroyed, or a later call of the same collapse started reads the
change as taken over: it stops, writing and dispatching nothing more, and resolves `false`. A
listener that shows the panel again inside `show.vn.collapse` therefore runs the one transition and
dispatches the one `shown.vn.collapse` event: its own call resolves `true`, and the call whose event
it heard resolves `false`. Destruction aborts the wait, so a call awaiting the transition resolves
`false` and dispatches no completed event, and restoration writes back the panel's tokens and inline
size and each trigger's `collapsed` token and `aria-expanded` value.

The delegate's `collapse` option carries the collapse's groups. A click inside a trigger the resolved
`trigger` selector matches toggles each panel the trigger names that the root contains, through the
collapse the static `find` method returns or one the delegate acquires with the group. Under nested
roots each panel is driven once per click, by whichever delegate whose root contains it hears the
click first, so a panel one delegate leaves alone is left for another. The delegate prevents the
click's default action only when the trigger or the clicked element is an anchor, as Bootstrap's
data API does.

The collapse departs from Bootstrap's in these ways:

- Construction writes nothing. Bootstrap writes each trigger's `aria-expanded` and `collapsed` state
  at construction and toggles the panel when its `toggle` option is `true`, its default. The collapse
  has no `toggle` option: you call the `toggle` method, and the triggers take their state at the
  first change.
- Triggers are read at each change. Bootstrap finds them once, at construction.
- A trigger that names several panels takes the `collapsed` token only when none of them is shown.
  Bootstrap reads only the first panel the trigger names.
- The refusals read the panel's tokens, before the pre-change event and again after it. Bootstrap
  reads its own transitioning flag once, before the event.
- A call while an open sibling transitions resolves `false`. Bootstrap's sibling query,
  `.collapse.collapsing`, matches no transitioning panel, because its transition removes the
  `collapse` class.
- A panel inside a transitioning ancestor counts as nested and is not a sibling. Bootstrap counts
  only an ancestor carrying the `collapse` class.
- The sibling collapses are acquired after the accepted `show.vn.collapse` event. Bootstrap acquires
  them before it dispatches its `show` event.
- Showing writes the `transition` token before it removes the `host` token, and completion writes
  the `host` and `shown` tokens before it removes the `transition` token. Bootstrap removes each
  token before it adds the next.
- Completion waits on the panel's running finite animations. Bootstrap waits on a `transitionend`
  listener with a fallback timer.
- A `data-bs-parent` value that names no HTML element throws an `AppError` carrying the
  `COLLAPSE_OPTION_INVALID` code, unless the constructor supplies `parent`. Bootstrap reads it as no
  parent.
- Destruction abandons a transition in flight and restores the panel, its triggers, and each sibling
  collapse it constructed. Bootstrap's `dispose` method removes its instance data and event handlers
  and restores nothing.
- The delegate leaves a panel outside its root alone. Bootstrap's data API listens on the document,
  so it reaches every panel.

""" + text[end:]

# § Compatibility: the Collapse plugin row names its proof file in the Proof cell, with the full
# Obligation wording, and the table's Proof column is re-padded as the formatter pads it.
lines = text.split('\n')
indexes = [index for index, line in enumerate(lines) if line.startswith('| engine           | plugin         | Collapse: ')]
if len(indexes) != 1:
    raise SystemExit('expected one Collapse plugin row')
target = indexes[0]
top = target
while lines[top - 1].startswith('|'):
    top -= 1
bottom = target
while lines[bottom + 1].startswith('|'):
    bottom += 1
rows = [[cell.strip() for cell in line.strip()[1:-1].split(' | ')] for line in lines[top:bottom + 1]]
if any(len(cells) != 5 for cells in rows):
    raise SystemExit('a Compatibility row does not split into five cells')
rows[target - top][2] = ('Collapse: a `[data-bs-toggle="collapse"]` trigger names its panel by `data-bs-target` or '
                         '`href` attribute; `parent: null` and `toggle: true` defaults; `toggle`, `show`, and `hide` '
                         'methods; cancelable `show.bs.collapse` and `hide.bs.collapse` events, then '
                         '`shown.bs.collapse` and `hidden.bs.collapse` events; trigger `aria-expanded` and '
                         '`collapsed` states track the panel; `collapsing` class and inline size until transition '
                         'end. Owner: J-ENGINE.')
rows[target - top][3] = 'tests/src/browser/Collapse.test.ts'
rows[target - top][4] = 'shipped'
body = [cells for index, cells in enumerate(rows) if index != 1]
widths = [max(len(cells[column]) for cells in body) for column in range(5)]
rendered = []
for index, cells in enumerate(rows):
    if index == 1:
        rendered.append('| ' + ' | '.join('-' * width for width in widths) + ' |')
    else:
        rendered.append(row(cells, widths))
lines[top:bottom + 1] = rendered
text = '\n'.join(lines)
PATH.write_text(text, encoding='utf-8', newline='\n')
print('ok', widths)
