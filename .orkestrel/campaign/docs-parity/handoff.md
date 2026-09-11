# Handoff — the docs-parity fleet pass (D7.n)

Written 2026-09-08T03:35Z and revised 2026-09-08T04:05Z at the owner's request, for a session on a fresh Windows host that starts with scaffold alone. Read in this order: this file, `d7-fleet-plan.md`, `rulings.md` (Rulings 8 to 28), `ledger.md` (the last rows), then `/home/user/scaffold/AGENTS.md` and `.agents/orchestration.md`. Every artifact this file names sits in `.orkestrel/campaign/docs-parity/` in the scaffold repository unless a path says otherwise.

## Where everything is pushed

### Current runtime release preparation

Use this table for the active release layer. Later preparation narratives and the
original campaign table are historical; their open states do not override this table.
The Guide-only root prompt.txt is consumed. Replace it only when this layer is ready.

| Package | Pending version | Current preparation state |
| --- | --- | --- |
| browser | 0.0.16 | Closed; clean canonical main at 02611821d50b0508b237684455944cccda31f696; campaign/main pushed; owner upload pending |
| interpret | 0.0.13 | Closed; clean canonical main at a3928145fac315c3b8ef43e53ebffc4442a49286; campaign/main pushed; owner upload pending |
| lsp | 0.0.7 | Closed; clean canonical main at d6543822b6c88201a96af0293123b2c3c60dc6b8; campaign/main pushed; owner upload pending |
| qualifier | 0.0.14 | Closed; clean canonical main at c10f4c8661b753f8b6eaf8caf96fe0fbb47ef158; campaign/main pushed; owner upload pending |
| queue | 0.0.13 | Closed; clean canonical main at 02df755da2b8dc8f324dfb58849504187ceab580; campaign/main pushed; owner upload pending |
| rater | 0.0.14 | Closed; clean canonical main at 394b1d6c014255847d45627d4a1b5708c5b2a14e; campaign/main pushed; owner upload pending |
| relation | 0.0.12 | Closed; clean canonical main at 1b212ca725e6b7f6b0d1fd5b664b05cc6769d27f; campaign/main pushed; owner upload pending |
| sea | 0.0.15 | Source landed at 8801aa0; registry preparation landed at b6a6f9e; final gates/pack passed; release review/main closure pending |
| server | 0.0.19 | Source landed at e53d01a; preparation gates passed; registry visit pending |
| terminal | 0.0.15 | Corrected source landed at 5577e42; preparation gates passed; registry visit pending |
| workspace | 0.0.8 | Source landed at a1322f0; preparation gates passed; registry visit pending |

Scaffold's root-generated catalog and Guide development re-pin moved its emitted
surface. Their retained follow-up is deferred to a later Scaffold release. Root
undid only those unaccepted generated edits by editing and rebuilt; manifest and
complete dist equal the accepted Scaffold0.0.64 archive again. Read
d7n-scaffold-generated-followup-ruling.md. Final fleet development alignment remains open.

### Published and historical campaign context

Scaffold0.0.64 is registry-confirmed at fa3c5177. Its downloaded archive equals
the accepted tarball. Read d7n-scaffold-registry-closure.md. The Scaffold operator
command is consumed and must not be rerun. Root has not authenticated or published.
Guide0.0.18 is registry-confirmed at ccd2a790 on clean canonical main. Its served
archive matches the prepared archive and npm's gitHead matches origin/main.
Read d7n-guide-registry-closure.md. The Guide-only prompt is consumed and must
not be rerun. Consumer visits use registry Guide0.0.18 and Scaffold0.0.64.
The remaining runtime layer stays open under d7n-upper-layer-plan.md.
Read d7n-upper-post-guide-state.md for the refreshed evidence and active units.

Browser0.0.16 preparation is closed on clean canonical main at
02611821d50b0508b237684455944cccda31f696. Campaign and origin/main match;
the accepted archive still equals its manifest and complete distribution.
Read d7n-browser-registry-release-landing.md. Owner publication remains pending.

Read d7n-native-preserved-source-landing.md and d7n-queue-rater-native-source-landing.md
for accepted Browser, Interpret, Qualifier, Queue, and Rater source preparation.
Their campaign branches are pushed. Final registry visits and main closures remain
open. Relation, SEA, Server, and Workspace received the accepted published-tooling
bootstrap; direct native execution reproduced their unresolved source-alias imports.
Their native migrations remain pending. The root generated catalog and Guide
development manifest edits remain uncommitted pending the tooling follow-up.

The following-layer uploads are registry-confirmed. Read
d7n-following-registry-closure.md. Its preparation table records published
releases. The predecessor prompt is consumed history and must not be rerun.

Upper preparation is in progress. Guide's refreshed runtime pins, prepublishOnly
and actual archive passed; its complete distribution remains byte-identical to
the accepted native-entry build. Scaffold's Git reader exceeded the unrelated
manifest capture limit as the campaign grew. The stream repair and the review's
leading-U+FEFF correction are implemented. Source review, independent/reused
objective release review, final root prepublish and actual packing passed. The
Scaffold0.0.64 archive is d7n-scaffold-upper-git-final-pack with SHA256
a4e7078da602619e54384dbc7bdddaf25a2fdc6af0842a55004b8328365b8be7. Release source landed
at d2175dfe on main and the named origin refs. Read
d7n-scaffold-upper-prepared-verdict.md and d7n-scaffold-upper-release-landing.md.

LSP0.0.7 release preparation is closed at d6543822b6c88201a96af0293123b2c3c60dc6b8.
The canonical checkout is clean on main; campaign and origin/main match. Its final
registry-backed prepublish/pack passed. Read d7n-lsp-registry-release-landing.md.
Owner publication remains pending. Browser, Interpret and Qualifier's returned
native entries passed independent source review and root preparation prepublish;
the reused objective source review is active. Their final registry visits remain
open. Queue and Rater's native entries returned green; Queue's root preparation
prepublish passed and Rater's is running. Read d7n-native-preserved-preparation-state.md.
Terminal's returned bounded docs/native fix awaits review and final preparation.
Its external writer hit the weekly limit without changing source, so the recorded
native substitution applies.

Guide preparation landed at f277b88bc1e8063521ce1acaa783913b0af1856a and is campaign-
pushed. Its refreshed Scaffold visit passed overwrite/audit/catalog but stopped
before lock and gates at the Scaffold guide mirror comparison. Offline overwrite
fetched no guide. Resume through the tooling-guide mirror successor, which uses
Materializer.mirror for the canonical Guide and Scaffold guide files. The target
remained clean at the preparation commit; do not repeat a preparation commit.

Use the locked upper tooling successor, not the predecessor's
--package-lock=false overlay. The LSP conformance case proved that the old flag
could select a newer external dependency than its tracked lock. The no-save
install without that flag preserved metadata and full tooling output and made
the unchanged conformance case pass. Read d7n-lsp-upper-native-verdict.md and
d7n-upper-overlay-lock-brief.md. The remaining selected package work is unchanged.

Fresh origin/main ancestry checks passed for the remaining roster. Ollama has
local source, guide and test changes; preserve them. The read-only scout is
d7n-upper-layer-scout-report.md. Its limits and current root evidence are in
d7n-upper-layer-evidence.md.

The owner completed the initial directory uploads. Fresh registry downloads are
byte-identical to the accepted Contract0.0.17, Codec0.0.3, Msg0.0.10, SSE0.0.7 and
Test0.0.14 archives. Their canonical checkouts remain clean on main. Read
d7n-initial-registry-closure.md and its retained digest evidence. The operator
handoff in d7n-next-layer-prepared.md was consumed and confirmed. The current
command and prepared layer are named below; obsolete publish.txt is removed.

The owner completed the next-layer uploads. Fresh registry downloads, their
digests and gitHead match the accepted archives and canonical main tips. Read
d7n-next-registry-closure.md. The following layer is now prepared and pushed,
with clean canonical main checkouts and successful post-closure output/ref
confirmation. Read d7n-following-layer-prepared.md. Root prompt.txt now names
that unpublished layer. Parser-only checking and actual-line independent/reused
objective review passed. The operator commit and named origin-ref pushes passed
at 0dc2fce0, including the existing obsolete publish.txt deletion. Read
d7n-following-operator-landing.md. Scaffold is clean on canonical local main.
The current preparation table supersedes the historical closing-sweep table
for these packages. The owner uploads; root has not authenticated or published.

| Package | Released version | Registry closure |
| --- | --- | --- |
| console | 0.0.13 | prepared at ed57bc7; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| database | 0.0.14 | prepared at 4453c26; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| form | 0.0.6 | prepared at 0f4f28d; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| markdown | 0.0.14 | prepared at 99978d8; final prepublish/pack accepted; Guide bootstrap dist unchanged; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| pool | 0.0.11 | prepared at 25ea973; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| process | 0.0.11 | prepared at ea3b717; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| reason | 0.0.10 | prepared at e7e318e; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| router | 0.0.14 | prepared at fbc69d7; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| table | 0.0.5 | prepared at f4805ea; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| template | 0.0.7 | prepared at c053c4d; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |
| websocket | 0.0.12 | prepared at cc62597; final prepublish/pack accepted; campaign/main pushed; clean canonical main; registry archive and gitHead confirmed |

The next-layer plan is d7n-next-layer-plan.md. Fresh origin/main readings require
no merges for its selected packages. Accepted tooling is installed throughout
that round; native-entry adoption precedes supported overwrite and release gates.
Every selected native entry, final preparation and source review is accepted.
Final prepublishOnly and packing passed. NDJSON and Tool needed serial
standalone reruns after overlapping generated scratch-directory checks failed;
the reruns and recovery packs passed without source changes. Every selected
package is pushed to campaign/main and clean on canonical local main. Root
prompt.txt was written after those closures and parsed without execution.
Those owner uploads are now registry-confirmed; root did not authenticate or upload.

The initial publish layer is prepared under the owner's narrowed scope in
Ruling 38. Read d7n-initial-layer-prepared.md for versions, exact archives and the
upload hold. Contract, Codec, Msg, SSE and Test are accepted, campaign/main pushed,
and clean on local main. Their current tooling, supported overwrite, regenerated
registry-valid locks, final prepublishOnly and packing passed. Their final
dist/src trees remain byte-equal to the retained foundation candidates. Root's
post-push artifact, manifest and ref confirmation passed. Read the package
d7n-<package>-publish-prepared-verdict.md and the state table for accepted tips.

The owner selected direct PowerShell directory uploads under Ruling 39. Read
d7n-initial-direct-prepublish-report.md. Fresh prepublishOnly runs passed in each
initial-layer canonical checkout on main, with unchanged release output. The
operator command changes into those directories, not tmp or an archive. The
owner reports completing login; root did not authenticate or upload. The owner
authorized archiving and removing the retired worktrees under tmp/pass. Root
pushed the verified recovery archive at b9e2b6a6 and removed scaffold-guides-entry
and scaffold-path. Their paths and Git registrations are absent. Read
d7n-retired-worktrees-cleanup-report.md. Scaffold's canonical checkout is on main. The
remaining fleet layers, Guide main and later runtime/dev re-pins remain open.

Guide's native entry and supported tooling are accepted and campaign-pushed at
327470a6e2e0c056c811e9f48a5ed429fe7ba70e. Its final ordered root gates passed,
and its rebuilt dist/src tree remains byte-equal to the accepted prior output.
Read d7n-guide-native-tooling-landing.md and d7n-guide-native-tooling-root-report.md.
The refreshed Guide0.0.18 archive is under tmp/pass/packed/d7n-guide-native-entry-final,
with SHA256 cc605b5bcfe6db1c86ab6cdfda6415879253b56cf5b4d5d0d325c19eb1b7eac7.
It is installed in Scaffold; full output identity and the native guides command
passed. The retired script and docs manifest key are removed through the accepted
ownership path and explicit maintainer edit. Resume package-native adoption and
tarball propagation in dependency order. Guide main and fleet release pins remain
pending. The accepted Guide API remains fixed.

Current continuation: work directly in the package repositories under
C:/Users/mikes/WebstormProjects. Rulings 33, 34, and 35 supersede the historical isolated
checkout instructions and launcher design. The predecessor scaffold candidate is
now visible in the direct checkout and its local gate chain passed, but the owner
rejected scripts/guides.ts. The replacement must put command handling, parity and
explicit authority-driven rewriting in tests/guides.test.ts. The corrected entry
is implemented in canonical scaffold and the reviewed ordered root gates passed.
The returned audit found an inherited-environment dispatch defect and a collision
between example titles and summary keys. Root reproduced them through the actual
command. The bounded successor is accepted at source level after objective and
mechanical PASS, independent Opus review, bounded wording integration and passing
final ordered gates. The owner then directed extraction of shared parity mechanics
into Guide, explicit Markdown reuse, and replacement of the retired-host list with
normal ownership cleanup. Product remains uncommitted during that revision. The owner
declared scripts scaffold-owned. That bounded source fix has returned; the permanent
directory-root proof passed independently on the host. Guide parity extraction has
returned and its final ordered root gates passed with the accepted Contract, HTML,
Markdown, and Test tarballs installed. A provisional extracted Guide tarball is
installed in scaffold; its supported guide mirror refresh completed. Scaffold's
thin-entry adoption has stopped at a shared-report coverage mismatch. Its real-command
regression is green, but the native guides gate is red. The reused objective analyst
has returned a bounded recommendation; the Opus design-question launch hit its weekly
limit and returned no answer. Product acceptance remains pending the boundary ruling,
replacement artifact, final gates, and independent review. Read
d7n-scaffold-parity-adopt-landing.md before continuing.
The capacity re-probe confirmed the Opus weekly-limit failure. The owner selected
a separate Astra reviewer; Ruling 37 records that substitution. The bounded
review returned and root reproduced the lost method-table and class-membership
assertions. The reconciled boundary is recorded in
d7n-parity-population-design-verdict.md. Guide's population successor and scaffold
adoption have returned. Guide's ordered root gates passed, its replacement archive
is installed in scaffold, and the canonical guides command is green. Root's final
scaffold chain exposed old scripts-ownership fixtures; the compiler and setup
fixture successors returned, and the final ordered root scaffold gates passed.
Read d7n-parity-population-landing.md for current source and artifact evidence.
Read d7n-guides-extraction-final-root-gates.md for the exact frozen-diff comparison.
The separate Astra actual-diff review and reused objective review have returned.
Read d7n-guides-extraction-final-verdict.md. Behavioral controls held; acceptance
is held for centralized helper placement and stale explanatory text. The bounded
Guide leaf/prose successor has returned. Its replacement archive is installed in
scaffold, the ordered root gates passed, and the independent Astra and reused
objective correction reviews passed. Read d7n-guides-extraction-leaves-verdict.md
and d7n-guides-extraction-leaves-root-report.md. Before product commit, the owner
reopened the thin-entry criterion: reusable command functions still remain local
in scaffold/tests/guides.test.ts. Root confirmed that createParity is used but the
command shell remains. Product commits and scaffold packing are held for the
bounded command-boundary follow-up. Read d7n-guides-command-boundary-brief.md.
The separate Astra design-fit recommendation and reused objective analysis have
returned. Read d7n-guides-command-design-verdict.md: Guide/server will own the
shared command while direct dependency ports avoid new Test/Vitest runtime edges.
Guide's contracts checkpoint is retained. Root applied the supported server
configuration through canonical Scaffold and the real generated server TypeScript
project passed. The same Guide writer has resumed implementation; direct dependency
port proof passed the actual root TypeScript project. The replacement server
artifact remains pending. The owner then challenged strict rule compliance of
the public API. The writer is frozen with a draft implementation. Root retained
its actual diff and source slice and dispatched a separate Astra reviewer and
the reused objective analyst on d7n-guide-api-rules-brief.md. Read
d7n-guide-api-hold-root-report.md. The reviews returned rule violations. Root
reproduced the foreign-result reading defect and reconciled the correction in
d7n-guide-api-rules-verdict.md. The effective Guide writer brief is
d7n-guide-api-rules-fix-brief.md; it requires the governing guide before types and
implementation. The corrected writer has returned frozen. Root's TypeScript,
changing-getter control, server tests and ordered Guide gates passed. The canonical
replacement archive is installed in Scaffold with matching core/server bytes and
declarations; the supported mirror is current. Read d7n-guide-api-rules-landing.md.
The downstream successor d7n-scaffold-api-rules-adopt-brief.md returned frozen.
The canonical entry now constructs the installed GuideCommand directly and
retains no named local command or registration helper. Root's native guides
command and ordered Scaffold gates passed. Final review uses
d7n-guides-api-close-brief.md with d7n-guides-api-close-evidence.md. The reused
objective review and separate owner-selected review returned. Root reproduced
the printed example's missing test registration and native failure settlement.
Read d7n-guides-api-close-verdict.md. The bounded correction writer returned
frozen under d7n-guides-api-close-fix-brief.md. Corrected examples, contract/boundary
prose, direct helper tests and measured lifecycle edges passed the final ordered
root Guide gates. The replacement archive is installed in Scaffold, its mirror
is current, and Scaffold's final ordered root gates passed. The exact guide and
class examples passed against that installed archive; the unregistered control
still fails. Read d7n-guides-api-correction-landing.md and
d7n-guides-api-correction-close-evidence.md. The separate owner-selected reviewer,
reused objective analyst and mechanical continuation returned. Root corrected the
shared fixture constant's export, obtained independent correction PASS, and ran
the final Guide gates green. Packed, canonical and installed dist/src trees remain
byte-equal. Read d7n-guides-api-correction-verdict.md and
d7n-guide-setup-export-root-report.md. The source correction and direct Scaffold
consumer are accepted for product commit and Scaffold packing. Runtime design
stays fixed.
Read d7n-guides-api-adopt-landing.md and d7n-guides-api-example-root-report.md.
Scaffold product commit 5197231837183c2a2b7283f50da83ac7b704a027 is pushed to
the campaign, main and designated refs, including owner toolchain metadata.
Its canonical 0.0.64 archive is packed. Guide's accepted API source is committed
and campaign-pushed at 61182c3b727ae9ee410781c48a7008f22da41ff5. Read
d7n-guides-api-product-landing.md for archive identity and the next supported
Guide adoption. The command extraction addresses an unmet
part of Ruling35, not a new owner requirement. Settled parity populations and
script ownership remain unchanged. Guide's authored direct entry precedes
supported application of the accepted Scaffold artifact and final Guide repacking.
Root's explicit npm.cmd
source-authority command resolved the article drift, leaving the coverage-policy red.
The held product diffs are retained under evidence/d7n-guides-extraction-held.
Read d7n-guide-parity-core-landing.md for source and artifact evidence.
Read d7n-guides-extraction-plan.md and d7n-scripts-ownership-landing.md for this work.
The owner
approved inclusion of the existing toolchain manifest and staged lock changes after
the requested fixes and complete scaffold diff review. Read
d7n-guides-test-file-close-verdict.md, d7n-guides-test-file-close-annotation.md,
evidence/d7n-guides-test-file-gates-closed and d7n-guides-test-file-adoption-plan.md before
resuming, then read Ruling 35 and the extraction design packet. Preserve and include
the owner's manifest and staged lock edits in the accepted product commit. No package is
closed by this checkpoint and no publication is authorized.

The owner prefers the canonical checkouts on main before publication. Ruling 36
keeps active edits on the verified campaign branch, then switches each settled
checkout to main without discarding work or rewriting history. Read
d7n-campaign-branches-reading.md for the actual on-disk branch audit.

| Repository | Branch | Tip | Notes |
| --- | --- | --- | --- |
| `orkestrel/scaffold` | `main` (the working branch), `claude/orkestrel-npm-audit-deps-14ibta` (the campaign branch), and `claude/docs-parity-windows-01a0810d` (the designated branch) | the commit carrying this file | push HEAD to each named ref at the same tip; the campaign folder is the record |
| `orkestrel/guide` | `claude/orkestrel-npm-audit-deps-14ibta` | `327470a` | native entry and tooling accepted and pushed; main stays at d3ee1bb for the fleet sequence; refreshed archive and output equality recorded in d7n-guide-native-tooling-landing.md |
| `orkestrel/<package>` for every package in the table that follows | `main` after closure; campaign branch retained | per the table | campaign/main pushed; canonical checkout uses main after closure |

The selected release state is recorded here; historical parity closures later
in this file are not release-preparation status.

| Package | Version | Accepted source or release tip | Release preparation |
| --- | --- | --- | --- |
| abort | 0.0.10 | 3dddab9 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| budget | 0.0.10 | 625e743 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| csv | 0.0.7 | b9e9893 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| emitter | 0.0.10 | fe7e689 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| html | 0.0.9 | aa08eb1 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| indexeddb | 0.0.11 | cb179f6 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| ndjson | 0.0.10 | a35c40c | registry-confirmed archive equality; campaign/main pushed; clean local main |
| sqlite | 0.0.11 | f2ffc0a | registry-confirmed archive equality; campaign/main pushed; clean local main |
| timeout | 0.0.10 | a058b1f | registry-confirmed archive equality; campaign/main pushed; clean local main |
| tool | 0.0.14 | 4761097 | registry-confirmed archive equality; campaign/main pushed; clean local main |


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
| lsp | `d654382` | docs-parity and registry-backed release preparation closed; clean canonical main and pushed campaign/main | owner uploads0.0.7 with the prepared consumer layer; confirm registry afterward; read `d7n-lsp-registry-release-landing.md` |
| database | `cdbf66a` | `close-2` landed; owner main merged; prior verifier green; the canon finding remains open; Ruling 20 stays unchanged | dispatch `d7n-database-canon-brief.md` to move the compiler-derived surface into its consuming package case; then checker and verifier; verdict; push `main` |
| probe | `93fc01d` | resumed test-draft correction landed and branch pushed; scoped gates green; type-load fixture retained by d7n-probe-heavy-ruling-verdict.md after a separate host run; clean; main still b816749 | write the audit-item check brief and generate verification against the final guide artifact; full closure and main push remain pending |
| agent | `305af91` | fix landed and campaign branch pushed; root host readings passed, including comment-only scope, stable docs directions, core tests, and opening-header comparison; main unchanged | install the accepted final guide artifact; audit-item checker and whole-chain verifier; closure verdict; refresh main ancestry; push main |
| ollama | `98e9c34` | read/edit-only successor returned; uncommitted candidate and report retained; root scoped host chain passed; the retained container partial diff was not applied | scope review and remaining landing readings; landing; aligned final-artifact closure |
| workflow | `1151786` | audit reconciled (`d7n-workflow-audit-verdict.md`, items WF1 to WF7); fix brief written | dispatch `d7n-workflow-converge-fix-brief.md` (implementer, Opus); head-start first (its installed guide is the older pack); then as agent |
| program | `a60327f` | audit reconciled (`d7n-program-audit-verdict.md`, items PF1 to PF8); fix brief written | dispatch `d7n-program-converge-fix-brief.md` (implementer, Opus); head-start first; then as agent |
| terminal | `0b01536` | retained audit lanes reconciled in `d7n-terminal-audit-verdict.md`; checker recorded as not run | dispatch `d7n-terminal-converge-fix-windows-brief.md`; then checker and verifier; verdict; push `main` |
| mcp | `a01d5e8` | owner main merged; scoped merge checks passed; branch pushed; audit reconciled in `d7n-mcp-audit-verdict.md`; checker recorded as not run | dispatch `d7n-mcp-converge-fix-windows-brief.md`; closure; push `main`; guide-reader referral remains separate |
| supervisor | `edf80e6` (`main`) | outside the pass; the owner's API-adoption decision is pending (`d7-fleet-plan.md` § For the owner) | nothing in this campaign |
| guide | `ccd2a790` | Guide0.0.18 registry archive and gitHead confirmed; campaign/main pushed; clean canonical main | registry-backed consumer visits proceed; no Guide upload remains |

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

The isolated canonical path candidate passed the named real-binary regression. Its
independent audit required direct-test controls and fixture/TSDoc corrections, which
the bounded successor has returned. Root reproduced the permanent test's negative
controls and restored it green. The earlier setup and root TypeScript failures passed
after bootstrap guide installation and host/inventory regeneration. Read
d7n-scaffold-path-audit-verdict.md and d7n-scaffold-path-fix-3-verdict.md. Final isolated
clean/build staging passed under d7n-scaffold-path-final-prepare-2-run-verdict.md.
The independent verifier and root's subsequent acceptance chain each passed under
d7n-scaffold-path-closure-verdict.md. The tested canonical source landed as
c90089c99b03c692e8eda3935af592601a5e87e3 and is pushed to the campaign branch, main and
designated session branch. Read d7n-scaffold-path-landing-verdict.md for exact integration,
owner preservation and the non-gating CLI audit. No consumer propagation has run.
The owner's following instruction folds propagation into dependency-layer tarball visits.
Do not run the standalone propagation sweep described by the earlier landing handoff.
Each layer visit also settles and applies its required package version bump before its
accepted tarball moves upward. Follow d7n-layer-alignment-plan.md for this re-baseline.

The rejected projected inventory remains retired as a prerequisite. The raw survey
ran and its independent receipt is accepted for graph reconciliation under
d7n-layer-survey-reading.md. Captured origin/main is cached; refresh it at each visit.
Read the immutable evidence/d7n-layer-survey-diagnostic/ files and the verifier report.
This receipt does not establish installed closure or release readiness.
The supported layer mechanism map returned under d7n-layer-supported-map-report.md.
Read d7n-layer-supported-map-reading.md beside it for root's acceptance limits and
the sibling-path correction. It maps public scaffold APIs and retained instrument
reuse, not live fleet state. The blind reading-boundary design closed under
d7n-layer-reading-boundary-verdict.md. The raw carrier returned under
d7n-layer-capture-brief.md; focused independent controls passed. Audits returned and
were reconciled in d7n-layer-capture-audit-verdict.md. The bounded source successor
does not block use of the independently verified raw survey. The graph reconciliation
returned under d7n-layer-graph-report.md. Its runtime/peer/optional graph is acyclic;
Guide, scaffold, Probe and Test require a development-tool bootstrap. Read
d7n-layer-wave-design-reading.md for the reconciled design and held lockfile choice.
No final layer artifact exists yet. The path bootstrap pack is accepted under
d7n-path-bootstrap-pack-reading.md. The disposable repair pilot is closed under
d7n-path-artifact-pilot-closure-verdict.md after root and independent verification.
The Guide bootstrap visit applied tests/setupPolicy.ts and tests/config.test.ts through
the installed public API. Its configured-policy baseline exited 1 and its repeated
post-repair case exited 0. Source and dependency bytes stayed unchanged. Read
evidence/d7n-guide-path-bootstrap/. The full Guide gates and driver check passed;
d7n-guide-path-bootstrap-verdict.md closes this selected propagation. The source
checkpoint is 0accc15 on its campaign branch. The live reader successor follows
d7n-guide-heading-close-fix-brief.md; no corrected Guide pack exists yet.
Root's initial Contract reading finds registry 0.0.16 and prepared source 0.0.17;
that candidate does not require an automatic repeat bump merely to resume the pass.
Read d7n-layer-contract-reading.md. No accepted layer tarball or new pin exists yet.

The owner resolved the publication-order question in Ruling 29. Finish fixes and
alignment with tarballs, applying required bumps before accepted packing, then present
the measured publishing layer order. Use orkestrel-publish when ready. The owner may
choose incremental publication after an accepted layer; no upload is authorized now.
The old guide-first sequence is superseded. Keep parity closures and artifact checks.

The raw carrier correction is closed under d7n-layer-capture-closure-verdict.md.
Use instruments/d7/windows/layer-capture-final/ if another raw capture is required;
the original verified survey remains the graph evidence. The owner was asked whether
future release pins remain isolated until registry locks can be generated or land on
main with an explicit pending lock. Root recommends isolated preparation and has not
changed canonical future pins while that choice is open. Source corrections and
disposable mechanism proofs remain authorized. The owner directed preparation to
continue without additional broad checking rounds. Reuse accepted evidence and keep
the package gates and real downstream artifact proofs. Prepare future pins in isolated
state; do not make main uninstallable while registry lock generation is unavailable.
The publish skill and its wave reference have been read for preparation. Registry-final
visits still follow publication availability; no upload is authorized by preparation.

## Current artifact preparation

The Guide reader correction closed and landed as
ef6ada9975d71ce97ac20239f473c02b77e84cd9. The corrected 0.0.18 bootstrap artifact is
tmp/pass/packed/d7n-guide-bootstrap.47Q7XT/orkestrel-guide-0.0.18.tgz, SHA256
3a60e83f4c6319f029106f3d9588ed186639f72c222a34045326439cfff73519. Its core dist SHA256
is 6455f6f9399961cc499631c8e3d7db7e7b5d7c5062c44ffd72144c41f1395205. Use this
replacement in subsequent visits. Earlier old-pack and running-reader statements
describe the historical sequence, not current state. Guide main remains pending.

Contract's visit exited 0 with the corrected Guide and selected scaffold path repair.
Its 0.0.17 tarball exists under tmp/pass/packed/d7n-foundation-contract.ZjPTS5/.
The package manifest and lock stayed unchanged. Independent evidence verification and
selected-path landing closed as 1e235c0 on the campaign branch and main. The bottom
layer visits exited 0 and their independent artifact receipts are GREEN. Use the
retained evidence/d7n-foundation-<package>/ metadata for their exact tarball paths.

| Foundation package | Version | Latest source | State |
| --- | --- | --- | --- |
| contract | 0.0.17 | e6d2de5bfbbeb6981945b33ede438de8c38f1dbf | registry-confirmed archive equality; campaign/main pushed; clean local main |
| codec | 0.0.3 | f53355d92452a8fa2c59da084eb9b757c65b7b84 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| msg | 0.0.10 | 2a66c5b6b1251649a3f92574facf323c20edb581 | registry-confirmed archive equality; campaign/main pushed; clean local main |
| sse | 0.0.7 | 2a0d3ecb5c13fe7b893c45396840ad20da45492e | registry-confirmed archive equality; campaign/main pushed; clean local main |
| test | 0.0.14 | 7d4980f97dbf6ee56fcf4a28f5a0e2d163490ed7 | registry-confirmed archive equality; campaign/main pushed; clean local main |

The corrected Contract-to-Abort staging run exited 0 under
tmp/probe/d7n-contract-abort-stage.LQv86I. Source checks and the foreign ESM/CommonJS
consumer used Contract 0.0.17 with Abort's semantic runtime pin ^0.0.17. Resolved
Contract files match the accepted archive. Independent smoke verification is GREEN;
d7n-contract-abort-stage-verdict.md closes this mechanism proof.
This settles local runtime dependency staging, not Abort's remaining full layer visit
or peer behavior. The predecessor's wrong cwd pack is retained but never accepted.

The owner selected whole-fleet tarball preparation before publication. Ruling 31 holds
the bottom upload and adds consolidation of parity testing into tests/guides.test.ts
and test:guides. Ruling 32 resolves the rewrite behavior: absorb it into test:guides,
with explicit --to guide / --to source flags, before retiring docs and scripts/docs.ts.
Prepare Guide's runtime prerequisites, pack its revision, then compare rebuilt lower
layers with the preserved accepted tarballs, including emitted documentation.
The publish skill's window reference has been read. Windows uploads are operator-run
in a real terminal; root prepares the commands and confirms the registry. No login,
credential change or auth-file inspection has run.

Read d7n-foundation-ready.md for the prepared wave, fresh registry evidence and the
operator script. Its live tmp copy refuses execution under Ruling 31; its retained
historical copy remains unchanged. It has never uploaded. The author and verifier
tasks have returned; no package writer or shell session remains active for this wave.

Ruling 30 records the owner's development-pin clarification. Prepare lower runtime
layers with tooling tarballs now. Update development pins after tooling publication;
do not bump or republish when the material distributable is unchanged. Keep future
runtime pins isolated until valid registry locks can be generated. That safe default
does not block local artifact preparation. No upload is authorized yet.

The parity entry map returned under d7n-parity-route-map-report.md; read root's
provenance correction and interpretation in d7n-parity-route-reading.md. The equality
gate already lives in test:guides. The owner directed that command to absorb reporting
and automatic directional rewriting. Default test execution remains non-mutating.
Read d7n-guides-cli-reading.md for the real unknown-option failure and the passing
public Vitest launch/provide probe. The bounded design uses
d7n-guides-entry-design-brief.md with d7n-guides-entry-design-host-brief.md. The latter
permits native file retrieval only; no lane runs product commands or edits source.
The native objective lane and journaled Opus subjective lane returned independently.
Read d7n-guides-entry-design-verdict.md for the reconciled design. The native Sol
implementation returned in tmp/pass/scaffold-guides-entry from baseline 9b3003d.
The source candidate is frozen at prepared version 0.0.64. Root's ordered package
gates passed after the retained fixture successors. Ordinary npm test left the
candidate diff, status and launcher bytes unchanged. Read the original, root-gate
successor and CLI-fixture brief/report pairs with d7n-guides-entry-final.diff.txt.
The real tracked-Git retirement recipe returned and root executed it successfully
against the built public API. Read d7n-guides-entry-retirement-recipe-report.md and
its evidence directory. Independent acceptance and packed-consumer proof remain
pending; no entry-consolidation product change is accepted or landed yet.

HTML's isolated prerequisite artifact is accepted in d7n-html-artifact-stage-verdict.md.
Its version is 0.0.9 with staged Contract ^0.0.17, at
tmp/pass/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz, SHA256
970077f8671a978c271e7a790b78a6b44772d1f60d4e944fc381526c916c334b. Root's package
chain and installed ESM/CommonJS consumer passed; independent verification is GREEN.
Canonical HTML remains clean at 0b953169d8a541a8b2bc91f0170c301bd5b9cdca. Prepare
Markdown with this artifact and Contract 0.0.17, then Guide with that accepted chain.
Revised parity revalidation and registry-final work remain pending. The archive copy
needs its own Git boundary so scaffold's ancestor tmp ignore rule does not suppress
validation; the retained HTML runner establishes it before gates.

Markdown's prerequisite artifact is accepted in d7n-markdown-artifact-stage-verdict.md.
Its version is 0.0.14 with staged Contract ^0.0.17 and HTML ^0.0.9, at
tmp/pass/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz, SHA256
02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3. Root's package
chain and installed consumer passed; independent verification is GREEN. Canonical
Markdown remains clean at ac33037b46b751fb1e25ca929556e9d5f107852a. Prepare Guide
with this accepted Contract/HTML/Markdown chain. Preserve these archives for the
revised-parity comparison. No runtime pin has been represented as registry-served.

Guide's runtime-aligned prerequisite artifact is accepted in
d7n-guide-artifact-stage-verdict.md. Its version is 0.0.18 with staged Contract
^0.0.17 and Markdown ^0.0.14, at
tmp/pass/d7n-guide-stage.MQbCaa/packed/orkestrel-guide-0.0.18.tgz, SHA256
8828ee3dfecc15d72d863f82c938c95a64d4323aa4d674a2f620735e62c61afc.
The ordered gates and corrected installed consumers passed; independent verification
is GREEN. Non-map runtime and declarations equal the prior Guide bootstrap. Preserve
the original staging exit failures described by the verdict; they were driver errors,
not product fixes. Canonical Guide remains unchanged and main closure is pending.

Scaffold's isolated entry implementation environment is prepared in
tmp/pass/scaffold-guides-entry on claude/docs-parity-guides-entry-unit. Root's capped
preparation exited 0; installed tarball identities and nested resolution agree with
the accepted Contract/HTML/Markdown/Guide/Test chain. Primary owner manifest and staged
lock hashes are unchanged. The preparation evidence is retained under
evidence/d7n-scaffold-guides-prepare. Do not reuse the dirty scaffold-path worktree.

Read d7n-guides-entry-root-gates-report.md before resuming acceptance. Fresh native
agent allocation is refused by the harness thread limit, including gate-carrier
authorship. This is a capacity refusal, not a dark engine. Root used existing
package scripts for the ordered gates and retained their actual outputs. Fresh
objective review, mechanical checking and independent verification are not run.
The owner has not yet answered whether the existing design analyst may be reused
with its earlier context recorded. Do not silently waive clean-context review or
route native Sol through its own CLI. Resume acceptance in a fresh agent context
when capacity is available. The saved d7n-guides-entry-audit-brief.md is ready for
the independent objective and subjective lanes. Read the effective launch copy
before dispatch. The subjective launch script is retained but has not run.

## Pending owner decisions carried from the container

Listed in `d7-fleet-plan.md` § For the owner: supervisor's API-adoption campaign; template's missing sections; implementing-class member blocks; the `--to source` seed guard; timeout's Contract shape; the scaffold findings carried in `d7-fleet-plan.md` § Findings carried (the voice rule's hyphenated-token and noun-opener cases, `land-p1.sh`'s omission of newly tracked files, the seed's trailing empty comment line and empty-cell write, the config test's shared temp-dir cross-talk, the `in order to` sweep sense); the reader limitations carried to the guide package (both-absent pairs, a name exported by more than one face collapsing to one row, underscore identifiers, inherited-member duplication, the line-end hyphen, overload collapse).
