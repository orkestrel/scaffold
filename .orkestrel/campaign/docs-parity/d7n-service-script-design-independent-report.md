# Preserve the existing provisioner

Recommend a dedicated structural fact, `Blueprint.provisioner`, and retain the existing birth-ownership mechanism. Do not change foreign-path classification or deletion eligibility. Keep vendor-driven creation separate from retention of an existing provisioner.

This is a design proposal, not implementation acceptance. Installed Scaffold `0.0.64` has reported the provisioner as foreign. Root has not deleted it. The removal consequence remains a source-backed prediction.

## Contract before implementation

Add this required field to the closed `Blueprint` record:

```ts
readonly provisioner: boolean
```

Define it as the observed presence of the exact-case physical `scripts/service.sh`, not permission to generate a provisioner and not evidence that a service test exists. `createBlueprint` defaults it to `false`. Target reading supplies its real value. Do not derive it from `vendors` or `service`.

The existing shape cannot express this fact honestly. `service` selects the live-service project through `tests/setupService.ts`. `vendors` holds declared external names that target reading intentionally cannot recover. `overrides` carries replacement content, not observed ownership. Reusing those fields would either invent names, register a project without its defining file, or claim authority over edited bytes.

The public API cost is a required structural field on serialized blueprints and callers that construct them directly. Factory callers keep their existing defaults. This cost is justified by the real CLI consumer, but it must remain confined to the fixed provisioner path. Do not introduce preservation lists, a provider registry, or a general target-observation object.

## Planning and creation

In `blueprintToOrchestrationArtifacts`, return no artifact when vendors are absent and `provisioner` is false. Otherwise use the existing `SERVICE_SCRIPT_PATH`, orchestration group, birth ownership, and `ContentArtifact` template path. Keep the declared vendor list as the only input to the template's inventory. Do not substitute a guessed vendor or copy the target's edited text into the blueprint.

For retention without vendor names, the template carries an empty declared inventory. That payload is not replacement content: birth ownership remains aligned even when target bytes differ or the file disappears. Existing-target repair therefore never writes it. The artifact supplies planned membership, which removes the file from the foreign population used by audit and removal.

There is a creation hazard worth closing explicitly: `Materializer.materialize` writes every planned artifact into a vacant target. Merely widening the compiler condition would let a library caller materialize the retention-only template with no declared vendors. To preserve the required vendor-driven creation contract, reject a compiled plan with `blueprint.provisioner === true` and an empty vendor list at the start of `materialize`, before staging or writing. Report a clear `TARGET` refusal explaining that an observed provisioner cannot seed a vacant workspace without declared vendors. Document this precondition. A plan with declared vendors still creates the existing inventory skeleton. CLI `new` continues to leave `provisioner` false and gains no flag.

This small creation precondition is preferable to changing the artifact union. It keeps preservation in the planned ownership mechanism and prevents an observation flag from becoming an undocumented generation switch. Do not add corresponding checks to audit, repair, or remove: retention-only plans are valid inputs there.

## Target reading and boundary reuse

In `CLI.#derive`, resolve `SERVICE_SCRIPT_PATH` through the existing `resolveContainedPath` and pass the resulting path through `isExactCaseFile`, exactly as the other structural files are read. Import the existing constant. Keep path operations in the host layer and keep core free of filesystem access.

Do not parse script contents or `tests/setupService.ts`. A file called `Service.sh`, a directory at `scripts/service.sh`, or a redirected path must not set the fact. Retain the existing refusal behavior when inventory encounters a link or a path outside containment. This correction does not promise safety against concurrent namespace substitution beyond the existing path-helper contract.

The declared, locked, and installed Contract `0.0.17` already supplies `isBoolean` and the exact-record `recordOf` used by `isBlueprint`. Extend that existing record with `provisioner: isBoolean`; do not write a new guard. `parseBlueprint` already delegates to the guard and needs no independent parsing rule. The installed Template `0.0.7` already supplies the existing filler. Test `0.0.14` supplies the real scratch resources and link support needed by the regression. No dependency or replacement primitive is needed.

## Rejected alternatives

- Protect `scripts/service.sh` only inside `remove`: the file would remain foreign and audit would stay red. It would also put planned ownership policy in a deletion exception.
- Treat nonempty `vendors` or `service` as presence: existing targets intentionally have no reconstructed vendor list, and service-test registration is independent.
- Preserve every script or infer vendor names from text: this would retain retired docs/custom paths or make edited shell text a new declaration language.
- Append artifacts privately in CLI or Materializer without a blueprint fact: audit and compilation would describe different ownership, and another public consumer could not reproduce the plan.
- Add a preservation-only artifact origin or ownership mode: hydration, comparison, validators, writing, and public artifact consumers would need a wider contract for a fixed existing-file defect. Existing birth ownership already supplies the required comparison and removal behavior.
- Store provisioner contents on the blueprint: this would add byte transport and potentially sensitive shell data where path presence suffices. The current ownership mechanism already preserves bytes.
- Add the boolean and ignore vacant-target materialization: this would silently widen public generation behavior. The explicit creation precondition closes that API cost.

## Owned implementation surface

- `src/core/types.ts`: declare and document `Blueprint.provisioner`; distinguish observed provisioner presence, declared vendors, and the service-test fact.
- `src/core/factories.ts`: default the field to false without coupling it to vendor names.
- `src/core/validators.ts`: extend `isBlueprint` using the existing boolean guard. `isPlan` and parser acceptance inherit the new required field; do not add compatibility handling.
- `src/core/compilers.ts`: widen orchestration membership only as described, update its return documentation, and add a retention-only example without changing the artifact return type.
- `src/core/constants.ts`: broaden the `SERVICE_SCRIPT_PATH` description to cover the existing provisioner path as well as its vendor-driven seed.
- `src/bin/CLI.ts`: derive the fact with the existing containment and exact-case helpers.
- `src/server/Materializer.ts`: add only the vacant-target precondition and its documentation. Leave audit, hydration, repair, and removal mechanisms unchanged.
- `tests/setup.ts`: add the default to `buildBlueprint`; update shared guard/parser case builders with accepted true/false values and refusal inputs for omission and non-booleans. Update direct Blueprint fixture literals exposed by scoped typechecking.
- `tests/setupServer.ts`: reuse its staged-host, real upstream server, repository, tracking, commit, and sink infrastructure. Put reusable new provisioner fixture data here if the proof needs it; do not duplicate setup logic in test bodies.
- `tests/src/core/factories.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/parsers.test.ts`, and `tests/src/core/compilers.test.ts`: bind defaults, explicit values, strictness, parser identity, and the independent vendor/provisioner/service combinations.
- `tests/src/bin/CLI.test.ts`: add the real target-reading regression and the structural boundary controls.
- `tests/src/server/Materializer.test.ts`: retain the vendor-bearing removal regression; add retention-only audit/removal and vacant-target refusal coverage.
- `guides/scaffold.md`: update structural facts, target reading, the Blueprint section, orchestration compilation behavior, and the materialization precondition. Change the misleading instruction to add the script “for vendors” to name `provisioner`. Update the `SERVICE_SCRIPT_PATH` parity row if its Summary changes. Keep the existing compiler and materializer method rows aligned with their declarations; no new method row is needed.

`src/core/parsers.ts`, artifact types, barrels, templates, bin argument parsing, and project-registration compilers need no algorithm change. Guide parity must verify any changed TSDoc. Release version, lockfile, generated inventory, and tooling-tarball propagation remain root-owned release work after the product correction is accepted.

## Red proof through the public CLI

Plant `preserves the existing provisioner through target-reading audit and overwrite` in `tests/src/bin/CLI.test.ts` before changing production behavior.

Use `createScratch`, `createStagedHost`, the existing protocol-faithful upstream replies, `buildCLIOptions`, and `CLI.execute` to create a real temporary target through `new`. Confirm creation supplied no provisioner. Write an edited executable-looking shell document at `scripts/service.sh`, and write tracked `scripts/docs.ts` and `scripts/custom.ts`. Initialize, track, and commit with the existing repository helpers so overwrite runs without `--dirty`. Capture the provisioner with `readFileHex`.

Execute public `audit --groups orchestration --offline --from <host> --target <target> --json` and retain its parsed report. Then execute public `overwrite --groups orchestration --from <host> --target <target> --json` against the fixture server. Collect the overwrite report and retained bytes before asserting the audit expectation, so the red run also observes the destructive consequence in the disposable target.

Require the initial foreign findings to name the docs and custom scripts, not the provisioner. Require overwrite's removed paths to name the docs and custom scripts only; require their absence and provisioner hex equality. Require the terminal orchestration audit to have no foreign provisioner finding. Run audit again against the changed target to exercise fresh derivation. Destroy the fixture server and scratch resources in `finally`.

Run this exact command red, then unchanged after implementation:

```text
npm run test:src:bin -- tests/src/bin/CLI.test.ts -t "preserves the existing provisioner through target-reading audit and overwrite"
```

The expected red cause is the provisioner's foreign finding and its removal in the temporary target, not a network failure or fixture setup refusal. Do not execute this destructive proof against canonical Ollama.

## Adversarial acceptance inputs

- No vendors and no provisioner: default compilation and public `new` emit no service script; reading repair/overwrite does not create one.
- Declared vendors without a service test: generation retains the exact vendor inventory and registers no service project.
- Existing provisioner without `tests/setupService.ts`: target reading preserves it but emits no service project, readiness module, or service npm script.
- `tests/setupService.ts` without a provisioner: service registration remains active and no provisioner appears.
- Existing provisioner with arbitrary edited bytes, including an empty physical file: presence determines ownership; byte content does not determine vendor identity.
- `scripts/Service.sh`, `Scripts/service.sh`, a nested lookalike, and a directory occupying the fixed path: none sets `provisioner`; unplanned regular scripts remain foreign.
- A final file link, a redirected scripts directory, and an escaping target path: use real scratch links and the existing host-supported refusal contract. Never downgrade a containment refusal to a preserved path. Do not claim an unavailable host-specific link experiment passed.
- A retention-only compiled plan passed to `materialize` for a vacant temporary target: refuse before any write. A vendor-bearing plan still materializes its inventory skeleton.

After the narrow red/green proof, run:

```text
npm run test:src:core -- tests/src/core/factories.test.ts tests/src/core/validators.test.ts tests/src/core/parsers.test.ts tests/src/core/compilers.test.ts
npm run test:src:server -- tests/src/server/Materializer.test.ts
npm run test:src:bin -- tests/src/bin/CLI.test.ts
npm run test:guides
```

Then root runs the prescribed acceptance gates and judges the actual diff and artifact evidence. This design ran no tests or writes against a target. No design question remains open; implementation and its red/green proof remain unperformed. Keep Scaffold product bytes unchanged until root releases the current Toolbox preparation dependency on its accepted archive.

DESIGN: READY
