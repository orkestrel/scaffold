# Agent and Probe landing-carrier implementation

## Outcome

The bounded landing successors are complete. No landing carrier or target command ran.

## Touched paths

- `tmp/pass/commit-agent-probe-native-entry.sh`
- `tmp/pass/close-agent-probe-registry-supported-release.sh`
- `tmp/units/d7n-agent-probe-landing-carrier-report.md`

## Predecessor diffstat

```text
tmp/pass/{commit-dependent-native-entry.sh => commit-agent-probe-native-entry.sh} | 6 +++---
1 file changed, 3 insertions(+), 3 deletions(-)
tmp/pass/{close-dependent-registry-supported-release.sh => close-agent-probe-registry-supported-release.sh} | 58 ++++++++++++++++------------------------------------------
1 file changed, 16 insertions(+), 42 deletions(-)
```

## Substantive substitutions

- The native-entry commit carrier admits Agent and Probe and reads the `agent-probe` source PASS
  verdict.
- Its shared source allowlist contains the manifest, guides proof, configuration proof, and
  vendored policy proof.
- Agent alone admits `guides/agent.md` and
  `src/core/conversations/stores/MemoryConversationStore.ts`.
- Probe alone admits `tests/setupServer.ts` and `tests/setupServer.test.ts`.
- The commit carrier keeps the predecessor's source PASS, branch and HEAD, prepublish identity,
  staged and untracked refusal, vendored-policy equality, exact path staging, commit identity,
  campaign push, and receipt checks.
- The release closure admits Agent `0.0.21` and Probe `0.0.13` with the reviewed preparation
  carrier's runtime and development arrays. Agent requires Probe `0.0.12` as development data;
  Probe carries no self development row.
- The closure reads the `agent-probe` prepared PASS verdict and retains the canonical visit label
  and receipt names.
- The common external toolchain loop also checks Probe's `oxlint`, `typescript`, and `vitest` peer
  receipts and final ranges. The peer-metadata equality chain remains unchanged.
- The predecessor's roster-specific field and preserved-external arrays are absent.
- The generated release allowlist retains manifest and lock data, the catalog agent file, the
  retired docs script, and mirrors for declared runtime and development dependencies. Package
  source and package-owned guides remain refused.
- The closure retains the pack, prepublish, installed-tooling, manifest, diff, index, ancestry,
  commit, push, main-switch, reference, clean-tree, and final-dist checks.

## Scoped validation

```text
& 'C:/Users/mikes/scoop/apps/git/current/usr/bin/bash.exe' -n tmp/pass/commit-agent-probe-native-entry.sh
exit 0

& 'C:/Users/mikes/scoop/apps/git/current/usr/bin/bash.exe' -n tmp/pass/close-agent-probe-registry-supported-release.sh
exit 0
```

The predecessor comparisons emitted no whitespace diagnostics from `git diff --no-index --check`.

## Shared-file patches

None.
