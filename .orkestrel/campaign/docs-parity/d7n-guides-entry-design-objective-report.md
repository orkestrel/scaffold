Objective lane held: correctness, constraints, and permitted ownership.

## Proposal

Make `test:guides` a Node launcher backed by Vitest’s public API:

```text
npm run test:guides
npm run test:guides -- --to guide
npm run test:guides -- --to source
```

The generated command becomes:

```text
node --experimental-strip-types scripts/guides.ts
```

The launcher must:

- accept no argument or the exact `--to guide` and `--to source` forms;
- reject other arguments with usage and exit `2` before opening Vitest or writing;
- preflight `guides/README.md` and each indexed spec through `parseManifest`, preserving the existing missing-input exit `2`;
- call public `createVitest('test', …)` with the `guides` project, cache disabled, watch disabled, and the existing reporter;
- carry the validated direction through config `provide`;
- call `runner.start()`, treat an empty module set, an unhandled error, or a module state other than `passed` as failure, and preserve any stronger nonzero status;
- call `runner.close()` in `finally`.

The installed declarations expose `createVitest`, `start`, and `close`; the retained probe demonstrates `provide` before `start`, `inject` in the collected test context, result inspection, and closure ([run.mjs:8](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/guides-cli-probe/run.mjs:8), [run.mjs:17](C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/guides-cli-probe/run.mjs:17)). The direct Vitest CLI cannot accept `--to`; it rejects the flag before collection ([d7n-guides-cli-reading.md:7](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/d7n-guides-cli-reading.md:7)). Reject private chunk imports.

Add `tests/setupGuides.ts` to the generated `guides` project after `tests/setup.ts`. It reads `inject('direction')` before the package-owned test module snapshots inventory. It owns host reporting, rewrite planning, and file writes. The package-owned `tests/guides.test.ts` remains the assertion suite. Vitest already defines this project as Node-only ([tests.md:66](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md:66)); Scaffold’s template fixes its exact test include and setup list ([templates.ts:337](C:/Users/mikes/WebstormProjects/scaffold/src/core/templates.ts:337)).

`tests/setupGuides.ts` must plan against an immutable initial inventory and accumulate edits in a mutable text map. It flushes changed files after planning, reads a fresh inventory, and reports remaining drift. Vitest then imports `tests/guides.test.ts`, so its existing surface, member, summary, example, pitch, and executable-fence assertions evaluate post-write bytes. Ruling 32 requires this behavior and ordinary non-mutation ([rulings.md:198](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/rulings.md:198)).

Do not add a Guide public type or function. Guide already supplies the required pure mechanisms: `findDrift`, `parseManifest`, the collectors, source-line and comment locators, and the summary/example replacers. Guide explicitly keeps these functions I/O-free and assigns file writes to the consumer ([guide.md:615](C:/Users/mikes/WebstormProjects/guide/guides/guide.md:615)). A new filesystem API would violate the core boundary ([AGENTS.md:30](C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md:30)).

## Per-claim reasoning

### G1

The Node launcher receives npm’s forwarded arguments before Vitest’s CAC parser. It therefore avoids the observed `CACError` without enabling unknown Vitest options. `createVitest` supplies the supported pause between server creation and test start; `provide` carries the direction before setup and test imports. The launcher uses the package’s supported `node >=22.12.0` floor and the already-used `--experimental-strip-types` path ([package.json:119](C:/Users/mikes/WebstormProjects/scaffold/package.json:119)).

The launcher must not rely on reporter output or implicit `process.exitCode`. It inspects `TestRunResult`, preserves thrown failures, and closes in `finally`. The final generated-workspace proof must plant a failing guides assertion and show the wrapper exits nonzero.

### G2

Ownership is:

- Guide core: pure parsing, comparison, location, and replacement.
- `tests/setupGuides.ts`: workspace inventory, reporting, rewrite planning, fresh reads, and writes.
- `scripts/guides.ts`: argument validation, input preflight, Vitest lifecycle, direction transport, and process status.
- `tests/guides.test.ts`: package-authored parity and behavior assertions.

The assertion and setup paths may each call `findDrift`; that is reuse of the same parity engine, not competing comparison logic. The setup module must not reproduce parsing or comparison semantics. Existing test ownership is explicit: `tests/guides.test.ts` is package-authored ([scaffold.md:1001](C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:1001)), while the prior seed was vendored ([scaffold.md:1023](C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:1023)).

### G3

The direction boundaries remain:

- No direction: report initial drift and write nothing.
- `--to guide`: rewrite supported `Summary` cells only. A titled example remains unchanged and reports that the guide fence owns it.
- `--to source`: rewrite supported doc-block summaries and titled examples only.
- Pitch drift: always report; never rewrite `README.md`.

The guide-side example limit is intentional. The existing writer does not call `replaceFence` and reports the fence as owner ([scripts/docs.ts:284](C:/Users/mikes/WebstormProjects/scaffold/scripts/docs.ts:284)). Do not widen this design under the general `--to guide` wording.

Build the entire change map before flushing. Reuse the current text after each edit, so manifest rows targeting a shared source file cannot overwrite earlier edits ([scripts/docs.ts:380](C:/Users/mikes/WebstormProjects/scaffold/scripts/docs.ts:380)). Index each source key to all declaring files. A missing key, a key declared in several files, a missing comment span, or a replacer refusal remains unresolved and writes nothing for that drift. Before flushing, compare each destination with its initial bytes; refuse the write set if a destination moved. Unchanged bytes never reach `writeFileSync`.

After flushing, read inventory again and recompute drift and pitch. Report only what remains unresolved, plus the changed-path and formatter notices. This corrects the old seed’s stale post-write reporting while preserving its output vocabulary.

Real temporary-workspace controls must cover:

- direction reversal, with source and guide hashes proving the unselected side stayed unchanged;
- manifest rows sharing a source file, with distinct edits retained;
- an unsupported guide fence under `--to guide`;
- missing and ambiguous source locations;
- missing index and indexed spec;
- invalid flags;
- unchanged files;
- a converged rerun that performs no write;
- a failing fresh assertion and launcher failure status;
- setup or assertion failure with launcher closure.

### G4

Replace `DOCS_SEED_PATH` with `GUIDES_ENTRY_PATH` and `GUIDES_SETUP_PATH`. Include the entry and setup artifacts only when `blueprint.guides` is true. Emit `test:guides` to the launcher, emit no `docs` script, and remove `docs` from writable manifest regions. The present compiler emits the Vitest command and `docs` together ([compilers.ts:350](C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:350)); update that site atomically.

Add an exact `RETIRED_HOST_PATHS` entry for `scripts/docs.ts`. Materializer audit must add this exact path to its snapshot population when the selected group covers it. With no planned artifact, core reports it as `foreign`; `overwrite` then uses its existing tracked-file, clean-tree, protected-path, and reconfirmation checks before deletion ([Materializer.ts:880](C:/Users/mikes/WebstormProjects/scaffold/src/server/Materializer.ts:880)). Do not widen ownership to the whole `scripts/` directory.

Canonical Scaffold ownership includes:

- `src/core/constants.ts`
- `src/core/compilers.ts`
- `src/core/templates.ts`
- `src/server/Materializer.ts`
- `scripts/guides.ts`
- `tests/setupGuides.ts`
- affected compiler, materializer, config, distribution, and guides tests
- `host.json`
- `guides/scaffold.md`
- `.claude/rules/documentation.md`
- `.claude/rules/workspace.md`

Remove `scripts/docs.ts`. Keep Scaffold’s primary manifest and lockfile report-only for the isolated integration owner, as dispatched.

A workspace without guides must receive no guides launcher, setup module, project, or manifest script. Guide self-dogfooding must use the same propagated entry while retaining its package-owned cases. The generated-consumer tests must assert those boundaries and prove `overwrite` removes the tracked retired seed without deleting an unrelated script.

### G5

Consume the accepted Contract, HTML, and Markdown artifacts in dependency order when building Guide. The accepted Markdown artifact updates readiness, not this design. Build the revised Guide, inspect runtime files and emitted declarations including TSDoc, and compare them with the preserved accepted artifact. A changed archive digest alone does not establish material movement.

Build Scaffold against the revised Guide artifact. Use revised Guide and Scaffold artifacts to rerun the lower-layer guide workflows. Compare emitted runtime and declaration content with preserved artifacts before replacing any unpublished candidate. Do not wait for later development-pin cleanup and do not publish in this scope. This follows Ruling 31’s artifact and declaration requirement ([rulings.md:189](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/rulings.md:189)) and Ruling 30’s separation of later development-only pins ([rulings.md:166](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/rulings.md:166)).

## Bounded units

- Scaffold canonical entry and migration: `implementer`, Sol. Own the canonical source, vendored entry/setup, focused tests, rules, guide, and host inventory. Leave primary manifest files report-only.
- Guide adoption and self-dogfooding: `implementer`, Sol. Apply the supported Scaffold propagation in an isolated Guide checkout, preserve package-authored cases, and update Guide-owned prose.
- Manifest integration: Orchestrator-owned serial integration. Apply the exact `test:guides` and `docs` removal rows without overwriting owner changes.
- Gate and artifact evidence: `verifier`, Terra. Run focused command fixtures, package gates, tarball builds, and runtime/declaration comparisons.
- Design-fit and correctness review: `reviewer` on Opus and `analyst` on Sol, blind and clean-contexted.

## Tensions and settling commands

The retained probe proves public launch and direction delivery, but not setup ordering, generated configuration, write selection, or exit propagation. Settle those claims in real generated temporary workspaces with the exact npm commands, recorded file snapshots, and a planted failing assertion.

The retired-path mechanism is safe only if audit derives the exact old path and `overwrite` retains its tracked, clean-tree, protected-path, and moved-byte checks. A focused Materializer case must prove refusal for an untracked old seed and preservation of an unrelated script.

The launcher’s result-state rule must be confirmed against passing, failing, collection-error, and empty-project fixtures. Do not infer it from reporter text.
