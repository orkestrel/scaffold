# Browse 9–10 report

Stopped under the fourth brief’s deviation contract. Its premise that the chmod read-refusal assertion holds on both hosts is contradicted by the runtime probe. Existing item 9 and C5 edits remain untouched and uncommitted. Item 10 is not started. No commit was created in this run.

Report written to [tmp/codex/browse-9-10-4-report.md](/C:/Users/mikes/WebstormProjects/browser-wt-browse/tmp/codex/browse-9-10-4-report.md).

## Deviation

- **Expected:** gate the permission-mode assertion on a runtime probe while preserving the read-refusal assertion as valid on both hosts; complete portability commit A, then item 9 commit 1 and item 10 commit 2 after their gates.
- **Found:** on this Windows host, `chmod(file, 0)` reads back mode 292 (`0444`), and `readFile(file, 'utf8')` still succeeds with the original bytes. Gating only the mode assertion leaves the test’s required `EACCES` assertion false.
- **Evidence:** `node tmp/codex/portability-capabilities.ts` exited 0. Before chmod, the read returned `control`; after chmod, the probe returned `{"probe":"chmod 000 read refusal","mode":292,"reading":{"value":"control"},"control":"read before chmod returned control"}`. The existing child fixture in `tests/src/server/stores/suite.ts:479` asserts mode 0, followed at line 480 by `assert.rejects(readFile(path), { code: 'EACCES' })`.
- **Done / not done:** read the earlier briefs and reports, checked the branch and preserved edits, and probed filesystem capabilities. No source or test file was changed in this run. No portability repair, readiness probe, gate chain, commit, item 10 implementation, push, publication, installation, discovery invocation, or subagent dispatch occurred. The deviation contract requires stopping on this conflict.
- **Hypothesis:** preserving a permission-refusal proof on this host requires a separately probed access-denial mechanism rather than chmod mode bits.

Earlier test results are carried from their reports; they were not rerun in run 4.

| Run | Outcome |
| --- | --- |
| 1 | F1–F12 repairs and F13’s test remained uncommitted. Core gate stopped at C5: 1,199 passed, 1 failed. The scaffold discovery command also failed parsing optimizer output as JSON. |
| 2 | Repaired C5 and proved its mutation. Core gate passed 1,200 tests. Browser gate stopped at the brand assertion: 238 passed, 1 failed, 1 skipped. |
| 3 | Committed the browser-brand repair as `ce66ba336cb072a2f5c3adfd605aed4e32dd0737`. Browser gate passed 239 tests with 1 skipped. Server gate stopped with 235 passed, 11 failed, 3 skipped. |
| 4 | Filesystem probe disproved the chmod read-refusal premise. Stopped before editing tracked files. |

## Commit A: Windows portability

Commit A is **not created**. The runtime probe command for this table is `node tmp/codex/portability-capabilities.ts`, exit 0. Its readings apply to this Windows process; no Linux execution occurred in this run.

| Case | Classification | Probe and control | Repair | Red-before and green-after |
| --- | --- | --- | --- | --- |
| Lock-directory release | Product defect confirmed by run 3’s isolated test and the filesystem probe | `rmdir` of an existing regular file throws `ENOENT`; bytes remain. Control: an empty directory removes successfully. | Not implemented | Run 3 isolated test: 1 failed, 16 deselected; exit 1. No green-after. |
| Failed rename cleanup | Product error-classification mismatch; Windows step returns `EPERM` | Renaming a file over a nonempty directory throws `EPERM`. Control: renaming the same file to an unused file path succeeds and preserves its bytes. | Not implemented; cross-host error mapping remains unproved | Run 3 server gate: named test fails, expected `BROWSER_JOURNEY_FILE`, received `BROWSER_JOURNEY_ACCESS`. No green-after. |
| Readiness after stderr closes | Product-versus-fixture classification unresolved | No readiness probe ran before the stop. | Not implemented | Run 3 server gate: named test fails with the 10,000 ms deadline instead of early refusal. No green-after. |
| chmod permission proof | Host capability contradicts the brief’s refusal premise | Mode 0 reads back `0444`, and the file remains readable. Control: the same bytes are readable before chmod; mode is restored afterward. | Not implemented; gating mode alone cannot preserve the asserted read refusal | Run 3 server gate: named test fails at mode assertion. Run 4 probe exposes the additional read-refusal conflict. No green-after. |
| Journey-store linked components | Link creation is host-limited; directory-link equivalent available | File and directory symlink creation throw `EPERM`. Junction creation succeeds; `lstat` identifies it as a link while identifying its target as an ordinary directory. | Not implemented; refusal through a junction remains unproved | Run 3 server gate: named test fails creating a link. No green-after. |
| Run-store capture links | Same probed file/directory link capabilities | File symlink: `EPERM`; directory symlink: `EPERM`; junction: created and identified by `lstat`, with ordinary-directory control. | Not implemented | Run 3 server gate: named test fails creating a link. No green-after. |
| Run-store clear links | Same probed directory-link capabilities | Directory symlink: `EPERM`; junction succeeds with the preceding control. | Not implemented | Run 3 server gate: named test fails creating a link. No green-after. |
| Run-store delete links | Same probed directory-link capabilities | Directory symlink: `EPERM`; junction succeeds with the preceding control. | Not implemented | Run 3 server gate: named test fails creating a link. No green-after. |
| Run-store run-file links | File-symlink creation unavailable to this process | File symlink creation throws `EPERM`; ordinary target-file reads succeed. | Not implemented; no conditional skip added | Run 3 server gate: named test fails creating a link. No green-after. |
| File-store temporary link | File-symlink creation unavailable to this process | File symlink creation throws `EPERM`; ordinary target-file reads succeed. | Not implemented; no conditional skip added | Run 3 server gate: named test fails creating a link. No green-after. |
| File-store root alias | Directory-link equivalent available | Directory symlink: `EPERM`; junction succeeds and passes the link/ordinary-directory discrimination control. | Not implemented; store behavior through a junction remains unproved | Run 3 server gate: named test fails creating a link. No green-after. |

The run 3 isolated release command was:

```text
npx vitest run --config vite.config.ts --project src:server tests/src/server/stores/FileBrowserStore.test.ts -t 'names the directory with ACCESS'
```

## Browser-brand host-independence commit

Commit `ce66ba336cb072a2f5c3adfd605aed4e32dd0737` is **Repair host independence in unchanged browser transport tests**.

The unchanged transport test expected `/Chrom/` but the real CDP round trip returned `Edg/154.0.4258.53`. The repair compares the product with the endpoint’s independent HTTP `/json/version` answer and checks the product, protocol version, revision, JavaScript version, and user-agent shape. Node-side setup supplies the HTTP reading. Production transport code is unchanged.

The run 3 evidence is recorded here.

| Command or control | Result |
| --- | --- |
| `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/transports/SocketCDPTransport.test.ts -t 'carries a CDP client'`, original assertion | Exit 1; 1 failed, 7 deselected |
| `node tmp/codex/socket-mutation.ts`, replace decoded CDP result with `{}` | Targeted test exits 1; 1 failed, 7 deselected |
| Same runner after restoring production code, full transport file | Exit 0; 8 passed; runner exits 0 |
| `npx vitest run --config vite.config.ts --project setup tests/setupGlobal.test.ts` | Exit 0; 9 passed |
| `npx tsc --noEmit --project tsconfig.json` | Exit 0 |
| `git diff --check` | Exit 0 |

## Item 9 findings

These preserved repairs come from run 1. Documentation-only findings have no red/green mutation count; the guide gate has not been reached.

| Finding | Repair |
| --- | --- |
| F1 | Corrected `boundBrowserText` remarks: view-bearing action and dialog receipts use the view footer; other results, including look and read, use the cut footer. |
| F2 | Added matching headers exceeding half the room and the whole room, and a header that fits without a row. |
| F3 | Added popup look paging with a move note, body bound, outline-only end offset, and continuation-prefix assertion. |
| F4 | Added the exact Enter receipt with both the no-submission status and focused textbox. |
| F5 | Added referenced text/generic controls, distinct-word ties, and Unicode matches for `Zurück` and `日本語`. |
| F6 | Corrected the guide’s tool-copy bound to 6,050. |
| F7 | Added look to limit error sources and documented the look/read next-character refusal. |
| F8 | Corrected the argument-validation example to `call look with what and offset.` |
| F9 | Aligned the cut-footer descriptions in the helper, constant, and guide. |
| F10 | Named dialog beside action receipts in the footer constant, toolset documentation, and guide. |
| F11 | Documented the line-break-past-start condition, window-end fallback, surrogate-pair preservation, and final endpoint. |
| F12 | Replaced the possessive code token with “the `what` parameter of a `look` call” and corrected the legend wording. |
| F13 | Retained the regression test; the specified sequence did not reproduce stale focus. No production repair. |

Each following mutation ran this command under the mutation and after restoration:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/FILE.test.ts -t "FILTER"
```

| Finding / mutation | FILE | FILTER | Red | Green |
| --- | --- | --- | --- | --- |
| F2: bypass header-fit check | BrowserToolset | omits an oversized | 1 failed; exit 1 | 1 passed; exit 0 |
| F2: compare header against whole room | BrowserToolset | omits an oversized | 1 failed; exit 1 | 1 passed; exit 0 |
| F2: remove block’s blank line | BrowserToolset | omits an oversized | 1 failed; exit 1 | 1 passed; exit 0 |
| F3: omit note-length subtraction | BrowserToolset | shares the look | 1 failed; exit 1 | 1 passed; exit 0 |
| F4: reverse status and focus | BrowserToolset | places the focus | 1 failed; exit 1 | 1 passed; exit 0 |
| F4: join clauses with comma | BrowserToolset | places the focus | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: remove StaticText exclusion | helpers | never matches an ignored | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: remove omitted-role exclusion | helpers | never matches an ignored | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: count repeated search words | helpers | counts distinct | 1 failed; exit 1 | 1 passed; exit 0 |
| F5: replace Unicode letters with ASCII | helpers | counts distinct | 1 failed; exit 1 | 1 passed; exit 0 |

The run 1 runners `node tmp/codex/item9-mutations.ts` and `node tmp/codex/item9-mutations.ts --green` exited 0. The F3 mutation produced a 544-character body against a 500-character limit. Literal mutations and outputs remain in that script and `tmp/codex/F*-red.log` / `F*-green.log`. All mutations were restored.

## C5 repair

Run 2 replaced per-iteration delays with a deferred resolved by the request’s send handler. A subsequent protocol reply forms a completion barrier before the fresh response. The test retains all 1,000 ID reuses and its 5,000 ms budget, with no remaining delay or polling loop.

The mutation changes response retention from membership in `#awaiting` to membership in `#pending`, permitting a foreign response outside the reply window to settle a fresh invocation. The targeted red/green command was:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/BrowserRegistry.test.ts -t "C5 drops foreign responses"
```

The recorded results are:

| Reading | Result |
| --- | --- |
| Original test, run 1 | Exit 1; 1 failed from the 5,000 ms timeout |
| Repaired test with retention mutation | Exit 1; 1 failed, 18 deselected; expected fresh, received stale |
| Restored production code | Exit 0; 1 passed, 18 deselected; 75 ms test duration |
| `npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserRegistry.test.ts` | Exit 0; 19 passed |
| Core gate, runs 2 and 3 | Exit 0; 1,200 passed each |

The runner `node tmp/codex/c5-mutation.ts` exited 0. Its script and `C5-red.log` / `C5-green.log` hold the evidence. The repair remains uncommitted.

## F13 ruling

Run 1’s real Chromium test names `e2 textbox "Child"` when the child input is focused. Focusing the parent button changes the child document’s active element to its body and names `e1 button "Parent"`. Blurring the parent yields undefined focus.

The assumed control that the child retains its input failed: 1 failed, exit 1. Updating that observation to the body’s actual state while preserving the focus assertions passed: 1 passed, exit 0. Both used:

```text
npx vitest run --config vite.config.ts --project src:browser tests/src/browser/elements/BrowserDOMElementManager.test.ts -t 'discards stale focus'
```

The specified sequence does not justify a production focus change. This reading does not establish behavior on every Chromium version.

## Item 10 rulings

Item 10 has no probe, implementation, documentation edit, roadmap edit, or red/green result because its preceding work has not cleared the gates.

| Ruling | Repair and red/green status |
| --- | --- |
| Row state format, order, and shared renderer | Not started; no commands or counts |
| Preserve CDP capture behavior | Not started; no commands or counts |
| DOM token/state mapping, native select/options, and summary exclusion | Not started; no commands or counts |
| Role restrictions for each state | Not started; no commands or counts |

## Gate results and commits

Earlier reports record npm 12.0.2 and bare gate output. Each earlier chain stopped at its first failure. Run 4 stopped at the capability conflict before any gate. Commit A, commit 1, and commit 2 have no completed gate chain.

| Command | Commit 1 candidate, run 1 | Commit 1 candidate, run 2 | Commit 1 candidate, run 3 | Run 4: A / 1 / 2 |
| --- | --- | --- | --- | --- |
| `npm run format:check` | Exit 0 | Exit 0 | Exit 0 | Not run |
| `npm run lint:check` | Exit 0 | Exit 0 | Exit 0 | Not run |
| `npm run check` | Exit 0 | Exit 0 | Exit 0 | Not run |
| `npm run test:src:core` | Exit 1; 1,199 passed, 1 failed | Exit 0; 1,200 passed | Exit 0; 1,200 passed | Not run |
| `npm run test:src:browser` | Not run | Exit 1; 238 passed, 1 failed, 1 skipped | Exit 0; 239 passed, 1 skipped | Not run |
| `npm run test:src:server` | Not run | Not run | Exit 1; 235 passed, 11 failed, 3 skipped | Not run |
| `npm run test:src:bin` | Not run | Not run | Not run | Not run |
| `npm run test:guides` | Not run | Not run | Not run | Not run |
| `npm run test:policy` | Not run | Not run | Not run | Not run |
| `npm run test:setup` | Not run | Not run | Not run | Not run |
| `npm run test:setup:browser` | Not run | Not run | Not run | Not run |
| `npm run build` | Not run | Not run | Not run | Not run |
| `npm run test:service` | Not run | Not run | Not run | Not run |
| `git diff --check` | Exit 0 | Exit 0 | Exit 0 after stop | Not run |

No commit 2 gate ran in any run. Earlier gate evidence is in `tmp/codex/item9-gates.*`, `item9-2-gates.*`, and `item9-3-gates.*`.

The commit status is:

- Browser-brand host-independence commit: `ce66ba336cb072a2f5c3adfd605aed4e32dd0737`.
- Commit A, Windows portability: **not created**.
- Commit 1, item 9 findings and C5: **not created**.
- Commit 2, item 10: **not created**.

HEAD remains `ce66ba336cb072a2f5c3adfd605aed4e32dd0737` on `ccr-d15a48b1-yyyll6`. Final `git status --porcelain` remains nonempty with the preserved edits:

```text
 M guides/browser.md
 M src/core/BrowserToolset.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M tests/src/browser/elements/BrowserDOMElementManager.test.ts
 M tests/src/core/BrowserRegistry.test.ts
 M tests/src/core/BrowserToolset.test.ts
 M tests/src/core/helpers.test.ts
```