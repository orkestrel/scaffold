Verdict shape per `orkestrel-falsify`.

1. **Scope and gates.** CONFIRMED — `rp-3-status.txt` lists exactly `guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts` (`/home/user/scaffold/.orkestrel/veneer/units/rp-3-status.txt:1-4`); `rp3-format.log.txt:9`, `rp3-lint.log.txt:5`, `rp3-check.log.txt:29` each read `EXIT 0`; `rp3-green-light390.log.txt:77` and `rp3-green-dark1280.log.txt:77` each read `Tests 1 passed | 62 skipped (63)`.

2. **The given sentences.** CONFIRMED at all four sites, verified by direct comparison against the brief text, not the report:
   - `tests/setup.ts:627-631` matches brief item 1 word for word.
   - `guides/veneer.md:10556-10560` matches brief item 2 word for word.
   - `tests/app/browser/integration.test.ts:721` keeps "The release parks the pointer outside the page." and drops the deleted sentence pair; the new comment line at `integration.test.ts:740-741` sits immediately above `const lifted = build('div', { classes: 'pt-5' })` (`integration.test.ts:742`), matching brief item 3 word for word.
   - The case title at `integration.test.ts:871` and its comment at `integration.test.ts:872-876` match brief item 4 word for word.

3. **No behavior moved.** CONFIRMED — `rp-2.diff` and `rp-3.diff` carry the identical new test body (assertions `box.top`/`box.left`/`entered`/`:hover`, the same `FRAMES.lift(clone, ..., { padded: false })` call) in both diffs; the only lines that differ between the two diffs are the title string and comment prose at each of the four sites.

4. **The grep and census criteria.** CONFIRMED — independent `Grep` run over `/home/user/veneer-rp/tests` and `/home/user/veneer-rp/guides/veneer.md` for `pointer (rests|resting) off|first element touches|as the document's first element` (case-insensitive) returned no files; `rp-3.diff`'s `tests/setup.ts` hunk (lines 105-119) touches only the `CASCADE_KEYS` remarks, and the worktree carries no other `tests/setup.ts` hunk.

5. **Prose law.** CONFIRMED — the four changed sites carry no count, no code token missing its noun (none use a code token in prose), and no banned term in a banned sense; `above`/`below` at `tests/setup.ts:629-631` and `integration.test.ts:721` describe physical DOM/CSS position, not a cross-reference, which is the permitted sense.

**Attacked and held.** Claim 4's second half was attacked by independently reading `rp-3.diff`'s actual hunk rather than trusting the report's prose (report `rp-report-3.md:61-62` only restates it); the diff itself, not the report, is what confirms it. F1–F3 from `rp-audit-2-verdict.md:22-25` were re-attacked against the round-3 worktree: `FrameManager.lift` (`tests/setupBrowser.ts:949-971`) confirms `wrapper.append(specimen)` then `document.body.prepend(wrapper)`, so the wrapper — not the copy — is first in the document with the clone as its only child, and `options.padded !== false` gating the `p-3` class confirms "unpadded" for `{ padded: false }`; this matches the new comment's claims at `integration.test.ts:872-876` exactly, so F1–F3 are closed, not merely reworded.

**Findings outside the claims.** None substantiated.

VERDICT: PASS
