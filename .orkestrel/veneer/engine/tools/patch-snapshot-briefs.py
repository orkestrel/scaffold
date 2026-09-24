# Rewrites the generated lane briefs of the J-SNAPSHOT round 1 from the W2 component template to the
# HostSnapshot repair: the entity wording, the reviewer's lane sentence, the checker's component-only
# items and its shared-file clause (the unit returned a Modal.test.ts patch the Orchestrator applied),
# and the analyst's sequence trace. Usage: python patch-snapshot-briefs.py
import pathlib
import sys

U = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units')
RND = sys.argv[1] if len(sys.argv) > 1 else '1'
SFX = '' if RND == '1' else f'-{RND}'
common = [
    ('the HostSnapshot engine', 'the HostSnapshot repair'),
    ('HostSnapshot engine', 'HostSnapshot repair'),
]
per_lane = {
    'reviewer': [
        (
            "the `HostSnapshot` class's shape against the landed pattern (`Collapse.ts`, `Button.ts`) and the design verdict, its private method set and terms, the option and vocabulary surface, the guide's `#### HostSnapshot` subsection as a contract a consumer reads,",
            "the `HostSnapshot` class's repaired shape against its landed shape on `main` (`git show main:src/browser/HostSnapshot.ts` is what the Orchestrator's diff is against), its private member set and terms (`#hold`, `#depart`, `#join`, `#leave`, `#published`, `#joined`, `#leaving`, `written`), the `HostSnapshotInterface.restore` remarks in `types.ts` and the guide's § Ownership and restoration, `#### Dropdown`, and Modal presence paragraphs as a contract a consumer reads,",
        ),
    ],
    'checker': [
        (
            "the fence under § Examples imports from `@orkestrel/veneer/browser`; the `plugin` row reads `shipped` with Proof `tests/src/browser/HostSnapshot.test.ts`;",
            'the unit adds no § Examples fence and changes no `plugin` row; the barrel and the § Surface rows are unchanged;',
        ),
        (
            'every shared-file patch the report returns names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md`;',
            'the one shared-file patch the report returns names `tests/src/browser/Modal.test.ts`, and the Orchestrator applied it to the worktree before the gate run (the status therefore lists that file too, as the report\'s integration note states);',
        ),
    ],
    'analyst': [
        (
            'Trace every show, hide, or change sequence door by door against `HostSnapshot.ts` with a reaction at each write (a destruction, a re-entry, a token added or removed) and name any door that admits a state the call then writes over; trace the delegate route under nested roots, a destroyed delegate, and E12\'s same-host refusal;',
            'Trace `save` and `restore` against `HostSnapshot.ts` with a reaction at each write-back (a nested `restore` on the same snapshot, a `save` on the same element by this or another snapshot, a `destroy` of another engine, a throwing write) and name any interleaving of two or more snapshots, overlapping or sequential, that leaves a `class` or `style` attribute present and empty, writes a target twice, skips a target an interrupted restoration still owned, or consumes a record a re-entrant successor added; compare each engine consumer (`Modal`, `Dropdown`, `Button`, `Collapse`, `Tab`, `Carousel`) for a sequence the repair changes;',
        ),
    ],
}
for lane, extra in per_lane.items():
    path = U / f'j-snapshot-audit{SFX}-{lane}-brief.md'
    if not path.exists():
        print(path.name, 'absent'); continue
    text = path.read_text(encoding='utf-8')
    for old, new in common + extra:
        if old not in text:
            print(f'{path.name}: MISSING {old[:70]!r}')
            continue
        text = text.replace(old, new)
    path.write_text(text, encoding='utf-8', newline='\n')
    leftovers = [w for w in ('#### HostSnapshot', 'HostSnapshot engine', 'plugin` row reads', 'e24e2c3', 'Collapse.ts`, `Button.ts') if w in text]
    print(path.name, 'patched', 'leftovers:' if leftovers else 'clean', leftovers)
