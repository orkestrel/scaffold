1. REGISTRY — CONFIRMED. I compared the final manifest and installed roots with the visit’s registry observations. Runtime and development ranges match. External tools and peers remain within their supported majors; Oxlint, TypeScript and Vitest retain optional peer metadata. The manifest and lockfile contain no local-resolution entries. Probe remains pending `0.0.13` against registry baseline `0.0.12`, without another bump.

2. OVERWRITE — CONFIRMED. Supported overwrite and audit exited 0. The retired scripts and `docs` command are absent; `test:guides` directly names its test. Authored guide/native-test hashes survive generation unchanged. Comparing the accepted source commit with current state shows only manifest, lockfile, dependency mirrors, catalog and retired-host changes—no source or native-test rewrite.

3. ARTIFACT — CONFIRMED. Final prepublish and actual packing exited 0 at prepared HEAD `291668e9824a8f2448681e8bab52bf5c6e47a006`. Current HEAD, diff, status, index and manifest hashes match the completed visit, gate and pack captures. The retained complete visit matches the live evidence.

   I compared complete distribution trees by relative path and file hash: packed Probe equals canonical Probe; installed Guide and Scaffold equal their accepted archive contents. The actual Probe archive SHA256 is `8fa05fa2962fec81ca31bfa9fbd3d8e468b7a2f638f63309add17efd9e3724b0`. The downloaded baseline and changed runtime ranges support the pending bump.

   Final foreign-client evidence exercises the real built entry on this graph. The modern and pinned legacy cases passed. The observer reports clean candidate stages and the intended type-only control failure:

   ```text
   receipt probe:d3bab33cfc7e97de41527d770a87b9e8:type:typescript@6.0.3:oxlint@1.82.0:vitest@4.1.11:configs/src/tsconfig.core.json@434f59254d58cf2683d453a26bd0d837
   ```

4. CLOSE — CONFIRMED. Comparing the adapted carrier with its predecessor shows the accepted guards preserved. It checks prepared state, archive identity, complete packed bytes, dependency ranges and peer metadata before committing. Allowed paths fit the actual remaining delta. Identity/trailers, fresh fetch and ancestry refusal, campaign/main pushes, missing-local-main handling and final clean-main/ref equality checks remain intact. The inspected carrier matches its captured hash. This establishes readiness for closure, not completed closure or upload.

Outside the claims: none.

Attacked and held: the earlier unsuffixed retained visit is an incomplete historical snapshot, not missing final evidence; the complete snapshot supplies the finished record. The still-unrefreshed harness uses a different graph and does not contradict the final foreign-client results. Root-owned exclusion of intervening writes remains necessary; these scripts do not autonomously bind verdict prose or fingerprint the gate’s distribution output.

VERDICT: PASS
