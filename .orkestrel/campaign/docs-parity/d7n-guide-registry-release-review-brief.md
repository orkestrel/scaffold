# Review Guide's registry-backed release preparation

Act as the assigned independent reviewer or reused objective analyst. Read root
AGENTS.md, orchestration, writing, portability, quality, workspace and documentation
rules; the publish skill with wave reference; Guide's authority pointers and
guides/README.md. Perform this read-only assignment directly and spawn nothing.
Do not edit, install, authenticate, upload, commit, run full gates or write a report.
Return your report as final text. Root supplies actual execution receipts.

Read the accepted d7n-guides-api-correction-verdict.md,
d7n-guide-native-source-verdict.md, d7n-guide-native-tooling-root-report.md and
d7n-guide-upper-preparation-verdict.md. Do not reopen their accepted source/API
claims. The subject is the actual final canonical Guide diff, status and release
receipts against preparation HEAD dd8e8717b19e76af045d37748e070c20f065ddcb.

Root ran prepare-guide-registry-tooling-native.sh and read exit 0. Its evidence
is tmp/pass/d7n-guide-registry-native, with the full root gate output in
tmp/pass/d7n-guide-registry-native-prepublish. The actual pack is
tmp/pass/packed/d7n-guide-registry-native-pack, SHA256
01e460ee05cb84b4d24ffc2418aad29ca196d4152cf49b03bf0b68637858c638.
The previous accepted pack is d7n-guide-upper-final-pack. Complete canonical
Guide dist equality against that predecessor exited 0. Scaffold's registry
confirmation is d7n-scaffold-registry-confirm-closed. No temporary tooling overlay
was applied after the final registry npm ci.

Attempt to refute these claims using the actual diff and named receipts.

- METADATA: Guide remains 0.0.18 over registry 0.0.17. Contract ^0.0.17,
  Markdown ^0.0.14, Test dev ^0.0.14 and Scaffold dev ^0.0.64 are registry-resolved;
  the lock root matches. The Probe dev deferral remains explicit. No dependency
  role or peer metadata disappeared.
- TOOLING: Online overwrite and audit exited 0. The installed Scaffold dist equals
  the registry-confirmed accepted archive. Native test:guides stays directly in
  tests/guides.test.ts, retired docs/scripts paths are absent, the Scaffold guide
  mirror matches canonical main, and Guide's own source/guide/test did not change.
- ARTIFACT: Final prepublishOnly exited 0, actual packing exited 0, and the packed
  manifest and complete dist equal the canonical checkout. Complete Guide output
  remains byte-identical to its accepted predecessor despite the toolchain re-pin.
  The registry 0.0.17 baseline exists and the retained comparison supports 0.0.18.
- ROOT-CARRIER: The runtime-only root successor reads latest registry tags, removes
  a duplicate npm ci already performed by the install action, and compares npm
  pkg get's measured bare scalar output instead of assumed JSON quotes. Those
  changes preserve all required actions and fail-closed artifact checks. The
  failed predecessor stopped at the Contract range reading before mutation.

The current final diff names package.json, package-lock.json,
.claude/agents/orkestrel.md and guides/scaffold.md only. API Extractor reports
its bundled TypeScript version and the distribution run reports a deprecation
warning; the gates still exit 0. Preserve raw reports and name any unresolved
claim rather than widening scope. End with VERDICT: PASS or VERDICT: FAIL.
