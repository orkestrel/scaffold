# Records J-CONCERNS-A's landing (Veneer d3ad3ab) in plan.md (2026-09-25): the Landed entry, the In flight line struck,
# the marker's Veneer head, and the exit ledger's design 4 and kickoff 3 row narrowed to what remains. Each anchor must
# occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')
lines = t.split('\n')
hits = [i for i, line in enumerate(lines) if line.startswith('- J-CONCERNS-A passed its round-3 audit')]
assert len(hits) == 1
del lines[hits[0]]
t = '\n'.join(lines)


def swap(old, new):
    global t
    assert t.count(old) == 1, (old[:70], t.count(old))
    t = t.replace(old, new, 1)


swap(
    "Veneer `origin/main` `094a71e` (this session's ROADMAP row, over the styles session's `2376710`)",
    "Veneer `origin/main` `d3ad3ab` (this session's J-CONCERNS-A landing, over the styles session's `21c821a`)",
)
swap(
    "- 2026-09-25: the ROADMAP J-ENGINE row as `a0bee24`,",
    "- 2026-09-25: J-CONCERNS-A as `d3ad3ab`, pushed. Its rounds are `e92fb7e`, then `bcea965`, then `0cb4433` with "
    "the integration `90e8b60` (`units/j-concerns-a-audit-verdict.md`, `units/j-concerns-a-audit-3-verdict.md`). The "
    "landing chain (`tools/w2-land-2d-concerns-a.log.txt`, `tools/w2-land-rest-concerns-a.log.txt`) read "
    "`format:check`, `lint:check`, `check`, `build`, and `test:service` green, and each `test` project green except the "
    "third standing row, which E5 excludes.\n"
    "- 2026-09-25: the ROADMAP J-ENGINE row as `a0bee24`,",
)
swap(
    "| A proof, or a ruling with evidence that the concern does not apply, for Dropdown's motion, ScrollSpy's cancellation, focus, and motion, Popover's cancellation, and Button's focus and motion; E24 in the in-flight engines; the Chromium 141 run of the engine suites | J-CONCERNS; J-SAMEWAY-ENGINES-A and -B; the styles session's 141 run at exit |",
    "| A proof, or a ruling with evidence that the concern does not apply, for Dropdown's motion and Popover's cancellation (ScrollSpy's and Button's cells closed with J-CONCERNS-A, `d3ad3ab`); E24 in the in-flight engines; the Chromium 141 run of the engine suites | J-CONCERNS-B; J-SAMEWAY-ENGINES-A and -B; the styles session's 141 run at exit |",
)
p.write_bytes(t.encode('utf-8'))
print('ok')
