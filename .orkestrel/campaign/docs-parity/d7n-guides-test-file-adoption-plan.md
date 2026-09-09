# Adopt the accepted test-file entry before release

Resume this plan only after d7n-guides-test-file-audit-verdict.md has a source-acceptance successor. Work directly in canonical WebstormProjects checkouts. Read each package's retained audit, fix, check, verification and closure packet before touching it. Use the fleet alignment workflow and the package-hardening workflow for each implementation unit.

- Update canonical Guide's package-owned tests/guides.test.ts to the accepted direct native-command/worker-registration contract, preserving its actual parity and executable assertions. Update its own command documentation and PROPOSAL.md where applicable. Prove default read-only behavior and explicit authority against the accepted runtime dependency tarballs.
- Update scaffold's root PROPOSAL.md from the retired docs invocation to test:guides and its explicit directions. Refresh guides/guide.md through the supported mirror mechanism after the upstream Guide guide is accepted. Never rewrite a target's vendored mirror manually.
- Pack the corrected Guide and scaffold from the direct checkouts after the owner manifest/lock commit choice is resolved. Record the dependency identity and material distributable comparison against the accepted prior tarballs. Runtime and declaration changes require the corresponding downstream preparation; a development-only adoption with unchanged material output does not require a new publication.
- At each dependency layer, update each package-owned guides test before installing the generated direct command through scaffold's supported mechanism. Do not assume a Vitest-only module works as a native Node entry. Preserve package assertions and local inventory cases; do not add tests/guides.test.ts to HOST_PATHS.
- Finish the retained fleet closures against the final dependency tarballs, including MCP-to-Probe transport verification. Retain each landing and closure in the campaign ledger and push the branch and main when accepted.
- Prepare aligned semantic ranges and version bumps, including runtime, peer and optional relationships. Keep later tooling development pins separate when they do not move material output. Derive release layers from the current graph when ready and load orkestrel-publish before any requested publication.

No upload is authorized by this plan. The owner still controls publication.
