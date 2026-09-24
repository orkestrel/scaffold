# Rewrites the generated audit lane briefs of a W2 landing round so their subject and their
# "already established" paragraphs describe the landing (an open merge of main into the unit's
# branch, the landing diff against MERGE_HEAD, the Orchestrator's gate run, the replay after the
# lanes). Usage: python patch-landing-briefs.py <unit> <Entity> <round> <unitTip> <mainTip>
import pathlib
import re
import sys

unit, entity, rnd, tip, main = sys.argv[1:6]
U = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units')
tree = f'C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/{unit}'
subject = (
    f"The J-{unit.upper()} unit's landing round {rnd} in the worktree `{tree}` (branch `unit/{unit}`: the unit's "
    f"rounds committed as `{tip}`, Veneer `main` `{main}` merged and the merge left open with every file staged; "
    f"`MERGE_HEAD` is `{main}`), briefed by `j-{unit}-brief-{rnd}.md`. The review evidence sits under "
    f"`{U.as_posix()}/`: the writer's report `j-{unit}-report-{rnd}.md`, the landing diff `j-{unit}-{rnd}.diff` "
    f"(the staged tree against `MERGE_HEAD` over `src/browser`, `tests/src/browser`, and `guides/veneer.md`: what "
    f"the landing adds to `main`), the fold diff `j-{unit}-{rnd}-fold.diff` (the staged tree against `{tip}`), the "
    f"status `j-{unit}-{rnd}-status.txt`, the writer's chain `j-{unit}-acceptance-{rnd}.sh`, the instrument "
    f"`j-{unit}-mutations-{rnd}.py` with its log `j-{unit}-mutations-{rnd}.log.txt`, and the claims file. The landed "
    f"`main` is readable in the worktree as `git show main:src/browser/Delegate.ts`. Read the worktree's files as "
    f"they stand; the Orchestrator's replay runs only after every lane has returned."
)
established = (
    f"Verified by the Orchestrator directly in the worktree (`j-{unit}-gates-{rnd}.log.txt`): `check:src:browser`, "
    f"oxlint, oxfmt, `test:src:browser`, `test:guides`, `test:policy`, the three builds, `test:conformance`, "
    f"`test:setup`, and the tree-wide `check` each exit 0; do not re-run them, and do not run a browser suite or a "
    f"mutation inside the sandbox. The sandbox denies the loopback listener vitest's browser mode binds, so a proof "
    f"that needs a browser run is an observation naming the exact command, never a verdict."
)


def rewrite(path: pathlib.Path) -> None:
    text = path.read_text(encoding='utf-8')
    text, n1 = re.subn(r'(## Subject\n\n)[^\n]+', lambda m: m.group(1) + subject, text, count=1)
    text, n2 = re.subn(
        r'(## Already established — do not re-run\n\n)[^\n]+', lambda m: m.group(1) + established, text, count=1
    )
    path.write_text(text, encoding='utf-8', newline='\n')
    print(path.name, 'subject' if n1 else 'NO SUBJECT', 'established' if n2 else 'NO ESTABLISHED')


for lane in ('analyst', 'checker'):
    rewrite(U / f'j-{unit}-audit-{rnd}-{lane}-brief.md')
