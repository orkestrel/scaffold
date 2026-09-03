## Per-claim verdicts

1. **CONFIRMED.** Every row has an `applied` or `noop` disposition in `/home/user/scaffold/tmp/units/conform/conform-server-report.md:20-42`.

2. **CONFIRMED.** The operative repairs are present, including `isAddressInfo` placement at `src/server/validators.ts:28`, `'NEXT'` handling at `src/server/helpers.ts:105-109`, and the caller-wins header merge at `src/server/Stream.ts:65-72`. The pattern `new Error\('next\(\) was already called|Array\.from\(new Uint8Array|new Headers\(\{ \.\.\.SSE_HEADERS|requestEncoding|readonly id = crypto\.randomUUID` returned empty across `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md`.

3. **CONFIRMED.** The case-insensitive pattern `\brequestEncoding(?:s|ed|ing)?\b|\bresolvePort(?:s|ed|ing)?\b|symbol\.kind` returned empty across `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md`. The report names those populations at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:100-113`.

4. **REFUTED.** The `server-obj-10` control inverted live-path guards and broke unrelated listener cases; it did not exercise the unreachable failure branch. The red capture reports `55 failed` at `/home/user/work/evidence/server-proofs/obj-10-planted-red.txt:710-730`, while the pattern `server bound a listener with no resolvable AddressInfo|unresolvable address|reporting \`0\`|unknown one` returned empty across `tests/**/*.ts`. The report acknowledges the missing reachable proof at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:91-94`. The documentation sweep is also misstated: `ESM-only` remains in a permitted declaration-file sense at `tests/distribution.test.ts:60`, while the report records an empty result at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:110`. Record that hit as permitted and exempt the established unreachable invariant from this claim, or add a real listener-injection seam and a test that drives the branch.

5. **CONFIRMED.** Guide method rows match `NegotiatorInterface`, `StreamInterface`, and `ServerInterface` at `guides/server.md:199-202`, `guides/server.md:220-223`, and `guides/server.md:237-241`. Changed exports and behavior appear at `guides/server.md:73`, `guides/server.md:119`, `guides/server.md:134`, and `guides/server.md:161`. The pattern `AGENTS §|§2[0-9]` returned empty across the named package-owned paths.

6. **CONFIRMED.** The breaking section names the `requestEncoding` rename, re-cased SSE merge behavior, and double-`next` error-class change, with consumer impact and edits at `/home/user/scaffold/tmp/units/conform/conform-server-report.md:139-175`.

7. **CONFIRMED.** `git status --short` lists only Owned paths. It reports no `package-lock.json`, `node_modules`, vendored file, configuration, or script change. The removed-name sweep found no compatibility alias or shim.

8. **CONFIRMED for the test-control conjunct; independent gates NOT-EVIDENCED.** The pattern `^\+.*(\.skip\(|\.only\(|\.todo\(|TODO|FIXME|debugger|console\.|retry|timeout)` over `git diff --unified=0 HEAD -- README.md guides/README.md guides/server.md src tests` found only the permitted `@orkestrel/timeout` mirror text at `guides/README.md:47-49`. The Orchestrator’s landing run settles the gates.

9. **REFUTED.** The supplied diff predates the fix-round edits. It adds “via” at `/home/user/work/evidence/conform-server.diff:127`, while the tree says “by setting” at `guides/server.md:93`. Its validator comment at `/home/user/work/evidence/conform-server.diff:883-887` also differs from `src/server/validators.ts:7-9`. Regenerate `conform-server.diff` and `conform-server.status` from the landing tree.

## Findings outside the claims

O1. `tests/guides.test.ts:235` assigns `logRequestId` as a nested function, contrary to `.claude/rules/architecture.md` § Functions and orchestration. Pass the anonymous middleware directly to `server.use(...)` while retaining the lifecycle assertions.

## Referrals to the Orchestrator

R1. Will claim 4 exempt the `server-obj-10` branch that the row establishes as unreachable, or require an injectable listener seam and a named regression test?

FAIL 4 9