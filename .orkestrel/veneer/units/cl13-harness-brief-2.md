# Unit CL13-harness brief 2 — make the two sides comparable

Effective over `cl13-harness-brief.md`, which stays in place unedited. Follow that brief for every
section this one does not change.

## Role and engine

`builder` on the native cheap tier, the sole writer in the Veneer checkout. Perform the assignment
directly and spawn nothing. Write nothing into the tracked tree.

## What round 1 got right, and what it could not have known

Round 1 is accepted in every respect the first brief named. The markup mirrors Veneer's byte for byte,
the theme mechanism was read from Bootstrap's own distribution rather than assumed, the blank-frame
control is proven red and green inside the run, all sixteen frames pass it, the lifecycle rules hold,
and nothing tracked changed.

**One thing makes the portfolio unusable, and the first brief is why.** It fixed the markup and the
stylesheet and never fixed the **capture scope**.

- Your side: every frame is the whole viewport — 1280×720 or 390×720.
- Veneer's side: element frames of one lifted specimen — 1140×21, 1280×21, 390×42, 73×19.

A verdict lane asked to compare those is holding a page against a fragment. That is a harness gap the
brief created, not a defect you introduced.

## Objective

Add a matched element frame per variant, so each Bootstrap frame has a Veneer counterpart at the same
scope, and keep the page frame beside it as context.

## Obligation 1 — capture the element Veneer captures

Veneer's journey photographs the element its capture registry names by selector, not the page. The
registry's four keys and their selectors are in `tests/setup.ts`, in the cascade key table. Read it.

For each specimen, capture **the element matching that key's selector** in addition to the page frame
you already take.

**Take the element frame of the element itself, not of a wrapper.** Veneer's lift copies the matched
element and shoots the copy; match that scope.

## Obligation 2 — keep the page frame

Do not replace the page frames. They are the only artifact showing each specimen in its own context,
and a lane may want both. Name the two kinds so a verdict can cite either unambiguously, and say in
your report what naming you chose.

## Obligation 3 — the same guard covers the new frames

Every element frame passes the same blank check, inline, as the page frames already do. Report the
variation reading for each.

**One is likely to come back small, and that is a finding rather than a fault.** Veneer's own link
frame is 73×19 because that key's selector matches a single anchor while the specimen's markup carries
nine. If your element frame for that key is similarly narrow, report its dimensions and say so
plainly. Do not widen the selector to make a better picture.

## Unknowns

- **Whether every key's selector matches exactly one element in your page.** Report the count per key.
  A selector matching several changes what "the element" means, and the answer belongs in the record
  rather than in a silent choice of the first match.
- **Whether an element frame at the specimen's own position comes back blank.** Veneer hit exactly
  this and solved it by lifting a copy to the document's start; the reason is recorded in its cascade
  key table's doc block. If you hit it, say so and say what you did.

## Scope

**Owned:** `tmp/cl13/` and nothing else. **Off-limits:** every tracked file, and `tmp/capture/**`,
which holds Veneer's side.

## Output

1. The naming for the two frame kinds, and the full list of what the run now produces.
2. The element frame dimensions per specimen, per theme, per width.
3. Each Unknown, with what you found.
4. The blank-check reading for every new frame.
5. `git status --porcelain --untracked-files=all`, actual output.
6. Anything you could not close.

No process diary.

## Acceptance criteria

1. The script still runs to completion in one invocation with no orphaned process or port.
2. Sixteen element frames exist beside the sixteen page frames, and each pair is named so either can
   be cited unambiguously.
3. Every frame, both kinds, passes the blank check.
4. `git status --porcelain --untracked-files=all` shows no tracked file changed.
