"""fold-51: the B-PASSIVE-ORDER-GUIDE (4d7de93) and B-PASSIVE-PROSE (eb422a9) landings close their carrier rows."""
import pathlib, sys
p = pathlib.Path('/home/user/veneer/ROADMAP.md'); s = p.read_text()
def rep(old, new):
    global s
    n = s.count(old)
    if n != 1: sys.exit(f'fold 51 refused: anchor count {n}: {old[:80]!r}')
    s = s.replace(old, new, 1)
rep("| B-PASSIVE-PROSE adds every proof's link once |",
    "| closed: B-PASSIVE-PROSE landed (`eb422a9`) with the style-proof and section-proof links in § Tests |")
rep("the guide's sections and `#### <key>` tables follow in B-PASSIVE-ORDER-GUIDE, a `builder` unit on the landed guide |",
    "the guide's sections and `#### <key>` tables followed in B-PASSIVE-ORDER-GUIDE (`4d7de93`), which moved them into the barrel's order with no sentence changed |")
lines = s.split('\n'); i = [k for k, l in enumerate(lines) if l.startswith('| Bare code tokens that predate the label units')]
if len(i) != 1: sys.exit('fold 51 refused: row 489')
cells = lines[i[0]].split('|')
cells[2] = " closed: B-PASSIVE-PROSE landed (`eb422a9`) with every `{@link}` tag and bare identifier in `tests/setupServer.ts` and `tests/setupStyles.ts` carrying its D42 noun, the counts removed, and the button-group proof's selector lists split at the top level (R9) "
lines[i[0]] = '|'.join(cells); s = '\n'.join(lines)
p.write_text(s); print('fold 51 applied')
