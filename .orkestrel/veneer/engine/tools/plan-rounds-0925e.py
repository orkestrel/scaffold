# Updates plan.md's In flight lines for J-ORACLE-RECORD round 3 and J-MOTION-PROOFS-A round 3's audit (2026-09-25).
# Each line prefix must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
lines = p.read_bytes().decode('utf-8').split('\n')


def replace(prefix, new):
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new


replace(
    '- J-ORACLE-RECORD round 2 (`units/j-oracle-record-brief-2.md`) is writing.',
    "- J-ORACLE-RECORD round 3 (`units/j-oracle-record-brief-3.md`) is writing. Round 2 is committed as `c66e317`, and "
    "its audit ruled FAIL 3, 5 (`units/j-oracle-record-audit-2-verdict.md`). E28 is amended again. Round 3 records:\n"
    "  - exact scroll offsets;\n"
    "  - each element's tag;\n"
    "  - each element's ordered content;\n"
    "  - a `never` check in `drivePluginAction`;\n"
    "  - the wording fixes.\n"
    "  The census's second reading adds one departure, ScrollSpy's smooth-scroll destination "
    "(`units/j-oracle-census-0925.md` § The second reading).",
)
replace(
    '- J-MOTION-PROOFS-A round 3 (`units/j-motion-proofs-a-brief-3.md`) is writing.',
    "- J-MOTION-PROOFS-A round 3 is committed as `5b98071`, with the guide integration `180d513`. Its replay reads every "
    "row killed by an assertion and the plant green (`units/j-motion-proofs-a-replay-3.log.txt`). `analyst` on Astra "
    "audits it (`units/j-motion-proofs-a-audit-claims-3.md`).",
)
p.write_bytes('\n'.join(lines).encode('utf-8'))
print('ok')
