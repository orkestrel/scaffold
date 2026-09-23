# J-TYPES audit round 3 — the Orchestrator's reconciled verdict (2026-09-23)

Subject: the J-TYPES unit's round 3 (the declaration-rollup fix) in the worktree `veneer-types` (`unit/types` from `1868007`), claims file `j-types-audit-claims-3.md`. Lanes that ran, blind, on that one file: the objective lane, `analyst` on GPT-6 Astra (thread `01a0cf5a-3473-7db2-ad52-35a36c45eff8`, 22 commands, 307 s; `j-types-audit-3-objective-verdict.md`, terminal line `FAIL 2`); the subjective lane, `reviewer` on Opus 5.5 (`j-types-audit-3-subjective-verdict.md`, terminal line `FAIL none; outside the claims: F1`); the checker on Sonnet (`j-types-audit-3-checker-verdict.md`, `PASS`). No lane the round named is not run.

## Per-claim rulings

1. **CONFIRMED.** Both lanes; the objective lane's AST inspection finds no identifier referencing the global. The subjective lane rules the name `SanitizerConfig` right for a mirror (an `{Entity}Options` form would collide with `SanitizeOptions` and drop the external name); its R3 (whether the type-name table binds a mirrored dictionary) is a rule-home question carried to the user with the earlier `typescript.md` bound.
2. **BROKEN.** The objective lane: `elements` typed `readonly string[]` cannot express R10's per-tag attribute allowlist, which the installed 6.0.3 dictionary admits as `{ name, attributes }` entries (`lib.dom.d.ts:2640-2658`); a per-element entry fails against the mirror with `TS2322` and compiles against the platform's declaration. The subjective lane's F1 is the same finding with the failing input `allow: { a: ['href'], b: [] }` over `<b href>` and `<a href>`, which Bootstrap keeps on `a` alone. The Orchestrator's probes settle the platform side: `j-types-3-probe-sanitizer-2.log.txt` (`perElement`: `{ name: 'a', attributes: ['href'] }` beside a global `attributes: ['class']` keeps `href` on `a` alone) and `j-types-3-probe-sanitizer-3.log.txt` (`perElement.plusGlobal` repeats it; `perElement.bHref` with no global list keeps `href` on `b` too, because the safe baseline's attributes apply where no `attributes` list is given; `elementsOnly.dataFalse` throws `Invalid Sanitizer configuration`, so `dataAttributes` is valid only beside `attributes`; `elementsOnly.data` keeps `data-*` when `attributes` is absent). Ruling: the mirror gains a per-element entry type and `elements` admits it; the `dataAttributes` TSDoc states both defaults and the validity constraint.
3. **CONFIRMED.** Both lanes; the objective lane reproduced the rollup's refusal on the reverted declaration with the installed API Extractor analyzer in memory.
4. **CONFIRMED.** All three lanes.
5. **CONFIRMED.** All three lanes.
6. **CONFIRMED.** Both lanes, every toolchain statement checked against the installed libraries.

## Findings outside the claims

- **F1 (subjective lane)** is claim 2's finding; one carrier.

## Referrals ruled

- **R1.** Ruled under claim 2.
- **R2.** Settled by probe 3: with `attributes` absent, `data-*` attributes are kept, and `dataAttributes` named without `attributes` is refused by the platform; the TSDoc states both.
- **R3.** Carried to the user with the `typescript.md` boolean-property bound (a rule-home question, `names.md`).

## Bounds

- **B1 (one home for the rationale):** carried into round 4; the rationale sits on `SetHTMLOptions.sanitizer`'s owner.
- **B2 (toolchain versions in public TSDoc):** declined; `writing.md` § Claims and time prefers a version to a time word, and the sentence names the versions it measured.
- **B3 (one name for the standard):** carried into round 4; "the HTML standard" throughout.

## Carrier

Claim 2 and the bounds B1 and B3 are carried by the successor brief `j-types-brief-4.md` (the same unit, the same worktree, `opus`), audited in round 4 by `analyst` on Astra, `reviewer` on Opus 5.5, and `checker` on Sonnet on `j-types-audit-claims-4.md`. No finding is dropped.

VERDICT: FAIL 2; outside the claims: none
