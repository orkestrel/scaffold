# Toolbox release preparation verdict

Accept Toolbox0.0.13 for clean-main closure from prepared HEAD
940ca311b458c935880265cefc63f23b7e2f05df. The independent and reused objective
release reports confirm REGISTRY, OVERWRITE, ARTIFACT and CLOSE. Source acceptance
remains closed; this verdict covers the final registry visit and packed candidate.

Root ran the accepted preparation carrier to exit0 and read the final
prepublish output. Registry pins, supported external majors, lockfile install,
supported overwrite/audit, native parity and release-mode distribution passed.
The existing host-specific skips and toolchain warnings remain visible in the
receipts; a successful prepublish is not a claim that every host branch ran.
No local dependency resolution remains. Own guide/native-test hashes are stable.

The actual packed archive is
cf60177fb42d036c9747e3e192b0e7429d5105984c0e554cd8d176c207032e78.
Its manifest and complete dist match canonical Toolbox. Installed Guide18 and
Scaffold64 match accepted published archives. The fetched baseline comparison
differs materially, and runtime ranges differ from the baseline manifest.
These support the pending version; do not bump it again.

Root retains exclusive control of Toolbox after its final build. The carrier
compares reviewed candidate state, gate receipts and packed bytes; it does not
cryptographically bind the verdict text to the candidate or fingerprint the
gate's dist. Keep that limit in the objective report's operational-gap wording.
The independent report supplies its own read-only file/archive comparisons.

Run close-ollama-toolbox-registry-supported-release.sh with the stated prepared
HEAD, pending version and d7n-toolbox-final-registry-visit. It must recheck state,
artifact equality, fresh ancestry and allowable paths before committing; then
push campaign and main and leave canonical local main clean at the release tip.
No upload or Ollama overwrite is authorized by this verdict. Ollama's provisioner
hold and the separate Scaffold correction remain open.

VERDICT: PASS
