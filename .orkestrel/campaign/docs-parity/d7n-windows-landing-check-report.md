# Windows landing instrument checker

CONFIRMED: run-fix.sh accepts only the named package set, requires fresh report,
journal, and stderr paths, rejects dirty or untracked targets, names the required
brief and Windows supplement, launches the assigned route with the requested timeout,
and does not install or skip permissions. Evidence: tmp/pass/run-fix.sh:5.

CONFIRMED: land-p2.sh rejects unknown stages and packages, wrong branches, staged
changes, untracked files, missing reports, empty diffs, and paths outside the stage
allowlist. It stages only enumerated permitted paths, excluding vendored files.
Evidence: tmp/pass/land-p2.sh:51.

CONFIRMED: every Git call uses git -C with the target. Commit identity, the session
trailer, path-only staging, and --only prevent unrelated staged content from entering.
Evidence: tmp/pass/land-p2.sh:54.

CONFIRMED: retention refuses differing existing artifacts with cmp. Failures are
surfaced or captured in the landing log. The scripts do not push, install, delete,
or read credentials. Evidence: tmp/pass/land-p2.sh:34 and tmp/pass/run-fix.sh:1.

The checker's bash -n run over run-fix.sh and land-p2.sh exited 0.
The checker inspected the bodies without running them.

VERDICT: PASS

The Orchestrator retained the returned claims with prose-only normalization. The
substantive verdict and evidence remain unchanged.
