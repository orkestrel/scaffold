1. **CONFIRMED** — Browser classification uses the resolved import target and `BROWSER_OUTPUT`; no subpath-name condition selects the browser branch. The propagated `indexeddb` root export exercised the browser stage successfully.

2. **BROKEN** — An exports map with one typed root entry and an import-only `./raw` entry passes while `./raw` receives no type or runtime proof. `buildStage()` silently continues when the declaration target is absent at `src/core/templates.ts:1368`; later checks iterate only the remaining entries. Require every runtime export to resolve a `.d.ts` target, and throw with its subpath when it does not.

3. **CONFIRMED** — An absent distribution proof reports `missing`; arbitrary present bytes report `aligned`. The propagation retained the bespoke `mcp` and `process` proofs byte-for-byte.

4. **CONFIRMED** — Recognized script values produce an exact manifest differing only at the named values and appended entries. An unrecognized predecessor returns `undefined` without mutation.

5. **CONFIRMED** — Fresh empty setup modules and targets carrying a root setup proof produce no setup question. `#targetQuestions` calls `#setupQuestion` only for non-writing runs, so no writing verb refuses because of it.

6. **CONFIRMED** — `Blueprint.distribution` is absent from the type, factory, validators, and readers. A publishing blueprint derives one presence-owned proof; an application-only blueprint derives none.

7. **CONFIRMED** — The supplied release candidate contains current `dist/src`, `dist/bin`, and vendored-host digests. It was installed into a fresh runner and drove real targets, including core, server, browser-root, and bespoke-proof shapes.

8. **CONFIRMED** — Renaming a blueprint leaves the generated proof bytes unchanged. Package names, subpaths, and export names come from the installed manifest and declarations. Its fixed numeric values describe timeouts or structural invariants, not a moving published surface.

9. **CONFIRMED** — The guide matches distribution ownership, script-region refusal, setup advice, project registration, release-mode failure, and the unsupported styles axis. `npm run test:guides` exits `0`.

10. **CONFIRMED** — One archive is the fixed result of one pack invocation, and the nonempty entry assertion prevents vacuous success. Neither assertion tallies the moving published surface.

11. **CONFIRMED** — Setup behavior cannot be derived from filenames or exports. The measured reference-coverage candidate fails the available fleet checkouts, while load and type assertions duplicate existing gates or fail across host-specific setup modules. No fleet-wide behavioral assertion follows from scaffold-readable facts.

12. **CONFIRMED** — Vendored bytes move in `.agents/orchestration.md`, `guides/scaffold.md`, and `tests/config.test.ts`. `host.json` records their changed digests and the resulting membership digest.

13. **CONFIRMED** — No npm dependency changed. The only `typescript` import under `src/` is inside generated template text. No non-campaign path was added or removed, and the vendored inventory records every changed host member.

14. **CONFIRMED** — The replacement fails when a declaration’s extracted population becomes silent and remains unchanged when that declaration gains another example. The supplied firing control names the omitted server declaration.

15. **CONFIRMED** — `fenced` captures the declaration-body boundary before controls are appended. Only ordinals below that boundary increment `printed`, so control-only narrowing leaves the declaration at zero.

16. **CONFIRMED** — The tally and replacement detect different failures: the tally catches partial loss but false-fails on valid additions and misses equal-size redistribution; the replacement catches declaration silence without repricing itself. The report explicitly names its partial-loss limit.

17. **UNRESOLVED** — This sandbox cannot reach the registry, and the supplied evidence does not include the complete independent command output proving every lifecycle stage ran. Run `npm run prepublishOnly` on a network-enabled host at the audited tip and retain output showing `format:check`, `lint:check`, `check`, `build`, `test`, and `test:distribution -- --mode release` executed.

Findings fitting no claim:

- **BROKEN** — `replaceManifestScripts('{"scripts":{}}\n', [{ name: 'test:distribution', command: 'distribution', accepted: [] }])` returns `undefined`, although `ManifestScript` states that an absent script is always writable. The adjacent nonempty region appends the same script successfully. `src/core/compilers.ts:1896` and `:1899` refuse every empty region. Add an empty-region insertion path that writes the first entry without a leading comma while preserving exterior bytes and surrounding indentation.

VERDICT: FAIL — 1 broken, 1 unresolved, 0 not-evidenced, 1 findings outside the claims