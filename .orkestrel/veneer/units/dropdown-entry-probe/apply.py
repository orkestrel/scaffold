# Applies the candidate menu entry rule to the probe worktree's dropdown partial.
import pathlib
p = pathlib.Path('/home/user/veneer-probe/src/styles/components/_dropdown.scss')
s = p.read_text()
old = "\t.dropdown-menu.show {\n\t\tdisplay: block;\n\t}\n"
assert s.count(old) == 1
new = (
    "\t.dropdown-menu.show {\n\t\tdisplay: block;\n"
    "\t\t@include transition(\n\t\t\t(\n\t\t\t\topacity var(--vn-motion-feedback) var(--vn-ease-out),\n"
    "\t\t\t\ttransform var(--vn-motion-feedback) var(--vn-ease-standard)\n\t\t\t)\n\t\t);\n\t}\n\n"
    "\t@starting-style {\n\t\t.dropdown-menu.show {\n\t\t\topacity: 0;\n\t\t\ttransform: scale(0.98);\n\t\t}\n\t}\n"
)
p.write_text(s.replace(old, new))
print('applied')
