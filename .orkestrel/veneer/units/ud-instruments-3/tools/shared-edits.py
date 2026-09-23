"""Applies the round-3 shared-file edits to the landing copy, deterministically and idempotently
(each check is a no-op if already applied), so a rebuilt landing copy can be brought current."""
import re

LAND = '/home/user/veneer-ud/tmp/probe/land'

# constants.ts: finding 5, the FLEX_SPECIMENS remark.
path = f'{LAND}/app/browser/constants.ts'
text = open(path).read()
old_remark = (
    " * gives the demonstration something to act on keeps a prose label, such as the tall sibling in the\n"
    " * aligned specimens and the items of each stack. The wrap specimens size their items with column\n"
    " * classes so three items overflow one line at every width, and the aligned-content boxes take their\n"
    " * height from the aspect-ratio class, because packing lines needs a container taller than its\n"
    " * lines. The order specimen writes its items out of order, so the rendered sequence is the classes'\n"
    " * own.\n"
    " */"
)
new_remark = (
    " * gives the demonstration something to act on keeps a prose label, such as the tall sibling in the\n"
    " * aligned specimens and the items of each stack. The wrap specimen's items carry the `flex-shrink-1`\n"
    " * class as a supporting class that lets the column classes size them, not as a demonstrated one, so\n"
    " * they keep their prose labels. The wrap specimens size their items with column classes so the\n"
    " * items overflow one line at every width, and the aligned-content boxes take their height from the\n"
    " * aspect-ratio class, because packing lines needs a container taller than its lines. The order\n"
    " * specimen writes its items out of order, so the rendered sequence is the classes' own.\n"
    " */"
)
if old_remark in text:
    text = text.replace(old_remark, new_remark, 1)
    open(path, 'w').write(text)
    print('constants.ts: applied')
elif new_remark in text:
    print('constants.ts: already applied')
else:
    raise SystemExit('constants.ts: neither form found')
