import sys,re
def show(path,name):
    lines=open(path).read().split('\n')
    for i,l in enumerate(lines):
        if re.match(r'export (interface|type) %s\b' % name, l):
            j=i-1
            while j>=0 and not lines[j].strip().startswith('/**'): j-=1
            print('--- %s %s (lines %d-%d) ---' % (path,name,j+1,i+1))
            print('\n'.join(lines[j:i+1]))
            return
    print('NOT FOUND '+name)
for name in sys.argv[2:]:
    show(sys.argv[1],name)
