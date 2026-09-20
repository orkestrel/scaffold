# Unit U6 — successor brief 7: the `@throws` sentence

## What changed and why

This brief supersedes `u6-brief-6.md` for the remainder of the unit; every section of
`u6-brief.md` stands except where this brief says otherwise. Round 5 (objective lane
on Opus, subjective lane on Astra, verifier) confirmed the hygiene round's other four items. The
subjective lane refuted claim 3: the `@throws` added to `releasePointer` says the park failure
"carries the release rejection as its cause", while the implementation at
`src/browser/helpers.ts:658` builds `new AggregateError([rejection], message, { cause })` — the
aggregate's `cause` is the park rejection and its `errors` hold the release rejection. The
Orchestrator read the same lines. The objective lane
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u6-audit-5-reviewer-report.md`)
refuted claim 4: the hygiene round deleted the sibling `:active` assertion at old line 963 instead
of the marker assertion at line 962 (`expect(document.documentElement.hasAttribute(POINTER_HOLD)).toBe(false)`
before any hold), so the assertion that cannot fail survives under a case name that headlines it;
and it recorded two bounds this round closes too. The verifier ran the chain green on managed
Chromium and `test:src:browser` green on Edge twice (`units/u6-gate-report-5.md`).

Items 3 and 4 are the objective lane's:

3. **The rejected-press case (objective claim 4).** In the case at `tests/src/browser/helpers.test.ts:945`,
   delete the assertion at `:962` that reads `POINTER_HOLD` before any hold (it cannot fail);
   rename the case to what it drives: the marker is recorded only after the press send resolves;
   keep the `pointerdown` recorder and `expect(markers.calls).toEqual([[false]])` as the
   discriminating reading, and keep the direct protocol rejection as the case's first act.
4. **`holdAccessible`'s failure shape (objective finding 9) and the wrap (finding 8).** This
   unit's earlier round made the missed-press refusal able to carry a release rejection as
   `cause`; say so in `holdAccessible`'s `@throws` and `@remarks` and in the `Bounds` bullet at
   `guides/test.md:1608-1612`. Re-wrap the paragraph at `guides/test.md:1633-1635` to the bullet's
   column so no line runs past it or ends mid-sentence.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. You are the sole
writer in the Test checkout (`C:/Users/mikes/WebstormProjects/test`); commit nothing; run no
`git` command that writes or discards anything. Run every command from that checkout in Git Bash.

## Scope

**Owned.** `src/browser/helpers.ts`, `guides/test.md`. **Off-limits.** Everything else.

## Execution

1. Replace `releasePointer`'s `@throws` sentence with: "Thrown when the release or the park
   rejects. If both reject, the aggregate carries the park rejection as its cause and the release
   rejection in its errors." Read the `@remarks` beside it and the `Bounds` bullet in
   `guides/test.md` once more against the code and align any sentence that states the shape.
2. `npx oxfmt --config .oxfmtrc.json --write src/browser/helpers.ts guides/test.md`; then
   `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`,
   `npm run test:guides`; record each command's final lines.

## Output

Write `u6-report-7.md` and return its content: the diff; each gate's exit code and final
lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file.

## Acceptance criteria

1. The `@throws` sentence states the shape the code builds.
2. The gates named exit 0.
3. `git status --porcelain` lists the six U6 files and nothing else.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
