# The Orchestrator's search behind the E-ID-BUTTON class list: every <button> opening tag in Bootstrap v5.3.8's site
# sources (sparse clone of twbs/bootstrap at tag v5.3.8, commit 25aa8cc, path site/src), its class attribute, and the
# class tokens of any composition carrying none of the base classes. Run from the clone's root.
import re,glob,collections
files=glob.glob('site/src/content/docs/**/*.mdx',recursive=True)+glob.glob('site/src/content/docs/**/*.md',recursive=True)+glob.glob('site/src/assets/examples/**/*.astro',recursive=True)+glob.glob('site/src/components/**/*.astro',recursive=True)
BASE={'btn','btn-close','navbar-toggler','accordion-button','dropdown-item','nav-link','list-group-item','page-link','carousel-control-prev','carousel-control-next'}
UTIL=re.compile(r'^(m[trblxyse]?|p[trblxyse]?|g[xy]?|d|flex|justify|align|text|bg|border|rounded|w|h|mw|mh|vw|vh|position|top|bottom|start|end|translate|shadow|opacity|overflow|order|col|row|fs|fw|fst|lh|link|icon|visually|user|pe|z|gap|float|clearfix|ratio|stretched|lead|small|font|me|ms|mx|my|mb|mt|ps|pe|px|py|pb|pt)(-|$)')
comps=collections.OrderedDict(); sole=collections.OrderedDict(); classless=[]; target=[]
for f in sorted(files):
    for i,line in enumerate(open(f,encoding='utf8'),1):
        for m in re.finditer(r'<button\b([^>]*)>',line):
            attrs=m.group(1); cm=re.search(r'class="([^"]*)"',attrs)
            if not cm:
                (target if 'data-bs-target' in attrs else classless).append(f'{f}:{i}'); continue
            cls=cm.group(1).strip(); comps.setdefault(cls,f'{f}:{i}')
            toks=[t for t in re.split(r'\s+',cls) if t and '{' not in t]
            if not (set(toks)&BASE):
                for t in toks:
                    if not UTIL.match(t): sole.setdefault(t,f'{f}:{i}')
print('files read:',len(files))
print('\n## compositions without a base class (non-utility tokens)')
for k,v in sole.items(): print(f'{k}\t{v}')
print('\n## classless button:', classless[:5], '...' if len(classless)>5 else '')
print('## classless data-bs-target button:', target[:5], '...' if len(target)>5 else '')
print('\n## distinct compositions:', len(comps))
