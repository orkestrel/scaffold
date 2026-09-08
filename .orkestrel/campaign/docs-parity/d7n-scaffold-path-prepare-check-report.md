I'll start by reading the brief you named, then follow whatever dispatch it contains.This is a grok-bridge mechanical check: read-only, no installs, no writes. I’ll load the named rules, skill, guides, script, and run evidence next.Evidence directory is present. Next I’ll read the run artifacts, the isolated checkout scripts, and the named setup/types logs.**Deviation (does not fail the mechanical claims).** Root authored `tmp/pass/prepare-scaffold-path.sh` instead of dispatching that authorship. The recorded run does not cure that missing dispatch.

## Claim 1 — CONFIRMED

Attack: treat the install and builds as having run in primary scaffold or a fleet consumer, or as having saved manifest or lockfile edits the byte checks would miss.

It held. The script sets `target="$SCR/scaffold-path"`, then `cd "$target"` before any `npm` invocation (`tmp/pass/prepare-scaffold-path.sh`). That tree is a worktree (`gitdir: …/.git/worktrees/scaffold-path`), not a fleet consumer. The worktree `HEAD` is `c87021bdc6367d27463139b293287a586de18240`, matching the script pin. `npm install` names only `$SCR/packed/orkestrel-guide-0.0.18.tgz` with `--no-save --package-lock=false --ignore-scripts --no-audit --no-fund`. `sha256sum -c` of `package.json` and `package-lock.json` passed after install and after the builds (`tmp/pass/d7n-scaffold-path-prepare.D7rhve/head-start-preservation.log.txt`, `final-preservation.log.txt`). `after.status.txt` adds `host.json` and does not list either manifest.

**Gaps, not breaks.** Evidence and the tarball path live under primary `tmp/pass` (gitignored scratch). The tarball file is absent from `tmp/pass/packed` now; `test -f "$guide"` had to pass for later logs to exist. `head-start.log.txt` is only `changed 14 packages in 16s`, so it does not inventory `node_modules`. The byte checks cover the two manifests, not that closure.

## Claim 2 — CONFIRMED

Attack: the recorded digest is the corrected/final guide, or the run did not pin `2b76b363f4b93b8017d42d5fd2de68ab55f2d0b01bad851f9b68fd4e80604d17`.

It held. `guide.sha256` records that digest on `node_modules/@orkestrel/guide/dist/src/core/index.js`, and the script `test`s the first 64 characters against that value. Installed `package.json` is `@orkestrel/guide` `0.0.18` while the checkout manifest still declares `"@orkestrel/guide": "^0.0.17"`. The success line says final acceptance and aligned-closure gates remain pending. Other campaign briefs treat digest `2b76b363…` as the `0.0.18` head-start and a different dist digest (`b6dae38c…`) as the final pack, so the pin distinguishes bootstrap from that corrected closure by bytes, not by version name.

**Gap, not a break.** The tarball is gone, so this round cannot re-hash the `.tgz`; it can only read the installed-dist record.

## Claim 3 — CONFIRMED

Attack: the invoked chain is not the existing `build:src` / `build:host` / `build:inventory` scripts, or it discards git history, edits a HOST_PATHS source, reads credentials, publishes, changes the primary manifest, or deletes without a bound.

It held. Isolated `package.json` defines those three scripts; the logs print those exact `npm notice run` lines and their success output (`build-src.log.txt`, `build-host.log.txt` `staged 122 file(s) into dist/host`, `build-inventory.log.txt` `staged 122 file(s) into host.json`). `build:src` is `build:src:core && build:src:server && build:src:bin`. Vite `emptyOutDir` is scoped to `dist/src/core`, `dist/src/server`, and `dist/bin`. `stageHost` copies into a vacant `dist/host` with `COPYFILE_EXCL` and does not delete the checkout (`src/server/helpers.ts`). `stageInventory` writes `host.json` and `rmSync`s only its `os.tmpdir()` staging root. The script contains no `git reset`/`checkout`/`restore`/`clean`/`stash`, no `npm publish`/`prepack`/`prepublishOnly`, and no credential path. `before.status.txt` → `after.status.txt` adds tracked `host.json` only, which is the inventory `build:inventory` names, not a HOST_PATHS artifact. Manifest preservation after the builds still reads `OK`. `npm run clean` was not invoked.

**Gaps, not unsafe behaviour.** `head-start.log.txt` is too terse to prove npm did not read user `.npmrc` or the registry. This round did not re-run the scripts.

## Claim 4 — CONFIRMED

Attack: a failed command or failed byte check can still print the success sentence.

It held. The script is `set -euo pipefail` and then a straight sequence; the success `printf` is the last line. `test -f`, the HEAD `test`, `sha256sum -c`, and the digest `test` all return nonzero on failure. `npm run` failure is the child’s status. `build:src` is `&&`-chained. `build:host` and `build:inventory` are `node -e` `import(…).then(…)`; `engines.node` is `>=22.12.0`, where an unhandled rejection is a nonzero exit. The evidence directory contains `final-preservation.log.txt` and `after.status.txt`, which the script writes only after those commands succeed. No Linux run is present, and the claim does not assert one.

**Gaps, not unsafe behaviour.** D7rhve does not capture stdout or a process exit code, so the success sentence itself is not in that directory; completion of the file writes is. The `node -e` `.then` paths have no `.catch`; fail-closed there rests on that Node engine abort.

## Findings outside the claims

None that meet the `BROKEN` standard. The missing authoring dispatch is the required orchestration fact above, not a defect in the run artifacts.

## Attacked and held

- Primary or fleet as `npm` cwd — failed: worktree `scaffold-path` after `cd`.
- Silent manifest or lock mutation — failed: both `sha256sum -c` logs and `after.status.txt`.
- Digest is the corrected guide — failed: pin `2b76b363…` vs campaign final digest `b6dae38c…`; pending-gates sentence.
- Publish, discard, HOST_PATHS edit, unbounded delete, primary manifest — failed: script text plus `stageHost`/`stageInventory` plus status delta.
- Success after failure — failed: `set -euo pipefail` and sequential writes.

Adjacent behaviour that looks like a defect and is not: `M host.json` is `build:inventory`; `stageInventory`’s `rmSync` is the temp staging root; Vite emptying `dist/src/*` and `dist/bin` is those outDirs; npm `changed 14 packages` is the tarball’s install closure under `--no-save`.

VERDICT: PASS
