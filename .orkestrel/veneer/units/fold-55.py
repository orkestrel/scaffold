# fold-55.py: the disclosure landing (DROPDOWN 4476fb0, NAV c43fc7b, COLLAPSE f3624fc over e4e6a40): record the landings in the
# ROADMAP's B-COLLAPSE … B-SCROLLSPY routing row. The guide's § Showcase helper clause does not apply, because each disclosure key
# renders in a region of its own; the navigation carrier row stays, because the navbar keys are still deferred. Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'fold refused: anchor count {n} in {path} for {old[:50]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'
edit(R, "| B-COLLAPSE … B-SCROLLSPY | `opus` on Opus 5 (the alias serves `claude-opus-5`), one unit per key group per its design verdict ",
        "| B-COLLAPSE … B-SCROLLSPY | `opus` on Opus 5 (the alias serves `claude-opus-5`), one unit per key group per its design verdict; DROPDOWN landed as `4476fb0`, NAV as `c43fc7b`, and COLLAPSE as `f3624fc` (each over a first round and a fix round; the objective lane on `reviewer` on Opus 5.5 while the Codex bench was dark and on `analyst` on Astra after it came live, with `reviewer` on Opus 5.5 and `checker` beside it; COLLAPSE's fix round on `builder`), the plugin rows for Collapse, Dropdown, Tab, and ScrollSpy in the guide with `Owner: J-ENGINE.` ")
print('fold-55 applied')
