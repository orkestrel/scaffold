# U3-policy review — objective lane (reviewer, native Opus 5, 2026-09-20, 356 s)

Subjective lane not run: the brief fixed the shape and the change is mechanical; recorded here as
the round's own reason.

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `tests/setupPolicy.ts:1980-1989`: `isPolicyFile` guard, `\r\n` normalized, distinct first-link order; the pattern matches `](tokens.md)` and `](./tokens.md)` and not the nested, absolute, or parent forms. |
| 2 | CONFIRMED | `:2037-2041` adds the index test; `isPolicyMirror` body `:2024-2027` byte-identical to before. |
| 3 | CONFIRMED | new row `:3417-3434`; runner `tests/policy.test.ts:655-661` asserts one violation; pre-fix the stray adds a second and `toHaveLength(1)` reddens; the `rejects` row writes no index. |
| 4 | CONFIRMED | hunk inserts only; the literal index list equals the derived one (`scaffold`, `console`, `contract`, `emitter`, `markdown`, `process`, `template`, `guide`). |
| 5 | CONFIRMED | no forbidden syntax; three new exports with one-sentence descriptions; no banned term in the message or membership. |
| 6 | REFUTED | `tests/policy.test.ts:664-667` still names the catalog as the accounting evidence; `tests/setupPolicy.ts:1996-1997` still says the split is "by catalog membership". |

Extra findings:

7. `guides/scaffold.md:1153-1155` states the pre-change rule; the brief scoped `guides/**` out
   without naming a carrier (a dispatch defect under § Check the brief before you send it).
8. `host.json` digests stale until `npm run build` restages (the Orchestrator ran it); the edit
   moves the published `dist/host` surface, so a scaffold bump, publish, and target `repair` are
   obliged and carried.
9. `readPolicyIndex` scans raw text (a link inside a fence or code span accounts for a guide) and
   `[^/)]+` admits `\n`.
10. `POLICY_INDEX_LINK` is an exported global regex; a caller's `.test`/`.exec` leaves `lastIndex`
    non-zero and `matchAll` inherits it. Siblings are non-global.
11. With the catalog read empty, an index-linked guide enters the term sweep (a mirror would report
    banned terms). Decide and pin with a control row.
12. `tests/policy.test.ts:38-39` import order breaks the alphabetical list.

Verdict: fix round — forced by claim 6.
