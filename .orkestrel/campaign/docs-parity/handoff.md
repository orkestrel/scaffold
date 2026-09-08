# Handoff — the docs-parity fleet pass (D7.n)

Written 2026-09-08T03:35Z at the owner's request, for a session on a fresh container. Read in this order: this file, `d7-fleet-plan.md`, `rulings.md` (Rulings 8 to 28), `ledger.md` (the last rows), then `/home/user/scaffold/AGENTS.md` and `.agents/orchestration.md`. Every artifact this file names sits in `.orkestrel/campaign/docs-parity/` in the scaffold repository unless a path says otherwise.

## Where everything is pushed

| Repository | Branch | Tip | Notes |
| --- | --- | --- | --- |
| `orkestrel/scaffold` | `claude/orkestrel-npm-audit-deps-14ibta` (the working branch), `main`, and `claude/orkestrel-fleet-campaign-complete-hh0qks` (the designated branch) | the commit carrying this file | all three refs pushed at the same tip; the campaign folder is the record |
| `orkestrel/guide` | `claude/orkestrel-npm-audit-deps-14ibta` | `1d5afa3` | `main` stays at `d3ee1bb` until every package has moved (Ruling 8); the final tarball is packed from this tip |
| `orkestrel/<package>` for every package in the table that follows | `claude/orkestrel-npm-audit-deps-14ibta` | per the table | pushed to `main` as each closes |

Branch URLs follow one pattern: `https://github.com/orkestrel/<repo>/tree/claude/orkestrel-npm-audit-deps-14ibta`.

## Owner rulings in force

- Ruling 8 (verbatim in `rulings.md`): every package converges under the guide head start (the packed tip `0.0.18`, installed `--no-save`), each pushed to its branch and `main` as it closes; the guide publishes only after every package has moved; then re-pin, bump, and publish in catalog layer order.
- Publishing is the owner's decision and credential. Nothing publishes until the owner says so. Never substitute a token or an auth file; never read or copy a secret.
- Push all to `main`: a fleet package pushes `git push -u origin claude/orkestrel-npm-audit-deps-14ibta` then `git push origin HEAD:main` when closed. Scaffold pushes its working branch, `main`, and the designated branch at the same tip. Always address a checkout with `git -C <path>`; a bare `git push origin HEAD:main` in the wrong checkout was rejected once this session and must not be relied on to fail.
- The permission system denies discard-class git commands (`checkout`, `restore`, `stash`, `reset`, `clean`, `branch -f`, `rm -rf` in a compound); undo an edit by editing.
- Commit as `git -c user.name=Claude -c user.email=noreply@anthropic.com`, with the trailers `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB`; no model identifier elsewhere in a pushed artifact. Stage by path, never `git add -A`.
- Never edit a vendored file inside a target (`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, `scripts/docs.ts`, `.claude/settings.json`).
- Never state a count in prose, in a guide, a brief, a ledger row, or a reply.
- When an owner commit moves a package's `main` under the branch, merge `origin/main` into the branch (never rewrite history), regenerate a conflicted lockfile with `PATH=/opt/npm11/bin:$PATH npm install --package-lock-only`, re-check, then push.
- Orchestration: one writer per checkout; every brief is a file under `tmp/units/` before launch and is retained here; Sol (Codex) is dark, so the objective lane runs on the Opus `reviewer` and every round records the substitution; a fix round closes with a `checker` over its diff and a `verifier` over the whole chain against the final tarball; a whole-suite or timing red is re-run alone by the Orchestrator; Ultracode is on (Workflows for fan-outs, two concurrent agents per workflow on the four-CPU container); no role installs.

## Recreating the working environment

1. Clone the fleet: for each package in the table, `git clone -b claude/orkestrel-npm-audit-deps-14ibta https://github.com/orkestrel/<pkg> /home/user/fleet/<pkg>`, then `PATH=/opt/npm11/bin:$PATH npm ci --ignore-scripts` inside it. Clone the guide the same way. Supervisor is outside the pass and needs no clone.
2. npm 11 lives at `/opt/npm11/bin` (`npm install --prefix /opt/npm11 -g npm@11`); every `npm test`, `npm run docs`, and install in the fleet ran under `PATH=/opt/npm11/bin:$PATH`.
3. Pack the final guide tarball: in the guide checkout at `1d5afa3`, `npm ci --ignore-scripts && npm run build && npm pack --pack-destination <SCR>/packed`, giving `orkestrel-guide-0.0.18.tgz`. Confirm `sha256sum dist/src/core/index.js | cut -c1-8` reads `2b76b363`; that hash identifies the final pack in every checkout.
4. Pack probe's tip for database: in the probe checkout, `npm run build && npm pack`, giving `orkestrel-probe-0.0.12.tgz`; `head-start.sh` installs it beside the guide tarball for database only (its `EXTRA` variable names the path).
5. The pass instruments are retained under `instruments/d7/pass/`. Copy them to a scratchpad directory, set the `SCR=` line in each script to that directory, and `mkdir -p $SCR/{land,headstart,packed,lanes,p23}`. Scripts and their jobs:
   - `head-start.sh <pkg>` installs the tarball `--no-save` and logs to `$SCR/headstart/<pkg>.log.txt`.
   - `land-p1.sh <pkg>` commits a prep unit ("Prepare"); `land-p2.sh <pkg> [fix]` commits a converge or fix unit by path; `land-close.sh <pkg> [n]` commits a closing unit. Each writes `$SCR/land/<pkg>-<stage>.{log,diff,status}.txt`, which are copied here as `d7n-<pkg>-<unit>.{diff,status}.txt`.
   - `gen-verify.sh <pkg>` writes `tmp/units/d7n-<pkg>-verify-brief.md`; `gen-close-check.sh <pkg>` writes the checker brief over a closing unit; `gen-audit.sh <slice> <pkgs…>` writes audit briefs; `gen-close2.sh <pkg>` lists a package's closing items; `gen-close-succ.py` wrote the `close-2`/`close-3` briefs.
   - `extract-lanes.mjs <journal> <outdir> <prefix>` splits a Workflow journal into one file per returned lane; `p23b-parity-controls.sh` runs the parity controls (A to H) against a package.
6. Workflows used: an audit workflow runs, per package, a subjective `reviewer` lane and an objective `reviewer` lane (Opus, the recorded substitution) plus a `checker` (Sonnet), blind and clean, on `d7n-<pkg>-audit-brief.md`; a closure workflow runs a `checker` on `d7n-<pkg>-check-brief.md` (or the `close-2-check` brief) and a `verifier` on `d7n-<pkg>-verify-brief.md` in parallel. Fix rounds are single `implementer` (Opus) dispatches on `d7n-<pkg>-converge-fix-brief.md`. Every launch prompt names the role, the engine, the brief path, the checkout and its tip, the `PATH` rule, the standing conditions, and the report path `tmp/units/<unit>-report.md`.

## The loop per package

prep (`d7n-<pkg>-prep`) → converge (`d7n-<pkg>-converge`) → parity controls (P23b) → audit (three lanes) → verdict and fix brief → fix round → head-start with the final tarball → closure (checker + verifier) → closure verdict → push the branch and `main`. Every artifact of every stage is retained here under `d7n-<pkg>-*`.

## Package state at handoff

Tips are the branch tips as pushed. "on main" means the branch tip is `main`.

| Package | Tip | State | Next |
| --- | --- | --- | --- |
| abort, browser, budget, codec, console, contract, csv, emitter, form, html, indexeddb, interpret, markdown, msg, ndjson, pool, process, qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, table, template, test, timeout, tool, websocket, worker, workspace | see `ledger.md` | closed, on `main`, closure verdict written | nothing until the closing sweep's tail |
| middleware | `5747e3f` | closed, on `main` (`d7n-middleware-closure-verdict.md`) | nothing |
| brief | `2660b0a` | closed on `main` at `3849b1d`; `close-3` landed after it; its re-closure lanes were terminated by the usage limit | dispatch the closure again: checker on `d7n-brief-close-3-check-brief.md`, verifier on `d7n-brief-verify-brief.md`; then push `main` |
| toolbox | `f8175e9` | fix round and `close-2` landed; closure checker PASS (`d7n-toolbox-closure-checker-toolbox.md`); verifier terminated | run the verifier on `d7n-toolbox-verify-brief.md`; write the closure verdict; push `main` |
| lsp | `c4842c8` | fix round and `close-2` landed; both closure lanes terminated | dispatch the closure: checker on `d7n-lsp-close-2-check-brief.md`, verifier on `d7n-lsp-verify-brief.md`; verdict; push `main` |
| database | `cdbf66a` | `close-2` landed; owner's `57eb898` merged; verifier GREEN; checker FAIL 2,3 (`d7n-database-closure-checker-database.md`) | rule on claim 3: database's `tests/guides.test.ts` carries `entrySurfaces`, `requireDirectorySurface`, and a loop-scoped `surface` between `const root` and the manifest loop, deriving per-entry surfaces the single-barrel pilot has no need of. Decide whether Ruling 20's canon admits a multi-entry derivation (write it as Ruling 29 if so) or the file must fold the derivation into cases; then re-run the checker on the ruling; verdict; push `main` |
| probe | `135aab7` | fix round landed; owner's `b816749` merged; the `d7n-probe-tests` builder was terminated and left a clean tree | dispatch `d7n-probe-tests-brief.md` (builder, Sonnet) again; land by path with a "Replace the suite's candidate drafts…" message; head-start; write `d7n-probe-check-brief.md` (items from `d7n-probe-audit-verdict.md`) and `gen-verify.sh probe`; closure; push `main` |
| agent | `54e7199` | audit reconciled (`d7n-agent-audit-verdict.md`, items A1 to A9); the fix unit was terminated before editing (clean tree) | dispatch `d7n-agent-converge-fix-brief.md` (implementer, Opus); land with `land-p2.sh agent fix`; head-start; check brief + verify brief; closure; push `main` |
| ollama | `98e9c34` | audit reconciled (items O1 to O10); the fix unit was terminated at item 3 with partial edits, retained as `d7n-ollama-converge-fix.partial.diff.txt` and not applied | dispatch `d7n-ollama-converge-fix-brief.md` again from the clean tip (the partial diff is evidence of the first two items' wording, not a patch to apply); then as agent |
| workflow | `1151786` | audit reconciled (`d7n-workflow-audit-verdict.md`, items WF1 to WF7); fix brief written | dispatch `d7n-workflow-converge-fix-brief.md` (implementer, Opus); head-start first (its installed guide is the older pack); then as agent |
| program | `a60327f` | audit reconciled (`d7n-program-audit-verdict.md`, items PF1 to PF8); fix brief written | dispatch `d7n-program-converge-fix-brief.md` (implementer, Opus); head-start first; then as agent |
| terminal | `0b01536` | audit lanes returned: subjective FAIL 5 9 12, objective FAIL 5 12 (`d7n-terminal-audit-{subjective,objective}.md`); the checker was terminated | reconcile the two lanes into `d7n-terminal-audit-verdict.md` recording the checker as not run (or re-run it on `d7n-terminal-audit-brief.md`); write the fix brief; head-start; then as agent |
| mcp | `425faf7` | audit lanes returned: subjective FAIL 3 5 9 12, objective FAIL 3 5 9 12 (`d7n-mcp-audit-{subjective,objective}.md`); the checker was terminated; `main` moved under the branch (owner's `292c966`) | merge `origin/main` into the branch first (lockfile rule earlier in this file); reconcile; fix brief (its browser-face `createWebSocketClientTransport` row is uncompared by the reader — a standing condition, see the audit brief); head-start; then as agent |
| supervisor | `edf80e6` (`main`) | outside the pass; the owner's API-adoption decision is pending (`d7-fleet-plan.md` § For the owner) | nothing in this campaign |
| guide | `1d5afa3` | branch pushed; `main` waits | see the tail |

## The tail, after every package closes

1. `d7n-pilot-pin-brief.md` (implementer, Opus, in abort): a summary pin and a methods pin in the pilot's `tests/guides.test.ts`, red-first through scratch controls. Dispatch only after every package above is on `main`.
2. Propagate the pin (builder per package, the drop-in region byte-equal to the pilot's), a verifier per package, push each to `main`.
3. Push the guide's branch to `main`; the owner publishes `@orkestrel/guide` 0.0.18.
4. Scaffold re-pins the guide; each package `npm ci`, re-pins `^0.0.18`, bumps; scaffold releases; `scaffold catalog` sweep; publishes in catalog layer order (`.claude/agents/orkestrel.md`) on the owner's go-ahead, through the `orkestrel-publish` skill.
5. Sweep `tmp/units` and the journals; prune the campaign folder per `orkestrel-debrief` § retention.

## Pending owner decisions

Listed in `d7-fleet-plan.md` § For the owner: supervisor's API-adoption campaign; template's missing sections; implementing-class member blocks; the `--to source` seed guard; timeout's Contract shape; the scaffold findings carried in `d7-fleet-plan.md` § Findings carried (the voice rule's hyphenated-token and noun-opener cases, `land-p1.sh`'s omission of newly tracked files, the seed's trailing empty comment line and empty-cell write, the config test's shared temp-dir cross-talk, the `in order to` sweep sense); the reader limitations carried to the guide package (both-absent pairs, a name exported by more than one face collapsing to one row, underscore identifiers, inherited-member duplication, the line-end hyphen, overload collapse).
