# Middleware registry preparation review

1. REGISTRY — CONFIRMED. Final runtime fields are Abort `^0.0.10`, Budget `^0.0.10`, Contract `^0.0.17`, and Timeout `^0.0.10`. Guide `^0.0.18`, Scaffold `^0.0.64`, and Test `^0.0.14` remain development pins; Probe `^0.0.12` is the explicitly deferred development pin. Database `^0.0.14` and Server `^0.0.19` occupy their peer and development fields; Router `^0.0.14` occupies only its development field. The manifest and before/final metadata receipts preserve Database's `optional: true`. No Router peer was added. Registry and installed-root readings match these versions.

   The supported lookup observations and final fields agree on api-extractor `^7.59.1`, Node types `^26.5.1`, Oxfmt `^0.67.0`, Oxlint `^1.82.0`, TypeScript `^6.0.3`, Vite `^8.3.0`, and Vitest `^4.1.11`. The selected floors stay within the captured prior majors; TypeScript's major-7 and Vitest's major-5 advisories do not change those selections. The manifest/lock local-resolution search has no match. Its exit 1 and the self-pin searches' exit 1 are expected absence results. Attacks against section widening, lost optionality, automatic major adoption, and local dependency resolution do not reproduce.

2. OVERWRITE — CONFIRMED. Root's supported overwrite and audit receipts exit 0 and record aligned planned paths. Their major advisories are non-blocking. The final tree has no `scripts/docs.ts` or `scripts/guides.ts`; the manifest has no `scripts.docs` field. Its `test:guides` command directly invokes `tests/guides.test.ts`.

   Authored guide/native-test hashes agree before and after the visit. The preparation commit changes only the manifest and lock, and the subsequent actual diff has no source, test, or own-guide change. Final changed paths are the catalog, manifest, lock, declared dependency mirrors, and retired docs script. Guide and Scaffold mirrors match their canonical guide hashes. No vendored hand edit or source-scope expansion appears.

3. ARTIFACT — CONFIRMED. The final `d7n-middleware-final-registry-visit-prepublish/action.exit.txt` records 0. Actual stdout/stderr show the prescribed format, lint, root and environment typechecks, core/server builds, tests, native guides, and release-mode distribution completing. The retained output contains skipped cases and tool notices; this verdict does not convert them into executed cases or claim a Linux rerun.

   Actual packing exits 0. The extracted manifest equals the canonical manifest by hash, and the complete packed-dist comparison exits 0 with no differences. Installed complete Guide and Scaffold comparisons exit 0 with empty output. Gate and pack metadata captures agree; their diff and index match the frozen checkout. Their HEAD captures equal the actual preparation HEAD `e301b917415b54a6090fcb4cadce6be49e6026ad`.

   Package SHA-256 is `DAF6D54E4452ACB18966044599619E305D4915C0C2C16430460E2FFF3E576564`; lock SHA-256 is `F5950EEF942F37CB5D73BCC65CCDF194F798E4C65AFD6224D6BDEA58B5E8B822`. The actual `orkestrel-middleware-0.0.20.tgz` hash matches its receipt: `03A520C6773A8C5E9797AEF8CE5C02417D9BB2358F2A905D91ED8ED068DCAC42`.

   The served `0.0.19` baseline downloaded successfully. Its map-excluding, whitespace-insensitive comparison reports changed emitted content, including documentation. Its manifest carries the superseded runtime and peer ranges. Those published-surface changes justify the pending `0.0.20` bump. No later MCP-to-Probe execution is claimed.

4. CLOSE — CONFIRMED as readiness for the accepted closure carrier, subject to root recording the prepared verdict. Middleware's frozen visit and pack satisfy the carrier's HEAD, metadata, diff, index, archive, and artifact prerequisites. Every final changed path fits its named-path allowlist, including Database, Router, and Server mirrors admitted through the declared field arrays. The carrier preserves peer metadata and supported-tool observations, requires a prepared verdict, fetches and checks main ancestry, commits with the specified identity/trailers, pushes campaign/main, selects canonical local main, and checks clean state, refs, and artifact equality. An ahead or divergent `origin/main` fails ancestry; harmless ancestor movement is not an exact-ref failure. This is closure readiness, not completed closure or owner upload.

No substantiated finding falls outside the claims. Accepted source criteria remain closed.

VERDICT: PASS
