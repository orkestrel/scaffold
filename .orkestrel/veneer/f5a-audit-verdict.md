# Audit verdict — F5a ACCOUNTING-SPLIT in `@orkestrel/veneer` (working tree over `d93bb85`, 2026-09-22)

Claims: `f5a-audit-claims.md`. Evidence: `units/f5a-audit-evidence.md`, the diff
`units/f5a.diff.txt`, the status `units/f5a-status.txt`, the unit's report `units/f5a-report.md`,
and the Orchestrator's gate log `units/f5a-gates.log.txt` (run 1, green in every project). Lanes,
blind, on that one claims file: `checker` on Sonnet (`units/f5a-audit-checker-report.md`),
`reviewer` on Opus 5, subjective (`units/f5a-audit-reviewer-report.md`), and `analyst` on GPT-6
Astra, objective (`units/f5a-audit-analyst-report.md`, thread
`01a0c9dd-7840-71b0-96dc-acab29287e25`). Opus 5 wrote the unit, so the objective lane on Astra is
the auditor that did not write it. The Orchestrator settled claim 1's export accounting with
`units/f5a-claim1-control.log.txt` and claim 15(a)'s reachability with the host probe
`units/f5a-namespace-probe.mjs` and its log before ruling. The fixes landed as Orchestrator edits
under `units/f5a-brief-2.md` through `units/f5a-fix.py`, and the chain re-ran as
`units/f5a-gates-2.log.txt`.

## Rulings per claim

| Claim | Checker | Reviewer | Analyst | Ruling and carrier |
| --- | --- | --- | --- | --- |
| 1 every export moved once | UNRESOLVED (no shell) | CONFIRMED | CONFIRMED | Held; the control diff reads the base's exports less the nine deleted grammar symbols plus `ELEMENT_TAGS`, each exported once. |
| 2 host-independent modules | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 3 exact inventory cases | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 4 `ELEMENT_TAGS` staleness | referred | CONFIRMED (partial column) | CONFIRMED | Held for the partial column; the tag column is reviewer F4. |
| 5 `scanPositional` through the engine | referred | CONFIRMED | CONFIRMED | Held. |
| 6 shipped layer position-independent | referred | CONFIRMED | CONFIRMED | Held; the wall clock stays the unit's reading. |
| 7 deleted set exact, kept set the closure | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 8 visitor move conforms | referred | BROKEN | BROKEN | BROKEN: `SPECIFIER_READINGS` leaked mutable module state (freezing it broke the reader) and carried an unbindable pre-visit drain. Fixed: `SpecifierReader` holds `#readings` and a `#visitor` of arrow handlers; `read` returns a fresh list; `extractSpecifiers` reads on a reader of its own; the proof pins each reading as its own and the instance's keys as empty. The class shape meets the analyst's fix and the reviewer's objections (no module state, a pure leaf, one drain). |
| 9 input proof lost only the duplicate | referred | CONFIRMED | CONFIRMED | Held. |
| 10 sweep binds on both passes | referred | CONFIRMED | CONFIRMED | Held. |
| 11 signatures real | referred | NOT-EVIDENCED (`tailwind`) | UNRESOLVED (`tailwind`) | BROKEN on one member: no Tailwind distribution is installed to measure `tailwind` against. Fixed: removed; Tailwind's guard is the specifier pass over `tailwindcss` and `@tailwindcss/`. The rest are measured in the installed Bootstrap and Vue bundles. |
| 12 guide true, in parity | CONFIRMED | CONFIRMED (voice nits) | BROKEN (prose) | BROKEN in prose: "no other legal parent" contradicted the table (`li` under `ol` and `ul`). Fixed in the guide and the table's doc; the engine "answers the question" and the causal "so" is cut. |
| 13 gate chain green | CONFIRMED | CONFIRMED | CONFIRMED | Held (run 1); run 2 covers the fixes. |
| 14 scope honest | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 15 the unit's flagged claims | referred | BROKEN (a) | UNRESOLVED (a) | (a) BROKEN as documented: the refusal branch was recorded as undrivable and its justification over-claimed. The host probe shows a namespaced rule drives it from a real `CSSStyleRule`; fixed with the `audit\|p` case and a doc that claims what the guard does (a named refusal before any mount). (b) held: no reentrant interleaving is reachable, and the per-call reader removes the question. (c) is claim 11. |
| 16 prose holds | CONFIRMED (terms) / UNRESOLVED (counts) | BROKEN (report) | BROKEN (report, prose) | BROKEN in prose: "across the three" fixed; the conformance case title names no tally. The unit's report keeps its tallies as the verbatim record of what it returned; test counts and line sizes are measurements with their run. |
| 17 coherent | referred | BROKEN (name) | CONFIRMED | BROKEN on one name: `scanPositional` lacked its noun. Fixed: `scanPositionalPairs` at every site. |

## Findings outside the claims

- Reviewer F1 — the mandated exclusion had no proof. Substantiated; fixed with the `details summary`
  plant run with and without the table in `tests/setupBrowser.test.ts`.
- Reviewer F2 — same-tag rules were never compared. Substantiated; the `outer === inner` skip is
  removed, with an `li + li` plant, and the doc and guide say each tag is mounted inside and after
  each tag, itself included.
- Reviewer F3 and the analyst's referral — the signature pass was a raw substring test.
  Substantiated; `matchesSignature` matches a whole word, with its own case, and the doc names the
  members text markers.
- Reviewer F4 — the tag column of `ELEMENT_TAGS` binds to nothing. Substantiated; the doc says so,
  and binding it to the compiled cascade's tag population is carried by F5b ACCOUNTING-LEDGER.
- Reviewer referrals recorded without change: `tests/conformance.test.ts` assumes `dist/` was
  built, as the presence cases already do; the reader's mount cost stays an observation; the
  `ROADMAP.md` row on `matchesLooseTagPair` closes in the D11 fold.

## Attacked and held

The `mandated` parameter over an import; the `CSSStyleRule` parameter (the probe shows the branch
is drivable from a real rule); `MANDATED_TAG_PAIRS` in `setupCases.ts`; case ordering in
`index.test.ts`; `html` and `body` in `ELEMENT_TAGS`; the `@popperjs/core` plant pinning the
specifier pass; the escaped-combinator and package-boundary controls the analyst executed.

## Deviations

The lanes ran in sequence on the Codex bench's one-lane rule and in parallel on the native side;
each stayed blind. The checker's terminal line lists its referrals as FAIL and is read as referral.
The fixes landed as Orchestrator edits, audited by the two lanes that did not write them through
their recorded findings, and the gate chain re-ran in full before the landing.

VERDICT: FAIL 8, 11, 12, 15, 16, 17; outside the claims: F1, F2, F3, F4 — all carried and closed at the landing, F4's binding carried to F5b
