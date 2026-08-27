# Round A2 — verdict and reconciliation

Lanes run: `reviewer` (Opus 5, subjective) — FAIL, 3 broken, 2 findings, 1 referral; the
objective lane on Cursor Grok (the user-directed substitution for Sol; journal
`tmp/cursor/a2-objective.log`) — FAIL, 2 broken; `checker` (Sonnet, mechanical) — FAIL, 1 broken
on its rows. Blind, one brief (`a2-brief.md`). The first Grok launch died on a malformed run
script (an apostrophe ended the single-quoted launcher argument); the relaunch through a quoted
heredoc round-tripped, and the failure was the launcher's, not the bench's. Every finding below
was reproduced by the Orchestrator before ruling.

## Rulings per claim

1-7 and the mechanism halves of 3-6: CONFIRMED by every lane that held them, with named attacks
and the probe records as executed evidence.

8 and 11 — **BROKEN (Grok), the round's sharpest finding.** A pre-split target's
`.claude/agents/orkestrel.md` is presence-owned: `repair` restores only absence and `catalog`
rewrites only the marker-bounded table, so the old body's "Read `.agents/orchestration.md`
first" survives every visit while the visit deletes that very path. Ruled fix, per the owner's
less-machinery standing instruction: no second marker region — the visit gains one
condition-first line: where the catalog agent still opens with a repository-relative `.agents/`
read instruction, delete the file in the visit commit; `repair` restores the floor body and
`catalog` refills the table. Carrier: F2 item E.

9 — SPLIT-CLAIM: Grok CONFIRMED the sentences it attacked; the reviewer BROKE a different one,
reproduced: "the one canon path a plan does claim is deferred" (`guides/scaffold.md`, the
canon-destination paragraph; `src/server/helpers.ts` `filesToHost` remarks;
`tests/setupServer.ts` fixture remarks) is false — the plan claims the pointer pair and the
catalog file, and the pointers are not deferred — and it carries a count. The fix states the
rule the filter implements: every canon destination is dropped and floor bytes are kept, claimed
or not. Carrier: F2 item B.

10 — SPLIT-CLAIM: the syntax, barrel, and TSDoc halves CONFIRMED everywhere. Broken pieces,
each reproduced: the count in the claim-9 sentences (same fix); the residue sentence "These
facts fix what a target holds at one of these paths." in the `CANON_PATHS` remarks (deleted);
the `now` and `easy` comments in `tests/src/bin/CLI.test.ts` (`:2461`, `:2548`). The
checker-versus-reviewer placement dispute over `#canon` is settled for the checker on the
reproduced facts: the method reaches no `#` field and no sibling, so the leaf test sends it to
`src/server/helpers.ts` as an exported, tested helper; the reviewer's contrary reading
evaporates. Carriers: F2 items A, B, C.

11 (reviewer's half) — **BROKEN, reproduced.** The canon the pointer names requires role files
on both sides while a swept target holds only the catalog agent; nothing shipped states what a
target loses or where harness definitions live for one; `README.md` advertises bench scripts a
target no longer wires. Ruled, without reopening the owner's scope: the roles law is scoped to
the canon repository in `.agents/orchestration.md` § Roles; the guide's Limits gains the
what-a-target-loses entry naming the harness user-scope seam and stating that fleet targets are
not orchestration hosts — a session starts on scaffold; the README sentence says what is true.
Carriers: F2 items D, F.

Findings outside the claims: A (reviewer) — the wave's `--dirty` sub-bullet leaves an untracked
`.claude/rules` copy standing with no mention of the policy red gate it causes; reproduced;
carrier F2 item E. B (reviewer) — the catalog agent's rewritten opening is false in scaffold's
own checkout (no installed scaffold here; the sibling branch depends on the directory name);
reproduced; carrier F2 item D. The reviewer's referral on `overwrite --offline` exit codes is
closed by the pinned pre-existing offline-catalog refusal; F2 adds the exit-code assertions to
the new cases so the proof carries it (item C).

## Dropped, on the record

Nothing. Every retained finding names its F2 carrier; the reviewer's `#canon`-placement
confirmation is superseded by the reproduced facts rather than dropped.

## Terminal

VERDICT: FAIL — the sweep mechanism held every attack across every lane; the round's breaks are
one migration gap (the presence-owned catalog body), placement, and prose. Round F2 carries the
fixes; the cross-engine verification follows it.
