# Updates plan.md at 03:35 (2026-09-25): adds J-ISOLATION-SHADOW to the queue after the J-RELEASE units, and rewrites
# the In flight lines for J-MOTION-PROOFS-B (both rounds in audit) and J-ORACLE-FIX-OFFCANVAS (round 2 writing).
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


swap_line(
    "- J-MOTION-PROOFS-B round 2 (`units/j-motion-proofs-b-brief-2.md`",
    "- J-MOTION-PROOFS-B rounds 1 and 2 are in audit (`units/j-motion-proofs-b-audit-claims.md`), with `analyst` on Astra "
    "and `reviewer` on Opus 5.5. Round 1 is `0de17f1`, with the integration `f03690f`: every proof is converted, and "
    "Toast's `shown` settles on the fade in. Round 2 is `6c98bf4`, with the integration `fd82ae9`: Carousel's `slid` "
    "settles on both items. The replay read every row killed, the plant green, and a clean tree "
    "(`units/j-motion-proofs-b-replay-2.log.txt`).",
)
swap_line(
    "- J-ORACLE-FIX-OFFCANVAS round 1 is committed as `eaf3908`",
    "- J-ORACLE-FIX-OFFCANVAS round 1 (`eaf3908`) ruled FAIL 7,9 (`units/j-oracle-fix-offcanvas-audit-verdict.md`). The "
    "press misses a focus return inside one shadow root, and three sentences are false. Round 2 "
    "(`units/j-oracle-fix-offcanvas-brief-2.md`) is writing.",
)
old = "  Each is serialized against the units on its files."
assert t.count(old) == 1, t.count(old)
t = t.replace(
    old,
    old
    + "\n- J-ISOLATION-SHADOW, after J-RELEASE-PRIMITIVES, which owns `Isolation.ts` first. `Isolation` stops its walk at "
    "a shadow boundary, so a panel directly in a shadow root leaves the outside without an `inert` claim (the "
    "J-ORACLE-FIX-OFFCANVAS objective verdict, from source). The unit rules first whether a panel in a shadow root is a "
    "supported host, because the guide requires only \"an HTMLElement in the current realm\". Then it repairs the walk, "
    "or states the limit.",
    1,
)
p.write_bytes(t.encode('utf-8'))
print('ok')
