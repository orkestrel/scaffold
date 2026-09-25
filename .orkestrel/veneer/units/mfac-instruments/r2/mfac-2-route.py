# Round 2: routes each motion-factor sweep case through the sweepMotionFactor reader.
import pathlib, re
files = ['form-floating', 'progress', 'nav', 'pagination', 'navbar', 'accordion']
for name in files:
    p = pathlib.Path(f'tests/src/styles/components/{name}.test.ts')
    s = p.read_text()
    head = re.compile(r"const (samples|readings) = \['1', '2', '0'\]\.map\(\(factor\) => \{\n\t\t\tdocument\.documentElement\.style\.setProperty\(TOKEN_NAMES\.factor\.motion, factor\)\n")
    m = head.search(s)
    assert m, name
    var = m.group(1)
    s = s[:m.start()] + f"const {var} = sweepMotionFactor(() => {{\n" + s[m.end():]
    # tail of the drive
    tail_single = re.compile(r"\t\t\tconst sample = (sampleTransition\([^\n]*\))\n\t\t\tscene\.clear\(\)\n\t\t\treturn sample\n\t\t\}\)\n")
    tail_multi = re.compile(r"\t\t\tconst samples = (properties\.map\([^\n]*\))\n\t\t\tscene\.clear\(\)\n\t\t\treturn samples\n\t\t\}\)\n")
    n = 0
    s, k = tail_single.subn(lambda mm: f"\t\t\treturn {mm.group(1)}\n\t\t}})\n", s); n += k
    s, k = tail_multi.subn(lambda mm: f"\t\t\treturn {mm.group(1)}\n\t\t}})\n", s); n += k
    assert n == 1, (name, n)
    # destructure straight from the sweep
    d1 = f"\t\tconst {var} = sweepMotionFactor("
    dest = re.compile(r"\t\tconst \[(resting(?: = \[\])?), (doubled(?: = \[\])?), stopped( = \[\])?\] = " + var + r"\n")
    dm = dest.search(s)
    assert dm, name
    pattern = f"[{dm.group(1)}, {dm.group(2)}, zeroed{dm.group(3) or ''}]"
    s = s[:dm.start()] + s[dm.end():]
    s = s.replace(d1, f"\t\tconst {pattern} = sweepMotionFactor(", 1)
    s = s.replace('expect(stopped)', 'expect(zeroed)')
    assert 'expect(stopped' not in s and 'stopped =' not in s and ', stopped]' not in s, name
    # the reader restores the factor, so the hook no longer removes it
    hook = "\tdocument.documentElement.style.removeProperty(TOKEN_NAMES.factor.motion)\n"
    assert s.count(hook) == 1, name
    s = s.replace(hook, '')
    s = s.replace('\tsampleTransition,\n\tscene,\n', '\tsampleTransition,\n\tscene,\n\tsweepMotionFactor,\n', 1)
    assert 'sweepMotionFactor,\n' in s, name
    p.write_text(s)
    print(name, var, pattern, 'TOKEN_NAMES uses:', s.count('TOKEN_NAMES'))
