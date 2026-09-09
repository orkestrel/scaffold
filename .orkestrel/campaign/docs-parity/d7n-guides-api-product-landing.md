# Guide API product landing

The accepted source milestone is committed. Scaffold is pushed to its campaign,
main and designated refs. Guide's API extraction is pushed to its campaign branch;
Guide main still waits for native-entry adoption and package closure.

The product commits and local artifacts are identified here.

| Subject | Identity and result |
| --- | --- |
| Scaffold product | 5197231837183c2a2b7283f50da83ac7b704a027; commit and required pushes exited 0 at ff9b0a |
| Guide API source | 61182c3b727ae9ee410781c48a7008f22da41ff5; commit and campaign push exited 0 at 3c6991; fresh main ancestry passed at 977450 |
| Scaffold local archive | tmp/pass/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz; SHA256 5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c |
| Guide provisional archive | tmp/pass/packed/d7n-guide-api-correction/orkestrel-guide-0.0.18.tgz; SHA256 9cf7f4c66d31f025b0ba1e214431ff60cda21a20e2c5cd50588990f4cd82986c |

Scaffold's guarded pack exited 0 at 650406 after the accepted ordered build. The
packed manifest and core/server outputs match the canonical build; the packed
host tree matches dist/host. Metadata/index preservation checks passed. The
owner toolchain manifest and lock changes are included in the product commit,
and the product working tree is clean. Read evidence/d7n-guides-api-scaffold-commit
and evidence/d7n-scaffold-guides-api-accepted. The pack log was read at c70860.

The commit removes the tracked scripts/docs.ts launcher. It remains recoverable
from Git history. Package assertions stay in tests/guides.test.ts and use the
shared GuideCommand; scripts remain Scaffold-owned. The accepted source and
scope ruling are in d7n-guides-api-correction-verdict.md.

Guide's guard bound the commit to the accepted final diff. Its manifest and lock
bytes are unchanged by commit. Read evidence/d7n-guides-api-guide-commit. The
accepted source uses the supported generated server configuration; no vendored
target file was hand-edited. Its later native-entry adoption has not run.

Continue from these canonical checkouts, not package copies. Use the accepted
Scaffold archive through its supported mechanism to update Guide's owned scripts
and generated command, then adapt Guide's package-owned tests/guides.test.ts.
Preserve its parity assertions and executable examples. Reuse the retained
adoption plan, final root evidence and independent review routes. After that
successor, identify the final Guide archive and carry tooling through the fleet
dependency layers with material-output comparisons and remaining closures.

These are local preparation artifacts. Later development pins remain pending;
no registry-installable release, fleet closure or publication is claimed. Keep
the canonical checkouts on the campaign branch until the Ruling 36 main-switch
condition holds.
