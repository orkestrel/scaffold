# U6 fix round 1 — successor to u6-brief.md, carrying audit round 1 (all three lanes)

Reviewer: 5/6 confirmed, claim 6 broken (vocabulary). Checker: PASS. Sol objective lane: claim 3
broken (a reachable interleaving), claim 4 broken (copy fragment). Orchestrator rulings already
taken: the transport-failure→control focus branch is KEPT and now recorded in REDESIGN.md (the
objective lane's complaint was authority, cured by recording; the subjective lane proved the
branch forced and principled); the busy-assertion complaint is DROPPED (it guards real behavior
and was honestly outside the failing-first seven). Same owned files.

## The defect (reviewer-substantiated)

The diff deleted the help text that gave "the name" its antecedent and chose "username" as the
user-facing word in the alert — so the card now says "Username" (label), "Type the name to login
with." (prompt), and "Check the username and password" (alert): three words for one field. The
copy sweep only runs at first load, where no prompt renders, so no test caught it.

## Items

1. `LoginPanel.vue`: "Type the name to login with." → "Type the username to login with.";
   "Type the password for that name." → "Type the password for that username." Nothing else —
   the three claim-4 strings, labels, heading, button, and assurance sentence stay byte-identical.
2. Extend the test's copy sweep to the empty-submit state so the card's full vocabulary is pinned
   in the state that renders it.
3. Recapture: the empty-submit state at BOTH viewports and BOTH themes (the round found only
   desktop-light existed), plus one in-button busy-state capture (portfolio gap the reviewer
   named). Same harness conventions (real server, concrete waits, scratchpad output, kill by pid).

4. **Close the mid-flight-edit interleaving (Sol-found, reachable).** Submit valid values, empty
   either input while the request is pending, receive `AUTH`: stale `attempted` wins over the
   refusal — the emptied field renders `aria-invalid` and focus lands on the wrong element. Fix:
   a submission that passes local validation clears the local-attempt state, so the arriving
   answer renders purely by its own kind (empty-marking returns only on the NEXT local submit).
   Promote the interleaving as a permanent test (probe preservation: name it for what it proves).
5. **Active rate-limit copy.** "Too many login attempts." is a verbless fragment against the
   writing rules. Recast the first sentence as an active clause — your wording, constraints:
   no invented duration, keeps "Wait a moment, then try again.", must not read as a credential
   refusal (the limiter never read the credentials). Update the test string byte-for-byte.
6. **The human login journey (owner instruction).** Add one integration-file journey driving the
   composed app in real Chromium the way a human does: `fill`/`page.keyboard` types a wrong
   password, Enter submits, the alert appears with focus in the password and contents selected,
   then TYPING replaces the selection (the behavior the focus ruling exists for — no manual
   clearing), Enter again with the right password, and the authenticated shell renders. Harness
   conventions bind: module-file imports, concrete waits, no networkidle. Name it for what it
   proves.

## Gates

Scoped converge + static gates; the component test file by path. Output: the two-string diff, the
sweep diff, the capture list, `git status --porcelain`.
