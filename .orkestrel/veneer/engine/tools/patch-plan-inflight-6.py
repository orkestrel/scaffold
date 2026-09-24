# Rewrites the plan's in-flight paragraph and the note to the styles session after the J-OFFCANVAS landing
# (Veneer main 2d95b37 over the styles session's 0fdadf4) and the tooltip's second merge.
# Usage: python patch-plan-inflight-6.py
import pathlib

path = pathlib.Path('C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md')
text = path.read_text(encoding='utf-8')

start = text.index('**In flight (this session).**')
end = text.index('\n', start)
paragraph = (
    "**In flight (this session).** Landed 2026-09-24 after J-HELPERS: J-TESTPIN (`f22f02c`), J-SNAPSHOT (`df258a1`, merge "
    "`c21fd17`), and J-OFFCANVAS (`0710469`, merge `2d95b37`, pushed) — the Offcanvas engine and its delegate routes, "
    "`Backdrop.hide` fading without removing and the removal as a step of the hide, `IsolationOptions.spare` as a "
    "non-inert claim with the isolation's precedence, the press on the backdrop element, the per-backdrop listener "
    "lifetime (`units/j-offcanvas-brief.md` to `-3.md`, the reports, the audit verdicts, `units/j-offcanvas-audit-3-verdict.md` "
    "for the prescription-adopted closure and the replay, `units/j-offcanvas-landing.log.txt`). The styles session landed "
    "on `main` at `0fdadf4` (`3e35cd7` merged its branch) between the snapshot and the offcanvas landings; the offcanvas "
    "landing chain ran green over it (719 browser, 26 conformance, 318 setup). J-TOOLTIP in `tmp/worktrees/tooltip` "
    "(`unit/tooltip`): rounds 1 to 4 are `4a10b51`, round 5 (the first landing round: the merge with `c21fd17`, the two "
    "door repairs, the promotion bound, the wording) is the Orchestrator's merge commit `0807a4f`; round 6 "
    "(`units/j-tooltip-brief-6.md`, writing) resolves the second merge with `main` `2d95b37` (five conflicted files: the "
    "guide, `constants.ts`, `index.ts`, `validators.ts`, `index.test.ts`). After its report: the landing diff against "
    "`MERGE_HEAD`, the objective lane and the checker over it, the Orchestrator's replay of `units/j-tooltip-mutations-5.py`, "
    "`w2-land-2b.sh tooltip`, the push. The handoff for a cold session is `handoff.md`; the tools are under `tools/`. "
    "Landed and pruned: W0 to W2 and J-HELPERS (`fd96a0b1`, `dc681254`). Queue after the tooltip: J-POPOVER (W4; the "
    "`Placement` guard rides with it), J-INTEGRATION and J-ROWS (W5), then J-SHOWCASE and E-VUE after the baseline closes. "
    "Nothing on screen reacts yet: no page constructs a `Delegate`; a unit mounting one over the showcase markup waits on "
    "the user's word."
)
text = text[:start] + paragraph + text[end:]

start = text.index('**Note to the styles session (')
end = text.index('\n', start)
note = (
    "**Note to the styles session (2026-09-24, 20:40 UTC; rewritten at each boundary).** Read at Veneer `origin/main` "
    "`2d95b37`: your landing `3e35cd7` and roadmap commit `0fdadf4` are on `main`, and this session's J-OFFCANVAS landing "
    "(`0710469`, merge `2d95b37`) sits over them, its chain green with your suites included (`test:src:browser` 719, "
    "`test:conformance` 26, `test:setup` 318). Landed by this session since your batch 2: J-HELPERS (`afae42c`), J-TESTPIN "
    "(`f22f02c`: `package.json` and the lockfile move to `@orkestrel/test` `^0.0.23`; `tests/setupBrowser.ts` loses "
    "`holdOraclePointer`), J-SNAPSHOT (`c21fd17`: `HostSnapshot.ts`, § Ownership and restoration, the Tab, Dropdown, "
    "Carousel, and Modal snapshot sentences), J-OFFCANVAS (`2d95b37`: `Offcanvas.ts`, `Backdrop.ts`, `Isolation.ts`, "
    "`Delegate.ts`, `parsers.ts`, `types.ts`, `constants.ts`, `validators.ts`, `index.ts`, the guide's `#### Offcanvas` and the "
    "Modal Backdrop and Isolation bullets). In flight here: J-TOOLTIP's second merge with `main` (its landing follows). "
    "When your branch next merges `main`, run `npm install --ignore-scripts` after the merge. The request stands: name each "
    "`main` landing here."
)
text = text[:start] + note + text[end:]
path.write_text(text, encoding='utf-8', newline='\n')
print('plan patched')
