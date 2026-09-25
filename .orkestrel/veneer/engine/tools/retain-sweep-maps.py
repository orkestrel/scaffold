# Retains J-RELEASE-SWEEP's Opus lens maps (2026-09-25): reads the workflow's task output, a JSON object whose `result`
# array holds one {id, text} per slice, and writes each text verbatim to units/j-release-sweep-<slice>-map.md under a
# header naming the lens, its engine, and the workflow run.
import json
import sys
from pathlib import Path

OUTPUT = Path(sys.argv[1])
UNITS = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\units')
RUN = 'wf_29efd986-1c7'

maps = json.loads(OUTPUT.read_text(encoding='utf-8'))['result']
for entry in maps:
    slice_id = entry['id']
    path = UNITS / f'j-release-sweep-{slice_id.lower()}-map.md'
    header = (
        f'# J-RELEASE-SWEEP slice {slice_id} — the lens map (2026-09-25)\n\n'
        f'`reviewer` on Opus 5.5, holding the objective lens, in Workflow run `{RUN}`. The brief is '
        '`units/j-release-sweep-brief.md`. The lens\'s final message follows verbatim.\n\n'
    )
    path.write_text(header + entry['text'].rstrip('\n') + '\n', encoding='utf-8')
    print(path.name, len(entry['text']))
