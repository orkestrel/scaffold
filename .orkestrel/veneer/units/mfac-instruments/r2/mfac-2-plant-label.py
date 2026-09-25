# Round 2 plant: restores round 1's direct factor read on the floating label.
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
old = "calc(var(--vn-motion-feedback) / 1.5)"
assert s.count(old) == 2
p.write_text(s.replace(old, "calc(100ms * var(--vn-factor-motion))"))
