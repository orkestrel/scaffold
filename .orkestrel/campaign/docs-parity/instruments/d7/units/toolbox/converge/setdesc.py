#!/usr/bin/env python3
"""Replaces a doc block's description paragraph, rewrapped to the block's width.

Reads a JSON list of `{file, key, text, remarks?}` records. `key` is the declared name, or
`Owner.member` for a member of an interface or class. `remarks` prepends paragraphs to the
block's `@remarks` section, creating one where the block has none. The formatter does not
reflow comment prose, so this rewraps every line the new text occupies.
"""
import json
import re
import sys

WIDTH = 100


def find_declaration(text: str, key: str) -> int:
	if '.' in key:
		owner, member = key.split('.', 1)
		anchor = re.search(
			r'^export (?:interface|class|abstract class) ' + re.escape(owner) + r'\b', text, re.M
		)
		if anchor is None:
			raise SystemExit(f'no owner for {key}')
		region = text[anchor.start() :]
		hit = re.search(
			r'^\t(?:readonly |async |get |set )?' + re.escape(member) + r'[(<]', region, re.M
		)
		if hit is None:
			raise SystemExit(f'no member for {key}')
		return anchor.start() + hit.start()
	hit = re.search(
		r'^export (?:declare )?(?:async )?(?:interface|type|const|function|class) '
		+ re.escape(key)
		+ r'\b',
		text,
		re.M,
	)
	if hit is None:
		raise SystemExit(f'no declaration for {key}')
	return hit.start()


def atoms(text: str) -> list[str]:
	"""Splits on whitespace, keeping a `{@link …}` tag and a code span whole."""
	out: list[str] = []
	pending = ''
	for word in text.split():
		pending = word if pending == '' else pending + ' ' + word
		if pending.count('`') % 2 == 1:
			continue
		if pending.count('{@link') > pending.count('}'):
			continue
		out.append(pending)
		pending = ''
	if pending != '':
		out.append(pending)
	return out


def wrap(text: str, width: int) -> list[str]:
	out: list[str] = []
	line = ''
	for word in atoms(text):
		if line == '':
			line = word
		elif len(line) + 1 + len(word) <= width:
			line = line + ' ' + word
		else:
			out.append(line)
			line = word
	if line != '':
		out.append(line)
	return out


def rewrite(text: str, key: str, description: str, added: list[str]) -> str:
	at = find_declaration(text, key)
	close = text[:at].rstrip()
	if not close.endswith('*/'):
		raise SystemExit(f'no doc block above {key}')
	end = len(close)
	start = close.rfind('/**')
	indent = text[text.rfind('\n', 0, start) + 1 : start]
	body = text[start + 3 : end - 2]
	lines = [re.sub(r'^\s*\* ?', '', one) for one in body.split('\n')]
	tag_at = next((i for i, one in enumerate(lines) if one.startswith('@')), None)
	rest = lines[tag_at:] if tag_at is not None else []
	while rest and rest[-1].strip() == '':
		rest.pop()
	width = WIDTH - len(indent) - len(' * ')
	if added:
		block: list[str] = ['@remarks']
		for index, one in enumerate(added):
			if index > 0:
				block.append('')
			block.extend(wrap(one, width))
		if rest and rest[0] == '@remarks':
			rest = block + [''] + rest[1:]
		else:
			rest = block + ([''] + rest if rest else [])
	if not rest and len(description) <= WIDTH - len(indent) - len('/**  */'):
		return text[:start] + f'/** {description} */' + text[end:]
	out = [f'{indent}/**']
	for one in wrap(description, width):
		out.append(f'{indent} * {one}'.rstrip())
	if rest:
		out.append(f'{indent} *')
		for one in rest:
			out.append(f'{indent} * {one}'.rstrip())
	out.append(f'{indent} */')
	return text[:start] + '\n'.join(out)[len(indent) :] + text[end:]


def main() -> int:
	records = json.load(open(sys.argv[1], encoding='utf8'))
	files: dict[str, str] = {}
	for record in records:
		path = record['file']
		if path not in files:
			files[path] = open(path, encoding='utf8').read()
		files[path] = rewrite(
			files[path], record['key'], record['text'], record.get('remarks', [])
		)
	for path, text in files.items():
		open(path, 'w', encoding='utf8').write(text)
	print(f'blocks rewritten: {len(records)} across {len(files)} files')
	return 0


if __name__ == '__main__':
	sys.exit(main())
