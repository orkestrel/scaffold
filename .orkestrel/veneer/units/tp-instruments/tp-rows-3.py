"""TIP round 3 (P7): restore the dropped obligations in the Tooltip and Popover plugin rows of the
validation copy's guide. The formatter re-pads the table afterwards."""

import pathlib
import re

GUIDE = pathlib.Path('/home/user/veneer-tp/tmp/probe/base/guides/veneer.md')

EDITS = [
    (
        "Tooltip: no data API; `placement: 'top'` and `trigger: 'hover focus'` defaults; "
        "`show` and `hide` methods;",
        "Tooltip: constructed by a consumer, no data API; `placement: 'top'`, "
        "`trigger: 'hover focus'`, and `sanitize: true` defaults; `show`, `hide`, and "
        "`setContent` methods;",
    ),
    (
        "Popover: extends Tooltip, inheriting its methods and ARIA under `.bs.popover` events;",
        "Popover: extends Tooltip, inheriting its construction, methods, sanitizing, and ARIA "
        "under `.bs.popover` events;",
    ),
]

text = GUIDE.read_text()
for old, new in EDITS:
    if text.count(old) != 1:
        raise SystemExit(f'expected one match for: {old}')
    text = text.replace(old, new)
GUIDE.write_text(text)
for key in ('Tooltip: ', 'Popover: extends'):
    row = next(line for line in text.splitlines() if f'| {key}' in line)
    print(re.sub(r'\s+\|', ' |', row))
