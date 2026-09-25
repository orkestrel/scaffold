# Applies J-CASCADE's three report-only guide patches (units/j-cascade-report.md § Report-only guide patches) to
# guides/veneer.md in the cascade worktree, exactly as returned; each old passage must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\veneer\tmp\worktrees\cascade\guides\veneer.md')
t = p.read_bytes().decode('utf-8')

PATCHES = [
    (
        "alert inserted in the same task has a computed style and its fade still runs. The shipped cascade\n"
        "declares no `.fade` rule, so under it alone a close finds no animation and completes in a\n"
        "microtask; a stylesheet that declares Bootstrap's `.fade` transition makes the close wait for it.\n",
        "alert inserted in the same task has a computed style and its fade still runs. The shipped fade\n"
        "partial fades an alert carrying the `fade` token through its opacity over the `--vn-motion-feedback`\n"
        "duration, so the close waits for that fade and the `--vn-factor-motion` factor on the root rescales\n"
        "the wait. Under a zero factor or reduced motion the fade creates no animation, and the close\n"
        "completes in a microtask.\n",
    ),
    (
        "fade to settle. The shipped `_nav.scss` sheet transitions a control's colors and supplies no pane\n"
        "fade, so a pane fades only under a stylesheet of your own that animates the `fade` token. The call\n",
        "fade to settle. The shipped `_nav.scss` sheet transitions a control's colors, and the shipped fade\n"
        "partial fades a pane carrying the `fade` token over the `--vn-motion-feedback` duration, so the\n"
        "`--vn-factor-motion` factor on the root rescales the wait. The call\n",
    ),
    (
        "The shipped cascade declares no transition on the toast, and no Veneer rule reads the `fade` token,\n"
        "so under the shipped cascade both calls complete in a microtask. Where a sheet of yours carries\n"
        "Bootstrap's `.fade` transition, hiding waits for the fade out. Showing takes the toast from no\n"
        "display to displayed at no opacity, which starts no transition, so `shown.vn.toast` dispatches in a\n"
        "microtask and the fade in runs after it, as the `transition` token leaves.\n",
        "The toast partial declares no transition of its own, and the shipped fade partial fades a toast\n"
        "carrying the `fade` token through its opacity over the `--vn-motion-feedback` duration. Hiding\n"
        "therefore waits for the fade out the `transition` token starts, and the `--vn-factor-motion` factor\n"
        "on the root rescales the wait. Showing a hidden toast takes it from no display to displayed at no\n"
        "opacity, which starts no transition, so `shown.vn.toast` dispatches in a microtask and the fade in\n"
        "runs after it, as the `transition` token leaves. Showing a shown toast first fades it out under\n"
        "the `transition` token and waits for that fade.\n",
    ),
]
for old, new in PATCHES:
    count = t.count(old)
    assert count == 1, (count, old[:70])
    t = t.replace(old, new)
p.write_bytes(t.encode('utf-8'))
print('applied', len(PATCHES))
