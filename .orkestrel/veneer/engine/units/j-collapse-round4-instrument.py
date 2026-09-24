# Builds mutations-4.py from mutations-3.py: ROOT set to the moved worktree (E14), its own log, and
# the four round-4 rows with the exact texts of the Orchestrator's single-door probe.
import pathlib

HERE = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse/tmp/j-collapse')
text = (HERE / 'mutations-3.py').read_text(encoding='utf-8')


def replace(old, new):
    global text
    if text.count(old) != 1:
        raise SystemExit(f'expected one match: {old[:90]!r} found {text.count(old)}')
    text = text.replace(old, new)


replace('# J-COLLAPSE round 3 mutation instrument (D6), a copy of mutations-2.py with the round-3 rows:',
        '# J-COLLAPSE round 4 mutation instrument, a copy of mutations-3.py with the round-4 rows and the moved root:')
replace("ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer-collapse')",
        "ROOT = pathlib.Path('C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/collapse')")
replace("LOG = ROOT / 'tmp/j-collapse/mutations-round-3.log.txt'",
        "LOG = ROOT / 'tmp/j-collapse/mutations-round-4.log.txt'")
replace("""    # Delegate
    ('the same-host conflict is not refused',""", """    ('the host-and-shown removal door admits the shown token', CT, 'stops a hide whose host-and-shown removal',
     [(C, REMOVAL, REMOVAL.replace('[shown]', '[]'))]),
    ('the size-clearing door admits the shown token', CT, 'stops a hide whose size clearing',
     [(C, CLEARING, CLEARING.replace('[shown]', '[]'))]),
    ('the post-await read admits the shown token', CT, 'stops a hide when the shown token returns during its transition',
     [(C, POST_AWAIT, POST_AWAIT.replace('[shown]', '[]'))]),
    # Delegate
    ('the conflict read names a panel through the target attribute alone', DT, 'refuses a click whose anchor trigger names its own panel',
     [(D, CONFLICT, CONFLICT.replace('.includes(host) &&', '.includes(host) &&\\n\\t\\t\\ttrigger.hasAttribute(this.#collapse.attributes.target) &&'))]),
    ('the same-host conflict is not refused',""")
replace("""MUTATIONS = [""", """REMOVAL = "\\t\\t\\t!this.#apply(change, during, [shown], () => host.classList.remove(this.#classes.host, shown))\\n"
CLEARING = "\\t\\tif (!this.#apply(change, during, [shown], () => host.style.removeProperty(dimension))) {\\n"
POST_AWAIT = "\\t\\tif (!this.#holds(change, during, [shown])) return false\\n"
CONFLICT = "\\t\\t\\treadTargets(trigger, this.#collapse.attributes).includes(host) &&\\n"

MUTATIONS = [""")
(HERE / 'mutations-4.py').write_text(text, encoding='utf-8', newline='\n')
print('ok')
