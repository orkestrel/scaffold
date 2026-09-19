"""Measures the shell chrome above the fold at 390 and 1280, then restores the suite.

Temporarily appends one reporting case to the shell suite, runs it, reads the numbers it prints,
and removes the case again.
"""

import io
import re
import subprocess
import sys

SUITE = 'tests/app/browser/App.test.ts'

CASE = """
	it('reports the shell chrome each viewport paints', async () => {
		for (const [width, height] of WIDTHS) {
			await page.viewport(width, height)
			const { host } = await openSurface()
			const utility = requireValue(host.querySelector('[data-bs-theme="dark"]'))
			const masthead = requireValue(host.querySelector('.masthead'))
			const main = requireValue(host.querySelector('#main'))
			console.log(
				`chrome | ${String(width)} | utility ${String(Math.round(utility.getBoundingClientRect().height))} | masthead ${String(Math.round(masthead.getBoundingClientRect().height))} | main top ${String(Math.round(main.getBoundingClientRect().top))}`,
			)
			clearSurface()
		}
	})
"""


def main():
    text = io.open(SUITE, encoding='utf-8', newline='').read()
    marker = '\n})\n'
    assert text.endswith(marker)
    io.open(SUITE, 'w', encoding='utf-8', newline='').write(text[: -len(marker)] + '\n' + CASE + '})\n')
    try:
        result = subprocess.run(
            [
                'npx.cmd', 'vitest', 'run', '--config', 'vite.config.ts', '--no-cache',
                '--reporter=dot', '--project', 'app:browser', SUITE,
            ],
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace',
        )
        stream = (result.stdout or '') + (result.stderr or '')
        for line in re.findall(r'^chrome \| .+$', stream, re.MULTILINE):
            sys.stdout.write(line + '\n')
    finally:
        io.open(SUITE, 'w', encoding='utf-8', newline='').write(text)


main()
