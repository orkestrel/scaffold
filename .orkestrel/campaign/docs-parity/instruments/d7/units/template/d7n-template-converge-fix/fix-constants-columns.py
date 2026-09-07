"""Corrects the Constants rows `apply-guide.py` wrote: it inserted each `Shape`
cell before the `Kind` cell, and the header reads `API | Kind | Shape | Summary`.
This swaps the two cells back into header order.

Run from the checkout root:
python3 tmp/d7n-template-converge-fix/fix-constants-columns.py
"""

import pathlib
import re

PATH = pathlib.Path("guides/template.md")
NAMES = ("FILL_PATTERN", "DEFAULT_MISSING_POLICY", "DEFAULT_LOCALE", "UNSAFE_FIELD_SEGMENTS")

text = PATH.read_text(encoding="utf-8")
for name in NAMES:
    pattern = re.compile(r"\| (`" + name + r"` +)\| (`[^`]+`) +\| const +\|")
    replaced, count = pattern.subn(lambda m: f"| {m.group(1)}| const | {m.group(2)} |", text)
    if count != 1:
        raise SystemExit(f"expected one row for {name}, matched {count}")
    text = replaced

PATH.write_text(text, encoding="utf-8")
print(f"wrote {PATH}")
