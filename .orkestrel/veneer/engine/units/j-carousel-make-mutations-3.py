# Builds tmp/j-carousel/mutations-3.py from mutations-2.py: every round-2 row kept, the log renamed,
# and the round-3 rows for items A and B appended.
import pathlib

HERE = pathlib.Path(__file__).parent
text = (HERE / 'mutations-2.py').read_text(encoding='utf-8')
head = '# J-CAROUSEL round-2 mutation instrument'
assert text.count(head) == 1
text = text.replace(
    head,
    '# J-CAROUSEL round-3 mutation instrument: a copy of tmp/j-carousel/mutations-2.py with every round-2\n'
    '# row kept and the round-3 rows for items A and B added. The round-2 header follows.\n' + head,
)
old_log = "LOG = ROOT / 'tmp/j-carousel/mutations-2.log.txt'"
assert text.count(old_log) == 1
text = text.replace(old_log, "LOG = ROOT / 'tmp/j-carousel/mutations-3.log.txt'")
marker = "     [(Y, '\\t\\ttouch-action: pan-y;\\n', '')]),\n]\n"
assert text.count(marker) == 1, 'marker'
rows = r"""    # Round 3: A
    ('the pause tally is read after the dispatch', CT, 'keeps a pause a slide listener made under an interaction ride',
     [(C, '\t\tconst pauses = this.#pauses\n\t\tif (!emitEvent(', '\t\tif (!emitEvent('),
      (C, '\t\tconst cycling = this.#timer !== undefined\n', '\t\tconst cycling = this.#timer !== undefined\n\t\tconst pauses = this.#pauses\n')]),
    # Round 3: B
    ('mouse activity does not end the tap exemption', CT, 'holds the timer under the hover once the mouse moves inside the host after a trusted tap',
     [(C, "\t\t\thost.addEventListener('pointermove', (event) => this.#notice(event), { signal })\n\t\t\thost.addEventListener('pointerdown', (event) => this.#notice(event), { signal })\n", '')]),
    ('ending the tap exemption leaves the timer armed', CT, 'holds the timer under the hover once the mouse moves inside the host after a trusted tap',
     [(C, "\t\tif (this.#host.matches(':hover')) this.#disarm()\n", '')]),
]
"""
text = text.replace(marker, "     [(Y, '\\t\\ttouch-action: pan-y;\\n', '')]),\n" + rows)
(HERE / 'mutations-3.py').write_text(text, encoding='utf-8', newline='\n')
dry = (HERE / 'mutations-dry.py').read_text(encoding='utf-8').replace("(HERE / 'mutations.py')", "(HERE / 'mutations-3.py')")
(HERE / 'mutations-3-dry.py').write_text(dry, encoding='utf-8', newline='\n')
print('mutations-3.py written')
