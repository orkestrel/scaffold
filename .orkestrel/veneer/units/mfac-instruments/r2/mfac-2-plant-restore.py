# Round 2 plant: makes the sweep reader skip the factor restore after each drive.
import sys, pathlib
p = pathlib.Path(sys.argv[1]); s = p.read_text()
old = """			if (value === '') style.removeProperty(name)
			else style.setProperty(name, value, priority)
			scene.clear()
"""
assert s.count(old) == 1
p.write_text(s.replace(old, "			scene.clear()\n"))
