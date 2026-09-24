# jb-integrate.py: lands JOURNEY-BUDGET by re-applying its three edits over the second batch's landed tree,
# because the formatter's re-indent of the resting-key case body conflicts with any hunk another landing made
# inside that body (jb-audit-verdict.md § Acceptance). The edits are the unit's own, from jb.diff: the
# CASCADE_KEY_TIMEOUT constant and its TSDoc after the CASCADE_KEYS table in tests/setup.ts, its entry in the
# export list in tests/setup.test.ts, and the case's import and timeout argument in
# tests/app/browser/integration.test.ts. The caller runs the formatter on the three files after it.
# Run from the Veneer checkout root.
import pathlib, re
def once(path, old, new):
    p = pathlib.Path(path); s = p.read_text()
    assert s.count(old) == 1, (path, old[:60], s.count(old))
    p.write_text(s.replace(old, new))
setup = pathlib.Path('tests/setup.ts').read_text()
start = setup.index('export const CASCADE_KEYS: readonly CascadeKey[] = Object.freeze([')
end = setup.index('\n])\n', start) + len('\n])\n')
constant = ('\n/**\n'
            ' * Sets the resting-key journey case\'s per-key budget from its 1070 ms measured cost per entry in\n'
            ' * the {@link CASCADE_KEYS} table at a 3.3 contended load: 3000 ms, which multiplies by that table\'s\n'
            ' * length to give the case\'s timeout.\n'
            ' */\n'
            'export const CASCADE_KEY_TIMEOUT = 3000\n')
pathlib.Path('tests/setup.ts').write_text(setup[:end] + constant + setup[end:])
once('tests/setup.test.ts', "\t\t\t\t'CASCADE_KEYS',\n", "\t\t\t\t'CASCADE_KEYS',\n\t\t\t\t'CASCADE_KEY_TIMEOUT',\n")
once('tests/app/browser/integration.test.ts', "\tCASCADE_KEYS,\n", "\tCASCADE_KEYS,\n\tCASCADE_KEY_TIMEOUT,\n")
path = 'tests/app/browser/integration.test.ts'; s = pathlib.Path(path).read_text()
title = "\tit('reads every resting cascade key the same on its lifted frame as in the showcase, in light and dark', async () => {\n"
i = s.index(title); tail = "JOURNAL.record('read', 'cascade keys', String(rendered.get(`${LIGHT}|role-links`)))\n\t})\n"
j = s.index(tail, i)
s = s[:j] + tail.replace('\n\t})\n', '\n\t}, CASCADE_KEYS.length * CASCADE_KEY_TIMEOUT)\n') + s[j + len(tail):]
pathlib.Path(path).write_text(s)
print('re-applied')
