# Audit verdict — UTIL-DISPLAY (`ud`), round 2 (the fix round)

Subject: `ud-2.diff`, `ud-2-status.txt`, `ud-shared-2.patch`, and `b-utilities-ud-report-2.md` over `e4e6a40` in `/home/user/veneer-ud`, against `ud-audit-2-claims.md`.

## Lanes

- `analyst` on GPT-6 Astra (objective): `ud-audit-2-objective-verdict.md`, journal `tmp/codex/ud-audit-2-analyst.jsonl`, thread `01a0cf60-1a73-7280-945a-c8189274231a`, `VERDICT: FAIL 1, 3, 6, 8; outside the claims: R-counts`.
- `reviewer` on Opus 5.5 (subjective): `ud-audit-2-subjective-verdict.md`, `VERDICT: FAIL 3, 6, 8; outside the claims: none`.
- `checker` on Sonnet (claims 1, 4, 7, 8): `ud-audit-2-checker-verdict.md`, `VERDICT: PASS`.

## Reconciliation

Claims 2, 4, 5, and 7 are CONFIRMED by every lane that ruled them: the added mutations and the control are logged in one copy with equal restoration digests, the matrix leaves no case unreddened, the conformance, cascade, and Tailwind evidence is retained with its digests, the guide carries the ruled sentence and nouns, and the `CaptureStem` hunk equals round 1 (the analyst's bounded compiler check rejects the comma branch's removal). The round-1 rulings carried into round 2 are closed.

Claim 1 is BROKEN in the claims file, not in the delta (the analyst and the reviewer): the removal clause misdescribes the patch — round 2 replaces the guide's planted-rule sentence in place and no longer removes the base lines round 1 removed, and the retired round-1 sentence and the `FLEX_COPY` clause were additions, so they vanish from the added text rather than as removed lines. Recorded against the claims file; no carrier.

Claim 3 is BROKEN (both lanes): the Flex render case's label assertion reads `querySelector`, the first element carrying each demonstrated class, so the trailing `flex-fill` and `flex-grow-0` items are never read; relabelling the trailing item stays green. The fix collects every matching element, requires a non-empty population, checks each element's label, and logs a trailing-label mutation red beside a green control.

Claim 6 is BROKEN (both lanes, on different points): the binding case derives the flex prefix population from `FLEX_ENTRY_CASES` itself, so dropping a whole prefix (`order`) or every entry still passes (the analyst's in-memory reproduction); the fix establishes the required prefix membership independently (from the inventory's `flex-*`, `justify-content-*`, `align-*`, and `order-*` names, or a literal prefix list bound to the inventory) and logs an omitted-prefix control red. The `FlexRestingValue` interface's members carry no TSDoc and its summary reads "Describes" where the file's data interfaces read "Carries" (the reviewer; `.claude/rules/typescript.md` and the `InputGroupCase` precedent). The local `RESTING_DISPLAY` scalar is permitted (both lanes).

Claim 8 is BROKEN (both lanes): "three items" in the `FLEX_SPECIMENS` remark tallies a growable set; the report's universal label statement exceeds the assertion's coverage; "both commands" in the report tallies unnamed members (the analyst's R-counts). The round-3 report must not repeat them; the round-2 report is retained as returned.

The reviewer's referral on the `families` matrix in `FlexSection.test.ts` is ruled: it is a case matrix (name, context, properties per family), so it moves to `tests/setupStyles.ts` as `FLEX_FAMILY_CASES` with named fields, frozen and documented, bound in the freeze case, under the same rule the round-1 ruling applied. The `vertical alignment utilities` describe title becomes `vertical-alignment utilities`, the one spelling. The reviewer's optional wording on the wrap items' `flex-shrink-1` (a supporting class, not a demonstrated one) is carried as one sentence in the remark. The `RESTING_DISPLAY` binding against `DISPLAY_VALUES` and the externalized-module list in § Observations are not carried (a scalar read by one proof; an observation).

The retained report's launch paths were rewritten to the retained paths in this commit (the reviewer's referral).

## Carriers

Every finding is carried by `ud-brief-3.md` (a fully specified round on `builder`, verified by `checker`; the auditor engine did not write the work): the label loop and its mutation, the binding case's independent prefix membership and its control, the interface's TSDoc, the `families` matrix, the count and the wording, the describe title, and the report's shape.

VERDICT: FAIL 1, 3, 6, 8; outside the claims: R-counts — carried by the round-3 brief; claim 1 recorded against the claims file
