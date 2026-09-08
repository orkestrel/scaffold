"""QF9: a complete sentence between each remaining heading and its fence (Ruling 21)."""

import pathlib

EDITS = [
    (
        "### Conditions do not block downstream work\n\n```ts\nconst condition = createRuling(",
        "### Conditions do not block downstream work\n\nA conditional ruling is authored like a blocking one, with a scope and a message:\n\n```ts\nconst condition = createRuling(",
    ),
    (
        "### Referral blocks downstream work\n\n```ts\nconst referral = createRuling(",
        "### Referral blocks downstream work\n\nA referral ruling names the review a subject needs, and takes no scope here:\n\n```ts\nconst referral = createRuling(",
    ),
    (
        "### Observing\n\n```ts\nconst qualifier = createQualifier({",
        "### Observing\n\nThe `on` option registers one listener per event, and `error` receives whatever a\nlistener throws:\n\n```ts\nconst qualifier = createQualifier({",
    ),
]

path = pathlib.Path("guides/qualifier.md")
text = path.read_text(encoding="utf8")
for old, new in EDITS:
    if text.count(old) != 1:
        raise SystemExit(f"{text.count(old)} occurrences of {old.splitlines()[0]!r}")
    text = text.replace(old, new)
path.write_text(text, encoding="utf8")
print("guides/qualifier.md: lead-ins added")
