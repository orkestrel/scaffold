# Rewrites the two fields of units/j-release-core-audit-3-analyst-brief.md that derivation from round 2's brief left
# naming round 2's subject (2026-09-25): the Subject line's commit and the Focus section's inputs. Each edit must match
# once, or the script stops with nothing written.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\units\j-release-core-audit-3-analyst-brief.md')
t = p.read_bytes().decode('utf-8')
edits = [
    (
        "Read every file at `03526bc` with `git -C C:/Users/mikes/WebstormProjects/veneer show 8b4e9d6:<path>`.",
        "Read every file at `8b4e9d6` with `git -C C:/Users/mikes/WebstormProjects/veneer show 8b4e9d6:<path>`.",
    ),
    (
        "- Rule every claim, and weight claims 1, 2, and 3.\n"
        "- Re-run your round-1 inputs against `03526bc`: the held record from the abort listener, and the `on` getter "
        "that destroys the owner.\n"
        "- For claim 2, trace the listener in both orderings and in a class destroyed inside its construction.",
        "- Rule every claim, and weight claims 2, 3, and 4.\n"
        "- Re-run your round-2 inputs against `8b4e9d6`: the joined child holding a throwing release, destroyed through "
        "its owner and directly, and the child lifetime that ended before it joined.\n"
        "- For claim 4, trace the ending's position in the child's drain, and an owner destruction nested before it.",
    ),
]
for old, new in edits:
    assert t.count(old) == 1, (old[:60], t.count(old))
    t = t.replace(old, new, 1)
p.write_bytes(t.encode('utf-8'))
print('ok')
