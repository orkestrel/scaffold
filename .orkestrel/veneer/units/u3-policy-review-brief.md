# U3-policy reviews 1 to 5 — objective lane briefs (reviewer, native Opus 5)

Retained after the fact on 2026-09-20: these are the dispatch texts as sent through the harness's
Agent tool, written to disk on the Orchestrator's own retention audit. Each round's report is
`u3-policy-review-report.md`, `-2.md`, `-3.md`, `-4.md`, `-5.md`. Rounds 1 to 5 ran the objective
lane alone (recorded in each report's header); round 6 runs both lanes on
`../u3-policy-audit-claims.md` with its briefs `u3-policy-audit-reviewer-brief.md` and
`u3-policy-audit-analyst.sh`.

## Round 1 (over `u3-policy-diff.patch`)

Role `reviewer` on native Opus 5 (clean context). You hold the OBJECTIVE lane (correctness,
constraints, what the code permits) of an audit of a small scaffold unit that native Sonnet
(`builder`) wrote. Perform the assignment directly and spawn nothing. You edit nothing; you have no
write tools.

Subject: the diff `u3-policy-diff.patch.txt` over `tests/setupPolicy.ts` and
`tests/policy.test.ts` in the scaffold checkout (read the live files too), made from the brief
`u3-policy-brief.md`. Law: `AGENTS.md`, `.claude/rules/typescript.md`, `names.md`,
`tests.md`, `writing.md`.

Rule on each claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and the deciding evidence:
1. `readPolicyIndex` returns each distinct sibling `<name>.md` link target of `guides/README.md`
   in first-link order, normalizes `\r\n`, and returns an empty list when the file is absent; the
   regex `POLICY_INDEX_LINK` matches `](tokens.md)` and `](./tokens.md)` and does not match
   `](nested/tokens.md)`, `](https://x/y.md)`, or `](../README.md)`.
2. `isPolicyStray` reports a top-level guide only when it is neither the package's own, the index,
   a name the index links, nor a catalog row; `isPolicyMirror` is unchanged and a guide the
   catalog registers stays a mirror whether or not the index links it.
3. The new `PolicyControl` row proves the linked guide reports no stray violation while the front
   page's `via` term still reports (line 3), and the pre-existing `rejects` row still proves an
   unlinked, uncataloged guide is a stray.
4. The renamed test case keeps every prior assertion, and the literal list asserted for
   `readPolicyIndex(root)` equals the sibling links scaffold's own `guides/README.md` carries.
5. No `any`, type assertion, non-null assertion, `@ts-*`, `eslint-disable`, nested function
   declaration, or module-scope helper left unexported; every new export has a TSDoc block whose
   description paragraph is one sentence in the file's voice; the violation message and the
   membership string read in the rules' voice.
6. Every stale sentence the change touches was updated: search both files for "the only
   evidence", "nor a catalog row", "or a catalog row", and "catalog row" and report any sentence
   that still describes the catalog as the sole evidence.

Add extra findings no claim names, numbered from 7, each with a site and a one-line failure
scenario. Output: a table `Claim | Verdict | Evidence`; a numbered list of extra findings (or "none
found"); then exactly one terminal line: `Verdict: accept` or `Verdict: fix round` with the claim
numbers that force it. No process diary.

## Round 2 (over `u3-policy-diff-2.patch`, closing round 1's findings 6 to 12)

Same role, law, and output shape. Rule on: (1) claim 6 of round 1 closed — no sentence in either
test file describes the catalog as the sole accounting evidence; (2) finding 7 closed — the
`guides/scaffold.md` sentence names the index-linked guide and nothing else in that file changed;
(3) finding 9 closed — `readPolicyIndex` strips code through `stripPolicyCode` before matching and
the capture class excludes `\n`; (4) finding 10 closed — `POLICY_INDEX_LINK` carries no `g` flag,
the global matcher is built locally, the `.match()` assertion still returns the capture; (5)
finding 11 pinned — the new control row's files, expected violation, line, and message are what
the brief names and follow from the code; (6) finding 12 closed — the import list is alphabetical;
(7) the round-1 confirmed claims still hold on the cumulative diff. Extra findings numbered from 8.

## Round 3 (over `u3-policy-diff-3.patch`, closing round 2's findings 8 to 13)

Same role, law, and output shape. Rule on: (1) round-2 claim 1 closed — no sentence still
describes the catalog as the sole accounting evidence; (2) findings 8 and 13 closed — no count,
the noun after "neither"; (3) findings 9 and 12 closed — `isPolicyMirror` remarks catalog-only,
`isPolicyStray` remarks name both mechanisms, `readPolicyIndex` remarks name the stripping and
the two inherited limits; (4) finding 10 recorded — the ruling sentence in `isPolicyStray`'s
remarks and the guide paragraph, nothing else in the guide changed; (5) finding 11 closed — the
control row `ignores an index link written inside a fence` has the files, message, and shape the
brief names and removing `stripPolicyCode` would make it fail; (6) every earlier confirmed claim
still holds. Extra findings from 7; a wording preference that changes no behaviour and breaks no
rule is not a finding.

## Round 4 (over `u3-policy-diff-4.patch`, closing round 3's findings 7 to 9)

Same role, law, and output shape, with this added instruction: this unit changes files that
`host.json` vendors byte-identical into every fleet target and that `scaffold repair` restores
there; judge every assertion by whether it holds in an arbitrary target, not only in this
checkout. Rule on: (1) finding 7 closed — no assertion depends on a guide, package name, or census
particular to this checkout; walk every assertion in the touched cases and name the ones reading
the live root, stating for each why it holds in a target whose index links different names; the
crafted-root case writes and reads its own root and leaks nothing; (2) finding 8 closed —
`POLICY_INDEX_LINK` admits the bare, `./`, titled, and angle-bracketed forms, captures `tokens` in
each, and state what it does with the nested, absolute, and parent forms and any form the
widening newly admits that it should not; (3) finding 9 closed — each control row's membership
names exactly the region its fixture writes, and the new code-span row's expected reading follows
from the code; (4) every earlier confirmed claim still holds; (5) the widened regex cannot
backtrack catastrophically and carries no `g` flag. Extra findings from 6.

## Round 5 (over `u3-policy-diff-5.patch`, closing round 4's claim 1 and findings 6 to 8)

Same role, law, output shape, and the portability instruction. Readings supplied: with the two
files copied in, Roughnotes' policy project reads `115 passed | 1 skipped`; Roughnotes restored
clean; this checkout `test:policy` `116 passed`, `test:config` `173 passed | 1 skipped` after the
rebuild. Rule on: (1) round-4 claim 1 closed — walk every assertion in the accounting case and the
touched cases and confirm none depends on a guide, package name, or census particular to any
checkout; (2) `POLICY_INDEX_LINK` admits the bare, `./`, three title forms, angle-bracketed, and
`#fragment` forms, capturing the bare name, and rejects the nested, absolute, parent, and two
unbalanced-angle forms; read the pattern yourself; non-global; no catastrophic backtracking; (3)
the duplicate named capture group is valid on the Node version this repository targets (read
`package.json` engines and the toolchain), `readPolicyIndex` reads the capture through a form that
works for either branch, and an existing case would still catch the positional-read defect; (4)
`POLICY_INDEX_FILE` derives from `POLICY_GUIDE_MAP` and the remarks name the span-pairing limit;
(5) every earlier confirmed claim still holds on the cumulative diff, each row still
discriminates (say for each what change would redden it), no forbidden syntax, one-sentence
descriptions, no banned term, no count phrase in new prose. Extra findings from 6; distinguish a
finding that forces another round from one worth recording as a bound.
