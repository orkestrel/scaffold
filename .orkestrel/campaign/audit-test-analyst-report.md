1. **BROKEN** — `createLink` implements the stated fallback, but its file-source test asserts only that some `Error` is thrown. Replacing the original `EPERM` with a new error would still pass, so the original-error requirement is not pinned (`src/server/helpers.ts:82`, `tests/src/server/helpers.test.ts:225`). The test must assert the surfaced error’s `EPERM` identity or distinguishing properties.

2. **CONFIRMED** — The guides parity project passed all 13 tests. Added contracts reside in the matching `types.ts`, collections are readonly, entity members are single words, helpers follow verb-noun naming, and each environment barrel exports its full surface (`src/core/index.ts:1`, `src/browser/index.ts:1`, `src/server/index.ts:1`).

3. **CONFIRMED** — The core project passed 67 tests. Executed cases covered zero and exhausted budgets, intervals, attempts, abort reasons, descriptions, and event cleanup. `waitForEvent` calls `subscribe` once and invokes returned cleanup from `finally` (`src/core/helpers.ts:150`, `tests/src/core/helpers.test.ts:313`).

4. **CONFIRMED** — The core project passed the decoder cases. CRLF is stripped, LF separates physical lines, and the final unterminated line is parsed (`src/core/helpers.ts:215`, `tests/src/core/helpers.test.ts:374`). The guide makes no lone-CR claim.

5. **BROKEN** — Probe input: a valid `ScratchInterface` whose `destroy()` always throws `Error('programmer fault')`, with `{ budget: 20, interval: 5 }`. The probe passed only after observing multiple attempts, an exhaustion wrapper, and the original fault as `cause`; it was not rethrown. `destroyScratch` catches every fault without classifying it (`src/server/helpers.ts:358`). Retry only documented transient faults and rethrow every other value unchanged.

6. **CONFIRMED** — The browser project passed 130 tests. The readers directly consult the exported `CONTENT_ROLES`, `FIELD_ROLES`, `HEADER_ROLES`, and `IMPLICIT_ROLES`; the browser barrel exports those same constants (`src/browser/helpers.ts:561`, `src/browser/helpers.ts:600`, `src/browser/index.ts:1`).

7. **CONFIRMED** — The browser project passed the compositing and contrast cases. `readBackdrop` composites layers in the correct order, `contrast` detects an unpainted stack by floor identity, and the luminance and ratio equations match WCAG 2.x (`src/browser/helpers.ts:917`, `src/browser/helpers.ts:942`, `src/browser/helpers.ts:973`, `src/browser/helpers.ts:1017`).

8. **CONFIRMED** — The browser project passed capture success, element capture, byte comparison, and failing-size cases. `captureFrame` honors all `FrameOptions` fields and calls `releasePane` from an enclosing `finally`, including when staging, capture, path verification, or readback fails (`src/browser/helpers.ts:1308`).

9. **CONFIRMED** — The browser project passed journal forwarding, restart, identity restoration, stopped recording, and post-stop failure cases. Listener removal uses an aborted controller, while `clearStorage` clears exactly both storage areas and `extractOrphans` starts its ancestor search at the parent (`src/browser/factories.ts:104`, `src/browser/helpers.ts:834`, `src/browser/helpers.ts:1169`).

10. **CONFIRMED** — A repository-wide search found no mock, spy, module replacement, or fake-clock use in the subject proofs. Matches occurred only in configuration tests that verify the mocking-policy rule. The source projects passed against real timers, files, sockets, loopback servers, DOM, and Chromium.

11. **BROKEN** — The guides project passed 13 parity and fence tests, but the claim overstates their reach. The guide contains backticked names that are not package exports, including `performance.now()` (`guides/test.md:12`). The parity suite checks surface rows, barrels, interface methods, links, and fence imports—not every backticked name (`tests/guides.test.ts:47`). Narrow the claim to package API references or tag and validate that population explicitly.

12. **CONFIRMED** — The server project reported `107 passed | 9 skipped`. Filesystem gates are derived from executed host-capability probes for file links, directory links, permission bits, case sensitivity, and raw-byte filenames (`tests/setupServer.ts:23`). The remaining platform gates select mutually exclusive host-specific removal behavior.

13. **CONFIRMED** — Executed manifest inspection reported `VERSION=0.0.7`, `PREPACK=npm run build`, zero local references in all three dependency sections, `FILES=dist/src,README.md`, and exports for `.`, `./browser`, `./server`, and `./package.json` (`package.json:3`, `package.json:13`, `package.json:21`, `package.json:79`).

14. **BROKEN** — A bounded repository search found no supervisor import, path, or source identifier, but found two explicit supervisor references in the package guide (`guides/test.md:910`, `guides/test.md:913`). Replace those provenance-specific names with generalized fleet-consumer descriptions.

Findings outside the claims: none.

VERDICT: FAIL — 4 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims