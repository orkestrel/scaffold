# Folds the E-ID landing into Veneer's ROADMAP.md: closes the carrier rows the landing satisfied (the stripe value, the
# structural departures, the dl.row defect, and the fixture lookups), naming each landing commit. Run from the Veneer
# checkout after the landing chain is green; oxfmt re-pads the tables afterwards.
import re
p='ROADMAP.md'
s=open(p).read()
def close(row_start, new_cell):
    global s
    lines=s.split('\n')
    hits=[i for i,l in enumerate(lines) if l.startswith('| '+row_start)]
    assert len(hits)==1, (row_start, hits)
    i=hits[0]
    cells=lines[i].split('|')
    # cells: ['', ' first ', ' carrier ', ''] for a two-column table
    assert len(cells)>=4, cells
    cells[-2]=' '+new_cell+' '
    lines[i]='|'.join(cells)
    s='\n'.join(lines)
close('Audit claim 11: the guide', "Closed: E-ID-RECORD kept Bootstrap's 5% stripe below the table's hover and active overlays and recorded its source (`6c26b14`); the F5 and F6 parts landed earlier")
close('Audit claim 13: unrecorded structural', "Closed: E-IDENTITY ruled each departure on the tenets and recorded it (E-ID-RECORD `6c26b14`, E-ID-LAYOUT `dd4300a`, E-ID-CODE `4edb3c6`); the F5 part landed earlier")
close("Bootstrap's horizontal description list", "Closed: E-ID-LAYOUT keeps the grid on the `dl` tag with no `gap`, so a `.row` column's gutter lays the list out as Bootstrap's (`dd4300a`)")
close('The fixture lookups', "Closed: J-FIXTURES routes the one-match step through `requireMatch` (`e07b3a6`)")
open(p,'w').write(s)
print('folded')
