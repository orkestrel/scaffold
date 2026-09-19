1. **CONFIRMED.** Objective lane. I compared the candidate’s current source/test Git diff with the frozen predecessor sections; they match exactly. Numeric recapture and independent identity mismatches remain covered by the carried confirmation. Native bigint capture remains at `tmp/release/scaffold-0.0.75/src/server/helpers.ts:1930`; readonly bigint fields remain at `src/server/types.ts:190` within that candidate.

2. **CONFIRMED.** Carried replacement/refusal confirmation. The successor preserves the physical-directory guard and exact identity comparison at `tmp/release/scaffold-0.0.75/src/server/helpers.ts:1931` and `:1962`. The retained replacement test keeps the original allocated and checks native identities before asserting refusal at `tmp/release/scaffold-0.0.75/tests/src/server/helpers.test.ts:2866`. The file and symlink cases remain unchanged.

3. **CONFIRMED.** Carried deterministic-regression confirmation. The retained red reaches the native-value assertion, rather than failing collection or compilation; the retained green exercises the repaired capture. Exact bigint equality at `tmp/release/scaffold-0.0.75/tests/src/server/helpers.test.ts:2813` rejects numeric capture even when its numeric value is safe. The compiler response covers submitted drafts on the canonical substrate, not the complete candidate or release gates.

   receipt probe:b8ff7252ce35242ae141867303041a85:type:typescript@6.0.3:oxlint@1.83.0:vitest@4.1.11:configs/src/tsconfig.server.json@3584c2c4c2bfee6280226ce493a811d9

4. **CONFIRMED.** I attacked the corrected sentence using the unchanged numeric destination expectation as the counterexample. The sentence at `tmp/release/scaffold-0.0.75/guides/scaffold.md:1864` expressly names directory anchors. The adjacent lifetime limitation remains intact. No anchor serialization promise appears. The guide’s measured SHA-256 matches its inventory entry at `tmp/release/scaffold-0.0.75/host.json:913`. The actual inventory diff changes only that digest and the manifest digest; the retained parity assertion compares the complete manifest at `tmp/release/scaffold-0.0.75/tests/src/server/helpers.test.ts:2512`.

5. **CONFIRMED.** Carried source-scope confirmation. Direct comparison excludes successor changes to TypeScript and tests. Comparing the successor’s retained before/after patches shows only the prescribed sentence correction and generated inventory digests. No package, lockfile, export, or unrelated vendored change enters this successor.

6. **CONFIRMED.** I attacked execution identity and false-green propagation. The current runner/control SHA-256 readings match their retained executed copies. `tmp/units/anchor-gates-control-node-2/host-readings.json:12` records host exit `7`; `summary.json:61` records native exit `7`, signal `null`, and propagated exit `7`. Distinct complete log files contain the respective emitted markers. Launch-time descriptors are shared by control and actual mode at `tmp/release/run-anchor-gates.mjs:120`. The close handler explicitly refuses null/signal exits at `:154`. This confirms the bounded exit/output control; it does not establish timeout-tree termination.

7. **CONFIRMED.** I independently ran wrong-HEAD and existing-output attacks. Each returned host exit `1`; the existing-output attack preserved every retained file hash. Actual mode selects `[entry, 'run', 'prepublishOnly']` at `tmp/release/run-anchor-gates.mjs:111`, with explicit executable and candidate cwd at `:114`. HEAD validation precedes output creation at `:66`; exclusive creation prevents overwrite. The summary records command, toolchain, script, status, timing, and result at `:175`. The instrument contains no credential-file read, install command, publication, or source edit.

Findings fitting no claim: none.

Attacked and held:

- Exact bigint identity does not establish directory lifetime continuity. Reuse of an inode after deletion remains the documented adjacent behavior.
- Recorded dirty status is evidence, not a clean-tree assertion. Root still owns the reconciled commit and source freeze.
- Exit/output controls do not prove package gates, a fresh archive, or timeout-tree cleanup. Failed termination can leave the runner awaiting child close, as disclosed at `tmp/units/anchor-gate-runner-report.md:87`; root’s independent supervision deadline remains necessary.

VERDICT: PASS
