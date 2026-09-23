#!/usr/bin/env python3
"""A landing integration edits: the Showcase.test.ts Button-specimen query narrowed to the Buttons
region (the unit's returned patch), the ButtonSection census excluding the badge's button host, the
_badge.scss header comment distinguishing the font-size, padding, and weight references (fix-audit
F2), and the three A guide sections reflowed at 100 columns (fix-audit claim 7).
Usage: ba-integration-edit.py <root>  (the checkout root; tested on copies first)"""
import re, sys, textwrap
root=sys.argv[1]
def edit(path, pairs):
    s=open(path).read()
    for old,new in pairs:
        assert s.count(old)==1, (path, old[:60], s.count(old))
        s=s.replace(old,new)
    open(path,'w').write(s)
# 1. Showcase.test.ts: the B landing already scoped the Button specimen query to the Buttons region
#    (`section[aria-label="${BUTTON_COPY.region}"] .${BUTTON_CLASS}`), so the unit's returned patch is satisfied.
# 2. ButtonSection.test.ts census
edit(f'{root}/tests/app/browser/sections/ButtonSection.test.ts', [
 ("(name) => !name.startsWith('btn-group') && name !== 'btn-check' && name !== 'btn-toolbar',",
  "(name) =>\n\t\t\t\t!name.startsWith('btn-group') &&\n\t\t\t\t!name.startsWith('btn-close') &&\n\t\t\t\tname !== 'btn-check' &&\n\t\t\t\tname !== 'btn-toolbar',"),
])
# 3. _badge.scss header comment: rewrap the first comment paragraph with the corrected references
bp=f'{root}/src/styles/components/_badge.scss'
bl=open(bp).read().split('\n')
first=next(i for i,l in enumerate(bl) if l.startswith('\t// The badge ships Bootstrap'))
last=first
while bl[last+1].startswith('\t// ') : last+=1
para=' '.join(l[len('\t// '):] for l in bl[first:last+1])
old_sentence="Its padding, font size, and weight are written as the release writes them: each is relative to the badge's own inherited font size, so no published length scale resolves to the recorded value and a token here would change what the class measures."
new_sentence="Its font size is `0.75em` of the host's, its padding is written in `em` of the badge's own font size, and its weight is the fixed `700`, each as the release writes it: no published length scale resolves to those values, so a token here would change what the class measures."
assert para.count(old_sentence)==1, para[:120]
para=para.replace(old_sentence,new_sentence)
wrapped=textwrap.wrap(para, width=100, initial_indent='\t// ', subsequent_indent='\t// ', break_long_words=False, break_on_hyphens=False, tabsize=4, expand_tabs=False)
# tabs count as one character to textwrap; the formatter reads a tab as four columns, so wrap at 96 visible
wrapped=textwrap.wrap(para, width=97, initial_indent='\t// ', subsequent_indent='\t// ', break_long_words=False, break_on_hyphens=False)
bl[first:last+1]=wrapped
open(bp,'w').write('\n'.join(bl))
# 4. Reflow the A sections' prose at 100 columns
p=f'{root}/guides/veneer.md'
lines=open(p).read().split('\n')
start=next(i for i,l in enumerate(lines) if l=='### Breadcrumb classes')
end=next(i for i in range(start+1,len(lines)) if lines[i]=='### Deferred selectors')
out=lines[:start]; i=start; fenced=False; changed=0
while i<end:
    l=lines[i]
    if l.startswith('```'): fenced=not fenced; out.append(l); i+=1; continue
    if fenced or l.strip()=='' or l.startswith('|') or l.startswith('#') or l.startswith('<'):
        out.append(l); i+=1; continue
    m=re.match(r'^(\s*(?:[-*]|\d+\.)\s+)', l)
    indent_first=m.group(1) if m else ''
    indent_rest=' '*len(indent_first)
    block=[l]; j=i+1
    while j<end and lines[j].strip()!='' and not lines[j].startswith(('|','#','```','<')) and not re.match(r'^\s*(?:[-*]|\d+\.)\s+', lines[j]):
        block.append(lines[j]); j+=1
    text=' '.join(x.strip() for x in block)
    if indent_first: text=text[len(indent_first.strip()):].strip()
    wrapped=textwrap.wrap(text, width=100, initial_indent=indent_first, subsequent_indent=indent_rest, break_long_words=False, break_on_hyphens=False)
    if wrapped!=block: changed+=1
    out.extend(wrapped); i=j
out.extend(lines[end:])
open(p,'w').write('\n'.join(out))
long=[k+1 for k,l in enumerate(out[start:end], start) if len(l)>100 and not l.startswith('|')]
print('paragraphs reflowed:', changed, 'remaining over-width lines in the A sections:', long)
