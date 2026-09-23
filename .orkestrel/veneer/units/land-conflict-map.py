# land-conflict-map.py: after a three-way apply in a worktree, print every conflict block as file:line, ours line count and first line, theirs line count and first line, so the resolver for that landing is written from the actual seams.
import subprocess
files=subprocess.run(['git','diff','--name-only','--diff-filter=U'],capture_output=True,text=True).stdout.split()
for f in files:
    t=open(f).read().split('\n'); i=0
    while i<len(t):
        if t[i].startswith('<<<<<<<'):
            j=i
            while not t[j].startswith('======='): j+=1
            k=j
            while not t[k].startswith('>>>>>>>'): k+=1
            ours=t[i+1:j]; theirs=t[j+1:k]
            print(f"{f}:{i+1} ours {len(ours)} [{(ours[0] if ours else '')[:60]!r}] theirs {len(theirs)} [{(theirs[0] if theirs else '')[:60]!r}]")
            i=k
        i+=1
