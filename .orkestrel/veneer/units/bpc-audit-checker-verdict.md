# B-PASSIVE-CLOSE-A — `checker` on Sonnet

Subject: the five claims of `bpc-audit-claims.md`, read on the tree of `/home/user/veneer-bpc` on 2026-09-23. Read-only; the verdict text is the lane's handback verbatim.

# Audit verdict — B-PASSIVE-CLOSE-A, checker lane

## Claim 1 — the three loops carry every value the blocks carried — CONFIRMED

`/home/user/scaffold/.orkestrel/veneer/units/bpc.diff:9-45` (`_button.scss`): removed `.btn-sm`/`.btn-group-sm` (padding-x `--vn-space-4`, padding-y `--vn-space-2`, font-size `--vn-size-1`, radius `--vn-radius-small`) and `.btn-lg`/`.btn-group-lg` (space-8, space-4, size-3, radius-large) reappear in the same order inside the `$sizes` tuples (`sm` first, `lg` second) and the `@each` body writes padding-x, padding-y, font-size, radius in that order.

`bpc.diff:55-88` (`_pagination.scss`): removed blocks in order `lg` then `sm`; `$sizes` tuple order is `lg` (space-12, space-6, size-5, border-radius-lg) then `sm` (space-4, space-2, size-2, border-radius-sm), matching.

`bpc.diff:94-120` (`_placeholder.scss`): removed `.placeholder-xs/sm/lg` (0.6em, 0.8em, 1.2em); `$sizes` tuple is `(('xs',0.6em),('sm',0.8em),('lg',1.2em))`, matching order and values. Each file's diff carries exactly two hunks (the `$sizes` declaration and the loop swap); no other rule changed.

## Claim 2 — the mode axis — CONFIRMED

`bpc.diff:239-266` (`tests/setupStyles.ts`): `BUTTON_FILLED_CASES` TSDoc now reads "Holds the role and mode readings…"; `BUTTON_MODES` TSDoc reads "Holds the modes for the outline-button interaction cases."; the derivation reads `.filter(([, candidate]) => candidate === mode).map(([role, , fill, , active, focus]) => Object.freeze([role, mode, fill, active, focus] as const))`, matching the claim's quoted text verbatim.

`bpc.diff:271-289` (`tests/src/styles/components/button.test.ts`): both `BUTTON_CONTRAST_*` lookups rename `theme` to `candidate`.

## Claim 3 — the guide-path defaults — CONFIRMED

`/home/user/veneer-bpc/tests/setupServer.ts:967,1024,1069,1144` each default to `resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH)`; `setupServer.ts:1210-1211` defines `readVeneerGuide` returning `readFileSync(resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH), 'utf8')`. `bpc.diff:184` adds `readVeneerGuide` to the `./setupServer.js` import in `setupStyles.test.ts`; a grep for `readFileSync(VENEER_GUIDE_PATH` in `setupStyles.test.ts` returns no matches. `setupStyles.test.ts:309` still carries the `'VENEER_GUIDE_PATH'` inventory string.

## Claim 4 — the comment — CONFIRMED

`bpc.diff:131-132`: `tests/setupServer.test.ts` line 603 now reads "the following row names…"; a grep of the diff and the file for `below` cross-references returns no other hit.

## Claim 5 — scope is honest — BROKEN

`/home/user/scaffold/.orkestrel/veneer/units/bpc-status.txt:1-9` lists nine total lines: `package-lock.json` plus eight changed files (`_button.scss`, `_pagination.scss`, `_placeholder.scss`, `setupServer.test.ts`, `setupServer.ts`, `setupStyles.test.ts`, `setupStyles.ts`, `button.test.ts`). The claim asserts "the nine owned files and `package-lock.json`," which requires ten total entries; the artifact has nine. The count in the claim does not match the evidence it cites, so the claim as stated is false, even though the substantive content it points to (`bpc.diff` carries no `any`, no `as` other than `as const`, no `!`, no suppression, and no nested function beyond an anonymous callback passed directly as an argument — confirmed by reading the full diff) holds, and no file outside the eight changed files plus the lockfile appears in either the diff or the status output.

## Findings outside the claims

None to the BROKEN standard.

VERDICT: FAIL 5; outside the claims: none
