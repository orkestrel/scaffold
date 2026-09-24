"""lc3-mutate.py: runs each round 3 mutation in the lc2 worktree and puts the file back.

For each mutation it rewrites exactly one site in one file, runs lc2-run.sh over the named proofs
with the named `-t` filter, restores the file's original text, and appends the site, the command,
both exits, the summary lines, and the failing case names to tmp/units/lc-mutations-3.log.txt. Each
full run log is kept as tmp/units/lc3-mutation-<id>.log.txt.
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path('/home/user/veneer-lc2')
LOG = ROOT / 'tmp/units/lc-mutations-3.log.txt'
MUTATIONS = [
    ('S1', "the rule picks black for Veneer's light primary triplet alone", 'src/styles/_mixins.scss',
     [("""	$closest: null;
	$highest: 0;
""", """	@if $triplet == (8, 65, 234) {
		@return list.nth(map.keys($candidates), 2);
	}
	$closest: null;
	$highest: 0;
""")],
     ['tests/src/styles/mixins.test.ts', '-t', "Veneer's"]),
    ('S2', 'the hover and active endpoint is written as the light pick for both modes', 'src/styles/_mixins.scss',
     [("	@return scheme(list.nth($picks, 1), list.nth($picks, 2));", "	@return scheme(list.nth($picks, 1), list.nth($picks, 1));")],
     ['tests/src/styles/components/button.test.ts', '-t', 'consumer scheme']),
]


def main(selected):
    for ident, description, site, edits, args in MUTATIONS:
        if selected and ident not in selected:
            continue
        target = ROOT / site
        original = target.read_text()
        text = original
        for old, new in edits:
            if text.count(old) != 1:
                raise SystemExit(f'{ident}: site not unique in {site}')
            text = text.replace(old, new)
        name = f'lc3-mutation-{ident}.log.txt'
        try:
            target.write_text(text)
            subprocess.run(['bash', str(ROOT / 'tmp/units/lc2-run.sh'), name, *args], capture_output=True, text=True)
        finally:
            target.write_text(original)
        plain = re.sub(r'\x1b\[[0-9;]*m', '', (ROOT / 'tmp/units' / name).read_text())
        lines = plain.splitlines()
        summary = [line for line in lines if re.match(r'^# (build|vitest) exit|^ Test Files|^      Tests', line)]
        command = [line for line in lines if line.startswith('# command:')]
        failing = sorted({line.strip() for line in lines if line.lstrip().startswith('FAIL ')})
        with LOG.open('a') as handle:
            handle.write(f'## {ident}: {description}\nsite: {site}\n')
            handle.write('\n'.join(command + summary) + '\nfailing cases:\n')
            handle.write('\n'.join(f'  {line}' for line in failing) + f'\nfull log: tmp/units/{name}\n\n')
        print(ident, ' | '.join(summary))


if __name__ == '__main__':
    main(set(sys.argv[1:]))
