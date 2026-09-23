# B-FORMS-RENAME (D40a) — `checker` on Sonnet, mechanical conformance

Native subagent, clean context, read-only, on the tree of `/home/user/veneer-bfr` on 2026-09-23. The verdict text is the lane's handback verbatim.

Audit lane: `checker` (Sonnet, native, clean context). Subject: B-FORMS-RENAME (D40a) in `/home/user/veneer-bfr`, evidence `/home/user/scaffold/.orkestrel/veneer/units/bfr.diff`, `bfr-status.txt`, brief, and report. Ruling on claims 1, 4, and 5 (5's `npm run check` reading left to the objective lane).

## Claim verdicts

**Claim 1 — The delta is the brief.** CONFIRMED.
- `bfr.diff:1-108` shows exactly: the two mixin renames with comments in `src/styles/_mixins.scss` (`bfr.diff:9-29`), the six include-line renames across `_form-control.scss` (`bfr.diff:38,44`), `_form-select.scss` (`bfr.diff:57,65`), and `_input-group.scss` (`bfr.diff:78,83`), and the `INPUT_GROUP_CASES` remark's `reads` paragraph rewrite in `tests/setupStyles.ts` (`bfr.diff:91-105`). Nothing else appears in the diff.
- `bfr-status.txt:1-5` lists exactly `src/styles/_mixins.scss`, `src/styles/components/_form-control.scss`, `src/styles/components/_form-select.scss`, `src/styles/components/_input-group.scss`, and `tests/setupStyles.ts` — the owned set from the brief's § Scope (`b-forms-rename-brief.md:102-104`) — and nothing else.
- A search for `control-type` and `control-border` in `/home/user/veneer-bfr` (`Grep` over the whole tree) returns only `ROADMAP.md:280,387`, both historical/D40a-carrier prose outside the brief's four scoped directories (`src`, `tests`, `guides`, `app`), and the brief itself names the `ROADMAP.md` mentions as the Orchestrator's, not the unit's (`b-forms-rename-brief.md:20-21`). Restricting the search to `src`, `tests`, `guides`, and `app` returns nothing.

**Claim 4 — One voice.** CONFIRMED.
- `INPUT_GROUP_CASES` remark, `tests/setupStyles.ts:4210-4215`: "The `reads` map is keyed by property, across every rule the selector heads: a sized select heads its size rule and the rule that restores its indicator room, and the two write different properties. A property the map leaves out is the claim that its declaration writes no `var()`, so an empty map states that the rule reads no custom property and leaves its literals to the value assertions. A token moved from the property that consumes it onto another declaration of the same rule reads as a different row."
- `FORM_CONTROL_CASES` remark, `tests/setupStyles.ts:4857-4860`: "The `reads` map is keyed by property. A property the map leaves out is the claim that its declaration writes no `var()`, so an empty map states that the rule reads no custom property and leaves its literals to the value assertions. A token moved from the property that consumes it onto another declaration of the same rule reads as a different row."
- Both remarks share the two sentences verbatim, from "A property the map leaves out…" through "…reads as a different row." The input-group paragraph keeps its own leading clause about a sized select heading two rules (`tests/setupStyles.ts:4210-4212`), as claim 4 requires.

**Claim 5 — Law and scope** (reading parts only). CONFIRMED.
- The diff (`bfr.diff:1-108`) touches only comments, mixin/include identifiers, and a TSDoc paragraph. No `any`, no `as` (other than `as const`, which does not appear), no `!`, no `@ts-` suppression, no `eslint-disable`, and no nested function declaration appears anywhere in it.
- Off-limits check: the brief's off-limits set is "every other line of the owned files, every other file under `src/**`, `tests/**`, `app/**`, and `guides/**`, `package.json`, `package-lock.json`, and the vendored files" (`b-forms-rename-brief.md:108-109`). `bfr-status.txt:1-5` shows exactly the five owned files as modified and nothing else, so no off-limits file was touched.
- `npm run check`'s exit code is not evidenced in the materials supplied to this lane (no command output accompanies the brief or claims file for this reading); that reading is the objective lane's per the claims file (`bfr-audit-claims.md:59-60`) and is UNRESOLVED from this lane's evidence alone.

## Findings outside claims 1, 4, 5

None found (BROKEN standard: none to report).

VERDICT: PASS
