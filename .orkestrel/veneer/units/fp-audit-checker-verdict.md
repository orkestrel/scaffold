<!-- Checker: checker on Sonnet, workflow wf_1626ffeb-c05, brief fp-audit-checker-brief.md. -->

## Verdict — PASSIVE-FRAMES (`fp`) round 1, claims 1, 7, 9

**Claim 1 (Scope) — CONFIRMED**
- `fp-status.txt:1-7` lists exactly `app/browser/constants.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/{ButtonGroupSection,ListGroupSection,PlaceholderSection}.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`. Every path is inside the brief's Owned set (`b-passive-frames-brief.md:60`) and none is on the Off-limits list (`b-passive-frames-brief.md:65-68`).
- `fp-shared.patch:1-46` touches only `guides/veneer.md` (single `--- a/guides/veneer.md` header) and edits are prose paragraphs (§ Collapse classes, § Showcase, § Tests), with no table/ledger row.
- Mutation check: a change that added a second file header to the patch, or a status line outside the owned list, would falsify this claim; the assertion here is a direct file-list read, which distinguishes pass from fail.

**Claim 7 (The large placeholder) — CONFIRMED**
- Specimen: `fp.diff:76-78` (`Large placeholder`, one `.placeholder` bar and one `.placeholder placeholder-lg` bar, `align-items-start`).
- Case: `fp.diff:806-856` (`tests/app/browser/sections/PlaceholderSection.test.ts`) asserts `raised.height / plain.height` ≈ `large/base` read from the cascade's declared `min-height` rules (`fp.diff:822-847`), `raised.width ≈ plain.width`, `raised.top ≈ plain.top`.
- Mutation M3 (`fp-instruments/fp-mutations.log.txt:23-31`): `align-items-start` → `align-items-end` reddens exactly this case, `Tests 1 failed | 2 passed (3)`, isolating the top-edge assertion. This mutation flips the top-edge equality from true to false and nothing else, so the assertion distinguishes the passing case from the mutated one.

**Claim 9 (Law and report) — CONFIRMED, with findings for the record**
- No `any`, no `as` beyond one `as const` (`fp.diff:829`), no non-null `!` assertion, no `@ts-*`/`eslint-disable`, no mock/spy/fake-clock construct found across the full diff (grep sweep of `fp.diff`, all `!==`/`!=` hits are comparisons or boolean negation, not assertions).
- No nested function declarations found; all flagged `const` lines are local data bindings inside test bodies, not extracted helper functions.
- `MODE_TOKEN` is defined once, at `fp.diff:1001` (`tests/setup.ts`), and every other site (`fp.diff:129,234,868,876,887`) calls that one export; the prior inline duplicate pattern at the old `fp.diff:885` line is removed in the same hunk.
- Gate quotes verified against retained logs, each exact match:
  - format: `fp-instruments/fp-format.log.txt:3` = `b-passive-frames-report.md:221`.
  - lint/check: `fp-instruments/fp-lint.log.txt`, `fp-check.log.txt` show no diagnostics, matching `b-passive-frames-report.md:222-223`.
  - `test:setup`: `fp-instruments/fp-test-setup.log.txt:32` (`Tests 299 passed (299)`) = `b-passive-frames-report.md:224`.
  - `app:browser`: `fp-instruments/fp-test-app.log.txt:77` (`Tests 38 passed (38)`) = report line 225.
  - captures: `fp-capture-light-1280.log.txt:78`, `fp-capture-dark-390.log.txt:78` both `Tests 50 passed (50)` = report lines 226-227.
  - `test:guides`: `fp-test-guides.log.txt:11` (`Tests 20 passed (20)`) = report line 228.
  - red/green pairs: `fp-red-sections.log.txt:230`, `fp-green-sections.log.txt:90`, `fp-red-journey.log.txt:207`, `fp-green-journey.log.txt:126` all match report lines 166-167, 181-182.
- Mutation to falsify: a report edit that changed any quoted number without changing the underlying log (or vice versa) would break this claim; the line-by-line log comparison performed here distinguishes that mutation from the matching case.

**For the record — counts, temporal words, code tokens without a noun in `b-passive-frames-report.md`**
- Temporal word `once`: line 19 (`written once`), line 95 (`renders each role once`) — both mean "a single time," not the causal/temporal sense the substitution table bans, but flagged per the literal sweep.
- Code tokens left without a following noun: `` `paused` `` (line 62, followed by a comma and a new clause, not a noun), `` `none` `` (line 62, "transform `none`", noun `transform` precedes rather than follows), `` `running` `` (line 63, "is `running` again," followed by "again," no noun), `` `none` `` (line 105, "not `none`," no noun follows), `` `outline: none` `` (line 108, followed by "and a `box-shadow` ring," no noun directly after), `` `0` `` (line 203, "time `0`," noun precedes, none follows).
- No prose count of a growable set (rules, files, frames, roles) was found stated as a bare number; the diffstat block (lines 41-48) and gate-result quotes (lines 166-228) are quoted command/log output, exempt as measurements reported with the run that produced them.

**Referrals:** none for these three claims; every sub-clause was resolvable by direct file/log inspection.

VERDICT: PASS
