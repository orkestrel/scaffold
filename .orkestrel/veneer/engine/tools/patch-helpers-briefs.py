# Rewrites the generated lane briefs of a J-HELPERS round from the W2 component template to the
# helpers unit: the cut point, the entity wording, the reviewer's lane sentence, the checker's
# component-only items, and the analyst's sequence trace. Usage: python patch-helpers-briefs.py <round>
import pathlib
import sys

rnd = sys.argv[1]
U = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units')
common = [
    ('e24e2c3', 'e8251cf'),
    ('the Helpers engine', 'the helpers extraction'),
    ('Helpers engine', 'helpers extraction'),
]
per_lane = {
    'reviewer': [
        (
            "the `Helpers` class's shape against the landed pattern (`Collapse.ts`, `Button.ts`) and the design verdict, its private method set and terms, the option and vocabulary surface, the guide's `#### Helpers` subsection as a contract a consumer reads, the delegate route as an API, the shared patches' shape, and the case titles.",
            "the names and contracts of the extracted helpers against `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md` and the design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-helpers-design-verdict.md`, the doc blocks' voice and their § Surface rows as a contract a consumer reads, whether each routed site reads as the behaviour it had on `main`, the guide sentences the unit changed, the shared patches' shape, and the case titles.",
        ),
    ],
    'checker': [
        ('`Helpers.ts` holds one class plus imports;', '`helpers.ts` holds exported functions and imports only, no class;'),
        (
            "the fence under § Examples imports from `@orkestrel/veneer/browser`; the `plugin` row reads `shipped` with Proof `tests/src/browser/Helpers.test.ts`;",
            'the unit adds no § Examples fence and changes no `plugin` row;',
        ),
    ],
    'analyst': [
        (
            "Trace every show, hide, or change sequence door by door against `Helpers.ts` with a reaction at each write (a destruction, a re-entry, a token added or removed) and name any door that admits a state the call then writes over; trace the delegate route under nested roots, a destroyed delegate, and E12's same-host refusal;",
            "Trace each helper's contract against every site that routes through it and against that site's behaviour on `main` (`git show main:<file>` from the worktree), naming any input where the two differ: the guard order, the containment bound, the direction and order of a sibling walk, the nesting rule under each `ParentNode` root, the disabled reading on each route and on the dropdown's own methods and its light dismissal; trace the delegate routes that changed under nested roots, a destroyed delegate, and E12's same-host refusal;",
        ),
    ],
}
for lane, extra in per_lane.items():
    path = U / f'j-helpers-audit-{rnd}-{lane}-brief.md'
    if not path.exists():
        print(path.name, 'absent'); continue
    text = path.read_text(encoding='utf-8')
    for old, new in common + extra:
        if old not in text:
            print(f'{path.name}: MISSING {old[:60]!r}')
            continue
        text = text.replace(old, new)
    path.write_text(text, encoding='utf-8', newline='\n')
    leftovers = [w for w in ('Helpers.ts', '#### Helpers', 'Helpers` class', 'plugin` row reads', 'e24e2c3') if w in text]
    print(path.name, 'patched', 'leftovers:' if leftovers else 'clean', leftovers)
