# Unit F4 HOST-OBSERVATIONS — successor brief 2

Effective over `f4-brief.md` (retained beside this file; the unit opened it as `./tmp/units/f4-brief.md`), which stays in force for every section this file does not
change. Open and follow both; read the terrain `f4-terrain.md` (retained beside this file) first and whole, as the
original brief says.

## What changed and why

Run 1 stopped, correctly, on Obligation 5: the original brief required the guide to say that "a host
reinserted before that click is reacquired", and the tree says otherwise. `Delegate.#activate`
skips every owned engine whose host the root still contains, so a host reinserted before the next
root click keeps its existing engine and its state; only a host that is outside the root at that
click is destroyed, restored, and released, and a released host is acquired again, with a fresh
engine, on its next delegated click. The case "reacquires a pruned host after reinsertion" in
`tests/src/browser/Delegate.test.ts` reinserts the host after the pruning click, which is the
released path. Obligation 5 is replaced below with those facts. Every other obligation, the scope,
the criteria, and the output contract stand unchanged.

Run 1 also reported that reading several large files in one `cat` truncated its view of the brief
and the rules. Read each file in its own command, and read the brief and this successor in full
before the first edit.

## Obligation 5 — the delegated release sentence (replaces the original)

Add one paragraph to `guides/veneer.md` directly after the `ColorMode` paragraph that follows the
`## Surface` table, stating what `src/browser/Delegate.ts` does (read it; edit it not): the
delegate acquires a host on its first delegated click and reuses that engine on later clicks; a host
removed from the root, or moved outside it, keeps its toggled state until the next click that
reaches the root or the delegate's destruction, whichever comes first, and is restored and released
then; a host reinserted before that click keeps its engine and its state; a host reinserted after
its release is acquired again, with a fresh engine, on its next delegated click. State the
refusals nowhere in this paragraph (another unit records them). Run `npm run test:guides` and
`npm run test:policy` after the edit.

## Report

Write `f4-report-2.md` (retained beside this file; the unit wrote it as `./tmp/units/f4-report-2.md`) and return its full content as your final message, nothing
else, in the shape the original brief's § Output fixes.
