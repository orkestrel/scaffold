"""lc2-mutate.py: runs each round 2 mutation in the lc2 worktree and puts the file back.

For each mutation it rewrites exactly one site in one file, runs lc2-run.sh over the named proofs
with the named `-t` filter, restores the file's original text, and appends the site, the command,
both exits, the summary lines, and the failing case names to tmp/units/lc-mutations-2.log.txt. Each
full run log is kept as tmp/units/lc2-mutation-<id>.log.txt.
"""
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path('/home/user/veneer-lc2')
LOG = ROOT / 'tmp/units/lc-mutations-2.log.txt'
THEME_OLD = """	:root {
		color-scheme: light;
	}

"""
MUTATIONS = [
    ('R1', 'the root scheme rule follows the mode scopes', 'src/styles/_theme.scss',
     [(THEME_OLD, ''), ("""		}
	}
}
""", """		}
	}

	:root {
		color-scheme: light;
	}
}
""")],
     ['tests/src/styles/components/button.test.ts', '-t', 'root-level button|island the button sits in']),
    ('R2', 'the root-attribute case reads the label with the transition running', 'tests/src/styles/components/button.test.ts',
     [("""		// The label transition is staged off first, so the reading is the settled label rather than
		// the start of the transition from the light label.
		await stageMedia({ motion: false })
""", "")],
     ['tests/src/styles/components/button.test.ts', '-t', 'root-level button']),
    ('R3', 'the lowered consumer scheme is expected to keep the white label, as round 1 stated', 'tests/setupStyles.ts',
     [("""		rule: '.vn-scheme-lowered { --lightningcss-light: ; --lightningcss-dark: initial; color-scheme: dark }',
		label: 'black',""", """		rule: '.vn-scheme-lowered { --lightningcss-light: ; --lightningcss-dark: initial; color-scheme: dark }',
		label: 'white',""")],
     ['tests/src/styles/components/button.test.ts', '-t', 'consumer scheme']),
    ('R4', 'the colored-link shift moves from 20% to 10%', 'src/styles/utilities/_link.scss',
     [('$shift: 20%;', '$shift: 10%;')],
     ['tests/src/styles/utilities/link.test.ts']),
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
        name = f'lc2-mutation-{ident}.log.txt'
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
