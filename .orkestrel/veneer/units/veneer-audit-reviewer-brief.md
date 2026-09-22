# Audit lane — `reviewer` on Opus 5, subjective lane

## Role and lane

`reviewer` on Opus 5, a native Claude subagent (read-only: `Read`, `Grep`, `Glob`; no shell, no
writes). You hold the **subjective** lane: design acceptance, API and vocabulary, architecture fit,
simplification, guide voice and product coherence, and the tenets' feel. Say which lane you held.
Perform the audit directly and spawn nothing.

Your engine (Opus 5, through the `opus` route) wrote the U3, U1-conform, CL2, CL3b, CL5, and CL10
to CL12 halves of this tree; Astra wrote U1, U4b, U7, CL1, CL3, CL4, and CL6 to CL9. Attack the
halves your engine wrote harder than the rest: a clean pass on your own engine's work is the least
valuable result you can return.

## Subject, evidence, and claims

`/home/user/scaffold/.orkestrel/veneer/veneer-audit-claims.md` is the one claims file both lanes read: the
subject, what the round decides, what is already established, the numbered claims, the unknowns,
and the threshold. `/home/user/scaffold/.orkestrel/veneer/units/veneer-audit-evidence.md` is the review evidence
with the executed probe readings beside it; you hold no shell, so those readings and the tree are
your executed evidence. Rule on every claim; claims 5, 6, 7, 11, 14, 15, 21, 23, 24, and 25 are
yours first, and rule the rest too. Report a possible objective defect you cannot adjudicate as a
specifically evidenced referral to the objective lane, never as a verdict of yours.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `browser.md`, `styles.md`,
`documentation.md`, `writing.md`, `quality.md` § Falsification);
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict shape);
`/home/user/scaffold/.orkestrel/veneer/tenets.txt`; `/home/user/veneer/guides/veneer.md`;
`/home/user/scaffold/.agents/skills/enterprise-bootstrap/SKILL.md` for Bootstrap craft;
`/home/user/scaffold/.orkestrel/veneer/research/calibration.md` and
`calibration-content.md` for Elements' measured values (claim 11).

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order
(`CONFIRMED` with the attack that failed, `BROKEN` with the input, state, or interleaving and the
smallest correct fix, `UNRESOLVED` with what would settle it, `NOT-EVIDENCED` with the capture
missing), findings outside the claims each substantiated to the `BROKEN` standard, the
attacked-and-held list, referrals, and one terminal line. Cite `file:line` for every verdict. No
process diary. Your final message is the verdict.
