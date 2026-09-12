# Service-script ownership reading

## Decision

Do not run the current supported `overwrite` against Ollama. Installed Scaffold `0.0.64` has confirmed `scripts/service.sh` as a foreign deletion candidate. Source inspection shows that a clean tracked copy reaches removal. Root has not executed that removal, so deletion is a source-backed prediction rather than an observed mutation.

A bounded Scaffold fix is required before the release carrier runs. The fixed target plan must claim an existing exact-case `scripts/service.sh` by birth ownership while leaving its bytes unchanged and without reconstructing vendor names. It must continue to classify tracked `scripts/docs.ts` as foreign. A deletion-deny-list exception alone is insufficient because the terminal audit would still report the retained script as foreign.

## Observed facts

- `tmp/pass/d7n-ollama-native-repair/action.stdout.txt` records `scripts/docs.ts` and `scripts/service.sh` as `orchestration / foreign`. The completed action was `repair`; its summary records no removal.
- Ollama still owns a live provisioner. `C:/Users/mikes/WebstormProjects/ollama/.github/workflows/ci.yml:48-52` invokes `bash scripts/service.sh` before `npm run test:service`. `C:/Users/mikes/WebstormProjects/ollama/guides/ollama.md:123` promises that same provisioning path for the real daemon and model.
- Scaffold's target contract says `vendors` is not reconstructed and that a present service script remains protected through the owned scripts inventory at `guides/scaffold.md:576-598`. The deletion contract says a planned birth-owned service script survives the owned-directory sweep at `guides/scaffold.md:1060-1063`.
- Target derivation omits `vendors` at `src/bin/CLI.ts:895-936`. `createBlueprint` therefore defaults it to `[]` at `src/core/factories.ts:50-70`.
- `blueprintToOrchestrationArtifacts` returns no service artifact when that array is empty at `src/core/compilers.ts:1522-1559`. The compiled plan still expands the vendored `scripts` root because `HOST_PATHS` contains `scripts` at `src/core/constants.ts:133-145` and `Materializer.#roots` expands host directories at `src/server/Materializer.ts:636-672`.
- The audit consequently discovers the target's unplanned `scripts/service.sh` beneath an owned root and reports it foreign. This matches the installed `0.0.64` observation rather than only the canonical source reading.
- `Materializer.remove` removes a foreign path when git reports it tracked and `matchesProtectedPath` returns false at `src/server/Materializer.ts:466-493`. `matchesProtectedPath` protects git metadata and the target's `src` and `app` trees, not `scripts/service.sh`, at `src/server/helpers.ts:110-135`.
- `CLI.#replace` passes the derived plan and tracked worktree into `remove` at `src/bin/CLI.ts:451-507`. A dirty tree refuses unless the caller supplies `--dirty`; a clean Ollama tree therefore does not gain protection from this precondition.

## Smallest read-only reproduction for root

Run the installed public executable against only the orchestration group:

```powershell
node C:\Users\mikes\WebstormProjects\ollama\node_modules\@orkestrel\scaffold\dist\bin\main.js audit --groups orchestration --offline --target C:\Users\mikes\WebstormProjects\ollama --json
```

This command is read-only. The load-bearing result is a finding whose path is `scripts/service.sh`, group is `orchestration`, and drift is `foreign`. Exit `1` is expected while that finding exists. A corrected implementation must omit that finding while continuing to report `scripts/docs.ts` as foreign.

## Existing coverage

`tests/src/server/Materializer.test.ts:1485-1522` compiles an explicit blueprint with `vendors: ['ollama']`. That input causes `blueprintToOrchestrationArtifacts` to plan `scripts/service.sh`, so the test proves that removal keeps a service script already present in the plan while deleting unplanned scripts.

The test does not exercise `CLI.#derive` on an existing target. It therefore does not cover the failing state where the service script is present, its vendor list is intentionally unknown, and the derived blueprint defaults `vendors` to `[]`.

## Fix boundary

Keep vendor discovery absent. Keep new-workspace script content driven by declared `vendors`. For a reading verb, preserve exact-path presence as a distinct structural fact so compilation can place a birth-owned `scripts/service.sh` in the target plan without claiming to know its vendor list or bytes. Add a real target-reading regression that starts with an edited tracked service script and an unplanned tracked `scripts/docs.ts`; audit must retain only the docs finding, and overwrite must preserve the service bytes while removing docs.

This boundary preserves mandatory retired-docs removal and the guide's service-script promise. It adds no parser, dependency, product-specific vendor inference, or broad exception for custom scripts.

VERDICT: FIX REQUIRED BEFORE OVERWRITE
