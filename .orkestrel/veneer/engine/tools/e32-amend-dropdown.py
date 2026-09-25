# Adds E32's third amendment (2026-09-25), which settles J-DROPDOWN-SETTLE by the first amendment's criterion: Dropdown
# completes synchronously, as Bootstrap's does, and a menu entry animation is cascade feedback. It is inserted
# immediately before the E34 heading, after the second amendment.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\decisions.md')
t = p.read_bytes().decode('utf-8')
anchor = '## E34 — an engine gates the motion it starts in script on the reduced-motion preference (2026-09-25)'
assert t.count(anchor) == 1, t.count(anchor)
amendment = (
    "E32 amended a third time (2026-09-25), settling J-DROPDOWN-SETTLE by the first amendment's criterion. **`Dropdown` "
    "completes synchronously:** Bootstrap 5.3.8's dropdown dispatches `shown.bs.dropdown` and `hidden.bs.dropdown` "
    "without waiting on a transition, so the completion bullet does not bind it, as it does not bind Button or "
    "ScrollSpy. A menu entry animation that the styles session ships is cascade feedback: `shown.vn.dropdown` does not "
    "wait for it, and a dropdown proof reads no motion at completion. The design round J-DROPDOWN-SETTLE planned is "
    "struck as satisfied. A hide removes the `show` token at once, as Bootstrap's does, so an exit animation on the menu "
    "does not run through the engine.\n\n"
)
t = t.replace(anchor, amendment + anchor, 1)
p.write_bytes(t.encode('utf-8'))
print('ok')
