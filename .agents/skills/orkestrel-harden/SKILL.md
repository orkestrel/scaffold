---
name: orkestrel-harden
description: Research, audit, refactor, implement, centralize, test, document, and locally verify an individual Orkestrel TypeScript package to enterprise-grade production readiness of its own contract on its supported hosts under the repository's current AGENTS.md. Use when asked to fill missing or deferred capabilities, compare upstream or legacy implementations, salvage prior art, centralize source or test declarations, eliminate nested functions or superfluous wrappers, maximize declared @orkestrel dependencies—especially @orkestrel/contract—or add rigorous real-implementation and live-service tests. Select only the phases required by a narrow request; run the full workflow for production readiness or comprehensive hardening. A guide, README, or TSDoc pass on one package runs the document phase alone.
---

# Harden an Orkestrel package

## Read

`AGENTS.md` § Authority and loading names the files every unit reads. This skill adds the references the selected lane names, the contracts, barrels, manifest, and configuration that lane needs, and every decision-bearing implementation file the user names, read first-hand by the decision owner. Delegate bulk reconnaissance and supporting research, never the design decision. Preserve dirty and user-owned work.

## Scripts

Run each from the checkout root. Each script's opening comment owns its behavior.

- `scripts/discovery.ts [--config vite.config.ts] [--projects a,b] [--json]` censuses which project collects each test file and which root script chain (a gate) reaches each project. It needs `npm ci` first. It flags a project whose tests no gate lists (ungated), a chained project that collects nothing (empty), and a test or spec file under `tests/` that no project collects and no `node` command runs (undiscovered). It reports without a flag the marker counts per file (`.todo`, `.skipIf`, `.runIf`, `.fails`, a `retry` or timeout option, a numeric timeout argument; `vitest/no-focused-tests` and `vitest/no-disabled-tests` refuse `.only` and `.skip`) and each workbench, an empty project no chain names. The reader rules every marker and reads the chain behind every workbench. Full collection passes `--staticParse=false` to evaluate runtime titles, setup modules, and shard selection. `--projects` lists only the named projects (an exact name never lists another; a name holding `*` or opening with `!` is a Vitest pattern and may reach beyond the names), exits 64 for a name no project matches without listing any other project, and skips the undiscovered scan. Exit 0 no flag, 3 a flag, 2 tool, listing, or option-table failure, 64 usage.
- `scripts/titles.ts --base REV [--root DIR] [--json] [--out FILE.json|FILE.txt]` compares the `describe`, `it`, `test`, and `suite` titles of `tests/**/*.test.ts` against `REV`. It flags a title registered fewer times than at `REV` as missing, or as moved when another string literal in `tests/**/*.ts` spells it; the reader rules each moved row by reading its holder. It reports each registration whose title is no literal (dynamic), which the comparison cannot follow, and flags a file that registers fewer of them than at `REV` (lost dynamic). It cannot see a removed `.each` table row or a title registered through an alias such as a `test.extend` result. `--root` defaults to the working directory and may sit below the repository top; `REV` may not open with `-`. Exit 0 no missing or moved title and no lost-dynamic file, 3 any of them, 2 git, filesystem, or lexical refusal, 64 usage.
- `scripts/measure.ts --rule ID [--options JSON] PATH...` counts one lint rule's hits over the named paths before the rule is enabled. It writes a variant config under `tmp/probes/lint/` that enables only that rule as an error beside the workspace's `plugins` and `jsPlugins` (so a `policy/` rule loads), runs the installed oxlint from the checkout root, and prints the total and the hits per file. A hit is a diagnostic whose code names the rule; another diagnostic, a parse error included, or a linter status other than a clean 0 or 1 refuses the count. `--options` is the rule's JSON options, an array spread after `error` or one value. The variant carries no `ignorePatterns` and no override, so it reads exactly the named paths. It needs `npm ci` first. Exit 0 no hit, 3 a hit, 2 the config or the linter cannot run or reports another diagnostic, 64 usage.

## Select the work lane

Choose the smallest lane that fully satisfies the request:

- **Structural:** centralization, nested-function removal, wrapper cleanup, or test-infrastructure consolidation.
- **Capability:** research and implement named missing behavior or upstream parity.
- **Hardening:** perform the complete production-readiness workflow.
- **Documentation:** a guide, README, or TSDoc pass on one package; it runs step 10 alone.

A narrow structural request does not authorize unrelated API redesign. A hardening request does authorize fixing every verified in-scope defect and completing every in-scope deferred capability.

Load [research.md](references/research.md) for upstream comparisons, legacy/`old/` material, or capability discovery.

Load [contract.md](references/contract.md) whenever the package declares `@orkestrel/contract`, the user requests contract adoption, or local code overlaps validation, parsing, outcomes, safe exception capture, schemas, or contract generation.

Load [centralization.md](references/centralization.md) for every structural lane and as a mandatory cleanup pass after capability or hardening work.

Load [hardening.md](references/hardening.md) for the hardening lane, for any request involving concurrency, lifecycle pressure, security boundaries, real services/models, test discovery, or package inspection, and before any repair round at a seam.

Load [document.md](references/document.md) for the documentation lane and for step 10 of every other lane.

Load [bindings.md](references/bindings.md) for a census or a sweep under `.claude/rules/typescript.md` § Bindings, together with [equivalence.md](references/equivalence.md). Before a census item becomes a lint rule, count the rule's hits with `scripts/measure.ts`.

Load [equivalence.md](references/equivalence.md) for a structural lane whose rewrite claims unchanged behavior, and cite it in the claims of the review that judges one.

## Execute the workflow

1. **Bound the campaign.** Record requested outcomes, in-scope environments and domains, explicit exclusions, supported hosts, dirty files, and the evidence acceptance needs. Draw the package's bounds: the contract its types and guide promise, the hosts it supports, and each host, runtime, or harness behavior it depends on but does not own, with what the contract promises when that behavior fails. Set the campaign's stops from the package's complexity and the goal's importance (the repair effort a seam receives before a design question, the pressure a proof applies, the cost a round may spend), state each stop with its reason in `.orkestrel/<package>/plan.md`, and re-examine every stop at each phase boundary. As soon as a candidate commit exists, run the package's release chain in a fresh clone on each reachable supported host, before any review round, and rerun only the checks a later change invalidates.
2. **Map before editing.** Trace public types, implementations, callers, tests, guides, exports, runtime boundaries, installed Orkestrel dependencies, and applicable legacy/upstream references.
3. **Establish the intended contract.** Build a capability/defect matrix inside the bounds step 1 drew, per [hardening.md](references/hardening.md) § Build the risk and seam matrix. Separate verified fact from inference. Mark each row implement, repair, retain, or exclude with a reason. Record the matrix in the tracked `.orkestrel/<package>/plan.md` as claims, a release bar, and a deferral list before the first writer: the claims are the campaign's definition of done; the bar names the observable consequences that make a finding outside the claims blocking; the deferral list holds every other finding with its owner and an observable trigger. The row set is fixed at this step: a finding a later step raises enters a row's repair or the deferral list, never the row set, and a row the user adds is a rescoping the ledger records. Re-baseline the planned work at each phase boundary per `.agents/orchestration.md`, which owns the step and its boundary with rescoping.
4. **Design types first.** Update `*/types.ts` and record the design decision before implementation, under the root design laws; write guide prose at the root's final pass. A contract that needs a compatibility shim is the wrong contract.
5. **Implement completely.** Finish every in-scope branch and reuse the exact installed Orkestrel primitives whose semantics match.
6. **Prove each defect before repairing it** per the defect rule in `AGENTS.md` § Work loop. A repair with no red-then-green record is unproven.
7. **Consolidate.** Run the complete centralization and wrapper sweep. Update all call sites to the real symbol rather than leaving aliases or 1:1 delegates.
8. **Challenge seams within the bounds.** Add deterministic tests for invariants, boundaries, failures, lifecycle, cleanup, cancellation, concurrency, malformed or unexpected input, and resource pressure as applicable, under the test rules' real-implementation law and [hardening.md](references/hardening.md) § Challenge lifecycle and pressure. A seam is the package's contract meeting a boundary; prove a boundary the package does not own only as far as the contract promises about it, and treat a finding past that promise per [hardening.md](references/hardening.md) § Hold the package's bounds. Set each pressure proof's load and repeat count from the defect it must expose, state them with the reason beside the proof, and accept the proof under the suite load it ships in.
9. **Use live services deliberately.** Put real external services/models in their dedicated project, require readiness, and make each request minimally sufficient, stable across the service's nondeterminism, and behaviorally meaningful. For a foreign-client claim, apply the seam row in [hardening.md](references/hardening.md) § Use real implementations.
10. **Document the final behavior** per [document.md](references/document.md).
11. **Audit completion.** Run `node .agents/skills/orkestrel-harden/scripts/discovery.ts` and rule on every flag and marker it reports, then inspect source/test helper duplication, exports, environment isolation, unexpected text corruption, and the entire diff.
12. **Verify scoped.** Run the gates of the touched projects per `.agents/orchestration.md` § Size gate, in the order the package's own chain fixes, and inspect the generated outputs relevant to the request.
13. **Review by the size gate, never by the author.** Run the review `.agents/orchestration.md` § Size gate names on the matrix's claims. Rule every finding before any repair: a finding against a claim is repaired within that claim's row; a finding outside the claims blocks only above the release bar; every other finding enters the deferral list with its owner and trigger. Class each repair's remedy per § Size gate (a correction, a design question, or a deferral), and send a finding about a boundary the package does not own to step 14 before any writer starts. Rerun the affected scoped verification after each repair.
14. **Hold the bounds.** Before another repair round at one seam, apply the stop step 1 set for it, re-examined against the signals [hardening.md](references/hardening.md) § Hold the package's bounds names. When the stop fires, or when the seam's findings concern a boundary the package does not own, open one design question on the package's dependence on that behavior, record the decision in `plan.md`, and route the findings that remain outside the contract to the deferral list with owner and trigger. A stop keeps every claim closed and the bar unbroken; a stop that would reopen a claim is a rescoping the user rules on.
15. **Verify tree-wide.** After the review closes, run the tree-wide gates once per `.agents/orchestration.md` § Campaign, with the release chain in a fresh clone of the candidate on each reachable supported host, and name the independent receipt per § Acceptance.

## Accept the result

Completion requires:

- every matrix row closed: implemented, repaired with red-then-green evidence, retained, or excluded with its reason, and no row added since step 3 without a recorded rescoping;
- no finding above the release bar, and every other finding in the deferral list with its owner and an observable trigger;
- every stop step 1 set honored as stated, and each design decision step 14 made recorded in `plan.md`;
- public contract, implementation, tests, guides, and generated outputs aligned;
- the centralization, wrapper, dependency-reuse, test-discovery, and text-integrity sweeps run, each hit repaired within a row or deferred with its owner;
- the release chain green in a fresh clone of the accepted commit on each reachable supported host, with exact command evidence for every final gate and the independent receipt `.agents/orchestration.md` § Acceptance names.

Passing tests without an adequacy review, and a builder's self-report, are not completion evidence. When every row is closed, no finding stands above the bar, and the gates are green, stop per `AGENTS.md` § Work loop; a finding below the bar reopens nothing.

Report what changed, what evidence proves it, exact test/gate results, the deferral list, and any genuine residual risk.
