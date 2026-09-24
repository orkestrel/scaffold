# Appends E17 (the hint tooltip's platform dismissal bridge) to the engine session's decisions.
import pathlib

p = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md')
t = p.read_text(encoding='utf-8')
assert 'E17' not in t
e17 = (
    "\n\n## E17 — the hint tooltip's platform dismissal is bridged after the close, not before it (2026-09-24)\n\n"
    "R9 of the design verdict reads that a hint tooltip bridges the platform's dismissal through a cancelable `beforetoggle` into `hide.vn.tooltip`. Chromium 153 dispatches the closing `beforetoggle` of a `popover=\"hint\"` element with `cancelable` false (`units/j-tooltip-probe-1.log.txt`, the J-TOOLTIP round-1 platform probe), so the platform closes the tip on Escape, on an outside click, and when another hint opens before any engine code can refuse it. The tooltip therefore runs its hide sequence after the platform's close, dispatching the cancelable `hide.vn.tooltip`; when a listener prevents that hide, the tooltip promotes the tip again. R9's letter is amended to this bridge, the guide's `#### Tooltip` states it as a departure from Bootstrap's `hide` refusal, and the `Popover` unit inherits it.\n"
)
t = t.rstrip('\n') + e17
p.write_text(t, encoding='utf-8', newline='\n')
print('E17 appended')
