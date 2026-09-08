"""QF3 the guard table's sentence (Ruling 27), QF6 the drop-in header (Ruling 21), QF8 the README route."""

import pathlib

EDITS = [
    (
        "guides/qualifier.md",
        "A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\\|`. In a guard table a `Shape` cell holds the type the guard narrows to.",
        "In a guard table a `Shape` cell holds the type the guard narrows to.",
    ),
    (
        "tests/guides.test.ts",
        "// package's own, and are the only part a sibling package changes.",
        "// package's own, as is the executed section that closes the file.",
    ),
    (
        "README.md",
        "definition; `Qualifier` only evaluates what it is given. Environment-agnostic — no\nI/O, no browser or server assumptions. Part of the `@orkestrel` line.",
        "definition; `Qualifier` only evaluates what it is given. Inject a\n[`@orkestrel/reason`](https://github.com/orkestrel/reason) `ReasonInterface` where\nqualification shares an engine with the rest of your reasoning, and call `destroy()`\nwhen the qualifier's work is done. Environment-agnostic — no I/O, no browser or\nserver assumptions. Part of the `@orkestrel` line.",
    ),
]

for name, old, new in EDITS:
    path = pathlib.Path(name)
    text = path.read_text(encoding="utf8")
    if text.count(old) != 1:
        raise SystemExit(f"{name}: {text.count(old)} occurrences")
    path.write_text(text.replace(old, new), encoding="utf8")
    print(f"{name}: rewritten")
