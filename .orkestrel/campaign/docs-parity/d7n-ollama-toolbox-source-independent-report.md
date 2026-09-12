# Native source acceptance

Accept the reviewed Ollama and Toolbox source for their source commits. Accept the adapted Toolbox preparation carrier for execution under the dispatch's controls. Keep Ollama's registry overwrite held over `scripts/service.sh` ownership. This verdict does not accept a registry-prepared build, archive, or upload.

The reviewed baselines are Ollama `463efa2dbf5047813e5dee97a95975625e261d35` and Toolbox `f8175e9d241a3853cb7d1ee52b2dd9a68a53adfe`, on `claude/orkestrel-npm-audit-deps-14ibta`. The candidate is the actual diff and index captured in `tmp/pass/d7n-ollama-toolbox-source-review-input`.

## ENTRY — CONFIRMED

Attack: native Node could resolve a source alias before GuideCommand establishes the Vitest path, or an empty inventory could make parity pass without checking the package.

In each `tests/guides.test.ts`, runtime top-level imports are published Guide, Test, and Vitest entry points. Source aliases and package assertions load inside the callback passed to `GuideCommand.execute`. Ollama's top-level `ContextFormat` import is type-only. The installed GuideCommand contract and implementation select native or Vitest execution before invoking that callback.

GuideCommand receives the reader, runner, patterns, module inventory, and language configuration directly. It owns inventory collection, the fresh report, and authority writes. The entries neither rebuild those mechanisms nor call `scripts/docs.ts`.

Each callback requires and parses `package.json`, rejects an invalid record, asserts the exact package name, rejects report input failures, requires discovered rows and its own guide, and requires a nonempty guide surface. Explicit guide/source Summary assertions remain. These conditions prevent missing package identity or a missing Summary column from becoming a skipped success. This negative-path conclusion is source review, not a newly executed mutation probe.

The retained native red receipts identify unresolved `@src/server` and `@src/core` imports. The final native executions pass through the replacement entries.

## PRESERVATION — CONFIRMED

Attack: replacing local parity assembly could silently narrow titled examples, drop package behavior, or discard internal-export exceptions.

The migrated entries retain the titled-example report check and their explicit inventories. Ollama keeps an empty `INTERNAL`; Toolbox keeps `class TerminalBridge` and `class TerminalConnection`, including stale-exception refusal. Direct/barrel and export/guide checks remain, alongside hidden-source, section, method, declaration, drift, example, import, link, and test report assertions.

Ollama still checks provider name, generation/stream callability, configured format identity, and absent format. Toolbox still checks lineage tagging, draft parsing/completion, include expansion, query clamping, and execution through a real endpoint tool manager. The candidate adds no production API, local parser, forwarding wrapper, or replacement documentation host.

## O-CARRY — CONFIRMED

Attack: the native migration could reopen the accepted documentation candidate or substitute hermetic parity for real service evidence.

The Ollama candidate changes the native manifest entry, guide test, and supported generated config/policy files. Its accepted guide, source documentation, setup diagnostic exception, framing tests, and service tests do not change. The guide test still states the hermetic boundary and points service claims to the service project.

The accepted return and landing verdicts preserve the diagnostic-string exception rather than describing the original candidate as literally comment-only. The final source prepublish includes the live service run, which completed in `81.67s`. Neither that run nor the retained historical acceptance proves the future registry dependency state.

## T-CARRY — CONFIRMED

Attack: new method tables could rewrite closed audit wording, invent return contracts, or conceal a weakened declaration check.

The Toolbox guide diff only inserts the concrete store method tables beside `DefinitionStoreInterface`. The accepted audit corrections and close guard sentence remain outside that diff. The retained original reports and checker establish their preservation obligations; the native change does not reopen them.

`MemoryDefinitionStore.get` returns `Promise<DatabaseDefinition | undefined>` and copies a stored definition out of its backing map. Its `set` copies the definition into the map; `delete` removes it. `DatabaseDefinitionStore.get` returns the same optional-definition promise after narrowing the opaque column. Its `set` persists `{ id, definition }`; `delete` removes the row. Their mutators return `Promise<void>`. The added cells match `DefinitionStoreInterface`, the concrete declarations, existing TSDoc, and method bodies.

`d7n-toolbox-native-entry-green/action.stderr.txt` is a failing receipt despite its label: `report.declarations` reports the absent concrete-store method tables. That assertion remains active in the final source. Adding the exact tables closes the observed failure without weakening parity or replacing the original package cases.

## CARRIER — CONFIRMED

Attack: the adaptation could move dependencies between sections, omit Ollama's development-only dependencies, adopt unsupported external majors, or bump pending releases again.

`prepare-ollama-toolbox-registry-supported.sh` reads and validates runtime and development pins separately against the actual manifests. Ollama's development list includes abort, router, server, and workspace as well as the shared tooling. The preparation checks registry targets before mutation and validates the resulting ranges. Its pending versions remain Ollama `0.0.15` and Toolbox `0.0.13`.

`read-supported-toolchain.mjs` derives the declared major, queries that major, and rejects a release outside it. Preparation retains and compares peer metadata. It separately requires Ollama's external SDK `ollama` to remain `0.6.3`. The release closure repeats the final pin, external-toolchain, SDK, and peer checks. These are reviewed execution conditions, not claims that registry preparation has already run.

The live carrier hashes match the saved review hashes. The tooling carrier's predecessor delta changes the package selection and description, not its archive checks.

## BINDING — CONFIRMED

Attack: source acceptance could admit unrelated paths, or release closure could commit a state different from the gated and packed candidate.

The source carrier requires the accepted baseline, campaign branch, terminal verdict, successful source prepublish receipt, matching manifest/diff/index state, and an unstaged tracked candidate. Its explicit allowlist permits `guides/toolbox.md` only for Toolbox. Generated config/policy changes must match installed Scaffold artifacts. Identity and session trailers and campaign push checks remain.

Preparation and release closure retain explicit dependency targets, path allowlists, ancestry checks, archive identity checks, and receipt comparisons. Packing uses `npm pack --ignore-scripts` and compares archive manifest and distribution content to the canonical target. Release closure verifies the packed state, commits with the required trailers, pushes without force, and closes on clean canonical main with matching refs and artifact content. No reviewed carrier authenticates or publishes.

These checks do not cryptographically bind a prose verdict to its candidate or fingerprint the exact distribution produced at gate time. Root must retain control of intervening writers. The original combined `bash -n` invocation does not establish syntax acceptance for its argument scripts; the separately executed root checks supply that evidence. Ollama overwrite remains held regardless of the carrier's package selector.

## GATES — CONFIRMED

Attack: a green label, stale receipt, or historical config failure could be mistaken for acceptance of the reviewed state.

The actual final `action.exit.txt` values are `0` in `d7n-ollama-native-source-prepublish` and `d7n-toolbox-native-source-prepublish`. Their command output includes formatting, lint, scoped type checks, build, package tests, native guides, and release-mode distribution checks. Ollama also completes its live service project. The generated config project passes after the supported filename-normalization repair; the earlier failure is not waived.

The review-capture diff and index hashes match each package's gate captures before and after execution. The retained manifest hashes agree before and after the gates and with the live manifests. The explicit `--to guide` and `--to source` receipts exit `0`; their diff, index, and manifest captures remain unchanged. These prove the observed zero-drift rewrite outcomes, not a new disagreement-repair experiment.

The repair output still identifies the retired docs path. It is not a passed clean-tree ownership audit. Registry preparation, final archive acceptance, and upload remain future decisions.

## Outside findings and limits

No new substantiated outside finding arose from this review. The already assigned service-script ownership question remains held: CI uses `scripts/service.sh`, and this verdict neither classifies it as retired nor permits its deletion. No target mutation or independent gate execution was performed for this report; runtime conclusions rely on the inspected root receipts.

PASS
