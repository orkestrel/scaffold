# Splits E35's J-RELEASE-CORE unit before any unit reads it (2026-09-25). recordHostWrite has callers in Carousel,
# Collapse, Tab, Toast, and Dropdown, whose files units in flight own, and a signature change must update every caller in
# the same change. So CORE lands Lifetime, HostSnapshot.write, and Button now, and J-RELEASE-RECORD converts
# recordHostWrite and all its callers after J-SAMEWAY-ENGINES-B and J-MOTION-PROOFS-B land.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\decisions.md')
t = p.read_bytes().decode('utf-8')
old = (
    "2. **J-RELEASE-CORE.** `Lifetime`, `HostSnapshot.write`, and `recordHostWrite` through it. `Button` is the first "
    "consumer, with B1 and its drain. It owns `Lifetime.ts`, `HostSnapshot.ts`, `helpers.ts` (`recordHostWrite` and the "
    "change predicate), `Button.ts`, the `types.ts` and guide sections for these, and the barrel. It starts now, in "
    "parallel with the units in flight, because their files are disjoint."
)
new = (
    "2. **J-RELEASE-CORE.** `Lifetime` and `HostSnapshot.write`. `Button` is the first consumer, with B1 and its drain. "
    "It owns `Lifetime.ts`, `HostSnapshot.ts`, the change predicate in `helpers.ts`, `Button.ts`, the `types.ts` and "
    "guide sections for these, and the barrel. It starts now, in parallel with the units in flight, because their files "
    "are disjoint. It leaves `recordHostWrite`'s signature alone: its callers are in files units in flight own.\n"
    "2a. **J-RELEASE-RECORD.** `recordHostWrite` writes through the snapshot's `write`, and every caller moves in the "
    "same change: `Carousel`, `Collapse`, `Tab`, `Toast`, and `Dropdown`. Each caller's call-start `#save` of a recorded "
    "target goes with it, and so do the S5 T10, Carousel R3, S4 T2 I1, and S6 row 16 witnesses. It runs after CORE, "
    "J-SAMEWAY-ENGINES-B, and J-MOTION-PROOFS-B land, and before the family units that own those files."
)
assert t.count(old) == 1, t.count(old)
t = t.replace(old, new, 1)
p.write_bytes(t.encode('utf-8'))
print('ok')
