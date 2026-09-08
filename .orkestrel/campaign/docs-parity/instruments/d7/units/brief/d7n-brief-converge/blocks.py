import re, sys
for path in sys.argv[1:]:
    lines = open(path).read().split('\n')
    i = 0
    while i < len(lines):
        if lines[i].startswith('/**'):
            j = i
            while j < len(lines) and not lines[j].rstrip().endswith('*/'):
                j += 1
            k = j + 1
            while k < len(lines) and lines[k].strip() == '':
                k += 1
            if k < len(lines) and lines[k].startswith('export '):
                print(f'--- {path}:{i+1}-{j+1} ---')
                for n in range(i, min(k+1, len(lines))):
                    print(f'{n+1}\t{lines[n]}')
            i = j + 1
        else:
            i += 1
