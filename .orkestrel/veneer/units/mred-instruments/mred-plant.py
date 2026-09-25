"""Applies one named plant to a partial of the veneer-mred worktree, in place.

Usage: python3 tmp/units/mred-plant.py <name>

Names:
  spinner-slow   Restores the release's `1.5s` slow-down in place of `animation: none` on both spinners.
  glow-drop      Drops the placeholder glow's reduced-motion rule.
  grow-opacity   Drops the grow spinner's reduced-motion opacity.
  base           Writes both partials back to their bytes at 21c821a, from tmp/units/backup/.
"""

import shutil
import sys

ROOT = '/home/user/veneer-mred'
SPINNER = f'{ROOT}/src/styles/components/_spinner.scss'
PLACEHOLDER = f'{ROOT}/src/styles/components/_placeholder.scss'


def replace_once(path: str, old: str, new: str) -> None:
    with open(path, encoding='utf-8') as handle:
        text = handle.read()
    if text.count(old) != 1:
        raise SystemExit(f'plant site not found exactly once in {path}')
    with open(path, 'w', encoding='utf-8') as handle:
        handle.write(text.replace(old, new))


name = sys.argv[1]
if name == 'spinner-slow':
    replace_once(
        SPINNER,
        '\t\t@include reduced-motion {\n\t\t\tanimation: none;\n\t\t}\n',
        '',
    )
    replace_once(
        SPINNER,
        '\t.spinner-grow-sm {\n\t\t--bs-spinner-width: 1rem;\n\t\t--bs-spinner-height: 1rem;\n\t}\n}\n',
        '\t.spinner-grow-sm {\n\t\t--bs-spinner-width: 1rem;\n\t\t--bs-spinner-height: 1rem;\n\t}\n\n'
        '\t@include reduced-motion {\n\t\t.spinner-border,\n\t\t.spinner-grow {\n'
        '\t\t\t--bs-spinner-animation-speed: 1.5s;\n\t\t}\n\t}\n}\n',
    )
elif name == 'glow-drop':
    replace_once(
        PLACEHOLDER,
        '\t\tanimation: placeholder-glow 2s ease-in-out infinite;\n'
        '\t\t@include reduced-motion {\n\t\t\tanimation: none;\n\t\t}\n',
        '\t\tanimation: placeholder-glow 2s ease-in-out infinite;\n',
    )
elif name == 'grow-opacity':
    replace_once(
        SPINNER,
        '\t\t@include reduced-motion {\n\t\t\topacity: 1;\n\t\t}\n',
        '',
    )
elif name == 'base':
    shutil.copyfile(f'{ROOT}/tmp/units/backup/_spinner.scss', SPINNER)
    shutil.copyfile(f'{ROOT}/tmp/units/backup/_placeholder.scss', PLACEHOLDER)
else:
    raise SystemExit(f'unknown plant {name}')
