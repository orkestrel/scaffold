Confirmed `expired` is a `readonly` data member, matching the guide's cell `{ id, ms, signal, expired } plus start, clear`.

---

Lane held: checker timeout

**Claim 1 — scope honesty (item lists landed, nothing else changed).** PASS. `d7n-timeout-close.status.txt` lists exactly `guides/timeout.md` and `tests/guides.test.ts` (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-timeout-close.status.txt:1-2`), matching the brief's owned files. The diff (`d7n-timeout-close.diff.txt`) touches only those two files, and every hunk it carries corresponds to an item the closing brief named: item 1 (Shape idiom on Constants/Validators/Types tables), item 3 (drop-in header lines 1–3), item 4 (fence lead-ins). No unbriefed hunk appears.

**Claim 2 — report citations match the tree; no count in prose.** PASS. Every hunk quoted in `d7n-timeout-close-report.md` (lines 9-47, 65-81, 91-109) matches `d7n-timeout-close.diff.txt` byte for byte. The report's numeric mentions (`rows read: 1, disagreements found: 0`, `Tests 29 passed (29)`, `Tests 90 passed | 1 skipped (91)`) are quoted verbatim tool output tied to the command that produced them, which `AGENTS.md` § Writing permits ("a measurement quoted with the run that produced it"), not a stated count in the report's own prose.

**Claim 3 — the `Shape` idiom.** PASS. Verified directly against `/home/user/fleet/timeout/guides/timeout.md`:
- Constants table (line 60): sentence "A `Shape` cell holds the constant's declared type." exactly matches Ruling 18, sits between the `### Constants` heading (line 58) and the table (lines 62-64).
- Validators table (line 68): sentence "In a guard table a `Shape` cell holds the type the guard narrows to." exactly matches Ruling 15's guard sentence, sits between heading (line 66) and table (lines 70-73).
- Types table (line 83): sentence exactly matches Ruling 15's canonical wording, sits between heading (line 81) and table (lines 85-88).
- `TimeoutOptions` cell `{ id?, ms, signal? }` — no call-signature members, correctly no `plus` (confirmed against `/home/user/fleet/timeout/src/core/types.ts:15-22`, an interface with three data members and no call signatures).
- `TimeoutInterface` cell `{ id, ms, signal, expired } plus start, clear` — confirmed against `types.ts:34-46`: `id`, `ms`, `signal`, `expired` are `readonly` data members and `start`/`clear` are the call-signature methods (`expired: boolean` at line 46).
- No `Shape` cell holds `…` or a spelled member type; no extended interfaces present (brief's own scan found none).
- Factories, Classes, and Helpers tables carry no interface/type/guard/const rows, so correctly carry no `Shape` column.

**Claim 4 — the drop-in's canon.** PASS. `tests/guides.test.ts` lines 1-3 in `/home/user/fleet/timeout/tests/guides.test.ts` are byte-identical to `/home/user/fleet/abort/tests/guides.test.ts` lines 1-3 (both read the Ruling-13-amended header ending "The constants that follow are this package's own, as is the executed section that closes the file."). Direct comparison of lines 47 (`const root = new URL(...)`) through line 258 (the manifest `for` loop's closing `}`) in both files shows identical text — same comments, same structure, same `INTERNAL` doc block wording ("the assertion that follows it fails when a name here stops being stranded"). The divergence begins only after line 258, in each package's own `describe('flagship fences')` section, which is correctly package-specific and outside the pinned region.

**Claim 5 — fence lead-ins, sibling-fence headings, retired terms, README fences.** PASS.
- `### Race work against a deadline` (heading line 148) is followed by the lead-in sentence at line 150 and the fence at line 152.
- `### Reuse a handle across deadlines` (heading line 192) is followed by the lead-in sentence at line 194 and the fence at line 196.
- `### Link a parent signal` already carried a lead-in paragraph (lines 169-171) before its fence (line 173), unchanged by this unit as the report states.
- No heading in `guides/timeout.md` carries a retired term (no `entities`, no other flagged word), and no sibling-fence-under-titled-heading case exists in this guide.
- `/home/user/fleet/timeout/README.md` has both `## Install` (line 13) and `## Usage` (line 24) fences sitting directly under their headings, satisfying Ruling 24; `README.md` is untouched by the diff, correctly off-limits per the brief's scope.

No findings outside the claims. No referrals; every claim resolved on direct file evidence, no judgment call required.

VERDICT: PASS
