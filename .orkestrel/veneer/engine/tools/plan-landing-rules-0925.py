# Adds two landing-procedure rules to plan.md (2026-09-25), each learned at a landing this day: a unit that changes an
# engine's completion timing names `npm run test:app` in its acceptance; and when w2-land-2d stops on the E5 standing row
# alone, w2-land-rest.sh runs the projects `npm run test` skipped. Inserted after step 5; the anchor must occur once.
from pathlib import Path

p = Path(r'C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\engine\plan.md')
lines = p.read_bytes().decode('utf-8').split('\n')
hits = [i for i, line in enumerate(lines) if line.startswith('5. Land: ')]
assert len(hits) == 1, len(hits)
lines.insert(
    hits[0] + 1,
    "   - `tools/w2-land-run.sh <unit>` runs `w2-merge-main.sh`, then `w2-land-2d.sh`, then the push, for a unit whose "
    "commits are on its branch. When `w2-land-2d.sh` stops on a standing row E5 excludes and on nothing else, "
    "`tools/w2-land-rest.sh <unit>` runs each project `npm run test` skips after a red `test:src`, and then the "
    "fast-forward and the push. `npm run test` chains its projects with `&&`, so one red skips every later project.\n"
    "   - A brief for a unit that changes an engine's completion timing names `npm run test:app` in its acceptance. "
    "The showcase drives the engines and reads their completion, and a showcase case that reads an engine's state "
    "right after awaiting an element's animations races the engine's settle (J-MOTION-PROOFS-A's landing, "
    "`units/j-motion-proofs-a-brief-5.md`).",
)
p.write_bytes('\n'.join(lines).encode('utf-8'))
print('ok')
