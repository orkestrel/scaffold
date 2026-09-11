Objective lane held.

- **METADATA — CONFIRMED.** [package.json](C:/Users/mikes/WebstormProjects/guide/package.json:2) remains `@orkestrel/guide@0.0.18`. Runtime ranges are Contract `^0.0.17` and Markdown `^0.0.14`; development ranges retain Test `^0.0.14`, Scaffold `^0.0.64`, and the explicit Probe deferral `^0.0.12`. The lock root reproduces those roles and ranges. The actual package diff changes only foreign development-tool versions; it removes no dependency category or package-level peer metadata.

- **TOOLING — CONFIRMED.** Online overwrite and audit receipts exit `0`. Installed Scaffold reports `0.0.64`, and its complete `dist` comparison against the registry-confirmed accepted archive exits `0` before and after the final install. [package.json](C:/Users/mikes/WebstormProjects/guide/package.json:75) keeps the native command directly in `tests/guides.test.ts`. `scripts/docs.ts` and `scripts/guides.ts` are absent. The Scaffold guide comparison exits `0`, while the before/after hashes for `guides/guide.md` match. The actual diff names only `package.json`, `package-lock.json`, `.claude/agents/orkestrel.md`, and `guides/scaffold.md`; source, Guide’s own guide, and tests are unchanged.

- **ARTIFACT — CONFIRMED.** Final prepublish and pack receipts exit `0`. The pack carrier requires the packed manifest to equal canonical `package.json` and the complete packed `dist` to equal canonical `dist`. The archive SHA-256 is `01e460ee05cb84b4d24ffc2418aad29ca196d4152cf49b03bf0b68637858c638`. Guide’s canonical output also equals the accepted predecessor distribution. The downloaded registry `0.0.17` baseline succeeds and differs materially in core declarations and implementation, while `0.0.18` adds the server distribution; this supports the pending release identity rather than a metadata-only repack.

- **ROOT-CARRIER — CONFIRMED.** The successor queries the latest Guide and Scaffold registry tags and requires `0.0.17` and `0.0.64`. It compares the measured bare `npm pkg get` values, retains lock and install actions, and removes only the redundant direct `npm ci` after the install action. Artifact, manifest, index, diff, installed-Scaffold, prepublish, pack, and predecessor-distribution guards remain fail-closed. The failed predecessor evidence ends after the Contract range reading, with clean initial status and no mutation receipts.

- **Advisories.** API Extractor reports bundled TypeScript `5.9.3` against project TypeScript `6.0.3`. The distribution run reports Node’s shell-argument deprecation warning. These warnings did not change the successful exits or byte-equality evidence, but remain tooling follow-up items.

No release-preparation claim remains unresolved.

VERDICT: PASS
