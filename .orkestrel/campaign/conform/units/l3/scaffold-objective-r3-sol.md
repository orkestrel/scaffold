## Per-claim verdicts

1. **CONFIRMED.** Every row has an `applied` or `noop` disposition in `tmp/units/conform/conform-scaffold-report.md:10-24`, supported by the diff.

2. **CONFIRMED.** The operative repairs appear at `README.md:10-24`, `README.md:73-77`, `guides/scaffold.md:16-20`, `guides/scaffold.md:228-229`, `guides/scaffold.md:391`, `guides/scaffold.md:403`, `guides/scaffold.md:1195-1199`, `guides/scaffold.md:1511-1517`, `package.json:65`, `src/bin/helpers.ts:565-577`, and the changed tests. The old-form sweep pattern named in `tmp/units/conform/conform-scaffold-report.md:163` over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md` found only permitted TSDoc, prose, and test-title senses.

3. **REFUTED.** Sweeps for `\b(extractFenceImports|findMissingSymbols)\b` and case-insensitive `extractFenceImport(s|ed|ing)?|findMissingSymbol(s|ed|ing)?` over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, and `README.md` were empty. The replacements are at `tests/guides.test.ts:6`, `tests/guides.test.ts:11`, `tests/guides.test.ts:102`, `tests/guides.test.ts:112`, and `tests/guides.test.ts:188`, but the required sweep is absent from the report’s sweep table at `tmp/units/conform/conform-scaffold-report.md:158-168`. Smallest fix: record those patterns, paths, and empty readings in the report.

4. **CONFIRMED.** The red and restored readings appear at `/home/user/work/evidence/scaffold-proofs/obj5-red-control.txt:76-80`, `obj5-green-final.txt:42-46`, `obj2-red-control.txt:55-59`, `obj2-green.txt:17-21`, `obj3-red-control.txt:63-67`, `obj3-green.txt:10-13`, `subj6-red-control.txt:55-59`, and `subj6-distribution.txt:30-34`. The count sweeps `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b` and the numeral-noun pattern over `README.md` produced the permitted readings at `README.md:6`, `README.md:43`, `README.md:64`, `README.md:77`, and `README.md:98`, with no numeral-noun match.

5. **CONFIRMED.** The diff changes no scaffold export or method signature. The guide tables remain aligned, and the parity mechanism uses the dependency’s adopted names at `tests/guides.test.ts:99-149`. The `AGENTS\s*§` sweep over `src/**`, `tests/**`, `guides/scaffold.md`, `guides/README.md`, `README.md`, `package.json`, and `host.json` was empty.

6. **CONFIRMED.** No scaffold-published symbol was renamed or removed. The dependency-helper adoption in `tests/guides.test.ts:3-12` is not a scaffold API change. The report records the empty breaking population at `tmp/units/conform/conform-scaffold-report.md:273-281`.

7. **CONFIRMED.** After excluding the campaign records under `.orkestrel/**` as directed, every status path is Owned, including amended `host.json` and the Orchestrator-owned `tests/guides.test.ts` integration. The diff contains no compatibility alias, re-export, or shim.

8. **CONFIRMED; gate reading NOT-EVIDENCED.** The added-line sweep `TODO|FIXME|debugger|console\.|\.skip\(|\.only\(|\.todo\(|retry|timeout` over `/home/user/work/evidence/conform-scaffold.diff` was empty. The changed conditional skips remain narrowly capability-gated at `tests/src/server/WriteTransaction.test.ts:206`, `tests/src/server/WriteTransaction.test.ts:227`, and `tests/src/server/helpers.test.ts:1582`. The Orchestrator’s landing run settles the gates.

9. **REFUTED.** The residue sweep over diff additions was empty, but the report’s disposition evidence does not match the audited tip: `tmp/units/conform/conform-scaffold-report.md:15` points to `README.md:72`, while the repaired statement is at `README.md:75`. Its sweep rulings also cite stale locations at `tmp/units/conform/conform-scaffold-report.md:170-181`; the present locations include `README.md:43`, `README.md:64`, `README.md:77`, `README.md:98`, and `guides/scaffold.md:1481`. Smallest fix: update the report’s pointers to the audited tip.

## Findings outside the claims

None.

## Referrals to the Orchestrator

R1. Does “the harness wiring” at `src/core/constants.ts:125` intentionally exclude the harness permission file and session-start hooks named at `src/core/constants.ts:116-118`?

FAIL 3 9