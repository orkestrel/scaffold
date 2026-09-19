# Reconcile the browser wrapper's preservation contract

## Decision

Hold a narrow design lane on the configuration capability R-B already owns. Read canonical AGENTS.md, .agents/orchestration.md, rules workspace/application/tests/architecture/quality/writing, orkestrel-prove-journey and required references, guides/scaffold.md on ownership, and Roughnotes guides/README.md. Perform directly; edit nothing and spawn nothing.

Determine the correct durable home for Roughnotes' existing optimizeDeps.include list (`vue`, `bootstrap`, `@popperjs/core`, `@orkestrel/test`, `@orkestrel/test/browser`) under the current Scaffold contract. The old R-B brief instructed moving that list from the regenerated root to a supposedly birth-owned configs/app/vite.browser.config.ts and asserting it in conformance. Grok's current source map proves that premise false: the app browser wrapper is content-owned and repair restores appBrowser() without the override. The journey wrapper is birth-owned. Do not treat the old brief's adjective as authoritative over the real ownership contract.

## Evidence and bounds

Read `.orkestrel/campaign/setup-vue-terrain-report.md` for exact compiler/type/guide pointers; source and guide are primary for the ownership question. Canonical Scaffold and its release worktree `tmp/release/scaffold-0.0.75` have the same ownership logic; a separate writer is repairing only setupBrowser's Vue transform there. Do not write or run tests in that active tree.

Roughnotes' frozen adoption worktree is `tmp/recovery/roughnotes`; read its config and conformance changes and original baseline86a9ef6 as necessary. Its app/journey tests run the generated root factories. The browser wrapper is used by dev/build. R-B's wide journey variants already pass using the generated root without that prebundle list; compact failures are the separately handled modal wait. The list's necessity for every host has not been proved. Distinguish a required product capability from a historical configuration setting.

Options may include preserving an existing sanctioned application override seam, removing an unnecessary local conformance assumption on measured evidence, or a narrowly scoped upstream ownership correction if the desired durable customization has no existing door. Do not recommend a hand-edited content-owned file, a package-specific Scaffold default, an extra npm package, a second config parser, or a broad wrapper redesign. A proposed omission must name the run that would establish it safe; an upstream change must name its contract, first consumer, preserved/nonpreserved behavior and falsifiable proof.

## Output

State the lane's recommended rule with guide/type/source evidence, practical cost, exact bounded implementation or proof needed, and the smallest independent run that would refute your recommendation. Name unresolved inputs. Do not accept work or infer test greens. No raw source dump.

Sol holds separate clean-context subjective and objective lanes because Opus returned its weekly limit in this session. The dispatch names your perspective. Remain blind to the other lane and to its result.
