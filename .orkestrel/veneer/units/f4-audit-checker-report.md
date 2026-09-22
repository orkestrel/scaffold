<!-- F4 audit round, checker lane: `checker` on Sonnet, native, returned 2026-09-22 (141 s). Brief: units/f4-audit-checker-brief.md. Claims: ../f4-audit-claims.md. Blind report, retained verbatim; its terminal line departs from the skill form and is read as CONFIRMED on the claims it names. -->

# Verdict — F4 HOST-OBSERVATIONS, checker lane (claims 3, 11, 12, 13, 14, 15)

## Numbered verdicts

**Claim 3 — No stored-event field is read after dispatch.** CONFIRMED.
Swept the pattern `currentTarget|relatedTarget|composedPath\(|\btarget\b` over the six named files:
`/home/user/veneer/tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`,
`tests/src/browser/Button.test.ts`, `tests/src/browser/helpers.test.ts`,
`tests/setupConformance.ts`, and `tests/setupConformance.test.ts` (no matches). Every match found:
- `tests/setupBrowser.ts:644-647` — `event.target`, `event.currentTarget`, `event.relatedTarget`,
  `event.composedPath()` all sit inside the `recordEvents` listener callback body.
- `tests/setupBrowser.ts:290` and `tests/setupConformance.ts:1090` — `event.target` reads inside
  other listener bodies (`document`-level click counters).
- Every other `target` match is either an unrelated local variable holding a DOM/Locator element
  (`readOracleButton`, `holdOraclePointer`, import-specifier resolution in `setupConformance.ts`),
  a JSDoc parameter name, or a read of the pre-captured `EventReading` fields
  (`reading.target`, `readings.calls[0]?.[0].target`, `reading?.target`) — the recorder's own
  snapshot taken synchronously at delivery, not a live read off the stored `Event`.
Mutation attempted: a recorder that captures the event and reads `target` from it later, rather
than snapshotting delivery-time fields, would show up as a bare `.target` access on an `event`
variable outside a listener; the sweep found none.

**Claim 11 — The rename is complete, exact, and bounded.** CONFIRMED.
`f4-rename.diff` (54 files) plus `setupBrowser.ts`, `setupBrowser.test.ts`, and
`tests/src/styles/tokens.test.ts` in `f4-core.diff` total 57 files, matching the terrain's
57-file population (`.orkestrel/veneer/units/f4-terrain.md` § The `specimen` term). Every changed
line in both diffs is an identifier (`specimens`→`scene`, `SpecimenManager`→`SceneManager`), an
import specifier, or a call/method chain on that identifier, except:
- `tests/setupBrowser.ts` doc-comment lines (currently around the `mount` method) replacing
  "specimen"/"specimens" with "node"/"nodes" in the registry-sense description — the class's own
  doc comments.
- `tests/setupBrowser.test.ts` case title "attaches a specimen the case can address" → "attaches a
  node the case can address" — the one case title.
No other line in either diff touches `readSpecimen`, `SPECIMEN_ATTRIBUTE`, `data-specimen`, or a
`"No … specimen"` string; every such occurrence visible in the diff context is unchanged. The gate
log shows `test:src:styles exit=0`.

**Claim 12 — No installed export is duplicated.** CONFIRMED.
`grep -n 'composedPath\|relatedTarget\|currentTarget'` returns no matches in
`/home/user/veneer/node_modules/@orkestrel/test/dist/src/core/index.d.ts`,
`.../browser/index.d.ts`, or `/home/user/veneer/node_modules/@orkestrel/contract/dist/src/core/index.d.ts`.
`recordEvents` (`tests/setupBrowser.ts`) is `createRecorder` plus one `addEventListener` call, per
the diff; no installed export composes a recorder with a listener.

**Claim 13 — The gate chain is green on the finished tree.** CONFIRMED.
`/home/user/scaffold/tmp/audit/f4-gates.log.txt` — every `=== <gate> exit=` line reads `exit=0`,
including `=== test:src:browser exit=0 (15:04:00)`, the project holding the two formerly red
cases.

**Claim 14 — Scope is honest.** CONFIRMED.
`git -C /home/user/veneer status --porcelain` (66 modified, 0 added, 0 deleted) lists only files
the briefs own: `README.md`, `guides/veneer.md`, `src/browser/Button.ts` (the only `src/**` entry),
`tests/fixtures/oracle/button.json`, `tests/setup.ts`, `tests/setupBrowser.ts`,
`tests/setupBrowser.test.ts`, `tests/setupConformance.ts`, `tests/setupConformance.test.ts`,
`tests/src/browser/Button.test.ts`, `tests/src/browser/helpers.test.ts`, and 55
`tests/src/styles/**` files. `tests/conformance.test.ts`, `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/setup.test.ts`, `app/**`, `configs/**`, `package.json`, and
`package-lock.json` do not appear in the status list. `Glob('tmp/probe/**')` under
`/home/user/veneer` returns no files.

**Claim 15 — Parity and prose hold.** CONFIRMED.
The gate log entries `=== test:guides exit=0` and `=== test:policy exit=0` are the same run
claim 13 reads. Read the added README row and the added `guides/veneer.md` paragraph directly:
neither contains `should`, `simply`, `easy`, `just`, `currently`, `via`, `e.g.`, `i.e.`, or `etc.`;
the README row's "since this receipt" is the temporal sense (not the banned causal sense); no
sentence states a count as a number (`1194`, `2026-09-22`, and `153` are a version and dates, not
counts).

## Findings outside the numbered claims

None.

## Attacked-and-held

- Claim 3: attacked with "a recorder that stores the event and reads `target` afterwards" — the
  sweep distinguishes this (a bare post-dispatch `.target`/`.currentTarget`/`.relatedTarget`/
  `.composedPath()` access outside a listener) from the passing case (delivery-time capture into an
  `EventReading`), and found none of the former.
- Claim 11: attacked by checking every line in both diffs against the four permitted categories
  (identifier, call, import specifier, doc-comment/case-title update) — no line fell outside them.
- Claim 12: attacked by running the named grep against all three declaration files directly rather
  than trusting the terrain's prior reading — same zero-match result.

## Referrals

Claims 1, 2, 4, 5, 6, 7, 8, 9, 10, and 16: `UNRESOLVED`, judgment claim, referred to the lanes.

## Terminal line

Claims 3, 11, 12, 13, 14, and 15 are CONFIRMED on file:line and grep evidence; every other claim is UNRESOLVED and referred to the subjective and objective lanes.
