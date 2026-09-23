"""Wires the Nav section into the staged showcase, barrel, and their enumerating proofs."""
STAGE = '/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-stage'

def swap(rel, old, new):
    p = f'{STAGE}/{rel}'
    s = open(p).read()
    if new in s:
        return
    assert s.count(old) == 1, (rel, old, s.count(old))
    open(p, 'w').write(s.replace(old, new))

swap('app/browser/Showcase.ts',
     "import { MediaSection } from './sections/MediaSection.js'\n",
     "import { MediaSection } from './sections/MediaSection.js'\nimport { NavSection } from './sections/NavSection.js'\n")
swap('app/browser/Showcase.ts',
     "\t\t\tnew InputGroupSection(this.#main),\n",
     "\t\t\tnew InputGroupSection(this.#main),\n\t\t\tnew NavSection(this.#main),\n")
swap('app/browser/index.ts',
     "export * from './sections/InputGroupSection.js'\n",
     "export * from './sections/InputGroupSection.js'\nexport * from './sections/NavSection.js'\n")
swap('tests/app/browser/index.test.ts',
     "\t\t\t'MediaSection',\n",
     "\t\t\t'MediaSection',\n\t\t\t'NAV_COPY',\n\t\t\t'NAV_SPECIMENS',\n\t\t\t'NavSection',\n")
swap('tests/app/browser/Showcase.test.ts',
     "\tMEDIA_SPECIMENS,\n",
     "\tMEDIA_SPECIMENS,\n\tNAV_SPECIMENS,\n")
swap('tests/app/browser/Showcase.test.ts',
     "\t\t\t\t'Input group',\n",
     "\t\t\t\t'Input group',\n\t\t\t\t'Nav',\n")
swap('tests/app/browser/Showcase.test.ts',
     "\t\t\t\t\t...INPUT_GROUP_SPECIMENS,\n\t\t\t\t].map",
     "\t\t\t\t\t...INPUT_GROUP_SPECIMENS,\n\t\t\t\t\t...NAV_SPECIMENS,\n\t\t\t\t].map")
swap('tests/app/browser/integration.test.ts',
     "\n\tMEDIA_SPECIMENS,\n",
     "\n\tMEDIA_SPECIMENS,\n\tNAV_SPECIMENS,\n")
swap('tests/app/browser/integration.test.ts',
     "\t\t\t\tMEDIA_SPECIMENS,\n\t\t\t\tPAGINATION_SPECIMENS,\n",
     "\t\t\t\tMEDIA_SPECIMENS,\n\t\t\t\tNAV_SPECIMENS,\n\t\t\t\tPAGINATION_SPECIMENS,\n")
print('edited')
