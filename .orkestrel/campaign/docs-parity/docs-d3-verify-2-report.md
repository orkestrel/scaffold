# Verify report — D3 scaffold-policy after D3-fix

Ran from `/home/user/scaffold`, in order.

1. `grep -n "no-malformed-summary\|no-banned-term" .oxlintrc.json configs/policy.ts tests/setupPolicy.ts`
   Exit 0. Output:
   ```
   .oxlintrc.json:61:		"policy/no-malformed-summary": "error",
   .oxlintrc.json:62:		"policy/no-banned-term": "error"
   configs/policy.ts:1391:		'no-malformed-summary': VOICE_RULE,
   configs/policy.ts:1392:		'no-banned-term': TERM_RULE,
   tests/setupPolicy.ts:162:	'policy/no-malformed-summary',
   tests/setupPolicy.ts:163:	'policy/no-banned-term',
   ```
   Matches expected: two wiring lines, two register rows, two wiring-rule entries. GREEN.

2. `grep -rn "no-imperative-summary" --include=*.ts --include=*.json --include=*.md . | grep -v "node_modules\|^./tmp\|^./dist\|^./.orkestrel"`
   Exit 1, no output. Expected. GREEN.

3. `grep -rn "in every sense\|POLICY_PROSE_ROOTS\|stop list\|stop-set\|the voice rules" configs tests/*.ts .claude/rules guides/scaffold.md .oxlintrc.json`
   Exit 1, no output. GREEN.
   `grep -n "vendored mirror" configs/policy.ts tests/setupPolicy.ts tests/policy.test.ts`
   Exit 1, no output. GREEN.

4. `grep -n "readPolicyGuide" tests/setupPolicy.ts tests/policy.test.ts`
   Exit 0. Output:
   ```
   tests/setupPolicy.ts:1430:export function readPolicyGuide(root: string, path: string): string | undefined {
   tests/setupPolicy.ts:1451:	const name = readPolicyGuide(root, path)
   tests/setupPolicy.ts:1464:	const name = readPolicyGuide(root, path)
   tests/policy.test.ts:33:	readPolicyGuide,
   tests/policy.test.ts:401:		expect(readPolicyGuide(root, 'guides/other.md')).toBe('other')
   tests/policy.test.ts:402:		expect(readPolicyGuide(root, `guides/${own}.md`)).toBeUndefined()
   tests/policy.test.ts:403:		expect(readPolicyGuide(root, 'guides/README.md')).toBeUndefined()
   tests/policy.test.ts:404:		expect(readPolicyGuide(root, 'guides/nested/other.md')).toBeUndefined()
   tests/policy.test.ts:405:		expect(readPolicyGuide(root, 'AGENTS.md')).toBeUndefined()
   ```
   Declaration, two predicate bodies, the import, and the case are present. GREEN.

5. `npm run format:check`
   Exit 0. Last lines:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 8885ms on 222 files using 4 threads.
   ```

6. `npm run lint:check`
   Exit 0. No warnings or errors reported.

7. `npm run check`
   Exit 0. All `tsc --noEmit` steps (root, core, server, bin) completed with no output.

8. `npm run test:config`
   Exit 0. Last lines:
   ```
   Test Files  1 passed (1)
        Tests  172 passed | 1 skipped (173)
     Start at  03:14:17
     Duration  6.15s
   ```

9. `npm run test:policy`
   Exit 0. Last lines:
   ```
   Test Files  1 passed (1)
        Tests  91 passed (91)
     Start at  03:14:28
     Duration  1.62s
   ```

10. `npm run build`
    Exit 0. Last lines:
    ```
    > build:inventory
    build-inventory: staged 121 file(s) into host.json
    ```

11. `sha256sum host.json && npm run build:inventory && sha256sum host.json`
    Exit 0. Digest before: `05d8277e94d4ac2cbefaf0adfddfac64a91770c61fc1070c0b4f9abff4cca264  host.json`
    Digest after: `05d8277e94d4ac2cbefaf0adfddfac64a91770c61fc1070c0b4f9abff4cca264  host.json`
    Same digest. GREEN.

12. `npm test`
    Exit 0. Last lines (guides project, final project in the run):
    ```
    Test Files  1 passed (1)
         Tests  17 passed (17)
      Start at  03:15:47
      Duration  3.91s
    ```
    Preceding projects (policy 91 passed, config 172 passed | 1 skipped, setup 74 passed) also reported passed.

13. `PATH=/opt/npm11/bin:$PATH npm run test:distribution`
    Exit 0. Last lines:
    ```
    Test Files  1 passed (1)
         Tests  5 passed (5)
      Start at  03:15:57
      Duration  72.57s
    ```

14. `node .orkestrel/campaign/docs-parity/instruments/p10/p10b-voice.mjs /home/user/scaffold src app configs tests scripts | tail -2`
    Exit 0. Output:
    ```
    FILES 58 BLOCKS 709 FLAGGED 0 NODOC 35
    first words:
    ```
    `FLAGGED 0` as expected. GREEN.

15. `node .orkestrel/campaign/docs-parity/instruments/p9/p9d-terms.mjs /home/user/scaffold | tail -1`
    Exit 0. Output: `FILES 80 HITS 0`
    `HITS 0` as expected. GREEN.

16. `git status --short`
    Exit 0. Output:
    ```
     M .claude/rules/typescript.md
     M .claude/rules/writing.md
     M .orkestrel/campaign/docs-parity/d3-fix.diff.txt
     M .oxlintrc.json
     M PROPOSAL.md
     M configs/policy.ts
     M guides/scaffold.md
     M host.json
     M tests/config.test.ts
     M tests/policy.test.ts
     M tests/setupPolicy.ts
    ```

No re-run needed: no red row occurred.

GATES: GREEN
