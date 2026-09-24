# Appends the E13 closure amendment and the E18 ruling to the engine campaign's decisions record.
# Usage: python append-e18.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md')
text = path.read_text(encoding='utf-8')
marker = 'E17 amended at the J-TOOLTIP round-2 audit (2026-09-24)'
assert marker in text, 'E17 amendment absent'
assert 'E18' not in text, 'E18 already recorded'

e13 = (
    "\n\nE13 amended at the J-SNAPSHOT round-1 audit (2026-09-24): J-SNAPSHOT closes the presence bound and the "
    "write-back re-entry. Every snapshot that saves a class token or an inline property on an element shares one "
    "record of whether the element carried the `class` or `style` attribute, read at the first save, and only the "
    "last holder judges the removal after its own writes; a `restore` a reaction calls on the same snapshot writes "
    "back every target the interrupted restoration still owns, an entry whose write is running excepted, so the "
    "interrupted call writes nothing more. `HostSnapshot.ts` changes for both; the guide's bounded sentences in "
    "§ Ownership and restoration, `#### Dropdown`, and `#### Modal` state the closed behaviour. The shared "
    "per-target record across engines that `#### Tab` and `#### Carousel` name J-SNAPSHOT-SHARED for is a "
    "different bound and stays with that unit.\n"
)

e18 = (
    "\n## E18 — the Tooltip's door mechanism: one guarded step, an undo rule, and the contract on the interface (2026-09-24)\n\n"
    "Three audit rounds found the same class of defect in `Tooltip.ts` through a new door each: a write the change "
    "performs after consumer code ran with no lifetime, identity, or container read between them. Under "
    "`.claude/rules/quality.md` § Rounds and verdicts the fourth round is a ruling, taken with a design round's "
    "adversarial pass (`units/j-tooltip-doors-verdict.md`, reconciling the `planner` and `analyst` lanes on "
    "`units/j-tooltip-doors-brief.md`).\n\n"
    "**Invariant.** A change performs no write, dispatch, element move, or sanitizer call after consumer code has "
    "run unless it has since read that the tooltip is live, that the change is still its own, and, from the tip's "
    "insertion until its removal, that the tip it holds is in the container it went into and carries the `shown` "
    "token exactly when the change expects it.\n\n"
    "**Constraint.** The tooltip never moves back, removes, or repositions a tip or an element that other code "
    "moved; it undoes a move only while the node is still where the tooltip put it. Through destruction it keeps "
    "restoring the attributes it wrote and returning the content still in its slots. It adds no read before a "
    "step, no observer, and no inerting, and it does not defend against the E13 re-entry.\n\n"
    "**Interface.** `TooltipInterface.show` and `hide` remarks, `TooltipEventMap.inserted`, `shown`, `hidden`, and "
    "`hide` carry the sentences the verdict fixes; the `hide` sentence states the E17 re-promotion exception "
    "(O1 of the round-3 audit).\n\n"
    "**Mechanism.** The siblings' idiom: `#apply(change, shown, write)` runs one write and reads "
    "`#holds(change, shown: boolean | undefined)` after it; every platform write, dispatch, element move, and "
    "sanitizer call inside `show`, `#conceal`, `#build`, and `#occupy` is one step; `#holding` goes; the build "
    "resolves every content value before its first write; `#discard(): boolean` reads the container before "
    "removing and reports whether the tip left the document; completion reads the full door before releasing the "
    "change and dispatching. A relocation inside the platform's `beforetoggle` dispatch is reachable through the "
    "`inserted` event and is repaired, not documented. `Placement`, `helpers.ts`, and `HostSnapshot` are unchanged "
    "by the ruling; J-POPOVER inherits the mechanism through the R12 seam. Round 4 of J-TOOLTIP implements it "
    "(`units/j-tooltip-brief-4.md`).\n"
)

head, sep, tail = text.partition(marker)
line_end = tail.find('\n')
if line_end == -1:
    text = text + e13 + e18
else:
    # The E17 amendment is one paragraph; the E13 amendment and E18 follow the end of the file.
    text = text.rstrip('\n') + '\n' + e13 + e18
path.write_text(text, encoding='utf-8', newline='\n')
print('appended', len(e13) + len(e18), 'chars')
