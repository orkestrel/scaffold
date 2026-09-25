# Folds the ER-MECH landing into Veneer's ROADMAP.md: the E-RECEIPTS row names ER-MECH as the landing commit given as
# argv[1], ER-WIN as the engine session's under the user's ruling (its E31), and ER-CHROME as the user's; the § Carriers
# row for test:service records the engine session's answer (each landing chain runs it by name). Usage: python3
# erm-fold.py <sha>, from the Veneer checkout; oxfmt re-pads the tables afterwards.
import sys
sha=sys.argv[1]
p='ROADMAP.md'
lines=open(p).read().split('\n')
def row(prefix):
    hits=[i for i,l in enumerate(lines) if l.startswith(prefix)]
    assert len(hits)==1, (prefix, hits)
    return hits[0]
i=row('| E-RECEIPTS ')
cells=lines[i].split('|')
old=('then ER-LINUX records this host\'s receipt and ER-PROSE gates each sentence naming a browser build; the release-mode'
 ' binding waits on RELEASE-MODE; the Windows receipts (ER-WIN) and the Chrome channel (ER-CHROME) wait on the user')
assert old in cells[2], cells[2]
cells[2]=cells[2].replace(old, 'landed as `'+sha+'` (four rounds, audited by `analyst` on Astra, `reviewer` on Opus 5.5,'
 ' and `checker`); ER-LINUX records this host\'s receipt and ER-PROSE gates each sentence naming a browser build; the'
 ' release-mode binding waits on RELEASE-MODE; the engine session takes the Windows receipts (ER-WIN) under the user\'s'
 ' ruling it records as E31, after RELEASE-MODE lands; the Chrome channel (ER-CHROME) waits on the user')
lines[i]='|'.join(cells)
i=row('| `npm test` omits `test:service`')
cells=lines[i].split('|')
old='this session\'s landing chain runs `test:service`; adding it to `npm test` is a `package.json` change asked of the engine session'
assert old in cells[2], cells[2]
cells[2]=cells[2].replace(old, 'Closed: both sessions\' landing chains run `test:service` by name (this session\'s from the'
 ' CASCADE landing, the engine session\'s from 2026-09-25); `npm test` keeps it out, the engine session\'s answer of'
 ' 2026-09-25, because a real service answers it')
lines[i]='|'.join(cells)
open(p,'w').write('\n'.join(lines))
print('folded')
