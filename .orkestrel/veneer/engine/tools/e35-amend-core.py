# Appends E35's first amendment (2026-09-25), from the J-RELEASE-CORE round-1 audit: the no-change join covers a record
# a restoration still has to write back, a hold after destruction began returns false for every record, a joined child
# leaves its owner's ledger when its own lifetime ends, and a class joins before it runs any consumer code.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\decisions.md')
t = p.read_bytes().decode('utf-8')
anchor = "8. **J-RELEASE-DELEGATE.** `Delegate`, rows 8 to 10 and row 11 read through the ledger, after units 4 to 7."
assert t.count(anchor) == 1, t.count(anchor)
amendment = (
    "\n\nE35 amended at the J-RELEASE-CORE round-1 audit (2026-09-25; `units/j-release-core-audit-verdict.md`):\n"
    "- **The no-change join covers a pending restoration.** A write that changes nothing joins the record that a live "
    "holder holds, or that a restoration still has to write back. This is E25's takeover rule: without the join, the "
    "restoration writes the earliest value over the state of an engine constructed inside it. Otherwise the write "
    "records nothing.\n"
    "- **A hold after destruction began returns `false` for every record.** The rule covers a record the lifetime already "
    "holds, which the drain gives back. The caller takes nothing further.\n"
    "- **A joined child leaves its owner's ledger when its own lifetime ends.** `join` ends the owner's holding of the "
    "child when the child is destroyed directly, so an owner that builds and ends a child on every change keeps a "
    "bounded ledger. No adopting engine needs a rule of its own for it.\n"
    "- **A class joins before it runs any consumer code.** It joins right after its registry claim, before it reads an "
    "option, a hook, or a getter, so a destruction that code starts reaches it."
)
t = t.replace(anchor, anchor + amendment, 1)
p.write_bytes(t.encode('utf-8'))
print('ok')
