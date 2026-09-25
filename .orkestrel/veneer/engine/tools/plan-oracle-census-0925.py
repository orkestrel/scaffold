# Records the round of results of 2026-09-25 in plan.md: ENGINES-A round 4 in audit, J-ORACLE-RECORD returned with its census
# triaged, J-CONCERNS-A round 3 under E34, J-PLACEMENT-141's diagnosis and probe, STRUCK-ROWS ruled, the J-TOAST-SWIPE
# design ruled (E33), the J-ORACLE-FIX units, and J-ORACLE-RECORD's hunks under Pending shared changes. Each line prefix
# must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
lines = p.read_bytes().decode('utf-8').split('\n')


def replace(prefix, new):
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    lines[hits[0]] = new


def delete(prefix):
    hits = [i for i, line in enumerate(lines) if line.startswith(prefix)]
    assert len(hits) == 1, (prefix, len(hits))
    del lines[hits[0]]


replace(
    '- J-SAMEWAY-ENGINES-A round 4',
    "- J-SAMEWAY-ENGINES-A round 4 is committed as `bdecfa1`, with the guide integration `3f62d64`. The replay confirms "
    "the round: the four Collapse cases read red on `dc2a1a7`'s sources, and the 63 mutation rows miss none "
    "(`units/j-sameway-engines-a-red-4-orchestrator.log.txt`, `-mutations-4-orchestrator.log.txt`). The audit runs on "
    "`units/j-sameway-engines-a-audit-claims-4.md`. The checker job on Grok passed claims 4 and 7. `analyst` on Astra "
    "and `reviewer` on Opus 5.5, which audits the settled shape of rounds 2 to 4, are running.",
)
replace(
    '- J-ORACLE-RECORD (',
    "- J-ORACLE-RECORD returned and is committed as `9ea360d` on `unit/oracle-record` (`units/j-oracle-record-report.md`). "
    "The Orchestrator's replay runs (`tools/replay-oracle-record-1.sh`). The audit follows: `analyst` on Astra and the "
    "`checker` job on Grok. Its first census is triaged in `units/j-oracle-census-0925.md`.",
)
replace(
    '- J-CONCERNS-A: round 1',
    "- J-CONCERNS-A round 3 (`units/j-concerns-a-brief-3.md`) is writing. The audit of rounds 1 and 2 ruled FAIL 3, 7 "
    "(`units/j-concerns-a-audit-objective-verdict.md`; the checker job passed 7 and 8). Round 3 gates ScrollSpy's smooth "
    "scroll on reduced motion (E34), removes the history entry the focus case leaves, and proves a nested Button toggle.",
)
replace(
    '- STRUCK-ROWS on Grok',
    "- J-PLACEMENT-141-PROBE returned (`units/j-placement-141-probe-report.md`). The probe `units/j-placement-141-probe.test.ts` "
    "anchors every variant on Chromium 153 except its negative control, which reproduces Chromium 141's round-3 reading "
    "exactly. The Orchestrator's re-run on Chromium 153 runs, and the styles session is asked for the Chromium 141 run.",
)
replace(
    '- J-PLACEMENT-141: on Chromium',
    "- J-PLACEMENT-141: on Chromium 141, a dropdown menu inside a scroller resolves no anchor at all, before any scroll "
    "(`units/j-placement-141-diagnosis-verdict.md`). The probe's Chromium 141 run decides the cause. The fix's design "
    "round follows that run, and the fix lands after J-SAMEWAY-ENGINES-B, serialized with J-ORACLE-FIX-PLACEMENT.",
)
replace(
    '- J-TOAST-SWIPE (E31)',
    "- J-TOAST-SWIPE (E31, E33): the design is ruled (E33). The unit follows J-MOTION-PROOFS-B, because `Toast.test.ts` and "
    "`Carousel.test.ts` pass through that unit first. It carries `Swipe`'s touch-support gate (E33's amendment, from the "
    "census).",
)
replace(
    '- J-ORACLE: RECORD',
    "- J-ORACLE: RECORD landed in audit (see In flight). The Orchestrator's authoritative census follows the engines units. "
    "The fix units from the first census (`units/j-oracle-census-0925.md`):\n"
    "  - J-ORACLE-FIX-OFFCANVAS, after J-MOTION-PROOFS-A lands: a backdrop press under reduced motion leaves focus on "
    "`body`, because the hide completes inside the press's `mousedown` listener. It reads Modal's backdrop path for the "
    "same order.\n"
    "  - J-ORACLE-FIX-PLACEMENT, after J-SAMEWAY-ENGINES-B lands: the menu's `data-popper-placement` carries the full "
    "placement, side and alignment, as Bootstrap's does.\n"
    "  - Then J-ORACLE-GATE after J-ROWS (E28), with the departure rows the census ruled intentional: the `popover` "
    "promotion, `Isolation`'s `inert`, the toast's deprecated `hide` class, and the tooltip's deprecated "
    "`data-bs-original-title`. The styles session is asked for a Chromium 141 run of the comparisons before the gate.",
)
t = '\n'.join(lines)
old = "**Pending shared changes.** J-ORACLE-RECORD writes the styles session's `tests/setupServer.ts`"
i = t.index(old)
j = t.index('\n', i)
t = (
    t[:i]
    + "**Pending shared changes.** J-ORACLE-RECORD's hunks, all in the styles session's files, which it agreed to (D49). "
    "They land from `9ea360d` after the audit. Where the styles session's E-RECEIPTS or E-ID-BUTTON-CASCADE changed the "
    "same file first, the landing merges by hunk.\n"
    "- `tests/setupServer.ts`: the plugin oracle types, constants, recorder, reader, and helpers, with "
    "`recordButtonOracle` routed through the shared `driveOracleBrowser` scaffold. It also imports `../vite.config.js` "
    "and `../configs/src/vite.styles.config.js`.\n"
    "- `tests/setupServer.test.ts`: the export list, and the `plugin oracle` block.\n"
    "- `tests/conformance.test.ts`: the fixture-membership case, one Bootstrap case per plugin, and the live controls.\n"
    "- `tests/fixtures/oracle/<plugin>.json`: eleven new fixtures. `button.json` is byte-identical.\n"
    "J-SAMEWAY-ENGINES-B changes `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` with its door tables, and the "
    "styles session's E-ID-MOTION-FADE round 2 adds `sampleTransition` to the same module (D50). Their landings merge "
    "by hunk."
    + t[j:]
)
p.write_bytes(t.encode('utf-8'))
print('ok')
