# Plants an identity check at the readFormDifferences call site: a reading whose normalized form differs from the raw
# form throws. Usage: python3 instrument.py <mode>, where mode is "check" (raw against normalized) or "plant" (raw
# against normalized with outline-width forced to 9px, so the check fires on every reading).
import sys
p = '/home/user/veneer-r153/tests/setupBrowser.ts'
s = open('/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/r153probe/setupBrowser.ts.orig').read()
old = """					normalizeLineWidths(
						Object.fromEntries(
							Array.from(getComputedStyle(element))
								.filter((longhand) => !longhand.startsWith('--'))
								.map((longhand) => [longhand, readStyle(element, longhand)]),
						),
					),"""
assert s.count(old) == 1
extra = ", 'outline-width': '9px'" if sys.argv[1] == 'plant' else ''
new = """					((raw) => {
						const settled = { ...normalizeLineWidths(raw)""" + extra + """ }
						if (JSON.stringify(settled) !== JSON.stringify(raw))
							throw new Error(`LINE-WIDTH-PROBE changed ${key} ${state}`)
						return settled
					})(
						Object.fromEntries(
							Array.from(getComputedStyle(element))
								.filter((longhand) => !longhand.startsWith('--'))
								.map((longhand) => [longhand, readStyle(element, longhand)]),
						),
					),"""
open(p, 'w').write(s.replace(old, new))
print('instrumented', sys.argv[1])
