# Ollama and Toolbox release carrier adaptation

## Outcome

The release carriers are adapted for the Ollama and Toolbox registry layer. No carrier ran.

## Changes

- `prepare-ollama-toolbox-registry-supported.sh` uses the Ollama and Toolbox runtime and development matrices, reads prior ranges by manifest section, sets every development target before installation, checks registry identities, preserves external toolchain majors and Ollama `0.6.3`, removes the external-peer branch, and calls the Ollama/Toolbox pack carrier.
- `pack-ollama-toolbox-final-verified.sh` retains prepublish evidence binding, archive equality, canonical `dist` equality, and runtime `dist/src` baseline comparisons without a bin comparison.
- `commit-ollama-toolbox-native-entry.sh` retains source verdict, prepublish, manifest, diff, index, vendored-content, commit, push, identity, and session binding.
- `close-ollama-toolbox-registry-supported-release.sh` retains prepared evidence, archive, manifest, `dist`, dependency, external toolchain, peer metadata, branch, commit, push, and main fast-forward binding.
- `capture-ollama-toolbox-review.sh` captures Ollama, Toolbox, and Scaffold state; compares each Agent/Probe predecessor with its Ollama/Toolbox successor; and writes SHA256 receipts for the successor carriers.

## Approved scope addition

The root approved `guides/toolbox.md` in the Toolbox source commit allowlist after the native parity proof found missing existing-TSDoc method tables. The carrier refuses that path for Ollama and grants no other guide or source exception.

## Execution constraint

Ollama carrier execution remains held while the root reconciles why Scaffold reports the CI-used `scripts/service.sh` file as foreign despite the guide's preservation contract. The carriers do not allow that file's deletion. Toolbox is unaffected.

## Validation

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/prepare-ollama-toolbox-registry-supported.sh tmp/pass/pack-ollama-toolbox-final-verified.sh tmp/pass/commit-ollama-toolbox-native-entry.sh tmp/pass/close-ollama-toolbox-registry-supported-release.sh tmp/pass/capture-ollama-toolbox-review.sh` exited `0` with no diagnostics.

Scoped `git diff --no-index --check -- NUL <path>` readings returned the expected added-file exit `1` with no whitespace diagnostics for every carrier.

## Diffstat

```text
245	0	tmp/pass/prepare-ollama-toolbox-registry-supported.sh
114	0	tmp/pass/pack-ollama-toolbox-final-verified.sh
8	0	tmp/pass/commit-ollama-toolbox-native-entry.sh
191	0	tmp/pass/close-ollama-toolbox-registry-supported-release.sh
66	0	tmp/pass/capture-ollama-toolbox-review.sh
38	0	tmp/units/d7n-ollama-toolbox-release-carrier-report.md
```
