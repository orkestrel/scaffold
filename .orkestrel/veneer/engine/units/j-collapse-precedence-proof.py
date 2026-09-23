# Writes the proof patch J-BINDER-PRECEDENCE lands with the first-saved precedence: the disagreeing
# overlap case then removes the class attribute the button found absent.
import difflib, pathlib

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')
path = 'tests/src/browser/Collapse.test.ts'
before = (ROOT / path).read_text(encoding='utf-8')
old_name = "\tit('restores a shared trigger through the restoration that started first when it saved last, keeping the class attribute the button found absent', async () => {"
new_name = "\tit('restores a shared trigger to its original when the restoration that saved last destroys the button inside its token write', async () => {"
old_assert = "\t\texpect(Array.from(trigger.classList)).toEqual([])\n\t\texpect(trigger.getAttribute('class')).toBe('')\n"
new_assert = "\t\texpect(trigger.hasAttribute('class')).toBe(false)\n"
for old in (old_name, old_assert):
    if before.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:80]!r}')
after = before.replace(old_name, new_name).replace(old_assert, new_assert)
lines = difflib.unified_diff(before.splitlines(keepends=True), after.splitlines(keepends=True), fromfile=f'a/{path}', tofile=f'b/{path}', n=3)
(ROOT / 'tmp/j-collapse/patches/j-collapse-precedence-proof.diff').write_text(''.join(lines), encoding='utf-8', newline='\n')
print('ok')
