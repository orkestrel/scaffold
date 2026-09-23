# wave2-briefs.py: derive the ACCORDION, TOGGLES, and NAVBAR briefs from their drafts with the facts re-taken on the landing tree; BASE_SHA is filled after the disclosure push. Every replacement must match once.
import sys
U='/home/user/scaffold/.orkestrel/veneer/units/'
def build(u, extra):
    s=open(U+f'b-collapse-{u}-brief-draft.md').read()
    reps=[
        (f"the worktree `/home/user/veneer-{u}` (branch `unit/co` from `87ff1d0`)", f"the worktree `/home/user/veneer-{u}` (branch `unit/{u}` from `BASE_SHA`)"),
        ("Taken by the staging script at `87ff1d0` in the worktree", "Taken by the staging script at `BASE_SHA` in the worktree"),
        ("(a unified diff against `87ff1d0`, or the appended rows", "(a unified diff against `BASE_SHA`, or the appended rows"),
        (f"`git -C /home/user/veneer-{u} diff 87ff1d0` and", f"`git -C /home/user/veneer-{u} diff BASE_SHA` and"),
        ("run in their own worktrees on disjoint files; a shared file is report-only for every one of them.", "run in their own worktrees on disjoint files; a shared file is report-only for every one of them. ALERT, CAROUSEL, and the UTIL units land on the session branch while this unit runs, so the Orchestrator applies the shared patch with three-way resolution at landing and a moved context line is not this unit's concern; the section is appended after the last constructed section at `BASE_SHA` (`NavSection`), where the Orchestrator moves it if a sibling lands first."),
        ("A report at `/home/user/veneer-"+u+"/tmp/units/"+u+"-report.md` with:", "A report at `/home/user/veneer-"+u+"/tmp/units/"+u+"-report.md` (the report states no count of a growable set and names no list item by its position) with:"),
    ]
    for old,new in reps+extra:
        n=s.count(old)
        if n!=1: sys.exit(f'{u}: refused {n} for {old[:60]!r}')
        s=s.replace(old,new)
    # the unit's own files leave the off-limits list
    own={'ac':"ACCORDION: `_accordion.scss`, `accordion.test.ts`,\n`AccordionSection.ts`, `AccordionSection.test.ts`; ", 'tg':"TOGGLES: `_button-group.scss`, `_input-group.scss`,\n`button-group.test.ts`, `input-group.test.ts`, `ButtonGroupSection.test.ts`,\n`InputGroupSection.test.ts`; ", 'nb':"; NAVBAR: `_navbar.scss`, `navbar.test.ts`, `NavbarSection.ts`,\n`NavbarSection.test.ts`, `theme.test.ts`, `container.test.ts`, `_theme.scss`, `setupStyles.test.ts`'s\nundeclared-key case"}[u]
    n=s.count(own)
    if n!=1: sys.exit(f'{u}: own-files anchor {n}')
    s=s.replace(own,'')
    open(U+f'b-collapse-{u}-brief.md','w').write(s); print(u,'written')
build('ac', [
    ("The pinned inventory records `accordion` with 24 selectors.", "The pinned inventory records the `accordion` key's selectors (terrain § A lists them)."),
    ("`COMPONENT_DARK_ASSETS`\nin `tests/setupStyles.ts` lists their `--bs-*` names;", "`COMPONENT_DARK_ASSETS`\nin `tests/setupStyles.ts` (around line 2818) lists their `--bs-*` names;"),
    ("- Whether the light icon data URIs sit in an `$icons` map today (`grep -n \"\\$icons\" src/styles/_tokens.scss`):\n  the unit adds the light entries there (R3) or reports the map's absence and writes the URIs in\n  the partial with the reason.\n", "- None about the icon map: `$icons` sits in `src/styles/_tokens.scss` (around line 123) beside `$assets` (around line 163, holding `toggler-icon`, `accordion-icon`, and `accordion-active-icon`), so the unit adds the light accordion entries to `$icons` and deletes its two `$assets` rows in the same patch (R3); the `_theme.scss` walk over `$assets` (around lines 19 to 23) and the undeclared-key case in `tests/setupStyles.test.ts` (around lines 591 to 593) are NAVBAR's to retire.\n"),
])
build('tg', [
    ("The seven `Disclosure` rows (terrain § A, \"Guide rows\"):", "The `Disclosure` rows in `### Deferred selectors` at `BASE_SHA` (`grep -n \"Disclosure\" guides/veneer.md`; around lines 1966 to 1981 when read on the landing tree), the button-group and input-group rows:"),
    ("`.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`; plus any row DROPDOWN\ndeferred with owner `Disclosure` at `BASE_SHA` (`grep -n \"Disclosure\" guides/veneer.md`).", "`.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`; and the split-toggle rows DROPDOWN deferred with owner `Disclosure` (R5): `.dropdown-toggle-split`, `.dropdown-toggle-split::after`, `.dropup .dropdown-toggle-split::after`, `.dropend .dropdown-toggle-split::after`, `.dropstart .dropdown-toggle-split::before`, which the release writes in `_button-group.scss`. The guide's `### Button group classes` and `### Input group classes` prose that says Disclosure withholds them (around lines 1212, 1420, and 1438 on the landing tree) is rewritten in the same patch."),
    ("the resting rows for the six specimens,", "the resting rows for the specimens named under What asserts,"),
    ("5. The two section proofs exit 0 under the config the sibling section proofs use.", "5. The Button group and Input group section proofs exit 0 under the config the sibling section proofs use."),
])
build('nb', [
    ("The pinned inventory records `navbar` with 88 selectors, and", "The pinned inventory records the `navbar` key's selectors (terrain § A lists them), and"),
    ("retuning the eight colour and toggler variables,", "retuning the colour and toggler variables,"),
    ("`$assets` holds `toggler-icon` (`grep -n \"assets\" src/styles/_tokens.scss src/styles/_theme.scss\ntests/setupStyles.test.ts`);", "`$assets` in `src/styles/_tokens.scss` (around line 163) holds `toggler-icon`, `accordion-icon`, and `accordion-active-icon`, `_theme.scss` walks it with an `@error` (around lines 19 to 23), `tests/setupStyles.test.ts` carries the undeclared-key case (around lines 591 to 593), `COMPONENT_DARK_ASSETS` sits in `tests/setupStyles.ts` (around line 2818), and the theme proof's asset case is `tests/src/styles/theme.test.ts` (around line 135, \"carries the unlanded components' dark assets\");"),
])
