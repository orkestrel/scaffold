# Pilot mechanical checker report

Retained from journal tmp/cursor/d7n-path-artifact-pilot-check.jsonl, session 6225e4d0-7f29-4eda-b7b4-21667b759e7f. The fixed model display is replaced with the route alias under the owner retention rule. Other wording is unchanged.

I'll read the brief and the checker-lane contract first, then inspect only the named files and return evidence per claim.Next I’ll load the checker role, the named rules and skill, then the pilot source and receipts the claims depend on.I’ll load the falsify verdict shape, the named rules and contracts, then the pilot source, retained diff, and receipts.I’ll read the pilot source, retained diff, receipts, and the Plan/Materializer contracts the claims rest on.This is a source-and-receipt review. This lane did not execute the pilot.

**P1 — CONFIRMED**

Attack: public imports or `Materializer` host resolve to checkout `src` / default `readHostFloor()`, not the tarball install.

Failed. `functions.mjs` loads `@orkestrel/scaffold` and `@orkestrel/scaffold/server`, then `createRequire(import.meta.url).resolve('@orkestrel/scaffold/package.json')` and `host = resolve(installed, 'dist', 'host')` (`tmp/pass/path-artifact-pilot/functions.mjs:43-44,66-70,75`). Installed `package.json` exports `.` and `./server` to `dist/src/...`, not checkout source (`tmp/pass/path-artifact-pilot/node_modules/@orkestrel/scaffold/package.json:35-56`). Receipt path is the disposable install: `C:\Users\mikes\WebstormProjects\scaffold\tmp\pass\path-artifact-pilot\node_modules\@orkestrel\scaffold`, version `0.0.63` (`.orkestrel/campaign/docs-parity/evidence/d7n-path-artifact-pilot/result/installed.json:2-3`). `Materializer` uses the supplied filesystem `host` rather than `readHostFloor()` (`src/server/Materializer.ts:178-191`).

**P2 — CONFIRMED**

Attack: filtered plan keeps compiler `hash`, keeps extra artifacts, or reuses a stale audit.

Failed. `createPlan` copies `blueprint`/`groups` and only artifacts whose `path` is in `PATHS`; it does not copy `hash` (`functions.mjs:24-29`; `PATHS` at `constants.mjs:1`). `Plan.hash` is optional (`src/core/types.ts:437-441`; `isPlan` omits `hash` at `src/core/validators.ts:370-378`). After fixtures, `audit = materializer.audit(plan, target)` then `repair(plan, audit, target)` (`functions.mjs:101-102`). Receipts: selected paths `tests/setupPolicy.ts`, `tests/config.test.ts` (`result/selection.json:2-5`); first audit is those two paths, `drift: "stale"` (`result/audit.json:3-17`).

**P3 — CONFIRMED**

Attack: repair bytes differ from packed host; sentinels change; repeat repair writes; broad-plan or occupied guards accept.

Failed. Source `assertHost` / `assertBytes`, then a second audit/repair that must have empty `written` (`functions.mjs:104-109`). `repair.json` `written` is those two paths (`result/repair.json:3-6`). Target sentinels still match `SENTINELS` (`constants.mjs:3-8`; `result/target/package.json`, `package-lock.json`, `tests/policy.test.ts`, `outside.txt`; `sentinels.json` before equals after). Settled audit is `aligned` only; `written: []` (`result/settled.json` via `"drift": "aligned"` and `"written": []`). Controls `occupied: true`, `selection: true` (`result/controls.json:2-3`); occupied sentinel file still `occupied sentinel` (`result/occupied`). Pilot exit receipt is `0` (`evidence/.../pilot.exit.txt:1`). This lane did not re-hash members against `d7n-path-bootstrap-pack-reading.md`; byte identity is the source `assertHost` plus those receipts.

**P4 — CONFIRMED**

Attack: digest check after install; install outside the private pilot; lifecycle scripts; lockfile/manifest mutation; fake exit; cleanup/fleet write; `as` / mock / shell `true` / custom path parser.

Failed. `run.sh` checks `EXPECTED` with `sha256sum --check` before `npm install` (`run.sh:7,24-32`); digest matches pack reading (`d7n-path-bootstrap-pack-reading.md:8-9`). Install is `cd "$PILOT"` with `--no-save --ignore-scripts --package-lock=false` (`run.sh:31-32`). Pilot `package.json` stays private, no dependency pin (`tmp/pass/path-artifact-pilot/package.json:1-5`; `package-before.sha256`). No `package-lock.json` under the pilot root. Real `STATUS` is written then `exit "$STATUS"`; no `rm`/cleanup (`run.sh:41-52`). `pass-env.sh` only exports `SCAFFOLD`/`FLEET`/`SCR`/`PATH`. Owned diff is only the new files under `tmp/pass/path-artifact-pilot/` (`d7n-path-artifact-pilot.diff.txt`). Paths go through `node:path` plus `createRequire`; no `as`, mock, or shell `true`.

**Findings outside the claims:** none that meet the `BROKEN` bar.

**Attacked and held (adjacent):** npm still writes `node_modules/.package-lock.json`; the launcher only refuses `$PILOT/package-lock.json`. Settled receipts are large because aligned findings carry full observed bytes of the repaired host members. Campaign evidence did not retain `install.stderr.txt` / `pilot.stdout.txt` / `pilot.stderr.txt` that `run.sh` writes. Root `status.txt` dirt on `package.json` / `package-lock.json` is outside this unit’s diff.

**Coverage:** pilot source, retained diff/status, campaign receipts, installed package exports, `Plan`/`isPlan`/`Materializer` constructor, pack-reading digest. Not run: live re-execution, tarball re-hash, fleet collection, other lanes.

VERDICT: PASS

**Journal:** `tmp/cursor/d7n-path-artifact-pilot-check.jsonl`  
**session_id:** `6225e4d0-7f29-4eda-b7b4-21667b759e7f`  
**init:** `type: system/init`, model `Cursor Grok`, cwd `C:\Users\mikes\WebstormProjects\scaffold`

