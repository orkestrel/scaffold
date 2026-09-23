import sys
widths=[int(w) for w in sys.argv[1].split(',')]
cells=sys.argv[2:]
out='|'
for w,c in zip(widths,cells):
    if len(c)>w-2: sys.exit(f'cell too wide: {len(c)} > {w-2}: {c[:40]}')
    out+=' '+c.ljust(w-2)+' |'
print(out)
