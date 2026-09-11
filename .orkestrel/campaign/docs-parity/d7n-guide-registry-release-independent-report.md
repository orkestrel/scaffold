Guide’s registry-backed release preparation passes this bounded review. Accepted source and API verdicts remain closed.

- **METADATA — CONFIRMED.** Guide remains `0.0.18`; the registry receipt reports `0.0.17`. The manifest and lock root retain Contract `^0.0.17`, Markdown `^0.0.14`, Test development `^0.0.14`, and Scaffold development `^0.0.64`. Their lock entries resolve to npm registry archives. Probe remains explicitly deferred at development `^0.0.12`. The actual manifest diff changes toolchain ranges without removing dependency roles or peer metadata.

- **TOOLING — CONFIRMED.** The `d7n-guide-registry-native` receipts report exit `0` for online overwrite, audit, and the installed Scaffold distribution comparisons before and after the final registry install. Scaffold’s registry confirmation binds its downloaded archive to the accepted digest. The native `test:guides` command still runs `tests/guides.test.ts`; the retired script paths and `docs` key are absent. The Scaffold mirror hash matches canonical Scaffold. The actual diff contains no Guide source, test, or own-guide change.

- **ARTIFACT — CONFIRMED.** Final `prepublishOnly`, actual packing, packed/canonical distribution equality, and complete distribution equality against the accepted predecessor report exit `0`. The packed manifest hash matches canonical Guide. The archive hash independently reads `01e460ee05cb84b4d24ffc2418aad29ca196d4152cf49b03bf0b68637858c638`. The downloaded `0.0.17` baseline exists; its comparison excluding maps and ignoring whitespace reports exit `1` with material changes, supporting `0.0.18`.

- **ROOT-CARRIER — CONFIRMED.** The successor reads unversioned registry tags and retains exact expected-version checks. Removing the extra `npm ci` preserves the install action, which already runs `npm ci --ignore-scripts`. Scalar comparisons match the measured bare ranges and still reject differing values. Artifact checks remain intact. The predecessor’s command record ends at the Contract reading, before package mutation.

The final checkout remains at preparation HEAD `dd8e8717b19e76af045d37748e070c20f065ddcb`, with changes confined to `package.json`, `package-lock.json`, `.claude/agents/orkestrel.md`, and `guides/scaffold.md`. Release commit, main closure, upload, and registry confirmation remain outside this acceptance. The recorded compiler-version and deprecation warnings do not invalidate the successful gate receipts.

VERDICT: PASS
