# J-COLLAPSE round 3 guide edits: D1 (the hide's reads after the removal), D2 (the hand-off and
# refusal sentences), D3 (the nesting scope and the token order), and D7 (the departures' verbs).
import pathlib

PATH = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse/guides/veneer.md')
text = PATH.read_text(encoding='utf-8')


def replace(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    text = text.replace(old, new)


# § Delegation.
replace("""the same way, and § Components states its route under Collapse. A host under nested delegate
roots is driven once per click for each entity whose selector matches, by whichever delegate
hears the click first.
""", """the same way, and § Components states its route under Collapse. A host under nested delegate
roots is driven once per click for each entity whose selector matches, by the first live delegate
whose root contains it to reach it. A listener that destroys a delegate during a click leaves every
panel the click has not reached to the delegates still live.
""")
replace("""reaction sends, finds no owner and acquires a fresh engine at once, whichever delegate hears it, and
that engine's snapshot""", """reaction sends, finds no owner and acquires a fresh engine at once, in the first delegate to hear it,
and that engine's snapshot""")

# #### Collapse: the nesting scope.
replace("""carries the `host` and `shown` tokens or the `transition` token and sits inside no other panel
carrying the `host` or `transition` token. Each one""", """carries the `host` and `shown` tokens or the `transition` token and sits inside no other panel
within the parent carrying the `host` or `transition` token. Each one""")

# #### Collapse: the hide's reads after the removal.
replace("""`host` token without the `shown` or `transition` token after a hide; before a hide writes its token,
the panel must still carry the `shown` token without the `transition` token. A call that finds the""",
        """`host` token without the `shown` or `transition` token after a hide; before a hide writes its token,
the panel must still carry the `shown` token without the `transition` token, and from the moment a
hide removes the `shown` token until the transition settles, the panel must lack it. A call that
finds the""")

# #### Collapse: the delegate paragraph.
replace("""collapse the static `find` method returns or one the delegate acquires with the group. Under nested
roots each panel is driven once per click, by whichever delegate whose root contains it hears the
click first, so a panel one delegate leaves alone is left for another. The delegate prevents the
click's default action only when the trigger or the clicked element is an anchor, as Bootstrap's
data API does.
""", """collapse the static `find` method returns or one the delegate acquires with the group. Under nested
roots each panel is driven once per click, by the first live delegate whose root contains it to
reach it, so a panel one delegate leaves alone is left for another. A listener that destroys a
delegate during a click leaves every panel the click has not reached to the delegates still live. A
click whose button host is one of the panels its collapse trigger names inside the root, with no
button and no collapse constructed on that element, is refused before either route runs: the
delegate marks, drives, constructs, and prevents nothing. Where one of the two engines exists on
that element, only the other route constructs, and both drive it once. The delegate prevents the
click's default action only when the trigger or the clicked element is an anchor, as Bootstrap's
data API does.
""")

# The departures.
replace("""- A panel inside a transitioning ancestor counts as nested and is not a sibling. Bootstrap counts
  only an ancestor carrying the `collapse` class.
- The sibling collapses are acquired after the accepted `show.vn.collapse` event. Bootstrap acquires
  them before it dispatches its `show` event.
- Showing writes the `transition` token before it removes the `host` token, and completion writes
  the `host` and `shown` tokens before it removes the `transition` token. Bootstrap removes each
  token before it adds the next.
""", """- A panel inside a transitioning ancestor within the parent counts as nested and is not a sibling.
  Bootstrap counts only an ancestor carrying the `collapse` class.
- The sibling collapses are found or constructed after the accepted `show.vn.collapse` event.
  Bootstrap finds or constructs them before it dispatches its `show` event.
- Showing writes the `transition` token before it removes the `host` token, and each completion
  writes the `host` token, and the `shown` token after a show, before it removes the `transition`
  token. Bootstrap's `show` removes `collapse` before it adds `collapsing`, its `hide` adds
  `collapsing` before it removes `collapse` and `show`, and each of its completions removes
  `collapsing` before it adds the next class.
""")
replace("""- Destruction abandons a transition in flight and restores the panel, its triggers, and each sibling
  collapse it constructed. Bootstrap's""", """- Destruction abandons a transition in flight, restores the panel and its triggers, and destroys
  each sibling collapse it constructed. Bootstrap's""")
PATH.write_text(text, encoding='utf-8', newline='\n')
print('ok')
