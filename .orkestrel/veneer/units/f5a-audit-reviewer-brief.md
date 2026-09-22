# Audit lane — `reviewer` on Opus 5, subjective lane, F5a ACCOUNTING-SPLIT

## Role and lane

`reviewer` on native Opus 5, a fresh subagent with Read, Grep, and Glob. You hold the
**subjective** lane: design acceptance, API and vocabulary, architecture fit, simplification,
guide voice, and product coherence. Say which lane you held. Perform the audit directly and spawn
nothing.

Your own engine wrote this unit. A clean pass on your engine's work is the least valuable result
you can return; attack the shape choices the report itself flags (the module-scope readings
array, the `ELEMENT_TAGS` keying, the `scanPositional` signature and refusal branch) hardest.

## Subject, evidence, and claims

`/home/user/scaffold/.orkestrel/veneer/f5a-audit-claims.md` is the one claims file every lane reads.
`/home/user/scaffold/.orkestrel/veneer/units/f5a-audit-evidence.md` names the review evidence: the status
output, the diff `/home/user/scaffold/.orkestrel/veneer/units/f5a.diff`, the unit's report, and the gate log
when present. You hold no shell: read the diff and the files under `/home/user/veneer` directly,
and label any runtime statement as a structural reading or a referral. Rule on every claim;
claims 3, 4, 8, 9, 12, 16, and 17 are yours first, and rule the rest too.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`names.md`,
`typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `browser.md`, `styles.md`,
`documentation.md`, `writing.md`, `quality.md` § Falsification);
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` (the verdict shape);
`/home/user/veneer/guides/veneer.md`; `/home/user/scaffold/guides/test.md` § Surface.

## Output

The `orkestrel-falsify` verdict shape and nothing else: numbered verdicts in the claims' order
(`CONFIRMED` with the attack that failed, `BROKEN` with the input, state, or interleaving and the
smallest correct fix, `UNRESOLVED` with what would settle it, `NOT-EVIDENCED` with the evidence
missing), findings outside the claims each substantiated to the `BROKEN` standard, the
attacked-and-held list, a one-line answer to "would you ship this surface", and one terminal line.
Cite `file:line` for every verdict. No process diary. Your final message is the verdict.
