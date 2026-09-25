# Adds the reopened fixture-lookup row to plan.md's carried findings after the test-rule debt row, and a pointer from the
# carried findings' intro to units/rebaseline-0925-rulings.md (2026-09-25). Each anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')
lines = t.split('\n')
hits = [i for i, line in enumerate(lines) if line.startswith('| Test-rule debt (RECON-TESTS')]
assert len(hits) == 1, len(hits)
row = (
    "| Fixture lookups: `readElement` in `tests/setupBrowser.ts` takes the first `querySelector` match through "
    "`requireValue` instead of `requireMatch`, and `readOracleButton` only forwards to `readButton` "
    "(STRUCK-ROWS, `units/rebaseline-0925-rulings.md`, which reopens the row `units/rebaseline-0925.md` struck) "
    "| the Orchestrator, 2026-09-25 | J-TESTRULES | `readElement` routes through `requireMatch` or a ruling says why it "
    "takes the first match; `readOracleButton` is folded into its caller or carries a boundary `AGENTS.md`'s wrapper "
    "rule admits |"
)
lines.insert(hits[0] + 1, row)
t = '\n'.join(lines)
old = "## Carried findings\n\n"
assert t.count(old) == 1
t = t.replace(
    old,
    old + "The struck rows of 2026-09-25 are ruled in `units/rebaseline-0925-rulings.md`, which reopens the fixture-lookup row.\n\n",
    1,
)
p.write_bytes(t.encode('utf-8'))
print('ok')
