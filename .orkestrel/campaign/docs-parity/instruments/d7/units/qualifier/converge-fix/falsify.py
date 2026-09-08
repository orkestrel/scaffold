"""Flip the fence claim on both sides of the titled pair, or restore it."""

import pathlib
import sys

TRUE = "'description' in definition // true"
FALSE = "'description' in definition // false"
FILES = ["guides/qualifier.md", "src/core/factories.ts"]
old, new = (FALSE, TRUE) if sys.argv[1] == "flip" else (TRUE, FALSE)

for name in FILES:
    path = pathlib.Path(name)
    text = path.read_text(encoding="utf8")
    assert text.count(old) == 1, (name, text.count(old))
    path.write_text(text.replace(old, new), encoding="utf8")
    print(f"{name}: {sys.argv[1]}")
