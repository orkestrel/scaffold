session id: 
journal: /home/user/scaffold/tmp/codex/distribution-design.jsonl

## Recommendation

Derive distribution from a non-empty `Blueprint.src` selection and remove the redundant `Blueprint.distribution` field. Compile `tests/distribution.test.ts` as a template-origin, presence-owned artifact: scaffold writes it when absent but never compares or replaces present bytes. Add an atomic, compare-and-swap manifest migration that inserts `test:distribution` and upgrades the recognized scaffold-generated `prepublishOnly` chain. Keep the proof outside `HOST_PATHS` and `host.json`.

## Rulings

1. **Authorship.** Generate the proof through `blueprintToTestArtifacts`. Do not vendor it. Content vendoring would replace the bespoke proofs in `brief`, `mcp`, `probe`, `process`, and `scaffold`; presence vendoring would put a package-owned test into the fleet-wide host inventory and would require extra selection logic for private workspaces.

2. **Package specificity.** The installed manifest supplies the package name, public subpaths, condition targets, runtime dependencies, peer declarations, and executable targets. The TypeScript compiler API can derive every declared value export from each built declaration entry. Scaffold cannot derive valid domain calls, expected results, cross-format brand invariants, documented examples, valid CLI arguments, or package-specific assets that are not named by `exports` or `bin`.

3. **Existing proofs.** Preserve their bytes. A present presence-owned path audits as aligned and repair skips it. Their configured distribution project and release-gate scripts remain canonical.

4. **Idempotence and ownership.** Write only when absent, then leave the package in control of the file. Audit reports a missing, presence-owned finding and reports the absent script or gate link. Repair and overwrite must write the proof, root configuration, and manifest script region as one adoption unit. A later run writes nothing. A noncanonical manifest script state must cause a refusal without mutation.

5. **Shape variance.** One generated file can discover core and server faces, conditionally drive declared ESM and CommonJS entries, inspect `bin`, and omit CommonJS checks where no `require` condition exists. Browser targets need a real-browser branch selected from their export target path. Executable targets need a structural branch; their valid arguments and expected behavior remain package-specific.

6. **Cost.** This is a medium-to-large cross-cutting scaffold change covering the public blueprint contract, compiler templates, manifest-region mutation, CLI adoption, tests, and guide parity. None of the measured targets lacking the proof needs package-specific work because their manifest scripts match the recognized scaffold-generated predecessor state. Generating only the file would leave every such target needing a manual manifest edit.

## The generated proof's content

- **Packed artifact creation — fixed rule.** Run `npm pack --ignore-scripts` against the already-built workspace and require one tarball.

- **Real consumer installation — fixed rule.** Install the tarball into an isolated consumer. Under `--mode release`, any install failure is fatal. An ordinary run may use an explicit local fallback only for a named registry-connectivity or sandbox denial.

- **Package identity — runtime-derived.** Read the installed package name and package root from the installed manifest. Emit no package-name literal.

- **Export target membership — runtime-derived.** Traverse the installed `exports` map and require every relative file target to exist inside the installed package.

- **Unexported-subpath control — runtime-derived with a fixed suffix rule.** Choose a collision-free absent subpath and prove that package resolution rejects it.

- **Declaration surface — runtime-derived.** Load each declared `types` target with the TypeScript compiler API and collect its value exports through module symbols, including aliases and re-exports. Do not use a declaration-text regular expression.

- **ESM surface — runtime-derived.** For every executable `import` condition outside the browser branch, import the installed specifier in a child process and compare its keys with the corresponding declaration value exports.

- **CommonJS surface — runtime-derived.** For every declared `require` condition, require the installed specifier and compare its keys with the corresponding `.d.cts` value exports. An entry without that condition receives no CommonJS assertion.

- **Browser surface — derived branch with fixed machinery.** Detect targets beneath the published browser output, bundle an installed-package consumer with the declared Vite toolchain, run it in Playwright Chromium, and compare its runtime keys with its declaration value exports.

- **Consumer type resolution — fixed modes over runtime-derived specifiers.** Compile imports of every code subpath under `node16`, `nodenext`, and `bundler`. Add the absent subpath as the firing control and require that control to fail.

- **Runtime dependency fallback — runtime-derived.** When a non-release sandbox prevents installation, populate the extracted consumer from dependency and peer names read from the manifest. Report that path as fallback evidence, never as proof that npm installed the package.

- **Executable structure — runtime-derived.** For each `bin` entry, require the installed target and launcher to exist, require the target to parse as JavaScript, and check the shebang where the platform uses it. Do not invoke an unknown command contract.

- **Package semantics — omitted.** The generated proof contains no named API call, expected export tally, brand check, documented example, or CLI-output assertion. Bespoke proofs retain those stronger claims.

## Units

- **Derived distribution contract.** Own `src/core/types.ts`, `src/core/validators.ts`, `src/core/parsers.ts`, `src/core/factories.ts`, and their tests and setup data. Acceptance: a published blueprint cannot represent distribution as disabled, while a private workspace plans no distribution project.

- **Generated proof plan.** Own `src/core/compilers.ts`, `src/core/templates.ts`, and their focused tests. Acceptance: every published plan contains a presence-owned distribution proof, the isolated project, the direct script, and the release-mode gate entry; no host artifact or inventory row is added.

- **Safe target adoption.** Own `src/server/types.ts`, `src/server/Materializer.ts`, `src/bin/CLI.ts`, and their focused tests. Acceptance: audit reports the absent proof without writing; repair and overwrite atomically adopt the recognized predecessor state; a repeated run is empty; a present custom proof remains byte-identical; a customized script chain is refused without mutation.

- **Generated-package execution.** Own the scaffold distribution fixture coverage. Acceptance: generated core, server, browser, import-only, and executable shapes pack and run through the applicable branches. A simulated unavailable registry fails in release mode and follows only the named local fallback outside release mode.

- **Guide parity.** Own `guides/scaffold.md` and the related guide assertions. Acceptance: the guide describes distribution as derived, states presence ownership, documents the manifest migration boundary, and removes the claim that scaffold writes no distribution proof.

## Risks

- A target that changed `test:distribution` or `prepublishOnly` no longer matches the safe predecessor state. Automatic migration must refuse it, so that target needs manual reconciliation.

- A browser workspace without a launchable Chromium cannot establish the browser branch. The release gate must fail rather than convert that missing evidence into a pass.

- An export map containing patterns, custom conditions, or non-file targets exceeds the measured scaffold-generated shape. The proof must report the unsupported entry rather than silently omit it.

- Incorrect filtering of TypeScript module symbols can confuse type-only and runtime exports. The implementation must use the compiler checker and prove aliases, re-exports, default exports, and declaration-only symbols with controls.

- An overly broad connectivity classifier can hide a real installation defect during local runs. Release mode must never use the fallback, regardless of the reported npm error.

- Preserving existing bespoke proofs preserves their differing coverage. This mechanism establishes file ownership and gate reachability; it does not make those proof bodies byte-identical.
