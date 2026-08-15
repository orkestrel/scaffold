# U5 micro round — two Escape proofs get their human focus origin

Successor to `u5-brief-2.md`. Carries exactly one finding: closing-audit claim 1 BROKEN
(`u5-audit2-last.md` item 1, Orchestrator-verified) — two focus/Escape proofs in
`tests/app/browser/ApplicationView.test.ts` establish their state through direct controller
calls (`attached?.open('build')`, `attached?.select(PHASE)`) before `userEvent.keyboard('{Escape}')`,
so the Escape does not originate from focus a real interaction established. Everything else in
the closing audit is CONFIRMED; the provenance item was closed on the Orchestrator's session
record.

## Role and engine

`builder` (fully specified, taste-free two-site change). Sole serial writer in
`/workspace/supervisor` from clean committed baseline **419aafb**. Perform directly, spawn
nothing, no commits/pushes/installs.

## The change

In `tests/app/browser/ApplicationView.test.ts`, in exactly these two tests:

1. `places focus in the content that took over and returns it to the row it came from`
   (around line 368): replace `await attached?.open('build')` with a real press of the rail row
   (`userEvent.click` on the button whose accessible name begins `Open build`), and replace
   `attached?.select(PHASE)` with a real press of the stack row (`userEvent.click` on
   `[data-row='${PHASE}']`'s interactive element as rendered). Keep every assertion and the
   comment; the focus expectations may need to be read AFTER the click's own focus effects —
   the assertions state the contract, so if a real click changes what holds, STOP and report
   rather than weakening an assertion.
2. `brings the closed drawer back out to return focus to the row below lg` (around line 394):
   replace `await attached?.open('build')` with the human path below lg — the drawer is the
   landing state, so press the rail row inside it with `userEvent.click`. Keep every assertion.

Touch nothing else. Other `attached?.` state seeding in the file (fault/notice rendering
proofs, non-interaction state checks) is out of scope and stays.

## Scope

**Owned:** `tests/app/browser/ApplicationView.test.ts` only. Everything else off-limits.
Forbidden: the standing list; no new helpers; no assertion weakening.

## Acceptance criteria

1. Neither named test contains `attached?.open` or `attached?.select`; both drive state through
   `userEvent` presses on rendered rows.
2. `npm run test:app:browser -- tests/app/browser/ApplicationView.test.ts` green (all 27), run
   from `/workspace/supervisor`.

## Deviation contract

If a real click makes an existing assertion false, stop and report the failing output verbatim —
that is a shell behavior finding, not yours to fix. Report only.

## Output

The diff, the test command and its summary line, `git status --porcelain`, deviations or none.
