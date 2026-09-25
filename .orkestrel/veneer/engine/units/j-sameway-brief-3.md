# Unit J-SAMEWAY, round 3 (J-INTEGRATION round 6) — the returning step returns each write the call made, enumerated

Successor of `j-sameway-brief-2.md`, whose sections stand except what follows.

What the round-2 audit found (`units/j-sameway-audit-2-objective-verdict.md`, `analyst` on Astra, thread `01a0d608-b80b-7d51-8a9c-4724cc866526`; the checker confirmed the wording, the renames, and the scope):
- It confirmed every behaviour claim: the backdrop accounting, the owner-first read, the constructors' release, and the unreachable forward read.
- It failed the proof claim on an instrument defect.
- It found one behaviour defect outside the claims.

That defect is the third missed return on the returning step's accounting, after the refused backdrop show in round 1 and the refused hide in round 2. So this round closes the class by enumeration rather than another single case. Round 2 is committed as `dc838aa`; the worktree is clean at it.

## The obligations

- **D1: every write has its own return entry.** In both engines and both directions, list every write the call makes to the host, the body, the backdrop's token, and the backdrop's connection. Record each one as its own entry in what the returning step receives, and have the step return exactly the recorded entries.
  - **The lane's witness.** On a non-fading Modal shown with `focus: false`, remove the backdrop's `show` token. Append to the backdrop a custom element whose `disconnectedCallback` adds `show` to the host, then call `hide()`. The hide records no backdrop, because the token is absent, yet it removes the element. The reaction reverses the host, and the returning step restores the host's display and ARIA but leaves the live backdrop disconnected. Offcanvas has the same omission.
  - **The rule for the witness.** The backdrop's connection and its token are two writes. A stopped hide reconnects a backdrop it removed and adds no token it never removed. A stopped show disconnects a backdrop it inserted and removes only a token it added.
  - **The table.** In the report, give every write each call makes, the entry it records, the return it gets, and its case. A write that is an acquisition under E13 (the lock, the isolation, the body's `open` token) is marked with that rule instead of a return. The host's own insertion into the body is either a return or an acquisition, stated with the reason.
  - **The cases.** The lane's witness is a case per engine, red first on `dc838aa`'s sources. Give every other write a case or a named existing case that reads its return.
- **D2: the instrument binds.** The `A1-*` and `A2-*` rows replace the `expected` declaration with `const agreed = …`, which leaves `expected` unbound. Their failures therefore came from a `ReferenceError`, not the mechanism. Correct each replacement to declare `expected`. Make the instrument read a failing case's error, and refuse a kill whose cause is a `ReferenceError`, a `TypeError` naming an unbound identifier, or a syntax error, so a broken plant cannot pass as a kill. Rerun every row, and add a row per D1 entry kind.

## Scope

As round 2, with round 2's owned files. `types.ts` changes only if the returning step's contract sentence must name the new entries.

## Output

Your final message must contain:
- the files touched;
- D1's table;
- the cases, with their red and green readings verbatim;
- the corrected instrument's refusal rule, and a demonstration that a planted unbound identifier is refused;
- the mutation table copied from the log;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it.
