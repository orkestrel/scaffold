# Accepted path bootstrap tarball

Accept this artifact as provisional path/tool bootstrap only. Root ran the saved
pack-path-bootstrap.sh script and read exit 0. The independent mechanical checker
returned PASS on that script and its actual diff. Source package and lock checksum
checks passed after packing. No lifecycle script, rebuild, install or publication ran.

The artifact is tmp/pass/packed/path-bootstrap.4ppVCf/orkestrel-scaffold-0.0.63.tgz.
Its SHA-256 is 94cb80312c6ed57d78a0c67930d6c153fe2355be8c93df4f8429bd13306fed3b.
Its packed manifest names @orkestrel/scaffold version 0.0.63. That version does not
identify the published artifact: the tested path source landed as c90089c9, and this
unpublished bootstrap carries those bytes under its distinct digest and role.
It cannot satisfy the final scaffold release bump or an accepted runtime edge.

Root compared the extracted member hashes with the accepted isolated dist files.
The host manifest hash is 60f6f1612933be6c5eb022e803e0b0fdf0d50452de8307d2688a3b832df0cf78.
The setupPolicy member hash is ebe2777780193eed9d8d0641d6326535a6b5084d88aee0b6361d0b2409281ded.
The config test member hash is b880877803d909f83bc2ba4110d795cfecf620402696272e967bb55b90b66578.
These match the actual tarball readings. The host manifest hash is a file hash, not
an aggregate digest over the entire host tree. The isolated Git base and dirty source
receipt remain part of provenance; the accepted-source integration verdict supplies
the link to c90089c9. No fleet repair has run from this artifact.

Retain the pack stdout/stderr, member list, packed manifest, packed host manifest and
checksum files under evidence/d7n-path-bootstrap-pack/. Rebuild the bootstrap through
the retained accepted path preparation scripts and pack script on another host.
Do not infer registry readiness or final dependency alignment from this receipt.
