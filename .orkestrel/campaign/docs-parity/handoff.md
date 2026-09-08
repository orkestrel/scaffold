# Handoff — the docs-parity fleet pass (D7.n)

Written 2026-09-08T03:35Z and revised 2026-09-08T04:05Z at the owner's request, for a session on a fresh Windows host that starts with scaffold alone. Read in this order: this file, `d7-fleet-plan.md`, `rulings.md` (Rulings 8 to 28), `ledger.md` (the last rows), then `/home/user/scaffold/AGENTS.md` and `.agents/orchestration.md`. Every artifact this file names sits in `.orkestrel/campaign/docs-parity/` in the scaffold repository unless a path says otherwise.

## Where everything is pushed

| Repository | Branch | Tip | Notes |
| --- | --- | --- | --- |
| `orkestrel/scaffold` | `claude/orkestrel-npm-audit-deps-14ibta` (the working branch), `main`, and `claude/docs-parity-windows-01a0810d` (the designated branch) | the commit carrying this file | push each named ref at the same tip; the campaign folder is the record |
| `orkestrel/guide` | `claude/orkestrel-npm-audit-deps-14ibta` | `1d5afa3` | `main` stays at `d3ee1bb` until every package has moved (Ruling 8); the final tarball is packed from this tip |
| `orkestrel/<package>` for every package in the table that follows | `claude/orkestrel-npm-audit-deps-14ibta` | per the table | pushed to `main` as each closes |

Branch URLs follow one pattern: `https://github.com/orkestrel/<repo>/tree/claude/orkestrel-npm-audit-deps-14ibta`.

## Owner rulings in force

The Windows continuation uses session `01a0810d-21bf-7f60-8534-488348e05743` and the
`Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743` trailer. See
`d7n-windows-bootstrap-report.md` for host evidence, route liveness, and bootstrap state.
The retained container instruments and briefs stay unchanged; dispatch their ported copies.

The Windows bootstrap is complete. The packed guide and every unclosed package's installed
guide have dist hash prefix `2b76b363`. Probe's retained tip `135aab7` packs version `0.0.13`,
not the container recipe's `0.0.12`; database uses that actual tarball with `--no-save`.
The native objective route is live. The Workflow launch was rejected with
`Review dynamic workflow before running`; no workflow started. Package writers now run
serially through the working CLI route. See `d7n-windows-bootstrap-report.md`.

- Ruling 8 (verbatim in `rulings.md`): every package converges under the guide head start (the packed tip `0.0.18`, installed `--no-save`), each pushed to its branch and `main` as it closes; the guide publishes only after every package has moved; then re-pin, bump, and publish in catalog layer order.
- Publishing is the owner's decision and credential. Nothing publishes until the owner says so. Never substitute a token or an auth file; never read or copy a secret.
- Push all to `main`: a fleet package pushes `git push -u origin claude/orkestrel-npm-audit-deps-14ibta` then `git push origin HEAD:main` when closed. Scaffold pushes its working branch, `main`, and the designated branch at the same tip. Always address a checkout with `git -C <path>`; a bare `git push origin HEAD:main` in the wrong checkout was rejected once this session and must not be relied on to fail.
- The permission system denies discard-class git commands (`checkout`, `restore`, `stash`, `reset`, `clean`, `branch -f`, `rm -rf` in a compound); undo an edit by editing.
- Commit as `git -c user.name=Claude -c user.email=noreply@anthropic.com`, with `Co-Authored-By: Claude <noreply@anthropic.com>` and the current session's `Claude-Session` trailer declared in this section. Do not reuse a retained unit's session trailer. Keep model identifiers out of pushed artifacts outside the required commit trailer. Stage by path, never `git add -A`.
- Never edit a vendored file inside a target (`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, `scripts/docs.ts`, `.claude/settings.json`).
- Never state a count in prose, in a guide, a brief, a ledger row, or a reply.
- When an owner commit moves a package's `main` under the branch, merge `origin/main` into the branch (never rewrite history), regenerate a conflicted lockfile with `PATH=/opt/npm11/bin:$PATH npm install --package-lock-only`, re-check, then push.
- Orchestration: one writer per checkout; every brief is a file under `tmp/units/` before launch and is retained here; Sol (Codex) is dark, so the objective lane runs on the Opus `reviewer` and every round records the substitution; a fix round closes with a `checker` over its diff and a `verifier` over the whole chain against the final tarball; a whole-suite or timing red is re-run alone by the Orchestrator; Ultracode is on (Workflows for fan-outs, two concurrent agents per workflow on the four-CPU container); no role installs.

## Recreating the working environment on the next host

The next session starts on a Windows host with only scaffold cloned under a `WebstormProjects` folder, and nothing from this container survives: no fleet checkouts, no `node_modules`, no `tmp/`, no scratchpad, no tarballs, no journals. Everything the pass needs is either committed in this campaign folder or rebuilt by the scripts below. Run every multi-step command as a script file, one plain command per shell call, because heredocs, `&&` chains, and `${…}` arguments trip the Windows approval classifier (`.agents/orchestration.md` § Launching). Use Git Bash and forward-slash paths throughout (`/c/Users/NAME/WebstormProjects/…`).

### Layout and variables

| Variable | Meaning | Example |
| --- | --- | --- |
| `SCAFFOLD` | the scaffold checkout | `/c/Users/NAME/WebstormProjects/scaffold` |
| `FLEET` | the folder holding every package checkout as `$FLEET/<pkg>`; the `WebstormProjects` folder itself | `/c/Users/NAME/WebstormProjects` |
| `SCR` | the pass scratch directory, outside every repository or under scaffold's git-ignored `tmp/` | `/c/Users/NAME/WebstormProjects/scaffold/tmp/pass` |

Export the three in the shell that runs each script (a `pass-env.sh` under `$SCR` that the session sources is the simplest carrier).

### The record's paths are container-form

Every retained brief, report, verdict, and instrument names this container's paths: `/home/user/scaffold`, `/home/user/fleet/<pkg>`, the scratchpad under `/tmp/claude-0/…`, and the npm prefix `PATH=/opt/npm11/bin:$PATH`. Never edit the retained copies. `instruments/d7/pass/port-paths.mjs` rewrites one file's paths from those variables (longest prefix first, the npm prefix dropped); `port-instruments.sh` ports every instrument into `$SCR`; `port-brief.sh <unit>` ports a retained brief into `$SCAFFOLD/tmp/units/` for dispatch. Dispatch only ported briefs, and check the ported copy before launching (the executor rules on what it opens).

| Container form | Host form |
| --- | --- |
| `/home/user/scaffold` | `$SCAFFOLD` |
| `/home/user/fleet/<pkg>` | `$FLEET/<pkg>` |
| `/tmp/claude-0/…/scratchpad/docs/d7/pass` | `$SCR` |
| `/tmp/claude-0/…/scratchpad/ts6/pack/orkestrel-probe-0.0.12.tgz` | `$SCR/packed/orkestrel-probe-0.0.12.tgz` |
| `PATH=/opt/npm11/bin:$PATH npm …` | `npm …` with npm 11 or later on `PATH` |
| `/home/user/scaffold/tmp/units/<unit>-brief.md` | the retained `.orkestrel/campaign/docs-parity/<unit>-brief.md`, ported by `port-brief.sh` into `$SCAFFOLD/tmp/units/` |

### Bootstrap, in order

1. Confirm the toolchain: `node --version` (22.13 or later), `npm --version` (11 or later; upgrade with `npm install -g npm@11` if older), `git --version`, `python3 --version` or `py -3 --version` (`gen-close-succ.py` is the one Python instrument; the rest are Bash and Node). Probe bench liveness per `.agents/orchestration.md` § Execution loop and record the result; Codex was dark all campaign and the objective lane ran on the Opus `reviewer`.
2. Export `SCAFFOLD`, `FLEET`, `SCR`; run `bash $SCAFFOLD/.orkestrel/campaign/docs-parity/instruments/d7/pass/port-instruments.sh` (creates `$SCR/{land,headstart,packed,lanes,p23}` and `$SCAFFOLD/tmp/units`, and writes every ported instrument into `$SCR`).
3. Run `bash $SCR/clone-fleet.sh`: clones every package of the pass and the guide beside scaffold on `claude/orkestrel-npm-audit-deps-14ibta` and runs `npm ci --ignore-scripts` in each (each install log lands in `$SCR/clone/<pkg>.log.txt`, outside every checkout). Supervisor is outside the pass and is not cloned. Verify each tip against the state table.
4. Run `bash $SCR/pack-heads.sh`: builds and packs the guide (`0.0.18` from `1d5afa3`) and probe (`0.0.12`, database's second head start) into `$SCR/packed`, and prints the guide's `dist/src/core/index.js` hash, which must read `2b76b363`. A different hash means the guide checkout is not at `1d5afa3` or its install differs; stop and diagnose before installing anything.
5. Run `bash $SCR/head-start.sh <pkg>` in every package that is not yet closed, and confirm `sha256sum $FLEET/<pkg>/node_modules/@orkestrel/guide/dist/src/core/index.js | cut -c1-8` reads `2b76b363` there.
6. In every unclosed package run `git -C $FLEET/<pkg> merge-base --is-ancestor origin/main HEAD`; where it fails, `main` moved under the branch: merge `origin/main` into the branch first (the lockfile rule in § Owner rulings). mcp is known to have moved.
7. Record the new session's designated scaffold branch in this file's first table and in the ledger, and push scaffold to it beside the working branch and `main`.

### Instruments (ported copies in `$SCR`)

- `head-start.sh <pkg>` installs the tarballs `--no-save` and logs to `$SCR/headstart/<pkg>.log.txt`.
- `land-p1.sh <pkg>` commits a prep unit; `land-p2.sh <pkg> [fix]` commits a converge or fix unit by path; `land-close.sh <pkg> [n]` commits a closing unit. Each writes `$SCR/land/<pkg>-<stage>.{log,diff,status}.txt`, copied into this folder as `d7n-<pkg>-<unit>.{diff,status}.txt`.
- `gen-verify.sh <pkg>` writes `tmp/units/d7n-<pkg>-verify-brief.md`; `gen-close-check.sh <pkg>` writes the checker brief over a closing unit; `gen-audit.sh <slice> <pkgs…>` writes audit briefs; `gen-close2.sh <pkg>` lists a package's closing items; `gen-close-succ.py` wrote the `close-2`/`close-3` briefs.
- `extract-lanes.mjs <journal> <outdir> <prefix>` splits a Workflow journal (under the session's `subagents/workflows/<runId>/journal.jsonl`) into one file per returned lane; `p23b-parity-controls.sh` runs the parity controls (A to H) against a package.
- `port-paths.mjs`, `port-instruments.sh`, `port-brief.sh`, `clone-fleet.sh`, `pack-heads.sh`: the porting and bootstrap set described earlier.

### Dispatch shapes

An audit workflow runs, per package, a subjective `reviewer` lane and an objective `reviewer` lane (Opus, the recorded substitution) plus a `checker` (Sonnet), blind and clean, on the ported `d7n-<pkg>-audit-brief.md`; a closure workflow runs a `checker` on the ported check brief and a `verifier` on the ported `d7n-<pkg>-verify-brief.md` in parallel; a fix round is one `implementer` (Opus) dispatch on the ported `d7n-<pkg>-converge-fix-brief.md`. Every launch prompt names the role, the engine, the ported brief path, the checkout and its tip, the standing conditions, and the report path `$SCAFFOLD/tmp/units/<unit>-report.md`; every returned report, diff, and status is copied into this folder before the next lane opens it.

## The loop per package

prep (`d7n-<pkg>-prep`) → converge (`d7n-<pkg>-converge`) → parity controls (P23b) → audit (three lanes) → verdict and fix brief → fix round → head-start with the final tarball → closure (checker + verifier) → closure verdict → push the branch and `main`. Every artifact of every stage is retained here under `d7n-<pkg>-*`.

## Package state at handoff

Tips are the branch tips as pushed. "on main" means the branch tip is `main`.

| Package | Tip | State | Next |
| --- | --- | --- | --- |
| abort, browser, budget, codec, console, contract, csv, emitter, form, html, indexeddb, interpret, markdown, msg, ndjson, pool, process, qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, table, template, test, timeout, tool, websocket, worker, workspace | see `ledger.md` | closed, on `main`, closure verdict written | nothing until the closing sweep's tail |
| middleware | `5747e3f` | closed, on `main` (`d7n-middleware-closure-verdict.md`) | nothing |
| brief | `2660b0a` | closed on `main` at `3849b1d`; `close-3` landed after it; its re-closure lanes were terminated by the usage limit | dispatch the closure again: checker on `d7n-brief-close-3-check-brief.md`, verifier on `d7n-brief-verify-brief.md`; then push `main` |
| toolbox | `f8175e9` | fix round and `close-2` landed; closure checker PASS (`d7n-toolbox-closure-checker-toolbox.md`); verifier terminated | run the verifier on `d7n-toolbox-verify-brief.md` (head-start first); write the closure verdict; push `main` |
| lsp | `c4842c8` | fix round and `close-2` landed; both closure lanes terminated | dispatch the closure: checker on `d7n-lsp-check-brief.md` (the fix round's check brief, which carries the closing items; `d7n-lsp-close-2-brief.md` is the successor it covers), verifier on `d7n-lsp-verify-brief.md`; verdict; push `main` |
| database | `cdbf66a` | `close-2` landed; owner main merged; prior verifier green; the canon finding remains open; Ruling 20 stays unchanged | dispatch `d7n-database-canon-brief.md` to move the compiler-derived surface into its consuming package case; then checker and verifier; verdict; push `main` |
| probe | `93fc01d` | resumed test-draft correction landed and branch pushed; scoped gates green; type-load fixture retained by d7n-probe-heavy-ruling-verdict.md after a separate host run; clean; main still b816749 | write the audit-item check brief and generate verification against the final guide artifact; full closure and main push remain pending |
| agent | `305af91` | fix landed and campaign branch pushed; root host readings passed, including comment-only scope, stable docs directions, core tests, and opening-header comparison; main unchanged | install the accepted final guide artifact; audit-item checker and whole-chain verifier; closure verdict; refresh main ancestry; push main |
| ollama | `98e9c34` | read/edit-only successor returned; uncommitted candidate and report retained; root scoped host chain passed; the retained container partial diff was not applied | scope review and remaining landing readings; landing; aligned final-artifact closure |
| workflow | `1151786` | audit reconciled (`d7n-workflow-audit-verdict.md`, items WF1 to WF7); fix brief written | dispatch `d7n-workflow-converge-fix-brief.md` (implementer, Opus); head-start first (its installed guide is the older pack); then as agent |
| program | `a60327f` | audit reconciled (`d7n-program-audit-verdict.md`, items PF1 to PF8); fix brief written | dispatch `d7n-program-converge-fix-brief.md` (implementer, Opus); head-start first; then as agent |
| terminal | `0b01536` | retained audit lanes reconciled in `d7n-terminal-audit-verdict.md`; checker recorded as not run | dispatch `d7n-terminal-converge-fix-windows-brief.md`; then checker and verifier; verdict; push `main` |
| mcp | `a01d5e8` | owner main merged; scoped merge checks passed; branch pushed; audit reconciled in `d7n-mcp-audit-verdict.md`; checker recorded as not run | dispatch `d7n-mcp-converge-fix-windows-brief.md`; closure; push `main`; guide-reader referral remains separate |
| supervisor | `edf80e6` (`main`) | outside the pass; the owner's API-adoption decision is pending (`d7-fleet-plan.md` § For the owner) | nothing in this campaign |
| guide | `1d5afa3` | reader candidate returned; focused red and green recorded; review corrections remain; config failure traced to file-URL versus relative-path comparison; candidate retained, not committed or packed | authorized canonical scaffold correction is in flight; resolve the gate and retained review findings, then pack and revalidate the aligned fleet |

## The tail, after every package closes

The owner's subsequent layered-artifact instruction adds the prerequisite recorded in
d7n-layer-alignment-plan.md. Before treating a package as release-ready, verify its
runtime, development, peer, optional, and bundled Orkestrel closure against accepted
artifacts. Existing parity closures retain their source verdicts but do not prove that
new closure. Reconcile the measured dependency graph with this retained publication
sequence before freezing release manifests; publication is still unapproved.

1. `d7n-pilot-pin-brief.md` (implementer, Opus, in abort): a summary pin and a methods pin in the pilot's `tests/guides.test.ts`, red-first through scratch controls. Dispatch only after every package above is on `main`.
2. Propagate the pin (builder per package, the drop-in region byte-equal to the pilot's), a verifier per package, push each to `main`.
3. Push the guide's branch to `main`; the owner publishes `@orkestrel/guide` 0.0.18.
4. Scaffold re-pins the guide; each package `npm ci`, re-pins `^0.0.18`, bumps; scaffold releases; `scaffold catalog` sweep; publishes in catalog layer order (`.claude/agents/orkestrel.md`) on the owner's go-ahead, through the `orkestrel-publish` skill.
5. Sweep `tmp/units` and the journals; prune the campaign folder per `orkestrel-debrief` § retention.

## Reader correction in the Windows continuation

Read `d7n-guide-heading-referral.md` and `d7n-guide-heading-objective-report.md`.
The runtime reproduction on installed hash `2b76b363` loses a class table's Summary
when a preceding demonstration heading embeds its class code token. The owner directed
continuation after the referral and owner-main reconciliation. Follow Ruling 8: correct
the reader, review the change, record the replacement packed artifact and its measured
hash, then revalidate the fleet. Do not reuse an old-artifact closure as proof of the
replacement. No replacement is installed yet. Publication still needs an explicit go-ahead.

The returned candidate and its evidence are retained in d7n-guide-heading-fix-verdict.md
and the evidence directory. Independent review requires prose and fixture corrections.
Root's full gate chain and isolated rerun fail in the vendored configured-policy case.
The host observation in d7n-guide-config-diagnosis.md shows that the rule fires, but its
file-URL filename does not equal the relative filename the test expects. The earlier
description of an omitted diagnostic is superseded. A canonical scaffold correction
was authorized by the owner on 2026-09-08. Follow d7n-scaffold-path-plan.md for the
isolated canonical correction and propagation preparation; publication remains unapproved.
Never edit the vendored target file. The old head-start artifact remains installed.

## Pending owner decisions carried from the container

Listed in `d7-fleet-plan.md` § For the owner: supervisor's API-adoption campaign; template's missing sections; implementing-class member blocks; the `--to source` seed guard; timeout's Contract shape; the scaffold findings carried in `d7-fleet-plan.md` § Findings carried (the voice rule's hyphenated-token and noun-opener cases, `land-p1.sh`'s omission of newly tracked files, the seed's trailing empty comment line and empty-cell write, the config test's shared temp-dir cross-talk, the `in order to` sweep sense); the reader limitations carried to the guide package (both-absent pairs, a name exported by more than one face collapsing to one row, underscore identifiers, inherited-member duplication, the line-end hyphen, overload collapse).
