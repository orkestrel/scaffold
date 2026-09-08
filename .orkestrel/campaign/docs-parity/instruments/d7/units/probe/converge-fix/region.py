import pathlib, sys, subprocess

def region(path):
	lines = pathlib.Path(path).read_text().split('\n')
	start = next(i for i, l in enumerate(lines) if l.startswith("const root = new URL('../', import.meta.url)"))
	# the manifest loop's closing brace: the last line of the describe the loop drives
	end = next(i for i, l in enumerate(lines) if i > start and l == '})' and lines[i - 1].startswith('\t}'))
	return start + 1, end + 1, '\n'.join(lines[start:end + 1])

ps, pe, pilot = region('/home/user/fleet/abort/tests/guides.test.ts')
os_, oe, ours = region('tests/guides.test.ts')
print(f'pilot {ps}-{pe}, probe {os_}-{oe}')
pathlib.Path('tmp/d7n-probe-converge-fix/pilot-region.txt').write_text(pilot + '\n')
pathlib.Path('tmp/d7n-probe-converge-fix/probe-region.txt').write_text(ours + '\n')
