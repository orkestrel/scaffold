# Rebuilds guides/veneer.md from its ca83afb text: keeps the samp corner's addition row, and cites the
# semantic-tags tenet in the reasons of the pre code, a > code, and kbd kbd Excluded rows.
import subprocess, pathlib, re
root = pathlib.Path('/home/user/veneer-eic')
base = subprocess.run(['git', 'show', 'ca83afb:guides/veneer.md'], cwd=root, capture_output=True, text=True, check=True).stdout
lines = base.split('\n')
tenet = ', which the semantic-tags tenet in the `ROADMAP.md` file refuses.'
out = []
hits = {'pre code': 0, 'a > code': 0, 'kbd kbd': 0, 'samp': 0}
for line in lines:
	for name in ('pre code', 'a > code', 'kbd kbd'):
		if line.startswith(f'| `{name}` ') and '| Excluded |' in line:
			cells = line.split('|')
			reason = cells[3].strip()
			assert reason.endswith('from tag composition.'), line
			cells[3] = ' ' + reason[:-1] + tenet + ' '
			line = '|'.join(cells)
			hits[name] += 1
	out.append(line)
	if line.startswith('| `reboot`       | `samp { background-color }`'):
		out.append(line.replace('`samp { background-color }`', '`samp { border-radius }`   ').replace(
			'Elements paints inline code on its own surface with its own inset.',
			'Elements gives sample output the chip corner the rest of the code family carries.'))
		hits['samp'] += 1
assert all(count == 1 for count in hits.values()), hits
(root / 'guides/veneer.md').write_text('\n'.join(out))
