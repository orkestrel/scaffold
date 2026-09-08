# Layer inventory instrument correction report

The bounded correction is complete. The instrument remains read-only outside its required absent output directory, and fleet collection did not run.

## Outcome

`tmp/pass/layer-inventory.mjs` uses the installed `@orkestrel/process` version `0.0.10` `execute` function for bounded child execution. That dependency terminates the owned Windows process tree through `taskkill.exe`, bounds native-exit confirmation, clears its timers, and returns retained stdout and stderr. The instrument translates that result into its evidence shape and records whether termination was requested and whether a native exit was observed. An unobserved exit, timeout, output truncation, signal, spawn fault, or nonzero exit makes a required command incomplete.

The instrument validates the facts that produce completeness. It rejects malformed manifest and lock dependency maps, invalid npm roots, malformed npm dependencies, missing Git readings, failed installed attestations, absent registry `latest` tags or releases, registry and disk identity disagreements, and invalid final snapshots. `evaluateCompleteness` retains supplied reasons and adds a component-specific reason when an invalid component supplies none.

Npm projection and attestation derive a missing node name from its dependency key. A missing optional node remains a valid absence observation with `observed: false`. A foreign nested lock path is not classified as Orkestrel from its ancestor. A path-name and declared-name disagreement remains in the lock evidence and makes the local reading invalid.

The final drift reading validates initial and final manifest digests, lockfile digests, and required Git commands. It compares manifest bytes, lockfile bytes, and `git status --porcelain` output. Any failed reading or difference makes the package incomplete.

## Boundary controls

The command for every red and green reading was:

```text
node --test tmp/pass/layer-inventory.test.mjs
```

The unchanged predecessor returned exit `1`, with `pass 2` and `fail 8`. The failures reached helper structure, malformed npm maps, registry and local projection seams, installed optional-node observation, foreign lock ancestry, completeness fallback, and retained output at the child buffer boundary. The raw reading is `tmp/pass/d7n-layer-inventory-instrument-3/red.txt`.

The nested Orkestrel lock-entry control returned exit `1`, with `pass 9` and `fail 1`, before that validation was added. The raw reading is `tmp/pass/d7n-layer-inventory-instrument-3/red-lock.txt`.

The declared-name and lock-path identity control returned exit `1`, with `pass 9` and `fail 1`, before that disagreement was retained and rejected. The raw reading is `tmp/pass/d7n-layer-inventory-instrument-3/red-lock-identity.txt`.

The final command returned exit `0`, with `pass 10` and `fail 0`. It drove pure payload validators and projections, real temporary manifest and lock readers, real installed-manifest attestation, the output-path guard, and a real child fixture through timeout and buffer bounds. The raw reading is `tmp/pass/d7n-layer-inventory-instrument-3/green.txt`.

## Scoped validation

These scoped checks returned exit `0`:

- `node --check tmp/pass/layer-inventory.mjs`
- `node --check tmp/pass/layer-inventory.test.mjs`
- `node --check tmp/pass/d7n-layer-inventory-instrument-3/child.mjs`
- `.\\node_modules\\.bin\\oxfmt.cmd --config .oxfmtrc.json --check tmp/pass/layer-inventory.mjs tmp/pass/layer-inventory.test.mjs tmp/pass/d7n-layer-inventory-instrument-3/child.mjs`
- `.\\node_modules\\.bin\\oxlint.cmd --config .oxlintrc.json --deny-warnings tmp/pass/layer-inventory.mjs tmp/pass/layer-inventory.test.mjs tmp/pass/d7n-layer-inventory-instrument-3/child.mjs`
- `node --test tmp/pass/layer-inventory.test.mjs`

The no-index whitespace checks returned exit `1` because each candidate differs from its predecessor. Each produced no whitespace diagnostic. The exact output for every scoped check is in `tmp/pass/d7n-layer-inventory-instrument-3/validation.txt`.

## Diff and status evidence

The instrument diff reports `620 insertions(+), 195 deletions(-)`. The controls diff reports `294 insertions(+), 34 deletions(-)`. The child fixture diff reports `11 insertions(+)`.

The exact diffs are:

- `tmp/pass/d7n-layer-inventory-instrument-3/instrument.diff.txt`
- `tmp/pass/d7n-layer-inventory-instrument-3/controls.diff.txt`
- `tmp/pass/d7n-layer-inventory-instrument-3/fixture.diff.txt`

The predecessor source SHA-256 is `34FC05BBCF27333C35700B20F3DC9620004D3BD1E078BEBF9230C9165A217E36`. The predecessor controls SHA-256 is `9895754CEC7FC4FC0304B7A0F366C87F0304D7100754149F5BDBCE4CDF1757EA`. Their byte-identical copies remain under `tmp/pass/d7n-layer-inventory-instrument-3`.

`git status --short` reports owner changes in `package-lock.json` and `package.json`, plus campaign review records under `.orkestrel/campaign/docs-parity`. This unit did not alter those paths. The exact status is in `tmp/pass/d7n-layer-inventory-instrument-3/status.txt`.

## Scope

Touched paths are `tmp/pass/layer-inventory.mjs`, `tmp/pass/layer-inventory.test.mjs`, the files under `tmp/pass/d7n-layer-inventory-instrument-3`, and this report. Shared-file patches are absent.

The unit did not collect fleet state, fetch Git, install dependencies, alter a package checkout, commit, push, publish, or read credentials. Live collection remains outside this unit and requires root acceptance.
