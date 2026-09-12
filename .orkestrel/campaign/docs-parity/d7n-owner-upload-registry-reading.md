# Registry and restored-install readings

On 2026-09-12, the root queried npm from Windows before preparing the owner upload prompt. The version queries exited 0 with the following readings.

| Command | Registry version |
| --- | --- |
| npm view @orkestrel/scaffold version --json | 0.0.64 |
| npm view @orkestrel/ollama version --json | 0.0.14 |
| npm view @orkestrel/toolbox version --json | 0.0.12 |

The exact candidate-version queries each exited 1 with E404 and a no-matching-version response.

| Command | Requested version |
| --- | --- |
| npm view @orkestrel/scaffold@0.0.65 version --json | 0.0.65 |
| npm view @orkestrel/ollama@0.0.15 version --json | 0.0.15 |
| npm view @orkestrel/toolbox@0.0.13 version --json | 0.0.13 |

Root ran upper-layer-action.sh ollama install d7n-ollama-owner-registry-install 600s. Its npm ci --ignore-scripts command exited 0. Root then ran upper-layer-action.sh ollama prepublish d7n-ollama-owner-registry-prepublish 1200s. The complete prepublishOnly chain exited 0, including registry-mode distribution and the real service project. The post-gate tracked status is empty. The policy and config projects retain their conditional skipped readings; the log does not establish that skipped behavior ran. Compiler-version and child-process deprecation notices remain warnings, not failed gates.

These readings restore the registry-install boundary before upload. They do not replace the retained tarball overwrite/audit result and do not resolve the owner-waived Linux lifecycle or Node22.12 readings.
