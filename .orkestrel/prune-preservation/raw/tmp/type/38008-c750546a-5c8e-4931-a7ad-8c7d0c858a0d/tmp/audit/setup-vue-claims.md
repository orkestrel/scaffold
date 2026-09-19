# Audit the generated Vue browser setup repair

## Subject and decision

Decide whether the focused generated setupBrowser repair may ship in Scaffold0.0.75 and be consumed by R-B. The chain begins at178c7cbb (accepted S6 formatting repair), carries dc98373 (green release/version alignment), and adds the exact supplied setup-vue.patch. Audit only the fixed claims below; other roadmap work is outside this unit.

Read canonical AGENTS.md, .agents/orchestration.md, applicable typescript/architecture/patterns/tests/workspace/browser/application/quality/documentation/writing rules, orkestrel-falsify plus its brief/reconcile references, orkestrel-harden-package capability lane and required references, guides/README.md, guides/scaffold.md and relevant types. Read your isolated snapshot, not another lane's findings.

## Review evidence

Actual patch/status: canonical tmp/audit/setup-vue.patch and setup-vue-status.txt. Writer reports: tmp/release/scaffold-0.0.75/tmp/units/setup-vue-report.md and setup-vue-report-2.md. Grok map: .orkestrel/campaign/setup-vue-terrain-report.md. Independent installed-consumer red and rebuilt-green logs: release checkout tmp/setup-vue-consumer-red.log.txt and tmp/setup-vue-consumer-green-2.log.txt. Build log: tmp/setup-vue-build.log.txt. The intermediate setup-vue-consumer-green.log.txt records an outer reporter assertion failure despite a passing inner browser test; the final child reporter is verbose and retains discovery assertions. All named final runs have completed.

Already established directly by the Orchestrator: baseline real installed generated app/browser+setup/browser consumer reaches Chromium and fails at SetupComponent.vue </script> without the Vue transform (outer exit1, 1 failed and7 filter skips). The generated consumer imports the SFC through tests/setupBrowser.ts; it is not the local Roughnotes override. The patched package was rebuilt before its green consumer replay (same command, exit0, 1 passed and7 filter skips, duration26.69s). The generated host.json change records the updated guide digest and aggregate digest. These are executable foreign-client observations; no visual redesign is claimed.

## Falsifiable claims

1. A generated blueprint with app/browser and setup/browser transforms, imports and renders an actual Vue SFC in its setup:browser proof through the generated factory, without a handwritten plugin override or undeclared dependency.
2. Vue remains selected solely by the existing app/browser machinery. Setup/browser alone and src/browser+setup/browser add no Vue import/plugin/dependency. Configurations without setup/browser retain their prior output and project selection.
3. The emitted factory still uses the existing mergeOverride contract; the conditional span emits formatter-valid TypeScript and cannot leave an unresolved template token or unused Vue import in a supported selection.
4. The real regression binds to omission of the setup Vue transform. It runs an installed packed consumer, discovers the paired setup proof, imports through the setup module, and asserts rendered DOM; successful install, compilation, test collection or a skipped case alone cannot pass it. Cleanup and failure propagation remain correct.
5. The source/test/guide changes are confined to this selected-pipeline capability, obey centralization and types-first laws, introduce no public option or package dependency, and describe the conditional boundary truthfully.

## Lane execution

You are read-only and may run nonmutating commands your role permits. Your isolated worktree has the exact patch but no installed node_modules. The built release checkout's frozen dist and installed declarations are available for read-only runtime probes; name commands against that absolute path rather than installing. Do not write probes, mutate source, install packages or rerun broad gates. If an attack requires a write your role lacks, return the exact minimal instrument for the Orchestrator to execute; leave the claim UNRESOLVED until its evidence arrives. Do not make a negative finding from the absence of node_modules in the read-only audit copy.

Sol authored this repair. Opus is unavailable after its weekly-limit response, so separate clean-context Sol lanes substitute for the objective and subjective routes. Attack the author's assumptions explicitly and remain blind to the counterpart.

## Output

Return the falsify skill's numbered verdicts for every claim, precise evidence and attack attempted, substantiated outside findings if any, attacked-and-held and unresolved sections, and its exact single terminal line. CONFIRMED requires a named attack that failed. A plausible derivation or writer claim alone is UNRESOLVED. A finding is more useful than a polite pass, but invent none. Propose no broad redesign and accept nothing.
