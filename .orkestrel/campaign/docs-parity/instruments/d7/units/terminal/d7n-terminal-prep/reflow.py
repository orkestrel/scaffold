import pathlib, sys

EDITS = [
    (
        "src/core/PromptClient.ts",
        " *   the refused attempt submitted, applies every {@link FieldError} through `invalidate`, and asks\n"
        " *   again. No retry\n"
        " *   counter truncates the loop; acceptance, expiry, and the broker's own teardown are its bounds.\n",
        " *   the refused attempt submitted, applies every {@link FieldError} through `invalidate`, and asks\n"
        " *   again. No retry counter truncates the loop; acceptance, expiry, and the broker's own teardown\n"
        " *   are its bounds.\n",
    ),
    (
        "src/server/Terminal.ts",
        " * - **Visibility is honored.** A `hidden` field and a field in `form.disabled` are\n"
        " *   skipped; a `locked` field renders read-only; entering a new group writes its label as a section\n"
        " *   header.\n",
        " * - **Visibility is honored.** A `hidden` field and a field in `form.disabled` are skipped; a\n"
        " *   `locked` field renders read-only; entering a new group writes its label as a section header.\n",
    ),
]

root = pathlib.Path("/home/user/fleet/terminal")
for rel, before, after in EDITS:
    path = root / rel
    text = path.read_text(encoding="utf-8")
    if text.count(before) != 1:
        sys.exit(f"NOT FOUND VERBATIM (or not unique): {rel}")
    path.write_text(text.replace(before, after), encoding="utf-8")
    print(f"reflowed {rel}")
