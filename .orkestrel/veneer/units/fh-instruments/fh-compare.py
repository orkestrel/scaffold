# FRAME-HELPERS frame comparison: pairs each frame of one variant against the baseline copy and
# reports identical bytes, or both sizes where the bytes differ.
# Usage: python3 fh-compare.py VARIANT
import os, struct, sys, hashlib

variant = sys.argv[1]
base = f'/home/user/veneer-fh/tmp/units/fh-baseline/{variant}'
now = f'/home/user/veneer-fh/tmp/units/fh-final/{variant}'

def size(path):
    with open(path, 'rb') as handle:
        head = handle.read(24)
    return struct.unpack('>II', head[16:24])

def digest(path):
    return hashlib.sha256(open(path, 'rb').read()).hexdigest()

same, changed, missing = [], [], []
for name in sorted(os.listdir(base)):
    if not name.endswith('.png'):
        continue
    current = os.path.join(now, name)
    if not os.path.exists(current):
        missing.append(name)
        continue
    before = os.path.join(base, name)
    if digest(before) == digest(current):
        same.append(name)
    else:
        changed.append((name, size(before), size(current)))
print(f'identical {len(same)}; changed {len(changed)}; missing {len(missing)}')
for name, before, after in changed:
    print(f'{name}: {before[0]}x{before[1]} -> {after[0]}x{after[1]}')
for name in missing:
    print(f'missing {name}')
