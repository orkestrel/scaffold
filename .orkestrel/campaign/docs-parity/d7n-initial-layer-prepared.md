# Initial layer ready for the owner's upload decision

The initial publication layer is prepared. Each canonical checkout is clean on
main, and its campaign branch and origin/main equal the accepted preparation tip.
Root confirmed the final archives, manifest/lock hashes and distribution identity
after the package pushes. Read evidence/d7n-initial-layer-final-state.

## Upload membership

Use this serial upload sequence after the owner authorizes the terminal route
and publication. These packages share the initial runtime/peer/optional layer;
the order within that layer does not introduce a dependency edge.

| Package | Registry reading | Prepared version | Accepted main |
| --- | --- | --- | --- |
| @orkestrel/contract | 0.0.16 | 0.0.17 | e6d2de5bfbbeb6981945b33ede438de8c38f1dbf |
| @orkestrel/codec | 0.0.2 | 0.0.3 | f53355d92452a8fa2c59da084eb9b757c65b7b84 |
| @orkestrel/msg | 0.0.9 | 0.0.10 | 2a66c5b6b1251649a3f92574facf323c20edb581 |
| @orkestrel/sse | 0.0.6 | 0.0.7 | 2a0d3ecb5c13fe7b893c45396840ad20da45492e |
| @orkestrel/test | 0.0.13 | 0.0.14 | 7d4980f97dbf6ee56fcf4a28f5a0e2d163490ed7 |

The registry readings live in evidence/d7n-foundation-release-reading. The
existing pending bumps were retained, not bumped again for this tooling adoption.
Test's external Vitest peer remains registry-valid. No initial-layer runtime or
optional fleet edge waits for another prepared package to publish.

## Proven preparation

The accepted Guide0.0.18 and Scaffold0.0.64 tarballs supplied the current tooling.
Guide's runtime prerequisites were installed with the identified overlay.
Supported Scaffold overwrite removed the obsolete docs launcher; test:guides now
executes each package's authored tests/guides.test.ts directly. The default remains
read-only parity, and explicit --to guide/--to source uses the accepted shared
Guide mechanism. No replacement scripts/guides.ts was introduced.

Each lock was regenerated successfully and remained byte-identical to its valid
registry lock. npm ci passed, then the accepted no-save tooling overlay was
restored with metadata preservation. Each final package prepublishOnly and pack
command exited 0. The final packed runtime, declarations, TSDoc and maps remain
byte-equal to that package's retained foundation candidate. No build, install,
format, gate or commit belongs in the browser approval window.

The archive root is
C:/Users/mikes/WebstormProjects/scaffold/tmp/pass/packed.

| Archive relative to that root | SHA256 |
| --- | --- |
| d7n-contract-publish-final/orkestrel-contract-0.0.17.tgz | 5e2d3ad7b2bb093df0e09d8a8a38ec2cf20bd7a77e0ef3358866d6f6bf38c515 |
| d7n-codec-publish-final/orkestrel-codec-0.0.3.tgz | d3c3ecd30327da12925fb9baa11a4394f537cc403ae0ab136ce315d5303fc895 |
| d7n-msg-publish-final/orkestrel-msg-0.0.10.tgz | adeb728dd1bf1331a83aeee7e94568c1d024be4867e7a8807f33a319946ff349 |
| d7n-sse-publish-final/orkestrel-sse-0.0.7.tgz | 22e9c0069cd89eb7f06729b7573e0b1735c0741003da632542ef2edca59bb17b |
| d7n-test-publish-final/orkestrel-test-0.0.14.tgz | 874c138731367d17c68abd8bef64bfb6fd3a6a8a5f7d1d0fb45746d506623a0f |

Read each d7n-<package>-publish-prepared-verdict.md for its source review,
generated preparation, gate and artifact evidence. The owner-selected separate
review and reused objective analyst remained independent. Earlier report reading
limits were settled by the named root receipts, not by changing returned reports.

Registry-only development installs reported dependency advisories. The raw
receipts remain available; no automatic audit fix ran. This preparation does not
claim a security audit or replace the later development-pin comparison.

## Upload hold

No authentication or publication ran. The prepared operator carrier is
tmp/pass/upload-initial-layer.sh, retained under
instruments/d7/foundation-native/upload-initial-layer.sh. Its source review passed
against the brief, but its use remains held: orkestrel-publish/window.md requires
FIFO-held stdin even in its Windows operator paragraph, while this carrier
requires ordinary terminal stdin. Read d7n-initial-upload-review-report.md.
The root must obtain the owner's terminal-route ruling before recommending or
executing that carrier. Do not treat this file's presence as upload permission.

The intended upload flags are --access public --ignore-scripts --browser=false.
Keep login and upload approvals distinct. The owner enters any browser OTP in
the browser; never request a token or inspect an auth file. The browser upload
approval opens the window described by the publish skill. A CLI OTP is a
different authorization path and does not open that window.

After the owner's upload, confirm the actual registry versions and archive
identity before preparing dependent layers. The wider fleet, Guide main and its
release, Scaffold's later runtime pins, and later dev-only re-pins remain open.
Do not claim the whole fleet is ready from this initial-layer closure.

RELEASE: OPEN — Contract, Codec, Msg, SSE and Test remain unpublished at the prepared versions.
