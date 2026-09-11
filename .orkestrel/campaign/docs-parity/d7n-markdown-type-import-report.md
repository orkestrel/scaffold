# Markdown type import integration

Root restored the MarkdownProjection type import in tests/guides.test.ts after
the native helper extraction left its existing annotation unresolved. The
prepublish receipt d7n-markdown-following-source-prepublish stopped at typecheck
with TS2304. The targeted check d7n-markdown-following-type-import-check exited 0.
The same full chain d7n-markdown-following-source-prepublish-final then exited 0.
No type declaration, runtime source, guide or executable assertion changed.

The new setupGuides.ts contents were hashed before and after the successful
chain. Git object identity remained 7523af1bcdd5b3a61c250a3ba317c1eff8291047.
The extra-before and extra-after receipts bind this untracked authored file,
which a normal tracked Git diff cannot include. Independent source review must
include that file and this root integration, not only the writer's predecessor.

The compiler receipt measures the canonical Markdown project directly. The
registered Probe server is rooted in Scaffold; no Probe receipt is claimed for
the sibling project's actual check. The original missing-import failure is the
control, and the package's committed typecheck remains the regression gate.

Retain writer command output unchanged. Its raw counts and historical command
path spelling are evidence formatting, not changes to the source contract.
