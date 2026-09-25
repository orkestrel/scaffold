# E-ID-MOTION-FADE round 3 — checker read

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only. Perform the read directly and spawn nothing. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{tests,writing,names}.md`. No skill applies.

## Objective

Rule whether round 3 applied Items 1 to 4 of `/home/user/scaffold/.orkestrel/veneer/units/e-id-motion-fade-brief-3.md`
exactly, and nothing else.

## Evidence

All under `/home/user/scaffold/.orkestrel/veneer/units/`:
- the brief `e-id-motion-fade-brief-3.md` (Items 1 to 4 hold the exact text);
- the report `e-id-motion-fade-report-3.md`;
- the round-3 diff `mfade-3.diff` (`git diff 2376710` in `/home/user/veneer-mfade`) and `mfade-3-status.txt`;
- the round-2 diff `mfade-2.diff`, so you can tell round 3's lines from round 2's;
- the logs under `mfade-instruments/r3/`.

The worktree `/home/user/veneer-mfade` holds the change uncommitted. Read its files; never edit them.

## Claims

1. **Item 1.** § Fade classes in `guides/veneer.md` holds Item 1's replacement sentence verbatim, and the replaced
   sentence is gone.
2. **Item 2.** § Fade classes holds Item 2's two sentences verbatim in place of the earlier proof paragraph, and no
   other sentence of that paragraph remains.
3. **Item 3.** `tests/setupBrowser.test.ts` holds the title `reads no transition on the same change after the transition
   is removed`, and the `once` title is gone.
4. **Item 4.** The `sampleTransition` suite holds a case titled `refuses a named transition that carries no effect`. It
   loads the same fixture and makes the same change as the reading case, and asserts that
   `sampleTransition(element, 'opacity')` throws `The opacity transition carries no effect`. The case sets the effect
   through `Object.defineProperty` on the found transition rather than by assignment, and the report states why. Rule
   whether the case's comment, if it has one, states that reason truthfully against the report.
5. **Plant.** `mfade-instruments/r3/mfade-3-plant.log.txt` shows the new case failing with an assertion that names a
   different message than the expected one, and the report states the restore was byte-identical.
6. **Scope.** Between `mfade-2.diff` and `mfade-3.diff`, only `guides/veneer.md` and `tests/setupBrowser.test.ts`
   change, and only at the Items' sites.
7. **Gates.** The logs under `mfade-instruments/r3/` read `exit=0` for check, lint, guides, policy, and the
   `sampleTransition` project run.
8. **Law.** The new lines add no `any`, `as`, non-null assertion, suppression, nested function declaration, `should`, or
   count in prose.

## Output

A numbered verdict per claim (CONFIRMED, BROKEN, or NOT-EVIDENCED) with the `file:line` or log line behind it, findings
outside the claims to the same standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
