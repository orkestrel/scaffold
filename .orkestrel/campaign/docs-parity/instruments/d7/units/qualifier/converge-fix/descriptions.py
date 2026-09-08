"""QF4 createRuling's factory verb and QF7 the stranded literal (Ruling 18)."""

import pathlib

EDITS = [
    (
        "src/core/factories.ts",
        " * Builds a fresh {@link Ruling} from the rule it reacts to and the effect it applies.",
        " * Creates a fresh {@link Ruling} for one rule's firing, carrying the effect it applies.",
    ),
    (
        "src/core/constants.ts",
        " * Names the reserved internal projection namespace a pass's working projection is written\n * under, `'qualification'`.",
        " * Names `'qualification'`, the reserved internal projection namespace a pass's working\n * projection is written under.",
    ),
]

for name, old, new in EDITS:
    path = pathlib.Path(name)
    text = path.read_text(encoding="utf8")
    if text.count(old) != 1:
        raise SystemExit(f"{name}: {text.count(old)} occurrences")
    path.write_text(text.replace(old, new), encoding="utf8")
    print(f"{name}: rewritten")
