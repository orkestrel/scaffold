# TOKEN-PROOFS round 6: resolves each name the `:root` blocks declare and neither mode scope declares,
# once against the `:root` declarations alone and once against the `:root` declarations with the dark
# scope's declarations laid over them, the state of a root that carries `data-bs-theme="dark"`. Lists
# the root-only names whose two readings differ. Reuses the resolver in tmp/units/tkp-6-resolve.py.
import importlib.util, sys
spec = importlib.util.spec_from_file_location('resolve', '/home/user/veneer-tkp/tmp/units/tkp-6-resolve.py')
source = open('/home/user/veneer-tkp/tmp/units/tkp-6-resolve.py').read().split('\nfound = read(CSS')[0]
namespace = {}
exec(source, namespace)
CSS = namespace['CSS']
root = namespace['collect'](':root', CSS)
dark = namespace['collect']('[data-bs-theme=dark]', CSS)
light = namespace['collect']('[data-bs-theme=light]', CSS)
plain = namespace['resolver'](root, None)
dark_root = namespace['resolver']({**root, **dark}, None)
normalize = namespace['normalize']
only = sorted(set(root) - set(dark) - set(light))
differ = [name for name in only if normalize(plain(name, frozenset())) != normalize(dark_root(name, frozenset()))]
print(f'root-only names: {len(only)}; differing between a plain root and a dark root: {differ}')
for name in differ:
	print(f'  {name}: plain={normalize(plain(name, frozenset()))!r} dark-root={normalize(dark_root(name, frozenset()))!r}')
# Control: a name the dark scope changes, read through the same comparison, must differ.
control = '--bs-primary'
print(f'control {control} differs: {normalize(plain(control, frozenset())) != normalize(dark_root(control, frozenset()))}')
