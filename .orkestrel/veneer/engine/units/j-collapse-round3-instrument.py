# Builds mutations-3.py from mutations-2.py (D6): the round-2 instrument stays as it ran, and the
# copy adds the round-3 rows and writes its own log, mutations-round-3.log.txt.
import pathlib

ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse/tmp/j-collapse')
text = (ROOT / 'mutations-2.py').read_text(encoding='utf-8')


def replace(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    text = text.replace(old, new)


replace('# J-COLLAPSE round 2 mutation instrument (C6):',
        '# J-COLLAPSE round 3 mutation instrument (D6), a copy of mutations-2.py with the round-3 rows:')
replace("LOG = ROOT / 'tmp/j-collapse/mutations-round-2.log.txt'",
        "LOG = ROOT / 'tmp/j-collapse/mutations-round-3.log.txt'")
replace("""    # Delegate
    ('the delegate has no collapse route',""", """    ('the trigger-write door reads no token', CT, 'stops a hide whose trigger write',
     [(C, '#writeTriggers(change, during, [], triggers, true)', '#writeTriggers(change, [], [], triggers, true)'),
      (C, '#writeTriggers(change, during, [shown], collapsed, false)', '#writeTriggers(change, [], [], collapsed, false)')]),
    ('the hide doors after the removal admit the shown token', CT, 'stops a hide whose trigger write',
     [(C, '!this.#apply(change, during, [shown], () => host.classList.remove(this.#classes.host, shown))',
       '!this.#apply(change, during, [], () => host.classList.remove(this.#classes.host, shown))'),
      (C, '#writeTriggers(change, during, [shown], collapsed, false)', '#writeTriggers(change, during, [], collapsed, false)'),
      (C, 'this.#apply(change, during, [shown], () => host.style.removeProperty(dimension))',
       'this.#apply(change, during, [], () => host.style.removeProperty(dimension))'),
      (C, 'if (!this.#holds(change, during, [shown])) return false', 'if (!this.#holds(change, during, [])) return false')]),
    ('#prune runs after the refusals', CT, 'destroys a sibling collapse it constructed',
     [(C, '\\t\\tthis.#prune()\\n\\t\\tif (this.#refused(true) || this.#transitioning(this.#siblings())) return false\\n',
       '\\t\\tif (this.#refused(true) || this.#transitioning(this.#siblings())) return false\\n\\t\\tthis.#prune()\\n'),
      (C, '\\t\\tthis.#prune()\\n\\t\\tif (this.#refused(false)) return false\\n',
       '\\t\\tif (this.#refused(false)) return false\\n\\t\\tthis.#prune()\\n')]),
    # Delegate
    ('the same-host conflict is not refused', DT, 'refuses a click whose button host',
     [(D, '\\t\\tif (this.#conflicts(event.target)) return\\n', '')]),
    ('the delegate has no collapse route',""")
(ROOT / 'mutations-3.py').write_text(text, encoding='utf-8', newline='\n')
print('ok')
