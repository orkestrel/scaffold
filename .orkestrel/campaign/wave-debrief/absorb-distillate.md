I'll read the brief first, then follow it exactly in read-only mode.The brief is a read-only distill of the publish-wave record. I'll locate the record files and extract the exact evidence each question asks for.I'll search the wave-record for each question's markers, and look up the journal path the brief asks for.The journal is at `tmp/cursor/wave-debrief-absorb.jsonl`. I'll read its init event and pull the login, overwrite, and related evidence next.I'll pull the login logs, overwrite scripts, and the other question-specific files in parallel.Login logs are treated as binary because of ANSI sequences, so I’ll extract them with read-only shell filters and keep gathering the other questions.Overwrite logs don’t contain a refusal line. I’ll keep pulling evidence for the remaining questions.**Question:** Unit `wave-debrief-absorb` — distil the publish wave's record.

**Evidence**

ANSI spinner and CSI sequences are stripped from `script` log quotes where they obscure the line; that is noted per quote.

**1. The login**

`403` fetch (body not in these logs):

```
tmp/units/wave-record/work/login-diag.log:8: npm http fetch GET 403 https://registry.npmjs.org/-/v1/done?sessionId=*** 107ms
```
(stripped)

Legacy `Username:` drop:

```
tmp/units/wave-record/work/login.log:6: Username:
tmp/units/wave-record/work/login-diag.log:9: Username:
tmp/units/wave-record/login-retry.sh:17: echo "attempt $n: dropped to the legacy prompt (first poll 403); killed"
```
(`login.log` and `login-diag.log` stripped)

`202` on the diagnostic connection (one `202`, then `403`; no repeated `202` cadence in this log):

```
tmp/units/wave-record/work/login-diag.log:1: Script started on 2026-09-04 19:29:57+00:00 [...]
tmp/units/wave-record/work/login-diag.log:7: npm http fetch GET 202 https://registry.npmjs.org/-/v1/done?sessionId=*** 264ms
tmp/units/wave-record/work/login-diag.log:10: Script done on 2026-09-04 19:31:12+00:00 [COMMAND_EXIT_CODE="143"]
tmp/units/wave-record/login-diag.sh:2: # Diagnose the web-login poll: egress address per connection, the 202's retry-after, npm's own poll log for 30 s.
tmp/units/wave-record/login-diag.sh:11: for i in 1 2 3; do curl -sS -i "$DONE" | grep -i -E '^HTTP|retry-after|cf-ray' | tr '\n' ' '; echo; done
```
(lines 7 stripped)

Minted URL lines with times present in the retained logs:

```
tmp/units/wave-record/work/login.log:1: Script started on 2026-09-04 16:41:08+00:00
tmp/units/wave-record/work/login.log:5: https://www.npmjs.com/login?next=/login/cli/818e2431-b5a0-4f68-82d6-3ca514b350ff
tmp/units/wave-record/work/login-diag.log:6: https://www.npmjs.com/login?next=/login/cli/569d309e-5c9a-4235-a39e-bf5ea226850d
tmp/units/wave-record/work/login-1.log:1: Script started on 2026-09-04 19:32:05+00:00
tmp/units/wave-record/work/login-1.log:5: https://www.npmjs.com/login?next=/login/cli/809ed7e4-65b5-4a2e-aa21-d864b2ca2ee3
tmp/units/wave-record/work/login-1.log:8: Script done on 2026-09-04 19:32:30+00:00 [COMMAND_EXIT_CODE="0"]
tmp/units/wave-record/work/login.live:1: 1
```

`login-retry.sh` writes `login-$n.log` and `login.live`; only `login-1.log` is retained. Retry-loop stdout (`attempt $n: live after its first poll`) is not in the record. `403 {"message":"forbidden"}` is not in these login files.

npm version each named log names: no evidence in the record. The scripts pin the binary path only:

```
tmp/units/wave-record/login-retry.sh:6: export PATH=/opt/npm11/bin:$PATH
tmp/units/wave-record/login-diag.sh:4: export PATH=/opt/npm11/bin:$PATH
```

**2. The overwrite refusal**

Search of `work/prep-*-overwrite.log`, `work/prep-*.log`, and `work/layer-*.log` for `uncommitted`: no refusal line. Retained overwrite logs show successful writes (example):

```
tmp/units/wave-record/work/prep-codec-overwrite.log:2: 1 written, 39 unchanged, 0 removed in ..
```

The successor names the refusal and the commit that answers it:

```
tmp/units/wave-record/prep-one-2.sh:2: # Successor of prep-one.sh: commits the re-pin and bump before `scaffold overwrite`, which refuses a tree carrying
tmp/units/wave-record/prep-one-2.sh:3: # uncommitted changes. Steps: re-pin + bump (repin.mjs) → npm install (lockfile regenerated, registry copies
```

Lines added in `prep-one-2.sh` versus `prep-one.sh` that answer it: dirty-tree filter that allows only the manifests, and the preparation commit before overwrite:

```
tmp/units/wave-record/prep-one-2.sh:17: dirty=$(git status --porcelain | grep -v -E ' (package\.json|package-lock\.json)$' | wc -l | tr -d ' ')
tmp/units/wave-record/prep-one-2.sh:18: [ "$dirty" = 0 ] || red "tree dirty before the visit: $(git status --porcelain | tr '\n' ' ')"
tmp/units/wave-record/prep-one-2.sh:27: if ! git diff --quiet -- package.json package-lock.json; then
tmp/units/wave-record/prep-one-2.sh:28:   printf 'Prepare %s %s: re-pin and bump from the registry\n\n...' ...
tmp/units/wave-record/prep-one-2.sh:29:   git add package.json package-lock.json && git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$W/prep-$P-commit1.txt" || red "preparation commit"
tmp/units/wave-record/prep-one-2.sh:30:   say "preparation commit $(git rev-parse --short HEAD)"
tmp/units/wave-record/prep-one-2.sh:31: fi
```

`prep-one.sh` called overwrite immediately after install with no that commit (`prep-one.sh:26-29`).

**3. Install after overwrite**

`prep-sea-install2.log` head:

```
tmp/units/wave-record/work/prep-sea-install2.log:1: npm warn EBADENGINE Unsupported engine {
tmp/units/wave-record/work/prep-sea-install2.log:2: npm warn EBADENGINE   package: '@orkestrel/sea@0.0.14',
tmp/units/wave-record/work/prep-sea-install2.log:3: npm warn EBADENGINE   required: { node: '>=24.8.0' },
tmp/units/wave-record/work/prep-sea-install2.log:4: npm warn EBADENGINE   current: { node: 'v22.22.2', npm: '11.19.1' }
tmp/units/wave-record/work/prep-sea-install2.log:5: npm warn EBADENGINE }
tmp/units/wave-record/work/prep-sea-install2.log:7: added 1 package, removed 2 packages, and changed 10 packages in 4s
```

```
tmp/units/wave-record/prep-one-3.sh:37: if ! git diff --quiet -- package.json; then npm install --no-audit --no-fund > "$W/prep-$P-install2.log" 2>&1 || red "npm install after overwrite"; say "manifest moved by the overwrite; lockfile regenerated and toolchain installed"; fi
tmp/units/wave-record/work/prep-sea.log:15: 20:45:03 sea manifest moved by the overwrite; lockfile regenerated and toolchain installed
tmp/units/wave-record/work/regate-guide.log:1: 19:42:53 guide npm install exit=0; lockfile moved: yes
tmp/units/wave-record/work/regate-guide-install.log:2: added 1 package, removed 2 packages, and changed 10 packages in 20s
```

**4. The one-time code's life**

Every `EOTP` line:

```
tmp/units/wave-record/work/publish-table-1.log:1: Script started on 2026-09-04 20:25:58+00:00 [COMMAND="... --otp=385882 ..."]
tmp/units/wave-record/work/publish-table-1.log:25: npm error code EOTP
tmp/units/wave-record/work/publish-table-1.log:28: npm error If you already provided a one-time password then it is likely that you either typoed it, or it timed out. Please try again.
tmp/units/wave-record/work/publish-table-1.log:31: Script done on 2026-09-04 20:26:00+00:00 [COMMAND_EXIT_CODE="1"]
tmp/units/wave-record/work/publish-brief-1.log:1: Script started on 2026-09-04 21:46:05+00:00 [COMMAND="... --otp=195285 ..."]
tmp/units/wave-record/work/publish-brief-1.log:25: npm error code EOTP
tmp/units/wave-record/work/publish-brief-1.log:31: Script done on 2026-09-04 21:46:10+00:00 [COMMAND_EXIT_CODE="1"]
```
(EOTP lines stripped)

Layer-chain logs hold no `+ @orkestrel/<pkg>@<version>` lines. First and last acceptance lines live in the per-package journals; chain stamps sit beside them:

| chain log | first stamp / last stamp | first `+` / last `+` (or `EOTP`) | Script started / done |
| --- | --- | --- | --- |
| `publish-layer-codec.log` | 19:51:52 codec … serves 0.0.2 / 19:52:21 test … serves nothing yet; `STOP at test` | `publish-codec-1.log:25` `+ @orkestrel/codec@0.0.2` / `publish-test-1.log:35` `+ @orkestrel/test@0.0.13` | codec 19:51:44–19:51:47 `--otp=076814`; test 19:52:14–19:52:16 same otp |
| `publish-layer-abort.log` | 20:03:14 abort … serves nothing yet; `STOP at abort` | `publish-abort-1.log:26` `+ @orkestrel/abort@0.0.9` | 20:03:07–20:03:09 `--otp=878694` |
| `publish-layer-budget.log` | 20:09:34 budget … serves 0.0.9 / 20:10:29 tool … serves 0.0.13; `LAYER-PUBLISHED` | `publish-budget-1.log:25` `+ @orkestrel/budget@0.0.9` / `publish-tool-1.log:25` `+ @orkestrel/tool@0.0.13` | budget 20:09:27–20:09:29 `--otp=001060`; tool 20:10:23–20:10:25 same otp |
| `publish-layer-console.log` | 20:25:08 console … serves nothing yet / 20:26:04 table … serves nothing yet; `STOP at table (no acceptance line)` | `publish-console-1.log:35` `+ @orkestrel/console@0.0.12` / table `EOTP` | console 20:25:02 `--otp=385882`; table 20:25:58–20:26:00 same otp |
| `publish-layer-table.log` | 20:27:11 table … serves 0.0.4 / 20:27:25 websocket … serves 0.0.11; `LAYER-PUBLISHED` | `publish-table-2.log:25` `+ @orkestrel/table@0.0.4` / `publish-websocket-1.log:25` `+ @orkestrel/websocket@0.0.11` | table-2 20:27:04–20:27:07 `--otp=644149`; websocket 20:27:18–20:27:20 same otp |
| `publish-layer-server.log` | 20:50:55 server … serves nothing yet / 20:51:58 workspace … serves 0.0.7; `LAYER-PUBLISHED` | `publish-server-1.log:25` `+ @orkestrel/server@0.0.18` / `publish-workspace-1.log:25` `+ @orkestrel/workspace@0.0.7` | server 20:50:48–20:50:51 `--otp=104048` |
| `publish-layer-browser.log` | 20:58:13 browser … serves 0.0.15 / 20:58:26 mcp … serves nothing yet; `LAYER-PUBLISHED` | `publish-browser-1.log:31` `+ @orkestrel/browser@0.0.15` / `publish-mcp-1.log:34` `+ @orkestrel/mcp@0.0.28` | browser 20:58:06–20:58:08 `--otp=674150`; mcp 20:58:19–20:58:22 same otp |
| `publish-layer-brief.log` | 21:47:37 brief … serves nothing yet / 21:48:12 workflow … serves nothing yet; `LAYER-PUBLISHED` | `publish-brief-2.log:25` `+ @orkestrel/brief@0.0.7` / `publish-workflow-1.log:34` `+ @orkestrel/workflow@0.0.17` | brief-2 21:47:31–21:47:33 `--otp=261730`; workflow 21:48:03–21:48:08 same otp |
| `publish-layer-agent.log` | 21:53:45 agent … serves nothing yet; `LAYER-PUBLISHED` | `publish-agent-1.log:25` `+ @orkestrel/agent@0.0.20` | 21:53:37–21:53:40 `--otp=685785` |
| `publish-layer-toolbox.log` | 21:59:23 toolbox … serves 0.0.12 / 21:59:29 ollama … serves 0.0.14; `LAYER-PUBLISHED` | `publish-toolbox-1.log:31` `+ @orkestrel/toolbox@0.0.12` / `publish-ollama-1.log:25` `+ @orkestrel/ollama@0.0.14` | toolbox 21:59:16–21:59:18 `--otp=242206`; ollama 21:59:23–21:59:25 same otp |
| `publish-layer-guide.log` | 20:33:05 guide 0.0.17 … serves nothing yet; `LAYER-PUBLISHED` | `publish-guide-2.log:25` `+ @orkestrel/guide@0.0.17` | 20:32:59–20:33:01 `--otp=410840` |
| `publish-layer-scaffold.log` | 22:35:50 scaffold 0.0.63 … serves nothing yet; `LAYER-PUBLISHED` | `publish-scaffold-3.log:155` `+ @orkestrel/scaffold@0.0.63` | 22:35:42–22:35:46 `--otp=401373` |

L4 first code expired unused:

```
tmp/units/wave-record/work/publish-brief-1.log:1: Script started on 2026-09-04 21:46:05+00:00 [COMMAND="... --otp=195285 ..."]
tmp/units/wave-record/work/publish-brief-1.log:25: npm error code EOTP
tmp/units/wave-record/work/publish-brief-2.log:1: Script started on 2026-09-04 21:47:31+00:00 [COMMAND="... --otp=261730 ..."]
tmp/units/wave-record/work/publish-brief-2.log:25: + @orkestrel/brief@0.0.7
```

**5. The acceptance line as the verdict**

Beside a `+` line:

```
tmp/units/wave-record/work/publish-html-1.log:25: npm notice Your package is being processed and may take a few minutes to become available.
tmp/units/wave-record/work/publish-html-1.log:26: + @orkestrel/html@0.0.8
```
(stripped)

Layer-chain `serves nothing yet` / stop:

```
tmp/units/wave-record/work/publish-layer-abort.log:1: 20:03:14 abort 0.0.9: registry serves nothing yet (exit=0, log /home/user/work/wave/publish-abort-1.log)
tmp/units/wave-record/work/publish-layer-abort.log:2: STOP at abort
tmp/units/wave-record/work/publish-layer-agent.log:1: 21:53:45 agent 0.0.20: registry serves nothing yet (exit=0, log /home/user/work/wave/publish-agent-1.log)
tmp/units/wave-record/work/publish-layer-brief.log:1: 21:47:37 brief 0.0.7: registry serves nothing yet (exit=0, log /home/user/work/wave/publish-brief-2.log)
```
(spinner glyphs on the chain lines stripped)

`publish-layer.sh` reads the acceptance line:

```
tmp/units/wave-record/publish-layer.sh:11: if ! tr -d "\r" < "$(ls -t $W/publish-$p-*.log | head -1)" | grep -qE "\+ @orkestrel/$p@"; then echo "STOP at $p (no acceptance line)" | tee -a "$LOG"; exit 1; fi
```

**6. Timing reds re-run alone**

Shared-slice L2 visit (timeout):

```
tmp/units/wave-record/work/layer-L2B.log:3: 20:15:55 process prep exit=1: 20:15:55 process PREP-process-RED prepublishOnly
tmp/units/wave-record/work/prep-process.log:20: FAIL  |src:server| tests/src/server/processes/Process.test.ts > Process > reaches the terminal moment on stop alone with no destroy call
tmp/units/wave-record/work/prep-process.log:21: Error: Test timed out in 5000ms.
tmp/units/wave-record/work/prep-process-prepublish.log:138: FAIL  |src:server| tests/src/server/processes/Process.test.ts > Process > reaches the terminal moment on stop alone with no destroy call
tmp/units/wave-record/work/prep-process-prepublish.log:139: Error: Test timed out in 5000ms.
```

Shared-slice development re-pin (chunk assertion):

```
tmp/units/wave-record/work/devround-R3.log:2: 22:51:34 process: 22:51:34 process DEVREPIN-process-RED prepublishOnly
tmp/units/wave-record/work/devrepin-process.log:6: FAIL  |src:server| tests/src/server/processes/Session.test.ts > Session bytes > emits each stdout chunk as a plain owned array rather than the host buffer it read
tmp/units/wave-record/work/devrepin-process.log:7: AssertionError: expected [ Array(128) ] to deeply equal [ 170, 170, 170, 170, 170, 170, …(58) ]
tmp/units/wave-record/work/devrepin-process-prepublish.log:139: FAIL  |src:server| tests/src/server/processes/Session.test.ts > Session bytes > emits each stdout chunk as a plain owned array rather than the host buffer it read
tmp/units/wave-record/work/devrepin-process-prepublish.log:140: AssertionError: expected [ Array(128) ] to deeply equal [ 170, 170, 170, 170, 170, 170, …(58) ]
```

Green re-run:

```
tmp/units/wave-record/work/regate2-process.log:2: 23:07:58 process prepublishOnly exit=0
tmp/units/wave-record/work/regate2-process.log:3: 23:07:58 process REGATE2-process-GREEN
tmp/units/wave-record/work/regate2-process-prepublish.log:119: Test Files  8 passed (8)
tmp/units/wave-record/work/regate2-process-prepublish.log:120: Tests  196 passed | 8 skipped (204)
```

**7. Guide's early release**

`work/layer-L0A.log`, `layer-L0B.log`, `layer-L0C.log`, and `work/prep-{codec,contract,msg,sse,test}-prepublish.log`: no lines naming `extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, or `keyword`. Retained L0 visits are green:

```
tmp/units/wave-record/work/layer-L0A.log:1: 19:45:51 codec prep exit=0: 19:45:51 codec PREP-codec-GATES-GREEN
tmp/units/wave-record/work/layer-L0B.log:1: 19:45:52 msg prep exit=0: 19:45:52 msg PREP-msg-GATES-GREEN
tmp/units/wave-record/work/layer-L0C.log:1: 19:46:51 test prep exit=0: 19:46:51 test PREP-test-GATES-GREEN
```

Guide typecheck against registry ranges and early release:

```
tmp/units/wave-record/work/guide-ci.log:2: added 172 packages in 5s
tmp/units/wave-record/work/guide-check.log:2: > @orkestrel/guide@0.0.15 check
tmp/units/wave-record/work/guide-check.log:3: > tsc --noEmit --project tsconfig.json && npm run check:src
tmp/units/wave-record/work/guide-check.log:11: > tsc --noEmit -p configs/src/tsconfig.core.json
tmp/units/wave-record/work/guide-release-msg.txt:1: Release @orkestrel/guide 0.0.16
tmp/units/wave-record/work/guide-release-msg.txt:3: Bump ruling: guide publishes on its own account ahead of L0, the shape scaffold takes, because every fleet package's `tests/guides.test.ts` reads this tip's renamed API (`extractFenceImports`, `findMissingSymbols`, `computeSymbolKey`, `symbol.keyword`) and the registry's 0.0.15 predates it. ... This release pins the runtime ranges the registry serves as of the visit (contract `^0.0.15`, markdown `^0.0.12`); ... Gates: `prepublishOnly` exit 0 at 19:41 UTC against the registry copies.
tmp/units/wave-record/ledger.md:130: The first L0 visits reddened at `check`: ... Guide's tip typechecks against the registry's contract 0.0.15 and markdown 0.0.12 (`npm ci` then `npm run check`, exit 0 at 19:39 UTC)
```

**8. Peer ranges as ordering edges**

```
tmp/units/wave-record/work/release-middleware-msg.txt:3: Runtime and peer ranges as published: @orkestrel/abort ^0.0.9, @orkestrel/budget ^0.0.9, @orkestrel/contract ^0.0.16, @orkestrel/timeout ^0.0.9, @orkestrel/database ^0.0.13, @orkestrel/server ^0.0.18. ... Publishes after server inside the L3 round because its peer ranges are published surface: `@orkestrel/server` `^0.0.18` and `@orkestrel/database` `^0.0.13`, each an exact pin at `0.0.x`.
tmp/units/wave-record/work/release-mcp-msg.txt:3: Runtime and peer ranges as published: @orkestrel/codec ^0.0.2, @orkestrel/contract ^0.0.16, @orkestrel/emitter ^0.0.9, @orkestrel/process ^0.0.10, @orkestrel/sse ^0.0.6, @orkestrel/tool ^0.0.13, @orkestrel/websocket ^0.0.11, @orkestrel/router ^0.0.13, @orkestrel/server ^0.0.18. ... Publishes after server inside the L3 round because its peer ranges are published surface: `@orkestrel/server` `^0.0.18` and `@orkestrel/router` `^0.0.13`, each an exact pin at `0.0.x`.
tmp/units/wave-record/report.md:81: A `peerDependencies` edge that points at a later layer reorders that consumer: it publishes after that peer, with the peer range re-pinned to the released version.
tmp/units/wave-record/report.md:83: The `@orkestrel/middleware` package sits in the `L2` layer ... Middleware therefore leaves the `L2` window and publishes after `@orkestrel/server` is on the registry, with `@orkestrel/server` re-pinned to `^0.0.18`.
tmp/units/wave-record/report.md:204: 3. **A peer edge is an ordering edge.** ... Inside the L3 round, server publishes and is registry-confirmed first; middleware and mcp then re-pin `@orkestrel/server` to `^0.0.18` (middleware also `@orkestrel/database` `^0.0.13`, mcp also `@orkestrel/router` `^0.0.13`, from L2) and publish in the second half of the round.
```

**9. Scaffold's dist moved on a development re-pin**

```
tmp/units/wave-record/work/devround-D4.log:11: 22:19:25 scaffold: 22:19:25 scaffold DEVREPIN-scaffold-BUMP-OWED
tmp/units/wave-record/work/prep-scaffold-6.log:7: 22:23:41 scaffold dist against released 0.0.62: {"moved":true,"added":[],"removed":[],"changed":["src/core/index.cjs","src/core/index.js"]}
tmp/units/wave-record/work/scaffold-release-3-msg.txt:3: Bump ruling: the closing round's development re-pin (guide `^0.0.17`, probe `^0.0.12`) moved `dist/src/core/index.js` and `index.cjs` against the released 0.0.62 tarball, because the compiler embeds the ranges it writes into the workspaces it generates; a development bump that moves the published artifact is a release, so scaffold publishes on its own account.
```

**10. The false BUMP-OWED readings**

```
tmp/units/wave-record/work/devround-R4.log:8: 22:56:51 toolbox: 22:56:51 toolbox DEVREPIN-toolbox-BUMP-OWED
tmp/units/wave-record/work/devrepin-toolbox.log:6: 22:56:51 toolbox dist against released 0.0.12: {"moved":"ERR","error":"no published copy at /home/user/work/published/orkestrel-toolbox-0.0.12/package/dist"}
tmp/units/wave-record/work/devround-R2.log:11: 23:01:57 ollama: 23:01:57 ollama DEVREPIN-ollama-RED prepublishOnly
tmp/units/wave-record/distdiff2.mjs:11: const pub = join('/home/user/work/published', `${slug}-${version}`, 'package', 'dist')
tmp/units/wave-record/distdiff2.mjs:27: if (!existsSync(pub)) { console.log(JSON.stringify({ moved: 'ERR', error: `no published copy at ${pub}` })); process.exit(0) }
tmp/units/wave-record/work/repin-dev-2.sh:29: echo "$DIST" | grep -q '"moved":false' || { say "DEVREPIN-$P-BUMP-OWED"; exit 2; }
tmp/units/wave-record/work/devrepin-toolbox-commit.txt:3: ... the rebuilt `dist/` is unmoved against the released 0.0.12 tarball (compared after the tarball was fetched; the visit ran before it existed locally), so no bump and no publish.
```

`devround-*.log` has no ollama `BUMP-OWED` row and no later `"moved":false` JSON.

**11. Durations**

Layer logs have `date -u +%H:%M:%S` lines, not `Script started`. Start = first such stamp in that layer's `work/layer-*.log`. Close = last registry confirmation in `ledger.md`. Elapsed is close minus start on 2026-09-04 UTC.

| layer | start | close | elapsed |
| --- | --- | --- | --- |
| scaffold own-account `0.0.61` | `prep-scaffold.log:1` `16:41:07` (no layer log) | `ledger.md:7` served `0.0.61` at 19:33 | 2 h 51 min 53 s |
| guide own-account `0.0.16` | `layer-G.log:1` `19:41:05` | `ledger.md:9` served `0.0.16` at 19:44 | 2 min 55 s |
| L0 | `layer-L0A.log:1` `19:45:51` | `ledger.md:15` test served `0.0.13` at 19:55 | 9 min 9 s |
| L1 | `layer-L1A.log:1` `19:56:42` | `ledger.md:21` html served `0.0.8` at 20:11 | 14 min 18 s |
| L2 | `layer-L2B.log:1` `20:13:23` | `ledger.md:35` router served `0.0.13` at 20:30 | 16 min 37 s |
| L3 | `layer-L3C.log:1` `20:44:42` | `ledger.md:57` mcp accepted at 20:58 | 13 min 18 s |
| L4 | `layer-L4A.log:1` `21:01:26` | `ledger.md:63` workflow accepted at 21:48 | 46 min 34 s |
| L5 | `layer-L5.log:1` `21:50:40` | `ledger.md:65` agent served `0.0.20` at 21:54 | 3 min 20 s |
| L6 | `layer-L6A.log:1` `21:55:35` | `ledger.md:67` toolbox served `0.0.12` at 21:59 | 3 min 25 s |

**12. The ollama service suite**

```
tmp/units/wave-record/work/ollama-test-service.log:12: FAIL  |service| tests/service/OllamaProvider.test.ts [ tests/service/OllamaProvider.test.ts ]
tmp/units/wave-record/work/ollama-test-service.log:13: Error: Ollama warmup could not reach http://127.0.0.1:11434 for model qwen3.5:2b-q4_K_M (TimeoutError: The operation was aborted due to timeout)
tmp/units/wave-record/work/ollama-test-service.log:14: ❯ warmOllama tests/setupService.ts:143:9
tmp/units/wave-record/work/ollama-test-service.log:32: Test Files  1 failed | 10 passed (11)
tmp/units/wave-record/work/ollama-test-service.log:33: Tests  36 passed (36)
tmp/units/wave-record/work/ollama-test-service-2.log:10: Test Files  11 passed (11)
tmp/units/wave-record/work/ollama-test-service-2.log:11: Tests  58 passed (58)
tmp/units/wave-record/work/ollama-up.log:2: 00:10:59 models present: qwen3.5:2b-q4_K_M
tmp/units/wave-record/work/ollama-up.log:3: 00:10:59 model present: qwen3.5:2b-q4_K_M    124a03c34777    1.9 GB    41 hours ago
```

**13. The pushes to main**

`work/push-main.log`: no `NONFF` or `DIRTY` line. `work/push-main-errors.log`: not in the record.

```
tmp/units/wave-record/work/push-main.log:49: scaffold main=e125b87a pushed
tmp/units/wave-record/work/push-main.log:50: PUSH-MAIN-DONE 49 pushed, 0 not
tmp/units/wave-record/push-main.sh:8: [ -z "$(git status --porcelain)" ] || { echo "$n DIRTY" >> "$LOG"; continue; }
tmp/units/wave-record/push-main.sh:13: echo "$n NONFF (origin/main $(git rev-parse --short origin/main) is not an ancestor of $(git rev-parse --short HEAD); $(git rev-list --count HEAD..origin/main) commits on main are not on the branch)" >> "$LOG"
tmp/units/wave-record/work/scaffold-merge-main.log:2: Merge made by the 'ort' strategy.
```

**14. Instrument authorship**

Beyond `report.md`, filenames containing `brief` are the `@orkestrel/brief` package visit/publish artifacts (`prep-brief*`, `publish-brief-*`, `publish-layer-brief.log`, `release-brief-msg.txt`, `devrepin-brief*`). No instrument brief file exists. The only `report` filename is `tmp/units/wave-record/report.md`.

**Distillate**

- Login polls `403` then drop to `Username:` (`login-diag.log:8-9`); recovery is mint-until-first-`202` (`login-retry.sh:17-21`); surviving retained URL is `login-1.log:5` at 19:32:05.
- `scaffold overwrite` refusal line is not in the overwrite logs; `prep-one-2.sh` recovers by committing before overwrite (`prep-one-2.sh:27-31`).
- Overwrite moves the manifest; `prep-one-3.sh:37` installs again; `regate-guide.log:1` records the lockfile moved.
- `publish-layer.sh:11` treats `+ @orkestrel/<pkg>@` as the verdict; processing notice plus `serves nothing yet` stopped abort (`publish-layer-abort.log:2`) and L0 test (`publish-layer-codec.log:6`).
- One-time codes die as `EOTP` (`publish-table-1.log:25`, `publish-brief-1.log:25`); L4 `--otp=195285` expired unused (`publish-brief-1.log:1`).
- Process timing reds under a shared slice (`prep-process.log:20-21`, `devrepin-process.log:6-7`) go green when re-run alone (`regate2-process.log:3`).
- First L0 `check` failures are not in the retained L0 logs; guide published early on registry ranges (`guide-release-msg.txt:3`).
- Peer ranges reorder middleware and mcp after server (`report.md:81`, `report.md:204`).
- Scaffold `dist/src` moved on a development re-pin because the compiler embeds ranges (`scaffold-release-3-msg.txt:3`, `prep-scaffold-6.log:7`).
- `distdiff2.mjs:27` prints `moved:"ERR"` when the baseline is absent; `repin-dev-2.sh:29` treats that as `BUMP-OWED` (`devrepin-toolbox.log:6-7`).
- ollama `test:service` timed out on `OllamaProvider` warmup (`ollama-test-service.log:12-13`) and passed after the model was present (`ollama-up.log:3`, `ollama-test-service-2.log:10-11`).
- `push-main.log` records every checkout pushed; scaffold's non-fast-forward is the merge (`scaffold-merge-main.log:2`).
- Instruments have `report.md` and no authored brief.

**Unknowns**

- Q1: `403` JSON body; npm version string per login log; repeated `202` cadence; retry-loop stdout and `login-2.log` onward.
- Q2: the overwrite refusal line in `prep-*-overwrite.log` / `prep-*.log` / `layer-*.log`.
- Q4: `+ @orkestrel/` lines inside `publish-layer-*.log` themselves.
- Q7: `extractFenceImports` / `findMissingSymbols` / `computeSymbolKey` / `keyword` failure lines in the named L0 layer and prepublish logs.
- Q10: ollama `BUMP-OWED` row in `devround-*.log`; later `"moved":false` JSON in those logs.
- Q13: any `NONFF` or `DIRTY` line; `work/push-main-errors.log`.
- Input files not reached: `work/push-main-errors.log` (absent); `work/login-2.log` and later retry journals (absent); first-visit L0 `check` logs (not retained); overwrite-refusal overwrite log (not retained).

**Journal**

`tmp/cursor/wave-debrief-absorb.jsonl` — `session_id` `c6e4a573-fb93-4ddf-aa7f-f85db2697159`

**Deviation**

A python dump of the login logs was rejected. The Read tool refused `.log` files as binary. Evidence was taken through Grep and Read of text files. No file was created, edited, or deleted.