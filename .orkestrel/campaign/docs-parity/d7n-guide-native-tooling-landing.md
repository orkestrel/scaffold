# Guide native tooling landed and packed

Guide's authored entry and supported generated tooling are committed through
327470a6e2e0c056c811e9f48a5ed429fe7ba70e. Root staged the accepted tooling delta
at e71e8c, committed at dacc61, and campaign-pushed at 898675. The full tip was
read at 2123b4. Root's source and tooling acceptance is retained in
d7n-guide-native-source-verdict.md and d7n-guide-native-tooling-root-report.md.

The refreshed local Guide archive is:

| Field | Value |
| --- | --- |
| Path | tmp/pass/packed/d7n-guide-native-entry-final/orkestrel-guide-0.0.18.tgz |
| SHA256 | cc605b5bcfe6db1c86ab6cdfda6415879253b56cf5b4d5d0d325c19eb1b7eac7 |
| Source | canonical Guide327470a, built by the final ordered root gates |
| Runtime ranges | @orkestrel/contract ^0.0.17; @orkestrel/markdown ^0.0.14 |
| Command | test:guides runs tests/guides.test.ts directly; docs is absent |
| Publication | local artifact only; no upload |

Root packed at 4b41a9 with the retained runtime metadata overlay and restored
canonical metadata immediately afterwards. The manifest SHA256 returned to
3add678aaa1df1f0eae1f58fd18bd6ede5bc219bb1aeb1766d922db71803ec48 and the lock
to 040270de20d0af72d67fe6cff573b720db77a54dd94e5d9266b6f5082e59e593
at 02633e. Root observed clean Guide status at 0fc1bc and ba7b82.
Canonical release pin changes remain part of the dependency-layer preparation;
the temporary overlay is not a claim that those committed ranges changed.

Root read the packed metadata at 189e48 and pack log at b0ab77. The entire packed
dist/src tree equals the canonical build at 8524d0. Root installed the refreshed
archive into Scaffold at c62853 with accepted lower-layer archives and metadata
preservation. The core/server artifact inspection passed at 1839ea and its log
was read at 838f68. The entire installed dist/src tree equals canonical Guide at
6c5988. Scaffold's actual native test:guides command passed at 611f6c.

The generated manifest changed the archive identity; Guide's JavaScript,
declarations, and maps stayed byte-identical to the prior accepted source output.
The completed adoption therefore needs no further Guide API redesign. Its test
entry, shared command, explicit authorities, package assertions, supported script
removal, and output preservation are closed for this scope.

Resume the layer pass from this artifact. Read each target's retained closure
packet and actual branch/main state before applying it. Preserve package-owned
assertions when adapting each authored test entry, then use Scaffold's supported
command and script ownership mechanism. Compare each rebuilt lower-layer
distributable with its prepared archive before replacing an artifact.

Guide main remains held for the fleet sequence. Remaining work includes the
dependency-layer adapters and tarballs, unfinished fleet closures, MCP-to-Probe
transport verification, semantic runtime/peer/optional pins, prepared bumps, and
the catalog-derived release order. Development pin changes may follow where
material output stays equal. The owner still controls publication; no publish
skill execution or registry upload occurred.
