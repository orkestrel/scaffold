#!/usr/bin/env python3
"""bpb landing integration (the reviewer's F1 and F2): qualify the pagination family's universal value claim in the guide and the partial header, add the precedent's rule-local comment above each forced include, and order the two Additions rows by the barrel's load order. Runs in the tree named by argv[1]."""
import sys, re, textwrap
root=sys.argv[1]
def rd(p): return open(f'{root}/{p}').read()
def wr(p,s): open(f'{root}/{p}','w').write(s); print('edited', p)
# guide: the pagination value paragraph
g=rd('guides/veneer.md')
start=g.index("Every value the family paints is Bootstrap 5.3.8's own. A length reads")
end=g.index("\n\n", start)
para=' '.join(line.strip() for line in g[start:end].split('\n'))
assert para.count("Bootstrap 5.3.8's own. A length reads")==1
para=para.replace("Every value the family paints is Bootstrap 5.3.8's own. A length reads","Every value the family paints is Bootstrap 5.3.8's own, apart from the forced-colors focus outline § Additions records. A length reads")
wrapped='\n'.join(textwrap.wrap(para, width=100, break_long_words=False, break_on_hyphens=False))
g=g[:start]+wrapped+g[end:]
# guide: the two Additions rows, pagination before btn-close
rows=re.search(r"^(\| `btn-close`[^\n]*\n)(\| `pagination`[^\n]*\n)", g, re.M); assert rows, 'rows'
g=g[:rows.start()]+rows.group(2)+rows.group(1)+g[rows.end():]
wr('guides/veneer.md', g)
# pagination partial: the header comment and the rule-local comment
p=rd('src/styles/components/_pagination.scss')
old_head=("\t// Every value here is Bootstrap 5.3.8's own. A length reads the Veneer scale token that already\n"
"\t// resolves to it, so the density and radius factors reach the family; a color reads the\n"
"\t// compatibility variable Bootstrap itself names, or the palette token that carries Bootstrap's\n"
"\t// literal, because a partial declares no literal color of its own.\n")
assert p.count(old_head)==1, 'pagination header'
head_text=("Every value here is Bootstrap 5.3.8's own, apart from the forced-colors focus outline. A length reads the Veneer scale token that already resolves to it, so the density and radius factors reach the family; a color reads the compatibility variable Bootstrap itself names, or the palette token that carries Bootstrap's literal, because a partial declares no literal color of its own.")
new_head=''.join('\t// '+l+'\n' for l in textwrap.wrap(head_text, width=95, break_long_words=False, break_on_hyphens=False))
p=p.replace(old_head,new_head)
assert p.count("\t.page-link:focus {\n")==1
p=p.replace("\t.page-link:focus {\n","\t// Forced colors paint no shadow, so the link takes the button's system-highlight outline there.\n\t.page-link:focus {\n")
wr('src/styles/components/_pagination.scss', p)
c=rd('src/styles/components/_close.scss')
assert c.count("\t.btn-close:focus {\n")==1
c=c.replace("\t.btn-close:focus {\n","\t// Forced colors paint no shadow, so the control takes the button's system-highlight outline there.\n\t.btn-close:focus {\n")
wr('src/styles/components/_close.scss', c)
