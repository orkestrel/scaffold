"""Compares every non-Summary cell of every guide table row against the baseline.

Rows are keyed by their first cell. A pipe preceded by a backslash is not a column
separator, so the split honours the escape a `Shape` or `Signature` cell carries.
"""

import re
import subprocess
import sys

SPLIT = re.compile(r"(?<!\\)\|")


def rows(text):
    found = {}
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped.startswith("|"):
            continue
        cells = [cell.strip() for cell in SPLIT.split(stripped)[1:-1]]
        if not cells or set("".join(cells)) <= {"-", ":"}:
            continue
        found.setdefault(cells[0], []).append(cells)
    return found


before = rows(subprocess.run(["git", "show", "HEAD:guides/worker.md"], capture_output=True, text=True, check=True).stdout)
after = rows(open("guides/worker.md", encoding="utf8").read())

compared = 0
mismatched = []
missing = []
for key, old_list in before.items():
    new_list = after.get(key)
    if new_list is None:
        missing.append(key)
        continue
    for old, new in zip(old_list, new_list):
        compared += 1
        # The final column is the compared Summary cell; every earlier column must travel.
        if old[:-1] != new[: len(old) - 1]:
            mismatched.append((key, old[:-1], new[: len(old) - 1]))

sys.stdout.write(f"rows compared: {compared}\n")
sys.stdout.write(f"rows missing after: {missing}\n")
for key, old, new in mismatched:
    sys.stdout.write(f"MOVED {key}\n  before {old}\n  after  {new}\n")
sys.stdout.write(f"non-Summary cells moved: {len(mismatched)}\n")
