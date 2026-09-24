# Applies one named round-2 journey mutation to tests/app/browser/integration.test.ts.
import sys
p='tests/app/browser/integration.test.ts'
s=open(p).read()
name=sys.argv[1]
def within(case, a, b):
    global s
    i=s.index(case); j=s.find("\n\tit(", i+10); j=len(s) if j<0 else j
    seg=s[i:j]; assert seg.count(a)==1, (name, a); s=s[:i]+seg.replace(a,b)+s[j:]
SKIP="	it('reveals the skip link under keyboard focus"
ROW="	it('drives one list-group action to hover, focus, and press"
ACC="	it('reaches a collapsed accordion button through the keyboard"
if name=='skip-script':
    within(SKIP,"			lifted.focus()\n			await pressKeys('{Tab}')\n","			link.focus()\n")
elif name=='skip-script-key':
    within(SKIP,"			lifted.focus()\n			await pressKeys('{Tab}')\n","			link.focus()\n			await pressKeys('{ArrowRight}')\n")
elif name=='row-script':
    within(ROW,"			lifted.focus()\n			expect(await traverseAccessible('Dispatch lane')).toBe(host)\n","			host.focus()\n")
elif name=='row-script-key':
    within(ROW,"			lifted.focus()\n			expect(await traverseAccessible('Dispatch lane')).toBe(host)\n","			host.focus()\n			await pressKeys('{ArrowRight}')\n")
elif name=='accordion-no-release':
    within(ACC,"			await releasePointer()\n","")
elif name=='guard-no-control':
    within(SKIP,"if (suppressed) link.style.setProperty('outline', 'none', 'important')","if (suppressed) link.style.setProperty('outline-color', 'red', 'important')")
else:
    raise SystemExit('unknown '+name)
open(p,'w').write(s)
