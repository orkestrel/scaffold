# Appends the carried-findings rows from the tooltip round-4 and offcanvas round-2 audits (the Placement
# positioning writes after a relocating promotion, the Modal held-backdrop observation, the isolation
# claim semantics) to the plan. Usage: python patch-plan-carried-5.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md')
text = path.read_text(encoding='utf-8')
rows = (
    "| `Placement`'s constructor finishes its positioning writes (compensation, anchor, side, arrow) on a tip an opening `beforetoggle` listener moved during the promotion, and the tip stays promoted and positioned in the other container until destruction restores it (`units/j-tooltip-probe-promotion.log.txt`; the round-4 objective lane's claim 3); E18 reserved the `Placement` change to a successor, and the tooltip's round 5 states the bound in the guide and the `show` remarks | J-TOOLTIP round 4, objective lane | J-POPOVER (owns the tip's `Placement` work through the R12 seam) | `Placement` reads an ownership door the owner supplies after `showPopover()` and stops its positioning writes when it fails, restoring what it acquired without moving the tip; Dropdown's contract unchanged; the tooltip's bound sentence deleted |\n"
    "| A Modal without the `fade` token whose hide door fails after `Backdrop.hide()` resolves keeps a connected backdrop carrying neither `fade` nor `show`, which the `overlay-backdrop` mixin paints opaque (the offcanvas round-2 subjective lane's OR1, NOT-EVIDENCED: derived, no capture); the modal is shown again in that state, so the held backdrop is the shown state's | J-OFFCANVAS round 2, subjective lane | J-INTEGRATION | a capture of the state under a re-added `show` token, and a Modal case or a ruling that none is needed |\n"
    "| The `is*Event` guard family repeats one body per detail shape (`isModalEvent`, `isOffcanvasEvent`, `isTabEvent`; `isCollapseEvent`, `isAlertEvent`, `isToastEvent`); the offcanvas round-1 objective lane proposes one shared guard per detail shape (`isRelatedEvent`), the subjective lane keeps the family | J-OFFCANVAS round 1 | J-INTEGRATION (a design round's pass) | one guard per detail shape adopted across the family, or the ruling that the family stays |\n"
)
anchor = '| Finding | Source | Carrier | Closes with |\n| --- | --- | --- | --- |\n'
idx = text.index(anchor) + len(anchor)
table_end = text.index('\n\n', idx)
text = text[:table_end] + '\n' + rows.rstrip('\n') + text[table_end:]
path.write_text(text, encoding='utf-8', newline='\n')
print('carried rows appended')
