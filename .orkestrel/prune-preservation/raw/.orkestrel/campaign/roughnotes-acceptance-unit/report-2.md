# Roughnotes acceptance navigation report

`index.md` links the effective R-B brief11/report11 pair, final R-B audit, registry adoption author brief/report, registry audit, host, ordered gate, final capture, verifier, and root acceptance. The index distinguishes the registry author artifacts from the root acceptance artifact.

`navigation-manifest.json` records raw-to-operational Markdown copies, raw and operational SHA-256 values, and exact link rewrites. The gate-author report now links its retained `runner-successor.diff.patch` copy. The capture-retention report now links its retained `successor.diff.patch` copy. Each rewrite climbs from the operational document through `operational` to the retained canonical evidence path.

The operational Markdown resolver read the index and every operational Markdown copy, resolved each local link from the document directory, and exited `0`. Raw and operational SHA-256 verification exited `0`. `navigate.ps1` parser validation exited `0`.

The original `report.md` hash remains `9840AE16FB10D81BEA15DA856CA37274DD9B039A3C5B15F583AA398E72032749`. The original `manifest.json` hash remains `00470A45CDD73267632E3543A7EB3DED045C29A915F17EF9213AA8C25C8D1A9A`. The navigation manifest lists no unresolved effective input.

`.gitattributes` marks retained raw evidence as `-text`. The operational copies are additions. This report does not change the raw evidence or make an acceptance judgment.
