# nv-seams.py: the joiners the three-way merge dropped at the append seams (each anchor must match once).
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'seam refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
edit('tests/setupStyles.test.ts', "\t\tfor (const { sides } of DROPDOWN_DIRECTION_CASES) expect(Object.isFrozen(sides)).toBe(true)\ndescribe('nav case tables'", "\t\tfor (const { sides } of DROPDOWN_DIRECTION_CASES) expect(Object.isFrozen(sides)).toBe(true)\n\t})\n})\n\ndescribe('nav case tables'")
edit('tests/setupStyles.ts', "\t\tproperty: '--bs-dropdown-header-padding-y',\n\t\ttoken: TOKEN_NAMES.space[4],\n\t\tpixels: 8,\n * Lists every official nav selector", "\t\tproperty: '--bs-dropdown-header-padding-y',\n\t\ttoken: TOKEN_NAMES.space[4],\n\t\tpixels: 8,\n\t}),\n])\n\n/**\n * Lists every official nav selector")
edit('app/browser/constants.ts', "\t\t}),\n\t),\n/** Holds the Nav section's visible copy and accessible name. */", "\t\t}),\n\t),\n])\n\n/** Holds the Nav section's visible copy and accessible name. */")
print('seams joined')
# --- the fourth seam (the dark-cases table before NAV_COLOR_CASES) ---
edit('tests/setupStyles.ts', "\t\tproperty: '--bs-dropdown-header-color',\n\t\tsource: TOKEN_NAMES.gray[500],\n\t\tmoves: true,\n * Pins each published nav color", "\t\tproperty: '--bs-dropdown-header-color',\n\t\tsource: TOKEN_NAMES.gray[500],\n\t\tmoves: true,\n\t}),\n])\n\n/**\n * Pins each published nav color")
print('fourth seam joined')
# --- the registry seam (the last dropdown row before the first nav row) ---
edit('tests/setup.ts', "\t\tselector: '.dropdown:has(> .dropdown-menu-xxl-end)',\n\t\tproperty: 'position',\n\t\tscenario: 'nav-base',", "\t\tselector: '.dropdown:has(> .dropdown-menu-xxl-end)',\n\t\tproperty: 'position',\n\t}),\n\tObject.freeze({\n\t\tscenario: 'nav-base',")
