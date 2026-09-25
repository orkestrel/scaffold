import sys
p='/home/user/veneer-jf/tests/setupBrowser.ts'
s=open(p).read()
dup="\tif (matched.length > 1) throw new Error(`${String(matched.length)} ${messages.duplicate}`)\n"
foreign="\tif (!(element instanceof HTMLElement)) throw new Error(messages.foreign)\n"
name=sys.argv[1]
assert s.count(dup)==1 and s.count(foreign)==1
if name=='duplicate':
    s=s.replace(dup,'',1)
elif name=='foreign':
    s=s.replace(foreign,'',1)
elif name=='order':
    s=s.replace(dup,"\tif (matched[0] !== undefined && !(matched[0] instanceof HTMLElement)) throw new Error(messages.foreign)\n"+dup,1)
else:
    sys.exit(2)
open(p,'w').write(s)
