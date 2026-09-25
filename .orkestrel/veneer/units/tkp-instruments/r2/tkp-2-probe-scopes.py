# Lists the `--bs-*` and `--vn-*` names the built cascade declares at `:root` and not in the
# `[data-bs-theme=light]` scope, reading dist/src/styles/index.css.
import re
css = open('/home/user/veneer-tkp/dist/src/styles/index.css').read()
def declared(selector_pattern):
	names = set()
	for match in re.finditer(r'([^{}]+)\{([^{}]*)\}', css):
		selectors = [part.strip() for part in match.group(1).split(',')]
		if any(re.fullmatch(selector_pattern, part) for part in selectors):
			names.update(re.findall(r'(--(?:bs|vn)-[\w-]+)\s*:', match.group(2)))
	return names
root = declared(r':root')
light = declared(r'\[data-bs-theme=["\']?light["\']?\]')
only = sorted(name for name in root - light)
print('root-only --bs-* aliases:', ' '.join(name for name in only if name.startswith('--bs-')))
print('root-only --vn-* tokens:', ' '.join(name for name in only if name.startswith('--vn-')))
print('mode-scope --bs-* aliases:', ' '.join(sorted(name for name in light if name.startswith('--bs-'))))
