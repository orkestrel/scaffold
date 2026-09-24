# Appends E19 (the offcanvas backdrop stays interactive under the isolation; R5's scan dropped) to the
# engine campaign's decisions record. Usage: python append-e19.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md')
text = path.read_text(encoding='utf-8')
assert '## E18' in text, 'E18 absent'
assert 'E19' not in text, 'E19 already recorded'

e19 = (
    "\n## E19 — the offcanvas backdrop stays interactive under the isolation and receives the press itself; "
    "R5's construction-time scan is dropped (2026-09-24)\n\n"
    "J-OFFCANVAS round 1 counted a press as a backdrop press when its target was the backdrop or an element "
    "containing it, because the panel's `Isolation` claimed the backdrop inert and the press fell through to "
    "an ancestor. The round-1 audit showed the reading diverges from Bootstrap in both directions: a press "
    "on an inert element painted above the backdrop falls through to `body` and counts where Bootstrap's "
    "toast container would swallow it, and a painted non-HTML sibling (`Isolation` claims HTML elements "
    "only) is a non-inert target that does not contain the backdrop and is refused where Bootstrap's "
    "backdrop would receive it. The ruling: `IsolationOptions` gains `spare`, the elements the isolation "
    "leaves as they are at construction and at every observer delivery; the panel spares its backdrop; the "
    "press listener counts the backdrop element itself, as Bootstrap's `Backdrop` does; the containment "
    "reading goes. The guide states the one departure that remains: everything outside the panel is inert, "
    "so a press on an element painted above the backdrop falls through to it.\n\n"
    "The same round ruled on the hide: the backdrop's removal is a write of the hide sequence and runs as "
    "the step after the panel's post-settle door, so a hide a reaction stops removes no backdrop; "
    "`Backdrop.hide()` fades and resolves without removing, and `Backdrop.destroy()` removes. `Modal` calls "
    "the two in sequence and is unchanged.\n\n"
    "Design verdict R5 named a delegate construction-time scan for `.offcanvas.show`. The J-OFFCANVAS brief "
    "excluded load adoption and the guide says to construct the engine over shown markup, so R5's letter is "
    "amended: no scan; a consumer constructs `Offcanvas` over a panel that is already shown.\n"
)
path.write_text(text.rstrip('\n') + '\n' + e19, encoding='utf-8', newline='\n')
print('appended E19', len(e19), 'chars')
