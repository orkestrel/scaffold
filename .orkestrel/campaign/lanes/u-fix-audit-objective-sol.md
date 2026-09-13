## Numbered verdicts

1. **BROKEN.** The retained control reports `2 passed` after `supportsMappedLoopback` was stubbed to `return false`. This host’s real predicate also returns `false`, so the stub is indistinguishable. The substitute wrong-refusal control is valid, but it does not make the claimed stub fail. Amend the claim to require that substitute control.

2. **CONFIRMED.** `executeOllamaSetup` supplies only its scratch directory as `PATH` and resolves Bash separately. `OLLAMA_TOOLS` matches every external program launched by `scripts/ollama.sh`: `curl`, `dirname`, `mkdir`, `mktemp`, `node`, `rm`, `setsid`, `sh`, `sleep`, `timeout`, and `uname`. It includes no builtin. Bash supplies `kill`, `printf`, `command`, `cd`, and `pwd`. The fixture reaches `/api/version`, receives exit `127`, and cannot reach the daemon-launch line because `ollama` is absent.

3. **CONFIRMED.** The authoritative `test:src:server` run reports `445 passed | 1 skipped`. The existing mapped-address case remains conditionally skipped on this host; every applicable Ollama case passes. Reading the complete script found no omitted external tool.

4. **BROKEN.** The provisioning case moved to `tests/distribution.test.ts`, retains its `skipIf` gate and timeout, and ran in the retained release-mode log. The setup project contains no registry-backed branch, and its module-scope npm reading is gone. However, a host with no npm fails the `reads the ambient npm version` case at `tests/setupServer.test.ts:1051` and the `launches the ambient npm unchanged` case at line 1059. Merge those npm-dependent assertions if absence must fail only the named case.

5. **BROKEN.** `TestNpmInterface` is absent, and no npm-version binding named `host` remains. However, `tests/distribution.test.ts:926` still names `resolveNpm` in a comment. Replace that stale token with `provisionNpm`.

6. **CONFIRMED.** `DEFAULT_DEV_ENGINES` is absent from `src/`, `tests/`, and `guides/`. The built core entry exports `WORKSPACE_DEV_ENGINES`; the in-process reading returned npm `>=11.6.0` with `onFail: 'error'`. `blueprintToManifest` emitted that same record for default and explicitly raised Node blueprints, while preserving each blueprint’s `engines.node` value. `DEFAULT_ENGINES` remains `>=22.18.0`.

7. **BROKEN.** The generated-workspace paragraph states the correct Node floor, npm floor, refusal, and fixed-manifest semantics. Its code tokens do not all have following nouns: `>=22.18.0`, `>=11.6.0`, `error`, and later `11.6.0` occur without one. Use forms such as the `>=22.18.0` range, the `>=11.6.0` range, and the `error` value.

8. **UNRESOLVED.** `README.md` states Node `22.18.0`; the pin reads `package.json`, not a constant; and the retained positive run reports `23 passed`. No retained log executes the required negative control. With `README.md` changed to `22.12`, the pin’s regex reads `undefined` because it requires a patch component, against the declared `22.18.0` value. This system-temporary-tree command settles the instrument:

```sh
audit_root=$(mktemp -d)
git archive 373d29e | tar -x -C "$audit_root"
ln -s /home/user/scaffold/node_modules "$audit_root/node_modules"
sed -i 's/Node 22\.18\.0 or later/Node 22.12 or later/' "$audit_root/README.md"
npm --prefix "$audit_root" run test:guides
```

The named case must fail with `undefined` against `22.18.0`.

9. **BROKEN.** The `&&` row still says “one failing project” at `ROADMAP.md:385` and “one red case” at line 386. Possessivized code tokens remain at lines 297 and 368: `` `SetupPanel`'s `` and `` `OllamaProvider.test.ts`'s ``. The npm-range row also contains no `npm-boundary-readings.log.txt` citation. The `target: 'node22'`, mapped-loopback, SQLite chain, warning, and measured-range substance is present.

10. **CONFIRMED.** The SHA-256 digest of `guides/scaffold.md` is `bb6cb29f5304481b9be666c104d15cdf892d9754c70936bd928b820b66e58d61`, exactly matching its `host.json` entry. The retained log records `build` exit `0`, regeneration of the inventory, and `test:config` exit `0`.

11. **CONFIRMED.** `final2.status.txt` and `final-verify2.log.txt` record exit `0` for build, format, lint, checking, every applicable source and workspace-proof project, release-mode distribution, and the literal `prepublishOnly` command.

12. **BROKEN.** The literal `c2a42a1..373d29e` range includes the retained unit report and verification records, plus `host.json`. The U-fix brief lists `.orkestrel/**` and `host.json` as off-limits, so the range does not touch only files that brief owns. The supplied review diff excludes campaign records, but still contains the Orchestrator-owned `host.json` change. Restate the claim around product carriers and the separately owned inventory integration.

13. **CONFIRMED.** The package manifest and lock declare Node `>=22.18.0`; the README states Node `22.18.0`; the guide states the generated Node and npm floors; the built compiler emits those values; and the retained npm boundary log records refusal below npm `11.6.0` and admission at that version. The commits after `373d29e` change only the audit brief and retained pack record, so the consumer-facing tree is unchanged.

## Findings outside the claims

- **F1 — The renamed constant’s TSDoc violates the code-token noun rule.** `src/core/constants.ts:496` says `` `onFail` set to `error` ``. Write “the `onFail` key set to the `error` value.”

## Attacked and held

- **Claim 1 adjacent behavior:** The plain IPv4 control remains `200`, and the wrong-refusal substitute distinguishes `EAFNOSUPPORT` from an unrelated failure.
- **Claim 2:** A complete script reading found no missing external program and no builtin incorrectly included. Every listed program resolves to an executable on the retained host.
- **Claim 4 adjacent behavior:** Only `tests/distribution.test.ts` can provision npm. The setup call supplies its ambient version as its floor and leaves the prefix without `node_modules`.
- **Claim 6:** Default and raised-blueprint in-process calls showed that the npm record is invariant while `engines.node` remains blueprint-controlled.
- **Claims 10 and 11:** The independently recomputed guide digest and retained bare command exits agree.
- **Claim 13:** The actual branch tip is `ac25715`, but `373d29e..ac25715` contains campaign evidence only; no package byte changed after the fix tip.

## Unknown observations

- **U1.** The declared tool-name set is complete. Portability remains unproved because `resolveTool` rebuilds lookup from `PATH` and accepts the first regular file without checking executable permission. A portable enumeration would read `command -v -- "$tool"` through the same resolved Bash interpreter under the parent environment, then validate the returned executable.
- **U2.** The source skips provisioning when ambient npm compares at or above `11.6.0`, but this host cannot exercise that branch. Run `npm run test:distribution -- --mode release -t 'provisions the floor and resolves that copy when the ambient npm is beneath it'` on a host whose ambient npm satisfies the floor; the named case must report skipped.

VERDICT: FAIL 1, 4, 5, 7, 8, 9, 12; outside the claims: F1