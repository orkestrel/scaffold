# Agent and Probe tooling carrier report

## Touched paths

- `tmp/pass/install-agent-probe-tooling.sh`
- `tmp/units/d7n-agent-probe-tooling-carrier-report.md`

## Delta

The successor preserves `install-dependent-tooling.sh` except for the scope comment and the package case:

```diff
-# Successor: stage published tooling for dependent native parity adoption.
+# Successor: stage published tooling for Agent and Probe native parity adoption.
-case "$package" in brief|mcp|middleware|program|worker|workflow) ;; *) fail 'package is outside the dependent tooling layer' ;; esac
+case "$package" in agent|probe) ;; *) fail 'package is outside the Agent and Probe tooling layer' ;; esac
```

## Validation

`C:/Users/mikes/scoop/apps/git/current/bin/bash.exe -n tmp/pass/install-agent-probe-tooling.sh` exited 0.

`git diff --no-index --unified=0 -- tmp/pass/install-dependent-tooling.sh tmp/pass/install-agent-probe-tooling.sh` exited 1 and reported only the scope-comment and package-case substitutions shown earlier.

The carrier has not executed. Archive identity, timeout, installation, and target-state assertions remain unvalidated until root runs the carrier.
