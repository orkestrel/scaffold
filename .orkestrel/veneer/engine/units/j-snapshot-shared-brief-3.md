# Unit J-SNAPSHOT-SHARED, round 3 — close the naming and construction classes by invariant

Successor of `j-snapshot-shared-brief-2.md`. The earlier sections stand except what follows.

**What changed and why.** The round-2 audit (`units/j-snapshot-shared-audit-2-objective-verdict.md`, `analyst` on Astra, thread `01a0d5f4-be9f-7cb2-a5e3-ac7b0ca8c02b`) confirmed these:
- the nine engines' construction cleanup;
- the `#linked` field;
- the vocabulary;
- the proofs;
- the scope.

It failed claims 1 to 3 on four inputs through the public surface. This is the second round on these seams, and each round has found another input. So this round closes each class by an invariant the code obeys everywhere. It adds the four inputs as its first cases rather than a longer list of edge cases. Round 2 is committed as `e3167f7`, and the worktree is clean at it.

## The invariants

- **N1: a record's key is fixed at save and follows the platform's own name matching.**
  - Compute a target's key once, when the snapshot saves it, and keep that key with the target. Every release (restore, clear, withdraw) uses the stored key and never recomputes it.
    - Fixes the lane's adoption witness: a host adopted from an HTML document into an XML one after the save changed the recomputed key. `clear()` then left the original record's holder behind.
  - Decide whether the element's document folds attribute names from the document type, not its `contentType`.
    - Example: read it from the platform, `Document.prototype.createElement.call(doc, 'A').localName === 'a'` holds exactly in an HTML document. Cache the reading per document in a `WeakMap`.
    - Fixes the lane's `text/plain` witness: an HTML document loaded as plain text folds attribute names, but the key did not.
  - Keep the property rule (a non-custom property folds; a custom property keeps its case).
  - Add a same-snapshot case: one snapshot saves `data-state` and then `DATA-STATE`, and the second save is the same target.
- **C1: no construction leaves a holder.**
  - State the rule in the guide's § Ownership and restoration and in each constructor's comment: every class in `src/browser` reads all its options, and every platform prerequisite its first claim or save needs, before that claim or save. Otherwise it releases what it claimed and saved before rethrowing.
  - Make the code obey it in the two places the lane found:
    - `Placement`: copy the `fallbacks` entries before its first save and promotion. A getter on an array index is still a read. The lane's witness is a fallback array whose index `0` getter throws, which leaves the element promoted and its holdings kept.
    - `ScrollLock`: read the body, and fail construction cleanly without a body, before it publishes its holder. The lane's witness is a document with its body removed: the lock's save throws and leaves the failed holder in `#locks`, so a later lock adds a holder and never locks.
  - Re-read every class that claims, saves, publishes a holder, or promotes: `Swipe`, `Isolation`, `Backdrop`, `Registry`, `Delegate`, `ColorMode`, `HostSnapshot` itself, and the nine engines round 2 changed. `Modal` and `Offcanvas` are J-SAMEWAY's, which carries them as its round 2's B5.
  - Report each class's reading against C1 in one table. For each one you change, add a case red first with a mutation row.

## Scope (adds to round 2's)

**Owned, added:** `src/browser/Placement.ts` (its construction) and `src/browser/ScrollLock.ts` (its construction), their test files for the cases, and any other construction path C1's search finds outside `Modal.ts`, `Offcanvas.ts`, and `Backdrop.ts`.

**Off-limits, still:** `Modal.ts`, `Offcanvas.ts`, `Backdrop.ts`, and their tests (J-SAMEWAY writes them in its round 2 beside you).

## Output

Your final message:
- the files touched;
- for N1 and C1, the cases with their red and green readings verbatim (red on `e3167f7`'s sources);
- the C1 search table (every class, what its construction claims, saves, publishes, or promotes, and whether any read or call follows that can throw);
- each `types.ts` change as a diff block;
- the mutation table (rounds 1 and 2 re-run plus a row per N1 and C1 mechanism) copied from the log;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it.
