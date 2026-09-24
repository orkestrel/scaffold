# Rewrites the plan's in-flight paragraph after the J-TOOLTIP landing. The landing's main tip is passed
# as the first argument. Usage: python patch-plan-inflight-7.py <mainTip>
import pathlib
import sys

tip = sys.argv[1]
path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md')
text = path.read_text(encoding='utf-8')
start = text.index('**In flight (this session).**')
end = text.index('\n', start)
paragraph = (
    f"**In flight (this session).** Nothing is in flight. Landed 2026-09-24 after J-HELPERS: J-TESTPIN (`f22f02c`), "
    f"J-SNAPSHOT (`c21fd17`), J-OFFCANVAS (`2d95b37`), and J-TOOLTIP (`{tip}`, pushed): the Tooltip engine with the E18 "
    f"door mechanism, its Placement arrow and hint promotion, the native sanitizer, the parsers, and the guide's "
    f"`#### Tooltip` (`units/j-tooltip-brief.md` to `-6.md`, the reports, the audit verdicts through "
    f"`units/j-tooltip-audit-6-verdict.md`, `units/j-tooltip-landing.log.txt`). The handoff for a cold session is "
    f"`handoff.md`; the tools are under `tools/`. Landed and pruned: W0 to W2 and J-HELPERS (`fd96a0b1`, `dc681254`); "
    f"the J-TESTPIN, J-SNAPSHOT, J-OFFCANVAS, and J-TOOLTIP records are retained here until the next prune at a landing "
    f"boundary (`orkestrel-debrief` § retention). Queue: J-POPOVER (W4; `units/j-popover-brief.md` is staged with "
    f"`POPOVER_BASE` to fill with `{tip}`; it carries the `Placement` guard, the Popover TSDoc mirror, `#### Placement`, and "
    f"the tooltip's carried bounds), J-INTEGRATION and J-ROWS (W5; every row in § Carried findings), then J-SHOWCASE and "
    f"E-VUE after the baseline closes. Nothing on screen reacts yet: no page constructs a `Delegate`; a unit mounting one "
    f"over the showcase markup is the shortest path and waits on the user's word."
)
text = text[:start] + paragraph + text[end:]
old = '| J-POPOVER (owns the tip'
assert old in text
path.write_text(text, encoding='utf-8', newline='\n')
print('plan patched')
