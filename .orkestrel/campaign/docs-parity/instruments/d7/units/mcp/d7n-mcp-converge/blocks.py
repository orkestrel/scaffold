import io,re,sys
FILES=['src/core/types.ts','src/server/types.ts','src/browser/types.ts','src/core/constants.ts','src/server/constants.ts','src/browser/constants.ts']
blocks={}
for f in FILES:
    src=io.open(f,encoding='utf8').read()
    for m in re.finditer(r'/\*\*((?:(?!\*/).)*?)\*/\s*\nexport (?:const|type|interface) ([A-Za-z0-9_]+)', src, re.S):
        body=m.group(1); name=m.group(2)
        text='\n'.join(re.sub(r'^\s*\*ic?','',l).strip() for l in body.split('\n'))
        text='\n'.join(re.sub(r'^\s*\*ic?\s?','',re.sub(r'^\s*\*\s?','',l)) for l in body.split('\n'))
        blocks[name]=(f, text.strip())
def get(n): return blocks.get(n)
if __name__=='__main__':
    for n in sys.argv[1:]:
        b=get(n)
        print('=====',n, b[0] if b else 'MISSING')
        if b: print(b[1])
