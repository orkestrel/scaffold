# Replaces the engine plan's § Pending shared changes block (2026-09-25, 07:25 UTC). J-ORACLE-RECORD's hunks landed
# with 63eabbd, so the block now records that landing and keeps only the change still pending: J-SAMEWAY-ENGINES-B's
# door tables in tests/setupBrowser.ts.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
t = p.read_bytes().decode('utf-8')
lines = t.split('\n')
start = [i for i, line in enumerate(lines) if line.startswith('**Pending shared changes.** ')]
end = [i for i, line in enumerate(lines) if line.startswith('J-SAMEWAY-ENGINES-B changes `tests/setupBrowser.ts`')]
assert len(start) == 1 and len(end) == 1 and start[0] < end[0], (start, end)
lines[start[0] : end[0] + 1] = [
    '**Pending shared changes.** J-SAMEWAY-ENGINES-B changes `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` '
    'with its door tables. Its landing merges the styles session\'s `sampleTransition` and `readCentre` there by hunk '
    '(D50).',
    '',
    '**Landed shared changes.** J-ORACLE-RECORD\'s hunks in the styles session\'s `tests/setupServer.ts`, '
    '`tests/setupServer.test.ts`, `tests/conformance.test.ts`, and `tests/fixtures/oracle/` landed with `63eabbd`, '
    'merged by hunk with E-RECEIPTS and LEDGER-ADDITIONS under D49. The one edit made in the styles session\'s code, '
    'the `build` locals renamed `version`, is `0325b56`.',
]
p.write_bytes('\n'.join(lines).encode('utf-8'))
print('ok')
