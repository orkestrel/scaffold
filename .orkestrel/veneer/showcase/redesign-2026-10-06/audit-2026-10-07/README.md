# Showcase audit of 2026-10-07: the Tailwind + layer face at veneer `426d08d`

The user's order of 2026-10-07: go through the whole showcase under the Tailwind + layer face and confirm each section applies the intent (Bootstrap adopts Tailwind's scale and theme and keeps working). The audit ran as workflow `wf_c3f19d26-f26`: 13 reviewers over 9 section groups read captures of every section under the three faces at four variants, per-element digests, and open-state logs; 28 refuters, one per claimed defect; one verdict writer.

## Files

- `verdict.md`: the ruled verdict, with the per-section table, 19 upheld defects in five fix units (U1 to U5), 9 overturned claims, 12 caption items (C1 to C12), 6 rulings for the user (R1 to R6), and 13 readings (E1 to E13).
- `refutations.md`: the refuters' rulings and reasons by claim number.
- `review-results.json`: the 13 reviewers' section results, defect claims, undocumented departures, questions, and open-state notes.
- `groups.json`: the section groups each reviewer took.
- `digest-index/<theme>-<width>.json`: the structural-group index per variant (135 groups in 13 sections per variant).

## Evidence root

The captures, censuses, digests, and open-state captures the verdict cites under `AUDIT` live in the session scratchpad `/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/faces/audit` (225 MB) and are not copied here. The harness that produced them is `scratchpad/faces/{capture-faces,census,digest,open-states}.ts`; a rerun against a rebuilt page regenerates the set.
