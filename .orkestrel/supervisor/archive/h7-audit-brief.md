# H7 audit — the name filter

One brief, two blind lanes: `analyst` (engine **GPT-5.6 Sol**, journaled bench CLI,
read-only) and `reviewer` (engine **Opus 5**, native, read-only). Per-claim verdicts per
`orkestrel-falsify`, one terminal line. Writers: Sol (H7a-c, b769627) and Opus (H7d,
7f84886) — each lane therefore attacks the other engine's half with particular rigor.

## Subject

Range `fcd9949..7f84886` in `/workspace/supervisor`, branch
`claude/orkestrel-test-package-0m1m8u`: 22 files, two commits. The Orchestrator's reconciled
design ruling binds (`tmp/redesign/h7-brief.md` headnote and `h7d-brief.md`): server-side
name matching in the join's existing snapshot slot; two fields, AND; case-insensitive
substring; one store page per press; `src/core` untouched; the §4 honesty law.

## Orchestrator-supplied evidence

- Diff: `/home/user/scaffold/tmp/redesign/h7-evidence.diff` (1363 lines).
- Acceptance logs `tmp/redesign/h7-acceptance.log` and `h7d-acceptance.log`: all seven
  projects green natively (216/216 server, 417/417 browser, 12/12 integration, 251/251 src,
  106/106 core, 17/17 policy; guides at the recorded 8-failure ledger).
- Capture portfolio (reviewer's primary input for rendered claims):
  `/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/h6-filter-*.png`
  — fields, name match light/dark, AND, empty-with-cursor, empty-exhausted, mobile.
- H7d's failing-first record: 11 component proofs + the integration proof red at the stashed
  baseline (in its report).

## Claims

1. **The contract is exact and bounded.** `HistoryQuery.name` parses with duplicate/unknown
   rejection, refuses blank/control/oversize with `PROTOCOL`, admits `/` and `\`;
   `matchesRunName` is a pure exported leaf, case-blind both directions, interior substring,
   and a gapped subsequence NEVER matches; the parser can never deliver an empty `wanted`.
2. **The predicate sits in the paid-for slot.** The name check rides the join's existing
   per-candidate snapshot read; exactly one store page per press; prefix stays at the store;
   AND semantics; zero-match pages keep their cursor; authorization unchanged under named
   grants; `src/core` diff empty.
3. **The manager's filter is whole.** `HistoryFilter` replaces `prefix` with no shim and no
   surviving consumer; all-blank stores `undefined` (never `{}`); retry and older preserve
   both halves; the departure-`changed` semantics untouched; zero rows + cursor coexist as
   `empty` state with continuation.
4. **The surface says exactly what it does.** The ruled copy verbatim (labels, help, scope
   line, buttons); the word "fuzzy" nowhere; one derived phrase feeding both the empty
   sentence and the status line; the three empty sentences split on filter and cursor;
   Enter from either field; Clear only while a filter stands; keyboard order; typed text
   reaching the wire verbatim (untrimmed, uncased). The frames corroborate.
5. **Nothing regressed.** The H6 battery (five states, staleness gate, departure affordance,
   disclosure, Back journey) intact; no polling introduced; rows never mutate under the
   reader; the showcase demonstrates both halves frozen and server-free.

## Standing conditions

The Sol sandbox denies loopback listeners — rule from source, tests-as-written, and the
supplied native evidence. `guides/**` is U7's ledger (the delta is recorded, not a finding).
The two Orchestrator design rulings (server-side at the join; the falsified scan-cost
premise) are rulings — audit their implementation, not their existence.

## Output

Per-claim numbered verdicts with `file:line` (and frame) evidence, findings outside the
claims if any, then exactly one terminal line:
`VERDICT: PASS|FAIL — N broken, N unresolved, N not-evidenced, N findings outside the claims`
