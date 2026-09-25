# Rebuilds guides/veneer.md from its ca83afb text for E-ID-CODE round 4: keeps the Excluded reasons at their ca83afb
# text, cites the semantic-tags tenet once in the § Deferred selectors lead by its ROADMAP.md title, and adds the
# samp { border-radius } addition row with a reason naming the elements that wear the chip.
import subprocess, pathlib
root = pathlib.Path('/home/user/veneer-eic')
base = subprocess.run(['git', 'show', 'ca83afb:guides/veneer.md'], cwd=root, capture_output=True, text=True, check=True).stdout
lead_end = 'name this release declares nowhere is recorded in § Outside the ledger instead.'
lead_add = [
	'Every `Excluded` row whose reason names tag composition or adjacency applies the "Give semantic tags',
	'useful defaults without inferring components" tenet in the `ROADMAP.md` file.',
]
anchor = '| `reboot`       | `samp { background-color }`'
old_reason = 'Elements paints inline code on its own surface with its own inset.'
new_reason = 'Elements gives sample output the chip corner the `code`, `kbd`, and `var` elements also wear.'
out = []
hits = {'lead': 0, 'samp': 0}
section = False
for line in base.split('\n'):
	out.append(line)
	if line == '### Deferred selectors':
		section = True
	if section and line == lead_end:
		out.extend(lead_add)
		hits['lead'] += 1
		section = False
	if line.startswith(anchor):
		cells = line.split('|')
		name = cells[2]
		cells[2] = name.replace('`samp { background-color }`', '`samp { border-radius }`'.ljust(len('`samp { background-color }`')))
		reason = cells[5]
		assert reason.strip() == old_reason, reason
		cells[5] = ' ' + new_reason.ljust(len(reason) - 2) + ' '
		assert len(cells[5]) == len(reason)
		out.append('|'.join(cells))
		hits['samp'] += 1
assert all(count == 1 for count in hits.values()), hits
(root / 'guides/veneer.md').write_text('\n'.join(out))
