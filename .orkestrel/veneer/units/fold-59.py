# fold-59.py: the ACCORDION landing (53d3c21 over 55ca0cd): record the landing in the ROADMAP's B-COLLAPSE … B-SCROLLSPY
# routing row, add the CLOSE-OUT carrier rows the wave-2 audits referred to the Orchestrator, and move the plan's in-flight
# line from "chain runs" to "chain green". Anchor-refusing.
import sys
def edit(path, old, new):
    s=open(path).read(); n=s.count(old)
    if n!=1: sys.exit(f'integration refused: anchor count {n} in {path} for {old[:60]!r}')
    open(path,'w').write(s.replace(old,new))
R='/home/user/veneer/ROADMAP.md'; P='/home/user/scaffold/.orkestrel/veneer/plan.md'
edit(R, "COLLAPSE's fix round on `builder`), the plugin rows for Collapse, Dropdown, Tab, and ScrollSpy in the guide with `Owner: J-ENGINE.`",
        "COLLAPSE's fix round on `builder`), the plugin rows for Collapse, Dropdown, Tab, and ScrollSpy in the guide with `Owner: J-ENGINE.`; ACCORDION landed as `53d3c21` (over a first round and a fix round on `opus`, each audited by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker`; the Accordion region constructed after Carousel; the base and flush frames read at 1280 and 390 at the landing)")
print('fold-59: routing row updated')
s=open(R).read(); lines=s.split('\n')
idx=[i for i,l in enumerate(lines) if l.startswith("| The `readCascadeBlocks` function stores a declaration's value without its priority")]
if len(idx)!=1: sys.exit(f'integration refused: carrier anchor count {len(idx)}')
rows=[
"| Inline static case pairs in landed proofs: the `[selector, expected]` tuples at `tests/src/styles/components/nav.test.ts` (the case around line 449) and `tests/src/styles/components/input-group.test.ts` (around line 373), the same shape NAVBAR round 3 moves to `tests/setupStyles.ts` (the NAVBAR round-2 audit) | CLOSE-OUT moves each to a documented, frozen table in `tests/setupStyles.ts` under `.claude/rules/tests.md`, bound in the freeze case |",
"| The `#### ` departure tables after `table` and before `placeholder` in `guides/veneer.md` (the form-validation cluster and the `card`, `breadcrumb`, `pagination`, `badge`, `progress`, `list-group`, and `btn-close` group) do not follow the sorted run the section states (the UTIL-PLACEMENT round-3 report) | CLOSE-OUT reorders the cluster into the sorted run, or names the exception in § Departures |",
"| Bare field tokens as sentence subjects in the older TSDoc blocks of `tests/setupStyles.ts` (the `INPUT_GROUP_SIZE_CASES` and `INPUT_GROUP_FLOATING_CASES` blocks among them; the TOGGLES round-2 audit) | CLOSE-OUT's token-noun sweep over `tests/setupStyles.ts` gives each field token its noun, as the wave-2 units' blocks do |",
]
lines[idx[0]+1:idx[0]+1]=rows
open(R,'w').write('\n'.join(lines)); print('fold-59: carrier rows added')
edit(P, "its verification chain runs, and the push follows with PROOF-RESOLVER", "its verification chain read green (`units/main-ac-gates.log.txt`, `units/ac-landing-measurements.txt`), the roadmap folded (`units/fold-59.py`), and the push follows with PROOF-RESOLVER")
print('fold-59: plan in-flight line updated')
