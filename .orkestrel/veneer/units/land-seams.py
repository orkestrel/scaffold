# land-seams.py: join the two seams a three-way apply drops when both sides append at one anchor. Run after the
# unit's resolver, from the landing checkout's root. Rule 1, app/browser/constants.ts: a `/** Holds the <Region>
# section's visible copy and accessible name. */` line whose preceding text ends in a markup row (`',`) instead of the
# closing `\t}),\n])\n` of the previous specimen list receives that closing. Rule 2, tests/setup.ts: a resting
# CASCADE_KEYS row whose `property: '…',` line is followed directly by the next row's `scenario:` line receives the
# closing `\t}),\n\tObject.freeze({\n` between them. Each rule reports what it joined; a head that ends in anything but a markup row is left as it is, so a tree
# with no dropped joiner is left byte-identical.
import re, sys
def constants():
    p='app/browser/constants.ts'; s=open(p).read(); out=[]; pos=0; joined=0
    for m in re.finditer(r"\n/\*\* Holds the [A-Za-z ]+ section's visible copy and accessible name\. \*/\n", s):
        head=s[pos:m.start()]
        if head.endswith("',"):
            out.append(head+"\n\t}),\n])"); joined+=1
        else:
            out.append(head)
        out.append(m.group(0)); pos=m.end()
    out.append(s[pos:]); open(p,'w').write(''.join(out)); print(f'constants: joined {joined}')
def setup():
    p='tests/setup.ts'; s=open(p).read()
    pat=re.compile(r"(\n\t\tproperty: '[^']*',\n)(\t\tscenario: ')")
    s2, n = pat.subn(r"\1\t}),\n\tObject.freeze({\n\2", s)
    open(p,'w').write(s2); print(f'setup: joined {n}')
constants(); setup()
