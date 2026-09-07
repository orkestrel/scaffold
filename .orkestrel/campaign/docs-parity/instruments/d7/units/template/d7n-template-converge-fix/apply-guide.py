"""Applies the d7n-template-converge-fix guide edits: the Ruling 15 convention
sentence between `### Types` and its table, the Ruling 12 / 19 `Shape` cells, the
Ruling 18 `Shape` column on the Constants table, and the Ruling 14 titled fence.

Run from the checkout root: python3 tmp/d7n-template-converge-fix/apply-guide.py
"""

import pathlib

PATH = pathlib.Path("guides/template.md")
CONVENTION = (
    "A `Shape` cell holds an interface's data members as bare names in braces, "
    "`?` marking an optional member and `plus` introducing its call-signature "
    "members, and a type alias's own type literal with a union's arms escaped as `\\|`."
)
CONSTANTS_CONVENTION = "A `Shape` cell holds the constant's declared type."

text = PATH.read_text(encoding="utf-8")


def swap(before: str, after: str) -> None:
    global text
    if text.count(before) != 1:
        raise SystemExit(f"expected one occurrence of: {before[:80]!r}")
    text = text.replace(before, after)


# 1. The convention sentence moves above the Types table, in Ruling 15's wording.
swap(
    "### Types\n\n| Type ",
    "### Types\n\n" + CONVENTION + "\n\n| Type ",
)
swap(
    "\nA `Shape` cell holds an interface's members in braces, and a type alias's\nvalue.\n\n### Constants\n",
    "\n### Constants\n",
)

# 2. Ruling 19: an alias over an object of tuples takes bare member names.
swap(
    "`{ register: [template], remove: [template], clear: [] }`",
    "`{ register, remove, clear }`",
)

# 3. Ruling 12: call-signature members follow `plus`.
swap(
    "`{ id, name, content, placeholders, summary?, description?, category?, tags?, definition, fill, validate, parameters }`",
    "`{ id, name, content, placeholders, summary?, description?, category?, tags? } plus definition, fill, validate, parameters`",
)
swap(
    "`{ emitter, count, register, template, templates, find, has, remove, clear, destroy, fill, validate, parameters }`",
    "`{ emitter, count } plus register, template, templates, find, has, remove, clear, destroy, fill, validate, parameters`",
)

# 4. Ruling 18: the Constants table heads `Shape` with each declared type.
swap(
    "### Constants\n\n| API ",
    "### Constants\n\n" + CONSTANTS_CONVENTION + "\n\n| API ",
)
swap("| API                      | Kind  | Summary", "| API | Kind | Shape | Summary")
swap("| ------------------------ | ----- | ---", "| --- | --- | --- | ---")
for name, shape in (
    ("FILL_PATTERN", "RegExp"),
    ("DEFAULT_MISSING_POLICY", "MissingPolicy"),
    ("DEFAULT_LOCALE", "'en-US'"),
    ("UNSAFE_FIELD_SEGMENTS", "readonly string[]"),
):
    swap(f"| `{name}`", f"| `{name}` | `{shape}`")

# 5. Ruling 14: the titled fence demonstrates what the Surface fence does not.
swap(
    """const templates = createTemplateManager({
	templates: [{ id: 'greeting', name: 'greeting', content: 'Hi {{name}}' }],
})
templates.fill('greeting', { name: 'Ada' }) // 'Hi Ada'
```

### Classes""",
    """const templates = createTemplateManager({
	templates: [
		{ id: 'greeting', name: 'greeting', content: 'Hi {{name}}', category: 'mail' },
		{ id: 'farewell', name: 'farewell', content: 'Bye {{name}}', category: 'mail' },
		{ id: 'alert', name: 'alert', content: 'Alert: {{reason}}', category: 'ops' },
	],
})
templates.fill('greeting', { name: 'Ada' }) // 'Hi Ada'
templates.find({ category: 'mail' }).map((one) => one.id) // ['greeting', 'farewell']
templates.has('alert') // true
templates.has('missing') // false
```

### Classes""",
)

PATH.write_text(text, encoding="utf-8")
print(f"wrote {PATH}")
