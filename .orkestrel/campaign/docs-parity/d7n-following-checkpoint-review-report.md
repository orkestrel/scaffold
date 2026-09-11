### C-REGISTRY — CONFIRMED

The actual `d7n-next-registry-confirm-closed/result.json` rows match the accepted versions, release tips, and archive SHA256 values in `d7n-next-layer-prepared.md`. The recorded downloaded SHA1 values match the registry shasums. The metadata files independently carry the matching names, versions, archive URLs, and `gitHead` values.

The recorded Git commands exited `0`. Their outputs show clean canonical `main` checkouts with HEAD and freshly fetched `origin/main` at the accepted release tips.

The alternate-release reading fails against those bindings. This conclusion covers the supplied closure: `confirm-next-registry.ps1:62` records `gitHead` without asserting its equality, so its exit status alone would not establish that field.

### C-RECORD — CONFIRMED

Source review against the actual staged `D publish.txt` state supports the bounded checkpoint.

The script stages only `.orkestrel/campaign/docs-parity` and commits with `--only` selecting that path. The unrelated deletion stays outside the commit. The binary cached patches captured before and after the commit are compared before pushing.

The command wrapper records and returns the native exit status. Top-level `set -euo pipefail` stops a failed commit, push, or comparison. The non-forcing push names the required origin refs; the subsequent queried tracking refs must equal HEAD.

### Attacked and held

Including the staged deletion through an ordinary index-wide commit is excluded by path-only commit selection. Losing the deletion would fail the cached-patch comparison. A rejected push cannot reach the terminal success output.

The expected staged deletion is compatible with this record-only checkpoint; a clean-index requirement would contradict its scope. This is source acceptance, not an executed checkpoint receipt.

VERDICT: PASS
