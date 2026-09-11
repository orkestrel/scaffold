I'll read the brief and the grok-bridge rules first so I can run this as a read-only scout.I'll load the required rules and campaign files, then gather live local state for each named package.Next Iâ€™ll read the campaign brief, publish/align references, and locate each packageâ€™s retained d7n packets.Iâ€™ll take local git and manifest readings next, then match them against the retained d7n packets.The bulk git sweep was blocked, so Iâ€™ll take each checkout separately and pull catalog plus packet text next.Shell is available; Iâ€™ll take git and installed-version readings from each checkout, then the retained packets.Sibling greps missed `GuideCommand`; Iâ€™ll read those test files and the remaining packets directly.Checking a few remaining packet absences and installed Guide barrel exports so the matrix stays exact.Dependent runtime packages still sit on campaign branch `claude/orkestrel-npm-audit-deps-14ibta` with drop-in `tests/guides.test.ts` files and `scripts/docs.ts`. No native `GuideCommand` entry, no native-source packet, and no registry packet exists for Brief, MCP, Middleware, Program, Worker, or Workflow. Preceding runtime-layer handoff text still defers them: `.orkestrel/campaign/docs-parity/d7n-upper-layer-prepared.md:11`.

Live `git status --porcelain` was not obtained (sibling `git` invocations were rejected). Local refs below are from each checkoutâ€™s `.git` files, not a fresh fetch.

Catalog table used as recorded evidence only: `.claude/agents/orkestrel.md:50`, `:66-67`, `:74`, `:95-96` (Brief `0.0.7`, MCP `0.0.28`, Middleware `0.0.19`, Program `0.0.12`, Worker `0.0.11`, Workflow `0.0.17`, all L4). Local manifests sit one patch ahead of those rows.

---

### Brief (`C:/Users/mikes/WebstormProjects/brief`)

| Field | Evidence |
| --- | --- |
| Manifest | `@orkestrel/brief` `0.0.8` (`package.json:2-3`). Runtime: `contract ^0.0.16`, `emitter ^0.0.9`, `interpret ^0.0.12`, `reason ^0.0.9` (`:75-79`). No `peerDependencies` / `optionalDependencies`. Dev pins: `guide ^0.0.17`, `probe ^0.0.12`, `scaffold ^0.0.63`, `test ^0.0.13`, `oxfmt ^0.66.0`, `oxlint ^1.81.0`, `typescript ^6.0.3`, `vite ^8.2.2`, `vitest ^4.1.11` (`:80-91`). Scripts include `test:guides` and `docs` via `scripts/docs.ts` (`:57-72`). |
| Installed | Guide `0.0.18`, Scaffold `0.0.63`, Contract `0.0.16`, Emitter `0.0.9`, Interpret `0.0.12`, Reason `0.0.9`, Test `0.0.13`, Probe `0.0.12`, oxlint `1.81.0`, oxfmt `0.66.0`, typescript `6.0.3`, vitest `4.1.11`, vite `8.2.2`. |
| Git (live refs) | Branch `claude/orkestrel-npm-audit-deps-14ibta` tracks `origin/claude/orkestrel-npm-audit-deps-14ibta` (`.git/HEAD`, `.git/config:11-13`). HEAD `2660b0a6bd89d7f11884451a644b82fab1a52d95`. `origin/main` `3849b1d104450e2b3953491c5347a5da23f16318` (`.git/packed-refs:4`). Clone reflog is that HEAD only (`.git/logs/HEAD:1`). `origin/HEAD` â†’ `origin/main`. HEAD â‰  `origin/main`. Ancestry unknown (no merge-base). Porcelain dirty paths unknown. |
| `GuideCommand` | Absent. Drop-in helpers `createGuide` / `findDrift` (`tests/guides.test.ts:6-21`). `scripts/docs.ts` present (`scripts/docs.ts:1-11`). Installed Guide `0.0.18` barrel exports `createGuide` (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts:324`); no `GuideCommand` symbol in that file. |
| Retained accepted | Closure verdict at tip `3849b1d`, checker PASS, verifier `GATES: GREEN` (`.orkestrel/campaign/docs-parity/d7n-brief-closure-verdict.md:7-9`). Verifier recorded clean tree at that tip (`d7n-brief-verify-report.md:7-8`). Live HEAD is not `3849b1d`. |
| Retained open | Audit items BR1â€“BR12 were carried into `d7n-brief-converge-fix-brief.md` (`d7n-brief-audit-verdict.md:7-21`). Close-3 recorded dirty `guides/brief.md` (`d7n-brief-close-3.status.txt:1`). Working tree still has the close-3 guard-table sentence (`guides/brief.md:235`). Native/registry preparation unpacketed. |
| Absent packets | Native-source / registry-prep / registry-release. Live porcelain status. |

---

### MCP (`C:/Users/mikes/WebstormProjects/mcp`)

| Field | Evidence |
| --- | --- |
| Manifest | `@orkestrel/mcp` `0.0.29` (`package.json:2-3`). Runtime: `codec ^0.0.2`, `contract ^0.0.16`, `emitter ^0.0.9`, `process ^0.0.10`, `sse ^0.0.6`, `tool ^0.0.13`, `websocket ^0.0.11` (`:98-105`). Peers: `router ^0.0.13`, `server ^0.0.18` (`:125-128`). No `optionalDependencies`. Dev pins include `guide ^0.0.17`, `scaffold ^0.0.63`, `probe ^0.0.12`, `test ^0.0.13` (`:107-123`). `docs` still `scripts/docs.ts` (`:96`). |
| Installed | Guide `0.0.18`, Scaffold `0.0.63`, Codec `0.0.2`, Emitter `0.0.9`, Process `0.0.10`, SSE `0.0.6`, Tool `0.0.13`, Websocket `0.0.11`, Router `0.0.13`, Server `0.0.18`. |
| Git (live refs) | Same campaign branch (`.git/HEAD`, `.git/config:11-13`). HEAD `a01d5e872ace90034c991d61b236df6915128178`. Loose `origin/claude/orkestrel-npm-audit-deps-14ibta` matches HEAD. Packed `origin/main` `292c966574f6a7f552e2cc17a990484591d52bde`. Reflog: clone at `425faf7`, then merge commit `a01d5e8` â€œMerge the owner's main changes before continuing docs parityâ€ (`.git/logs/HEAD:1-2`, `.git/COMMIT_EDITMSG:1`). Scout names that merge as P.2 `425faf7` with owner main `292c966` (`d7n-mcp-reconciliation-scout-result.txt`). Merge status recorded staged `guides/mcp.md`, `src/core/MCPLegacy.ts`, `tests/src/core/MCPLegacy.test.ts` (`d7n-mcp-windows-merge.status.txt:1-3`). Live porcelain unknown. |
| `GuideCommand` | Absent. Drop-in helpers (`tests/guides.test.ts:38-52`). `scripts/docs.ts` present. Merge log still ran `npm run docs` through that launcher (`d7n-mcp-windows-merge.log.txt:15-16`). |
| Retained accepted | None as a closure verdict. Owner-main merge is recorded as landed at `a01d5e8` and as preserving legacy progress-stream behavior (`d7n-mcp-audit-verdict.md:8-10`). |
| Retained open | Audit: keep round open; checker not run; close only after checker covers M1â€“M9 and a verifier run (`d7n-mcp-audit-verdict.md:3-6`, `:12-22`, `:43-45`). Fix brief `d7n-mcp-converge-fix-windows-brief.md` exists; no fix report. |
| Absent packets | `d7n-mcp-audit-checker-*`, `d7n-mcp-check-brief.md`, `d7n-mcp-verify-brief.md` / report, `d7n-mcp-close-brief.md`, `d7n-mcp-closure-verdict.md`, `d7n-mcp-converge-fix-report.md`, native/registry packets. |

---

### Middleware (`C:/Users/mikes/WebstormProjects/middleware`)

| Field | Evidence |
| --- | --- |
| Manifest | `@orkestrel/middleware` `0.0.20` (`package.json:2-3`). Runtime: `abort ^0.0.9`, `budget ^0.0.9`, `contract ^0.0.16`, `timeout ^0.0.9` (`:90-94`). Peers: `database ^0.0.13` (optional), `server ^0.0.18` (`:112-119`). Dev: `guide ^0.0.17`, `scaffold ^0.0.63`, `probe ^0.0.12`, `test ^0.0.13` (`:96-110`). |
| Installed | Guide `0.0.17` (verify report recorded `0.0.18` at `d7n-middleware-verify-report.md:17-25`), Scaffold `0.0.63`, Abort `0.0.9`, Budget `0.0.9`, Timeout `0.0.9`, Database `0.0.13`, Server `0.0.18`. |
| Git (live refs) | Campaign branch. HEAD `5747e3f325e3dbbc216c45bbe94b89eed9944121` equals packed `origin/main` and packed `origin/claude/orkestrel-npm-audit-deps-14ibta`. Clone reflog is that SHA only. Porcelain unknown. |
| `GuideCommand` | Absent. Drop-in helpers (`tests/guides.test.ts:6-20`). `scripts/docs.ts` present. |
| Retained accepted | Closure at `5747e3f`, verifier `GATES: GREEN`; checker FAIL on report prose only; ruling â€œclosed; the fix report annotatedâ€ (`d7n-middleware-closure-verdict.md:7-8`). Live HEAD matches that tip. |
| Retained open | Audit carry-outs MF1â€“MF11 were the fix round (`d7n-middleware-audit-verdict.md:11-23`). Closure still records coverage findings for later (`d7n-middleware-closure-verdict.md:9`). Native/registry unpacketed. Live Guide install is `0.0.17`, not the verify-time `0.0.18` head-start. |
| Absent packets | Native-source / registry packets. Live porcelain. |

---

### Program (`C:/Users/mikes/WebstormProjects/program`)

| Field | Evidence |
| --- | --- |
| Manifest | `@orkestrel/program` `0.0.13` (`package.json:2-3`). Runtime: `contract ^0.0.16`, `emitter ^0.0.9`, `qualifier ^0.0.13`, `rater ^0.0.13`, `reason ^0.0.9` (`:80-85`). No peers/optional. Dev: `guide ^0.0.17`, `scaffold ^0.0.63`, `probe ^0.0.12`, `test ^0.0.13` (`:87-98`). |
| Installed | Guide `0.0.18`, Scaffold `0.0.63`, Qualifier `0.0.13`, Rater `0.0.13`. |
| Git (live refs) | Campaign branch. HEAD `a60327f89069248ae7cb9d21c128692a86570cb5` (audit P.2, `d7n-program-audit-verdict.md:1`). `origin/main` `32cef62de0956f7c9df75c1f2b0c508e30250a3e`. HEAD â‰  `origin/main`. Ancestry unknown. Clone reflog is HEAD only. Porcelain unknown. |
| `GuideCommand` | Absent. Drop-in helpers (`tests/guides.test.ts:18-31`). `scripts/docs.ts` present. |
| Retained accepted | Prep and converge reports exist. Converge started from `f2ca5ee` (`d7n-program-converge-report.md:5`). No closure verdict. |
| Retained open | Audit FAIL; items PF1â€“PF8 carried by `d7n-program-converge-fix-brief.md` from tip `a60327f` (`d7n-program-audit-verdict.md:11-20`; `d7n-program-converge-fix-brief.md:5`, `:11-20`). Guard-table sentence still concatenated with the interface sentence (`guides/program.md:222`), which is the PF4/close condition in that fix brief (`d7n-program-converge-fix-brief.md:16`). No fix report under campaign or `tmp/units`. |
| Absent packets | `d7n-program-converge-fix-report.md` / diff / status, `d7n-program-check-brief.md`, verify, close, closure, native/registry. |

---

### Worker (`C:/Users/mikes/WebstormProjects/worker`)

| Field | Evidence |
| --- | --- |
| Manifest | `@orkestrel/worker` `0.0.12` (`package.json:2-3`). Runtime: `contract ^0.0.16`, `database ^0.0.13`, `emitter ^0.0.9`, `pool ^0.0.10`, `queue ^0.0.12` (`:86-91`). No peers/optional. Dev: `guide ^0.0.17`, `scaffold ^0.0.63`, `probe ^0.0.12`, `test ^0.0.13` (`:93-104`). |
| Installed | Guide `0.0.17` (closure verifier recorded `0.0.18` at `d7n-worker-closure-verifier-worker.md:5`), Scaffold `0.0.63`, Database `0.0.13`, Pool `0.0.10`, Queue `0.0.12`. |
| Git (live refs) | Campaign branch. HEAD `021c8ad05dc62bb8a05c3143f17fee7b54055e7b` equals packed `origin/main`. Clone reflog is that SHA. Porcelain unknown. |
| `GuideCommand` | Absent. Drop-in helpers (`tests/guides.test.ts:6-20`). `scripts/docs.ts` present. |
| Retained accepted | Closure at `021c8ad`, checker PASS, verifier `GATES: GREEN` (`d7n-worker-closure-verdict.md:7-9`; `d7n-worker-closure-verifier-worker.md:24`). Live HEAD matches. |
| Retained open | Audit K1â€“K8 were the fix round (`d7n-worker-audit-verdict.md:11-20`). Native/registry unpacketed. Live Guide install is `0.0.17`, not verify-time `0.0.18`. |
| Absent packets | `d7n-worker-verify-report.md` as a named campaign file (verifier body is `d7n-worker-closure-verifier-worker.md`). Native/registry packets. Live porcelain. |

---

### Workflow (`C:/Users/mikes/WebstormProjects/workflow`)

| Field | Evidence |
| --- | --- |
| Manifest | `@orkestrel/workflow` `0.0.18` (`package.json:2-3`). Runtime: `abort ^0.0.9`, `budget ^0.0.9`, `contract ^0.0.16`, `database ^0.0.13`, `emitter ^0.0.9`, `queue ^0.0.12`, `timeout ^0.0.9` (`:94-101`). No peers/optional. Dev: `guide ^0.0.17`, `scaffold ^0.0.63`, `probe ^0.0.12`, `test ^0.0.13` (`:103-116`). |
| Installed | Guide `0.0.18`, Scaffold `0.0.63`, Abort `0.0.9`, Database `0.0.13`, Queue `0.0.12`. |
| Git (live refs) | Campaign branch. HEAD `1151786257b9b29f219f2b5d2d119d0b44424769` (audit P.2, `d7n-workflow-audit-verdict.md:1`). `origin/main` `f1f2d65af351e0adfc97b7a09b74f9b3abba721c`. HEAD â‰  `origin/main`. Ancestry unknown. Clone reflog is HEAD only. Porcelain unknown. |
| `GuideCommand` | Absent. Drop-in helpers (`tests/guides.test.ts:22-35`). `scripts/docs.ts` present. |
| Retained accepted | Prep and converge reports exist. Converge from `84c043f`, uncommitted as that brief required (`d7n-workflow-converge-report.md:3`). No closure verdict. |
| Retained open | Audit FAIL; WF1â€“WF7 carried by `d7n-workflow-converge-fix-brief.md` from tip `1151786` (`d7n-workflow-audit-verdict.md:11-19`; `d7n-workflow-converge-fix-brief.md:5`, `:13-19`). `### Shapes` still uses the constants sentence (`guides/workflow.md:185`, `:362`) rather than the WF1 replacement named in the fix brief. No fix report. |
| Absent packets | `d7n-workflow-converge-fix-report.md` / diff / status, check, verify, close, closure, native/registry. |

---

### Shared release-state facts

- Local runtime ranges still match the recorded catalogâ€™s older L3 pins (Interpret `^0.0.12`, Qualifier/Rater `^0.0.13`, Queue `^0.0.12`, Server peer `^0.0.18`, Scaffold `^0.0.63`). Upper-layer prepared text names registry Guide `0.0.18` and Scaffold `0.0.64` plus native `tests/guides.test.ts` (`d7n-upper-layer-prepared.md:5`).
- `wave.md` still requires re-pin to registry carets after the previous layer publishes (`.agents/skills/orkestrel-publish/references/wave.md:13`, `:35-36`, `:111-113`).
- Guides maps exist (`guides/README.md` in each subject). Matching guides are `guides/brief.md`, `guides/mcp.md`, `guides/middleware.md`, `guides/program.md`, `guides/worker.md`, `guides/workflow.md`.
- Ollama was not read.

---

### Unknowns

- Live `git status --porcelain` dirty paths for Brief, MCP, Middleware, Program, Worker, Workflow.
- Merge-base of HEAD vs `origin/main` for Brief, Program, Workflow.
- Whether Brief HEAD `2660b0a` contains the `3849b1d` closure tree.
- MCP checker distillate; `d7n-mcp-converge-fix-windows` execution report.
- `d7n-program-converge-fix-report.md` and `d7n-workflow-converge-fix-report.md`.
- Served registry packuments after the owner upload (local refs and catalog only; no fetch).