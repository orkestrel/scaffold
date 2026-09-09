# Omit the absent optional fixture field

Root owns the formatDrift fixture in Guide tests/src/core/helpers.test.ts. The
writer has frozen source. Read the existing Drift contract in src/core/types.ts:
source is an optional string, not an explicit undefined value. Root's ordered
check failed TS2379 at this fixture; the exact diagnostic is retained in
tmp/pass/d7n-guide-parity-leaves-gates/check.log.txt.

Remove source: undefined from that fixture. Keep guide: '' and the expected absent
source diagnostic. Do not widen Drift or change implementation. Use apply_patch,
format the owned test if needed, and rerun the root ordered gate chain. Include
this exact fixture delta in the independent correction review.
