# AD4-9b — analyst lane (GPT-6 Astra, read-only `codex exec` rooted at the scaffold checkout) — returned 2026-09-15 17:46Z

Subject: D4-9b, diff `D49b-diff.patch.txt`, report `D49b-scaffold-overload-pin-report.md`, gates `D49b-scaffold-gates-orchestrator.log.txt`, probe `P23-d49b-key-probe.md`. Brief: `AD49b-audit-brief.md`. Launcher `AD49b-run.sh.txt`; 237 s.

OBJECTIVE lane (analyst) — source-and-diff audit; no Vitest execution.

1. CONFIRMED — `tests/setupPolicy.test.ts:161` has the required name and sits directly before the CRLF case at `:192`, with blank-line separation. The former name is absent.
2. CONFIRMED — `tests/setupPolicy.test.ts:171` asserts `buildResult` at lines 1, 2, and 3; `:176` carries every required control and message. Independent replay UNRESOLVED: `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t "reads each signature of an exported function overload"`.
3. CONFIRMED — `tests/setupPolicy.ts:84` places the overload row after `function`; `tests/setupPolicy.test.ts:21` drives it through `inspectPolicyWorkspace` and asserts the line-1 violation. Independent replay UNRESOLVED: `npm.cmd run test:setup -- tests/setupPolicy.test.ts -t "accounts for a planted setup function overload export"`.
4. CONFIRMED — `tests/setupPolicy.ts:1985` keys by path, name, and owner; `tests/setupPolicy.test.ts:55` asserts the exact filtered result. `.orkestrel/campaign/P23b.log.txt:5` records the restored old key, the named pin failing, restoration, and green. Independent mutation replay UNRESOLVED: `npm.cmd run test:setup -- tests/setupPolicy.test.ts`, with `line` restored in the key, then after removing it.
5. CONFIRMED — `.orkestrel/campaign/D49b-diff.patch.txt:92` identifies the HEAD-relative baseline and pre-existing guide refreshes. Excluding those refreshes, the manifest delta changes the setup-policy digest and manifest digest; no membership or `surface` hunk appears. The build records staging at `.orkestrel/campaign/D49b-scaffold-gates-orchestrator.log.txt:63`.
6. CONFIRMED — The supplied delta names the authorized paths; added executable code contains none of the prohibited constructs. Fixture strings are intentional inputs. `.orkestrel/campaign/D49b-scaffold-gates-orchestrator.log.txt:9`, `:13`, `:25`, `:67`, and `:109` record exit 0. Independent reruns UNRESOLVED: `npm.cmd run format:check`; `npm.cmd run lint:check`; `npm.cmd run check`; `npm.cmd run build`; `npm.cmd test`.
7. BROKEN — `.orkestrel/campaign/D49b-scaffold-overload-pin-report.md:11` uses "below"; `:61` uses "above"; `:62` tallies the pre-existing fixtures; `:63` uses "new" and incorrectly claims count-free prose. Replace the directional references, remove the tally and time qualifier, and correct that assertion. Declaration-merging behavior remains UNRESOLVED: P22 exercises the reader, not merged-name collision reporting. Add an interface-merging and function/namespace-merging probe with distinct-file and distinct-owner controls, then run `npm.cmd run test:probe -- tmp/probe/AD49b-merging.test.ts`; that proposed probe does not exist in this audit.
8. UNRESOLVED — Hold the ship recommendation until the report correction and merging vector under claim 7 close. Release-mode distribution evidence is also absent from the supplied gates; `package.json:93` requires it. Unexecuted vector: `npm.cmd run test:distribution -- --mode release`.

outside: none

VERDICT: FAIL 7, 8

<!-- journal: tmp/codex/AD49b-audit.jsonl; thread_id 01a0a629-efaa-7fa1-843f-d6b22064e49f; launch 2026-09-15T17:42:39Z, exit 0 at 17:46:36Z -->
