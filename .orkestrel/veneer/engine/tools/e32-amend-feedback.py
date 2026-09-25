# Adds E32's second amendment (2026-09-25), from the J-MOTION-PROOFS-B audit: the completion bullet binds the elements an
# engine moves, and not the feedback transitions a token change starts on a control. It is inserted immediately before
# the E34 heading, so it sits after E32's first amendment, which stands at the end of the E33 block.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\decisions.md')
t = p.read_bytes().decode('utf-8')
anchor = '## E34 — an engine gates the motion it starts in script on the reduced-motion preference (2026-09-25)'
assert t.count(anchor) == 1, t.count(anchor)
amendment = (
    "E32 amended again at the J-MOTION-PROOFS-B audit (2026-09-25; `units/j-motion-proofs-b-audit-verdict.md`, claim 7). "
    "**The completion bullet binds the elements an engine moves, and not a feedback transition that a token change starts "
    "on a control.** Tab settles on its panes, and Carousel settles on its outgoing and incoming items. Neither settles "
    "on a nav link or an indicator, and either feedback transition may outlast the completion event. This follows "
    "Bootstrap 5.3.8: its tab waits on the pane's transition, and its carousel waits on the active item's. The feedback "
    "is the cascade's, and a proof reads the moved elements only.\n\n"
)
t = t.replace(anchor, amendment + anchor, 1)
p.write_bytes(t.encode('utf-8'))
print('ok')
