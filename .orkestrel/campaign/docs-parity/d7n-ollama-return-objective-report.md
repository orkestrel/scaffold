# Ollama retained-candidate objective audit

Lane: objective correctness.

## O-ACCEPT — CONFIRMED

Attack: compare every added `Shape` cell with its declaration, then inspect every source hunk for an executable token or public contract change.

Evidence:

- `guides/ollama.md:66-86` matches `src/server/factories.ts:79`, `src/server/OllamaProvider.ts:81`, `src/server/types.ts:18-159`, `src/server/constants.ts:7-36`, `src/server/errors.ts:31-56`, `src/server/helpers.ts:28-222`, and `src/server/parsers.ts:24-27`. Function parameters and returns, the guard target, interface members, implemented interface, error constructor, and widened constant types agree.
- `guides/ollama.md:8`, `guides/ollama.md:62-86`, `guides/ollama.md:112`, `guides/ollama.md:119`, and `guides/ollama.md:179` make the requested opening, shape, sentence-case, code-token, and literal-placement corrections without changing a documented behavior.
- `src/server/constants.ts:3-35` keeps each value and moves only its description. `src/server/OllamaProvider.ts:38-70`, `src/server/OllamaProvider.ts:102-122`, `src/server/OllamaProvider.ts:138-150`, and the later changed comment sites alter prose only. The former dead `NDJSONParser` link now names the imported `createNDJSONParser` parser as a code token.
- `src/server/types.ts:62-68`, `src/server/types.ts:80-86`, `src/server/types.ts:106-145`, and `src/server/factories.ts:63-66` change TSDoc wording only. The declarations remain byte-stable in the actual diff.
- `tmp/pass/d7n-ollama-release-initial/diff-before.txt` has SHA256 `EB8A1AFBE40886AB51B0F5039AD67753A24E9FCFE648B6D0D4B898B211F0A820`, equal to `.orkestrel/campaign/docs-parity/d7n-ollama-converge-fix-return.diff.txt`. This binds the inspected current candidate to the retained return.

Bound: this confirms the documentation correction and contract-shape accuracy. It does not certify live Ollama behavior or release readiness.

## O-TEST — CONFIRMED

Attack: treat the `tests/setup.test.ts` edit as executable text rather than a comment and look for any change to reachability, error type, assertion order, fixture data, or tested behavior.

Evidence:

- `tests/setup.test.ts:134-142` retains the `isAbortError(value)` expectation, the identical narrowing guard, `new Error(...)`, and the final message assertion. Only the unreachable diagnostic changes from “above” to “earlier.”
- The service-test hunks change only comment words at `tests/service/OllamaProvider.test.ts:156`, `tests/service/budget.test.ts:176`, `tests/service/compaction.test.ts:226`, `tests/service/lifecycle.test.ts:179`, and `tests/service/tools.test.ts:356`.
- No other test hunk changes an assertion, callback, fixture, case title, control-flow token, or value consumed by a test.

Bound: the diagnostic is a runtime string, so the original comment-only description was false. The corrected ruling is narrow and does not authorize another executable test edit.

## O-HOST — CONFIRMED

Attack: determine whether the retained header edit removes package behavior and whether replacing the obsolete drop-in host would force the Ollama-specific assertions to disappear.

Evidence:

- `tests/guides.test.ts:1-3` changes only the header comment. The shared parity loop at `tests/guides.test.ts:140-258` and the Ollama-specific flagship cases at `tests/guides.test.ts:261-288` remain unchanged.
- The package-specific cases are outside the shared drop-in body. A native `GuideCommand` entry can replace the shared command host while retaining the surface, method, drift, example, import, link, test-link, and flagship assertions as requirements. No candidate edit couples those assertions to `scripts/docs.ts` bytes.
- `.orkestrel/campaign/docs-parity/evidence/d7n-ollama-host-readonly/guides.log.txt` records the retained package-specific guide suite passing on the former host. This is historical coverage evidence only.

Bound: the old entry currently fails before Vitest because it imports `@src/server` in direct Node execution. Native entry adoption must repair that host boundary and preserve the named assertions. This audit does not accept the successor implementation in advance.

## O-CUSTODY — CONFIRMED

Attack: compare the live status with the retained return and the landing exception, then check whether any receipt is being promoted beyond its stated time and scope.

Evidence:

- `tmp/pass/d7n-ollama-release-initial/status-before.txt` lists only `guides/ollama.md`, the named `src/server` documentation files, `tests/guides.test.ts`, `tests/setup.test.ts`, and the named service-test comment files. It equals `.orkestrel/campaign/docs-parity/d7n-ollama-converge-fix-return.status.txt`.
- `.orkestrel/campaign/docs-parity/d7n-landing-ollama-scope-check-report.md` binds the extra test paths to the `ollama:fix:` tuple while leaving the existing tracked-path, explicit-commit, identity, and retention controls in place.
- The historical host receipts under `.orkestrel/campaign/docs-parity/evidence/d7n-ollama-host-readonly` support the original correction but are not current release proof.
- The current root chain in `tmp/pass/d7n-ollama-return-gates` records exit `0` for format check, lint check, type check, build, source tests, setup tests, and policy tests. `npm test` exits `1` at the unchanged generated `tests/config.test.ts` expectation for `policy(no-mocking)`; `tmp/pass/d7n-ollama-return-config-alone` reproduces that same generated-host failure. The candidate changes neither that file nor the policy configuration.

Bound: the generated-host failure remains a required supported repair before a later full-chain or release claim. It does not falsify acceptance of this unchanged documentation candidate as the committed baseline requested here. Nothing in this verdict waives the native migration, the live service suite, final prepublish, packing, registry evidence, or independent review of later source.

## Outside findings

No substantiated finding falls inside this acceptance unit beyond the already bounded `tests/setup.test.ts` diagnostic correction. Historical report wording remains non-authoritative and may be annotated without changing product files.

VERDICT: PASS
