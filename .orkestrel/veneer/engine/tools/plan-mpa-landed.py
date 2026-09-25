# Records J-MOTION-PROOFS-A's landing (Veneer 1290162) and the follow-on state in plan.md (2026-09-25): the marker, the
# Landed entry, In flight (ENGINES-B round 4 in audit, J-ORACLE-RECORD landing, J-MOTION-PROOFS-B writing), and the queue
# line for J-MOTION-PROOFS-B. Each prefix must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')


def swap(old, new):
    global t
    assert t.count(old) == 1, (old[:70], t.count(old))
    t = t.replace(old, new, 1)


def swap_line(prefix, new):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new
    t = '\n'.join(lines)


def delete_line(prefix):
    global t
    lines = t.split('\n')
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    del lines[hits[0]]
    t = '\n'.join(lines)


swap(
    "Veneer `origin/main` `3058570` (this session's J-SAMEWAY-ENGINES-A landing)",
    "Veneer `origin/main` `1290162` (this session's J-MOTION-PROOFS-A landing, over the styles session's E-ID-MOTION-FADE)",
)
swap(
    "- 2026-09-25: J-SAMEWAY-ENGINES-A as `3058570`, pushed.",
    "- 2026-09-25: J-MOTION-PROOFS-A as `1290162`, pushed. Its rounds are `88036ca` and `8e3e222`, then `beb7cd8`, then "
    "`5b98071` and `180d513`, then the plant (round 4), then `3b16273`. Its verdicts are "
    "`units/j-motion-proofs-a-audit-verdict.md` and `-audit-3-verdict.md` to `-audit-5-verdict.md`. The landing's first "
    "chain found the showcase modal case racing the new settle, and round 5 fixed it. The second chain merged the styles "
    "session's `sampleTransition` beside `readDuration` by hunk (`tools/resolve-setupbrowser-test-0925.py`) and read "
    "every gate green except the third standing row.\n"
    "- 2026-09-25: J-SAMEWAY-ENGINES-A as `3058570`, pushed.",
)
swap_line(
    "- J-SAMEWAY-ENGINES-B round 3 (`units/j-sameway-engines-b-brief-3.md`",
    "- J-SAMEWAY-ENGINES-B round 4 is committed as `040f4f3`, with the integration `3bb9afb`. Its replay confirms the "
    "round: three cases read red on `87dc147`, and the 57 rows miss none. `analyst` on Astra audits it "
    "(`units/j-sameway-engines-b-audit-claims-4.md`). Round 3's audit ruled FAIL 2, 7 "
    "(`units/j-sameway-engines-b-audit-3-verdict.md`): the Tooltip link record, and a stranded Dropdown placement.",
)
swap_line(
    "- J-MOTION-PROOFS-A round 3 is committed",
    "- J-MOTION-PROOFS-B (`units/j-motion-proofs-b-brief.md`, `opus` on Opus 5.5) writes in `tmp/worktrees/motion-proofs-b` "
    "from `1290162`: the Collapse, Toast, Tab, and Carousel proofs under E32, and the Toast `shown` finding.",
)
swap_line(
    "- J-ORACLE-RECORD round 3 (`units/j-oracle-record-brief-3.md`) is writing.",
    "- J-ORACLE-RECORD passed its round-3 audit (`units/j-oracle-record-audit-3-verdict.md`) and is landing. Its merge of "
    "`main` kept the styles session's E-RECEIPTS hunks beside its own, by hunk under D49 "
    "(`tools/resolve-oracle-record-merge.py`).",
)
delete_line("- J-MOTION-PROOFS-B (E32; `units/j-motion-proofs-b-brief.md` is drafted)")
p.write_bytes(t.encode('utf-8'))
print('ok')
