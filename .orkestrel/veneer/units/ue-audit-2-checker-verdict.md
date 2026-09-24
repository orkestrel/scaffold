## Verdict — UTIL-EFFECT (`ue`) round 2, checker (claims 1, 3, 7)

**1. UNRESOLVED.**
Confirmed by direct reading, independent of the report's prose:
- `ue-2-status.txt` lists exactly the 12 untracked owned paths (sections, partials, and their tests) and nothing else (`.orkestrel/veneer/units/ue-2-status.txt:1-12`).
- Diffing `ue-shared.patch` against `ue-shared-2.patch` file-by-file, the only sections whose text differs are `tests/setup.ts` (`ue-shared-2.patch:22-79` vs `ue-shared.patch:22-73`), `tests/setup.test.ts` (new in round 2, `ue-shared-2.patch:82-93`, absent from round 1's patch entirely), `tests/setupStyles.ts` (`ue-shared-2.patch:101-108` wording), `app/browser/constants.ts` (`ue-shared-2.patch:343-346` paragraph), and `guides/veneer.md` (`ue-shared-2.patch:786-899`). Every other section (`src/styles/index.scss`, `tests/setupStyles.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `Showcase.ts`, `index.ts`, the three `tests/app/browser/*` files, `tests/setup.css`, the tailwind fixtures) is byte-identical between the two patches. This is exactly the 5-file set the claim names — CONFIRMED.
- Owned-file blob hashes (`git diff --no-index` index lines) match round 1 for 10 of 12 owned files; only `src/styles/utilities/_shadow.scss` (`a50c3ee`→`f16942b`) and `tests/src/styles/components/focus-ring.test.ts` (`7ec27e0`→`115f272`) changed, and both changes are the E-c comment sweep (`ue-2.diff:150-152`, `ue-2.diff:690-691` vs `ue.diff:689-690`) — CONFIRMED "the owned files change only at the E-c sites."

Unresolved: "`ue-shared-2.patch` applies with `git apply --check` to a fresh extract of `2a3f223`" rests only on `ue-instruments/ue-2-apply-check.log.txt:1` (`apply-check exit 0`) and the report's own prose (`b-utilities-ue-report-2.md:183-192`) — both produced by the audited unit itself, with no independent lane execution. UNRESOLVED; the command that would settle it is `git apply --check` run against a fresh `git init` extract of commit `2a3f223` with `ue-shared-2.patch` applied.

**3. UNRESOLVED.**
Confirmed by direct reading:
- `CASCADE_KEYS`'s added entries in `ue-shared-2.patch:52-69` contain `shadows`, `opacity-steps`, and `focus-ring-roles` only — no `default-focus-ring` entry — CONFIRMED gone.
- `DRIVEN_KEYS` retains `Object.freeze({ scenario: 'default-focus-ring-focus', subject: 'Default focus ring' })` (`ue-shared-2.patch:77`) and the `CaptureSubject` union keeps `'Default focus ring'` (`ue-shared-2.patch:31`) — CONFIRMED subject stays for its driven row.
- The new remarks paragraph sits between the collapse decline and the carousel decline (`ue-shared-2.patch:40-44`); reading the worktree's unmodified base text at `/home/user/veneer-ue/tests/setup.ts:456-466`, the collapse paragraph's "for the same reason" points at the grow-spinner paragraph two paragraphs earlier, which the inserted text does not sit between — back-reference unbroken — CONFIRMED.
- The exemption `'Default focus ring'` with its comment is added to `tests/setup.test.ts` (`ue-shared-2.patch:88-92`), naming the subject — CONFIRMED present.
- Grepping every retained artifact under `.orkestrel/veneer/units/` for `default-focus-ring` (excluding `-focus`), the only shipped-file hits are the interdiff's own removal line (`ue-instruments/ue-2-interdiff.txt:135`, a `-` line) and the mutation script/log that plants and reverts it as a negative control; no other source or test file in the patch enumerates the dropped row — CONFIRMED.

Unresolved: "the retained runs (the exemption removed, the row restored) redden that case" is evidenced only by `ue-instruments/ue-mutations-2.log.txt:80-92`, produced by the audited unit's own script (`ue-mutations-2.sh`) with no independent execution. UNRESOLVED; the settling commands are `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setup.test.ts` run once with the `'Default focus ring'` exemption line removed from `tests/setup.test.ts`, and once with the `default-focus-ring` resting row restored in `CASCADE_KEYS` beside the exemption; both must fail the case named `names each driven row for its subject's stem and one state, on a specimen the resting registry photographs or one it exempts by name`.

**7. CONFIRMED.**
Directly checked against `ue-2.diff` and `ue-shared-2.patch` (not the writer's narrative):
- No `: any` / `<any>` / `as any` construct — every `any` hit is prose ("any layer", "any step"), `ue-2.diff:671,709,812`.
- No `ts-ignore`, `ts-expect-error`, `ts-nocheck`, or `eslint-disable` — no matches in either file.
- No `mock`, `spy`, or `fake` token — no matches.
- No `as X` type assertion beyond `as const` — the only `as` hits are prose ("read as the painted layer", "read as the shipped classes") and one `] as const` (`ue-2.diff:940`).
- No TypeScript non-null assertion (`x!.y` / `x!`) — no matches; the only `!` occurrences are CSS `!important` declarations, outside the TS ban.
- No nested named function declaration/assignment beyond a directly-passed callback — every added block in the read files (`shadow.test.ts`, `focus-ring.test.ts`, `opacity.test.ts`, the three section classes) uses only arrow callbacks passed to `it(...)`/`afterEach(...)`/`.map(...)` or `for` loops; no interior `function` or `const fn = (...)` declarations found by search or by the full-text reads above.
- Added comments, TSDoc, copy, and guide text: swept for every banned substitution-table term (`should`, `simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `allows you to`, `and/or`, `since`, `once`, `above`, `below`, `please`, `sanity check`, `dummy`, `blacklist/whitelist`, `master/slave`) across `ue-2.diff` and `ue-shared-2.patch`: zero hits in `ue-2.diff`; three hits in `ue-shared-2.patch` (`:800,812,834`), each `below` used in the permitted spatial sense ("one pixel below it"), not as a document cross-reference — CONFIRMED compliant.
- The report records each gate's command as run with its result line: `b-utilities-ue-report-2.md:172-181` (table: command, exit, result line) and `:165-166` — directly checkable against the report's own text, and it is present.

**Findings outside the claims** (to the BROKEN standard) — the counts the report states, listed per the brief's instruction:
- `b-utilities-ue-report-2.md:172`: `Finished in 10725ms on 363 files using 4 threads.` — a literal quoted tool result line (the `format:check` command's own stdout), not authored prose stating a count; every other numeric token in the report is either an exit code, a duration, a version (`npm 11`), a column limit (`100 columns`), or a test-run pass/fail count reported beside the command that produced it, all permitted under the writing rule's "measurement reported with the run that produced it." No unsubstantiated authored count found.

**Attacked and held:** the file-set claim (1c) and the owned-files-only-at-E-c claim (1d) were attacked by independent blob-hash and patch-section diffing rather than by trusting the report's own file list, and both held exactly as stated.

VERDICT: FAIL 1, 3; outside the claims: none
