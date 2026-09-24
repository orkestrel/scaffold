# Appends the E18 amendments the tooltip round-4 audit ruled: the construction form for a value-returning
# step, the promotion bound carried to J-POPOVER, the E13 clause superseded, and the two wording changes.
# Usage: python append-e18-amend.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md')
text = path.read_text(encoding='utf-8')
assert '## E18' in text and '## E19' in text, 'E18 or E19 absent'
marker = 'E18 amended at the J-TOOLTIP round-4 audit'
assert marker not in text, 'already amended'
amend = (
    "\n\nE18 amended at the J-TOOLTIP round-4 audit (2026-09-24). (1) A value-returning step (a cancelable "
    "dispatch, `buildTip`, `#discard`) uses the construction form E18 already gave `#place`: call, use the value, "
    "then read `#holds(change, shown)`; the letter that put every call inside an `#apply` callback forced "
    "one-element arrays to ferry the value out, an idiom no sibling has, and it goes. (2) The constraint's clause "
    "\"it does not defend against the E13 re-entry\" is superseded: J-SNAPSHOT closed E13 on `main`, and the "
    "tooltip's restoration sentence states the closed behaviour at its landing. (3) The interface sentences read "
    "\"hides it despite prevention\" for \"conceals\" and \"can start another change\" for \"may\", per "
    "`.claude/rules/writing.md`; the verbatim requirement follows the corrected wording. (4) The promotion: "
    "`Placement`'s constructor finishes its positioning writes on a tip an opening `beforetoggle` listener moved "
    "(`units/j-tooltip-probe-promotion.log.txt`), which E18's invariant forbids; both round-4 lanes recommend a "
    "construction guard in `Placement` now, and the user's landing instruction routes it to J-POPOVER, which owns "
    "the tip's `Placement` work through the R12 seam. Until it lands, the guide's door paragraph and the `show` "
    "remarks state the bound in one sentence each, and the departures list names it as the one interval the door "
    "mechanism does not cover.\n"
)
head, sep, tail = text.partition('\n## E19')
assert sep, 'E19 heading not found'
text = head.rstrip('\n') + amend + '\n## E19' + tail
path.write_text(text, encoding='utf-8', newline='\n')
print('E18 amended')
