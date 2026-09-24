# Appends the unit's compatibility rows after the `invisible` row in the validation copy's guide.
p='guides/veneer.md'
s=open(p).read()
anchor=[l for l in s.split('\n') if l.startswith('| invisible        | selector')]
assert len(anchor)==1
a=anchor[0]
def row(key,text):
    return f"| {key} | selector | {text} | — | shipped |"
spec='the `tests/src/styles/utilities/spacing.test.ts` proof'
rows=[]
names={'m':'margin','mx':'horizontal margin','my':'vertical margin','mt':'top margin','me':'end margin, written on the right side,','mb':'bottom margin','ms':'start margin, written on the left side,'}
for k in ['m','mx','my','mt','me','mb','ms']:
    rows.append(row(k,f"Every official `.{k}-*` step and breakpoint selector ships in the utilities layer, the `auto` step included; the resolved {names[k]} at each boundary is proved in {spec}."))
pnames={'p':'padding','px':'horizontal padding','py':'vertical padding','pt':'top padding','pb':'bottom padding','ps':'start padding, written on the left side,'}
for k in ['p','px','py','pt','pe','pb','ps']:
    if k=='pe':
        rows.append(row(k,"Every official `.pe-*` padding step and breakpoint selector ships in the utilities layer, the end padding written on the right side, and the `.pe-none` and `.pe-auto` pointer-events selectors ship at the empty infix alone; the resolved padding is proved in "+spec+", and the pointer reaching through an element in the `tests/src/styles/utilities/interaction.test.ts` proof."))
    else:
        rows.append(row(k,f"Every official `.{k}-*` step and breakpoint selector ships in the utilities layer; the resolved {pnames[k]} at each boundary is proved in {spec}."))
rows.append(row('user-select',"Every official `.user-select-*` selector ships in the utilities layer at the empty infix alone; each resolved value and the text a selection keeps are proved in the `tests/src/styles/utilities/interaction.test.ts` proof."))
s=s.replace(a+'\n',a+'\n'+'\n'.join(rows)+'\n',1)
open(p,'w').write(s)
