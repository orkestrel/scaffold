"""Lower the all-caps emphasis QF1 names, keeping each sentence's contrast."""

import pathlib

EDITS = [
    (
        "src/core/Qualifier.ts",
        " * The engine is OWNED when self-created (destroyed on `destroy()`) and borrowed",
        " * The engine is owned when self-created (destroyed on `destroy()`) and borrowed",
    ),
    (
        "src/core/factories.ts",
        " * A standalone qualifier creates and OWNS one shared quantitative-plus-logical",
        " * A standalone qualifier creates and owns one shared quantitative-plus-logical",
    ),
    (
        "src/core/helpers.ts",
        " * `resolveField` (a plain string field is ONE key, never dot-split — the split",
        " * `resolveField` (a plain string field is one key, never dot-split — the split",
    ),
    (
        "src/core/helpers.ts",
        " * An UNRESOLVED path renders as the empty string.",
        " * An unresolved path renders as the empty string.",
    ),
    (
        "src/core/helpers.ts",
        " * a finite number is NOT grouped here (grouping is {@link interpolateMessage}'s",
        " * a finite number is not grouped here (grouping is {@link interpolateMessage}'s",
    ),
    (
        "src/core/helpers.ts",
        " * The checked form renders only when `field` and `comparison` are BOTH",
        " * The checked form renders only when `field` and `comparison` are both",
    ),
    (
        "src/core/helpers.ts",
        " * the injected `evaluator`. A membership check (`any` / `none`) over an EMPTY",
        " * the injected `evaluator`. A membership check (`any` / `none`) over an empty",
    ),
    (
        "src/core/helpers.ts",
        " * against the SAME subject snapshot the pass evaluated, so a conclusion the pass",
        " * against the same subject snapshot the pass evaluated, so a conclusion the pass",
    ),
]

for name, old, new in EDITS:
    path = pathlib.Path(name)
    text = path.read_text(encoding="utf8")
    if text.count(old) != 1:
        raise SystemExit(f"{name}: {text.count(old)} occurrences of {old!r}")
    path.write_text(text.replace(old, new), encoding="utf8")
    print(f"{name}: lowered")
