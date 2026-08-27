# Round A1 — verdict and reconciliation

Lanes run: `reviewer` (Opus 5, subjective) — FAIL, 5 broken, 1 unresolved; objective lane on
Cursor Grok (`cursor-grok-4.6-high`, the user-directed substitution for Sol; journal
`tmp/cursor/a1-objective.log`, retained as `a1-objective-grok-report.md`) — FAIL, 1 broken, 1
finding outside the claims; `checker` (Sonnet, mechanical rows) — PASS with referrals. Blind, one
brief (`a1-brief.md`). Every finding below was reproduced by the Orchestrator against the source
before ruling.

## Rulings per claim

1. CONFIRMED by every lane.
2. **BROKEN, both lanes, reproduced.** The pointer pair is planned at `AGENTS.md` and `CLAUDE.md`,
   which are `CANON_PATHS` members. The claim itself misstated the design invariant, and the same
   false universal ships in `src/core/constants.ts` (CANON_PATHS remarks), `guides/scaffold.md`
   (the no-group-carries-the-canon paragraph, the staged-for-reading paragraph, the one-reading
   sentence), and `tests/setupServer.ts` (STAGED_PATHS remarks). The true invariant: no host-origin
   artifact claims a canon path; the docs compiler plans the pointer pair at those destinations as
   scaffold-owned template content, the one deliberate overlap. Fix: F1 items A.
3. CONFIRMED (reviewer, Grok, with named attacks).
4. CONFIRMED with a bounded gap (reviewer): the pointer body resolves three of the four read
   subjects and leaves `.agents/skills` to the stated derivation rule. Fix: F1 item F.
5. CONFIRMED (Grok, with the fetch-list and fill attacks; checker's behavioral referral closed by
   the same evidence and the probe record).
6. SPLIT-CLAIM: the mechanism (subtraction, non-blocking, exit codes) CONFIRMED by Grok and the
   probe; the prose universal "No verb writes or deletes a canon path" (`guides/scaffold.md`, the
   canon-question paragraph) BROKEN as claim 2's family. Fix: F1 item A.
7. SPLIT-CLAIM on the instrument. The post-migration case, the twin control, the rule-map
   controls, and the inventory bind are CONFIRMED. The replaced skill-family relationship
   assertion is a tautology (reviewer's R1, reproduced): the case joins `process.cwd()` with the
   same `SKILL_FAMILY_ROOT` constant `readSkillFamily` reads, so a drifted constant moves both
   sides together and the mutation the reviewer names stays green. Grok's desync defense covers
   filter drift only. Fix: F1 item H — the case's own read takes the literal canonical root, so a
   drifted constant desyncs and reddens where the tree exists while absence still passes.
8. CONFIRMED (both lanes; probe).
9. SPLIT-CLAIM: the claim-2 prose family BROKEN; everything else (fallback spellings, advisory
   claims, README's vendored description) CONFIRMED by Grok. The README and guide coinage "tool
   surface" is a one-term violation (reviewer, reproduced): it names the vendored remainder as if
   it carried no instructions while `.claude/agents`, `.codex/config.toml`, and `.cursor/rules`
   are instruction-shaped wiring. Fix: F1 item D.
10. SPLIT-CLAIM: syntax, placement, naming, barrels, TSDoc CONFIRMED by every lane. Writing-law
    hits BROKEN (reviewer, reproduced): the `@returns` count in `blueprintToDocumentArtifacts`,
    `now` in the advisory message and its comment. The checker's referred "two sets"/"two lists"
    borderline is ruled: rewrite to name the members. Fix: F1 item B.
11. CONFIRMED by every lane.
12. SPLIT-CLAIM: the design coherence CONFIRMED by Grok; the shipped-prose coherence BROKEN
    (reviewer, all three items reproduced): the one-term violation (item D), the inverted
    `inferGroup` comment (`src/core/helpers.ts`, the docs-row rationale), and the wave step-3
    consequence, which omits that a swept-less target fails the vendored rule-map policy at the
    gates. Fixes: F1 items C, D, E.

Finding outside the claims (Grok, reproduced): the `filesToHost` `@example` shows a live
`AGENTS.md` fill producing a host, which the split made false. Fix: F1 item G.

## Rulings on proposals not adopted

- The reviewer's `POINTER_PATHS` constant (and R2): refused. `#canonQuestion` deriving the
  subtraction from `blueprintToDocumentArtifacts` is derived state — a future document artifact at
  a canon path follows automatically, and a constant is a second copy that can drift from what the
  compiler emits. The blueprint parameter is the price of deriving. The prose fixes state the
  overlap; the mechanism stands.
- No finding was dropped: every retained finding names its F1 carrier above.

## Terminal

VERDICT: FAIL — the mechanism held every attack; the prose describing it did not. Round F1 carries
the fixes; its auditor is the engine that did not write them.
