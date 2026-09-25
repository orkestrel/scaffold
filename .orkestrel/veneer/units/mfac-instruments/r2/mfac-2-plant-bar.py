# Round 2 plant: restores round 1's direct factor read on the progress bar.
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
old = "calc(var(--vn-motion-feedback) * 4)"
assert s.count(old) == 1
p.write_text(s.replace(old, "calc(600ms * var(--vn-factor-motion))"))
