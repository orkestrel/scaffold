# Guide policy observation successor check

1. O1 — CONFIRMED

Evidence: `tmp/pass/guide-policy-observe.mjs:10-20,26-38,80-120` retains the named fixture paths and inert LF text while copying only the real config and policy bytes. Distinct `mkdtempSync` roots and the supplied output directory are the only write locations, with path containment enforced for fixture writes.

2. O2 — CONFIRMED

Evidence: `tmp/pass/guide-policy-observe.mjs:40-78` writes a metadata-independent raw envelope to a distinct `${name}-raw.json` file before checking spawn or parse results, then reads the object envelope's `diagnostics` array at line 74 and retains each diagnostic's code, filename, and message. `writeEvidence` uses `flag: 'wx'` at lines 40-42, so evidence cannot be overwritten. Lines 143-158 write metadata before invocation and write normalized observation only after all collections succeed. Spawn, signal, empty stdout, malformed JSON, missing diagnostics, or malformed diagnostics throw after raw evidence is retained; ordinary lint status remains data in the raw envelope.

3. O3 — CONFIRMED

Evidence: `tmp/pass/guide-policy-observe.sh:18-55` creates a fresh log root, captures guide status and diffs before and after, invokes the observer under `timeout 120`, and preserves collection and final-capture failures through its EXIT trap. It performs no source repair, install, deletion, or package mutation.

4. Opening-header comparison — CONFIRMED

Evidence: `tmp/pass/agent-header-host.sh:4-11` requires nonempty agent and abort test files, refuses a stale log, compares only their first three lines with `cmp`, and retains the actual exit in the redirected log through its EXIT trap. The retained log `tmp/pass/d7n-agent-header-host.log.txt` records the comparison and `exit=0`; the script makes no claim about the remaining canon region.

Syntax evidence: `node --check tmp/pass/guide-policy-observe.mjs`, `bash -n tmp/pass/guide-policy-observe.sh`, and `bash -n tmp/pass/agent-header-host.sh` each exited 0. No bodies or package commands ran.

VERDICT: PASS
